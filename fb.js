// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
  console.log('statusChangeCallback');
  console.log(response);
  // The response object is returned with a status field that lets the
  // app know the current login status of the person.
  // Full docs on the response object can be found in the documentation
  // for FB.getLoginStatus().
  if (response.status === 'connected') {
    // Logged into your app and Facebook.
    document.querySelector("#box3").classList.remove("hidden");
    testAPI(response);
  } else if (response.status === 'not_authorized') {
    // The person is logged into Facebook, but not your app.
    document.getElementById('status').innerHTML = 'Please log ' +
      'into this app.';
    document.querySelector("#box3").classList.add("hidden");
  } else {
    // The person is not logged into Facebook, so we're not sure if
    // they are logged into this app or not.
    document.getElementById('status').innerHTML = 'Please log ' +
      'into Facebook.';
    document.querySelector("#box3").classList.add("hidden");
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
    appId      : '171504956672009',
    xfbml      : true,
    version    : 'v2.8'
  });

 /* 
 FB.getLoginStatus(function(response) {
  statusChangeCallback(response);
 });

  FB.AppEvents.logPageView();
  FB.getLoginStatus(function(response) {
    if (response.authResponse == null) {
      FB.login(function(response) {
        if (response.status === 'connected') {
          // Logged into your app and Facebook.
          console.log("token=", response.authResponse.accessToken);
        } else if (response.status === 'not_authorized') {
          // The person is logged into Facebook, but not your app.
          console.log("not authorized");
        } else {
          // The person is not logged into Facebook, so we're not sure if
          // they are logged into this app or not.
          console.log("not logged in");
        }          
      });
    }
  });
 */
};
(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function testAPI(response) {
  console.log('Welcome!  Fetching your information.... ');
  document.querySelector("#box3").innerHTML = "Access token<br>" + response.authResponse.accessToken;
  FB.api('/me?fields=email,education', function(response) {
    console.log(response);
    console.log('Successful login for: ' + response.name);
    document.getElementById('status').innerHTML =
      'Thanks for logging in, ' + response.name + '!';
  });
}
