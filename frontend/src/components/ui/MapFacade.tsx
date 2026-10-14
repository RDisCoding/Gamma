'use client';

import { useState } from 'react';
import { company } from '../../content/company';
import type { Dictionary } from '../../i18n/en';

interface Props {
  className?: string;
  location?: 'meeting' | 'ritual';
  labels: Dictionary['map'];
  /** Display names of the two places, in the page language. */
  names: { meeting: string; ritual: string };
}

/**
 * Google Maps costs ~1 MB of script, so the embed only loads when a visitor
 * asks for it. The "Open in Google Maps" link works immediately.
 */
export default function MapFacade({ className = '', location = 'meeting', labels, names }: Props) {
  const [loaded, setLoaded] = useState(false);
  const place = location === 'meeting' ? company.meetingPoint : company.ritualLocation;
  const name = names[location];
  const label = location === 'meeting' ? labels.meetingLabel : labels.ritualLabel;

  return (
    <div className={`relative overflow-hidden rounded-[1.75rem] bg-paper-2 ${className}`}>
      {loaded ? (
        <iframe
          src={place.embedUrl}
          title={labels.mapTitle.replace('{name}', name)}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8">
          <svg aria-hidden="true" className="absolute inset-0 h-full w-full text-ink/10" preserveAspectRatio="none">
            <defs>
              <pattern id="map-grid" width="28" height="28" patternUnits="userSpaceOnUse">
                <path d="M28 0H0V28" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#map-grid)" />
            <circle cx="55%" cy="48%" r="90" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="55%" cy="48%" r="160" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>
          <span aria-hidden="true" className="absolute left-[55%] top-[48%] -translate-x-1/2 -translate-y-1/2">
            <span className="absolute inset-0 animate-ping rounded-full bg-sindoor/40" />
            <span className="relative block h-4 w-4 rounded-full bg-sindoor ring-4 ring-paper" />
          </span>
          <p className="relative eyebrow text-sindoor">{label}</p>
          <div className="relative flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-display text-3xl leading-tight text-ink">{name}</p>
              {location === 'meeting' && <p className="mt-2 text-sm text-ink-soft">{labels.callFirst}</p>}
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setLoaded(true)}
                className="rounded-full border border-ink/20 bg-paper px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-paper"
              >
                {labels.showMap}
              </button>
              <a
                href={place.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="map_card"
                className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-sindoor"
              >
                {labels.openMaps}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
