import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'videos',
  title: 'Videos',
  type: 'document',
  fields: [
    defineField({
      name: 'videos',
      title: 'Video Collection',
      type: 'array',
      description: 'Add YouTube videos for informative and tourism content. Drag to reorder.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Video Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'youtubeUrl',
              title: 'YouTube URL',
              type: 'url',
              validation: (Rule) =>
                Rule.required().uri({
                  scheme: ['https'],
                  allowRelative: false,
                }),
              description: 'Paste the full YouTube link (e.g., https://www.youtube.com/watch?v=...)',
            }),
            defineField({
              name: 'description',
              title: 'Description (optional)',
              type: 'text',
              rows: 3,
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
            },
          },
        },
      ],
    }),
  ],
})
