const apiBaseUrl = 'http://localhost:3000/api';
const tripsEndpoint = `${apiBaseUrl}/trips`;
const options = {
  method: 'GET',
  headers: {
    Accept: 'application/json'
  }
};

const renderPage = (res, viewName, options = {}) => {
  res.render(viewName, options)
}

module.exports.home = (_req, res) => {
  renderPage(res, 'index', {
    title: 'Travlr Getaways Website Template',
    currentPage: 'home'
  })
}

module.exports.travel = async (_req, res) => {
  try {
    const response = await fetch(tripsEndpoint, options);

    if (!response.ok) {
      throw new Error(`API returned status ${response.status}`);
    }

    const json = await response.json();

    if (!Array.isArray(json)) {
      renderPage(res, 'travel', {
        title: 'Travel - Travlr Getaways Website Template',
        currentPage: 'travel',
        trips: [],
        message: 'Trip data was not returned in the expected format.'
      })
      return;
    }

    if (json.length === 0) {
      renderPage(res, 'travel', {
        title: 'Travel - Travlr Getaways Website Template',
        currentPage: 'travel',
        trips: [],
        message: 'No trips are currently available.'
      })
      return;
    }

    renderPage(res, 'travel', {
      title: 'Travel - Travlr Getaways Website Template',
      currentPage: 'travel',
      trips: json
    })
  } catch (error) {
    res.status(500)
    renderPage(res, 'travel', {
      title: 'Travel - Travlr Getaways Website Template',
      currentPage: 'travel',
      trips: [],
      message: error.message
    })
  }
}

module.exports.rooms = (_req, res) => {
  renderPage(res, 'rooms', {
    title: 'Rooms - Travlr Getaways Website Template',
    currentPage: 'rooms'
  })
}

module.exports.meals = (_req, res) => {
  renderPage(res, 'meals', {
    title: 'Meals - Travlr Getaways Website Template',
    currentPage: 'meals'
  })
}

module.exports.news = (_req, res) => {
  renderPage(res, 'news', {
    title: 'News - Travlr Getaways Website Template',
    currentPage: 'news'
  })
}

module.exports.about = (_req, res) => {
  renderPage(res, 'about', {
    title: 'About - Travlr Getaways Website Template',
    currentPage: 'about'
  })
}

module.exports.contact = (_req, res) => {
  renderPage(res, 'contact', {
    title: 'Contact - Travlr Getaways Website Template',
    currentPage: 'contact'
  })
}

module.exports.submitContact = (_req, res) => {
  res.redirect('/contact')
}
