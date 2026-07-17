import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";
import PrivacyConsent from "./PrivacyConsent";
import funcUrls from "../../../backend/func2url.json";

interface ApplicationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ApplicationModal = ({ open, onOpenChange }: ApplicationModalProps) => {
  const [modalName, setModalName] = useState("");
  const [modalPhone, setModalPhone] = useState("");
  const [modalConsent, setModalConsent] = useState(false);
  const [modalSent, setModalSent] = useState(false);

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalConsent) {
      toast.error("Подтвердите согласие с политикой конфиденциальности");
      return;
    }
    const pageParams = new URLSearchParams(window.location.search);
    const url = new URL("https://gosavtoschool.bitrix24.ru/rest/45768/9nij678yep7wc72c/crm.lead.add.json");
    url.searchParams.set("FIELDS[STATUS_ID]", "NEW");
    url.searchParams.set("FIELDS[NAME]", modalName);
    url.searchParams.set("FIELDS[PHONE][0][VALUE]", modalPhone);
    url.searchParams.set("FIELDS[PHONE][0][VALUE_TYPE]", "WORK");
    url.searchParams.set("FIELDS[UF_CRM_1612510024]", "702");
    url.searchParams.set("FIELDS[SOURCE_ID]", "11");
    url.searchParams.set("FIELDS[UF_CRM_1611737507]", "646");
    url.searchParams.set("FIELDS[TITLE]", `${modalName} ${modalPhone}`);
    const utmFields: Record<string, string> = {
      "FIELDS[UTM_SOURCE]": "utm_source",
      "FIELDS[UTM_MEDIUM]": "utm_medium",
      "FIELDS[UTM_CAMPAIGN]": "utm_campaign",
      "FIELDS[UTM_CONTENT]": "utm_content",
      "FIELDS[UTM_TERM]": "utm_term",
    };
    for (const [field, param] of Object.entries(utmFields)) {
      const value = pageParams.get(param);
      if (value) url.searchParams.set(field, value);
    }
    try {
      await fetch(url.toString());
    } catch (err) { console.error(err); }
    try {
      await fetch(`${funcUrls["admin-auth"]}?resource=public&action=lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: modalName,
          phone: modalPhone,
          source: "landing",
          utm_source: pageParams.get("utm_source"),
          utm_medium: pageParams.get("utm_medium"),
          utm_campaign: pageParams.get("utm_campaign"),
          utm_content: pageParams.get("utm_content"),
          utm_term: pageParams.get("utm_term"),
        }),
      });
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
      setModalConsent(false);
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
            <PrivacyConsent checked={modalConsent} onChange={setModalConsent} />
            <Button type="submit" size="lg" className="w-full text-base py-5 bg-primary hover:bg-primary/90">
              Отправить заявку
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationModal;