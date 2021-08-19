const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (req, res, next) => {
  //get token from header
  const token = req.header('x-auth-token')
  if (!token) {
    return res.status(401).json({ msg: 'provide a token' })
  }
  try {
    //get payload {user:{id: myid}}
    const decoded = jwt.verify(token, process.env.Sekret)
    req.user = decoded.user
    console.log(req.user)
    next()
  } catch (error) {
    res.status(401).json({ msg: 'Provide a valid token' })
  }
}
