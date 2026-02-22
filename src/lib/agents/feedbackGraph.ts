import {
  StateGraph,
  Annotation,
  messagesStateReducer,
} from "@langchain/langgraph";
import {
  HumanMessage,
  SystemMessage,
  BaseMessage,
} from "@langchain/core/messages";
import { ChatOpenAI } from "@langchain/openai";
import { ChatAnthropic } from "@langchain/anthropic";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { z } from "zod";
import { FeedbackSchema } from "../schema";
import { MultiAgentFeedback, FeedbackData } from "@/types/database";

export const AgentState = Annotation.Root({
  messages: Annotation<BaseMessage[]>({
    reducer: messagesStateReducer,
  }),
  imageUrls: Annotation<string[]>({
    reducer: (curr, update) => update,
  }),
  openaiFeedback: Annotation<FeedbackData | null>({
    reducer: (curr, update) => update,
  }),
  claudeFeedback: Annotation<FeedbackData | null>({
    reducer: (curr, update) => update,
  }),
  geminiFeedback: Annotation<FeedbackData | null>({
    reducer: (curr, update) => update,
  }),
  finalFeedback: Annotation<MultiAgentFeedback | null>({
    reducer: (curr, update) => update,
  }),
});

const systemPrompt = `You are an expert Senior UX/UI Designer. You are evaluating a user flow based on the provided text context and UI screens.
Analyze the design heuristics, accessibility, and user flows.
Provide a structured evaluation strictly following the required schema. Ensure your feedback is actionable, professional, and VERY CONCISE. Keep your total response to under 300 words.`;

// Ensure we pass the schema structure in a way langchain understands for each model
const openaiModel = new ChatOpenAI({
  modelName: "gpt-4o",
  temperature: 0,
  apiKey: process.env.OPENAI_API_KEY || "dummy",
}).withStructuredOutput(FeedbackSchema);
const claudeModel = new ChatAnthropic({
  modelName: "claude-haiku-4-5",
  temperature: 0,
  anthropicApiKey: process.env.ANTHROPIC_API_KEY || "dummy",
}).withStructuredOutput(FeedbackSchema);
const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  temperature: 0,
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || "dummy",
}).withStructuredOutput(FeedbackSchema);

async function fetchAsBase64(url: string) {
  if (url.startsWith("data:")) return url;
  const res = await fetch(url);
  const arrayBuffer = await res.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const mimeType = res.headers.get("content-type") || "image/jpeg";
  return `data:${mimeType};base64,${buffer.toString("base64")}`;
}

async function formatInputMessage(
  messages: BaseMessage[],
  imageUrls: string[],
) {
  const latestHumanMsg = messages.findLast((m) => m._getType() === "human");
  if (!latestHumanMsg) throw new Error("No human message found");

  const textContent =
    typeof latestHumanMsg.content === "string"
      ? latestHumanMsg.content
      : "Please evaluate these UI screens.";

  const contentArray: any[] = [{ type: "text", text: textContent }];

  for (const url of imageUrls) {
    const base64Url = await fetchAsBase64(url);
    contentArray.push({
      type: "image_url",
      image_url: { url: base64Url },
    });
  }

  return [
    new SystemMessage(systemPrompt),
    new HumanMessage({ content: contentArray }),
  ];
}

async function openaiNode(state: typeof AgentState.State) {
  try {
    const formattedMessages = await formatInputMessage(
      state.messages,
      state.imageUrls || [],
    );
    // Override the generic 300-word prompt for OpenAI specifically
    const openaiPrompt = systemPrompt.replace(
      "under 300 words",
      "under 600 words",
    );
    formattedMessages[0] = new SystemMessage(openaiPrompt);

    const response = await openaiModel.invoke(formattedMessages);
    return { openaiFeedback: response };
  } catch (e) {
    console.error("OpenAI failed:", e);
    return { openaiFeedback: null };
  }
}

async function formatInputMessageForClaude(
  messages: BaseMessage[],
  imageUrls: string[],
) {
  const latestHumanMsg = messages.findLast((m) => m._getType() === "human");
  if (!latestHumanMsg) throw new Error("No human message found");

  const textContent =
    typeof latestHumanMsg.content === "string"
      ? latestHumanMsg.content
      : "Please evaluate these UI screens.";

  const contentArray: any[] = [{ type: "text", text: textContent }];

  for (const url of imageUrls) {
    const base64Url = await fetchAsBase64(url);
    // Claude/Anthropic has a strict 5MB limit on the payload size.
    // We omit the image from Claude's prompt if the base64 string exceeds 4.5MB to avoid API/Node crashes.
    if (base64Url.length > 4.5 * 1024 * 1024) {
      console.warn(
        "Image too large for Claude API limits, omitting from prompt.",
      );
      continue;
    }
    contentArray.push({
      type: "image_url",
      image_url: { url: base64Url },
    });
  }

  return [
    new SystemMessage(systemPrompt),
    new HumanMessage({ content: contentArray }),
  ];
}

async function claudeNode(state: typeof AgentState.State) {
  try {
    const formattedMessages = await formatInputMessageForClaude(
      state.messages,
      state.imageUrls || [],
    );
    const response = await claudeModel.invoke(formattedMessages);
    return { claudeFeedback: response };
  } catch (e) {
    console.error("Claude failed:", e);
    return { claudeFeedback: null };
  }
}

async function geminiNode(state: typeof AgentState.State) {
  try {
    const formattedMessages = await formatInputMessage(
      state.messages,
      state.imageUrls || [],
    );
    const response = await geminiModel.invoke(formattedMessages);
    return { geminiFeedback: response };
  } catch (e) {
    console.error("Gemini failed:", e);
    return { geminiFeedback: null };
  }
}

async function aggregatorNode(state: typeof AgentState.State) {
  const finalFeedback: MultiAgentFeedback = {
    openai: state.openaiFeedback || undefined,
    claude: state.claudeFeedback || undefined,
    gemini: state.geminiFeedback || undefined,
  };
  return { finalFeedback };
}
export const feedbackGraph = new StateGraph(AgentState)
  .addNode("openai", openaiNode)
  .addNode("claude", claudeNode)
  .addNode("gemini", geminiNode)
  .addNode("aggregator", aggregatorNode)
  .addEdge("__start__", "openai")
  .addEdge("__start__", "claude")
  .addEdge("__start__", "gemini")
  .addEdge("openai", "aggregator")
  .addEdge("claude", "aggregator")
  .addEdge("gemini", "aggregator")
  .addEdge("aggregator", "__end__")
  .compile();

export async function runFeedbackGraph(input: {
  text: string;
  imageUrls: string[];
  threadId?: string;
}): Promise<MultiAgentFeedback> {
  const result = await feedbackGraph.invoke(
    {
      messages: [new HumanMessage({ content: input.text })],
      imageUrls: input.imageUrls,
    },
    {
      configurable: { thread_id: input.threadId },
    },
  );

  return result.finalFeedback as MultiAgentFeedback;
}
