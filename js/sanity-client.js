/* ICCR Academy — Sanity CMS connection
   Paste your Sanity project ID below (sanity.io/manage → your project).
   Until then the site runs exactly as before on the built-in photos and
   data/*.json. Once it's set:
     • every <img data-cms="slotName"> is swapped for the photo chosen in the
       Studio's "Site Photos" document (empty slots keep the built-in photo),
       and the editor's hotspot becomes the crop focal point;
     • the Faculty page reads staff and board members (with photos) from Sanity. */

const SANITY_PROJECT_ID = 'tiwlxbgu';
const SANITY_DATASET = 'production';
const SANITY_API_VERSION = 'v2024-01-01';

const SANITY_ENABLED = /^[a-z0-9]+$/.test(SANITY_PROJECT_ID) && SANITY_PROJECT_ID !== 'your-project-id';

async function fetchSanity(groqQuery) {
  const url = `https://${SANITY_PROJECT_ID}.apicdn.sanity.io/${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?query=${encodeURIComponent(groqQuery)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Sanity query failed: ${res.status}`);
  const { result } = await res.json();
  return result;
}

const SANITY_QUERIES = {
  faculty: `{
    "administration": *[_type == "facultyMember" && tier == "admin"] | order(order asc){
      "id": _id, name, role, initials, credentials, summary, bio, email, "photo": photo.asset->url
    },
    "teachers": *[_type == "facultyMember" && tier == "teacher"] | order(order asc){
      "id": _id, name, role, initials, credentials, summary, bio, "photo": photo.asset->url
    },
    "committee": *[_type == "committeeMember"] | order(order asc){ role, name, "photo": photo.asset->url, bio }
  }`
};

/* ---------- Site photos ---------- */
// Width to request from Sanity's image CDN, by how large the slot renders.
function cmsImageWidth(img) {
  return img.classList.contains('page-hero-bg') ? 2400 : 1400;
}

async function applyCmsImages() {
  const slots = document.querySelectorAll('img[data-cms]');
  if (!SANITY_ENABLED || !slots.length) return;

  // Hide the built-in photos briefly so visitors don't see one image swap to another.
  document.documentElement.classList.add('cms-loading');
  const reveal = () => document.documentElement.classList.remove('cms-loading');
  const failsafe = setTimeout(reveal, 2500);

  try {
    // Ask only for the slots this page uses: slotName{ "url": asset->url, alt, hotspot }
    const keys = [...new Set([...slots].map(img => img.dataset.cms))];
    const projection = keys.map(k => `"${k}": ${k}{ "url": asset->url, alt, hotspot }`).join(', ');
    const photos = await fetchSanity(`*[_id == "pageImages"][0]{ ${projection} }`) || {};

    slots.forEach(img => {
      const photo = photos[img.dataset.cms];
      if (!photo || !photo.url) return; // empty in the Studio → keep the built-in photo
      img.src = `${photo.url}?w=${cmsImageWidth(img)}&fit=max&auto=format&q=80`;
      if (photo.alt) img.alt = photo.alt;
      if (photo.hotspot) img.style.objectPosition = `${(photo.hotspot.x * 100).toFixed(1)}% ${(photo.hotspot.y * 100).toFixed(1)}%`;
    });
  } catch (err) {
    console.warn('Sanity photos unavailable, using built-in photos:', err);
  } finally {
    clearTimeout(failsafe);
    reveal();
  }
}

/* ---------- Faculty & board ---------- */
async function loadFaculty() {
  const fallback = () => fetch('data/faculty.json').then(r => r.json());
  if (!SANITY_ENABLED) return fallback();
  try {
    const data = await fetchSanity(SANITY_QUERIES.faculty);
    const hasPeople = data && (data.administration.length || data.teachers.length || data.committee.length);
    if (!hasPeople) return fallback();
    // Initials are optional in the Studio; derive them for the no-photo avatar
    const initialsOf = name => (name || '').replace(/^Dr\.\s*/, '').split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase();
    [...data.administration, ...data.teachers, ...data.committee].forEach(p => { p.initials = p.initials || initialsOf(p.name); });
    return data;
  } catch (err) {
    console.warn('Sanity faculty unavailable, using data/faculty.json:', err);
    return fallback();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', applyCmsImages);
} else {
  applyCmsImages();
}
