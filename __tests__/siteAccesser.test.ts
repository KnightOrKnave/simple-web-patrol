import {BlowserSiteAccesser} from "../src/siteAccesser";

//外部接続テストなので普段は無効
test.skip("正常系_通常通信",async()=>{
  const ac = new BlowserSiteAccesser();
  const actual = await ac.access('https://example.com');
  expect(actual).toEqual({status:"OK",title:"Example Domain"})

},15*1000)