var sqlite3 = require('sqlite3').verbose();
require('dotenv').config();
var db = new sqlite3.Database('luiz.db');
//db.run("CREATE TABLE bruna (rowid INTEGER PRIMARY KEY,address TEXT UNIQUE, password TEXT)");
/// CREATE function users ///

async function Register(address, password) {
    console.log("Start Async Function :  ");
    var a = 
        db.run("INSERT INTO bruna (address, password) VALUES (?,?)", [address, password], (err, row) => {
            if (err) {
                return console.error(err.message);
            }
            return console.error("Entry displayed successfully");
        });

        return await console.log(a);
}



/// READ function users ///
function getUser(address, password, _callback) {
    db.get("SELECT password FROM bruna WHERE address = (?)", [address], (err, row) => { 
        if (err) {
              console.log(err)
            _callback('Adress not found');
        }else {
            if (row == undefined) {
                _callback('User does not exist');
            } 
            else {
                if(row.password === password){
                    _callback('UHU, Password correct');
                }else{
                    _callback('ops, Password incorrect');
                }
            }
        }
    });
};

/// UPDATE function users ///
function setUser(adrress, password) {
    db.serialize(function () {
        db.get("UPDATE bruna SET password = (?) WHERE address = (?) ", [password, address], (err, row) => {
            if (err) {
                console.log("Falha na alteração");
            } else {
                console.log("Alterado com sucesso");
            }

        });
    });
};

module.exports = {
    Register,
    getUser,
    setUser
};
