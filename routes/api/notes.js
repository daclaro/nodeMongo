const express = require('express')
const Note = require('../../models/Note.js')
const User = require('../../models/User.js')
const app = express()
const notesRouter = express.Router()
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const auth = require('../../middleware/auth.js')
notesRouter.get('/', async (req, res) => {
  const data = await Note.find({}).populate('user', { email: 1, name: 1 })
  return res.json(data)
  console.log('router working for notes')
})

notesRouter.post(
  '/',
  auth,
  [check('content', 'content is required').not().isEmpty()],

  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      console.log('req body is', req.body)
      console.log('req body user is', req.user.id)
      const { content, important } = req.body
      const user = await User.findById(req.user.id)
      const Note1 = new Note({
        content,
        important: important === undefined ? false : important,
        date: new Date(),
        user: req.user.id,
      })

      const savedNote = await Note1.save()
      user.notes = user.notes.concat(savedNote.id)
      await user.save()
      return res.json('success note post request')
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
    }
  }
)

module.exports = notesRouter
