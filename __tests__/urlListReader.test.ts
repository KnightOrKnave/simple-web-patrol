import {TxtFileReader} from "../src/urlListReader";

test('正常系_reader', async ()=>{
  const rd = new TxtFileReader(`${__dirname}/data/正常なURLリスト.txt`);
  const actual = await rd.readAll();
  const exp = ['https://example.com','https://google.com','https://yahoo.co.jp'];
  expect(actual).toEqual(exp);
});