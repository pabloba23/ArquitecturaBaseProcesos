function ClienteRest(){
/*     this.agregarUsuario=function(nick){
    var cli=this;
    $.getJSON("/agregarUsuario/"+nick,function(data){
    let msg="";
    if (data.nick!=-1){
    console.log("Usuario "+nick+" ha sido registrado");
    msg=="Bienvenido al sistema, "+nick;
    localStorage.setItem("nick",nick);
    }
    else{
    console.log("El nick ya está ocupado");
    msg="El nick ya está ocupado";

    }
        //Se dibuja la espera la ruleta de carga por ej
        cw.mostrarMsg(msg);
    });

    } */

/*     this.agregarUsuario2=function(nick){
        $.ajax({
            type:'GET',
            url:'/agregarUsuario/'+nick,
            success:function(data){
            if (data.nick!=-1){
            console.log("Usuario "+nick+" ha sido registrado")
            }
            else{
            console.log("El nick ya está ocupado");
            }
            },
            error:function(xhr, textStatus, errorThrown){
            console.log("Status: " + textStatus);
            console.log("Error: " + errorThrown);
            },
            contentType:'application/json'
            });
    } */
    this.obtenerUsuarios=function(email){
        var cli=this;
        $.getJSON("/obtenerUsuarios/",function(data){
        console.log(data)
        })
        //Se dibuja la espera la ruleta de carga por ej
        
        }

    this.numeroUsuarios=function(email){
        var cli=this;
        $.getJSON("/numeroUsuarios/",function(data){
        console.log("Número de usuarios que estan en el sistema es:"+data.num)
        })
            //Se dibuja la espera la ruleta de carga por ej
            
        }
    this.usuarioActivo=function(email){
        var cli=this;
        $.getJSON("/usuarioActivo/"+email,function(data){
        if(data.activo){
                    console.log("El usuario "+email+" esta activo");
                }else{
                    console.log("El usuario "+email+" no esta activo");
                }
        })
                //Se dibuja la espera la ruleta de carga por ej
                
    }

    this.deleteUsuario=function(email){
        var cli=this;
        $.getJSON("/deleteUsuario/"+email,function(data){
        if(data.email!=-1){
                    console.log("El usuario "+email+" ha sido eliminado");
                }else{
                    console.log("El usuario "+email+" no existe y no ha sido eliminado");
                }
        })
                //Se dibuja la espera la ruleta de carga por ej
                
    }

    this.enviarJwt=function(jwt){
        $.ajax({
        type:'POST',
        url:'/enviarJwt',
        data: JSON.stringify({"jwt":jwt}),
        success:function(data){
        let msg="El email "+data.email+" está ocupado";
        if (data.email!=-1){
        console.log("Usuario "+data.email+" ha sido registrado");
        cw.mostrarModal("Usuario "+data.email+" ha sido registrado")
        msg="Bienvenido al sistema, "+data.email;
        $.cookie("email",data.email);
        }
        else{

        console.log("El email ya está ocupado");
        cw.mostrarModal("Usuario "+data.email+" esta ocupado")
        }
        cw.limpiar();
        cw.mostrarMsg(msg);
        },
        error:function(xhr, textStatus, errorThrown){
        //console.log(JSON.parse(xhr.responseText));
        console.log("Status: " + textStatus);
        console.log("Error: " + errorThrown);
        },
        contentType:'application/json'
        //dataType:'json'
        });
        }

        this.registrarUsuario=function(email,password){
            $.ajax({
                type:'POST',
                url:'/registrarUsuario',
                data: JSON.stringify({"email":email,"password":password}),
                success:function(data){
                    if (data.email!=-1){				
                        console.log("Usuario "+data.email+" ha sido registrado");
                        // mostrar un mensaje diciendo: consulta tu email
                        //$.cookie("email",data.email);
                        //cw.limpiar();
                        //cw.mostrarMensaje("Bienvenido al sistema, "+data.email);
                        
                        cw.mostrarLogin();
                    }
                    else{
                        console.log("El email está ocupado");
                        cw.mostrarModal("El email está ocupado")
                    }
                    },
                    error:function(xhr, textStatus, errorThrown){
                    console.log("Status: " + textStatus); 
                    console.log("Error: " + errorThrown); 
                    },
                contentType:'application/json'
            });
        }

        this.loginUsuario=function(email,password){
            $.ajax({
                type:'POST',
                url:'/loginUsuario',
                data: JSON.stringify({"email":email,"password":password}),
                success:function(data){
                    if (data.email!=-1){				
                        console.log("Usuario "+data.email+" ha sido registrado");
                        // mostrar un mensaje diciendo: consulta tu email
                        //$.cookie("email",data.email);
                        cw.limpiar();
                        cw.mostrarMsg("Bienvenido al sistema, "+data.email);
                        
                        
                    }
                    else{
                        console.log("Correo o clave incorrecta");
                        cw.limpiar()
                        cw.mostrarMsg("Correo o clave incorrecta.");
                    }
                    },
                    error:function(xhr, textStatus, errorThrown){
                    console.log("Status: " + textStatus); 
                    console.log("Error: " + errorThrown); 
                    },
                contentType:'application/json'
            });
        }

        this.volverPantallaAnterior=function() {
            window.history.back();
        }

        this.cerrarSesion=function(){
            $.getJSON("/cerrarSesion",function(){
                console.log("Sesión cerrada");
                $.removeCookie("email");
            });
        }
            
}