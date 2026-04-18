# Drop real X / Twitter hot-take screenshots here

Expected filenames (used by `canvaPipelineSpecV2.ts` when `imageSrc` is set):
  - take_1.png   — the "Canva is dead" style take
  - take_2.png   — the "Figma is cooked" style take
  - take_3.png   — the "design tools are over" style take

Capture tips:
  - Open X / Twitter in Opera (you're already logged in)
  - Search terms: "Claude Design dead" OR "Claude Design Canva dead"
              OR "Figma cooked Claude" OR "design tools over AI"
  - Expand the tweet so you see the full card (avatar + handle + text + engagement)
  - Screenshot JUST the tweet card (crop to the card edges, no surrounding UI)
  - PNG, recommended aspect roughly 16:9 or 4:5 (any ratio works — the component scales)
  - Minimum width 800 px so it reads on mobile scrolls
  - Save here as take_1.png / take_2.png / take_3.png

If you want handles blurred: don't — keep raw, the component handles the blur visually.
If you want handles VISIBLE (some prefer real handles as proof): set `blurHandle: false`
on the corresponding event in the spec.

Once dropped in, I'll update the spec to use `imageSrc: "x_takes/take_1.png"` etc.
