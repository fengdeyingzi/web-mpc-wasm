#include <stdio.h>

typedef struct _P { int x; int y; } P;
P getP(int x, int y) { P p; p.x = x; p.y = y; return p; };

int f1(P *p) { return p->x; }

int f2(P *p) {
    return f1(p) && p->y;
}

int main() {
    P p = getP(1, 2);
    printf("f2() = %d\n", f2(&p));
    return 0;
}
