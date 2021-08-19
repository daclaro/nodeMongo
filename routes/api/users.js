require('dotenv').config()
const jwt = require('jsonwebtoken')
const express = require('express')
const User = require('../../models/User.js')
const app = express()
const usersRouter = express.Router()
const bcrypt = require('bcrypt')
const { check, validationResult } = require('express-validator')

usersRouter.get('/', async (req, res) => {
  const data = await User.find({}).populate('notes', { content: 1, date: 1 })
  return res.json(data)
  console.log('router working for users')
})

usersRouter.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Put up a valid email').isEmail(),
    check('password', 'min 6 characters').isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const saltRounds = 10

      console.log(req.body)
      const { email, name, password } = req.body
      const passwordHash = await bcrypt.hash(password, saltRounds)
      const User1 = new User({
        email,
        name,
        password: passwordHash,
      })
      await User1.save()
      const payload = { user: { id: User1.id } }
      jwt.sign(
        payload,
        process.env.Sekret,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) {
            throw err
          }
          res.json({ token })
        }
      )
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
    }
  }
)

module.exports = usersRouter
