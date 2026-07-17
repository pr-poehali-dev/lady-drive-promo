import { useEffect, useState } from "react";
import { toast } from "sonner";
import { api } from "@/lib/adminApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";

type Seo = Record<string, string>;

const FIELDS: { key: string; label: string; area?: boolean }[] = [
  { key: "title", label: "Title (заголовок вкладки)" },
  { key: "description", label: "Description (описание)", area: true },
  { key: "keywords", label: "Ключевые слова" },
  { key: "og_title", label: "OG Title (для соцсетей)" },
  { key: "og_description", label: "OG Description", area: true },
  { key: "og_image", label: "OG Image (URL картинки)" },
  { key: "canonical_url", label: "Canonical URL" },
  { key: "favicon_url", label: "Favicon (URL)" },
  { key: "robots_txt", label: "robots.txt", area: true },
  { key: "sitemap_xml", label: "sitemap.xml", area: true },
];

const SeoTab = () => {
  const [seo, setSeo] = useState<Seo>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api<{ seo: Seo }>("resource=seo")
      .then((d) => setSeo(d.seo || {}))
      .catch(() => toast.error("Не удалось загрузить SEO"))
      .finally(() => setLoading(false));
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      await api("resource=seo", { method: "PUT", body: seo });
      toast.success("SEO сохранено");
    } catch {
      toast.error("Ошибка сохранения");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="py-10 text-center text-muted-foreground">Загрузка…</div>;
  }

  return (
    <div className="bg-white rounded-xl border p-4 shadow-sm space-y-4">
      {FIELDS.map((f) => (
        <div key={f.key}>
          <label className="block text-xs font-medium text-muted-foreground mb-1">{f.label}</label>
          {f.area ? (
            <Textarea
              value={seo[f.key] || ""}
              onChange={(e) => setSeo({ ...seo, [f.key]: e.target.value })}
              className="min-h-[80px] font-mono text-sm"
            />
          ) : (
            <Input value={seo[f.key] || ""} onChange={(e) => setSeo({ ...seo, [f.key]: e.target.value })} />
          )}
        </div>
      ))}
      <Button onClick={save} disabled={saving}>
        <Icon name="Save" size={14} className="mr-1" /> {saving ? "Сохранение…" : "Сохранить SEO"}
      </Button>
    </div>
  );
};

export default SeoTab;
