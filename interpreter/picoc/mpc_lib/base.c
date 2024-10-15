#include "../interpreter.h"
#include <stdlib.h>


// 声明来自其它地方的函数
extern void StdlibMalloc(struct ParseState *Parser, struct Value *ReturnValue, struct Value **Param, int NumArgs);
extern void StdlibFree(struct ParseState *Parser, struct Value *ReturnValue, struct Value **Param, int NumArgs);
extern void StdioPrintf(struct ParseState *Parser, struct Value *ReturnValue, struct Value **Param, int NumArgs);
extern void StringMemset(struct ParseState *Parser, struct Value *ReturnValue, struct Value **Param, int NumArgs);
extern void StringStrcpy(struct ParseState *Parser, struct Value *ReturnValue, struct Value **Param, int NumArgs);
extern void StringStrlen(struct ParseState *Parser, struct Value *ReturnValue, struct Value **Param, int NumArgs);

// 声明来自JS的函数
extern int js_c2u(const char *pInStr, int inBytes, char *pOutStr, int *pOutBytes);
extern int js_u2c(const char *pInStr, int inBytes, char *pOutStr, int *pOutBytes);
extern int js_wstrlen(const char *pStr);


void mpc_c2u(struct ParseState *Parser, struct Value *ReturnValue, struct Value **Param, int NumArgs)
{
    // Func: short* c2u(char *cp, int32 *err, int32 *size);
    char *inputStr = Param[0]->Val->Pointer;
    char *errCh    = Param[1]->Val->Pointer;
    int *pOutBytes = Param[2]->Val->Pointer;

    int inBytes = strlen(inputStr);
    short *outStr = malloc(inBytes * 4);
    memset(outStr, 0, inBytes);

    int ret = js_c2u(inputStr, inBytes, outStr, pOutBytes);
    *errCh = (ret == 0 ? 0 : 'A');

    ReturnValue->Val->Pointer = outStr;
}

void mpc_u2c(struct ParseState *Parser, struct Value *ReturnValue, struct Value **Param, int NumArgs)
{
    // Func: int32 u2c(uint8* input, int32 input_len, uint8** output, int32* output_len);
    ReturnValue->Val->LongInteger = js_u2c(
        Param[0]->Val->Pointer,
        Param[1]->Val->Integer,
        Param[2]->Val->Pointer,
        Param[3]->Val->Pointer
    );
}

void mpc_wstrlen(struct ParseState *Parser, struct Value *ReturnValue, struct Value **Param, int NumArgs)
{
    // Func: int wstrlen(char*);
    ReturnValue->Val->LongInteger = js_wstrlen(Param[0]->Val->Pointer);
}

struct LibraryFunction mpc_BaseFunctions[] =
{
    { StdlibMalloc,      "void *malloc(int);" },
    { StdlibFree,        "void free(void *);" },
    { mpc_c2u,           "short* c2u(char*,int*,int*);" },
    { mpc_u2c,           "int u2c(char*,int,char**,int*);" },
    { StringMemset,      "void *memset(void *,int,int);" },
    { StringStrcpy,      "char *strcpy(char *,char *);" },
    { StdioPrintf,       "int printf(char *, ...);" },
    { StringStrlen,      "int strlen(char *);" },
    { mpc_wstrlen,       "int wstrlen(char*);" }
};

const char mpc_BaseDefs[] = "\
#define _VERSION 1001\r\n\
#define _DEBUG 1\r\n\
typedef unsigned short uint16;\
typedef unsigned long uint32;\
typedef long int32;\
typedef unsigned char uint8;\
typedef char int8;\
typedef short int16;\
typedef struct{uint16 x;uint16 y;uint16 w;uint16 h;}rectst;\
typedef struct{uint8 r;uint8 g;uint8 b;}colorst;\
enum{KY_DOWN,KY_UP,MS_DOWN,MS_UP,MN_SLT,MN_RET,MR_DIALOG,MS_MOVE=12};\
enum{_0,_1,_2,_3,_4,_5,_6,_7,_8,_9,_STAR,_POUND,_UP,_DOWN,_LEFT,_RIGHT,_SLEFT=17,_SRIGHT,_SEND,_SELECT};\
enum{SEEK_SET,SEEK_CUR,SEEK_END};\
enum{IS_FILE=1,IS_DIR=2,IS_INVALID=8};\
enum{DLG_OK,DLG_CANCEL};\
enum{BM_OR,BM_XOR,BM_COPY,BM_NOT,BM_MERGENOT,BM_ANDNOT,BM_TRANS,BM_AND,BM_GRAY,BM_REVERSE};";

/* creates various system-dependent definitions */
void mpc_BaseSetupFunc(Picoc *pc)
{
    /* defines */
}
