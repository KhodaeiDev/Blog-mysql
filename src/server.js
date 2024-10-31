const app = require("./app");
const { db } = require("./db");
const redis = require("./redis");
const consfigs = require("./configs");

async function StartServer() {
  try {
    await db.authenticate();
    await redis.ping();

    app.listen(consfigs.port, () => {
      console.log(`Server Running on port ${consfigs.port}`);
    });
  } catch (err) {
    console.log(`Err in start Server ->`, err);
    await db.close();
    await redis.disconnect();
  }
}

StartServer();
