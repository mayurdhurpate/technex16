$(document).ready(function(){
  var email_error,email_error_msg,email;
  var mobile,mobile_error,mobile_error_msg;
  var password,password_error,password_error_msg;
  var city,college,year,no_str;
  var name;
    function validateEmail(email)
      {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
      }
    function iitbhuemail(email)
      {
        var re1 = /\S+@iitbhu\.ac.in/;
        var re2 = /\S+@itbhu\.ac.in/;
        return re1.test(email) || re2.test(email);
      }
    function take_details(email)
    {
      document.cookie="city=Varanasi";
      document.cookie="college=IIT(BHU) Varanasi";
      for (i=0;i<email.length();i++)
      {
        if (email[i]=='@')
        {
        no_str=Number(email[i--]);
        break;
        }
      }
      year = 6 - no_str;
      document.cookie="year=year";
    }
    $('#id_email').focus(function(){
      email= $(this).val();
      if (validateEmail(email))
      {
      $.post('/signup/',{email:email},function(data){
        if(data == "DO NOT EXIST"){
          email_error=false;
          if iitbhuemail(email)
            take_details(email);
        }
        else {
          email_error = true;
          email_error_msg = data;
        }
			}
      else {
        email_error = true;
        email_error_msg = "Not a valid email";
      }
      if (email_error)
      $('#email_error_msg').html(email_error_msg);
    });

    $('#id_mobile').focus(function(){
      mobile = $(this).val();
      if (mobile < 7000000000)
      {
        mobile_error=true;
        mobile_error_msg="invalid mobile number";
        $('#mobile_error_msg').html(mobile_error_msg);
      }
      else {
        mobile_error=false;
      }
    });

    $('#id_password').focus(function(){
      password = $(this).val();
      if (password.length()<=5)
      {
        password_error=true;
        password_error_msg="Too small";
        $('#password_error_msg').html(password_error_msg);
      }
      else {
        password_error = false;
      }

    $('#id_name').focus(function(){
      name=$(this).val();
    });
    $('#post-form').on('submit',function(data){
      if (mobile_error || email_error || password_error)
      {
        form_error=true;
        form_error_msg="Please correct the errors";
        document.getElementById("signup_button").disabled = true;
      }
      else {
          document.cookie="email=email";
          document.cookie="name=name";
      }
    });
});
