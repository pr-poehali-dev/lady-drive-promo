import { useEffect, useState } from "react";
import { toast } from "sonner";
import { api, getToken, clearToken, login as apiLogin } from "@/lib/adminApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";
import LeadsTab from "./admin/LeadsTab";
import CoursesTab from "./admin/CoursesTab";
import ContentTab from "./admin/ContentTab";
import SeoTab from "./admin/SeoTab";

interface Admin {
  name: string;
  login: string;
  role: string;
}

const LoginScreen = ({ onLogin }: { onLogin: (a: Admin) => void }) => {
  const [loginName, setLoginName] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      const admin = await apiLogin(loginName, password);
      toast.success("Вход выполнен");
      onLogin(admin);
    } catch {
      toast.error("Неверный логин или пароль");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 px-4">
      <form onSubmit={submit} className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm space-y-4">
        <div className="text-center mb-2">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mx-auto mb-3">
            <Icon name="Lock" size={24} className="text-white" />
          </div>
          <h1 className="text-xl font-bold text-primary">Админ-панель</h1>
          <p className="text-sm text-muted-foreground">ЛЕДИ ДРАЙВ</p>
        </div>
        <Input placeholder="Логин" value={loginName} onChange={(e) => setLoginName(e.target.value)} required />
        <Input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <Button type="submit" className="w-full" disabled={busy}>
          {busy ? "Вход…" : "Войти"}
        </Button>
        <p className="text-xs text-muted-foreground text-center">
          Первый вход: логин <b>admin</b>, задайте любой пароль — он и станет вашим.
        </p>
      </form>
    </div>
  );
};

const Admin = () => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!getToken()) { setChecking(false); return; }
    api<{ admin: Admin }>("resource=auth&action=me")
      .then((d) => setAdmin(d.admin))
      .catch(() => clearToken())
      .finally(() => setChecking(false));
  }, []);

  const logout = () => {
    clearToken();
    setAdmin(null);
  };

  if (checking) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Загрузка…</div>;
  }

  if (!admin) {
    return <LoginScreen onLogin={setAdmin} />;
  }

  return (
    <div className="min-h-screen bg-muted/40">
      <header className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="LayoutDashboard" size={22} />
            <span className="font-bold">Админ-панель ЛЕДИ ДРАЙВ</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-white/80 hidden md:inline">{admin.name}</span>
            <Button size="sm" variant="secondary" onClick={logout}>
              <Icon name="LogOut" size={14} className="mr-1" /> Выйти
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        <Tabs defaultValue="leads">
          <TabsList className="mb-4 flex-wrap h-auto">
            <TabsTrigger value="leads"><Icon name="Inbox" size={16} className="mr-1" /> Заявки</TabsTrigger>
            <TabsTrigger value="courses"><Icon name="BookOpen" size={16} className="mr-1" /> Курсы</TabsTrigger>
            <TabsTrigger value="content"><Icon name="Type" size={16} className="mr-1" /> Тексты и цены</TabsTrigger>
            <TabsTrigger value="seo"><Icon name="Search" size={16} className="mr-1" /> SEO</TabsTrigger>
          </TabsList>
          <TabsContent value="leads"><LeadsTab /></TabsContent>
          <TabsContent value="courses"><CoursesTab /></TabsContent>
          <TabsContent value="content"><ContentTab /></TabsContent>
          <TabsContent value="seo"><SeoTab /></TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
