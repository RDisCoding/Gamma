import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title/Caption',
      type: 'string',
    }),
    defineField({
      name: 'type',
      title: 'Content Type',
      type: 'string',
      options: {
        list: [
          { title: 'Photo', value: 'photo' },
          { title: 'Video (YouTube)', value: 'video' },
        ],
        layout: 'radio',
      },
      initialValue: 'photo',
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      hidden: ({ document }) => document?.type === 'video',
      options: { hotspot: true },
    }),
    defineField({
      name: 'videoUrl',
      title: 'YouTube Video URL',
      type: 'url',
      hidden: ({ document }) => document?.type === 'photo',
      description: 'Paste the full YouTube link (e.g., https://www.youtube.com/watch?v=...)',
    }),
  ],
})