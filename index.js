const Koa = require("koa");
const soap = require("soap");

const config = require("./config");
const app = new Koa();
 
const url = config.url;
const webapiKey = config.webapiKey;
const args = {
    countryId: 1,
    webapiKey
} 

app.use(async ctx => {

        const client = await soap.createClientAsync(url);
        const result = await client.doQueryAllSysStatusAsync({countryId: '1',webapiKey: 'e2dcc5cd'});
        ctx.body = result[0].sysCountryStatus;
})

app.listen(3000, () => {
    console.log("server starts");
})