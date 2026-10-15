const assert = require("node:assert");
const { test, after, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const helper = require("./test_helper");
const Blog = require("../models/blog");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  let blogObject = new Blog(helper.initialBlogs[0]);
  await blogObject.save();

  blogObject = new Blog(helper.initialBlogs[1]);
  await blogObject.save();
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blog")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blog");

  assert.strictEqual(response.body.length, helper.initialBlogs.length);
});

test("property _id is id", async () => {
  const response = await api.get("/api/blog");
  const blogs = response.body.map((b) => b);

  const blogKeys = Object.keys(blogs[0]);
  assert(blogKeys.includes("id"));
});

test("a valid Blog can be added ", async () => {
  const newBlog = {
    title: "new blog",
    author: "Me",
    url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
    likes: 2,
  };

  await api
    .post("/api/blog")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);

  const titles = blogsAtEnd.map((n) => n.title);
  assert(titles.includes("new blog"));
});

test("body without likes get likes default to 0 ", async () => {
  const newBlog = {
    title: "No likes",
    author: "Me",
    url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
  };

  await api
    .post("/api/blog")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);

  const noLikes = blogsAtEnd.find((blog) => blog.title === "No likes");
  assert.strictEqual(noLikes.likes, 0);
});

test("body without url or title return 400", async () => {
  const newBlogNoTitle = {
    author: "Me",
    url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
  };

  await api.post("/api/blog").send(newBlogNoTitle).expect(400);

  const newBlogNoUrl = {
    title: "coucou",
    author: "Me",
  };

  await api.post("/api/blog").send(newBlogNoUrl).expect(400);
});

test("delete by Id", async () => {
  await api.delete("/api/blog/id='5a422aa71b54a676234d17f8'").expect(204);

  const blogsAtEnd = await helper.blogsInDb();
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1);
});

after(async () => {
  await mongoose.connection.close();
});
