var username = $('#delusername');
var confirmuser = $('#delconfirmuser');
var adduser = $('#adduser');
var addpassword = $('#addpassword');

var btnadd = $('#form-button-add');
var btndelete = $('#form-button-delete');

btnadd.on('click', function(e) {
	e.preventDefault();
	var data = {};

	$('input').each(function() {
		data[$(this).attr('id')] = $(this).val()
	})

	$('select').each(function() {
		data[$(this).attr('id')] = $(this).val()
	})

	$.ajax({
		url: '/admin/register',
		data: data,
		method: 'POST'
		})
		.done(function(res) {
			console.log(res)
		})
})

btndelete.on('click', function(e) {
	e.preventDefault();
	var data = {};

	$('input').each(function() {
		data[$(this).attr('id')] = $(this).val()
	})

	$('select').each(function() {
		data[$(this).attr('id')] = $(this).val()
	})

	$.ajax({
		url: '/admin/register',
		data: data,
		method: 'POST'
		})
		.done(function(res) {
			console.log(res)
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
