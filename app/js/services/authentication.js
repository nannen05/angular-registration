myApp.factory('Authentication' , ['$rootScope', '$firebaseAuth', 'FIREBASE_URL', 
	function($rootScope, $firebaseAuth, FIREBASE_URL) {

		var ref = new Firebase(FIREBASE_URL);
	 	var auth = $firebaseAuth(ref);

	 	return {
	 		login: function(user) {
	 			$rootScope.message = "Welcome" + ' ' + user.email;
	 		},

	 		register: function(user) {
		 		auth.$createUser({
					email : user.email,
					password : user.password
					}).then(function(regUser) {

						var regRef = new Firebase(FIREBASE_URL + 'users')
							.child(regUser.uid).set({
								date: Firebase.ServerValue.TIMESTAMP,
								regUser: regUser.uid,
								firstname: user.firstname,
								lastname: user.lastname,
								email: user.email
							});//user 

						$rootScope.message = "Hi" + ' ' + user.firstname + ' ' + user.lastname +
						", Thanks for registering";
					}).catch(function(error) {
						$rootScope.message = error.message;
				}); //createUser
	 		} //register
	 	};

	}]); //factory 
