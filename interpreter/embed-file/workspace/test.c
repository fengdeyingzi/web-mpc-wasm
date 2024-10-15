#include <base.h>


// (pass) ≤‚ ‘ƒ⁄¥Êπ‹¿Ì: malloc(), free()
void test_malloc() {
    char *name = (char*)malloc(100);
    memset(name, 0, 100);
    strcpy(name, "Hello World!\n");
    printf("%s", name);
    free(name); 
}

// (pass) ≤‚ ‘±‡¬Î◊™ªª: c2u(): gb2312 -> utf8
void test_c2u() {
    printf("test c2u(): gb2312 -> utf8\n");

    char *gbStr = "hello,  ¿ΩÁ!";
    char gbLen = strlen(gbStr);
    printf("gb2312: %s, %d\n", gbStr, gbLen);

    int err = 0;
    int utfLen = 123;
    int16 *utfStr = c2u(gbStr, &err, &utfLen);
    printf("utf-8: %s, %d\n", utfStr, utfLen);

    uint8 *pUtfStr = (void*)utfStr;
    printf("utfStr: new Uint8Array([");
    for (int i = 0; i < utfLen; i++) {
        printf("%d, ", pUtfStr[i]);
    }
    printf("])\n\n");

    free(utfStr);
}

// (error) ≤‚ ‘±‡¬Î◊™ªª: u2c(): utf8 -> gb2312
void test_u2c() {
    printf("test u2c(): utf8 -> gb2312\n");

    char *utfStr = "\x7b\x2c\x4e\x0\x88\x4c\x67\x2b\x5c\x3e\x67\x9\x56\xde\x8f\x66\x0\xa\x7b\x2c\x4e\x8c\x88\x4c\x67\x2b\x5c\x3e\x6c\xa1\x67\x9\x56\xde\x8f\x66\x63\x62\x88\x4c\xff\xc\x95\x7f\x65\x87\x67\x2c\x81\xea\x52\xa8\x63\x62\x88\x4c\x0\x0";
    char utfLen = wstrlen(utfStr);
    printf("utf-8: %s, %d\n", utfStr, utfLen);

    uint8 *pUtfStr = (void*)utfStr;
    printf("utfStr: new Uint8Array([");
    for (int i = 0; i < 100; i++) {
        printf("%d, ", pUtfStr[i]);
    }
    printf("])\n\n");

    int gbLen = 100;
    char *gbStr = malloc(gbLen);
    u2c(utfStr, utfLen, &gbStr, &gbLen);
    printf("gb2312: %s, %d\n", gbStr, gbLen);

    free(gbStr);
}

int main() {
    // test_malloc();
    // test_c2u();
    test_u2c();
    printf("end of main()\n");
    return 0;
}

