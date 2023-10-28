
import express, { Request, Response } from "express"
import { AppDataSource } from "./db";

const app = express()
const PORT = 3000;

app.get('/',(req:Request,res:Response)=>{
    res.send('Hello world!')
});

AppDataSource.initialize()
.then(() => { console.log('Database connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    })
})
.catch(error => { console.log(error)
})