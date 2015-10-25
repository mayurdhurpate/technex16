var profile_image;
var access_token;
function statusChangeCallback(response) {
  console.log('statusChangeCallback');
  console.log(response);
  // The response object is returned with a status field that lets the
  // app know the current login status of the person.
  // Full docs on the response object can be found in the documentation
  // for FB.getLoginStatus().
  if (response.status === 'connected') {
    // Logged into your app and Facebook.
    console.log(response.authResponse);
    access_token=response.authResponse.accessToken;
    testAPI(access_token);
  } else if (response.status === 'not_authorized') {
    // The person is logged into Facebook, but not your app.
    document.getElementById('status').innerHTML = 'Please log ' +
      'into this app.';
  } else {
    // The person is not logged into Facebook, so we're not sure if
    // they are logged into this app or not.
    document.getElementById('status').innerHTML = 'Please log ' +
      'into Facebook.';
  }
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

window.fbAsyncInit = function() {
FB.init({
  appId      : '461359507257085',
  cookie     : true,  // enable cookies to allow the server to access
  oauth : true,                    // the session
  xfbml      : true,  // parse social plugins on this page
  version    : 'v2.2' // use version 2.2
});

// Now that we've initialized the JavaScript SDK, we call
// FB.getLoginStatus().  This function gets the state of the
// person visiting this page and can return one of three states to
// the callback you provide.  They can be:
//
// 1. Logged into your app ('connected')
// 2. Logged into Facebook, but not your app ('not_authorized')
// 3. Not logged into Facebook and can't tell if they are logged into
//    your app or not.
//
// These three cases are handled in the callback function.

FB.getLoginStatus(function(response) {
  statusChangeCallback(response);
});

};

// Load the SDK asynchronously
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function testAPI(access_token) {
  console.log('Welcome!  Fetching your information.... ');
  FB.api("/me/picture?width=180&height=180",function(response1) {

      profile_image=response1.data.url;
      console.log(response1.data.url);

      //remove if there and add image element to dom to show without refres
   });
  FB.api('/me?fields=email,name', function(response) {
    console.log('Successful login for: ' + response.name);
    //console.log(response.authResponse.accessToken);
    if(response)
    {
      onSignInClick(response);
    }
    console.log(response);
    //response2=JSON.stringify(response);
    console.log(JSON.stringify(response));
    console.log(response.id);
    //console.log(response.email);
    //console.log(response.authResponse.accessToken);
    document.getElementById('status').innerHTML =
      'Thanks for logging in, ' + response.name + '!';
  });

}

function onSignInClick(response){
  var email;
  if (response.email==undefined){ email="something";}
  else {email=response.email; }
  var csrftoken = getCookie('csrftoken');
    $.ajax({
                  url : "/facebook_login/",
                  type : "POST",
                  dataType: "json",
                  data : {
                      email : email,
                      name :  response.name,
                      image_url: profile_image,
                      id: response.id,
                      access_token:access_token,
                      'csrfmiddlewaretoken':csrftoken
                      },
                  success : function(json) {
                    console.log(json.response);
                    if(json.response=="logged in")
                    {
                      window.open("/","_self");
                    }
                    else {
                        window.open("/signup3/","_self");
                    }

                  },
                  error : function(xhr,errmsg,err) {
                      alert(xhr.status + ": " + xhr.responseText);
                      //$('#email_error_msg').html(xhr.responseText);
                  }
              });
}
