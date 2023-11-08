const nodemailer = require('nodemailer'); 

const url = "http://localhost:3005/"
//const url= "https://arquitecturabaseprocesos-6bnn4osd7q-ew.a.run.app/";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'pablobobilloalbendea@gmail.com',
        pass: 'jssa lxcf abao jgkj' //no es la clave de gmail
    }
});

//send();

module.exports.enviarEmail=async function(direccion, key,men) {
    const result = await transporter.sendMail({
        from: 'pablobobilloalbendea@gmail.com',
        to: direccion,
        subject: 'Confirmar cuenta',
        text: 'Pulsa aquí para confirmar cuenta',
        html: '<p>Bienvenido a Sistema</p><p><a href="'+url+'confirmarUsuario/'+direccion+'/'+key+'">Pulsa aquí para confirmar cuenta</a></p>'
    });
console.log(JSON.stringify(result, null, 4));
}
