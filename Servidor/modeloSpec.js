const modelo = require("./modelo.js");

describe('El sistema', function() {
   let sistema;
  
   beforeEach(function() {
   sistema=new modelo.Sistema()
   });
  
   it('Inicialmente no hay usuarios', function() {
   expect(sistema.numeroUsuarios()).toEqual(0);
   });

   it('Agregamos usuario', function() {
      
      sistema.agregarUsuario("Pepe")
      expect(sistema.numeroUsuarios()).toEqual(1);
      expect(sistema.usuarios["Pepe"].nick).toEqual("Pepe")
      });

   it('Usuario activo', function(){
      sistema.agregarUsuario("Pepe");
      expect(sistema.usuarioActivo("Pepe")).toEqual();
      sistema.deleteUsuario("Pepe")
      expect(sistema.usuarioActivo("Pepe")).toEqual();
      })

   it('Borramos usuario', function() {
      sistema.agregarUsuario("Pepe")
      expect(sistema.numeroUsuarios()).toEqual(1);
      sistema.deleteUsuario("Pepe")
      expect(sistema.numeroUsuarios()).toEqual(0);
         
         });

   it('Obtenemos usuarios', function() {
            let lista=sistema.obtenerUsuarios()
            expect(Object.keys(lista).length).toEqual(0);
            sistema.agregarUsuario("Pepe")
            sistema.agregarUsuario("Pepe1")
            lista=sistema.obtenerUsuarios();
            expect(Object.keys(lista).length).toEqual(2);
            });

   it('Numero usuarios',function(){
      let lista=sistema.obtenerUsuarios()
      expect(Object.keys(lista).length).toEqual(0);
      sistema.agregarUsuario("Pepe")
      sistema.agregarUsuario("Pepe1")
      lista=sistema.obtenerUsuarios();
      expect(Object.keys(lista).length).toEqual(2);
      expect(sistema.numeroUsuarios()).toEqual(2);
   })

   

})