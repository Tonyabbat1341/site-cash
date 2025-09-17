-- MyAI Dev Studio Database Schema
-- Supabase SQL Schema

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'pro', 'enterprise')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects table
CREATE TABLE public.projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Workflows table
CREATE TABLE public.workflows (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  nodes JSONB NOT NULL DEFAULT '[]'::jsonb,
  connections JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- API Keys table (encrypted)
CREATE TABLE public.api_keys (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  provider TEXT NOT NULL CHECK (provider IN ('openai', 'anthropic', 'google')),
  key_encrypted TEXT NOT NULL, -- Encrypted API key
  name TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Agent Usage tracking
CREATE TABLE public.agent_usage (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  agent_type TEXT NOT NULL CHECK (agent_type IN ('frontend-pro', 'backend-pro', 'debugger', 'automatiser', 'architecte')),
  usage_count INTEGER DEFAULT 0,
  month_year TEXT NOT NULL, -- Format: YYYY-MM
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, agent_type, month_year)
);

-- Stripe customers
CREATE TABLE public.stripe_customers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  stripe_customer_id TEXT UNIQUE NOT NULL,
  subscription_id TEXT,
  subscription_status TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Deployed sites
CREATE TABLE public.deployed_sites (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  domain TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'deploying' CHECK (status IN ('deploying', 'deployed', 'failed')),
  deployment_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX idx_projects_user_id ON public.projects(user_id);
CREATE INDEX idx_workflows_project_id ON public.workflows(project_id);
CREATE INDEX idx_api_keys_user_id ON public.api_keys(user_id);
CREATE INDEX idx_agent_usage_user_id ON public.agent_usage(user_id);
CREATE INDEX idx_agent_usage_month_year ON public.agent_usage(month_year);
CREATE INDEX idx_stripe_customers_user_id ON public.stripe_customers(user_id);
CREATE INDEX idx_deployed_sites_project_id ON public.deployed_sites(project_id);

-- Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stripe_customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deployed_sites ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Users can only see their own data
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- Projects policies
CREATE POLICY "Users can view own projects" ON public.projects
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own projects" ON public.projects
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own projects" ON public.projects
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own projects" ON public.projects
  FOR DELETE USING (auth.uid() = user_id);

-- Workflows policies
CREATE POLICY "Users can view own workflows" ON public.workflows
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.projects 
      WHERE projects.id = workflows.project_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create own workflows" ON public.workflows
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.projects 
      WHERE projects.id = workflows.project_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own workflows" ON public.workflows
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.projects 
      WHERE projects.id = workflows.project_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete own workflows" ON public.workflows
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.projects 
      WHERE projects.id = workflows.project_id 
      AND projects.user_id = auth.uid()
    )
  );

-- API Keys policies
CREATE POLICY "Users can view own api keys" ON public.api_keys
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own api keys" ON public.api_keys
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own api keys" ON public.api_keys
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own api keys" ON public.api_keys
  FOR DELETE USING (auth.uid() = user_id);

-- Agent Usage policies
CREATE POLICY "Users can view own agent usage" ON public.agent_usage
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own agent usage" ON public.agent_usage
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own agent usage" ON public.agent_usage
  FOR UPDATE USING (auth.uid() = user_id);

-- Stripe customers policies
CREATE POLICY "Users can view own stripe data" ON public.stripe_customers
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own stripe data" ON public.stripe_customers
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own stripe data" ON public.stripe_customers
  FOR UPDATE USING (auth.uid() = user_id);

-- Deployed sites policies
CREATE POLICY "Users can view own deployed sites" ON public.deployed_sites
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.projects 
      WHERE projects.id = deployed_sites.project_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create own deployed sites" ON public.deployed_sites
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.projects 
      WHERE projects.id = deployed_sites.project_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own deployed sites" ON public.deployed_sites
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.projects 
      WHERE projects.id = deployed_sites.project_id 
      AND projects.user_id = auth.uid()
    )
  );

-- Functions
-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_workflows_updated_at BEFORE UPDATE ON public.workflows
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_stripe_customers_updated_at BEFORE UPDATE ON public.stripe_customers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_deployed_sites_updated_at BEFORE UPDATE ON public.deployed_sites
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to get user subscription limits
CREATE OR REPLACE FUNCTION get_user_limits(user_uuid UUID)
RETURNS TABLE (
  agent_limit INTEGER,
  project_limit INTEGER,
  workflow_limit INTEGER
) AS $$
DECLARE
  user_tier TEXT;
BEGIN
  SELECT subscription_tier INTO user_tier FROM public.users WHERE id = user_uuid;
  
  RETURN QUERY SELECT
    CASE user_tier
      WHEN 'free' THEN 5
      WHEN 'pro' THEN 100
      WHEN 'enterprise' THEN -1
      ELSE 5
    END as agent_limit,
    CASE user_tier
      WHEN 'free' THEN 3
      WHEN 'pro' THEN -1
      WHEN 'enterprise' THEN -1
      ELSE 3
    END as project_limit,
    CASE user_tier
      WHEN 'free' THEN 1
      WHEN 'pro' THEN 25
      WHEN 'enterprise' THEN -1
      ELSE 1
    END as workflow_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user can use agent
CREATE OR REPLACE FUNCTION can_use_agent(user_uuid UUID, agent_type TEXT)
RETURNS BOOLEAN AS $$
DECLARE
  user_tier TEXT;
  current_usage INTEGER;
  agent_limit INTEGER;
BEGIN
  SELECT subscription_tier INTO user_tier FROM public.users WHERE id = user_uuid;
  
  -- Get current month usage
  SELECT COALESCE(usage_count, 0) INTO current_usage 
  FROM public.agent_usage 
  WHERE user_id = user_uuid 
  AND agent_type = can_use_agent.agent_type 
  AND month_year = TO_CHAR(NOW(), 'YYYY-MM');
  
  -- Get limit based on tier
  agent_limit := CASE user_tier
    WHEN 'free' THEN 5
    WHEN 'pro' THEN 100
    WHEN 'enterprise' THEN -1
    ELSE 5
  END;
  
  -- Return true if unlimited or under limit
  RETURN agent_limit = -1 OR current_usage < agent_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;