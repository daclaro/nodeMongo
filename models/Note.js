require('dotenv').config()
const mongoose = require('mongoose')
const url = process.env.MONGODB_URI
console.log(url)
const noteSchema = new mongoose.Schema({
  content: { type: String },
  important: { type: Boolean },
  date: { type: Date, default: Date.now },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})
const Note = mongoose.model('Note', noteSchema)
const Note1 = new Note({
  content: 'lol',
  important: false,
})
//connect old string 2.2 noide mongo

const main = async () => {
  try {
    await mongoose.connect(url, {
      connectTimeoutMS: 300000,
      socketTimeoutMS: 300000,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
  } catch (error) {
    console.error(error)
  }
}
main()

module.exports = Note
