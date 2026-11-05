export default {
  name: 'facultyMember',
  title: 'Faculty & Staff',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string' },
    { name: 'role', title: 'Role / Title', type: 'string' },
    {
      name: 'tier', title: 'Tier', type: 'string',
      options: { list: [{ title: 'Administration', value: 'admin' }, { title: 'Teacher', value: 'teacher' }] }
    },
    { name: 'initials', title: 'Initials (fallback avatar)', type: 'string' },
    {
      name: 'photo', title: 'Photo', type: 'image',
      options: { hotspot: true }, // lets an editor pick the focal point when cropping
      description: 'Optional — falls back to the initials avatar if left empty.'
    },
    { name: 'credentials', title: 'Credentials', type: 'text', rows: 2 },
    { name: 'summary', title: 'Card summary (one line)', type: 'string', description: 'Shown on the Faculty page card. Keep it under ~100 characters; the full bio opens on click.', validation: Rule => Rule.max(120) },
    { name: 'bio', title: 'Bio', type: 'text', rows: 4 },
    { name: 'email', title: 'Email', type: 'string' },
    { name: 'order', title: 'Display Order', type: 'number' }
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }]
};
