import { useState } from "react";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/landing/HeroSection";
import CoursesSection from "@/components/landing/CoursesSection";
import CtaFooter from "@/components/landing/CtaFooter";
import ApplicationModal from "@/components/landing/ApplicationModal";

const Index = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/20 via-white to-secondary/30">
      
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-primary/10 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-2">
              <img 
                src="https://cdn.poehali.dev/files/1b83d3e9-9b35-405b-b745-98a10d424894.png" 
                alt="ГОСАШ Автошкола" 
                className="h-12 w-auto"
              />
              <Button
                size="sm"
                className="md:hidden bg-primary hover:bg-primary/90 text-white text-xs px-3"
                onClick={() => setModalOpen(true)}
              >
                Записаться
              </Button>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <a 
                href="https://автошкола82.рф/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                Главная
              </a>
              <a 
                href="https://автошкола82.рф/o-kompanii/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                О ГОСАШ
              </a>
              <a 
                href="https://автошкола82.рф/aktsii/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                Спецпредложения
              </a>
              <a 
                href="https://автошкола82.рф/raspisanie/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                Расписание
              </a>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <a
                href="tel:+79789921101"
                className="text-primary font-semibold text-sm hover:text-primary/80 transition-colors"
              >
                8 (978) 992 11 01
              </a>
              <Button size="sm" onClick={() => setModalOpen(true)}>
                Связаться
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <HeroSection />
      <CoursesSection onOpenModal={() => setModalOpen(true)} />
      <CtaFooter onOpenModal={() => setModalOpen(true)} />
      <ApplicationModal open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  );
};

export default Index;