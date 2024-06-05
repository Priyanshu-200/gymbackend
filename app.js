import express from "express";
import {config} from "dotenv";
import cors from "cors";
import {sendEmai} from './utils/sendEmail.js'
const app = express();
const router = express.Router();

config({path: "./config.env"});

app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods: ["POST"],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

router.get("/",(req,res,next)=>{
    res.json({success: true,
        message: "HABIBI COME TO DUBAI"
    })
})

router.post("/send/mail",async(req,res,next)=>{
    const {name,email,message}=req.body;
    console.log(typeof(name), email, message);
    if(name.length==0 || email.length==0 || message.length==0){
            return next(res.status(400).json({
                success: false,
                message: "Please provide all details"
                })
            );
    }
  try{
    await sendEmai({
        email: "sontakkepriyanshu1@gmail.com",
        subject: "GYM WEBSITE CONTACT",
        message,
        userEmail: email,
    });
    res.status(200).json({
        success: true,
        message: "Message sent successfully."
    })
  } catch (error){
      res.status(500).json({
        success: false,
        message: "Internal Server Error"
      })
  }
})

app.use(router);

app.listen(process.env.PORT, ()=>{
    console.log(`Server listening at port ${process.env.PORT}`);
})