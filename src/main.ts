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
  intervalSec: number,
  loopDepth: number
) {
  logger.writeLine("start patrol");
  let list = await reader.readAll();
  for (let i = 0; i < loopDepth; i++) {
    let newList:string[]=[];
    logger.writeLine(`Depth: ${i+1}`)
    for (let u of list) {
      const res = await Promise.all([
        accesser.access(u),
        sleep(intervalSec * 1000),
      ]);
      const {links,...p2}=res[0];
      logger.writeLine(JSON.stringify(p2));
      newList = newList.concat(res[0].links);
    }
    const ss = new Set<string>(newList);
    newList=Array.from(ss);
    list=newList;
  }
  logger.writeLine("end patrol");
}
