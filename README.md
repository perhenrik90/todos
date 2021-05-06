
# Todo application implemented in multiple languages

A project just for fun!

This project contains a simple todo application running in containers
where the API is implemented in different multiple languages (more to
come). The front-end react container can choose witch container to redirect the
API traffic to. PostgreSQL is running as the application database.

To start the demo install docker and docker-compose and write the following 
to start all the containers:

        docker-compose up


## API containers implemented

* python (GET, POST, init Database)
* nodejs (GET, POST)
* rust (GET, POST)
