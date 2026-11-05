export default {
  name: 'committeeMember',
  title: 'Governing Committee Member',
  type: 'document',
  fields: [
    { name: 'role', title: 'Role', type: 'string' },
    { name: 'name', title: 'Name', type: 'string' },
    { name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } },
    { name: 'bio', title: 'Short Profile', type: 'text', rows: 3 },
    { name: 'order', title: 'Display Order', type: 'number' }
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }]
};
