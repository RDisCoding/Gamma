import { track as vercelTrack } from '@vercel/analytics';

/**
 * Enquiry events. A click is an enquiry *opportunity*, not a booking — confirmed
 * bookings are recorded manually (see docs/SEO-HANDOVER.md, "Measurement").
 * Never put names, phone numbers or message text in event parameters.
 */
export type EnquiryEvent =
  | 'click_call'
  | 'click_whatsapp'
  | 'lead_form_submit'
  | 'directions_click'
  | 'ai_referral'
  | 'language_change';

type Params = Record<string, string | number | boolean | null>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: EnquiryEvent, params: Params = {}) {
  const payload: Params = { ...params, page_path: window.location.pathname };
  window.gtag?.('event', name, payload);
  try {
    vercelTrack(name, payload);
  } catch {
    // Vercel Analytics is optional; never let tracking break a click.
  }
  if (process.env.NODE_ENV !== 'production') console.info('[track]', name, payload);
}

export const LEAD_PENDING_KEY = 'mt_lead_pending';
