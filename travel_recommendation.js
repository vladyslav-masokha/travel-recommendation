const recommendations = {
  beach: [
    {
      name: 'Bora Bora Beach, French Polynesia',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
      description: 'Clear lagoon water, soft sand, and calm island scenery for a relaxing beach escape.'
    },
    {
      name: 'Maui Beach, Hawaii',
      image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=900&q=80',
      description: 'A scenic coastline with warm water, surf spots, and unforgettable sunsets.'
    }
  ],
  temple: [
    {
      name: 'Kiyomizu-dera, Japan',
      image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=900&q=80',
      description: 'A historic Kyoto temple known for its wooden stage and beautiful city views.'
    },
    {
      name: 'Wat Arun, Thailand',
      image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=900&q=80',
      description: 'A riverside temple in Bangkok with detailed architecture and golden evening light.'
    }
  ],
  japan: [
    {
      name: 'Tokyo, Japan',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=900&q=80',
      description: 'A vibrant capital with technology, food, shopping, gardens, and museums.'
    },
    {
      name: 'Kyoto, Japan',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=80',
      description: 'A cultural city famous for shrines, temples, tea houses, and traditional streets.'
    }
  ],
  australia: [
    {
      name: 'Sydney, Australia',
      image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=900&q=80',
      description: 'A harbor city with beaches, restaurants, and iconic performing arts venues.'
    },
    {
      name: 'Great Barrier Reef, Australia',
      image: 'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?auto=format&fit=crop&w=900&q=80',
      description: 'A natural wonder for snorkeling, diving, and seeing colorful marine life.'
    }
  ],
  brazil: [
    {
      name: 'Rio de Janeiro, Brazil',
      image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=900&q=80',
      description: 'A coastal city with beaches, mountain viewpoints, music, and energetic culture.'
    },
    {
      name: 'Iguazu Falls, Brazil',
      image: 'https://images.unsplash.com/photo-1525874684015-58379d421a52?auto=format&fit=crop&w=900&q=80',
      description: 'A dramatic waterfall destination surrounded by lush national park landscapes.'
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

function showPage(pageName) {
  Object.values(pages).forEach((page) => page.classList.remove('active'));
  pages[pageName].classList.add('active');
}

function normalizeSearchTerm(term) {
  const value = term.trim().toLowerCase();

  if (value.includes('beach') || value.includes('beaches') || value.includes('strand')) {
    return 'beach';
  }

  if (value.includes('temple') || value.includes('tempel')) {
    return 'temple';
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
  resultsMessage.textContent = 'Search for beach, temple, Japan, Australia, or Brazil.';
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
  resultsMessage.textContent = 'No recommendations found. Try beach, temple, Japan, Australia, or Brazil.';
});

clearButton.addEventListener('click', clearRecommendations);
exploreButton.addEventListener('click', () => {
  searchInput.value = 'beach';
  displayRecommendations(recommendations.beach, 'beach');
});
