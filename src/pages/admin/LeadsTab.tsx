import { useEffect, useState } from "react";
import { toast } from "sonner";
import { api } from "@/lib/adminApi";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface Lead {
  id: number;
  name: string;
  phone: string;
  source: string;
  status: string;
  notes: string | null;
  created_at: string | null;
}

const STATUSES: Record<string, { label: string; color: string }> = {
  new: { label: "Новая", color: "bg-blue-500" },
  in_progress: { label: "В работе", color: "bg-amber-500" },
  done: { label: "Записан", color: "bg-green-600" },
  rejected: { label: "Отказ", color: "bg-red-500" },
  archived: { label: "Архив", color: "bg-gray-400" },
};

const LeadsTab = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const q = filter ? `resource=leads&status=${filter}` : "resource=leads";
      const data = await api<{ leads: Lead[] }>(q);
      setLeads(data.leads);
    } catch {
      toast.error("Не удалось загрузить заявки");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const update = async (lead: Lead, patch: Partial<Lead>) => {
    const updated = { ...lead, ...patch };
    setLeads((prev) => prev.map((l) => (l.id === lead.id ? updated : l)));
    try {
      await api("resource=leads", {
        method: "PUT",
        body: { id: lead.id, status: updated.status, notes: updated.notes },
      });
    } catch {
      toast.error("Ошибка сохранения");
    }
  };

  if (loading) {
    return <div className="py-10 text-center text-muted-foreground">Загрузка…</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Select value={filter || "all"} onValueChange={(v) => setFilter(v === "all" ? "" : v)}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Все статусы" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все заявки</SelectItem>
            {Object.entries(STATUSES).map(([k, v]) => (
              <SelectItem key={k} value={k}>{v.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon" onClick={load}>
          <Icon name="RefreshCw" size={16} />
        </Button>
        <span className="text-sm text-muted-foreground ml-auto">Всего: {leads.length}</span>
      </div>

      {leads.length === 0 ? (
        <div className="py-10 text-center text-muted-foreground">Заявок пока нет</div>
      ) : (
        <div className="grid gap-3">
          {leads.map((lead) => (
            <div key={lead.id} className="bg-white rounded-xl border p-4 shadow-sm">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <div className="font-semibold">{lead.name || "Без имени"}</div>
                <a href={`tel:${lead.phone}`} className="text-primary font-medium">{lead.phone}</a>
                <Badge className={`${STATUSES[lead.status]?.color || "bg-gray-400"} text-white`}>
                  {STATUSES[lead.status]?.label || lead.status}
                </Badge>
                <span className="text-xs text-muted-foreground ml-auto">
                  {lead.created_at ? new Date(lead.created_at).toLocaleString("ru-RU") : ""}
                </span>
              </div>
              <div className="flex flex-col md:flex-row gap-3">
                <Select value={lead.status} onValueChange={(v) => update(lead, { status: v })}>
                  <SelectTrigger className="w-full md:w-44">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(STATUSES).map(([k, v]) => (
                      <SelectItem key={k} value={k}>{v.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Textarea
                  placeholder="Заметка менеджера…"
                  defaultValue={lead.notes || ""}
                  onBlur={(e) => {
                    if (e.target.value !== (lead.notes || "")) {
                      update(lead, { notes: e.target.value });
                    }
                  }}
                  className="flex-1 min-h-[40px]"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LeadsTab;
