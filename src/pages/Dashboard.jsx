
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  // Mock data for charts and statistics
  const gradeData = [
    { turma: "Turma A", media: 8.2 },
    { turma: "Turma B", media: 7.5 },
    { turma: "Turma C", media: 6.8 },
    { turma: "Turma D", media: 8.9 },
    { turma: "Turma E", media: 7.1 },
  ];
  
  const submissionData = [
    { turma: "Turma A", porcentagem: 95 },
    { turma: "Turma B", porcentagem: 87 },
    { turma: "Turma C", porcentagem: 76 },
    { turma: "Turma D", porcentagem: 92 },
    { turma: "Turma E", porcentagem: 83 },
  ];

  const recentExams = [
    { id: 1, title: "Prova Bimestral - Matemática", date: "25/04/2025", turma: "Turma A" },
    { id: 2, title: "Avaliação Química Orgânica", date: "22/04/2025", turma: "Turma C" },
    { id: 3, title: "Teste de Literatura", date: "18/04/2025", turma: "Turma B" },
    { id: 4, title: "Exame Final Física", date: "15/04/2025", turma: "Turma D" },
  ];

  const pendingGrades = [
    { id: 1, title: "Prova Bimestral - Matemática", turma: "Turma A", students: 28 },
    { id: 2, title: "Avaliação Química Orgânica", turma: "Turma C", students: 32 },
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard do Professor</h1>
        <p className="text-muted-foreground">
          Gerencie suas turmas, provas e acompanhe o desempenho dos seus alunos.
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="exams">Provas</TabsTrigger>
          <TabsTrigger value="students">Alunos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total de Provas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">
                  +2 provas criadas este mês
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Alunos Avaliados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">187</div>
                <p className="text-xs text-muted-foreground">
                  95% de taxa de participação
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Média Geral</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">7.6</div>
                <p className="text-xs text-muted-foreground">
                  +0.3 em relação ao bimestre anterior
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Turmas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">
                  Em 3 disciplinas diferentes
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Média por Turma</CardTitle>
                <CardDescription>
                  Desempenho médio dos alunos em cada turma
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={gradeData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="turma" />
                    <YAxis domain={[0, 10]} />
                    <Tooltip />
                    <Bar dataKey="media" fill="#1976d2" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Taxa de Entrega</CardTitle>
                <CardDescription>
                  Porcentagem de alunos que entregaram as avaliações
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={submissionData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="turma" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="porcentagem" fill="#dc004e" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Provas Recentes</CardTitle>
                <CardDescription>
                  Últimas avaliações aplicadas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentExams.map((exam) => (
                    <div key={exam.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{exam.title}</p>
                        <p className="text-sm text-muted-foreground">{exam.turma} • {exam.date}</p>
                      </div>
                      <Button variant="outline" size="sm">Ver</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Correções Pendentes</CardTitle>
                <CardDescription>
                  Provas que aguardam correção
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingGrades.map((exam) => (
                    <div key={exam.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{exam.title}</p>
                        <p className="text-sm text-muted-foreground">{exam.turma} • {exam.students} alunos</p>
                      </div>
                      <Button size="sm">Corrigir</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="exams" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Lista de Provas</CardTitle>
              <CardDescription>
                Gerencie todas as suas avaliações
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-muted-foreground">
                Conteúdo da aba de provas será exibido aqui
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="students" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Lista de Alunos</CardTitle>
              <CardDescription>
                Gerencie seus alunos por turma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-muted-foreground">
                Conteúdo da aba de alunos será exibido aqui
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Define Button component here to avoid compiler error
const Button = ({ children, variant = "default", size = "default", ...props }) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  
  const variantClasses = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
  };
  
  const sizeClasses = {
    default: "h-10 py-2 px-4 text-sm",
    sm: "h-9 px-3 rounded-md text-xs"
  };
  
  const className = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`;
  
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
};

export default Dashboard;
