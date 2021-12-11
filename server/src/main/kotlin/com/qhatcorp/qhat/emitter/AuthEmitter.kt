package com.qhatcorp.qhat.emitter

import io.grpc.stub.StreamObserver
import grpc.qhat.auth.Message

class AuthEmitter {
    companion object {
        fun emitLoginResponse(
            responseObserver: StreamObserver<Message.LoginResponse>,
            accessToken: String,
            refreshToken: String
        ) {
            responseObserver.also {
                it.onNext(
                    Message.LoginResponse.newBuilder()
                        .apply {
                            this.accessToken = accessToken
                            this.refreshToken = refreshToken
                        }
                        .build()
                )
                it.onCompleted()
            }
        }
    }
}