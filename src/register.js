// Initialize Firebase
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
  
  // Set up our register function
  function register() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const full_name = document.getElementById('full_name').value;
    const type = document.getElementById('type').value;

    // Validate input fields
    if (!validateEmail(email) || !validatePassword(password)) {
        alert('Please enter a valid email and password!');
        return;
    }
    if (!validateField(full_name)) {
        alert('Please enter your full name properly.');
        return;
    }

    console.log("Email:", email);
    console.log("Full Name:", full_name);

    // Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
        .then(function(userCredential) {
            // Declare user variable
            var user = userCredential.user;

            // Add this user to Firebase Database
            var database_ref = database.ref();

            // Create User data
            var user_data = {
                email: email,
                full_name: full_name,
                type: type,
                last_login: Date.now()
            };

            // Push to Firebase Database
            database_ref.child('users/' + user.uid).set(user_data)
                .then(() => {
                    // Done
                    alert('Account Created!');
                    // Redirect to login page
                    window.location.href = "login.html";
                })
                .catch((error) => {
                    console.error("Error adding user to database: ", error);
                    alert('Error creating account. Please try again later.');
                });
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.error("Error creating user: ", errorCode, errorMessage);
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
  
  function validateField(field) {
      return field.trim() !== '';
  }