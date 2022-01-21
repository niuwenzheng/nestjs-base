/*
 * @Author: nevin
 * @Date: 2021-12-25 15:49:33
 * @LastEditors: nevin
 * @LastEditTime: 2021-12-28 13:51:57
 * @Description: 文件描述
 */
import { StrUtil } from './str.util'
import * as _ from 'lodash'
import * as moment from 'moment'
import { TimeUtil } from './time.util'
describe('util', () => {
    beforeEach(async () => { })
    it('xxx', () => {
        const xx = StrUtil.getAllBig("vv")
        console.log(xx);

    })

    it('ccc', () => {
        const def = { a: 1, ab: { a: 1, b: 2, d: { t1: 44, t2: 55 } } }
        const now = { b: 2, ab: { a: 2, c: 3 } }
        const d3 = _.defaultsDeep(now, def)
        console.log('========= def', def, '======= now', now, '================ d3', d3);

        const tO = { a: null, bY: 1, c: undefined, dY: 0, eY: false, f: NaN, g: '', h: [], i: {} }
        var tORes2 = _(tO).omitBy(_.isNil).omitBy(_.isNaN).value();
        console.log('========== tORes2', tORes2, '=========== tO', tO);


        var tORes3 = _.pickBy(tO, (value) => {
            if ([null, undefined, NaN, ''].includes(value)) return false;
            if (_.isObject(value) && _.isEmpty(value)) return false;
            return true;
        });
        console.log('========== tORes3', tORes3, '=========== tO', tO);

        const nowTime = moment().valueOf();
        console.log('========== nowTime', nowTime);
        console.log('========== nowTimeStr', moment(nowTime).format('YYYY-MM-DD HH:mm:ss'));
        

    })

    it('ttttt', () => {
        const nowTime = moment().valueOf();

        console.log('============== ', TimeUtil.getNeedTime(nowTime), TimeUtil.getNeedTime(moment(nowTime).format()));
        
    })
})