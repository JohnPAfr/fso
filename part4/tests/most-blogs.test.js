const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

describe("most blogs", () => {
  const listWithMultipleBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f9",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 10,
      __v: 1,
    },
    {
      _id: "5a422aa71b54a676234d17f9",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 6,
      __v: 1,
    },
    {
      _id: "5a422aa71b54a676234d17f9",
      title: "Go To Statement Considered Harmful",
      author: "Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 20,
      __v: 1,
    },
    {
      _id: "5a422aa71b54a676234d17f9",
      title: "Go To Statement Considered Harmful",
      author: "Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 22,
      __v: 1,
    },
    {
      _id: "5a422aa71b54a676234d17f9",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 11,
      __v: 1,
    },
  ];

  test("most blogs between two", () => {
    const result = listHelper.mostBlogs(listWithMultipleBlog);
    const expectedResult = {
      author: "Edsger W. Dijkstra",
      blogs: 4,
    };
    assert.deepStrictEqual(result, expectedResult);
  });
});
