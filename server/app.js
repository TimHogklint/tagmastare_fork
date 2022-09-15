//import modules
const express = require("express")
const { appendFile } = require("fs")
/*
const mongoose = require("mongoose")
const morgan = require("morgan")

require("dotenv").config()

//app
const app = express()

//db
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("DB CONNECTED"))
.catch((err) => console.log("DB CONNECTION ERROR", err))

//middleware
app.use(morgan("dev"))
app.use(cors({origin: true, credentials: true}))

//routes
const testRoutes = require('./routes/test')
app.use("/", testRoutes)

//port
const port = process.env.PORT || 8080

//listener
const server = app.listen(port, () =>
  console.log(`Server is running on port ${port}`)
)
*/

const app = express();
app.get("/api/hej", (req, res) => res.json({ ok: true }));
app.listen(8080, () => console.log("Server listening on port 8080"));