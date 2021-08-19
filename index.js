require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())

const notesRouter = require('./routes/api/notes.js')
const usersRouter = require('./routes/api/users.js')
const authRouter = require('./routes/api/auth.js')

app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)
app.use('/api/auth', authRouter)

app.listen(process.env.PORT, () =>
  console.log(`listening on port ${process.env.PORT}`)
)
