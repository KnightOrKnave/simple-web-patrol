import {urlListReader,TxtFileReader} from "./urlListReader";
import cron from 'node-cron';


async function job(reader:urlListReader){

}

async function main(){
  
  const rd=new TxtFileReader("../data/input.txt");
  job(rd);
}

main();