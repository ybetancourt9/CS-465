const express = require("express")
const hbs = require("hbs")
const path = require("path")
require("./app_api/models/db")
const mainRouter = require("./app_server/routes/index")
const apiRouter = require("./app_api/routes/index")

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

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")

  if (req.method === "OPTIONS") {
    res.sendStatus(204)
    return
  }

  next()
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use("/api", apiRouter)
app.use("/", mainRouter)
app.use(express.static(publicPath))

app.listen(port, () => {
  console.log(`Travlr site running at http://localhost:${port}`)
})
