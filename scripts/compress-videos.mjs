/**
 * Compress hero videos to lightweight .web.mp4 variants for faster playback.
 * Usage: node scripts/compress-videos.mjs
 */
import ffmpegPath from "@ffmpeg-installer/ffmpeg";
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const publicDir = path.join(root, "public");

const jobs = [
  {
    in: "center/VIDEO RAMOS BUSINESS CENTER.mp4",
    out: "center/VIDEO RAMOS BUSINESS CENTER.web.mp4",
  },
  {
    in: "cyber/CYBERCONTROLS.mp4",
    out: "cyber/CYBERCONTROLS.web.mp4",
  },
  {
    in: "icosium/ICOSIUM GLOBAL (1).mp4",
    out: "icosium/ICOSIUM GLOBAL.web.mp4",
  },
  {
    in: "ramos cargo/VIDEO PAGE LOGISTIC WEB.mp4",
    out: "ramos cargo/VIDEO PAGE LOGISTIC.web.mp4",
  },
  {
    in: "construction/RAMOS CONSTRUCTION (1).mp4",
    out: "construction/RAMOS CONSTRUCTION.web.mp4",
  },
  {
    in: "hero/VIDEO PAGE D'ACCEUIL RAMOS GROUP.mp4",
    out: "hero/VIDEO PAGE D'ACCEUIL RAMOS GROUP.web.mp4",
  },
];

function run(bin, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(bin, args, { stdio: "inherit" });
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`ffmpeg exited with ${code}`));
    });
  });
}

async function compress(job) {
  const input = path.join(publicDir, job.in);
  const output = path.join(publicDir, job.out);
  if (!fs.existsSync(input)) {
    console.warn("skip missing", job.in);
    return;
  }
  if (fs.existsSync(output)) {
    const inSize = fs.statSync(input).size;
    const outSize = fs.statSync(output).size;
    if (outSize > 0 && outSize < inSize * 0.9) {
      console.log("keep existing", job.out);
      return;
    }
  }
  console.log("compressing", job.in, "→", job.out);
  await run(ffmpegPath.path, [
    "-y",
    "-i",
    input,
    "-vf",
    "scale='min(1920,iw)':-2",
    "-c:v",
    "libx264",
    "-preset",
    "fast",
    "-crf",
    "28",
    "-movflags",
    "+faststart",
    "-an",
    "-pix_fmt",
    "yuv420p",
    output,
  ]);
  const before = (fs.statSync(input).size / 1e6).toFixed(1);
  const after = (fs.statSync(output).size / 1e6).toFixed(1);
  console.log(`done ${before}MB → ${after}MB`);
}

for (const job of jobs) {
  await compress(job);
}
console.log("All video jobs finished.");
