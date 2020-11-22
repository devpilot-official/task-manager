const dotenv = require('dotenv')
const mongoose = require("mongoose")

dotenv.config();

mongoose.connect(process.env.mongo_url, {
      keepAlive: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
})