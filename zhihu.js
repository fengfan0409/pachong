const request=require('request');
const cheerio=require('cheerio');
const fs=require('fs');
//乱码不是因为gzip压缩
// const zlib=require('zlib');
// const gzipStream=zlib.createGzip()
// const out=fs.createWriteStream()
const options={
    url:'https://www.zhihu.com/people/feng-fan-16-89/activities',
    method:'GET',
    headers:{
        "Host":"www.zhihu.com",
        "Referer":"https://www.zhihu.com/people/feng-fan-16-89/activities",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
        //"Accept-Encoding": "gzip, deflate, br",
        //"Accept-Language": "zh-CN,zh;q=0.9",
        //"Cache-Control": "max-age=0",
        //"Upgrade-Insecure-Requests": "1",
        //"Scheme": "https",
        //"cookie": 'd_c0="AIBmVwTKxQ2PTnweCf1Kl25l032F8nLSXIw=|1529391703"; _zap=0b0bcf1d-d08e-4290-95b2-4dfb26d6b881; z_c0="2|1:0|10:1529397772|4:z_c0|92:Mi4xVlRZTUFRQUFBQUFBZ0daWEJNckZEU1lBQUFCZ0FsVk5EQkFXWEFBeFZ4Qks1dXBpSVFlT19ObnNZTEFEdGNXSlBR|7bf0d0d10c1445ca324345a3b337a20935e535eb8eede87182d5bb82b3295c41"; __utmv=51854390.100-1|2=registration_date=20150318=1^3=entry_date=20150318=1; _xsrf=LwX9zwKHL3RbQ7XnNxHLgOY9Lq7xQLGj; q_c1=749609e1ab4a48d682a83a8bfc500dab|1532020026000|1529391703000; __utma=51854390.1643365852.1529846689.1530195091.1532439475.3; __utmz=51854390.1532439475.3.3.utmcsr=zhihu.com|utmccn=(referral)|utmcmd=referral|utmcct=/search; tgw_l7_route=156dfd931a77f9586c0da07030f2df36'
    }
}
function req(){
    return new Promise((resolve)=>{
        request(options,function (error, response, data) {
            resolve(data)
        })
    })
}
req().then(data=>{
    const $=cheerio.load(data, { decodeEntities: false });//decodeEntities解决GBK汉字乱码问题
    const name=$.html();
    return new Promise((resolve)=>{
        resolve(name)
    })
}).then(name=>{
    fs.writeFile('data.txt',name,(err) =>{
        if (err){
            throw err
        }
    })
    return new Promise((resolve)=>{
        resolve(name)
    })
}).then(n=>{
    console.log(n)
})
async function _main() {

}