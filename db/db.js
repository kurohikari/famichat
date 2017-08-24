var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('test');


db.serialize(function(){
    //create table User
    db.run("CREATE TABLE IF NOT EXISTS User(id TEXT PRIMARY KEY NOT NULL,password TEXT NOT NULL, name TEXT NOT NULL, UNIQUE(id,password,name))");
    //create table Sessions
    db.run("CREATE TABLE IF NOT EXISTS Sessions(token TEXT PRIMARY KEY NOT NULL, id TEXT NOT NULL, FOREIGN KEY (id) REFERENCES User(id))");

    //saveUser(id,password,name)
    db.run("INSERT OR REPLACE INTO user(id,password,name) VALUES('656893','xixi9311','AliceXC')");
});

db.close;