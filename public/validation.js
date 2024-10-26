function validateEmail(){
    
    const email=document.getElementById('email').value
    const error=document.getElementById('errormessage')  
   error.style.backgroundColor='black'
    const EMAIL_REGEX = /^[^\s@]+@gmail\.com$/i;


    if(!EMAIL_REGEX.test(email)){
       error.innerHTML='Not valid'
       error.style.color='red'
       error.style.backgroundColor='black'
       return false
    }else{
         error.innerHTML='valid'
       error.style.color='green'
       return true;
    }

   

}

   function  validatePassword(){

   
   const password=document.getElementById('Password').value
   const errorpass=document.getElementById('errormessagePass')
   const PASSWORD_REGEX = /^[\w\d]{6,}$/;

   
   if(!PASSWORD_REGEX.test(password)){
     errorpass.innerHTML='password must be at least 6 characters'
     errorpass.style.color='red'
     errorpass.style.backgroundColor='black'
     return false;
   }else{

    errorpass.innerHTML='valid password'
    errorpass.style.color='green'
    errorpass.style.backgroundColor='black'
    return true;
   }


    }

    function validateName(){
        NAME_REGEX=/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/
       const name=document.getElementById('name').value
       const nameErorr=document.getElementById('nameErorr')
       if(!NAME_REGEX.test(name)){
         nameErorr.innerHTML='Enter Valid name'
         nameErorr.style.color='red'     
       }else{
        nameErorr.innerHTML='Valid'
        nameErorr.style.color='green' 
       }

    }


    document.getElementById('loginForm').addEventListener('Submit',(e)=>{
       if(!validateEmail()||!validatePassword()){
        e.preventDefault()
           
           alert('Details are incorrect');
       
       }
   })






















