import { company } from '../../content/company';
import { site } from '../../content/site';

/*
 * "Save our number" contact card, built from company.ts at export time.
 * Families who save the number can call it when they reach Siddhpur, and
 * WhatsApp treats a number people have saved as known rather than unknown.
 */
export const dynamic = 'force-static';

/** vCard 3.0 text values escape backslashes, commas and semicolons. */
const esc = (value: string) => value.replace(/[\\,;]/g, (c) => `\\${c}`);

export function GET() {
  const a = company.postalAddress;
  const card = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:;${esc(company.name)};;;`,
    `FN:${esc(company.name)}`,
    `ORG:${esc(company.name)}`,
    `TEL;TYPE=CELL,VOICE:${company.phoneE164}`,
    `EMAIL;TYPE=INTERNET:${company.email}`,
    `ADR;TYPE=WORK:;;${esc(a.street)};${esc(a.locality)};${esc(a.region)};${a.postalCode};India`,
    `URL:${site.url}`,
    'END:VCARD',
  ];
  return new Response(`${card.join('\r\n')}\r\n`, {
    headers: { 'Content-Type': 'text/vcard; charset=utf-8' },
  });
}
