import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'learnMore',
  title: 'Learn More Page',
  type: 'document',
  fields: [
    defineField({ 
      name: 'title', 
      title: 'Page Title', 
      type: 'string',
      description: 'Main heading for the Learn More page'
    }),
    defineField({ 
      name: 'subtitle', 
      title: 'Subtitle', 
      type: 'text',
      rows: 2,
      description: 'Brief description below the title'
    }),
    defineField({
      name: 'content',
      title: 'Page Content',
      type: 'text',
      rows: 20,
      description: 'Main content - use bullet points and formatting as needed'
    }),
    defineField({
      name: 'downloadPdf',
      title: 'Downloadable PDF',
      type: 'file',
      description: 'Optional PDF file that users can download from this page',
      options: {
        accept: '.pdf'
      }
    }),
  ],
})
