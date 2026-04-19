require("dotenv").config()
const express = require("express")
const hbs = require("hbs")
const path = require("path")
const passport = require("passport")
require("./app_api/models/db")
require("./app_api/config/passport")
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
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")

  if (req.method === "OPTIONS") {
    res.sendStatus(204)
    return
  }

  next()
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(passport.initialize())
app.use("/api", apiRouter)
app.use("/", mainRouter)
app.use(express.static(publicPath))

app.use((err, _req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ message: `${err.name}: ${err.message}` })
    return
  }

  next(err)
})

app.listen(port, () => {
  console.log(`Travlr site running at http://localhost:${port}`)
})
