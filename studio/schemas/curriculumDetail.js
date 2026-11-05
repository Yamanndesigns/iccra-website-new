export default {
  name: 'curriculumDetail',
  title: 'Curriculum Detail',
  type: 'document',
  fields: [
    { name: 'intro', title: 'Intro Paragraph', type: 'text', rows: 3 },
    { name: 'heroImage', title: 'Page Hero Image', type: 'image', options: { hotspot: true } },
    {
      name: 'gradeBands', title: 'Grade Bands', type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'range', type: 'string' },
          { name: 'title', type: 'string' },
          { name: 'islamic', type: 'text', rows: 2 },
          { name: 'academic', type: 'text', rows: 2 }
        ]
      }]
    },
    {
      name: 'advancedTrack', title: 'Advanced Islamic Studies (7+)', type: 'object',
      fields: [
        { name: 'title', type: 'string' },
        { name: 'description', type: 'text', rows: 3 },
        {
          name: 'subjects', type: 'array',
          of: [{ type: 'object', fields: [{ name: 'name', type: 'string' }, { name: 'description', type: 'text', rows: 2 }] }]
        }
      ]
    },
    {
      name: 'scopeAndSequence', title: 'Scope & Sequence Download', type: 'object',
      fields: [
        { name: 'label', type: 'string' },
        { name: 'file', title: 'PDF File', type: 'file' }
      ]
    }
  ]
};
