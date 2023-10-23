function ControlWeb() {
    //muestra un label con un boton
    this.mostrarAgregarUsuario = function () {
        let cadena='<div id="mAU">';
        cadena = cadena + '<div class="card"><div class="card-body">';
        cadena = cadena +'<div class="form-group">';
        cadena = cadena + '<label for="nick">Nick:</label>';
        cadena = cadena + '<p><input type="text" class="form-control" id="nick" placeholder="introduce un nick"></p>';
        cadena = cadena + '<button id="btnAU" type="submit" class="btn btn-primary">Submit</button>';
        cadena=cadena+'<div><a href="/auth/google"><img src="./Cliente/img/web_light_sq_SU@1x.png" style="height:40px;"></a></div>';
        cadena = cadena + '</div>';
        cadena = cadena + '</div></div></div>'; 
        $("#au").append(cadena); //au = agregar usuario

        $("#btnAU").on("click", function () {


            let nick = $("#nick").val();
            if (nick) {
                $("#mAU").remove(); //Se pone al principio por si se llama de sitintos sitios
                rest.agregarUsuario(nick)
            }


        });

    }


    this.mostrarObtenerUsuarios = function () {
        let cadena = '<div class="form-row" id="mOU">';
        cadena = cadena + '<button id="btnOU" type="submit" class="btn btn-primary">Obtener Usuarios</button>';
        cadena = cadena + '</div>';

        $("#ou").append(cadena); //ou = obtener usuarios

        $("#btnOU").on("click", function () {
            rest.obtenerUsuarios()
            $("#mOU").remove();
        });
    }

    this.mostrarNumeroUsuarios = function () {
        let cadena = '<div class="form-row" id="mNU">';
        cadena = cadena + '<button id="btnNU" type="submit" class="btn btn-primary">Numero Usuarios</button>';
        cadena = cadena + '</div>';

        $("#nu").append(cadena); //ou = obtener usuarios

        $("#btnNU").on("click", function () {
            rest.numeroUsuarios()
            $("#mNU").remove();
        });
    }

    this.mostrarUsuarioActivo = function () {
        let cadena = '<div class="form-row" id="mUA">';
        cadena = cadena + '<label for="nick">Introduce el nick para saber si está activo o no:</label>';
        cadena = cadena + '<input type="text" class="form-control" id="nick">';
        cadena = cadena + '<button id="btnUA" type="submit" class="btn btn-primary">¿Esta Activo?</button>';
        cadena = cadena + '</div>';

        $("#ua").append(cadena); //ua = usuario activo

        $("#btnUA").on("click", function () {
            let nick = $("#nick").val();
            rest.usuarioActivo(nick)
            $("#mUA").remove();
        });
    }

    this.mostrarEliminarUsuario = function () {
        let cadena = '<div class="form-row" id="mEU">';
        cadena = cadena + '<label for="nick">Introduce el nick a eliminar:</label>';
        cadena = cadena + '<input type="text" class="form-control" id="nick">';
        cadena = cadena + '<button id="btnEU" type="submit" class="btn btn-primary">Eliminar</button>';
        cadena = cadena + '</div>';

        $("#eu").append(cadena); //eu = eliminar usuario

        $("#btnEU").on("click", function () {
            let nick = $("#nick").val();
            rest.deleteUsuario(nick)
            $("#mEU").remove();
        });
    }
    this.mostrarMsg = function (msg) {

        $('#mMsg').remove()
        let cadena = '<h2 id="mMsg">' + msg + '</h2>';
        $('#msg').append(cadena);

    }
    this.comprobarSesion=function(){
        //let nick=localStorage.getItem("nick");
        let nick=$.cookie("nick");
        if (nick){
        cw.mostrarMsg("Bienvenido al sistema, "+nick);
        }
        else{
        cw.mostrarAgregarUsuario();
        cw.init();
        }
    }


    this.salir = function () {
        $.removeCookie("nick");

        location.reload();
        cw.mostrarMsg("Hasta luego usuario")
    }

    this.init=function(){
        let cw=this;
        google.accounts.id.initialize({
        client_id:"440901487-c28nkgmcdl1sbbht79ucq3b4v6mf6rlg.apps.googleusercontent.com", //prod
        auto_select:false,
        callback:cw.handleCredentialsResponse
        });
        google.accounts.id.prompt();
    }  

    this.handleCredentialsResponse=function(response){
        let jwt=response.credential;
        //let user=JSON.parse(atob(jwt.split(".")[1]));
        //console.log(user.name);
        //console.log(user.email);
        //console.log(user.picture);
        rest.enviarJwt(jwt);

        }
       
    
}
