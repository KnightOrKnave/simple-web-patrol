import {urlListReader,TxtFileReader} from "./urlListReader";
import cron from 'node-cron';


async function patrolJob(reader:urlListReader){

}

async function main(){
  const rd=new TxtFileReader("../data/input.txt");

  cron.schedule('0,0,*,*,*,*',async ()=>{
    patrolJob(rd);
  });
}

main();