import cron from 'node-cron';
import { TxtFileReader } from './urlListReader';
import { BlowserSiteAccesser } from './siteAccesser';
import { patrolJob } from './main';
import { ConsoleLogger } from './accessLogger';

async function main(){
  const rd=new TxtFileReader("../data/input.txt");
  const ac = new BlowserSiteAccesser();
  const lg = new ConsoleLogger();

  cron.schedule('0,0,*,*,*,*',async ()=>{
    patrolJob(rd,ac,lg);
  });
}

main();