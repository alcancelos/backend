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

async function deleteNovedadById(id) {
    var query = "delete from novedad where id_novedad = ?";
    var rows = await pool.query(query, [id]);
    return rows;
}

async function getNovedadById(id) {
    var query = "select * from novedad where id_novedad = ?";
    var rows = await pool.query(query, [id]);
    return rows[0];
}

async function modificarNovedadById(obj, id) {
    try {
        var query = "update novedad set ? where id_novedad=?";
        var rows = await pool.query(query, [obj, id]);
        return rows;
    } catch (error) {
        throw error;
    }
}

module.exports = { getNovedades, insertNovedad, deleteNovedadById, getNovedadById, modificarNovedadById }