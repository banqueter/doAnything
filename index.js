import express from "express";

const app = express();
const port = 3000;
app.use(express.static(`public`));

const data = {
  list1: `personal`,
  itemsL1: [],
  list2: `work`,
  itemsL2: [],
};

app.get(`/`, (req, res) => {
  res.render(`list1.ejs`, { data: data });
});

app.get(`/list1`, (req, res) => {
  res.render(`list1.ejs`, { data: data });
});

app.get(`/list2`, (req, res) => {
  res.render(`list2.ejs`, { data: data });
});

app.use(express.urlencoded({ extended: true }));

app.post("/submit", (req, res) => {
  let passedData = req.body;
  if (passedData["newTodo"] !== "") {
    if (passedData["endpoint"] === "/list1") {
      data.itemsL1.push({
        text: passedData[`newTodo`],
        // creating todo's ID
        id: `#${Date.now().toString()}`,
      });
      res.redirect("/list1");
    } else if (passedData["endpoint"] === "/list2") {
      data.itemsL2.push({
        text: passedData[`newTodo`],
        // creating todo's ID
        id: `#${Date.now().toString()}`,
      });
      res.redirect("/list2");
    }
  }
});

app.listen(port, () => {
  console.log(`Server up and listening to port: ${port}`);
});
