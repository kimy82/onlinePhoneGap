      var controlUser={
						      						_init: function(){
						      							this._self=this;
						      						},
						      						logOut: function(){
						      						
						      							controlUser.deleteUserStorage();
						      							controlDB.emptyAllDB();
						      							$.mobile.changePage("#logUser", { transition: "slideup"});	
						      							
						      						},
											      	check: function(){
											      		var username = window.localStorage.getItem("user.username");
											      		var login = window.localStorage.getItem("user.login");
														
											      		if(username==null || login==null){
															controlUser.deleteUserStorage();
											      			$.mobile.changePage("#logUser", { transition: "slideup"});	
															return;
											      		}else{
															controlPage.createMenuPrincipal();
															$.mobile.changePage("#menu", { transition: "slideup"});	
															$(document).bind('pagechange',function(){controlPage.createMenuPrincipal()});
														}
											      		
											      	},											      
											      	logUser: function(){
											      		var username =$("#username").val();
											      		var login =$("#password").val();	
														if(!window.navigator.onLine){
															console.log("No internet...");
															navigator.notification.alert(Translation.getText(10));  
															return;
														}														
											      		var url = "http://10.0.2.2:9090/Spring/rest/dao/login"; 
											        
																//10.0.2.2		        	                  						       
						       							$.ajax({
						       								   url: "http://10.0.2.2:9090/Spring/rest/service/userSrv/login?user="+username+"&pass="+login,
													           type: "GET",
													           dataType: 'json',
													           cache : false,													         
													            success: function ( data ) {
													            	try{														           
															           	if(data.ok=='ok'){
															          	 	controlUser.setUserStorage(data.username,data.password,data.companyName,data.companyId,data.idioma,data.role);
															          	 	$.mobile.changePage("#menu", { transition: "slideup"});																																			
																			$(document).bind('pagechange',function(){controlPage.createMenuPrincipal()});
																																          	 															          	 	
															          	 }else{
															          	 	console.log("ERROR log:"+Translation.getText('0'));
																			document.getElementById("error.login").innerHTML=Translation.getText('0');
															          	 	$.mobile.changePage("#logUser", { transition: "slideup"});												          	 	
															          	 }
														          	 }catch(error){console.log("ERROR:"+error);}
														          }
													        });													      						          												           
											      	},
											      	setUserStorage: function(user,password,companyName,companyId,idioma,role){
											      	    console.log("Saving user to Storage:: user"+user+" password::"+password+" company name ::"+companyName+" ::companyId"+companyId+" idioma::"+idioma+" role::"+role);
											      		window.localStorage.setItem("user.username",user);
											      		window.localStorage.setItem("user.login",password);		
														window.localStorage.setItem("user.role",role);	
														window.localStorage.setItem("user.companyName",companyName);
														window.localStorage.setItem("user.companyId",companyId);
														window.localStorage.setItem("user.idioma",idioma);
											      	},
													deleteUserStorage: function(){
											      		window.localStorage.removeItem("user.username");
											      		window.localStorage.removeItem("user.login");	
														window.localStorage.removeItem("user.role");
														window.localStorage.removeItem("user.companyName");
														window.localStorage.removeItem("user.companyId");
														window.localStorage.removeItem("user.idioma");
											      	},
											      	deleteUser: function(){
														
														if(!window.navigator.onLine){
															console.log("No internet...");
															navigator.notification.alert(Translation.getText(10));  
															return;
														}
														try{	
														var user =controlClient.client.getName();
														}catch(error){
														console.log("Error getting client"+error);
														}
												        var url = "http://10.0.2.2:9090/Spring/rest/service/userSrv/delete?user="+user;
												        
												        	$.ajax({
												       			url: url,
														        type: "GET",
																dataType: 'json',
																cache : false,													         
																success: function ( data ) {	
																 						   navigator.notification.alert("DELETED");   																			           
																				           db.transaction(queryDeleteUsers, errorCB);																					             	
																				           $.mobile.changePage("#insert", { transition: "slideup"});
																				          }
																});	
						     						 },						     				
						     						 insertUser: function(){
														if(!window.navigator.onLine){
															console.log("No internet...");
															navigator.notification.alert(Translation.getText(10));  
															return;
														}
														
														var roleObj = document.getElementById("select-choice-1");
														var role=$(roleObj).val();
														
														var idiomaObj = document.getElementById("select-idioma-1");
														var idioma=$(idiomaObj).val();
														
														var user =window.localStorage.getItem("user.username");
												        
												        var tel = document.getElementById("telNewUser").value;
												        var userToInsert = document.getElementById("firstname").value;
												        var pass = document.getElementById("passNewUser").value;
												        
												        
												        var url = "http://10.0.2.2:9090/Spring/rest/service/userSrv/insert?user="+user+"&userinsert="+userToInsert+"&pass="+pass+"&role="+role+"&tel="+tel+"&idioma="+idioma;
												        	$.ajax({
												       			url: url,
														        type: "GET",
																dataType: 'json',
																cache : false,													         
																success: function ( data ) {
																				       navigator.notification.alert("SAVED");   																				          
																				          }
																});	
						     						 }
						      }