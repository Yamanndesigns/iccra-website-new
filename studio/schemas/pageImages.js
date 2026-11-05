/* "Site Photos" — one document holding every photo on the website.
   Each field name matches a data-cms="..." attribute in the HTML.
   Leave a slot empty to keep the photo that's built into the site.
   Click the crop icon on an image to set its hotspot: that point stays
   in view however the photo gets cropped on desktop or phone. */

const photo = (name, title, description) => ({
  name,
  title,
  description,
  type: 'image',
  options: { hotspot: true },
  fields: [
    {
      name: 'alt',
      title: 'Describe the photo',
      type: 'string',
      description: 'Short description for screen readers and search engines, e.g. "Students building a robot with their teacher".'
    }
  ]
});

const group = (name, title) => ({ name, title });

export default {
  name: 'pageImages',
  title: 'Site Photos',
  type: 'document',
  groups: [
    group('home', 'Homepage'),
    group('banners', 'Page banners'),
    group('why', 'Why ICCRA'),
    group('life', 'Student Life')
  ],
  fields: [
    // Homepage
    { ...photo('homeHero', 'Homepage — main banner', 'The large photo at the top of the homepage. Pick a photo where faces are in the upper/right part; the headline sits bottom-left.'), group: 'home' },
    { ...photo('homeFeature1', 'Homepage — "Academic Excellence" photo'), group: 'home' },
    { ...photo('homeFeature2', 'Homepage — "Islamic Values" photo'), group: 'home' },

    // Banner at the top of every other page
    { ...photo('whyHero', 'Why ICCRA — banner'), group: 'banners' },
    { ...photo('curriculumHero', 'Curriculum — banner'), group: 'banners' },
    { ...photo('facultyHero', 'Faculty — banner'), group: 'banners' },
    { ...photo('studentLifeHero', 'Student Life — banner'), group: 'banners' },
    { ...photo('admissionsHero', 'Admissions — banner'), group: 'banners' },
    { ...photo('faqHero', 'FAQ — banner'), group: 'banners' },
    { ...photo('parentsCommunityHero', 'Parents & Community — banner'), group: 'banners' },
    { ...photo('parentResourcesHero', 'Parent Resources — banner'), group: 'banners' },
    { ...photo('parentHandbookHero', 'Parent Handbook — banner'), group: 'banners' },
    { ...photo('communityGatheringsHero', 'Community Gatherings — banner'), group: 'banners' },
    { ...photo('volunteeringHero', 'Volunteering — banner'), group: 'banners' },
    { ...photo('calendarHero', 'Calendar — banner'), group: 'banners' },

    // Why ICCRA page
    { ...photo('whyFeature1', 'Why ICCRA — 01 Academic Excellence'), group: 'why' },
    { ...photo('whyFeature2', 'Why ICCRA — 02 Islamic Values'), group: 'why' },
    { ...photo('whyFeature3', 'Why ICCRA — 03 Teachers'), group: 'why' },
    { ...photo('whyFeature4', 'Why ICCRA — 04 Whole-Child Development'), group: 'why' },

    // Student Life gallery
    { ...photo('studentLifeGallery1', 'Student Life — large gallery photo'), group: 'life' },
    { ...photo('studentLifeGallery2', 'Student Life — gallery photo 2'), group: 'life' },
    { ...photo('studentLifeGallery3', 'Student Life — gallery photo 3'), group: 'life' }
  ],
  preview: { prepare: () => ({ title: 'Site Photos' }) }
};
