var Translation = {
    userLang: 'CA',
    _initLang: function() {
		var lang= window.localStorage.getItem("user.idioma");
		if(lang==null || (lang!='CA' && lang!='ES' && lang!='EN'))lang='CA';
        this.userLang = lang;						
    },
    strTrans: {//10
    'EN': {'0':'Error: incorrect user',
		   '1':'CATALOG',
		   '2':'NOTIFICATION',
		   '3':'COMPANY',
		   '4':'CLIENTS',
		   '5':'CREATE PRODUCT',
		   '6':'USERNAME',
		   '7':'PASSWORD',
		   '8':'ENTER',
		   '9':'There is not internet connection. You can not see new clients or modify or create clients',
		   '10':'There is not internet connection'
      }, 
    'CA': {'0':'Error: usuari incorrecte',
		   '1':'CATÀLEG',
		   '2':'NOTIFICACIÓ',
		   '3':'EMPRESA',
		   '4':'CLIENTS',
		   '5':'CREA PRODUCTE',
		   '6':'USUARI',
		   '7':'PASSWORD',
		   '8':'ENTRA',
		   '9':'No hi ha internet disponible. No es podran veure nous clients ni realitzar operacions sobre aquests',
		   '10':'No hi ha connecció internet'
      }, 
	'ES': {'0':'Error: usuario incorrecto',
	       '1':'CATÁLOGO',
		   '2':'NOTIFICACIÓN',
		   '3':'EMPRESA',
		   '4':'CLIENTES',
		   '5':'CREA PRODUCTO',
		   '6':'USUARIO',
		   '7':'PASSWORD',
		   '8':'ENTRA',
		   '9':'No hay internet disponible. No se podran ver nuevos clientes ni realitzar operaciones sobre estos',
		   '10':'No hay connexión de internet'
      }
    },
    getText: function(num) {
			console.log("lang....."+this.userLang);
        if (typeof this.strTrans[this.userLang] !== "undefined") {
            cadena = this.strTrans[this.userLang][num];
        }
       if(typeof cadena == "undefined") cadena = "";
 
		return cadena;
    }
}
Translation._initLang();