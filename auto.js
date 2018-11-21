const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
start()

function getData() {
    let dataRow = fs.readFileSync('linkAll.json', 'utf-8', function (err) {
        if (err) {
            throw err
        }
    })
    return JSON.parse(dataRow)
}

function start() {
    let data = getData();
    _main(data)
}

function _main(data) {
    for (let index in data) {//of只能用于可迭代对象,obj不行||用于获取post-url
        let url = data[index].href;
        let urlIndex = url.split('-')[1];
        let postUrl='http://www.feixueteam.net/forum.php?mod=post&infloat=yes&action=reply&fid=55&extra=&tid=' + urlIndex + '&replysubmit=yes&inajax=1'
        req(postUrl,urlIndex)
    }
}
function post(url,urlIndex) {
    //自动执行回复POST
    return new Promise((resolve)=>{
        request({
            url:url,
            method:'POST',
            header:{
                "Host": "www.feixueteam.net",
                "Cache-Control": "max-age=0",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
                "Accept-Encoding": "gzip, deflate",
                "CLIENT_IP": "118.186.200.82",
                "Content-Type": "application/x-www-form-urlencoded",
                "Origin": "http://www.feixueteam.net",
                "REMOTE_ADDR": "118.186.200.82",
                "Upgrade-Insecure-Requests": 1,
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:55.0) Gecko/20100101 Firefox/55.0",
                "VIA": "118.186.200.82",
                "X-Forwarded-For": "118.186.200.82",
                "Referer": "http://www.feixueteam.net/thread-"+urlIndex+"-1-1.html",
                "Accept-Language": "zh-CN,zh;q=0.9",
                "Cookie": "A1Z3_2132_mobile=no; A1Z3_2132_auth=87a4BvCT9hznXDPM2Gq7CEH6V4Brah1o6N2izU5DnTL9Ucwhw7OI55y30CthJLkINZfPsiJJysref6Lhy6ryaVA; A1Z3_2132_lastcheckfeed=543%7C1529022826; A1Z3_2132_checkfollow=1; A1Z3_2132_saltkey=SHXQ5Xxh; A1Z3_2132_lastvisit=1529019225; A1Z3_2132_lip=118.186.200.82%2C1533628470; A1Z3_2132_ulastactivity=3abf4Tbsr17c3Hq%2BitRywC0T%2FqbsbVevS%2B4SFu%2F0rZTc7l%2BBtFYA; _d_id=c09e36873e346b860d09f88b343fce; A1Z3_2132_visitedfid=55; A1Z3_2132_st_t=543%7C1533629288%7C6b43129673dce5494e8668a6ceb4baf3; A1Z3_2132_forum_lastvisit=D_55_1533629288; A1Z3_2132_sendmail=1; A1Z3_2132_viewid=tid_295; A1Z3_2132_sid=D07Rex; A1Z3_2132_st_p=543%7C1533629364%7C682ce4e073b16102358e3cd575efbfd0; A1Z3_2132_smile=1D1; A1Z3_2132_lastact=1533629391%09forum.php%09ajax",
            },
            form:{formhash:'a1f8a128',handlekey:'reply',noticeauthor:'',noticetrimstr:'',noticeauthormsg:'',usesig:0,subject:'',message:'keyidekeyidekeyide'}
        },function (err,res,body) {
            if (err){
                throw err
            }
            resolve(res)
        })
    })
}
function req(url,urlIndex) {
    post(url,urlIndex).then((res)=>{
        if (res.sechash){
            console.log('suc')
        }
    })
}