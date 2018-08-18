const Koa = require("koa");
const soap = require("soap");
const crypto = require("crypto");

const config = require("./config");
const app = new Koa();


 
const {url,webapiKey,userLogin,password,secret} = config;

const hashPassword = crypto.createHash('sha256')
                            .update(password)
                            .digest('base64');
const args = {
    countryId: 1,
    webapiKey,
} 

app.use(async ctx => {
    const client = await soap.createClientAsync(url);
    const result = await client.doQueryAllSysStatusAsync(args);
    const verKey = result[0].sysCountryStatus.item[0].verKey;
    const loginArgs = {
        userLogin: userLogin,
        userHashPassword: hashPassword,
        countryCode: 1,
        webapiKey,
        localVersion: verKey
    
    }
    const login = await client.doLoginEncAsync(loginArgs)
    ctx.body = login[0];
})

app.listen(3000, () => {
    console.log("server starts");
})