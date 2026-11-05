import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemas';

// Only the content the website currently reads from Sanity is shown in the Studio.

// One-of-a-kind documents: opened directly, can't be duplicated or deleted.
const SINGLETONS = [
  { id: 'pageImages', type: 'pageImages', title: 'Site Photos' }
];
const singletonTypes = new Set(SINGLETONS.map(s => s.type));

export default defineConfig({
  name: 'iccra',
  title: 'ICCR Academy',
  projectId: 'tiwlxbgu', // same ID as js/sanity-client.js
  dataset: 'production',

  plugins: [
    structureTool({
      structure: S =>
        S.list()
          .title('Content')
          .items([
            ...SINGLETONS.map(s =>
              S.listItem().title(s.title).id(s.id).child(S.document().schemaType(s.type).documentId(s.id))
            ),
            S.divider(),
            S.documentTypeListItem('facultyMember').title('Faculty & Staff'),
            S.documentTypeListItem('committeeMember').title('Governing Committee')
            // Testimonials, FAQ, etc. still come from data/*.json — add them here once the site reads them from Sanity
          ])
    })
  ],

  schema: {
    types: schemaTypes,
    templates: templates => templates.filter(t => !singletonTypes.has(t.schemaType))
  },

  document: {
    actions: (actions, { schemaType }) =>
      singletonTypes.has(schemaType)
        ? actions.filter(({ action }) => ['publish', 'discardChanges', 'restore'].includes(action))
        : actions
  }
});
