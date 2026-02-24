-- Opus Clip Database Schema for Supabase
-- Copy and paste this entire script into your Supabase SQL Editor

-- ============================================
-- 1. USER PROFILES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  subscription_plan TEXT DEFAULT 'free', -- 'free', 'pro', 'enterprise'
  credits_remaining INTEGER DEFAULT 100,
  total_videos_processed INTEGER DEFAULT 0,
  total_clips_generated INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS for user_profiles
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can only see their own profile
CREATE POLICY "Users can view own profile"
  ON public.user_profiles
  FOR SELECT
  USING (auth.uid() = id);

-- RLS Policy: Users can only update their own profile
CREATE POLICY "Users can update own profile"
  ON public.user_profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- RLS Policy: Users can insert their own profile
CREATE POLICY "Users can insert own profile"
  ON public.user_profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);


-- ============================================
-- 2. VIDEOS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT NOT NULL,
  duration_seconds INTEGER,
  file_size_bytes BIGINT,
  status TEXT DEFAULT 'uploaded', -- 'uploaded', 'processing', 'completed', 'failed'
  processing_status TEXT DEFAULT 'pending', -- 'pending', 'in_progress', 'completed', 'failed'
  thumbnail_url TEXT,
  aspect_ratio TEXT DEFAULT '16:9', -- '16:9', '9:16', '1:1'
  language TEXT DEFAULT 'en',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(id)
);

-- Enable RLS for videos
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can only see their own videos
CREATE POLICY "Users can view own videos"
  ON public.videos
  FOR SELECT
  USING (auth.uid() = user_id);

-- RLS Policy: Users can insert their own videos
CREATE POLICY "Users can insert own videos"
  ON public.videos
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policy: Users can update their own videos
CREATE POLICY "Users can update own videos"
  ON public.videos
  FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policy: Users can delete their own videos
CREATE POLICY "Users can delete own videos"
  ON public.videos
  FOR DELETE
  USING (auth.uid() = user_id);


-- ============================================
-- 3. CLIPS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.clips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id UUID NOT NULL REFERENCES public.videos(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  clip_url TEXT,
  thumbnail_url TEXT,
  start_time_seconds FLOAT,
  end_time_seconds FLOAT,
  duration_seconds FLOAT,
  aspect_ratio TEXT DEFAULT '9:16', -- '16:9', '9:16', '1:1'
  has_captions BOOLEAN DEFAULT FALSE,
  caption_language TEXT DEFAULT 'en',
  status TEXT DEFAULT 'generating', -- 'generating', 'completed', 'failed'
  ai_score FLOAT, -- Score from 0-100 for clip quality
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS for clips
ALTER TABLE public.clips ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can only see their own clips
CREATE POLICY "Users can view own clips"
  ON public.clips
  FOR SELECT
  USING (auth.uid() = user_id);

-- RLS Policy: Users can insert their own clips
CREATE POLICY "Users can insert own clips"
  ON public.clips
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policy: Users can update their own clips
CREATE POLICY "Users can update own clips"
  ON public.clips
  FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policy: Users can delete their own clips
CREATE POLICY "Users can delete own clips"
  ON public.clips
  FOR DELETE
  USING (auth.uid() = user_id);


-- ============================================
-- 4. PROCESSING JOBS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.processing_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id UUID NOT NULL REFERENCES public.videos(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  job_type TEXT NOT NULL, -- 'clip_generation', 'reframing', 'captioning', 'enhancement'
  status TEXT DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'failed'
  progress_percentage INTEGER DEFAULT 0,
  error_message TEXT,
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS for processing_jobs
ALTER TABLE public.processing_jobs ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can only see their own jobs
CREATE POLICY "Users can view own processing jobs"
  ON public.processing_jobs
  FOR SELECT
  USING (auth.uid() = user_id);


-- ============================================
-- 5. USER PREFERENCES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.user_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  default_aspect_ratio TEXT DEFAULT '9:16',
  auto_caption BOOLEAN DEFAULT TRUE,
  caption_language TEXT DEFAULT 'en',
  theme TEXT DEFAULT 'dark', -- 'dark', 'light'
  email_notifications BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS for user_preferences
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can only see their own preferences
CREATE POLICY "Users can view own preferences"
  ON public.user_preferences
  FOR SELECT
  USING (auth.uid() = user_id);

-- RLS Policy: Users can update their own preferences
CREATE POLICY "Users can update own preferences"
  ON public.user_preferences
  FOR UPDATE
  USING (auth.uid() = user_id);


-- ============================================
-- 6. ACTIVITY LOG TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  action TEXT NOT NULL, -- 'video_uploaded', 'clip_generated', 'clip_downloaded', 'video_deleted'
  resource_id UUID,
  resource_type TEXT, -- 'video', 'clip'
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS for activity_log
ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can only see their own activity
CREATE POLICY "Users can view own activity"
  ON public.activity_log
  FOR SELECT
  USING (auth.uid() = user_id);


-- ============================================
-- 7. CREATE INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX IF NOT EXISTS idx_videos_user_id ON public.videos(user_id);
CREATE INDEX IF NOT EXISTS idx_videos_status ON public.videos(status);
CREATE INDEX IF NOT EXISTS idx_clips_video_id ON public.clips(video_id);
CREATE INDEX IF NOT EXISTS idx_clips_user_id ON public.clips(user_id);
CREATE INDEX IF NOT EXISTS idx_clips_aspect_ratio ON public.clips(aspect_ratio);
CREATE INDEX IF NOT EXISTS idx_processing_jobs_user_id ON public.processing_jobs(user_id);
CREATE INDEX IF NOT EXISTS idx_processing_jobs_status ON public.processing_jobs(status);
CREATE INDEX IF NOT EXISTS idx_activity_log_user_id ON public.activity_log(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_log_created_at ON public.activity_log(created_at);


-- ============================================
-- 8. TRIGGER: Update user_profiles timestamp
-- ============================================
CREATE OR REPLACE FUNCTION public.update_user_profiles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF NOT EXISTS update_user_profiles_updated_at_trigger ON public.user_profiles;
CREATE TRIGGER update_user_profiles_updated_at_trigger
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_user_profiles_updated_at();


-- ============================================
-- 9. TRIGGER: Update videos timestamp
-- ============================================
CREATE OR REPLACE FUNCTION public.update_videos_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF NOT EXISTS update_videos_updated_at_trigger ON public.videos;
CREATE TRIGGER update_videos_updated_at_trigger
  BEFORE UPDATE ON public.videos
  FOR EACH ROW
  EXECUTE FUNCTION public.update_videos_updated_at();


-- ============================================
-- 10. TRIGGER: Update clips timestamp
-- ============================================
CREATE OR REPLACE FUNCTION public.update_clips_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF NOT EXISTS update_clips_updated_at_trigger ON public.clips;
CREATE TRIGGER update_clips_updated_at_trigger
  BEFORE UPDATE ON public.clips
  FOR EACH ROW
  EXECUTE FUNCTION public.update_clips_updated_at();


-- ============================================
-- SETUP COMPLETE
-- ============================================
-- All tables, RLS policies, indexes, and triggers have been created.
-- Your database is now ready for the Opus Clip application!
