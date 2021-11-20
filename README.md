# grpc-stream-fullstack

## Prerequisites
### server
* sync `.proto` files on `src/main/proto/grpc/qhat/`

```bash
$ ./gradlew syncProtobuf
```

* generate proto source & build

```bash
$ ./gradlew build
```

### web
* sync `.proto` files on `grpc/`

```bash
$ yarn syncProtobuf
```

* add protoc on linux

```bash
$ sudo apt-get install -y protobuf-compiler
```

* add packages

```bash
$ yarn
```

* generate proto source

```bash
$ yarn buildProtobuf
```
