import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'review',
  title: 'Client Reviews',
  type: 'document',
  fields: [
    defineField({
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
    }),
    defineField({
      name: 'reviewText',
      title: 'Review',
      type: 'text',
    }),
    defineField({
      name: 'rating',
      title: 'Stars (1-5)',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(5),
    }),
  ],
})