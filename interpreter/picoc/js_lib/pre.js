// 实现 JS API
// JavaScript与C/C++之间只能通过number进行参数和返回值传递

const js_api = {

    iconv: function(inType, pInStr, inBytes, outType, pOutStr, pOutBytes) {
        // console.log("iconv() arguments:", {inType, pInStr, inBytes, outType, pOutStr, pOutBytes});
        try {
            // inType编码的 Uint8Array
            const inTypeArr = HEAPU8.slice(pInStr, pInStr + inBytes);
            const str = (new TextDecoder(inType)).decode(inTypeArr); // JS字符串 UTF16编码
    
            // outType编码的 Uint8Array
            const outTypeArr0 = (new TextEncoder(outType)).encode(str);
            const outTypeArr = new Uint8Array(outTypeArr0.byteLength + 2);
            outTypeArr.set(outTypeArr0);
            // 增加结束标识符(两个0)
            outTypeArr.set([0, 0], outTypeArr0.byteLength);

            outTypeArr.forEach((v, i) => {
                HEAPU8[pOutStr + i] = v;
            });
            HEAP32[pOutBytes >> 2] = outTypeArr.byteLength;
    
            // console.log("iconv() result:", {
            //     str,
            //     in : {type: inType,  Uint8Arr: inTypeArr,  byteLength: inTypeArr.byteLength},
            //     out: {type: outType, Uint8Arr: outTypeArr, byteLength: outTypeArr.byteLength},
            // });

            return 0;
        } catch (error) {
            console.error("js_api.iconv()", error);
            return 1;
        }
    },

    u2c: function(pInStr, inBytes, pOutStr, outBytes) {
        return this.iconv('utf-8', pInStr, inBytes, 'gbk', pOutStr, outBytes);
    },

    c2u: function(pInStr, inBytes, pOutStr, outBytes) {
        return this.iconv('gbk', pInStr, inBytes, 'utf-8', pOutStr, outBytes);
    },

    // 计算utf8编码字符串的所占字节数
    wstrlen: function(pStr) {
        console.log("wstrlen() pStr", pStr);
        let l = 0;
        while (true) {
            console.log(l, HEAPU8[pStr + l], HEAPU8[pStr + l + 1]);
            if (HEAPU8[pStr + l] == 0 && HEAPU8[pStr + l + 1] == 0) {
                break;
            }
            if (l > 1000) { //debug
                break;
            }
            l ++;
        }
        console.log(HEAPU8.slice(pStr, pStr + l + 1));
        return l > 0 ? l + 1 : 0;
    },

};
