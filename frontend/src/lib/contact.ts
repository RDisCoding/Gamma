import { company } from '../content/company';

export const telHref = (e164: string = company.phoneE164) => `tel:${e164}`;

/** Downloadable contact card (src/app/matrugaya-tirth.vcf/route.ts). Link it with a plain <a>, not next/link. */
export const contactCardHref = '/matrugaya-tirth.vcf';

export function whatsappHref(message?: string, e164: string = company.whatsappE164) {
  const base = `https://wa.me/${e164.replace(/[^0-9]/g, '')}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
