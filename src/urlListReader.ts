import fs from "fs";
import url from "url";
import { firefox } from "playwright";

export interface urlListReader {
  readAll(): Promise<string[]>;
}

export class TxtFileReader implements urlListReader {
  filePath: string;

  constructor(_filePath: string) {
    this.filePath = _filePath;
  }

  async readAll(): Promise<string[]> {
    let urls: string[] = [];
    try {
      const f = await fs.promises.readFile(this.filePath, {
        encoding: "utf-8",
      });
      urls = f.split("\n");
    } catch (e) {
      console.log("URL一覧取得に失敗");
    } finally {
    }
    return urls;
  }
}

export class WebsiteLinkReader implements urlListReader {
  targetUrl: string;
  browseType: string;
  onlyExtractDomain: boolean;

  constructor(_targetUrl: string, _onlyExtract: boolean) {
    this.targetUrl = _targetUrl;
    this.browseType = "firefox";
    this.onlyExtractDomain=_onlyExtract;
  }

  async readAll(): Promise<string[]> {
    const brower = await firefox.launch();
    const context = await brower.newContext();
    const page = await context.newPage();
    const res = await page.goto(this.targetUrl);
    if(!res?.ok){
      return [];
    }
    const linkUrls = await page.$$eval('a',(links)=>links.map((l)=>l.href));
    await brower.close();
    return await linkUrls.filter((l)=>{
        const f = new url.URL(l);
        const s = new url.URL(this.targetUrl);
        return !this.onlyExtractDomain || f.hostname != s.hostname;
    });
  }
}
