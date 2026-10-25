// After `next build`: drops files from out/ that the browser never requests, to stay under the
// 1 GB GitHub Pages limit.
//
// `__next._full.txt` is written next to every page by the segment prefetcher, but it is a byte-for-byte
// copy of the page's `index.txt` (the RSC payload). The client router never asks for it: client-side
// navigation fetches `index.txt`, and prefetches fetch the other `__next.*.txt` segment files, which stay.
import { readdirSync, statSync, unlinkSync } from "node:fs";
import { join } from "node:path";

let files = 0;
let bytes = 0;
function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p);
    else if (name === "__next._full.txt") {
      bytes += st.size;
      files++;
      unlinkSync(p);
    }
  }
}
walk("out");
console.log(`trim: removed ${files} __next._full.txt files (${(bytes / 1e6).toFixed(1)} MB)`);
