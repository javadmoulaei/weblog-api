const { Router } = require("express");

const router = new Router();

const dashboard = require("./../controllers/admin/dashboard");
const posts = require("./../controllers/admin/posts");
const upload = require("./../controllers/admin/upload");

router.get("/", dashboard.get);

router.get("/add-post", posts.addPostPage);
router.post("/posts", posts.post);
router.get("/edit-post/:id", posts.editPostPage);
router.post("/edit-post/:id", posts.editPost);
router.get("/delete-post/:id", posts.delete);
router.post("/search", posts.search);

router.post("/image-upload", upload.image);
module.exports = router;
