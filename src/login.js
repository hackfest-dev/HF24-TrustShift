const firebaseConfig = {
    apiKey: "AIzaSyAKdZl2VPR6rttGjj7anKJfmcdS2OaU9fw",
    authDomain: "login-for-trustshift.firebaseapp.com",
    projectId: "login-for-trustshift",
    storageBucket: "login-for-trustshift.appspot.com",
    messagingSenderId: "54235333207",
    appId: "1:54235333207:web:dba19019aff40fcdbad912",
    measurementId: "G-QRZCRL8DZH"
  };
  
  firebase.initializeApp(firebaseConfig);
  
  // Initialize variables
  const auth = firebase.auth();
  const database = firebase.database();
  
  // Set up our login function
  function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    // Validate input fields
    if (!validateEmail(email) || !validatePassword(password)) {
        alert('Please enter a valid email and password!');
        return;
    }
  
    auth.signInWithEmailAndPassword(email, password)
        .then(function(userCredential) {
            // Declare user variable
            var user = auth.currentUser;
  
            // Get user type from Firebase Database
            database.ref('users/' + user.uid).once('value')
                .then((snapshot) => {
                    const userData = snapshot.val();
                    const userType = userData.type;
  
                    // Redirect based on user type
                    switch (userType) {
                        case 'manufacturer':
                            window.location.href = "manufacturer.html";
                            break;
                        case 'seller':
                            window.location.href = "seller.html";
                            break;
                        case 'consumer':
                            window.location.href = "consumer.html";
                            break;
                        default:
                            alert('Invalid user type!');
                    }
                })
                .catch((error) => {
                    console.error("Error getting user type: ", error);
                    alert('Error logging in. Please try again later.');
                });
  
        })
        .catch(function(error) {
            // Firebase will use this to alert of its errors
            var errorCode = error.code;
            var errorMessage = error.message;
  
            alert(errorMessage);
        });
  }
  
  // Validate Functions
  function validateEmail(email) {
    var expression = /^[^@]+@\w+(\.\w+)+\w$/;
    return expression.test(String(email).toLowerCase());
  }
  
  function validatePassword(password) {
    return password.length >= 6;
  }