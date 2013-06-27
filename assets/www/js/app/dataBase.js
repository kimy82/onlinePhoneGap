 
							 var controlDB ={
												_init: function(){
						      							this._self=this;
														this.clientArray=new Array();	
														this.categoryArray=new Array();		
														this.companyArray= new Array();										
														this.notifArray= new Array();	
						      					},
						      					_clientfilled:false,
												_categoryfilled: false,						      											      			
												populateClientDB: function(tx) {
													 console.log("table creating");
													 //tx.executeSql('DROP TABLE IF EXISTS CATEGORY');
													 tx.executeSql('CREATE TABLE IF NOT EXISTS CLIENTS (name UNIQUE,role)');
													 tx.executeSql('CREATE TABLE IF NOT EXISTS CATEGORY (name, type,supername,id)');
													 tx.executeSql('CREATE TABLE IF NOT EXISTS COMPANY (name,id)');
													 tx.executeSql('CREATE TABLE IF NOT EXISTS NOTIFICACIONS (id,notif,date,username1,username2,sent,recieved)');
													 //tx.executeSql('INSERT INTO CLIENTS (name) VALUES ("KIMY")');
													 console.log("table created");													 													 
												},
												errorCB: function(tx, err) {
												   console.log("Error creating client table SQL: "+err);
												},												
												successCB: function() {
													console.log("success: client table created!");
												},
												emptyAllDB: function(){
												
													db.transaction(function (tx) {
													 tx.executeSql('DELETE FROM CLIENTS where 1=1');
													 tx.executeSql('DELETE FROM CATEGORY where 1=1');
													 tx.executeSql('DELETE FROM COMPANY where 1=1');
													 tx.executeSql('DELETE FROM NOTIFICACIONS where 1=1');
													});
													console.log("taules borrades en logout");
												},
												checkCategoryFilled: function(){
													db.transaction(function (tx) {
													   tx.executeSql('SELECT * FROM CATEGORY', [], function (tx, results) {
														   var len = results.rows.length;
														   console.log("Num regiestres de categories::"+len);
														   if(parseInt(len)>0){
														   		console.log("TRUE CAT");		
														   		 var categoryList= document.getElementById("categoryList");
														   		 var categorySubList= document.getElementById("categorySubList");
														   		 var categorySubSubList= document.getElementById("categorySubSubList");
														   	 
														   	 	 $(categoryList).empty();
																 $(categorySubList).empty();
																 $(categorySubSubList).empty();
															 
																$(categorySubSubList).append('<option value="standard"  data-placeholder="true" >...</option>');
																$(categorySubList).append('<option value="standard"  data-placeholder="true" >...</option>');
																$(categoryList).append('<option value="standard"  data-placeholder="true" >...</option>');	
																try{
																 for (var i=0; i<len; i++){																															
																	if(results.rows.item(i).type=='N0'){
																		$(categoryList).append('<option value="'+results.rows.item(i).id+'" >'+results.rows.item(i).name+'</option>');
																	}else if(results.rows.item(i).type=='N1'){
																		$(categorySubList).append('<option value="'+results.rows.item(i).id+'" >'+results.rows.item(i).name+'</option>');
																	}else if(results.rows.item(i).type=='N2'){
																		$(categorySubSubList).append('<option value="'+results.rows.item(i).id+'" >'+results.rows.item(i).name+'</option>');
																	}else{
																		console.log("Cat doesn't fit any type");
																	}
																	
																																
																	
																}	
																}catch(error){console.log(error);}													   		
														   }else{ 
														   		console.log("FALSE CAT"); 
														   		console.log("filling categories table");
																var companyId = window.localStorage.getItem("user.companyId");
																var url = "http://"+contextURL+"/Spring/rest/service/userSrv/categoryFill?companyId="+companyId;
													    		$('ul').html("");
															    $.ajax({
															       			url: url,
																	        type: "GET",
																			async: true,
																			dataType: 'json',
																			cache : false,													         
																			success: function ( jsonResponse ) {
																					 var categoryList= document.getElementById("categoryList");
																					 var categorySubList= document.getElementById("categorySubList");
																					 var categorySubSubList= document.getElementById("categorySubSubList");
																					 $(categoryList).empty();
																					 $(categorySubList).empty();
																					 $(categorySubSubList).empty();
																					 $(categorySubSubList).append('<option value="standard"  data-placeholder="true" >...</option>');
																					 $(categorySubList).append('<option value="standard"  data-placeholder="true" >...</option>');
																					 $(categoryList).append('<option value="standard"  data-placeholder="true" >...</option>');	
																					 try{
																				          $.each(jsonResponse, function(index, value) { 		
																						          	if(value.name!='undefined'){       										          		
																						          			console.log("category name"+value.name);
																						          			if(value.type=='N0'){
																						          				$(categoryList).append('<option value="'+value.id+'" >'+value.name+'</option>');
																						          				controlDB.categoryArray[index] = new Category(value.name,value.type,value.superCategoryName,value.id);	
																						          			}else if(value.type=='N1'){
																						          				$(categorySubList).append('<option value="'+value.id+'" >'+value.name+'</option>');
																						          				controlDB.categoryArray[index] = new Category(value.name,value.type,value.superCategoryName,value.id);	
																						          			}else if(value.type=='N2'){
																						          				$(categorySubSubList).append('<option value="'+value.id+'" >'+value.name+'</option>');
																						          				controlDB.categoryArray[index] = new Category(value.name,value.type,value.superCategoryName,value.id);	
																						          			}else{
																						          				console.log("category with no type"+value.name);																					          				
																						          			}																													 		
																																						
																									}																						 									       					
																							});		
																						}catch(error){console.log("ERROR filling categories")};																	
																						db.transaction(controlDB.queryInsertCategories, controlDB.errorCB);		
																				}
																	});	
																	console.log("end filling categories table");		
														   }
														 }, null);
													});
													return false;
												},													
												checkClientFilled: function(){
													db.transaction(function (tx) {
													   tx.executeSql('SELECT * FROM CLIENTS', [], function (tx, results) {
														   var len = results.rows.length;
														   console.log("Num regiestres de clients::"+len);
														   if(parseInt(len)>0){	
														   													   		
														   }else{
														   	console.log("filling clients table");
															var username = window.localStorage.getItem("user.username");
															 var url = "http://"+contextURL+"/Spring/rest/service/userSrv?user="+username;
															      $('ul').html("");
																	      $.ajax({
																	       			url: url,
																			        type: "GET",
																					async: true,
																					dataType: 'json',
																					cache : false,													         
																					success: function ( jsonResponse ) {
																							 var clientList= document.getElementById("clientsList");
																							 $(clientList).empty();
																					          $.each(jsonResponse, function(index, value) { 		
																							          	if(value.username!='undefined'){       										          		
																							          			console.log(value.username);
																												$(clientList).append('<li><a href="#infoUser" onclick="controlClient.createClient(\''+value.username+'\')" >'+value.username+'</a></li>').listview('refresh');		 		
																												controlDB.clientArray[index] = new Client(value.username,value.role);													
																										}																						 									       					
																								});																			
																								db.transaction(controlDB.queryInsertUsers, controlDB.errorCB);		
																						}
																			});	
															console.log("end filling clients table");
														   }
														 }, null);
													});
													return false;
												},												
												fillNotificacionsSearchUser: function(){
													db.transaction(function (tx) {
													   tx.executeSql('SELECT * FROM CLIENTS', [], function (tx, results) {
														   var len = results.rows.length;
														   var role= window.localStorage.getItem("user.role");
														   if(parseInt(len)>0){	
																var notifSearchUser= document.getElementById("notifSearchUser");
																$(notifSearchUser).empty();
														   		try{
																 for (var i=0; i<len; i++){		
																	if(role=='ROLE_SUPER_ADMIN' || role=='ROLE_ADMIN'){
																		$(notifSearchUser).append('<li><a href="#" class="notif" onclick="controlPage.goToNotifPrivate(\''+results.rows.item(i).name+'\')"  >'+results.rows.item(i).name+'&nbsp;('+results.rows.item(i).role+')</a></li>');		 																																																																			
																	}else{
																		$(notifSearchUser).append('<li><a href="#" class="notif" onclick="controlPage.goToNotifPrivate(\''+results.rows.item(i).name+'\')"  >'+results.rows.item(i).name+'</a></li>');		 																																																																			
																	}
																}	
																}catch(error){console.log(error);}												   		
														   }else{
														   	console.log("filling clients  serch for sent notif table");
															var username = window.localStorage.getItem("user.username");
															
															 var url = "http://"+contextURL+"/Spring/rest/service/userSrv?user="+username;
															      $('ul').html("");
																	      $.ajax({
																	       			url: url,
																			        type: "GET",
																					async: true,
																					dataType: 'json',
																					cache : false,													         
																					success: function ( jsonResponse ) {
																							 var notifSearchUser= document.getElementById("notifSearchUser");
																							 $(notifSearchUser).empty();
																					          $.each(jsonResponse, function(index, value) { 		
																							          	if(value.username!='undefined'){       										          		
																							          			console.log(value.username);
																												if(role=='ROLE_SUPER_ADMIN' || role=='ROLE_ADMIN'){
																													$(notifSearchUser).append('<li><a href="#" class="notif" onclick="controlPage.goToNotifPrivate(\''+value.username+'\')"  >'+value.username+' &nbsp; ('+value.role+')</a></li>');		 		
																												}else{
																													$(notifSearchUser).append('<li><a href="#" class="notif" onclick="controlPage.goToNotifPrivate(\''+value.username+'\')"  >'+value.username+'</a></li>');		 		
																												}
																												
																												controlDB.clientArray[index] = new Client(value.username,value.role);													
																										}																						 									       					
																								});																			
																								db.transaction(controlDB.queryInsertUsers, controlDB.errorCB);		
																						}
																			});	
															console.log("end filling clients table");
														   }
														 }, null);
													});
													return false;
												},
												checkNotificacions: function(){
														db.transaction(function (tx) {
													    tx.executeSql('DELETE FROM NOTIFICACIONS where 1=1');
														 
														   var username = window.localStorage.getItem("user.username");
 
														   		 
														   		
																
																var url = "http://"+contextURL+"/Spring/rest/service/userSrv/getNotificacions?user="+username;
													    		
															    $.ajax({
															       			url: url,
																	        type: "GET",
																			async: true,
																			dataType: 'json',
																			cache : false,													         
																			success: function ( jsonResponse ) {
																					var notifList= document.getElementById("notifList");
														   		
																 					$(notifList).empty();	
																					 try{
																						  var userAnterior="";
																				          $.each(jsonResponse, function(index, value) { 	
																									var  numItera=0;
																						          	if(value.user1== username){       										          		
																						          			console.log("user 1"+value.user1);
																												if(numItera<100 && userAnterior!=value.user2){
																													userAnterior=value.user2;
																													if(value.sent==true && value.recieved==true){
																														$(notifList).append('<li class="notifuser1" onclick="controlPage.goToNotifPrivate(\''+value.user2+'\')" >'+value.notif+'&nbsp;('+value.date+' &nbsp; '+value.user2+') !!</li>');
																													}else if (value.sent==true && value.recieved==false){
																														$(notifList).append('<li class="notifuser1" onclick="controlPage.goToNotifPrivate(\''+value.user2+'\')" >'+value.notif+'&nbsp;('+value.date+' &nbsp; '+value.user2+') !</li>');
																													}else if (value.sent==false && value.recieved==false){
																														$(notifList).append('<li class="notifuser1" onclick="controlPage.goToNotifPrivate(\''+value.user2+'\')" >'+value.notif+'&nbsp;('+value.date+' &nbsp; '+value.user2+')</li>');
																													}
																														
																													
																												}
																												numItera=numItera+1;
																						          				controlDB.notifArray[index] = new Notificacions(value.notif,value.id,value.user1,value.user2,value.date,value.sent,value.recieved);																							          																													 																																							
																									}else{
																												
																												if(numItera<100 && userAnterior!=value.user1){
																													$(notifList).append('<li class="notifuser2" onclick="controlPage.goToNotifPrivate('+value.user1+')" >'+value.notif+'&nbsp;('+value.date+' &nbsp; '+value.user1+')</li>');
																													numItera=numItera+1;
																													userAnterior=value.user1;
																												}
																												
																												
																						          				controlDB.notifArray[index] = new Notificacions(value.notif,value.id,value.user1,value.user2,value.date,value.sent,value.recieved);																							          																													 																																							
																									}
																							});		
																						}catch(error){console.log("ERROR filling notif")};																	
																						db.transaction(controlDB.queryInsertNotif, controlDB.errorCB);		
																			}
																	});	
																	console.log("end filling notif table");		
														   
														 
													});
													return false;
												},
												checkCompanyFilled: function(){
														db.transaction(function (tx) {
													    tx.executeSql('SELECT * FROM COMPANY', [], function (tx, results) {
														   var len = results.rows.length;
														   console.log("Num regiestres de companies::"+len);
														   var companyId = window.localStorage.getItem("user.companyId");
														   if(parseInt(len)>0){
														   		console.log("TRUE COM");		
														   		 var companyList= document.getElementById("companyList");
														   		
																 $(companyList).empty();															 																 																	
															
																try{
																 for (var i=0; i<len; i++){																															
																	if(results.rows.item(i).id==companyId){
																		$(companyList).append('<option value="'+results.rows.item(i).id+'" selected  >'+results.rows.item(i).name+'</option>');
																	}else{
																		$(companyList).append('<option value="'+results.rows.item(i).id+'" >'+results.rows.item(i).name+'</option>');
																	}
																	
																																
																	
																}	
																}catch(error){console.log(error);}													   		
														   }else{ 
														   		console.log("FALSE COM"); 
														   		console.log("filling companies table");
																
																var url = "http://"+contextURL+"/Spring/rest/service/userSrv/companyFill";
													    		
															    $.ajax({
															       			url: url,
																	        type: "GET",
																			async: true,
																			dataType: 'json',
																			cache : false,													         
																			success: function ( jsonResponse ) {
																					var companyList= document.getElementById("companyList");
														   		
																 					$(companyList).empty();	
																					 try{
																				          $.each(jsonResponse, function(index, value) { 		
																						          	if(value.name!='undefined'){       										          		
																						          			console.log("company name"+value.name);
																						          			if(value.id==companyId){
																						          				$(companyList).append('<option value="'+value.id+'" selected >'+value.name+'</option>');
																						          				controlDB.companyArray[index] = new Company(value.name,value.id);	
																						          			}else {
																						          				$(companyList).append('<option value="'+value.id+'" >'+value.name+'</option>');
																						          				controlDB.companyArray[index] = new Company(value.name,value.id);
																						          			}																												 																																								
																									}																						 									       					
																							});		
																						}catch(error){console.log("ERROR filling companies")};																	
																						db.transaction(controlDB.queryInsertCompanies, controlDB.errorCB);		
																				}
																	});	
																	console.log("end filling companies table");		
														   }
														 }, null);
													});
													return false;
												},											
												fillClient: function(){
													if(!window.navigator.onLine){
														console.log("No internet...");
														navigator.notification.alert(Translation.getText(10));  
														return;
													}												
													controlDB._clientfilled = controlDB.checkClientFilled();
													$(document).unbind('pagechange');													
												},
												fillCategories: function(){
													if(!window.navigator.onLine){
														console.log("No internet...");
														navigator.notification.alert(Translation.getText(10));  
														return;
													}
													controlDB._categoryfilled = controlDB.checkCategoryFilled();																																											
																											
												},
												fillCompanies: function(){
													if(!window.navigator.onLine){
														console.log("No internet...");
														navigator.notification.alert(Translation.getText(10));  
														return;
													}
													 controlDB.checkCompanyFilled();	
												},
												fillNotificacions: function(){
													if(!window.navigator.onLine){
														console.log("No internet...");
														navigator.notification.alert(Translation.getText(10));  
														return;
													}
													 controlDB.checkNotificacions();	
												},
												queryInsertUsers: function(tx) {
													console.log("Inserting clients "+controlDB.clientArray.length);
													try{
														for(i=0;i<controlDB.clientArray.length;i++){	
															if(typeof controlDB.clientArray[i]==='undefined' || typeof controlDB.clientArray[i].getName()==='undefined' ){
																console.log("client list undefined");
																
															}else{
																var query = 'INSERT INTO CLIENTS (name,role) VALUES ("'+controlDB.clientArray[i].getName()+'","'+controlDB.clientArray[i].getRole()+'")';
																console.log(query+"   ::"+i);										
																tx.executeSql(query);
															}
														}
													}catch(error){console.log("error creating table clients");}
													console.log("clients inserted");	
												},
												queryInsertCategories: function(tx) {
													console.log("Inserting categories "+controlDB.categoryArray.length);
													try{
														for(i=0;i<controlDB.categoryArray.length;i++){	
															if(typeof controlDB.categoryArray[i]==='undefined' || typeof controlDB.categoryArray[i].getName()==='undefined' ){
																console.log("category list undefined");																
															}else{
																var query = 'INSERT INTO CATEGORY (name,type,supername,id) VALUES ("'+controlDB.categoryArray[i].getName()+'","'+controlDB.categoryArray[i].getType()+'","'+controlDB.categoryArray[i].getSuperName()+'","'+controlDB.categoryArray[i].getId()+'")';
																console.log(query+"   ::"+i);										
																tx.executeSql(query);
															}
														}
													}catch(error){console.log("error creating table category");}
													console.log("categories inserted");	
												},
												queryInsertCompanies: function(){
													console.log("Inserting companies "+controlDB.companyArray.length);
													try{
														for(i=0;i<controlDB.companyArray.length;i++){	
															if(typeof controlDB.companyArray[i]==='undefined' || typeof controlDB.companyArray[i].getName()==='undefined' ){
																console.log("company list undefined");																
															}else{
																var query = 'INSERT INTO COMPANY (name,id) VALUES ("'+controlDB.companyArray[i].getName()+'","'+controlDB.companyArray[i].getId()+'")';
																console.log(query+"   ::"+i);										
																tx.executeSql(query);
															}
														}
													}catch(error){console.log("error creating table company");}
													console.log("companies inserted");
												},
												queryInsertNotif: function(tx){
													console.log("Inserting notif "+controlDB.notifArray.length);
													try{
														for(i=0;i<controlDB.notifArray.length;i++){	
															if(typeof controlDB.notifArray[i]==='undefined' || typeof controlDB.notifArray[i].getNotif()==='undefined' ){
																console.log("notif list undefined");																
															}else{
															
																var query = 'INSERT INTO NOTIFICACIONS (id,notif,date,username1,username2,sent,recieved) VALUES ("'+controlDB.notifArray[i].getId()+'","'+controlDB.notifArray[i].getNotif()+'","'+controlDB.notifArray[i].getDate()+'","'+controlDB.notifArray[i].getUser1()+'","'+controlDB.notifArray[i].getUser2()+'","'+controlDB.notifArray[i].getSent()+'","'+controlDB.notifArray[i].getRecieved()+'")';
																
																									
																tx.executeSql(query);
															}
														}
													}catch(error){console.log("error creating table notif");}
													console.log("notif inserted");
												},
												queryDeleteCategory: function(tx) {
													console.log("Delete category ");
													try{
														for(i=0;i<controlDB.categoryArray.length;i++){	
															if(typeof controlDB.categoryArray[i]==='undefined' || typeof controlDB.categoryArray[i].getName()==='undefined' ){
																console.log("category list undefined");																
															}else{
																var query = 'DELETE FROM CATEGORY WHERE id="'+controlDB.categoryArray[i].getId()+'"';
																console.log(query+"   ::"+i);										
																tx.executeSql(query);
															}
														}
													}catch(error){console.log("error deleting category");}
													console.log("category deleted");	
												},
												queryDeleteCompany: function(){
														console.log("Delete company ");
													try{
														for(i=0;i<controlDB.companyArray.length;i++){	
															if(typeof controlDB.companyArray[i]==='undefined' || typeof controlDB.companyArray[i].getName()==='undefined' ){
																console.log("category list undefined");																
															}else{
																var query = 'DELETE FROM COMPANY WHERE id="'+controlDB.companyArray[i].getId()+'"';
																console.log(query+"   ::"+i);										
																tx.executeSql(query);
															}
														}
													}catch(error){console.log("error deleting category");}
													console.log("company deleted");
												},
												querySelectNotifPrivates: function(user){
														console.log("get privates notif "+user);
														var notifPriveList= document.getElementById("notifPriveList");
														$(notifPriveList).empty();
														db.transaction(function (tx) {
															var url='SELECT * FROM NOTIFICACIONS WHERE username1="'+user+'" or username2="'+user+'"';
															tx.executeSql(url, [], function (tx, results) {
															   var len = results.rows.length;
															   console.log("Num regiestres de private notif::"+len);
															   var companyId = window.localStorage.getItem("user.companyId");
															   if(parseInt(len)>0){
																	try{
																	 for (var i=0; i<len; i++){																															
																		if(results.rows.item(i).username2==user){
																			if(results.rows.item(i).recieved=='true'){
																				$(notifPriveList).append('<li class="notifpriveFromMe"  >'+results.rows.item(i).notif+' &nbsp; ("'+results.rows.item(i).date+'") !!</li>');																			
																			}else{
																				$(notifPriveList).append('<li class="notifpriveFromMe"  >'+results.rows.item(i).notif+' &nbsp; ("'+results.rows.item(i).date+'") !</li>');																			
																			}
																			
																		}else{
																			$(notifPriveList).append('<li class="notifpriveToMe"  >'+results.rows.item(i).notif+' &nbsp; ("'+results.rows.item(i).date+'")</li>');
																		}																																																																				
																	}	
																	}catch(error){console.log(error);}		
															   }
															});
														});
														
													console.log("private notes printed");
												},
											}