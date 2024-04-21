function validform(){  
    var email=document.myform.email.value;  
    var password=document.myform.password.value;
    
     if(email == "" || password == ""){ 
        alert("All Fields Are Mandatory");
        return false;  
      }else{
        alert("Successfully Registerd")
      }
  }
  
  
  