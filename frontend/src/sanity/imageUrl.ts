import {createImageUrlBuilder} from '@sanity/image-url';
import { client } from './client';

const builder = createImageUrlBuilder(client);

// Helper function to get the URL
export function urlFor(source: any) {
  return builder.image(source);
}