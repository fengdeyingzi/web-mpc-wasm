// 将由 JS API 注入到 C 环境
// JavaScript与C/C++之间只能通过number进行参数和返回值传递

addToLibrary({

    // 编码转换: inType -> outType
    js_iconv: function(inType, pInStr, inBytes, outType, pOutStr, pOutBytes) {
        return js_api.iconv(inType, pInStr, inBytes, outType, pOutStr, pOutBytes);
    },

    // 编码转换: utf8 -> gb2312
    js_u2c: function (pInStr, inBytes, pOutStr, pOutBytes) {
        return js_api.u2c(pInStr, inBytes, pOutStr, pOutBytes);
    },

    // 编码转换: gb2312 -> utf8
    js_c2u: function (pInStr, inBytes, pOutStr, pOutBytes) {
        return js_api.c2u(pInStr, inBytes, pOutStr, pOutBytes);
    },

    js_wstrlen: function(pStr) {
        return js_api.wstrlen(pStr);
    },

});
