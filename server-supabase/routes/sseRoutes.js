import express from "express";

const router = express.Router();
let clients = [];

router.get("/events/:userId", (req, res) => {
  const userId = req.params.userId;
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  clients.push({ res, userId });

  req.on("close", () => {
    clients = clients.filter((client) => client.res !== res);
  });
});

export const sendEventToClients = (data, userId) => {
  clients.forEach((client) => {
    if (client.userId === userId) {
      client.res.write(`data: ${JSON.stringify(data)}\n\n`);
    }
  });
};

export default router;
