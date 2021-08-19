const jwt = require('jsonwebtoken')
const express = require('express')
const User = require('../../models/User.js')
const app = express()
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const auth = require('../../middleware/auth.js')

const authRouter = express.Router()

authRouter.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
    console.log(`User is ${user}`)
    console.log(
      `user.password is ${user.password} while password is ${password}`
    )
    //const okayPassword = await bcrypt.compare(password, user.password)
    //console.log(`lets see if this is working ${okayPassword}`)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
})
//login
authRouter.post(
  '/',
  [
    check('email', 'Put up a valid email').isEmail(),
    check('password', 'put up a password').exists(),
  ],
  async (req, res) => {
    const { email, password } = req.body
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      const user = await User.findOne({ email })
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'invalid credentials' }] })
      }
      const okayPassword = await bcrypt.compare(password, user.password)
      const payload = { user: { id: user.id } }

      if (okayPassword) {
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
      } else {
        return res
          .status(400)
          .json({ errors: [{ msg: 'invalid credentials' }] })
      }
    } catch (error) {
      console.error(error.message)
      res.status(500).send('Server error')
    }
  }
)
module.exports = authRouter
