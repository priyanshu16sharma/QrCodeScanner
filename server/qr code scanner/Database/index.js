const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

//To establish connection with mysql database
let connection;
const establishConnection = async () => {
    try {

        connection = await mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            database: 'QRCodeScanHistory',
            password: 'pri@1209'
        })
        // console.log(connection);
        console.log("Connection Established...");
        module.exports.connection = connection;
    }
    catch (e) {
        console.log("error " + e);
    }
}

const addUser = async (userData) => {
    try {
        const [rows1, fields1] = await connection.query('SELECT * FROM users WHERE email = ?', [userData.email]);


        if (rows1.length > 0) {
            return { result: 0, data: "email already exists", };
        } else {
            const [rows2, fields2] = await connection.query('Insert into users (username, email, password) values (?, ?, ?)', [userData.name, userData.email, userData.password]);
            //console.log(rows2.insertId);
            const table = "table" + rows2.insertId;
            const [rows3, fields3] = await connection.query('CREATE TABLE ?? (id INT NOT NULL AUTO_INCREMENT, content VARCHAR(500), scanTime TIMESTAMP, thumbnail VARCHAR(255), PRIMARY KEY (id))', [table]);


            return { result: 1, data: { ...userData, tableName: table } };
        }
    } catch (e) {
        console.log("error in AddUser" + e);
    }
}

const checkUser = async (userData) => {
    try {
        const [rows1, fields1] = await connection.query('SELECT * FROM users WHERE email = ?', [userData.email]);
        if (rows1.length == 0) {
            return { result: 0, data: "No such user exists" };
        } else {
            const password = rows1[0].password.toString('utf8');
            ///console.log(data.password);

            const table = "table" + rows1[0].id;

            let res = 0;
            const result = await bcrypt.compare(userData.password, password);

            if (result == true) {
                return { result: 1, data: { ...rows1[0], tableName: table } };
            }
            //console.log(result);
            return { result: 0 };
        }

        return { data: "success" }
    }
    catch (e) {
        console.log("Error in checkUser " + e);
    }
}

const insertQr = async (req, body) => {
    try {
        console.log(body);
        const sql = "INSERT INTO  ?? ( content, scanTime, thumbnail) VALUES (?, NOW(), ?)";
        console.log("Been Called...");
        const values = [body.tableName, body.content, body.thumbnail];

        const [rows, fields] = await connection.query(sql, values);
        console.log(rows.insertId);
        return { insertId: rows.insertId };
    }
    catch (e) {
        console.log("Error in insertQr " + e);
    }
}

const deleteQrData = async (req, dataId) => {
    try {

        const sql = "delete from  ?? where id = ?";
        // console.log(req.session.user.data.tableName);
        const tableName = req.query.tableName;
        const values = [tableName, dataId];

        const [rows, fields] = await connection.query(sql, values);
        return { data: "Success" };

    } catch (e) {
        console.log("Error in deleteQrData " + e);
    }
}

const getQrHistory = async (req, res) => {
    try {
        const sql = "Select * from  ??";
        console.log(req.session.data);
        const tableName = req.query.tableName;
        const values = [tableName];

        const [rows, fields] = await connection.query(sql, values);
        return { data: rows };

    }
    catch (e) {
        console.log("Error in getQrHistory " + e);
    }
}


module.exports = { establishConnection, addUser, checkUser, insertQr, deleteQrData, getQrHistory };