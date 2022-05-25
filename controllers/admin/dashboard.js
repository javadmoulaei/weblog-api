const Blog = require("../../models/Blog");
const { shamsiDate } = require("../../utils/jalali");
const { get500 } = require("../errors");

exports.get = async (req, res) => {
  try {
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 2;

    const blogs = await Blog.find({ user: req.user.id })
      .skip((page - 1) * limit)
      .limit(limit);

    const numberOfposts = await Blog.count({ user: req.user.id });

    res.set(
      "Cache-Control",
      "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );

    res.render("private/blogs", {
      pageTitle: "بخش مدیریت",
      path: "/dashboard",
      layout: "./layouts/dashboard",
      fullname: req.user.fullname,
      blogs,
      shamsiDate,
      page,
      nextPage: page + 1,
      previousPage: page - 1,
      hasNextPage: limit * page < numberOfposts,
      hasPreviousPage: page > 1,
      lastPage: Math.ceil(numberOfposts / limit),
    });
  } catch (error) {
    get500(req, res, error);
  }
};
