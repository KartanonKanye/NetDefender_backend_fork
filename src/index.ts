import app from "./app.js";
import config from "./utils/config.js";
import Logger from "./utils/Logger.js";

app.listen( config.PORT, () => {
  Logger.info(`Server up and running on http::/localhost:${config.PORT}`);
});
