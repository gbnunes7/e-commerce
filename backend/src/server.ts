import app from "./app";
import { CONFIG } from "@/config/envConfig";
import { setupRoutes } from "./routes";

setupRoutes(app);

app.listen(CONFIG.PORT, () => {
  console.log(`Server is running on ${CONFIG.PORT}`);
});
