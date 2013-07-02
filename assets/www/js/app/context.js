	var contextURL="10.0.2.2:9090";
	//var contextURL="77.228.245.51";
	
	function changeColumnNoSlider1(event) {
			try{	
              var val = event.target.value;     
				if(typeof val === 'undefined'){
				 val = document.getElementById('range1').value;
				}
				//alert("change 1 div"+val);			  
              var el = document.getElementById('columns-no-example1');
              el.style.webkitColumnCount = val;
              el.style.MozColumnCount = val;
				//alert("change div end");
				}catch(error){alert(error);}
            }
	function changeColumnNoSlider2(event) {
				try{
              var val = event.target.value;    
				if(typeof val === 'undefined'){
				 val = document.getElementById('range2').value;
				}			  
				//alert("change 2 div"+val);			  
              var el = document.getElementById('columns-no-example2');
              el.style.webkitColumnCount = val;
              el.style.MozColumnCount = val;
				//alert("change div end");
				}catch(error){alert(error);}
            }
		function changeColumnNoSlider_p1(event) {
			try{	
              var val = event.target.value;     
				if(typeof val === 'undefined'){
				 val = document.getElementById('range1').value;
				}
				//alert("change 1 div"+val);			  
              var el = document.getElementById('columns-no-example-p1');
              el.style.webkitColumnCount = val;
              el.style.MozColumnCount = val;
				//alert("change div end");
				}catch(error){alert(error);}
            }
	function changeColumnNoSlider_p2(event) {
				try{
              var val = event.target.value;    
				if(typeof val === 'undefined'){
				 val = document.getElementById('range2').value;
				}			  
				//alert("change 2 div"+val);			  
              var el = document.getElementById('columns-no-example-p2');
              el.style.webkitColumnCount = val;
              el.style.MozColumnCount = val;
				//alert("change div end");
				}catch(error){alert(error);}
            }
	function changeBoxOrient(event) {
				
              var el = document.getElementById('box-orient-example');
              el.style.webkitBoxOrient = event.target.value;
              el.style.MozBoxOrient = event.target.value; 
			
            }
	function changeBoxSpace(event){
			
			 var el = document.getElementById('columns-no-example');
			 el.style['-webkit-box-flex']=event.target.value;
			 el.style['-moz-box-flex']=event.target.value;			 
			
	}
	function resizeIMG(idIMG, self){
			  try{
				  var el = document.getElementById(idIMG);
				 // alert(el);
				  //alert(el.width);
				 // alert(el.style.width);
				  el.style.width = self.value;
				   el.width = self.value;
			  }catch(error){alert(error);}
           
	}
	
	function changeBoxPack(event) {
                var el = document.getElementById('two');
                el.style.webkitBoxPack = event.target.value;
                el.style.MozBoxPack = event.target.value; 
    }
	
	function changeBoxAlign(event) {
                var el = document.getElementById('two');
                el.style.webkitBoxAlign = event.target.value;
                el.style.MozBoxAlign = event.target.value; 
     }