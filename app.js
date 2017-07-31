const express = require("express")
const mustacheExpress = require("mustache-express")
const expressSession = require("express-session")

const app = express()

app.use(express.static("public"))

app.engine("mustache", mustacheExpress())
app.set("views", "./views")
app.set("view engine", "mustache")

// Dummy list of user details for testing
let users = {
  users: [
    { id: 0, user_id: "username", password: "password1" },
    { id: 1, user_id: "username2", password: "password2" }
  ]
}

// console.log(users)

// Find another data structure to use but still know how to get this
// to work with Mustache?
let currentUser = { currentUser: [{ currentUser: "" }] }

// const authenticate = (req, res, next) => {
//   currentUser.currentUser[0].currentUser = req.query.user_id
//
//   console.log("hiiiiii")
//
//   for (var i = 0; i < users.users.length; i++) {
//     if (currentUser.currentUser[0].currentUser === users.users[i].user_id) {
//       console.log("yay")
//       next()
//     } else {
//       res.redirect("/login")
//     }
//   }
//
//   // if (req.query.user_id === "username" && req.query.pw === "password") {
//   //   next()
//   // } else {
//   //   res.redirect("/login")
//   // }
// }

const authenticate = (req, res, next) => {
  currentUser.currentUser[0].currentUser = req.query.user_id
  if (req.query.user_id === "username" && req.query.pw === "password") {
    next()
  } else {
    res.redirect("/login")
  }
}

app.get("/login", function(req, res) {
  res.render("login")
})

app.use(authenticate)
app.get("/", function(req, res) {
  res.render("index", currentUser)
})

app.listen(3000, function() {
  console.log("Started Todo application")
})
