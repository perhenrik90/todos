package com.example.apijava;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class TodoController{

    @GetMapping("/api-java");
    @ResponseBody
    public Todo hello(){
	Todo t = new Todo("hello");
	return t;
    }
}
