import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'companyInfo',
  title: 'Company Information',
  type: 'document',
  fields: [
    // --- Hero Section ---
    defineField({ name: 'heroTitle', title: 'Hero Title', type: 'string' }),
    defineField({ name: 'heroSubtitle', title: 'Hero Subtitle', type: 'text', rows: 2 }),
    defineField({ name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true } }),

    // --- About Section ---
    defineField({ name: 'aboutTitle', title: 'About Us Title', type: 'string' }),
    defineField({ name: 'aboutText', title: 'About Us Text', type: 'text' }),
    defineField({ name: 'aboutImage', title: 'About Us Image', type: 'image' }),

    // --- Contact Details ---
    defineField({ name: 'companyName', title: 'Company Name', type: 'string' }),
    defineField({ name: 'phoneNumber', title: 'Phone Number', type: 'string' }),
    defineField({ name: 'whatsappNumber', title: 'WhatsApp Number (Country Code)', type: 'string' }),
    defineField({ name: 'email', title: 'Email Address', type: 'string' }),
    defineField({ name: 'address', title: 'Office Address', type: 'text', rows: 3 }),
    defineField({ name: 'timings', title: 'Office Timings', type: 'string', description: 'e.g., Mon-Sat: 9am - 6pm' }),
    
    // --- Map ---
    defineField({
      name: 'googleMapEmbedUrl',
      title: 'Google Maps Embed URL',
      type: 'url',
      description: 'Go to Google Maps -> Share -> Embed a map -> Copy the URL inside the src="" quotes.',
    }),

    // --- Social Media ---
    defineField({
      name: 'facebookUrl',
      title: 'Facebook URL',
      type: 'url',
      description: 'Full URL to your Facebook page (optional)',
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram URL',
      type: 'url',
      description: 'Full URL to your Instagram profile (optional)',
    }),
    defineField({
      name: 'twitterUrl',
      title: 'Twitter/X URL',
      type: 'url',
      description: 'Full URL to your Twitter/X profile (optional)',
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn URL',
      type: 'url',
      description: 'Full URL to your LinkedIn page (optional)',
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube URL',
      type: 'url',
      description: 'Full URL to your YouTube channel (optional)',
    }),
  ],
})