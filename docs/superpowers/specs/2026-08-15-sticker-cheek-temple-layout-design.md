# Sticker Cheek and Temple Layout

## Goal

Refine the five-sticker face layout without changing the existing character, résumé transitions, camera movement, or animation timing.

## Layout

- Move `sticker5` from above the left eyebrow to the left outer cheek.
- Move `sticker2` from above the right eyebrow to the right outer cheek.
- Move `sticker6` (`CHONGQING`) from the center forehead to the screen-right temple.
- Keep `sticker0` and `sticker1` in their current lower-cheek positions.
- Keep the total sticker count at five.

## Surface Fit

Every sticker vertex will be projected onto the front character surface and offset by approximately `0.003` along the local surface normal. This keeps the graphics visually attached while preventing z-fighting.

## Animation and Focus

The existing focus mapping remains unchanged:

- `focus-3` follows `sticker5` on the left cheek.
- `focus-4` follows `sticker2` on the right cheek.
- `focus-5` follows `sticker6` on the screen-right temple.

Camera and character actions, frame range, and web transition timing remain unchanged.

## Verification

- Confirm exactly five sticker objects remain.
- Confirm all five focus anchors match their sticker geometry centers.
- Confirm sticker-to-surface gaps remain near `0.003`.
- Preview the home/front composition and résumé focus sections in the browser.
- Run the web typecheck and production build.
