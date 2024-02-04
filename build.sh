SRC_DIR=Little-CMS/src
INCLUDE_DIR=Little-CMS/include
BIN_DIR=dist

SYMBOLS=$(cat lib/export.txt)
exported_opt=""
first=1
for s in $SYMBOLS; do
  if [[ $first -eq 1 ]]; then
    exported_opt="_$s"
    first=0
  else
    exported_opt="_$s,$exported_opt"
  fi
done

mkdir -p $BIN_DIR

emcc \
  -o $BIN_DIR/lcms.js\
  -I $INCLUDE_DIR $SRC_DIR/*.c\
  -s WASM=1\
  -s ENVIRONMENT=web,worker,node\
  -s MODULARIZE=1\
  -s FILESYSTEM=0\
  -s ASSERTIONS=1\
  -s EXPORT_ES6=1\
  -s DISABLE_EXCEPTION_CATCHING=0\
  -s USE_PTHREADS=0\
  -s EXPORT_NAME="instantiate"\
  -s ALLOW_MEMORY_GROWTH=1\
  -s EXPORTED_RUNTIME_METHODS=["cwrap","ccall"]\
  -s EXPORTED_FUNCTIONS=$exported_opt\
  -s TOTAL_STACK=1MB\
  --post-js lib/api.js\
  --extern-post-js lib/post.js\
  --extern-pre-js lib/constants.js\
  -O3\
  --closure 0\
  -g0

# -s TOTAL_STACK=1MB\
# -s TOTAL_MEMORY=100MB\
  