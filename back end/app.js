import cors from 'cors'
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import express from 'express';
import connectDB from './DB/connection.js';
import * as allRouter from './module/index.router.js';
const app = express();
app.use(cors())
const port = process.env.PORT;
app.use(express.json());
const baseUrl = process.env.BASEURL;
app.use(`${baseUrl}/uploads`,express.static('./uploads'));
app.use(`${baseUrl}/auth`,allRouter.authRouter);
app.use(`${baseUrl}/message`,allRouter.messageRouter);
app.use(`${baseUrl}/user`,allRouter.userRouter);
app.use("*",(req,res)=>{
    res.json({message:'page not found'});
});

connectDB();
app.listen(port, () => console.log(`Example app listening on port ${port}!`))