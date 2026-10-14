/*
 * Photographs of rituals at Siddhpur. Alt text and captions for each photo are
 * in the language files (src/i18n, `gallery.images`), keyed by `id`.
 */
export interface Photo {
  id: '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | 'portrait';
  image: string;
  width: number;
  height: number;
}

export const gallery: Photo[] = [
  { id: '06', image: '/gallery/06.jpeg', width: 1600, height: 1204 },
  { id: '09', image: '/gallery/09.jpeg', width: 904, height: 1600 },
  { id: '02', image: '/gallery/02.jpeg', width: 1600, height: 720 },
  { id: '05', image: '/gallery/05.jpeg', width: 1600, height: 1204 },
  { id: '04', image: '/gallery/04.jpeg', width: 1204, height: 1600 },
  { id: '07', image: '/gallery/07.jpeg', width: 1600, height: 1204 },
  { id: '08', image: '/gallery/08.jpeg', width: 1600, height: 1204 },
  { id: '01', image: '/gallery/01.jpeg', width: 720, height: 1600 },
  { id: '03', image: '/gallery/03.jpeg', width: 576, height: 1280 },
];

export const purohitPortrait: Photo = { id: 'portrait', image: '/img/aboutus2.png', width: 735, height: 1600 };

/** Third-party YouTube videos about Siddhpur (titles/descriptions in the language files, same order). */
export const videos = [{ youtubeId: 'nqwjtAamD8A' }, { youtubeId: 'V_D3VHIPoxw' }];
