import { firefox } from "playwright";
import url from "url";

export type accessResult = {
  status: string;
  title: string;
  url: string;
  links: string[];
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
    let title: string = "";
    let status: string = "-";
    let linkUrls: string[] = [];
    try {
      const context = await brower.newContext();
      const page = await context.newPage();
      const res = await page.goto(targetUrl);
      title = await page.title();
      status = res?.statusText() || "-";
      const linkUrlsBase = await page.$$eval("a", (links) =>
        links.map((l) => l.href)
      );
      //extract only external domain
      linkUrls = linkUrlsBase.filter((_) => {
        try{
          const f = new url.URL(_);
          const s = new url.URL(targetUrl);
          return f.hostname != s.hostname;
        }catch(e){}
        return false;
      });
    } finally {
      await brower.close();
    }
    return { status: status, title: title, url: targetUrl, links: linkUrls };
  }
}
