package com.original.desafio.exception;

import com.original.desafio.utils.ResponseException;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.http.HttpStatus;

@RunWith(MockitoJUnitRunner.class)
public class ResponseExceptionTest {
    @Test(expected = ResponseException.class)
    public void ResponseExceptionWithMessage() {
        throw new ResponseException("Teste Exception");
    }

    @Test(expected = ResponseException.class)
    public void ResponseExceptionWithMessageAndStatus() {
        throw new ResponseException("Teste Exception", HttpStatus.BAD_GATEWAY);
    }

    @Test(expected = ResponseException.class)
    public void ResponseExceptionWithMessageThrowableAndStatus() {
        throw new ResponseException("Teste Exception", new Throwable(), HttpStatus.BAD_GATEWAY);
    }
}
