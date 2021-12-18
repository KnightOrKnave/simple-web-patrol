import { logger } from "./accessLogger";
import { siteAccesser } from "./siteAccesser";
import { urlListReader } from "./urlListReader";

const sleep = (waitMillsec: number) =>
  new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, waitMillsec);
  });

export async function patrolJob(
  reader: urlListReader,
  accesser: siteAccesser,
  logger: logger,
  intervalSec: number
) {
  logger.writeLine("start patrol");
  const list = await reader.readAll();
  for (let u of list) {
    const res = await Promise.all([
      accesser.access(u),
      sleep(intervalSec * 1000),
    ]);
    logger.writeLine(JSON.stringify(res[0]));
  }
  logger.writeLine("end patrol");
}
