import { app } from "@/server/server"
import env from "@/env";
import '@/lib/db'
import Logger from "@/core/Logger";

const PORT = env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
  Logger.info(`Server is running on port ${PORT}`)
})