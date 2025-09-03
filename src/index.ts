import { app } from "@/server/server"
import env from "@/env";
import '@/lib/db'

const PORT = env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})