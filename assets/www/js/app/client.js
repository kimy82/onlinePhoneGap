  var controlClient={
						      						_init: function(){
						      							this._self=this;
														this.client=null;
						      						},											
													createClient: function(name){
														controlClient.client = new Client(name);	
													},
												}