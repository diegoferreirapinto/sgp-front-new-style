
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { 
  LogOut, 
  Menu, 
  User, 
  Home, 
  BookOpen,
  FileSpreadsheet,
  CheckSquare,
  School,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-primary text-primary-foreground backdrop-blur supports-[backdrop-filter]:bg-primary/90">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex gap-6 md:gap-10">
          <Link to="/" className="hidden items-center space-x-2 md:flex">
            <School className="h-6 w-6" />
            <span className="font-bold text-lg">Exam System</span>
          </Link>
          
          {/* Mobile navigation */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="px-2 md:hidden"
                aria-label="Toggle menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <Link to="/" className="flex items-center space-x-2 mb-8">
                <School className="h-6 w-6" />
                <span className="font-bold text-lg">Exam System</span>
              </Link>
              <div className="grid gap-2 py-2">
                <Button asChild variant="ghost" className="justify-start">
                  <Link to="/">
                    <Home className="mr-2 h-4 w-4" />
                    Home
                  </Link>
                </Button>
                {user?.role === "professor" && (
                  <>
                    <Button asChild variant="ghost" className="justify-start">
                      <Link to="/dashboard">
                        <BookOpen className="mr-2 h-4 w-4" />
                        Área do Professor
                      </Link>
                    </Button>
                    <Button asChild variant="ghost" className="justify-start">
                      <Link to="/generate-exam">
                        <FileSpreadsheet className="mr-2 h-4 w-4" />
                        Gerar Prova
                      </Link>
                    </Button>
                    <Button asChild variant="ghost" className="justify-start">
                      <Link to="/correct-exam">
                        <CheckSquare className="mr-2 h-4 w-4" />
                        Corrigir Provas
                      </Link>
                    </Button>
                  </>
                )}
                <Button variant="ghost" className="justify-start" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sair
                </Button>
              </div>
            </SheetContent>
          </Sheet>
          
          {/* Desktop navigation */}
          <nav className="hidden gap-6 md:flex">
            <Button asChild variant="ghost">
              <Link to="/">
                Home
              </Link>
            </Button>
            {user?.role === "professor" && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-1">
                    Ferramentas <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      Área do Professor
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/generate-exam" className="flex items-center gap-2">
                      <FileSpreadsheet className="h-4 w-4" />
                      Gerar Prova
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/correct-exam" className="flex items-center gap-2">
                      <CheckSquare className="h-4 w-4" />
                      Corrigir Provas
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </nav>
        </div>
        
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {user && (
                <>
                  <div className="px-4 py-2">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                    <p className="text-xs text-muted-foreground capitalize mt-1">
                      {user.role === "professor" ? "Professor" : "Estudante"}
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                </>
              )}
              <DropdownMenuItem onClick={handleLogout} className="gap-2">
                <LogOut className="h-4 w-4" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
