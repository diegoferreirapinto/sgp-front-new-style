
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { 
  Search, 
  FileCheck, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Save,
  SendHorizontal
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

// Mock data
const mockExams = [
  { id: 1, title: "Prova Bimestral - Matemática", class: "Turma A", date: "25/04/2025", submissions: 24, graded: 0 },
  { id: 2, title: "Avaliação Química Orgânica", class: "Turma C", date: "22/04/2025", submissions: 32, graded: 0 },
  { id: 3, title: "Teste de Literatura", class: "Turma B", date: "18/04/2025", submissions: 28, graded: 28 },
  { id: 4, title: "Exame Final Física", class: "Turma D", date: "15/04/2025", submissions: 30, graded: 24 },
];

const mockStudents = [
  { id: 1, name: "Ana Silva", email: "ana.silva@example.com", submitted: true },
  { id: 2, name: "Bruno Santos", email: "bruno.santos@example.com", submitted: true },
  { id: 3, name: "Carla Oliveira", email: "carla.oliveira@example.com", submitted: true },
  { id: 4, name: "Diego Martins", email: "diego.martins@example.com", submitted: true },
  { id: 5, name: "Eduarda Costa", email: "eduarda.costa@example.com", submitted: true },
];

const mockQuestions = [
  { 
    id: 1, 
    text: "Qual é a fórmula para calcular a área de um círculo?", 
    type: "multiple-choice",
    answer: "πr²",
    options: ["πr", "2πr", "πr²", "2πr²"],
    correctAnswer: "πr²",
    points: 1,
    maxPoints: 1,
    feedback: ""
  },
  { 
    id: 2, 
    text: "A derivada de uma função constante é sempre igual a zero.", 
    type: "true-false",
    answer: "Verdadeiro",
    options: ["Verdadeiro", "Falso"],
    correctAnswer: "Verdadeiro",
    points: 1,
    maxPoints: 1,
    feedback: ""
  },
  { 
    id: 3, 
    text: "Explique o teorema fundamental do cálculo e dê um exemplo de sua aplicação.", 
    type: "essay",
    answer: "O teorema fundamental do cálculo estabelece a relação entre a derivada e a integral, mostrando que são operações inversas. Por exemplo, quando integramos a velocidade ao longo do tempo, obtemos a posição, e quando derivamos a posição em relação ao tempo, obtemos a velocidade.",
    maxPoints: 3,
    points: 0,
    feedback: ""
  },
];

const ExamCorrector = () => {
  const [selectedExam, setSelectedExam] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [examQuestions, setExamQuestions] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [maxPoints, setMaxPoints] = useState(0);
  const { toast } = useToast();
  
  const handleSelectExam = (examId) => {
    setSelectedExam(examId);
    setSelectedStudent(null);
    setExamQuestions([]);
  };
  
  const handleSelectStudent = (studentId) => {
    setSelectedStudent(studentId);
    setExamQuestions([...mockQuestions]);
    
    // Calculate max points
    const max = mockQuestions.reduce((sum, q) => sum + q.maxPoints, 0);
    setMaxPoints(max);
    
    // Calculate initial total points (for auto-graded questions)
    const initialPoints = mockQuestions.reduce((sum, q) => {
      if (q.type !== "essay" && q.answer === q.correctAnswer) {
        return sum + q.maxPoints;
      }
      return sum;
    }, 0);
    setTotalPoints(initialPoints);
  };
  
  const handleScoreChange = (questionId, points) => {
    const updatedQuestions = examQuestions.map(q => {
      if (q.id === questionId) {
        return { ...q, points };
      }
      return q;
    });
    
    setExamQuestions(updatedQuestions);
    
    // Update total points
    const newTotal = updatedQuestions.reduce((sum, q) => sum + q.points, 0);
    setTotalPoints(newTotal);
  };
  
  const handleFeedbackChange = (questionId, feedback) => {
    const updatedQuestions = examQuestions.map(q => {
      if (q.id === questionId) {
        return { ...q, feedback };
      }
      return q;
    });
    
    setExamQuestions(updatedQuestions);
  };
  
  const handleSaveGrades = () => {
    toast({
      title: "Notas salvas",
      description: "As notas foram salvas com sucesso.",
    });
  };
  
  const handleSendFeedback = () => {
    toast({
      title: "Feedback enviado",
      description: "O feedback foi enviado para o aluno.",
    });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Corretor de Provas</h1>
        <p className="text-muted-foreground">
          Corrija provas e forneça feedback para seus alunos
        </p>
      </div>

      <Tabs defaultValue="exams" className="space-y-6">
        <TabsList>
          <TabsTrigger value="exams">Provas Disponíveis</TabsTrigger>
          <TabsTrigger value="correction" disabled={!selectedExam}>Correção</TabsTrigger>
        </TabsList>
        
        <TabsContent value="exams" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Provas para Correção</CardTitle>
              <CardDescription>
                Selecione uma prova para começar a corrigir
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar provas..."
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                {mockExams.map((exam) => {
                  const isComplete = exam.graded === exam.submissions;
                  const progress = (exam.graded / exam.submissions) * 100;
                  
                  return (
                    <div
                      key={exam.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        selectedExam === exam.id ? "border-primary bg-muted/50" : "hover:bg-muted/30"
                      }`}
                      onClick={() => handleSelectExam(exam.id)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-medium">{exam.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {exam.class} • {exam.date}
                          </p>
                        </div>
                        <div className="flex items-center">
                          {isComplete ? (
                            <span className="flex items-center text-green-500 text-sm font-medium">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Concluído
                            </span>
                          ) : (
                            <span className="flex items-center text-amber-500 text-sm font-medium">
                              <AlertCircle className="h-4 w-4 mr-1" />
                              Pendente
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progresso</span>
                          <span>
                            {exam.graded}/{exam.submissions} ({Math.round(progress)}%)
                          </span>
                        </div>
                        <Progress value={progress} />
                      </div>
                      
                      <div className="mt-3 flex justify-end">
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectExam(exam.id);
                            document.getElementById("correction-tab")?.click();
                          }}
                        >
                          <FileCheck className="h-4 w-4 mr-2" />
                          {isComplete ? "Ver Detalhes" : "Corrigir"}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="correction" className="space-y-6" id="correction-tab">
          {selectedExam && (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Alunos</CardTitle>
                    <CardDescription>
                      {mockExams.find(e => e.id === selectedExam)?.title}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Buscar aluno..."
                          className="pl-10"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      {mockStudents.map((student) => (
                        <div
                          key={student.id}
                          className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${
                            selectedStudent === student.id
                              ? "bg-primary/10 text-primary"
                              : "hover:bg-muted"
                          }`}
                          onClick={() => handleSelectStudent(student.id)}
                        >
                          <span>{student.name}</span>
                          <div>
                            {student.submitted ? (
                              <span className="text-xs bg-green-500/10 text-green-500 px-2 py-1 rounded-full">
                                Entregue
                              </span>
                            ) : (
                              <span className="text-xs bg-amber-500/10 text-amber-500 px-2 py-1 rounded-full">
                                Pendente
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="lg:col-span-2">
                {selectedStudent ? (
                  <Card>
                    <CardHeader className="border-b">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Correção</CardTitle>
                          <CardDescription>
                            {mockStudents.find(s => s.id === selectedStudent)?.name}
                          </CardDescription>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">
                            {totalPoints}/{maxPoints}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Nota: {((totalPoints / maxPoints) * 10).toFixed(1)}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-8">
                        {examQuestions.map((question, index) => (
                          <div key={question.id} className="border-b pb-6 last:border-0">
                            <div className="flex items-center justify-between mb-3">
                              <h3 className="font-medium">Questão {index + 1}</h3>
                              <div className="flex items-center space-x-1">
                                <Label htmlFor={`points-${question.id}`}>Pontos:</Label>
                                <Input
                                  id={`points-${question.id}`}
                                  type="number"
                                  min="0"
                                  max={question.maxPoints}
                                  className="w-16"
                                  value={question.points}
                                  onChange={(e) => handleScoreChange(question.id, Number(e.target.value))}
                                />
                                <span className="text-sm text-muted-foreground">/{question.maxPoints}</span>
                              </div>
                            </div>
                            
                            <div className="space-y-3">
                              <p className="text-sm font-medium">{question.text}</p>
                              
                              <div className="bg-muted/50 p-3 rounded-md">
                                <h4 className="text-sm font-medium mb-1">Resposta do aluno:</h4>
                                {question.type === "essay" ? (
                                  <p className="text-sm whitespace-pre-line">{question.answer}</p>
                                ) : (
                                  <div className="flex items-center space-x-2">
                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                                      question.answer === question.correctAnswer
                                        ? "bg-green-100 text-green-600"
                                        : "bg-red-100 text-red-600"
                                    }`}>
                                      {question.answer === question.correctAnswer ? (
                                        <CheckCircle className="h-4 w-4" />
                                      ) : (
                                        <XCircle className="h-4 w-4" />
                                      )}
                                    </div>
                                    <span className="text-sm">{question.answer}</span>
                                  </div>
                                )}
                              </div>
                              
                              {question.type === "multiple-choice" || question.type === "true-false" ? (
                                <div className="flex items-center">
                                  <span className="text-sm font-medium mr-2">Resposta correta:</span>
                                  <span className="text-sm">{question.correctAnswer}</span>
                                </div>
                              ) : null}
                              
                              <div>
                                <Label htmlFor={`feedback-${question.id}`}>Feedback:</Label>
                                <Textarea
                                  id={`feedback-${question.id}`}
                                  placeholder="Forneça comentários sobre esta resposta..."
                                  className="mt-1"
                                  value={question.feedback}
                                  onChange={(e) => handleFeedbackChange(question.id, e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="border-t bg-muted/50 flex justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="send-email" />
                        <Label htmlFor="send-email">Notificar aluno por e-mail</Label>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" onClick={handleSaveGrades}>
                          <Save className="h-4 w-4 mr-2" />
                          Salvar
                        </Button>
                        <Button onClick={handleSendFeedback}>
                          <SendHorizontal className="h-4 w-4 mr-2" />
                          Enviar Feedback
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="p-8 text-center text-muted-foreground">
                      <FileCheck className="h-16 w-16 mx-auto mb-4 opacity-30" />
                      <h3 className="text-lg font-medium mb-2">Selecione um aluno</h3>
                      <p>Escolha um aluno na lista à esquerda para ver e corrigir suas respostas.</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExamCorrector;
