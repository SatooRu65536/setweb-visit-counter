import express from "express";
import mysql, { QueryError } from "mysql2";
import "dotenv/config";

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
});

connection.connect((err: QueryError | null) => {
  if (err) console.log(err);
  else console.log("Connected to MySQL.");
});

const app: express.Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.header("Access-Control-Allow-Origin", "https://www.sysken.net");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
  },
);

app.listen(3000, () => {
  console.log("Start on port 3000.");
});

app.get("/visit", (req: express.Request, res: express.Response) => {
  const { host } = req.query;

  if (!host) {
    res.send({ err: "host is undefined" });
    return;
  }

  const insertQuery = `INSERT INTO visitor (path) VALUES (?)`;
  connection.query(insertQuery, [host]);
  const selectQuery = "SELECT COUNT(*) AS count FROM visitor WHERE path = ?";
  connection.query(selectQuery, [host], (err, results) => {
    if (err) {
      console.log(err);
      res.send({ err: err });
      return;
    }
    res.send(results);
  });
});
