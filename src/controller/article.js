const { default: slugify } = require("slugify");
const { Articles, Tag } = require("./../db");

exports.create = async (req, res, next) => {
  try {
    let { title, content, tags } = req.body;
    const author_id = req.user.id;

    slug = slugify(title, { lower: true });

    let coverPath;
    if (req.file?.filename) {
      coverPath = `images/covers/${req.file.filename}`;
    }

    tags = Array.isArray(tags) ? tags : [tags];

    tags = tags.map(
      async (tag) => await Tag.findOrCreate({ where: { title: tag.trim() } })
    );

    tags = await Promise.all(tags);

    const article = await Articles.create({
      title,
      content,
      slug,
      author_id,
      cover: coverPath ? coverPath : null,
    });

    await article.addTag(tags.map((tag) => tag[0]));

    return res.status(201).json("Article created successfully");
  } catch (err) {
    next(err);
  }
};
