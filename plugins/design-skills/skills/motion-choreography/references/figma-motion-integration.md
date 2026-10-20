# Figma Motion Integration

Extension to `motion-choreography` SKILL.md for reading and exporting Figma
animations using `get_motion_context` and `export_video`.

---

## When to use

- Designer shares Figma prototype with animations/transitions
- "Export this Figma animation" / "capture this prototype"
- Motion review of Figma prototype
- Compare Figma motion spec vs implemented animation

---

## Workflow: Read Figma motion

### 1. Get motion context

```javascript
const motionData = await get_motion_context({
  fileKey: "extracted-from-url",
  nodeId: "frame-with-animation"
});

// Returns timeline data:
// - timelineCohorts: Animated timelines in the node
// - rootNodeId: The frame that owns the timeline
// - layers: Which layers are animated
// - properties: What animates (opacity, position, scale, etc.)
// - durations and easing curves
```

### 2. Parse animation specs

Extract from motion context:

**Duration:**
- Timeline length in milliseconds
- Per-layer animation durations

**Easing:**
- Figma easing curves (linear, ease-in, ease-out, custom bezier)
- Map to CSS easing functions or JS animation libraries

**Properties:**
- Opacity: `0 → 1` or fade directions
- Position: `x/y` translate values
- Scale: `0.8 → 1` or grow/shrink
- Rotation: degrees
- Effects: blur, shadow changes

**Sequence:**
- Which animations run simultaneously
- Which run in sequence (delays)
- Trigger conditions (on tap, on load, on hover)

### 3. Document as motion spec

Convert to standard motion spec format:

```markdown
## Motion spec — [component name]

**Source:** [Figma prototype URL]

**Trigger:** [On tap / On load / On state change]

**Duration:** 300ms

**Easing:** ease-out (cubic-bezier(0.2, 0.8, 0.2, 1))

**Properties:**
- Opacity: 0 → 1
- Transform: translateY(16px) → translateY(0)
- Scale: 0.95 → 1

**Sequence:**
1. Fade + slide (simultaneous, 0ms delay)
2. Scale (sequential, 100ms delay)

**Reduced motion:** Instant appearance, no transform
```

### 4. Compare with implementation

If code already exists:
- Read implemented animation (CSS transitions, JS libraries)
- Compare durations, easing, properties
- Flag differences: "Figma: 300ms ease-out, Code: 200ms linear"

---

## Workflow: Export Figma animation

### 1. Identify timeline frame

```javascript
// The nodeId must be the top-level frame owning the timeline
// In design files: frame on the page or in a section
// In Slides: the slide itself, not a layer inside it

const motionData = await get_motion_context({ fileKey, nodeId });
const rootFrameId = motionData.timelineCohorts[0].rootNodeId;
```

### 2. Export as video

```javascript
const video = await export_video({
  fileKey: "prototype-file-key",
  nodeId: rootFrameId,  // Top-level timeline frame
  fps: 60,              // 5-60 fps
  quality: "high",      // low | medium | high
  constraint: {
    type: "WIDTH",      // SCALE | WIDTH | HEIGHT
    value: 1920         // Pixel width for video
  }
});

// Returns:
// {
//   url: "presigned-download-url",
//   status: "ready" | "processing",
//   jobId: "...",  // For polling if still processing
//   availableUntil: "timestamp"
// }
```

### 3. Poll if processing

```javascript
// If status is "processing", wait 10-15s and poll:
const result = await export_video({
  fileKey,
  jobId: video.jobId  // Don't pass nodeId when polling
});

// When status === "ready", download from url
```

### 4. Save video

```bash
# Download video from presigned URL
curl -o motion-export.mp4 "<video.url>"

# Save to project artifacts
mv motion-export.mp4 projects/<slug>/artifacts/motion/[component-name]-YYYY-MM-DD.mp4
```

### 5. Document export

In `projects/<slug>/findings.md` or motion spec:

```markdown
### Motion reference — [component name]

**Figma prototype:** [URL with node-id]

**Exported video:** `artifacts/motion/sheet-open-transition-2026-08-27.mp4`

**Specs derived from video:**
- Duration: 300ms (measured)
- Easing: ease-out (observed)
- Properties: opacity, translateY, scale

**Implementation status:**
- [ ] Duration matches Figma
- [ ] Easing matches Figma
- [ ] Properties match Figma
- [ ] Reduced motion alternative exists
```

---

## Motion comparison workflow

When both Figma prototype and code exist:

### 1. Export Figma animation
- Save to `artifacts/motion/[name]-figma.mp4`

### 2. Record implemented animation
- Use browser DevTools Performance → record interaction
- Or use screen recording of live implementation
- Save to `artifacts/motion/[name]-code.mp4`

### 3. Side-by-side comparison
- Play both videos
- Measure: duration, easing feel, smoothness
- Document differences

### 4. Report findings

```markdown
## Motion comparison — [component name]

| Property | Figma | Code | Match? |
|---|---|---|---|
| Duration | 300ms | 250ms | ❌ |
| Easing | ease-out | ease-in-out | ❌ |
| Opacity | 0 → 1 | 0 → 1 | ✓ |
| Transform | translateY(16px) | translateY(20px) | ❌ |
| Reduced motion | Instant | Instant | ✓ |

**Recommendations:**
1. Update code duration from 250ms → 300ms
2. Change easing to match Figma: cubic-bezier(0.2, 0.8, 0.2, 1)
3. Adjust transform to match 16px offset
```

---

## Integration with motion-choreography modes

### Mode 1 (Spec):
- Read Figma prototype with `get_motion_context`
- Export video with `export_video` as reference
- Write spec based on Figma timeline

### Mode 2 (Review):
- Export Figma prototype and code implementation
- Compare side-by-side
- Report differences

### Mode 3 (Opportunities):
- Review Figma prototype
- Identify which animations are implemented
- Suggest missing animations from prototype

### Mode 4 (Audit):
- Export all animated prototypes
- Compare with implemented animations
- Prioritize fixes based on motion-standards.md

---

## Edge cases

**Long animations (> 10s):**
- Export may take time (polls required)
- Split into segments if Figma has multiple timeline segments
- Consider exporting key moments only

**Interactive prototypes:**
- Figma prototypes can have branching flows
- Export each flow state separately
- Document which interactions trigger which animations

**Multi-frame timelines:**
- Export each frame's timeline separately
- Document sequence: Frame A → Frame B transition

**Slides presentations:**
- NodeId must be the slide itself, not a layer
- Export each slide with animations
- Document slide transitions vs layer animations

**Low-quality exports:**
- Increase `quality` to "high"
- Increase `fps` to 60 for smooth motion
- Adjust `constraint` for better resolution

---

## Output files

```
projects/<slug>/artifacts/motion/
├── [component]-figma-2026-08-27.mp4        # Exported from Figma
├── [component]-code-2026-08-27.mp4         # Recorded from implementation
├── [component]-motion-spec.md              # Written spec
└── comparison-report-2026-08-27.md         # Side-by-side findings
```

---

## Forbidden

- Never export video without checking it's a timeline frame
- Never assume motion specs from video alone (read motion context first)
- Never commit large video files to git (keep in gitignored artifacts/)
- Never skip reduced-motion alternatives
