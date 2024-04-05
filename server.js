const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT
// const path = require('path')

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())


const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Connected to DB')
    } catch (err) {
        console.log(err)
    }
}

connectToDb()

app.use("/color", require("./routes/colorRouter"))

app.use((err, req, res, next) => {
    console.log(err)

    return res.send({errMsg: err.message})
})

// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
// });

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))