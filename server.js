require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const NASA_BASE_URL = "https://api.nasa.gov/neo/rest/v1";

app.get("/api/neo-feed", async (req, res) => {
  try {
    const { start_date, end_date } = req.query;

    const response = await axios.get(`${NASA_BASE_URL}/feed`, {
      params: {
        start_date,
        end_date,
        api_key: "LAitysI7iGzQxu3Z3JrUPFUaWedJNQdHKIokacX0",
      },
    });

    res.json(response.data);
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    }

    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/health", async (req, res) => {
  res.status(200);
  res.json({ message: "App is running" });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});
