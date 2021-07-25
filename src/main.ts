import { logger } from "./accessLogger";
import { siteAccesser } from "./siteAccesser";
import { urlListReader } from "./urlListReader";

export async function patrolJob(reader: urlListReader, accesser: siteAccesser, logger: logger) {
  logger.writeLine("start patrol");
  const list = await reader.readAll();
  for (let u of list) {
    const res = await accesser.access(u);
    logger.writeLine(JSON.stringify(res));
  }
  logger.writeLine("end patrol");
}
