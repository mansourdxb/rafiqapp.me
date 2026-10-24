"use client";

import { useState } from "react";
import { CONTACT_EMAIL } from "@/lib/stores";

type Labels = { name: string; email: string; message: string; send: string };

/** No server on a static site: the form opens the visitor's mail app with the message filled in. */
export function ContactForm({ labels, siteName }: { labels: Labels; siteName: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `${msg}\n\n— ${name}${email ? ` <${email}>` : ""}`;
    location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(siteName)}&body=${encodeURIComponent(body)}`;
  };

  const field = "w-full rounded-2xl border-0 bg-white/95 px-4 py-3 text-ink placeholder:text-ink-2 focus:outline-none focus:ring-2 focus:ring-orange dark:bg-white/10 dark:text-white";
  return (
    <form onSubmit={submit} className="grid gap-3 sm:grid-cols-2">
      <input className={field} placeholder={labels.name} value={name} onChange={(e) => setName(e.target.value)} />
      <input className={field} type="email" placeholder={labels.email} value={email} onChange={(e) => setEmail(e.target.value)} />
      <textarea
        required
        rows={4}
        className={`${field} sm:col-span-2`}
        placeholder={labels.message}
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
      />
      <button type="submit" className="justify-self-start rounded-full bg-navy px-8 py-3 font-bold text-white transition hover:bg-navy-2">
        {labels.send}
      </button>
    </form>
  );
}
