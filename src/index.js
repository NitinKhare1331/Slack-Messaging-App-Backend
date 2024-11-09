import express from 'express'
import { StatusCodes } from 'http-status-codes'

import connectDB from './config/dbConfig.js'
import { PORT } from './config/serverConfig.js'
import apiRouter from './routes/apiRouter.js'

const app = express();

app.use('/api', apiRouter);

app.get('/ping', (req, res) => {
    return res.status(StatusCodes.OK).json({ message: 'pong' })
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
    connectDB();
})
