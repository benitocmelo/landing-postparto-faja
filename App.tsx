import React, { useState, useEffect, useRef } from 'react';
import { Play, Check, Star, ShieldCheck, X, ChevronRight, Lock, ArrowRight, ArrowLeft, Plus, Minus, Instagram, Award, Clock, AlertTriangle, ArrowDown, FileText, Shield, Zap } from 'lucide-react';

// --- Assets ---
// Updated VSL URL
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
  { id: 1, name: "Manual de Lactancia Materna", val: "$20", icon: "fa-baby", desc: "Olvídate del dolor y las dudas. Una guía paso a paso para lograr un agarre perfecto y disfrutar la conexión con tu bebé." },
  { id: 2, name: "Guía de Alimentación Anti-Inflamatoria", val: "$20", icon: "fa-carrot", desc: "Recetas deliciosas diseñadas para desinflamar tu abdomen desde adentro y darte energía real sin afectar tu leche." },
  { id: 3, name: "Test de Autoevaluación Corporal", val: "$40", icon: "fa-ruler-vertical", desc: "Aprende a medir tu diástasis tú misma en casa y lleva un control exacto de cómo se va cerrando semana a semana." },
  { id: 4, name: "Acceso al Grupo VIP de Alumnas", val: "$40", icon: "fa-whatsapp", desc: "Nunca estarás sola. Únete a nuestra tribu de mamás que se motivan, comparten sus avances y celebran cada victoria contigo." },
  { id: 5, name: "Clases de Baile 'Dance Fit'", val: "$60", icon: "fa-music", desc: "¡Suda y diviértete! Sesiones de baile diseñadas para quemar grasa sin impacto, para que recuperes tu ritmo feliz." },
  { id: 6, name: "Ejercicios Seguros para Embarazo", val: "$60", icon: "fa-person-pregnant", desc: "Si te unes antes de dar a luz o planeas otro bebé, tendrás la rutina exacta para prevenir la diástasis desde el embarazo." },
  { id: 7, name: "Certificado de Finalización", val: "$50", icon: "fa-certificate", desc: "Celebra tu logro. Al terminar los 21 días recibirás tu diploma digital honorífico por haber priorizado tu salud." }
];

// --- Helper Components ---

const Badge = ({ text }: { text: string }) => (
  <div className="inline-flex items-center px-3 py-1 rounded-full bg-lime-400/20 border border-lime-400/40 text-sage-900 text-xs font-bold uppercase tracking-wider mb-4">
    <span className="w-2 h-2 rounded-full bg-lime-500 mr-2 animate-pulse"></span>
    {text}
  </div>
);

// High Conversion CTA Button Style
// Logic: Lime/Neon background + Dark Text = Highest readability and attention grab (The "Wasp" effect)
const StickyCTA = ({ isVisible }: { isVisible: boolean }) => (
  <div className={`fixed bottom-0 left-0 w-full z-50 p-4 bg-black/95 backdrop-blur-md border-t border-lime-500/20 transition-transform duration-300 ${isVisible ? 'translate-y-0' : 'translate-y-[120%]'}`}>
    <a href="https://go.hotmart.com/D102309348Q?ap=4cfb" className="w-full bg-gradient-to-r from-lime-400 to-lime-500 text-sage-900 font-clash font-black text-xl py-4 rounded-2xl shadow-[0_0_25px_rgba(163,230,53,0.5)] active:scale-95 transition-all flex items-center justify-center gap-3 group animate-pulse hover:animate-none hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(163,230,53,0.8)]">
      <span>QUIERO ENTRAR</span> 
      <div className="flex flex-col leading-none text-left">
          <span className="text-[10px] opacity-70 line-through decoration-sage-900 font-bold">$197</span>
          <span className="text-lg font-bold leading-none tracking-tight">$69.99</span>
      </div>
      <ChevronRight className="w-6 h-6 stroke-[3px] group-hover:translate-x-1 transition-transform" />
    </a>
  </div>
);

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-sage-200 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full py-5 flex items-center justify-between text-left group"
      >
        <span className="font-bold text-sage-900 group-hover:text-lime-600 transition-colors pr-4">{question}</span>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all ${isOpen ? 'bg-sage-900 border-sage-900 text-lime-400' : 'bg-white border-sage-300 text-sage-400'}`}>
            {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40 opacity-100 pb-5' : 'max-h-0 opacity-0'}`}>
        <p className="text-gray-600 text-sm leading-relaxed pr-4">{answer}</p>
      </div>
    </div>
  );
}

// Custom Carousel Component
interface CarouselProps {
  children: React.ReactNode;
  autoPlay?: boolean;
  className?: string;
  intervalTime?: number;
}

const Carousel: React.FC<CarouselProps> = ({ children, autoPlay = false, className = "", intervalTime = 3000 }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollAmount = container.clientWidth * 0.85; 
      const target = direction === 'left' 
        ? container.scrollLeft - scrollAmount 
        : container.scrollLeft + scrollAmount;
      
      container.scrollTo({
        left: target,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
        if (!isPaused && scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            if (scrollLeft + clientWidth >= scrollWidth - 20) { 
                 scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                 scroll('right');
            }
        }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [autoPlay, isPaused, intervalTime]);

  return (
    <div 
      className={`relative group ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <button 
        onClick={(e) => { e.stopPropagation(); scroll('left'); }}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-cream/90 backdrop-blur text-sage-900 rounded-full flex items-center justify-center shadow-lg border border-sage-200 active:scale-95 transition-all opacity-80 hover:opacity-100 hover:bg-lime-400"
        aria-label="Anterior"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      <button 
        onClick={(e) => { e.stopPropagation(); scroll('right'); }}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-cream/90 backdrop-blur text-sage-900 rounded-full flex items-center justify-center shadow-lg border border-sage-200 active:scale-95 transition-all opacity-80 hover:opacity-100 hover:bg-lime-400"
        aria-label="Siguiente"
      >
        <ArrowRight className="w-5 h-5" />
      </button>

      <div 
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory px-5 gap-4 pb-8 no-scrollbar scroll-smooth"
      >
        {children}
      </div>
    </div>
  )
}

// --- Page Components ---

interface LegalPageLayoutProps {
  title: string;
  children: React.ReactNode;
  onBack: () => void;
}

const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({ title, children, onBack }) => (
  <div className="min-h-screen bg-[#F9F9F5] font-sans text-sage-900">
    <header className="bg-white border-b border-sage-200 sticky top-0 z-50">
      <div className="max-w-3xl mx-auto px-5 py-4 flex items-center gap-4">
        <button 
          onClick={onBack}
          className="p-2 -ml-2 hover:bg-sage-50 rounded-full transition-colors flex items-center gap-1 text-sage-800"
        >
          <ArrowLeft className="w-6 h-6" />
          <span className="text-sm font-medium">Volver</span>
        </button>
        <span className="font-clash font-bold text-lg ml-auto text-sage-900">Reto Posparto 21 Días</span>
      </div>
    </header>
    <main className="max-w-3xl mx-auto px-5 py-12">
      <h1 className="text-3xl font-clash font-bold mb-8 text-sage-900">{title}</h1>
      <div className="prose prose-sage prose-lg text-gray-600 leading-relaxed space-y-6">
        {children}
      </div>
    </main>
    <footer className="bg-[#1D3631] text-sage-100/60 py-8 px-5 text-center text-xs mt-12">
      <p>&copy; 2026 Natalia Alarcón. Todos los derechos reservados.</p>
    </footer>
  </div>
);

const PrivacyPolicy = ({ onBack }: { onBack: () => void }) => (
  <LegalPageLayout title="Política de Privacidad" onBack={onBack}>
    <p><strong>Última actualización:</strong> Enero 2026</p>
    
    <h3 className="text-xl font-bold text-sage-900 mt-6 mb-2">1. Introducción</h3>
    <p>En "Reto Posparto 21 Días" (en adelante, "el Sitio"), respetamos su privacidad y estamos comprometidos a proteger sus datos personales. Esta política de privacidad explica cómo recopilamos, usamos y protegemos su información cuando visita nuestro sitio web o adquiere nuestro programa.</p>
    
    <h3 className="text-xl font-bold text-sage-900 mt-6 mb-2">2. Información que recopilamos</h3>
    <p>Podemos recopilar la siguiente información:</p>
    <ul className="list-disc pl-5 space-y-2 mb-4">
      <li><strong>Datos de Identificación:</strong> Nombre, dirección de correo electrónico.</li>
      <li><strong>Datos de Transacción:</strong> Información sobre los pagos realizados (procesados de forma segura por Hotmart, no almacenamos tarjetas de crédito en nuestros servidores).</li>
      <li><strong>Datos Técnicos:</strong> Dirección IP, tipo de navegador, y datos de uso del sitio.</li>
    </ul>

    <h3 className="text-xl font-bold text-sage-900 mt-6 mb-2">3. Uso de la información</h3>
    <p>Utilizamos sus datos para:</p>
    <ul className="list-disc pl-5 space-y-2 mb-4">
      <li>Proporcionar acceso al curso digital y materiales descargables.</li>
      <li>Procesar transacciones y enviar confirmaciones de compra.</li>
      <li>Enviar actualizaciones del programa, respuestas a consultas y correos de soporte.</li>
      <li>Mejorar nuestro sitio web y servicios.</li>
    </ul>

    <h3 className="text-xl font-bold text-sage-900 mt-6 mb-2">4. Protección de datos</h3>
    <p>Implementamos medidas de seguridad técnicas y organizativas para proteger sus datos personales contra el acceso no autorizado, la alteración, la divulgación o la destrucción.</p>

    <h3 className="text-xl font-bold text-sage-900 mt-6 mb-2">5. Cookies</h3>
    <p>Utilizamos cookies para mejorar la experiencia del usuario, analizar el tráfico del sitio y personalizar el contenido. Puede configurar su navegador para rechazar las cookies, pero esto podría limitar algunas funcionalidades del sitio.</p>

    <h3 className="text-xl font-bold text-sage-900 mt-6 mb-2">6. Terceros</h3>
    <p>No vendemos ni alquilamos sus datos personales a terceros. Compartimos información únicamente con proveedores de servicios de confianza (como procesadores de pago y plataformas de email marketing) necesarios para operar nuestro negocio y entregar el servicio.</p>

    <h3 className="text-xl font-bold text-sage-900 mt-6 mb-2">7. Sus Derechos</h3>
    <p>Usted tiene derecho a acceder, corregir o eliminar sus datos personales. Para ejercer estos derechos, contáctenos a través de los canales oficiales proporcionados dentro del curso.</p>
  </LegalPageLayout>
);

const TermsConditions = ({ onBack }: { onBack: () => void }) => (
  <LegalPageLayout title="Términos y Condiciones" onBack={onBack}>
    <p><strong>Última actualización:</strong> Enero 2026</p>

    <h3 className="text-xl font-bold text-sage-900 mt-6 mb-2">1. Aceptación de los Términos</h3>
    <p>Al acceder y utilizar este sitio web y adquirir el "Reto Posparto 21 Días", usted acepta cumplir con estos Términos y Condiciones. Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestros servicios.</p>

    <h3 className="text-xl font-bold text-sage-900 mt-6 mb-2">2. Descargo de Responsabilidad Médica (Importante)</h3>
    <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4 text-red-800 text-sm">
      <p className="m-0 font-medium"><strong>Advertencia de Salud:</strong> Este programa es de carácter informativo y educativo. Natalia Alarcón es entrenadora, pero no es médico. El contenido no sustituye el consejo, diagnóstico o tratamiento médico profesional.</p>
    </div>
    <p>Antes de comenzar cualquier programa de ejercicios, especialmente en el periodo posparto, debe consultar a su médico o profesional de la salud para confirmar que está apta para realizar actividad física. Usted asume toda la responsabilidad por su salud y seguridad al realizar los ejercicios sugeridos. Si experimenta dolor, mareos o malestar, detenga la actividad inmediatamente y busque atención médica.</p>

    <h3 className="text-xl font-bold text-sage-900 mt-6 mb-2">3. Propiedad Intelectual</h3>
    <p>Todo el contenido del programa (videos, guías, textos, logotipos) es propiedad exclusiva de Natalia Alarcón y está protegido por leyes de derechos de autor. Se le otorga una licencia limitada, no exclusiva e intransferible para uso personal. Queda estrictamente prohibida la reproducción, distribución o compartición de las credenciales de acceso con terceros.</p>

    <h3 className="text-xl font-bold text-sage-900 mt-6 mb-2">4. Pagos y Reembolsos</h3>
    <p>El precio del programa se indica claramente en la página de oferta. Ofrecemos una garantía de satisfacción de 7 días. Si dentro de los 7 días posteriores a la compra no está satisfecho, puede solicitar un reembolso completo a través de la plataforma de pago (Hotmart) o nuestro soporte, sujeto a las políticas de la pasarela de pago.</p>

    <h3 className="text-xl font-bold text-sage-900 mt-6 mb-2">5. Limitación de Responsabilidad</h3>
    <p>En la medida máxima permitida por la ley, "Reto Posparto 21 Días" no será responsable de ningún daño indirecto, incidental o consecuente que surja del uso o la imposibilidad de uso del programa.</p>

    <h3 className="text-xl font-bold text-sage-900 mt-6 mb-2">6. Modificaciones</h3>
    <p>Nos reservamos el derecho de modificar estos términos en cualquier momento. Las modificaciones entrarán en vigor inmediatamente después de su publicación en el sitio web.</p>
  </LegalPageLayout>
);

// --- Landing Page Component ---

const LandingPage = ({ onNavigate }: { onNavigate: (view: string) => void }) => {
  const vslRef = useRef<HTMLDivElement>(null);
  const [showSticky, setShowSticky] = useState(false);

  // Handle Scroll for Sticky CTA
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
    <div className="pb-32 overflow-x-hidden selection:bg-lime-300 selection:text-sage-900">
      
      {/* --- HERO SECTION --- */}
      <section className="relative px-5 pt-8 pb-12 w-full max-w-md mx-auto">
        <div className="text-center mb-6">
          <Badge text="Método Científico · 21 Días" />
          <h1 className="text-4xl leading-[1.1] font-bold text-sage-900 mb-4 tracking-tight">
            ¿Tu abdomen 
            <span className="bg-gradient-to-r from-[#2A4B45] via-[#16a34a] to-[#2A4B45] bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient font-extrabold mx-1">
              sigue abultado
            </span> 
            como si estuvieras embarazada?
          </h1>
          <p className="text-gray-600 font-medium text-lg leading-relaxed">
            No es grasa rebelde. Es una separación muscular llamada <span className="font-bold text-[#2A4B45]">Diástasis</span>. Ciérrala y aplana tu vientre en 21 días sin fajas ni cirugías.
          </p>
        </div>

        {/* VSL Container with Glow */}
        <div ref={vslRef} className="relative w-full aspect-video bg-sage-900 rounded-3xl shadow-2xl overflow-hidden mb-8 border border-sage-800/10 group">
           <div className="absolute -inset-1 bg-gradient-to-b from-lime-400 to-transparent opacity-20 blur-2xl group-hover:opacity-30 transition-opacity"></div>
           <video 
             className="w-full h-full object-contain relative z-10 rounded-3xl bg-black" 
             controls 
             playsInline 
             poster="https://erxxuotslhjluwrlxmyx.supabase.co/storage/v1/object/sign/LANDING%20POST%20PARTO/Gemini_Generated_Image_eca1w1eca1w1eca1.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZWQxZTBkNS1mNzcwLTRmMDMtODRhYy1jYTk2YzZkZmM1NDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMQU5ESU5HIFBPU1QgUEFSVE8vR2VtaW5pX0dlbmVyYXRlZF9JbWFnZV9lY2ExdzFlY2ExdzFlY2ExLnBuZyIsImlhdCI6MTc2ODA5MTMxNywiZXhwIjoxNzk5NjI3MzE3fQ.y81tj9eRgsGf7euZWYfA8Il51fAc3JcM294mLF297kA"
           >
             <source src={VSL_URL} type="video/mp4" />
             Tu navegador no soporta video.
           </video>
        </div>

        <div className="flex flex-col items-center gap-2">
           <div className="flex items-center gap-1 text-sm font-semibold text-sage-800">
             <div className="flex -space-x-2">
               {[1,2,3].map(i => (
                 <div key={i} className="w-8 h-8 rounded-full border-2 border-cream bg-gray-300 overflow-hidden">
                   <img src={`https://randomuser.me/api/portraits/women/${i+45}.jpg`} alt="User" />
                 </div>
               ))}
             </div>
             <span className="ml-2">Más de 2,400 mamás unidas</span>
           </div>
        </div>
      </section>

      {/* --- PROBLEM SECTION --- */}
      <section id="problema" className="px-5 py-12 bg-white rounded-t-[3rem] shadow-[0_-20px_40px_-15px_rgba(0,0,0,0.05)] w-full max-w-md mx-auto relative z-20">
        <div className="text-center mb-8">
          <span className="inline-block py-1 px-3 rounded-full bg-red-100 text-red-600 text-[10px] font-bold tracking-widest uppercase mb-3 border border-red-200">
             <i className="fa-solid fa-circle-exclamation mr-1 animate-pulse"></i> Importante
          </span>
          <h2 className="text-3xl font-clash font-bold text-sage-900 leading-tight">
             ⛔ ALERTA: Por qué tu abdomen sigue abultado <br/>
             <span className="text-gray-400 text-lg font-medium">(La verdad oculta)</span>
          </h2>
        </div>

        <div className="flex flex-col gap-6 relative">
           <div className="group relative rounded-3xl overflow-hidden bg-white border-2 border-red-100 shadow-lg">
              <div className="h-48 bg-gradient-to-br from-red-50 to-white relative flex items-center justify-center overflow-hidden">
                 <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-500 via-transparent to-transparent"></div>
                 <img 
                    src="https://erxxuotslhjluwrlxmyx.supabase.co/storage/v1/object/sign/LANDING%20POST%20PARTO/Captura%20de%20pantalla%202026-01-10%20233122.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZWQxZTBkNS1mNzcwLTRmMDMtODRhYy1jYTk2YzZkZmM1NDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMQU5ESU5HIFBPU1QgUEFSVE8vQ2FwdHVyYSBkZSBwYW50YWxsYSAyMDI2LTAxLTEwIDIzMzEyMi5wbmciLCJpYXQiOjE3NjgxMDY0NTAsImV4cCI6MTc5OTY0MjQ1MH0.moLDJnxEP1NHUkHGTn1mXJuLNeQK5wiNoa_N8bp7z00" 
                    alt="Efecto Globo - Presión abdominal incorrecta" 
                    className="w-full h-full object-contain p-4 relative z-10" 
                 />
                 <div className="absolute top-4 right-4 bg-white/80 backdrop-blur rounded-full p-2 shadow-sm z-20">
                    <div className="animate-bounce text-red-500"><AlertTriangle size={20} /></div>
                 </div>
              </div>
              <div className="p-6">
                 <h3 className="text-xl font-clash font-bold text-red-600 mb-2">❌ El Efecto "Globo"</h3>
                 <p className="text-gray-600 text-sm leading-relaxed">
                    Los abdominales clásicos empujan tus órganos hacia afuera, abriendo más tu diástasis y creando la "pancita de mamá" permanente.
                 </p>
              </div>
           </div>

           <div className="flex justify-center -my-4 z-10">
              <div className="bg-sage-100 text-sage-600 rounded-full p-2 border-4 border-white">
                 <ArrowDown size={24} />
              </div>
           </div>

           <div className="group relative rounded-3xl overflow-hidden bg-white border-2 border-lime-400 shadow-[0_0_30px_rgba(163,230,53,0.2)]">
              <div className="h-48 bg-gradient-to-br from-lime-50 to-white relative flex items-center justify-center overflow-hidden">
                 <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-lime-400 via-transparent to-transparent"></div>
                 <img 
                    src="https://erxxuotslhjluwrlxmyx.supabase.co/storage/v1/object/sign/LANDING%20POST%20PARTO/Gemini_Generated_Image_5k1nde5k1nde5k1n.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZWQxZTBkNS1mNzcwLTRmMDMtODRhYy1jYTk2YzZkZmM1NDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMQU5ESU5HIFBPU1QgUEFSVE8vR2VtaW5pX0dlbmVyYXRlZF9JbWFnZV81azFuZGU1azFuZGU1azFuLnBuZyIsImlhdCI6MTc2ODEwNTk3NiwiZXhwIjoxNzk5NjQxOTc2fQ.rpa2YPL_wd8qJxEKj0ExqTIPT0kHiONkEzDW8bQz2X4" 
                    alt="Efecto Corset - Activación correcta" 
                    className="w-full h-full object-contain p-4 relative z-10" 
                 />
                 <div className="absolute top-4 right-4 bg-lime-400 text-sage-900 rounded-full px-3 py-1 text-xs font-bold shadow-glow flex items-center gap-1 z-20">
                    <Check size={12} /> PROBADO
                 </div>
              </div>
              <div className="p-6">
                 <h3 className="text-xl font-clash font-bold text-sage-900 mb-2">✅ El Efecto "Corset"</h3>
                 <p className="text-gray-600 text-sm leading-relaxed">
                    La técnica Hipopresiva actúa como una faja natural, <span className="font-bold text-lime-600">succionando tus órganos hacia adentro</span> y cerrando la separación muscular.
                 </p>
              </div>
           </div>
        </div>
      </section>

      {/* --- MECHANISM SECTION (New) --- */}
      <section id="mecanismo" className="py-16 bg-[#F9F9F5] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#A3E635] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#2A4B45] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>

        <div className="max-w-md mx-auto px-4 relative z-10">
            <h2 className="text-3xl font-bold text-center text-[#2A4B45] mb-10 font-clash leading-tight">
                La Ciencia Invisible: <br/>
                Cómo activamos tu <span className="bg-gradient-to-r from-[#2A4B45] via-[#16a34a] to-[#2A4B45] bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient font-extrabold">'Faja Natural'</span> interna.
            </h2>

            <div className="backdrop-blur-xl bg-white/50 border border-[#A3E635]/30 shadow-xl rounded-3xl p-3 mb-12">
                <div className="relative rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(163,230,53,0.3)]">
                    <img src="https://erxxuotslhjluwrlxmyx.supabase.co/storage/v1/object/sign/LANDING%20POST%20PARTO/94805f18-ea35-4300-a4c3-385cfa210778-ezgif.com-video-to-webp-converter.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZWQxZTBkNS1mNzcwLTRmMDMtODRhYy1jYTk2YzZkZmM1NDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMQU5ESU5HIFBPU1QgUEFSVE8vOTQ4MDVmMTgtZWEzNS00MzAwLWE0YzMtMzg1Y2ZhMjEwNzc4LWV6Z2lmLmNvbS12aWRlby10by13ZWJwLWNvbnZlcnRlci53ZWJwIiwiaWF0IjoxNzY4MTQ2OTg1LCJleHAiOjE3OTk2ODI5ODV9.59F6AT2-Q8OJXLB4Ulk1XEKKZ_b9MGd3R-TUjX4ffiQ" 
                         alt="Ilustración médica de la activación del músculo transverso abdominal" 
                         className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-[#2A4B45] mix-blend-overlay opacity-10"></div>
                </div>
                <p className="text-center text-[#2A4B45] text-sm font-medium mt-4">
                    Visualización: Activación del Transverso (Tu Faja Natural).
                </p>
            </div>

            <div className="space-y-6 relative pl-2">
                 <div className="absolute left-[2.2rem] top-4 bottom-12 w-0.5 bg-gradient-to-b from-lime-400 via-lime-300 to-transparent z-0"></div>

                 {[
                   { icon: "fa-lungs", title: "Reprogramación Respiratoria", desc: "Aprendes a respirar sin empujar tu abdomen hacia afuera, deteniendo el daño inmediato." },
                   { icon: "fa-dumbbell", title: "Activación Profunda", desc: "Creamos un efecto de succión que despierta al músculo transverso, tu verdadero corsé interno." },
                   { icon: "fa-link", title: "Cierre y Tonificación", desc: "Con la práctica constante, los tejidos se vuelven a unir y el abdomen se aplana desde adentro." }
                 ].map((step, idx) => (
                   <div key={idx} className="relative flex gap-6 group">
                      <div className="flex-shrink-0 relative z-10">
                         <div className="w-16 h-16 bg-white rounded-full border-2 border-lime-400 flex items-center justify-center text-xl text-lime-600 shadow-[0_0_20px_rgba(163,230,53,0.3)] group-hover:scale-110 transition-transform duration-300">
                            <i className={`fa-solid ${step.icon}`}></i>
                         </div>
                      </div>
                      <div className="pt-2">
                         <h3 className="font-clash font-bold text-xl text-sage-900 mb-2">{step.title}</h3>
                         <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                      </div>
                   </div>
                 ))}
            </div>
        </div>
      </section>

      {/* --- RESULTS SECTION --- */}
      <section className="py-12 w-full overflow-hidden bg-sage-50">
        <div className="px-5 max-w-md mx-auto mb-6">
           <h2 className="text-3xl font-clash font-bold text-sage-900 leading-tight">
             Resultados Reales en <span className="text-sage-800">3 Semanas</span>
           </h2>
           <p className="text-gray-500 text-sm mt-2">Desliza para ver transformaciones</p>
        </div>

        <Carousel autoPlay={true} intervalTime={3500}>
          {TESTIMONIAL_IMAGES.map((src, idx) => (
            <div key={idx} className="flex-shrink-0 w-[85vw] max-w-[320px] snap-center">
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-lg border-4 border-white bg-white">
                <img src={src} alt={`Resultado ${idx + 1}`} className="w-full h-full object-contain" loading="lazy" />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-sage-900/80 to-transparent p-4 pt-12">
                   <div className="bg-lime-400 text-sage-900 text-xs font-bold px-2 py-1 rounded w-fit mb-1">21 DÍAS</div>
                   <p className="text-white text-sm font-medium">Recuperación de suelo pélvico</p>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </section>

      {/* --- SOCIAL PROOF --- */}
      <section className="py-12 bg-sage-900 text-cream">
        <div className="px-5 max-w-md mx-auto mb-8">
           <div className="flex items-center gap-2 mb-2 opacity-80">
             <Star className="w-4 h-4 fill-lime-400 text-lime-400" />
             <span className="text-xs tracking-widest uppercase font-bold">Comunidad VIP</span>
           </div>
           <h2 className="text-3xl font-clash font-bold">Ellas ya lo lograron</h2>
        </div>

        <Carousel autoPlay={false}>
          {TESTIMONIAL_VIDEOS.map((src, idx) => (
             <div key={idx} className="flex-shrink-0 w-[200px] snap-center">
               <div className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-sage-800 border border-sage-700 shadow-xl">
                 <video 
                   className="w-full h-full object-cover" 
                   controls 
                   playsInline
                   preload="metadata"
                 >
                   <source src={src} type="video/mp4" />
                 </video>
               </div>
             </div>
          ))}
        </Carousel>
      </section>

      {/* --- OFFER SECTION --- */}
      <section id="oferta" className="px-5 py-12 w-full max-w-md mx-auto bg-cream">
        <div className="text-center mb-10">
           <h2 className="text-3xl font-clash font-bold text-sage-900 leading-tight">
             Regalos Exclusivos <br/> <span className="bg-gradient-to-r from-[#2A4B45] via-[#16a34a] to-[#2A4B45] bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient font-extrabold">GRATIS</span> HOY:
           </h2>
           <p className="text-gray-500 text-sm mt-2">Valorados en más de $290 USD</p>
        </div>

        <div className="flex flex-col gap-6 mb-16">
           {BONUSES.map((bonus) => (
             <div key={bonus.id} className="relative group">
                {/* Animated Glowing Border/Shadow */}
                <div className="absolute -inset-[3px] rounded-3xl bg-gradient-to-r from-lime-400 via-[#2A4B45] to-lime-400 opacity-30 group-hover:opacity-100 blur-sm transition-all duration-500 animate-gradient bg-[length:200%_auto]"></div>
                
                {/* Card Content */}
                <div className="relative bg-white/95 backdrop-blur-xl border border-sage-100 rounded-3xl p-6 shadow-sm h-full flex flex-col justify-between">
                   <div className="text-lime-600 font-extrabold text-[10px] tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-lime-500 rounded-full animate-pulse"></span>
                      BONO #{bonus.id}
                   </div>

                   <div className="flex gap-5 items-start">
                      <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-sage-50 to-sage-100 rounded-2xl flex items-center justify-center text-sage-800 text-2xl border border-sage-200/50 shadow-inner group-hover:scale-110 transition-transform duration-300">
                         <i className={`fa-solid ${bonus.icon} ${bonus.icon === 'fa-whatsapp' ? 'fa-brands' : ''}`}></i>
                      </div>

                      <div className="flex-1">
                         <h3 className="font-clash font-bold text-lg text-sage-900 leading-6 mb-2">{bonus.name}</h3>
                         <p className="text-gray-600 text-xs leading-relaxed mb-3">{bonus.desc}</p>
                         <div className="inline-flex items-center gap-1 bg-lime-400/10 border border-lime-400/30 px-2 py-1 rounded-md">
                            <span className="text-[10px] text-gray-400 line-through">Valor: {bonus.val}</span>
                            <span className="text-[10px] font-bold text-lime-700 ml-1">GRATIS HOY</span>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
           ))}
        </div>

        {/* NEW HIGH CONVERSION PRICING CARD */}
        {/* Added mt-6 to ensure badge has space above without clipping */}
        <div className="relative w-full mt-6"> 
            
            {/* Background Layer with Rounded Corners and Overflow Hidden */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden border border-[#A3E635]/50 shadow-[0_0_40px_rgba(163,230,53,0.2)] z-0">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1F3A33_0%,_#05100E_100%)]"></div>
               <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            </div>

            {/* Flash Offer Badge - Positioned outside the overflow-hidden background */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 w-full flex justify-center">
                 <div className="bg-[#D32F2F] text-white font-black text-[10px] sm:text-xs px-6 py-2 rounded-full shadow-[0_0_20px_rgba(211,47,47,0.6)] animate-pulse flex items-center gap-2 whitespace-nowrap border-2 border-[#1F3A33]">
                    <Zap className="w-3 h-3 sm:w-4 sm:h-4 fill-white" />
                    OFERTA FLASH - 65% OFF
                 </div>
            </div>

            {/* Content Layer */}
            <div className="relative z-10 px-5 pt-12 pb-8 flex flex-col items-center text-center">
              
              {/* Price Hierarchy */}
              <div className="mb-8 space-y-1">
                 <p className="text-gray-400 font-medium text-lg line-through decoration-red-400/50 decoration-2">
                    $197 USD
                 </p>
                 
                 {/* Adjusted font size for mobile responsiveness */}
                 <h3 className="text-6xl sm:text-7xl font-clash font-bold text-[#F7FEE7] tracking-tighter drop-shadow-[0_0_15px_rgba(163,230,53,0.6)] leading-none">
                    $69.99
                 </h3>
                 
                 <div className="pt-2">
                    <p className="text-[#D9F99D] font-bold text-xs sm:text-sm tracking-wide bg-[#A3E635]/10 px-3 py-1 rounded-lg border border-[#A3E635]/20 inline-block">
                        ¡Te ahorras $127 HOY!
                    </p>
                 </div>
              </div>

              {/* CTA Button */}
              <a 
                href="https://go.hotmart.com/D102309348Q?ap=4cfb"
                className="w-full bg-white text-black font-clash font-black text-lg sm:text-xl py-4 rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:bg-gray-100 hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 mb-6 whitespace-nowrap"
              >
                 INSCRÍBETE AHORA <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3px]" />
              </a>

              {/* Trust Icons */}
              <div className="flex flex-col items-center gap-3 w-full border-t border-white/10 pt-6">
                 <div className="flex gap-4 opacity-80 grayscale brightness-200">
                    <i className="fa-brands fa-cc-visa text-white text-2xl"></i>
                    <i className="fa-brands fa-cc-mastercard text-white text-2xl"></i>
                    <i className="fa-brands fa-cc-amex text-white text-2xl"></i>
                    <i className="fa-brands fa-cc-paypal text-white text-2xl"></i>
                 </div>
                 <p className="text-gray-400 text-[10px] flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Transacción 100% Encriptada
                 </p>
              </div>

            </div>
        </div>
      </section>

      {/* --- AUTHORITY SECTION --- */}
      <section className="px-5 py-12 w-full max-w-md mx-auto relative z-10">
        <div className="backdrop-blur-xl bg-white/60 rounded-3xl overflow-hidden border border-sage-100 shadow-xl">
           <div className="w-full bg-cream">
              <img 
                src={AUTHOR_IMG} 
                alt="Natalia Alarcón" 
                className="w-full h-auto object-contain"
                loading="lazy"
              />
           </div>
           
           <div className="p-8">
              <div className="inline-block bg-sage-100 text-sage-800 text-xs font-bold px-3 py-1 rounded-full mb-3">TU ENTRENADORA</div>
              <h2 className="text-2xl font-clash font-bold text-sage-900 mb-1">¿Quién es Natalia Alarcón?</h2>
              <p className="text-lime-600 font-medium text-sm mb-4">Entrenadora, Especialista Postparto y Mamá como tú</p>
              
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Con más de 15 años de experiencia y certificaciones en técnicas Hipopresivas, he ayudado a miles de mujeres. 
                Pero mi mayor credencial es haber pasado por lo mismo que tú. Entiendo la frustración de no reconocer tu cuerpo. 
                Por eso creé este método: para que recuperes tu seguridad física y emocional.
              </p>

              <div className="grid grid-cols-3 gap-2">
                 {[
                   { icon: <Instagram className="w-4 h-4" />, text: "+280k Seguidoras" },
                   { icon: <Award className="w-4 h-4" />, text: "Certificada Hipopresivos" },
                   { icon: <Clock className="w-4 h-4" />, text: "+15 Años Exp" }
                 ].map((badge, idx) => (
                   <div key={idx} className="flex flex-col items-center justify-center bg-white p-2 rounded-xl border border-sage-100 shadow-sm text-center gap-1">
                      <div className="text-lime-500">{badge.icon}</div>
                      <span className="text-[10px] font-bold text-sage-900 leading-tight">{badge.text}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* --- GUARANTEE SECTION --- */}
      <section className="px-5 py-8 w-full max-w-md mx-auto">
         <div className="border-2 border-yellow-500/50 bg-white rounded-3xl p-8 relative overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 p-4 opacity-10">
               <ShieldCheck className="w-32 h-32 text-yellow-500" />
            </div>
            
            <div className="relative z-10">
               <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4 text-yellow-600">
                  <ShieldCheck className="w-6 h-6" />
               </div>
               <h2 className="text-2xl font-clash font-bold text-sage-900 mb-3">Garantía Blindada de 7 Días</h2>
               <p className="text-gray-600 text-sm leading-relaxed">
                 Prueba el Reto por una semana completa. Si no sientes cómo tu faja abdominal se activa o simplemente no te gusta mi voz, 
                 te devuelvo el 100% de tu dinero. El riesgo es todo mío.
               </p>
            </div>
         </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="px-5 py-12 w-full max-w-md mx-auto">
        <h2 className="text-3xl font-clash font-bold text-sage-900 text-center mb-8">Preguntas Frecuentes</h2>
        <div className="bg-white rounded-3xl shadow-sm border border-sage-100 px-6 py-2">
           {FAQS.map((item, idx) => (
              <FAQItem key={idx} question={item.q} answer={item.a} />
           ))}
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-[#1D3631] text-sage-100/60 py-16 px-5 text-center text-xs">
         <div className="max-w-md mx-auto space-y-8">
            <div className="flex justify-center gap-6 font-medium text-sage-100">
               <button onClick={() => onNavigate('privacy')} className="hover:text-lime-400 transition-colors">Política de Privacidad</button>
               <button onClick={() => onNavigate('terms')} className="hover:text-lime-400 transition-colors">Términos y Condiciones</button>
            </div>
            
            <p className="leading-relaxed max-w-xs mx-auto">
              Este sitio no es parte del sitio web de Facebook o Facebook Inc. 
              Además, este sitio no está respaldado por Facebook de ninguna manera.
            </p>
            
            <div className="pt-8 border-t border-sage-800">
               <p>&copy; 2026 Natalia Alarcón - Reto Posparto. Todos los derechos reservados.</p>
            </div>
         </div>
      </footer>

      {/* CTA Sticky Component */}
      <StickyCTA isVisible={showSticky} />

    </div>
  );
}

const App = () => {
  const [currentView, setCurrentView] = useState('landing');

  // Reset scroll when view changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const renderView = () => {
    switch (currentView) {
      case 'privacy':
        return <PrivacyPolicy onBack={() => setCurrentView('landing')} />;
      case 'terms':
        return <TermsConditions onBack={() => setCurrentView('landing')} />;
      default:
        return <LandingPage onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9F5]">
      {renderView()}
    </div>
  );
};

export default App;