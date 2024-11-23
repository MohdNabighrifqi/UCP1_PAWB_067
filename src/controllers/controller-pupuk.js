const config = require('../configs/database');

let mysql      = require('mysql');
let pool       = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports ={
    getpupuk(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query('SELECT * FROM pupuk;', function (error, results) {
                if (error) throw error;
                
                // Check if results contains any data
                if (results.length > 0) {
                    res.render('pupuk', {
                        url: 'http://localhost:5050/',
                        pupuks: results // Pass the pupuks data to the view
                    });
                } else {
                    res.render('pupuk', {
                        url: 'http://localhost:5050/',
                        pupuks: [] // Pass an empty array if no data
                    });
                }
            });
            connection.release();
        });
    },
    formpupuk(req,res){
        res.render("addpupuk",{
            url : 'http://localhost:5050/',
        });
    },
    savepupuk(req, res) {
        let { name, email, phone, address } = req.body;
        console.log(name, email, phone, address); 
        if (name && email && phone && address) {
            pool.getConnection(function (err, connection) {
                if (err) throw err;
                connection.query(
                    `INSERT INTO pupuks (name, email, phone, address) VALUES (?, ?, ?, ?);`,
                    [name, email, phone, address], 
                    function (error, results) {
                        if (error) {
                            console.error(error);
                            res.send('Gagal menyimpan data');
                            return;
                        }
                        req.flash('color', 'success');
                        req.flash('status', 'Yes..');
                        req.flash('message', 'Data berhasil disimpan');
                        res.redirect('/pupuk');
                    }
                );
                connection.release();
            });
        } else {
            res.send('Data tidak lengkap');
        }
    },    
    editpupuk(req, res) {
        const { id } = req.params;
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query('SELECT * FROM pupuks WHERE id = ?', [id], function (error, results) {
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
        const { name, email, phone, address } = req.body;
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                'UPDATE pupuks SET name = ?, email = ?, phone = ?, address = ? WHERE id = ?',
                [name, email, phone, address, id],
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
            connection.query('DELETE FROM pupuks WHERE id = ?', [id], function (error, results) {
                if (error) throw error;
                res.redirect('/pupuk');
            });
            connection.release();
        });
    },
};