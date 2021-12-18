import { firefox } from "playwright";

export type accessResult = {
  status: string;
  title: string;
  url:string;
};

export interface siteAccesser {
  access(targetUrl: string): Promise<accessResult>;
}

export class BlowserSiteAccesser implements siteAccesser {
  browseType: string;
  constructor() {
    this.browseType = "firefox";
  }

  async access(targetUrl: string): Promise<accessResult> {
    const brower = await firefox.launch();
    let title:string="";
    let status:string="-";
    try {
      const context = await brower.newContext();
      const page = await context.newPage();
      const res = await page.goto(targetUrl);
      title = await page.title();
      status = res?.statusText() || "-";
      const linkUrls = await page.$$eval('a',(links)=>links.map((l)=>l.href));
    } catch (e) {
      console.log(`取得失敗:${targetUrl}`)
    } finally {
      await brower.close();
    }
    return { status: status, title: title ,url:targetUrl};
  }
}
