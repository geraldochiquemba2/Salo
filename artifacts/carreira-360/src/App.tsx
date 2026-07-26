import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedLayout from "@/components/protected-layout";
import PublicLayout from "@/components/public-layout";

import Home from "@/pages/home";
import Login from "@/pages/login";
import Cadastro from "@/pages/cadastro";
import Vagas from "@/pages/vagas";
import Empresas from "@/pages/empresas";
import ComoFunciona from "@/pages/como-funciona";
import NotFound from "@/pages/not-found";

import CandidatoDashboard from "@/pages/candidato/dashboard";
import CandidatoPerfil from "@/pages/candidato/perfil";
import CandidatoCv from "@/pages/candidato/cv";
import CandidatoVagas from "@/pages/candidato/vagas";
import CandidatoSwipe from "@/pages/candidato/swipe";
import CandidatoAnalise from "@/pages/candidato/analise";
import CandidatoCursos from "@/pages/candidato/cursos";
import CandidatoCarta from "@/pages/candidato/carta-motivacao";
import CandidatoEntrevistas from "@/pages/candidato/entrevistas";
import CandidatoNotificacoes from "@/pages/candidato/notificacoes";

import RecrutadorDashboard from "@/pages/recrutador/dashboard";
import RecrutadorBuscar from "@/pages/recrutador/buscar";
import RecrutadorRanking from "@/pages/recrutador/ranking";

const queryClient = new QueryClient();

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

function Router() {
  return (
    <Switch>
      {/* Public */}
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/cadastro" component={Cadastro} />
      <Route path="/vagas" component={Vagas} />
      <Route path="/como-funciona" component={ComoFunciona} />
      <Route path="/empresas" component={Empresas} />

      {/* Candidate - Protected */}
      <Route path="/candidato" nest>
        <ProtectedLayout>
          <Switch>
            <Route path="/" component={CandidatoDashboard} />
            <Route path="/perfil" component={CandidatoPerfil} />
            <Route path="/cv" component={CandidatoCv} />
            <Route path="/vagas" component={CandidatoVagas} />
            <Route path="/swipe" component={CandidatoSwipe} />
            <Route path="/analise" component={CandidatoAnalise} />
            <Route path="/cursos" component={CandidatoCursos} />
            <Route path="/carta-motivacao" component={CandidatoCarta} />
            <Route path="/entrevistas" component={CandidatoEntrevistas} />
            <Route path="/notificacoes" component={CandidatoNotificacoes} />
            <Route component={NotFound} />
          </Switch>
        </ProtectedLayout>
      </Route>

      {/* Recruiter - Protected */}
      <Route path="/recrutador" nest>
        <ProtectedLayout>
          <Switch>
            <Route path="/" component={RecrutadorDashboard} />
            <Route path="/buscar" component={RecrutadorBuscar} />
            <Route path="/ranking" component={RecrutadorRanking} />
            <Route component={NotFound} />
          </Switch>
        </ProtectedLayout>
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <ScrollToTop />
            <Router />
          </WouterRouter>
        </AuthProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
