"use client";
// Today's adhkar progress, saved on this device. A new day starts empty.
import { useMemo } from "react";
import { today, useStored } from "./store";

type Saved = { day: string; cats: Record<string, number[]>; done: number[] };
const EMPTY: Saved = { day: "", cats: {}, done: [] };

export function useAthkarProgress() {
  const [saved, setSaved] = useStored<Saved>("rafiq:athkar:progress", EMPTY);
  const day = today();
  const current = useMemo(() => (saved.day === day ? saved : { ...EMPTY, day }), [saved, day]);

  /** Saves the per-dhikr counts of one category; `complete` marks it done for today. */
  const save = (id: number, counts: number[], complete: boolean) =>
    setSaved((prev) => {
      const base = prev.day === day ? prev : { ...EMPTY, day };
      const done = base.done.filter((d) => d !== id);
      return { day, cats: { ...base.cats, [id]: counts }, done: complete ? [...done, id] : done };
    });

  return { cats: current.cats, done: current.done, save };
}
