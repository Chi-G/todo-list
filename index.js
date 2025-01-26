import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  password: "chibuike4u",
  port: 5433,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  const sort = req.query.sort || 'asc';
  try {
    const result = await db.query(`SELECT * FROM items ORDER BY created_at ${sort.toUpperCase()}`);
    const items = result.rows;

    res.render("index.ejs", {
      listTitle: "TODO LIST",
      listItems: items,
      sortOrder: sort
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/sort", async (req, res) => {
  const order = req.query.order || 'asc';
  try {
    const result = await db.query(`SELECT * FROM items ORDER BY created_at ${order.toUpperCase()}`);
    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error sorting items");
  }
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  const createdAt = new Date();
  // items.push({title: item});
  try {
    await db.query("INSERT INTO items (title, created_at) VALUES ($1, $2)", [item, createdAt]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.post("/edit", async (req, res) => {
  const item = req.body.updatedItemTitle;
  const id = req.body.updatedItemId;

  try {
    await db.query("UPDATE items SET title = ($1) WHERE id = $2", [item, id]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.post("/delete", async (req, res) => {
  const id = req.body.deleteItemId;
  try {
    await db.query("DELETE FROM items WHERE id = $1", [id]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
