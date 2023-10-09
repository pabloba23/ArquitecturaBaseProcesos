function ClienteRest(){
    this.agregarUsuario=function(nick){
    var cli=this;
    $.getJSON("/agregarUsuario/"+nick,function(data){
    let msg="";
    if (data.nick!=-1){
    console.log("Usuario "+nick+" ha sido registrado");
    msg="Usuario "+nick+ "ha sigo registrado";
    }
    else{
    console.log("El nick ya está ocupado");
    msg="El nick ya está ocupado";
    }
        //Se dibuja la espera la ruleta de carga por ej
        cw.mostrarMsg(msg);
    });

    }

    this.agregarUsuario2=function(nick){
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
    }
    this.obtenerUsuarios=function(nick){
        var cli=this;
        $.getJSON("/obtenerUsuarios/",function(data){
        console.log(data)
        })
        //Se dibuja la espera la ruleta de carga por ej
        
        }

    this.numeroUsuarios=function(nick){
        var cli=this;
        $.getJSON("/numeroUsuarios/",function(data){
        console.log("Número de usuarios que estan en el sistema es:"+data.num)
        })
            //Se dibuja la espera la ruleta de carga por ej
            
        }
    this.usuarioActivo=function(nick){
        var cli=this;
        $.getJSON("/usuarioActivo/"+nick,function(data){
        if(data.activo){
                    console.log("El usuario "+nick+" esta activo");
                }else{
                    console.log("El usuario "+nick+" no esta activo");
                }
        })
                //Se dibuja la espera la ruleta de carga por ej
                
    }

    this.deleteUsuario=function(nick){
        var cli=this;
        $.getJSON("/deleteUsuario/"+nick,function(data){
        if(data.nick!=-1){
                    console.log("El usuario "+nick+" ha sido eliminado");
                }else{
                    console.log("El usuario "+nick+" no existe y no ha sido eliminado");
                }
        })
                //Se dibuja la espera la ruleta de carga por ej
                
    }

}