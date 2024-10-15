// ʵ�� JS API
// JavaScript��C/C++֮��ֻ��ͨ��number���в����ͷ���ֵ����

const js_api = {

    iconv: function(inType, pInStr, inBytes, outType, pOutStr, pOutBytes) {
        // console.log("iconv() arguments:", {inType, pInStr, inBytes, outType, pOutStr, pOutBytes});
        try {
            // inType����� Uint8Array
            const inTypeArr = HEAPU8.slice(pInStr, pInStr + inBytes);
            const str = (new TextDecoder(inType)).decode(inTypeArr); // JS�ַ��� UTF16����
    
            // outType����� Uint8Array
            const outTypeArr0 = (new TextEncoder(outType)).encode(str);
            const outTypeArr = new Uint8Array(outTypeArr0.byteLength + 2);
            outTypeArr.set(outTypeArr0);
            // ���ӽ�����ʶ��(����0)
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

    // ����utf8�����ַ�������ռ�ֽ���
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
