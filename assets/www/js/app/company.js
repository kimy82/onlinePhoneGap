	var controlCompany ={
											_init: function(){
												this._self= this;
												this.id='companyImg1';
											},
											changeCompany: function(){
												var companyObj = document.getElementById("companyList");
												var companyId=$(companyObj).val();
												var companyName= $(companyObj).text();
												
												window.localStorage.setItem("user.companyName",companyName);
												window.localStorage.setItem("user.companyId",companyId);
											},
											deleteCompany: function(){
													var companyObj = document.getElementById("companyList");
													var companyId=$(companyObj).val();
													var url = "http://"+contextURL+"/Spring/rest/service/userSrv/deleteCompany?companyId="+companyId;
													    	
															    $.ajax({
															       			url: url,
																	        type: "GET",
																			async: true,
																			dataType: 'json',
																			cache : false,													         
																			success: function ( jsonResponse ) {
																					//Borrar del la BBDD i treure com a opcio	
																					if(jsonResponse.ok=='ok'){
																						 controlDB.companyArray=new Array();
													 								 	 controlDB.companyArray[0]=new Company("",companyId);
													 								 	 db.transaction(controlDB.queryDeleteCompany, controlDB.errorCB);
													 								 	 //alert("cat del::"+companyId);
																					  	 $("#companyList option[value="+companyId+"]").remove();
																					  	 var el = $('#companyList');
																						$(companyList).append('<option value="standard"  data-placeholder="true" >...</option>');
																						// Select the relevant option, de-select any others
																						el.val('standard').attr('selected', true).siblings('option').removeAttr('selected');

																						// Initialize the selectmenu
																						el.selectmenu();
																						// jQM refresh
																						el.selectmenu("refresh", true);
																						
																						alert("ESCULL UNA COMPANY");
																							
																					  	 
																					}																																																					
																				}
																	});	
											
											},
											createCompany: function(){
													
													var name = document.getElementById("newCompany").value;	
													var url = "http://"+contextURL+"/Spring/rest/service/userSrv/creaCompany?name="+name;
													    	
															    $.ajax({
															       			url: url,
																	        type: "GET",
																			async: true,
																			dataType: 'json',
																			cache : false,													         
																			success: function ( jsonResponse ) {
																					//Borrar del la BBDD i treure com a opcio	
																					if(jsonResponse.ok=='ok'){
																						 var companyList= document.getElementById("companyList");
																						 $(companyList).append('<option value="'+jsonResponse.id+'" >'+name+'</option>');
																						 var el = $('#companyList');
																						 el.val(jsonResponse.id).attr('selected', true).siblings('option').removeAttr('selected');
																						 el.selectmenu();																						
																						 el.selectmenu("refresh", true);
																						 controlDB.companyArray=new Array();
														 								 controlDB.companyArray[0]=new Company(name,jsonResponse.id);
														 								 db.transaction(controlDB.queryInsertCompanies, controlDB.errorCB);
																						 $('#addFotoCompany1').button('enable');		
																						 $('#addFotoCompany2').button('enable');
																						 controlCompany.changeCompany();
																						 alert("COMPANY CREATED");	
																					  	 
																					}																																																					
																				}
																	});	
											},
											resave: function(){
												var htmlCompany = document.getElementById('previewCompany').innerHTML;
												var companyId = window.localStorage.getItem("user.companyId");
												
												alert(htmlCompany);
													var url = "http://"+contextURL+"/Spring/rest/service/userSrv/resaveCompany?htmlCompany="+htmlCompany+"&companyId="+companyId;
													    	
															    $.ajax({
															       			url: url,
																	        type: "GET",
																			async: true,
																			dataType: 'json',
																			cache : false,													         
																			success: function ( jsonResponse ) {
																					
																					if(jsonResponse.ok=='ok'){																						 
																						 alert("COMPANY SAVED");																						  	 
																					}																																																					
																				}
																	});	
											},
											getCompanyHTML: function(){
													var companyId = window.localStorage.getItem("user.companyId");
												
												   
													var url = "http://"+contextURL+"/Spring/rest/service/userSrv/htmlCompany?companyId="+companyId;
													    	
															    $.ajax({
															       			url: url,
																	        type: "GET",
																			async: true,
																			dataType: 'json',
																			cache : false,													         
																			success: function ( jsonResponse ) {
																					
																					if(jsonResponse.ok=='ok'){	
																						//alert("posant html"+jsonResponse.html);																					
																						 document.getElementById('htmlCompany').innerHTML=jsonResponse.html;																				  	 
																					}																																																					
																			}
																	});	
											},
											captureImage: function(id){
													controlCompany.id=id;
												   navigator.device.capture.captureImage(controlCompany._captureSuccess, controlCompany._captureError, {limit: 1});
											},
											_captureError: function(error) {
												var msg = 'An error occurred during capture: ' + error.code;
												navigator.notification.alert(msg, null, 'Uh oh!');
											},
											_captureSuccess: function(mediaFiles) {
													var i;
													var len;
												
													for (i = 0, len = mediaFiles.length; i < len; i += 1) {
														controlCompany._uploadFile(mediaFiles[i]);
													}       
											},	
											_uploadFile: function(mediaFile) {
												var ft = new FileTransfer();
												var	path = mediaFile.fullPath;
												var	name = mediaFile.name;
												
												var companyId= window.localStorage.getItem("user.companyId");
												
												document.getElementById(controlCompany.id).src=path;
												
												ft.upload(path,
													"http://"+contextURL+"/Spring/rest/service/userSrv/uploadFoto?companyId="+companyId+"&id="+controlCompany.id,
													function(result) {
														console.log('Upload success: ' + result.responseCode);
														console.log(result.bytesSent + ' bytes sent');
													},
													function(error) {
														console.log('Error uploading file ' + path + ': ' + error.code);
													},
													{ fileName: name });   
											}						
											
						}
