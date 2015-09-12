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
		if (validateEmail(email))
		{
			// alert('Hello');
			$.ajax({
				url:"/signup_email/",
				type:"POST",
				dataType: "json",
				data: {
					email: email,
					'csrfmiddlewaretoken':csrftoken
				},
				success : function(json){
					var email_error_msg = "";
					if(json.response == "Email already registered"){
						email_error = false;
						email_error_msg = "Correct";
					}
					else {
						email_error = true;
						email_error_msg = "Enter a registered email";
					}
					x.innerHTML = email_error_msg;
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
	}
    $('#team_leader').keyup(function(){
      var email1= $(this).val();
      var x = document.getElementById('err_msg_team_leader');
      check_email(email1, x);
    });
    $('#team_member1').keyup(function(){
      var email1= $(this).val();
      var x = document.getElementById('err_msg_team_member1');
      check_email(email1, x);
    });
    $('#team_member2').keyup(function(){
      var email1= $(this).val();
      var x = document.getElementById('err_msg_team_member2');
      check_email(email1, x);
    });
    $('#team_member3').keyup(function(){
      var email1= $(this).val();
      var x = document.getElementById('err_msg_team_member3');
      check_email(email1, x);
    });
    $('#team_member4').keyup(function(){
      var email1= $(this).val();
      var x = document.getElementById('err_msg_team_member4');
      check_email(email1, x);
    });
});
