import { mkdir, writeFile } from "node:fs/promises";

const outDir = new URL("../assets/projects/", import.meta.url);

const cards = [
  {
    slug: "syndicate-ai",
    label: "AI PRODUCT",
    title: "Syndicate AI",
    line1: "A live AI war room for",
    line2: "system design",
    accent: "#8B5CF6",
    accent2: "#58A6FF",
    stacks: ["React", "TypeScript", "Convex"],
    diagram: "operators",
  },
  {
    slug: "primer-ai",
    label: "BROWSER PRODUCT",
    title: "Primer AI",
    line1: "Sourced company intelligence",
    line2: "from any webpage",
    accent: "#2DD4BF",
    accent2: "#58A6FF",
    stacks: ["React", "WXT", "Cloudflare"],
    diagram: "brief",
  },
  {
    slug: "signal-desk",
    label: "AI PRODUCT",
    title: "Signal Desk",
    line1: "Explainable relevance ranking",
    line2: "for technology news",
    accent: "#58A6FF",
    accent2: "#F97316",
    stacks: ["Next.js", "TypeScript", "Drizzle"],
    diagram: "signals",
  },
  {
    slug: "evidence-first-rag",
    label: "AI SYSTEM",
    title: "Evidence First RAG",
    line1: "Evidence-gated retrieval with",
    line2: "failure routing and citations",
    accent: "#F59E0B",
    accent2: "#58A6FF",
    stacks: ["Python", "BM25", "Evals"],
    diagram: "pipeline",
  },
  {
    slug: "eval-driven-messaging",
    label: "EVALUATION SYSTEM",
    title: "Eval-Driven Messaging",
    line1: "Offline prompt evaluation with",
    line2: "graders and holdout cases",
    accent: "#C026D3",
    accent2: "#F97316",
    stacks: ["Python", "LLM evals", "Anthropic"],
    diagram: "evals",
  },
  {
    slug: "workspace-as-context",
    label: "DEVELOPER TOOL",
    title: "Workspace as Context",
    line1: "Plain-text context architecture",
    line2: "for humans and AI agents",
    accent: "#14B8A6",
    accent2: "#8B5CF6",
    stacks: ["Python", "Markdown", "Obsidian"],
    diagram: "layers",
  },
];

const diagrams = {
  operators: (a, b) => `
    <g transform="translate(555 150)">
      <circle r="35" fill="#151C31" stroke="${a}" stroke-width="3"/>
      <circle r="11" fill="${a}"/>
      ${[[0,-82],[77,-26],[48,68],[-48,68],[-77,-26]].map(([x,y],i) => `<path d="M0 0L${x} ${y}" stroke="#344763" stroke-width="2"/><circle cx="${x}" cy="${y}" r="19" fill="#101827" stroke="${i % 2 ? b : a}" stroke-width="2"/><circle cx="${x}" cy="${y}" r="5" fill="${i % 2 ? b : a}"/>`).join("")}
    </g>`,
  brief: (a, b) => `
    <g transform="translate(430 74) scale(.95)">
      <rect x="0" y="24" width="112" height="78" rx="13" fill="#111B2B" stroke="${b}" stroke-width="2"/>
      <rect x="15" y="43" width="62" height="7" rx="3.5" fill="${b}" opacity=".9"/>
      <rect x="15" y="61" width="78" height="6" rx="3" fill="#51647F"/>
      <rect x="15" y="77" width="52" height="6" rx="3" fill="#3B4B63"/>
      <path d="M121 63H163" stroke="#435A78" stroke-width="3" stroke-dasharray="5 5"/>
      <path d="M154 52L166 63L154 74" fill="none" stroke="${a}" stroke-width="3"/>
      <rect x="176" y="0" width="142" height="128" rx="17" fill="#101D29" stroke="${a}" stroke-width="2"/>
      <circle cx="202" cy="27" r="8" fill="${a}"/>
      <rect x="220" y="21" width="73" height="10" rx="5" fill="#D9F7F1" opacity=".85"/>
      <rect x="196" y="50" width="95" height="7" rx="3.5" fill="#63778B"/>
      <rect x="196" y="69" width="106" height="7" rx="3.5" fill="#405366"/>
      <rect x="196" y="88" width="73" height="7" rx="3.5" fill="#405366"/>
      <circle cx="289" cy="107" r="6" fill="${b}"/>
    </g>`,
  signals: (a, b) => `
    <g transform="translate(420 58) scale(.95)">
      ${[[0,34,"HN"],[0,97,"TM"],[0,160,"X"]].map(([x,y,t],i)=>`<circle cx="${x+26}" cy="${y}" r="21" fill="#131F32" stroke="${i===2?b:a}" stroke-width="2"/><text x="${x+26}" y="${y+5}" text-anchor="middle" fill="#D8E4F3" font-family="Inter,Segoe UI,sans-serif" font-size="12" font-weight="800">${t}</text><path d="M48 ${y}H92" stroke="#3B506C" stroke-width="2"/>`).join("")}
      <g transform="translate(100 5)">
        ${[0,58,116].map((y,i)=>`<rect x="0" y="${y}" width="215" height="46" rx="12" fill="#101A2B" stroke="${i===0?a:"#293A53"}" stroke-width="2"/><rect x="14" y="${y+13}" width="${130-i*22}" height="7" rx="3.5" fill="${i===0?a:"#536781"}"/><rect x="14" y="${y+28}" width="${78+i*20}" height="5" rx="2.5" fill="#34465E"/><text x="185" y="${y+29}" text-anchor="middle" fill="${i===0?b:"#7590B1"}" font-family="Fira Code,Consolas,monospace" font-size="12" font-weight="700">${[92,78,64][i]}</text>`).join("")}
      </g>
    </g>`,
  pipeline: (a, b) => `
    <g transform="translate(410 98) scale(.92)">
      ${[{x:0,t:"QUERY"},{x:92,t:"BM25"},{x:184,t:"EVIDENCE"},{x:276,t:"ANSWER"}].map((n,i)=>`<rect x="${n.x}" y="32" width="76" height="58" rx="13" fill="#121C2D" stroke="${i===2?a:i===3?b:"#334763"}" stroke-width="2"/><text x="${n.x+38}" y="66" text-anchor="middle" fill="#D7E3F2" font-family="Fira Code,Consolas,monospace" font-size="10" font-weight="700">${n.t}</text>${i<3?`<path d="M${n.x+76} 61H${n.x+88}" stroke="#526985" stroke-width="2"/><path d="M${n.x+84} 56L${n.x+90} 61L${n.x+84} 66" fill="none" stroke="#526985" stroke-width="2"/>`:""}`).join("")}
      <path d="M222 118L235 130L258 105" fill="none" stroke="${a}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="242" y="151" text-anchor="middle" fill="#8CA0BA" font-family="Inter,Segoe UI,sans-serif" font-size="12">claim-level citations</text>
    </g>`,
  evals: (a, b) => `
    <g transform="translate(405 70) scale(.89)">
      ${[0,53,106].map((y,i)=>`<rect x="0" y="${y}" width="104" height="38" rx="10" fill="#151A2B" stroke="${i===1?a:"#3A4561"}" stroke-width="2"/><text x="52" y="${y+24}" text-anchor="middle" fill="#D8E0EF" font-family="Fira Code,Consolas,monospace" font-size="11">PROMPT ${i+1}</text><path d="M104 ${y+19}H139" stroke="#415473" stroke-width="2"/>`).join("")}
      <rect x="145" y="36" width="92" height="92" rx="18" fill="#22162C" stroke="${a}" stroke-width="2"/>
      <text x="191" y="75" text-anchor="middle" fill="#F1D8F7" font-family="Inter,Segoe UI,sans-serif" font-size="12" font-weight="800">GRADERS</text>
      <text x="191" y="99" text-anchor="middle" fill="#A979B3" font-family="Fira Code,Consolas,monospace" font-size="10">holdout set</text>
      <path d="M237 82H274" stroke="#4D5E7A" stroke-width="2"/><path d="M266 76L275 82L266 88" fill="none" stroke="${b}" stroke-width="2"/>
      <rect x="282" y="25" width="87" height="114" rx="16" fill="#151C2C" stroke="${b}" stroke-width="2"/>
      ${[0,1,2,3].map((_,i)=>`<rect x="299" y="${46+i*20}" width="${[50,38,55,44][i]}" height="8" rx="4" fill="${i===2?a:b}" opacity="${1-i*.12}"/>`).join("")}
    </g>`,
  layers: (a, b) => `
    <g transform="translate(410 55) scale(.84)">
      <g transform="translate(0 32)">
        <path d="M0 18H76L88 30V102H0Z" fill="#121E2E" stroke="${b}" stroke-width="2"/>
        <path d="M0 18H40L50 4H88V30H0Z" fill="#172A42" stroke="${b}" stroke-width="2"/>
        <text x="44" y="67" text-anchor="middle" fill="#CAD9EA" font-family="Fira Code,Consolas,monospace" font-size="11">EVIDENCE</text>
      </g>
      <path d="M98 82H139" stroke="#405674" stroke-width="2"/><path d="M130 76L140 82L130 88" fill="none" stroke="#405674" stroke-width="2"/>
      <g transform="translate(150 20)">
        <circle cx="58" cy="66" r="24" fill="#142231" stroke="${a}" stroke-width="2"/>
        ${[[12,20],[101,18],[112,101],[10,108]].map(([x,y],i)=>`<path d="M58 66L${x} ${y}" stroke="#3D556F" stroke-width="2"/><circle cx="${x}" cy="${y}" r="12" fill="#131C2B" stroke="${i%2?a:b}" stroke-width="2"/>`).join("")}
        <text x="58" y="70" text-anchor="middle" fill="#D4EEE9" font-family="Fira Code,Consolas,monospace" font-size="11">WIKI</text>
      </g>
      <path d="M273 86H309" stroke="#405674" stroke-width="2"/><path d="M300 80L310 86L300 92" fill="none" stroke="#405674" stroke-width="2"/>
      <g transform="translate(319 45)">
        <rect x="0" y="0" width="64" height="42" rx="9" fill="#171A31" stroke="${b}" stroke-width="2"/>
        <rect x="14" y="58" width="64" height="42" rx="9" fill="#121F2C" stroke="${a}" stroke-width="2"/>
        <text x="32" y="26" text-anchor="middle" fill="#D7D8F6" font-family="Fira Code,Consolas,monospace" font-size="9">PROJECT</text>
        <text x="46" y="84" text-anchor="middle" fill="#D1EEE9" font-family="Fira Code,Consolas,monospace" font-size="9">PROJECT</text>
      </g>
    </g>`,
};

function chip(text, x, accent) {
  const width = Math.max(62, text.length * 8 + 22);
  return {
    width,
    svg: `<rect x="${x}" y="251" width="${width}" height="30" rx="15" fill="#151F31" stroke="${accent}" stroke-opacity=".55"/><text x="${x + width / 2}" y="271" text-anchor="middle" fill="#AFC0D6" font-family="Fira Code,Consolas,monospace" font-size="11" font-weight="700">${text}</text>`,
  };
}

function cardSvg(card) {
  let x = 36;
  const chips = card.stacks.map((stack) => {
    const result = chip(stack, x, card.accent);
    x += result.width + 10;
    return result.svg;
  }).join("");

  const titleSize = card.title.length > 19 ? 31 : 38;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="760" height="320" viewBox="0 0 760 320" role="img" aria-labelledby="title desc">
  <title id="title">${card.title}</title>
  <desc id="desc">${card.line1} ${card.line2}</desc>
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#0B101C"/><stop offset="1" stop-color="#111C2D"/></linearGradient>
    <linearGradient id="bar" x1="0" y1="0" x2="1" y2="0"><stop stop-color="${card.accent}"/><stop offset="1" stop-color="${card.accent2}"/></linearGradient>
    <radialGradient id="glow"><stop stop-color="${card.accent}" stop-opacity=".2"/><stop offset="1" stop-color="${card.accent}" stop-opacity="0"/></radialGradient>
    <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse"><path d="M28 0H0V28" fill="none" stroke="#6D89AE" stroke-opacity=".055"/></pattern>
  </defs>
  <rect x="1" y="1" width="758" height="318" rx="22" fill="url(#bg)" stroke="#2D3D56" stroke-width="2"/>
  <rect x="1" y="1" width="758" height="318" rx="22" fill="url(#grid)"/>
  <circle cx="610" cy="130" r="190" fill="url(#glow)"/>
  <rect x="0" y="0" width="8" height="320" rx="4" fill="url(#bar)"/>
  <g transform="translate(36 32)">
    <rect width="${card.label.length * 8.3 + 28}" height="30" rx="15" fill="#172235" stroke="${card.accent}" stroke-opacity=".75"/>
    <circle cx="16" cy="15" r="4" fill="${card.accent}"/>
    <text x="28" y="20" fill="#AFC1D8" font-family="Inter,Segoe UI,sans-serif" font-size="11" font-weight="800" letter-spacing="1.25">${card.label}</text>
  </g>
  <text x="36" y="116" fill="#F7FAFC" font-family="Inter,Segoe UI,sans-serif" font-size="${titleSize}" font-weight="800">${card.title}</text>
  <text x="36" y="158" fill="#AFC0D4" font-family="Inter,Segoe UI,sans-serif" font-size="17" font-weight="500">${card.line1}</text>
  <text x="36" y="184" fill="#7F94AF" font-family="Inter,Segoe UI,sans-serif" font-size="17">${card.line2}</text>
  ${chips}
  ${diagrams[card.diagram](card.accent, card.accent2)}
</svg>`;
}

await mkdir(outDir, { recursive: true });
for (const card of cards) {
  await writeFile(new URL(`${card.slug}.svg`, outDir), cardSvg(card), "utf8");
}

console.log(`Generated ${cards.length} project cards.`);
