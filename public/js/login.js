$(function() {
	$('#login').on('submit', function(e) {
		e.preventDefault();
		
		// validation check
		if(!$('#email').val() ^ !$('#password').val()){
			// invalid
			$.notify('Please enter a username and password', 'error');
			return
		}

		$('#btn_login').addClass('disabled'); //disable button

		$.ajax({
			method: 'POST',
			url: 'auth/signin',
			data: {
				email: $('#email').val(),
				password: $('#password').val()
			}
		})
		.success(function(res){
			// redirect
			$.notify('Success', 'success');
			window.location = '/';
		})
		.error(function(){
			// flash error message
			$.notify('Invalid Login Credentials', 'error');
			$('#btn_login').removeClass('disabled');
		})
	})
})
