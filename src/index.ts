
import express, { Request, Response } from "express"
// import object from db.ts
import { AppDataSource } from "./db";

// express on const app
const app = express();
// port const
const PORT = process.env.PORT || 3000;

app.get('/helloworld',(req:Request,res:Response)=>{
    res.send('Hello world!')
});

AppDataSource.initialize()
.then(() => { console.log(`Database connected`);
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    })
})
.catch(error => { console.log(error)
})