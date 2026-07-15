const recommendations = {
  beach: [
    {
      name: 'Bora Bora Beach, French Polynesia',
      image: 'assets/beach-bora-bora.svg',
      description: 'Clear lagoon water, soft sand, and calm island scenery for a relaxing beach escape.'
    },
    {
      name: 'Maui Beach, Hawaii',
      image: 'assets/beach-maui.svg',
      description: 'A scenic coastline with warm water, surf spots, and unforgettable sunsets.'
    }
  ],
  temple: [
    {
      name: 'Kiyomizu-dera, Japan',
      image: 'assets/temple-kiyomizu.svg',
      description: 'A historic Kyoto temple known for its wooden stage and beautiful city views.'
    },
    {
      name: 'Wat Arun, Thailand',
      image: 'assets/temple-wat-arun.svg',
      description: 'A riverside temple in Bangkok with detailed architecture and golden evening light.'
    }
  ],
  japan: [
    {
      name: 'Tokyo, Japan',
      image: 'assets/country-japan.svg',
      description: 'A vibrant capital with technology, food, shopping, gardens, and museums.'
    },
    {
      name: 'Kyoto, Japan',
      image: 'assets/temple-kiyomizu.svg',
      description: 'A cultural city famous for shrines, temples, tea houses, and traditional streets.'
    }
  ],
  australia: [
    {
      name: 'Sydney, Australia',
      image: 'assets/country-australia.svg',
      description: 'A harbor city with beaches, restaurants, and iconic performing arts venues.'
    },
    {
      name: 'Great Barrier Reef, Australia',
      image: 'assets/beach-bora-bora.svg',
      description: 'A natural wonder for snorkeling, diving, and seeing colorful marine life.'
    }
  ],
  brazil: [
    {
      name: 'Rio de Janeiro, Brazil',
      image: 'assets/country-brazil.svg',
      description: 'A coastal city with beaches, mountain viewpoints, music, and energetic culture.'
    },
    {
      name: 'Iguazu Falls, Brazil',
      image: 'assets/country-brazil.svg',
      description: 'A dramatic waterfall destination surrounded by lush national park landscapes.'
    }
  ],
  country: [
    {
      name: 'Japan',
      image: 'assets/country-japan.svg',
      description: 'Japan blends futuristic cities, peaceful temples, mountain views, and deep cultural traditions.'
    },
    {
      name: 'Australia',
      image: 'assets/country-australia.svg',
      description: 'Australia offers iconic city landmarks, coastlines, reefs, wildlife, and wide open landscapes.'
    }
  ]
};

const pages = {
  home: document.getElementById('homePage'),
  about: document.getElementById('aboutPage'),
  contact: document.getElementById('contactPage')
};

const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const results = document.getElementById('recommendationResults');
const resultsMessage = document.getElementById('resultsMessage');
const clearButton = document.getElementById('clearButton');
const exploreButton = document.getElementById('exploreButton');

const pageHashes = {
  home: '',
  about: 'about',
  contact: 'contact'
};

function showPage(pageName, updateHash = true) {
  Object.values(pages).forEach((page) => page.classList.remove('active'));
  pages[pageName].classList.add('active');

  if (updateHash) {
    const nextHash = pageHashes[pageName];
    if (nextHash) {
      window.location.hash = nextHash;
    } else {
      history.replaceState(null, '', window.location.pathname);
    }
  }
}

function showPageFromHash() {
  const hash = window.location.hash.replace('#', '');
  const pageName = Object.entries(pageHashes).find((entry) => entry[1] === hash)?.[0] || 'home';
  showPage(pageName, false);
}

function normalizeSearchTerm(term) {
  const value = term.trim().toLowerCase();

  if (value.includes('beach') || value.includes('beaches') || value.includes('strand')) {
    return 'beach';
  }

  if (value.includes('temple') || value.includes('tempel')) {
    return 'temple';
  }

  if (value.includes('country') || value.includes('countries') || value.includes('land')) {
    return 'country';
  }

  if (value.includes('japan')) {
    return 'japan';
  }

  if (value.includes('australia') || value.includes('australien')) {
    return 'australia';
  }

  if (value.includes('brazil') || value.includes('brasilien')) {
    return 'brazil';
  }

  return value;
}

function displayRecommendations(items, label) {
  results.innerHTML = '';
  resultsMessage.textContent = `Showing recommendations for ${label}.`;

  items.forEach((item) => {
    const card = document.createElement('article');
    card.className = 'recommendation-card';
    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <div>
        <h3>${item.name}</h3>
        <p>${item.description}</p>
      </div>
    `;
    results.appendChild(card);
  });
}

function clearRecommendations() {
  searchInput.value = '';
  results.innerHTML = '';
  resultsMessage.textContent = 'Search for beach, temple, country, Japan, Australia, or Brazil.';
}

document.querySelectorAll('[data-page]').forEach((button) => {
  button.addEventListener('click', () => showPage(button.dataset.page));
});

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  showPage('home');

  const term = normalizeSearchTerm(searchInput.value);
  const matches = recommendations[term];

  if (matches) {
    displayRecommendations(matches, searchInput.value.trim() || term);
    return;
  }

  results.innerHTML = '';
  resultsMessage.textContent = 'No recommendations found. Try beach, temple, country, Japan, Australia, or Brazil.';
});

clearButton.addEventListener('click', clearRecommendations);
exploreButton.addEventListener('click', () => {
  searchInput.value = 'beach';
  displayRecommendations(recommendations.beach, 'beach');
});

window.addEventListener('hashchange', showPageFromHash);
showPageFromHash();
