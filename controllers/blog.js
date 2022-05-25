const Blog = require("../models/Blog");
const { shamsiDate } = require("../utils/jalali");
const { truncate } = require("../utils/helpers");
const { get500 } = require("./errors");

exports.get = async (req, res) => {
  try {
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 3;

    const posts = await Blog.find({ status: "public" })
      .sort({
        createdAt: "desc",
      })
      .skip((page - 1) * limit)
      .limit(limit);

    res.render("index", {
      pageTitle: "وبلاگ",
      path: "/",
      posts,
      shamsiDate,
      page,
      nextPage: page + 1,
      previousPage: page - 1,
      hasNextPage: limit * page < posts.length,
      hasPreviousPage: page > 1,
      lastPage: Math.ceil(posts.length / limit),
      truncate,
    });
  } catch (error) {
    get500(req, res, error);
  }
};

exports.getOne = async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id).populate("user");

    if (!post) return res.render("errors/404");
    if (post.status == "private") return res.render("errors/404");

    post.user = { fullname: post.user.fullname };
    console.log(post);
    res.render("post", {
      pageTitle: post.title,
      path: `/post`,
      fullname: req.user.fullname,
      post,
      shamsiDate,
    });
  } catch (error) {
    get500(req, res, error);
  }
};

exports.search = async (req, res) => {
  const page = +req.query.page || 1;
  const limit = 5;

  try {
    const numberOfPosts = await Blog.find({
      status: "public",
      $text: { $search: req.body.search },
    }).countDocuments();

    const posts = await Blog.find({
      status: "public",
      $text: { $search: req.body.search },
    })
      .sort({
        createdAt: "desc",
      })
      .skip((page - 1) * limit)
      .limit(limit);

    res.render("index", {
      pageTitle: "نتایج جستجوی شما",
      path: "/",
      posts,
      shamsiDate,
      truncate,
      page,
      nextPage: page + 1,
      previousPage: page - 1,
      hasNextPage: limit * page < numberOfPosts,
      hasPreviousPage: page > 1,
      lastPage: Math.ceil(numberOfPosts / limit),
    });
    //? Smooth Scrolling
  } catch (error) {
    get500(req, res, error);
  }
};
