const fs=require("fs");
const bodyParser=require("body-parser");
const express = require('express');
const app = express();
const passport=require("passport");
const cookieSession=require("cookie-session");
require("./Servidor/passport-setup.js");
const modelo = require("./Servidor/modelo.js");
const args = process.argv.slice(2); 
//para que las pruebas no se conecten a mongo

const PORT = process.env.PORT || 3005;
app.use(express.static(__dirname + "/"));

app.use(cookieSession({
    name: 'Sistema',
    keys: ['key1', 'key2']
   }));

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


let test=false; 
test=eval(args[0]); //test=true test=false

let sistema = new modelo.Sistema(test); //se pasa un parametro al sistema

app.get("/", function(request,response){
  
    var contenido=fs.readFileSync(__dirname+"/Cliente/index.html");
    response.setHeader("Content-type","text/html");
    response.send(contenido);
    
});

app.get("/agregarUsuario/:nick",function(request,response){
    let nick=request.params.nick;
    let res=sistema.agregarUsuario(nick);
    response.send(res);
    });

app.get("/obtenerUsuarios",function(request,response){
       
    let res=sistema.obtenerUsuarios();
    response.send(res);
        });


app.get("/usuarioActivo/:nick",function(request,response){
     
    let nick=request.params.nick;
    let res=sistema.usuarioActivo(nick);
    response.send(res);
     });

app.get("/numeroUsuarios",function(request,response){
       
    let res=sistema.numeroUsuarios();
    response.send(res);
    });

    app.get("/deleteUsuario/:nick",function(request,response){
    let nick=request.params.nick;   
    let res=sistema.deleteUsuario(nick);
    response.send(res);

    });

    
app.listen(PORT, () => {
console.log(`App está escuchando en el puerto ${PORT}`);
console.log('Ctrl+C para salir');
});


app.get("/auth/google",passport.authenticate('google', { scope: ['profile','email'] }));


app.get('/google/callback',
 passport.authenticate('google', { failureRedirect: '/fallo' }),
 function(req, res) {
    res.redirect('/good');
});

app.get("/good", function(request,response){
    let email=request.user.emails[0].value;

    sistema.obtenerOCrearUsuario(email,function(obj){
    response.cookie('nick',obj.email);
    response.redirect('/');
    }); 
    });


   app.get("/fallo",function(request,response){
    response.send({nick:"nook"})
   });

   app.post('/enviarJwt',function(request,response){
    let jwt=request.body.jwt;
    let user=JSON.parse(atob(jwt.split(".")[1]));
    let email=user.email;
    sistema.obtenerOCrearUsuario(email,function(obj){
    response.send({'nick':obj.email});
    })
   });