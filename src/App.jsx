import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Rocket, ChevronRight, ChevronLeft, ChevronDown,
  Store, CalendarClock, Briefcase, Palette, Code, 
  Smartphone, Zap, Shield, Star, Users, X, ArrowRight,
  Quote, ExternalLink, Check, VolumeX
} from 'lucide-react';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [websiteCount, setWebsiteCount] = useState(6328);
  const [isMuted, setIsMuted] = useState(true);

  const hasAutoPaused = useRef(false);
  const videoRef = useRef(null);

  // Force programmatic autoplay on load/reload
  useEffect(() => {
    const attemptPlay = async () => {
      if (videoRef.current) {
        try {
          // Attempt to play the video with sound
          await videoRef.current.play();
        } catch (error) {
          console.warn("Browser blocked unmuted autoplay. The user must interact with the document first.", error);
        }
      }
    };
    
    // Slight delay ensures the video element is fully mounted and ready
    const timer = setTimeout(attemptPlay, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleVideoTimeUpdate = (e) => {
    // 63 seconds = 1 minute 3 seconds
    if (!hasAutoPaused.current && e.target.currentTime >= 63) {
      e.target.pause();
      hasAutoPaused.current = true;
    }
  };

  const handleVideoInteraction = () => {
    if (videoRef.current) {
      if (isMuted) {
        // First interaction: Unmute, restart the video, and hide the overlay
        videoRef.current.muted = false;
        videoRef.current.currentTime = 0;
        videoRef.current.play();
        setIsMuted(false);
      } else {
        // Subsequent interactions: standard play/pause toggle
        if (videoRef.current.paused) {
          videoRef.current.play();
        } else {
          videoRef.current.pause();
        }
      }
    }
  };

  // Dynamic counter increment based on time
  useEffect(() => {
    const baseDate = new Date('2024-01-01T00:00:00Z').getTime();
    const now = new Date().getTime();
    const hoursPassed = Math.floor((now - baseDate) / (1000 * 60 * 60));
    setWebsiteCount(6328 + hoursPassed);
  }, []);

  // Handle scroll for floating navbar
  useEffect(() => {
    const handleScroll = () => {
      setShowNav(window.scrollY > 700);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Inject Favicon dynamically and force light mode
  useEffect(() => {
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = 'https://admin.launchmywebsite.agency/wp-content/uploads/2026/06/favicon.webp';
    document.title = "Launch My Website | Premium Custom Web Design";

    let metaColorScheme = document.querySelector("meta[name='color-scheme']");
    if (!metaColorScheme) {
      metaColorScheme = document.createElement('meta');
      metaColorScheme.name = 'color-scheme';
      document.getElementsByTagName('head')[0].appendChild(metaColorScheme);
    }
    metaColorScheme.content = 'light';
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 overflow-x-hidden relative selection:bg-blue-200 selection:text-blue-900" style={{ fontFamily: "'Inter', sans-serif" }}>
      
      <style dangerouslySetInnerHTML={{__html: `
        :root { color-scheme: light !important; }
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Sora:wght@300;400;500;600;700;800&display=swap');
        h1, h2, h3, h4, h5, h6, .title-font { font-family: 'Sora', sans-serif !important; }
        button { font-family: 'Sora', sans-serif !important; }
        
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 50s linear infinite;
          width: max-content;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />

      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden flex justify-center items-center">
        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-blue-100/40 blur-[120px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-indigo-100/40 blur-[120px]"></div>
      </div>

      <div className={`fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 transition-all duration-500 ${showNav ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}>
        <nav className="w-full max-w-6xl transition-all duration-500 rounded-full px-6 py-3 flex justify-between items-center bg-white/80 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="bg-[#001B70] p-2 rounded-full shadow-md">
              <img src="https://admin.launchmywebsite.agency/wp-content/uploads/2026/06/header-logo.webp" alt="Logo" className="h-6 w-auto object-contain" />
            </div>
            <span className="font-extrabold text-slate-900 tracking-tight hidden sm:block title-font">Launch My Website</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#portfolio" className="text-sm font-bold text-slate-500 hover:text-[#0314B0] transition-colors">Portfolio</a>
            <a href="#benefits" className="text-sm font-bold text-slate-500 hover:text-[#0314B0] transition-colors">Benefits</a>
            <a href="#reviews" className="text-sm font-bold text-slate-500 hover:text-[#0314B0] transition-colors">Reviews</a>
          </div>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#0314B0] to-[#001B70] text-white font-bold text-sm hover:shadow-[0_8px_20px_rgba(3,20,176,0.25)] hover:-translate-y-0.5 transition-all"
          >
            Start Project
          </button>
        </nav>
      </div>

      <main className="relative z-10 pt-6 md:pt-8 pb-40">
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-0 pb-20 flex flex-col items-center">
          
          {/* Trust Banner with Leaves */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-4 sm:gap-6 mb-12 relative"
          >
            <img src="https://admin.launchmywebsite.agency/wp-content/uploads/2026/06/golden-leaf-1.png" alt="Leaf" className="w-12 sm:w-16 h-auto object-contain" />
            <div className="text-center flex flex-col items-center">
              <p className="font-bold text-slate-800 text-xs sm:text-sm tracking-wide mb-1 uppercase">Rated #1 out of 2,000+ web agencies</p>
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />)}
                </div>
                <span className="font-extrabold text-slate-800 text-sm sm:text-base">5.0 out of 5</span>
                <span className="text-slate-300 font-bold">|</span>
                <span className="font-bold text-[#f83f3f] text-sm sm:text-base">Clutch</span>
              </div>
            </div>
            <img src="https://admin.launchmywebsite.agency/wp-content/uploads/2026/06/golden-leaf-1.png" alt="Leaf" className="w-12 sm:w-16 h-auto object-contain scale-x-[-1]" />
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-[4.5vw] sm:text-4xl md:text-5xl lg:text-[4.5rem] font-black text-center text-slate-900 leading-[1.1] tracking-tight mb-10 title-font w-full max-w-5xl uppercase"
          >
            Get a professional website for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0314B0] to-blue-500 relative">
              50-60% OFF
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-blue-300 opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="transparent"/>
              </svg>
            </span> agency pricing & jumpstart your business.
          </motion.h1>

          {/* Centered Video */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="w-full relative mb-12 group"
          >
            <div className="absolute -inset-4 bg-gradient-to-b from-black/5 to-transparent rounded-[2.5rem] blur-xl opacity-50 -z-10"></div>
            <div className="relative aspect-video rounded-[2rem] overflow-hidden bg-white shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-white">
              <video 
                ref={videoRef}
                autoPlay 
                muted={isMuted}
                playsInline
                onClick={handleVideoInteraction}
                onTimeUpdate={handleVideoTimeUpdate}
                className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-105 cursor-pointer"
                src="https://admin.launchmywebsite.agency/wp-content/uploads/2026/06/Final-video-LP-1.mp4"
              />
              
              {/* Click to unmute overlay */}
              <AnimatePresence>
                {isMuted && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                    onClick={handleVideoInteraction}
                    className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 z-10 flex items-center gap-2.5 px-4 sm:px-6 py-2.5 sm:py-3 bg-[#121626]/90 backdrop-blur-md rounded-full text-white cursor-pointer hover:bg-[#0314B0] transition-colors border border-white/20 shadow-2xl group/btn"
                  >
                    <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:animate-pulse" />
                    <span className="text-xs sm:text-sm font-extrabold tracking-wide uppercase">Click for Sound</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
          
          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-lg"
          >
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto px-10 py-4 rounded-full bg-gradient-to-r from-[#0314B0] to-[#001B70] text-white font-extrabold text-lg hover:shadow-[0_15px_30px_rgba(3,20,176,0.3)] hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
            >
              <Rocket className="w-5 h-5" /> Let's Launch It
            </button>
            <a href="#portfolio" className="w-full sm:w-auto px-10 py-4 rounded-full bg-white text-slate-800 font-extrabold text-lg shadow-[0_8px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_25px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all flex items-center justify-center border border-slate-100">
              View Portfolio
            </a>
          </motion.div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          <div className="w-full md:w-1/2 relative">
             <div className="absolute -top-8 -left-8 w-24 h-24 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse"></div>
             <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-[#0314B0] rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse" style={{ animationDelay: '2s' }}></div>
             <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Workspace" className="rounded-3xl shadow-2xl relative z-10 w-full object-cover aspect-[4/3]" />
             
             <div className="absolute -top-8 -right-8 z-20 bg-white p-4 rounded-full shadow-xl hidden sm:flex flex-col items-center justify-center w-28 h-28 border border-slate-50">
               <span className="font-black text-[#f83f3f] text-lg tracking-tight mb-0.5">Clutch</span>
               <div className="flex text-yellow-400 mb-0.5">
                 {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-2.5 h-2.5 fill-current" />)}
               </div>
               <span className="text-[10px] font-bold text-slate-500">5.0 out of 5</span>
             </div>
          </div>

          <div className="w-full md:w-1/2 flex flex-col items-start text-left">
            <p className="text-[#0314B0] font-bold tracking-widest uppercase text-sm mb-4">Join {websiteCount.toLocaleString()}+ Entrepreneurs</p>
            <h3 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-8 leading-[1.1] title-font uppercase">
              Who've received a stunning website for 50-60% off.
            </h3>
            
            <div className="space-y-6 text-lg text-slate-600 font-medium mb-10 leading-relaxed">
              <p>With a professional website for your business, potential clients are <span className="font-bold text-slate-900">76% more likely</span> to buy from you.</p>
              <p>That's right. Having a website is absolutely critical to getting people to trust you.</p>
              <p>But hiring a web agency to build your website can run you anywhere from <span className="font-bold text-slate-900 line-through decoration-red-400 decoration-2">£3,000-£30,000</span>.</p>
              <p>That's why we're here. We've helped thousands of entrepreneurs to get a premium, custom website for their business—at <span className="font-bold text-[#0314B0]">50-60% off standard agency pricing</span>.</p>
            </div>

            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-4 rounded-full bg-[#ffb72b] text-slate-900 font-extrabold text-lg shadow-[0_10px_25px_rgba(255,183,43,0.3)] hover:shadow-[0_15px_35px_rgba(255,183,43,0.4)] hover:-translate-y-1 transition-all"
            >
              Apply in 2 minutes
            </button>
          </div>
        </section>

        <section className="bg-white border-y border-slate-100 py-16">
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
            <div className="flex flex-col items-center pt-6 md:pt-0">
              <p className="text-slate-500 font-bold mb-3 text-sm uppercase tracking-wider"># of websites we've built</p>
              <div className="text-4xl md:text-5xl font-black text-slate-900 title-font tracking-tight">{websiteCount.toLocaleString()}</div>
              <div className="h-1 w-16 bg-blue-400 mt-4 rounded-full"></div>
            </div>
            <div className="flex flex-col items-center pt-6 md:pt-0">
              <p className="text-slate-500 font-bold mb-3 text-sm uppercase tracking-wider">Average cost an agency charges</p>
              <div className="text-4xl md:text-5xl font-black text-slate-900 title-font tracking-tight">£3k - £30k</div>
              <div className="h-1 w-16 bg-blue-400 mt-4 rounded-full"></div>
            </div>
            <div className="flex flex-col items-center pt-6 md:pt-0">
              <p className="text-slate-500 font-bold mb-3 text-sm uppercase tracking-wider">Amount we charge</p>
              <div className="text-4xl md:text-5xl font-black text-[#0314B0] title-font tracking-tight">50-60% <span className="text-2xl text-slate-900">OFF</span></div>
              <div className="h-1 w-16 bg-blue-400 mt-4 rounded-full"></div>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-br from-[#0314B0] to-[#001B70] text-white py-24 relative overflow-hidden">
          <div className="absolute -bottom-10 -left-10 w-48 h-48 opacity-20 transform rotate-45">
             <Rocket className="w-full h-full text-white" />
          </div>
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-black mb-8 title-font uppercase tracking-tight leading-tight">
              We're going <span className="text-blue-300">to let you in on a huge secret...</span>
            </h2>
            <p className="text-lg md:text-xl font-medium mb-6 text-blue-100 max-w-2xl mx-auto">
              If you don't have a professional website, your business is more than 80% <span className="underline decoration-yellow-400 font-bold">less</span> likely to succeed.
            </p>
            <p className="text-lg md:text-xl font-medium mb-12 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              A Facebook or Instagram page just isn't going to cut it. On average, businesses without a professional website fail at 8x the normal rate.
            </p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-4 rounded-full bg-[#ffb72b] text-slate-900 font-extrabold text-lg hover:shadow-[0_0_30px_rgba(255,183,43,0.4)] hover:scale-105 transition-all shadow-xl"
            >
              Apply to get your website built by professionals — for 50-60% off!
            </button>
          </div>
        </section>

        <section id="portfolio" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
             <h2 className="text-[#0314B0] font-bold tracking-widest uppercase text-sm mb-3">Our Work</h2>
             <h3 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">Recent Launches</h3>
          </div>

          <motion.div layout className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8 items-start">
            {[
              { title: 'Aura Luxe', cat: 'E-commerce', img: 'https://admin.launchmywebsite.agency/wp-content/uploads/2026/06/Ecom-custom-1.webp', verticalImg: 'https://admin.launchmywebsite.agency/wp-content/uploads/2026/06/Ecom-custom-2.webp' },
              { title: 'Vertex Global', cat: 'Corporate', img: 'https://admin.launchmywebsite.agency/wp-content/uploads/2026/06/premium-corporate-website-2.webp', verticalImg: 'https://admin.launchmywebsite.agency/wp-content/uploads/2026/06/premium-corporate-website-1.webp' },
              { title: 'Flux Creative', cat: 'Agency', img: 'https://admin.launchmywebsite.agency/wp-content/uploads/2026/06/Creative-agency-2.webp', verticalImg: 'https://admin.launchmywebsite.agency/wp-content/uploads/2026/06/Creative-agency-1.webp' },
              { title: 'Elias Croft', cat: 'Portfolio', img: 'https://admin.launchmywebsite.agency/wp-content/uploads/2026/06/photography-portfolio-webiste-1.webp', verticalImg: 'https://admin.launchmywebsite.agency/wp-content/uploads/2026/06/photography-portfolio-webiste-2.webp' },
              { title: 'The Gilded Fork', cat: 'Restaurant', img: 'https://admin.launchmywebsite.agency/wp-content/uploads/2026/06/Restaurent-website-1.webp', verticalImg: 'https://admin.launchmywebsite.agency/wp-content/uploads/2026/06/Restaurent-website-2.webp' },
              { title: 'Haven Collective', cat: 'Booking', img: 'https://admin.launchmywebsite.agency/wp-content/uploads/2026/06/Booking-site-1.webp', verticalImg: 'https://admin.launchmywebsite.agency/wp-content/uploads/2026/06/Booking-site-2.webp' },
              { title: 'Horizon Estates', cat: 'Real Estate', img: 'https://admin.launchmywebsite.agency/wp-content/uploads/2026/06/ChatGPT-12.webp', verticalImg: 'https://admin.launchmywebsite.agency/wp-content/uploads/2026/06/ChatGPT-11.webp' },
              { title: 'Roots Garden Center', cat: 'Local Business', img: 'https://admin.launchmywebsite.agency/wp-content/uploads/2026/06/Local-business-2.webp', verticalImg: 'https://admin.launchmywebsite.agency/wp-content/uploads/2026/06/Local-business-1.webp' },
              { title: 'Velvet Bean', cat: 'Cafe', img: 'https://admin.launchmywebsite.agency/wp-content/uploads/2026/06/Cafe-2.webp', verticalImg: 'https://admin.launchmywebsite.agency/wp-content/uploads/2026/06/Cafe-1.webp' }
            ].map((project, i) => (
              <PortfolioCard 
                key={i} 
                project={project} 
                className={!showAllProjects && i >= 4 ? 'hidden md:flex' : 'flex'}
              />
            ))}
          </motion.div>

          {!showAllProjects && (
            <motion.div layout className="mt-10 flex justify-center md:hidden">
              <button 
                onClick={() => setShowAllProjects(true)}
                className="px-8 py-3.5 rounded-full bg-white text-slate-800 font-extrabold text-sm shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-slate-100 hover:bg-slate-50 transition-all flex items-center gap-2"
              >
                View More Projects <ChevronDown className="w-4 h-4 text-[#0314B0]" />
              </button>
            </motion.div>
          )}
        </section>

        <section id="benefits" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
             <h2 className="text-[#0314B0] font-bold tracking-widest uppercase text-sm mb-3">The Advantage</h2>
             <h3 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-6">Why Launch With Us?</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Smartphone, title: 'Mobile First', desc: 'Flawless experience on every device, guaranteeing zero lost customers on phones.' },
              { icon: Zap, title: 'Lightning Fast', desc: 'Optimized code and assets for millisecond load times. Speed equals revenue.' },
              { icon: Shield, title: 'Secure & Reliable', desc: 'Enterprise-grade security built into every single project from day one.' },
              { icon: Palette, title: 'Bespoke Design', desc: 'Clean, modern UI/UX principles tailored to your specific brand identity.' },
              { icon: Code, title: 'Clean Architecture', desc: 'Built on scalable technology ensuring your site grows as your business does.' },
              { icon: Store, title: 'Conversion Focused', desc: 'Every pixel is designed to turn casual visitors into paying customers.' }
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-[2rem] bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_20px_50px_-10px_rgba(3,20,176,0.1)] transition-all duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#0314B0] transition-all duration-300">
                  <feature.icon className="w-6 h-6 text-[#0314B0] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed font-medium">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="reviews" className="py-24 overflow-hidden bg-white">
          <div className="text-center mb-16 px-4">
            <h2 className="text-[#0314B0] font-bold tracking-widest uppercase text-sm mb-3">Client Success</h2>
            <h3 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">What Our Clients Say</h3>
          </div>

          <div className="relative flex overflow-x-hidden">
            <div className="animate-marquee flex whitespace-nowrap py-4">
              {[...Array(2)].map((_, arrayIndex) => (
                <React.Fragment key={arrayIndex}>
                  {[
                    { name: "Sarah Jenkins", quote: "They took our vague ideas and turned them into a stunning, high-performing website." },
                    { name: "Marcus Thorne", quote: "The process was incredibly smooth. Delivered a product that exceeded all our expectations." },
                    { name: "Elena Rodriguez", quote: "Our online orders doubled within a month. The design is beautiful and easy to use." },
                    { name: "David Chen", quote: "Professional, fast, and exactly what we needed to launch our new brand." },
                    { name: "Rachel Adams", quote: "Best investment we've made. The site pays for itself in new leads." },
                    { name: "James Wilson", quote: "Outstanding communication and a final product that blew us away." },
                    { name: "Olivia Taylor", quote: "They truly understand conversion optimization. Sales are up 40%." },
                    { name: "Michael Brown", quote: "Fast turnaround without sacrificing any quality. Highly recommend." },
                    { name: "Sophia Martinez", quote: "A completely stress-free experience. The team handled everything perfectly." },
                    { name: "William Davis", quote: "Sleek, modern, and fast. Everything we asked for and more." },
                    { name: "Emily White", quote: "Our old site was a mess. They transformed it into a lead-generation machine." },
                    { name: "Alexander Moore", quote: "Top-tier design work. They made our small business look like an enterprise." },
                    { name: "Jessica Taylor", quote: "Incredible attention to detail. We get compliments on our site daily." }
                  ].map((testimonial, i) => (
                    <div key={`${arrayIndex}-${i}`} className="inline-block w-[350px] whitespace-normal bg-white border border-slate-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.04)] p-8 rounded-[2rem] mx-4 relative">
                      <div className="absolute -top-6 left-8 w-12 h-12 rounded-full bg-gradient-to-br from-[#0314B0] to-blue-400 flex items-center justify-center font-bold text-white text-lg shadow-lg border-4 border-white">
                        {testimonial.name.charAt(0)}
                      </div>
                      <Quote className="absolute top-6 right-6 w-6 h-6 text-slate-100" />
                      <div className="mt-6">
                        <div className="flex gap-1 mb-4 text-yellow-400">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="w-4 h-4 fill-current" />
                          ))}
                        </div>
                        <p className="text-slate-600 mb-6 font-medium leading-relaxed min-h-[80px]">"{testimonial.quote}"</p>
                        <h4 className="font-extrabold text-slate-900">{testimonial.name}</h4>
                      </div>
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

      </main>

      <div className="fixed bottom-0 left-0 right-0 z-40 p-4 pointer-events-none flex justify-center pb-6 md:pb-8">
        <motion.button
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, type: "spring", stiffness: 100 }}
          onClick={() => setIsModalOpen(true)}
          className="pointer-events-auto w-full max-w-2xl group relative p-3 sm:p-4 rounded-[2rem] overflow-hidden bg-gradient-to-r from-[#0314B0] via-blue-700 to-[#0314B0] shadow-[0_20px_50px_rgba(3,20,176,0.35)] hover:shadow-[0_25px_60px_rgba(3,20,176,0.5)] transition-all duration-300 transform hover:-translate-y-2 border border-blue-500/30"
        >
          <motion.div
            animate={{ x: ['-200%', '300%'] }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear", repeatDelay: 1.5 }}
            className="absolute inset-0 z-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]"
          />

          <div className="relative z-10 flex items-center justify-between px-4">
            <div className="flex items-center gap-5 text-left">
               <div className="hidden sm:flex w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm text-white items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300 border border-white/20">
                 <Rocket className="w-6 h-6" />
               </div>
               <div>
                 <p className="font-black text-xl md:text-2xl text-white leading-tight tracking-tight title-font">Apply to build your site</p>
                 <p className="text-sm font-bold text-blue-200 mt-0.5">Free strategy call • Under 60 seconds</p>
               </div>
            </div>
            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white group-hover:text-[#0314B0] transition-colors text-white shrink-0 shadow-sm border border-white/20">
               <ArrowRight className="w-6 h-6" />
            </div>
          </div>
        </motion.button>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <ApplicationModal 
            onClose={() => setIsModalOpen(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function ApplicationModal({ onClose }) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rocketStage, setRocketStage] = useState('idle');
  const [shake, setShake] = useState(false);
  const [showOtherFeature, setShowOtherFeature] = useState(false);

  const [formData, setFormData] = useState({
    businessName: '',
    category: '',
    otherCategory: '',
    purpose: [],
    features: [],
    otherFeature: '',
    budget: '',
    firstName: '',
    email: '',
    phone: ''
  });

  const [errors, setErrors] = useState({});

  const updateData = (fields) => {
    setFormData(prev => ({ ...prev, ...fields }));
    const newErrors = { ...errors };
    Object.keys(fields).forEach(key => delete newErrors[key]);
    setErrors(newErrors);
  };

  const triggerErrorShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const validateStep = (currentStep) => {
    let newErrors = {};
    if (currentStep === 1) {
      if (!formData.businessName.trim()) newErrors.businessName = "Business name is required.";
      if (!formData.category) newErrors.category = "Please select an industry.";
      if (formData.category === 'Other' && (!formData.otherCategory || !formData.otherCategory.trim())) {
        newErrors.otherCategory = "Please describe your industry.";
      }
    } else if (currentStep === 2) {
      if (!formData.purpose || formData.purpose.length === 0) newErrors.purpose = "You must select at least one primary goal.";
    } else if (currentStep === 3) {
      if (!formData.budget || !formData.budget.trim()) newErrors.budget = "Please enter your desired budget.";
    } else if (currentStep === 4) {
      if (!formData.firstName.trim()) newErrors.firstName = "First name is strictly required.";
      if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "A valid email is absolutely required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      triggerErrorShake();
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setErrors({});
    setStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    if (validateStep(4)) {
      setIsSubmitting(true);
      
      try {
        let finalFeatures = [...formData.features];
        if (formData.otherFeature && formData.otherFeature.trim() !== '') {
          finalFeatures.push(`Custom: ${formData.otherFeature.trim()}`);
        }

        // Package the form data cleanly
        const submissionPayload = {
          firstName: formData.firstName,
          email: formData.email,
          phone: formData.phone || "Not provided",
          businessName: formData.businessName,
          industry: formData.category === 'Other' ? formData.otherCategory : formData.category,
          primaryGoals: formData.purpose.join(', '),
          desiredFeatures: finalFeatures.length > 0 ? finalFeatures.join(', ') : "None selected",
          budget: formData.budget
        };

        // Send it to your local serverless folder
        const response = await fetch("/api/send-email", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(submissionPayload)
        });

        if (!response.ok) throw new Error("Serverless API failed to send email");

        // Success animation triggers
        setRocketStage('center');
        setStep(5);
        
        setTimeout(() => {
          setRocketStage('launched');
        }, 1200);

      } catch (err) {
        console.error("Submission error:", err);
        // Fallback so the user isn't frozen on screen if the network blips
        setRocketStage('center');
        setStep(5);
        setTimeout(() => setRocketStage('launched'), 1200);
      }
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  const shakeVariants = {
    shake: { x: [-10, 10, -10, 10, -5, 5, 0], transition: { duration: 0.4 } },
    idle: { x: 0 }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
      />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={shake ? "shake" : { opacity: 1, scale: 1, y: 0 }} 
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        variants={shakeVariants}
        className="relative w-full max-w-2xl bg-white rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 bg-white relative z-10 border-b border-slate-50">
          <div className="flex items-center gap-4 h-12">
             {step < 5 && (
               <motion.div 
                 layoutId="hero-rocket"
                 className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0314B0] to-blue-500 flex items-center justify-center shadow-lg relative z-50"
               >
                 <Rocket className="w-6 h-6 text-white" fill="currentColor" />
               </motion.div>
             )}
            
            <AnimatePresence>
              {step < 5 && (
                <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col">
                  <h2 className="text-xl font-black text-slate-900 leading-tight">Project Application</h2>
                  <p className="text-xs text-slate-400 font-bold tracking-wide uppercase">Step {step} of 4</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {step < 5 && (
            <button onClick={onClose} className="text-slate-400 hover:text-slate-800 transition-colors bg-slate-50 p-2 rounded-full hover:bg-slate-100">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {step < 5 && (
          <div className="h-1 w-full bg-slate-100">
            <motion.div 
              className="h-full bg-[#0314B0] rounded-r-full"
              initial={{ width: `${((step - 1) / 4) * 100}%` }}
              animate={{ width: `${(step / 4) * 100}%` }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
          </div>
        )}

        <div className="p-6 sm:p-10 overflow-y-auto flex-1 custom-scrollbar relative z-10 bg-white">
          <AnimatePresence mode="wait">
            
            {/* Step 1 */}
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                <h3 className="text-3xl font-black mb-8 text-slate-900 tracking-tight">Let's start with your business details</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-extrabold text-slate-800 mb-2">Business / Project Name <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      value={formData.businessName}
                      onChange={(e) => updateData({ businessName: e.target.value })}
                      placeholder="e.g. Acme Innovations"
                      className={`w-full bg-slate-50 border-none ${errors.businessName ? 'ring-2 ring-red-400 bg-red-50' : ''} rounded-2xl px-6 py-5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0314B0] transition-all font-bold text-lg`}
                    />
                    {errors.businessName && <p className="text-red-500 text-sm mt-2 font-bold">{errors.businessName}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-extrabold text-slate-800 mb-2">Industry / Category <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <select 
                        value={formData.category}
                        onChange={(e) => {
                          updateData({ category: e.target.value });
                          if (e.target.value !== 'Other') updateData({ otherCategory: '' });
                        }}
                        className={`w-full bg-slate-50 border-none ${errors.category ? 'ring-2 ring-red-400 bg-red-50' : ''} rounded-2xl px-6 py-5 text-slate-900 appearance-none focus:outline-none focus:ring-2 focus:ring-[#0314B0] transition-all font-bold text-lg`}
                      >
                        <option value="" disabled>Select your industry</option>
                        <option value="E-commerce">E-commerce / Retail</option>
                        <option value="Health & Wellness">Health & Wellness</option>
                        <option value="Real Estate">Real Estate</option>
                        <option value="Agency / B2B">Agency / B2B Services</option>
                        <option value="Restaurant / Food">Restaurant / Hospitality</option>
                        <option value="Portfolio / Creative">Portfolio / Creative</option>
                        <option value="Other">Other</option>
                      </select>
                      <div className="absolute inset-y-0 right-6 flex items-center pointer-events-none text-slate-400">
                        <ChevronRight className="w-5 h-5 rotate-90" />
                      </div>
                    </div>
                    {errors.category && <p className="text-red-500 text-sm mt-2 font-bold">{errors.category}</p>}
                  </div>

                  {/* Dynamic 'Other' Text Field */}
                  <AnimatePresence>
                    {formData.category === 'Other' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        className="overflow-hidden"
                      >
                        <label className="block text-sm font-extrabold text-slate-800 mb-2">Describe your industry <span className="text-red-500">*</span></label>
                        <input 
                          type="text" 
                          value={formData.otherCategory}
                          onChange={(e) => updateData({ otherCategory: e.target.value })}
                          placeholder="e.g. Custom 3D Printing"
                          className={`w-full bg-slate-50 border-none ${errors.otherCategory ? 'ring-2 ring-red-400 bg-red-50' : ''} rounded-2xl px-6 py-5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0314B0] transition-all font-bold text-lg`}
                        />
                        {errors.otherCategory && <p className="text-red-500 text-sm mt-2 font-bold">{errors.otherCategory}</p>}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                <h3 className="text-3xl font-black mb-8 text-slate-900 tracking-tight">What is the primary goal? <span className="text-red-500">*</span></h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: 'E-commerce', icon: Store, title: 'Sell Products', desc: 'Full online store with checkout' },
                    { id: 'Booking', icon: CalendarClock, title: 'Book Appointments', desc: 'Service scheduling' },
                    { id: 'Lead Gen', icon: Users, title: 'Generate Leads', desc: 'Capture inquiries' },
                    { id: 'Portfolio', icon: Briefcase, title: 'Showcase Work', desc: 'Display past projects' }
                  ].map((goal) => {
                    const isSelected = formData.purpose?.includes(goal.id);
                    return (
                      <div 
                        key={goal.id}
                        onClick={() => {
                          const newPurposes = isSelected 
                            ? formData.purpose.filter(p => p !== goal.id)
                            : [...(formData.purpose || []), goal.id];
                          updateData({ purpose: newPurposes });
                        }}
                        className={`cursor-pointer p-6 rounded-3xl transition-all duration-300 ${isSelected ? 'bg-[#0314B0] shadow-[0_10px_20px_rgba(3,20,176,0.2)] scale-[1.02]' : 'bg-slate-50 hover:bg-slate-100'}`}
                      >
                        <div className="flex justify-between items-start mb-4">
                           <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isSelected ? 'bg-white/20' : 'bg-white shadow-sm'}`}>
                              <goal.icon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-[#0314B0]'}`} />
                           </div>
                           {isSelected && (
                             <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                               <Check className="w-4 h-4 text-[#0314B0]" strokeWidth={3} />
                             </motion.div>
                           )}
                        </div>
                        <h4 className={`font-extrabold text-lg mb-1 ${isSelected ? 'text-white' : 'text-slate-900'}`}>{goal.title}</h4>
                        <p className={`text-sm font-medium ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>{goal.desc}</p>
                      </div>
                    )
                  })}
                </div>
                {errors.purpose && <p className="text-red-500 text-sm mt-4 text-center font-bold bg-red-50 py-3 rounded-xl">{errors.purpose}</p>}
              </motion.div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                <h3 className="text-3xl font-black mb-8 text-slate-900 tracking-tight">Scope & Budget</h3>
                
                <div className="space-y-8">
                  <div>
                    <label className="block text-sm font-extrabold text-slate-800 mb-4">Select desired addons & features (Optional)</label>
                    <div className="flex flex-wrap gap-3">
                      {[
                        'Payment Gateway', 'Custom Animations', 'Live Chat (WhatsApp/etc)', 
                        'Blog / CMS', 'User Login & Accounts', 'SEO Optimization', 
                        'Multilingual', 'CRM Integration', 'Newsletter Setup', 
                        'Analytics Dashboard', 'Advanced Search', 'Booking System'
                      ].map((feature) => {
                        const isSelected = formData.features?.includes(feature);
                        return (
                          <div 
                            key={feature}
                            onClick={() => {
                              const newFeatures = isSelected 
                                ? formData.features.filter(f => f !== feature)
                                : [...(formData.features || []), feature];
                              updateData({ features: newFeatures });
                            }}
                            className={`cursor-pointer px-4 py-2.5 rounded-2xl text-sm font-bold transition-all duration-300 ${isSelected ? 'bg-[#0314B0] text-white shadow-[0_8px_15px_rgba(3,20,176,0.2)] scale-[1.02]' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                          >
                            {feature}
                          </div>
                        )
                      })}
                      
                      {/* Dynamic 'Add More Features' Button */}
                      <div 
                        onClick={() => setShowOtherFeature(!showOtherFeature)}
                        className={`cursor-pointer px-4 py-2.5 rounded-2xl text-sm font-bold transition-all duration-300 border ${showOtherFeature ? 'bg-[#0314B0] text-white border-[#0314B0] shadow-[0_8px_15px_rgba(3,20,176,0.2)] scale-[1.02]' : 'bg-transparent text-slate-500 border-dashed border-slate-300 hover:bg-slate-50 hover:text-slate-700'}`}
                      >
                        + Add more features
                      </div>
                    </div>
                    
                    {/* Expanding Text Field for Custom Features */}
                    <AnimatePresence>
                      {showOtherFeature && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, marginTop: 0 }}
                          animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                          exit={{ opacity: 0, height: 0, marginTop: 0 }}
                          className="overflow-hidden"
                        >
                          <input 
                            type="text" 
                            value={formData.otherFeature}
                            onChange={(e) => updateData({ otherFeature: e.target.value })}
                            placeholder="e.g. 3D Model Viewer, Interactive Map..."
                            className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0314B0] transition-all font-bold text-sm"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div>
                    <label className="block text-sm font-extrabold text-slate-800 mb-4">Do you have a budget in mind? <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      value={formData.budget}
                      onChange={(e) => {
                        // Extract only digits from the input
                        const numericValue = e.target.value.replace(/\D/g, '');
                        if (numericValue) {
                          // Format with commas and prepend the Pound sign
                          updateData({ budget: '£' + parseInt(numericValue, 10).toLocaleString('en-GB') });
                        } else {
                          // If empty, clear the field entirely
                          updateData({ budget: '' });
                        }
                      }}
                      placeholder="e.g. £1,500"
                      className={`w-full bg-slate-50 border-none ${errors.budget ? 'ring-2 ring-red-400 bg-red-50' : ''} rounded-2xl px-6 py-5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0314B0] transition-all font-bold text-lg`}
                    />
                    {errors.budget && <p className="text-red-500 text-sm mt-2 font-bold">{errors.budget}</p>}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4 */}
            {step === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                <h3 className="text-3xl font-black mb-8 text-slate-900 tracking-tight">How can we reach you?</h3>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-extrabold text-slate-800 mb-2">Your Name <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      value={formData.firstName}
                      onChange={(e) => updateData({ firstName: e.target.value })}
                      placeholder="John Doe"
                      className={`w-full bg-slate-50 border-none ${errors.firstName ? 'ring-2 ring-red-400 bg-red-50' : ''} rounded-2xl px-6 py-5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0314B0] transition-all font-bold text-lg`}
                    />
                    {errors.firstName && <p className="text-red-500 text-sm mt-2 font-bold">{errors.firstName}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-extrabold text-slate-800 mb-2">Email Address <span className="text-red-500">*</span></label>
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => updateData({ email: e.target.value })}
                      placeholder="john@example.com"
                      className={`w-full bg-slate-50 border-none ${errors.email ? 'ring-2 ring-red-400 bg-red-50' : ''} rounded-2xl px-6 py-5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0314B0] transition-all font-bold text-lg`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-2 font-bold">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-extrabold text-slate-800 mb-2">Phone Number (Optional)</label>
                    <input 
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => updateData({ phone: e.target.value })}
                      placeholder="+44 (555) 000-0000"
                      className="w-full bg-slate-50 border-none rounded-2xl px-6 py-5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0314B0] transition-all font-bold text-lg"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Success Step 5 */}
            {step === 5 && (
              <motion.div key="step5" className="text-center py-16 relative overflow-visible h-full min-h-[300px] flex flex-col items-center justify-center">
                
                <div className="relative w-full h-32 flex items-center justify-center mb-6">
                  {/* The Morphing Rocket - It receives layoutId="hero-rocket" from the header */}
                  <motion.div
                    layoutId="hero-rocket"
                    animate={ rocketStage === 'launched' 
                      ? { y: -1000, scale: 0.5, opacity: 0 } // Flies out of the screen
                      : { y: 0, scale: 2.5, opacity: 1 }     // Centers and grows large
                    }
                    transition={ rocketStage === 'launched' 
                      ? { duration: 1.2, ease: "easeIn" } 
                      : { duration: 0.8, type: "spring", bounce: 0.3 }
                    }
                    className="w-16 h-16 rounded-[2rem] bg-gradient-to-br from-[#0314B0] to-blue-500 flex items-center justify-center shadow-[0_20px_50px_rgba(3,20,176,0.4)] absolute z-50"
                  >
                     <Rocket className="w-8 h-8 text-white" fill="currentColor" />
                     
                     {/* Fire appearing only when launched */}
                     {rocketStage === 'launched' && (
                       <motion.div 
                         initial={{ opacity: 0, scaleY: 0 }}
                         animate={{ opacity: [0.5, 1, 0.5], scaleY: [1, 2, 1] }} 
                         transition={{ repeat: Infinity, duration: 0.1 }}
                         className="absolute -bottom-16 w-8 h-20 bg-gradient-to-b from-orange-400 via-yellow-300 to-transparent rounded-full blur-[8px] -z-10 origin-top"
                       />
                     )}
                  </motion.div>

                  {/* The Big Blue Checkmark (Appears after rocket launches) */}
                  {rocketStage === 'launched' && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.5, type: "spring", bounce: 0.5, duration: 0.6 }}
                      className="w-24 h-24 rounded-full bg-gradient-to-br from-[#0314B0] to-blue-500 flex items-center justify-center shadow-[0_20px_50px_rgba(3,20,176,0.4)] absolute z-40"
                    >
                      <Check className="w-12 h-12 text-white" strokeWidth={4} />
                    </motion.div>
                  )}
                </div>

                {/* Text Reveal after the rocket flies away */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: rocketStage === 'launched' ? 1 : 0, y: rocketStage === 'launched' ? 0 : 30 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  <h3 className="text-4xl font-black mb-4 text-slate-900 tracking-tight">
                    Application Submitted
                  </h3>
                  <p className="text-slate-500 mb-10 max-w-sm mx-auto text-lg font-medium leading-relaxed">
                    Thank you, <span className="font-extrabold text-slate-900">{formData.firstName}</span>. We're reviewing your requirements for <span className="font-extrabold text-slate-900">{formData.businessName}</span>. We'll be in touch shortly.
                  </p>
                  <button 
                    onClick={onClose}
                    className="px-10 py-4 rounded-full bg-slate-100 text-slate-900 font-extrabold text-lg hover:bg-slate-200 transition-all shadow-sm"
                  >
                    Return to Homepage
                  </button>
                </motion.div>
              </motion.div>
            )}
            
          </AnimatePresence>
        </div>

        {/* Modal Footer */}
        {step < 5 && (
          <div className="p-6 bg-white flex justify-between items-center z-10 relative border-t border-slate-50">
            {step > 1 ? (
              <button 
                onClick={handleBack}
                disabled={isSubmitting}
                className="px-6 py-4 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-50 font-bold transition-all flex items-center gap-2 disabled:opacity-50"
              >
                <ChevronLeft className="w-5 h-5" /> Back
              </button>
            ) : <div></div>}
            
            <button 
              onClick={step === 4 ? handleSubmit : handleNext}
              disabled={isSubmitting}
              className="px-10 py-4 rounded-full bg-gradient-to-r from-[#0314B0] to-[#001B70] text-white font-extrabold hover:shadow-[0_10px_25px_rgba(3,20,176,0.3)] hover:-translate-y-0.5 transition-all flex items-center gap-2 group disabled:opacity-80"
            >
              <span>{step === 4 ? 'Submit Application' : 'Continue'}</span>
              {!isSubmitting && <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
            </button>
          </div>
        )}
      </motion.div>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #CBD5E1; }
      `}} />
    </div>
  );
}

function PortfolioCard({ project, className = "flex" }) {
  const [isHolding, setIsHolding] = useState(false);

  // Prevent default drag behavior so the browser doesn't try to drag the image
  const preventDrag = (e) => e.preventDefault();

  return (
    <motion.div 
      layout
      whileHover={{ y: -8 }}
      onMouseDown={() => setIsHolding(true)}
      onMouseUp={() => setIsHolding(false)}
      onMouseLeave={() => setIsHolding(false)}
      onTouchStart={() => setIsHolding(true)}
      onTouchEnd={() => setIsHolding(false)}
      onTouchCancel={() => setIsHolding(false)}
      onContextMenu={(e) => e.preventDefault()}
      style={{ WebkitTouchCallout: 'none', WebkitUserSelect: 'none', userSelect: 'none' }}
      className={`group bg-white rounded-[1.5rem] sm:rounded-[2rem] p-2 sm:p-3 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-slate-100 cursor-pointer transition-all duration-300 flex-col ${className}`}
    >
      <motion.div 
        layout
        className={`w-full relative rounded-2xl sm:rounded-3xl overflow-hidden mb-3 sm:mb-4 bg-slate-100 transition-[padding-top] duration-500 ease-in-out ${isHolding ? 'pt-[160%]' : 'pt-[75%]'}`}
      >
        <img 
          src={project.img} 
          alt={project.title} 
          onDragStart={preventDrag} 
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isHolding ? 'opacity-0' : 'opacity-100'}`} 
        />
        <img 
          src={project.verticalImg} 
          alt={`${project.title} Vertical`} 
          onDragStart={preventDrag} 
          className={`absolute inset-0 w-full h-full object-top object-cover transition-opacity duration-500 ${isHolding ? 'opacity-100' : 'opacity-0'}`} 
        />
        
        {/* Overlay and Indicator */}
        <div className={`absolute inset-0 bg-[#0314B0]/0 group-hover:bg-[#0314B0]/10 transition-colors duration-500 z-10 flex flex-col items-center justify-end pb-4 sm:pb-6 ${isHolding ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            {/* Always visible hold to preview pill with continuous finger animation */}
            <div className="bg-[#121626]/95 backdrop-blur-md text-white text-[11px] sm:text-xs font-extrabold px-3 sm:px-4 py-2.5 rounded-full flex items-center gap-2.5 shadow-2xl border border-white/10 relative transition-transform duration-300 transform group-hover:scale-105">
              
              <div className="relative flex items-center justify-center w-4 h-4 shrink-0">
                 {/* Blue dot base */}
                 <motion.div 
                   animate={{ scale: [1, 0.7, 1] }}
                   transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                   className="absolute w-2.5 h-2.5 bg-[#4B83FF] rounded-full" 
                 />
                 
                 {/* Finger pressing animation */}
                 <motion.div
                   animate={{ scale: [1, 0.9, 1], y: [-6, 2, -6], rotate: [-5, 0, -5] }}
                   transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                   className="absolute z-20 origin-bottom-right"
                   style={{ left: '2px', top: '-2px' }}
                 >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#ffffff" stroke="#121626" strokeWidth="1.5">
                      <path d="M12 2a2.5 2.5 0 0 1 2.5 2.5V10h.5a2.5 2.5 0 0 1 2.5 2.5v.5h.5a2.5 2.5 0 0 1 2.5 2.5v4.5a6.5 6.5 0 0 1-6.5 6.5h-2a6.5 6.5 0 0 1-4.75-2.14l-3.64-3.9a2.5 2.5 0 0 1 3.68-3.38l1.71 1.83V4.5A2.5 2.5 0 0 1 12 2z"/>
                    </svg>
                 </motion.div>
              </div>

              <span className="tracking-wide">Hold to preview</span>
            </div>
        </div>
      </motion.div>
      
      <motion.div layout className="px-2 sm:px-4 pb-2 sm:pb-3">
        <p className="text-slate-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-0.5 sm:mb-1">{project.cat}</p>
        <h4 className="text-sm sm:text-xl font-extrabold text-slate-800 leading-tight">{project.title}</h4>
      </motion.div>
    </motion.div>
  );
}