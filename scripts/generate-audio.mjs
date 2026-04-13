import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { spawnSync } from "node:child_process";

const projectRoot = path.resolve(new URL("..", import.meta.url).pathname);
const appPath = path.join(projectRoot, "app.js");
const audioDir = path.join(projectRoot, "assets", "audio");
const edgeTtsPath = path.join(projectRoot, ".venv", "bin", "edge-tts");
const voice = process.argv[2] || "kk-KZ-AigulNeural";

const source = fs.readFileSync(appPath, "utf8");
const stateIndex = source.indexOf("const state =");

if (stateIndex === -1) {
  throw new Error("Could not locate card definitions in app.js");
}

const snippet = `${source.slice(0, stateIndex)}\n({ TYPE_META, CARDS });`;
const { TYPE_META, CARDS } = vm.runInNewContext(snippet, {}, { timeout: 1000 });

fs.mkdirSync(audioDir, { recursive: true });

const manifest = {};

for (const card of CARDS) {
  const text = `${card.spoken}. ${TYPE_META[card.type].speech}`;
  const outputPath = path.join(audioDir, `${card.id}.mp3`);

  console.log(`Generating ${card.id}.mp3`);

  const result = spawnSync(
    edgeTtsPath,
    [
      "--voice",
      voice,
      "--rate=-8%",
      "--text",
      text,
      "--write-media",
      outputPath,
    ],
    {
      cwd: projectRoot,
      encoding: "utf8",
    }
  );

  if (result.status !== 0) {
    throw new Error(
      `edge-tts failed for ${card.id}: ${result.stderr || result.stdout || "unknown error"}`
    );
  }

  manifest[card.id] = {
    text,
    src: `assets/audio/${card.id}.mp3`,
  };
}

fs.writeFileSync(
  path.join(audioDir, "manifest.json"),
  JSON.stringify(
    {
      voice,
      generatedAt: new Date().toISOString(),
      cards: manifest,
    },
    null,
    2
  )
);

console.log(`Generated ${CARDS.length} audio files using ${voice}`);
