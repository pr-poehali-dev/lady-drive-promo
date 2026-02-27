import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface CoursesSectionProps {
  onOpenModal: () => void;
}

const partners = [
  { name: "Л'Этуаль", logo: "💄" },
  { name: "Золото 585", logo: "💍" },
  { name: "Суши Wok", logo: "🍱" },
  { name: "Читай-город", logo: "📚" },
  { name: "Sunlight", logo: "✨" },
  { name: "DNS", logo: "💻" },
  { name: "Спортмастер", logo: "🏋️" },
  { name: "Gloria Jeans", logo: "👗" },
];

const CoursesSection = ({ onOpenModal }: CoursesSectionProps) => {
  return (
    <>
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
                <div className="w-16 h-16 rounded-full bg-accent/15 flex items-center justify-center mb-6 mx-auto">
                  <Icon name="Heart" size={32} className="text-accent" />
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
                <div className="w-16 h-16 rounded-full bg-accent/15 flex items-center justify-center mb-6 mx-auto">
                  <Icon name="Shield" size={32} className="text-accent" />
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
                <div className="w-16 h-16 rounded-full bg-accent/15 flex items-center justify-center mb-6 mx-auto">
                  <Icon name="CircleParking" size={32} className="text-accent" />
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
      <section className="py-16 md:py-20 bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                70 часов практики и<br />5 женских секретов мастерства
              </h2>
              <p className="text-lg text-white/80 leading-relaxed max-w-3xl mx-auto">
                Выбирая «ЛЕДИ ДРАЙВ», вы получаете максимум «асфальтового времени». Никакой воды — только навыки, которые реально спасают каждый день.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group cursor-pointer">
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <span className="font-bold">✅</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-secondary transition-colors">70 часов практики</h3>
                    <p className="text-white/70 leading-relaxed">
                      Золотой стандарт идеальной езды. Вы будете за рулем столько, сколько нужно именно вам.
                    </p>
                  </div>
                </div>
              </button>

              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group cursor-pointer">
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <span className="font-bold">✅</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-secondary transition-colors">Курс «Парковочный»</h3>
                    <p className="text-white/70 leading-relaxed">
                      Как парковаться по-королевски? Легко! Научим ставить машину даже там, где, кажется, нет места.
                    </p>
                  </div>
                </div>
              </button>

              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group cursor-pointer">
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <span className="font-bold">✅</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-secondary transition-colors">Курс «Твой маршрут»</h3>
                    <p className="text-white/70 leading-relaxed">
                      Готовимся возить «львят» на тренировки и в школу. Освоим ваши личные маршруты без стресса и спешки.
                    </p>
                  </div>
                </div>
              </button>

              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group cursor-pointer">
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <span className="font-bold">✅</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-secondary transition-colors">Хиты школы: «Магистральный» и «Экзаменационный»</h3>
                    <p className="text-white/70 leading-relaxed">
                      Адаптированы специально для девушек. Спокойно, понятно, без криков.
                    </p>
                  </div>
                </div>
              </button>

              <button className="bg-secondary/80 hover:bg-secondary backdrop-blur-sm border border-secondary/60 rounded-2xl p-6 text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group cursor-pointer md:col-span-2">
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center">
                      <span className="font-bold">🔥</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary mb-2">НОВИНКА: Курс «Кольца города»</h3>
                    <p className="text-primary/70 leading-relaxed">
                      Перестаньте бояться перекрестков с круговым движением. Научим проезжать их правильно и красиво.
                    </p>
                  </div>
                </div>
              </button>

              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group cursor-pointer md:col-span-2">
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <span className="font-bold">✅</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-secondary transition-colors">Габаритное вождение на вашей машине</h3>
                    <p className="text-white/70 leading-relaxed">
                      Самый страшный этап — пересадка на личное авто. Мы будем рядом и после учебы, чтобы помочь «подружиться» с габаритами вашего железного коня.
                    </p>
                  </div>
                </div>
              </button>
            </div>

            <div className="text-center mt-10">
              <p className="text-lg text-white/70 mb-4">Всё ещё боитесь кольцевого?</p>
              <Button 
                size="lg" 
                className="text-lg px-10 py-6 bg-white text-primary hover:bg-white/90 font-bold"
                onClick={onOpenModal}
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
                <div className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 mx-auto">
                  <Icon name="Video" size={40} className="text-accent" />
                </div>
                <h3 className="font-semibold text-xl text-primary mb-3 text-center">Видеоуроки по вождению</h3>
                <p className="text-muted-foreground text-center">Смотрите и повторяйте маневры в своем темпе</p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="w-20 h-20 rounded-2xl bg-secondary/40 flex items-center justify-center mb-6 mx-auto">
                  <Icon name="GraduationCap" size={40} className="text-primary" />
                </div>
                <h3 className="font-semibold text-xl text-primary mb-3 text-center">Онлайн-курс «Вождение — это просто»</h3>
                <p className="text-muted-foreground text-center">Теория без страха и сложных терминов</p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="w-20 h-20 rounded-2xl bg-secondary/40 flex items-center justify-center mb-6 mx-auto">
                  <Icon name="ClipboardCheck" size={40} className="text-primary" />
                </div>
                <h3 className="font-semibold text-xl text-primary mb-3 text-center">Онлайн-курс «Экзаменационный»</h3>
                <p className="text-muted-foreground text-center">Готовьтесь к экзамену без стресса</p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 mx-auto">
                  <Icon name="Brain" size={40} className="text-accent" />
                </div>
                <h3 className="font-semibold text-xl text-primary mb-3 text-center">Видеоуроки с психотерапевтом</h3>
                <p className="text-muted-foreground text-center">Проработайте страхи и обретите уверенность</p>
              </div>

              <div className="bg-gradient-to-br from-accent/10 to-secondary/20 rounded-2xl p-8 shadow-lg border-2 border-accent/20 md:col-span-2">
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-2xl bg-accent/15 flex items-center justify-center mb-6">
                    <Icon name="Gift" size={40} className="text-accent" />
                  </div>
                  <h3 className="font-semibold text-xl text-accent mb-3">Карта лояльности с подарками от партнёров</h3>
                  <p className="text-muted-foreground">Приятные бонусы и скидки для наших автоледи</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-14 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-3">
              Партнёры проекта
            </h2>
            <p className="text-center text-muted-foreground mb-10">
              Специальные подарки для всех учениц курса ЛЕДИ ДРАЙВ
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
              {partners.map((partner) => (
                <div 
                  key={partner.name}
                  className="bg-white rounded-2xl px-6 py-4 shadow-md flex flex-col items-center gap-2 min-w-[110px] hover:shadow-lg transition-shadow"
                >
                  <span className="text-3xl">{partner.logo}</span>
                  <span className="text-sm font-medium text-foreground/80 text-center">{partner.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CoursesSection;
