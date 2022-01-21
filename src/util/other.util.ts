/*
 * @Author: nevin
 * @Date: 2021-12-28 16:05:42
 * @LastEditors: nevin
 * @LastEditTime: 2022-01-20 15:29:04
 * @Description: 文件描述
 */
const moment = require('moment')
const _ = require('lodash')

export class OtherUtil {
    constructor(parameters) {

    }

    static sleep(ms: number): Promise<string> {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve('time out');
            }, ms);
        })
    }

    static objKeySort(obj: object) {
        //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
        const newkey = Object.keys(obj).sort();
        const newObj = {};//创建一个新的对象，用于存放排好序的键值对
        //遍历newkey数组
        for (let i = 0; i < newkey.length; i++) {
            newObj[newkey[i]] = obj[newkey[i]];//向新创建的对象中按照排好的顺序依次增加键值对
        }
        //返回排好序的新对象
        return newObj;
    }
}

const format = require('string-format')
format.extend(String.prototype, {})


let utils = {};



//排序的函数
// utils.

//     /**
//      * 10位 秒级时间戳,
//      */
//     utils.getUnixTimestamp = function (timestamp) {

//         if (utils.isEmpty(timestamp)) {
//             // return Math.round( new Date().getTime() / 1000 )
//             return moment().unix()
//         }

//         return Math.round(timestamp / 1000)
//     }

// /**
//  *  13位 毫秒级时间戳  Unix ms timestamp
//  */
// utils.getTimestamp = function (offset = 0) {
//     // return Number(moment().format('x'))
//     // return moment.now() + (offset * 1000)
//     if (offset) {
//         return moment(offset).valueOf();
//     }
//     return moment().valueOf();
// }

// // 下划线转换驼峰
// utils.underlineToHump = function (obj) {
//     let newObj = {}
//     for (let key in obj) {
//         let newKey = key.replace(/\_(\w)/g, function (all, letter) {
//             return letter.toUpperCase();
//         });
//         newObj[newKey] = obj[key]
//     }
//     return newObj
// }

// // 驼峰转换下划线
// utils.humpToUnderline = function (obj) {
//     let newObj = {}
//     for (let key in obj) {
//         newObj[key.replace(/([A-Z])/g, '_$1').toLowerCase()] = obj[key]
//     }
//     return newObj
// }

// utils.mobileToMask = function (mobile) {
//     return strToMask(mobile, 3, 4)
// }

// function strToMask(str, frontLen, endLen) {
//     str = str || ''
//     if (!_.isString(str)) {
//         str = _.toString(str)
//     }
//     str = str.trim()
//     let len = str.length - frontLen - endLen;
//     let mask = '';
//     for (let i = 0; i < len; i++) {
//         mask += '*';
//     }
//     return str.substring(0, frontLen) + mask + str.substring(str.length - endLen);
// }

// /**
//  * 向下取整, 保留n位小数并格式化输出（不足的部分补0）
//  */
// utils.floorFloat = function (value, n = 2) {
//     let f = Math.floor(value * Math.pow(10, n)) / Math.pow(10, n);
//     let s = f.toString();
//     let rs = s.indexOf('.');
//     if (rs < 0) {
//         s += '.';
//     }
//     for (let i = s.length - s.indexOf('.'); i <= n; i++) {
//         s += '0';
//     }
//     return s;
// }

// /**
//  * 向上取整, 保留n位小数并格式化输出（不足的部分补0）
//  */
// utils.ceilFloat = function (value, n = 2) {
//     let f = Math.ceil(value * Math.pow(10, n)) / Math.pow(10, n);
//     let s = f.toString();
//     let rs = s.indexOf('.');
//     if (rs < 0 && n > 0) {
//         s += '.';
//     }
//     for (let i = s.length - s.indexOf('.'); i <= n; i++) {
//         s += '0';
//     }
//     return s;
// }

// /**
//  * 获得date日期的13位时间戳
//  */
// utils.getTimeSecond = function getTimeSecond(date) {
//     return date.getTime();
// };

// // Extension API
// // String.prototype.format = function(args) {
// //     var result = this;
// //     if (arguments.length > 0) {
// //         if (arguments.length == 1 && typeof args == 'object') {
// //             for (var key in args) {
// //                 if(args[key]!=undefined){
// //                     let reg = new RegExp('({' + key + '})', 'g');
// //                     result = result.replace(reg, args[key]);
// //                 }
// //             }
// //         }
// //         else {
// //             for (var i = 0; i < arguments.length; i++) {
// //                 if (arguments[i] != undefined) {
// //                     //var reg = new RegExp("({[" + i + "]})", "g");//这个在索引大于9时会有问题，谢谢何以笙箫的指出
// //                     let reg = new RegExp('({)' + i + '(})', 'g');
// //                     result = result.replace(reg, arguments[i]);
// //                 }
// //             }
// //         }
// //     }
// //     return result;
// // };

// // Number.prototype.toYuan = function(isCent = true, isFormat = false) {
// //     let result = this.valueOf()
// //     if(isCent){
// //         result = result / 100
// //     }
// //     result = currency(result)
// //
// //     if(isFormat){
// //         // currency(cent/100, { formatWithSymbol: false, separator: '' }).format()
// //         result.s.formatWithSymbol = false
// //         result.s.separator = ''
// //         return result.format()
// //     }
// //
// //     return result.value
// // };

// utils.getAgeByStrBirthday = function (strBirthday) {
//     let returnAge,
//         strBirthdayArr = strBirthday.split('-'),
//         birthYear = strBirthdayArr[0],
//         birthMonth = strBirthdayArr[1],
//         birthDay = strBirthdayArr[2],
//         d = new Date(),
//         nowYear = d.getFullYear(),
//         nowMonth = d.getMonth() + 1,
//         nowDay = d.getDate();
//     if (nowYear === birthYear) {
//         returnAge = 0;//同年 则为0周岁
//     } else {
//         var ageDiff = nowYear - birthYear; //年之差
//         if (ageDiff > 0) {
//             if (nowMonth === birthMonth) {
//                 var dayDiff = nowDay - birthDay;//日之差
//                 if (dayDiff < 0) {
//                     returnAge = ageDiff - 1;
//                 } else {
//                     returnAge = ageDiff;
//                 }
//             } else {
//                 var monthDiff = nowMonth - birthMonth;//月之差
//                 if (monthDiff < 0) {
//                     returnAge = ageDiff - 1;
//                 } else {
//                     returnAge = ageDiff;
//                 }
//             }
//         } else {
//             returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
//         }
//     }
//     return returnAge;//返回周岁年龄
// }

// /**
//  * 去除连续数值
//  */
// utils.replaceSeriesNum = function (str, num = 3, char = '*') {
//     const regExpStr = `/\\d{${num},}/g`;
//     const pattern = eval(regExpStr);
//     return {
//         isOk: !pattern.test(str),
//         newStr: str.replace(pattern, char),
//     };
// }

// /**
//  * url去除域名
//  */
// utils.delUrlHost = function (url) {
//     url = url.replace(/^(http|https):\/\/[^/]+/, '');
//     url = url.substr(1);
//     return url;
// }

// module.exports = utils