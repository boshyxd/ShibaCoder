# ShibaCoder Asset Generation Guide

## PixelLab API Integration

We'll use [PixelLab AI](https://www.pixellab.ai/pixellab-api) to generate all pixel art assets for ShibaCoder.

### API Overview
- **Authentication**: Required (sign up at https://api.pixellab.ai/v1/docs)
- **Models**: Pixflux (up to 400x400px) or Bitforge (up to 200x200px)
- **Cost**: ~$0.008 per 64x64 image

### Sprite Generation Process

#### 1. Static Sprites (64x64 pixels)
Generate individual frames using Pixflux:

```
Prompt examples:
- "Cute orange Shiba Inu dog sitting, pixel art, 64x64, side view"
- "Orange Shiba Inu typing on keyboard, pixel art, 64x64, side view"
- "Decorative golden border frame, pixel art, ornate leaderboard style"
- "ShibaCoder logo with orange Shiba Inu mascot, pixel art, 256x256"
```

#### 2. Animation Frames
For animated sprites, generate sequential frames with consistent style:

##### Idle Animation (4 frames)
- `idle1.png` - Sitting, eyes open
- `idle2.png` - Sitting, eyes half-closed
- `idle3.png` - Sitting, eyes closed
- `idle4.png` - Sitting, eyes half-closed

##### Attack/Coding Animation (6 frames)
- `attack1.png` - Paws up, ready to type
- `attack2.png` - Left paw down on keyboard
- `attack3.png` - Right paw down on keyboard
- `attack4.png` - Both paws typing fast
- `attack5.png` - Left paw up
- `attack6.png` - Right paw up

### Animation Guidelines

#### File Naming Convention
```
{action}{frame_number}.png

Examples:
- idle1.png, idle2.png, idle3.png, idle4.png
- attack1.png, attack2.png, ... attack6.png
- victory1.png, victory2.png, victory3.png
```

#### Frame Specifications
- **Format**: PNG with transparency
- **Size**: 64x64 pixels per frame
- **Frame Rate**: 8-12 FPS for smooth animation
- **Loop Type**: 
  - Idle: Seamless loop
  - Attack: Loop while coding
  - Victory: Play once

#### Sprite Sheet Alternative
Combine frames into a horizontal sprite sheet:
```
idle_sheet.png (256x64) - 4 frames at 64x64 each
attack_sheet.png (384x64) - 6 frames at 64x64 each
```

### PixelLab API Tips

1. **Consistency**: Use the same prompt base with slight variations:
   ```
   Base: "Cute orange Shiba Inu dog, pixel art, 64x64, side view, simple background"
   Add: "...sitting peacefully" or "...typing on keyboard"
   ```

2. **Style Reference**: Upload a reference image to Bitforge for consistent art style

3. **Transparent Background**: Add "transparent background" to prompts

4. **Color Palette**: Specify colors for consistency:
   ```
   "orange fur #e67e22, cream chest #f39c12, pink nose #ff6b9d"
   ```

### Implementation in React

```javascript
// Simple animation component
const ShibaSprite = ({ action = 'idle' }) => {
  const [frame, setFrame] = useState(1);
  const frameCount = action === 'idle' ? 4 : 6;
  
  useEffect(() => {
    const interval = setInterval(() => {
      setFrame(f => (f % frameCount) + 1);
    }, 100); // 10 FPS
    
    return () => clearInterval(interval);
  }, [action, frameCount]);
  
  return (
    <img 
      src={`/assets/sprites/${action}${frame}.png`}
      alt="Shiba mascot"
      className="shiba-sprite"
    />
  );
};
```

### Required Assets for MVP

1. **Sprites** (via PixelLab API):
   - [ ] idle1-4.png - Sitting animation
   - [ ] attack1-6.png - Coding animation
   - [ ] logo.png - 256x256 ShibaCoder logo
   - [ ] leaderboard-border.png - Decorative frame

2. **Optional Icons** (can use CSS/Tailwind instead):
   - [ ] pass.svg - Green checkmark
   - [ ] fail.svg - Red X

### Quick Start

1. Sign up at https://api.pixellab.ai
2. Get API key from dashboard
3. Use Pixflux model for quick generation
4. Generate frames with consistent prompts
5. Save as `{action}{number}.png` format