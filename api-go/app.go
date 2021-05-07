package main

import (
	"net/http"
	"fmt"
	"os"
	"database/sql"
	_"github.com/lib/pq"
)

func dbstring() (string){
	/**
	  Returns DB string
	  **/
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
		"password=%s dbname=%s sslmode=disable",
		os.Getenv("POSTGRES_HOST"), 5432, os.Getenv("POSTGRES_USER"), os.Getenv("POSTGRES_PASSWORD"), os.Getenv("POSTGRES_USER"))
	return psqlInfo;
}

func todo(w http.ResponseWriter, r *http.Request){
	var psqlInfo = dbstring();
	fmt.Println(psqlInfo);

	db, err := sql.Open("postgres", psqlInfo);
	if err != nil {
		panic(err)
	}

	rows, err := db.Query(`SELECT id, label, app, x_pos,y_pos, created FROM todo`)
	if err != nil {
		panic(err)
	}
	var res string = "["
	var first = true;
	
	for rows.Next() {
		var id int
		var label string
		var app string
		var x_pos int
		var y_pos int
		var date string
		
		err = rows.Scan(&id, &label, &app,&x_pos, &y_pos, &date)

		if(first){
			first=false
		}else{
			res += ","
		}
		
		res += fmt.Sprintf(`{"id":"%d", "label":"%s", "app":"%s","x_pos":%d,"y_pos":%d}`, id, label, app, x_pos,y_pos)
	}
	
	db.Close()

	res += "]"
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	fmt.Fprintf(w, res);
}

func main(){
	fmt.Println("Starting Todo Go API")
	http.HandleFunc("/api_go/todo", todo)
	http.ListenAndServe(":8080", nil)
}
