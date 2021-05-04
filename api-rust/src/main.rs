#![feature(proc_macro_hygiene, decl_macro)]
#[macro_use] extern crate rocket;

use rocket::response::content;


#[get("/")]
fn todos() -> content::Json<&'static str> {
   content::Json("[{\"label\":\"Hello Rust\", \"x_pos\":42, \"y_pos\":42}]")
}

fn main() {
    rocket::ignite().mount("/api_rust/", routes![todos]).launch();
    
}
