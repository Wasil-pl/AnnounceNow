const NODE_ENV = process.env.NODE_ENV;

exports.DB_URI =
  NODE_ENV === 'production'
    ? 'url to remote db'
    : `mongodb+srv://Wasil:${process.env.DB_PASS}@cluster0.lvwrcbb.mongodb.net/AnnounceNow?retryWrites=true&w=majority`;
