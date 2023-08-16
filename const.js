const NODE_ENV = process.env.NODE_ENV;

exports.DB_URI =
  NODE_ENV === 'production'
    ? 'url to remote db'
    : `mongodb+srv://Wasil:${process.env.DB_PASS}@cluster0.lvwrcbb.mongodb.net/AnnounceNow?retryWrites=true&w=majority`;

exports.pattern = /^[a-zA-Z1-9 \.\,\-\_\(\)]*$/;
exports.titleMaxLength = 50;
exports.contentMaxLength = 1000;
exports.validatePhoneNumber = /^\d{9}$/;
exports.validatePrice = /^[1-9\d.,]+$/;
