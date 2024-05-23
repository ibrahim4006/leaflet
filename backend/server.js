import express from "express";
import bodyParser from "body-parser";
import pointRoutes from "./routes/points.js";
import cors from 'cors';

const app = express();
const PORT = 5000;
app.use(cors());


app.use(bodyParser.json());

app.use("/points", pointRoutes);

app.get("/", (req, res) => {
  console.log("[GET ROUTE]");
  res.send("HELLO FROM HOMEPAGE");
});

app.listen(PORT, () =>
  console.log(`Server running on port: http://localhost:${PORT}`)
);
