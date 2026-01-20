import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Check, Star, ShieldCheck, X, ChevronRight, ChevronLeft, Lock, ArrowLeft, 
  Plus, Minus, Zap, CheckCircle2, Users, Video, Baby, Utensils, ClipboardCheck, 
  MessageCircle, Music, Infinity, GraduationCap, Gift, AlertTriangle, Award, 
  Medal, Heart, Sparkles, Layout, Maximize2, TrendingDown, Quote, Monitor, 
  Smartphone, FileText, Globe, MousePointer2, ShieldAlert, Layers, AppWindow,
  PartyPopper, Crown
} from 'lucide-react';

const ASSETS = {
  vsl: "https://erxxuotslhjluwrlxmyx.supabase.co/storage/v1/object/sign/LANDING%20POST%20PARTO/VSL_POST_PARTO.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZWQxZTBkNS1mNzcwLTRmMDMtODRhYy1jYTk2YzZkZmM1NDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMQU5ESU5HIFBPU1QgUEFSVE8vVlNMX1BPU1RfUEFSVE8ubXA0IiwiaWF0IjoxNzY4MDg1NDIxLCJleHAiOjE3OTk2MjE0MjF9.qeLRDt57HU_vY6e66-V1fhAq4e0saLazMgzvxEEifpQ",
  author: "https://erxxuotslhjluwrlxmyx.supabase.co/storage/v1/object/sign/LANDING%20POST%20PARTO/imgi_34_NATIS-REDES-1.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZWQxZTBkNS1mNzcwLTRmMDMtODRhYy1jYTk2YzZkZmM1NDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMQU5ESU5HIFBPU1QgUEFSVE8vaW1naV8zNF9OQVRJUy1SRURFUy0xLndlYnAiLCJpYXQiOjE3Njg2MDY1MTcsImV4cCI6MTgwMDE0MjUxN30.pwm9fguWRTTo47VrSXyAbCPXw1kbjijaEYL5K7ITE88",
  mechanism: "https://erxxuotslhjluwrlxmyx.supabase.co/storage/v1/object/sign/LANDING%20POST%20PARTO/94805f18-ea35-4300-a4c3-385cfa210778-ezgif.com-video-to-webp-converter.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZWQxZTBkNS1mNzcwLTRmMDMtODRhYy1jYTk2YzZkZmM1NDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMQU5ESU5HIFBPU1QgUEFSVE8vOTQ4MDVmMTgtZWEzNS00MzAwLWE0YzMtMzg1Y2ZhMjEwNzc4LWV6Z2lmLmNvbS12aWRlby10by13ZWJwLWNvbnZlcnRlci53ZWJwIiwiaWF0IjoxNzY4NjAzNTY1LCJleHAiOjE4MDAxMzk1NjV9.aTh4UUNW7_VvMsDfaH7PnvbpWlObjva257CRgkVxH1s",
  errorState: "https://erxxuotslhjluwrlxmyx.supabase.co/storage/v1/object/sign/LANDING%20POST%20PARTO/Captura%20de%20pantalla%202026-01-10%20233122.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZWQxZTBkNS1mNzcwLTRmMDMtODRhYy1jYTk2YzZkZmM1NDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMQU5ESU5HIFBPU1QgUEFSVE8vQ2FwdHVyYSBkZSBwYW50YWxsYSAyMDI2LTAxLTEwIDIzMzEyMi5wbmciLCJpYXQiOjE3Njg2MDYxNDUsImV4cCI6MTgwMDE0MjE0NX0.I1SgQtVXDSwm-2GXa_qRcDFUUJrKWCooHf6hmGsXAc8",
  methodState: "https://erxxuotslhjluwrlxmyx.supabase.co/storage/v1/object/sign/LANDING%20POST%20PARTO/Gemini_Generated_Image_5k1nde5k1nde5k1n.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZWQxZTBkNS1mNzcwLTRmMDMtODRhYy1jYTk2YzZkZmM1NDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMQU5ESU5HIFBPU1QgUEFSVE8vR2VtaW5pX0dlbmVyYXRlZF9JbWFnZV81azFuZGU1azFuZGU1azFuLnBuZyIsImlhdCI6MTc2ODEwNTk3NiwiZXhwIjoxNzk5NjQxOTc2fQ.rpa2YPL_wd8qJxEKj0ExqTIPT0kHiONkEzDW8bQz2X4",
  paymentMethods: "https://erxxuotslhjluwrlxmyx.supabase.co/storage/v1/object/sign/LANDING%20POST%20PARTO/Gemini_Generated_Image_b6fq97b6fq97b6fq-removebg-preview.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZWQxZTBkNS1mNzcwLTRmMDMtODRhYy1jYTk2YzZkZmM1NDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMQU5ESU5HIFBPU1QgUEFSVE8vR2VtaW5pX0dlbmVyYXRlZF9JbWFnZV9iNmZxOTdiNmZxOTdiNmZxLXJlbW92ZWJnLXByZXZpZXcucG5nIiwiaWF0IjoxNzY4NjA1Nzk0LCJleHAiOjE4MDAxNDE3OTR9.B6LJR4VDhEVm-urwr69yjLMAmrlPWw6XriZfUaduCrw",
  courseInside: [
    "https://erxxuotslhjluwrlxmyx.supabase.co/storage/v1/object/sign/LANDING%20POST%20PARTO/curso%20por%20dentro.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZWQxZTBkNS1mNzcwLTRmMDMtODRhYy1jYTk2YzZkZmM1NDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMQU5ESU5HIFBPU1QgUEFSVE8vY3Vyc28gcG9yIGRlbnRyby5qcGciLCJpYXQiOjE3Njg1OTA0OTIsImV4cCI6MTgwMDEyNjQ5Mn0.h6wKoko3k4L_0H8i3mexXZ9iPRA43I2f3Wled2heHm8",
    "https://erxxuotslhjluwrlxmyx.supabase.co/storage/v1/object/sign/LANDING%20POST%20PARTO/curso%20por%20dentro%202.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZWQxZTBkNS1mNzcwLTRmMDMtODRhYy1jYTk2YzZkZmM1NDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMQU5ESU5HIFBPU1QgUEFSVE8vY3Vyc28gcG9yIGRlbnRybyAyLmpwZyIsImlhdCI6MTc2ODU5MDY3OSwiZXhwIjoxODAwMTI2Njc5fQ.ctVZ_SK404ByMhx4RV6z9rPyij-RVC_6HVVTzgd_vBs",
    "https://erxxuotslhjluwrlxmyx.supabase.co/storage/v1/object/sign/LANDING%20POST%20PARTO/curso%20por%20dentro%203.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZWQxZTBkNS1mNzcwLTRmMDMtODRhYy1jYTk2YzZkZmM1NDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMQU5ESU5HIFBPU1QgUEFSVE8vY3Vyc28gcG9yIGRlbnRybyAzLmpwZyIsImlhdCI6MTc2ODU5MDY5NSwiZXhwIjoxODAwMTI2Njk1fQ.VlMDLDU3kBw6DxYpPAZDBwGJ8bkmgDOwpzrrJwbgEhU",
    "https://erxxuotslhjluwrlxmyx.supabase.co/storage/v1/object/sign/LANDING%20POST%20PARTO/curso%20por%20dentro%204.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZWQxZTBkNS1mNzcwLTRmMDMtODRhYy1jYTk2YzZkZmM1NDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMQU5ESU5HIFBPU1QgUEFSVE8vY3Vyc28gcG9yIGRlbnRybyA0LmpwZyIsImlhdCI6MTc2ODU5MDcxMCwiZXhwIjoxODAwMTI2NzEwfQ.SqJsKTIvyaRuLL0X9UiOwr8WhRvbHFWVCtb7WrNEUI0",
    "https://erxxuotslhjluwrlxmyx.supabase.co/storage/v1/object/sign/LANDING%20POST%20PARTO/curso%20por%20dentro%205.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZWQxZTBkNS1mNzcwLTRmMDMtODRhYy1jYTk2YzZkZmM1NDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMQU5ESU5HIFBPU1QgUEFSVE8vY3Vyc28gcG9yIGRlbnRybyA1LmpwZyIsImlhdCI6MTc2ODU5MDcyNiwiZXhwIjoxODAwMTI2NzI2fQ.XvBeGzZpxhk60Xc53cQ9wDu1kBrnXU17qVqGUNfd7no",
    "https://erxxuotslhjluwrlxmyx.supabase.co/storage/v1/object/sign/LANDING%20POST%20PARTO/curso%20por%20dentro%206.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZWQxZTBkNS1mNzcwLTRmMDMtODRhYy1jYTk2YzZkZmM1NDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMQU5ESU5HIFBPU1QgUEFSVE8vY3Vyc28gcG9yIGRlbnRybyA2LmpwZyIsImlhdCI6MTc2ODU5MDc0MywiZXhwIjoxODAwMTI2NzQzfQ.Ygnqg3-YcNxbM3LhNAXFWx_u9DH6i0U7mLae0yVzDZk"
  ],
  testimonials: [
    "https://erxxuotslhjluwrlxmyx.supabase.co/storage/v1/object/sign/LANDING%20POST%20PARTO/TESTIMONIO%201.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZWQxZTBkNS1mNzcwLTRmMDMtODRhYy1jYTk2YzZkZmM1NDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMQU5ESU5HIFBPU1QgUEFSVE8vVEVTVElNT05JTyAxLmpwZyIsImlhdCI6MTc2ODA4NDk0MiwiZXhwIjoxNzk5NjIwOTQyfQ.P-pcde3yYky-gXNh4akGsaISgBD8IP-0zoJ0IGYUJhY",
    "https://erxxuotslhjluwrlxmyx.supabase.co/storage/v1/object/sign/LANDING%20POST%20PARTO/TESTIMONIO%202.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZWQxZTBkNS1mNzcwLTRmMDMtODRhYy1jYTk2YzZkZmM1NDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMQU5ESU5HIFBPU1QgUEFSVE8vVEVTVElNT05JTyAyLmpwZyIsImlhdCI6MTc2ODA4NDk3NywiZXhwIjoxNzk5NjIwOTc3fQ.obrzcpzYfAN3ihe6Wvt0lq1hFaMMMUksbvucbUbG6zc",
    "https://erxxuotslhjluwrlxmyx.supabase.co/storage/v1/object/sign/LANDING%20POST%20PARTO/TESTIMONIO%203.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZWQxZTBkNS1mNzcwLTRmMDMtODRhYy1jYTk2YzZkZmM1NDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMQU5ESU5HIFBPU1QgUEFSVE8vVEVTVElNT05JTyAzLmpwZyIsImlhdCI6MTc2ODA4NTAwNCwiZXhwIjoxNzk5NjIxMDA0fQ.DoDFq8T9Sn7hYjN5eywaLJnFW6tw1G0eg5C9XbdRlK8",
    "https://erxxuotslhjluwrlxmyx.supabase.co/storage/v1/object/sign/LANDING%20POST%20PARTO/TESTIMONIO%204.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZWQxZTBkNS1mNzcwLTRmMDMtODRhYy1jYTk2YzZkZmM1NDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMQU5ESU5HIFBPU1QgUEFSVE8vVEVTVElNT05JTyA0LmpwZyIsImlhdCI6MTc2ODA4NTAzMSwiZXhwIjoxNzk5NjIxMDMxfQ.-5FBi7tk747OXo2SnJvy6JnrYe_e92_58UpRlHMoSCI",
    "https://erxxuotslhjluwrlxmyx.supabase.co/storage/v1/object/sign/LANDING%20POST%20PARTO/TESTIMONIO%205.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZWQxZTBkNS1mNzcwLTRmMDMtODRhYy1jYTk2YzZkZmM1NDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMQU5ESU5HIFBPU1QgUEFSVE8vVEVTVElNT05JTyA1LmpwZyIsImlhdCI6MTc2ODA4NTA1MywiZXhwIjoxNzk5NjIxMDUzfQ.KA2WoRlHW0BjLxCLhTSupITw2A6nTNeHfgtjhAC5w2Q",
    "https://erxxuotslhjluwrlxmyx.supabase.co/storage/v1/object/sign/LANDING%20POST%20PARTO/TESTIMONIO%207.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZWQxZTBkNS1mNzcwLTRmMDMtODRhYy1jYTk2YzZkZmM1NDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMQU5ESU5HIFBPU1QgUEFSVE8vVEVTVElNT05JTyA7LmpwZyIsImlhdCI6MTc2ODA4NTA2NywiZXhwIjoxNzk5NjIxMDY3fQ.pb7M9R43RtGfZYm2zjozr_lCPoE4aN5VRgSf9Od59uQ"
  ],
  videoTestimonials: [
    "https://erxxuotslhjluwrlxmyx.supabase.co/storage/v1/object/sign/LANDING%20POST%20PARTO/1(2).mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZWQxZTBkNS1mNzcwLTRmMDMtODRhYy1jYTk2YzZkZmM1NDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMQU5ESU5HIFBPU1QgUEFSVE8vMSgyKS5tcDQiLCJpYXQiOjE3NjgwODUwOTcsImV4cCI6MTc5OTYyMTA5N30.NA_WhqUQzAyJQbUkwJKgpj1HxmjYxjgXkLreC4UJBws",
    "https://erxxuotslhjluwrlxmyx.supabase.co/storage/v1/object/sign/LANDING%20POST%20PARTO/2(2).mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZWQxZTBkNS1mNzcwLTRmMDMtODRhYy1jYTk2YzZkZmM1NDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMQU5ESU5HIFBPU1QgUEFSVE8vMigyKS5tcDQiLCJpYXQiOjE3Njg1OTM4NTAsImV4cCI6MTgwMDEyOTg1MH0.pcOZKhuF4zyWyAamkQCB8KprQeVwKZesCujglpB70fc",
    "https://erxxuotslhjluwrlxmyx.supabase.co/storage/v1/object/sign/LANDING%20POST%20PARTO/3(2).mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZWQxZTBkNS1mNzcwLTRmMDMtODRhYy1jYTk2YzZkZmM1NDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMQU5ESU5HIFBPU1QgUEFSVE8vMygyKS5tcDQiLCJpYXQiOjE3Njg0OTk0ODMsImV4cCI6MTgwMDAzNTQ4M30.jD3jWNMyrKN6bv1mpEWT5VCVlrYVQtkiClVlioHl0SM",
    "https://erxxuotslhjluwrlxmyx.supabase.co/storage/v1/object/sign/LANDING%20POST%20PARTO/4(2).mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZWQxZTBkNS1mNzcwLTRmMDMtODRhYy1jYTk2YzZkZmM1NDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJMQU5ESU5HIFBPU1QgUEFSVE8vNCgyKS5tcDQiLCJpYXQiOjE3NjgwODUxMzEsImV4cCI6MTc5OTYyMTEzMX0.xqmwWzyf3mdPLInaUFrTplNTPmLCbTGAvu10Ibn1GXw"
  ]
};

const DETAILED_TESTIMONIALS = [
  { name: "Lucía M.", text: "Odiaba verme al espejo y seguir pareciendo embarazada. ¡En 2 semanas mi abdomen bajó muchísimo!" },
  { name: "Elena G.", text: "El dolor de espalda por cargar a mi bebé era insoportable. Los hipopresivos me salvaron." },
  { name: "Sofía V.", text: "Tenía miedo de estornudar por las fugas de orina. Gracias Natalia, por devolverme mi seguridad." },
  { name: "Carla P.", text: "Probé mil dietas y nada. Solo necesitaba cerrar mi diástasis. ¡Funciona al 100%!" }
];

const BONUSES = [
  { name: "1 Clase Grupal de Hipopresivos", desc: "Soporte técnico y corrección en vivo cada mes.", icon: Video, val: "$47" },
  { name: "Guía de Lactancia Materna", desc: "Todo lo que necesitas para una lactancia sin dolor.", icon: Baby, val: "$27" },
  { name: "Guía de Recomendaciones Alimenticias", desc: "Plan anti-inflamatorio diseñado por expertos.", icon: Utensils, val: "$37" },
  { name: "Evaluación Corporal Inicial", desc: "Aprende a medir tu diástasis tú misma.", icon: ClipboardCheck, val: "$17" },
  { name: "Grupo Privado Facebook and WhatsApp", desc: "Comunidad VIP de apoyo y motivación 24/7.", icon: MessageCircle, val: "$47" },
  { name: "Clases de Baile Posparto", desc: "Rutinas divertidas de bajo impacto para quemar grasa.", icon: Music, val: "$27" },
  { name: "Acceso Ilimitado de por Vida", desc: "Sin fechas límite, entrena a tu ritmo para siempre.", icon: Infinity, val: "$97" },
  { name: "Certificado de Finalización", desc: "Aval oficial de tu transformación física.", icon: GraduationCap, val: "$15" }
];

const FAQS = [
  { q: "¿Tuve cesárea, puedo hacerlo?", a: "Sí, es ideal para recuperar la sensibilidad y sanar internamente, siempre con alta médica." },
  { q: "¿Sirve si mi parto fue hace años?", a: "Sí, la diástasis no se cierra sola con el tiempo, nunca es tarde para tratarla." },
  { q: "¿Estoy lactando, afecta la leche?", a: "No, los hipopresivos mejorar la postura y circulación, beneficiando la lactancia." },
  { q: "¿Cuánto tiempo necesito?", a: "Solo necesitas 15-20 minutos al día. Diseñado para mamás reales." }
];

const Carousel: React.FC<{ children: React.ReactNode, autoPlay?: boolean }> = ({ children, autoPlay = true }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -clientWidth * 0.8 : clientWidth * 0.8, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        else scroll('right');
      }
    }, 4500);
    return () => clearInterval(interval);
  }, [autoPlay]);

  return (
    <div className="relative group w-full">
      <button onClick={() => scroll('left')} className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg border border-sage-100 active:scale-90 transition-all opacity-80 hover:opacity-100">
          <ChevronLeft size={20} className="text-sage-900" />
      </button>
      <button onClick={() => scroll('right')} className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg border border-sage-100 active:scale-90 transition-all opacity-80 hover:opacity-100">
          <ChevronRight size={20} className="text-sage-900" />
      </button>
      <div ref={scrollRef} className="flex overflow-x-auto snap-x snap-mandatory px-5 gap-4 pb-10 no-scrollbar scroll-smooth">
        {children}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [view, setView] = useState('landing');
  const [showSticky, setShowSticky] = useState(false);
  const vslRef = useRef<HTMLDivElement>(null);

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

  const handleBuyClick = () => {
    // @ts-ignore
    if (typeof window.fbq === 'function') {
      // @ts-ignore
      window.fbq('track', 'AddToCart', {
        content_name: 'Reto Posparto 21 Días',
        value: 69.99,
        currency: 'USD',
        content_type: 'product'
      });
      console.log("🛒 Evento AddToCart enviado al Pixel");
    }
  };

  if (view !== 'landing') {
    return (
      <div className="p-8 max-w-2xl mx-auto min-h-screen bg-cream">
        <button onClick={() => setView('landing')} className="mb-10 flex items-center gap-2 font-bold text-sage-900 uppercase text-xs tracking-widest"><ArrowLeft size={16}/> Volver</button>
        <h1 className="text-3xl font-black mb-6 uppercase tracking-tight">{view === 'privacy' ? 'Privacidad' : 'Términos'}</h1>
        <div className="text-gray-600 text-sm space-y-4 leading-relaxed">
          <p>Su privacidad es nuestra prioridad absoluta. Los datos compartidos son manejados con estricta confidencialidad.</p>
          <p>Este programa no sustituye el consejo médico. Cada cuerpo es único; escuche a su profesional de salud.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream font-sans selection:bg-lime-400 overflow-x-hidden">
      
      {/* HERO SECTION */}
      <section className="relative px-6 pt-16 pb-12 text-center max-w-md mx-auto">
        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white border border-sage-100 shadow-sm mb-10">
          <span className="w-2 h-2 rounded-full bg-lime-500 animate-pulse"></span>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-sage-900">MÉTODO REGENERATIVO · 21 DÍAS</span>
        </div>
        
        <h1 className="flex flex-col gap-3 mb-10 overflow-visible text-center items-center">
          <span className="text-xl font-bold text-sage-800 uppercase tracking-tight leading-none">¿Tu abdomen sigue</span>
          <div className="relative inline-block py-2 px-4">
            <span className="block text-[clamp(2.5rem,10vw,4.2rem)] font-black italic tracking-tighter leading-none animate-gradient bg-gradient-to-r from-lime-600 via-lime-500 to-lime-600 bg-clip-text text-transparent drop-shadow-sm">
              ABULTADO
            </span>
            <div className="absolute -bottom-1 left-0 w-full h-4 bg-lime-400/20 -skew-x-12 blur-sm"></div>
            <Sparkles className="absolute -top-3 -right-4 text-lime-400 w-8 h-8 animate-pulse" />
          </div>
          <span className="text-2xl font-black text-sage-900 leading-tight">como si estuvieras <br/> embarazada?</span>
        </h1>

        <div ref={vslRef} className="relative aspect-video bg-black rounded-[2.5rem] shadow-2xl overflow-hidden mb-12 border-4 border-white group">
          <video className="w-full h-full object-cover" controls playsInline preload="metadata">
            <source src={ASSETS.vsl} type="video/mp4" />
          </video>
          <div className="absolute top-4 left-4 bg-lime-500 text-white text-[9px] font-black px-4 py-1.5 rounded-full shadow-lg border border-white uppercase z-20">VER PRESENTACIÓN</div>
        </div>

        <div className="flex flex-col items-center gap-4 py-6 bg-white/40 backdrop-blur rounded-3xl border border-white shadow-sm">
           <div className="flex -space-x-3">
              {ASSETS.testimonials.slice(0, 5).map((src, i) => (
                <img key={i} className="h-10 w-10 rounded-full ring-2 ring-white object-cover shadow-sm" src={src} alt="Mamá" />
              ))}
              <div className="h-10 w-10 rounded-full bg-lime-400 ring-2 ring-white flex items-center justify-center text-[10px] font-black text-sage-900 shadow-sm">+2K</div>
           </div>
           <p className="text-[10px] font-black text-sage-900 tracking-widest uppercase text-center px-4 leading-relaxed">ÚNETE A LA RED DE MAMÁS QUE YA CERRARON SU DIÁSTASIS ⭐⭐⭐⭐⭐</p>
        </div>
      </section>

      {/* MARQUEE TESTIMONIALS */}
      <div className="relative flex overflow-x-hidden bg-sage-900 py-10 border-y border-white/5">
        <div className="animate-marquee-slow flex gap-8 px-8">
          {[...DETAILED_TESTIMONIALS, ...DETAILED_TESTIMONIALS].map((t, i) => (
            <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-3xl w-[280px] shrink-0 backdrop-blur-md">
              <div className="flex justify-between items-center mb-3">
                <span className="text-lime-400 text-[10px] font-black uppercase tracking-widest">{t.name}</span>
                <div className="flex gap-0.5">{[...Array(5)].map((_, j) => <Star key={j} size={10} className="fill-lime-400 text-lime-400" />)}</div>
              </div>
              <p className="text-white text-xs leading-relaxed italic">"{t.text}"</p>
            </div>
          ))}
        </div>
      </div>

      {/* BLOQUE PROBLEMA */}
      <section className="px-5 py-24 bg-white rounded-t-[4rem] shadow-2xl relative z-10">
        <div className="max-w-md mx-auto text-center">
          <div className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-red-600 text-white text-[10px] font-black tracking-widest uppercase mb-10 shadow-lg animate-bounce">
            <ShieldAlert size={12} /> ALERTA DE SALUD
          </div>
          <h2 className="text-2xl font-black text-sage-900 leading-tight uppercase mb-12">¿POR QUÉ TU VIENTRE <br/><span className="text-red-600 italic">SIGUE AHÍ?</span></h2>
          
          <div className="space-y-12">
            <div className="bg-white rounded-[3rem] border-2 border-red-100 p-4 shadow-xl">
              <div className="aspect-square bg-red-50 rounded-[2.5rem] mb-6 overflow-hidden flex items-center justify-center p-6">
                 <img src={ASSETS.errorState} alt="Efecto Globo" className="w-full h-full object-contain" />
              </div>
              <div className="px-4 pb-4 text-left">
                <h3 className="font-black text-red-600 uppercase text-lg mb-2">Error Estructural</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Hacer abdominales clásicos <b>empeora el problema</b> al aumentar la presión intra-abdominal, alejando más tus músculos.</p>
              </div>
            </div>

            <div className="bg-white rounded-[3rem] border-2 border-lime-400 p-4 shadow-2xl">
              <div className="aspect-square bg-lime-50 rounded-[2.5rem] mb-6 overflow-hidden flex items-center justify-center p-6">
                 <img src={ASSETS.methodState} alt="Efecto Corset" className="w-full h-full object-contain" />
              </div>
              <div className="px-4 pb-4 text-left">
                <h3 className="font-black text-sage-900 uppercase text-lg mb-2">Sincronía Biológica</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Nuestra técnica activa tu <b>corset natural</b>, succionando los órganos hacia arriba y uniendo la diástasis físicamente.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CIENCIA INVISIBLE - MECANISMO DE RECONEXIÓN */}
      <section className="py-24 bg-cream px-5">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-3xl font-black mb-12 text-sage-900 uppercase font-clash">MECANISMO DE <br/> <span className="text-lime-600 italic">RECONEXIÓN</span></h2>
          <div className="rounded-[3rem] overflow-hidden shadow-2xl border-[10px] border-white mb-16 bg-white aspect-video flex items-center justify-center relative group">
            <img 
              src={ASSETS.mechanism} 
              className="w-full h-full object-cover" 
              alt="Mecanismo de Reconexión" 
            />
            <div className="absolute inset-0 bg-black/5 flex items-end justify-center pb-6">
              <span className="bg-lime-400 text-sage-900 text-[10px] font-black uppercase px-6 py-2 rounded-full shadow-lg border-2 border-white transition-transform group-hover:scale-110">RECONSTRUCCIÓN CELULAR</span>
            </div>
          </div>
          <div className="space-y-6">
            {[{t: "Activación del Core", d: "Reprograma tus músculos profundos para que trabajen 24/7."}, 
               {t: "Cierre de Línea Alba", d: "Une el tejido conectivo que se estiró durante el embarazo."}, 
               {t: "Escudo Pélvico", d: "Refuerza la base de tu cuerpo contra fugas y prolapsos."}].map((item, i) => (
              <div key={i} className="flex gap-5 items-center p-6 rounded-3xl bg-white border border-sage-50 shadow-sm text-left transition-all hover:translate-x-2">
                <div className="w-12 h-12 bg-sage-900 rounded-2xl flex items-center justify-center text-lime-400 font-black text-xl shrink-0">{i+1}</div>
                <div><h4 className="font-black text-sm text-sage-900 uppercase tracking-tight">{item.t}</h4><p className="text-gray-400 text-[10px] mt-1 leading-tight">{item.d}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BIBLIOTECA DE TRANSFORMACIONES (6 IMÁGENES) */}
      <section className="py-24 bg-white overflow-hidden text-center">
        <h2 className="text-2xl font-black px-5 mb-12 uppercase tracking-tight font-clash leading-none text-center">BIBLIOTECA DE TRANSFORMACIONES</h2>
        <Carousel>
          {ASSETS.testimonials.map((src, i) => (
            <div key={i} className="shrink-0 w-[85vw] max-w-[320px] snap-center">
              <div className="relative rounded-[3rem] overflow-hidden border-[8px] border-cream shadow-xl bg-white aspect-[3/4] flex items-center justify-center p-2">
                 <img src={src} alt={`Testimonio ${i+1}`} className="w-full h-full object-contain" />
                 <div className="absolute top-6 right-6 bg-sage-900 text-white text-[9px] font-black px-4 py-1.5 rounded-full shadow-lg border border-white">CASO REAL</div>
              </div>
            </div>
          ))}
        </Carousel>
      </section>

      {/* EXPLORA LA PLATAFORMA */}
      <section className="py-32 bg-sage-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(132,204,22,0.1),transparent_50%)] pointer-events-none"></div>
        <div className="max-w-md mx-auto px-5 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 py-2 px-5 rounded-full bg-white/5 border border-white/10 text-lime-400 text-[9px] font-black tracking-[0.3em] uppercase mb-10">
             <Layers size={14} /> ECOSISTEMA DIGITAL PREMIUM
          </div>
          <h2 className="text-3xl font-black text-white mb-16 uppercase font-clash leading-none tracking-tight">TU PLATAFORMA <br/><span className="text-lime-400 italic">POR DENTRO</span></h2>

          <div className="space-y-12">
            {ASSETS.courseInside.map((img, idx) => (
              <div key={idx} className="group relative">
                <div className="relative bg-black rounded-[2.5rem] p-2 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] border border-white/10 transition-transform duration-700 hover:scale-[1.02]">
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-4 bg-sage-900 rounded-full z-20"></div>
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[1.8rem]">
                     <img src={img} alt={`Curso Módulo ${idx + 1}`} className="w-full h-full object-cover" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10">
                           <AppWindow size={16} className="text-lime-400" />
                           <span className="text-white text-[10px] font-black uppercase tracking-widest">Módulo {idx + 1}</span>
                        </div>
                     </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PACK DE BIENVENIDA VIP */}
      <section className="py-24 px-5 bg-cream overflow-hidden">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-16">
             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-lime-400 text-sage-900 text-[10px] font-black tracking-widest uppercase mb-4 shadow-sm">
                <Gift size={14} /> PACK EXCLUSIVO
             </div>
             <h2 className="text-3xl font-black text-sage-900 uppercase font-clash leading-none tracking-tight">BONOS DE REGALO <br/><span className="text-lime-600 italic">ADICIONALES</span></h2>
          </div>

          <div className="grid gap-4 mb-20">
            {BONUSES.map((bonus, i) => (
              <div key={i} className="bg-white p-6 rounded-[2.5rem] border border-sage-50 shadow-sm flex items-center gap-5 group transition-all hover:border-lime-400">
                <div className="w-14 h-14 bg-lime-50 rounded-2xl flex items-center justify-center text-lime-600 shrink-0 group-hover:bg-lime-400 group-hover:text-white transition-colors">
                  <bonus.icon size={28} />
                </div>
                <div className="flex-1">
                   <div className="flex justify-between items-start">
                      <h4 className="font-black text-[11px] uppercase text-sage-900 leading-tight mb-1">{bonus.name}</h4>
                      <span className="text-[9px] font-black text-gray-300 line-through">{bonus.val}</span>
                   </div>
                   <p className="text-[10px] text-gray-400 leading-tight italic">{bonus.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative group max-w-[340px] mx-auto overflow-visible">
            <div className="absolute -top-4 -left-1 text-lime-400 z-30 animate-bounce duration-1000"><Sparkles size={24} /></div>
            <div className="absolute -bottom-4 -right-1 text-lime-500 z-30 animate-pulse"><PartyPopper size={24} /></div>
            
            <div className="relative py-12 px-6 rounded-[3.5rem] bg-[#0D1513] text-white shadow-[0_30px_70px_-10px_rgba(132,204,22,0.3)] border-4 border-lime-400/30 flex flex-col items-center text-center overflow-hidden">
               <Gift className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 text-lime-400 opacity-[0.05] rotate-12 pointer-events-none" />
               
               <div className="relative z-10 w-full flex flex-col items-center">
                  <div className="inline-flex items-center gap-2 bg-lime-400 text-sage-900 px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest mb-10 shadow-xl border border-white/20">
                    <Crown size={12} /> PACK DE BIENVENIDA VIP
                  </div>
                  
                  <span className="text-[10px] font-black text-lime-400 tracking-[0.3em] uppercase block mb-6 opacity-90 leading-tight">VALOR TOTAL DE ESTE PACK:</span>
                  
                  <div className="relative flex flex-col items-center mb-10 w-full">
                     <div className="relative inline-block mb-3">
                       <span className="text-2xl font-black text-white/20 tracking-tighter leading-none italic select-none">$284.00</span>
                       <div className="absolute top-1/2 left-0 w-full h-1 bg-red-600 -rotate-12 shadow-sm rounded-full"></div>
                       <div className="absolute top-1/2 left-0 w-full h-1 bg-red-600 rotate-12 shadow-sm rounded-full opacity-60"></div>
                       <div className="absolute -right-12 top-0 bg-red-600 text-white text-[8px] font-black px-2 py-1 rounded-sm rotate-12 shadow-lg uppercase tracking-widest">¡SÓLO HOY!</div>
                     </div>
                     
                     <div className="relative flex flex-col items-center w-full px-2">
                        <span className="text-[clamp(3.5rem,15vw,5rem)] font-black text-lime-400 leading-none tracking-tighter block drop-shadow-[0_8px_15px_rgba(132,204,22,0.5)] animate-pulse uppercase">
                          GRATIS
                        </span>
                     </div>
                  </div>

                  <div className="h-px w-2/3 bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10"></div>
                  
                  <div className="flex flex-col items-center gap-4 w-full px-4">
                    <div className="text-[10px] font-black text-white/90 uppercase tracking-[0.2em] bg-white/5 px-6 py-3 rounded-2xl border border-white/10 w-full max-w-[200px]">
                      INCLUIDO EN TU ACCESO
                    </div>
                    <p className="text-[9px] text-lime-400/50 font-bold uppercase tracking-widest italic">Sin costos ocultos ni mensualidades</p>
                  </div>
               </div>

               <div className="absolute inset-0 pointer-events-none shimmer-effect opacity-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* OFERTA ÚNICA */}
      <section id="oferta" className="px-5 py-32 bg-cream">
        <div className="max-w-md mx-auto relative bg-[#0D1513] rounded-[4.5rem] p-10 text-white overflow-hidden shadow-3xl border border-white/5 text-center">
          <div className="absolute top-0 right-0 left-0 bg-red-700 text-white font-black text-[9px] py-4 text-center tracking-[0.3em] uppercase animate-pulse z-10">OFERTA POR TIEMPO LIMITADO</div>
          <div className="mt-12 relative z-20">
            <h2 className="text-2xl font-black mb-2 uppercase font-clash leading-none tracking-tight">RETO POSPARTO</h2>
            <span className="text-5xl font-black italic text-lime-400 font-clash tracking-tighter block mb-12">21 DÍAS</span>
            
            <div className="bg-white/5 p-8 rounded-[3.5rem] border border-white/10 mb-10 flex flex-col items-center">
                <p className="text-gray-500 line-through text-xs font-black uppercase mb-2 tracking-widest opacity-60">$197.00 USD</p>
                <div className="flex flex-col items-center mb-6">
                    <span className="text-7xl font-black text-white leading-none font-clash tracking-tighter animate-gradient bg-gradient-to-r from-white via-lime-400 to-white bg-clip-text text-transparent">$69.99</span>
                    <span className="text-[9px] text-lime-400 font-bold tracking-[0.3em] mt-3 uppercase">PAGO ÚNICO VITALICIO</span>
                </div>
                <div className="w-full h-px bg-white/10 mb-6"></div>
                <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/5">
                   <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                   <p className="text-[8px] text-white/40 font-black tracking-widest uppercase">7 CUPOS DISPONIBLES HOY</p>
                </div>
            </div>
            
            <a 
              href="https://go.hotmart.com/D102309348Q?ap=4cfb" 
              onClick={handleBuyClick}
              className="group block w-full bg-gradient-to-r from-lime-400 to-lime-500 text-sage-900 font-black py-6 rounded-[2.5rem] text-xl shadow-2xl active:scale-95 transition-all uppercase font-clash shimmer-effect overflow-hidden relative mb-8"
            >
               ¡INSCRIBIRME AHORA!
            </a>
            
            <div className="flex flex-col items-center gap-6">
               <div className="max-w-[280px]">
                  <img 
                    src={ASSETS.paymentMethods} 
                    alt="Métodos de Pago" 
                    className="w-full h-auto" 
                  />
               </div>
               <div className="flex gap-4 opacity-30 justify-center"><ShieldCheck size={20} /><Lock size={20} /></div>
               <p className="text-white/20 text-[9px] font-black tracking-widest uppercase">Seguridad Certificada SSL</p>
            </div>
          </div>
        </div>
      </section>

      {/* VIDEO TESTIMONIOS */}
      <section className="py-24 bg-white text-center border-t border-sage-50">
        <h2 className="text-3xl font-black uppercase text-sage-900 mb-12 font-clash tracking-tight leading-none">TESTIMONIOS EN VIDEO</h2>
        <Carousel autoPlay={false}>
          {ASSETS.videoTestimonials.map((src, i) => (
            <div key={i} className="shrink-0 w-[85vw] max-w-[320px] snap-center">
              <div className="relative rounded-[3.5rem] overflow-hidden border-[8px] border-cream shadow-2xl bg-black aspect-[9/16] group">
                 <video className="w-full h-full object-cover" controls playsInline preload="metadata"><source src={src} type="video/mp4" /></video>
                 <div className="absolute top-6 left-6 bg-lime-500 text-white text-[9px] font-black px-4 py-1.5 rounded-full shadow-lg border border-white z-10">ALUMNA</div>
              </div>
            </div>
          ))}
        </Carousel>
      </section>

      {/* LA MENTORA */}
      <section className="py-32 px-5 bg-white border-t border-sage-50">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-4xl font-black text-sage-900 mb-12 uppercase font-clash tracking-tighter leading-none text-center">NATALIA <br/><span className="text-purple-600">ALARCÓN</span></h2>
          <div className="relative rounded-[4.5rem] overflow-hidden border-[10px] border-cream shadow-2xl mb-12 group bg-sage-50 aspect-square flex items-center justify-center">
             <img src={ASSETS.author} alt="Natalia Alarcón" className="w-full h-full object-contain transform group-hover:scale-105 transition-all duration-1000" />
             <div className="absolute top-8 left-8 bg-white p-5 rounded-[2.5rem] shadow-2xl border border-purple-100 flex flex-col items-center z-10">
                <span className="text-3xl font-black text-purple-600 leading-none tracking-tighter">+15</span>
                <span className="text-[9px] font-black text-gray-400 uppercase mt-1">Años Exp.</span>
             </div>
          </div>
          <div className="bg-sage-900 rounded-[4rem] p-10 text-white shadow-3xl text-left relative overflow-hidden">
             <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full -mb-16 -mr-16 blur-2xl"></div>
             <div className="relative z-10">
                <p className="text-lime-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4">Especialista Certificada</p>
                <h3 className="text-2xl font-bold leading-tight mb-8 font-clash uppercase">Rehabilitación Abdominal y Suelo Pélvico</h3>
                <div className="space-y-4">
                  {[{i:Award, t:"Certificación Internacional"}, {i:Medal, t:"Experta en Técnicas Hipopresivas"}, {i:Heart, t:"Visión Integral Posparto"}].map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-center bg-white/5 p-5 rounded-3xl border border-white/10">
                      <item.i size={24} className="text-lime-400" />
                      <span className="text-[11px] font-bold uppercase tracking-tight leading-none">{item.t}</span>
                    </div>
                  ))}
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* GARANTÍA MEJORADA VISUALMENTE */}
      <section className="py-32 px-5 bg-sage-900 relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(132,204,22,0.1),transparent_70%)] pointer-events-none"></div>
        <div className="max-w-md mx-auto relative z-10">
          <h2 className="text-4xl font-black text-white mb-12 uppercase font-clash leading-none tracking-tight drop-shadow-lg">GARANTÍA DE <br/><span className="text-lime-400 italic">BLINDAJE TOTAL</span></h2>
          
          <div className="relative">
            {/* Sello de Garantía Flotante Premium */}
            <div className="absolute -top-10 -right-4 w-32 h-32 z-30 pointer-events-none">
              <div className="relative w-full h-full animate-[spin_12s_linear_infinite]">
                 <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_10px_15px_rgba(132,204,22,0.4)]">
                   <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
                   <text className="text-[9px] font-black fill-lime-400 uppercase tracking-[0.1em]">
                     <textPath xlinkHref="#circlePath">Garantía Incondicional de Satisfacción • 7 Días de Prueba •</textPath>
                   </text>
                 </svg>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-lime-400 rounded-full w-20 h-20 flex items-center justify-center border-4 border-sage-900 shadow-xl overflow-hidden group">
                 <div className="flex flex-col items-center">
                   <span className="text-[10px] font-black text-sage-900 leading-none">RETO</span>
                   <span className="text-2xl font-black text-sage-900 leading-none tracking-tighter">7</span>
                   <span className="text-[10px] font-black text-sage-900 leading-none">DÍAS</span>
                 </div>
                 <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>
            </div>

            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border-2 border-white/20 rounded-[4.5rem] p-10 md:p-14 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] overflow-hidden group">
               {/* Luces de fondo decorativas */}
               <div className="absolute -top-10 -left-10 w-40 h-40 bg-lime-400/10 blur-[60px] rounded-full pointer-events-none"></div>
               <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-500/10 blur-[60px] rounded-full pointer-events-none"></div>

               <div className="mb-8 flex justify-center">
                 <div className="bg-lime-400/10 p-4 rounded-full border border-lime-400/20">
                   <ShieldCheck size={48} className="text-lime-400" />
                 </div>
               </div>

               <Quote className="text-lime-400/10 mb-6 mx-auto" size={80} />
               <p className="text-white text-lg md:text-xl font-bold italic leading-relaxed mb-10 opacity-95 relative z-10 font-clash">
                 "Prueba el método por <span className="text-lime-400">7 días completos</span>. Si no sientes cambios reales o simplemente no es lo que esperabas, te devuelvo el <span className="text-lime-400">100% de tu dinero</span>. Sin trámites, sin preguntas."
               </p>

               <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-white/30 to-transparent mb-10"></div>
               
               <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center gap-3 bg-white/5 px-6 py-2.5 rounded-full border border-white/10 shadow-sm backdrop-blur-sm">
                     <Lock size={14} className="text-lime-400" />
                     <span className="text-[10px] text-white/70 font-black tracking-widest uppercase">TRANSACCIÓN BLINDADA · RIESGO CERO</span>
                  </div>
               </div>

               <div className="absolute inset-0 pointer-events-none shimmer-effect opacity-[0.05]"></div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQS */}
      <section className="px-5 py-24 w-full max-w-md mx-auto text-center">
        <h2 className="text-3xl font-black text-sage-900 text-center mb-16 uppercase font-clash leading-none tracking-tight">CENTRO DE <br/> INFORMACIÓN</h2>
        <div className="space-y-4">
           {FAQS.map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-sage-100 shadow-sm text-left transition-all hover:border-lime-400">
                <h4 className="font-black text-sm uppercase text-sage-900 mb-3 flex items-center gap-3"><CheckCircle2 size={18} className="text-lime-500 shrink-0" /> {item.q}</h4>
                <p className="text-xs text-gray-500 leading-relaxed font-medium">{item.a}</p>
              </div>
           ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-24 px-5 bg-sage-900 text-white/30 text-center text-[10px] rounded-t-[4.5rem]">
        <p className="max-w-xs mx-auto mb-12 uppercase tracking-[0.5em] font-black opacity-40 leading-relaxed">NATALIA ALARCÓN <br/> MÉTODO REGENERATIVO © 2026</p>
        <div className="flex justify-center gap-12 font-black uppercase tracking-widest text-white/50 text-[11px]">
          <button onClick={() => setView('privacy')} className="hover:text-lime-400 transition-colors">Privacidad</button>
          <button onClick={() => setView('terms')} className="hover:text-lime-400 transition-colors">Términos</button>
        </div>
      </footer>

      {/* STICKY CTA */}
      <div className={`fixed bottom-8 left-4 right-4 z-50 transition-all duration-1000 transform ${showSticky ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-32 opacity-0 scale-90'}`}>
        <div className="max-w-md mx-auto">
          <div className="absolute inset-0 bg-lime-500/30 rounded-full blur-3xl animate-pulse -z-10"></div>
          <a 
            href="https://go.hotmart.com/D102309348Q?ap=4cfb" 
            onClick={handleBuyClick}
            className="relative flex items-center justify-between px-10 py-5 bg-white/20 backdrop-blur-2xl border border-white/30 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.4)] group active:scale-95 transition-all overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-lime-400 to-lime-500 opacity-90 transition-opacity"></div>
            <div className="relative z-10 flex flex-col text-left">
              <span className="text-sage-900 font-black text-xs tracking-[0.2em] uppercase">ASEGURAR MI CUPO</span>
              <span className="text-sage-900/60 text-[8px] font-bold uppercase tracking-[0.1em]">ÚLTIMAS VACANTES CON DESCUENTO</span>
            </div>
            <div className="relative z-10 w-12 h-12 bg-sage-900/10 rounded-full flex items-center justify-center border border-white/20 transition-transform group-hover:rotate-12">
               <MousePointer2 className="text-sage-900" size={20} />
            </div>
            <div className="absolute inset-0 pointer-events-none shimmer-effect opacity-40"></div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default App;