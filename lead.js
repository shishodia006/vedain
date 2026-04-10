const express = require("express");
const cors = require("cors");
require("dotenv").config();
const fetch = require("node-fetch");
const app = express();

app.use(cors({
  origin: "*"
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Ved Server Running");
});

app.post("/lead", async (req, res) => {

  try {
    const formData = req.body;
    console.log("Lead received:", formData);

    const body = {

      firstName: formData.name.split(" ")[0] || formData.name,
      lastName: formData.name.split(" ")[1] || "", // split name for lastName
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      source: "Website Form",
      leadStatus: "New",
      stage: "New",
      ownerId: "b248048c-853b-4915-9178-dbb9ac035cdd",
      company: formData.company || "Anantya AI" // set default company
    };


    console.log("Lead received:", body);

    const response = await fetch("https://vedain.com/api/v1/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": process.env.VEDAIN_API_KEY
      },
      body: JSON.stringify(body)
    });

    console.log("Vedain Status:", response.status);

    const data = await response.text();

    console.log("Vedain Response:", data);

    res.send(data);

  } catch (error) {

    console.log("Error:", error);

    res.status(500).json({
      error: "Lead failed"
    });
  }

});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});