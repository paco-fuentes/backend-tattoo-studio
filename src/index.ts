// primero importolas dependencias y luego los imports de cada archivo

// import express
import express, { Request, Response } from "express"
// lo importo antes 
import 'dotenv/config'

// routes
import { router as routerUser } from "./routes/userRoutes"

// import object from db.ts
import { AppDataSource } from "./db";

// express on const app
const app = express();
// express.json middleware
app.use(express.json());
// port const
const PORT = process.env.PORT || 3000;


app.get('/helloworld', (req: Request, res: Response) => {
  res.send(`<h1 style="color:cyan">Hello World!</h1>
          <img src="https://http.cat/images/200.jpg">`)
});

app.use('/user', routerUser)

AppDataSource.initialize()
  .then(() => {
    console.log(`Database connected`);
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    })
  })
  .catch(error => {
    console.log(error)
  })