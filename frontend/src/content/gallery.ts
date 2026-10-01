import type { GalleryImage } from './types';

export const gallery: { images: GalleryImage[] } = {
	images: [
		{ image: '/gallery/01.jpeg', caption: 'Sacred ceremony' },
		{ image: '/gallery/02.jpeg', caption: 'Matrugaya Tirth' },
		{ image: '/gallery/03.jpeg', caption: 'Devotees gathering for puja' },
		{ image: '/gallery/04.jpeg', caption: 'Ritual ceremony' },
		{ image: '/gallery/05.jpeg', caption: 'Sacred prayers' },
		{ image: '/gallery/06.jpeg', caption: 'Community worship' },
		{ image: '/gallery/07.jpeg', caption: 'Vedic ceremony' },
		{ image: '/gallery/08.jpeg', caption: 'Pilgrims at the sacred site' },
		{ image: '/gallery/09.jpeg', caption: 'Ritual preparations' },
		{ image: '/gallery/10.png', caption: 'Divine darshan' },
	],
};

export const featuredGallery: { images: GalleryImage[] } = {
	images: [gallery.images[3], gallery.images[4], gallery.images[6]],
};
