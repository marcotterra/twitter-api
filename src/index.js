import express from "express";
import bodyparser from "body-parser";
import cors from "cors";
import morgan from "morgan";

const app = express();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ created_by: "@marcotterra" });
});

app.listen(5000, () => console.log("Listening at port 5000"));
