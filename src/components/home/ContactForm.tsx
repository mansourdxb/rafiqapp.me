"use client";

import { useState } from "react";
import { CONTACT_EMAIL } from "@/lib/stores";

/** One rounded field + Send, like the reference. A static site has no server: Send opens the mail app. */
export function ContactForm({ placeholder, send, siteName }: { placeholder: string; send: string; siteName: string }) {
  const [msg, setMsg] = useState("");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(siteName)}&body=${encodeURIComponent(msg)}`;
  };
  return (
    <form onSubmit={submit} className="flex h-[70px] w-full items-center gap-2 rounded-full bg-white p-2.5 ps-6 shadow-sm">
      <input
        required
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent text-sm font-bold text-section placeholder:text-section focus:outline-none"
      />
      <button type="submit" className="h-full shrink-0 rounded-full bg-navy px-8 text-sm font-bold text-white hover:bg-navy-2">
        {send}
      </button>
    </form>
  );
}
