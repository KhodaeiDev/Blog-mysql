const yup = require("yup");

exports.registerValidatorSchema = yup.object().shape({
  name: yup.string().max(255).required(),
  username: yup
    .string()
    .min(8)
    .matches(/^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/, "username is not valid")
    .max(255)
    .required(),
  email: yup.string().email().max(255).required(),
  password: yup.string().min(8).optional(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")])
    .required(),
});

exports.loginValidatorSchema = yup.object().shape({
  username: yup
    .string()
    .min(8)
    .matches(/^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/, "username is not valid")
    .max(255)
    .required(),
  password: yup.string().min(8).required(),

  // CaptchaID
  captcha: yup.string().min(4).required(),
});
