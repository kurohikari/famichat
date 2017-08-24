var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('test');


db.serialize(function(){

    // 1. CREATE TABLE, SELECT, INSERT, DELETE, UPDATE, DROP

    db.run("CREATE TABLE IF NOT EXISTS TEST(ID INTEGER PRIMARY KEY NOT NULL,NAME TEXT NOT NULL, UNIQUE(ID,NAME))");
    // insert statements
    //db.run("insert into test values (260638091, 'Yihan Xing')");

    //select all
    db.each('select * from test', function (error, row) {
        if(error) throw error;
        console.log(row.ID + ": " + row.NAME);
    });

    //update id 
    //db.run("UPDATE test SET ID = 656893 WHERE NAME = 'Yihan Xing'");

    //delete a.g.
    //db.run("DELETE FROM test WHERE NAME = 'Arthur Geneau'");

    //insert OR ignore (avoid duplicates)  !!UNIQUE!! in create table
    db.run("INSERT OR IGNORE INTO test VALUES (123564589, 'Arthur')");
    db.run("INSERT OR IGNORE INTO test VALUES (514655935, 'Geneau')");
    db.run("INSERT OR IGNORE INTO test VALUES (8795, 'COCO')");
    
    // 2. Aggregate functions (AVG,SUM)
    // update if exists else insert sql
    db.each("SELECT AVG(ID) FROM test", function (error,row){
        if(error) throw error;
        console.log("average id is "+ row['AVG(ID)']);
    });

    db.each("SELECT SUM(ID) FROM test", function (error,row){
        if(error) throw error;
        console.log("sum id is "+ row['SUM(ID)']);
    });

    // 3. complex expressions
    db.each("SELECT * FROM test WHERE id < (SELECT AVG(ID) FROM test)",function(error, row){
        if(error) throw error;
        console.log(row.NAME + ": "+ row.ID);
    });
});

db.close();