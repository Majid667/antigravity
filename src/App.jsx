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

function App() {
  const [view, setView] = useState('home');
  const [showProcessor, setShowProcessor] = useState(false);
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

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

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const renderView = (onStart) => {
    switch (view) {
      case 'about': return <About />;
      case 'disclaimer': return <Disclaimer />;
      case 'terms': return <Terms />;
      case 'privacy': return <Privacy />;
      case 'contact': return <Contact />;
      default: return (
        <>
          <Hero onStart={onStart} />
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
      />
      <main>
        {renderView(handleStartForFree)}
      </main>
      <Footer setView={setView} />
      {showProcessor && <VideoProcessor onClose={() => setShowProcessor(false)} />}
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} onAuth={setUser} />}
    </div>
  )
}

export default App
