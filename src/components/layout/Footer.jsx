
import React from "react";
import { School } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-auto bg-primary text-primary-foreground py-6">
      <div className="container">
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <div className="flex items-center gap-2">
            <School className="h-5 w-5" />
            <p className="text-sm font-medium">Exam System</p>
          </div>
          <p className="text-sm text-primary-foreground/80">
            © {new Date().getFullYear()} Exam System. Todos os direitos reservados.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-sm text-primary-foreground/80 hover:text-primary-foreground">
              Termos
            </a>
            <a href="#" className="text-sm text-primary-foreground/80 hover:text-primary-foreground">
              Privacidade
            </a>
            <a href="#" className="text-sm text-primary-foreground/80 hover:text-primary-foreground">
              Contato
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
