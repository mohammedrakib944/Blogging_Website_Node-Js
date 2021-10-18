const mongoose = require("mongoose");
const slugify = require("slugify");
const marked = require("marked");
const createDomPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const dompurifyer = createDomPurify(new JSDOM().window);

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  articleBody: {
    type: String,
    require: true,
  },
  image: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  slug: {
    type: String,
    require: true,
    unique: true,
  },
  convertToHtml: {
    type: String,
    require: true,
  },
});

articleSchema.pre("validate", function (next) {
  // slugify this title
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }

  // conver our markdown to HTML and save to "convertToHtml"
  if (this.articleBody) {
    this.convertToHtml = dompurifyer.sanitize(marked(this.articleBody));
  }

  next();
});

module.exports = mongoose.model("myArticle", articleSchema);
