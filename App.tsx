import React, { useState, useEffect, useRef } from 'react';
import { Play, Check, Star, ShieldCheck, X, ChevronRight, ChevronLeft, Lock, ArrowRight, ArrowLeft, Plus, Minus, Instagram, Award, Clock, AlertTriangle, ArrowDown, FileText, Shield, Zap, CheckCircle2, Medal, Heart, Users, Quote } from 'lucide-react';

// --- Assets ---
const VSL_URL = "https://erxxuotslhjluwrlxmyx.supabase.co/storage/v1/object/sign/LANDING%20POST%20PARTO/VSL_POST_PARTO.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZWQxZTBkNS1mNzcwLTRmMDMtODRhYy1jYTk2YzZkZmM1NDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMQU5ESU5HIFBPU1QgUEFSVE8vVlNMX1BPU1RfUEFSVE8ubXA0IiwiaWF0IjoxNzY4MDg1NDIxLCJleHAiOjE3OTk2MjE0MjF9.qeLRDt57HU_vY6e66-V1fhAq4e0saLazMgzvxEEifpQ";
const AUTHOR_IMG = "https://erxxuotslhjluwrlxmyx.supabase.co/storage/v1/object/sign/LANDING%20POST%20PARTO/imgi_34_NATIS-REDES-1.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZWQxZTBkNS1mNzcwLTRmMDMtODRhYy1jYTk2YzZkZmM1NDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMQU5ESU5HIFBPU1QgUEFSVE8vaW1naV8zNF9OQVRJUy1SRURFUy0xLndlYnAiLCJpYXQiOjE3NjgwODY1NDEsImV4cCI6MTc5OTYyMjU0MX0.wL9x9lGURoTs4ZevVVTtuzyWuRpP3PNYURbDlv1P3-Y";

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
  "https://erxxuotslhjluwrlxmyx.supabase.co/storage/v1/object/sign/LANDING%20POST%20PARTO/3(2).mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZWQxZTBkNS1mNzcwLTRmMDMtODRhYy1jYTk2YzZkZmM1NDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMQU5ESU5HIFBPU1QgUEFSVE8vMygyKS5tcDQiLCJpYXQiOjE3Njg0OTk0ODMsImV4cCI6MTgwMDAzNTQ4M30.jD3jWNMyrKN6bv1mpEWT5VCVlrYVQtkiClVlioHl0SM",
  "https://erxxuotslhjluwrlxmyx.supabase.co/storage/v1/object/sign/LANDING%20POST%20PARTO/4(2).mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZWQxZTBkNS1mNzcwLTRmMDMtODRhYy1jYTk2YzZkZmM1NDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMQU5ESU5HIFBPU1QgUEFSVE8vNCgyKS5tcDQiLCJpYXQiOjE3NjgwODUxMzEsImV4cCI6MTc5OTYyMTEzMX0.xqmwWzyf3mdPLInaUFrTplNTPmLCbTGAvu10Ibn1GXw"
];

const DETAILED_TESTIMONIALS = [
  { name: "Lucía M.", text: "Odiaba verme al espejo y seguir pareciendo embarazada de 5 meses. ¡En 2 semanas mi abdomen bajó muchísimo!", pain: "Autoimagen" },
  { name: "Elena G.", text: "El dolor de espalda por cargar a mi bebé era insoportable. Los hipopresivos me salvaron la vida.", pain: "Dolor Físico" },
  { name: "Mariana R.", text: "Pensé que mis jeans favoritos jamás volverían a cerrarme. ¡Hoy me quedan mejor que antes!", pain: "Logro" },
  { name: "Sofía V.", text: "Tenía miedo de estornudar por las fugas de orina. Gracias Natalia, por devolverme mi seguridad.", pain: "Suelo Pélvico" },
  { name: "Carla P.", text: "Probé mil dietas y nada quitaba el bulto. Solo necesitaba cerrar mi diástasis. ¡Funciona!", pain: "Frustración" }
];

const FAQS = [
  { q: "¿Tuve cesárea, puedo hacerlo?", a: "Sí, es ideal para recuperar la sensibilidad y sanar internamente, siempre con alta médica." },
  { q: "¿Sirve si mi parto fue hace años?", a: "Sí, la diástasis no se cierra sola con el tiempo, nunca es tarde para tratarla." },
  { q: "¿Estoy lactando, afecta la leche?", a: "No, los hipopresivos mejoran la circulación y postura, beneficiando la lactancia." },
  { q: "¿Cuánto tiempo necesito?", a: "Diseñado para mamás ocupadas: solo 15-20 minutos al día." }
];

const BONUSES = [
  { id: 1, name: "Manual de Lactancia Materna", val: "$20", icon: "fa-baby", desc: "Olvídate del dolor y las dudas. Una guía paso a paso para lograr un agarre perfecto." },
  { id: 2, name: "Guía de Alimentación Anti-Inflamatoria", val: "$20", icon: "fa-carrot", desc: "Recetas diseñadas para desinflamar tu abdomen desde adentro." },
  { id: 3, name: "Test de Autoevaluación Corporal", val: "$40", icon: "fa-ruler-vertical", desc: "Aprende a medir tu diástasis tú misma en casa." },
  { id: 4, name: "Acceso al Grupo VIP de Alumnas", val: "$40", icon: "fa-whatsapp", desc: "Únete a nuestra tribu de mamás que comparten sus avances." },
  { id: 5, name: "Clases de Baile 'Dance Fit'", val: "$60", icon: "fa-music", desc: "¡Suda y diviértete! Sesiones diseñadas para quemar grasa sin impacto." },
  { id: 6, name: "Ejercicios Seguros para Embarazo", val: "$60", icon: "fa-person-pregnant", desc: "Rutinas para prevenir la diástasis antes de dar a luz." },
  { id: 7, name: "Certificado de Finalización", val: "$50", icon: "fa-certificate", desc: "Celebra tu logro con tu diploma digital honorífico." }
];

// --- Helper Components ---

const Badge = ({ text }: { text: string }) => (
  <div className="inline-flex items-center px-3 py-1 rounded-full bg-lime-400/20 border border-lime-400/40 text-sage-900 text-[10px] font-bold uppercase tracking-wider mb-4">
    <span className="w-2 h-2 rounded-full bg-lime-500 mr-2 animate-pulse"></span>
    {text}
  </div>
);

const AvatarStack = () => (
  <div className="flex flex-col items-center gap-4 py-4">
    <div className="flex -space-x-3 overflow-hidden">
      {[...Array(5)].map((_, i) => (
        <img
          key={i}
          className="inline-block h-10 w-10 rounded-full ring-2 ring-cream object-cover"
          src={TESTIMONIAL_IMAGES[i % TESTIMONIAL_IMAGES.length]}
          alt={`Mamá ${i + 1}`}
        />
      ))}
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lime-400 ring-2 ring-cream text-[10px] font-black text-sage-900">
        +2K
      </div>
    </div>
    <div className="flex items-center gap-2 text-[11px] font-bold text-sage-800 uppercase tracking-widest opacity-80">
      <Users size={14} className="text-lime-600" /> 
      <span>MÁS DE 2,400 MAMÁS UNIDAS</span>
    </div>
  </div>
);

const ReviewCard = ({ name, text }: { name: string, text: string }) => (
  <div className="bg-white/5 border border-white/10 p-5 rounded-[2rem] w-[300px] shrink-0 flex flex-col gap-3 shadow-xl backdrop-blur-md">
    <div className="flex items-center justify-between">
      <span className="text-lime-400 text-[10px] font-black uppercase tracking-[0.2em]">{name}</span>
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => <Star key={i} size={10} className="fill-lime-400 text-lime-400" />)}
      </div>
    </div>
    <p className="text-white text-xs leading-relaxed font-medium italic">"{text}"</p>
    <div className="flex items-center gap-2 mt-1">
      <div className="w-5 h-5 rounded-full bg-lime-400/20 flex items-center justify-center">
        <CheckCircle2 size={10} className="text-lime-400" />
      </div>
      <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">Alumna Verificada</span>
    </div>
  </div>
);

const MarqueeTestimonials = () => (
  <div className="relative flex overflow-x-hidden bg-sage-900 py-12 border-y border-white/5">
    <div className="animate-marquee-slow flex gap-8 px-8">
      {/* Duplicamos exactamente 2 veces para un bucle perfecto con -50% translateX */}
      {[...DETAILED_TESTIMONIALS, ...DETAILED_TESTIMONIALS].map((t, i) => (
        <ReviewCard key={i} name={t.name} text={t.text} />
      ))}
    </div>
  </div>
);

const Carousel: React.FC<{ children: React.ReactNode, autoPlay?: boolean, intervalTime?: number }> = ({ children, autoPlay = true, intervalTime = 4000 }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollAmount = container.clientWidth * 0.8;
      container.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
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
          scroll('right');
        }
      }
    }, intervalTime);
    return () => clearInterval(interval);
  }, [autoPlay, intervalTime]);

  return (
    <div className="relative group w-full">
       <button onClick={() => scroll('left')} className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg border border-sage-100 active:scale-90 transition-all">
          <ChevronLeft size={20} className="text-sage-900" />
       </button>
       <button onClick={() => scroll('right')} className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg border border-sage-100 active:scale-90 transition-all">
          <ChevronRight size={20} className="text-sage-900" />
       </button>
       <div ref={scrollRef} className="flex overflow-x-auto snap-x snap-mandatory px-5 gap-4 pb-8 no-scrollbar scroll-smooth">
        {children}
      </div>
    </div>
  );
};

const FAQItem: React.FC<{ question: string, answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-sage-100 last:border-0">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full py-5 flex items-center justify-between text-left">
        <span className="font-bold text-sage-900 pr-4 text-sm">{question}</span>
        <div className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all ${isOpen ? 'bg-sage-900 text-white' : 'bg-sage-50 text-sage-400'}`}>
            {isOpen ? <Minus size={14} /> : <Plus size={14} />}
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="text-gray-500 text-xs leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

const StickyCTA: React.FC<{ isVisible: boolean }> = ({ isVisible }) => (
  <div className={`fixed bottom-0 left-0 w-full z-50 p-4 bg-black/95 backdrop-blur-xl border-t border-white/10 transition-transform duration-500 ${isVisible ? 'translate-y-0' : 'translate-y-[120%]'}`}>
    <a href="https://go.hotmart.com/D102309348Q?ap=4cfb" className="w-full bg-gradient-to-r from-lime-400 to-lime-500 text-sage-900 font-black text-lg py-4 rounded-2xl shadow-[0_10px_30px_rgba(132,204,22,0.3)] active:scale-95 transition-all flex items-center justify-center gap-3">
      <span>QUIERO ENTRAR</span> 
      <div className="flex flex-col leading-none text-left border-l border-black/20 pl-3">
          <span className="text-[9px] opacity-70 line-through font-bold">$197.00</span>
          <span className="text-base font-bold leading-none">$69.99</span>
      </div>
      <ChevronRight className="w-5 h-5 stroke-[3px]" />
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
      <section className="px-5 pt-12 pb-6 text-center max-w-md mx-auto">
        <Badge text="Método Científico · 21 Días" />
        <h1 className="text-2xl xs:text-[1.75rem] sm:text-3xl font-bold leading-[1.3] text-sage-900 mb-6 tracking-normal break-words">
          ¿Tu abdomen <span className="animate-gradient bg-gradient-to-r from-lime-600 via-lime-400 to-lime-600 bg-clip-text text-transparent italic font-black">sigue abultado</span> como si estuvieras embarazada?
        </h1>
        <p className="text-gray-500 text-sm xs:text-base mb-8 max-w-xs mx-auto leading-relaxed">
          No es grasa rebelde. Es una separación muscular llamada <b>Diástasis</b>. Ciérrala y aplana tu vientre en 21 días.
        </p>

        <div ref={vslRef} className="relative aspect-video bg-black rounded-3xl shadow-2xl overflow-hidden mb-8 border border-white/10 group">
          <video className="w-full h-full object-cover" controls playsInline>
            <source src={VSL_URL} type="video/mp4" />
          </video>
        </div>

        <AvatarStack />
      </section>

      {/* BARRA DE TESTIMONIOS DETALLADOS (MÁS LENTA) */}
      <MarqueeTestimonials />

      {/* BLOQUE PROBLEMA: COMPARACIÓN REDISEÑADO CON TITULO IMPACTANTE */}
      <section className="px-5 py-20 bg-white rounded-t-[3.5rem] shadow-2xl w-full max-w-md mx-auto relative z-20 overflow-hidden mt-8">
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full -mr-16 -mt-16 opacity-50"></div>
        
        <div className="text-center mb-12 relative z-10">
          <div className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-red-600 text-white text-[10px] font-black tracking-[0.2em] uppercase mb-5 shadow-lg shadow-red-200 animate-[bounce_3s_infinite]">
             <AlertTriangle size={12} /> ALERTA MÉDICA
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold leading-tight tracking-normal text-sage-900">
            ¿POR QUÉ TU VIENTRE <br/>
            <span className="relative inline-block mt-4">
              <span className="relative z-10 text-red-600 italic font-black text-3xl sm:text-4xl px-2">SIGUE ABULTADO?</span>
              <span className="absolute -bottom-2 left-0 w-full h-4 bg-red-100/80 -rotate-1 z-0 rounded-sm"></span>
            </span>
          </h2>
          <p className="text-[10px] text-gray-400 mt-6 font-bold uppercase tracking-widest">Incluso si haces ejercicio a diario</p>
        </div>

        <div className="space-y-8 relative z-10">
           {/* CASO INCORRECTO */}
           <div className="group relative rounded-[2.5rem] border-2 border-red-100 bg-white p-2 shadow-xl shadow-red-500/5 transition-all active:scale-95">
              <div className="h-56 bg-gradient-to-b from-red-50/50 to-white rounded-[2rem] flex flex-col items-center justify-center p-6 overflow-hidden relative">
                 <img 
                    src="https://erxxuotslhjluwrlxmyx.supabase.co/storage/v1/object/sign/LANDING%20POST%20PARTO/Captura%20de%20pantalla%202026-01-10%20233122.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZWQxZTBkNS1mNzcwLTRmMDMtODRhYy1jYTk2YzZkZmM1NDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMQU5ESU5HIFBPU1QgUEFSVE8vQ2FwdHVyYSBkZSBwYW50YWxsYSAyMDI2LTAxLTEwIDIzMzEyMi5wbmciLCJpYXQiOjE3NjgxMDY0NTAsImV4cCI6MTc5OTY0MjQ1MH0.moLDJnxEP1NHUkHGTn1mXJuLNeQK5wiNoa_N8bp7z00" 
                    className="h-full object-contain grayscale opacity-60 transition-all group-hover:grayscale-0 group-hover:opacity-100" 
                    alt="Efecto Globo"
                 />
                 <div className="absolute top-4 left-4 bg-red-600 text-white text-[9px] font-black px-3 py-1 rounded-full shadow-lg">EL ERROR</div>
              </div>
              <div className="p-6">
                 <div className="flex items-center gap-2 mb-2 text-red-600">
                    <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center"><X size={14} strokeWidth={3} /></div>
                    <h3 className="font-black text-lg uppercase tracking-tight">Efecto "Globo"</h3>
                 </div>
                 <p className="text-gray-600 text-[13px] leading-relaxed font-medium">Los abdominales tradicionales <b>empujan tus órganos hacia afuera</b>, debilitando el suelo pélvico y haciendo que tu tripa se vea más inflamada.</p>
              </div>
           </div>

           {/* CASO CORRECTO */}
           <div className="group relative rounded-[2.5rem] border-2 border-lime-400 bg-white p-2 shadow-2xl shadow-lime-500/20 transition-all active:scale-95">
              <div className="h-56 bg-gradient-to-b from-lime-50/80 to-white rounded-[2rem] flex flex-col items-center justify-center p-6 overflow-hidden relative">
                 <img 
                    src="https://erxxuotslhjluwrlxmyx.supabase.co/storage/v1/object/sign/LANDING%20POST%20PARTO/Gemini_Generated_Image_5k1nde5k1nde5k1n.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZWQxZTBkNS1mNzcwLTRmMDMtODRhYy1jYTk2YzZkZmM1NDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMQU5ESU5HIFBPU1QgUEFSVE8vR2VtaW5pX0dlbmVyYXRlZF9JbWFnZV81azFuZGU1azFuZGU1azFuLnBuZyIsImlhdCI6MTc2ODEwNTk3NiwiZXhwIjoxNzk5NjQxOTc2fQ.rpa2YPL_wd8qJxEKj0ExqTIPT0kHiONkEzDW8bQz2X4" 
                    className="h-full object-contain transition-transform group-hover:scale-105" 
                    alt="Efecto Corset"
                 />
                 <div className="absolute top-4 right-4 bg-lime-500 text-white text-[9px] font-black px-3 py-1 rounded-full shadow-lg">EL MÉTODO</div>
              </div>
              <div className="p-6">
                 <div className="flex items-center gap-2 mb-2 text-sage-900">
                    <div className="w-6 h-6 rounded-full bg-lime-500 flex items-center justify-center text-white ring-4 ring-lime-100"><Check size={14} strokeWidth={3} /></div>
                    <h3 className="font-black text-lg uppercase tracking-tight">Efecto "Corset"</h3>
                 </div>
                 <p className="text-gray-600 text-[13px] leading-relaxed font-medium">Los hipopresivos crean una <b>succión interna</b> que une los músculos de nuevo, "recolocando" tu abdomen y desinflando tu figura en días.</p>
              </div>
           </div>
        </div>
      </section>

      {/* MECANISMO */}
      <section className="py-16 bg-cream px-5">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10 leading-snug tracking-normal text-sage-900">
            Ciencia Invisible: <br/> Tu <span className="text-lime-600 italic">"Faja Natural"</span>
          </h2>
          
          <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white mb-10">
            <img src="https://erxxuotslhjluwrlxmyx.supabase.co/storage/v1/object/sign/LANDING%20POST%20PARTO/94805f18-ea35-4300-a4c3-385cfa210778-ezgif.com-video-to-webp-converter.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZWQxZTBkNS1mNzcwLTRmMDMtODRhYy1jYTk2YzZkZmM1NDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMQU5ESU5HIFBPU1QgUEFSVE8vOTQ4MDVmMTgtZWEzNS00MzAwLWE0YzMtMzg1Y2ZhMjEwNzc4LWV6Z2lmLmNvbS12aWRlby10by13ZWJwLWNvbnZlcnRlci53ZWJwIiwiaWF0IjoxNzY4MTQ2OTg1LCJleHAiOjE3OTk2ODI5ODV9.59F6AT2-Q8OJXLB4Ulk1XEKKZ_b9MGd3R-TUjX4ffiQ" className="w-full h-auto" />
          </div>

          <div className="space-y-10">
            {[
              { icon: "fa-lungs", title: "Respiración Profunda", desc: "Aprendes a activar el transverso abdominal sin esfuerzo." },
              { icon: "fa-link", title: "Cierre de Tejidos", desc: "La línea alba se fortalece y se une físicamente." },
              { icon: "fa-shield-heart", title: "Suelo Pélvico", desc: "Protección total contra incontinencia y prolapsos." }
            ].map((step, i) => (
              <div key={i} className="flex gap-5 items-start">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center text-lime-600 shrink-0 border border-sage-50">
                  <i className={`fa-solid ${step.icon} text-lg`}></i>
                </div>
                <div>
                  <h3 className="font-bold text-base text-sage-900 mb-1">{step.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTADOS EN IMAGEN */}
      <section className="py-16 bg-white overflow-hidden">
        <h2 className="text-xl font-bold px-5 mb-10 text-center tracking-normal uppercase text-sage-900">CASOS DE ÉXITO VERIFICADOS</h2>
        <Carousel autoPlay={true}>
          {TESTIMONIAL_IMAGES.map((src, i) => (
            <div key={i} className="shrink-0 w-[80vw] max-w-[300px] snap-center">
              <div className="relative rounded-[2rem] overflow-hidden border-[6px] border-cream shadow-xl bg-white aspect-[4/5] flex items-center justify-center">
                 <img src={src} alt={`Testimonio ${i+1}`} className="w-full h-full object-contain" />
                 <div className="absolute top-4 right-4 bg-lime-400 text-sage-900 text-[8px] font-black px-3 py-1.5 rounded-full shadow-lg border-2 border-white uppercase tracking-tight">CASO REAL</div>
              </div>
            </div>
          ))}
        </Carousel>
      </section>

      {/* TESTIMONIOS EN VIDEO (SOCIAL PROOF) */}
      <section className="py-16 bg-sage-900 text-white overflow-hidden">
        <div className="px-5 max-w-md mx-auto mb-10">
           <div className="flex items-center gap-2 mb-3">
             <Star size={14} className="fill-lime-400 text-lime-400" />
             <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/60">Comunidad VIP</span>
           </div>
           <h2 className="text-2xl font-bold tracking-normal leading-tight">ELLAS YA LO <br/> <span className="text-lime-400 italic">LOGRARON</span></h2>
        </div>

        <Carousel autoPlay={false}>
          {TESTIMONIAL_VIDEOS.map((src, idx) => (
             <div key={idx} className="flex-shrink-0 w-[240px] snap-center">
               <div className="relative aspect-[9/16] rounded-[2.5rem] overflow-hidden bg-black border border-white/10 shadow-2xl">
                 <video 
                   key={idx}
                   className="w-full h-full object-cover" 
                   controls 
                   playsInline
                   preload="metadata"
                 >
                   <source src={src} type="video/mp4" />
                 </video>
                 {/* Overlay decorativo */}
                 <div className="absolute bottom-12 left-6 right-6 p-4 bg-black/40 backdrop-blur-md rounded-2xl border border-white/5 pointer-events-none">
                    <div className="flex items-center gap-2 text-lime-400 mb-1">
                       <CheckCircle2 size={12} />
                       <span className="text-[8px] font-black uppercase tracking-widest">Alumna Verificada</span>
                    </div>
                    <div className="w-12 h-1 bg-lime-400 rounded-full"></div>
                 </div>
               </div>
             </div>
          ))}
        </Carousel>
      </section>

      {/* OFERTA */}
      <section id="oferta" className="px-5 py-16">
        <div className="relative max-w-md mx-auto bg-[#0a1412] rounded-[2.5rem] p-6 sm:p-10 text-white overflow-hidden shadow-2xl border border-white/5">
          <div className="absolute top-0 right-0 left-0 bg-[#D32F2F] text-white font-black text-[9px] py-3 text-center shadow-lg animate-pulse flex items-center justify-center gap-2 z-10 tracking-[0.2em]">
             <Zap size={10} fill="white" /> OFERTA POR TIEMPO LIMITADO
          </div>
          
          <div className="mt-10 mb-8 text-center relative z-20">
            <h2 className="text-xl xs:text-2xl font-bold mb-6 tracking-normal uppercase leading-tight">RETO POSPARTO <br/><span className="animate-gradient bg-gradient-to-r from-lime-400 via-white to-lime-400 bg-clip-text text-transparent italic font-black">21 DÍAS</span></h2>
            
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 mb-8 text-left">
                <p className="text-[9px] font-bold text-lime-400 tracking-[0.3em] mb-4 uppercase">Tu Paquete Incluye:</p>
                <ul className="space-y-3 mb-8">
                    {BONUSES.slice(0, 3).map(b => (
                      <li key={b.id} className="flex items-start gap-3 text-xs opacity-90 font-medium">
                        <CheckCircle2 size={14} className="text-lime-400 shrink-0" />
                        <span>{b.name}</span>
                      </li>
                    ))}
                    <li className="flex items-start gap-3 text-xs opacity-90 font-medium italic text-lime-400">
                        <CheckCircle2 size={14} className="text-lime-400 shrink-0" />
                        <span>Y otros 4 bonos exclusivos...</span>
                    </li>
                </ul>
                
                <div className="border-t border-white/10 pt-6 text-center">
                    <p className="text-gray-500 line-through text-xs mb-1 tracking-widest font-black opacity-70">$197.00 USD</p>
                    <div className="flex flex-col items-center justify-center mb-6">
                        <span className="text-4xl xs:text-5xl font-black text-white tracking-tight animate-gradient bg-gradient-to-r from-white via-lime-400 to-white bg-clip-text text-transparent">$69.99</span>
                        <span className="text-[9px] text-lime-400 font-bold tracking-[0.3em] mt-2 uppercase">DÓLARES AMERICANOS</span>
                    </div>
                </div>

                <a href="https://go.hotmart.com/D102309348Q?ap=4cfb" className="group block w-full bg-gradient-to-r from-lime-400 to-lime-500 text-sage-900 font-black py-4 rounded-2xl text-base shadow-[0_15px_40px_rgba(132,204,22,0.3)] active:scale-95 transition-all text-center uppercase">
                  INSCRIBIRME AHORA
                </a>
            </div>

            <div className="flex flex-col items-center gap-4">
                <div className="flex justify-center gap-3">
                    <div className="bg-white p-1.5 rounded-lg h-8 w-12 flex items-center justify-center shadow-md"><i className="fa-brands fa-cc-visa text-[#1A1F71] text-lg"></i></div>
                    <div className="bg-white p-1.5 rounded-lg h-8 w-12 flex items-center justify-center shadow-md"><i className="fa-brands fa-cc-mastercard text-[#EB001B] text-lg"></i></div>
                    <div className="bg-white p-1.5 rounded-lg h-8 w-12 flex items-center justify-center shadow-md"><i className="fa-brands fa-cc-paypal text-[#003087] text-lg"></i></div>
                </div>
                <div className="flex items-center gap-2 text-white/40 text-[8px] font-bold tracking-widest uppercase">
                    <Lock size={10} /> Pago Seguro Cifrado 256-bit
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* AUTOR */}
      <section className="px-5 py-16 max-w-md mx-auto">
        <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-sage-50 text-center pb-10">
          <img src={AUTHOR_IMG} alt="Natalia Alarcón" className="w-full h-auto mb-8" />
          <div className="px-6">
            <Badge text="TU MENTORA EXPERTA" />
            <h2 className="text-2xl font-bold mb-4 tracking-normal text-sage-900">NATALIA ALARCÓN</h2>
            
            <div className="space-y-3 text-left mb-6">
                <div className="flex items-center gap-3 bg-sage-50 p-3 rounded-xl">
                    <Award size={18} className="text-lime-600 shrink-0" />
                    <span className="text-[10px] font-bold text-sage-800">Especialista en Hipopresivos y Diástasis.</span>
                </div>
                <div className="flex items-center gap-3 bg-sage-50 p-3 rounded-xl">
                    <Users size={18} className="text-lime-600 shrink-0" />
                    <span className="text-[10px] font-bold text-sage-800">+5,000 Alumnas Impactadas.</span>
                </div>
            </div>

            <p className="text-gray-500 text-xs leading-relaxed italic px-2">"Te devuelvo la seguridad que el embarazo te quitó, con un método respetuoso."</p>
          </div>
        </div>
      </section>

      {/* FAQS */}
      <section className="px-5 py-12 w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-sage-900 text-center mb-8 tracking-normal">Preguntas Frecuentes</h2>
        <div className="bg-white rounded-3xl shadow-sm border border-sage-100 px-6 py-2">
           {FAQS.map((item, idx) => (
              <FAQItem key={idx} question={item.q} answer={item.a} />
           ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-16 px-5 bg-sage-900 text-white/30 text-center text-[9px] rounded-t-[2.5rem]">
        <div className="flex justify-center gap-8 mb-10 text-[10px] text-white/70 font-bold tracking-widest uppercase">
          <button onClick={() => onNavigate('privacy')} className="hover:text-lime-400">PRIVACIDAD</button>
          <button onClick={() => onNavigate('terms')} className="hover:text-lime-400">TÉRMINOS</button>
        </div>
        <p className="max-w-xs mx-auto mb-8 leading-loose uppercase tracking-widest opacity-40 font-bold">ESTE SITIO NO ES PARTE DE FACEBOOK INC. LOS RESULTADOS VARÍAN SEGÚN EL COMPROMISO.</p>
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
        <div className="p-8 max-w-2xl mx-auto min-h-screen flex flex-col justify-center">
          <button onClick={() => setView('landing')} className="mb-12 text-sage-900 font-bold flex items-center gap-3">
            <ArrowLeft size={16} strokeWidth={3}/> VOLVER
          </button>
          <h1 className="text-2xl font-bold mb-8 uppercase tracking-normal">{view === 'privacy' ? 'Privacidad' : 'Términos'}</h1>
          <div className="text-gray-500 text-sm space-y-4 leading-relaxed">
             <p>Su privacidad es primordial. Los datos son tratados bajo la Ley de Protección de Datos vigente en 2026.</p>
             <p>Este programa es educativo y no sustituye el consejo médico profesional.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;