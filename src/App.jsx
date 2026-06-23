import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Rocket, ChevronRight, ChevronLeft, 
  Store, CalendarClock, Briefcase, Palette, Code, 
  Smartphone, Zap, Shield, Star, Users, X, ArrowRight,
  Quote, ExternalLink, Check
} from 'lucide-react';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hideNav, setHideNav] = useState(false);

  // Handle scroll for floating navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      // Hide the navbar when scrolled past the hero section (approx 700px)
      setHideNav(window.scrollY > 700);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Inject Favicon dynamically
  useEffect(() => {
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = 'https://admin.launchmywebsite.agency/wp-content/uploads/2026/06/favicon.webp';
    document.title = "Launch My Website | Premium Custom Web Design";
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 overflow-x-hidden relative selection:bg-blue-200 selection:text-blue-900" style={{ fontFamily: "'Inter', sans-serif" }}>
      
      {/* Global Fonts Integration */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Sora:wght@300;400;500;600;700;800&display=swap');
        h1, h2, h3, h4, h5, h6, .title-font { font-family: 'Sora', sans-serif !important; }
        button { font-family: 'Sora', sans-serif !important; }
      `}} />

      {/* Super Subtle Clean Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden flex justify-center items-center">
        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-blue-100/40 blur-[120px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-indigo-100/40 blur-[120px]"></div>
      </div>

      {/* Floating Clean Navbar */}
      <div className={`fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 transition-all duration-500 ${hideNav ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}>
        <nav className={`w-full max-w-6xl transition-all duration-500 rounded-full px-6 py-3 flex justify-between items-center ${scrolled ? 'bg-white/80 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white' : 'bg-transparent'}`}>
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            {/* Dark pill background to ensure white logos are visible on the light theme */}
            <div className="bg-[#001B70] p-2 rounded-full shadow-md">
              <img 
                src="https://admin.launchmywebsite.agency/wp-content/uploads/2026/06/header-logo.webp" 
                alt="Launch My Website Logo" 
                className="h-6 w-auto object-contain"
              />
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

      {/* Main Content */}
      <main className="relative z-10 pt-32 pb-40">
        
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20 flex flex-col items-center">
          
          {/* Huge Hero Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-[6vw] sm:text-5xl md:text-6xl lg:text-[5.5rem] font-black text-center text-slate-900 leading-[1.05] tracking-tight mb-10 title-font w-full whitespace-nowrap"
          >
            Launch your website in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0314B0] to-blue-500">24 hrs</span>
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
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-105"
                src="https://cdn.coverr.co/videos/coverr-working-in-a-cafe-2-5203/1080p.mp4"
              />
            </div>
          </motion.div>
          
          {/* CTA Buttons only */}
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

        {}
        <section id="portfolio" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
             <h2 className="text-[#0314B0] font-bold tracking-widest uppercase text-sm mb-3">Our Work</h2>
             <h3 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">Recent Launches</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Evolve Wellness', cat: 'E-commerce', img: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=800&q=80' },
              { title: 'Apex Financial', cat: 'Corporate', img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80' },
              { title: 'Lumina Architecture', cat: 'Portfolio', img: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80' },
              { title: 'Zenith Studio', cat: 'Agency', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80' },
              { title: 'Bite Organic', cat: 'Food & Bev', img: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80' },
              { title: 'Nova Fitness', cat: 'Booking', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80' },
            ].map((project, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -8 }}
                className="group bg-white rounded-[2rem] p-3 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-slate-100 cursor-pointer transition-all duration-300"
              >
                <div className="aspect-[4/3] rounded-3xl overflow-hidden relative mb-4">
                  <div className="absolute inset-0 bg-[#0314B0]/0 group-hover:bg-[#0314B0]/10 transition-colors duration-500 z-10 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300">
                       <ExternalLink className="w-5 h-5 text-[#0314B0]" />
                    </div>
                  </div>
                  <img src={project.img} alt={project.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="px-4 pb-3">
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">{project.cat}</p>
                  <h4 className="text-xl font-extrabold text-slate-800">{project.title}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {}
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

        {}
        <section id="reviews" className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-[#0314B0] font-bold tracking-widest uppercase text-sm mb-3">Client Success</h2>
              <h3 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">What Our Clients Say</h3>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: "Sarah Jenkins", role: "CEO, TechStart Inc.", quote: "It was an absolute pleasure working with Launch My Website. They took our vague ideas and turned them into a stunning, high-performing website." },
                { name: "Marcus Thorne", role: "Founder, Thorne Fitness", quote: "The process was incredibly smooth. They understood exactly what we needed and delivered a product that exceeded all our expectations." },
                { name: "Elena Rodriguez", role: "Director, Artisan Cafe", quote: "Our online orders doubled within a month of launching the new site. The design is beautiful and the backend is so easy to use." }
              ].map((testimonial, i) => (
                <div key={i} className="bg-white border border-slate-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.04)] p-8 rounded-[2rem] relative mt-8">
                  {/* Floating Avatar */}
                  <div className="absolute -top-8 left-8 w-16 h-16 rounded-full bg-gradient-to-br from-[#0314B0] to-blue-400 flex items-center justify-center font-bold text-white text-xl shadow-lg border-4 border-white">
                    {testimonial.name.charAt(0)}
                  </div>
                  <Quote className="absolute top-8 right-8 w-8 h-8 text-slate-100" />
                  
                  <div className="mt-8">
                    <div className="flex gap-1 mb-4 text-yellow-400">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-slate-600 mb-6 font-medium leading-relaxed">"{testimonial.quote}"</p>
                    <div>
                      <h4 className="font-extrabold text-slate-900">{testimonial.name}</h4>
                      <p className="text-sm font-bold text-slate-400">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {}
      <div className="fixed bottom-0 left-0 right-0 z-40 p-4 pointer-events-none flex justify-center pb-6 md:pb-8">
        <motion.button
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, type: "spring", stiffness: 100 }}
          onClick={() => setIsModalOpen(true)}
          className="pointer-events-auto w-full max-w-2xl group relative p-3 sm:p-4 rounded-[2rem] overflow-hidden bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:shadow-[0_25px_60px_rgba(3,20,176,0.2)] border border-slate-100 transition-all duration-300 transform hover:-translate-y-2"
        >
          <div className="relative z-10 flex items-center justify-between px-4">
            <div className="flex items-center gap-5 text-left">
               <div className="hidden sm:flex w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0314B0] to-blue-600 text-white items-center justify-center shadow-[0_5px_15px_rgba(3,20,176,0.3)] group-hover:scale-110 transition-transform duration-300">
                 <Rocket className="w-6 h-6" />
               </div>
               <div>
                 <p className="font-black text-xl md:text-2xl text-slate-900 leading-tight tracking-tight title-font">Apply to build your site</p>
                 <p className="text-sm font-bold text-slate-400 mt-0.5">Free strategy call • Under 60 seconds</p>
               </div>
            </div>
            <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-[#0314B0] group-hover:text-white transition-colors text-slate-400 shrink-0 shadow-sm border border-slate-100">
               <ArrowRight className="w-6 h-6" />
            </div>
          </div>
        </motion.button>
      </div>

      {/* Dynamic Multi-Step Application Modal */}
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
  const [rocketStage, setRocketStage] = useState('idle'); // idle -> center -> launched
  const [shake, setShake] = useState(false);

  const [formData, setFormData] = useState({
    businessName: '',
    category: '',
    purpose: '',
    features: [],
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
    } else if (currentStep === 2) {
      if (!formData.purpose) newErrors.purpose = "You must select a primary goal.";
    } else if (currentStep === 3) {
      if (!formData.budget) newErrors.budget = "Please select an estimated budget.";
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

  const handleSubmit = () => {
    if (validateStep(4)) {
      setIsSubmitting(true);
      setRocketStage('center'); // Triggers Framer Motion layout transition
      setStep(5);
      
      console.log("Form Payload: ", formData);

      // Wait 1.2s for it to center, then launch it out of the screen
      setTimeout(() => {
        setRocketStage('launched');
      }, 1200);
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
      {/* Soft Blurred Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
      />

      {/* Clean White Modal Content */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={shake ? "shake" : { opacity: 1, scale: 1, y: 0 }} 
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        variants={shakeVariants}
        className="relative w-full max-w-2xl bg-white rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header - Hides elements gracefully during step 5 launch */}
        <div className="flex justify-between items-center p-6 bg-white relative z-10">
          <div className="flex items-center gap-4 h-12">
             {/* THE ROCKET - Shared Layout Id allows smooth morphing to step 5 */}
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

        {/* Minimal Progress Bar */}
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

        {/* Body */}
        <div className="p-6 sm:p-10 overflow-y-auto flex-1 custom-scrollbar relative z-10 bg-white">
          <AnimatePresence mode="wait">
            
            {/* Step 1: Business Basics */}
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
                        onChange={(e) => updateData({ category: e.target.value })}
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
                </div>
              </motion.div>
            )}

            {/* Step 2: Website Purpose */}
            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                <h3 className="text-3xl font-black mb-8 text-slate-900 tracking-tight">What is the primary goal? <span className="text-red-500">*</span></h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: 'E-commerce', icon: Store, title: 'Sell Products', desc: 'Full online store with checkout' },
                    { id: 'Booking', icon: CalendarClock, title: 'Book Appointments', desc: 'Service scheduling' },
                    { id: 'Lead Gen', icon: Users, title: 'Generate Leads', desc: 'Capture inquiries' },
                    { id: 'Portfolio', icon: Briefcase, title: 'Showcase Work', desc: 'Display past projects' }
                  ].map((goal) => (
                    <div 
                      key={goal.id}
                      onClick={() => updateData({ purpose: goal.id })}
                      className={`cursor-pointer p-6 rounded-3xl transition-all duration-300 ${formData.purpose === goal.id ? 'bg-[#0314B0] shadow-[0_10px_20px_rgba(3,20,176,0.2)] scale-[1.02]' : 'bg-slate-50 hover:bg-slate-100'}`}
                    >
                      <div className="flex justify-between items-start mb-4">
                         <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${formData.purpose === goal.id ? 'bg-white/20' : 'bg-white shadow-sm'}`}>
                            <goal.icon className={`w-6 h-6 ${formData.purpose === goal.id ? 'text-white' : 'text-[#0314B0]'}`} />
                         </div>
                         {formData.purpose === goal.id && (
                           <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                             <Check className="w-4 h-4 text-[#0314B0]" strokeWidth={3} />
                           </motion.div>
                         )}
                      </div>
                      <h4 className={`font-extrabold text-lg mb-1 ${formData.purpose === goal.id ? 'text-white' : 'text-slate-900'}`}>{goal.title}</h4>
                      <p className={`text-sm font-medium ${formData.purpose === goal.id ? 'text-blue-100' : 'text-slate-500'}`}>{goal.desc}</p>
                    </div>
                  ))}
                </div>
                {errors.purpose && <p className="text-red-500 text-sm mt-4 text-center font-bold bg-red-50 py-3 rounded-xl">{errors.purpose}</p>}
              </motion.div>
            )}

            {/* Step 3: Project Details */}
            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                <h3 className="text-3xl font-black mb-8 text-slate-900 tracking-tight">Scope & Budget</h3>
                
                <div className="space-y-8">
                  {/* Features & Addons */}
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
                    </div>
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="block text-sm font-extrabold text-slate-800 mb-4">Estimated Budget <span className="text-red-500">*</span></label>
                    <div className="grid grid-cols-2 gap-3">
                      {['£500 - £1.5k', '£1.5k - £2.5k', '£2.5k - £5k', '£5k+'].map((budget) => (
                        <div 
                          key={budget}
                          onClick={() => updateData({ budget })}
                          className={`cursor-pointer p-5 rounded-2xl text-center transition-all font-extrabold text-lg title-font ${formData.budget === budget ? 'bg-[#0314B0] text-white shadow-[0_10px_20px_rgba(3,20,176,0.2)]' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                        >
                          {budget}
                        </div>
                      ))}
                    </div>
                    {errors.budget && <p className="text-red-500 text-sm mt-3 font-bold">{errors.budget}</p>}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Contact Info */}
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
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-slate-50 border-none rounded-2xl px-6 py-5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0314B0] transition-all font-bold text-lg"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {}
            {step === 5 && (
              <motion.div key="step5" className="text-center py-16 relative overflow-visible h-full min-h-[300px] flex flex-col items-center justify-center">
                
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
                  className="w-16 h-16 rounded-[2rem] bg-gradient-to-br from-[#0314B0] to-blue-500 flex items-center justify-center shadow-[0_20px_50px_rgba(3,20,176,0.4)] relative z-50 mb-10"
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

                {/* Text Reveal after the rocket flies away */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: rocketStage === 'launched' ? 1 : 0, y: rocketStage === 'launched' ? 0 : 30 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <h3 className="text-4xl font-black mb-4 text-slate-900 tracking-tight">
                    Application Launched!
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

        {/* Footer Actions */}
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

      {/* Custom Scrollbar CSS */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #CBD5E1; }
      `}} />
    </div>
  );
}
