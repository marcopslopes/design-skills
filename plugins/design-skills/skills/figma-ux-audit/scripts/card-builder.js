// ─────────────────────────────────────────────────────────────────────────────
// Figma UX Audit — Card Builder Helpers
// Inject this entire file as the first block of any execute_code call.
// Requires: Inter Regular, Bold, and Semi Bold fonts already loaded.
// Requires: `page` set to figma.currentPage before calling any function.
// ─────────────────────────────────────────────────────────────────────────────

// Severity colour definitions
// Each entry: a = accent (header bg + border), bg = card background
const C = {
  high:   { a: { r: .85, g: .15, b: .15 }, bg: { r: 1,   g: .93, b: .93 }, e: "🔴" },
  medium: { a: { r: .85, g: .45, b: .0  }, bg: { r: 1,   g: .96, b: .89 }, e: "🟠" },
  low:    { a: { r: .1,  g: .45, b: .75 }, bg: { r: .93, g: .96, b: 1   }, e: "🔵" },
};

// ── card() ───────────────────────────────────────────────────────────────────
// Creates and places a single annotation card frame at (x, y).
//
// Parameters:
//   x, y   — top-left position on the page canvas
//   sev    — "high" | "medium" | "low"
//   tag    — header tag string after the severity emoji, e.g. "FLOW · No confirmation"
//   title  — bold title shown in card body (one line)
//   body   — descriptive text (2–4 sentences, may contain a URL at the end)
//
// Returns the created frame node (useful for adding hyperlinks to body text).

function card(x, y, sev, tag, title, body) {
  const { a, bg } = C[sev];
  const W = 340;   // card width
  const P = 10;    // horizontal padding
  const TW = 320;  // text width = W - 2*P

  // Outer frame
  const f = figma.createFrame();
  f.name = `[${sev.toUpperCase()}] ${title}`;
  f.x = x;
  f.y = y;
  f.resize(W, 200);                        // resize BEFORE setting AUTO
  f.layoutMode = "VERTICAL";
  f.primaryAxisSizingMode = "AUTO";        // height grows with content
  f.counterAxisSizingMode = "FIXED";       // width stays at W
  f.itemSpacing = 0;
  f.paddingLeft = f.paddingRight = f.paddingTop = f.paddingBottom = 0;
  f.cornerRadius = 8;
  f.fills = [{ type: "SOLID", color: bg }];
  f.strokes = [{ type: "SOLID", color: a }];
  f.strokeWeight = 2;
  f.clipsContent = false;
  page.appendChild(f);

  // Header band — children[0]
  const h = figma.createFrame();
  h.resize(W, 32);
  h.layoutMode = "HORIZONTAL";
  h.primaryAxisSizingMode = "AUTO";
  h.counterAxisSizingMode = "FIXED";
  h.fills = [{ type: "SOLID", color: a }];
  h.paddingLeft = h.paddingRight = P;
  h.paddingTop = h.paddingBottom = 0;
  h.counterAxisAlignItems = "CENTER";
  h.cornerRadius = 6;
  f.appendChild(h);

  const ht = figma.createText();
  ht.fontName = { family: "Inter", style: "Bold" };
  ht.fontSize = 11;
  ht.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  ht.textAutoResize = "WIDTH_AND_HEIGHT";
  h.appendChild(ht);
  ht.characters = `${C[sev].e} ${sev.toUpperCase()} · ${tag}`;

  // Body frame — children[1]
  const bf = figma.createFrame();
  bf.resize(W, 100);
  bf.layoutMode = "VERTICAL";
  bf.primaryAxisSizingMode = "AUTO";
  bf.counterAxisSizingMode = "FIXED";
  bf.fills = [];
  bf.paddingLeft = bf.paddingRight = P;
  bf.paddingTop = 8;
  bf.paddingBottom = 10;
  bf.itemSpacing = 4;
  f.appendChild(bf);

  // Title text — children[1].children[0]
  const tT = figma.createText();
  tT.fontName = { family: "Inter", style: "Semi Bold" };
  tT.fontSize = 12;
  tT.fills = [{ type: "SOLID", color: { r: .1, g: .1, b: .1 } }];
  bf.appendChild(tT);
  tT.resize(TW, 20);             // resize BEFORE textAutoResize
  tT.textAutoResize = "HEIGHT";
  tT.characters = title;

  // Body text — children[1].children[1]
  const bT = figma.createText();
  bT.fontName = { family: "Inter", style: "Regular" };
  bT.fontSize = 11;
  bT.fills = [{ type: "SOLID", color: { r: .2, g: .2, b: .2 } }];
  bT.lineHeight = { value: 16, unit: "PIXELS" };
  bf.appendChild(bT);
  bT.resize(TW, 20);             // resize BEFORE textAutoResize
  bT.textAutoResize = "HEIGHT";
  bT.characters = body;

  return f;
}

// ── cH() — horizontal dotted connector ───────────────────────────────────────
// Draws a horizontal dashed line from the right edge of a screen to a card.
//
// Parameters:
//   sc  — screen bounding box { x, y, w, h }
//   cx  — card's left x position
//   cy  — card's top y position (line will be drawn at cy + 16, i.e. header centre)

function cH(sc, cx, cy) {
  const lw = cx - (sc.x + sc.w);
  if (lw <= 0) return;
  const ln = figma.createLine();
  page.appendChild(ln);
  ln.name = "annotation-connector";
  ln.x = sc.x + sc.w;
  ln.y = cy + 16;
  ln.resize(lw, 0);
  ln.strokeWeight = 1;
  ln.strokes = [{ type: "SOLID", color: { r: .5, g: .5, b: .5 } }];
  ln.dashPattern = [4, 4];
  ln.opacity = 0.6;
}

// ── cV() — vertical rectangle connector ──────────────────────────────────────
// Draws a thin vertical rectangle from the bottom of a card to the top of a screen.
// Used when cards are placed above a screen.
//
// Parameters:
//   sc  — screen bounding box { x, y, w, h }
//   cx  — card's left x position (line centred at cx + 170, i.e. card horizontal centre)
//   cy  — card's top y position

function cV(sc, cx, cy) {
  const lx = Math.round(cx + 170);
  const lt = cy + 215;           // approximate card bottom (card ~200–220px tall)
  const lb = sc.y - 6;
  const h = lb - lt;
  if (h < 4) return;
  const r = figma.createRectangle();
  r.name = "annotation-connector";
  r.x = lx;
  r.y = lt;
  r.resize(2, h);
  r.fills = [{ type: "SOLID", color: { r: .5, g: .5, b: .5 } }];
  r.opacity = 0.45;
  page.appendChild(r);
}

// ── ri() — right-inline placement shorthand ───────────────────────────────────
// Places a card to the RIGHT of a screen and draws a horizontal connector.
//
// Parameters:
//   sc    — screen bounding box { x, y, w, h }
//   dy    — vertical offset from screen top (use 0 for first card, ~220 per additional card)
//   sev   — "high" | "medium" | "low"
//   tag   — header tag string
//   title — card title
//   body  — card body text

function ri(sc, dy, sev, tag, title, body) {
  const cx = sc.x + sc.w + 36;
  const cy = sc.y + dy;
  card(cx, cy, sev, tag, title, body);
  cH(sc, cx, cy);
}

// ── ab() — above placement shorthand ─────────────────────────────────────────
// Places a card ABOVE a screen and draws a vertical connector.
//
// Parameters:
//   sc    — screen bounding box { x, y, w, h }
//   stack — vertical stack index (0 = closest to screen, 1 = one row higher, etc.)
//   sev   — "high" | "medium" | "low"
//   tag   — header tag string
//   title — card title
//   body  — card body text

function ab(sc, stack, sev, tag, title, body) {
  const cx = sc.x + sc.w / 2 - 170;    // horizontally centred above screen
  const cy = sc.y - 290 - stack * 220;  // stacked upward
  card(cx, cy, sev, tag, title, body);
  cV(sc, cx, cy);
}

// ── deepDelete() — remove all annotation cards and connectors ─────────────────
// Recursively removes all annotation cards ([HIGH]/[MEDIUM]/[LOW] frames)
// and connector lines/rectangles from the current page.
// Call this at the top of any placement script to start clean.

function deepDelete(node) {
  if (!("children" in node)) return;
  for (const child of [...node.children]) {
    if (
      child.name &&
      (/^\[(HIGH|MEDIUM|LOW)\]/.test(child.name) || child.name === "annotation-connector")
    ) {
      child.remove();
    } else if ("children" in child) {
      deepDelete(child);
    }
  }
}
