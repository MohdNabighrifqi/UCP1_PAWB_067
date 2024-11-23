const config = require('../configs/database');
let mysql = require('mysql');
let pool = mysql.createPool(config);

pool.on('error', (err) => {
    console.error(err);
});

module.exports = {
    // Menampilkan data bibit
    getbibit(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query('SELECT * FROM bibit;', function (error, results) {
                if (error) throw error;
                
                // Periksa apakah hasil query ada data
                if (results.length > 0) {
                    res.render('bibit', {
                        url: 'http://localhost:5050/',
                        bibit: results // Kirim data bibit ke view
                    });
                } else {
                    res.render('bibit', {
                        url: 'http://localhost:5050/',
                        bibit: [] // Kirim array kosong jika tidak ada data
                    });
                }
            });
            connection.release();
        });
    },

    // Form untuk tambah bibit
    formbibit(req, res) {
        res.render("addbibit", {
            url: 'http://localhost:5050/',
        });
    },

    // Menyimpan data bibit
    savebibit(req, res) {
        let { nama, jenis, stok, deskripsi } = req.body;
        console.log(nama, jenis, stok, deskripsi);

        if (nama && stok) {
            pool.getConnection(function (err, connection) {
                if (err) throw err;
                connection.query(
                    `INSERT INTO bibit (nama, jenis, stok, deskripsi) VALUES (?, ?, ?, ?);`,
                    [nama, jenis, stok, deskripsi],
                    function (error, results) {
                        if (error) {
                            console.error(error);
                            res.send('Gagal menyimpan data');
                            return;
                        }
                        req.flash('color', 'success');
                        req.flash('status', 'Yes..');
                        req.flash('message', 'Data berhasil disimpan');
                        res.redirect('/bibit');
                    }
                );
                connection.release();
            });
        } else {
            res.send('Data tidak lengkap');
        }
    },

    // Form untuk edit bibit
    editbibit(req, res) {
        const { id } = req.params;
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query('SELECT * FROM bibit WHERE id = ?', [id], function (error, results) {
                if (error) throw error;
                if (results.length > 0) {
                    res.render('editbibit', {
                        url: 'http://localhost:5050/',
                        bibit: results[0]
                    });
                } else {
                    res.redirect('/bibit');
                }
            });
            connection.release();
        });
    },

    // Mengupdate data bibit
    updatebibit(req, res) {
        const { id } = req.params;
        const { nama, jenis, stok, deskripsi } = req.body;
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                'UPDATE bibit SET nama = ?, jenis = ?, stok = ?, deskripsi = ? WHERE id = ?',
                [nama, jenis, stok, deskripsi, id],
                function (error, results) {
                    if (error) throw error;
                    res.redirect('/bibit');
                }
            );
            connection.release();
        });
    },

    // Menghapus data bibit
    deletebibit(req, res) {
        const { id } = req.params;
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query('DELETE FROM bibit WHERE id = ?', [id], function (error, results) {
                if (error) throw error;
                res.redirect('/bibit');
            });
            connection.release();
        });
    },
};
