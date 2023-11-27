function ControlWeb() {
    //muestra un label con un boton
    // this.mostrarAgregarUsuario = function () {

    //     cw.limpiar();
    //     let cadena = '<div style="border: 2px solid #0d47a1; background-color: #e3f2fd; padding: 70px; border-radius: 5px;">';
    //     cadena += '<div id="mAU">';
    //     cadena += '<div class="form-group">';
    //     cadena += '<label for="email">email:</label>';
    //     cadena += '<p><input type="text" class="form-control" id="email" placeholder="introduce un email"></p>';
    //     cadena += '<button id="btnAU" type="submit" class="btn btn-primary">Submit</button>';
    //     cadena += '<div><a href="/auth/google"><img src="./Cliente/img/web_light_sq_SU@1x.png" style="height:40px;"></a></div>';
    //     cadena += '</div></div>';
        

    //     $("#au").append(cadena); //au = agregar usuario
       
    //     $("#btnAU").on("click", function () {
            
            
    //         let email = $("#email").val();
    //         if (email) {
                
    //              //Se pone al principio por si se llama de sitintos sitios
    //             rest.agregarUsuario(email)
    //         }


    //     });

    // }


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
        cadena = cadena + '<label for="email">Introduce el email para saber si está activo o no:</label>';
        cadena = cadena + '<input type="text" class="form-control" id="email">';
        cadena = cadena + '<button id="btnUA" type="submit" class="btn btn-primary">¿Esta Activo?</button>';
        cadena = cadena + '</div>';

        $("#ua").append(cadena); //ua = usuario activo

        $("#btnUA").on("click", function () {
            let email = $("#email").val();
            rest.usuarioActivo(email)
            $("#mUA").remove();
        });
    }

    this.mostrarEliminarUsuario = function () {
        let cadena = '<div class="form-row" id="mEU">';
        cadena = cadena + '<label for="email">Introduce el email a eliminar:</label>';
        cadena = cadena + '<input type="text" class="form-control" id="email">';
        cadena = cadena + '<button id="btnEU" type="submit" class="btn btn-primary">Eliminar</button>';
        cadena = cadena + '</div>';

        $("#eu").append(cadena); //eu = eliminar usuario

        $("#btnEU").on("click", function () {
            let email = $("#email").val();
            rest.deleteUsuario(email)
            $("#mEU").remove();
        });
    }
    this.mostrarMsg = function (msg) {
        cw.limpiar()
        $('#mMsg').remove()
        let cadena = '<h2 id="mMsg">' + msg + '</h2>';
        $('#msg').append(cadena);
     
            this.salir()
        
        

    }
    this.comprobarSesion=function(){
        //let email=localStorage.getItem("email");
        let email=$.cookie("email");
        if (email){
        cw.mostrarMsg("Bienvenido al sistema, "+email);
        }
        else{
        cw.mostrarRegistro();
        //cw.init();
        }
    }


    this.salir = function() {
        // Boton de LogOut
        let cadena = '<div class="form-group" id="mExit">';
        
        cadena = cadena + '<button id="btnExit" type="button" class="btn btn-primary">Cerrar Sesion</button>';
        cadena = cadena + '</div';

        $("#Exit").append(cadena);

        $("#btnExit").on("click", function () {
             // Mostrar un mensaje de confirmación al usuario
            if (confirm("¿Estás seguro de que deseas salir?")) {
                // Si el usuario confirma, eliminar "email" del localStorage y recargar la página
                $.removeCookie("email");
                location.reload();
                rest.cerrarSesion();

            }
        });

    }

    this.volver = function() {
        // Boton de LogOut
        let cadena = '<div class="form-group" id="mExit">';
        
        cadena = cadena + '<button id="btnExit" type="button" class="btn btn-primary">Vuelta atrás</button>';
        cadena = cadena + '</div';

        $("#Exit").append(cadena);

        $("#btnExit").on("click", function () {
             // Mostrar un mensaje de confirmación al usuario
             
            if (confirm("¿Estás seguro de que quieres volver a la pantalla anterior?")) {
                // Si el usuario confirma, eliminar "email" del localStorage y recargar la página
                
                rest.volverPantallaAnterior()

            }
        });

    }

    this.init=function(){
        let cw=this;
        google.accounts.id.initialize({
        client_id:"440901487-q172mab1vr7fsu18qbm1up3rogrsgjtr.apps.googleusercontent.com", 
        //client_id:"440901487-c28nkgmcdl1sbbht79ucq3b4v6mf6rlg.apps.googleusercontent.com", //prod
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

    this.limpiar=function(){
       
        $("#mAU").remove();
        $("#fmRegistro").remove();
        $("#fmLogIn").remove();


    }
       
    this.mostrarRegistro=function(){
        if ($.cookie('email')){
            return true;
        };
        cw.limpiar();
        $("fmRegistro").remove();
        //en el div de index cargamos el html
        $("#registro").load("./Cliente/registro.html",function(){
            $("#btnRegistro").on("click",function(event){
                event.preventDefault();
                let email=$("#email").val();// recoger el valor del input text
                let pwd=$("#pwd").val();// recoger el valor del input text
                if (email && pwd){
                 
                    rest.registrarUsuario(email,pwd)// llamar al servidor usando rest
                    console.log(email+" "+pwd); 
                    
                }
            });
        });
    }

        this.mostrarLogin=function(){
            if ($.cookie('email')){
                return true;
            };
            $("#fmLogIn").remove();
            $("#registro").load("./Cliente/login.html",function(){
                $("#btnLogin").on("click",function(event){
                    event.preventDefault();
                    let email=$("#email").val();
               
                    let pwd=$("#pwd").val();
                    if (email && pwd){
                        rest.loginUsuario(email,pwd);
                        console.log(email+" "+pwd);
                        
                    }
                });
            });
        }

        this.mostrarFormulario = function(formularioId) {
           
            if (formularioId === 'fmRegistro') {
                // Muestra el formulario de registro
                this.mostrarRegistro()
            } else if (formularioId === 'fmLogIn') {
                // Muestra el formulario de inicio de sesión
                this.mostrarLogin()
                
                 // Para que permita loguearse con google
                //this.mostrarGoogle() 
            } else {
                // Mostrar un mensaje de error si el formulario no es válido

                console.log('Formulario no válido');
            }
        }

        this.mostrarModal = function(msg){//muestra que esta ocupado
            $("#msgModal").remove();
            let cadena="<div id='msgModal'>"+msg+"</div>";
            $('#bModal').append(cadena);
            $('#miModal').modal();
        }
    
    }
    

