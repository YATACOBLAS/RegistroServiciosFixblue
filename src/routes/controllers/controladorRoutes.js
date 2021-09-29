const Controller = {};
//cifrado
const bcrypt = require('bcryptjs');
//correo
var nodemailer = require('nodemailer');

//const mailGun=require('nodemailer-mailgun-transport');
/*
const auth = {
    auth: {
        api_key: '2f2679f5aee5ae51dda44f0a613b23db-9b1bf5d3-77c1ebdf',
        domain: 'sandbox4f69df571f114f928bf833af726ba200.mailgun.org'
    }
};
*/
//toke para autenticacion-
const jwt = require('jsonwebtoken');
///llamando a vue para usar SERVER SIDE RENDERING nextjs
const Vue = require('vue');

const renderer = require('vue-server-renderer').createRenderer();


const context = {
    title: 'vue ssr',
    metas: `dasfdsfds`
};

Controller.Usuario = (req, res) => {
    res.json(req.usuario)
}

Controller.LogueoUsuario = (req, res) => {
    const email = req.body.usuario;
    const clave = req.body.clave;
    console.log(req.body);
    req.getConnection((err, conn) => {
        conn.query('select * from USUARIO  where email = ?', [email], (err, resultado) => {
            if (err) {
                res.json(err);
            } else {

                if (resultado.length > 0) {
                    let usuario = resultado[0];
                    if (bcrypt.compareSync(clave, usuario.clave)) {
                        console.log('logueo correcto');

                        // Generar Token
                        let token = jwt.sign({
                            data: usuario
                        }, 'secret', { expiresIn: 60 * 60 * 24 * 30 }) // Expira en 30 días

                        res.json({
                            usuario: {
                                idusuario: usuario.idusuario,
                                nombre: usuario.nombre,
                                email: usuario.email
                            },
                            mensaje: '',
                            token: token
                        })


                    } else {
                        res.json({ mensaje: 'Clave Incorrecta' });
                    }

                } else {

                    res.json({ mensaje: 'Datos Incorrectos' });
                }

            }
        });
    });
};

Controller.RegistrarUsuario = (req, res) => {
    //Datos del Usuario


const usuario = req.body.usuario;
    const email = req.body.email;
    const new_clave = req.body.clave;

    //  let salt = bcrypt.genSaltSync(10);
    // const new_clave = bcrypt.hashSync(clave, salt)
  
    req.getConnection((err, conn) => {
        conn.query(' CALL PROC_REGISTRO_USUARIO(?,?,?)', [usuario, email, new_clave], (err, resultado) => {
            //componente Vue
          
            const app = new Vue({
                data : {
                    usuario:usuario,
                    email:email
                },
                template: `<div class="card" >
                <div class="card-header">
               <h2 class="text-success"> El Usuario ah sido Registrado</h2>
                </div>
                <div class="card-body">
                    
                    <h3>Usuario:{{email}}</h3>
                    <h3>Email:{{usuario}}</h3>
                    <h3>Contraseña:***...**</h3>
              
                </div>
            </div>`
            });
            
           

            if (err) {

                renderer.renderToString(app, (err, html) => {
           
                    if (err) {
                       res.end(`<html>
                       <head>
                         <title>Autorizacion</title>
                         <!-- Bootstrap core CSS -->
                       <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/css/bootstrap.min.css" rel="stylesheet">
                       <!-- Material Design Bootstrap -->
                    </head>
                       <body>
                           <div class="card" >
                               <div class="card-header">
                               <h2 class="text-danger">error en la plantilla</h2>
                               </div>
                           </div>
                       </body>
                     </html>`)
                     
                    }
                    res.end(`<html>
                    <head>
                      <title>Autorizacion</title>
                      <!-- Bootstrap core CSS -->
                    <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/css/bootstrap.min.css" rel="stylesheet">
                    <!-- Material Design Bootstrap -->
                 </head>
                    <body>
                        <div class="card" >
                            <div class="card-header">
                            <h2 class="text-danger">YA EXISTE </h2>
                            </div>
                        </div>
                    </body>
                  </html>`)
                })
               
            } else {
                // res.json(resultado);

                renderer.renderToString(app, (err, html) => {
                    console.log('err')
                    console.log(err)
                    console.log(html)
                    
                    if (err) {
                        res.status(500).end('Internal Server Error Yess')
                        return;
                    }
                    res.end(`<html>
                    <head>
                      <title>Autorizacion</title>
                      <!-- Bootstrap core CSS -->
                    <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/css/bootstrap.min.css" rel="stylesheet">
                    <!-- Material Design Bootstrap -->
                 </head>
                 <style> 
                 html,body{
                    background-color: #000d21;
                    color:white;
                }
                 .card  {
                    background-color: #001331;
                    border-bottom: 5px solid #0074fc;
                  }
                  .card-body{
                    background-color: #001331;
                  }

                 </style>
                    <body>
                        <div class="container-fluid justify-content-center  text-center my-4">
                        ${html}
                        </div>
                    </body>
                  </html>`)
                })
            }
        });
    });
};
Controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('select * from MOVIMIENTO', (err, resultado) => {
            if (err) { res.json(err); }
            res.json(resultado);
        });
    });
};
Controller.mostrarDetalle = (req, res) => {
    const id = req.query.iddetalle;
    req.getConnection((err, conn) => {
        conn.query('call  SPU_LISTAR_DETALLE_MOVIMIENTO_IDMOVIMIENTO(?)', [id], (err, resultado) => {
            if (err) {
                res.json(err);
            } else {
                res.json(resultado);
            }
        });
    });
};
Controller.envioEmail = (req, res) => {

const email=req.body.email;

    req.getConnection((err, conn) => {
        conn.query('select * from USUARIO where email=?', [email],(err, resultado) => {     
            if (err) { res.json(err); }
                    if(resultado.length>0){
                        res.json({message: 700})
                        //sendEmail(req, res);
                    }else{
                        sendEmail(req, res);
             }
        });
    });
};
Controller.dashboard = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('select Descripcion,total from MOVIMIENTO', (err, resultado) => {
            if (err) { res.json(err); }
            res.json(resultado);
        });
    });
};
//Listar o Mostrar Movimiento y Detalle Movimiento
Controller.listar = (req, res) => {
    console.log('hola man!')
    var desde = req.query.desde;
    var hasta = req.query.hasta;
    var Descripcion = req.query.descripcion;
    var estado = req.query.estado;
    console.log(`${'hola mano ' - desde - hasta - Descripcion - estado}`)
    req.getConnection((err, conn) => {
        conn.query('call SPU_LISTAR_MOVIMIENTO_DESDE_HASTA_DESCRIPCION(?,?,?,?)', [desde, hasta, Descripcion, estado], (err, resultado) => {
            if (err) {
                console.log(err);
            } else {
                res.json(resultado);
            }
        });
    });
};
// Cambiar Estado de un Movimiento En conjunto
Controller.cambiarEstadoMov = (req, res) => {

    var id = req.body.id;
    var estado = '0';

    req.getConnection((err, conn) => {
        conn.query('call PROC_CAMBIAR_ESTADO_MOVIMIENTO(?,?)', [id, estado], (error, resultado) => {
            if (err) {
                console.log(error);
            }
            else {
                res.send(resultado);
            }
        });
    });


};
// Cambiar Estado de un Detalle Movimiento 
Controller.CambiarEstadoMovDet = (req, res) => {

    var id = req.body.id;
    var estado = '0';
    console.log(id);
    req.getConnection((err, conn) => {
        conn.query('call PROC_CAMBIAR_ESTADO_DETALLE_MOVIMIENTO(?,?)', [id, estado], (error, resultado) => {
            if (err) {
                console.log(error);
            }
            else {
                res.send(resultado);

            }

        });
    });


};
//Registrar movimiento y Detalle Movimiento
function InsertarDetalleMovimiento(Iteracion, IdMovimiento, Cuerpo, Peticion, Respuesta, Fila) {
    Peticion.getConnection(function (error, tempCont) {
        if (!!error) {
            //tempCont.release();
            console.log(error);
        }
        else {
            if (Cuerpo.detmovimiento[Iteracion].Movimiento == 'Venta') {
                tipomovimiento = 'EV';

            } else if (Cuerpo.detmovimiento[Iteracion].Movimiento == 'Gasto') {
                tipomovimiento = 'SG';
            }
            else if (Cuerpo.detmovimiento[Iteracion].Movimiento == 'Compra') {
                tipomovimiento = 'SC';
            }
            else if (Cuerpo.detmovimiento[Iteracion].Movimiento == 'Servicio') {
                tipomovimiento = 'ES';
            } else {
                tipomovimiento = "";

            }

            var dtmdescripcion = Cuerpo.detmovimiento[Iteracion].DTDescripcion;
            var cantidad = Cuerpo.detmovimiento[Iteracion].Cant;
            var precu = Cuerpo.detmovimiento[Iteracion].PrecU;
            var subtotal = Cuerpo.detmovimiento[Iteracion].SubTotal;

            tempCont.query("CALL PROC_INSERTAR_DETALLE_MOVIMIENTO(?,?,?,?,?,?)", [IdMovimiento, tipomovimiento, dtmdescripcion, cantidad, precu, subtotal], (error, rows, fields) => {
                //tempCont.release();
                if (error) {
                    console.log(error);

                    Peticion.getConnection(function (error, tempCont) {
                        if (!!error) {
                            //tempCont.release();
                            console.log(error);
                        }
                        else {
                            tempCont.query("CALL PROC_CAMBIAR_ESTADO_MOVIMIENTO(?,?)", [IdMovimiento, "0"], (error, rows, fields) => {

                            });
                        }
                    });

                    Respuesta.statusCode = 500;
                    Respuesta.send(error);
                }
                else {
                    console.log("Registrado con exito el detalle de Movimiento");
                    if (Iteracion > 0) {
                        InsertarDetalleMovimiento(Iteracion - 1, IdMovimiento, Cuerpo, Peticion, Respuesta, Fila);
                    }
                    else {
                        Respuesta.json(Fila);
                    }
                }
            });
        }
    });
}
Controller.registrar = (req, res) => {
    req.getConnection((error, tempCont) => {
        if (!!error) {
            //tempCont.release();
            console.log(error);
        }
        else {
            var distancia = req.body.detmovimiento.length;
            var total = 0;
            var movimiento = "";
            if (req.body.Movimiento == 'Salida') {
                movimiento = "S";
            } else if (req.body.Movimiento == 'Entrada') {
                movimiento = "E";
            } else {
                movimiento = "";
            }

            for (var i = 0; i < distancia; i++) {
                total = total + req.body.detmovimiento[i].SubTotal;
            }

            var IdMovimiento = 0;

            tempCont.query('CALL PROC_INSERTAR_MOVIMIENTO(?,?,?)', [movimiento, req.body.Descripcion, total], (error, rows, fields) => {

                //tempCont.release();
                if (!!error) {
                    console.log(error);
                    res.statusCode = 500;
                    res.send(error);
                }
                else {
                    IdMovimiento = rows[0][0].IdMovimiento;

                    InsertarDetalleMovimiento(req.body.detmovimiento.length - 1, IdMovimiento, req.body, req, res, rows);


                    /*
                    var tipomovimiento = "";
                    for (var i = 0; i < distancia; i++) {
                        if (req.body.detmovimiento[i].Movimiento == 'Venta') {
                            tipomovimiento = 'EV';

                        } else if (req.body.detmovimiento[i].Movimiento == 'Gasto') {
                            tipomovimiento = 'SG';
                        }
                        else if (req.body.detmovimiento[i].Movimiento == 'Compra') {
                            tipomovimiento = 'SC';
                        }
                        else {
                            tipomovimiento = 'ES';
                        }

                        var dtmdescripcion = req.body.detmovimiento[i].DTDescripcion;
                        var cantidad = req.body.detmovimiento[i].Cant;
                        var precu = req.body.detmovimiento[i].PrecU;
                        var subtotal = req.body.detmovimiento[i].SubTotal;
                        console.log(IdMovimiento);
                        console.log(tipomovimiento);
                        console.log(dtmdescripcion);
                        console.log(cantidad);
                        console.log(precu);
                        console.log(subtotal);
                        console.log(tipomovimiento);
                        conn.query('CALL PROC_INSERTAR_DETALLE_MOVIMIENTO(?,?,?,?,?,?)', [IdMovimiento, tipomovimiento, dtmdescripcion, cantidad, precu, subtotal], (err, resultado) => {
                            console.log('llegamoss al final ');
                            console.log(i);
                            i = i - 1;
                            if (i == 0) {
                                console.log("comprabacion final");
                                res.send("mensaje desde nodejs final");
                            }
                        });
                        console.log("comprabacion " + i);
                    }
                    */
                }
            });
        }
    });
};
///EMAIL CORREO
sendEmail = function (req, res) {
    //convertir contraseña
    let salt = bcrypt.genSaltSync(10);
    const new_clave = bcrypt.hashSync(req.body.clave, salt)
    //  const transporter = nodemailer.createTransport(mailGun(auth));

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: '465',
        secure: true,

        //  host: '---',
        // port: 25,
        // secure: false,
        auth: {


            user: '--',
            pass: '---'
        }
    });


    var mailOptions = {
        from: '"Fixblue" <---->',
        //to: req.body.email,
        to: req.body.email,
        subject: "FIXBLUE- ATENCION A NUESTROS COLABORADORES",
        html: "<b>Verificaremos si estas Autorizado, te responderemos lo antes posible</b>"
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.json({ mensaje: 401 });
            console.log("No se ha podido enviar el mensaje.");
        } else {
            console.log('Email enviado: ' + info.response);
            res.json({ mensaje: 200 });
            console.log("Mensaje enviado correctamente");
        }
    });

    /*
        var transporter1 = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'fixblueperu@gmail.com',
                pass: 'fxb_code@2018F'
            }
        });
        */
    var mailOptions1 = {
        from: '"--',
        to: '----',
        subject: "VERIFICACION DE AUTORIZACION",
        html: `<html lang="en">
            <head>
                <meta charset="utf-8">
            </head>
            <body>
            <a href=""></a>
            <form action="http://localhost:5000/api/tasks/RegistrarUsuario" method="POST">
            <p>Usuario: <input type="text" value="${req.body.usuario}" name="usuario" ></p>
            <p>Email: <input type="text" value="${req.body.email}" name="email" ></p>
            <p>Clave: <input type="text" value="${new_clave}" name="clave" ></p>
            <p>
                <input type="submit" value="Enviar">
            </p>
            </form>      
                </body>
            </html>`
    };
    transporter.sendMail(mailOptions1, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email enviado al Colaborador de Fixblue: ' + info.response);
        }
    });
  
};

module.exports = Controller;