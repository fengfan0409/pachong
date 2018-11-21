const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

let lesson = [];
let finalArray = [];
let finalObject = {};
let options = {
    createSingleJson: false,
    createAllJson: false
};
//入口
start();
const Lesson = function (name, href) {
    this.name = name;
    this.href = href;
    this.date = '';
}

function start() {
    for (let i = 1; i <= 6; i++) {
        _main(i)
    }
}

function req(index) {
    return new Promise((resolve) => {
        request('http://www.feixueteam.net/forum-55-' + index + '.html', function (error, response, data) {
            resolve(data)
        })
    })
}

function _main(index) {
    req(index).then(data => {
        const $ = cheerio.load(data, {decodeEntities: false});//decodeEntities解决GBK汉字乱码问题
        return new Promise((resolve) => {
            resolve($)
        })
    }).then($ => {
        $('.xst').each(function (i) {
            let name = $(this).text();//和jq一样,this前别忘了$
            let href = 'http://www.feixueteam.net/' + $(this).attr().href;
            lesson[i] = new Lesson(name, href)
        });
        //第一页有问题,不能用通用爬date方法
        // $('.by span').each(function (i,ele) {
        //     lesson[i].date=$(this).text()
        // });
        return new Promise((resolve) => {
            resolve(lesson)
        })
    }).then((lesson) => {//遍历不要异步then
        lesson.forEach((item, ind) => {
            if (options.createSingleJson) {
                fs.writeFile('link' + index + '-' + ind + '.json', JSON.stringify(item), function (err) {
                    if (err) {
                        throw err
                    }
                })
            }
            finalArray.push(item);
            Object.defineProperty(finalObject, 'lesson' + index + '_' + ind, {
                value: item,
                enumerable: true,
                configurable: true,
                writable: true,
            })
        });
        return new Promise((resolve) => {
            resolve()
        })
    }).then(() => {
        if (options.createAllJson) {
            fs.writeFile('linkAll.json', JSON.stringify(finalObject), function (err) {
                if (err) {
                    throw err
                }
            })
        }
    })
}
