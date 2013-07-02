      var controlProduct={
						      						_init: function(){
						      							this._self=this;
														this._category="";
														this._subcategory="";
														this._subsubcategory="";
														this._id="";
														this.idSrcImg="";
														this.product=null;
														this.productlenght=0;
														this.arrayProductIds= new Array();
														this.positionSelected=0;
						      						},
													changeCategory: function(){
														var categoryObj = document.getElementById("categoryProductList");
														var category=$(categoryObj).val();
														controlProduct._category=category;																							
														var categorySubList= document.getElementById("categoryProductSubList");
														var categorySubSubList= document.getElementById("categoryProductSubSubList");
														$(categorySubList).empty();
														$(categorySubSubList).empty();
														$(categorySubList).append('<option value="standard"  data-placeholder="true" >...</option>');
														$(categorySubSubList).append('<option value="standard"  data-placeholder="true" >...</option>');
														controlCategory._selectSubCategory(category,'categoryProductSubList');		
													},
													changeSubCategory: function(){
														var subCategoryObj = document.getElementById("categoryProductSubList");
														var subCategory=$(subCategoryObj).val();
														controlProduct._subcategory=subCategory;
																																	
														var categorySubSubList= document.getElementById("categoryProductSubSubList");
														$(categorySubSubList).empty();
														$(categorySubSubList).append('<option value="standard"  data-placeholder="true" >...</option>');
														controlCategory._selectSubSubCategory(subCategory,'categoryProductSubSubList');
													},
													changeSubSubCategory: function(){
														var subsubCategoryObj = document.getElementById("categoryProductSubSubList");
														var subsubCategory=$(subsubCategoryObj).val();
														controlProduct._subsubcategory=subsubCategory;
													},	
													resave: function(){
														var htmlProduct = document.getElementById('previewProduct').innerHTML;
														var companyId = window.localStorage.getItem("user.companyId");
														var cat= controlProduct._category;
														var subcat= controlProduct._subcategory;
														var subsubcat= controlProduct._subsubcategory;
														var productId= controlProduct._id;
												
														var url = "http://"+contextURL+"/Spring/rest/service/userSrv/resaveProduct?htmlProduct="+htmlProduct+"&companyId="+companyId+"&cat="+cat+"&subcat="+subcat+"&subsubcat="+subsubcat+"&productId="+productId;
													    	
															    $.ajax({
															       			url: url,
																	        type: "GET",
																			async: true,
																			dataType: 'json',
																			cache : false,													         
																			success: function ( jsonResponse ) {
																					
																					if(jsonResponse.ok=='ok'){																						 
																						 alert("PRODUCT SAVED");																						  	 
																					}																																																					
																				}
																	});
													},
													create: function(){
														
														var companyId = window.localStorage.getItem("user.companyId");
														var cat= controlProduct._category;
														var subcat= controlProduct._subcategory;
														var subsubcat= controlProduct._subsubcategory;
														var name = document.getElementById("newProduct").value;
														var idiomaObj = document.getElementById("select-idioma-p1");
														var idioma=$(idiomaObj).val();
														
												
														var url = "http://"+contextURL+"/Spring/rest/service/userSrv/createProduct?companyId="+companyId+"&cat="+cat+"&subcat="+subcat+"&subsubcat="+subsubcat+"&idioma="+idioma+"&name="+name;
													    	
															    $.ajax({
															       			url: url,
																	        type: "GET",
																			async: true,
																			dataType: 'json',
																			cache : false,													         
																			success: function ( jsonResponse ) {
																					
																					if(jsonResponse.ok=='ok'){		
																						 controlProduct._id=jsonResponse.id;
																						  $('#addFotoProduct1').button('enable');		
																						 $('#addFotoProduct2').button('enable');
																						 alert("PRODUCT CREATED");																						  	 
																					}																																																					
																				}
																	});
													},
													captureImage: function(id){
														controlProduct.idSrcImg=id;
														navigator.device.capture.captureImage(controlProduct._captureSuccess, controlProduct._captureError, {limit: 1});
													},
													_captureError: function(error) {
														var msg = 'An error occurred during capture: ' + error.code;
														navigator.notification.alert(msg, null, 'Uh oh!');
													},
													_captureSuccess: function(mediaFiles) {
														var i;
														var len;
													
														for (i = 0, len = mediaFiles.length; i < len; i += 1) {
															controlProduct._uploadFile(mediaFiles[i]);
														}       
													},	
													_uploadFile: function(mediaFile) {
														var ft = new FileTransfer();
														var	path = mediaFile.fullPath;
														var	name = mediaFile.name;
														
														var companyId= window.localStorage.getItem("user.companyId");
														
														
														
														var idProduct = controlProduct._id;
														
														var id = controlProduct.idSrcImg;
														document.getElementById(id).src=path;
														
														ft.upload(path,
															"http://"+contextURL+"/Spring/rest/service/userSrv/uploadFotoProduct?id="+id+"&idProduct="+idProduct,
															function(result) {
																console.log('Upload success: ' + result.responseCode);
																console.log(result.bytesSent + ' bytes sent');
															},
															function(error) {
																console.log('Error uploading file ' + path + ': ' + error.code);
															},
															{ fileName: name });   
													},
													getCatalegHTML: function(){
														var companyId = window.localStorage.getItem("user.companyId");
												
												   
														var url = "http://"+contextURL+"/Spring/rest/service/userSrv/htmlCataleg?companyId="+companyId;
													    	
															    $.ajax({
															       			url: url,
																	        type: "GET",
																			async: true,
																			dataType: 'json',
																			cache : false,													         
																			success: function ( jsonResponse ) {
																			try{
																						 controlDB.productArray= new Array();																				
																						 $.each(jsonResponse, function(index, value) {
																							alert("aaaa");
																						     controlProduct.productlenght=controlProduct.productlenght+1;
																							 controlProduct.arrayProductIds[index]=value.id;
																							if(index==0){
																								document.getElementById('htmlCataleg').innerHTML=value.html;
																								controlProduct.product= new Product(value.name,value.html,value.id,companyId);
																								controlProduct.positionSelected=0;
																								alert("1111");
																							}
																							var product = new Product(value.name,value.html,value.id,companyId);
																							controlDB.productArray[index]=product;
																							alert("bbb");
																						 });
																						 controlDB.fillProducts();
																						//alert("posant html"+jsonResponse.html);																					
																					}catch (error){console.log("ERROR: "+error)}	 																				  	 
																																																																									
																			}
																	});	
													},		
													getNext: function(){
														if(controlProduct.product!=null){
															
															
															if(controlProduct.positionSelected!=controlProduct.productlenght){
																controlProduct.positionSelected= controlProduct.positionSelected+1;
															}else{
																controlProduct.positionSelected=0;
															}
															
															 var produc = controlDB.getProduct(controlProduct.arrayProductIds[controlProduct.positionSelected]);
															 alert(produc);
															if(produc!=null){
																controlProduct.product=produc;
																document.getElementById('htmlCataleg').innerHTML=controlProduct.product.getHtml;															
															}
															
															
														}
													},
													getPrevious: function(){
														if(controlProduct.product!=null){
															if(controlProduct.positionSelected!=0){
																controlProduct.positionSelected= controlProduct.positionSelected-1;
															}else{
																controlProduct.positionSelected=controlProduct.productlenght;
															}
															 
															var produc = controlDB.getProduct(controlProduct.arrayProductIds[controlProduct.positionSelected]);
															if(produc!=null){
																controlProduct.product=produc;
																document.getElementById('htmlCataleg').innerHTML=controlProduct.product.getHtml;
															}
															
														}
													},
						      }