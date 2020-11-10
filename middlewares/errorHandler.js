async function errorHandler(err, req, res, next) {
  let status;
  let message;

  // console.log(err.name, `<<< name`);
  // console.log(err.errors[0], `<<< errors`);
  // console.log(err.message, `<<< message`);

  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }

  switch (err.name) {
    case "SequelizeUniqueConstraintError":
      status = 400;
      message = err.errors[0].message;
      if (err.errors[0].message === "email must be unique") {
        message = "Email already registered";
      }
      break;
    case "SequelizeValidationError":
      status = 400;
      message = err.errors[0].message;
      switch (message) {
        case "Product.name cannot be null":
          message = `Please input the product name`;
          break;
        case "Product.image_url cannot be null":
          message = `Please input the product image link`;
          break;
      }
      break;
    default:
      status = 500;
      message = err.name || `Internal Server Error`;
  }

  return res.status(status).json({ message });
}

module.exports = errorHandler;
