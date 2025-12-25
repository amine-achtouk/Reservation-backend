const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

const userRouter = require('./routes/userRouter')
const reservationRouter = require('./routes/reservationRouter')

const app = express();
dotenv.config();
app.use(express.json());
connectDB();

app.use('/api/users', userRouter)
app.use('/api/reservation', reservationRouter)

const PORT = process.env.PORT || 5000
app.listen(PORT,() => console.log(`server connect en PORT ${PORT}`))

