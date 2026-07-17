import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";
import { docContent } from "./CtaFooter";

const STORAGE_KEY = "ld_cookie_consent";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const [policyOpen, setPolicyOpen] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <>
      <div className="fixed bottom-0 inset-x-0 z-[60] p-3 md:p-5 animate-fade-in">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl border border-primary/10 p-5 md:p-6">
          <div className="flex items-start gap-3 mb-3">
            <div className="text-2xl leading-none">🍪</div>
            <h3 className="text-lg md:text-xl font-bold text-primary">
              Пристегните ремни!
            </h3>
          </div>
          <p className="text-sm text-foreground/80 leading-relaxed mb-5">
            Мы, как и вы, любим безопасное вождение. Поэтому используем файлы cookie,
            чтобы сайт работал быстро и надежно, а мы могли сделать ваше обучение еще
            комфортнее. Оставляя их, вы помогаете нам становиться лучше. Никаких лишних
            данных — только то, что нужно для отличной поездки!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
            <Button
              variant="outline"
              onClick={() => setPolicyOpen(true)}
              className="border-primary/30 text-primary hover:bg-primary/5"
            >
              Подробнее о настройках
            </Button>
            <Button onClick={accept} className="bg-primary hover:bg-primary/90">
              <Icon name="Car" size={18} className="mr-1.5" />
              Поехали!
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={policyOpen} onOpenChange={setPolicyOpen}>
        <DialogContent className="max-w-lg max-h-[70vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{docContent.privacy.title}</DialogTitle>
          </DialogHeader>
          <div className="text-sm text-muted-foreground whitespace-pre-line">
            {docContent.privacy.text}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CookieConsent;
