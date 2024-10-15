#include <stdlib.h>
#include <stdbool.h>
#include <stdio.h>
#include <string.h>
#include <emscripten/emscripten.h>
#include "picoc/picoc.h"

#define PICOC_STACK_SIZE (128*1024)


// 判断文件是否存在
bool fileExists(char *filename)
{
    FILE *file = fopen(filename, "r");
    if (file == NULL) {
        return false;
    } else {
        fclose(file);
        return true;
    }
}

// 获取文本文件的全部内容
int getFileContents(char *filename, char *buffer, int bufSize)
{
    memset(buffer, 0, sizeof(bufSize));
    int len = 0;

	FILE *fp = fopen(filename, "r");
    if (fp != NULL) {
        while (1) {
            int t = fread(buffer + len, 1, bufSize - len, fp);
            if (feof(fp) || t == 0) {
                break;
            }
            len += t;
        }
        fclose(fp);
    }

    return len;
}

// 讲文本输出到文件 (清空原文件内容)
void putFileContents(char *filename, char *contents)
{
	FILE *fp = fopen(filename, "w+");
    fputs(contents, fp);
    fclose(fp);
}

int EMSCRIPTEN_KEEPALIVE picocRun(char *inputFilePath, char *outputFilePath)
{
    freopen("/workspace/stderr.txt", "w", stderr);
    freopen(outputFilePath, "w", stdout);

    Picoc pc;
    PicocInitialise(&pc, PICOC_STACK_SIZE);

    // 如果是从setjmp直接调用返回，setjmp返回值为0。(正常)
    // 如果是从longjmp恢复的程序调用环境返回，setjmp返回非零值。(异常)
    if (PicocPlatformSetExitPoint(&pc) == 0){
        PicocPlatformScanFile(&pc, inputFilePath);
        PicocCallMain(&pc, 0, NULL);
    }

    PicocCleanup(&pc);
    fflush(stdout);

    return pc.PicocExitValue;
}

int main(int argc, char **argv)
{
    printf("WebAssembly loaded!\n");
    // char outputContent[512];

    // char *inputFilePath = "/tests/04.c";
    // printf("%s exists: %d\n", inputFilePath, fileExists(inputFilePath));

    // int len = getFileContents(inputFilePath, outputContent, 512);
    // printf("source code: %d\n%s\n", len, outputContent);

    // int retVal = picocRun(inputFilePath);
    // printf("picoc return: %d\n", retVal);

    // putFileContents("/test.c", "#include <stdio.h>\nint main(){ printf(\"Hello Picoc!\"); return 0; }");
    // picocRun("/test.c");

    return 0;
}
