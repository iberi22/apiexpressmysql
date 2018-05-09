var mysql = require('mysql'),
    //creamos la conexion a nuestra base de datos con los datos de acceso de cada uno
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'erp'
    });

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
//creamos un objeto para ir almacenando todo lo que necesitemos
var acountModel = {};
//obtenemos todos los usuarios
acountModel.getAcount = function(callback) {
    if (connection) {
        connection.query('SELECT * FROM asientos_colgaap ORDER BY id', function(error, rows) {
            if (error) {
                throw error;
            } else {
                callback(null, rows);
            }
        });
    }
}
//obtenemos un usuario por su id
acountModel.getUser = function(id, callback) {
    if (connection) {
        var sql = 'SELECT * FROM asientos_colgaap WHERE nit_tercero = ' + connection.escape(id);
        connection.query(sql, function(error, row) {
            if (error) {
                throw error;
            } else {
                callback(null, row);
            }
        });
    }
}
//añadir un nuevo usuario
acountModel.insertUser = function(userData, callback) {
    if (connection) {
        connection.query('INSERT INTO users SET ?', userData, function(error, result) {
            if (error) {
                throw error;
            } else {
                //devolvemos la última id insertada
                callback(null, {
                    "insertId": result.insertId
                });
            }
        });
    }
}
//actualizar un usuario
acountModel.updateUser = function(userData, callback) {
    //console.log(userData); return;
    if (connection) {
        var sql = 'UPDATE users SET username = ' + connection.escape(userData.username) + ',' +
            'email = ' + connection.escape(userData.email) +
            'WHERE id = ' + userData.id;
        connection.query(sql, function(error, result) {
            if (error) {
                throw error;
            } else {
                callback(null, {
                    "msg": "success"
                });
            }
        });
    }
}
//eliminar un usuario pasando la id a eliminar
acountModel.deleteUser = function(id, callback) {
    if (connection) {
        var sqlExists = 'SELECT * FROM users WHERE id = ' + connection.escape(id);
        connection.query(sqlExists, function(err, row) {
            //si existe la id del usuario a eliminar
            if (row) {
                var sql = 'DELETE FROM users WHERE id = ' + connection.escape(id);
                connection.query(sql, function(error, result) {
                    if (error) {
                        throw error;
                    } else {
                        callback(null, {
                            "msg": "deleted"
                        });
                    }
                });
            } else {
                callback(null, {
                    "msg": "notExist"
                });
            }
        });
    }
}
//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = acountModel;