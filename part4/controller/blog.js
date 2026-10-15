const blogRoutes = require("express").Router();
const Blog = require("../models/blog");

blogRoutes.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  if (blogs.length === 0) {
    return response.sendStatus(404);
  }
  response.json(blogs);
});

blogRoutes.post("/", async (request, response) => {
  if (!request.body) {
    return response.sendStatus(404);
  }

  const keys = Object.keys(request.body);

  if (!keys.includes("title") || !keys.includes("url")) {
    return response.sendStatus(400);
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
  } else {
    response.sendStatus(500);
  }
});

blogRoutes.get("/:id", async (request, response) => {
  const blog = await Blog.findOne({ _id: request.params.id });
  if (!blog) {
    return response.sendStatus(404);
  }
  response.json(blog);
});

blogRoutes.patch("/:id", async (request, response) => {
  if (!request.body) {
    return response.sendStatus(400);
  }

  const result = await Blog.updateOne(
    { _id: request.params.id },
    { $set: request.body },
  );

  if (result.matchedCount === 0) {
    return response.sendStatus(404);
  }
  response.sendStatus(204);
});

blogRoutes.delete("/:id", async (request, response) => {
  const deleted = await Blog.deleteOne({ _id: request.params.id });

  if (deleted.deletedCount > 0) {
    response.sendStatus(204);
  } else {
    response.sendStatus(404);
  }
});

module.exports = blogRoutes;
