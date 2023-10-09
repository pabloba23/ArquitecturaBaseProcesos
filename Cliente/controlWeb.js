function ControlWeb(){
    //muestra un label con un boton
    this.mostrarAgregarUsuario=function(){
        let cadena='<div class="form-group" id="mAU">';
        cadena=cadena+'<label for="nick">Introduce el nick:</label>';
        cadena=cadena+'<input type="text" class="form-control" id="nick">';
        cadena=cadena+'<button id="btnAU" type="submit" class="btn btn-primary">Agregar</button>';
        cadena=cadena+'</div>';
        $("#au").append(cadena); //au = agregar usuario

        $("#btnAU").on("click",function(){

            
            let nick=$("#nick").val();
            if(nick){
                $("#mAU").remove(); //Se pone al principio por si se llama de sitintos sitios
                rest.agregarUsuario(nick)
            }
            
            
        });

    }


    this.mostrarObtenerUsuarios=function(){
        let cadena = '<div class="form-group" id="mOU">';
        cadena=cadena+'<button id="btnOU" type="submit" class="btn btn-primary">Obtener Usuarios</button>';
        cadena=cadena+'</div>';

        $("#ou").append(cadena); //ou = obtener usuarios

        $("#btnOU").on("click",function(){
            rest.obtenerUsuarios()
            $("#mOU").remove();
        });
    }

    this.mostrarNumeroUsuarios=function(){
        let cadena = '<div class="form-group" id="mNU">';
        cadena=cadena+'<button id="btnNU" type="submit" class="btn btn-primary">Numero Usuarios</button>';
        cadena=cadena+'</div>';

        $("#nu").append(cadena); //ou = obtener usuarios

        $("#btnNU").on("click",function(){
            rest.numeroUsuarios()
            $("#mNU").remove();
        });
    }

    this.mostrarUsuarioActivo=function(){
        let cadena='<div class="form-group" id="mUA">';
        cadena=cadena+'<label for="nick">Introduce el nick para saber si está activo o no:</label>';
        cadena=cadena+'<input type="text" class="form-control" id="nick">';
        cadena=cadena+'<button id="btnUA" type="submit" class="btn btn-primary">¿Esta Activo?</button>';
        cadena=cadena+'</div>';

        $("#ua").append(cadena); //ua = usuario activo

        $("#btnUA").on("click",function(){
            let nick=$("#nick").val();
            rest.usuarioActivo(nick)
            $("#mUA").remove();
        });
    }

    this.mostrarEliminarUsuario=function(){
        let cadena='<div class="form-group" id="mEU">';
        cadena=cadena+'<label for="nick">Introduce el nick a eliminar:</label>';
        cadena=cadena+'<input type="text" class="form-control" id="nick">';
        cadena=cadena+'<button id="btnEU" type="submit" class="btn btn-primary">Eliminar</button>';
        cadena=cadena+'</div>';

        $("#eu").append(cadena); //eu = eliminar usuario

        $("#btnEU").on("click",function(){
            let nick=$("#nick").val();
            rest.deleteUsuario(nick)
            $("#mEU").remove();
        });
    }
    this.mostrarMsg=function(msg){

        $('#mMsg').remove()
        let cadena='<h2 id="mMsg">'+msg+'</h2>';
        $('#msg').append(cadena);

    }
}
