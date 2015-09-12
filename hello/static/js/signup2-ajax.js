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

var delete_cookie = function(name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

function setCookie(name, value, expires, path, domain, secure){
	cookieStr = name + "=" + escape(value) + "; ";

	if(expires){
		expires = setExpiration(expires);
		cookieStr += "expires=" + expires + "; ";
	}
	if(path){
		cookieStr += "path=" + path + "; ";
	}
	if(domain){
		cookieStr += "domain=" + domain + "; ";
	}
	if(secure){
		cookieStr += "secure; ";
	}

	document.cookie = cookieStr;
}

$(document).ready(function(){
var csrftoken = getCookie('csrftoken');
var city = getCookie('city');
var college = getCookie('college');
var year = getCookie('year');
if(city)
{
  //$('#id_college').val(college);
  $('input:radio[id=id_bhu_college]:nth(0)').attr('checked',true);
  $('#id_city').val(city);
  $('#id_year').val(year);
}
$('#id_other_radio_college').on('focus',function(){
  $('id_other_text_college').focus();
});
$('#signup_button').on('click',function(data){
  $.ajax({
                  url : "/signup2/",
                  type : "POST",
                  dataType: "json",
                  data : {
                      email : getCookie('email'),
                      city: $('#id_city').val(),
                      college:$('#id_college').val(),
                      year:$('#id_year').val(),
                      'csrfmiddlewaretoken':csrftoken
                      },
                  success : function(json) {
                    window.open("/","_self")
                  },
                  error : function(xhr,errmsg,err) {
                      alert(xhr.status + ": " + xhr.responseText);
                      //$('#email_error_msg').html(xhr.responseText);
                  }
              });

});
});
