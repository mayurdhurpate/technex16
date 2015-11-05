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
	var csrftoken = getCookie('csrftoken')
    function validateEmail(email)
	{
	  var re3 = /\S+@\S+\.\S+/;
	  var re4 = /\S+@\S+\.\S+\.S+/
	  return re3.test(email) || re4.test(email);
	}

	function check_email(email, x)
	{
		email_error_msg = "";
		email_error = false;
		if (validateEmail(email))
		{
			$.ajax({
				url:"/signup_email/",
				type:"POST",
				dataType: "json",
				data: {
					email: email,
					'csrfmiddlewaretoken':csrftoken
				},
				success : function(json){
					if(json.response == "Email already registered"){
						email_error = false;
						email_error_msg = "Correct";
						x.innerHTML = email_error_msg
					}
					else {
						email_error = true;
						email_error_msg = "Enter a registered email";
						x.innerHTML = email_error_msg
						check_form();
					}
				},
                error : function(xhr,errmsg,err) {
                    alert(xhr.status + ": " + xhr.responseText);
                    //$('#email_error_msg').html(xhr.responseText);
                }
			});
		}
		else {
			if (email !== ""){
			email_error = true;
			email_error_msg = "Not a valid email";
		}
			x.innerHTML = email_error_msg
		}
		// console.log(email_error_msg);
		console.log(email_error)
		return email_error;
	}

	var e =false, e1 =false, e2 =false, e3 =false, e4 = false;
    $('#team_leader').keyup(function(){
      var email1= $(this).val();
      var x = document.getElementById('err_msg_team_leader');
      e = check_email(email1, x);
      check_form();
    });
    $('#team_member1').keyup(function(){
      var email1= $(this).val();
      var x = document.getElementById('err_msg_team_member1');
      e1 = check_email(email1, x);
      check_form();
    });
    $('#team_member2').keyup(function(){
      var email1= $(this).val();
      var x = document.getElementById('err_msg_team_member2');
      e2 = check_email(email1, x);
      check_form();
    });
    $('#team_member3').keyup(function(){
      var email1= $(this).val();
      var x = document.getElementById('err_msg_team_member3');
      e3 = check_email(email1, x);
      check_form();
    });
    $('#team_member4').keyup(function(){
      var email1= $(this).val();
      var x = document.getElementById('err_msg_team_member4');
      e4 = check_email(email1, x);
      check_form();
    });

    function check_form()
    {
    	console.log('check_form');
    	console.log(e + e1 + e2 + e3 + e4);
      if (e || e1 || e2 || e3 || e4)
      {
        form_error=true;
        form_error_msg="Please correct the errors";
        //$('#form_error_msg').html(form_error_msg);
        document.getElementById("register_button").disabled = true;
      }
      else {
        document.getElementById("register_button").disabled = false;
      }
    }
});
