package com.example.apijava;


public class Todo{
    String label;
    int x_pos;
    int y_pos;
    
    public Todo(String label){
	this.label = label;
    }

    public String getLabel(){
	return label;
    }
}
