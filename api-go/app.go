package main

import (
	"encoding/json"
	"net/http"
	"fmt"
	"os"
	"database/sql"
	_"github.com/lib/pq"
	"log"
)

type Todo struct{
	Label string `json:"label"`
	X_pos int `json:"x_pos"`
	Y_pos int `json:"y_pos"`	
}


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
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	
	db, err := sql.Open("postgres", psqlInfo);
	if err != nil {
		panic(err)
	}

	if r.Method == http.MethodGet{
	
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
		// print object string
		res += fmt.Sprintf(`{"id":"%d", "label":"%s", "app":"%s","x_pos":%d,"y_pos":%d}`, id, label, app, x_pos,y_pos)
	}
	
	db.Close()

	res += "]"

	fmt.Fprintf(w, res);
		
	}else if r.Method == http.MethodPost{
		if r.Body == nil {
			fmt.Fprintf(w, `{"status":"no body"}`);		
			return
		}
		
		var t Todo
		t.X_pos = 42
		t.Y_pos = 42
		err := json.NewDecoder(r.Body).Decode(&t)
		// try to parse, else throw error
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		fmt.Println(t)
		var sql = fmt.Sprintf(`INSERT INTO todo (label, app, x_pos, y_pos) VALUES ($1, $2, $3, $4)`)
		_, errr := db.Exec(sql, t.Label, "Go",t.X_pos,t.Y_pos)
		if errr != nil {
			panic(errr)
			return
		}
		fmt.Println("Go stored label: "+t.Label)
		fmt.Fprintf(w, `{"status":"sucess"}`);		
	}
}

func main(){
	fmt.Println("Starting Todo Go API")
	http.HandleFunc("/api_go/todo", todo)
	log.Fatal(http.ListenAndServe(":8080", nil))
}
