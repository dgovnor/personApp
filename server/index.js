const express = require("express");
const bodyParser = require("body-parser");
const { signUp, updateUser, removeUser } = require("./userHandle/users");
const app = express();
const port = process.env.PORT || "8000";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/create", signUp);
app.patch("/user/:userId", updateUser);
app.delete("/user/:userId", removeUser);

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
