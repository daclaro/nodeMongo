require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())


const notesRouter=require('./routes/api/notes.js')
const usersRouter=require('./routes/api/users.js')



app.use('/api/notes', notesRouter);
app.use('/api/users', usersRouter);

app.listen(process.env.PORT,()=>console.log(`listening on port ${process.env.PORT}`))