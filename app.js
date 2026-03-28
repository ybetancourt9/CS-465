const express = require("express")
const hbs = require("hbs")
const path = require("path")
require("./app_server/models/db")
const mainRouter = require("./app_server/routes/index")

const app = express()
const port = process.env.PORT || 3000
const publicPath = path.join(__dirname, "public")
const viewsPath = path.join(__dirname, "app_server", "views")
const partialsPath = path.join(viewsPath, "partials")

app.set("view engine", "hbs")
app.set("views", viewsPath)

hbs.registerPartials(partialsPath)
hbs.registerHelper("navClass", (currentPage, pageName, activeClass) => {
  return currentPage === pageName ? activeClass : ""
})

app.use(express.urlencoded({ extended: false }))
app.use("/", mainRouter)
app.use(express.static(publicPath))

app.listen(port, () => {
  console.log(`Travlr site running at http://localhost:${port}`)
})
