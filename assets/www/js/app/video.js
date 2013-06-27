var videoControl ={
							_init: function(){
								this._self= this;
							},
							captureSuccess: function(mediaFiles) {
						        var i, len;
						        for (i = 0, len = mediaFiles.length; i < len; i += 1) {
						            videoControl.uploadFile(mediaFiles[i]);
						        }       
						    },
						    captureError: function(error) {
						        var msg = 'Error during capture: ' + error.code;
						        navigator.notification.alert(msg, null, 'Uh oh!');
						    },
						     captureVideo: function() {
        						navigator.device.capture.captureVideo(videoControl.captureSuccess, videoControl.captureError, {limit: 1});
    						},
    						uploadFile: function(mediaFile) {
						        var ft = new FileTransfer();
						        var   path = mediaFile.fullPath;
						        var    name = mediaFile.name;
								alert(path);
								alert(name);
						        ft.upload(path,
						            "http://"+contextURL+"/Spring/rest/service/userSrv/video",
						            function(result) {
						                console.log('Subida correcta');						               
						            },
						            function(error) {
						                console.log('Error en la subida del fichero ' + path + ': ' + error.code);
						            },
						            { fileName: name });   
						    }
						}