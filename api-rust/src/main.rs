#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use] extern crate rocket;

#[get("/")]
fn todos() -> &'static str {
   "HEllo rust!"
}

fn main() {
    rocket::ignite().mount("/", routes![todos]).launch();
    
}
