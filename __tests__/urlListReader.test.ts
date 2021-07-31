import http from "http";
import { TxtFileReader, WebsiteLinkReader } from "../src/urlListReader";

function generateHtmlLinkList(linkList: string[]): string {
  const aTags = linkList.map((a) => `<a href="${a}>link here</a>`);
  const tg = aTags.join("\n");
  const resHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset='utf-8'>
  <meta http-equiv='X-UA-Compatible' content='IE=edge'>
  <title>Page Title</title>
  <meta name='viewport' content='width=device-width, initial-scale=1'>
  <link rel='stylesheet' type='text/css' media='screen' href='main.css'>
  <script src='main.js'></script>
</head>
<body>
${tg}
</body>
</html>`;
  return resHtml;
}

test("正常系_reader", async () => {
  const rd = new TxtFileReader(`${__dirname}/data/正常なURLリスト.txt`);
  const actual = await rd.readAll();
  const exp = [
    "https://example.com",
    "https://google.com",
    "https://yahoo.co.jp",
  ];
  expect(actual).toEqual(exp);
});

test("異常系_ファイルがない", async () => {
  const rd = new TxtFileReader(`${__dirname}/data/nofile`);
  const actual = await rd.readAll();
  const exp: string[] = [];
  expect(actual).toEqual(exp);
});

test(
  "正常_websiteReader_read",
  async () => {
    const server = http
      .createServer((req, res) => {
        res.end;
      })
      .listen(10045);

    const rd = new WebsiteLinkReader("https://localhost:10045");
    const actual = await rd.readAll();
    console.log(actual);
  },
  15 * 1000
);
