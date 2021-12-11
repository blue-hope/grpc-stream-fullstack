package com.qhatcorp.qhat.controller

import com.qhatcorp.qhat.emitter.UserEmitter
import com.qhatcorp.qhat.service.UserService
import grpc.qhat.user.Message
import grpc.qhat.user.UnauthorizedUserServiceGrpc
import io.grpc.Status
import io.grpc.stub.StreamObserver
import org.lognet.springboot.grpc.GRpcService
import org.springframework.dao.DataIntegrityViolationException

@GRpcService(applyGlobalInterceptors = false)
class UnauthorizedUserController(
    private val userService: UserService
): UnauthorizedUserServiceGrpc.UnauthorizedUserServiceImplBase() {
    override fun create(
        request: Message.CreateRequest,
        responseObserver: StreamObserver<Message.CreateResponse>
    ) {
        val errStatus = Status.ALREADY_EXISTS.withDescription("이미 존재하는 이메일 입니다.")
        try {
            val user = userService.createUser(request)
            UserEmitter.emitCreateResponse(responseObserver, user)
        } catch (e: DataIntegrityViolationException) {
            responseObserver.onError(errStatus.asRuntimeException())
        }
    }
}