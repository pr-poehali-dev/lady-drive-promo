import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Icon from "@/components/ui/icon";
import PrivacyConsent from "./PrivacyConsent";
import { submitLead, hasSubmittedLead, setCookie, getCookie } from "@/lib/leads";

const SHOWN_COOKIE = "ld_exit_popup_shown";
const SESSION_KEY = "ld_exit_popup_session";

const ExitIntentPopup = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [sent, setSent] = useState(false);
  const firedRef = useRef(false);

  useEffect(() => {
    if (hasSubmittedLead()) return;
    if (getCookie(SHOWN_COOKIE) === "1") return;
    if (sessionStorage.getItem(SESSION_KEY) === "1") return;

    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    const trigger = () => {
      if (firedRef.current) return;
      firedRef.current = true;
      setCookie(SHOWN_COOKIE, "1", 30);
      sessionStorage.setItem(SESSION_KEY, "1");
      setOpen(true);
      cleanup();
    };

    const onScroll = () => {
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      if (total > 0 && scrolled / total >= 0.8) trigger();
    };

    let exitAllowed = false;
    const enableExit = setTimeout(() => {
      exitAllowed = true;
    }, 3000);

    const onMouseOut = (e: MouseEvent) => {
      if (!exitAllowed) return;
      if (e.clientY <= 0 && !e.relatedTarget) trigger();
    };

    function cleanup() {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseout", onMouseOut);
      clearTimeout(enableExit);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    if (!isMobile) {
      document.addEventListener("mouseout", onMouseOut);
    }

    return cleanup;
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      toast.error("Подтвердите согласие с политикой конфиденциальности");
      return;
    }
    await submitLead({ name, phone, source: "exit_popup" });
    setSent(true);
    setTimeout(() => setOpen(false), 2500);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/50 animate-fade-in"
      onClick={() => setOpen(false)}
    >
      <div
        className="relative w-[90%] max-w-[480px] bg-[#FBF9F6] rounded-3xl shadow-2xl p-6 md:p-8 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setOpen(false)}
          aria-label="Закрыть"
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Icon name="X" size={22} />
        </button>

        {sent ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-4">
              <Icon name="Check" size={32} className="text-teal-600" />
            </div>
            <p className="text-xl font-bold text-foreground">Спасибо!</p>
            <p className="text-muted-foreground mt-2">Мы перезвоним вам в ближайшее время</p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl md:text-[28px] font-extrabold text-primary leading-tight pr-6 mb-3">
              Уже уезжаете? Подождите 30 секунд! 🚗
            </h2>
            <p className="text-[16px] md:text-[17px] text-foreground/80 leading-relaxed mb-3">
              Мы знаем, что вас может смущать. Многие девушки боятся, что в автошколе будет
              строгий инструктор или некомфортная атмосфера. Но у нас всё иначе.
            </p>
            <ul className="space-y-2 mb-5">
              {[
                "Инструкторы с пониманием психологии женщин",
                "Гибкий график — подстраиваемся под вас",
                "Первое занятие бесплатно и без обязательств",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-[15px] text-foreground/90">
                  <Icon name="Heart" size={18} className="text-teal-500 mt-0.5 shrink-0" fallback="Check" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-[15px] text-foreground/70 mb-5">
              Просто попробуйте — и вы увидите, что вождение может быть в удовольствие.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <Input
                type="text"
                placeholder="Ваше имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="h-12 bg-white text-base"
              />
              <Input
                type="tel"
                placeholder="+7 (___) ___-__-__"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="h-12 bg-white text-base"
              />
              <PrivacyConsent checked={consent} onChange={setConsent} />
              <Button
                type="submit"
                size="lg"
                className="w-full text-base md:text-lg py-6 bg-teal-600 hover:bg-teal-700 text-white font-bold shadow-lg"
              >
                Записаться на пробное занятие 💚
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Перезвоним через 5 минут и ответим на все вопросы. Никакого спама.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ExitIntentPopup;
