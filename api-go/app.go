package main

import (
	"net/http"
	"fmt"
)

func todo(w http.ResponseWriter, r *http.Request){
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	var message = "{\"label\":\"Hello world\"}"
	fmt.Fprintf(w, message);
}

func main(){
	fmt.Println("Starting Todo Go API")

	http.HandleFunc("/api_go/todo", todo)
	http.ListenAndServe(":8000", nil)
}
