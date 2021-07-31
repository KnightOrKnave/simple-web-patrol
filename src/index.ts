import cron from "node-cron";
import { TxtFileReader, WebsiteLinkReader } from "./urlListReader";
import { BlowserSiteAccesser } from "./siteAccesser";
import { patrolJob } from "./main";
import { ConsoleLogger } from "./accessLogger";

async function handler(mode: string, crawlTarget?: string) {
  const ac = new BlowserSiteAccesser();
  const lg = new ConsoleLogger();
  if (mode === "patrol") {
    const rd = new TxtFileReader(`${__dirname}/../data/input.txt`);
    cron.schedule("0 * * * *", async () => {
      patrolJob(rd, ac, lg);
    });
  } else if (mode === "lateral" && crawlTarget) {
    const rd = new WebsiteLinkReader(crawlTarget);
    patrolJob(rd, ac, lg);
  }
}

handler(process.argv[2], process.argv[3]);
