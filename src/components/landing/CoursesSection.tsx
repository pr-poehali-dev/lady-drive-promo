import { useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface CoursesSectionProps {
  onOpenModal: () => void;
}

const courses = [
  {
    name: "Парковочный",
    hours: "4 часа",
    desc: "Научим ставить машину даже там, где, кажется, нет места. Параллельная, перпендикулярная, задним ходом — как королева парковки",
    icon: "CircleParking",
    badge: null,
  },
  {
    name: "Магистральный",
    hours: "4 часа",
    desc: "Перестроения, скорости, трассы. Больше никакого страха перед оживлённым потоком",
    icon: "Route",
    badge: null,
  },
  {
    name: "Кольца города",
    hours: "4 часа",
    desc: "Круговое движение в Симферополе (кольцо на Маршала Жукова, площадь Куйбышева и др.). Правильно, красиво, безопасно",
    icon: "RefreshCw",
    badge: null,
  },
  {
    name: "Экзаменационный",
    hours: "4 часа",
    desc: "Отработка маршрутов ГИБДД Симферополя. Никаких сюрпризов на экзамене",
    icon: "ClipboardCheck",
    badge: "НОВИНКА",
  },
  {
    name: "Пробный экзамен",
    hours: "2 часа",
    desc: "Репетиция с экзаменационной атмосферой",
    icon: "GraduationCap",
    badge: null,
  },
];

const reasons = [
  "Практика 72 ч. МКПП и 70 АКПП — больше, чем в стандартном обучении",
  "Топливо и страховка включены — никаких доплат",
  "Инструкторы-женщины — понимаем с полуслова",
  "Чуткие мужчины-профи — объясняют без криков",
  "Спецкурсы для реальной жизни — парковка, кольца, магистрали",
  "Занятия на KIA RIO — самые популярные авто в Крыму",
  "Рассрочка без переплат — учитесь сейчас, платите потом",
];

const CoursesSection = ({ onOpenModal }: CoursesSectionProps) => {
  const [payMode, setPayMode] = useState<"parts" | "full">("parts");

  return (
    <>
      {/* БЛОК 2: Тарифы */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-3">
              Всё включено. Без доплат.
            </h2>
            <p className="text-center text-muted-foreground text-lg mb-10">
              Один тариф — полная свобода выбора коробки передач
            </p>

            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="bg-primary px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <div className="text-white text-3xl md:text-4xl font-bold">69 900 ₽ + ГСМ</div>
                  <div className="text-white/80 mt-1">Практика 72 ч. МКПП и 70 АКПП</div>
                </div>
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 font-bold px-8"
                  onClick={onOpenModal}
                >
                  Записаться
                </Button>
              </div>

              <div className="p-8">
                <h4 className="font-semibold text-primary mb-4 text-lg">В стоимость входит:</h4>
                <div className="grid md:grid-cols-2 gap-3 mb-8">
                  {[
                    "Топливо на весь период обучения",
                    "Страховка на время занятий",
                    "Методические материалы",
                    "Доступ к онлайн-платформе",
                    "Личный кабинет ученицы",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <span className="text-green-500 text-lg">✅</span>
                      <span className="text-foreground/80">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-secondary/20 rounded-2xl p-6">
                  <h4 className="font-semibold text-primary mb-4">Оплата обучения:</h4>

                  <div className="inline-flex bg-muted rounded-full p-1 mb-5">
                    <button
                      type="button"
                      onClick={() => setPayMode("parts")}
                      className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors ${
                        payMode === "parts"
                          ? "bg-accent text-white shadow"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Частями
                    </button>
                    <button
                      type="button"
                      onClick={() => setPayMode("full")}
                      className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors ${
                        payMode === "full"
                          ? "bg-accent text-white shadow"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Сразу
                    </button>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div>
                      <div className="mb-2">
                        {payMode === "parts" ? (
                          <div className="text-3xl md:text-4xl font-bold text-primary">
                            22 000 ₽<span className="text-lg font-semibold text-muted-foreground">/мес.</span>
                          </div>
                        ) : (
                          <div className="text-3xl md:text-4xl font-bold text-primary">69 900 ₽</div>
                        )}
                      </div>
                      {payMode === "full" && (
                        <p className="text-sm text-muted-foreground">
                          +20 000 ₽ ГСМ (топливо)
                        </p>
                      )}
                    </div>

                    <p className="text-xs text-muted-foreground md:border-l md:border-primary/20 md:pl-4 md:max-w-xs leading-relaxed">
                      13.07.2026 добавляется временный повышенный топливный сбор. До стабилизации цен и свободного доступа топлива
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* БЛОК 3: Автопарк */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-3">
              Автопарк ЛЕДИ ДРАЙВ
            </h2>
            <p className="text-center text-muted-foreground text-lg mb-10">
              Современные и безопасные автомобили для комфортного обучения
            </p>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <img
                  src="https://cdn.poehali.dev/projects/cdd4da42-d4b4-4f47-b7db-8d5d682d5928/bucket/f183f550-fa61-4101-b1db-6ad789eabf3f.jpg"
                  alt="KIA RIO автопарк"
                  className="rounded-2xl shadow-lg w-full h-64 object-cover"
                />
              </div>
              <div>
                <div className="text-2xl font-bold text-primary mb-2">KIA RIO</div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Автоматическая и механическая коробка на выбор. Современные, безопасные, комфортные.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-2xl p-5 shadow-md flex flex-col items-center gap-2">
                    <Icon name="Settings" size={32} className="text-primary" />
                    <span className="text-sm font-medium text-center">МКПП</span>
                  </div>
                  <div className="bg-white rounded-2xl p-5 shadow-md flex flex-col items-center gap-2">
                    <Icon name="Gauge" size={32} className="text-primary" />
                    <span className="text-sm font-medium text-center">АКПП</span>
                  </div>
                  <div className="bg-white rounded-2xl p-5 shadow-md flex flex-col items-center gap-2">
                    <Icon name="Wind" size={32} className="text-accent" />
                    <span className="text-sm font-medium text-center">Кондиционер</span>
                  </div>
                  <div className="bg-white rounded-2xl p-5 shadow-md flex flex-col items-center gap-2">
                    <Icon name="Shield" size={32} className="text-accent" />
                    <span className="text-sm font-medium text-center">Подушки безопасности</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* БЛОК 4: Инструкторы */}
      <section className="py-16 md:py-20 bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-6">
              Здесь не кричат. Здесь учат.
            </h2>
            <p className="text-center text-white/80 text-lg mb-10 max-w-3xl mx-auto leading-relaxed">
              Для тарифа Леди Драйв мы отобрали самых чутких инструкторов. Это женщины, которые понимают все страхи, и мужчины высшей категории, которые умеют объяснять спокойно и бережно.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                  <Icon name="Heart" size={32} className="text-white" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">Инструкторы-женщины</h3>
                <p className="text-white/70 text-sm">Понимаем с полуслова. Без осуждения и давления</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                  <Icon name="Award" size={32} className="text-white" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">Мужчины высшей категории</h3>
                <p className="text-white/70 text-sm">Объясняют чётко, спокойно и без криков</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                  <Icon name="Star" size={32} className="text-white" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">Специальный отбор</h3>
                <p className="text-white/70 text-sm">Только те, кто прошёл строгий отбор для тарифа ЛЕДИ ДРАЙВ</p>
              </div>
            </div>

            <div className="mt-8 grid md:grid-cols-2 gap-4">
              <img
                src="https://cdn.poehali.dev/projects/cdd4da42-d4b4-4f47-b7db-8d5d682d5928/bucket/5eceee30-a55a-4aef-866b-d92fe7b9ba6c.jpg"
                alt="Инструктор"
                className="rounded-2xl w-full h-48 object-cover opacity-90"
              />
              <img
                src="https://cdn.poehali.dev/projects/cdd4da42-d4b4-4f47-b7db-8d5d682d5928/bucket/bd9dfef9-5309-493b-89f4-bc6233e44960.jpg"
                alt="Обучение вождению"
                className="rounded-2xl w-full h-48 object-cover opacity-90"
              />
            </div>
          </div>
        </div>
      </section>

      {/* БЛОК 5: Спецкурсы */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-3">
              5 женских секретов мастерства
            </h2>
            <p className="text-center text-muted-foreground text-lg mb-10">
              Спецкурсы для реальной жизни — не для галочки
            </p>

            <div className="grid gap-4">
              {courses.map((course) => (
                <div
                  key={course.name}
                  className={`bg-white rounded-2xl p-6 shadow-md flex flex-col md:flex-row md:items-center gap-4 border-2 ${
                    course.badge ? "border-accent/40" : "border-transparent"
                  }`}
                >
                  <div className="flex-shrink-0">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${course.badge ? "bg-accent/15" : "bg-primary/10"}`}>
                      <Icon name={course.icon} size={28} className={course.badge ? "text-accent" : "text-primary"} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-primary">{course.name}</h3>
                      {course.badge && (
                        <span className="bg-accent text-white text-xs font-bold px-2 py-1 rounded-lg">
                          {course.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">{course.desc}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="bg-primary/10 text-primary font-bold rounded-xl px-4 py-2 text-sm whitespace-nowrap">
                      {course.hours}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Button size="lg" className="text-lg px-10 py-6 font-bold transition-transform duration-200 hover:scale-105 active:scale-95" onClick={onOpenModal}>
                Хочу 5 секретов мастерства
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* БЛОК 6: Видеобонусы */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-3">
              То, о чём не рассказывают на обычных уроках
            </h2>
            <p className="text-center text-muted-foreground text-lg mb-10">
              Видеобонусы от экспертов в подарок каждой ученице
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-primary rounded-2xl p-8 shadow-lg md:row-span-2">
                <div className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center mb-5">
                  <Icon name="Brain" size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">4 видеоурока от психолога</h3>
                <p className="text-white/80 leading-relaxed">
                  Как справиться со стрессом во время обучения и экзамена. Убираем страх, панику и неуверенность. Разбираем реальные ситуации и учимся сохранять спокойствие за рулём.
                </p>
              </div>

              {[
                { icon: "Car", text: "Оформление Европротокола и действия при ДТП" },
                { icon: "PawPrint", text: "Перевозка животных в авто" },
                { icon: "Baby", text: "Детская безопасность в машине" },
                { icon: "Fuel", text: "Правила заправки автомобиля" },
              ].map((item) => (
                <div key={item.text} className="bg-white rounded-2xl p-6 shadow-md flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center flex-shrink-0">
                    <Icon name={item.icon} size={24} className="text-accent" />
                  </div>
                  <p className="text-foreground/80 font-medium">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* БЛОК 7: Почему выбирают LADY DRIVE */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-3">
              7 причин сказать «ДА» этому тарифу
            </h2>
            <p className="text-center text-muted-foreground text-lg mb-10">
              Почему автоледи Крыма выбирают ЛЕДИ ДРАЙВ
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {reasons.map((reason, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-md flex items-center gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
                    {i + 1}
                  </div>
                  <p className="text-foreground/80">{reason}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Button size="lg" className="text-lg px-10 py-6 font-bold transition-transform duration-200 hover:scale-105 active:scale-95" onClick={onOpenModal}>
                Хочу учиться как Леди
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CoursesSection;