
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet, CheckSquare, BookOpen } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

const Home = () => {
  const { user } = useAuth();
  const isProfessor = user?.role === "professor";

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Bem-vindo, {user?.name}!</h1>
        <p className="text-muted-foreground">
          {isProfessor 
            ? "Gerencie suas provas e avalie seus alunos com nossas ferramentas de exame." 
            : "Acesse suas provas e acompanhe seu progresso acadêmico."}
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {isProfessor ? (
          <>
            <Card className="overflow-hidden">
              <CardHeader className="bg-primary/5">
                <BookOpen className="h-8 w-8 text-primary" />
                <CardTitle>Área do Professor</CardTitle>
                <CardDescription>
                  Acesse estatísticas e gerencie seus exames
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">
                  Visualize seus alunos, turmas, e acompanhe o desempenho em um só lugar.
                </p>
              </CardContent>
              <CardFooter className="border-t bg-muted/50 px-6 py-4">
                <Button asChild className="w-full">
                  <Link to="/dashboard">Acessar Dashboard</Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="overflow-hidden">
              <CardHeader className="bg-primary/5">
                <FileSpreadsheet className="h-8 w-8 text-primary" />
                <CardTitle>Gerador de Provas</CardTitle>
                <CardDescription>
                  Crie provas personalizadas com facilidade
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">
                  Monte provas com diferentes tipos de questões e formatos de maneira simples e rápida.
                </p>
              </CardContent>
              <CardFooter className="border-t bg-muted/50 px-6 py-4">
                <Button asChild className="w-full">
                  <Link to="/generate-exam">Gerar Prova</Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="overflow-hidden">
              <CardHeader className="bg-primary/5">
                <CheckSquare className="h-8 w-8 text-primary" />
                <CardTitle>Corretor de Provas</CardTitle>
                <CardDescription>
                  Correção rápida e feedback detalhado
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">
                  Corrija provas de maneira eficiente e forneça feedback detalhado para seus alunos.
                </p>
              </CardContent>
              <CardFooter className="border-t bg-muted/50 px-6 py-4">
                <Button asChild className="w-full">
                  <Link to="/correct-exam">Corrigir Provas</Link>
                </Button>
              </CardFooter>
            </Card>
          </>
        ) : (
          <>
            <Card className="overflow-hidden">
              <CardHeader className="bg-primary/5">
                <FileSpreadsheet className="h-8 w-8 text-primary" />
                <CardTitle>Minhas Provas</CardTitle>
                <CardDescription>
                  Acesse suas avaliações pendentes
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">
                  Visualize suas provas agendadas e organize seu tempo de estudo.
                </p>
              </CardContent>
              <CardFooter className="border-t bg-muted/50 px-6 py-4">
                <Button variant="secondary" className="w-full">
                  Ver Provas
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="overflow-hidden">
              <CardHeader className="bg-primary/5">
                <CheckSquare className="h-8 w-8 text-primary" />
                <CardTitle>Resultados</CardTitle>
                <CardDescription>
                  Acompanhe seu desempenho acadêmico
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">
                  Consulte as notas de suas avaliações e acompanhe seu progresso.
                </p>
              </CardContent>
              <CardFooter className="border-t bg-muted/50 px-6 py-4">
                <Button variant="secondary" className="w-full">
                  Ver Resultados
                </Button>
              </CardFooter>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
