/**
 * Image optimization utilities for DoughnutVibes
 */

/**
 * Get optimized image path for doughnut pieces
 */
export function getDoughnutImage(type: string): string {
  const imageMap: Record<string, string> = {
    blue: '/pics/doughnut_blue.png',
    golden: '/pics/doughnut_golden.png',
    vanilla: '/pics/doughnut_vanilla.png',
    sensenet: '/sensenet-logo.svg',
  };
  return imageMap[type] || '/pics/doughnut_vanilla.png';
}

/**
 * Preload critical images for better performance
 */
export function preloadGameImages(): void {
  if (typeof window === 'undefined') return;

  const images = [
    '/pics/doughnut_blue.png',
    '/pics/doughnut_golden.png',
    '/pics/doughnut_vanilla.png',
    '/sensenet-logo.svg',
  ];

  images.forEach((src) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
}

/**
 * Image loading priorities based on game state
 */
export const IMAGE_PRIORITIES = {
  CRITICAL: 'high' as const, // Above-the-fold, needed immediately
  HIGH: 'high' as const,     // Needed soon
  NORMAL: 'auto' as const,   // Can wait
  LOW: 'low' as const,       // Not immediately needed
};
