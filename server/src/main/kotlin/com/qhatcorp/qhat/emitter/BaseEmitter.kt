package com.qhatcorp.qhat.emitter

import com.google.protobuf.Empty
import io.grpc.stub.StreamObserver

class BaseEmitter {
    companion object {
        fun emitEmpty(
            responseObserver: StreamObserver<Empty>
        ) {
            responseObserver.also {
                it.onNext(Empty.newBuilder().build())
                it.onCompleted()
            }
        }
    }
}