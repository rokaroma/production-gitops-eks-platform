const express = require("express");
const client = require("prom-client");

const app = express();

const PORT = process.env.PORT || 3000;

const register = new client.Registry();

client.collectDefaultMetrics({
  register
});

app.get("/", (req, res) => {
  res.json({
    message: "Hello from the Junior DevOps EKS Project",
    status: "running"
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy"
  });
});

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});