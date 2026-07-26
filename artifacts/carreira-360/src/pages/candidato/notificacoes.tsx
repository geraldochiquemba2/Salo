import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/auth";
import { Bell, Check, CheckCheck } from "lucide-react";

export default function CandidatoNotificacoes() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => apiFetch("/api/candidate/notifications").then(setNotifications).catch(() => {});
  useEffect(() => { load().finally(() => setLoading(false)); }, []);

  async function markRead(id: number) {
    try { await apiFetch(`/api/candidate/notifications/${id}/read`, { method: "POST" }); load(); } catch {}
  }
  async function markAllRead() {
    try { await apiFetch("/api/candidate/notifications/read-all", { method: "POST" }); load(); } catch {}
  }

  const unread = notifications.filter(n => !n.read).length;

  if (loading) return <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center"><p className="font-display text-4xl text-[#FACC15] animate-pulse">A CARREGAR...</p></div>;

  return (
    <div className="min-h-screen bg-[#0A0A0A] p-6 md:p-12">
      <div className="max-w-[800px] mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
          <h1 className="font-display text-4xl sm:text-6xl md:text-8xl text-white uppercase">
            Notificações {unread > 0 && <span className="text-[#F97316]">({unread})</span>}
          </h1>
          {unread > 0 && (
            <button onClick={markAllRead} className="h-12 bg-white/10 hover:bg-[#FACC15] hover:text-[#0A0A0A] text-white px-6 font-bold uppercase text-sm transition-colors flex items-center gap-2">
              <CheckCheck size={16} /> LER TODAS
            </button>
          )}
        </div>

        {notifications.length === 0 ? (
          <div className="text-center py-20">
            <Bell size={64} className="text-white/20 mx-auto mb-6" />
            <p className="font-display text-3xl text-white/40 uppercase">Sem notificações</p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((n: any) => (
              <div key={n.id} className={`border-2 p-6 flex items-start gap-4 transition-colors ${n.read ? "bg-white/5 border-white/10" : "bg-[#FACC15]/5 border-[#FACC15]"}`}>
                <div className={`w-3 h-3 rounded-full mt-2 shrink-0 ${n.read ? "bg-white/20" : "bg-[#FACC15]"}`} />
                <div className="flex-1">
                  <h3 className="font-display text-lg sm:text-2xl text-white uppercase">{n.title}</h3>
                  <p className="text-white/60 mt-1">{n.message}</p>
                  <p className="text-white/30 text-xs mt-2">{new Date(n.createdAt).toLocaleDateString("pt-AO")}</p>
                </div>
                {!n.read && (
                  <button onClick={() => markRead(n.id)} className="text-[#FACC15] hover:text-green-500 shrink-0"><Check size={20} /></button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
