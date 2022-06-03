const multer = require("multer");
const sharp = require("sharp");
const uuid = require("uuid").v4;

const { fileFilter, storage } = require("../../utils/multer");
const { get500 } = require("../errors");

exports.image = (req, res) => {
  try {
    const upload = multer({
      limits: { fileSize: 4000000 },
      dest: "uploads/",
      storage,
      fileFilter,
    }).single("image");

    upload(req, res, async (err) => {
      if (err) {
        if (err.code === "LOMIT_FILE_SIZE")
          return res.status(400).send("حجم عکس نباید بیش از ۴ مگابایت باشد");
        res.status(400).send(err);
      } else if (req.files) {
        const fileName = `${uuid()}${req.files.image.name}`;

        await sharp(req.file.path)
          .jpeg({
            quality: 40,
          })
          .toFile(`./public/uploads/${fileName}`)
          .catch((error) => get500(req, res, error));

        res.status(200).send(`${process.env.URL}/uploads/${fileName}`);
      } else res.send("باید یه عکس انتخاب کنید");
    });
  } catch (error) {
    get500(req, res, error);
  }
};
