export default {
  name: 'programsOverview',
  title: 'Programs Overview',
  type: 'document',
  fields: [
    { name: 'intro', title: 'Intro Paragraph', type: 'text', rows: 3 },
    { name: 'gradeRange', title: 'Grade Range Note', type: 'string' },
    { name: 'heroImage', title: 'Page Hero Image', type: 'image', options: { hotspot: true } },
    {
      name: 'islamic', title: 'Islamic Studies Panel', type: 'object',
      fields: [
        { name: 'kicker', type: 'string' },
        { name: 'title', type: 'string' },
        { name: 'summary', type: 'text', rows: 2 },
        { name: 'subjects', type: 'array', of: [{ type: 'string' }] }
      ]
    },
    {
      name: 'academic', title: 'Academic Curriculum Panel', type: 'object',
      fields: [
        { name: 'kicker', type: 'string' },
        { name: 'title', type: 'string' },
        { name: 'summary', type: 'text', rows: 2 },
        { name: 'subjects', type: 'array', of: [{ type: 'string' }] }
      ]
    }
  ]
};
