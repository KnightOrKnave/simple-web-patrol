import cron from 'node-cron';
import { TxtFileReader } from './urlListReader';
import { BlowserSiteAccesser } from './siteAccesser';
import { patrolJob } from './main';
import { ConsoleLogger } from './accessLogger';

async function handler(){
  const rd=new TxtFileReader(`${__dirname}/../data/input.txt`);
  const ac = new BlowserSiteAccesser();
  const lg = new ConsoleLogger();

  cron.schedule('0 * * * *', async ()=>{
    patrolJob(rd,ac,lg);
  });
}

handler();