import {firefox} from 'playwright';

export type accessResult={
  status:string;
  title:string
}

export interface siteAccesser{
  access(targetUrl:string):Promise<accessResult>
}

export class BlowserSiteAccesser implements siteAccesser{
  browseType: string;
  constructor(){
    this.browseType="firefox"
  }
  async access(targetUrl:string): Promise<accessResult> {
    const brower = await firefox.launch();
    const context = await brower.newContext();
    const page = await context.newPage();
    const res = await page.goto(targetUrl);
    const title:string = await page.title();
    const status:string = res?.statusText()||"-";
    await brower.close();
    return {status:status,title:title};
  }
}