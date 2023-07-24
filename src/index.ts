import express, { Express, Request, Response } from "express";

const app: Express = express();

app.get('/', (req: Request,res: Response) => {
  // res.status(200).send({
  //   hello: '👨‍💻️'
  // })
  res.status(200).send("<h1>Hello world! 🧗️</h1>")
});

const PORT = 12345
app.listen( PORT, () => {
  console.log(`Server up and running on http::/localhost:${PORT}`);
});
