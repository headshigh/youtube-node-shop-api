const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());
require("dotenv");

const posts = [
  { username: "Kyle", title: "Post1" },
  { username: "nischal", title: "post2" },
];
app.get("/posts", authenticateToken, (req, res) => {
  res.json(posts.filter((post) => post.username == req.user.name));
});
app.post("/login", (req, res) => {
  //authenticate user
  const username = req.body.username;
  const user = { name: username };
  const acessToken = jwt.sign(
    user,
    "700582a7479b5513885b01725f6c149f0e26008e918e973e43b5f61dc4839da00ceb2198f0f8204d45dd956118c136e6c13fa0b8d11b56a71b116bb60303a953"
  );
  res.status(200).json({ acessToken: acessToken });
});
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(
    token,
    "700582a7479b5513885b01725f6c149f0e26008e918e973e43b5f61dc4839da00ceb2198f0f8204d45dd956118c136e6c13fa0b8d11b56a71b116bb60303a953",
    (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    }
  );
}

app.listen(3000);
