const yup = require("yup");

const createArticleSchema = yup.object().shape({
  title: yup.string().max(255).required(),
  content: yup.string().required(),
  tags: yup
    .mixed()
    .test(
      "is-string-or-array",
      "Tags must be a string or an array of strings", // ["frontend", 12]
      (value) => {
        return (
          typeof value === "string" ||
          (Array.isArray(value) &&
            value.every((item) => typeof item === "string"))
        );
      }
    )
    .required("Tags are required"),
});

module.exports = createArticleSchema;
