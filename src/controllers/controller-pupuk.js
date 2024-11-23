const config = require('../configs/database');

let mysql = require('mysql');
let pool = mysql.createPool(config);

pool.on('error', (err) => {
    console.error(err);
});

module.exports = {
    getpupuk(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query('SELECT * FROM pupuk;', function (error, results) {
                if (error) throw error;

                res.render('pupuk', {
                    url: 'http://localhost:5050/',
                    pupuks: results.length > 0 ? results : [] // Mengirim data pupuk atau array kosong
                });
            });
            connection.release();
        });
    },
    formpupuk(req, res) {
        res.render("addpupuk", {
            url: 'http://localhost:5050/',
        });
    },
    savepupuk(req, res) {
        const { nama, tipe, stok, deskripsi } = req.body;
        if (nama && stok) {
            pool.getConnection(function (err, connection) {
                if (err) throw err;
                connection.query(
                    `INSERT INTO pupuk (nama, tipe, stok, deskripsi) VALUES (?, ?, ?, ?);`,
                    [nama, tipe || null, stok, deskripsi || null],
                    function (error, results) {
                        if (error) {
                            console.error(error);
                            res.send('Gagal menyimpan data');
                            return;
                        }
                        req.flash('color', 'success');
                        req.flash('status', 'Berhasil!');
                        req.flash('message', 'Data pupuk berhasil disimpan');
                        res.redirect('/pupuk');
                    }
                );
                connection.release();
            });
        } else {
            res.send('Nama dan stok harus diisi!');
        }
    },
    editpupuk(req, res) {
        const { id } = req.params;
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query('SELECT * FROM pupuk WHERE id = ?', [id], function (error, results) {
                if (error) throw error;
                if (results.length > 0) {
                    res.render('editpupuk', {
                        url: 'http://localhost:5050/',
                        pupuk: results[0]
                    });
                } else {
                    res.redirect('/pupuk');
                }
            });
            connection.release();
        });
    },
    updatepupuk(req, res) {
        const { id } = req.params;
        const { nama, tipe, stok, deskripsi } = req.body;
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                'UPDATE pupuk SET nama = ?, tipe = ?, stok = ?, deskripsi = ? WHERE id = ?',
                [nama, tipe || null, stok, deskripsi || null, id],
                function (error, results) {
                    if (error) throw error;
                    res.redirect('/pupuk');
                }
            );
            connection.release();
        });
    },
    deletepupuk(req, res) {
        const { id } = req.params;
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query('DELETE FROM pupuk WHERE id = ?', [id], function (error, results) {
                if (error) throw error;
                res.redirect('/pupuk');
            });
            connection.release();
        });
    },
};
