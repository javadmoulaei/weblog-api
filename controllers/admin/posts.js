const fs = require("fs");
const uuid = require("uuid").v4;
const appRoot = require("app-root-path");
const sharp = require("sharp");
const Blog = require("../../models/Blog");
const { shamsiDate } = require("../../utils/jalali");
const { get500 } = require("../errors");

// create post

exports.post = async (req, res) => {
  const errors = [];
  try {
    const thumbnail = req.files ? req.files.thumbnail : {};
    const fileName = `${uuid()}${thumbnail.name}`;
    const uploadPath = `${appRoot}/public/uploads/thumbnails/${fileName}`;

    req.body = { ...req.body, thumbnail };

    await Blog.postValidation(req.body);

    await sharp(thumbnail.data)
      .jpeg({ quality: 40 })
      .toFile(uploadPath)
      .catch((err) => get500(req, res, err));

    await await Blog.create({
      ...req.body,
      user: req.user.id,
      thumbnail: fileName,
    });

    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
    error.inner.forEach((element) => {
      errors.push({
        name: element.path,
        message: element.message,
      });
    });

    return res.render("private/addPost", {
      pageTitle: "ایجاد پست",
      path: "/dashboard/add-post",
      layout: "./layouts/dashboard",
      fullname: req.user.fullname,
      errors,
    });
  }
};

//edit posts

exports.editPost = async (req, res) => {
  const errors = [];
  try {
    const post = await Blog.findById(req.params.id);

    if (!post) return res.render("errors/404");

    if (post.user.toString() != req.user._id) return res.redirect("/dashboard");

    const thumbnail = req.files ? req.files.thumbnail : {};
    const fileName = `${uuid()}${thumbnail.name}`;
    const uploadPath = `${appRoot}/public/uploads/thumbnails/${fileName}`;

    if (thumbnail.name) {
      await Blog.postValidation({ ...req.body, thumbnail });

      await sharp(thumbnail.data)
        .jpeg({ quality: 40 })
        .toFile(uploadPath)
        .catch((err) => get500(req, res, err));
      req.body = { ...req.body, thumbnail: fileName };
    } else {
      // const thumbnailPost = fs
      //   .(`${appRoot}/public/uploads/thumbnails/${post.thumbnail}`)
      //   .toString();
      // console.log(thumbnailPost);

      await Blog.postValidation({ ...req.body, thumbnail: post.thumbnail });
    }

    await Blog.updateOne({ _id: post._id }, { ...req.body });

    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
    error.inner.forEach((element) => {
      errors.push({
        name: element.path,
        message: element.message,
      });
    });

    res.render("private/editPost", {
      pageTitle: "ویرایش پست",
      path: "/dashboard/edit-post",
      layout: "./layouts/dashboard",
      fullname: req.user.fullname,
      errors,
      post: await Blog.findById(req.params.id),
    });
  }
};

//delete post
exports.delete = async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id);

    if (!post) return res.render("errors/404");

    if (post.user.toString() != req.user._id) return res.redirect("/dashboard");

    await Blog.findByIdAndDelete(req.params.id);

    return res.redirect("/dashboard");
  } catch (error) {
    get500(req, res, error);
  }
};
