	 var controlPage={	
												_userRole:"ROLE_CLIENT",
												_init: function(){
						      							this._self=this;														
						      					},
						      					goToClients: function(){
						      						$.mobile.changePage("#clients", { transition: "slideup"});	
													$(document).bind('pagechange',function(){controlDB.fillClient()});
						      					},
						      					goToCategory: function(){
						      												      							
						      							$.mobile.changePage("#category", { transition: "slideup"});	
						      							$(document).bind('pagechange',function(){controlDB.fillCategories()});
						      					},
						      					goToMenu: function(){
						      						$.mobile.changePage("#menu", { transition: "slideup"});	
													$(document).bind('pagechange',function(){controlPage.createMenuPrincipal();});
						      					},
						      					goToChangeCompany: function(){
						      						$.mobile.changePage("#changeCompany", { transition: "slideup"});	
						      						$(document).bind('pagechange',function(){controlPage._createSelectCompanies();});
						      					},
												goToNotificacions: function(){
						      						$.mobile.changePage("#notificacions", { transition: "slideup"});	
						      						$(document).bind('pagechange',function(){controlPage._createNotificacions();});
						      					},
												goToNotifPrivate: function(user){
													$.mobile.changePage("#notifPrivate", { transition: "slideup"});	
						      						$(document).bind('pagechange',function(){controlPage._createNotifPrivates(user);});
												},
												goToEnviaNotif: function(){
													$.mobile.changePage("#enviaNotif", { transition: "slideup"});	
						      						$(document).bind('pagechange',function(){controlPage._createNotifSearchUser(user);});
												},
												goToCataleg: function(){
						      						$.mobile.changePage("#cataleg", { transition: "slideup"});	
													$(document).bind('pagechange',function(){controlPage._getCatalegHTML();});
						      					},
												goToCompanyInfo: function(){
						      						$.mobile.changePage("#companyInfo", { transition: "slideup"});	
													$(document).bind('pagechange',function(){controlPage._getCompanyHTML();});
						      					},
												goToCreaProduct: function(){
						      						$.mobile.changePage("#creaProduct", { transition: "slideup"});	
													$(document).bind('pagechange',function(){controlDB.checkCategoryFilled('categoryProductList','categoryProductSubList','categoryProductSubSubList');});
						      					},												
						      					_createSelectCompanies: function(){
						      						controlDB.fillCompanies();
													$(document).unbind('pagechange');
						      					},
												_createNotificacions: function(){
													controlDB.fillNotificacions();
													$(document).unbind('pagechange');
												},
												_createNotifPrivates: function(user){
													document.getElementById("headerNotificacionsPrive").innerHTML=user;													
													controlNotif.getNotifPrivates(user);
													$(document).unbind('pagechange');
												},
												_createNotifSearchUser: function(){
													controlDB.fillNotificacionsSearchUser();
													$(document).unbind('pagechange');
												},
												_getCompanyHTML: function(){
													controlCompany.getCompanyHTML();
													$(document).unbind('pagechange');
												},
												_getCatalegHTML: function(){
													controlProduct.getCatalegHTML();
													$(document).unbind('pagechange');
												},
												createMenuPrincipal: function(){
													controlPage._initRole();
													if(controlPage._userRole=='ROLE_CLIENT'){
														controlPage._createMenuClient();
													}else if(controlPage._userRole=='ROLE_ADMIN'){
														controlPage._createMenuAdmin();
													}else if(controlPage._userRole=='ROLE_SUPER_ADMIN'){
														controlPage._createMenuSuperAdmin();
													}else{
														console.log("ERROR: No hi ha role per defecte fem el del client");
														controlPage._createMenuClient();
													}
													$(document).unbind('pagechange');
													
												},
												_initRole: function(){
													var role = window.localStorage.getItem("user.role");
													if(role!=null){
														controlPage._userRole=role;
													}else{
														console.log("ERROR: No hi ha role per defecte fem el del client");
														controlPage._userRole='ROLE_CLIENT';
													}
												},
												_createMenuClient: function(){
													console.log("menu inizilization");
													var list = document.getElementById("menuList");
													$(list).empty();	
													$(list).append('<li  ><a href="#" onclick="controlPage.goToCataleg()">'+Translation.getText('1')+'</a></li>');		 	
													$(list).append('<li  ><a href="#"  onclick="controlPage.goToNotificacions()">'+Translation.getText('2')+'</a></li>');
													$(list).append('<li  ><a href="#"  onclick="controlPage.goToCompanyInfo()" >'+Translation.getText('3')+'</a></li>');													
													$(list).listview('refresh');
													console.log("menu created");
												},
												_createMenuAdmin: function(){
													console.log("menu inizilization");
													var list = document.getElementById("menuList");		
													$(list).empty();
													$(list).append('<li  ><a href="#"  onclick="controlPage.goToCataleg()">'+Translation.getText('1')+'</a></li>');		 	
													$(list).append('<li ><a href="#"  onclick="controlPage.goToNotificacions()">'+Translation.getText('2')+'</a></li>');
													$(list).append('<li  ><a  href="#"  onclick="controlPage.goToCategory()">'+Translation.getText('category')+'</a></li>');
													$(list).append('<li  ><a href="#"  onclick="controlPage.goToCompanyInfo()">'+Translation.getText('3')+'</a></li>');
													$(list).append('<li ><a href="#" onclick="controlPage.goToClients()">'+Translation.getText('4')+'</a></li>');
													$(list).append('<li  ><a href="#"  onclick="controlPage.goToCreaProduct()">'+Translation.getText('5')+'</a></li>');
													$(list).listview('refresh');
													console.log("menu created");													
													
												},
												_createMenuSuperAdmin: function(){
													console.log("menu inizilization");
													try{												
														var list = document.getElementById("menuList");		
														$(list).empty();												
														$(list).append('<li  ><a href="#" onclick="controlPage.goToCataleg()" >'+Translation.getText("1")+'</a></li>');		 	
														$(list).append('<li  ><a href="#" onclick="controlPage.goToNotificacions()">'+Translation.getText("2")+'</a></li>');
														$(list).append('<li  ><a href="#"  onclick="controlPage.goToCategory()">'+Translation.getText('category')+'</a></li>');
														$(list).append('<li  ><a href="#"  onclick="controlPage.goToCompanyInfo()">'+Translation.getText("3")+'</a></li>');
														$(list).append('<li ><a href="#"  onclick="controlPage.goToClients()">'+Translation.getText("4")+'</a></li>');
														$(list).append('<li  ><a href="#"  onclick="controlPage.goToCreaProduct()" >'+Translation.getText("5")+'</a></li>');	
														$(list).append('<li ><a href="#" onclick="controlPage.goToChangeCompany()">'+Translation.getText("changeCompany")+'</a></li>'); 	
														$(list).listview('refresh');
														console.log("menu created");
														
													}catch(error){console.log("Error creating list"+error);}
													
												},																				
							 
							 }	