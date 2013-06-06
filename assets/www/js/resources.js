var Translation = {
    userLang: 'CA',
    _initLang: function() {
		var lang= window.localStorage.getItem("user.idioma");
        this.userLang = (lang) ? lang : navigator.userLanguage;
		$("#usernameLabel").text(this.getText(7,null));
		$("#passwordLabel").text(this.getText(8,null));
		$("#enterLabel").text(this.getText(9,null));s		
    },
    strTrans: {
    'EN': {'Error: incorrect user','CATALOG','NOTIFICATION','COMPANY','CLIENTS','CREATE PRODUCT','USERNAME','PASSWORD','ENTER'
      }, 
    'CA': {'Error: usuari incorrecte','CATÀLEG','NOTIFICACIÓ','EMPRESA','CLIENTS','CREA PRODUCTE','USUARI','PASSWORD','ENTRA',
      }, 
	'ES': {'Error: usuario incorrecto','CATÁLOGO','NOTIFICACIÓN','EMPRESA','CLIENTES','CREA PRODUCTO','USUARIO','PASSWORD','ENTRA',
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