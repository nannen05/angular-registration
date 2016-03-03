myApp.factory('Authentication' , ['$rootScope', '$firebaseAuth', '$firebaseObject', 'FIREBASE_URL', '$location',  
	function($rootScope, $firebaseAuth, $firebaseObject, FIREBASE_URL, $location) {

		var ref = new Firebase(FIREBASE_URL);
	 	var auth = $firebaseAuth(ref);

	 	auth.$onAuth(function(authUser) {
	 		if (authUser) {
	 			var userRef = new Firebase(FIREBASE_URL + 'users/' + authUser.uid);
	 			var userObj = $firebaseObject(userRef);
	 			$rootScope.currentUser = userObj;
	 		} else {
	 			$rootScope.currentUser = userObj;
	 		}
	 	});

	 	var myObject = {
	 		login: function(user) {
	 			auth.$authWithPassword({
	 				email		: user.email,
	 				password 	: user.password
	 			}).then(function(regUser) {
	 				$location.path('/success');
	 				//$rootScope.message = 'You are now loggedin' + user.firstname;
	 			}).catch(function(error) {
	 				$rootScope.message = error.message;
	 			});
	 			$rootScope.message = "Welcome" + ' ' + user.email;
	 		}, //login

	 		logout: function(user) {
	 			return auth.$unauth();
	 		}, //logout

	 		requireAuth: function() {
	 			return auth.$requireAuth();
	 		}, //regurire Authentication

	 		register: function(user) {
		 		auth.$createUser({
					email 		: user.email,
					password 	: user.password
					}).then(function(regUser) {

						var regRef = new Firebase(FIREBASE_URL + 'users')
							.child(regUser.uid).set({
								date		: Firebase.ServerValue.TIMESTAMP,
								regUser		: regUser.uid,
								firstname	: user.firstname,
								lastname	: user.lastname,
								email		: user.email
							});//user 

					myObject.login(user);

					}).catch(function(error) {
						$rootScope.message = error.message;
				}); //createUser
	 		} //register
	 	};

	 	return myObject;

	}]); //factory 
