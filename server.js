var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('teste2.db');

/// CREATE function users ///
function insertUser(address, password) {
    //db.run("CREATE TABLE teste (rowid INTEGER PRIMARY KEY,address TEXT UNIQUE, password TEXT)");
    db.run("INSERT INTO teste (address, password) VALUES (?,?)", [address, password], (err, row) => {
        if (err) {
            console.log("Nome já existe no banco de dados");
        } else {
            console.log("Nome cadastrado com sucesso");
        };
    });
};

/// READ function users ///
function getUser(address, password) {

    db.get("SELECT password FROM teste WHERE address = (?) ", [address], (err, row) => {
        if (err) {
            console.log("Email não encontrado");
        } else {
            if (row.password === password) {
                console.log("Password correto");
            } else {
                console.log("Password Incorreto");
            }
        }
    });
};

/// UPDATE function users ///
function setUser(adrress, password) {
    db.serialize(function () {
        db.get("UPDATE teste SET password = (?) WHERE address = (?) ", [password, address], (err, row) => {
            if (err) {
                console.log("Falha na alteração");
            } else {
                console.log("Alterado com sucesso");
            }

        });
    });
};

getUser("alexfggfgrgrrefeffrgrgrfandre", "123456");


