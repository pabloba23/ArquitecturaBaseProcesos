const datos = require("./cad.js");

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
    
    this.obtenerOCrearUsuario=function(email,callback){
        this.cad.buscarOCrearUsuario(email,function(res){
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
  
}
   function Usuario(nick){
    this.nick=nick;
   }
 
   module.exports.Sistema=Sistema