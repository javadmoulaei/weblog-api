const { Router } = require("express");

const router = new Router();

const posts = require("./../controllers/admin/posts");
const upload = require("./../controllers/admin/upload");

router.post("/posts", posts.post);
router.put("/posts/:id", posts.editPost);
router.delete("/posts/:id", posts.delete);

router.post("/image-upload", upload.image);
module.exports = router;
