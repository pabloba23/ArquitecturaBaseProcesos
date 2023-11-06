const datos = require("./cad.js");
const correo=require("./email.js");
const bcrypt=require("bcrypt")

function Sistema(test){
    this.usuarios={};  //this.usuarios=[]   esto seria un array normal basado en indices pero al usar {} es como un diccionario

    this.test=test; //valor de tipo booleano
    this.cad=new datos.CAD() //nueva instancia de capa de acceso a datos
    
    this.agregarUsuario=function(nick){
        let res={"nick":-1};
        if (!this.usuarios[nick]){
        this.usuarios[nick]=new Usuario(nick);
        console.log("el nick "+nick+" se ha añadido")
        res.nick=nick;
        
        }
        else{
        console.log("el nick "+nick+" está en uso");
        }
        return res;
        }
    
    this.usuarioGoogle=function(usr,callback){
        this.cad.buscarOCrearUsuario(usr,function(res){
            console.log("El usuario"+res.email+ "está registrado en el sistema");
            callback(res);
        })
    }
        

    this.obtenerUsuarios=function(){
        return this.usuarios;
        }

    this.usuarioActivo=function(nick){
        let res={"activo":-1};
        if(nick in this.usuarios){
            console.log("el nick "+nick+" esta activo")
            res.activo=true;
            return res;

        }
        else{
            console.log("el nick "+nick+" no esta activo")
            res.activo=false;
            return res;
        }
    }

    this.deleteUsuario=function(nick){
        let res={"nick":-1};
        if(!this.usuarios[nick]){

            return ("No se puede borrar, no existe usuario con estos datos")
        }
        else{
            delete this.usuarios[nick]
            
            res.nick=nick;
            return ("Se ha eliminado el usuario "+ nick)
        }
    }
    this.numeroUsuarios = function() {
        let res={"num":-1};
        // Contar el número de usuarios (claves) en el objeto usuarios
        res.num = Object.keys(this.usuarios).length;
        return res;
    }
    
    if(!this.test){
        this.cad.conectar(function(){
            console.log("Conectando a Mongo Atlas")
        });
    }
  

 

    this.registrarUsuario = function (obj, callback) {
        let modelo = this;
        if (!obj.nick) {
          obj.nick = obj.email;
        }
      
        // Genera un hash de la clave antes de almacenarla
        bcrypt.hash(obj.password, 10, function (err, hash) {
          if (err) {
            console.error(err);
            return callback({ "error": "No se pudo cifrar la clave" });
          }
      
          // Sustituye la clave original con el hash
          obj.password = hash;
      
          modelo.cad.buscarUsuario(obj, function (usr) {
            if (!usr) {
              // El usuario no existe, luego lo puedo registrar
              obj.key = Date.now().toString();
              obj.confirmada = false;
              modelo.cad.insertarUsuario(obj, function (res) {
                callback(res);
              });
              correo.enviarEmail(obj.email, obj.key, "Confirmar cuenta");
            } else {
              callback({ "email": -1 });
            }
          });
        });
      }

   this.confirmarUsuario=function(obj,callback){
        let modelo=this;
        this.cad.buscarUsuario({"email": obj.email, "confirmada":false, "key":obj.key},function(usr){
            if(usr){
                usr.confirmada=true;
                modelo.cad.actualizarUsuario(usr,function(res){
                    callback({"email":res.email});
                })
            }
            else{
                callback({"email":-1});
            }
        })
   }

   this.loginUsuario = function (obj, callback) {

    this.cad.buscarUsuario({ "email":obj.email, "confirmada":true }, function (usr) {
      if (usr) {
        // Compara la clave cifrada almacenada en la base de datos con la clave proporcionada

        
        bcrypt.compare(obj.password, usr.password, function (err, result) {
          if (err) {
            console.error(err);
            return callback({ "error": "Error al comparar las claves" });
          }
  
          if (result) {
            console.log("Las contraseñas coinciden.");
            callback(usr);
          } else {
            console.log("Las contraseñas no coinciden.");
            callback({ "email": -1 });
          }
        });
      } else {
        callback({ "email": -1 });
      }
    });
  }

}
function Usuario(nick){
    this.nick=nick;
   }

   module.exports.Sistema=Sistema