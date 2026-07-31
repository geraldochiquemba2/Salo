import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "wouter";
import { useEffect } from "react";
import Navbar from "./navbar";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const [, navigate] = useLocation();

  useEffect(() => {
    if (!loading && !user) navigate("/login");
  }, [user, loading, navigate]);

  if (loading) return <div className="min-h-screen bg-[#13293D] flex items-center justify-center"><div className="font-display text-4xl text-[#1B98E0] animate-pulse">TALENTOS</div></div>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#13293D] text-white">
      <Navbar />
      <main className="pt-20">{children}</main>
    </div>
  );
}
