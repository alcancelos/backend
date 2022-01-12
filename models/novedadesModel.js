const router = require('../routes/admin/novedades');
var pool = require('./bd');

async function getNovedades() {
    var query = "select * from novedad order by id_novedad desc";
    var rows = await pool.query(query);
    return rows;
}

async function insertNovedad(obj) {
    try {
        var query = "insert into novedad set ?";
        var rows = await pool.query(query, [obj]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


module.exports = { getNovedades, insertNovedad }