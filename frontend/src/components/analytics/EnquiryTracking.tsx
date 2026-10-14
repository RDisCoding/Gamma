'use client';

import { useEffect } from 'react';
import { LEAD_PENDING_KEY, trackEvent } from '../../lib/analytics';

const AI_SOURCES: [string, RegExp][] = [
  ['chatgpt', /(^|\.)chatgpt\.com$|(^|\.)chat\.openai\.com$/],
  ['perplexity', /(^|\.)perplexity\.ai$/],
  ['copilot', /(^|\.)copilot\.microsoft\.com$/],
  ['gemini', /(^|\.)gemini\.google\.com$/],
  ['claude', /(^|\.)claude\.ai$/],
];

function detectAiSource(): string | null {
  const utm = new URLSearchParams(window.location.search).get('utm_source') ?? '';
  let refHost = '';
  try {
    refHost = document.referrer ? new URL(document.referrer).hostname : '';
  } catch {
    refHost = '';
  }
  for (const [name, pattern] of AI_SOURCES) {
    if (pattern.test(refHost) || pattern.test(utm)) return name;
  }
  return null;
}

/**
 * One delegated listener tracks every call, WhatsApp, directions and form
 * action on the site, so individual buttons only need an optional
 * data-cta="<placement>" attribute.
 */
export default function EnquiryTracking() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.('a');
      if (!link) return;
      const href = link.getAttribute('href') ?? '';
      const cta_location = link.dataset.cta ?? 'unspecified';

      if (href.startsWith('tel:')) trackEvent('click_call', { cta_location });
      else if (/^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href)) trackEvent('click_whatsapp', { cta_location });
      else if (/^https:\/\/(www\.)?google\.[a-z.]+\/maps|^https:\/\/maps\.app\.goo\.gl\//.test(href))
        trackEvent('directions_click', { cta_location });
    };

    const onSubmit = (event: SubmitEvent) => {
      const form = event.target as HTMLFormElement | null;
      if (!form?.matches('[data-lead-form]')) return;
      try {
        sessionStorage.setItem(LEAD_PENDING_KEY, form.dataset.leadForm || 'contact');
      } catch {
        // Storage can be unavailable (private mode); the thank-you page then
        // records the lead without a placement.
      }
    };

    document.addEventListener('click', onClick, { capture: true });
    document.addEventListener('submit', onSubmit, { capture: true });

    try {
      if (!sessionStorage.getItem('mt_ai_checked')) {
        sessionStorage.setItem('mt_ai_checked', '1');
        const ai = detectAiSource();
        if (ai) trackEvent('ai_referral', { ai_source: ai });
      }
    } catch {
      const ai = detectAiSource();
      if (ai) trackEvent('ai_referral', { ai_source: ai });
    }

    return () => {
      document.removeEventListener('click', onClick, { capture: true });
      document.removeEventListener('submit', onSubmit, { capture: true });
    };
  }, []);

  return null;
}
