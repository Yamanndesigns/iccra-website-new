import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: 'tiwlxbgu', // same ID as js/sanity-client.js
    dataset: 'production'
  },
  studioHost: 'iccra' // Studio will live at https://iccra.sanity.studio (pick another name if taken)
});
