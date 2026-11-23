import { defineConfig, presetWind3 } from 'unocss'

// Semantic palette (see changelog design plan). Components only use these names.
const palette = {
  canvas: '#EDF1EE',
  surface: '#FFFFFF',
  ink: { DEFAULT: '#1B2A27', muted: '#4B5A56' },
  line: { DEFAULT: '#CBD5D0', strong: '#9AA8A2' },
  brand: { DEFAULT: '#1D4E9E', ink: '#FFFFFF', soft: '#C9D8F2', tint: '#E6EDF9' },
  ok: { surface: '#E2F3E7', text: '#1A6136', border: '#8FCB9F', solid: '#2A7F47' },
  warn: { surface: '#FFF0C7', text: '#6E4500', border: '#E2AE3A', solid: '#F0B323' },
  crit: { surface: '#FDE4E1', text: '#9E1E19', border: '#EC978F', solid: '#C42B22' },
  lock: { DEFAULT: '#14213A', glass: '#F4F6FA', ink: '#FFFFFF' },
}

export default defineConfig({
  presets: [presetWind3()],
  theme: {
    colors: palette,
    fontFamily: { sans: 'Satoshi, ui-sans-serif, system-ui, sans-serif' },
    // Legibility floor: nothing renders below 13px.
    fontSize: {
      xs: ['13px', '18px'],
      sm: ['14px', '20px'],
      base: ['16px', '22px'],
      lg: ['18px', '24px'],
      xl: ['22px', '28px'],
      '2xl': ['28px', '32px'],
      '3xl': ['56px', '60px'],
    },
  },
  shortcuts: {
    'focus-ring': 'outline-none focus-visible:ring-3 focus-visible:ring-brand/45 focus-visible:ring-offset-1',
    card: 'bg-surface border border-line rounded-4',
    'section-title': 'text-lg font-bold text-ink leading-tight tracking-[-0.01em]',
    'screen-title': 'text-xl font-bold text-ink leading-tight tracking-[-0.015em]',
    'label-text': 'text-sm text-ink-muted',
    'btn-primary':
      'focus-ring inline-flex items-center justify-center gap-2 min-h-13 px-5 rounded-3 bg-brand text-brand-ink text-base font-bold active:translate-y-px disabled:opacity-50 cursor-pointer',
    'btn-secondary':
      'focus-ring inline-flex items-center justify-center gap-2 min-h-11 px-4 rounded-3 bg-surface border border-line-strong text-brand text-base font-bold cursor-pointer',
    'btn-ghost':
      'focus-ring inline-flex items-center gap-1.5 min-h-11 px-1 rounded-2 text-brand text-base font-medium underline underline-offset-3 decoration-brand/40 cursor-pointer',
    'btn-danger':
      'focus-ring inline-flex items-center justify-center gap-2 min-h-11 px-4 rounded-3 bg-crit-surface border border-crit-border text-crit-text text-base font-bold cursor-pointer',
    badge: 'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-sm font-bold leading-5 whitespace-nowrap',
    'badge-ok': 'badge bg-ok-surface text-ok-text border-ok-border',
    'badge-warn': 'badge bg-warn-surface text-warn-text border-warn-border',
    'badge-crit': 'badge bg-crit-surface text-crit-text border-crit-border',
    'badge-neutral': 'badge bg-canvas text-ink border-line font-medium',
    field:
      'w-full min-h-12 rounded-3 border border-line-strong bg-surface px-3.5 text-base text-ink placeholder:text-ink-muted outline-none focus:border-brand focus:ring-3 focus:ring-brand/25',
    chip:
      'focus-ring inline-flex items-center gap-1.5 min-h-11 px-3.5 rounded-full border border-line-strong bg-surface text-base font-medium text-ink cursor-pointer data-[state=on]:bg-brand data-[state=on]:text-brand-ink data-[state=on]:border-brand aria-pressed:bg-brand aria-pressed:text-brand-ink aria-pressed:border-brand',
    'tab-item':
      'focus-ring flex-1 inline-flex items-center justify-center min-h-11 px-3 rounded-2.5 text-base font-medium text-ink-muted cursor-pointer data-[state=on]:bg-surface data-[state=on]:text-ink data-[state=on]:font-bold data-[state=on]:shadow-[0_1px_2px_rgba(27,42,39,0.18)]',
    'option-card':
      'focus-ring flex items-center gap-3 w-full text-left min-h-12 rounded-3 border border-line bg-surface px-3.5 py-2 text-base text-ink cursor-pointer data-[state=checked]:border-brand data-[state=checked]:bg-brand-tint data-[state=checked]:ring-1 data-[state=checked]:ring-brand',
    'radio-dot':
      'shrink-0 inline-flex items-center justify-center size-5 rounded-full border-2 border-line-strong bg-surface',
    'switch-root':
      'focus-ring relative inline-flex shrink-0 items-center w-13 h-8 rounded-full bg-line-strong transition-colors data-[state=checked]:bg-brand cursor-pointer',
    'switch-thumb':
      'block size-6 rounded-full bg-surface translate-x-1 transition-transform data-[state=checked]:translate-x-6 shadow-[0_1px_2px_rgba(27,42,39,0.3)]',
    'row-tap': 'focus-ring flex items-center gap-3 w-full min-h-12 text-left cursor-pointer',
  },
  preflights: [
    {
      getCSS: ({ theme }) =>
        `html{-webkit-text-size-adjust:100%}body{font-family:${(theme as { fontFamily: { sans: string } }).fontFamily.sans};color:${palette.ink.DEFAULT};background:${palette.canvas};-webkit-font-smoothing:antialiased}`,
    },
  ],
})
