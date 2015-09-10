var email_error;
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
function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function check_form()
{
  if (email_error)
  {
    form_error=true;
    form_error_msg="Please correct the errors";
    //$('#form_error_msg').html(form_error_msg);
    document.getElementById("login_button").disabled = true;
  }
  else {
    document.getElementById("login_button").disabled = false;
  }
}
$(document).ready(function(){
  var email_error=false; var email_msg,email;
  var password1,password_error,password_error_msg;
  var login_error,login_msg;
  var csrftoken = getCookie('csrftoken');
    function validateEmail(email)
      {
        var re3 = /\S+@\S+\.\S+/;
        var re4 = /\S+@\S+\.\S+\.S+/
        return re3.test(email) || re4.test(email);
      }
  $('#id_email').keyup(function(){
    email= $(this).val();
    check_form();
  });

  $('#id_password').keyup(function(){
    password1 = $(this).val();
    if (validateEmail(email))
    {
      $.ajax({
                      url : "/login_email/",
                      type : "POST",
                      dataType: "json",
                      data : {
                          email : email,
                          'csrfmiddlewaretoken':csrftoken
                          },
                      success : function(json) {
                        if(json.response == "DO NOT EXIST"){
                          email_error=true;
                          email_msg="Email do not exist"
                        }
                        else {
                          email_error = false;
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
      email_error_msg = "Not a valid email";
    }
    $('#email_error_msg').html(email_msg);
    check_form();
  });

  $('#login_button').on('click',function(data){
      if (email_error)
      {
        login_error=true;
        login_msg="Please correct the email";
      }
    });
});
