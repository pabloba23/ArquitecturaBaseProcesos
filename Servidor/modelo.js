function Sistema(){
    this.usuarios={};  //this.usuarios=[]   esto seria un array normal basado en indices pero al usar {} es como un diccionario
    this.agregarUsuario=function(nick){
        if(!this.usuarios[nick]){
            console.log('Creado usuario con nick:'+nick);
            this.usuarios[nick]=new Usuario(nick);
        }
        else{
            console.log("Ya hay un usuario con ese nick");
        }  
    }

    this.obtenerUsuarios=function(){
        return this.usuarios;
        }

    this.usuarioActivo=function(nick){
        return nick in this.usuarios
    }

    this.deleteUsuario=function(nick){
        if(!this.usuarios[nick]){
            console.log("No se puede borrar, no existe usuario con estos datos")
        
        }
        else{
            delete this.usuarios[nick]
            console.log("Se ha eliminado el usuario"+ nick)
        }
    }
}
   function Usuario(nick){
    this.nick=nick;
   }
 
   module.exports.Sistema=Sistema