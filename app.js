const express = require("express")
const mustacheExpress = require("mustache-express")
const expressSession = require("express-session")

const app = express()

app.use(express.static("public"))

app.engine("mustache", mustacheExpress())
app.set("views", "./views")
app.set("view engine", "mustache")

// Dummy data of todos
let todos = {
  todos: [
    { id: 0, item: "Pick up dog food", status: "complete" },
    { id: 1, item: "Paint the bathroom", status: "incomplete" },
    { id: 2, item: "Go to Canada", status: "incomplete" },
    { id: 3, item: "Check out new vegan burger place", status: "complete" }
  ]
}

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
  res.render("login", currentUser)
})

app.use(authenticate)
app.get("/", function(req, res) {
  let completedItems = todos.todos.filter(todo => todo.status === "complete")
  let incompleteItems = todos.todos.filter(todo => todo.status === "incomplete")

  let listByCompletion = {
    complete: [],
    incomplete: [],
    currentUser: currentUser.currentUser[0].currentUser
  }

  listByCompletion.complete = completedItems
  listByCompletion.incomplete = incompleteItems

  res.render("index", listByCompletion)
})

app.get("/", function(req, res) {
  res.render("index", currentUser)
})

app.listen(3000, function() {
  console.log("Started Todo application")
})
