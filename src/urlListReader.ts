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
    let urls:string[]=[];
    try{
      const f=await fs.promises.readFile(this.filePath,{encoding:'utf-8'});
      urls = f.split('\n');
    }catch(e){
      console.log("URL一覧取得に失敗");
    }finally{
    }
    return urls;
  }
}