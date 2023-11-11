const { addUser, checkUser } = require('../Database/index');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');

const signUp = async (req, res) => {
    try {
        const userData = req.body;
        console.log(userData.password);

        const hash = await bcrypt.hash(userData.password, 10);
        userData.password = hash;
        const finaldata = await addUser(userData);
        console.log(finaldata);
        req.session.user = finaldata;
        return res.status(200).send(finaldata);

    }
    catch (e) {
        console.log("error " + e);
    }
}


const signIn = async (req, res) => {
    try {
        const userData = req.body;
        const data = await checkUser(userData);
        req.session.user = data;
        console.log(req.session.user);


        return res.status(200).send(req.session.user);

    }
    catch (e) {
        console.log("error " + e);
    }
}


module.exports = { signUp, signIn };