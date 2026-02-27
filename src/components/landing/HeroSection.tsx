import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const HeroSection = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
        <Button
          type="submit"
          size="sm"
          className="w-full text-sm py-4 bg-primary hover:bg-primary/90"
        >
          Получить права красиво
        </Button>
        <p className="text-xs text-muted-foreground/80 text-center">
          Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
        </p>
      </form>
    </div>
  );

  return (
    <section className="flex flex-col md:block">
      {/* Баннер */}
      <div className="relative">
        <img
          src="https://cdn.poehali.dev/files/f2faac42-630b-4748-8a81-20935353a300.jpg"
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