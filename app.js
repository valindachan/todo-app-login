const express = require("express")
const bodyParser = require("body-parser")
const expressValidator = require("express-validator")
const mustacheExpress = require("mustache-express")

const app = express()

app.use(express.static("public"))

// let todos = {
//   complete: [
//     { id: 0, item: "Learn Node basics" },
//     { id: 1, item: "Learn Express basics" },
//     { id: 2, item: "Learn HTML forms with Express" }
//   ],
//   incomplete: [
//     { id: 3, item: "Learn about authentification" },
//     { id: 4, item: "Learn SQL" },
//     { id: 5, item: "Learn how to create databases" }
//   ]
// }
let todos = {
  complete: [
    "Learn to sing",
    "Learn Express basics",
    "Learn HTML forms with Express"
  ],
  incomplete: [
    "Learn about authentification",
    "Learn SQL",
    "Learn how to create databases"
  ]
}
// Set app to use bodyParser()` middleware.
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//'extended: false' parses strings and arrays.
//'extended: true' parses nested objects
//'expressValidator' must come after 'bodyParser', since data must be parsed first!
app.use(expressValidator())

app.engine("mustache", mustacheExpress())
app.set("views", "./views")
app.set("view engine", "mustache")

app.get("/", function(req, res) {
  // Set 'action' to '/'
  res.render("index", todos)
})

app.post("/createTodo", function(req, res) {
  let newTodo = req.body.todo
  todos.incomplete.push(newTodo)
  res.redirect("/")
})

app.post("/markComplete/:completeTodo", function(req, res) {
  let completeTodo = req.params.completeTodo
  todos.complete.push(completeTodo)
  res.redirect("/")
})

app.post("/markIncomplete/:incompleteTodo", function(req, res) {
  let incompleteTodo = req.params.incompleteTodo
  todos.incomplete.push(incompleteTodo)
  res.redirect("/")
})

app.listen(3000, function() {
  console.log("Started Todo application")
})
