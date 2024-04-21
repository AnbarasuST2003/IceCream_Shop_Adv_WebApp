function validateform(){  
    var name=document.myform.name.value;  
    var password=document.myform.password.value;
    var repassword=document.myform.repassword.value;
    var email = document.myform.email.value;
    
    
      if (name=="" || email=="" || password=="" || repassword==""){ 
        alert("Fill in the Blanks");
        
        return false;  
      }else if(password.length<6){ 
        alert("Password must be atleast 6 characters long.");
       
        return false;  
      }else if(password != repassword){
        alert("Password does'nt match")
        
        return false;
      }
  }
  
  
  