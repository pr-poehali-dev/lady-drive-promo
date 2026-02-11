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
    <div className="min-h-screen bg-gradient-to-br from-secondary/20 via-white to-secondary/30">
      
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-primary/10 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-2">
              <img 
                src="https://cdn.poehali.dev/projects/cdd4da42-d4b4-4f47-b7db-8d5d682d5928/bucket/2660c934-04f8-40fb-8a2e-62148dc8e5b1.png" 
                alt="ГОСавтошкола" 
                className="h-12 w-auto"
              />
            </div>
            <div className="hidden md:flex items-center gap-6">
              <a 
                href="https://автошкола92.рф/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                Главная
              </a>
              <a 
                href="https://автошкола92.рф/o-gosavtoshkole/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                О ГОСавтошколе
              </a>
              <a 
                href="https://автошкола92.рф/aktsii/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                Спецпредложения
              </a>
              <a 
                href="https://автошкола92.рф/raspisanie/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                Расписание
              </a>
            </div>
            <Button size="sm" className="hidden md:block">
              Связаться
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        className="py-16 md:py-24 relative bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(230, 221, 255, 0.85) 0%, rgba(200, 185, 250, 0.75) 100%), url('https://cdn.poehali.dev/files/1f2bf7d2-a5c9-4d2e-b365-e70b6d193a0b.jpg')`
        }}
      >
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            <div className="space-y-6 animate-fade-in">
              <div className="inline-block px-6 py-2 bg-white/60 backdrop-blur-sm rounded-full">
                <span className="text-primary font-semibold text-sm tracking-wide uppercase">ГОСавтошкола</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-primary leading-tight">
                ЛЕДИ ДРАЙВ
              </h1>
              
              <p className="text-2xl md:text-3xl text-foreground font-light">
                Автошкола, где понимают женщин
              </p>
              
              <p className="text-lg text-foreground/80 leading-relaxed">
                Мягкий подход, чуткие инструкторы и 70 часов практики для уверенного вождения
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-2xl max-w-md mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
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
      </section>

      {/* Understanding Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-4">
              Мы понимаем ваши страхи
            </h2>
            <p className="text-center text-muted-foreground text-lg mb-12">
              И знаем, как с ними работать бережно и профессионально
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center mb-6 mx-auto">
                  <Icon name="Heart" size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-4 text-center">
                  Боитесь строгих инструкторов?
                </h3>
                <p className="text-muted-foreground text-center leading-relaxed mb-4">
                  С нами вы учитесь у инструкторов-женщин и самых чутких преподавателей-мужчин. Без криков, давления и стресса.
                </p>
                <img 
                  src="https://cdn.poehali.dev/projects/cdd4da42-d4b4-4f47-b7db-8d5d682d5928/bucket/f183f550-fa61-4101-b1db-6ad789eabf3f.jpg" 
                  alt="Автопарк"
                  className="w-full h-32 object-cover rounded-xl"
                />
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center mb-6 mx-auto">
                  <Icon name="Shield" size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-4 text-center">
                  Не уверены в себе?
                </h3>
                <p className="text-muted-foreground text-center leading-relaxed mb-4">
                  70 часов практики — столько, сколько нужно именно вам. Учимся в вашем темпе, пока не почувствуете уверенность.
                </p>
                <img 
                  src="https://cdn.poehali.dev/projects/cdd4da42-d4b4-4f47-b7db-8d5d682d5928/bucket/5eceee30-a55a-4aef-866b-d92fe7b9ba6c.jpg" 
                  alt="Девушка за рулем"
                  className="w-full h-32 object-cover rounded-xl"
                />
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center mb-6 mx-auto">
                  <Icon name="CircleParking" size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-4 text-center">
                  До сих пор паркуетесь с 15-й попытки?
                </h3>
                <p className="text-muted-foreground text-center leading-relaxed mb-4">
                  Специальный «Парковочный» курс научит ставить машину красиво и уверенно даже в самых узких местах.
                </p>
                <img 
                  src="https://cdn.poehali.dev/projects/cdd4da42-d4b4-4f47-b7db-8d5d682d5928/bucket/bd9dfef9-5309-493b-89f4-bc6233e44960.jpg" 
                  alt="Уверенная водитель"
                  className="w-full h-32 object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 70 Hours Practice Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                70 часов практики и<br />5 женских секретов мастерства
              </h2>
              <p className="text-lg text-foreground leading-relaxed max-w-3xl mx-auto">
                Выбирая «ЛЕДИ ДРАЙВ», вы получаете максимум «асфальтового времени». Никакой воды — только навыки, которые реально спасают каждый день.
              </p>
            </div>
            
            <div className="bg-white rounded-3xl p-10 shadow-xl">
              <div className="space-y-5">
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold">✅</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary mb-2">70 часов практики</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Золотой стандарт идеальной езды. Вы будете за рулем столько, сколько нужно именно вам.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold">✅</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary mb-2">Курс «Парковочный»</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Как парковаться по-королевски? Легко! Научим ставить машину даже там, где, кажется, нет места.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold">✅</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary mb-2">Курс «Твой маршрут»</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Готовимся возить «львят» на тренировки и в школу. Освоим ваши личные маршруты без стресса и спешки.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold">✅</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary mb-2">Хиты школы: «Магистральный» и «Экзаменационный»</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Адаптированы специально для девушек. Спокойно, понятно, без криков.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start p-5 bg-accent/5 rounded-xl border-2 border-accent/20">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                      <span className="font-bold">🔥</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-accent mb-2">НОВИНКА: Курс «Кольца города»</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Перестаньте бояться перекрестков с круговым движением. Научим проезжать их правильно и красиво.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold">✅</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary mb-2">Габаритное вождение на вашей машине</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Самый страшный этап — пересадка на личное авто. Мы будем рядом и после учебы, чтобы помочь «подружиться» с габаритами вашего железного коня.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-10">
              <p className="text-lg text-muted-foreground mb-4">Всё ещё боитесь кольцевого?</p>
              <Button 
                size="lg" 
                className="text-lg px-10 py-6 bg-accent hover:bg-accent/90"
              >
                Получить права красиво
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Online Bonuses Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-4">
              Онлайн-бонусы для вашего комфорта
            </h2>
            <p className="text-center text-muted-foreground text-lg mb-12">
              Учитесь не только за рулем, но и дома — в удобное время
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center mb-6 mx-auto">
                  <Icon name="Video" size={40} className="text-blue-600" />
                </div>
                <h3 className="font-semibold text-xl text-primary mb-3 text-center">Видеоуроки по вождению</h3>
                <p className="text-muted-foreground text-center">Смотрите и повторяйте маневры в своем темпе</p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center mb-6 mx-auto">
                  <Icon name="GraduationCap" size={40} className="text-purple-600" />
                </div>
                <h3 className="font-semibold text-xl text-primary mb-3 text-center">Онлайн-курс «Вождение — это просто»</h3>
                <p className="text-muted-foreground text-center">Теория без страха и сложных терминов</p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center mb-6 mx-auto">
                  <Icon name="ClipboardCheck" size={40} className="text-indigo-600" />
                </div>
                <h3 className="font-semibold text-xl text-primary mb-3 text-center">Онлайн-курс «Экзаменационный»</h3>
                <p className="text-muted-foreground text-center">Готовьтесь к экзамену без стресса</p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center mb-6 mx-auto">
                  <Icon name="Brain" size={40} className="text-pink-600" />
                </div>
                <h3 className="font-semibold text-xl text-primary mb-3 text-center">Видеоуроки с психотерапевтом</h3>
                <p className="text-muted-foreground text-center">Проработайте страхи и обретите уверенность</p>
              </div>

              <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl p-8 shadow-lg border-2 border-accent/20 md:col-span-2">
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center mb-6">
                    <Icon name="Gift" size={40} className="text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-xl text-accent mb-3">Карта лояльности с подарками от партнёров</h3>
                  <p className="text-muted-foreground">Приятные бонусы и скидки для наших автоледи</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/90">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-white">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Станьте королевой дорог с ЛЕДИ ДРАЙВ
                </h2>
                <p className="text-xl mb-4 opacity-90">
                  70 часов практики • Чуткие инструкторы • Женский подход
                </p>
                <p className="text-lg mb-8 opacity-80">
                  Запишитесь сейчас и получите уверенность за рулем без стресса и криков
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className="text-lg px-10 py-6 bg-white text-primary hover:bg-white/90"
                  >
                    Записаться на ЛЕДИ ДРАЙВ
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="text-lg px-10 py-6 border-2 border-white text-white hover:bg-white/10"
                  >
                    Задать вопрос
                  </Button>
                </div>
                <p className="mt-6 text-sm opacity-70">
                  Первая консультация бесплатно • Гибкий график занятий • Рассрочка 0%
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://cdn.poehali.dev/projects/cdd4da42-d4b4-4f47-b7db-8d5d682d5928/bucket/5eceee30-a55a-4aef-866b-d92fe7b9ba6c.jpg" 
                  alt="Выпускница"
                  className="rounded-2xl shadow-xl w-full h-48 object-cover"
                />
                <img 
                  src="https://cdn.poehali.dev/projects/cdd4da42-d4b4-4f47-b7db-8d5d682d5928/bucket/bd9dfef9-5309-493b-89f4-bc6233e44960.jpg" 
                  alt="Успешная водитель"
                  className="rounded-2xl shadow-xl w-full h-48 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary/95 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <img 
              src="https://cdn.poehali.dev/projects/cdd4da42-d4b4-4f47-b7db-8d5d682d5928/bucket/2660c934-04f8-40fb-8a2e-62148dc8e5b1.png" 
              alt="ГОСавтошкола" 
              className="h-14 w-auto mx-auto mb-4 opacity-90"
            />
            <h3 className="text-2xl font-bold mb-4">ГОСавтошкола</h3>
            <p className="text-white/70 mb-6">Тариф ЛЕДИ ДРАЙВ — автошкола, которая понимает женщин</p>
            <div className="flex justify-center gap-6 text-white/60 text-sm">
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