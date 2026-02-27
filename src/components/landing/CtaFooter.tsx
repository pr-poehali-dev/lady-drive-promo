import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface CtaFooterProps {
  onOpenModal: () => void;
}

const docContent = {
  privacy: {
    title: "Политика конфиденциальности",
    text: `ООО «СВЕТОФОР» (далее — Оператор) обязуется обеспечивать защиту персональных данных пользователей в соответствии с Федеральным законом № 152-ФЗ «О персональных данных».

Оператор собирает следующие персональные данные: имя, номер телефона, адрес электронной почты. Данные используются исключительно для связи с пользователем и предоставления услуг автошколы.

Оператор не передаёт персональные данные третьим лицам без согласия пользователя, за исключением случаев, предусмотренных законодательством РФ.

Пользователь вправе в любой момент отозвать согласие на обработку персональных данных, направив соответствующий запрос на email: svetoforschool@bk.ru.

ООО «СВЕТОФОР», 295026, Республика Крым, г. Симферополь, ул. Гагарина, д. 20А, этаж 4, помещение 415.`,
  },
  personalData: {
    title: "Согласие на обработку персональных данных",
    text: `Я, субъект персональных данных, даю своё согласие ООО «СВЕТОФОР» (295026, Республика Крым, г. Симферополь, ул. Гагарина, д. 20А, этаж 4, помещение 415) на обработку моих персональных данных, включая: фамилию, имя, отчество, номер телефона, адрес электронной почты.

Цель обработки: запись на курсы автошколы, информирование об услугах и акциях.

Обработка персональных данных включает: сбор, запись, систематизацию, накопление, хранение, уточнение, использование, передачу, обезличивание, блокирование, удаление, уничтожение.

Согласие действует до его отзыва. Отзыв согласия производится путём направления письменного заявления на email: svetoforschool@bk.ru.`,
  },
  sms: {
    title: "Согласие на отправку СМС",
    text: `Я даю согласие ООО «СВЕТОФОР» на отправку информационных и рекламных сообщений на указанный мной номер телефона посредством SMS-сообщений и мессенджеров (WhatsApp, Telegram, Viber).

Сообщения могут содержать: информацию о расписании занятий, акциях и специальных предложениях, напоминания о записи, новости автошколы ГОСАШ.

Отказаться от получения сообщений можно, направив заявку на email: svetoforschool@bk.ru или ответив «СТОП» на полученное сообщение.

ООО «СВЕТОФОР», 295026, Республика Крым, г. Симферополь, ул. Гагарина, д. 20А, этаж 4, помещение 415.`,
  },
};

const CtaFooter = ({ onOpenModal }: CtaFooterProps) => {
  const [openDoc, setOpenDoc] = useState<keyof typeof docContent | null>(null);

  return (
    <>
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
                <Button 
                  size="lg" 
                  className="text-lg px-10 py-6 bg-white text-primary hover:bg-white/90"
                  onClick={onOpenModal}
                >
                  Записаться на ЛЕДИ ДРАЙВ
                </Button>
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
              src="https://cdn.poehali.dev/files/1b83d3e9-9b35-405b-b745-98a10d424894.png" 
              alt="ГОСАШ Автошкола" 
              className="h-14 w-auto mx-auto mb-4 opacity-90 brightness-0 invert"
            />
            <h3 className="text-2xl font-bold mb-2">ООО «СВЕТОФОР»</h3>
            <p className="text-white/70 mb-1 text-sm">
              295026, Республика Крым, г. Симферополь, ул. Гагарина, д. 20А, этаж 4, помещение 415
            </p>
            <p className="text-white/70 mb-1 text-sm">
              Email: <a href="mailto:svetoforschool@bk.ru" className="underline hover:text-white">svetoforschool@bk.ru</a>
            </p>
            <p className="text-white/70 mb-6 text-sm">
              Сайт: <a href="https://автошкола82.рф" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">автошкола82.рф</a>
            </p>

            {/* Document buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              <button
                onClick={() => setOpenDoc("privacy")}
                className="text-xs text-white/60 hover:text-white underline transition-colors"
              >
                Политика конфиденциальности
              </button>
              <span className="text-white/30">|</span>
              <button
                onClick={() => setOpenDoc("personalData")}
                className="text-xs text-white/60 hover:text-white underline transition-colors"
              >
                Согласие на обработку персональных данных
              </button>
              <span className="text-white/30">|</span>
              <button
                onClick={() => setOpenDoc("sms")}
                className="text-xs text-white/60 hover:text-white underline transition-colors"
              >
                Согласие на отправку СМС
              </button>
            </div>

            <div className="text-white/40 text-xs">
              © 2026 ООО «СВЕТОФОР» · Тариф ЛЕДИ ДРАЙВ — автошкола, которая понимает женщин
            </div>
          </div>
        </div>
      </footer>

      {/* Document Dialog */}
      <Dialog open={!!openDoc} onOpenChange={() => setOpenDoc(null)}>
        <DialogContent className="max-w-lg max-h-[70vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{openDoc && docContent[openDoc].title}</DialogTitle>
          </DialogHeader>
          <div className="text-sm text-foreground/80 whitespace-pre-line leading-relaxed">
            {openDoc && docContent[openDoc].text}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CtaFooter;
