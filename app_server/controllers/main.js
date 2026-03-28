const Trip = require('../models/travlr');

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
    const trips = await Trip.find().sort({ start: 1 }).lean();

    renderPage(res, 'travel', {
      title: 'Travel - Travlr Getaways Website Template',
      currentPage: 'travel',
      trips
    })
  } catch (error) {
    console.error('Error loading trips from MongoDB:', error)
    res.status(500)
    renderPage(res, 'travel', {
      title: 'Travel - Travlr Getaways Website Template',
      currentPage: 'travel',
      trips: []
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
