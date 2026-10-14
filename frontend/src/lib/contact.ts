import { company } from '../content/company';

export const telHref = (e164: string = company.phoneE164) => `tel:${e164}`;

export function whatsappHref(message?: string, e164: string = company.whatsappE164) {
  const base = `https://wa.me/${e164.replace(/[^0-9]/g, '')}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
