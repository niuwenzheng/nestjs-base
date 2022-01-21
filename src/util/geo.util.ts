
/**
 * 地球半径
 */
const EARTHRADIUS = 6370996.81,
    Ib = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

/**
 * 将度转化为弧度
 * @param degree {Number} 度
 * @returns {Number} 弧度
 */
function degreeToRad(degree) {
    return Math.PI * degree / 180;
}

/**
 * 将v值限定在a,b之间，纬度使用
 */
function _getRange(v, a, b) {
    if (a != null) {
        v = Math.max(v, a);
    }
    if (b != null) {
        v = Math.min(v, b);
    }
    return v;
}

/**
 * 将v值限定在a,b之间，经度使用
 */
function _getLoop(v, a, b) {
    while (v > b) {
        v -= b - a
    }
    while (v < a) {
        v += b - a
    }
    return v;
}

function Jb(a) {
    let b, c, d, e, f, g, i = 0;
    f = /[^A-Za-z0-9\+\/\=]/g;
    if (!a || f.exec(a)) return a;
    a = a.replace(/[^A-Za-z0-9\+\/\=]/g, '');
    do c = Ib.indexOf(a.charAt(i++)),
        d = Ib.indexOf(a.charAt(i++)),
        f = Ib.indexOf(a.charAt(i++)),
        g = Ib.indexOf(a.charAt(i++)),
        c = c << 2 | d >> 4,
        d = (d & 15) << 4 | f >> 2,
        e = (f & 3) << 6 | g,
        b += String.fromCharCode(c), 64 != f && (b += String.fromCharCode(d)), 64 != g && (b += String.fromCharCode(e));
    while (i < a.length);
    return b;
}

function Point(a, b) {
    isNaN(a) && (a = Jb(a), a = isNaN(a) ? 0 : a);
    Za(a) && (a = parseFloat(a));
    isNaN(b) && (b = Jb(b), b = isNaN(b) ? 0 : b);
    Za(b) && (b = parseFloat(b));
    return {
        lng: a,
        lat: b
    }
}

Point.prototype.mb = function (a) {
    return a && this.lat == a.lat && this.lng == a.lng
};

function Za(a) {
    return 'string' == typeof a;
}

/**
 * 百度地图计算两个坐标点的距离
 * @param lng1  经度1
 * @param lat1  纬度1
 * @param lng2  经度2
 * @param lat2  纬度2
 * @return 距离（米）{number}
 */
export function getDistance_BD(lng1, lat1, lng2, lat2) {
    let point1 = Point(parseFloat(lng1), parseFloat(lat1));
    let point2 = Point(parseFloat(lng2), parseFloat(lat2));
    //判断类型
    if (!(point1 instanceof Point) ||
        !(point2 instanceof Point)) {
        return 0;
    }
    point1.lng = _getLoop(point1.lng, -180, 180);
    point1.lat = _getRange(point1.lat, -74, 74);
    point2.lng = _getLoop(point2.lng, -180, 180);
    point2.lat = _getRange(point2.lat, -74, 74);
    let x1, x2, y1, y2;
    x1 = degreeToRad(point1.lng);
    y1 = degreeToRad(point1.lat);
    x2 = degreeToRad(point2.lng);
    y2 = degreeToRad(point2.lat);
    return EARTHRADIUS * Math.acos(Math.sin(y1) * Math.sin(y2) + Math.cos(y1) * Math.cos(y2) * Math.cos(x2 - x1));
}


// ====================== 谷歌地图 ======================
const EARTH_RADIUS = 6378.137; //地球半径  

//将用角度表示的角转换为近似相等的用弧度表示的角 java Math.toRadians  
function rad(d) {
    return d * Math.PI / 180.0;
}

/**
 * 谷歌地图计算两个坐标点的距离
 * @param lng1  经度1
 * @param lat1  纬度1
 * @param lng2  经度2
 * @param lat2  纬度2
 * @return 距离（千米）
 */
export function getDistance_GG(lng1, lat1, lng2, lat2) {
    let radLat1 = rad(lat1);
    let radLat2 = rad(lat2);
    let a = radLat1 - radLat2;
    let b = rad(lng1) - rad(lng2);
    let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2)
        + Math.cos(radLat1) * Math.cos(radLat2)
        * Math.pow(Math.sin(b / 2), 2)));
    s = s * EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000;
    return s;
}
