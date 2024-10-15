SRC=.
PICOC_SRC=./picoc
OUT_DIR=../dist/wasm

FLAGS=-Wall -pedantic -g -DUNIX_HOST -O1
INCLUDES=-I$(PICOC_SRC)
LIB_PATHs=
LIBS=-lm
OPTIONS=-s ASSERTIONS \
	-s EXPORTED_RUNTIME_METHODS=ccall,cwrap \
	-s EXIT_RUNTIME=0 \
	-s FORCE_FILESYSTEM=1 \
	--embed-file $(SRC)/embed-file/workspace@/workspace \
	--pre-js $(PICOC_SRC)/js_lib/pre.js \
	--js-library $(PICOC_SRC)/js_lib/library.js

main:
	mkdir -p $(OUT_DIR) && \
	emcc $(FLAGS) $(INCLUDES) $(LIB_PATHs) $(LIBS) $(OPTIONS) \
	-o $(OUT_DIR)/index.js \
	$(SRC)/main.c \
	$(PICOC_SRC)/table.c \
	$(PICOC_SRC)/lex.c \
	$(PICOC_SRC)/parse.c \
	$(PICOC_SRC)/expression.c \
	$(PICOC_SRC)/heap.c \
	$(PICOC_SRC)/type.c \
	$(PICOC_SRC)/variable.c \
	$(PICOC_SRC)/clibrary.c \
	$(PICOC_SRC)/platform.c \
	$(PICOC_SRC)/include.c \
	$(PICOC_SRC)/debug.c \
	$(PICOC_SRC)/platform/platform_unix.c \
	$(PICOC_SRC)/platform/library_unix.c \
	$(PICOC_SRC)/cstdlib/stdio.c \
	$(PICOC_SRC)/cstdlib/math.c \
	$(PICOC_SRC)/cstdlib/string.c \
	$(PICOC_SRC)/cstdlib/stdlib.c \
	$(PICOC_SRC)/cstdlib/time.c \
	$(PICOC_SRC)/cstdlib/errno.c \
	$(PICOC_SRC)/cstdlib/ctype.c \
	$(PICOC_SRC)/cstdlib/stdbool.c \
	$(PICOC_SRC)/mpc_lib/base.c
