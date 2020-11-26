

$(document).ready(function(){
    
    $("#myform").on('submit',function(e){
        e.preventDefault();
        
        //alert("ok")

        getLocation();
        
       
        function getLocation(){
            //alert("g")
            if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition(displayPosition,showError);
             } else {
                      alert("Geolocation is not supported by this browser");
                  }
        }
      
        function displayPosition(position) {
            //alert("d");
            $.post("",
            {
                username:$("#user-name").val(),
                userlat:position.coords.latitude,
                userlong:position.coords.longitude,
            },
            function(data, status){
              $("#success_alert").html("")
              if(data.registerError!=undefined){
                  if(data.registerError.userlat!=undefined || data.registerError.userlong!=undefined){
                  $("#success_alert").append("<strong>Error</strong>Make Location");
                  }else if(data.registerError.username!=undefined){
                    $("#success_alert").append("<strong>Error</strong>"+data.registerError.username.msg);
                  }


              }else if(data.success!=undefined){
                $("#success_alert").append("<strong>Success</strong>Successfuly saved");
              }
              //alert();

            });
                  
             //console.log(formData);
             
            
        }


        function showError(error) {
          switch(error.code) {
            case error.PERMISSION_DENIED:
              alert("Enabale access of your location")
              break;
            case error.POSITION_UNAVAILABLE:
              alert("Location information is unavailable")
              break;
            case error.TIMEOUT:
              alert("The request to get user location timed out")
              break;
            case error.UNKNOWN_ERROR:
              alert("An unknown error occurred")
              break;
          }
        }
        


//console.log(formData);
  
        
        


      });


})
