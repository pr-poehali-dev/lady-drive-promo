import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const HeroSection = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      <div
        className="relative bg-cover bg-center bg-no-repeat min-h-[420px] md:min-h-[520px]"
        style={{
          backgroundImage: `url('https://cdn.poehali.dev/files/f2faac42-630b-4748-8a81-20935353a300.jpg')`
        }}
      >
        <div className="absolute inset-0 bg-black/15" />
        {/* Форма поверх баннера — только на десктопе */}
        <div className="hidden md:block container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="pt-10 pb-10 md:pt-14 md:pb-14 flex">
              {form}
            </div>
          </div>
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
