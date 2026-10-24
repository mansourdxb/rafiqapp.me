import type { ReactNode } from "react";

/** Sidebar box of the reference ("Search", "Most viewed"). */
export function SideBox({ title, children }: { title: ReactNode; children: ReactNode }) {
  return (
    <section className="rounded-[15px] bg-[#EFEFEF] p-6 dark:bg-card">
      <h2 className="mb-4 text-2xl font-bold text-section dark:text-primary-light">{title}</h2>
      {children}
    </section>
  );
}
