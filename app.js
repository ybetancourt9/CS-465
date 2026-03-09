const express = require("express")
const path = require("path")

const app = express()
const port = process.env.PORT || 3000
const publicPath = path.join(__dirname, "public")

app.use(express.static(publicPath))

const pages = ["about", "contact", "meals", "news", "rooms", "travel"]

app.get("/", (_req, res) => {
  res.sendFile(path.join(publicPath, "index.html"))
})

pages.forEach((page) => {
  app.get(`/${page}`, (_req, res) => {
    res.sendFile(path.join(publicPath, `${page}.html`))
  })
})

app.listen(port, () => {
  console.log(`Travlr site running at http://localhost:${port}`)
})
