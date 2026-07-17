import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import PrivacyConsent from "./PrivacyConsent";

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
    const pageParams = new URLSearchParams(window.location.search);
    const url = new URL("https://gosavtoschool.bitrix24.ru/rest/45768/9nij678yep7wc72c/crm.lead.add.json");
    url.searchParams.set("FIELDS[STATUS_ID]", "NEW");
    url.searchParams.set("FIELDS[NAME]", name);
    url.searchParams.set("FIELDS[PHONE][0][VALUE]", phone);
    url.searchParams.set("FIELDS[PHONE][0][VALUE_TYPE]", "WORK");
    url.searchParams.set("FIELDS[UF_CRM_1612510024]", "702");
    url.searchParams.set("FIELDS[SOURCE_ID]", "11");
    url.searchParams.set("FIELDS[UF_CRM_1611737507]", "646");
    url.searchParams.set("FIELDS[TITLE]", `${name} ${phone}`);
    const utmFields: Record<string, string> = {
      "FIELDS[UTM_SOURCE]": "utm_source",
      "FIELDS[UTM_MEDIUM]": "utm_medium",
      "FIELDS[UTM_CAMPAIGN]": "utm_campaign",
      "FIELDS[UTM_CONTENT]": "utm_content",
      "FIELDS[UTM_TERM]": "utm_term",
    };
    for (const [field, param] of Object.entries(utmFields)) {
      const value = pageParams.get(param);
      if (value) url.searchParams.set(field, value);
    }
    try {
      await fetch(url.toString());
    } catch (err) { console.error(err); }
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