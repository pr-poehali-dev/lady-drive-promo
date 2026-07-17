import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { docContent } from "./CtaFooter";

interface PrivacyConsentProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

const PrivacyConsent = ({ checked, onChange, className = "" }: PrivacyConsentProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <label className={`flex items-start gap-2 cursor-pointer select-none ${className}`}>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          required
          className="mt-0.5 h-4 w-4 shrink-0 accent-primary cursor-pointer"
        />
        <span className="text-xs text-muted-foreground/90 leading-snug">
          Согласен с обработкой моих персональных данных в соответствии с{" "}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setOpen(true);
            }}
            className="text-primary underline hover:opacity-80"
          >
            политикой конфиденциальности
          </button>
        </span>
      </label>

      <Dialog open={open} onOpenChange={setOpen}>
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

export default PrivacyConsent;
