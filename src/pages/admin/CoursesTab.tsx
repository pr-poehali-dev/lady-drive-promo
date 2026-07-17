import { useEffect, useState } from "react";
import { toast } from "sonner";
import { api } from "@/lib/adminApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import Icon from "@/components/ui/icon";

interface Course {
  id: number;
  title: string;
  hours: string;
  description: string;
  icon: string;
  badge: string | null;
  sort_order: number;
  enabled: boolean;
}

const emptyCourse: Omit<Course, "id"> = {
  title: "", hours: "", description: "", icon: "BookOpen", badge: "", sort_order: 0, enabled: true,
};

const CoursesTab = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState<Omit<Course, "id">>(emptyCourse);

  const load = async () => {
    setLoading(true);
    try {
      const data = await api<{ courses: Course[] }>("resource=courses");
      setCourses(data.courses);
    } catch {
      toast.error("Не удалось загрузить курсы");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const save = async (c: Course) => {
    try {
      await api("resource=courses", { method: "PUT", body: c });
      toast.success("Сохранено");
    } catch {
      toast.error("Ошибка сохранения");
    }
  };

  const create = async () => {
    if (!draft.title.trim()) { toast.error("Введите название"); return; }
    try {
      await api("resource=courses&action=create", { method: "POST", body: draft });
      setDraft(emptyCourse);
      toast.success("Курс добавлен");
      load();
    } catch {
      toast.error("Ошибка добавления");
    }
  };

  const remove = async (id: number) => {
    if (!confirm("Удалить курс?")) return;
    try {
      await api("resource=courses&action=remove", { method: "POST", body: { id } });
      setCourses((prev) => prev.filter((c) => c.id !== id));
      toast.success("Удалено");
    } catch {
      toast.error("Ошибка удаления");
    }
  };

  const patch = (id: number, p: Partial<Course>) =>
    setCourses((prev) => prev.map((c) => (c.id === id ? { ...c, ...p } : c)));

  if (loading) {
    return <div className="py-10 text-center text-muted-foreground">Загрузка…</div>;
  }

  return (
    <div className="space-y-4">
      {courses.map((c) => (
        <div key={c.id} className="bg-white rounded-xl border p-4 shadow-sm space-y-3">
          <div className="flex flex-col md:flex-row gap-3">
            <Input value={c.title} onChange={(e) => patch(c.id, { title: e.target.value })} placeholder="Название" className="flex-1" />
            <Input value={c.hours} onChange={(e) => patch(c.id, { hours: e.target.value })} placeholder="Часы (напр. 4 часа)" className="md:w-40" />
          </div>
          <Textarea value={c.description} onChange={(e) => patch(c.id, { description: e.target.value })} placeholder="Описание" />
          <div className="flex flex-wrap items-center gap-3">
            <Input value={c.icon} onChange={(e) => patch(c.id, { icon: e.target.value })} placeholder="Иконка (lucide)" className="w-40" />
            <Input value={c.badge || ""} onChange={(e) => patch(c.id, { badge: e.target.value })} placeholder="Бейдж (напр. НОВИНКА)" className="w-44" />
            <Input type="number" value={c.sort_order} onChange={(e) => patch(c.id, { sort_order: Number(e.target.value) })} placeholder="Порядок" className="w-24" />
            <label className="flex items-center gap-2 text-sm">
              <Switch checked={c.enabled} onCheckedChange={(v) => patch(c.id, { enabled: v })} />
              Показывать
            </label>
            <div className="ml-auto flex gap-2">
              <Button size="sm" onClick={() => save(c)}>
                <Icon name="Save" size={14} className="mr-1" /> Сохранить
              </Button>
              <Button size="sm" variant="destructive" onClick={() => remove(c.id)}>
                <Icon name="Trash2" size={14} />
              </Button>
            </div>
          </div>
        </div>
      ))}

      <div className="bg-secondary/10 rounded-xl border border-dashed p-4 space-y-3">
        <h3 className="font-semibold text-primary flex items-center gap-2">
          <Icon name="Plus" size={16} /> Новый курс
        </h3>
        <div className="flex flex-col md:flex-row gap-3">
          <Input value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} placeholder="Название" className="flex-1" />
          <Input value={draft.hours} onChange={(e) => setDraft({ ...draft, hours: e.target.value })} placeholder="Часы" className="md:w-40" />
        </div>
        <Textarea value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} placeholder="Описание" />
        <div className="flex flex-wrap items-center gap-3">
          <Input value={draft.icon} onChange={(e) => setDraft({ ...draft, icon: e.target.value })} placeholder="Иконка" className="w-40" />
          <Input value={draft.badge || ""} onChange={(e) => setDraft({ ...draft, badge: e.target.value })} placeholder="Бейдж" className="w-44" />
          <Button onClick={create}>Добавить курс</Button>
        </div>
      </div>
    </div>
  );
};

export default CoursesTab;
