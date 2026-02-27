import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";

interface ApplicationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ApplicationModal = ({ open, onOpenChange }: ApplicationModalProps) => {
  const [modalName, setModalName] = useState("");
  const [modalPhone, setModalPhone] = useState("");
  const [modalSent, setModalSent] = useState(false);

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = new URL("https://gosavtoschool.bitrix24.ru/rest/45768/9nij678yep7wc72c/crm.lead.add.json");
    url.searchParams.set("FIELDS[STATUS_ID]", "NEW");
    url.searchParams.set("FIELDS[NAME]", modalName);
    url.searchParams.set("FIELDS[PHONE][0][VALUE]", modalPhone);
    url.searchParams.set("FIELDS[PHONE][0][VALUE_TYPE]", "WORK");
    try {
      await fetch(url.toString());
    } catch (err) { console.error(err); }
    setModalSent(true);
    toast.success("Заявка принята!", {
      description: "Менеджер свяжется с вами в ближайшее время",
      duration: 5000,
    });
    setTimeout(() => {
      onOpenChange(false);
      setModalSent(false);
      setModalName("");
      setModalPhone("");
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary text-center">
            Запишитесь на ЛЕДИ ДРАЙВ
          </DialogTitle>
          <DialogDescription className="text-center">
            Оставьте заявку и мы свяжемся с вами в течение 15 минут
          </DialogDescription>
        </DialogHeader>
        {modalSent ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <Icon name="Check" size={32} className="text-green-600" />
            </div>
            <p className="text-xl font-semibold text-foreground">Заявка отправлена!</p>
            <p className="text-muted-foreground mt-2">Мы скоро вам перезвоним</p>
          </div>
        ) : (
          <form onSubmit={handleModalSubmit} className="space-y-4 pt-2">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Ваше имя</label>
              <Input
                type="text"
                placeholder="Введите имя"
                value={modalName}
                onChange={(e) => setModalName(e.target.value)}
                required
                className="w-full h-12"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Номер телефона</label>
              <Input
                type="tel"
                placeholder="+7 (___) ___-__-__"
                value={modalPhone}
                onChange={(e) => setModalPhone(e.target.value)}
                required
                className="w-full h-12"
              />
            </div>
            <Button type="submit" size="lg" className="w-full text-base py-5 bg-primary hover:bg-primary/90">
              Отправить заявку
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationModal;