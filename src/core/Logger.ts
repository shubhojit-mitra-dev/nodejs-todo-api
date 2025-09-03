import env from "@/env"
import fs from "fs"
import { createLogger, format, transports } from "winston"
import DailyRotateFile from "winston-daily-rotate-file"

let dir = env.LOG_DIR

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir)
}

const logLevel = env.NODE_ENV === "development" ? "debug" : "warn"

const dailyRotateFile = new DailyRotateFile({
  level: logLevel,
  filename: `${dir}/%DATE%-results.log`,
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  handleExceptions: true,
  maxSize: "20m",
  maxFiles: "14d",
  format: format.combine(
    format.errors({ stack: true }),
    format.timestamp(),
    format.json()
  ),
})

export default createLogger({
  transports: [
    new transports.Console({
      level: logLevel,
      format: format.combine(
        format.errors({ stack: true }),
        format.colorize(),
        format.prettyPrint()
      ),
    }),
    dailyRotateFile,
  ],
  exceptionHandlers: [dailyRotateFile],
  exitOnError: false,
})