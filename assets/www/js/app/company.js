	var controlCompany ={
											_init: function(){
												this._self= this;
											},
											changeCompany: function(){
												var companyObj = document.getElementById("categoryList");
												var companyId=$(companyObj).val();
												var companyName= $(companyObj).text();
												
												window.localStorage.setItem("user.companyName",companyName);
												window.localStorage.setItem("user.companyId",companyId);
											},
											deleteCompany: function(){
													var companyObj = document.getElementById("companyList");
													var companyId=$(companyObj).val();
													var url = "http://10.0.2.2:9090/Spring/rest/service/userSrv/deleteCompany?companyId="+companyId;
													    	
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
													 								 	 alert("cat del::"+companyId);
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
													var url = "http://10.0.2.2:9090/Spring/rest/service/userSrv/creaCompany?name="+name;
													    	
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
																						 controlDB.companyArray=new Array();
														 								 controlDB.companyArray[0]=new Company(name,jsonResponse.id);
														 								 db.transaction(controlDB.queryInsertCompanies, controlDB.errorCB);
																						 alert("COMPANY CREATED");	
																					  	 
																					}																																																					
																				}
																	});	
											},
						}	