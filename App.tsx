
import React, { useState, useEffect, useRef } from 'react';
/* Added ChevronLeft to the imports from lucide-react */
import { Play, Check, Star, ShieldCheck, X, ChevronRight, ChevronLeft, Lock, ArrowRight, ArrowLeft, Plus, Minus, Instagram, Award, Clock, AlertTriangle, ArrowDown, FileText, Shield, Zap, CheckCircle2, Medal, Heart, Users } from 'lucide-react';

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
  "https://erxxuotslhjluwrlxmyx.supabaseco/storage/v1/object/sign/LANDING%20POST%20PARTO/2(2).mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZWQxZTBkNS1mNzcwLTRmMDMtODRhYy1jYTk2YzZkZmM1NDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMQU5ESU5HIFBPU1QgUEFSVE8vMigyKS5tcDQiLCJpYXQiOjE3NjgwODUxMDgsImV4cCI6MTc5OTYyMTEwOH0.U6IBOLa9j9jN4rCGRi9Ley9SxK36PZixTzBKvx5Iv-Q",
  "https://erxxuotslhjluwrlxmyx.supabase.co/storage/v1/object/sign/LANDING%20POST%20PARTO/3(2).mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZWQxZTBkNS1mNzcwLTRmMDMtODRhYy1jYTk2YzZkZmM1NDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMQU5ESU5HIFBPU1QgUEFSVE8vMygyKS5tcDQiLCJpYXQiOjE3NjgwODUxMzEsImV4cCI6MTc5OTYyMTEzMX0.2OqJtkUvxAjeD0qSrV130J2q6FSVDxAN_Qhzc_JyGzE",
  "https://erxxuotslhjluwrlxmyx.supabase.co/storage/v1/object/sign/LANDING%20POST%20PARTO/4(2).mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZWQxZTBkNS1mNzcwLTRmMDMtODRhYy1jYTk2YzZkZmM1NDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMQU5ESU5HIFBPU1QgUEFSVE8vNCgyKS5tcDQiLCJpYXQiOjE3NjgwODUxMzEsImV4cCI6MTc5OTYyMTEzMX0.xqmwWzyf3mdPLInaUFrTplNTPmLCbTGAvu10Ibn1GXw"
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
      <section className="px-5 pt-12 pb-12 text-center max-w-md mx-auto">
        <Badge text="Método Científico · 21 Días" />
        {/* Título ajustado: interlineado aumentado y espaciado normal para evitar amontonamiento */}
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

        <div className="flex flex-col items-center gap-2">
           <div className="flex items-center gap-1 text-[10px] font-bold text-sage-800 uppercase tracking-widest opacity-60">
             <Users size={12} /> Más de 2,400 mamás unidas
           </div>
        </div>
      </section>

      {/* BLOQUE PROBLEMA: COMPARACIÓN */}
      <section className="px-5 py-16 bg-white rounded-t-[3rem] shadow-xl w-full max-w-md mx-auto relative z-20">
        <div className="text-center mb-10">
          <span className="inline-block py-1 px-3 rounded-full bg-red-50 text-red-600 text-[9px] font-black tracking-widest uppercase mb-3 border border-red-100">ALERTA MÉDICA</span>
          <h2 className="text-2xl font-bold leading-[1.3] tracking-normal text-sage-900">POR QUÉ TU ABDOMEN <br/><span className="text-gray-400">SIGUE AHÍ</span></h2>
        </div>

        <div className="space-y-6">
           <div className="rounded-3xl border-2 border-red-50 bg-white overflow-hidden shadow-sm">
              <div className="h-40 bg-red-50/50 flex items-center justify-center p-4">
                 <img src="https://erxxuotslhjluwrlxmyx.supabase.co/storage/v1/object/sign/LANDING%20POST%20PARTO/Captura%20de%20pantalla%202026-01-10%20233122.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZWQxZTBkNS1mNzcwLTRmMDMtODRhYy1jYTk2YzZkZmM1NDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMQU5ESU5HIFBPU1QgUEFSVE8vQ2FwdHVyYSBkZSBwYW50YWxsYSAyMDI2LTAxLTEwIDIzMzEyMi5wbmciLCJpYXQiOjE3NjgxMDY0NTAsImV4cCI6MTc5OTY0MjQ1MH0.moLDJnxEP1NHUkHGTn1mXJuLNeQK5wiNoa_N8bp7z00" className="h-full object-contain grayscale" />
              </div>
              <div className="p-5">
                 <h3 className="font-bold text-red-600 text-base mb-1">❌ El Efecto "Globo"</h3>
                 <p className="text-gray-500 text-xs leading-relaxed">Los abdominales clásicos empujan tus órganos hacia afuera, abriendo más tu diástasis.</p>
              </div>
           </div>

           <div className="rounded-3xl border-2 border-lime-400 bg-white overflow-hidden shadow-lg shadow-lime-400/10">
              <div className="h-40 bg-lime-50/50 flex items-center justify-center p-4">
                 <img src="https://erxxuotslhjluwrlxmyx.supabase.co/storage/v1/object/sign/LANDING%20POST%20PARTO/Gemini_Generated_Image_5k1nde5k1nde5k1n.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZWQxZTBkNS1mNzcwLTRmMDMtODRhYy1jYTk2YzZkZmM1NDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMQU5ESU5HIFBPU1QgUEFSVE8vR2VtaW5pX0dlbmVyYXRlZF9JbWFnZV81azFuZGU1azFuZGU1azFuLnBuZyIsImlhdCI6MTc2ODEwNTk3NiwiZXhwIjoxNzk5NjQxOTc2fQ.rpa2YPL_wd8qJxEKj0ExqTIPT0kHiONkEzDW8bQz2X4" className="h-full object-contain" />
              </div>
              <div className="p-5">
                 <h3 className="font-bold text-sage-900 text-base mb-1">✅ El Efecto "Corset"</h3>
                 <p className="text-gray-500 text-xs leading-relaxed">La técnica Hipopresiva succiona tus órganos hacia adentro, uniendo las paredes abdominales.</p>
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

      {/* RESULTADOS */}
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
