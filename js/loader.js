const components = [
  { file: 'components/hero.html',    slot: 'slot-hero'    },
  { file: 'components/impact.html',  slot: 'slot-impact'  },
  { file: 'components/ai.html',      slot: 'slot-ai'      },
  { file: 'components/journey.html', slot: 'slot-journey' },
  { file: 'components/skills.html',  slot: 'slot-skills'  },
  { file: 'components/beyond.html',  slot: 'slot-beyond'  },
  { file: 'components/proof.html',   slot: 'slot-proof'   },
  { file: 'components/connect.html', slot: 'slot-connect' },
];

async function loadComponent({ file, slot }) {
  try {
    const res = await fetch(file);
    if (!res.ok) throw new Error(`${res.status} ${file}`);
    const html = await res.text();
    const el = document.getElementById(slot);
    if (el) el.innerHTML = html;
  } catch (err) {
    console.warn('[loader] Failed to load', file, err);
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  await Promise.all(components.map(loadComponent));
  document.body.setAttribute('data-loaded', 'true');
  if (typeof initAnimations === 'function') initAnimations();
});
