const express = require('express');
const router = express.Router();
   
const controller= require('./controllers/controladorRoutes');
const { verificarAuth,verificarRol} = require('../middlewares/autenticacion.js');
//Loguearse
router.post('/LogueoUsuario',controller.LogueoUsuario);
router.get('/Usuario',verificarAuth,controller.Usuario);
//Registrar Usuario
router.post('/RegistrarUsuario',controller.RegistrarUsuario);
//Cambiar estado 
router.post('/CambiarEstadoMov',controller.cambiarEstadoMov);
//Cambiar estado del movimiento     
router.post('/CambiarEstadoMovDet',controller.CambiarEstadoMovDet);
router.post('/insertar',controller.registrar);
//listar movimientos
router.get('/listar',controller.listar);
router.get('/listardetalle',controller.mostrarDetalle);
router.get('/mostrar/:IdMovimiento',controller.mostrarDetalle);
router.post('/email',controller.envioEmail);

//Dashboard
router.get('/dashboard',controller.dashboard);

//Peticion de ruta del lado del cliente


module.exports = router;
/*

router.post('/', async (req,res)=>{
   const task = new Task (req.body);
 await task.save()
   res.json('task saved');
});

router.put('/:id', async (req,res)=>{
   await Task.findByIdAndUpdate(req.params.id,req.body);
   res.json('task  updated');

});
router.delete('/:id', async (req,res)=>{
    await Task.findByIdAndDelete(req.params.id);
    res.json('task  deleted');
 
 });
*/


