const jwt =require('jsonwebtoken');

let verificarAuth = (req, res, next) => {
  
    // Leer headers
    let token = req.get('token');
    if(!token){
      return res.status(403).json({
        mensaje:'Token no autorizado!'
      });
    }
    
    jwt.verify(token,'secret',(err,decoded)=>{
        if(err){
            return  res.status(401).json({
                mensaje:'Error de Token',
                err
            })
        }
        req.usuario=decoded.data;
      
    next();
    });
  
  
  }
  let verificarRol = (req, res, next) => {

    // Leer headers
    let rol = req.usuario.role;
    console.log(role);
  
    if(rol !== 'ADMIN'){
        return res.status(401).json({
          mensaje: 'Rol no autorizado!'
        })
      }
  
    next();
  
  }
  
  
  module.exports = {verificarAuth,verificarRol};