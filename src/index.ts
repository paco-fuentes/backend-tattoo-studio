
import express, { Request, Response } from "express"

const app = express()

app.listen(3000, () => {
  console.log(`Server running`);
})

app.get('/',(req:Request,res:Response)=>{
    res.send('Hello world!')
});