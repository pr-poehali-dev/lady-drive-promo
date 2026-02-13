import { Button } from "@/components/ui/button";

const CtaFooter = () => {
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
    </>
  );
};

export default CtaFooter;
