						function Client(name,role) {
								var _self=this;
								this.name= name;
								this.role=role;
								this.getName = function(){
									return _self.name;
								}
								this.getRole = function(){
									return _self.role;
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
							
							 function Product(name,html,id,company) {
								var _self=this;
								this.name= name;						
								this.id=id;
								this.html=html;
								this.company= company;
								
								this.getName = function(){
									return _self.name;
								}								
								this.getId = function(){
									return _self.id;
								}
								this.getHtml = function(){
									return _self.html;
								}
								this.getCompany = function(){
									return _self.company;
								}
							}
							
							
							
							 function Notificacions(notif,id,user1,user2,date,sent,recieved) {
								var _self=this;
								this.notif= notif;						
								this.id=id;
								this.user1=user1;
								this.user2=user2;
								this.date=date;
								this.sent=sent
								this.recieved=recieved;
								
								this.getNotif = function(){
									return _self.notif;
								}								
								this.getId = function(){
									return _self.id;
								}
								this.getUser1 = function(){
									return _self.user1;
								}
								this.getUser2 = function(){
									return _self.user2;
								}
								this.getDate = function(){
									return _self.date;
								}
								this.getSent = function(){
									return _self.sent;
								}
								this.getRecieved = function(){
									return _self.recieved;
								}
							}