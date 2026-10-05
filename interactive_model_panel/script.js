/* Interactive Model Experiments — panel logic.
   On index.html: fetches experiments.json, sorts newest-first, renders one card per entry.
   On experiment pages: builds the small table of contents from the h2[id] headings.
   No dependencies. */
(function () {
  "use strict";

  var grid = document.getElementById("experiment-grid");
  if (grid) { loadPanel(grid); }

  var toc = document.querySelector("[data-toc]");
  if (toc) { buildToc(toc); }

  /* ---------------- panel ---------------- */

  function loadPanel(grid) {
    var emptyState = document.getElementById("empty-state");
    var countEl = document.getElementById("experiment-count");

    fetch("experiments.json", { cache: "no-cache" })
      .then(function (res) {
        if (!res.ok) { throw new Error("HTTP " + res.status + " while loading experiments.json"); }
        return res.json();
      })
      .then(function (items) {
        if (!Array.isArray(items)) { throw new Error("experiments.json must contain a JSON array"); }
        var valid = items.filter(isValid);
        var sorted = sortNewestFirst(valid);
        grid.innerHTML = "";
        if (sorted.length === 0) {
          if (emptyState) { emptyState.hidden = false; }
          if (countEl) { countEl.textContent = "No experiments yet."; }
          return;
        }
        sorted.forEach(function (exp) { grid.appendChild(renderCard(exp)); });
        if (countEl) {
          var undated = sorted.filter(function (e) { return !e._date; }).length;
          countEl.textContent = sorted.length + (sorted.length === 1 ? " experiment" : " experiments") +
            ", newest first" + (undated ? " (" + undated + " without a date listed last)" : "") + ".";
        }
      })
      .catch(function (err) {
        console.error(err);
        grid.innerHTML = "";
        var box = el("div", "error-state");
        box.appendChild(el("strong", null, "Could not load experiments.json"));
        box.appendChild(document.createTextNode(String(err.message || err) +
          ". If you opened this file directly from disk, serve the folder over HTTP instead (see README.md)."));
        grid.appendChild(box);
      });
  }

  function isValid(exp) {
    var ok = exp && typeof exp === "object" && typeof exp.slug === "string" && exp.slug.trim() &&
             typeof exp.title === "string" && exp.title.trim();
    if (!ok) { console.warn("Skipping experiments.json entry without slug/title:", exp); }
    return ok;
  }

  /* Strict YYYY-MM-DD. Anything else counts as "no date": the entry is kept, shown with a
     visible "Date not set" label, and sorted after every dated entry. Nothing is guessed. */
  function parseDate(value) {
    if (typeof value !== "string") { return null; }
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
    if (!m) { return null; }
    var d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
    // reject dates that do not exist (e.g. 2026-02-29) instead of letting Date roll them over
    if (isNaN(d.getTime()) || d.getUTCMonth() + 1 !== +m[2] || d.getUTCDate() !== +m[3]) { return null; }
    return d;
  }

  function sortNewestFirst(items) {
    items.forEach(function (e) {
      e._date = parseDate(e.date);
      if (!e._date) { console.warn("Experiment \"" + e.slug + "\" has no valid date (expected YYYY-MM-DD); listing it last."); }
    });
    return items.slice().sort(function (a, b) {
      if (a._date && b._date) { return b._date - a._date; }
      if (a._date) { return -1; }
      if (b._date) { return 1; }
      return a.title.localeCompare(b.title);
    });
  }

  function formatDate(d) {
    return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });
  }

  /* Deterministic icon colour from the slug, so cards need no inline styles.
     Override with "accent": 1..6 in experiments.json. */
  function colorClass(exp) {
    var n = parseInt(exp.accent, 10);
    if (!(n >= 1 && n <= 6)) {
      var h = 0;
      for (var i = 0; i < exp.slug.length; i++) { h = (h * 31 + exp.slug.charCodeAt(i)) >>> 0; }
      n = (h % 6) + 1;
    }
    return "c" + n;
  }

  function shortName(exp) {
    if (typeof exp.short_name === "string" && exp.short_name.trim()) { return exp.short_name.trim().slice(0, 3); }
    return exp.title.split(/\s+/).map(function (w) { return w[0]; }).join("").slice(0, 2).toUpperCase();
  }

  function renderCard(exp) {
    var a = el("a", "card");
    a.href = typeof exp.url === "string" && exp.url ? exp.url : "experiments/" + encodeURIComponent(exp.slug) + "/";

    if (exp.demo === true) { a.appendChild(el("span", "demo-badge", "Demo")); }

    var head = el("div", "card-head");
    head.appendChild(el("span", "card-icon " + colorClass(exp), shortName(exp)));
    head.appendChild(el("h2", null, exp.title));
    a.appendChild(head);

    var meta = el("div", "card-meta");
    if (exp._date) {
      var t = document.createElement("time");
      t.dateTime = exp.date.trim();
      t.textContent = formatDate(exp._date);
      meta.appendChild(t);
    } else {
      meta.appendChild(el("span", "undated", "Date not set"));
    }
    if (typeof exp.status === "string" && exp.status.trim()) {
      var s = exp.status.trim();
      meta.appendChild(el("span", "status " + s.toLowerCase().replace(/[^a-z0-9]+/g, "-"), s.replace(/-/g, " ")));
    }
    a.appendChild(meta);

    a.appendChild(el("p", null, typeof exp.summary === "string" ? exp.summary : ""));

    if (Array.isArray(exp.stats) && exp.stats.length) {
      var stats = el("div", "card-stats");
      exp.stats.forEach(function (stat) {
        var span = document.createElement("span");
        var m = /^(\S+)\s+(.+)$/.exec(String(stat));
        if (m) { span.appendChild(el("strong", null, m[1])); span.appendChild(document.createTextNode(" " + m[2])); }
        else { span.appendChild(el("strong", null, String(stat))); }
        stats.appendChild(span);
      });
      a.appendChild(stats);
    }

    if (Array.isArray(exp.tags) && exp.tags.length) {
      var tags = el("div", "card-tags");
      exp.tags.forEach(function (tag) { tags.appendChild(el("span", "tag", String(tag))); });
      a.appendChild(tags);
    }

    a.appendChild(el("span", "card-cta", "Open experiment"));
    return a;
  }

  /* ---------------- experiment page ---------------- */

  function buildToc(container) {
    var heads = document.querySelectorAll(".exp-section > h2[id]");
    if (heads.length < 2) { return; }
    var ol = document.createElement("ol");
    Array.prototype.forEach.call(heads, function (h) {
      var li = document.createElement("li");
      var link = document.createElement("a");
      link.href = "#" + h.id;
      link.textContent = h.textContent;
      li.appendChild(link);
      ol.appendChild(li);
    });
    container.appendChild(ol);
  }

  /* ---------------- helpers ---------------- */

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) { node.className = className; }
    if (text != null) { node.textContent = text; }
    return node;
  }
})();
