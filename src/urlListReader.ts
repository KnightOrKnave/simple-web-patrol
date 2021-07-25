import fs from 'fs';

export interface urlListReader{
  readAll(): Promise<string[]>
}

export class TxtFileReader implements urlListReader{
  filePath:string;

  constructor(_filePath:string){
    this.filePath=_filePath;
  }

  async readAll(): Promise<string[]>{
    const f=await fs.promises.readFile(this.filePath,{encoding:'utf-8'});
    const urls = f.split('\n');
    return urls;
  }
}