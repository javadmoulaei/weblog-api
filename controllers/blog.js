const Blog = require("../models/Blog");
const { get500 } = require("./errors");

exports.get = async (req, res) => {
  try {
    const posts = await Blog.find({ status: "public" }).sort({
      createdAt: "desc",
    });

    res.status(200).json({ posts });
  } catch (error) {
    get500(req, res, error);
  }
};

exports.getOne = async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id).populate("user");

    if (!post) return res.status(400).json("400");
    if (post.status == "private") return res.status(400).json("400");
    post.user = { fullname: post.user.fullname };

    res.status(200).json({ post });
  } catch (error) {
    get500(req, res, error);
  }
};
