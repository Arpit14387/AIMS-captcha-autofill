import path from 'path';
import * as tf from "@tensorflow/tfjs"
import dotenv from "dotenv"
import cors from "cors";
const __dirname = path.resolve();
import express from 'express';
import bodyParser from 'body-parser';

dotenv.config();
const app= express()
app.use(cors({
    origin: "*",
})
);
app.use(express.static('public'))


var jsonParser = bodyParser.json({ limit: '50mb' })

app.post("/data" ,jsonParser,(req,res)=>{
    
    const data=(req.body.array)
    console.log(data)
    {

          async function temp(){
         
      const model = await tf.loadLayersModel("https://captcha14387.herokuapp.com/model.json");
      console.log("loaded")
      var result=[]
      {
        var predict = function(input) {
            if (model) {
              model.predict([tf.tensor(input)
                .reshape([5,1200])]).array().then(function(scores){
                    console.log(scores)
                scores.map((i,index)=>{
                    result.push(scores[index].indexOf((Math.max(...scores[index]))).toString());
                })

                res.send(result)
               
              });
            } else {
              // The model takes a bit to load, if we are too fast, wait
              setTimeout(function(){predict(input)}, 50);
              console.log("Wait please")
            }
          }
          predict(data)
      }
          }
          temp()
}
// res.send(req)
})

app.listen(process.env.PORT || 3000,()=>{
    console.log("listening")
})