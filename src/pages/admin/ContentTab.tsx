import { useEffect, useState } from "react";
import { toast } from "sonner";
import { api } from "@/lib/adminApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";

interface Block {
  id: number;
  block_key: string;
  block_name: string;
  section: string;
  content: Record<string, string>;
}

const FIELD_LABELS: Record<string, string> = {
  title: "Заголовок",
  subtitle: "Подзаголовок",
  price: "Цена",
  hours: "Часы практики",
  cta_title: "Заголовок формы",
  cta_subtitle: "Подзаголовок формы",
  cta_button: "Текст кнопки",
  banner_url: "Баннер (URL)",
  car: "Автомобиль",
  phone: "Телефон",
  address: "Адрес",
};

const ContentTab = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const data = await api<{ blocks: Block[] }>("resource=content");
      setBlocks(data.blocks);
    } catch {
      toast.error("Не удалось загрузить тексты");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const patchField = (blockKey: string, field: string, value: string) =>
    setBlocks((prev) =>
      prev.map((b) =>
        b.block_key === blockKey ? { ...b, content: { ...b.content, [field]: value } } : b,
      ),
    );

  const save = async (b: Block) => {
    try {
      await api("resource=content", { method: "PUT", body: { block_key: b.block_key, content: b.content } });
      toast.success(`«${b.block_name}» сохранён`);
    } catch {
      toast.error("Ошибка сохранения");
    }
  };

  if (loading) {
    return <div className="py-10 text-center text-muted-foreground">Загрузка…</div>;
  }

  return (
    <div className="space-y-4">
      {blocks.map((b) => (
        <div key={b.block_key} className="bg-white rounded-xl border p-4 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <Icon name="LayoutPanelTop" size={16} className="text-primary" />
            <h3 className="font-semibold text-primary">{b.block_name}</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            {Object.entries(b.content).map(([field, value]) => (
              <div key={field}>
                <label className="block text-xs font-medium text-muted-foreground mb-1">
                  {FIELD_LABELS[field] || field}
                </label>
                <Input
                  value={value ?? ""}
                  onChange={(e) => patchField(b.block_key, field, e.target.value)}
                />
              </div>
            ))}
          </div>
          <Button size="sm" onClick={() => save(b)}>
            <Icon name="Save" size={14} className="mr-1" /> Сохранить
          </Button>
        </div>
      ))}
    </div>
  );
};

export default ContentTab;
