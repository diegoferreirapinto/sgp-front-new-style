
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, Save, FileDown } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const questionSchema = z.object({
  type: z.enum(["multiple-choice", "true-false", "essay"], {
    required_error: "Selecione o tipo de questão",
  }),
  text: z.string().min(10, "A questão deve ter pelo menos 10 caracteres"),
  options: z.array(z.string()).optional(),
  correctAnswer: z.string().optional(),
  points: z.coerce.number().min(1, "Pontuação deve ser pelo menos 1"),
});

const examSchema = z.object({
  title: z.string().min(5, "O título deve ter pelo menos 5 caracteres"),
  subject: z.string().min(3, "A disciplina deve ter pelo menos 3 caracteres"),
  className: z.string().min(3, "A turma deve ter pelo menos 3 caracteres"),
  duration: z.coerce.number().min(15, "A duração deve ser pelo menos 15 minutos"),
  instructions: z.string().optional(),
});

type Question = z.infer<typeof questionSchema>;
type ExamFormValues = z.infer<typeof examSchema>;

const ExamGenerator = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question>({
    type: "multiple-choice",
    text: "",
    options: ["", "", "", ""],
    correctAnswer: "",
    points: 1,
  });
  const { toast } = useToast();

  const form = useForm<ExamFormValues>({
    resolver: zodResolver(examSchema),
    defaultValues: {
      title: "",
      subject: "",
      className: "",
      duration: 60,
      instructions: "",
    },
  });

  const handleQuestionChange = (field: keyof Question, value: any) => {
    setCurrentQuestion({ ...currentQuestion, [field]: value });

    // Reset options array when question type changes
    if (field === "type" && value !== currentQuestion.type) {
      if (value === "multiple-choice") {
        setCurrentQuestion({
          ...currentQuestion,
          type: value,
          options: ["", "", "", ""],
          correctAnswer: "",
        });
      } else if (value === "true-false") {
        setCurrentQuestion({
          ...currentQuestion,
          type: value,
          options: ["Verdadeiro", "Falso"],
          correctAnswer: "",
        });
      } else {
        setCurrentQuestion({
          ...currentQuestion,
          type: value,
          options: undefined,
          correctAnswer: undefined,
        });
      }
    }
  };

  const handleOptionChange = (index: number, value: string) => {
    if (currentQuestion.options) {
      const newOptions = [...currentQuestion.options];
      newOptions[index] = value;
      setCurrentQuestion({ ...currentQuestion, options: newOptions });
    }
  };

  const addOption = () => {
    if (currentQuestion.options && currentQuestion.options.length < 10) {
      setCurrentQuestion({
        ...currentQuestion,
        options: [...currentQuestion.options, ""],
      });
    }
  };

  const removeOption = (index: number) => {
    if (currentQuestion.options && currentQuestion.options.length > 2) {
      const newOptions = currentQuestion.options.filter((_, i) => i !== index);
      setCurrentQuestion({ ...currentQuestion, options: newOptions });
    }
  };

  const addQuestion = () => {
    try {
      // Basic validation
      if (!currentQuestion.text || currentQuestion.text.length < 10) {
        throw new Error("A questão deve ter pelo menos 10 caracteres");
      }
      
      if (currentQuestion.type === "multiple-choice" || currentQuestion.type === "true-false") {
        if (!currentQuestion.correctAnswer) {
          throw new Error("Selecione a resposta correta");
        }
      }
      
      setQuestions([...questions, currentQuestion]);
      
      // Reset current question
      setCurrentQuestion({
        type: "multiple-choice",
        text: "",
        options: ["", "", "", ""],
        correctAnswer: "",
        points: 1,
      });
      
      toast({
        title: "Questão adicionada",
        description: "A questão foi adicionada com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro ao adicionar questão",
        description: error instanceof Error ? error.message : "Ocorreu um erro inesperado",
        variant: "destructive",
      });
    }
  };

  const removeQuestion = (index: number) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
    
    toast({
      title: "Questão removida",
      description: "A questão foi removida com sucesso.",
    });
  };

  const onSubmit = (data: ExamFormValues) => {
    if (questions.length === 0) {
      toast({
        title: "Erro ao gerar prova",
        description: "Adicione pelo menos uma questão antes de gerar a prova",
        variant: "destructive",
      });
      return;
    }
    
    // Here we would normally save the exam or generate a PDF
    console.log("Form data:", data);
    console.log("Questions:", questions);
    
    toast({
      title: "Prova gerada com sucesso",
      description: `A prova "${data.title}" foi criada com ${questions.length} questões.`,
    });
  };

  const totalPoints = questions.reduce((sum, question) => sum + question.points, 0);

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Gerador de Provas</h1>
        <p className="text-muted-foreground">
          Crie provas personalizadas com diferentes tipos de questões
        </p>
      </div>

      <Tabs defaultValue="info" className="space-y-6">
        <TabsList>
          <TabsTrigger value="info">Informações da Prova</TabsTrigger>
          <TabsTrigger value="questions">Questões</TabsTrigger>
          <TabsTrigger value="preview">Prévia</TabsTrigger>
        </TabsList>
        
        <TabsContent value="info" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
              <CardDescription>
                Defina os detalhes principais da sua avaliação
              </CardDescription>
            </CardHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título da Prova</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Avaliação Bimestral de Matemática" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Disciplina</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: Matemática" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="className"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Turma</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: 9º Ano B" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duração (minutos)</FormLabel>
                        <FormControl>
                          <Input type="number" min="15" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="instructions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Instruções</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Instruções adicionais para os alunos..." 
                            className="min-h-32"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Inclua orientações gerais, materiais permitidos, etc.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter className="justify-between space-x-2 border-t bg-muted/50 px-6 py-4">
                  <div className="text-sm text-muted-foreground">
                    * Todos os campos marcados são obrigatórios
                  </div>
                  <Button type="button" onClick={() => document.getElementById("questions-tab")?.click()}>
                    Próximo: Questões
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </TabsContent>
        
        <TabsContent value="questions" className="space-y-6" id="questions-tab">
          <Card>
            <CardHeader>
              <CardTitle>Adicionar Questão</CardTitle>
              <CardDescription>
                Configure uma nova questão para sua prova
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <FormLabel htmlFor="question-type">Tipo de Questão</FormLabel>
                  <Select 
                    value={currentQuestion.type} 
                    onValueChange={(value) => handleQuestionChange("type", value as any)}
                  >
                    <SelectTrigger id="question-type">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="multiple-choice">Múltipla Escolha</SelectItem>
                      <SelectItem value="true-false">Verdadeiro ou Falso</SelectItem>
                      <SelectItem value="essay">Dissertativa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <FormLabel htmlFor="question-points">Pontuação</FormLabel>
                  <Input
                    id="question-points"
                    type="number"
                    min="1"
                    value={currentQuestion.points}
                    onChange={(e) => handleQuestionChange("points", Number(e.target.value))}
                  />
                </div>
              </div>
              
              <div>
                <FormLabel htmlFor="question-text">Texto da Questão</FormLabel>
                <Textarea
                  id="question-text"
                  placeholder="Digite o enunciado da questão..."
                  className="min-h-24"
                  value={currentQuestion.text}
                  onChange={(e) => handleQuestionChange("text", e.target.value)}
                />
              </div>
              
              {(currentQuestion.type === "multiple-choice" || currentQuestion.type === "true-false") && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <FormLabel>Opções</FormLabel>
                    {currentQuestion.type === "multiple-choice" && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addOption}
                        disabled={currentQuestion.options && currentQuestion.options.length >= 10}
                      >
                        <Plus className="h-4 w-4 mr-1" /> Adicionar Opção
                      </Button>
                    )}
                  </div>
                  
                  {currentQuestion.options?.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="flex-1">
                        <Input
                          placeholder={`Opção ${index + 1}`}
                          value={option}
                          onChange={(e) => handleOptionChange(index, e.target.value)}
                        />
                      </div>
                      <Select 
                        value={currentQuestion.correctAnswer === option ? option : ""}
                        onValueChange={() => handleQuestionChange("correctAnswer", option)}
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="Resposta" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={option}>Correta</SelectItem>
                        </SelectContent>
                      </Select>
                      {currentQuestion.type === "multiple-choice" && currentQuestion.options && currentQuestion.options.length > 2 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeOption(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter className="justify-end space-x-2 border-t bg-muted/50 px-6 py-4">
              <Button type="button" variant="outline" onClick={() => document.getElementById("info-tab")?.click()}>
                Voltar
              </Button>
              <Button type="button" onClick={addQuestion}>
                Adicionar Questão
              </Button>
            </CardFooter>
          </Card>
          
          {questions.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Questões Adicionadas ({questions.length})</CardTitle>
                <CardDescription>
                  Total de pontos: {totalPoints}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {questions.map((question, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Questão {index + 1}</span>
                          <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
                            {question.type === "multiple-choice" ? "Múltipla Escolha" : 
                             question.type === "true-false" ? "Verdadeiro/Falso" : "Dissertativa"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{question.points} {question.points === 1 ? "ponto" : "pontos"}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeQuestion(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm">{question.text}</p>
                      {(question.type === "multiple-choice" || question.type === "true-false") && question.options && (
                        <div className="mt-2 space-y-1">
                          {question.options.map((option, optIndex) => (
                            <div key={optIndex} className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${option === question.correctAnswer ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                              <span className="text-sm">{option}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="justify-end space-x-2 border-t bg-muted/50 px-6 py-4">
                <Button type="button" onClick={() => document.getElementById("preview-tab")?.click()}>
                  Próximo: Prévia
                </Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="preview" className="space-y-6" id="preview-tab">
          <Card>
            <CardHeader>
              <CardTitle>Prévia da Prova</CardTitle>
              <CardDescription>
                Revise sua prova antes de finalizar
              </CardDescription>
            </CardHeader>
            <CardContent>
              {form.getValues().title ? (
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <h2 className="text-2xl font-bold">{form.getValues().title}</h2>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                      <div>Disciplina: <span className="font-medium">{form.getValues().subject}</span></div>
                      <div>Turma: <span className="font-medium">{form.getValues().className}</span></div>
                      <div>Duração: <span className="font-medium">{form.getValues().duration} minutos</span></div>
                      <div>Total: <span className="font-medium">{totalPoints} pontos</span></div>
                    </div>
                    {form.getValues().instructions && (
                      <div className="mt-4 p-4 bg-muted rounded-md">
                        <h3 className="font-medium mb-1">Instruções:</h3>
                        <p className="text-sm">{form.getValues().instructions}</p>
                      </div>
                    )}
                  </div>
                  
                  {questions.length > 0 ? (
                    <div className="space-y-8">
                      {questions.map((question, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between">
                            <h3 className="font-medium">Questão {index + 1}</h3>
                            <span className="text-sm">{question.points} {question.points === 1 ? "ponto" : "pontos"}</span>
                          </div>
                          <p>{question.text}</p>
                          
                          {question.type === "multiple-choice" && question.options && (
                            <div className="ml-4 space-y-2 mt-2">
                              {question.options.map((option, optIndex) => (
                                <div key={optIndex} className="flex items-center gap-2">
                                  <div className="w-5 h-5 rounded-full border flex items-center justify-center text-xs">
                                    {String.fromCharCode(65 + optIndex)}
                                  </div>
                                  <span>{option}</span>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          {question.type === "true-false" && question.options && (
                            <div className="ml-4 space-y-2 mt-2">
                              {question.options.map((option, optIndex) => (
                                <div key={optIndex} className="flex items-center gap-2">
                                  <div className="w-5 h-5 rounded border flex items-center justify-center"></div>
                                  <span>{option}</span>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          {question.type === "essay" && (
                            <div className="h-32 border-b border-dashed mt-4"></div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-12 text-center text-muted-foreground">
                      Nenhuma questão foi adicionada ainda.
                      <div className="mt-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => document.getElementById("questions-tab")?.click()}
                        >
                          Adicionar Questões
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="py-12 text-center text-muted-foreground">
                  Preencha as informações básicas da prova primeiro.
                  <div className="mt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("info-tab")?.click()}
                    >
                      Informações da Prova
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="justify-between space-x-2 border-t bg-muted/50 px-6 py-4">
              <Button type="button" variant="outline" onClick={() => document.getElementById("questions-tab")?.click()}>
                Voltar
              </Button>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <FileDown className="h-4 w-4 mr-2" /> Exportar PDF
                </Button>
                <Button type="submit" onClick={form.handleSubmit(onSubmit)} disabled={questions.length === 0}>
                  <Save className="h-4 w-4 mr-2" /> Salvar Prova
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExamGenerator;
