/*
 * Interactive search, sort, and filter demonstration.
 * Uses sample data only — it never touches the desktop application or a real collection.
 */
(function () {
  "use strict";

  var DATA = [
    { id: "charizard", name: "Charizard", expansion: "Base Set", number: "004/165", category: "Pokémon", types: ["Fire"], stage: "Stage 2", hp: 120, retreat: 3, condition: "Near Mint", variant: "Holo", quantity: 2, art: "assets/img/placeholders/card-charizard.svg" },
    { id: "pikachu", name: "Pikachu", expansion: "Base Set", number: "025/165", category: "Pokémon", types: ["Lightning"], stage: "Basic", hp: 60, retreat: 1, condition: "Near Mint", variant: "Standard", quantity: 4, art: "assets/img/placeholders/card-pikachu.svg" },
    { id: "blastoise", name: "Blastoise", expansion: "Base Set", number: "009/165", category: "Pokémon", types: ["Water"], stage: "Stage 2", hp: 100, retreat: 3, condition: "Excellent", variant: "Holo", quantity: 1, art: "assets/img/placeholders/card-blastoise.svg" },
    { id: "venusaur", name: "Venusaur", expansion: "Base Set", number: "002/165", category: "Pokémon", types: ["Grass"], stage: "Stage 2", hp: 100, retreat: 4, condition: "Good", variant: "Holo", quantity: 1, art: "assets/img/placeholders/card-venusaur.svg" },
    { id: "gengar", name: "Gengar", expansion: "Base Set", number: "094/165", category: "Pokémon", types: ["Psychic"], stage: "Stage 2", hp: 80, retreat: 1, condition: "Near Mint", variant: "Holo", quantity: 3, art: "assets/img/placeholders/card-gengar.svg" },
    { id: "mewtwo", name: "Mewtwo", expansion: "Base Set", number: "150/165", category: "Pokémon", types: ["Psychic"], stage: "Basic", hp: 130, retreat: 2, condition: "Mint", variant: "Holo", quantity: 1, art: "assets/img/placeholders/card-mewtwo.svg" },
    { id: "snorlax", name: "Snorlax", expansion: "Jungle", number: "027/64", category: "Pokémon", types: ["Normal"], stage: "Basic", hp: 90, retreat: 4, condition: "Played", variant: "Standard", quantity: 2, art: "assets/img/placeholders/card-snorlax.svg" },
    { id: "dragonite", name: "Dragonite", expansion: "Fossil", number: "019/62", category: "Pokémon", types: ["Dragon"], stage: "Stage 2", hp: 100, retreat: 2, condition: "Excellent", variant: "Holo", quantity: 1, art: "assets/img/placeholders/card-dragonite.svg" },
    { id: "eevee", name: "Eevee", expansion: "Jungle", number: "051/64", category: "Pokémon", types: ["Normal"], stage: "Basic", hp: 50, retreat: 1, condition: "Near Mint", variant: "Standard", quantity: 3, art: "assets/img/placeholders/card-eevee.svg" },
    { id: "vaporeon", name: "Vaporeon", expansion: "Jungle", number: "012/64", category: "Pokémon", types: ["Water"], stage: "Stage 1", hp: 90, retreat: 2, condition: "Good", variant: "Reverse Holo", quantity: 1, art: "assets/img/placeholders/card-vaporeon.svg" },
    { id: "jolteon", name: "Jolteon", expansion: "Jungle", number: "020/64", category: "Pokémon", types: ["Lightning"], stage: "Stage 1", hp: 80, retreat: 1, condition: "Excellent", variant: "Holo", quantity: 1, art: "assets/img/placeholders/card-jolteon.svg" },
    { id: "flareon", name: "Flareon", expansion: "Jungle", number: "019/64", category: "Pokémon", types: ["Fire"], stage: "Stage 1", hp: 90, retreat: 2, condition: "Near Mint", variant: "Standard", quantity: 2, art: "assets/img/placeholders/card-flareon.svg" },
    { id: "machamp", name: "Machamp", expansion: "Base Set", number: "008/102", category: "Pokémon", types: ["Fighting"], stage: "Stage 2", hp: 100, retreat: 3, condition: "Good", variant: "Holo", quantity: 1, art: "assets/img/placeholders/card-machamp.svg" },
    { id: "alakazam", name: "Alakazam", expansion: "Base Set", number: "001/102", category: "Pokémon", types: ["Psychic"], stage: "Stage 2", hp: 80, retreat: 2, condition: "Played", variant: "Holo", quantity: 1, art: "assets/img/placeholders/card-alakazam.svg" },
    { id: "onix", name: "Onix", expansion: "Base Set", number: "056/102", category: "Pokémon", types: ["Fighting"], stage: "Basic", hp: 90, retreat: 3, condition: "Good", variant: "Standard", quantity: 2, art: "assets/img/placeholders/card-onix.svg" },
    { id: "magneton", name: "Magneton", expansion: "Base Set", number: "009/102", category: "Pokémon", types: ["Metal"], stage: "Stage 1", hp: 80, retreat: 2, condition: "Excellent", variant: "Holo", quantity: 1, art: "assets/img/placeholders/card-magneton.svg" },
    { id: "charizard-ex", name: "Charizard ex", expansion: "Scarlet & Violet", number: "006/165", category: "Pokémon", types: ["Fire", "Darkness"], stage: "Stage 2", hp: 330, retreat: 2, condition: "Near Mint", variant: "Holo", quantity: 1, art: "assets/img/placeholders/card-charizard-ex.svg" },
    { id: "pikachu-vmax", name: "Pikachu VMAX", expansion: "Sword & Shield", number: "044/185", category: "Pokémon", types: ["Lightning"], stage: "VMAX", hp: 310, retreat: 2, condition: "Mint", variant: "Holo", quantity: 1, art: "assets/img/placeholders/card-pikachu.svg" },
    { id: "mew-vstar", name: "Mew VSTAR", expansion: "Crown Zenith", number: "GG44/GG70", category: "Pokémon", types: ["Psychic"], stage: "VSTAR", hp: 270, retreat: 1, condition: "Near Mint", variant: "Holo", quantity: 1, art: "assets/img/placeholders/card-mewtwo.svg" },
    { id: "professor-oak", name: "Professor Oak", expansion: "Base Set", number: "088/102", category: "Trainer", types: [], stage: "", hp: null, retreat: null, condition: "Near Mint", variant: "Standard", quantity: 2, art: "assets/img/placeholders/card-professor-oak.svg" },
    { id: "bill", name: "Bill", expansion: "Base Set", number: "091/102", category: "Trainer", types: [], stage: "", hp: null, retreat: null, condition: "Excellent", variant: "Standard", quantity: 1, art: "assets/img/placeholders/card-bill.svg" },
    { id: "fire-energy", name: "Fire Energy", expansion: "Base Set", number: "098/102", category: "Energy", types: ["Fire"], stage: "", hp: null, retreat: null, condition: "Near Mint", variant: "Standard", quantity: 6, art: "assets/img/placeholders/card-fire-energy.svg" },
    { id: "double-colorless-energy", name: "Double Colorless Energy", expansion: "Base Set", number: "096/102", category: "Energy", types: [], stage: "", hp: null, retreat: null, condition: "Good", variant: "Standard", quantity: 3, art: "assets/img/placeholders/card-double-colorless-energy.svg" }
  ];

  var CONDITION_RANK = { Mint: 6, "Near Mint": 5, Excellent: 4, Good: 3, Played: 2, Damaged: 1 };
  var VARIANT_RANK = { Standard: 1, Holo: 2, "Reverse Holo": 3 };
  var STAGE_RANK = { Basic: 1, "Stage 1": 2, "Stage 2": 3, VMAX: 4, VSTAR: 5 };

  var FILTER_LABELS = {
    expansion: "Expansion",
    category: "Category",
    type: "Type",
    stage: "Stage",
    condition: "Condition",
    variant: "Variant",
    minHp: "HP at least",
    maxHp: "HP at most",
    minRetreat: "Retreat at least",
    maxRetreat: "Retreat at most"
  };

  var state = {
    search: "",
    sort: "name",
    direction: "asc",
    filters: {
      expansion: "",
      category: "",
      type: "",
      stage: "",
      condition: "",
      variant: "",
      minHp: "",
      maxHp: "",
      minRetreat: "",
      maxRetreat: ""
    }
  };

  function normalizeNumber(value) {
    var part = String(value).split("/")[0].replace(/^0+/, "");
    return part.toLowerCase();
  }

  function matchesSearch(card, query) {
    if (!query) return true;
    var name = card.name.toLowerCase();
    var number = card.number.toLowerCase();
    var numeric = normalizeNumber(card.number);
    return name.indexOf(query) !== -1 || number.indexOf(query) !== -1 || (numeric && numeric === query.replace(/^0+/, ""));
  }

  function matchesFilters(card) {
    var f = state.filters;
    if (f.expansion && card.expansion !== f.expansion) return false;
    if (f.category && card.category !== f.category) return false;
    if (f.type && card.types.indexOf(f.type) === -1) return false;
    if (f.stage && card.stage !== f.stage) return false;
    if (f.condition && card.condition !== f.condition) return false;
    if (f.variant && card.variant !== f.variant) return false;
    if (f.minHp !== "" && (card.hp === null || card.hp < Number(f.minHp))) return false;
    if (f.maxHp !== "" && (card.hp === null || card.hp > Number(f.maxHp))) return false;
    if (f.minRetreat !== "" && (card.retreat === null || card.retreat < Number(f.minRetreat))) return false;
    if (f.maxRetreat !== "" && (card.retreat === null || card.retreat > Number(f.maxRetreat))) return false;
    return true;
  }

  function sortValue(card, field) {
    switch (field) {
      case "name": return card.name;
      case "expansion": return card.expansion;
      case "number":
        var numeric = parseInt(card.number, 10);
        return isNaN(numeric) ? null : numeric;
      case "category": return card.category;
      case "type": return card.types.length ? card.types.join(", ") : null;
      case "stage": return card.stage ? STAGE_RANK[card.stage] || card.stage : null;
      case "hp": return card.hp;
      case "retreat": return card.retreat;
      case "condition": return CONDITION_RANK[card.condition] || null;
      case "variant": return VARIANT_RANK[card.variant] || null;
      case "quantity": return card.quantity;
      default: return card.name;
    }
  }

  function compareCards(a, b) {
    var av = sortValue(a, state.sort);
    var bv = sortValue(b, state.sort);
    var aMissing = av === null || av === undefined || av === "";
    var bMissing = bv === null || bv === undefined || bv === "";
    if (aMissing && bMissing) return compareNames(a, b);
    if (aMissing) return 1;
    if (bMissing) return -1;
    var result;
    if (typeof av === "number" && typeof bv === "number") {
      result = av - bv;
    } else {
      result = String(av).localeCompare(String(bv), "en", { numeric: true, sensitivity: "base" });
    }
    if (result === 0) return compareNames(a, b);
    return state.direction === "desc" ? -result : result;
  }

  function compareNames(a, b) {
    return a.name.localeCompare(b.name, "en", { numeric: true, sensitivity: "base" });
  }

  function hasActiveFilters() {
    return Object.keys(state.filters).some(function (key) {
      return state.filters[key] !== "";
    });
  }

  function makeElement(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function typeChip(type) {
    return makeElement("span", "type type--" + type.toLowerCase(), type);
  }

  function renderCard(card) {
    var item = makeElement("li");
    var article = makeElement("article", "demo-card");

    var art = makeElement("div", "demo-card__art");
    var image = document.createElement("img");
    image.src = card.art;
    image.alt = "Original placeholder card illustration for " + card.name;
    image.width = 600;
    image.height = 840;
    art.appendChild(image);

    var body = makeElement("div", "demo-card__body");
    body.appendChild(makeElement("h3", "demo-card__name", card.name));

    var meta = makeElement("p", "demo-card__meta");
    meta.appendChild(makeElement("span", null, card.expansion));
    meta.appendChild(document.createTextNode(" · "));
    meta.appendChild(makeElement("span", "code-badge", card.number));
    body.appendChild(meta);

    var tags = makeElement("div", "demo-card__tags");
    card.types.forEach(function (type) {
      tags.appendChild(typeChip(type));
    });
    if (card.category !== "Pokémon") {
      tags.appendChild(makeElement("span", "chip", card.category));
    }
    tags.appendChild(makeElement("span", "chip", card.condition));
    tags.appendChild(makeElement("span", "chip", card.variant));

    var facts = makeElement("ul", "demo-card__facts");
    if (card.hp !== null) facts.appendChild(makeElement("li", null, "HP " + card.hp));
    if (card.retreat !== null) facts.appendChild(makeElement("li", null, "Retreat " + card.retreat));
    var quantity = makeElement("li");
    quantity.appendChild(makeElement("span", "mono-tag mono-tag--yellow", card.quantity + (card.quantity === 1 ? " copy" : " copies")));
    facts.appendChild(quantity);

    body.appendChild(tags);
    body.appendChild(facts);
    article.appendChild(art);
    article.appendChild(body);
    item.appendChild(article);
    return item;
  }

  function renderActiveFilters(list) {
    list.textContent = "";
    Object.keys(state.filters).forEach(function (key) {
      var value = state.filters[key];
      if (value === "") return;
      var item = makeElement("li");
      var button = makeElement("button", null, FILTER_LABELS[key] + ": " + value);
      button.type = "button";
      button.setAttribute("data-clear-filter", key);
      button.setAttribute("aria-label", "Remove filter " + FILTER_LABELS[key] + ": " + value);
      item.appendChild(button);
      list.appendChild(item);
    });
  }

  function renderEmpty() {
    var item = makeElement("li", "demo-empty");
    item.appendChild(makeElement("h3", null, "No sample cards match"));
    item.appendChild(makeElement("p", null, "Try removing a filter or changing the search. Clearing filters will not clear the text search."));
    var button = makeElement("button", "btn btn--ghost", "Clear filters");
    button.type = "button";
    button.setAttribute("data-demo-reset-empty", "");
    item.appendChild(button);
    return item;
  }

  function init() {
    var root = document.querySelector("[data-demo]");
    if (!root) return;

    var searchInput = root.querySelector("[data-demo-search]");
    var sortSelect = root.querySelector("[data-demo-sort]");
    var directionSelect = root.querySelector("[data-demo-direction]");
    var countOutput = root.querySelector("[data-demo-count]");
    var activeList = root.querySelector("[data-demo-active]");
    var resultsList = root.querySelector("[data-demo-results]");
    var resetButton = root.querySelector("[data-demo-reset]");
    var filterInputs = root.querySelectorAll("[data-demo-filter]");

    function clearFilters() {
      Object.keys(state.filters).forEach(function (key) {
        state.filters[key] = "";
      });
      filterInputs.forEach(function (input) {
        input.value = "";
      });
      render();
      if (searchInput) searchInput.focus();
    }

    function render() {
      var query = state.search.trim().toLowerCase();
      var visible = DATA.filter(function (card) {
        return matchesSearch(card, query) && matchesFilters(card);
      });
      visible.sort(compareCards);

      resultsList.textContent = "";
      if (visible.length === 0) {
        resultsList.appendChild(renderEmpty());
      } else {
        var fragment = document.createDocumentFragment();
        visible.forEach(function (card) {
          fragment.appendChild(renderCard(card));
        });
        resultsList.appendChild(fragment);
      }

      var countText;
      if (visible.length === DATA.length && !query && !hasActiveFilters()) {
        countText = "Showing all " + DATA.length + " sample cards";
      } else {
        countText = "Showing " + visible.length + " of " + DATA.length + " sample cards";
        if (query) countText += " for “" + state.search.trim() + "”";
        var activeCount = Object.keys(state.filters).filter(function (key) {
          return state.filters[key] !== "";
        }).length;
        if (activeCount) {
          countText += " · " + activeCount + (activeCount === 1 ? " filter" : " filters") + " active";
        }
      }
      countOutput.textContent = countText;
      renderActiveFilters(activeList);
    }

    if (searchInput) {
      searchInput.addEventListener("input", function () {
        state.search = searchInput.value;
        render();
      });
    }

    if (sortSelect) {
      sortSelect.addEventListener("change", function () {
        state.sort = sortSelect.value;
        render();
      });
    }

    if (directionSelect) {
      directionSelect.addEventListener("change", function () {
        state.direction = directionSelect.value;
        render();
      });
    }

    filterInputs.forEach(function (input) {
      input.addEventListener("input", function () {
        state.filters[input.getAttribute("data-demo-filter")] = input.value;
        render();
      });
      input.addEventListener("change", function () {
        state.filters[input.getAttribute("data-demo-filter")] = input.value;
        render();
      });
    });

    if (resetButton) {
      resetButton.addEventListener("click", clearFilters);
    }

    if (activeList) {
      activeList.addEventListener("click", function (event) {
        var button = event.target.closest("[data-clear-filter]");
        if (!button) return;
        var key = button.getAttribute("data-clear-filter");
        state.filters[key] = "";
        var input = root.querySelector('[data-demo-filter="' + key + '"]');
        if (input) input.value = "";
        render();
      });
    }

    if (resultsList) {
      resultsList.addEventListener("click", function (event) {
        if (event.target.closest("[data-demo-reset-empty]")) {
          clearFilters();
        }
      });
    }

    render();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
