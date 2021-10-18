const express = require("express");
const path = require("path");
const { unlink } = require("fs");
const imageUP = require("../model/multerCon");
const articleSchema = require("../model/articleSchema");
const router = express.Router();

router.get("/new", (req, res) => {
  res.render("articles/new", { article: new articleSchema() });
});

router.get("/edit/:id", async (req, res) => {
  const article = await articleSchema.findById(req.params.id);
  res.render("articles/edit", { article: article });
});

// get by it route
router.get("/:slug", async (req, res) => {
  const article = await articleSchema.findOne({ slug: req.params.slug });
  if (article == null) res.redirect("/");
  res.render("articles/single", { article: article });
});

// post data on database
router.post(
  "/new",
  imageUP.single("image"),
  async (req, res, next) => {
    req.article = await new articleSchema();
    next();
  },
  saveAndRedirect("new")
);

router.put(
  "/:id",
  imageUP.single("image"),
  async (req, res, next) => {
    req.article = await articleSchema.findById(req.params.id);
    next();
  },
  saveAndRedirect("new")
);

// delete router
router.delete("/:id", async (req, res) => {

  try {
    const response = await articleSchema.findByIdAndDelete({ _id: req.params.id });

    if (response.image) {
      // also delete the image
      unlink(path.join(__dirname, `/../public/uploads/${response.image}`),
        (err) => {
          if (err) {
            console.log("There is an error");
          }
        }
      )
    }
  } catch (err) {
    console.log("The error is: " + err);
  }

  res.redirect("/");

});

// work for post and put function
function saveAndRedirect(path) {
  return async (req, res) => {
    let article = req.article;
    article.title = req.body.title;
    article.description = req.body.description;
    article.articleBody = req.body.articleBody;
    article.image = req.file.filename;

    try {
      article = await article.save();
      res.redirect(`/articles/${article.slug}`);
    } catch (err) {
      res.render(`articles/${path}`, { article: article });
      console.log(err);
    }
  };
}

module.exports = router;
