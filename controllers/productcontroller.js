const mysql = require("mysql");
const alert = require("alert");
const schedule = require("node-schedule");

const db = mysql.createPool({
  host: process.env.DATABASE_HOST,
  database: process.env.DB_NAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
});

exports.view = (req, res) => {
  db.getConnection((err, connection) => {
    if (err) throw err;
    console.log("Edit Database Connected");
    connection.query("select * from products", (err, rows) => {
      connection.release();
      if (!err) {
        res.render("adview.hbs", { rows });

        console.log(rows);
      } else {
        console.log("errr in listing data" + err);
      }
    });
  });
};

exports.userview = (req, res) => {
  db.getConnection((err, connection) => {
    if (err) throw err; // not connected
    console.log("Connected!");

    connection.query("SELECT * FROM products", (err, rows) => {
      // Once done, release connection
      connection.release();
      if (!err) {
        res.render("blog", { rows });
      }
    });
  });
};

exports.addproduct = (req, res) => {
  res.render("addproduct");
};
exports.save = (req, res) => {
  let sampleFile;
  let uploadPath;
  const { name, about, des } = req.body;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  // name of the input is sampleFile
  sampleFile = req.files.sampleFile;
  uploadPath = "." + "/upload/" + sampleFile.name;

  console.log(sampleFile);

  // Use mv() to place file on the server
  sampleFile.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);

    db.getConnection((err, connection) => {
      if (err) throw err;

      connection.query(
        "insert into products set NAME=?, About=?, DES=?, IMAGE=?",
        [name, about, des, [sampleFile.name]],
        (err, rows) => {
          connection.release();
          if (!err) {
            res.render("addproduct", { msg: "Product added Successfully" });
          } else {
            console.log("errr in listing data" + err);
          }
        }
      );
    });

    // res.send('File uploaded!');
  });
};

exports.editproduct = (req, res) => {
  db.getConnection((err, connection) => {
    if (err) throw err;

    //get ID
    let id = req.params.id;

    connection.query("select * from products where id=?", [id], (err, rows) => {
      connection.release();
      if (!err) {
        res.render("editproduct", { rows });
        console.log(rows);
      } else {
        console.log("errr in listing data" + err);
      }
    });
  });
};

exports.edit = (req, res) => {
  let sampleFile;
  let uploadPath;
  const { name, about, des } = req.body;
  let id = req.params.id;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  // name of the input is sampleFile
  sampleFile = req.files.sampleFile;
  uploadPath = "." + "/upload/" + sampleFile.name;

  console.log(sampleFile);

  // Use mv() to place file on the server
  sampleFile.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);

    db.getConnection((err, connection) => {
      if (err) throw err;

      connection.query(
        "update products set NAME=?, About=?, DES=?, IMAGE=? where ID = ?",
        [name, about, des, [sampleFile.name], id],
        (err, rows) => {
          if (!err) {
            res.render("editproduct");
            res.redirect("/adview");
            alert("Edited Successfully");
          } else {
            console.log("errr in listing data" + err);
          }
        }
      );
    });

    // res.send('File uploaded!');
  });
};

exports.delete = (req, res) => {
  db.getConnection((err, connection) => {
    if (err) throw err;

    let id = req.params.id;

    connection.query("delete from products where id=?", [id], (err, rows) => {
      connection.release();
      if (!err) {
        res.redirect("/adview");
      } else {
        console.log(err);
      }
    });
  });
};

//offers from admin to user view

exports.offer = (req, res) => {
  let sampleFile;
  let samplefile;
  let uploadPath;
  const { icecream, quantity, scoup, cuantity, price } = req.body;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  // name of the input is sampleFile
  sampleFile = req.files.sampleFile;
  samplefile = req.files.samplefile;
  uploadPath = "." + "/upload/" + sampleFile.name;
  uploadPath = "." + "/upload/" + samplefile.name;
  console.log(sampleFile);

  // Use mv() to place file on the server
  samplefile,
    sampleFile.mv(uploadPath, function (err) {
      if (err) return res.status(500).send(err);

      db.getConnection((err, connection) => {
        if (err) throw err;

        connection.query(
          "insert into offers set ICECREAM=?, QUANTITY=?, IMAGE=?, SCOUP=?, CUANTITY=?, PHOTO=?, price=?",
          [
            icecream,
            quantity,
            [sampleFile.name],
            scoup,
            cuantity,
            [samplefile.name],
            price,
          ],
          (err, rows) => {
            if (!err) {
              res.render("addoffer", { msg: "Offer added Successfully" });
            } else {
              console.log("errr in listing data" + err);
            }
            schedule.scheduleJob(Date.now() + 20000, () => {
              //schedule.scheduleJob(Date.now() + 30 * 60 * 60 * 1000, () => {
              const deleteSql = "DELETE FROM offers WHERE id = ?";
              connection.query(deleteSql, rows.insertId, (err, rows) => {
                if (err) throw err;
                console.log("Data deleted from the database.");
              });
            });
            connection.release();
          }
        );
      });

      // res.send('File uploaded!');
    });
};

exports.editoffer = (req, res) => {
  db.getConnection((err, connection) => {
    if (err) throw err;

    //get ID
    let id = req.params.id;

    connection.query("select * from offers where id=?", [id], (err, rows) => {
      connection.release();
      if (!err) {
        res.render("editoffer", { rows });
        console.log(rows);
      } else {
        console.log("errr in listing data" + err);
      }
    });
  });
};

exports.edito = (req, res) => {
  let sampleFile;
  let samplefile;
  let uploadPath;
  const { icecream, quantity, scoup, cuantity, price } = req.body;
  let id = req.params.id;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  // name of the input is sampleFile
  sampleFile = req.files.sampleFile;
  samplefile = req.files.samplefile;
  uploadPath = "." + "/upload/" + sampleFile.name;
  uploadPath = "." + "/upload/" + samplefile.name;

  // Use mv() to place file on the server
  samplefile,
    sampleFile.mv(uploadPath, function (err) {
      if (err) return res.status(500).send(err);

      db.getConnection((err, connection) => {
        if (err) throw err;

        connection.query(
          "update offers set ICECREAM=?, QUANTITY=?, IMAGE=?, SCOUP=?, CUANTITY=?, PHOTO=?, price=? where ID = ?",
          [
            icecream,
            quantity,
            [sampleFile.name],
            scoup,
            cuantity,
            [samplefile.name],
            price,
            id,
          ],
          (err, rows) => {
            // if (!err){
            //     res.render("editoffer")
            //     res.redirect("/offer")
            //     alert("Edited Successfully")

            // }else{
            //     console.log("errr in listing data"+err);
            // }
            if (!err) {
              alert("Changes updated Successfully");
            } else {
              console.log("errr in listing data" + err);
            }
            //schedule.scheduleJob(Date.now() + 20000, () => {
            schedule.scheduleJob(Date.now() + 30 * 60 * 60 * 1000, () => {
              const deleteSql = "DELETE FROM offers WHERE id = ?";
              connection.query(deleteSql, rows.insertId, (err, rows) => {
                if (err) throw err;
                console.log("Data deleted from the database.");
              });
            });
            connection.release();
          }
        );
      });

      // res.send('File uploaded!');
    });
};

exports.deleteoffer = (req, res) => {
  db.getConnection((err, connection) => {
    if (err) throw err;

    let id = req.params.id;

    connection.query("delete from offers where id=?", [id], (err, rows) => {
      connection.release();
      if (!err) {
        res.redirect("/offer");
      } else {
        console.log(err);
      }
    });
  });
};

exports.offerview = (req, res) => {
  db.getConnection((err, connection) => {
    if (err) throw err;
    console.log("Edit Database Connected");
    connection.query("select * from offers", (err, rows) => {
      connection.release();
      if (!err) {
        res.render("offer.hbs", { rows });

        console.log(rows);
      } else {
        console.log("errr in listing data" + err);
      }
    });
  });
};
exports.offeruser = (req, res) => {
  db.getConnection((err, connection) => {
    if (err) throw err;
    console.log("Edit Database Connected");
    connection.query("select * from offers", (err, rows) => {
      connection.release();
      if (!err) {
        res.render("offeruser.hbs", { rows });
      } else {
        console.log("errr in listing data" + err);
      }
    });
  });
};

exports.proavview = (req, res) => {
  db.getConnection((err, connection) => {
    if (err) throw err;
    console.log("Edit Database Connected");
    connection.query("select * from pro", (err, rows) => {
      connection.release();
      if (!err) {
        res.render("avpro.hbs", { rows });

        console.log(rows);
      } else {
        console.log("errr in listing data" + err);
      }
    });
  });
};

exports.pro = (req, res) => {
  let sampleFile;

  let uploadPath;
  const { name } = req.body;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  // name of the input is sampleFile
  sampleFile = req.files.sampleFile;

  uploadPath = "." + "/upload/" + sampleFile.name;

  console.log(sampleFile);

  // Use mv() to place file on the server
  sampleFile.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);

    db.getConnection((err, connection) => {
      if (err) throw err;

      connection.query(
        "insert into pro set NAME=?,  IMAGE=?",
        [name, [sampleFile.name]],
        (err, rows) => {
          if (!err) {
            res.render("addpro", { msg: "pro added Successfully" });
          } else {
            console.log("errr in listing data" + err);
          }

          connection.release();
        }
      );
    });

    // res.send('File uploaded!');
  });
};

exports.editpro = (req, res) => {
  db.getConnection((err, connection) => {
    if (err) throw err;

    //get ID
    let id = req.params.id;

    connection.query("select * from pro where id=?", [id], (err, rows) => {
      connection.release();
      if (!err) {
        res.render("editpro", { rows });
        console.log(rows);
      } else {
        console.log("errr in listing data" + err);
      }
    });
  });
};

exports.proo = (req, res) => {
  let sampleFile;

  let uploadPath;
  const { name } = req.body;
  let id = req.params.id;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  // name of the input is sampleFile
  sampleFile = req.files.sampleFile;

  uploadPath = "." + "/upload/" + sampleFile.name;

  // Use mv() to place file on the server
  sampleFile.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);

    db.getConnection((err, connection) => {
      if (err) throw err;

      connection.query(
        "update pro set NAME=?, IMAGE=?  where ID=?",
        [name, [sampleFile.name], id],
        (err, rows) => {
          if (!err) {
            res.render("editpro");
            res.redirect("/avpro");
            alert("Edited Successfully");
          } else {
            console.log("errr in listing data" + err);
          }
        }
      );
    });

    // res.send('File uploaded!');
  });
};

exports.deletepro = (req, res) => {
  db.getConnection((err, connection) => {
    if (err) throw err;

    let id = req.params.id;

    connection.query("delete from pro where id=?", [id], (err, rows) => {
      connection.release();
      if (!err) {
        res.redirect("/avpro");
      } else {
        console.log(err);
      }
    });
  });
};

exports.prouserview = (req, res) => {
  db.getConnection((err, connection) => {
    if (err) throw err;
    console.log("Edit Database Connected");
    connection.query("select * from pro", (err, rows) => {
      connection.release();
      if (!err) {
        res.render("product.hbs", { rows });
      } else {
        console.log("errr in listing data" + err);
      }
    });
  });
};
