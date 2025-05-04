
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { School } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-primary/5 to-primary/10">
      <div className="text-center space-y-6 px-4 max-w-3xl">
        <div className="flex items-center justify-center">
          <School className="h-16 w-16 text-primary" />
        </div>
        <h1 className="text-5xl font-bold tracking-tight">Exam System</h1>
        <p className="text-xl text-muted-foreground">
          Plataforma completa para professores criarem, aplicarem e corrigirem provas com facilidade
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button size="lg" onClick={() => navigate("/login")}>
            Entrar
          </Button>
          <Button size="lg" variant="outline" onClick={() => navigate("/register")}>
            Criar Conta
          </Button>
        </div>
        
        <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Crie provas personalizadas</h3>
            <p className="text-muted-foreground">
              Interface intuitiva para criar diferentes tipos de questões, de múltipla escolha a dissertativas.
            </p>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Correção simplificada</h3>
            <p className="text-muted-foreground">
              Ferramentas que automatizam parte do processo de correção e facilitam a atribuição de notas.
            </p>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Análise de desempenho</h3>
            <p className="text-muted-foreground">
              Acompanhe o progresso dos alunos com estatísticas e gráficos detalhados de seus resultados.
            </p>
          </div>
        </div>
      </div>
      
      <footer className="w-full py-6 mt-auto">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Exam System. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
};

export default Index;
