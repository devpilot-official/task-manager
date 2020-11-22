const express = require("express")
require("./db/mongoose")
const userRoutes = require("./routers/user")
const taskRoutes = require("./routers/task")
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express()
const port = process.env.PORT || 3000

// app.use(express.json())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(userRoutes)
app.use(taskRoutes)

app.listen(port, () => {
    console.log("Server started at port:", port)
})