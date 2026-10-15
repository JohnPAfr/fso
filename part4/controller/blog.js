const blogRoutes = require("express").Router();
const Blog = require("../models/blog");

blogRoutes.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  if (blogs) {
    response.json(blogs);
  }
});

blogRoutes.post("/", async (request, response) => {
  if (!request.body) {
    return;
  }

  const keys = Object.keys(request.body);

  if (!keys.includes("title") || !keys.includes("url")) {
    response.sendStatus(400);
  }

  const newObj = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes ?? 0,
  };

  const blog = new Blog(newObj);

  const saved = await blog.save();
  if (saved) {
    response.status(201).json(saved);
  }
});

blogRoutes.get("/:id", async (request, response) => {
  const blog = await Blog.find({ id: request.params.id });
  if (blog) {
    response.json(blog);
  }
});

blogRoutes.delete("/:id", async (request, response) => {
  const deleted = await Blog.deleteOne({ id: request.params.id });

  console.log("DELETED ========", deleted);

  if (deleted) {
    response.sendStatus(204);
  }
});

module.exports = blogRoutes;
