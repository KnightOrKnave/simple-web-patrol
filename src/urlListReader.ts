import fs from "fs";
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

  constructor(_targetUrl: string) {
    this.targetUrl = _targetUrl;
    this.browseType = "firefox";
  }

  async readAll(): Promise<string[]> {
    const brower = await firefox.launch();
    const context = await brower.newContext();
    const page = await context.newPage();
    const res = await page.goto(this.targetUrl);
    if(!res?.ok){
      return [];
    }
    const linkUrls = page.$$eval('a',(links)=>links.map((l)=>l.href));
    return linkUrls;
  }
}
