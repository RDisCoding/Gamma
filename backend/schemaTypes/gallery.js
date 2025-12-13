import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  fields: [
    defineField({
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      description: 'Add images and drag to reorder them. The order here will be the display order on the website.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'caption',
              title: 'Caption (optional)',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              media: 'image',
              title: 'caption',
            },
            prepare({ media, title }) {
              return {
                title: title || 'Untitled Image',
                media,
              }
            },
          },
        },
      ],
    }),
  ],
})