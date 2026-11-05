export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    { name: 'orgName', title: 'Organization Name', type: 'string' },
    { name: 'academyName', title: 'Academy Name', type: 'string' },
    { name: 'logo', title: 'Logo', type: 'image', options: { hotspot: true } },
    {
      name: 'primaryNav', title: 'Primary Navigation (max 7)', type: 'array',
      validation: Rule => Rule.max(7),
      of: [{
        type: 'object',
        fields: [
          { name: 'label', type: 'string' },
          { name: 'href', type: 'string', description: 'e.g. programs.html' }
        ]
      }]
    },
    {
      name: 'headerSocial', title: 'Header Social Icons', type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'label', type: 'string' },
          { name: 'href', type: 'url' },
          { name: 'icon', type: 'string', options: { list: ['instagram', 'facebook'] } }
        ]
      }]
    },
    {
      name: 'contact', title: 'Contact', type: 'object',
      fields: [
        { name: 'address', type: 'string' },
        { name: 'phone', type: 'string' },
        { name: 'email', type: 'string' }
      ]
    },
    {
      name: 'social', title: 'Footer Social Links', type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'label', type: 'string' },
          { name: 'href', type: 'url' }
        ]
      }]
    }
  ]
};
