import cron from "node-cron";
import { TxtFileReader, WebsiteLinkReader } from "./urlListReader";
import { BlowserSiteAccesser } from "./siteAccesser";
import { patrolJob } from "./main";
import { ConsoleLogger } from "./accessLogger";
import * as yargs from "yargs";

async function handler(argv: any) {
  const ac = new BlowserSiteAccesser();
  const lg = new ConsoleLogger();
  if (argv._[0] === "patrol") {
    const rd = new TxtFileReader(`${__dirname}/../data/input.txt`);
    cron.schedule("0 * * * *", async () => {
      patrolJob(rd, ac, lg, argv.interval);
    });
  } else if (argv._[0] === "lateral" && argv["targetUrl"]) {
    const rd = new WebsiteLinkReader(argv["targetUrl"], argv.external);
    patrolJob(rd, ac, lg, argv.interval);
  } else if (argv._[0] === "oneshot") {
    const rd = new TxtFileReader(`${__dirname}/../data/input.txt`);
    patrolJob(rd, ac, lg, argv.interval);
  } else {
    console.log(`invalid paramaters`);
  }
}

const argv = yargs
  .command("patrol", "access to sites in data/input.txt every hour")
  .command("oneshot", "access to sites in data/input.txt one time")
  .command(
    "lateral <targetUrl>",
    "access to sites in Argument url links",
    (b) => {
      b.positional("targetUrl", {
        demandOption: true,
      });
    }
  )
  .demandCommand(1)
  .option("depth", {
    alias: "d",
    type: "string",
    description: "depth of get link",
    demandOption: false,
    default: 1,
  })
  .option("interval", {
    alias: "i",
    type: "number",
    description: "access interval seconds",
    demandOption: false,
    default: 60,
    number: true,
  })
  .option("unique", {
    alias: "u",
    type: "boolean",
    description: "Fllow links that only unique url",
    demandOption: false,
    default: false,
    number: true,
  })
  .option("external", {
    alias: "e",
    type: "boolean",
    description: "Follow links that only external domain",
    demandOption: false,
    default: true,
    number: true,
  })
  .check((argv) => {
    if (argv.depth < 1) {
      return `--depsh should not less than 0`;
    }
    if (argv.interval < 1) {
      return `--interval should not less than 0`;
    }
    return true;
  })
  .help().argv;

handler(argv);
