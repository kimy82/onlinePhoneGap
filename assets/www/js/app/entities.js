		  function Client(name) {
								var _self=this;
								this.name= name;
								this.getName = function(){
									return _self.name;
								}
							}
							
						 function Category(name,type,supername,id) {
								var _self=this;
								this.name= name;
								this.type=type;
								this.id=id;
								this.supername=supername;
								this.getName = function(){
									return _self.name;
								}
								this.getType = function(){
									return _self.type;
								}
								this.getSuperName = function(){
									return _self.supername;
								}
								this.getId = function(){
									return _self.id;
								}
							}
							
							 function Company(name,id) {
								var _self=this;
								this.name= name;						
								this.id=id;
								
								this.getName = function(){
									return _self.name;
								}								
								this.getId = function(){
									return _self.id;
								}
							}