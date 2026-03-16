const fs = require("fs")
const path = require("path")

const tripsPath = path.join(__dirname, "..", "..", "data", "trips.json")

const renderPage = (res, viewName, options = {}) => {
  res.render(viewName, options)
}

module.exports.home = (_req, res) => {
  renderPage(res, "index", {
    title: "Travlr Getaways Website Template",
    currentPage: "home"
  })
}

module.exports.travel = (_req, res) => {
  const trips = JSON.parse(fs.readFileSync(tripsPath, "utf8"))

  renderPage(res, "travel", {
    title: "Travel - Travlr Getaways Website Template",
    currentPage: "travel",
    trips
  })
}

module.exports.rooms = (_req, res) => {
  renderPage(res, "rooms", {
    title: "Rooms - Travlr Getaways Website Template",
    currentPage: "rooms"
  })
}

module.exports.meals = (_req, res) => {
  renderPage(res, "meals", {
    title: "Meals - Travlr Getaways Website Template",
    currentPage: "meals"
  })
}

module.exports.news = (_req, res) => {
  renderPage(res, "news", {
    title: "News - Travlr Getaways Website Template",
    currentPage: "news"
  })
}

module.exports.about = (_req, res) => {
  renderPage(res, "about", {
    title: "About - Travlr Getaways Website Template",
    currentPage: "about"
  })
}

module.exports.contact = (_req, res) => {
  renderPage(res, "contact", {
    title: "Contact - Travlr Getaways Website Template",
    currentPage: "contact"
  })
}

module.exports.submitContact = (_req, res) => {
  res.redirect("/contact")
}
