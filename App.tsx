
import React, { useState, useEffect, useRef } from 'react';
import { Play, Check, Star, ShieldCheck, X, ChevronRight, Lock, ArrowRight, ArrowLeft, Plus, Minus, Instagram, Award, Clock, AlertTriangle, ArrowDown, Zap, CheckCircle2, ChevronLeft, Heart, Medal, Users } from 'lucide-react';

// --- Assets ---
const VSL_URL = "https://erxxuotslhjluwrlxmyx.supabase.co/storage/v1/object/sign/LANDING%20POST%20PARTO/VSL_POST_PARTO.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZWQxZTBkNS1mNzcwLTRmMDMtODRhYy1jYTk2YzZkZmM1NDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMQU5ESU5HIFBPU1QgUEFSVE8vVlNMX1BPU1RfUEFSVE8ubXA0IiwiaWF0IjoxNzY4MDg1NDIxLCJleHAiOjE3OTk2MjE0MjF9.qeLRDt57HU_vY6e66-V1fhAq4e0saLazMgzvxEEifpQ";
const MUSCLE_GIF = "https://erxxuotslhjluwrlxmyx.supabase.co/storage/v1/object/sign/LANDING%20POST%20PARTO/94805f18-ea35-4300-a4c3-385cfa210778-ezgif.com-video-to-webp-converter.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZWQxZTBkNS1mNzcwLTRmMDMtODRhYy1jYTk2YzZkZmM1NDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMQU5ESU5HIFBPU1QgUEFSVE8vOTQ4MDVmMTgtZWEzNS00MzAwLWE0YzMtMzg1Y2ZhMjEwNzc4LWV6Z2lmLmNvbS12aWRlby10by13ZWJwLWNvbnZlcnRlci53ZWJwIiwiaWF0IjoxNzY4MTQ2OTg1LCJleHAiOjE3OTk2ODI5ODV9.59F6AT2-Q8OJXLB4Ulk1XEKKZ_b9MGd3R-TUjX4ffiQ";
const AUTHOR_IMG = "https://erxxuotslhjluwrlxmyx.supabase.co/storage/v1/object/sign/LANDING%20POST%20PARTO/imgi_34_NATIS-REDES-1.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZWQxZTBkNS1mNzcwLTRmMDMtODRhYy1jYTk2YzZkZmM1NDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMQU5ESU5HIFBPU1QgUEFSVE8vaW1naV8zNF9OQVRJUy1SRURFUy0xLndlYnAiLCJpYXQiOjE3NjgwODY1NDEsImV4cCI6MTc5OTYyMjU0MX0.wL9x9lGURoTs4ZevVVTtuzyWuRpP3PNYURbDlv1P3-Y";
const CORSET_IMG = "https://erxxuotslhjluwrlxmyx.supabase.co/storage/v1/object/sign/LANDING%20POST%20PARTO/Gemini_Generated_Image_5k1nde5k1nde5k1n.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZWQxZTBkNS1mNzcwLTRmMDMtODRhYy1jYTk2YzZkZmM1NDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMQU5ESU5HIFBPU1QgUEFSVE8vR2VtaW5pX0dlbmVyYXRlZF9JbWFnZV81azFuZGU1azFuZGU1azFuLnBuZyIsImlhdCI6MTc2ODQ0NDc4MywiZXhwIjoxNzk5OTgwNzgzfQ.4_kHukGknYOHVL9hhkg3cLCS2cgoXL6k0l582KB1ra8";
const GLOBO_IMG = "https://erxxuotslhjluwrlxmyx.supabase.co/storage/v1/object/sign/LANDING%20POST%20PARTO/Captura%20de%20pantalla%202026-01-10%20233122.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZWQxZTBkNS1mNzcwLTRmMDMtODRhYy1jYTk2YzZkZmM1NDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMQU5ESU5HIFBPU1QgUEFSVE8vQ2FwdHVyYSBkZSBwYW50YWxsYSAyMDI2LTAxLTEwIDIzMzEyMi5wbmciLCJpYXQiOjE3Njg0NDQ4MTYsImV4cCI6MTc5OTk4MDgxNn0.C5aE7JCAd-A3ySkAzyMeRQAjSAaHS4Zvvczw_JaBy1g";

const TESTIMONIAL_IMAGES = [
  "https://erxxuotslhjluwrlxmyx.supabase.co/storage/v1/object/sign/LANDING%20POST%20PARTO/TESTIMONIO%201.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZWQxZTBkNS1mNzcwLTRmMDMtODRhYy1jYTk2YzZkZmM1NDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMQU5ESU5HIFBPU1QgUEFSVE8vVEVTVElNT05JTyAxLmpwZyIsImlhdCI6MTc2ODA4NDk0MiwiZXhwIjoxNzk5NjIwOTQyfQ.P-pcde3yYky-gXNh4akGsaISgBD8IP-0zoJ0IGYUJhY",
  "https://erxxuotslhjluwrlxmyx.supabase.co/storage/v1/object/sign/LANDING%20POST%20PARTO/TESTIMONIO%202.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZWQxZTBkNS1mNzcwLTRmMDMtODRhYy1jYTk2YzZkZmM1NDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMQU5ESU5HIFBPU1QgUEFSVE8vVEVTVElNT05JTyAyLmpwZyIsImlhdCI6MTc2ODA4NDk3NywiZXhwIjoxNzk5NjIwOTc3fQ.obrzcpzYfAN3ihe6Wvt0lq1hFaMMMUksbvucbUbG6zc",
  "https://erxxuotslhjluwrlxmyx.supabase.co/storage/v1/object/sign/LANDING%20POST%20PARTO/TESTIMONIO%203.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZWQxZTBkNS1mNzcwLTRmMDMtODRhYy1jYTk2YzZkZmM1NDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMQU5ESU5HIFBPU1QgUEFSVE8vVEVTVElNT05JTyAzLmpwZyIsImlhdCI6MTc2ODA4NTAwNCwiZXhwIjoxNzk5NjIxMDA0fQ.DoDFq8T9Sn7hYjN5eywaLJnFW6tw1G0eg5C9XbdRlK8",
  "https://erxxuotslhjluwrlxmyx.supabase.co/storage/v1/object/sign/LANDING%20POST%20PARTO/TESTIMONIO%204.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZWQxZTBkNS1mNzcwLTRmMDMtODRhYy1jYTk2YzZkZmM1NDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMQU5ESU5HIFBPU1QgUEFSVE8vVEVTVElNT05JTyA0LmpwZyIsImlhdCI6MTc2ODA4NTAzMSwiZXhwIjoxNzk5NjIxMDMxfQ.-5FBi7tk747OXo2SnJvy6JnrYe_e92_58UpRlHMoSCI",
  "https://erxxuotslhjluwrlxmyx.supabase.co/storage/v1/object/sign/LANDING%20POST%20PARTO/TESTIMONIO%205.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZWQxZTBkNS1mNzcwLTRmMDMtODRhYy1jYTk2YzZkZmM1NDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMQU5ESU5HIFBPU1QgUEFSVE8vVEVTVElNT05JTyA1LmpwZyIsImlhdCI6MTc2ODA4NTA1MywiZXhwIjoxNzk5NjIxMDUzfQ.KA2WoRlHW0BjLxCLhTSupITw2A6nTNeHfgtjhAC5w2Q",
  "https://erxxuotslhjluwrlxmyx.supabase.co/storage/v1/object/sign/LANDING%20POST%20PARTO/TESTIMONIO%207.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZWQxZTBkNS1mNzcwLTRmMDMtODRhYy1jYTk2YzZkZmM1NDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMQU5ESU5HIFBPU1QgUEFSVE8vVEVTVElNT05JTyA3LmpwZyIsImlhdCI6MTc2ODA4NTA2NywiZXhwIjoxNzk5NjIxMDY3fQ.pb7M9R43RtGfZYm2zjozr_lCPoE4aN5VRgSf9Od59uQ"
];

const TESTIMONIAL_VIDEOS = [
  "https://erxxuotslhjluwrlxmyx.supabase.co/storage/v1/object/sign/LANDING%20POST%20PARTO/1(2).mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZWQxZTBkNS1mNzcwLTRmMDMtODRhYy1jYTk2YzZkZmM1NDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMQU5ESU5HIFBPU1QgUEFSVE8vMSgyKS5tcDQiLCJpYXQiOjE3NjgwODUwOTcsImV4cCI6MTc5OTYyMTA5N30.NA_WhqUQzAyJQbUkwJKgpj1HxmjYxjgXkLreC4UJBws",
  "https://erxxuotslhjluwrlxmyx.supabase.co/storage/v1/object/sign/LANDING%20POST%20PARTO/2(2).mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZWQxZTBkNS1mNzcwLTRmMDMtODRhYy1jYTk2YzZkZmM1NDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMQU5ESU5HIFBPU1QgUEFSVE8vMigyKS5tcDQiLCJpYXQiOjE3NjgwODUxMDgsImV4cCI6MTc5OTYyMTEwOH0.U6IBOLa9j9jN4rCGRi9Ley9SxK36PZixTzBKvx5Iv-Q",
  "https://erxxuotslhjluwrlxmyx.supabase.co/storage/v1/object/sign/LANDING%20POST%20PARTO/3(2).mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZWQxZTBkNS1mNzcwLTRmMDMtODRhYy1jYTk2YzZkZmM1NDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMQU5ESU5HIFBPU1QgUEFSVE8vMygyKS5tcDQiLCJpYXQiOjE3NjgwODUxMzEsImV4cCI6MTc5OTYyMTEzMX0.2OqJtkUvxAjeD0qSrV130J2q6FSVDxAN_Qhzc_JyGzE",
  "https://erxxuotslhjluwrlxmyx.supabase.co/storage/v1/object/sign/LANDING%20POST%20PARTO/4(2).mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZWQxZTBkNS1mNzcwLTRmMDMtODRhYy1jYTk2YzZkZmM1NDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMQU5ESU5HIFBPU1QgUEFSVE8vNCgyKS5tcDQiLCJpYXQiOjE3NjgwODUxMzEsImV4cCI6MTc5OTYyMTEzMX0.xqmwWzyf3mdPLInaUFrTplNTPmLCbTGAvu10Ibn1GXw",
  "https://erxxuotslhjluwrlxmyx.supabase.co/storage/v1/object/sign/LANDING%20POST%20PARTO/VSL_POST_PARTO.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZWQxZTBkNS1mNzcwLTRmMDMtODRhYy1jYTk2YzZkZmM1NDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMQU5ESU5HIFBPU1QgUEFSVE8vVlNMX1BPU1RfUEFSVE8ubXA0IiwiaWF0IjoxNzY4MDg1NDIxLCJleHAiOjE3OTk2MjE0MjF9.qeLRDt57HU_vY6e66-V1fhAq4e0saLazMgzvxEEifpQ" 
];

// --- Components ---

const Badge: React.FC<{ text: string }> = ({ text }) => (
  <div className="inline-flex items-center px-3 py-1 rounded-full bg-lime-400/20 border border-lime-400/40 text-sage-900 text-[10px] font-bold uppercase tracking-wider mb-4 shadow-sm">
    <span className="w-2 h-2 rounded-full bg-lime-500 mr-2 animate-pulse shadow-[0_0_8px_#84CC16]"></span>
    {text}
  </div>
);

const Carousel: React.FC<{ children: React.ReactNode, autoPlay?: boolean }> = ({ children, autoPlay = true }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -clientWidth : clientWidth, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: clientWidth * 0.8, behavior: 'smooth' });
        }
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [autoPlay]);

  return (
    <div className="relative group w-full">
       <button onClick={() => scroll('left')} className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-2xl opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity active:scale-90">
          <ChevronLeft size={24} className="text-sage-900 stroke-[3px]" />
       </button>
       <button onClick={() => scroll('right')} className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-2xl opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity active:scale-90">
          <ChevronRight size={24} className="text-sage-900 stroke-[3px]" />
       </button>
       <div ref={scrollRef} className="flex overflow-x-auto snap-x snap-mandatory px-5 gap-6 pb-12 no-scrollbar scroll-smooth">
        {children}
      </div>
    </div>
  );
};

const FAQItem: React.FC<{ question: string, answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-sage-100 last:border-0">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full py-6 flex items-center justify-between text-left group">
        <span className="font-bold text-sage-900 group-hover:text-lime-600 transition-colors pr-4">{question}</span>
        <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${isOpen ? 'bg-sage-900 text-white' : 'bg-sage-100 text-sage-500'}`}>
            {isOpen ? <Minus size={14} /> : <Plus size={14} />}
        </div>
      </button>
      {isOpen && <p className="text-gray-500 text-sm leading-relaxed pb-6 pr-4 animate-fade-in">{answer}</p>}
    </div>
  );
};

const StickyCTA: React.FC<{ isVisible: boolean }> = ({ isVisible }) => (
  <div className={`fixed bottom-0 left-0 w-full z-50 p-4 bg-black/95 backdrop-blur-xl border-t border-white/5 transition-transform duration-500 ${isVisible ? 'translate-y-0' : 'translate-y-[120%]'}`}>
    <a href="https://go.hotmart.com/D102309348Q?ap=4cfb" className="w-full bg-gradient-to-r from-lime-400 to-lime-600 text-sage-900 font-black text-xl py-5 rounded-[1.5rem] shadow-[0_10px_30px_rgba(132,204,22,0.3)] active:scale-95 transition-all flex items-center justify-center gap-3">
      <span>INICIAR MI CAMBIO</span> 
      <div className="flex flex-col leading-none text-left border-l border-black/20 pl-3">
          <span className="text-[10px] opacity-70 line-through font-bold">$197.00</span>
          <span className="text-xl font-black leading-none">$69.99</span>
      </div>
      <ChevronRight className="w-6 h-6 stroke-[3px]" />
    </a>
  </div>
);

// --- Page Sections ---

const LandingPage: React.FC<{ onNavigate: (v: string) => void }> = ({ onNavigate }) => {
  const vslRef = useRef<HTMLDivElement>(null);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (vslRef.current) {
        const vslBottom = vslRef.current.getBoundingClientRect().bottom;
        setShowSticky(vslBottom < 0);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="pb-24 overflow-x-hidden bg-cream">
      {/* HERO */}
      <section className="px-5 pt-16 pb-16 text-center max-w-lg mx-auto">
        <Badge text="Resultados Científicos · Postparto Seguro" />
        {/* Fuente reducida y tracking-normal para evitar amontonamiento */}
        <h1 className="text-[1.5rem] xs:text-[1.75rem] sm:text-2xl md:text-4xl font-black leading-[1.3] md:leading-tight mb-8 tracking-normal break-words">
          ¿Tu abdomen <span className="animate-gradient bg-gradient-to-r from-lime-600 via-lime-400 to-lime-600 bg-clip-text text-transparent italic">sigue abultado</span> como si estuvieras embarazada?
        </h1>
        <p className="text-gray-500 text-sm md:text-base mb-10 max-w-xs mx-auto leading-relaxed">
          No es grasa rebelde, es una separación muscular. Ciérrala y aplana tu vientre con el método exacto en <b>21 días</b>.
        </p>

        <div ref={vslRef} className="relative aspect-video bg-black rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden mb-12 border border-white/10 group">
          <video className="w-full h-full object-cover" controls playsInline>
            <source src={VSL_URL} type="video/mp4" />
          </video>
          <div className="absolute top-4 left-4 pointer-events-none">
             <div className="bg-red-600 text-white text-[8px] font-black px-2 py-1 rounded-full animate-pulse flex items-center gap-1">
                <div className="w-1 h-1 bg-white rounded-full"></div> EN VIVO
             </div>
          </div>
        </div>
      </section>

      {/* BLOQUE PROBLEMA: COMPARACIÓN */}
      <section className="px-5 py-24 bg-white rounded-t-[3rem] shadow-2xl w-full max-w-2xl mx-auto">
        <div className="text-center mb-16 px-2">
          <span className="text-lime-600 text-[10px] font-black tracking-widest uppercase mb-4 block">BIOMECÁNICA ABDOMINAL</span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black leading-snug tracking-normal text-sage-900">EL SECRETO DE <br/><span className="text-red-600 underline decoration-red-200 underline-offset-8">TU FAJA NATURAL</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
           <div className="group">
              <div className="relative rounded-[2rem] overflow-hidden mb-6 border-2 border-red-50 shadow-sm transition-transform group-hover:scale-[1.02]">
                 <img src={GLOBO_IMG} alt="Efecto Globo" className="w-full aspect-[4/5] object-cover grayscale opacity-80" />
                 <div className="absolute inset-0 bg-red-600/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <X className="text-white w-20 h-20 drop-shadow-lg" />
                 </div>
                 <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl">
                    <p className="text-red-600 font-black text-center text-[10px] uppercase tracking-widest">EL EFECTO GLOBO</p>
                 </div>
              </div>
              <h3 className="text-lg font-bold text-sage-900 mb-3 text-center">Ejercicios Tradicionales</h3>
              <p className="text-gray-500 text-xs leading-relaxed text-center px-4">Abren tu diástasis y empujan el útero hacia abajo, debilitando tu suelo pélvico.</p>
           </div>
           
           <div className="group">
              <div className="relative rounded-[2rem] overflow-hidden mb-6 border-4 border-lime-400 shadow-[0_20px_40px_-10px_rgba(132,204,22,0.2)] transition-transform group-hover:scale-[1.02]">
                 <img src={CORSET_IMG} alt="Efecto Corset" className="w-full aspect-[4/5] object-cover" />
                 <div className="absolute inset-0 bg-lime-500/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <CheckCircle2 className="text-lime-500 w-20 h-20 drop-shadow-lg" />
                 </div>
                 <div className="absolute bottom-6 left-6 right-6 bg-lime-400 p-4 rounded-2xl shadow-xl">
                    <p className="text-sage-900 font-black text-center text-[10px] uppercase tracking-widest">EL EFECTO CORSET</p>
                 </div>
              </div>
              <h3 className="text-lg font-bold text-sage-900 mb-3 text-center">Técnica Hipopresiva</h3>
              <p className="text-gray-500 text-xs leading-relaxed text-center px-4">Succiona y une las paredes abdominales, cerrando el hueco y aplanando el vientre.</p>
           </div>
        </div>
      </section>

      {/* MECANISMO ÚNICO (GIF) */}
      <section className="py-24 bg-cream px-5">
        <div className="max-w-md mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-center mb-16 leading-tight tracking-normal">
            Activa tu <span className="text-lime-600 italic">"Corset Invisible"</span>
          </h2>
          
          <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white mb-12 group">
            <img src={MUSCLE_GIF} alt="Visualización Músculos" className="w-full h-auto" />
            <div className="absolute inset-0 bg-gradient-to-t from-sage-900/60 to-transparent flex flex-col justify-end p-8">
              <p className="text-lime-400 text-[9px] font-black uppercase tracking-[0.3em] mb-2">Internal Scan Active</p>
              <p className="text-white text-xs font-bold opacity-80">Re-programación del Transverso Abdominal</p>
            </div>
          </div>

          <div className="space-y-12">
            {[
              { icon: "fa-atom", title: "Conexión Muscular", desc: "Despierta los músculos profundos que el embarazo 'durmió'." },
              { icon: "fa-arrows-to-dot", title: "Cierre Físico", desc: "Unimos la línea alba y compactamos el contorno abdominal." },
              { icon: "fa-shield-heart", title: "Salud Pélvica", desc: "Evita la incontinencia y mejora tu vida íntima." }
            ].map((step, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-[1rem] bg-white shadow-lg flex items-center justify-center text-lime-600 shrink-0 border border-sage-50">
                  <i className={`fa-solid ${step.icon} text-lg`}></i>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-sage-900 mb-1">{step.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTADOS */}
      <section className="py-24 bg-white overflow-hidden">
        <h2 className="text-xl sm:text-2xl font-black px-5 mb-12 text-center tracking-normal uppercase">CASOS DE ÉXITO VERIFICADOS</h2>
        <Carousel autoPlay={true}>
          {TESTIMONIAL_IMAGES.map((src, i) => (
            <div key={i} className="shrink-0 w-[85vw] max-w-[320px] snap-center">
              <div className="relative rounded-[2.5rem] overflow-hidden border-[6px] border-cream shadow-2xl bg-white aspect-[4/5] flex items-center justify-center">
                 <img src={src} alt={`Testimonio Verificado ${i+1}`} className="w-full h-full object-contain bg-white" />
                 <div className="absolute top-4 right-4 bg-lime-400 text-sage-900 text-[8px] font-black px-3 py-1.5 rounded-full shadow-lg border-2 border-white uppercase tracking-tight">CASO REAL</div>
              </div>
            </div>
          ))}
        </Carousel>
      </section>

      {/* COMUNIDAD (VIDEOS) */}
      <section className="py-24 bg-sage-900 text-white rounded-[3rem] mx-2 shadow-inner overflow-hidden">
        <div className="px-8 mb-12 text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black leading-snug tracking-normal mb-4">NUESTRA <br/><span className="animate-gradient bg-gradient-to-r from-lime-500 via-lime-200 to-lime-500 bg-clip-text text-transparent">COMUNIDAD VIP</span></h2>
            <div className="flex justify-center gap-1">
                {[1,2,3,4,5].map(i => <Star key={i} size={12} className="fill-lime-400 text-lime-400" />)}
            </div>
        </div>
        <Carousel autoPlay={false}>
          {TESTIMONIAL_VIDEOS.map((src, i) => (
            <div key={i} className="shrink-0 w-[240px] snap-center aspect-[9/16] bg-black rounded-[2rem] overflow-hidden shadow-2xl relative border border-white/5">
              <video className="w-full h-full object-cover" controls preload="metadata">
                <source src={src} type="video/mp4" />
              </video>
              <div className="absolute top-5 left-5 pointer-events-none">
                 <div className="bg-white/10 backdrop-blur-xl rounded-full px-4 py-2 text-[8px] font-black border border-white/20 tracking-widest uppercase">MAMÁ #0{i+1}</div>
              </div>
            </div>
          ))}
        </Carousel>
      </section>

      {/* OFERTA */}
      <section id="oferta" className="px-5 py-24">
        <div className="relative max-w-lg mx-auto bg-[#0a1412] rounded-[3rem] p-6 sm:p-10 text-white overflow-hidden shadow-[0_40px_100px_-20px_rgba(132,204,22,0.15)] border border-white/5">
          <div className="absolute top-0 right-0 left-0 bg-gradient-to-r from-red-600 to-orange-600 text-white font-black text-[10px] py-3 text-center shadow-lg animate-pulse flex items-center justify-center gap-2 z-10 tracking-[0.2em]">
             <Clock size={12} fill="white" /> 12 CUPOS CON PRECIO PROMOCIONAL
          </div>
          
          <div className="mt-12 mb-10 text-center relative z-20">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black mb-6 tracking-normal uppercase leading-tight">RETO POSPARTO <br/><span className="animate-gradient bg-gradient-to-r from-lime-400 via-white to-lime-400 bg-clip-text text-transparent italic tracking-normal">21 DÍAS</span></h2>
            
            <div className="bg-white/5 backdrop-blur-2xl rounded-[2rem] p-5 sm:p-8 border border-white/10 mb-10 text-left">
                <p className="text-[9px] font-bold text-lime-400 tracking-[0.3em] mb-6 uppercase">Tu Paquete Incluye:</p>
                <ul className="space-y-4 mb-10">
                    <li className="flex items-start gap-3 text-xs opacity-90 font-bold">
                        <CheckCircle2 size={14} className="text-lime-400 shrink-0" />
                        <span>Plan Maestro 21 Días (Diástasis Zero)</span>
                    </li>
                    <li className="flex items-start gap-3 text-xs opacity-90 font-bold">
                        <CheckCircle2 size={14} className="text-lime-400 shrink-0" />
                        <span>Los 7 Bonos Digitales de Regalo</span>
                    </li>
                    <li className="flex items-start gap-3 text-xs opacity-90 font-bold">
                        <CheckCircle2 size={14} className="text-lime-400 shrink-0" />
                        <span>Acceso Vitalicio y Comunidad VIP</span>
                    </li>
                </ul>
                
                <div className="border-t border-white/10 pt-8 text-center">
                    <p className="text-gray-500 line-through text-xs mb-1 tracking-widest font-black uppercase opacity-70">VALOR REAL: $197.00 USD</p>
                    <div className="flex flex-col items-center justify-center mb-8">
                        <span className="text-4xl sm:text-5xl font-black text-white tracking-tight animate-gradient bg-gradient-to-r from-white via-lime-400 to-white bg-clip-text text-transparent">$69.99</span>
                        <span className="text-[9px] text-lime-400 font-black tracking-[0.3em] mt-2 uppercase">DÓLARES AMERICANOS</span>
                    </div>
                </div>

                <a href="https://go.hotmart.com/D102309348Q?ap=4cfb" className="group block w-full bg-gradient-to-r from-lime-400 via-lime-300 to-lime-500 text-sage-900 font-black py-5 rounded-2xl text-base sm:text-lg shadow-[0_15px_40px_rgba(132,204,22,0.3)] hover:scale-[1.03] active:scale-95 transition-all text-center relative overflow-hidden uppercase">
                  EMPEZAR RETO AHORA
                </a>
            </div>

            <div className="flex flex-col items-center gap-6">
                <div className="flex justify-center gap-3 text-2xl sm:text-3xl">
                    <div className="bg-white p-1.5 rounded-lg shadow-md"><i className="fa-brands fa-cc-visa text-[#1A1F71]"></i></div>
                    <div className="bg-white p-1.5 rounded-lg shadow-md"><i className="fa-brands fa-cc-mastercard text-[#EB001B]"></i></div>
                    <div className="bg-white p-1.5 rounded-lg shadow-md"><i className="fa-brands fa-cc-paypal text-[#003087]"></i></div>
                    <div className="bg-white p-1.5 rounded-lg shadow-md"><i className="fa-brands fa-cc-amex text-[#006FCF]"></i></div>
                </div>
                <div className="flex items-center gap-2 text-white/40 text-[8px] font-bold tracking-widest uppercase">
                    <Lock size={10} /> Pago Seguro Hotmart® Cifrado
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* PERFIL DE NATALIA */}
      <section className="px-5 py-24 max-w-md mx-auto">
        <div className="bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-sage-50 text-center pb-12">
          <div className="relative">
              <img src={AUTHOR_IMG} alt="Natalia Alarcón" className="w-full aspect-square object-cover mb-10" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 flex gap-3">
                 <div className="bg-sage-900 text-white p-3.5 rounded-2xl shadow-2xl border-2 border-white">
                    <Medal size={18} className="text-lime-400" />
                 </div>
                 <div className="bg-sage-900 text-white p-3.5 rounded-2xl shadow-2xl border-2 border-white">
                    <Instagram size={18} />
                 </div>
              </div>
          </div>
          <div className="px-6 sm:px-10 mt-12">
            <Badge text="TU MENTORA EXPERTA" />
            <h2 className="text-2xl sm:text-3xl font-black mb-6 tracking-normal">NATALIA ALARCÓN</h2>
            
            <div className="grid grid-cols-1 gap-3 text-left mb-8">
                <div className="flex items-center gap-3 bg-sage-50 p-3 rounded-xl border border-sage-100/50">
                    <Award size={20} className="text-lime-600 shrink-0" />
                    <span className="text-[10px] font-bold text-sage-800">Especialista Certificada en Hipopresivos y Diástasis.</span>
                </div>
                <div className="flex items-center gap-3 bg-sage-50 p-3 rounded-xl border border-sage-100/50">
                    <Users size={20} className="text-lime-600 shrink-0" />
                    <span className="text-[10px] font-bold text-sage-800">+5,000 Alumnas Transformadas con éxito.</span>
                </div>
                <div className="flex items-center gap-3 bg-sage-50 p-3 rounded-xl border border-sage-100/50">
                    <Heart size={20} className="text-lime-600 shrink-0" />
                    <span className="text-[10px] font-bold text-sage-800">Referente en Salud Materna y Fitness Postparto.</span>
                </div>
            </div>

            <p className="text-gray-500 text-xs leading-relaxed italic px-2 font-medium">"Mi propósito es devolverte la seguridad que el embarazo te quitó, con un método respetuoso y altamente efectivo."</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-24 px-5 bg-sage-900 text-white/30 text-center text-[9px] rounded-t-[3rem]">
        <div className="flex justify-center gap-10 mb-12 text-[10px] text-white/70 font-black tracking-widest uppercase">
          <button onClick={() => onNavigate('privacy')} className="hover:text-lime-400">PRIVACIDAD</button>
          <button onClick={() => onNavigate('terms')} className="hover:text-lime-400">TÉRMINOS</button>
        </div>
        <p className="max-w-xs mx-auto mb-10 leading-loose uppercase tracking-widest opacity-40 font-bold">ESTE SITIO NO FORMA PARTE DE META PLATFORMS, INC. LOS RESULTADOS PUEDEN VARIAR SEGÚN TU COMPROMISO PERSONAL.</p>
        <div className="w-16 h-1 bg-white/10 mx-auto mb-10 rounded-full"></div>
        <p className="font-bold tracking-[0.5em] text-white/20 uppercase">NATALIA ALARCÓN © 2026</p>
      </footer>

      <StickyCTA isVisible={showSticky} />
    </div>
  );
};

const App: React.FC = () => {
  const [view, setView] = useState('landing');
  useEffect(() => window.scrollTo(0,0), [view]);

  return (
    <div className="min-h-screen font-sans selection:bg-lime-400 selection:text-sage-900 overflow-x-hidden">
      {view === 'landing' ? <LandingPage onNavigate={setView} /> : (
        <div className="p-10 max-w-2xl mx-auto min-h-screen flex flex-col justify-center">
          <button onClick={() => setView('landing')} className="mb-16 text-sage-900 font-black flex items-center gap-4 group">
            <div className="w-10 h-10 rounded-xl bg-sage-100 flex items-center justify-center group-hover:bg-lime-400 transition-all shadow-sm">
                <ArrowLeft size={16} strokeWidth={3}/>
            </div>
            VOLVER AL RETO
          </button>
          <h1 className="text-3xl font-black mb-10 tracking-normal uppercase">{view === 'privacy' ? 'Privacidad' : 'Términos'}</h1>
          <div className="prose prose-sm text-gray-500 space-y-6 leading-relaxed">
             <p>Su privacidad es primordial para Natalia Alarcón. Todos sus datos son tratados bajo la Ley de Protección de Datos vigente en el año 2026.</p>
             <p>Este programa es de carácter informativo y no sustituye el consejo médico profesional ni las visitas periódicas al ginecólogo o fisioterapeuta de suelo pélvico.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
