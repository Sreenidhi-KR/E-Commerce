const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "ReviewCreated") {
    console.log(type);
    const status = data.content.includes("orange") ? "rejected" : "approved";

    console.log("RC", {
      reviewId: data.reviewId,
      productId: data.productId,
      status,
      content: data.content,
    });

    await axios.post("http://localhost:4005/events", {
      type: "ReviewModerated",
      data: {
        reviewId: data.reviewId,
        productId: data.productId,
        status,
        content: data.content,
      },
    });
  }

  res.send({});
});

app.listen(4003, () => {
  console.log("Listening on 4003");
});