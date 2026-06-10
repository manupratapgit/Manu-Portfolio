(function () {

  // ── REGION DATA ──────────────────────────
  const GEO = {
    uae: {
      availability: "Open to Senior PM & GPM roles · Dubai · UAE",
      metrics: {
        automation:  "22→80%",
        gmv:         "$1M+",
        fte:         "50 FTE",
        revenue:     "$130K+",
        wms:         "$50K+/month",
        smi:         "$350K/month",
      },
      connect: {
        showBotim: true,
        botimHref: "https://botim.me/+919917322444",
        botimLabel: "Chat on Botim",
        pill: "🇦🇪  Open to Dubai · UAE roles",
      }
    },
    india: {
      availability: "Open to Senior PM & GPM roles · Bengaluru · Pune · Hyderabad · Delhi NCR",
      metrics: {
        automation:  "22→80%",
        gmv:         "₹1M+ GMV",
        fte:         "50 FTE",
        revenue:     "₹1Cr+",
        wms:         "₹40L/month",
        smi:         "₹3Cr/month",
      },
      connect: {
        showBotim: false,
        pill: "🇮🇳  Open to Bengaluru · Delhi · Dubai roles",
      }
    },
    sea: {
      availability: "Open to Senior PM & GPM roles · SEA",
      metrics: {
        automation:  "22→80%",
        gmv:         "$1M+",
        fte:         "50 FTE",
        revenue:     "$130K+",
        wms:         "$50K+/month",
        smi:         "$350K/month",
      },
      connect: {
        showBotim: false,
        pill: "Open to SEA roles",
      }
    },
    international: {
      availability: "Open to Senior PM & GPM roles · Global · Remote",
      metrics: {
        automation:  "22→80%",
        gmv:         "$1M+",
        fte:         "50 FTE",
        revenue:     "$130K+",
        wms:         "$50K+/month",
        smi:         "$350K/month",
      },
      connect: {
        showBotim: false,
        pill: "Open to global roles",
      }
    }
  };
  GEO.eu = GEO.international;

  // ── APPLY PERSONALISATION ─────────────────
  function applyGeo(data) {
    const region = GEO[data.region] || GEO.international;

    // 1. Availability pill text in hero
    document.querySelectorAll('[data-geo="availability"]').forEach(el => {
      el.textContent = region.availability;
    });

    // 2. Metrics — swap any element with data-geo-metric="key"
    Object.entries(region.metrics).forEach(([key, val]) => {
      document.querySelectorAll(`[data-geo-metric="${key}"]`).forEach(el => {
        el.textContent = val;
      });
    });

    // 3. Connect section — Botim button
    const botimBtn = document.getElementById('botim-btn');
    if (botimBtn) {
      if (region.connect.showBotim) {
        botimBtn.href = region.connect.botimHref;
        botimBtn.querySelector('.botim-label').textContent = region.connect.botimLabel;
        botimBtn.style.display = 'inline-flex';
      } else {
        botimBtn.style.display = 'none';
      }
    }

    // 4. Geo pill in connect section
    document.querySelectorAll('[data-geo="location-pill"]').forEach(el => {
      el.textContent = region.connect.pill;
    });

    // 5. Add region class to body for CSS targeting
    document.body.classList.add('geo-' + data.region);
  }

  // ── FETCH AND APPLY ───────────────────────
  fetch('/api/geo')
    .then(r => r.json())
    .then(applyGeo)
    .catch(() => {
      // Silently fail — default content stays
    });

})();
