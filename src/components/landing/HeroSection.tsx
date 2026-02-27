import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const HeroSection = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Заявка:", { name, phone });
  };

  return (
    <section 
      className="relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('https://cdn.poehali.dev/files/f2faac42-630b-4748-8a81-20935353a300.jpg')`
      }}
    >
      <div className="absolute inset-0 bg-black/10" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="pt-10 md:pt-16 pb-6 md:pb-8" />

          <div className="pb-10 md:pb-16 grid lg:grid-cols-2 gap-8">
            <div />
            <div className="bg-white/85 backdrop-blur-md rounded-3xl p-6 shadow-2xl max-w-md mx-auto lg:mx-0 lg:ml-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-2xl font-bold text-primary mb-2 text-center">
                Запишитесь на ЛЕДИ ДРАЙВ
              </h2>
              <p className="text-muted-foreground text-center mb-5 text-sm">
                Оставьте заявку и мы свяжемся с вами в течение 15 минут
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Ваше имя
                  </label>
                  <Input 
                    type="text"
                    placeholder="Введите имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full h-11 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Номер телефона
                  </label>
                  <Input 
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full h-11 bg-white"
                  />
                </div>
                <Button 
                  type="submit"
                  size="lg" 
                  className="w-full text-base py-5 bg-primary hover:bg-primary/90"
                >
                  Получить права красиво
                </Button>
                <p className="text-xs text-muted-foreground text-center pt-1">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;