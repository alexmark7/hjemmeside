/*
 * Illustrative collection statistics.
 * All datasets are sample data for the website; nothing here reads a real collection.
 */
(function () {
  "use strict";

  var DATASETS = {
    mixed: {
      label: "Mixed binder",
      entries: 248,
      cards: 312,
      expansions: [
        { label: "Base Set", value: 96, color: "blue" },
        { label: "Jungle", value: 64, color: "teal" },
        { label: "Fossil", value: 58, color: "yellow" },
        { label: "Neo Genesis", value: 54, color: "red" },
        { label: "Team Rocket", value: 40, color: "brown" }
      ]
    },
    fire: {
      label: "Fire-heavy binder",
      entries: 96,
      cards: 128,
      expansions: [
        { label: "FireRed & LeafGreen", value: 48, color: "red" },
        { label: "Base Set", value: 32, color: "blue" },
        { label: "Jungle", value: 28, color: "teal" },
        { label: "Fossil", value: 20, color: "yellow" }
      ]
    },
    vintage: {
      label: "Vintage sets",
      entries: 184,
      cards: 204,
      expansions: [
        { label: "Base Set", value: 72, color: "blue" },
        { label: "Jungle", value: 38, color: "teal" },
        { label: "Fossil", value: 34, color: "yellow" },
        { label: "Team Rocket", value: 24, color: "red" },
        { label: "Neo Genesis", value: 20, color: "brown" },
        { label: "Gym Heroes", value: 16, color: "slate" }
      ]
    }
  };

  var COLORS = {
    blue: "#1f569c",
    teal: "#186b5b",
    yellow: "#e0a326",
    red: "#bf3b38",
    brown: "#a99676",
    slate: "#5d4a91"
  };

  var SVG_NS = "http://www.w3.org/2000/svg";
  var state = { dataset: "mixed" };

  function makeElement(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function svgElement(tag, attributes) {
    var node = document.createElementNS(SVG_NS, tag);
    Object.keys(attributes).forEach(function (name) {
      node.setAttribute(name, attributes[name]);
    });
    return node;
  }

  function percent(value, total) {
    return Math.round((value / total) * 100);
  }

  function polar(cx, cy, radius, angleDegrees) {
    var radians = ((angleDegrees - 90) * Math.PI) / 180;
    return {
      x: cx + radius * Math.cos(radians),
      y: cy + radius * Math.sin(radians)
    };
  }

  function donutPath(cx, cy, radius, thickness, startAngle, endAngle) {
    var outerStart = polar(cx, cy, radius, startAngle);
    var outerEnd = polar(cx, cy, radius, endAngle);
    var innerEnd = polar(cx, cy, radius - thickness, endAngle);
    var innerStart = polar(cx, cy, radius - thickness, startAngle);
    var largeArc = endAngle - startAngle > 180 ? 1 : 0;
    return [
      "M", outerStart.x.toFixed(2), outerStart.y.toFixed(2),
      "A", radius, radius, "0", largeArc, "1", outerEnd.x.toFixed(2), outerEnd.y.toFixed(2),
      "L", innerEnd.x.toFixed(2), innerEnd.y.toFixed(2),
      "A", radius - thickness, radius - thickness, "0", largeArc, "0", innerStart.x.toFixed(2), innerStart.y.toFixed(2),
      "Z"
    ].join(" ");
  }

  function renderPie(container, parts, total) {
    container.textContent = "";
    var size = 320;
    var cx = 160;
    var cy = 160;
    var radius = 124;
    var thickness = 46;

    var svg = svgElement("svg", {
      viewBox: "0 0 " + size + " " + size,
      width: size,
      height: size,
      "aria-hidden": "true",
      focusable: "false"
    });

    svg.appendChild(svgElement("circle", {
      cx: cx,
      cy: cy,
      r: radius,
      fill: "#ece5d5"
    }));

    var angle = 0;
    parts.forEach(function (part) {
      var sweep = (part.value / total) * 360;
      var path = svgElement("path", {
        d: donutPath(cx, cy, radius, thickness, angle, angle + sweep),
        fill: COLORS[part.color] || COLORS.blue,
        stroke: "#fffdf9",
        "stroke-width": "3"
      });
      svg.appendChild(path);
      angle += sweep;
    });

    svg.appendChild(svgElement("circle", {
      cx: cx,
      cy: cy,
      r: radius - thickness,
      fill: "#fffdf9"
    }));

    var totalText = svgElement("text", {
      x: cx,
      y: cy - 4,
      "text-anchor": "middle",
      "font-size": "34",
      "font-weight": "800",
      fill: "#161f2c"
    });
    totalText.textContent = String(total);
    svg.appendChild(totalText);

    var label = svgElement("text", {
      x: cx,
      y: cy + 22,
      "text-anchor": "middle",
      "font-size": "15",
      "font-weight": "600",
      fill: "#5c677a"
    });
    label.textContent = "cards";
    svg.appendChild(label);

    container.appendChild(svg);
  }

  function renderLegend(list, parts, total) {
    list.textContent = "";
    parts.forEach(function (part) {
      var item = makeElement("li");
      var swatch = makeElement("span", "chart-legend__swatch chart-legend__swatch--" + part.color);
      swatch.setAttribute("aria-hidden", "true");
      item.appendChild(swatch);
      item.appendChild(document.createTextNode(part.label + ": " + part.value + " cards (" + percent(part.value, total) + "%)"));
      list.appendChild(item);
    });
  }

  function renderBars(list, parts, total) {
    list.textContent = "";
    var max = Math.max.apply(null, parts.map(function (part) { return part.value; }));
    parts.forEach(function (part) {
      var item = makeElement("li", "bar-row");
      item.appendChild(makeElement("span", "bar-row__label", part.label));

      var track = makeElement("span", "bar-row__track");
      var fill = makeElement("span", "bar-row__fill bar-row__fill--" + part.color);
      fill.style.width = Math.max(4, (part.value / max) * 100) + "%";
      track.appendChild(fill);
      item.appendChild(track);

      item.appendChild(makeElement("span", "bar-row__value", String(part.value)));
      item.setAttribute("title", part.label + ": " + part.value + " cards (" + percent(part.value, total) + "%)");
      list.appendChild(item);
    });
  }

  function renderTable(body, parts, total) {
    body.textContent = "";
    parts.forEach(function (part) {
      var row = document.createElement("tr");
      var label = document.createElement("th");
      label.scope = "row";
      label.textContent = part.label;
      var value = document.createElement("td");
      value.textContent = String(part.value);
      var share = document.createElement("td");
      share.textContent = percent(part.value, total) + "%";
      row.appendChild(label);
      row.appendChild(value);
      row.appendChild(share);
      body.appendChild(row);
    });
  }

  function renderDataset(key) {
    var dataset = DATASETS[key];
    if (!dataset) return;
    state.dataset = key;

    var total = dataset.expansions.reduce(function (sum, part) { return sum + part.value; }, 0);
    var largest = dataset.expansions.reduce(function (best, part) {
      return part.value > best.value ? part : best;
    }, dataset.expansions[0]);

    var entries = document.querySelector('[data-stat="entries"]');
    var cards = document.querySelector('[data-stat="cards"]');
    var expansions = document.querySelector('[data-stat="expansions"]');
    var largestValue = document.querySelector('[data-stat="largest"]');
    var largestNote = document.querySelector('[data-stat="largest-note"]');
    var summary = document.querySelector("[data-stats-summary]");
    var pie = document.querySelector("[data-stats-pie]");
    var legend = document.querySelector("[data-stats-legend]");
    var bars = document.querySelector("[data-stats-bars]");
    var tableBody = document.querySelector("[data-stats-table]");

    if (entries) entries.textContent = String(dataset.entries);
    if (cards) cards.textContent = String(dataset.cards);
    if (expansions) expansions.textContent = String(dataset.expansions.length);
    if (largestValue) largestValue.textContent = largest.label;
    if (largestNote) largestNote.textContent = largest.value + " cards · " + percent(largest.value, total) + "% of the collection.";
    if (summary) {
      summary.textContent = dataset.label + ": " + dataset.entries + " collection entries representing " + dataset.cards + " physical cards across " + dataset.expansions.length + " expansions. Largest: " + largest.label + " with " + largest.value + " cards.";
    }

    if (pie) {
      pie.setAttribute("aria-label", "Illustrative donut chart of physical cards by expansion for the " + dataset.label + " sample. " + dataset.expansions.map(function (part) {
        return part.label + " " + part.value + " cards";
      }).join(", ") + ".");
      renderPie(pie, dataset.expansions, total);
    }
    if (legend) renderLegend(legend, dataset.expansions, total);
    if (bars) renderBars(bars, dataset.expansions, total);
    if (tableBody) renderTable(tableBody, dataset.expansions, total);

    document.querySelectorAll("[data-stats-dataset]").forEach(function (button) {
      var active = button.getAttribute("data-stats-dataset") === key;
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  function init() {
    var buttons = document.querySelectorAll("[data-stats-dataset]");
    if (!buttons.length) return;
    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        renderDataset(button.getAttribute("data-stats-dataset"));
      });
    });
    renderDataset(state.dataset);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
