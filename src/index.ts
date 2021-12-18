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
  } else if (mode ==="oneshot"){
    const rd = new TxtFileReader(`${__dirname}/../data/input.txt`);
    patrolJob(rd, ac, lg);
  } else {
    console.log(`
    ts-node src/index.ts <sub command>

    **sub commands**
    patrol:        access to sites  in data/input.txt every hour
    lateral <url>: access to sites in Argument url links
    single:        access to sites in data/input.txt one time
    `)
  }
}

handler(process.argv[2], process.argv[3]);
