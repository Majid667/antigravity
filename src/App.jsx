import { useState, useEffect } from 'react'
import './App.css'
import { supabase } from './lib/supabase'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Pricing from './components/Pricing'
import Footer from './components/Footer'
import About from './components/About'
import Disclaimer from './components/Disclaimer'
import Terms from './components/Terms'
import Contact from './components/Contact'
import Privacy from './components/Privacy'
import VideoProcessor from './components/VideoProcessor'
import Testimonials from './components/Testimonials'
import EditorMockup from './components/EditorMockup'
import FAQ from './components/FAQ'
import AuthModal from './components/AuthModal'
import DemoVideoModal from './components/DemoVideoModal'
import AuthCallback from './components/AuthCallback'

function App() {
  const [view, setView] = useState('home');
  const [showProcessor, setShowProcessor] = useState(false);
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [showDemoVideo, setShowDemoVideo] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  // Detect if we're on the auth callback page and set view accordingly
  useEffect(() => {
    const path = window.location.pathname;
    console.log("[v0] Current path:", path);
    if (path.includes('/auth/callback') || path.includes('auth/callback')) {
      console.log("[v0] Detected auth callback path, setting view");
      setView('auth-callback');
    }
  }, []);

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const handleStartForFree = () => {
    setView('home');
    setShowProcessor(true);
  };

  const handleWatchDemo = () => {
    setShowDemoVideo(true);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const renderView = (onStart) => {
    switch (view) {
      case 'auth-callback': return <AuthCallback onAuthComplete={(success, userData) => {
        if (success && userData) {
          setUser(userData);
          setShowAuth(false);
        }
      }} />;
      case 'about': return <About />;
      case 'disclaimer': return <Disclaimer />;
      case 'terms': return <Terms />;
      case 'privacy': return <Privacy />;
      case 'contact': return <Contact />;
      default: return (
        <>
          <Hero onStart={onStart} onWatchDemo={handleWatchDemo} />
          <EditorMockup />
          <Testimonials />
          <Features />
          <Pricing />
          <FAQ />
        </>
      );
    }
  }

  return (
    <div className="app">
      <Navbar
        setView={setView}
        onStart={handleStartForFree}
        user={user}
        onSignIn={() => setShowAuth(true)}
        onSignOut={handleSignOut}
        theme={theme}
        toggleTheme={toggleTheme}
        onWatchDemo={handleWatchDemo}
      />
      <main>
        {renderView(handleStartForFree)}
      </main>
      <Footer setView={setView} />
      {showProcessor && <VideoProcessor onClose={() => setShowProcessor(false)} />}
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} onAuth={setUser} />}
      {showDemoVideo && <DemoVideoModal onClose={() => setShowDemoVideo(false)} />}
    </div>
  )
}

export default App
