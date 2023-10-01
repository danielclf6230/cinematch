//package com.cm.cinematchapp.advice;
//
//import com.cm.cinematchapp.exceptions.DuplicateObjectException;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.validation.BindException;
//import org.springframework.web.bind.annotation.ExceptionHandler;
//import org.springframework.web.bind.annotation.RestControllerAdvice;
//
//@RestControllerAdvice
//public class GlobalExceptionHandler {
//
//    @ExceptionHandler(value= {BindException.class})
//    ResponseEntity<String> bindExceptionHandler(BindException ex) {
//        return ResponseEntity.badRequest()
//                .body(ex.getAllErrors().get(0).getDefaultMessage());
//    }
//
//    @ExceptionHandler({DuplicateObjectException.class})
//    ResponseEntity<String> duplicateObjectsExceptionHandler(DuplicateObjectException ex) {
//        return ResponseEntity.status(HttpStatus.CONFLICT).body(ex.getMessage());
//    }
//}
