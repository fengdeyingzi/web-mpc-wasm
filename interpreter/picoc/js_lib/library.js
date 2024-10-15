// ���� JS API ע�뵽 C ����
// JavaScript��C/C++֮��ֻ��ͨ��number���в����ͷ���ֵ����

addToLibrary({

    // ����ת��: inType -> outType
    js_iconv: function(inType, pInStr, inBytes, outType, pOutStr, pOutBytes) {
        return js_api.iconv(inType, pInStr, inBytes, outType, pOutStr, pOutBytes);
    },

    // ����ת��: utf8 -> gb2312
    js_u2c: function (pInStr, inBytes, pOutStr, pOutBytes) {
        return js_api.u2c(pInStr, inBytes, pOutStr, pOutBytes);
    },

    // ����ת��: gb2312 -> utf8
    js_c2u: function (pInStr, inBytes, pOutStr, pOutBytes) {
        return js_api.c2u(pInStr, inBytes, pOutStr, pOutBytes);
    },

    js_wstrlen: function(pStr) {
        return js_api.wstrlen(pStr);
    },

});
