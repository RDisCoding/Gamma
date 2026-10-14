import { galleryMetadata, GalleryView } from '../../../views/gallery';

export const metadata = galleryMetadata('en');

export default function Page() {
  return <GalleryView locale="en" />;
}
