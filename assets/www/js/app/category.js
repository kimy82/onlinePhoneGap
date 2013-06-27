	   var controlCategory={
						      						_init: function(){
						      							this._self=this;
						      						},	
						      						_resultatsSubCat: null,		
						      						_resultatsSubSubCat: null,				      						
											      	changeCategory: function(){
											      		var categoryObj = document.getElementById("categoryList");
														var category=$(categoryObj).val();
														var obj = document.getElementById("newSubCat");
														if(category=='standard'){
															$(obj).textinput('disable');	
															return;
														}
														$(obj).textinput('enable');																									
														var categorySubList= document.getElementById("categorySubList");
														var categorySubSubList= document.getElementById("categorySubSubList");
														$(categorySubList).empty();
														$(categorySubSubList).empty();
														$(categorySubList).append('<option value="standard"  data-placeholder="true" >...</option>');
														$(categorySubSubList).append('<option value="standard"  data-placeholder="true" >...</option>');
														controlCategory._selectSubCategory(category);																																												
																												      		
											      	},
											      	changeSubCategory: function(){											      
														var subCategoryObj = document.getElementById("categorySubList");
														var subCategory=$(subCategoryObj).val();
														var obj = document.getElementById("newSubSubCat");	
														if(subCategory=='standard'){
															$(obj).textinput('disable');				
															return;
														}
														
														$(obj).textinput('enable');																				
														var categorySubSubList= document.getElementById("categorySubSubList");
														$(categorySubSubList).empty();
														$(categorySubSubList).append('<option value="standard"  data-placeholder="true" >...</option>');
														controlCategory._setSubSubCategories(subCategory);
											      		
											      	},
											      	_selectSubCategory: function(category){
											      		db.transaction(function (tx) {
											      		   var sql='SELECT * FROM CATEGORY where type="N1" and supername="'+category+'"';
											      		   console.log("SQL sub cat::"+sql);
														   tx.executeSql(sql, [], function (tx, results) {
														   	   var categorySubList= document.getElementById("categorySubList");
														   	   console.log("sub categories"+results.rows);
														   	   console.log("sub categories lenght"+results.rows);
															   controlCategory._resultatsSubCat=results;
															   console.log("result sub::"+controlCategory._resultatsSubCat);
																if(controlCategory._resultatsSubCat==null){console.log("Null list of subcategories"); return;}
																
																var len = controlCategory._resultatsSubCat.rows.length;
																console.log("len of SUB:"+len);
																try{
																 for (var i=0; i<len; i++){																															
																	console.log("resultats sub cat iteracio:: "+controlCategory._resultatsSubCat.rows);
																	$(categorySubList).append('<option value="'+controlCategory._resultatsSubCat.rows.item(i).id+'" >'+controlCategory._resultatsSubCat.rows.item(i).name+'</option>');															
																	controlCategory._setSubSubCategories(controlCategory._resultatsSubCat.rows.item(i).name);
																}	
																}catch(error){console.log(error);}	
															   													   
															 },controlCategory.errorCB);
														});																							      	
											      	},
											      	_selectSubSubCategory: function(subcategory){
											      		db.transaction(function (tx) {
											      			var sql='SELECT * FROM CATEGORY where type="N2" and supername="'+subcategory+'"';
											      		   console.log("SQL subsub cat::"+sql);
														   tx.executeSql(sql, [], function (tx, results) {
														   		console.log("subsub categories"+results.rows);
														   		console.log("subsub categories lenght"+results.rows);
															 	controlCategory._resultatsSubSubCat=results;
															 	console.log("result subsub::"+controlCategory._resultatsSubSubCat);
															
																if(controlCategory._resultatsSubSubCat==null){console.log("Null list of subsubcategories"); return;}
																
																var len = controlCategory._resultatsSubSubCat.rows.length;
																
																var categorySubSubList= document.getElementById("categorySubSubList");
																 for (var i=0; i<len; i++){																															
																	console.log("resultats subsub cat iteracio:: "+controlCategory._resultatsSubSubCat.rows);
																	$(categorySubSubList).append('<option value="'+controlCategory._resultatsSubSubCat.rows.item(i).id+'" >'+controlCategory._resultatsSubSubCat.rows.item(i).name+'</option>');																															
																}		
															 }, controlCategory.errorCB);
														});												
											      	},											    
											      	_setSubSubCategories: function(name){
											      		//get subsubcategories of subcategory
											      		console.log("agafem subsubcategiries from"+name);														
														controlCategory._selectSubSubCategory(name);																																																							
														console.log("END: agafem subsubcategiries");
											      	},
											      	errorCB: function(tx, err) {
												  		 console.log("Error creating client table SQL: "+err);
													},
													createCat: function(){
														
													 	var nameCat = document.getElementById("newCat").value;													 	
													 	var companyId = window.localStorage.getItem("user.companyId");
														var url = "http://"+contextURL+"/Spring/rest/service/userSrv/createCategory?companyId="+companyId+"&name="+nameCat;
													    	
															    $.ajax({
															       			url: url,
																	        type: "GET",
																			async: true,
																			dataType: 'json',
																			cache : false,													         
																			success: function ( jsonResponse ) {
																					//alert(jsonResponse.ok+"    ::   "+jsonResponse.id);
																				if(jsonResponse.ok=='ok'){
																						
																					 var categoryList= document.getElementById("categoryList");
																					 $(categoryList).append('<option value="'+jsonResponse.id+'" >'+nameCat+'</option>');
																					 controlDB.categoryArray=new Array();
													 								 controlDB.categoryArray[0]=new Category(nameCat,"N0","null",jsonResponse.id);
													 								 db.transaction(controlDB.queryInsertCategories, controlDB.errorCB);	
																				}																																																									
																			}
																	});	
													},
													createSubCat: function(){
														var categoryObj = document.getElementById("categoryList");
														var nameCat=$(categoryObj).val();
													
														var nameSubCat = document.getElementById("newSubCat").value;														
													 	var companyId = window.localStorage.getItem("user.companyId");
														var url = "http://"+contextURL+"/Spring/rest/service/userSrv/createSubCategory?companyId="+companyId+"&name="+nameSubCat+"&namesuper="+nameCat;
													    	
															    $.ajax({
															       			url: url,
																	        type: "GET",
																			async: true,
																			dataType: 'json',
																			cache : false,													         
																			success: function ( jsonResponse ) {
																					//alert(jsonResponse.ok+"    ::   "+jsonResponse.id);
																					if(jsonResponse.ok=='ok'){
																					 var categorySubList= document.getElementById("categorySubList");
																					 $(categorySubList).append('<option value="'+jsonResponse.id+'" >'+nameSubCat+'</option>');
																					 controlDB.categoryArray=new Array();
													 								 controlDB.categoryArray[0]=new Category(nameSubCat,"N1",nameCat,jsonResponse.id);
													 								 db.transaction(controlDB.queryInsertCategories, controlDB.errorCB);
																					}																																																									
																				}
																	});		
													
													},		
													createSubSubCat: function(){														
														var categorySubObj = document.getElementById("categorySubList");
														var nameSubCat=$(categorySubObj).val();
														var nameSubSubCat = document.getElementById("newSubSubCat").value;														
														var companyId = window.localStorage.getItem("user.companyId");
														var url = "http://"+contextURL+"/Spring/rest/service/userSrv/createSubSubCategory?companyId="+companyId+"&name="+nameSubSubCat+"&namesuper="+nameSubCat;
													    	
															    $.ajax({
															       			url: url,
																	        type: "GET",
																			async: true,
																			dataType: 'json',
																			cache : false,													         
																			success: function ( jsonResponse ) {
																					//alert(jsonResponse.ok+"    ::   "+jsonResponse.id);
																					if(jsonResponse.ok=='ok'){
																					
																					 var categorySubSubList= document.getElementById("categorySubSubList");
																					 $(categorySubSubList).append('<option value="'+jsonResponse.id+'" >'+nameSubSubCat+'</option>');
																					 controlDB.categoryArray=new Array();
													 								 controlDB.categoryArray[0]=new Category(nameSubSubCat,"N2",nameSubCat,jsonResponse.id);
													 								 db.transaction(controlDB.queryInsertCategories, controlDB.errorCB);
																					}																																																									
																				}
																	});	
													},
													deleteSubSubCategory: function(){
														var categorySubSubObj = document.getElementById("categorySubSubList");
														var subsubcategory=$(categorySubSubObj).val();
													
														var url = "http://"+contextURL+"/Spring/rest/service/userSrv/deleteSubSubCategory?idSubSubCategory="+subsubcategory;
													    	
															    $.ajax({
															       			url: url,
																	        type: "GET",
																			async: true,
																			dataType: 'json',
																			cache : false,													         
																			success: function ( jsonResponse ) {
																					//Borrar del la BBDD i treure com a opcio
																					if(jsonResponse.ok=='ok'){
																						controlDB.categoryArray=new Array();
													 								 	 controlDB.categoryArray[0]=new Category("","N2","",subsubcategory);
													 								 	 db.transaction(controlDB.queryDeleteCategory, controlDB.errorCB);
													 								 	// alert("cat del::"+subsubcategory);
													 								 	 $("#categorySubSubList option[value="+subsubcategory+"]").remove();
													 								 	   var el = $('#categorySubSubList');

																						// Select the relevant option, de-select any others
																						el.val('standard').attr('selected', true).siblings('option').removeAttr('selected');

																						// Initialize the selectmenu
																						el.selectmenu();

																						// jQM refresh
																						el.selectmenu("refresh", true);
																						
																					}
																																																																													
																				}
																	});	
													},
													deleteSubCategory: function(){
														var categorySubObj = document.getElementById("categorySubList");
														var subcategory=$(categorySubObj).val();
													
														var url = "http://"+contextURL+"/Spring/rest/service/userSrv/deleteSubCategory?idSubCategory="+subcategory;
													    	
															    $.ajax({
															       			url: url,
																	        type: "GET",
																			async: true,
																			dataType: 'json',
																			cache : false,													         
																			success: function ( jsonResponse ) {
																					//Borrar del la BBDD i treure com a opcio	
																					if(jsonResponse.ok=='ok'){
																						controlDB.categoryArray=new Array();
													 								 	 controlDB.categoryArray[0]=new Category("","N1","",subcategory);
													 								 	 db.transaction(controlDB.queryDeleteCategory, controlDB.errorCB);
													 								 	// alert("cat del::"+subcategory);
													 								 	 $("#categorySubList option[value="+subcategory+"]").remove();
													 								 	 var el = $('#categorySubList');
																						// Select the relevant option, de-select any others
																						el.val('standard').attr('selected', true).siblings('option').removeAttr('selected');
																						// Initialize the selectmenu
																						el.selectmenu();
																						// jQM refresh
																						el.selectmenu("refresh", true);
																						//Delete from sub
																						controlDB.categoryArray=new Array();																																											
																					    $("#categorySubSubList option").each(function(i){
																					        alert($(this).text() + " : " + $(this).val());
																					        var id = $(this).val();
																					         if(id!='standard'){
																						        $("#categorySubSubList option[value="+id+"]").remove();
														 								 	 	controlDB.categoryArray[i]=new Category("","N2","",$(this).val());
													 								 	 	}
																					        
																					    });
																					     $(categorySubSubList).append('<option value="standard"  data-placeholder="true" >...</option>');
																					      var elsub = $('#categorySubSubList');
																						// Select the relevant option, de-select any others
																						elsub.val('standard').attr('selected', true).siblings('option').removeAttr('selected');
																						// Initialize the selectmenu
																						elsub.selectmenu();
																						// jQM refresh
																						elsub.selectmenu("refresh", true);
																					     db.transaction(controlDB.queryDeleteCategory, controlDB.errorCB);																					     
																					     var obj = document.getElementById("newSubSubCat");												
																						 $(obj).textinput('disable');				
														
																					}																																																					
																				}
																	});	
													},
													deleteCategory: function(){
														var categoryObj = document.getElementById("categoryList");
														var category=$(categoryObj).val();
													
														var url = "http://"+contextURL+"/Spring/rest/service/userSrv/deleteCategory?idCategory="+category;
													    	
															    $.ajax({
															       			url: url,
																	        type: "GET",
																			async: true,
																			dataType: 'json',
																			cache : false,													         
																			success: function ( jsonResponse ) {
																					//Borrar del la BBDD i treure com a opcio	
																					if(jsonResponse.ok=='ok'){
																						 controlDB.categoryArray=new Array();
													 								 	 controlDB.categoryArray[0]=new Category("","N0","",category);
													 								 	 db.transaction(controlDB.queryDeleteCategory, controlDB.errorCB);
													 								 	// alert("cat del::"+category);
																					  	 $("#categoryList option[value="+category+"]").remove();
																					  	 var el = $('#categoryList');

																						// Select the relevant option, de-select any others
																						el.val('standard').attr('selected', true).siblings('option').removeAttr('selected');

																						// Initialize the selectmenu
																						el.selectmenu();

																						// jQM refresh
																						el.selectmenu("refresh", true);
																						
																						//per el SUB
																						controlDB.categoryArray=new Array();																																											
																					    $("#categorySubList option").each(function(i){
																					       // alert($(this).text() + " : " + $(this).val());
																					        var id = $(this).val();
																					        if(id!='standard'){
																						        $("#categorySubList option[value="+id+"]").remove();
														 								 	 	controlDB.categoryArray[i]=new Category("","N1","",$(this).val());
													 								 	 	}
																					        
																					    });
																					    
																					      var elsub = $('#categorySubList');
																						// Select the relevant option, de-select any others
																						elsub.val('standard').attr('selected', true).siblings('option').removeAttr('selected');
																						// Initialize the selectmenu
																						elsub.selectmenu();
																						// jQM refresh
																						elsub.selectmenu("refresh", true);
																					     db.transaction(controlDB.queryDeleteCategory, controlDB.errorCB);
																					     
																					     //per el SUBSUB
																						controlDB.categoryArray=new Array();																																											
																					    $("#categorySubSubList option").each(function(i){
																					       // alert($(this).text() + " : " + $(this).val());
																					        var id = $(this).val();
																					        if(id!='standard'){
																						        $("#categorySubSubList option[value="+id+"]").remove();
														 								 	 	controlDB.categoryArray[i]=new Category("","N2","",$(this).val());
													 								 	 	}
																					        
																					    });
																					    
																					      var elsubsub = $('#categorySubSubList');
																						// Select the relevant option, de-select any others
																						elsubsub.val('standard').attr('selected', true).siblings('option').removeAttr('selected');
																						// Initialize the selectmenu
																						elsubsub.selectmenu();
																						// jQM refresh
																						elsubsub.selectmenu("refresh", true);
																					     db.transaction(controlDB.queryDeleteCategory, controlDB.errorCB);
																					     
																					        var objsubsub = document.getElementById("newSubSubCat");												
																						 $(objsubsub).textinput('disable');	
																						    var obj = document.getElementById("newSubCat");												
																						 $(obj).textinput('disable');	
																					  	 
																					}																																																					
																				}
																	});	
													},
											 }     	      
						