'use client';

import { useEffect } from 'react';
import { LEAD_PENDING_KEY, trackEvent } from '../../lib/analytics';

/**
 * Counts a form lead only once FormSubmit has accepted it and redirected here.
 * The pending flag (set on submit) prevents reloads or direct visits from
 * being counted twice.
 */
export default function LeadConfirmed() {
  useEffect(() => {
    let placement: string | null = null;
    try {
      placement = sessionStorage.getItem(LEAD_PENDING_KEY);
      if (!placement) return;
      sessionStorage.removeItem(LEAD_PENDING_KEY);
    } catch {
      placement = 'unknown';
    }
    trackEvent('lead_form_submit', { form_location: placement });
  }, []);
  return null;
}
