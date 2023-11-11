const { insertQr, deleteQrData, getQrHistory } = require('../Database/index');

const addHistory = async (req, res) => {
    try {
        const body = req.body;

        const data = await insertQr(req, body);
        console.log(req.session.user)

        res.status(200).send(data);
    } catch (e) {
        console.log("Error " + e);
    }
}

const deleteHistory = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const data = await deleteQrData(req, id);
        console.log(req.session.user)
        res.status(200).send(data);
    }
    catch (e) {
        console.log("Error " + e);
    }
}

const qrHistory = async (req, res) => {
    try {
        console.log(req.session.user)
        const data = await getQrHistory(req, res);
        console.log(req.session.user)

        res.status(200).send(data.data);
    }
    catch (e) {

    }
}

module.exports = { addHistory, deleteHistory, qrHistory };