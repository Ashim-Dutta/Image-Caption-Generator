const express = require("express")
const authRoutes = require("./routes/auth.routes")
const postRoutes = require('./routes/posts.routes')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')


const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: "http://localhost:5173", // ya frontend ka domain
    credentials: true,
  })
);
app.use(express.static(path.join(_dirname, "../public")));


app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)


app.get("*name", (req, res) => {
  res.sendFile(path.join(_dirname, "../public/index.html"));
});


module.exports = app