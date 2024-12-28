const express = require("express");

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

app.get("/", (req, res) => {
  res.status(200).json({ state });
});

app.get("/set/state=:stateValue", (req, res) => {
  const { stateValue } = req.params;
  // Attempt to parse it as an integer (optional, if you need an integer)
  const numericState = parseInt(stateValue, 10);
  if (!isNaN(numericState)) {
    state = numericState;
    res.status(200).json({ status: true });
  } else {
    res.status(400).json({ status: false });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
