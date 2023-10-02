function Sistema(){
    this.usuarios={};  //this.usuarios=[]   esto seria un array normal basado en indices pero al usar {} es como un diccionario
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
    this.numeroUsuarios = function() {
        // Contar el número de usuarios (claves) en el objeto usuarios
        return Object.keys(this.usuarios).length;
    }
}
   function Usuario(nick){
    this.nick=nick;
   }
 
   module.exports.Sistema=Sistema