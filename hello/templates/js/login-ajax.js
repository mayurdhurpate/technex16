$(document).ready(function(){

  $('#id_email').focus(function(){
    email= $(this).val();
    if (validateEmail(email))
    {
    $.post('/login_email/',{email:email},function(data){
      if(data == "DO NOT EXIST"){
        email_error=true;
        email_error_msg = data;
      else {
        email_error = false;
      }
    }
    else {
      email_error = true;
      email_error_msg = "Not a valid email";
    }
    if (email_error)
    $('#email_error_msg').html(email_error_msg);
  });

  $('#id_password').focus(function(){
    password = $(this).val();
  });

  $('#post-form').on('submit',function(data){
      if (email_error)
      {
        form_error=true;
        form_error_msg="Please correct the email";
      }
      else {
        $.post('/login_password_email/',{email:email,password:password},function(data){
          if (data!="LOGIN SUCCESSFUL")
          {
          form_error=true;
          form_error_msg="Wrong email password combination";
          }
          else
          document.cookie="email=email";
        });
      }
      if (form_error)
      {
        $('#form_error_msg').html(form_error_msg);
        document.getElementById("login_button").disabled = true;
      }
    });


});
