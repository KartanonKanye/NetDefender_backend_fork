import app from "./app.js";
import Logger from "./middleware/Logger.js";

const PORT = process.env.PORT || 12345;

app.listen( PORT, () => {
  Logger.info(`Server up and running on http::/localhost:${PORT}`);
});
