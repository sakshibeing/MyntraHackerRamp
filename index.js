require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

const ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;

const instance = axios.create({
  baseURL: "https://graph.instagram.com",
  params: {
    access_token: ACCESS_TOKEN,
  },
});

app.get("/instagram/media", async (req, res) => {
  const { q } = req.query; // Get the search query parameter from the request

  try {
    const response = await instance.get("/me/media", {
      params: {
        fields: "id,caption,media_url",
        q: q, // Pass the search query to Instagram API
        limit: 10,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data from Instagram API:", error);
    res.status(500).json({ error: "Failed to fetch data from Instagram API" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
