const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const bodyParser = require("body-parser");
const PORT = 3000;

let state = 0;

// EXPRESS SPECIFIC STUFF
app.use(express.urlencoded({ extended: true }));

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

app.get("/:password", (req, res) => {
  const { password } = req.params;
  if (password === process.env.PASSWORD) {
    res.status(200).json({ state });
  } else {
    res.status(400).json({ info: "Missing password" });
  }
});

app.get("/set/:stateValue/:password", (req, res) => {
  const { stateValue, password } = req.params;
  if (password === process.env.PASSWORD) {
    // Attempt to parse it as an integer (optional, if you need an integer)
    const numericState = parseInt(stateValue, 10);
    if (!isNaN(numericState)) {
      state = numericState;
      res.status(200).json({ status: true });
    } else {
      res.status(400).json({ status: false });
    }
  } else {
    res.status(400).json({ info: "Missing password" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
