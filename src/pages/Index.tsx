import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/30">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/20 to-accent/5"></div>
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="inline-block mb-6 px-6 py-2 bg-secondary/80 rounded-full">
              <span className="text-primary font-semibold text-sm tracking-wide uppercase">ГОСавтошкола</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary mb-6 leading-tight">
              ЛЕДИ ДРАЙВ
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-4 font-light">
              Автошкола, где понимают женщин
            </p>
            <p className="text-lg md:text-xl text-muted-foreground/80 mb-10 max-w-2xl mx-auto">
              Мягкий подход, чуткие инструкторы и 70 часов практики для уверенного вождения
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all"
              >
                Записаться на ЛЕДИ ДРАЙВ
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 border-2 border-primary text-primary hover:bg-primary/5"
              >
                Узнать подробнее
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Understanding Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-center text-primary mb-4">
              Мы понимаем ваши страхи
            </h2>
            <p className="text-center text-muted-foreground text-lg mb-16">
              И знаем, как с ними работать бережно и профессионально
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-8 hover:shadow-xl transition-shadow border-2 border-secondary/50">
                <div className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center mb-6 mx-auto">
                  <Icon name="Heart" size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-4 text-center">
                  Боитесь строгих инструкторов?
                </h3>
                <p className="text-muted-foreground text-center leading-relaxed">
                  С нами вы учитесь у инструкторов-женщин и самых чутких преподавателей-мужчин. Без криков, давления и стресса.
                </p>
              </Card>

              <Card className="p-8 hover:shadow-xl transition-shadow border-2 border-secondary/50">
                <div className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center mb-6 mx-auto">
                  <Icon name="Shield" size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-4 text-center">
                  Не уверены в себе?
                </h3>
                <p className="text-muted-foreground text-center leading-relaxed">
                  70 часов практики — столько, сколько нужно именно вам. Учимся в вашем темпе, пока не почувствуете уверенность.
                </p>
              </Card>

              <Card className="p-8 hover:shadow-xl transition-shadow border-2 border-secondary/50">
                <div className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center mb-6 mx-auto">
                  <Icon name="CircleParking" size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-4 text-center">
                  До сих пор паркуетесь с 15-й попытки?
                </h3>
                <p className="text-muted-foreground text-center leading-relaxed">
                  Специальный «Парковочный» курс научит ставить машину красиво и уверенно даже в самых узких местах.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* 70 Hours Practice Section */}
      <section className="py-20 bg-gradient-to-br from-secondary/30 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-center text-primary mb-6">
              70 часов практики и<br />5 женских секретов мастерства
            </h2>
            
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl mb-8">
              <p className="text-lg md:text-xl text-foreground leading-relaxed mb-8">
                Выбирая «ЛЕДИ ДРАЙВ», вы получаете максимум «асфальтового времени». Никакой воды — только навыки, которые реально спасают каждый день.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
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

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
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

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
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

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
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

                <div className="flex gap-4 p-4 bg-accent/5 rounded-xl border-2 border-accent/20">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
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

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
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

            <div className="text-center">
              <p className="text-lg text-muted-foreground mb-2">Всё ещё боитесь кольцевого?</p>
              <Button 
                size="lg" 
                className="text-lg px-10 py-6 bg-accent hover:bg-accent/90 shadow-lg hover:shadow-xl transition-all"
              >
                Получить права красиво
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Online Bonuses Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-center text-primary mb-6">
              Онлайн-бонусы для вашего комфорта
            </h2>
            <p className="text-center text-muted-foreground text-lg mb-12">
              Учитесь не только за рулем, но и дома — в удобное время
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 border-2 border-secondary/50 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-secondary/50 flex items-center justify-center flex-shrink-0">
                    <Icon name="Video" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-primary mb-2">Видеоуроки по вождению</h3>
                    <p className="text-muted-foreground">Смотрите и повторяйте маневры в своем темпе</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-2 border-secondary/50 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-secondary/50 flex items-center justify-center flex-shrink-0">
                    <Icon name="GraduationCap" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-primary mb-2">Онлайн-курс «Вождение — это просто»</h3>
                    <p className="text-muted-foreground">Теория без страха и сложных терминов</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-2 border-secondary/50 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-secondary/50 flex items-center justify-center flex-shrink-0">
                    <Icon name="ClipboardCheck" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-primary mb-2">Онлайн-курс «Экзаменационный»</h3>
                    <p className="text-muted-foreground">Готовьтесь к экзамену без стресса</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-2 border-secondary/50 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-secondary/50 flex items-center justify-center flex-shrink-0">
                    <Icon name="Brain" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-primary mb-2">Видеоуроки с психотерапевтом</h3>
                    <p className="text-muted-foreground">Проработайте страхи и обретите уверенность</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-2 border-accent/30 bg-accent/5 hover:shadow-lg transition-shadow md:col-span-2">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <Icon name="Gift" size={24} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-accent mb-2">Карта лояльности с подарками от партнёров</h3>
                    <p className="text-muted-foreground">Приятные бонусы и скидки для наших автоледи</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/80 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Станьте королевой дорог с ЛЕДИ ДРАЙВ
            </h2>
            <p className="text-xl md:text-2xl mb-4 opacity-90">
              70 часов практики • Чуткие инструкторы • Женский подход
            </p>
            <p className="text-lg mb-10 opacity-80 max-w-2xl mx-auto">
              Запишитесь сейчас и получите уверенность за рулем без стресса и криков
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="text-lg px-10 py-6 bg-white text-primary hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all"
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
            <p className="mt-8 text-sm opacity-70">
              Первая консультация бесплатно • Гибкий график занятий • Рассрочка 0%
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary/95 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
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
