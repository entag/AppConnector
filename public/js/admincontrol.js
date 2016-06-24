var deleteUsername = $('#deleteUsername');
var deleteConfirmUsername = $('#deleteConfirmUsername');
var registerUsername = $('#registerUser');
var registerPassword = $('#registerPassword');
var resetuser = $('#resetUser');
var resetpw = $('#resetPassword')

var btnadd = $('#form-button-add');
var btndelete = $('#form-button-delete');
var btnchange = $('#form-button-resetpw');

btnadd.on('click', function(e) {
	e.preventDefault();
	var data = {
		email: registerUsername.val(),
		password: registerPassword.val()
	}

	btnadd.addClass('disabled');

	$.ajax({
		url: '/admin/register',
		data: data,
		method: 'POST'
		})
		.done(function(res, statusText, xhr) {
			console.log(xhr);
			btnadd.removeClass('disabled');
			registerUsername.val('')
			.next().removeClass('active');
			registerPassword.val('')
			.next().removeClass('active');
		})
		.error(function(res, statusText, xhr) {
			console.log(xhr);
			btnadd.removeClass('disabled');
			registerUsername.val('')
			.next().removeClass('active');
			registerPassword.val('')
			.next().removeClass('active');
		})
})

btndelete.on('click', function(e) {
	e.preventDefault();
	var data = deleteUsername.val()
	
	if(deleteUsername.val() == '' ^ deleteConfirmUsername.val() == '') {
		return
	}

	if(deleteUsername.val() != deleteConfirmUsername.val()) {
		console.log("delete fields don't match");
		return
	}

	btndelete.addClass('disabled');


	$.ajax({
		url: '/admin/delete',
		data: {
			user: data
		},
		method: 'POST'
		})
		.done(function(res, statusText, xhr) {
			console.log(xhr);
			btndelete.removeClass('disabled');
			deleteUsername.val('')
			.next().removeClass('active');
			deleteConfirmUsername.val('')
			.next().removeClass('active');
		})
		.error(function(res, statusText, xhr) {
			console.log(xhr);
			btndelete.removeClass('disabled');
			deleteUsername.val('')
			.next().removeClass('active');
			deleteConfirmUsername.val('')
			.next().removeClass('active');
		})
})

btnchange.on('click', function() {
	if(!resetuser.val() ^ !resetpw.val()) {
		return
	}

	btnchange.addClass('disabled', true);

	var data = {
		userId: resetuser.val(),
		newPassword: resetpw.val()
	}

	$.ajax({
		url: '/admin/reset',
		data: data,
		method: 'POST'
		})
		.done(function(res, statusText, xhr) {
			console.log(xhr);
			btnchange.removeClass('disabled');
			resetuser.val('')
			.next().removeClass('active');
			resetpw.val('')
			.next().removeClass('active');
		})
		.error(function(res, statusText, xhr) {
			console.log(xhr);
			btnchange.removeClass('disabled');
			resetuser.val('')
			.next().removeClass('active');
			resetpw.val('')
			.next().removeClass('active');
		})
	})


//role=form(role='form', action='/auth/register', method='POST') 
// 	.form-group 
//		label email 
// 		input(type='text', name='email').form-control 
// 	.form-group 
// 		label password 
// 		input(type='password', name='password').form-control 
// 	.form-group 
// 	input(type='submit', value='submit').btn.btn-default 
