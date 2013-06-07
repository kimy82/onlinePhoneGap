var Translation = {
    userLang: 'CA',
    _initLang: function() {
		var lang= window.localStorage.getItem("user.idioma");
        this.userLang = (lang) ? lang : navigator.userLanguage;
		$("#usernameLabel").text(this.getText(7,null));
		$("#passwordLabel").text(this.getText(8,null));
		$("#enterLabel").text(this.getText(9,null));s		
    },
    strTrans: {//10
    'EN': {'Error: incorrect user','CATALOG','NOTIFICATION','COMPANY','CLIENTS','CREATE PRODUCT','USERNAME','PASSWORD','ENTER','There is not internet connection. You can not see new clients or modify or create clients','There is not internet connection',
      }, 
    'CA': {'Error: usuari incorrecte','CATÀLEG','NOTIFICACIÓ','EMPRESA','CLIENTS','CREA PRODUCTE','USUARI','PASSWORD','ENTRA','No hi ha internet disponible. No es podran veure nous clients ni realitzar operacions sobre aquests','No hi ha connecció internet',
      }, 
	'ES': {'Error: usuario incorrecto','CATÁLOGO','NOTIFICACIÓN','EMPRESA','CLIENTES','CREA PRODUCTO','USUARIO','PASSWORD','ENTRA','No hay internet disponible. No se podran ver nuevos clientes ni realitzar operaciones sobre estos','No hay connexión de internet',
      }, 
    },
    getText: function(num,arguments) {
        var cadena = arguments;
        if (typeof this.strTrans[this.userLang] !== "undefined") {
            cadena = this.strTrans[this.userLang][num];
        }
       if(typeof cadena == "undefined") cadena = this.strTrans['CA'][num];
 
		if(arguments==null) return cadena;
		
        total = arguments.length-1;
        for(i=0;i<total;i++) {
          cadena = cadena.replace("%s", valor);
        }
        return cadena;
    }
}
Translation._initLang();