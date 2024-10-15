#include <stdio.h>

typedef struct _P { int x; int y; } P;
P getP() { P p; return p; }

int main() {
    P p = getP(1, 2);
    printf("%d, %d\n", p.x, p.y);
    return 0;
}
