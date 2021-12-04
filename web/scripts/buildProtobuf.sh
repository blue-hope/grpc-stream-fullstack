#!/bin/bash

rm -rf ./src/api/_proto
mkdir -p ./src/api/_proto

PROTOC=`command -v protoc`
if [[ "$PROTOC" == "" ]]; then
  echo "Required "protoc" to be installed. Please visit https://github.com/protocolbuffers/protobuf/releases (3.6.1 suggested)."
  exit -1
fi

echo "Compiling protobuf definitions"
protoc \
  --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
  -I . \
  --js_out=import_style=commonjs,binary:./src/api/_proto \
  --ts_out=service=grpc-web:./src/api/_proto \
  ./grpc/qhat/**/*.proto