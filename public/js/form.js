var software = $('#solutionsSoftware');
var licence = $('#solutionsLicence');
var qty = $('#solutionsQty');

var techConSame = $('#technicalCopy');

var btn = $('#form-button');

techConSame.on('change', function(e) {
	var technical = {};
	technical.first = $('#technicalFirst');
	technical.last = $('#technicalLast');
	technical.email = $('#technicalEmail');
	technical.phone = $('#technicalPhone');
	
	var primary = {};
	primary.first = $('#contactFirst');
	primary.last = $('#contactLast');
	primary.email = $('#contactEmail');
	primary.phone = $('#contactPhone');

	if(techConSame.is(':checked')) {
		technical.first.val(primary.first.val())
		technical.last.val(primary.last.val())
		technical.email.val(primary.email.val())
		technical.phone.val(primary.phone.val())
		technical.first.next().addClass('active');
		technical.last.next().addClass('active');
		technical.email.next().addClass('active');
		technical.phone.next().addClass('active');
		technical.first.prop('disabled', true);
		technical.last.prop('disabled', true);
		technical.email.prop('disabled', true);
		technical.phone.prop('disabled', true);
	} else {
		technical.first.prop('disabled', false);
		technical.last.prop('disabled', false);
		technical.email.prop('disabled', false);
		technical.phone.prop('disabled', false);
		technical.first.next().removeClass('active');
		technical.last.next().removeClass('active');
		technical.email.next().removeClass('active');
		technical.phone.next().removeClass('active');
		technical.first.val("");
		technical.last.val("");
		technical.email.val("");
		technical.phone.val("");
		
	}	
});

software.on('change', function(e) {
	if(software.val() == 'Shoeboxed') {
		licence.prop('disabled', true);
		licence.val('Sole Trader');
	} else {
		licence.prop('disabled', false);
	}
});

licence.on('change', function(e) {
	if(licType.val() == 'Small Business') {
		qty.prop('disabled', false);
	} else {
		qty.prop('disabled', true);
		qty.val('1');
	}
});

btn.on('click', function(e) {
	e.preventDefault();
	var data = {};

	btn.addClass('disabled');

	$('input').each(function() {
		data[$(this).attr('id')] = $(this).val()
	})

	$('select').each(function() {
		data[$(this).attr('id')] = $(this).val()
	})

	$.ajax({
		url: '/form/submit',
		data: data,
		method: 'POST'
		})
		.done(function(res, statusText, xhr) {
			console.log(xhr.status);
			if(xhr.status == 200) {
				window.location = res;
			} else {
				$(btn).removeClass('disabled');
			}
		})
})
