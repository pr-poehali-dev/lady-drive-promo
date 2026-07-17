import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import PrivacyConsent from "./PrivacyConsent";
import { submitLead } from "@/lib/leads";

const HeroSection = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const height = sectionRef.current.offsetHeight;
      const scrolled = window.scrollY;
      const newOpacity = Math.max(0, 1 - scrolled / height);
      setOpacity(newOpacity);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      toast.error("Подтвердите согласие с политикой конфиденциальности");
      return;
    }
    await submitLead({ name, phone, source: "landing_hero" });
    toast.success("Заявка принята!", {
      description: "Менеджер свяжется с вами в ближайшее время",
      duration: 5000,
    });
    setName("");
    setPhone("");
    setConsent(false);
  };

  const form = (
    <div className="bg-white/55 backdrop-blur-sm rounded-2xl p-5 shadow-xl w-full max-w-xs animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <h2 className="text-lg font-bold text-primary mb-1 text-center">
        Запишитесь на ЛЕДИ ДРАЙВ
      </h2>
      <p className="text-muted-foreground text-center mb-4 text-xs">
        Оставьте заявку и мы свяжемся с вами в течение 15 минут
      </p>
      <form onSubmit={handleSubmit} className="space-y-2.5">
        <div>
          <label className="block text-xs font-medium text-foreground mb-1">
            Ваше имя
          </label>
          <Input
            type="text"
            placeholder="Введите имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full h-9 bg-white/80 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-foreground mb-1">
            Номер телефона
          </label>
          <Input
            type="tel"
            placeholder="+7 (___) ___-__-__"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full h-9 bg-white/80 text-sm"
          />
        </div>
        <PrivacyConsent checked={consent} onChange={setConsent} />
        <Button
          type="submit"
          size="sm"
          className="w-full text-sm py-4 bg-primary hover:bg-primary/90"
        >
          Получить права красиво
        </Button>
      </form>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      className="flex flex-col md:block"
      style={{ opacity, transition: "opacity 0.05s linear", pointerEvents: opacity === 0 ? "none" : "auto" }}
    >
      {/* Баннер */}
      <div className="relative">
        <img
          src="https://cdn.poehali.dev/files/59ce9226-c97d-4eda-abe7-791f0f1a4b37.jpg"
          alt="Леди Драйв"
          className="w-full object-contain block"
        />
        <div className="absolute inset-0 bg-black/15" />
        {/* Форма поверх баннера — только на десктопе */}
        <div className="hidden md:flex absolute inset-0 container mx-auto px-4 z-10 items-center">
          {form}
        </div>
      </div>

      {/* Форма под баннером — только на мобильном */}
      <div className="md:hidden px-4 py-6 bg-background flex justify-center">
        {form}
      </div>
    </section>
  );
};

export default HeroSection;