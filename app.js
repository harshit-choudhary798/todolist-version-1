const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.set('view engine', 'ejs');
app.use(express.static("public"));

let day = "";
let items = ["Cook the food", "Serve the food", "Eat the food"];
let worklist = [];


app.get('/', (req, res) => {
  let today = new Date();
  let options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  };

  day = today.toLocaleDateString("en-US", options);
  res.render('list', {
    foo: day,
    listItem: items

  });
});

app.post('/', function(req, res) {
  item = req.body.newItem;
  console.log(req.body);
  if (req.body.list === "work list") {
    worklist.push(item);
    res.redirect("/work");
  } else {
    item = req.body.newItem;
    items.push(item);
    res.redirect("/");
  }
});
app.get('/work', (req, res) => {
  res.render('list', {
    foo: "work list",
    listItem: worklist
  });
});

app.listen(3000, function() {
  console.log("server started on port 3000");
});
