const express = require("express")
const mustacheExpress = require("mustache-express")
const expressSession = require("express-session")

const app = express()

app.use(express.static("public"))

app.engine("mustache", mustacheExpress())
app.set("views", "./views")
app.set("view engine", "mustache")

// Dummy list of user details for testing but this isn't used
// Technically should be in a database and not here
//
// let users = {
//   users: [
//     { id: 0, user_id: "username", password: "password1" },
//     { id: 1, user_id: "username2", password: "password2" }
//   ]
// }

const authenticate = (req, res, next) => {
  currentUser = req.query.user_id
  if (req.query.user_id === "username" && req.query.pw === "password") {
    next()
  } else {
    res.redirect("/login")
  }
}

app.get("/login", function(req, res) {
  res.render("login", currentUser)
})

app.use(authenticate)
app.get("/", function(req, res) {
  let currentData = {
    currentUser: currentUser
  }
  res.render("index", currentData)
})

app.listen(3000, function() {
  console.log("Started Todo application")
})
