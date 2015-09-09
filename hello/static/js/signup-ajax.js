function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


$(document).ready(function(){
  var email_error,email_msg,email;
  var mobile,mobile_error,mobile_msg;
  var password1,password_error,password_error_msg;
  var city,college,year,no_str;
  var form_error,form_error_msg;
  var name,i,j;
  var csrftoken = getCookie('csrftoken');
    function validateEmail(email)
      {
        var re3 = /\S+@\S+\.\S+/;
        var re4 = /\S+@\S+\.\S+\.S+/
        return re3.test(email) || re4.test(email);
      }
    function iitbhuemail(email)
      {
        var re1 = /\S+\@iitbhu\.ac\.in/;
        var re2 = /\S+\@itbhu\.ac\.in/;
        return re1.test(email) || re2.test(email);
      }
    function take_details(email)
    {
      //alert('Hello');
      document.cookie="city=Varanasi";
      document.cookie="college=IIT(BHU) Varanasi";
      for (i=0;i<email.length;i++)
      {
        if (email.charAt(i)=='@')
        {
          j=i-1;
        no_str=Number(email.charAt(j));
        //alert(no_str);
        break;
        }
      }
      year = 6 - no_str;
      document.cookie="year="+ year + ";" ;
    }
    function check_form()
    {
      if (mobile_error || email_error || password_error)
      {
        form_error=true;
        form_error_msg="Please correct the errors";
        //$('#form_error_msg').html(form_error_msg);
        document.getElementById("signup_button").disabled = true;
      }
      else {
        document.getElementById("signup_button").disabled = false;
      }
    }

    function check_email()
    {
      if (validateEmail(email))
      {
        $.ajax({
                        url : "/signup_email/",
                        type : "POST",
                        dataType: "json",
                        data : {
                            email : email,
                            'csrfmiddlewaretoken':csrftoken
                            },
                        success : function(json) {
                          if(json.response == "DO NOT EXIST"){
                            email_error=false;
                            email_msg="Correct"
                            if (iitbhuemail(email)){
                              take_details(email);
                            }
                          }
                          else {
                            email_error = true;
                            email_msg = json.response;
                          }
                        },
                        error : function(xhr,errmsg,err) {
                            alert(xhr.status + ": " + xhr.responseText);
                            //$('#email_error_msg').html(xhr.responseText);
                        }

                    });
     }
      else {
        email_error = true;
        email_msg = "Not a valid email";
      }
      $('#email_error_msg').html(email_msg);

    }
    $('#id_email').keyup(function(){
      email= $(this).val();
      check_form();
    });

    $('#id_mobile').keyup(function(){
      mobile = $(this).val();
      if(mobile)
      if (mobile < 700000000)
      {
        mobile_error=true;
        mobile_msg="invalid mobile number";
      }
      else {
        mobile_error=false;
        mobile_msg="OK";
      }
      $('#mobile_error_msg').html(mobile_msg);
      check_form();
    });

    $('#id_password').keyup(function(){
      password1 = $(this).val();
      if (password1.length>=1)
      if (password1.length<=5)
      {
        password_error=true;
        password_error_msg="Too small";
      }
      else {
        password_error = false;
        password_error_msg='OK';
      }
      $('#password_error_msg').html(password_error_msg);
      check_form();
    });

    $('#id_name').keyup(function(){
      check_email();
      name=$(this).val();
      check_form();
    });

    $('#signup_button').on('click',function(data){
      /*$.ajax({
                      url : "/signup/",
                      type : "POST",
                      dataType: "json",
                      data : {
                          email : email,
                          password:password1,
                          name:name,
                          mobile=mobile,
                          'csrfmiddlewaretoken':csrftoken
                          },
                      success : function(json) {
                        if(json.response == "Registered"){
                          document.cookie="email=" + email + ";" ;
                          document.cookie="name="+ name + ";" ;
                      }
                        else {
                          form_error = true;
                          form_error_msg = "Cannot register try again";
                        }
                      },
                      error : function(xhr,errmsg,err) {
                          alert(xhr.status + ": " + xhr.responseText);
                          //$('#email_error_msg').html(xhr.responseText);
                      }

                  });*/
                  document.cookie="email=" + email + ";" ;
                  document.cookie="name="+ name + ";" ;

              });
});
