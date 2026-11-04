import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight, Play, X, Menu, ArrowUpRight, MonitorPlay, Paintbrush, Clapperboard, Layers, Send, CheckCircle, AlertCircle, Loader2, Maximize2, Sliders, Zap, Volume2, Sparkles, Cpu, Gauge } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';

const THEME = {
  bgBase: '#08090B',
  bgSurface: '#121419',
  textPrimary: '#F4F3EF',
  textMuted: '#8A8A93',
  accent: '#C6FF4D', // Acid Yellow/Lime
};

const CINEMATIC_EASE = [0.83, 0, 0.17, 1];
const SMOOTH_EASE = [0.16, 1, 0.3, 1];

const PROJECTS = [
  {
    id: 'p-inspiration',
    title: 'CREATIVE MOTION REEL',
    category: 'REELS',
    client: 'Klickpin / Devora AI',
    description: 'A high-retention creative motion design inspiration reel edited for maximum visual impact. Built with rhythmic cuts, seamless transitions, punchy sound design, and modern aesthetic curation tailored for social media attention.',
    role: 'Lead Video Editor & Motion Designer',
    deliverables: ['Social Reel / Short (9:16)', 'Kinetic Rhythm & Pacing', 'Sound Design & Transitions'],
    image: '/inspiration-thumbnail.jpg',
    videoUrl: 'https://youtube.com/shorts/t5BAEuEJROw',
    youtubeId: 't5BAEuEJROw',
    featured: true,
    aspect: 'portrait',
    gridSpan: 'col-span-1 md:col-span-1 lg:col-span-6'
  },
  {
    id: 'p-bmw-m4',
    title: 'BMW M4 // KINETIC REEL',
    category: 'REELS',
    client: 'Automotive Spec / Devora AI',
    description: 'A relentless, high-octane kinetic commercial edit crafted for the BMW M4. Built with razor-sharp speed ramps, bass-synced cutting rhythms, immersive engine sound design, and an aggressive color grade that accentuates the electric yellow bodywork.',
    role: 'Lead Video Editor & Sound Designer',
    deliverables: ['Social Reel / Short (9:16)', 'Custom Sound Design & Foley', 'Speed Ramping & Color Grade'],
    image: '/bmw-thumbnail.jpg',
    videoUrl: 'https://youtube.com/shorts/OXfHT2mkrk8',
    youtubeId: 'OXfHT2mkrk8',
    featured: false,
    aspect: 'portrait',
    gridSpan: 'col-span-1 md:col-span-1 lg:col-span-6'
  },
  {
    id: 'p-badulla',
    title: 'BEAUTY OF BADULLA // CINEMATIC',
    category: 'CINEMATIC',
    client: 'Travel & Tourism / Nipun Prabhashwara',
    description: 'A breathtaking cinematic travel film showcasing the mystical highlands of Badulla, Sri Lanka. Crafted with atmospheric organic pacing, soaring drone perspectives, immersive sound design, and a lush filmic color grade capturing golden-hour mist over the mountains.',
    role: 'Lead Video Editor & Colorist',
    deliverables: ['Cinematic Travel Reel (9:16)', 'Filmic Color Grade & Atmosphere', 'Environmental Foley & Sound Design'],
    image: '/badulla-thumbnail.jpg',
    videoUrl: 'https://www.youtube.com/shorts/iDhwwVi-uVM',
    youtubeId: 'iDhwwVi-uVM',
    featured: true,
    aspect: 'portrait',
    gridSpan: 'col-span-1 md:col-span-1 lg:col-span-6'
  },
  {
    id: 'p-gaming',
    title: 'UNSTABLE SMP // GAMING EDIT',
    category: 'GAMING',
    client: 'Fodex Studios',
    description: 'A high-energy, fast-paced Minecraft SMP gaming montage crafted with rhythm-synced impact cuts, custom velocity speed ramps, glowing neon particle effects, and bass-heavy sound design tailored for viral gaming retention.',
    role: 'Lead Gaming Video Editor & Sound Designer',
    deliverables: ['Gaming Reel / Short (9:16)', 'Velocity Ramping & Beat Sync', 'Custom Gaming SFX & Foley'],
    image: '/gaming-thumbnail.jpg',
    videoUrl: 'https://youtube.com/shorts/j29A5V89T34',
    youtubeId: 'j29A5V89T34',
    featured: true,
    aspect: 'portrait',
    gridSpan: 'col-span-1 md:col-span-1 lg:col-span-6'
  },
  {
    id: 'p-doki',
    title: 'R6 SIEGE // DOKI EDIT',
    category: 'GAMING',
    client: 'Fodex Studios',
    description: 'A legendary Rainbow Six Siege tactical montage edit crafted with rapid-fire sync, crisp 1-tap bullet tracers, velocity speed ramping, and visceral weapon sound design engineered for viral gaming engagement.',
    role: 'Lead Video Editor & Motion Designer',
    deliverables: ['Gaming Reel / Short (9:16)', 'Tactical Velocity & Beat Sync', 'Visceral Gunshot SFX & Foley'],
    image: '/r6-siege-thumbnail.jpg',
    videoUrl: 'https://youtu.be/xS8YmT27f9g',
    youtubeId: 'xS8YmT27f9g',
    featured: true,
    aspect: 'portrait',
    gridSpan: 'col-span-1 md:col-span-1 lg:col-span-6'
  },
  {
    id: 'p-porsche-grade',
    title: 'PORSCHE 911 // S-LOG TO GRADED',
    category: 'PHOTO EDITING',
    client: 'Automotive Color Grade / Fodex Studios',
    description: 'An advanced Before & After automotive color grading and photo retouching masterwork. Transforming flat, washed-out S-Log RAW camera profiles into rich, glossy British Racing Green with precision specular highlights, deep rich blacks, and calibrated outdoor sunlight rolloff.',
    role: 'Lead Colorist & Retoucher',
    deliverables: ['S-Log to Rec.709 Color Grade', 'Specular Highlight Retouching', 'Dynamic Tone Curve & Contrast'],
    image: '/porsche-color-grade.jpg',
    beforeAfter: true,
    badgeLeft: '◄ S-LOG (RAW)',
    badgeRight: 'COLOR GRADED ►',
    tagPrimary: 'S-Log to Rec.709',
    tagSecondary: 'RAW S-LOG ➔ COLOR GRADED',
    tagTech: 'ACES HIGH-DYNAMIC RANGE',
    ctaText: 'Explore Color Grade →',
    featured: true,
    aspect: 'landscape',
    gridSpan: 'col-span-1 md:col-span-1 lg:col-span-6'
  },
  {
    id: 'p-photo-restoration',
    title: 'Photo restoration',
    category: 'PHOTO EDITING',
    client: 'Archival Restoration / Fodex Studios',
    description: 'A masterclass in delicate archival photo restoration and colorization. Digitally healing deep cracks, severe scratches, and chemical degradation from a vintage sepia portrait, followed by authentic historical color reconstruction and natural skin tone recreation.',
    role: 'Lead Digital Retoucher & Colorist',
    deliverables: ['Crack & Tear Digital Inpainting', 'Archival Skin Texture Reconstruction', 'Authentic Historical Colorization'],
    image: '/photo-restoration.jpg',
    beforeAfter: true,
    badgeLeft: '◄ BEFORE (DAMAGED)',
    badgeRight: 'AFTER (RESTORED) ►',
    tagPrimary: 'Archival Restoration',
    tagSecondary: 'VINTAGE SEPIA ➔ RESTORED & COLORIZED',
    tagTech: 'DIGITAL INPAINTING & COLOR',
    ctaText: 'Explore Restoration →',
    featured: true,
    aspect: 'portrait',
    gridSpan: 'col-span-1 md:col-span-1 lg:col-span-6'
  },
  {
    id: 'p-landscape-edit',
    title: 'Landscape edit',
    category: 'PHOTO EDITING',
    client: 'Nature & Landscape / Fodex Studios',
    description: 'A breathtaking cinematic mountain vista edit capturing the mist-draped highland ranges of Sri Lanka. Crafted with rich moody cloud contrast, atmospheric depth, subtle golden horizon gradients, and filmic color grading.',
    role: 'Lead Landscape Colorist & Photographer',
    deliverables: ['Atmospheric Cloud Grading', 'Mountain Layer Contrast & Depth', 'Filmic Color Palette & Tonal Range'],
    image: '/landscape-edit.jpg',
    beforeAfter: false,
    badgeLeft: 'CINEMATIC PANORAMA',
    badgeRight: 'FODEX STUDIOS',
    tagPrimary: 'Highland Panorama',
    tagSecondary: 'ATMOSPHERIC MOUNTAIN VISTA',
    tagTech: 'FILMIC COLOR GRADE',
    ctaText: 'Explore Landscape →',
    featured: true,
    aspect: 'landscape',
    gridSpan: 'col-span-1 md:col-span-1 lg:col-span-6'
  },
  {
    id: 'p-vehicle-photo',
    title: 'vehicle photography',
    category: 'PHOTO EDITING',
    client: 'Automotive & Moto / Fodex Studios',
    description: 'A sharp, high-contrast motorcycle outdoor editorial shoot and color grade. Capturing the aggressive stance of the Yamaha Fazer against the hill-country backdrop, with deep shadow sculpting, enhanced metallic highlights, and moody sky grading.',
    role: 'Lead Vehicle Photographer & Retoucher',
    deliverables: ['Automotive Exposure Balancing', 'Metallic Specular Enhancement', 'Highland Landscape Tone Integration'],
    image: '/vehicle-photography.jpg',
    beforeAfter: false,
    badgeLeft: 'MOTO EDITORIAL',
    badgeRight: 'FODEX STUDIOS',
    tagPrimary: 'Vehicle Photography',
    tagSecondary: 'OUTDOOR AUTOMOTIVE GRADING',
    tagTech: 'METALLIC & SKY TONE',
    ctaText: 'Explore Vehicle →',
    featured: true,
    aspect: 'portrait',
    gridSpan: 'col-span-1 md:col-span-1 lg:col-span-6'
  },
  {
    id: 'p-fantasy-edits',
    title: 'fantasy edits',
    category: 'PHOTO EDITING',
    client: 'Surreal Concept Art / Fodex Studios',
    description: 'A mesmerizing fantasy surrealism photo manipulation and atmospheric concept art piece. Seamlessly blending a levitating celestial rock island, vintage ship rigging, giant luminous moon, and misty mountain fog with surgical lighting and tonal cohesion.',
    role: 'Lead Concept Artist & Photo Manipulator',
    deliverables: ['Complex Multi-plate Compositing', 'Atmospheric Fog & Depth Sculpting', 'Surreal Celestial Lighting & Shadow'],
    image: '/fantasy-edits.jpg',
    beforeAfter: false,
    badgeLeft: 'SURREAL CONCEPT ART',
    badgeRight: 'FODEX STUDIOS',
    tagPrimary: 'Fantasy Manipulation',
    tagSecondary: 'SURREAL COMPOSITING & MOON',
    tagTech: 'ATMOSPHERIC MULTI-PLATE',
    ctaText: 'Explore Fantasy Edit →',
    featured: true,
    aspect: 'portrait',
    gridSpan: 'col-span-1 md:col-span-1 lg:col-span-6'
  },
  {
    id: 'p-product-photo',
    title: 'product photography',
    category: 'PHOTO EDITING',
    client: 'Luxury Fragrance / Fodex Studios',
    description: 'A commercial luxury product shoot and high-end beauty retouch for Éclat d’Or Parfum. Featuring sculpted chiaroscuro lighting, crystal glass caustic reflections, warm amber refraction, and pristine specular highlight retouching on dark marble.',
    role: 'Lead Commercial Retoucher & Photographer',
    deliverables: ['Glass & Liquid Caustics Retouching', 'Directional Light Shaft Sculpting', 'Luxury Marble Reflection Polish'],
    image: '/product-photography.jpg',
    beforeAfter: false,
    badgeLeft: 'LUXURY COMMERCIAL',
    badgeRight: 'FODEX STUDIOS',
    tagPrimary: 'Product Photography',
    tagSecondary: 'COMMERCIAL FRAGRANCE RETOUCH',
    tagTech: 'GLASS CAUSTICS & REFRACTION',
    ctaText: 'Explore Product →',
    featured: true,
    aspect: 'portrait',
    gridSpan: 'col-span-1 md:col-span-1 lg:col-span-6'
  }
];

const SERVICES = [
  {
    id: 's1',
    title: 'VIDEO EDITING',
    icon: Clapperboard,
    description: 'Professional editing focused on pacing, narrative flow, and emotional impact. I handle everything from assembling the rough cut to final color grading and sound synchronization.',
    delivers: 'Short films, documentaries, brand anthems, and commercial spots.',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: 's2',
    title: 'SHORT-FORM & SOCIAL',
    icon: MonitorPlay,
    description: 'High-retention editing for YouTube, TikTok, and Reels. I understand platform pacing, audience attention, and how to create punchy, engaging vertical sequences.',
    delivers: 'YouTube long-form, Shorts, IG Reels, TikToks, engaging B-roll.',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: 's3',
    title: 'MOTION GRAPHICS',
    icon: Layers,
    description: 'Dynamic visual elements that elevate your video content. From kinetic typography and custom transitions to logo animations and seamless tracking.',
    delivers: 'Title sequences, lower thirds, custom transitions, intro/outros.',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: 's4',
    title: 'GRAPHIC DESIGN',
    icon: Paintbrush,
    description: 'Striking static visuals that demand attention. I create cohesive visual systems, high-converting thumbnails, and promotional artwork that aligns with your video content.',
    delivers: 'Posters, YouTube thumbnails, social media kits, pitch decks.',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2000&auto=format&fit=crop'
  }
];

const PROCESS = [
  { step: '01', title: 'DISCUSS', desc: 'We align on your goals, target audience, preferred style, and necessary deliverables. I review your raw assets and creative brief.' },
  { step: '02', title: 'PLAN', desc: 'Establishing the creative direction. For video, this means storyboarding or creating a paper edit. For design, it involves mood boards and concept sketches.' },
  { step: '03', title: 'CREATE', desc: 'The execution phase. I cut the footage, design the graphics, and build the motion sequences. You receive structured updates and review links.' },
  { step: '04', title: 'DELIVER', desc: 'Final revisions are implemented. Color is graded, audio is mixed. You receive high-resolution, organized final files in the required formats.' }
];

const pageVariants = {
  initial: { opacity: 0, filter: 'blur(10px)', y: 20 },
  enter: { opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: 0.8, ease: CINEMATIC_EASE, staggerChildren: 0.1 } },
  exit: { opacity: 0, filter: 'blur(10px)', y: -20, transition: { duration: 0.4, ease: CINEMATIC_EASE } }
};

const textRevealVariants = {
  initial: { y: "110%", opacity: 0, rotateZ: 2 },
  enter: { y: "0%", opacity: 1, rotateZ: 0, transition: { duration: 1, ease: CINEMATIC_EASE } }
};

const staggerContainer = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.1 } }
};

const MagneticButton = ({ children, onClick, className = "", variant = 'primary' }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef(null);

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = buttonRef.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  const baseClasses = "relative overflow-hidden inline-flex items-center justify-center px-8 py-4 rounded-full font-medium text-sm tracking-widest uppercase transition-colors duration-300 group";
  const variants = {
    primary: "bg-[#C6FF4D] text-[#08090B] hover:bg-white",
    secondary: "border border-[#F4F3EF]/20 text-[#F4F3EF] hover:border-[#F4F3EF]/60 bg-[#08090B]/50 backdrop-blur-sm",
    text: "text-[#F4F3EF] hover:text-[#C6FF4D] px-0 py-2 rounded-none tracking-normal"
  };

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      <span className="relative z-10 flex items-center gap-3">{children}</span>
    </motion.button>
  );
};

const SplitText = ({ children, className = "" }) => {
  const words = children.split(" ");
  return (
    <div className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <div key={i} className="overflow-hidden mr-[0.2em] pb-[0.1em]">
          <motion.div variants={textRevealVariants} className="inline-block">
            {word}
          </motion.div>
        </div>
      ))}
    </div>
  );
};

const SectionHeading = ({ children, subtitle }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <div ref={ref} className="mb-16 md:mb-24">
      {subtitle && (
        <motion.div 
          initial={{ opacity: 0, width: 0 }}
          animate={isInView ? { opacity: 1, width: "auto" } : {}}
          transition={{ duration: 0.8, ease: CINEMATIC_EASE }}
          className="flex items-center gap-4 mb-6 overflow-hidden"
        >
          <div className="w-12 h-[1px] bg-[#C6FF4D]" />
          <span className="text-[#C6FF4D] text-xs uppercase tracking-[0.2em] font-medium whitespace-nowrap">{subtitle}</span>
        </motion.div>
      )}
      <div className="overflow-hidden">
        <motion.h2 
          initial="initial"
          animate={isInView ? "enter" : "initial"}
          variants={textRevealVariants}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter uppercase leading-[0.9]"
        >
          {children}
        </motion.h2>
      </div>
    </div>
  );
};

const Navigation = ({ currentRoute, setRoute }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
    { name: 'Home', route: 'home' },
    { name: 'Portfolio', route: 'portfolio' },
    { name: 'Services', route: 'services' },
    { name: 'About', route: 'about' },
  ];

  const handleNav = (route) => {
    setRoute(route);
    setIsOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 md:py-7 mix-blend-difference pointer-events-none">
        <div 
          onClick={() => setRoute('home')} 
          className="flex items-center gap-2.5 sm:gap-3 cursor-pointer pointer-events-auto group shrink-0"
        >
          <span className="text-white text-xl sm:text-2xl font-black tracking-tighter transition-all group-hover:text-[#C6FF4D] font-['Syne',sans-serif]">
            FODEX<span className="text-[#C6FF4D]">.</span>
          </span>
          <div className="flex flex-col border-l border-white/20 pl-2.5 sm:pl-3 leading-tight">
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] font-bold text-white/90">Shaveen Shanidu</span>
            <span className="text-[7px] sm:text-[8px] uppercase tracking-[0.18em] text-[#C6FF4D] font-mono">Fodex Studios</span>
          </div>
        </div>
        
        <div className="hidden lg:flex items-center gap-6 xl:gap-10 pointer-events-auto shrink-0">
          {navItems.map((item) => (
            <button
              key={item.route}
              onClick={() => handleNav(item.route)}
              className={`text-xs uppercase tracking-[0.15em] transition-colors duration-300 relative py-2 ${
                currentRoute === item.route || (currentRoute === 'project' && item.route === 'portfolio')
                  ? 'text-[#C6FF4D]' 
                  : 'text-white hover:text-white/70'
              }`}
            >
              {item.name}
              {(currentRoute === item.route || (currentRoute === 'project' && item.route === 'portfolio')) && (
                <motion.div layoutId="navIndicator" className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#C6FF4D]" />
              )}
            </button>
          ))}
          <button 
            onClick={() => handleNav('contact')}
            className="text-xs uppercase tracking-[0.15em] text-[#08090B] bg-white px-5 xl:px-6 py-2.5 xl:py-3 rounded-full hover:bg-[#C6FF4D] transition-colors duration-300 font-medium shrink-0"
          >
            Start Project
          </button>
        </div>

        <button 
          onClick={() => setIsOpen(true)}
          className="lg:hidden text-white pointer-events-auto p-2.5 rounded-full hover:bg-white/10 transition-colors flex items-center justify-center"
          aria-label="Open menu"
        >
          <Menu size={26} />
        </button>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.8, ease: CINEMATIC_EASE }}
            className="fixed inset-0 z-50 bg-[#08090B] flex flex-col justify-center px-6 md:px-12"
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-8 right-6 text-white p-2 hover:rotate-90 transition-transform duration-500"
            >
              <X size={32} />
            </button>
            <div className="flex flex-col gap-6 text-5xl md:text-7xl font-bold tracking-tighter uppercase">
              {[...navItems, { name: 'Contact', route: 'contact' }].map((item, i) => (
                <div key={item.route} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "100%", opacity: 0, rotateZ: 2 }}
                    animate={{ y: "0%", opacity: 1, rotateZ: 0 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ delay: i * 0.05 + 0.2, duration: 0.8, ease: CINEMATIC_EASE }}
                  >
                    <button
                      onClick={() => handleNav(item.route)}
                      className={`text-left w-full hover:pl-8 transition-all duration-500 ${
                        currentRoute === item.route ? 'text-[#C6FF4D]' : 'text-white hover:text-white/50'
                      }`}
                    >
                      {item.name}
                    </button>
                  </motion.div>
                </div>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
              className="absolute bottom-12 left-6 right-6 flex justify-between text-xs uppercase tracking-widest text-[#F4F3EF]/40 border-t border-[#F4F3EF]/10 pt-6"
            >
              <span>Shaveen Shanidu • Fodex Studios</span>
              <span className="text-[#C6FF4D]">Available for Work</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const TECHNICAL_SKILLS = [
  {
    name: 'Adobe Premiere Pro',
    code: 'PR // TIMELINE & PACING',
    level: 98,
    tag: 'LEAD SPECIALIST',
    icon: Clapperboard,
    summary: 'Surgical narrative pacing, multi-track audio conforming, and high-retention commercial & reel rhythm.',
    tools: ['Dynamic Trimming', 'L & J Cutting', 'Rhythmic Pacing', 'Multi-Cam Conforming', '4K RAW Pipeline']
  },
  {
    name: 'Velocity & Speed Ramping',
    code: 'VELOCITY // TIME REMAPPING',
    level: 97,
    tag: 'SIGNATURE CRAFT',
    icon: Zap,
    summary: 'Signature frame-accurate beat drops, optical flow curves, and kinetic velocity impacts engineered for viral engagement.',
    tools: ['Bézier Velocity Curves', 'Optical Flow', 'Impact Shakes', 'Twixtor Slow-Mo', 'Beat Grid Alignment']
  },
  {
    name: 'Adobe After Effects',
    code: 'AE // VFX & KINETICS',
    level: 96,
    tag: 'MASTER LEVEL',
    icon: Sparkles,
    summary: 'High-end kinetic typography, seamless motion graphics, 3D camera tracking, and custom VFX transitions.',
    tools: ['Speed Curve Graph', '3D Camera Tracking', 'Rotoscoping', 'Expression Scripts', 'Glow & Lens Flares']
  },
  {
    name: 'Sound Design & Foley Engineering',
    code: 'AUDIO // IMMERSION & FOLEY',
    level: 94,
    tag: 'HI-RES STEMS',
    icon: Volume2,
    summary: 'Auditory storytelling using heavy sub-bass hits, tactical weapon pans, whooshes, risers, and mastered dynamics.',
    tools: ['Stereo Imaging', 'Impact Risers', 'Sub-Bass Layering', 'Sidechain Ducking', '-14 LUFS Mastering']
  },
  {
    name: 'DaVinci Resolve Studio',
    code: 'RESOLVE // COLOR GRADING',
    level: 92,
    tag: 'ACES PIPELINE',
    icon: Sliders,
    summary: 'Film look emulation, cinematic tone curves, skin-tone isolation, mood grading, and color space transform.',
    tools: ['ACEScc Color Space', 'Log Wheels', 'Qualifier Masks', 'Halation & Film Grain', 'HDR Highlight Rolloff']
  },
  {
    name: '3D Motion & Compositing',
    code: '3D // DEPTH & COMPOSITING',
    level: 89,
    tag: 'SPATIAL DEPTH',
    icon: Cpu,
    summary: 'Spatial depth mapping, element integration, volumetric lighting passes, and realistic camera parallax.',
    tools: ['Depth Pass Blending', 'Element 3D', 'Volumetric Lighting', 'Parallax Layers', 'Atmospheric Fog']
  }
];

const Home = ({ setRoute, setSelectedProject }) => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const photoScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.08]);

  return (
    <motion.div variants={pageVariants} initial="initial" animate="enter" exit="exit" className="pt-32 pb-24">
      {/* Cinematic Hero Section */}
      <section className="min-h-[90vh] flex flex-col justify-center px-6 md:px-12 lg:px-24 mb-32 relative overflow-hidden">
        <motion.div variants={staggerContainer} className="relative z-10 max-w-7xl mx-auto w-full mt-12 md:mt-0">
          <div className="overflow-hidden mb-8 md:mb-12">
            <motion.div variants={textRevealVariants} className="flex items-center gap-3 text-xs md:text-sm tracking-[0.2em] uppercase">
              <span className="w-8 h-[1px] bg-[#C6FF4D]" />
              <span className="text-[#C6FF4D] font-bold">Selected Works</span>
              <span className="text-[#F4F3EF]/30">•</span>
              <span className="text-[#F4F3EF]/70 font-light">Video Editor & Motion Designer</span>
            </motion.div>
          </div>

          <h1 className="text-[12vw] sm:text-7xl md:text-8xl lg:text-[9vw] font-bold leading-[0.85] tracking-[-0.04em] uppercase mb-12 lg:mb-16">
            <motion.div variants={staggerContainer} className="flex flex-col">
              <SplitText>EVERY FRAME</SplitText>
              <div className="flex items-center gap-4 md:gap-8 flex-wrap">
                <div className="overflow-hidden">
                  <motion.span variants={textRevealVariants} className="block italic text-[#F4F3EF]/60 font-serif font-light tracking-normal lowercase text-[10vw] sm:text-6xl md:text-7xl lg:text-[7vw]">
                    tells a
                  </motion.span>
                </div>
                <SplitText>STORY.</SplitText>
              </div>
            </motion.div>
          </h1>

          <motion.div variants={textRevealVariants} className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start sm:items-center">
            <MagneticButton onClick={() => setRoute('portfolio')}>
              Explore My Work <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </MagneticButton>
            <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-[#F4F3EF]/60">
              <div className="w-2 h-2 rounded-full bg-[#C6FF4D] animate-pulse" />
              <span>Available for freelance</span>
            </div>
          </motion.div>
        </motion.div>

        {/* ── OWNER PHOTO — cinematic right-panel background ── */}
        <motion.div
          style={{ y: y1, opacity: opacity1 }}
          className="absolute right-0 top-0 w-full md:w-[52%] lg:w-[48%] h-full pointer-events-none z-0"
        >
          {/* overflow wrapper for parallax scale */}
          <div className="relative w-full h-full overflow-hidden">
            {/* Left fade — keeps text readable */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#08090B] via-[#08090B]/55 to-transparent z-10" />
            {/* Top + bottom vignette */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#08090B]/50 via-transparent to-[#08090B]/85 z-10" />
            {/* Lime accent edge glow vertical line */}
            <div className="absolute left-0 top-[8%] bottom-[8%] w-[2px] bg-gradient-to-b from-transparent via-[#C6FF4D] to-transparent z-20 opacity-70" />
            {/* Warm gold colour-grade layer (echoes the mural) */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#C6A840]/15 via-transparent to-[#08090B]/30 z-10 mix-blend-overlay" />

            {/* Portrait image shifted upwards */}
            <motion.img
              initial={{ scale: 1.15, filter: 'brightness(0.4) saturate(0.6)' }}
              animate={{ scale: 1, filter: 'brightness(0.88) saturate(1)' }}
              style={{ scale: photoScale }}
              transition={{ duration: 2, ease: CINEMATIC_EASE }}
              src="/hero-full.jpg"
              alt="Portfolio Owner"
              className="w-full h-[120%] relative -top-12 md:-top-20 lg:-top-24 object-cover object-top"
            />
          </div>

          {/* Floating frosted-glass stats card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8, ease: SMOOTH_EASE }}
            className="absolute bottom-12 right-6 md:right-12 z-30 pointer-events-auto"
          >
            <div className="border border-white/10 bg-black/60 backdrop-blur-md px-6 py-4 rounded-sm flex items-center gap-6 md:gap-8 shadow-2xl">
              <div className="text-left">
                <div className="text-2xl md:text-3xl font-bold text-white tracking-tight">3+</div>
                <div className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-[#F4F3EF]/50 mt-1 font-medium">Years Exp.</div>
              </div>
              <div className="w-[1px] h-8 bg-white/10" />
              <div className="text-left">
                <div className="text-2xl md:text-3xl font-bold text-white tracking-tight">50+</div>
                <div className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-[#F4F3EF]/50 mt-1 font-medium">Projects</div>
              </div>
              <div className="w-[1px] h-8 bg-white/10" />
              <div className="text-left">
                <div className="text-2xl md:text-3xl font-bold text-[#C6FF4D] tracking-tight">∞</div>
                <div className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-[#F4F3EF]/50 mt-1 font-medium">Passion</div>
              </div>
            </div>
          </motion.div>

        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-6 md:left-12 text-[#F4F3EF]/30 text-xs uppercase tracking-widest flex items-center gap-4 rotate-90 origin-left hidden md:flex"
        >
          Scroll <div className="w-12 h-[1px] bg-[#F4F3EF]/30" />
        </motion.div>
      </section>

      {/* Selected Works Preview — Main Category: Video Editing */}
      <section className="px-6 md:px-12 lg:px-24 py-32 bg-[#121419] rounded-t-3xl border-t border-[#F4F3EF]/5">
        <SectionHeading subtitle="Curated Disciplines">Video Editing</SectionHeading>

        {/* Side-by-Side Sections: REELS & CINEMATIC */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mt-16 md:mt-24">
          
          {/* Section 1: REELS */}
          {(() => {
            const reelsProject = PROJECTS.find(p => p.id === 'p-inspiration') || PROJECTS.find(p => p.category === 'REELS');
            const totalReels = PROJECTS.filter(p => p.category === 'REELS').length;
            if (!reelsProject) return null;

            return (
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.9, ease: CINEMATIC_EASE }}
                className="flex flex-col bg-[#08090B]/60 p-6 md:p-8 rounded-3xl border border-white/10 hover:border-[#C6FF4D]/40 transition-all duration-500 shadow-xl"
              >
                {/* Section Header */}
                <div className="flex items-center justify-between gap-4 mb-8 pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-[2px] bg-[#C6FF4D]" />
                    <span className="text-xs uppercase tracking-[0.25em] text-[#C6FF4D] font-bold">
                      REELS SECTION
                    </span>
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-[#F4F3EF]/40 font-mono">
                    {totalReels} Reels Vault
                  </span>
                </div>

                {/* Card */}
                <div
                  className="group cursor-pointer flex-1 flex flex-col"
                  onClick={() => { setSelectedProject(reelsProject); setRoute('project'); }}
                >
                  <div className="relative overflow-hidden mb-6 bg-[#08090B] aspect-[4/3] sm:aspect-video rounded-2xl border border-white/10 group-hover:border-[#C6FF4D]/50 transition-all duration-500 shadow-2xl group-hover:shadow-[0_20px_50px_rgba(198,255,77,0.15)]">
                    <motion.img
                      src={reelsProject.image}
                      alt={reelsProject.title}
                      className="w-full h-full object-cover transition-transform duration-1000 ease-[0.16,1,0.3,1] group-hover:scale-105 opacity-85 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 pointer-events-none group-hover:opacity-50 transition-opacity duration-500" />
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white">
                      <Play size={12} fill="#C6FF4D" className="text-[#C6FF4D]" />
                      <span className="text-[10px] uppercase tracking-wider font-medium text-white/90">
                        REELS // SHORT-FORM
                      </span>
                    </div>

                    <div className="absolute top-4 right-4 px-2.5 py-1 rounded-md bg-[#08090B]/70 backdrop-blur-md border border-white/10 text-[9px] uppercase tracking-widest text-[#C6FF4D] font-mono">
                      4K UHD
                    </div>

                    {/* Center Play Button on hover */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#C6FF4D] text-[#08090B] flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-[0.16,1,0.3,1] z-10 pointer-events-none shadow-[0_0_30px_rgba(198,255,77,0.6)]">
                      <Play size={22} fill="currentColor" className="ml-1" />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 pt-2 mt-auto">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tighter group-hover:text-[#C6FF4D] transition-colors">
                        {reelsProject.title}
                      </h3>
                      <p className="text-[#F4F3EF]/50 text-sm mt-2">{reelsProject.client}</p>
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#C6FF4D] px-4 py-2 border border-[#C6FF4D]/30 rounded-full flex-shrink-0 bg-[#C6FF4D]/5 font-medium group-hover:bg-[#C6FF4D] group-hover:text-black transition-colors">
                      Open Reels →
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })()}

          {/* Section 2: CINEMATIC */}
          {(() => {
            const cinematicProject = PROJECTS.find(p => p.id === 'p-badulla') || PROJECTS.find(p => p.category === 'CINEMATIC');
            const totalCinematic = PROJECTS.filter(p => p.category === 'CINEMATIC').length;
            if (!cinematicProject) return null;

            return (
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.9, ease: CINEMATIC_EASE, delay: 0.15 }}
                className="flex flex-col bg-[#08090B]/60 p-6 md:p-8 rounded-3xl border border-white/10 hover:border-[#C6FF4D]/40 transition-all duration-500 shadow-xl"
              >
                {/* Section Header */}
                <div className="flex items-center justify-between gap-4 mb-8 pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-[2px] bg-[#C6FF4D]" />
                    <span className="text-xs uppercase tracking-[0.25em] text-[#C6FF4D] font-bold">
                      CINEMATIC SECTION
                    </span>
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-[#F4F3EF]/40 font-mono">
                    {totalCinematic} Cinematic Film
                  </span>
                </div>

                {/* Card */}
                <div
                  className="group cursor-pointer flex-1 flex flex-col"
                  onClick={() => { setSelectedProject(cinematicProject); setRoute('project'); }}
                >
                  <div className="relative overflow-hidden mb-6 bg-[#08090B] aspect-[4/3] sm:aspect-video rounded-2xl border border-white/10 group-hover:border-[#C6FF4D]/50 transition-all duration-500 shadow-2xl group-hover:shadow-[0_20px_50px_rgba(198,255,77,0.15)]">
                    <motion.img
                      src={cinematicProject.image}
                      alt={cinematicProject.title}
                      className="w-full h-full object-cover transition-transform duration-1000 ease-[0.16,1,0.3,1] group-hover:scale-105 opacity-85 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 pointer-events-none group-hover:opacity-50 transition-opacity duration-500" />
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white">
                      <Play size={12} fill="#C6FF4D" className="text-[#C6FF4D]" />
                      <span className="text-[10px] uppercase tracking-wider font-medium text-white/90">
                        CINEMATIC // TRAVEL
                      </span>
                    </div>

                    <div className="absolute top-4 right-4 px-2.5 py-1 rounded-md bg-[#08090B]/70 backdrop-blur-md border border-white/10 text-[9px] uppercase tracking-widest text-[#C6FF4D] font-mono">
                      4K UHD
                    </div>

                    {/* Center Play Button on hover */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#C6FF4D] text-[#08090B] flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-[0.16,1,0.3,1] z-10 pointer-events-none shadow-[0_0_30px_rgba(198,255,77,0.6)]">
                      <Play size={22} fill="currentColor" className="ml-1" />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 pt-2 mt-auto">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tighter group-hover:text-[#C6FF4D] transition-colors">
                        {cinematicProject.title}
                      </h3>
                      <p className="text-[#F4F3EF]/50 text-sm mt-2">{cinematicProject.client}</p>
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#C6FF4D] px-4 py-2 border border-[#C6FF4D]/30 rounded-full flex-shrink-0 bg-[#C6FF4D]/5 font-medium group-hover:bg-[#C6FF4D] group-hover:text-black transition-colors">
                      Open Cinematic →
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })()}

        </div>
      </section>

      {/* Main Category 2: Gaming Section */}
      <section className="px-6 md:px-12 lg:px-24 py-32 bg-[#090a0e] border-t border-[#F4F3EF]/5">
        <SectionHeading subtitle="Montages & Velocity">Gaming</SectionHeading>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mt-16 md:mt-24">
          {PROJECTS.filter(p => p.category === 'GAMING').map((gamingProject, i) => (
            <motion.div
              key={gamingProject.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.9, ease: CINEMATIC_EASE, delay: i * 0.15 }}
              className="flex flex-col bg-[#08090B]/80 p-6 md:p-8 rounded-3xl border border-white/10 hover:border-[#C6FF4D]/40 transition-all duration-500 shadow-2xl"
            >
              {/* Section Header */}
              <div className="flex items-center justify-between gap-4 mb-8 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-[2px] bg-[#C6FF4D]" />
                  <span className="text-xs uppercase tracking-[0.25em] text-[#C6FF4D] font-bold">
                    GAMING // 0{i + 1}
                  </span>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-[#F4F3EF]/40 font-mono">
                  {gamingProject.client}
                </span>
              </div>

              {/* Card */}
              <div
                className="group cursor-pointer flex-1 flex flex-col"
                onClick={() => { setSelectedProject(gamingProject); setRoute('project'); }}
              >
                <div className="relative overflow-hidden mb-6 bg-[#08090B] aspect-[4/3] sm:aspect-video rounded-2xl border border-white/10 group-hover:border-[#C6FF4D]/50 transition-all duration-500 shadow-2xl group-hover:shadow-[0_20px_50px_rgba(198,255,77,0.2)]">
                  <motion.img
                    src={gamingProject.image}
                    alt={gamingProject.title}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-[0.16,1,0.3,1] group-hover:scale-105 opacity-85 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 pointer-events-none group-hover:opacity-50 transition-opacity duration-500" />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white">
                    <Play size={12} fill="#C6FF4D" className="text-[#C6FF4D]" />
                    <span className="text-[10px] uppercase tracking-wider font-medium text-white/90">
                      GAMING // MONTAGE
                    </span>
                  </div>

                  <div className="absolute top-4 right-4 px-2.5 py-1 rounded-md bg-[#08090B]/70 backdrop-blur-md border border-white/10 text-[9px] uppercase tracking-widest text-[#C6FF4D] font-mono">
                    4K UHD
                  </div>

                  {/* Center Play Button on hover */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#C6FF4D] text-[#08090B] flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-[0.16,1,0.3,1] z-10 pointer-events-none shadow-[0_0_30px_rgba(198,255,77,0.6)]">
                    <Play size={22} fill="currentColor" className="ml-1" />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 pt-2 mt-auto">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tighter group-hover:text-[#C6FF4D] transition-colors">
                      {gamingProject.title}
                    </h3>
                    <p className="text-[#F4F3EF]/50 text-sm mt-2">{gamingProject.client}</p>
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#C6FF4D] px-4 py-2 border border-[#C6FF4D]/30 rounded-full flex-shrink-0 bg-[#C6FF4D]/5 font-medium group-hover:bg-[#C6FF4D] group-hover:text-black transition-colors">
                    Watch Gaming →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Main Category 3: Photo Editing Section */}
      <section className="px-6 md:px-12 lg:px-24 py-32 bg-[#0c0d12] border-t border-[#F4F3EF]/5">
        <SectionHeading subtitle="Color Grading & Retouching">Photo Editing</SectionHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 mt-16 md:mt-24">
          {PROJECTS.filter(p => p.category === 'PHOTO EDITING').map((photoProject, i) => (
            <motion.div
              key={photoProject.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.9, ease: CINEMATIC_EASE, delay: i * 0.15 }}
              className="flex flex-col bg-[#08090B]/90 p-5 sm:p-7 rounded-3xl border border-white/10 hover:border-[#C6FF4D]/40 transition-all duration-500 shadow-2xl"
            >
              {/* Section Header */}
              <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-5 h-[2px] bg-[#C6FF4D] shrink-0" />
                  <span className="text-xs uppercase tracking-[0.2em] text-[#C6FF4D] font-bold truncate">
                    PHOTO EDITING // 0{i + 1}
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#C6FF4D]/10 text-[#C6FF4D] border border-[#C6FF4D]/20 text-[9px] uppercase font-mono tracking-wider font-bold shrink-0">
                  {photoProject.tagPrimary || 'Photo Edit'}
                </span>
              </div>

              {/* Showcase Card */}
              <div
                className="group cursor-pointer flex-1 flex flex-col"
                onClick={() => { setSelectedProject(photoProject); setRoute('project'); }}
              >
                <div className="relative overflow-hidden mb-6 bg-[#08090B] aspect-[16/10] sm:aspect-video rounded-2xl border border-white/10 group-hover:border-[#C6FF4D]/50 transition-all duration-500 shadow-2xl group-hover:shadow-[0_20px_60px_rgba(198,255,77,0.15)]">
                  <motion.img
                    src={photoProject.image}
                    alt={photoProject.title}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-[0.16,1,0.3,1] group-hover:scale-[1.03]"
                  />

                  {/* Gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none group-hover:opacity-40 transition-opacity duration-500" />

                  {/* Top-left Badges */}
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-white shadow-lg z-10">
                    <Paintbrush size={11} className="text-[#C6FF4D]" />
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-white/90 font-mono">
                      {photoProject.beforeAfter ? 'Before & After' : 'Photo Edit'}
                    </span>
                  </div>

                  {/* Top-right Tech Badge */}
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 px-2.5 py-1 rounded-md bg-[#08090B]/85 backdrop-blur-md border border-white/15 text-[9px] uppercase tracking-widest text-[#C6FF4D] font-mono z-10">
                    4K UHD
                  </div>

                  {/* Center Action Pill on hover */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-5 py-2.5 rounded-full bg-[#C6FF4D] text-[#08090B] font-bold text-xs uppercase tracking-widest flex items-center gap-2 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-[0.16,1,0.3,1] z-10 pointer-events-none shadow-[0_0_35px_rgba(198,255,77,0.7)]">
                    <Maximize2 size={15} />
                    <span>View Project</span>
                  </div>

                  {/* Bottom Comparison Indicators (Only for Before/After) */}
                  {photoProject.beforeAfter && (
                    <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex justify-between items-center text-[9px] sm:text-[10px] font-mono font-bold tracking-wider pointer-events-none z-10">
                      <span className="px-2.5 py-1 rounded bg-black/80 backdrop-blur-md border border-white/10 text-white/70">
                        {photoProject.badgeLeft || '◄ BEFORE'}
                      </span>
                      <span className="px-2.5 py-1 rounded bg-black/80 backdrop-blur-md border border-[#C6FF4D]/40 text-[#C6FF4D]">
                        {photoProject.badgeRight || 'AFTER ►'}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2 mt-auto">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white group-hover:text-[#C6FF4D] transition-colors truncate">
                      {photoProject.title}
                    </h3>
                    <p className="text-[#F4F3EF]/50 text-xs mt-1 truncate">
                      {photoProject.client}
                    </p>
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.15em] text-[#C6FF4D] px-3.5 py-1.5 border border-[#C6FF4D]/30 rounded-full shrink-0 bg-[#C6FF4D]/5 font-semibold group-hover:bg-[#C6FF4D] group-hover:text-black transition-colors self-start sm:self-auto">
                    View Project →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Technical Mastery & Capabilities Suite */}
      <section className="px-6 md:px-12 lg:px-24 py-32 bg-[#090a0e] border-t border-[#F4F3EF]/5">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
            <div>
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#C6FF4D] font-mono mb-4">
                <span className="w-8 h-[1px] bg-[#C6FF4D]" />
                <span>03 // TECHNICAL ARSENAL</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight uppercase">
                FRAME-BY-FRAME <span className="font-serif italic font-light lowercase text-[#F4F3EF]/60">mastery</span>
              </h2>
            </div>
            <p className="text-sm md:text-base text-[#F4F3EF]/60 max-w-md font-light leading-relaxed">
              Every cut is calculated. Advanced velocity curves, surgical audio pacing, and studio-grade color mastering calibrated for maximum viewer retention.
            </p>
          </div>

          {/* Timeline Transport Ribbon */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12 p-4 md:p-6 rounded-2xl bg-black/40 border border-white/5 backdrop-blur-md">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#F4F3EF]/40">Precision</span>
              <span className="text-base sm:text-lg font-bold font-mono text-white mt-1">00:00:00:01</span>
              <span className="text-[10px] text-[#C6FF4D] font-mono mt-0.5">Frame-Accurate Cuts</span>
            </div>
            <div className="flex flex-col border-l border-white/10 pl-4">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#F4F3EF]/40">Master Standard</span>
              <span className="text-base sm:text-lg font-bold font-mono text-white mt-1">4K UHD • 60 FPS</span>
              <span className="text-[10px] text-[#C6FF4D] font-mono mt-0.5">Crisp High-Bitrate</span>
            </div>
            <div className="flex flex-col sm:border-l border-white/10 sm:pl-4">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#F4F3EF]/40">Color Space</span>
              <span className="text-base sm:text-lg font-bold font-mono text-white mt-1">ACEScc / Rec.709</span>
              <span className="text-[10px] text-[#C6FF4D] font-mono mt-0.5">Studio Calibrated</span>
            </div>
            <div className="flex flex-col border-l border-white/10 pl-4">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#F4F3EF]/40">Audio Standard</span>
              <span className="text-base sm:text-lg font-bold font-mono text-white mt-1">-14 LUFS / Stereo</span>
              <span className="text-[10px] text-[#C6FF4D] font-mono mt-0.5">Dynamic Loudness</span>
            </div>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {TECHNICAL_SKILLS.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-5%" }}
                  transition={{ duration: 0.7, delay: index * 0.08, ease: SMOOTH_EASE }}
                  className="group relative bg-[#0C0E14] hover:bg-[#10131B] p-6 sm:p-7 rounded-2xl border border-white/[0.08] hover:border-[#C6FF4D]/35 transition-all duration-500 shadow-xl"
                >
                  {/* Header: Icon, Name, Category and Percentage */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#C6FF4D] group-hover:bg-[#C6FF4D]/10 group-hover:border-[#C6FF4D]/30 transition-all duration-500 shadow-inner">
                        <Icon size={20} />
                      </div>
                      <div>
                        <h4 className="text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-[#C6FF4D] transition-colors">
                          {skill.name}
                        </h4>
                        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#F4F3EF]/50">
                          {skill.code}
                        </p>
                      </div>
                    </div>

                    <div className="text-right flex flex-col items-end shrink-0">
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black font-mono tracking-tight text-[#C6FF4D]">
                          {skill.level}
                        </span>
                        <span className="text-xs font-mono text-[#C6FF4D]/70">%</span>
                      </div>
                      <span className="text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-[#C6FF4D]/10 text-[#C6FF4D] border border-[#C6FF4D]/25 font-bold mt-1">
                        {skill.tag}
                      </span>
                    </div>
                  </div>

                  {/* Precision Scrubber / Progress Bar */}
                  <div className="my-5">
                    {/* Ruler Ticks */}
                    <div className="flex justify-between items-center text-[8px] font-mono text-white/30 mb-1.5 px-1 select-none">
                      <span>00</span>
                      <span>25</span>
                      <span>50</span>
                      <span>75</span>
                      <span>100</span>
                    </div>

                    {/* Outer Groove Track */}
                    <div className="relative h-3 w-full bg-black/70 rounded-full border border-white/10 p-[2px] overflow-hidden">
                      {/* Animated Fill Bar */}
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.3, delay: 0.15 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                        className="relative h-full rounded-full bg-gradient-to-r from-[#98E328] via-[#B8F93E] to-[#C6FF4D] shadow-[0_0_16px_rgba(198,255,77,0.45)]"
                      >
                        {/* Audio VU/Timeline Meter Segment Lines */}
                        <div 
                          className="absolute inset-0 opacity-25"
                          style={{
                            backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 3px, #08090B 3px, #08090B 5px)'
                          }}
                        />
                        {/* Playhead glow tip */}
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Summary & Feature Tags */}
                  <p className="text-xs text-[#F4F3EF]/65 leading-relaxed mb-4 font-light">
                    {skill.summary}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.06]">
                    {skill.tools.map((tool) => (
                      <span
                        key={tool}
                        className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-white/[0.03] text-white/60 border border-white/[0.05] group-hover:border-[#C6FF4D]/20 group-hover:text-white/80 transition-colors"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-28 text-center flex justify-center">
            <MagneticButton variant="secondary" onClick={() => setRoute('portfolio')}>
              Explore Full Archive
            </MagneticButton>
          </div>
        </section>
      </motion.div>
  );
};

const Portfolio = ({ setRoute, setSelectedProject }) => {
  const [filter, setFilter] = useState('ALL');
  const [playingId, setPlayingId] = useState<string | null>(null);
  const categories = ['ALL', ...Array.from(new Set(PROJECTS.map(p => p.category)))];

  const filteredProjects = filter === 'ALL' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category.includes(filter));

  return (
    <motion.div variants={pageVariants} initial="initial" animate="enter" exit="exit" className="pt-40 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <SectionHeading subtitle="Complete Archive">Index</SectionHeading>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-3 md:gap-4 mb-16">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`text-xs uppercase tracking-widest px-6 py-3 rounded-full transition-all duration-500 ${
                filter === cat 
                  ? 'bg-white text-[#08090B] font-medium' 
                  : 'border border-[#F4F3EF]/10 text-[#F4F3EF]/50 hover:text-[#F4F3EF] hover:border-[#F4F3EF]/40 bg-[#121419]/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Video Cards Grid (Exact 9:16 Reel Cards in neat rows) */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => {
              const isPlaying = playingId === project.id;

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, ease: SMOOTH_EASE, delay: i * 0.1 }}
                  key={project.id}
                  className={`group flex flex-col ${project.category === 'PHOTO EDITING' ? 'col-span-1 sm:col-span-2' : ''}`}
                >
                  {project.category === 'PHOTO EDITING' ? (
                    <div 
                      onClick={() => { setSelectedProject(project); setRoute('project'); }}
                      className="relative w-full aspect-[16/10] rounded-2xl bg-[#121419] overflow-hidden border border-[#F4F3EF]/10 group-hover:border-[#C6FF4D]/50 transition-all duration-500 shadow-2xl group-hover:shadow-[0_20px_60px_rgba(198,255,77,0.18)] cursor-pointer"
                    >
                      <motion.img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ease-[0.16,1,0.3,1]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/25 pointer-events-none group-hover:opacity-60 transition-opacity" />

                      {/* Top Badges */}
                      <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-white">
                        <Paintbrush size={10} className="text-[#C6FF4D]" />
                        <span className="text-[10px] uppercase tracking-wider font-medium text-white/90">
                          Before & After
                        </span>
                      </div>

                      <div className="absolute top-4 right-4 px-2.5 py-1 rounded-md bg-[#08090B]/70 backdrop-blur-md border border-white/10 text-[9px] uppercase tracking-widest text-[#C6FF4D] font-mono">
                        Color Grade
                      </div>

                      {/* Hover Center Pill */}
                      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                        <div className="px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-xl flex items-center gap-2 border border-white/25 group-hover:scale-110 group-hover:bg-[#C6FF4D] group-hover:text-[#08090B] group-hover:border-[#C6FF4D] transition-all duration-500 shadow-2xl text-white text-xs font-bold uppercase tracking-wider">
                          <Maximize2 size={14} />
                          <span>View Color Grade</span>
                        </div>
                      </div>

                      {/* Bottom Indicator */}
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-[10px] font-mono font-bold tracking-wider pointer-events-none">
                        <span className="px-2.5 py-1 rounded bg-black/80 backdrop-blur-md border border-white/10 text-white/70">
                          ◄ S-LOG
                        </span>
                        <span className="px-2.5 py-1 rounded bg-black/80 backdrop-blur-md border border-[#C6FF4D]/40 text-[#C6FF4D]">
                          GRADED ►
                        </span>
                      </div>
                    </div>
                  ) : (
                    /* 9:16 Vertical Video Card (Exact style from screenshot) */
                    <div 
                      onClick={() => {
                        if (!isPlaying && project.youtubeId) {
                          setPlayingId(project.id);
                        }
                      }}
                      className="relative w-full aspect-[9/16] rounded-2xl bg-[#121419] overflow-hidden border border-[#F4F3EF]/10 group-hover:border-[#C6FF4D]/50 transition-all duration-500 shadow-2xl group-hover:shadow-[0_20px_60px_rgba(198,255,77,0.18)] cursor-pointer"
                    >
                      {isPlaying && project.youtubeId ? (
                        <div className="relative w-full h-full bg-black">
                          <iframe
                            src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=1&rel=0&playsinline=1`}
                            title={project.title}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setPlayingId(null);
                            }}
                            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/70 backdrop-blur-md text-white flex items-center justify-center hover:bg-[#C6FF4D] hover:text-[#08090B] border border-white/20 transition-all z-30"
                            title="Close player"
                          >
                            <X size={18} />
                          </button>
                        </div>
                      ) : (
                        <>
                          {/* Thumbnail Image */}
                          <motion.img 
                            src={project.image} 
                            alt={project.title}
                            className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-[0.16,1,0.3,1]"
                          />

                          {/* Cinematic gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/30 pointer-events-none group-hover:opacity-50 transition-opacity" />

                          {/* Top Badges */}
                          <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white">
                            <Play size={10} fill="#C6FF4D" className="text-[#C6FF4D]" />
                            <span className="text-[10px] uppercase tracking-wider font-medium text-white/90">
                              {project.aspect === 'portrait' ? 'Short / Reel' : 'Video'}
                            </span>
                          </div>

                          <div className="absolute top-4 right-4 px-2.5 py-1 rounded-md bg-[#08090B]/70 backdrop-blur-md border border-white/10 text-[9px] uppercase tracking-widest text-[#C6FF4D] font-mono">
                            4K UHD
                          </div>

                          {/* Center Big Play Button (Exact style from screenshot) */}
                          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                            <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/25 group-hover:scale-110 group-hover:bg-[#C6FF4D] group-hover:text-[#08090B] group-hover:border-[#C6FF4D] transition-all duration-500 shadow-2xl text-white">
                              <Play size={32} fill="currentColor" className="ml-1.5" />
                            </div>
                          </div>

                          {/* Bottom Bar: Red Pulse Dot + CLICK TO PLAY REEL (Exact from photo) */}
                          <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between z-10 pointer-events-none">
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                              <p className="text-[11px] tracking-[0.2em] uppercase text-[#F4F3EF]/90 font-medium">
                                Click to Play Reel
                              </p>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {/* Card Info Below Card */}
                  <div className="mt-5 px-1 flex items-start justify-between gap-3">
                    <div>
                      <h3 
                        onClick={() => { setSelectedProject(project); setRoute('project'); }}
                        className="text-xl md:text-2xl font-bold uppercase tracking-tight text-white group-hover:text-[#C6FF4D] transition-colors cursor-pointer"
                      >
                        {project.title}
                      </h3>
                      <p className="text-[#F4F3EF]/50 text-xs md:text-sm mt-1">{project.client}</p>
                    </div>
                    <span className="text-[9px] uppercase tracking-widest text-[#F4F3EF]/40 px-3 py-1 rounded-full border border-white/10 flex-shrink-0">
                      {project.category}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

const ProjectDetail = ({ project, setRoute, setSelectedProject }) => {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const { scrollY } = useScroll();
  const yImage = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacityImage = useTransform(scrollY, [0, 600], [1, 0]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setPlayingId(null);
  }, [project]);

  if (!project) return null;

  const categoryProjects = PROJECTS.filter(p => p.category === project.category);

  return (
    <motion.div 
      initial={{ opacity: 0, backgroundColor: '#08090B' }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: CINEMATIC_EASE }}
      className="bg-[#08090B] min-h-screen relative z-10"
    >
      {/* Cinematic Full-bleed Hero */}
      <div className="relative w-full h-[70vh] md:h-screen overflow-hidden bg-[#121419]">
        <motion.div 
          style={{ y: yImage, opacity: opacityImage }}
          className="absolute inset-0 w-full h-[120%]" // Extra height for parallax
        >
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: CINEMATIC_EASE }}
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover opacity-60"
          />
        </motion.div>
        
        {/* Back Button */}
        <button 
          onClick={() => setRoute('portfolio')}
          className="absolute top-32 left-6 md:left-12 z-20 flex items-center gap-3 text-xs uppercase tracking-widest hover:text-[#C6FF4D] transition-colors mix-blend-difference text-white group"
        >
          <ArrowRight className="rotate-180 group-hover:-translate-x-2 transition-transform" size={16} /> Archive
        </button>

        {/* Overlay & Title */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 lg:p-24 bg-gradient-to-t from-[#08090B] via-[#08090B]/60 to-transparent">
          <div className="max-w-7xl mx-auto w-full">
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 1, ease: CINEMATIC_EASE }}
            >
              <span className="text-[#C6FF4D] text-xs uppercase tracking-[0.2em] mb-6 block font-medium">{project.category}</span>
              <h1 className="text-6xl md:text-9xl lg:text-[10vw] font-bold tracking-tighter uppercase leading-[0.8]">{project.title}</h1>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Project Content */}
      <div className="px-6 md:px-12 lg:px-24 py-24 max-w-6xl mx-auto relative z-10 bg-[#08090B]">
        <div>
          <h3 className="text-2xl md:text-3xl font-light leading-relaxed mb-12 tracking-tight text-[#F4F3EF]/90 text-center max-w-3xl mx-auto">
            {project.description}
          </h3>

          {/* Section Indicator */}
          <div className="flex items-center justify-center gap-3 mb-12">
            <div className="w-8 h-[1px] bg-[#C6FF4D]" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#C6FF4D] font-semibold">
              {project.category === 'PHOTO EDITING'
                ? 'PHOTO EDITING SHOWCASE'
                : `${project.category} COLLECTION (${categoryProjects.length} ${categoryProjects.length === 1 ? 'Project' : 'Projects'})`}
            </span>
            <div className="w-8 h-[1px] bg-[#C6FF4D]" />
          </div>
          
          {/* Content Cards (For Photo Editing: ONLY THIS SPECIFIC PROJECT) */}
          {project.category === 'PHOTO EDITING' ? (
            <div className="max-w-4xl mx-auto mb-20">
              <div className="flex flex-col group">
                <div className="relative w-full aspect-[16/10] sm:aspect-video rounded-3xl bg-[#121419] overflow-hidden border border-[#F4F3EF]/15 group-hover:border-[#C6FF4D]/50 transition-all duration-500 shadow-2xl">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-white shadow-lg z-10">
                    <Paintbrush size={12} className="text-[#C6FF4D]" />
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-white/90 font-mono">
                      {project.beforeAfter ? 'Before & After Comparison' : 'High-Res Photo Work'}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4 px-3 py-1.5 rounded-md bg-[#08090B]/85 backdrop-blur-md border border-white/15 text-[9px] uppercase tracking-widest text-[#C6FF4D] font-mono z-10">
                    4K MASTER
                  </div>

                  {/* Bottom Comparison Indicators (Only for Before/After) */}
                  {project.beforeAfter && (
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-xs font-mono font-bold tracking-wider pointer-events-none z-10">
                      <span className="px-3 py-1.5 rounded bg-black/85 backdrop-blur-md border border-white/10 text-white/80">
                        {project.badgeLeft || '◄ BEFORE'}
                      </span>
                      <span className="px-3 py-1.5 rounded bg-black/85 backdrop-blur-md border border-[#C6FF4D]/40 text-[#C6FF4D]">
                        {project.badgeRight || 'AFTER ►'}
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-8 px-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h4 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-white group-hover:text-[#C6FF4D] transition-colors">
                      {project.title}
                    </h4>
                    <p className="text-[#F4F3EF]/60 text-sm mt-1">{project.client}</p>
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-[#C6FF4D] px-4 py-1.5 rounded-full border border-[#C6FF4D]/30 bg-[#C6FF4D]/5 font-mono self-start sm:self-auto">
                    {project.category}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className={`grid grid-cols-1 ${categoryProjects.length > 1 ? 'md:grid-cols-2' : 'max-w-[420px] mx-auto'} gap-8 lg:gap-12 max-w-4xl mx-auto mb-20`}>
              {categoryProjects.map((p) => {
                const isPlaying = playingId === p.id;
                return (
                  <div key={p.id} className="flex flex-col group">
                    {/* The 9:16 Vertical Video Card */}
                    <div 
                      onClick={() => {
                        if (!isPlaying && p.youtubeId) {
                          setPlayingId(p.id);
                        }
                      }}
                      className="relative w-full aspect-[9/16] rounded-2xl bg-[#121419] overflow-hidden border border-[#F4F3EF]/10 group-hover:border-[#C6FF4D]/50 transition-all duration-500 shadow-2xl group-hover:shadow-[0_20px_60px_rgba(198,255,77,0.18)] cursor-pointer"
                    >
                      {isPlaying && p.youtubeId ? (
                        <div className="relative w-full h-full bg-black">
                          <iframe
                            src={`https://www.youtube.com/embed/${p.youtubeId}?autoplay=1&rel=0&playsinline=1`}
                            title={p.title}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setPlayingId(null);
                            }}
                            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/70 backdrop-blur-md text-white flex items-center justify-center hover:bg-[#C6FF4D] hover:text-[#08090B] border border-white/20 transition-all z-30"
                            title="Close player"
                          >
                            <X size={18} />
                          </button>
                        </div>
                      ) : (
                        <>
                          {/* Thumbnail Image */}
                          <motion.img 
                            src={p.image} 
                            alt={p.title}
                            className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-[0.16,1,0.3,1]"
                          />

                          {/* Cinematic gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/30 pointer-events-none group-hover:opacity-50 transition-opacity" />

                          {/* Top Badges */}
                          <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white">
                            <Play size={10} fill="#C6FF4D" className="text-[#C6FF4D]" />
                            <span className="text-[10px] uppercase tracking-wider font-medium text-white/90">
                              {p.aspect === 'portrait' ? 'Short / Reel' : 'Video'}
                            </span>
                          </div>

                          <div className="absolute top-4 right-4 px-2.5 py-1 rounded-md bg-[#08090B]/70 backdrop-blur-md border border-white/10 text-[9px] uppercase tracking-widest text-[#C6FF4D] font-mono">
                            4K UHD
                          </div>

                          {/* Center Big Play Button (Exact style circled by user) */}
                          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                            <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/25 group-hover:scale-110 group-hover:bg-[#C6FF4D] group-hover:text-[#08090B] group-hover:border-[#C6FF4D] transition-all duration-500 shadow-2xl text-white">
                              <Play size={32} fill="currentColor" className="ml-1.5" />
                            </div>
                          </div>

                          {/* Bottom Bar: Red Pulse Dot + CLICK TO PLAY REEL */}
                          <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between z-10 pointer-events-none">
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                              <p className="text-[11px] tracking-[0.2em] uppercase text-[#F4F3EF]/90 font-medium">
                                Click to Play Reel
                              </p>
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Card Info Below Card */}
                    <div className="mt-5 px-1 flex items-start justify-between gap-3">
                      <div>
                        <h4 className="text-xl md:text-2xl font-bold uppercase tracking-tight text-white group-hover:text-[#C6FF4D] transition-colors">
                          {p.title}
                        </h4>
                        <p className="text-[#F4F3EF]/50 text-xs md:text-sm mt-1">{p.client}</p>
                      </div>
                      <span className="text-[9px] uppercase tracking-widest text-[#F4F3EF]/40 px-3 py-1 rounded-full border border-white/10 flex-shrink-0">
                        {p.category}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="flex justify-center mt-32">
            <MagneticButton onClick={() => setRoute('contact')}>
              Start a similar project
            </MagneticButton>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Services = ({ setRoute }) => {
  const [hoveredService, setHoveredService] = useState(null);

  return (
    <motion.div variants={pageVariants} initial="initial" animate="enter" exit="exit" className="pt-40 pb-24 relative min-h-screen">
      
      {/* Background Image Reveal based on Hover */}
      <div className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-1000 ease-in-out opacity-20">
        <AnimatePresence>
          {hoveredService && (
            <motion.img 
              key={hoveredService}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: SMOOTH_EASE }}
              src={SERVICES.find(s => s.id === hoveredService)?.image}
              className="absolute inset-0 w-full h-full object-cover filter grayscale"
              alt="Service background"
            />
          )}
        </AnimatePresence>
        <div className="absolute inset-0 bg-[#08090B]/80 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <SectionHeading subtitle="Capabilities">Services</SectionHeading>
        
        <div className="mt-20 flex flex-col gap-0 border-t border-[#F4F3EF]/20">
          {SERVICES.map((service, i) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: CINEMATIC_EASE, delay: i * 0.1 }}
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
              className="group py-12 md:py-16 border-b border-[#F4F3EF]/20 flex flex-col lg:flex-row gap-8 lg:gap-24 relative hover:bg-[#121419]/80 transition-colors duration-500 px-6 -mx-6 md:px-12 md:-mx-12 rounded-sm cursor-crosshair"
            >
              {/* Index & Icon */}
              <div className="flex lg:flex-col justify-between lg:w-24 flex-shrink-0">
                <span className="text-[#F4F3EF]/20 text-4xl md:text-5xl font-bold tracking-tighter group-hover:text-[#C6FF4D] transition-colors duration-500">
                  0{i + 1}
                </span>
                <div className="text-[#F4F3EF]/30 group-hover:text-white transition-colors duration-500 mt-4 lg:mt-auto">
                  <service.icon size={36} strokeWidth={1.5} />
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-grow">
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tighter mb-6 group-hover:text-white text-[#F4F3EF]/80 transition-colors duration-500">
                  {service.title}
                </h3>
                <p className="text-lg md:text-xl text-[#F4F3EF]/60 font-light max-w-2xl leading-relaxed mb-8 group-hover:text-[#F4F3EF]/90 transition-colors duration-500">
                  {service.description}
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-6 border-t border-[#F4F3EF]/10 pt-6">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#C6FF4D] flex-shrink-0 font-medium">Delivers</span>
                  <p className="text-sm text-[#F4F3EF]/70">{service.delivers}</p>
                </div>
              </div>
              
              {/* Action Indicator */}
              <div className="hidden lg:flex items-center justify-end w-24">
                <div className="w-16 h-16 rounded-full border border-[#F4F3EF]/10 flex items-center justify-center group-hover:bg-[#C6FF4D] group-hover:border-[#C6FF4D] group-hover:text-[#08090B] text-[#F4F3EF]/30 transition-all duration-500 -rotate-45 group-hover:rotate-0 shadow-lg">
                  <ArrowRight size={24} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-32 p-12 md:p-24 bg-[#121419] flex flex-col items-center text-center rounded-sm border border-[#F4F3EF]/5 relative overflow-hidden group">
          <div className="absolute inset-0 bg-[#C6FF4D]/5 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-700 ease-in-out" />
          <h3 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-6 relative z-10">Need a custom package?</h3>
          <p className="text-[#F4F3EF]/60 max-w-lg mx-auto mb-10 text-lg relative z-10 font-light">I frequently combine video editing, motion design, and graphic design to deliver comprehensive visual campaigns for creators and brands.</p>
          <MagneticButton onClick={() => setRoute('contact')} className="relative z-10">Let's Discuss Your Needs</MagneticButton>
        </div>
      </div>
    </motion.div>
  );
};

const About = ({ setRoute }) => {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="enter" exit="exit" className="pt-40 pb-24">
      {/* Intro */}
      <section className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto mb-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: CINEMATIC_EASE }}
              className="aspect-[3/4] max-w-[480px] mx-auto overflow-hidden rounded-2xl relative border border-white/15 group-hover:border-[#C6FF4D]/40 shadow-[0_25px_60px_rgba(0,0,0,0.9)] group bg-[#08090B] transition-all duration-700"
            >
              <img 
                src="/about-owner.jpg" 
                alt="Shaveen Shanidu - Fodex Studios" 
                className="w-full h-full object-cover object-center select-none group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08090B]/90 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
              
              <div className="absolute bottom-6 left-6 right-6 border border-white/15 backdrop-blur-md bg-black/65 p-4 rounded-xl shadow-xl">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C6FF4D] animate-pulse" />
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#C6FF4D] font-bold font-mono">Director & Lead Editor</p>
                </div>
                <p className="text-base font-bold tracking-tight text-white font-['Syne',sans-serif]">Shaveen Shanidu</p>
                <p className="text-[11px] uppercase tracking-wider text-white/50 font-mono">Fodex Studios</p>
              </div>
            </motion.div>
          </div>
          <div className="lg:col-span-7 order-1 lg:order-2">
            <SectionHeading subtitle="The Director">Behind the Screen</SectionHeading>
            <div className="text-xl md:text-2xl font-light text-[#F4F3EF]/70 leading-relaxed flex flex-col gap-8">
              <p>
                I am an independent <strong className="text-white font-medium">Video Editor and Graphic Designer</strong> specializing in cinematic storytelling and bold visual identities.
              </p>
              <p>
                With a background in both rhythm-driven editing and strict typographic design, I bridge the gap between motion and static artwork. I believe every frame matters, whether it's on screen for a microsecond or printed on a billboard.
              </p>
              <p>
                My primary toolset includes Premiere Pro, After Effects, DaVinci Resolve, and the Adobe Creative Suite. But tools are secondary to taste, pacing, and composition.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cinematic Process Section */}
      <section className="bg-[#121419] py-32 md:py-48 px-6 md:px-12 lg:px-24 border-y border-[#F4F3EF]/5">
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle="Workflow">Creative Process</SectionHeading>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mt-24 relative">
            {/* Connecting line for desktop */}
            <div className="hidden lg:block absolute top-[28px] left-8 right-8 h-[1px] bg-[#F4F3EF]/10 z-0" />
            
            {PROCESS.map((p, i) => (
              <motion.div 
                key={p.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ delay: i * 0.15, duration: 0.8, ease: CINEMATIC_EASE }}
                className="relative z-10 group"
              >
                <div className="w-14 h-14 rounded-full bg-[#08090B] border border-[#F4F3EF]/20 flex items-center justify-center text-lg font-bold mb-8 group-hover:border-[#C6FF4D] group-hover:text-[#C6FF4D] group-hover:scale-110 transition-all duration-500 shadow-xl text-[#F4F3EF]/50">
                  {p.step}
                </div>
                <h3 className="text-3xl font-bold uppercase tracking-tighter mb-4 text-white group-hover:text-[#C6FF4D] transition-colors">{p.title}</h3>
                <p className="text-[#F4F3EF]/60 text-sm leading-relaxed pr-4 font-light">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

// ─── Web3Forms Backend Configuration ──────────────────────────────────────────
// Connected to fodex828@gmail.com
const WEB3FORMS_ACCESS_KEY = '1c84920d-2de0-4b57-9c1e-03449bd79b2c';
// ─────────────────────────────────────────────────────────────────────────────

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({
    from_name: '',
    reply_to: '',
    project_type: '',
    message: '',
  });

  const [errors, setErrors]   = useState<Record<string, string>>({});
  const [status, setStatus]   = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.from_name.trim())   newErrors.from_name    = 'Name is required';
    if (!formData.reply_to.trim())    newErrors.reply_to     = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.reply_to))
                                      newErrors.reply_to     = 'Enter a valid email';
    if (!formData.project_type)       newErrors.project_type = 'Please select a project type';
    if (!formData.message.trim())     newErrors.message      = 'Message is required';
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (!WEB3FORMS_ACCESS_KEY || WEB3FORMS_ACCESS_KEY === 'YOUR_WEB3FORMS_ACCESS_KEY') {
      setStatus('error');
      setErrorMsg('Please add your Web3Forms Access Key from web3forms.com to activate email delivery.');
      return;
    }

    setStatus('loading');
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: formData.from_name,
          email: formData.reply_to,
          project_type: formData.project_type,
          message: formData.message,
          from_name: 'Fodex Studios Portfolio Lead',
          subject: `New Project Inquiry from ${formData.from_name} [${formData.project_type}]`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setFormData({ from_name: '', reply_to: '', project_type: '', message: '' });
      } else {
        setStatus('error');
        setErrorMsg(result.message || 'Something went wrong. Please check your access key or try again.');
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err?.message || 'Network error. Please try again.');
    }
  };

  const inputClass = (field: string) =>
    `bg-transparent border-b pb-4 outline-none transition-colors text-white placeholder-[#F4F3EF]/30 w-full text-lg ${
      errors[field]
        ? 'border-red-500 focus:border-red-400'
        : 'border-[#F4F3EF]/20 focus:border-[#C6FF4D]'
    }`;

  return (
    <motion.div variants={pageVariants} initial="initial" animate="enter" exit="exit" className="min-h-screen flex items-center pt-40 pb-24 px-6 md:px-12 lg:px-24 bg-[#08090B]">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div variants={textRevealVariants} className="mb-8 flex flex-wrap items-center gap-4">
          <div className="w-2 h-2 rounded-full bg-[#C6FF4D] animate-pulse" />
          <span className="text-[#C6FF4D] text-xs uppercase tracking-[0.2em] font-medium">Currently accepting new projects</span>
        </motion.div>

        <h1 className="text-6xl md:text-8xl lg:text-[9vw] font-bold tracking-tighter uppercase leading-[0.85] mb-20 lg:mb-32">
          <SplitText>Let's Make</SplitText>
          <div className="flex flex-wrap items-center">
            <span className="text-[#F4F3EF]/20 hover:text-white transition-colors duration-700 cursor-default mr-4 md:mr-8">Something</span>
            <SplitText>Unforgettable.</SplitText>
          </div>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 border-t border-[#F4F3EF]/10 pt-16 lg:pt-24">

          {/* Left — Direct Inquiries */}
          <div className="flex flex-col">
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#F4F3EF]/40 mb-6 font-medium">Direct Inquiries</h3>
            <a 
              href="mailto:fodex828@gmail.com" 
              className="group flex items-center gap-4 md:gap-6 text-2xl sm:text-3xl md:text-5xl font-medium text-white hover:text-[#C6FF4D] transition-colors w-fit tracking-tight break-all"
            >
              fodex828@gmail.com
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-current flex-shrink-0 flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-[0.16,1,0.3,1]">
                <ArrowUpRight size={22} />
              </div>
            </a>
            
            <div className="mt-8 pt-8 border-t border-[#F4F3EF]/10">
              <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#F4F3EF]/40 mb-3 font-medium">Direct WhatsApp Inquiry</h4>
              <a 
                href="https://wa.me/94725423606" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group inline-flex items-center gap-3 text-xl md:text-2xl font-mono text-[#C6FF4D] hover:underline"
              >
                +94 72 542 3606
                <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <p className="text-xs uppercase tracking-widest text-[#F4F3EF]/40 font-mono mt-1 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF4D] animate-ping" />
                Available for Instant Chat on WhatsApp
              </p>
            </div>

            <div className="mt-12 md:mt-16">
              <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#F4F3EF]/40 mb-6 font-medium">Socials & Networks</h3>
              <div className="flex flex-wrap items-center gap-6 md:gap-8">
                <a 
                  href="https://www.instagram.com/fod3x_/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm uppercase tracking-widest text-[#F4F3EF] hover:text-[#C6FF4D] transition-colors relative after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-[1px] after:bg-[#C6FF4D] hover:after:w-full after:transition-all after:duration-500 flex items-center gap-2"
                >
                  Instagram (@fod3x_)
                  <ArrowUpRight size={14} className="opacity-60" />
                </a>
                <a 
                  href="https://wa.me/94725423606" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm uppercase tracking-widest text-[#F4F3EF] hover:text-[#C6FF4D] transition-colors relative after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-[1px] after:bg-[#C6FF4D] hover:after:w-full after:transition-all after:duration-500 flex items-center gap-2"
                >
                  WhatsApp
                  <ArrowUpRight size={14} className="opacity-60" />
                </a>
              </div>
            </div>
          </div>

          {/* Right — Contact Form */}
          <div className="bg-[#121419] p-8 md:p-12 rounded-sm border border-[#F4F3EF]/5 relative overflow-hidden">

            {/* Success overlay */}
            <AnimatePresence>
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: SMOOTH_EASE }}
                  className="absolute inset-0 bg-[#121419] flex flex-col items-center justify-center gap-6 z-20 p-12 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
                    className="w-20 h-20 rounded-full bg-[#C6FF4D]/10 border border-[#C6FF4D] flex items-center justify-center"
                  >
                    <CheckCircle size={36} className="text-[#C6FF4D]" />
                  </motion.div>
                  <h3 className="text-3xl font-bold uppercase tracking-tighter text-white">Message Sent!</h3>
                  <p className="text-[#F4F3EF]/60 font-light">Thanks for reaching out. I'll get back to you within 24 hours.</p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="text-xs uppercase tracking-widest text-[#C6FF4D] border border-[#C6FF4D]/30 px-6 py-3 rounded-full hover:bg-[#C6FF4D] hover:text-[#08090B] transition-all duration-300 mt-4"
                  >
                    Send Another
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <h3 className="text-2xl font-bold uppercase tracking-tighter mb-10 text-white">Project Brief</h3>

            <form ref={formRef} className="flex flex-col gap-8" onSubmit={handleSubmit} noValidate>

              {/* Name */}
              <div className="relative">
                <input
                  type="text"
                  name="from_name"
                  value={formData.from_name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className={inputClass('from_name')}
                />
                {errors.from_name && (
                  <p className="text-red-400 text-xs mt-2 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.from_name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="relative">
                <input
                  type="email"
                  name="reply_to"
                  value={formData.reply_to}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className={inputClass('reply_to')}
                />
                {errors.reply_to && (
                  <p className="text-red-400 text-xs mt-2 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.reply_to}
                  </p>
                )}
              </div>

              {/* Project Type */}
              <div className="relative">
                <select
                  name="project_type"
                  value={formData.project_type}
                  onChange={handleChange}
                  className={`${inputClass('project_type')} appearance-none cursor-pointer ${
                    formData.project_type ? 'text-white' : 'text-[#F4F3EF]/40'
                  }`}
                >
                  <option value="" disabled>Project Type</option>
                  <option value="Cinematic & Commercial Video" className="bg-[#121419] text-white">Cinematic & Commercial Video</option>
                  <option value="Short-Form / Reels / TikTok" className="bg-[#121419] text-white">Short-Form / Reels / TikTok</option>
                  <option value="Gaming Montage & AMV" className="bg-[#121419] text-white">Gaming Montage & AMV</option>
                  <option value="Photo Editing & Restoration" className="bg-[#121419] text-white">Photo Editing & Restoration</option>
                  <option value="Color Grading (S-Log / RAW)" className="bg-[#121419] text-white">Color Grading (S-Log / RAW)</option>
                  <option value="Motion Graphics & VFX" className="bg-[#121419] text-white">Motion Graphics & VFX</option>
                  <option value="Comprehensive Creative Campaign" className="bg-[#121419] text-white">Comprehensive Creative Campaign</option>
                </select>
                {errors.project_type && (
                  <p className="text-red-400 text-xs mt-2 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.project_type}
                  </p>
                )}
              </div>

              {/* Message */}
              <div className="relative">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project, timeline, and goals..."
                  rows={4}
                  className={`${inputClass('message')} resize-none`}
                />
                {errors.message && (
                  <p className="text-red-400 text-xs mt-2 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.message}
                  </p>
                )}
              </div>

              {/* API error banner */}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 rounded-sm px-4 py-3"
                >
                  <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
                  <p className="text-red-400 text-sm">{errorMsg}</p>
                </motion.div>
              )}

              {/* Submit */}
              <div className="flex flex-col gap-3 mt-2">
                <motion.button
                  type="submit"
                  disabled={status === 'loading'}
                  whileHover={status !== 'loading' ? { scale: 1.02 } : {}}
                  whileTap={status !== 'loading' ? { scale: 0.98 } : {}}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-medium text-sm tracking-widest uppercase bg-[#C6FF4D] text-[#08090B] hover:bg-white transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed self-start"
                >
                  {status === 'loading' ? (
                    <><Loader2 size={18} className="animate-spin" /> Sending...</>
                  ) : (
                    <><Send size={18} /> Submit Request</>
                  )}
                </motion.button>
                <p className="text-[10px] uppercase tracking-widest text-[#F4F3EF]/30 font-mono">
                  Direct Delivery to fodex828@gmail.com · Replies within 24h
                </p>
              </div>

            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [currentRoute, setCurrentRoute] = useState('home');
  const [selectedProject, setSelectedProject] = useState(null);

  // Global styling application
  useEffect(() => {
    document.body.style.backgroundColor = THEME.bgBase;
    document.body.style.color = THEME.textPrimary;
    document.body.style.margin = "0";
    document.body.style.fontFamily = "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <div className="relative min-h-screen selection:bg-[#C6FF4D] selection:text-[#08090B]">
      <Analytics />
      
      {/* Cinematic Film Grain Overlay */}
      <div 
        className="pointer-events-none fixed inset-0 z-[100] h-full w-full opacity-[0.03] mix-blend-overlay" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
        }} 
      />

      <Navigation currentRoute={currentRoute} setRoute={setCurrentRoute} />

      {/* Main Content Area with Smooth Route Transitions */}
      <AnimatePresence mode="wait">
        {currentRoute === 'home' && (
          <Home key="home" setRoute={setCurrentRoute} setSelectedProject={setSelectedProject} />
        )}
        {currentRoute === 'portfolio' && (
          <Portfolio key="portfolio" setRoute={setCurrentRoute} setSelectedProject={setSelectedProject} />
        )}
        {currentRoute === 'project' && (
          <ProjectDetail key="project" project={selectedProject} setRoute={setCurrentRoute} setSelectedProject={setSelectedProject} />
        )}
        {currentRoute === 'services' && (
          <Services key="services" setRoute={setCurrentRoute} />
        )}
        {currentRoute === 'about' && (
          <About key="about" setRoute={setCurrentRoute} />
        )}
        {currentRoute === 'contact' && (
          <Contact key="contact" />
        )}
      </AnimatePresence>

      {/* Footer */}
      {currentRoute !== 'contact' && (
        <footer className="border-t border-[#F4F3EF]/10 py-10 px-6 md:px-12 lg:px-24 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.2em] text-[#F4F3EF]/40 mt-auto bg-[#08090B] relative z-20">
          <p>© {new Date().getFullYear()} FODEX STUDIOS. ALL RIGHTS RESERVED.</p>
          <div className="flex flex-wrap gap-8">
            <button onClick={() => setCurrentRoute('contact')} className="hover:text-white transition-colors">Contact</button>
            <a href="https://www.instagram.com/fod3x_/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
            <a href="https://wa.me/94725423606" target="_blank" rel="noopener noreferrer" className="hover:text-[#C6FF4D] transition-colors">WhatsApp</a>
          </div>
        </footer>
      )}
    </div>
  );
}
