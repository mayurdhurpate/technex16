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
window.fbAsyncInit = function() {
  FB.init({
    appId      : '887126748038629',
    cookie     : true,  // enable cookies to allow the server to access
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.2' // use version 2.2
  });
function onSignIn(googleUser) {
  //alert('Hello');
profile = googleUser.getBasicProfile();
console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
console.log('Name: ' + profile.getName());
console.log('Image URL: ' + profile.getImageUrl());
console.log('Email: ' + profile.getEmail());
}
$(document).ready(function(){
$("#logout").click(function(){
  var csrftoken = getCookie('csrftoken');
  $.ajax({
                  url : "/logout/",
                  type : "POST",
                  dataType: "json",
                  data : {
                      'csrfmiddlewaretoken':csrftoken
                      },
                  success : function(json) {
                    if(json.response == "google logout"){
                      signOut();
                      }
                    else if(json.response == "facebook logout")
                    {
                      FB.logout(function(response) {
                      // Person is now logged out
                      });
                    }
                      //alert("Succesful signout");
                      window.open("/","_self");
                  },
                  error : function(xhr,errmsg,err) {
                      alert(xhr.status + ": " + xhr.responseText);
                      //$('#email_error_msg').html(xhr.responseText);
                  }
              });
  });
});

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }
