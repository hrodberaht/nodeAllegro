const Koa = require("koa");
const soap = require("soap");

const config = require("./config");
const app = new Koa();
 
const {url,webapiKey} = config;
const args = {
    countryId: 1,
    webapiKey
} 

app.use(async ctx => {
    const client = await soap.createClientAsync(url);
    const result = await client.doQueryAllSysStatusAsync(args);
    ctx.body = result[0].sysCountryStatus;
})

app.listen(3000, () => {
    console.log("server starts");
})