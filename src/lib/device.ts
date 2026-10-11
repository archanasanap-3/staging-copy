/**
 * Device capability check used to scale animation down on weaker hardware.
 * "low" = touch-first phones/tablets, few CPU cores, little memory, data-saver
 * or a reduced-motion preference. Everything else is treated as "high".
 */
export type PerfTier = 'low' | 'high';

let cached: PerfTier | null = null;

export function getPerfTier(): PerfTier {
  if (cached) return cached;
  if (typeof window === 'undefined') return 'high';

  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean };
  };

  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fewCores = typeof nav.hardwareConcurrency === 'number' && nav.hardwareConcurrency <= 4;
  const lowMemory = typeof nav.deviceMemory === 'number' && nav.deviceMemory <= 4;
  const saveData = !!nav.connection?.saveData;

  cached = coarse || reduced || fewCores || lowMemory || saveData ? 'low' : 'high';
  return cached;
}
