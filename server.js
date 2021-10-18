const express = require("express");
const path = require("path");
const articleRouter = require("./routes/articles");
const articleSchema = require("./model/articleSchema");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

const app = express();

// connect to database
mongoose.connect("mongodb://localhost/myBlog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

//  set view engine
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

// static path as public
app.use(express.static(path.join("public")));

// post
app.get("/", async (req, res) => {
  const article = await articleSchema.find().sort({ date: "desc" });
  res.render("articles/index", { article: article });
});

app.use("/articles", articleRouter);

app.listen(3000, () => {
  console.log(`Server is running of port http://localhost:3000`);
});
