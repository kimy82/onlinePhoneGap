	//var contextURL="10.0.2.2:9090";
	var contextURL="77.228.245.51";
	
	function changeColumnNoSlider1(event) {
				
              var val = event.target.value;     
				//alert("change div"+val);			  
              var el = document.getElementById('columns-no-example1');
              el.style.webkitColumnCount = val;
              el.style.MozColumnCount = val;
				//alert("change div end");
            }
	function changeColumnNoSlider2(event) {
				
              var val = event.target.value;     
				//alert("change div"+val);			  
              var el = document.getElementById('columns-no-example2');
              el.style.webkitColumnCount = val;
              el.style.MozColumnCount = val;
				//alert("change div end");
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