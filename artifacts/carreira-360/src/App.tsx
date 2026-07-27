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
      <Route path="/candidato/perfil" component={() => <ProtectedLayout><CandidatoPerfil /></ProtectedLayout>} />
      <Route path="/candidato/cv" component={() => <ProtectedLayout><CandidatoCv /></ProtectedLayout>} />
      <Route path="/candidato/vagas" component={() => <ProtectedLayout><CandidatoVagas /></ProtectedLayout>} />
      <Route path="/candidato/swipe" component={() => <ProtectedLayout><CandidatoSwipe /></ProtectedLayout>} />
      <Route path="/candidato/analise" component={() => <ProtectedLayout><CandidatoAnalise /></ProtectedLayout>} />
      <Route path="/candidato/cursos" component={() => <ProtectedLayout><CandidatoCursos /></ProtectedLayout>} />
      <Route path="/candidato/carta-motivacao" component={() => <ProtectedLayout><CandidatoCarta /></ProtectedLayout>} />
      <Route path="/candidato/entrevistas" component={() => <ProtectedLayout><CandidatoEntrevistas /></ProtectedLayout>} />
      <Route path="/candidato/notificacoes" component={() => <ProtectedLayout><CandidatoNotificacoes /></ProtectedLayout>} />
      <Route path="/candidato" component={() => <ProtectedLayout><CandidatoDashboard /></ProtectedLayout>} />

      {/* Recruiter - Protected */}
      <Route path="/recrutador/buscar" component={() => <ProtectedLayout><RecrutadorBuscar /></ProtectedLayout>} />
      <Route path="/recrutador/ranking" component={() => <ProtectedLayout><RecrutadorRanking /></ProtectedLayout>} />
      <Route path="/recrutador" component={() => <ProtectedLayout><RecrutadorDashboard /></ProtectedLayout>} />

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
