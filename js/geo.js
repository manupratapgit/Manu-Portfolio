(function () {

  // ── REGION DATA ──────────────────────────
  const GEO = {
    uae: {
      availability: "Open to Senior PM & GPM roles · Dubai · UAE",
      resumeUrl: "https://manu-pratap.vercel.app/CV_Manu%20Pratap%20IN.pdf",
      metrics: {
        automation:   "22→80%",
        wms:          "$50K+/month",
        "late-delivery": "$130K+",
      },
      connect: {
        showBotim: true,
        botimHref: "https://botim.me/+919917322444",
        botimLabel: "Chat on Botim",
      }
    },
    india: {
      availability: "Open to Senior PM & GPM roles · Bengaluru · Pune · Hyderabad · Delhi NCR",
      resumeUrl: "https://manu-pratap.vercel.app/CV_Manu%20Pratap.pdf",
      metrics: {
        automation:   "22→80%",
        wms:          "₹50L/month",
        "late-delivery": "₹1Cr+",
      },
      connect: {
        showBotim: false,
      }
    },
    sea: {
      availability: "Open to Senior PM & GPM roles · Singapore · SEA",
      resumeUrl: "https://manu-pratap.vercel.app/CV_Manu%20Pratap%20IN.pdf",
      metrics: {
        automation:   "22→80%",
        wms:          "$50K+/month",
        "late-delivery": "$130K+",
      },
      connect: {
        showBotim: false,
      }
    },
    international: {
      availability: "Open to Senior PM & GPM roles · Global · Remote",
      resumeUrl: "https://manu-pratap.vercel.app/CV_Manu%20Pratap%20IN.pdf",
      metrics: {
        automation:   "22→80%",
        wms:          "$50K+/month",
        "late-delivery": "$130K+",
      },
      connect: {
        showBotim: false,
      }
    }
  };
  GEO.eu = GEO.international;

  // ── APPLY PERSONALISATION ─────────────────
  function applyGeo(data) {
    const region = GEO[data.region] || GEO.international;

    // 1. Availability pill — hero + connect (same text)
    document.querySelectorAll('[data-geo="availability"]').forEach(el => {
      el.textContent = region.availability;
    });

    // 2. Metrics
    Object.entries(region.metrics).forEach(([key, val]) => {
      document.querySelectorAll(`[data-geo-metric="${key}"]`).forEach(el => {
        el.textContent = val;
      });
    });

    // 3. Botim button
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

    // 4. Connect pill = same as hero availability
    document.querySelectorAll('[data-geo="location-pill"]').forEach(el => {
      el.textContent = region.availability;
    });

    // 5. Resume download links
    document.querySelectorAll('[data-geo="resume-url"]').forEach(el => {
      el.href = region.resumeUrl;
    });

    // 6. Body class for CSS targeting
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
