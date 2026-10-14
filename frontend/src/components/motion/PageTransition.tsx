'use client';

import { useState } from 'react';

let hasNavigated = false;

/**
 * Re-mounts on every navigation. The first page load renders without the
 * transition (so it never delays the first paint); later navigations fade in.
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const [animate] = useState(() => {
    if (typeof window === 'undefined') return false;
    const shouldAnimate = hasNavigated;
    hasNavigated = true;
    return shouldAnimate;
  });
  return <div className={animate ? 'page-enter' : undefined}>{children}</div>;
}
