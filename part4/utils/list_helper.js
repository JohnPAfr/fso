const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogList) => {
  return blogList.reduce((acc, current) => {
    return acc + current.likes;
  }, 0);
};

const favoriteBlog = (blogList) => {
  let mostLikesBlog = blogList[0];
  for (let i = 1; i < blogList.length; i++) {
    if (mostLikesBlog.likes < blogList[i].likes) {
      mostLikesBlog = blogList[i];
    }
  }
  return mostLikesBlog;
};

const mostBlogs = (blogList) => {
  let tmp = [];
  blogList.map((blog) => {
    const authorIndex = tmp.findIndex((b) => b.author === blog.author);
    if (authorIndex >= 0) {
      tmp[authorIndex].blogs++;
    } else {
      tmp.push({ author: blog.author, blogs: 1 });
    }
  });

  let tmpMostBlogs = tmp[0];

  for (let i = 1; i < tmp.length; i++) {
    if (tmpMostBlogs.blogs < tmp[i].blogs) {
      tmpMostBlogs = tmp[i];
    }
  }

  return tmpMostBlogs;
};

const mostLikes = (blogList) => {
  const favorite = favoriteBlog(blogList);
  return {
    author: favorite.author,
    likes: favorite.likes,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
