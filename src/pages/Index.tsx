import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Заявка:", { name, phone });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-secondary/10 to-slate-100">
      
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-xl border-b border-border/50 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-2">
              <img 
                src="https://cdn.poehali.dev/projects/cdd4da42-d4b4-4f47-b7db-8d5d682d5928/bucket/2660c934-04f8-40fb-8a2e-62148dc8e5b1.png" 
                alt="ГОСавтошкола" 
                className="h-14 w-auto"
              />
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a 
                href="https://автошкола92.рф/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-foreground/80 hover:text-primary transition-all font-medium text-sm uppercase tracking-wide"
              >
                Главная
              </a>
              <a 
                href="https://автошкола92.рф/o-gosavtoshkole/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-foreground/80 hover:text-primary transition-all font-medium text-sm uppercase tracking-wide"
              >
                О ГОСавтошколе
              </a>
              <a 
                href="https://автошкола92.рф/aktsii/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-foreground/80 hover:text-primary transition-all font-medium text-sm uppercase tracking-wide"
              >
                Спецпредложения
              </a>
              <a 
                href="https://автошкола92.рф/raspisanie/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-foreground/80 hover:text-primary transition-all font-medium text-sm uppercase tracking-wide"
              >
                Расписание
              </a>
            </div>
            <Button size="sm" className="hidden md:block bg-primary/90 hover:bg-primary backdrop-blur-sm">
              Связаться
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/10 to-accent/5"></div>
          <img 
            src="https://cdn.poehali.dev/projects/cdd4da42-d4b4-4f47-b7db-8d5d682d5928/bucket/f183f550-fa61-4101-b1db-6ad789eabf3f.jpg" 
            alt="Автопарк ГОСавтошколы" 
            className="absolute top-0 right-0 w-2/5 h-full object-cover opacity-8"
          />
        </div>
        <div className="container mx-auto px-4 py-20 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in space-y-8">
              <div className="inline-block px-8 py-3 bg-white/70 backdrop-blur-md rounded-full border border-primary/20 shadow-lg">
                <span className="text-primary font-semibold text-xs tracking-widest uppercase">ГОСавтошкола</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-primary leading-tight">
                ЛЕДИ<br />ДРАЙВ
              </h1>
              
              <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-8 border border-white/40 shadow-2xl">
                <p className="text-2xl md:text-3xl text-foreground mb-3 font-light">
                  Автошкола, где понимают женщин
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Мягкий подход, чуткие инструкторы и 70 часов практики для уверенного вождения
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="relative group overflow-hidden rounded-3xl shadow-2xl">
                  <img 
                    src="https://cdn.poehali.dev/projects/cdd4da42-d4b4-4f47-b7db-8d5d682d5928/bucket/5eceee30-a55a-4aef-866b-d92fe7b9ba6c.jpg" 
                    alt="Девушка за рулем"
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent"></div>
                </div>
                <div className="relative group overflow-hidden rounded-3xl shadow-2xl">
                  <img 
                    src="https://cdn.poehali.dev/projects/cdd4da42-d4b4-4f47-b7db-8d5d682d5928/bucket/bd9dfef9-5309-493b-89f4-bc6233e44960.jpg" 
                    alt="Уверенная водитель"
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent"></div>
                </div>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-2xl rounded-3xl p-10 shadow-2xl border border-white/50">
              <div className="relative mb-6 rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://cdn.poehali.dev/projects/cdd4da42-d4b4-4f47-b7db-8d5d682d5928/bucket/28570d99-0612-4edf-ab01-55b67c60003a.jpg" 
                  alt="Счастливая девушка за рулем"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent"></div>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3 text-center">
                Запишитесь на ЛЕДИ ДРАЙВ
              </h2>
              <p className="text-muted-foreground text-center mb-8 text-sm">
                Оставьте заявку и мы свяжемся с вами в течение 15 минут
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2 tracking-wide">
                    Ваше имя
                  </label>
                  <Input 
                    type="text"
                    placeholder="Введите имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full h-14 text-lg bg-white/80 backdrop-blur-sm border-2 border-primary/20 focus:border-primary/50 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2 tracking-wide">
                    Номер телефона
                  </label>
                  <Input 
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full h-14 text-lg bg-white/80 backdrop-blur-sm border-2 border-primary/20 focus:border-primary/50 rounded-xl"
                  />
                </div>
                <Button 
                  type="submit"
                  size="lg" 
                  className="w-full text-lg py-7 bg-primary hover:bg-primary/90 shadow-xl hover:shadow-2xl transition-all rounded-xl font-semibold tracking-wide"
                >
                  Получить права красиво
                </Button>
                <p className="text-xs text-muted-foreground text-center leading-relaxed">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Understanding Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-bold text-primary mb-6">
                Мы понимаем ваши страхи
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                И знаем, как с ними работать бережно и профессионально
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-10 border border-white/50 shadow-2xl hover:shadow-3xl transition-all hover:-translate-y-2">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-secondary/30 flex items-center justify-center mb-8 mx-auto">
                  <Icon name="Heart" size={36} className="text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4 text-center">
                  Боитесь строгих инструкторов?
                </h3>
                <p className="text-muted-foreground text-center leading-relaxed">
                  С нами вы учитесь у инструкторов-женщин и самых чутких преподавателей-мужчин. Без криков, давления и стресса.
                </p>
              </div>

              <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-10 border border-white/50 shadow-2xl hover:shadow-3xl transition-all hover:-translate-y-2">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-secondary/30 flex items-center justify-center mb-8 mx-auto">
                  <Icon name="Shield" size={36} className="text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4 text-center">
                  Не уверены в себе?
                </h3>
                <p className="text-muted-foreground text-center leading-relaxed">
                  70 часов практики — столько, сколько нужно именно вам. Учимся в вашем темпе, пока не почувствуете уверенность.
                </p>
              </div>

              <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-10 border border-white/50 shadow-2xl hover:shadow-3xl transition-all hover:-translate-y-2">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-secondary/30 flex items-center justify-center mb-8 mx-auto">
                  <Icon name="CircleParking" size={36} className="text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4 text-center">
                  До сих пор паркуетесь с 15-й попытки?
                </h3>
                <p className="text-muted-foreground text-center leading-relaxed">
                  Специальный «Парковочный» курс научит ставить машину красиво и уверенно даже в самых узких местах.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 70 Hours Practice Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-primary/10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold text-center text-primary mb-8">
              70 часов практики и<br />5 женских секретов мастерства
            </h2>
            
            <div className="bg-white/70 backdrop-blur-2xl rounded-3xl p-12 md:p-16 shadow-2xl border border-white/50 mb-10">
              <p className="text-xl md:text-2xl text-foreground leading-relaxed mb-12 text-center font-light">
                Выбирая «ЛЕДИ ДРАЙВ», вы получаете максимум «асфальтового времени». Никакой воды — только навыки, которые реально спасают каждый день.
              </p>

              <div className="space-y-6">
                <div className="flex gap-6 items-start bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-primary/10">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold text-xl">✅</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-primary mb-3">70 часов практики</h3>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      Золотой стандарт идеальной езды. Вы будете за рулем столько, сколько нужно именно вам.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 items-start bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-primary/10">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold text-xl">✅</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-primary mb-3">Курс «Парковочный»</h3>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      Как парковаться по-королевски? Легко! Научим ставить машину даже там, где, кажется, нет места.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 items-start bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-primary/10">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold text-xl">✅</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-primary mb-3">Курс «Твой маршрут»</h3>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      Готовимся возить «львят» на тренировки и в школу. Освоим ваши личные маршруты без стресса и спешки.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 items-start bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-primary/10">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold text-xl">✅</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-primary mb-3">Хиты школы: «Магистральный» и «Экзаменационный»</h3>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      Адаптированы специально для девушек. Спокойно, понятно, без криков.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 items-start bg-gradient-to-br from-accent/10 to-accent/5 backdrop-blur-sm rounded-2xl p-8 border-2 border-accent/30 shadow-lg">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/40 to-accent/20 flex items-center justify-center">
                      <span className="font-bold text-xl">🔥</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-accent mb-3">НОВИНКА: Курс «Кольца города»</h3>
                    <p className="text-foreground leading-relaxed text-lg">
                      Перестаньте бояться перекрестков с круговым движением. Научим проезжать их правильно и красиво.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 items-start bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-primary/10">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold text-xl">✅</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-primary mb-3">Габаритное вождение на вашей машине</h3>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      Самый страшный этап — пересадка на личное авто. Мы будем рядом и после учебы, чтобы помочь «подружиться» с габаритами вашего железного коня.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-xl text-muted-foreground mb-4 font-light">Всё ещё боитесь кольцевого?</p>
              <Button 
                size="lg" 
                className="text-xl px-12 py-8 bg-accent hover:bg-accent/90 shadow-2xl hover:shadow-3xl transition-all rounded-2xl font-semibold"
              >
                Получить права красиво
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Online Bonuses Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold text-primary mb-6">
                Онлайн-бонусы для вашего комфорта
              </h2>
              <p className="text-xl text-muted-foreground">
                Учитесь не только за рулем, но и дома — в удобное время
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-8 border border-white/50 hover:shadow-2xl transition-all">
                <div className="flex items-start gap-5">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                    <Icon name="Video" size={28} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-primary mb-3">Видеоуроки по вождению</h3>
                    <p className="text-muted-foreground leading-relaxed">Смотрите и повторяйте маневры в своем темпе</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-8 border border-white/50 hover:shadow-2xl transition-all">
                <div className="flex items-start gap-5">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                    <Icon name="GraduationCap" size={28} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-primary mb-3">Онлайн-курс «Вождение — это просто»</h3>
                    <p className="text-muted-foreground leading-relaxed">Теория без страха и сложных терминов</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-8 border border-white/50 hover:shadow-2xl transition-all">
                <div className="flex items-start gap-5">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                    <Icon name="ClipboardCheck" size={28} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-primary mb-3">Онлайн-курс «Экзаменационный»</h3>
                    <p className="text-muted-foreground leading-relaxed">Готовьтесь к экзамену без стресса</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-8 border border-white/50 hover:shadow-2xl transition-all">
                <div className="flex items-start gap-5">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                    <Icon name="Brain" size={28} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-primary mb-3">Видеоуроки с психотерапевтом</h3>
                    <p className="text-muted-foreground leading-relaxed">Проработайте страхи и обретите уверенность</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-accent/15 to-accent/5 backdrop-blur-xl rounded-2xl p-8 border-2 border-accent/30 hover:shadow-2xl transition-all md:col-span-2">
                <div className="flex items-start gap-5">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="Gift" size={28} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-accent mb-3">Карта лояльности с подарками от партнёров</h3>
                    <p className="text-foreground leading-relaxed">Приятные бонусы и скидки для наших автоледи</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/80"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              Станьте королевой дорог с ЛЕДИ ДРАЙВ
            </h2>
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 mb-10">
              <p className="text-2xl md:text-3xl mb-4 font-light">
                70 часов практики • Чуткие инструкторы • Женский подход
              </p>
              <p className="text-lg opacity-90">
                Запишитесь сейчас и получите уверенность за рулем без стресса и криков
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg" 
                className="text-xl px-12 py-8 bg-white text-primary hover:bg-white/90 shadow-2xl hover:shadow-3xl transition-all rounded-2xl font-semibold"
              >
                Записаться на ЛЕДИ ДРАЙВ
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-xl px-12 py-8 border-2 border-white/50 text-white hover:bg-white/10 backdrop-blur-sm rounded-2xl font-semibold"
              >
                Задать вопрос
              </Button>
            </div>
            <p className="mt-10 text-sm opacity-80 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 inline-block">
              Первая консультация бесплатно • Гибкий график занятий • Рассрочка 0%
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary/95 backdrop-blur-xl text-white py-16 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <img 
              src="https://cdn.poehali.dev/projects/cdd4da42-d4b4-4f47-b7db-8d5d682d5928/bucket/2660c934-04f8-40fb-8a2e-62148dc8e5b1.png" 
              alt="ГОСавтошкола" 
              className="h-16 w-auto mx-auto mb-6 opacity-90"
            />
            <h3 className="text-2xl font-bold mb-4">ГОСавтошкола</h3>
            <p className="text-white/70 mb-8">Тариф ЛЕДИ ДРАЙВ — автошкола, которая понимает женщин</p>
            <div className="flex justify-center gap-8 text-white/60 text-sm">
              <span>© 2024 ГОСавтошкола</span>
              <span>•</span>
              <span>Лицензия № XXXXX</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
