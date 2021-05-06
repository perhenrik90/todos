#![feature(proc_macro_hygiene, decl_macro)]
#[macro_use] extern crate rocket;

use std::env;
use serde::Deserialize;
use serde::Serialize;
use rocket::response::content;
use rocket_contrib::json::Json;
use postgres::{Client, NoTls};

fn db_connection_string() -> String {
    /**
     * Create a database connection string based on env variables
     **/
    let hostname = env::var_os("POSTGRES_HOST").unwrap();
    let username = env::var_os("POSTGRES_USER").unwrap();
    let password = env::var_os("POSTGRES_PASSWORD").unwrap();

    return  format!("postgresql://{}:{}@{}/{}", username.to_str().unwrap(), password.to_str().unwrap(), hostname.to_str().unwrap(), username.to_str().unwrap());
}

#[derive(Serialize, Deserialize)]
struct Todo {
    id: i32,
    label: String,
    app: String,
    x_pos: i32,
    y_pos: i32,
}

#[get("/api_rust/todo")]
fn todos()  -> Json<Vec<Todo>> {
    /**
     * Return a list of todo items
     **/
    let mut todos = Vec::<Todo>::new();
    
    let mut c = Client::connect(&db_connection_string(), NoTls).unwrap();
    for _row in c.query("SELECT id, label, app, x_pos,y_pos, created FROM todo;", &[]).unwrap() {
	let label: &str = _row.get(1);
	let t = Todo{
	    id:_row.get(0),
	    label:_row.get(1),
	    app:_row.get(2),
	    x_pos:_row.get(3),
	    y_pos:_row.get(4),
	};
	todos.push(t)
    }
   return Json( todos );
}

fn main() {
    rocket::ignite().mount("/", routes![todos]).launch();
}
