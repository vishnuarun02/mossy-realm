import { Cinzel, Cinzel_Decorative, Cormorant, Lora, Mystery_Quest, VT323 } from 'next/font/google';

// Site Title - Fancy decorative
export const cinzelDecorative = Cinzel_Decorative({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-display',
  display: 'swap',
});

// Box Titles / Section Headers
export const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
});

// Navigation Links
export const cormorant = Cormorant({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-nav',
  display: 'swap',
});

// Body Text
export const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-body',
  display: 'swap',
});

// Accent / Whimsical Text
export const mysteryQuest = Mystery_Quest({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-accent',
  display: 'swap',
});

// Terminal / CRT Fragments (Cabin monitors only)
export const vt323 = VT323({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-terminal',
  display: 'swap',
});
