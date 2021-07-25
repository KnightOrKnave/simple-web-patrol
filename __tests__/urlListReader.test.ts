import {TxtFileReader} from "../src/urlListReader";

test('正常系_reader', async ()=>{
  const rd = new TxtFileReader(`${__dirname}/data/正常なURLリスト.txt`);
  const actual = await rd.readAll();
  const exp = ['https://example.com','https://google.com','https://yahoo.co.jp'];
  expect(actual).toEqual(exp);
});

test('異常系_ファイルがない', async ()=>{
  const rd = new TxtFileReader(`${__dirname}/data/nofile`);
  const actual = await rd.readAll();
  const exp:string[] = [];
  expect(actual).toEqual(exp);
});