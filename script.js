const OPTION_GRID = document.getElementById("option-grid");
const REFRESH_BUTTON = document.getElementById("refresh-options");
const HISTORY_LIST = document.getElementById("selection-history");
const AI_OVERLAY = document.getElementById("ai-overlay");
const AI_OVERLAY_TEXT = document.getElementById("ai-overlay-text");
const BACKGROUND_LAYER = document.getElementById("background-layer");
const FASHION_LAYER = document.getElementById("fashion-layer");
const EFFECT_LAYER = document.getElementById("effect-layer");
const STORY_OUTPUT = document.getElementById("story-output");
const STYLE_SELECTOR = document.getElementById("style-selector");
const HAMSTER_FRAME = document.getElementById("hamster-frame");
const HAMSTER_CARTOON = document.getElementById("hamster-cartoon");
const HAMSTER_PHOTO = document.getElementById("hamster-photo");
const HAMSTER_PHOTO_IMAGE = document.getElementById("hamster-photo-image");
const HAMSTER_PHOTO_STATUS = document.getElementById("hamster-photo-status");
const SAVE_FORM = document.getElementById("save-form");
const OUTFIT_NAME_INPUT = document.getElementById("outfit-name");
const SAVED_OUTFITS_LIST = document.getElementById("saved-outfits");

const STYLE_CARTOON = "cartoon";
const STYLE_REALISTIC = "realistic";
const LEGACY_STYLE_PHOTOGRAPH = "photograph";

const FASHION_ITEMS = [
  {
    id: "flower-crown",
    name: "Flower Crown",
    description: "Rainbow petals twirl around their ears.",
    category: "Headwear",
    layer: "fashion",
    render: () => `
      <g class="flower-crown">
        <path d="M60 58 q50 -34 100 0" fill="none" stroke="#ff9ad6" stroke-width="10" stroke-linecap="round"></path>
        ${[0, 1, 2, 3, 4, 5].map((i) => {
          const x = 60 + i * 20;
          const colors = ["#ff72b6", "#ff9d4d", "#ffd93d", "#6ee7b7", "#60a5fa", "#c084fc"];
          return `<circle cx="${x}" cy="56" r="10" fill="${colors[i % colors.length]}" opacity="0.92"></circle>`;
        }).join("")}
      </g>
    `,
  },
  {
    id: "wizard-hat",
    name: "Dreamer Hat",
    description: "A twilight hat sprinkled with stars.",
    category: "Headwear",
    layer: "fashion",
    render: () => `
      <g class="wizard-hat">
        <path d="M100 30 q18 -36 36 0 l-10 54 h-18z" fill="#5145ff"></path>
        <circle cx="120" cy="40" r="4" fill="#fcd34d"></circle>
        <circle cx="128" cy="52" r="3" fill="#fcd34d"></circle>
        <circle cx="112" cy="50" r="3.5" fill="#fcd34d"></circle>
        <ellipse cx="120" cy="84" rx="24" ry="8" fill="#312e81"></ellipse>
      </g>
    `,
  },
  {
    id: "starry-cape",
    name: "Starry Cape",
    description: "A cape that shimmers like the night sky.",
    category: "Outerwear",
    layer: "fashion",
    render: () => `
      <g class="starry-cape">
        <path d="M64 150 q46 -36 92 0 l6 76 q-53 20 -104 0z" fill="#312e81" opacity="0.92"></path>
        ${Array.from({ length: 12 }, (_, i) => {
          const x = 72 + Math.random() * 72;
          const y = 170 + Math.random() * 36;
          return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(Math.random() * 2 + 1).toFixed(1)}" fill="#fcd34d" opacity="0.9"></circle>`;
        }).join("")}
      </g>
    `,
  },
  {
    id: "rainbow-scarf",
    name: "Rainbow Scarf",
    description: "Soft stripes to keep whiskers cozy.",
    category: "Neckwear",
    layer: "fashion",
    render: () => `
      <g class="rainbow-scarf">
        <path d="M74 150 q36 20 72 0 v20 q-36 18 -72 0z" fill="url(#scarfGradient)"></path>
        <defs>
          <linearGradient id="scarfGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#f472b6"></stop>
            <stop offset="25%" stop-color="#fb923c"></stop>
            <stop offset="50%" stop-color="#facc15"></stop>
            <stop offset="75%" stop-color="#34d399"></stop>
            <stop offset="100%" stop-color="#60a5fa"></stop>
          </linearGradient>
        </defs>
      </g>
    `,
  },
  {
    id: "galaxy-hoodie",
    name: "Galaxy Hoodie",
    description: "A hoodie stitched from midnight dreams.",
    category: "Outfit",
    layer: "fashion",
    render: () => `
      <g class="galaxy-hoodie">
        <path d="M72 116 q38 -32 76 0 l10 74 q-48 26 -96 0z" fill="#5b21b6" opacity="0.95"></path>
        <path d="M82 120 q28 -16 56 0" fill="none" stroke="#8b5cf6" stroke-width="6" stroke-linecap="round"></path>
        ${Array.from({ length: 8 }).map(() => {
          const x = 84 + Math.random() * 52;
          const y = 140 + Math.random() * 32;
          return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(Math.random() * 2 + 1).toFixed(1)}" fill="#facc15"></circle>`;
        }).join("")}
      </g>
    `,
  },
  {
    id: "jetpack",
    name: "Rocket Jetpack",
    description: "For hamsters who dream of the stars.",
    category: "Gadget",
    layer: "fashion",
    render: () => `
      <g class="jetpack">
        <rect x="66" y="150" width="22" height="48" rx="8" fill="#94a3b8"></rect>
        <rect x="132" y="150" width="22" height="48" rx="8" fill="#94a3b8"></rect>
        <rect x="88" y="150" width="44" height="54" rx="12" fill="#1f2937"></rect>
        <circle cx="110" cy="168" r="10" fill="#f97316"></circle>
        <path d="M80 206 q30 28 60 0" fill="#facc15" opacity="0.65"></path>
        <path d="M84 206 q26 20 52 0" fill="#fb923c" opacity="0.75"></path>
      </g>
    `,
  },
  {
    id: "bubble-wand",
    name: "Bubble Wand",
    description: "A wand that blows sparkly bubbles.",
    category: "Accessory",
    layer: "effects",
    render: () => `
      <g class="bubble-wand">
        <rect x="150" y="150" width="8" height="36" rx="4" fill="#0ea5e9"></rect>
        <circle cx="154" cy="146" r="10" fill="none" stroke="#38bdf8" stroke-width="4"></circle>
        ${Array.from({ length: 6 }).map((_, i) => {
          const x = 154 + Math.cos(i) * (18 + i * 4);
          const y = 146 - Math.sin(i) * (20 + i * 5);
          return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(6 - i).toFixed(1)}" fill="rgba(191, 219, 254, ${0.32 + i * 0.08})" stroke="#bae6fd" stroke-width="0.8"></circle>`;
        }).join("")}
      </g>
    `,
  },
  {
    id: "disco-lights",
    name: "Disco Lights",
    description: "A party backdrop of glowing lights.",
    category: "Background",
    layer: "background",
    render: () => `
      <g class="disco-lights">
        <rect x="10" y="20" width="200" height="220" rx="22" fill="#111827" opacity="0.9"></rect>
        ${Array.from({ length: 18 }).map(() => {
          const x = 20 + Math.random() * 180;
          const y = 30 + Math.random() * 200;
          const colors = ["#f472b6", "#38bdf8", "#a855f7", "#facc15"];
          const color = colors[Math.floor(Math.random() * colors.length)];
          const radius = (Math.random() * 6 + 4).toFixed(1);
          return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${radius}" fill="${color}" opacity="0.7"></circle>`;
        }).join("")}
      </g>
    `,
  },
  {
    id: "meadow-morning",
    name: "Meadow Morning",
    description: "Sunny grasses sway in the breeze.",
    category: "Background",
    layer: "background",
    render: () => `
      <g class="meadow-morning">
        <rect x="10" y="20" width="200" height="220" rx="22" fill="#bfeef2"></rect>
        <rect x="10" y="140" width="200" height="100" rx="18" fill="#86efac"></rect>
        ${Array.from({ length: 5 }).map((_, i) => {
          const x = 30 + i * 32;
          return `<path d="M${x} 180 q12 -40 24 0" stroke="#22c55e" stroke-width="4" fill="none" stroke-linecap="round"></path>`;
        }).join("")}
        <circle cx="60" cy="80" r="20" fill="#fde68a"></circle>
        <circle cx="160" cy="70" r="14" fill="#facc15"></circle>
      </g>
    `,
  },
  {
    id: "candy-clouds",
    name: "Candy Clouds",
    description: "Cotton candy clouds float above.",
    category: "Background",
    layer: "background",
    render: () => `
      <g class="candy-clouds">
        <rect x="10" y="20" width="200" height="220" rx="22" fill="#fbe9ff"></rect>
        ${Array.from({ length: 5 }).map((_, i) => {
          const x = 40 + i * 32;
          const y = 60 + (i % 2) * 28;
          return `<ellipse cx="${x}" cy="${y}" rx="30" ry="18" fill="rgba(255, 195, 246, 0.8)"></ellipse>`;
        }).join("")}
        ${Array.from({ length: 4 }).map((_, i) => {
          const x = 60 + i * 34;
          const y = 160 + (i % 2) * 18;
          return `<ellipse cx="${x}" cy="${y}" rx="24" ry="12" fill="rgba(255, 210, 248, 0.9)"></ellipse>`;
        }).join("")}
      </g>
    `,
  },
  {
    id: "heart-glasses",
    name: "Heart Glasses",
    description: "Bright pink frames for big adventures.",
    category: "Headwear",
    layer: "fashion",
    render: () => `
      <g class="heart-glasses">
        <path d="M72 110 q12 -18 24 0 t24 0 q12 -18 24 0" fill="none" stroke="#f472b6" stroke-width="6" stroke-linecap="round"></path>
        <path d="M84 112 q4 -8 10 0 q-4 10 -10 0" fill="#fbcfe8" opacity="0.7"></path>
        <path d="M132 112 q4 -8 10 0 q-4 10 -10 0" fill="#fbcfe8" opacity="0.7"></path>
        <path d="M120 110 h12" stroke="#f472b6" stroke-width="4" stroke-linecap="round"></path>
      </g>
    `,
  },
  {
    id: "bow-tie",
    name: "Polka Bow Tie",
    description: "A teal bow with playful dots.",
    category: "Neckwear",
    layer: "fashion",
    render: () => `
      <g class="bow-tie">
        <rect x="100" y="148" width="20" height="16" rx="6" fill="#14b8a6"></rect>
        <path d="M100 148 q-18 -4 -26 12 q8 18 26 12z" fill="#2dd4bf"></path>
        <path d="M120 148 q18 -4 26 12 q-8 18 -26 12z" fill="#2dd4bf"></path>
        ${Array.from({ length: 4 }).map((_, i) => {
          const angle = (Math.PI / 2) * i;
          const cx = 110 + Math.cos(angle) * 4;
          const cy = 156 + Math.sin(angle) * 4;
          return `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="2" fill="#f0fdfa"></circle>`;
        }).join("")}
      </g>
    `,
  },
  {
    id: "roller-skates",
    name: "Roller Skates",
    description: "Zip zoom with minty wheels.",
    category: "Footwear",
    layer: "fashion",
    render: () => `
      <g class="roller-skates">
        <rect x="60" y="218" width="32" height="10" rx="4" fill="#60a5fa"></rect>
        <rect x="128" y="218" width="32" height="10" rx="4" fill="#60a5fa"></rect>
        ${[68, 80, 136, 148].map((x) => `<circle cx="${x}" cy="230" r="6" fill="#10b981"></circle>`).join("")}
      </g>
    `,
  },
  {
    id: "stardust-sparkles",
    name: "Stardust Sparkles",
    description: "Twinkling glitter orbits the hamster.",
    category: "Magic",
    layer: "effects",
    render: () => `
      <g class="stardust-sparkles">
        ${Array.from({ length: 12 }).map(() => {
          const x = 60 + Math.random() * 100;
          const y = 60 + Math.random() * 120;
          const size = (Math.random() * 3 + 1).toFixed(1);
          return `<path d="M${x.toFixed(1)} ${y.toFixed(1)} l${size} ${size} l-${size} ${size} l-${size} -${size}z" fill="#fde68a" opacity="0.85"></path>`;
        }).join("")}
      </g>
    `,
  },
  {
    id: "aurora-glow",
    name: "Aurora Glow",
    description: "A magical ribbon of lights swirls behind.",
    category: "Background",
    layer: "background",
    render: () => `
      <g class="aurora-glow">
        <rect x="10" y="20" width="200" height="220" rx="22" fill="#0f172a"></rect>
        <path d="M20 160 q40 -80 80 -40 t80 -40 q20 60 30 100" fill="none" stroke="url(#auroraGradient)" stroke-width="22" stroke-linecap="round" opacity="0.9"></path>
        <defs>
          <linearGradient id="auroraGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#34d399"></stop>
            <stop offset="50%" stop-color="#60a5fa"></stop>
            <stop offset="100%" stop-color="#f472b6"></stop>
          </linearGradient>
        </defs>
      </g>
    `,
  },
  {
    id: "sprinkle-parasol",
    name: "Sprinkle Parasol",
    description: "A sweet parasol dotted with sprinkles.",
    category: "Accessory",
    layer: "effects",
    render: () => `
      <g class="sprinkle-parasol">
        <path d="M150 60 q-24 -28 -48 0 z" fill="#f9a8d4" stroke="#f472b6" stroke-width="3"></path>
        <path d="M150 60 q-24 -16 -48 0" fill="none" stroke="#fbcfe8" stroke-width="2"></path>
        ${Array.from({ length: 8 }).map((_, i) => {
          const angle = (Math.PI * i) / 7;
          const x = 150 - 24 * Math.cos(angle);
          const y = 60 - 14 * Math.sin(angle);
          return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.4" fill="#facc15"></circle>`;
        }).join("")}
        <path d="M126 60 v70" stroke="#ec4899" stroke-width="4" stroke-linecap="round"></path>
      </g>
    `,
  },
];

const ITEM_LOOKUP = new Map(FASHION_ITEMS.map((item) => [item.id, item]));

const selections = [];
const savedOutfits = [];
const SAVED_OUTFITS_STORAGE_KEY = "hamster-fashion-saved-outfits";
let storyRequestId = 0;
let currentImageStyle = STYLE_CARTOON;
const realisticImageCache = new Map();
let realisticPhotoRequestId = 0;
let pendingPhotoSignature = null;

function normalizeImageStyle(style) {
  if (style === STYLE_REALISTIC || style === LEGACY_STYLE_PHOTOGRAPH) {
    return STYLE_REALISTIC;
  }
  return STYLE_CARTOON;
}

function init() {
  hydrateSavedOutfits();
  if (STYLE_SELECTOR && STYLE_SELECTOR.value) {
    setImageStyle(STYLE_SELECTOR.value);
  } else {
    applyImageStyle(currentImageStyle);
    renderHamster();
  }
  renderSavedOutfits();
  updateOptions();
  REFRESH_BUTTON.addEventListener("click", () => {
    updateOptions();
  });
  if (STYLE_SELECTOR) {
    STYLE_SELECTOR.addEventListener("change", (event) => {
      setImageStyle(event.target.value);
    });
  }
  if (SAVE_FORM) {
    SAVE_FORM.addEventListener("submit", handleSaveOutfit);
  }
}

function hydrateSavedOutfits() {
  if (typeof window === "undefined" || !window.localStorage) {
    return;
  }

  try {
    const stored = window.localStorage.getItem(SAVED_OUTFITS_STORAGE_KEY);
    if (!stored) {
      return;
    }

    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) {
      return;
    }

    savedOutfits.length = 0;
    let mutated = false;
    parsed.forEach((entry) => {
      if (!entry || typeof entry !== "object") {
        return;
      }

      const { id, name, items, style, savedAt } = entry;

      if (!Array.isArray(items) || items.length === 0) {
        return;
      }

      const normalizedStyle = normalizeImageStyle(style);
      const filteredItems = items.filter((itemId) => ITEM_LOOKUP.has(itemId));
      if (filteredItems.length === 0) {
        return;
      }

      savedOutfits.push({
        id: typeof id === "string" && id.trim() ? id : `outfit-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        name: typeof name === "string" && name.trim() ? name.trim() : "Saved Look",
        items: filteredItems,
        style: normalizedStyle,
        savedAt: savedAt ? new Date(savedAt) : new Date(),
      });
      mutated = true;
    });

    while (savedOutfits.length > 20) {
      savedOutfits.pop();
      mutated = true;
    }

    if (mutated) {
      persistSavedOutfits();
    }
  } catch (error) {
    console.warn("Unable to load saved outfits", error);
    savedOutfits.length = 0;
    try {
      window.localStorage.removeItem(SAVED_OUTFITS_STORAGE_KEY);
    } catch (_) {
      // ignore secondary storage errors
    }
  }
}

function sampleOptions(count) {
  const selectedIds = new Set(selections.map((entry) => entry.id));
  const available = FASHION_ITEMS.filter((item) => !selectedIds.has(item.id));
  if (available.length === 0) {
    return [];
  }
  const poolCopy = [...available];
  const results = [];
  const sampleCount = Math.min(count, poolCopy.length);
  for (let i = 0; i < sampleCount; i++) {
    const index = Math.floor(Math.random() * poolCopy.length);
    results.push(poolCopy.splice(index, 1)[0]);
  }
  return results;
}

function updateOptions() {
  const count = selections.length === 0 ? 4 : 3;
  const options = sampleOptions(count);
  OPTION_GRID.innerHTML = "";

  if (options.length === 0) {
    OPTION_GRID.innerHTML = `
      <p class="no-options">You've unlocked every look! Remove one to explore more styles.</p>
    `;
    return;
  }

  options.forEach((option) => {
    const button = document.createElement("button");
    button.className = "option-card";
    button.type = "button";
    button.dataset.optionId = option.id;
    button.innerHTML = `
      <span class="option-name">${option.name}</span>
      <span class="option-desc">${option.description}</span>
    `;
    button.addEventListener("click", () => handleSelection(option.id));
    OPTION_GRID.appendChild(button);
  });
}

function handleSelection(optionId) {
  if (selections.some((entry) => entry.id === optionId)) {
    return;
  }

  const item = ITEM_LOOKUP.get(optionId);
  if (!item) {
    return;
  }

  toggleOptionButtons(true);
  showAiOverlay(`Dreaming up ${item.name} magic...`);

  const wait = 500 + Math.random() * 700;
  window.setTimeout(() => {
    selections.push({ id: optionId, addedAt: Date.now() });
    renderHamster();
    renderHistory();
    updateOptions();
    updateAiStory();
    if (currentImageStyle !== STYLE_REALISTIC) {
      hideAiOverlay();
    }
    toggleOptionButtons(false);
  }, wait);
}

function renderHamster() {
  const selectedItems = selections.map((entry) => ITEM_LOOKUP.get(entry.id)).filter(Boolean);
  if (currentImageStyle === STYLE_REALISTIC) {
    renderRealisticHamster(selectedItems);
  } else {
    renderCartoonHamster(selectedItems);
  }
}

function renderCartoonHamster(selectedItems) {
  if (!BACKGROUND_LAYER || !FASHION_LAYER || !EFFECT_LAYER) {
    return;
  }

  BACKGROUND_LAYER.innerHTML = selectedItems
    .filter((item) => item.layer === "background")
    .map((item) => item.render(item))
    .join("");

  FASHION_LAYER.innerHTML = selectedItems
    .filter((item) => item.layer === "fashion")
    .map((item) => item.render(item))
    .join("");

  EFFECT_LAYER.innerHTML = selectedItems
    .filter((item) => item.layer === "effects")
    .map((item) => item.render(item))
    .join("");
}

function clearCartoonLayers() {
  if (BACKGROUND_LAYER) {
    BACKGROUND_LAYER.innerHTML = "";
  }
  if (FASHION_LAYER) {
    FASHION_LAYER.innerHTML = "";
  }
  if (EFFECT_LAYER) {
    EFFECT_LAYER.innerHTML = "";
  }
}

async function renderRealisticHamster(selectedItems) {
  if (!HAMSTER_PHOTO_IMAGE) {
    return;
  }

  clearCartoonLayers();
  hidePhotoStatus();

  const signature = getSelectionSignature(selectedItems);
  const cached = realisticImageCache.get(signature);
  if (cached) {
    applyRealisticPhoto(cached);
    hideAiOverlay();
    return;
  }

  if (pendingPhotoSignature === signature) {
    return;
  }

  pendingPhotoSignature = signature;
  showAiOverlay("Capturing a realistic hamster photo...");

  const requestId = ++realisticPhotoRequestId;

  try {
    const response = await fetch("/api/hamster-photo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        selections: selectedItems.map((item) => ({
          id: item.id,
          name: item.name,
          category: item.category,
          description: item.description,
        })),
      }),
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    if (requestId !== realisticPhotoRequestId || currentImageStyle !== STYLE_REALISTIC) {
      return;
    }

    if (data?.image) {
      const photo = { src: data.image, alt: data.alt };
      realisticImageCache.set(signature, photo);
      applyRealisticPhoto(photo);
      hidePhotoStatus();
      hideAiOverlay();
    } else {
      throw new Error("Missing image data");
    }
  } catch (error) {
    if (requestId === realisticPhotoRequestId && currentImageStyle === STYLE_REALISTIC) {
      console.error("Realistic hamster generation failed", error);
      showPhotoStatus("We couldn't snap a hamster photo. Try again soon.", true);
      hideAiOverlay();
    }
  } finally {
    if (requestId === realisticPhotoRequestId) {
      pendingPhotoSignature = null;
    }
  }
}

function getSelectionSignature(selectedItems) {
  if (!selectedItems || selectedItems.length === 0) {
    return "__empty__";
  }
  return selectedItems
    .map((item) => item?.id)
    .filter(Boolean)
    .sort()
    .join("|");
}

function applyRealisticPhoto(photo) {
  if (!HAMSTER_PHOTO_IMAGE || !photo || !photo.src) {
    return;
  }
  HAMSTER_PHOTO_IMAGE.setAttribute("href", photo.src);
  if (typeof HAMSTER_PHOTO_IMAGE.setAttributeNS === "function") {
    HAMSTER_PHOTO_IMAGE.setAttributeNS("http://www.w3.org/1999/xlink", "href", photo.src);
  }
  if (photo.alt) {
    HAMSTER_PHOTO_IMAGE.setAttribute("aria-label", photo.alt);
  } else {
    HAMSTER_PHOTO_IMAGE.removeAttribute("aria-label");
  }
}

function showPhotoStatus(message, isError = false) {
  if (!HAMSTER_PHOTO_STATUS) {
    return;
  }
  HAMSTER_PHOTO_STATUS.textContent = message;
  if (isError) {
    HAMSTER_PHOTO_STATUS.classList.add("error");
  } else {
    HAMSTER_PHOTO_STATUS.classList.remove("error");
  }
  HAMSTER_PHOTO_STATUS.classList.remove("is-hidden");
}

function hidePhotoStatus() {
  if (!HAMSTER_PHOTO_STATUS) {
    return;
  }
  HAMSTER_PHOTO_STATUS.textContent = "";
  HAMSTER_PHOTO_STATUS.classList.remove("error");
  HAMSTER_PHOTO_STATUS.classList.add("is-hidden");
}

function renderHistory() {
  HISTORY_LIST.innerHTML = "";
  if (selections.length === 0) {
    const empty = document.createElement("li");
    empty.className = "selection-item empty";
    empty.textContent = "No fashion choices yet. Pick an accessory to begin!";
    HISTORY_LIST.appendChild(empty);
    return;
  }

  selections.forEach((entry) => {
    const item = ITEM_LOOKUP.get(entry.id);
    if (!item) return;

    const li = document.createElement("li");
    li.className = "selection-item";

    const textWrapper = document.createElement("div");
    textWrapper.className = "selection-text";
    const name = document.createElement("span");
    name.className = "selection-name";
    name.textContent = item.name;

    const category = document.createElement("span");
    category.className = "selection-category";
    category.textContent = item.category;

    textWrapper.appendChild(name);
    textWrapper.appendChild(category);

    const removeButton = document.createElement("button");
    removeButton.className = "remove-button";
    removeButton.type = "button";
    removeButton.setAttribute("aria-label", `Remove ${item.name}`);
    removeButton.textContent = "✕";
    removeButton.addEventListener("click", () => removeSelection(entry.id));

    li.appendChild(textWrapper);
    li.appendChild(removeButton);

    HISTORY_LIST.appendChild(li);
  });
}

async function updateAiStory() {
  if (!STORY_OUTPUT) {
    return;
  }

  const selectedItems = selections
    .map((entry) => ITEM_LOOKUP.get(entry.id))
    .filter(Boolean);

  if (selectedItems.length === 0) {
    STORY_OUTPUT.textContent = "Choose accessories to let our AI stylist narrate your hamster's runway moment.";
    STORY_OUTPUT.classList.remove("error");
    return;
  }

  STORY_OUTPUT.textContent = "Consulting our AI stylist...";
  STORY_OUTPUT.classList.remove("error");

  const requestId = ++storyRequestId;

  try {
    const response = await fetch("/api/fashion-story", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        selections: selectedItems.map((item) => ({
          id: item.id,
          name: item.name,
          category: item.category,
          description: item.description,
        })),
      }),
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    if (requestId !== storyRequestId) {
      return;
    }

    if (data.story) {
      STORY_OUTPUT.textContent = data.story;
      STORY_OUTPUT.classList.remove("error");
    } else {
      STORY_OUTPUT.textContent = "Our AI stylist is speechless. Try a different combo!";
      STORY_OUTPUT.classList.remove("error");
    }
  } catch (error) {
    if (requestId !== storyRequestId) {
      return;
    }

    console.error("Story generation failed", error);
    STORY_OUTPUT.textContent =
      "We couldn't reach the AI stylist. Try refreshing or checking the server.";
    STORY_OUTPUT.classList.add("error");
  }
}

function removeSelection(optionId) {
  const index = selections.findIndex((entry) => entry.id === optionId);
  if (index === -1) return;
  selections.splice(index, 1);
  renderHamster();
  renderHistory();
  updateOptions();
  updateAiStory();
}

function showAiOverlay(message) {
  if (!AI_OVERLAY || !AI_OVERLAY_TEXT) {
    return;
  }
  AI_OVERLAY_TEXT.textContent = message;
  AI_OVERLAY.classList.remove("hidden");
}

function hideAiOverlay() {
  if (!AI_OVERLAY) {
    return;
  }
  AI_OVERLAY.classList.add("hidden");
}

function toggleOptionButtons(disabled) {
  OPTION_GRID.querySelectorAll("button").forEach((button) => {
    button.disabled = disabled;
  });
  REFRESH_BUTTON.disabled = disabled;
}

function setImageStyle(style) {
  const normalized = normalizeImageStyle(style);
  currentImageStyle = normalized;
  applyImageStyle(normalized);
  if (STYLE_SELECTOR) {
    const selectorHasValue = Array.from(STYLE_SELECTOR.options).some(
      (option) => option.value === normalized,
    );
    const legacyValue = normalized === STYLE_REALISTIC ? LEGACY_STYLE_PHOTOGRAPH : normalized;
    const targetValue = selectorHasValue ? normalized : legacyValue;
    if (STYLE_SELECTOR.value !== targetValue) {
      STYLE_SELECTOR.value = targetValue;
    }
  }
  renderHamster();
}

function applyImageStyle(style) {
  if (!HAMSTER_CARTOON || !HAMSTER_PHOTO || !HAMSTER_FRAME) {
    return;
  }
  const isRealistic = style === STYLE_REALISTIC || style === LEGACY_STYLE_PHOTOGRAPH;
  if (isRealistic) {
    HAMSTER_CARTOON.classList.add("is-hidden");
    HAMSTER_PHOTO.classList.remove("is-hidden");
    HAMSTER_FRAME.classList.add("photo-style");
  } else {
    HAMSTER_CARTOON.classList.remove("is-hidden");
    HAMSTER_PHOTO.classList.add("is-hidden");
    HAMSTER_FRAME.classList.remove("photo-style");
    hidePhotoStatus();
    realisticPhotoRequestId += 1;
    pendingPhotoSignature = null;
    hideAiOverlay();
  }
}

function handleSaveOutfit(event) {
  event.preventDefault();
  if (selections.length === 0) {
    emphasizeSaveInput("Choose an accessory first");
    return;
  }

  const nameInput = OUTFIT_NAME_INPUT ? OUTFIT_NAME_INPUT.value.trim() : "";
  const items = selections.map((entry) => entry.id);

  if (isOutfitDuplicate(items, currentImageStyle)) {
    emphasizeSaveInput("This look is already saved");
    return;
  }

  const outfit = {
    id:
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `outfit-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    name: nameInput || generateOutfitName(),
    items: [...items],
    style: currentImageStyle,
    savedAt: new Date(),
  };

  savedOutfits.unshift(outfit);
  if (savedOutfits.length > 20) {
    savedOutfits.pop();
  }

  if (OUTFIT_NAME_INPUT) {
    OUTFIT_NAME_INPUT.value = "";
    OUTFIT_NAME_INPUT.placeholder = "Give this look a name";
  }

  persistSavedOutfits();
  renderSavedOutfits();
}

function renderSavedOutfits() {
  if (!SAVED_OUTFITS_LIST) {
    return;
  }

  SAVED_OUTFITS_LIST.innerHTML = "";

  if (savedOutfits.length === 0) {
    const empty = document.createElement("li");
    empty.className = "saved-empty";
    empty.textContent = "No saved outfits yet. Build a look and save it here!";
    SAVED_OUTFITS_LIST.appendChild(empty);
    return;
  }

  savedOutfits.forEach((outfit) => {
    const li = document.createElement("li");
    li.className = "saved-outfit-item";

    const header = document.createElement("div");
    header.className = "saved-outfit-header";

    const name = document.createElement("span");
    name.className = "saved-outfit-name";
    name.textContent = outfit.name;

    const meta = document.createElement("span");
    meta.className = "saved-outfit-meta";
    meta.textContent = formatSavedOutfitMeta(outfit);

    header.appendChild(name);
    header.appendChild(meta);

    const actions = document.createElement("div");
    actions.className = "saved-outfit-actions";

    const loadButton = document.createElement("button");
    loadButton.type = "button";
    loadButton.className = "load-button";
    loadButton.textContent = "Load";
    loadButton.addEventListener("click", () => loadOutfit(outfit.id));

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteOutfit(outfit.id));

    actions.appendChild(loadButton);
    actions.appendChild(deleteButton);

    const preview = document.createElement("div");
    preview.className = "saved-outfit-meta";
    preview.textContent = buildOutfitPreview(outfit);

    li.appendChild(header);
    li.appendChild(preview);
    li.appendChild(actions);
    SAVED_OUTFITS_LIST.appendChild(li);
  });
}

function buildOutfitPreview(outfit) {
  const itemNames = outfit.items
    .map((id) => ITEM_LOOKUP.get(id))
    .filter(Boolean)
    .map((item) => item.name);
  if (itemNames.length === 0) {
    return "No items selected";
  }
  return itemNames.join(", ");
}

function formatSavedOutfitMeta(outfit) {
  const normalizedStyle = normalizeImageStyle(outfit.style);
  const styleLabel = normalizedStyle === STYLE_REALISTIC ? "Realistic" : "Cartoon";
  const savedAt = outfit.savedAt instanceof Date ? outfit.savedAt : new Date(outfit.savedAt);
  return `${styleLabel} • ${savedAt.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })}`;
}

function loadOutfit(outfitId) {
  const outfit = savedOutfits.find((entry) => entry.id === outfitId);
  if (!outfit) {
    return;
  }

  selections.length = 0;
  const timestamp = Date.now();
  outfit.items.forEach((id, index) => {
    if (ITEM_LOOKUP.has(id)) {
      selections.push({ id, addedAt: timestamp + index });
    }
  });

  setImageStyle(outfit.style);
  renderHamster();
  renderHistory();
  updateOptions();
  updateAiStory();
}

function deleteOutfit(outfitId) {
  const index = savedOutfits.findIndex((entry) => entry.id === outfitId);
  if (index === -1) {
    return;
  }
  savedOutfits.splice(index, 1);
  persistSavedOutfits();
  renderSavedOutfits();
}

function persistSavedOutfits() {
  if (typeof window === "undefined" || !window.localStorage) {
    return;
  }

  try {
    const payload = savedOutfits.map((outfit) => ({
      id: outfit.id,
      name: outfit.name,
      items: [...outfit.items],
      style: outfit.style,
      savedAt:
        outfit.savedAt instanceof Date
          ? outfit.savedAt.toISOString()
          : new Date(outfit.savedAt).toISOString(),
    }));
    window.localStorage.setItem(SAVED_OUTFITS_STORAGE_KEY, JSON.stringify(payload));
  } catch (error) {
    console.warn("Unable to save outfits", error);
  }
}

function isOutfitDuplicate(items, style) {
  const normalizedItems = [...items].sort();
  return savedOutfits.some((outfit) => {
    if (outfit.style !== style) {
      return false;
    }
    return arraysEqual(normalizedItems, [...outfit.items].sort());
  });
}

function arraysEqual(a, b) {
  if (a.length !== b.length) {
    return false;
  }
  return a.every((value, index) => value === b[index]);
}

function generateOutfitName() {
  const normalizedStyle = normalizeImageStyle(currentImageStyle);
  const base = normalizedStyle === STYLE_REALISTIC ? "Realistic Look" : "Cartoon Look";
  const count = savedOutfits.filter((outfit) => outfit.name.startsWith(base)).length + 1;
  return `${base} #${count}`;
}

function emphasizeSaveInput(placeholder) {
  if (!OUTFIT_NAME_INPUT) {
    return;
  }
  if (placeholder) {
    OUTFIT_NAME_INPUT.placeholder = placeholder;
  }
  OUTFIT_NAME_INPUT.classList.add("attention");
  window.setTimeout(() => {
    OUTFIT_NAME_INPUT.classList.remove("attention");
    OUTFIT_NAME_INPUT.placeholder = "Give this look a name";
  }, 1200);
}

renderHistory();
updateAiStory();
init();
