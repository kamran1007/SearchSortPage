const express = require('express')
const connectDB = require('./database/db');
const dotenv = require('dotenv')
const bodyparser = require('body-parser')
const AuthUser = require('./routers/user')

const morgan = require('morgan')
const app = express()

dotenv.config({ path: './config/config.env' })
const PORT = process.env.PORT

app.use(morgan('dev'))
app.use(bodyparser.urlencoded({ extended: true }))
app.use(express.json());

connectDB();


////Api//
app.use('/api', AuthUser)




app.listen(PORT, () => (console.log(`server is listening on: http://localhost:${PORT}`)))