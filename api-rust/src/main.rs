#![feature(proc_macro_hygiene, decl_macro)]
#[macro_use] extern crate rocket;

use std::env;
use serde::Deserialize;
use serde::Serialize;

use rocket::response::content;
use rocket_contrib::json::Json;
use postgres::{Client, NoTls};

fn db_connection_string() -> String {
    let hostname = env::var_os("POSTGRES_HOST").unwrap();
    let username = env::var_os("POSTGRES_USER").unwrap();
    let password = env::var_os("POSTGRES_PASSWORD").unwrap();

    return  format!("postgresql://{}:{}@{}/{}", username.to_str().unwrap(), password.to_str().unwrap(), hostname.to_str().unwrap(), username.to_str().unwrap());
    // println!("Connection {}", cstring);
    // Client::connect(&cstring, NoTls);
}

#[derive(Serialize, Deserialize)]
struct Todo {
    label: String,
    x_pos: i32,
    y_pos: i32
}

#[get("/api_rust/todo")]
fn todos()  -> Json<String> {
    //let mut todos = Vec::<Todo>::new();
    let mut output = "[".to_string();
    
    let mut c = Client::connect(&db_connection_string(), NoTls).unwrap();
    for _row in c.query("SELECT id, label, app, x_pos,y_pos, created FROM todo;", &[]).unwrap() {
	let label: &str = _row.get(1);

	let element = "{'label':'test'}";
	output.push_str(element);
	println!("Label is {}", label);
    }

    let tt = Todo {
	label: "PH".to_string(),
	x_pos:2,
	y_pos:2
    };
    //todos.push(tt);
    output.push_str(&"]");
   return Json( output );
}

fn main() {
    rocket::ignite().mount("/", routes![todos]).launch();
    
}
