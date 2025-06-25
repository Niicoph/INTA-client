import SipanLogo from '/Sipan.png';
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu size={10} className="text-[#4A4A4A]" />
          </Button>
        </SheetTrigger>

        <SheetContent side="right" className="w-64 p-4">
          <VisuallyHidden>
            <DialogTitle>Menú de navegación</DialogTitle>
            <DialogDescription>Opciones de navegación en el menú móvil</DialogDescription>
          </VisuallyHidden>
          <img src={SipanLogo} alt="Sipan Logo" className="h-auto w-full pr-4" />
          <nav className="flex flex-col gap-4 mt-4 text-base font-medium">
            <Link to="/" onClick={handleClose} className="gilroy-semibold text-[#4A4A4A]" data-discover="true">
              Home
            </Link>
            <Link to="/quienes-somos" onClick={handleClose} className="gilroy-semibold text-[#4A4A4A]">
              Quiénes Somos
            </Link>
            <Link to="/unidades" onClick={handleClose} className="gilroy-semibold text-[#4A4A4A]">
              Unidades
            </Link>
            <Link to="/modulos" onClick={handleClose} className="gilroy-semibold text-[#4A4A4A]">
              Módulos
            </Link>
          </nav>
        </SheetContent>
      </Sheet>      
    </div>
  );
}