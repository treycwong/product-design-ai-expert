-- Create threads table
CREATE TABLE threads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create messages table
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id UUID NOT NULL REFERENCES threads(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  user_content TEXT,
  image_urls TEXT[],
  multi_agent_feedback JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Disable RLS (or you can leave them open) since no auth is in scope
ALTER TABLE threads DISABLE ROW LEVEL SECURITY;
ALTER TABLE messages DISABLE ROW LEVEL SECURITY;

-- Create ui_flows storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('ui_flows', 'ui_flows', true);

-- Provide open public policies for storage if needed (optional since public bucket allows reads, but we need uploads)
CREATE POLICY "Public Access" ON storage.objects FOR ALL USING (bucket_id = 'ui_flows') WITH CHECK (bucket_id = 'ui_flows');
