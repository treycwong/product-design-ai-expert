// @/lib/report/pdf-generator.ts
// Pure client-side utility — only import this from 'use client' components

import type { AuditReport } from "@/lib/supabase/database.types";

const SECTION_LABELS: Record<string, string> = {
  visual_design: "Visual Design",
  usability: "Usability",
  accessibility: "Accessibility",
  information_architecture: "Information Architecture",
  interaction_design: "Interaction Design",
};

const SEVERITY_ORDER = ["critical", "major", "minor", "suggestion"];

function scoreColor(score: number): [number, number, number] {
  if (score >= 75) return [14, 159, 110]; // green
  if (score >= 50) return [245, 158, 11]; // amber
  return [224, 36, 36]; // red
}

function scoreLabel(score: number): string {
  if (score >= 80) return "Excellent";
  if (score >= 65) return "Good";
  if (score >= 50) return "Fair";
  if (score >= 35) return "Poor";
  return "Critical";
}

export async function generateAndDownloadPDF(
  report: AuditReport,
  productContext: string,
): Promise<void> {
  // Dynamic import to avoid SSR issues
  const jsPDFModule = (await import("jspdf")) as any;
  const jsPDF = jsPDFModule.default || jsPDFModule.jsPDF;
  const autoTableModule = (await import("jspdf-autotable")) as any;
  const autoTable = autoTableModule.default || autoTableModule;

  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentW = pageWidth - margin * 2;
  let y = margin;

  const COLORS = {
    primary: [26, 86, 219] as [number, number, number],
    dark: [17, 25, 40] as [number, number, number],
    mid: [55, 65, 81] as [number, number, number],
    muted: [107, 114, 128] as [number, number, number],
    light: [249, 250, 251] as [number, number, number],
    border: [229, 231, 235] as [number, number, number],
    white: [255, 255, 255] as [number, number, number],
    green: [14, 159, 110] as [number, number, number],
    red: [224, 36, 36] as [number, number, number],
    amber: [217, 119, 6] as [number, number, number],
    blue: [59, 130, 246] as [number, number, number],
  };

  function addPage() {
    doc.addPage();
    y = margin;
    // Page header line
    doc.setDrawColor(...COLORS.border);
    doc.setLineWidth(0.3);
    doc.line(margin, 10, pageWidth - margin, 10);
    doc.setFontSize(8);
    doc.setTextColor(...COLORS.muted);
    doc.text("UX/UI Audit Report", margin, 8);
    doc.text(
      `Page ${(doc as any).getCurrentPageInfo().pageNumber}`,
      pageWidth - margin,
      8,
      { align: "right" },
    );
    y = 18;
  }

  function checkPageBreak(needed: number) {
    if (y + needed > pageHeight - margin) addPage();
  }

  function drawHRule(color?: [number, number, number]) {
    doc.setDrawColor(...(color || COLORS.border));
    doc.setLineWidth(0.3);
    doc.line(margin, y, pageWidth - margin, y);
    y += 4;
  }

  // ── COVER PAGE ────────────────────────────────────────────────────────────

  // Blue header band
  doc.setFillColor(...COLORS.primary);
  doc.rect(0, 0, pageWidth, 60, "F");

  // Logo area
  doc.setFontSize(10);
  doc.setTextColor(...COLORS.white);
  doc.setFont("helvetica", "bold");
  doc.text("AI-Powered UX/UI Audit", margin, 20);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text("Multi-Agent Heuristic Evaluation", margin, 27);

  // Report title
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...COLORS.white);
  doc.text("UX/UI Audit Report", margin, 48);

  y = 75;

  // Overall score box
  const [scoreR, scoreG, scoreB] = scoreColor(report.overall_score);
  doc.setFillColor(scoreR, scoreG, scoreB);
  doc.roundedRect(margin, y, 50, 28, 3, 3, "F");
  doc.setFontSize(28);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...COLORS.white);
  doc.text(String(report.overall_score), margin + 25, y + 17, {
    align: "center",
  });
  doc.setFontSize(8);
  doc.text("Overall Score", margin + 25, y + 24, { align: "center" });

  // Score label
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(scoreR, scoreG, scoreB);
  doc.text(scoreLabel(report.overall_score), margin + 58, y + 10);

  // Generated date
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...COLORS.muted);
  doc.text(
    `Generated: ${new Date(report.generated_at).toLocaleString()}`,
    margin + 58,
    y + 18,
  );
  doc.text(`Methodology: ${report.methodology}`, margin + 58, y + 25, {
    maxWidth: contentW - 58,
  });

  y += 40;
  drawHRule();

  // Product context
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...COLORS.dark);
  doc.text("Product Context", margin, y);
  y += 5;
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...COLORS.mid);
  const contextLines = doc.splitTextToSize(
    report.product_context || productContext,
    contentW,
  );
  doc.text(contextLines, margin, y);
  y += contextLines.length * 4.5 + 6;
  drawHRule();

  // Executive summary
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...COLORS.dark);
  doc.text("Executive Summary", margin, y);
  y += 5;
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...COLORS.mid);
  const summaryLines = doc.splitTextToSize(report.executive_summary, contentW);
  doc.text(summaryLines, margin, y);
  y += summaryLines.length * 4.5 + 6;
  drawHRule();

  // Section scores mini-table
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...COLORS.dark);
  doc.text("Section Scores", margin, y);
  y += 5;

  const scoreTableData = Object.entries(report.sections).map(
    ([key, section]) => {
      const [r, g, b] = scoreColor(section.score);
      return [
        SECTION_LABELS[key],
        `${section.score}/100`,
        scoreLabel(section.score),
      ];
    },
  );

  autoTable(doc, {
    startY: y,
    head: [["Section", "Score", "Rating"]],
    body: scoreTableData,
    margin: { left: margin, right: margin },
    styles: { fontSize: 9, cellPadding: 3, font: "helvetica" },
    headStyles: {
      fillColor: COLORS.primary,
      textColor: COLORS.white,
      fontStyle: "bold",
    },
    alternateRowStyles: { fillColor: COLORS.light },
    columnStyles: {
      0: { cellWidth: contentW * 0.55 },
      1: { cellWidth: contentW * 0.2, halign: "center" },
      2: { cellWidth: contentW * 0.25, halign: "center" },
    },
  });
  y = (doc as any).lastAutoTable.finalY + 8;

  // ── PAGE 2+: DETAILED SECTIONS ────────────────────────────────────────────
  addPage();

  // Consensus section
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...COLORS.primary);
  doc.text("Consensus Analysis", margin, y);
  y += 7;
  drawHRule(COLORS.primary);

  // Wins
  doc.setFillColor(240, 253, 244);
  doc.roundedRect(
    margin,
    y,
    contentW / 2 - 2,
    6 + report.consensus_wins.length * 5 + 4,
    2,
    2,
    "F",
  );
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...COLORS.green);
  doc.text("✓ All Agents: Wins", margin + 3, y + 4.5);
  y += 7;
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...COLORS.mid);
  report.consensus_wins.forEach((win) => {
    const lines = doc.splitTextToSize(`• ${win}`, contentW / 2 - 8);
    doc.text(lines, margin + 3, y);
    y += lines.length * 4.5;
  });
  y += 6;

  // Issues (same y level as wins — this approach is sequential, fine for a linear doc)
  checkPageBreak(report.consensus_issues.length * 5 + 14);
  doc.setFillColor(254, 242, 242);
  doc.roundedRect(
    margin,
    y,
    contentW / 2 - 2,
    6 + report.consensus_issues.length * 5 + 4,
    2,
    2,
    "F",
  );
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...COLORS.red);
  doc.text("✗ All Agents: Issues", margin + 3, y + 4.5);
  y += 7;
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...COLORS.mid);
  report.consensus_issues.forEach((issue) => {
    const lines = doc.splitTextToSize(`• ${issue}`, contentW / 2 - 8);
    doc.text(lines, margin + 3, y);
    y += lines.length * 4.5;
  });
  y += 10;

  // Section details
  Object.entries(report.sections).forEach(([key, section]) => {
    checkPageBreak(30);

    // Section heading
    const [r, g, b] = scoreColor(section.score);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...COLORS.dark);
    doc.text(SECTION_LABELS[key], margin, y);
    doc.setFontSize(12);
    doc.setTextColor(r, g, b);
    doc.text(
      `${section.score}/100  ${scoreLabel(section.score)}`,
      pageWidth - margin,
      y,
      { align: "right" },
    );
    y += 5;
    drawHRule();

    // Summary
    doc.setFontSize(9);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(...COLORS.mid);
    const sumLines = doc.splitTextToSize(section.summary, contentW);
    checkPageBreak(sumLines.length * 4.5 + 4);
    doc.text(sumLines, margin, y);
    y += sumLines.length * 4.5 + 4;

    // Findings
    if (section.key_findings.length > 0) {
      const findingData = [...section.key_findings]
        .sort(
          (a, b) =>
            SEVERITY_ORDER.indexOf(a.severity) -
            SEVERITY_ORDER.indexOf(b.severity),
        )
        .map((f) => [
          f.severity.toUpperCase(),
          f.finding,
          f.recommendation,
          f.consensus === "all_three"
            ? "3/3"
            : f.consensus === "two_of_three"
              ? "2/3"
              : "1/3",
        ]);

      autoTable(doc, {
        startY: y,
        head: [["Severity", "Finding", "Recommendation", "Agents"]],
        body: findingData,
        margin: { left: margin, right: margin },
        styles: {
          fontSize: 8,
          cellPadding: 3,
          font: "helvetica",
          valign: "top",
        },
        headStyles: {
          fillColor: COLORS.dark,
          textColor: COLORS.white,
          fontStyle: "bold",
        },
        alternateRowStyles: { fillColor: COLORS.light },
        columnStyles: {
          0: { cellWidth: 20, halign: "center", fontStyle: "bold" },
          1: { cellWidth: contentW * 0.38 },
          2: { cellWidth: contentW * 0.38 },
          3: { cellWidth: 14, halign: "center" },
        },
        didParseCell: (data: any) => {
          if (data.column.index === 0 && data.section === "body") {
            const sev = String(data.cell.raw).toLowerCase();
            const colors: Record<string, [number, number, number]> = {
              critical: COLORS.red,
              major: COLORS.amber,
              minor: [234, 179, 8],
              suggestion: COLORS.blue,
            };
            if (colors[sev]) data.cell.styles.textColor = colors[sev];
          }
        },
      });
      y = (doc as any).lastAutoTable.finalY + 8;
    }
  });

  // ── Priority Action Plan ──────────────────────────────────────────────────
  checkPageBreak(40);
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...COLORS.primary);
  doc.text("Priority Action Plan", margin, y);
  y += 7;
  drawHRule(COLORS.primary);

  const actionData: string[][] = [];
  report.priority_action_plan.immediate.forEach((item) =>
    actionData.push(["IMMEDIATE", item]),
  );
  report.priority_action_plan.short_term.forEach((item) =>
    actionData.push(["30 DAYS", item]),
  );
  report.priority_action_plan.long_term.forEach((item) =>
    actionData.push(["ROADMAP", item]),
  );

  autoTable(doc, {
    startY: y,
    head: [["Timeline", "Action"]],
    body: actionData,
    margin: { left: margin, right: margin },
    styles: { fontSize: 9, cellPadding: 3, font: "helvetica", valign: "top" },
    headStyles: {
      fillColor: COLORS.primary,
      textColor: COLORS.white,
      fontStyle: "bold",
    },
    alternateRowStyles: { fillColor: COLORS.light },
    columnStyles: {
      0: { cellWidth: 28, halign: "center", fontStyle: "bold" },
      1: { cellWidth: contentW - 28 },
    },
    didParseCell: (data: any) => {
      if (data.column.index === 0 && data.section === "body") {
        const timeline = String(data.cell.raw);
        if (timeline === "IMMEDIATE") data.cell.styles.textColor = COLORS.red;
        else if (timeline === "30 DAYS")
          data.cell.styles.textColor = COLORS.amber;
        else data.cell.styles.textColor = COLORS.blue;
      }
    },
  });
  y = (doc as any).lastAutoTable.finalY + 8;

  // ── Conflicting Opinions ──────────────────────────────────────────────────
  if (report.conflicting_opinions.length > 0) {
    checkPageBreak(20);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...COLORS.dark);
    doc.text("Agent Disagreements", margin, y);
    y += 6;
    drawHRule();
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...COLORS.mid);
    report.conflicting_opinions.forEach((opinion) => {
      const lines = doc.splitTextToSize(`• ${opinion}`, contentW);
      checkPageBreak(lines.length * 4.5 + 2);
      doc.text(lines, margin, y);
      y += lines.length * 4.5 + 2;
    });
    y += 6;
  }

  // ── Footer on last page ───────────────────────────────────────────────────
  checkPageBreak(16);
  drawHRule();
  doc.setFontSize(8);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(...COLORS.muted);
  doc.text(
    "This report was generated by a multi-agent AI system (GPT-4o + Claude + Gemini) and synthesized by a Supervisor Agent. " +
      "It is intended as a starting point for design discussion, not a replacement for user research.",
    margin,
    y,
    { maxWidth: contentW },
  );

  // ── Save ──────────────────────────────────────────────────────────────────
  const dateStr = new Date().toISOString().split("T")[0];
  doc.save(`ux-audit-report-${dateStr}.pdf`);
}

export async function generateConcisePDF(
  feedback: any,
  productContext: string,
): Promise<void> {
  const jsPDFModule = (await import("jspdf")) as any;
  const jsPDF = jsPDFModule.default || jsPDFModule.jsPDF;

  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentW = pageWidth - margin * 2;
  let y = margin;

  const COLORS = {
    primary: [26, 86, 219] as [number, number, number],
    dark: [17, 25, 40] as [number, number, number],
    mid: [55, 65, 81] as [number, number, number],
    muted: [107, 114, 128] as [number, number, number],
    light: [249, 250, 251] as [number, number, number],
    border: [229, 231, 235] as [number, number, number],
    white: [255, 255, 255] as [number, number, number],
  };

  function addPage() {
    doc.addPage();
    y = margin;
    doc.setDrawColor(...COLORS.border);
    doc.setLineWidth(0.3);
    doc.line(margin, 10, pageWidth - margin, 10);
    doc.setFontSize(8);
    doc.setTextColor(...COLORS.muted);
    doc.text("Multi-Agent UX/UI Feedback Report", margin, 8);
    doc.text(
      `Page ${(doc as any).getCurrentPageInfo().pageNumber}`,
      pageWidth - margin,
      8,
      { align: "right" },
    );
    y = 18;
  }

  function checkPageBreak(needed: number) {
    if (y + needed > pageHeight - margin) addPage();
  }

  // Cover / Header
  doc.setFillColor(...COLORS.primary);
  doc.rect(0, 0, pageWidth, 40, "F");

  doc.setFontSize(10);
  doc.setTextColor(...COLORS.white);
  doc.setFont("helvetica", "bold");
  doc.text("AI-Powered UX/UI Audit", margin, 15);
  doc.setFontSize(24);
  doc.text("Feedback Report", margin, 32);

  y = 50;

  // Context
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...COLORS.dark);
  doc.text("Product Context", margin, y);
  y += 6;
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...COLORS.mid);
  const contextLines = doc.splitTextToSize(
    productContext || "Context not provided.",
    contentW,
  );
  doc.text(contextLines, margin, y);
  y += contextLines.length * 4.5 + 10;

  type AgentKey = "openai" | "claude" | "gemini";
  const agents: { key: AgentKey; name: string }[] = [
    { key: "openai", name: "OpenAI Evaluation" },
    { key: "claude", name: "Anthropic Claude Evaluation" },
    { key: "gemini", name: "Google Gemini Evaluation" },
  ];

  agents.forEach((agent) => {
    checkPageBreak(40);
    const data = feedback[agent.key];
    if (!data || data.error) return;

    // Agent Header
    doc.setDrawColor(...COLORS.primary);
    doc.setLineWidth(1);
    doc.line(margin, y, margin, y + 6);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...COLORS.primary);
    doc.text(agent.name, margin + 3, y + 5);
    y += 12;

    const sections = [
      { title: "Pros", items: data.pros },
      { title: "Friction Points", items: data.friction_points },
      { title: "Accessibility Issues", items: data.accessibility_issues },
      { title: "Recommendations", items: data.recommendations },
    ];

    sections.forEach((sec) => {
      if (!sec.items || sec.items.length === 0) return;
      checkPageBreak(15);
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...COLORS.dark);
      doc.text(sec.title, margin + 2, y);
      y += 5;

      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...COLORS.mid);
      sec.items.forEach((item: string) => {
        const textLines = doc.splitTextToSize(`• ${item}`, contentW - 4);
        checkPageBreak(textLines.length * 4.5 + 2);
        doc.text(textLines, margin + 4, y);
        y += textLines.length * 4.5 + 1.5;
      });
      y += 4;
    });

    y += 10;
  });

  const dateStr = new Date().toISOString().split("T")[0];
  doc.save(`ux-feedback-report-${dateStr}.pdf`);
}
