import funcUrls from "../../backend/func2url.json";

export const LEAD_COOKIE = "ld_lead_submitted";

export function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
}

export function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
}

export function hasSubmittedLead(): boolean {
  return getCookie(LEAD_COOKIE) === "1";
}

interface LeadPayload {
  name: string;
  phone: string;
  source?: string;
}

export async function submitLead({ name, phone, source = "landing" }: LeadPayload) {
  const pageParams = new URLSearchParams(window.location.search);

  const url = new URL(
    "https://gosavtoschool.bitrix24.ru/rest/45768/9nij678yep7wc72c/crm.lead.add.json",
  );
  url.searchParams.set("FIELDS[STATUS_ID]", "NEW");
  url.searchParams.set("FIELDS[NAME]", name);
  url.searchParams.set("FIELDS[PHONE][0][VALUE]", phone);
  url.searchParams.set("FIELDS[PHONE][0][VALUE_TYPE]", "WORK");
  url.searchParams.set("FIELDS[UF_CRM_1612510024]", "702");
  url.searchParams.set("FIELDS[SOURCE_ID]", "11");
  url.searchParams.set("FIELDS[UF_CRM_1611737507]", "646");
  url.searchParams.set("FIELDS[TITLE]", `${name} ${phone}`);
  const utmFields: Record<string, string> = {
    "FIELDS[UTM_SOURCE]": "utm_source",
    "FIELDS[UTM_MEDIUM]": "utm_medium",
    "FIELDS[UTM_CAMPAIGN]": "utm_campaign",
    "FIELDS[UTM_CONTENT]": "utm_content",
    "FIELDS[UTM_TERM]": "utm_term",
  };
  for (const [field, param] of Object.entries(utmFields)) {
    const value = pageParams.get(param);
    if (value) url.searchParams.set(field, value);
  }

  try {
    await fetch(url.toString());
  } catch (err) {
    console.error(err);
  }

  try {
    await fetch(`${funcUrls["admin-auth"]}?resource=public&action=lead`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        phone,
        source,
        utm_source: pageParams.get("utm_source"),
        utm_medium: pageParams.get("utm_medium"),
        utm_campaign: pageParams.get("utm_campaign"),
        utm_content: pageParams.get("utm_content"),
        utm_term: pageParams.get("utm_term"),
      }),
    });
  } catch (err) {
    console.error(err);
  }

  setCookie(LEAD_COOKIE, "1", 30);
}
