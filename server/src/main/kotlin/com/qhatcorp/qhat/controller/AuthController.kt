package com.qhatcorp.qhat.controller

import com.google.rpc.Code
import com.qhatcorp.qhat.service.AuthService
import com.qhatcorp.qhat.service.UserService
import grpc.qhat.auth.AuthServiceGrpc
import grpc.qhat.auth.Message
import io.grpc.Status
import io.grpc.stub.StreamObserver
import org.lognet.springboot.grpc.GRpcService

@GRpcService
class AuthController(
    private val authService: AuthService,
    private val userService: UserService,
    ): AuthServiceGrpc.AuthServiceImplBase() {
    override fun login(
        request: Message.LoginRequest,
        responseObserver: StreamObserver<Message.LoginResponse>
    ) {
        val errStatus = Status.UNAUTHENTICATED.withDescription("이메일 혹은 패스워드가 유효하지 않습니다.")
        val user = userService.getUserByEmail(request.email) ?: run {
            responseObserver.onError(errStatus.asRuntimeException())
            return
        }

        if (authService.login(user, request.password)) {
            val jwt = authService.createJwt(user)
            responseObserver.also {
                it.onNext(
                    Message.LoginResponse.newBuilder()
                        .apply {
                            this.accessToken = jwt
                        }
                        .build()
                )
                it.onCompleted()
            }
        } else {
            responseObserver.onError(errStatus.asRuntimeException())
        }
    }
}