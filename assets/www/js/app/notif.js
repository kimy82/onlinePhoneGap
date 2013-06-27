      var controlNotif={
						      						_init: function(){
						      							this._self=this;
														this.usertosent="";
						      						},
						      						getNotifPrivates: function(user){
														controlDB.usertosent=user;
														controlDB.querySelectNotifPrivates(user);
														
													},
													enviaNotif: function(){
														var value = document.getElementById('newNotif').value;
														var notifPriveList= document.getElementById("notifPriveList");
														$(notifPriveList).append('<li id="lid" class="notifuser2"  >'+value+'&nbsp;('+controlDB.usertosent+')</li>');
														var user = window.localStorage.getItem("user.username");
														var url = "http://"+contextURL+"/Spring/rest/service/userSrv/sentNotif?user="+user+"&userTo="+controlDB.usertosent+"&notif="+value;
													    		
															    $.ajax({
															       			url: url,
																	        type: "GET",
																			async: true,
																			dataType: 'json',
																			cache : false,													         
																			success: function ( jsonResponse ) {
																							
																						if(jsonResponse.ok=='ok'){
																						$("#lid").remove();
																						$(notifPriveList).append('<li class="notifuser2"  >'+jsonResponse.notif+'&nbsp;('+jsonResponse.date+' &nbsp; '+controlDB.usertosent+') !</li>');
																						controlDB.notifArray= new Array();
																						controlDB.notifArray[0]= new Notificacions(jsonResponse.notif,jsonResponse.id,jsonResponse.user1,jsonResponse.user2,jsonResponse.date,jsonResponse.sent,jsonResponse.recieved);																							          																													 																																							
																						db.transaction(controlDB.queryInsertNotif, controlDB.errorCB);	
																						}																						
																				}
																	});	
													},
						      }