const express = require("express")
const bodyParser = require("body-parser")
const expressValidator = require("express-validator")
const mustacheExpress = require("mustache-express")

const app = express()

app.use(express.static("public"))

//Test
let todos2 = {
  todos2: [
    { id: 0, item: "Learn Node basics", status: "complete" },
    { id: 1, item: "Learn Express basics", status: "incomplete" },
    { id: 2, item: "Learn HTML forms with Express", status: "incomplete" },
    { id: 3, item: "Learn to sing", status: "complete" }
  ]
}

// !!!!!!
// console.log(todos2.todos2[0])
//
// todos2.todos2[0].status = "incomplete"
//
// console.log(todos2.todos2[0])

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

app.get("/todos2", function(req, res) {
  let completedItems = todos2.todos2.filter(todo => todo.status === "complete")
  let incompleteItems = todos2.todos2.filter(
    todo => todo.status === "incomplete"
  )

  let listByCompletion = {
    complete: [],
    incomplete: []
  }

  listByCompletion.complete = completedItems
  listByCompletion.incomplete = incompleteItems

  res.render("index", listByCompletion)
})

// app.post("/createTodo", function(req, res) {
//   let newTodo = req.body.todo
//   todos.incomplete.push(newTodo)
//   res.redirect("/todos")
// })

app.post("/createTodo", function(req, res) {
  let newTodo = req.body.todo
  let id = todos2.todos2.length
  todos2.todos2[id] = { id: id, item: newTodo, status: "incomplete" }
  res.redirect("/todos2")
})

// app.post("/markComplete/:completeTodo", function(req, res) {
//   let completeTodo = req.params.completeTodo
//   todos.complete.push(completeTodo)
//   res.redirect("/")
// })

app.post("/markComplete/:id", function(req, res) {
  let id = req.params.id
  todos2.todos2[id].status = "complete"
  res.redirect("/todos2")
})

// SAVE THIS
// app.post("/markIncomplete/:incompleteTodo", function(req, res) {
//   let incompleteTodo = req.params.incompleteTodo
//   todos.incomplete.push(incompleteTodo)
//   res.redirect("/")
// })

app.post("/markIncomplete/:id", function(req, res) {
  let id = req.params.id
  todos2.todos2[id].status = "incomplete"
  res.redirect("/todos2")
})

app.listen(3000, function() {
  console.log("Started Todo application")
})
