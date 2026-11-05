export default {
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    { name: 'quote', title: 'Quote', type: 'text', rows: 4 },
    { name: 'attribution', title: 'Attribution', type: 'string', description: 'e.g. "Parent of a 7th grade student"' },
    { name: 'featured', title: 'Feature as the large quote?', type: 'boolean', initialValue: false },
    { name: 'order', title: 'Display Order', type: 'number' }
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }]
};
