var techConSame = document.getElementsByName('technicalAsAbove')[0];

techConSame.addEventListener('change', function(e) {
	var technical = {};
	technical.first = document.getElementsByName('technicalFirst')[0];
	technical.last = document.getElementsByName('technicalLast')[0];
	technical.email = document.getElementsByName('technicalEmail')[0];
	technical.phone = document.getElementsByName('technicalPhone')[0];
	
	var primary = {};
	primary.first = document.getElementsByName('contactFirst')[0];
	primary.last = document.getElementsByName('contactLast')[0];
	primary.email = document.getElementsByName('contactEmail')[0];
	primary.phone = document.getElementsByName('contactPhone')[0];

	if(techConSame.checked) {
		technical.first.value = primary.first.value;
		technical.last.value = primary.last.value;
		technical.email.value = primary.email.value;
		technical.phone.value = primary.phone.value;

		technical.first.disabled = true;
		technical.last.disabled = true;
		technical.email.disabled = true;
		technical.phone.disabled = true;
	} else {
		technical.first.value = "";
		technical.last.value = "";
		technical.email.value = "";
		technical.phone.value = "";
	}	
});

var software = document.getElementById('software');
software.addEventListener('change', function(e) {
	if(software.value === 'Shoeboxed') {
		document.getElementById('sol-lic-t').disabled = true;
	} else {
		document.getElementById('sol-lic-t').disabled = false;
	}
});

var licType = document.getElementById('sol-lic-t');
licType.addEventListener('change', function(e) {
	if(licType.value === 'Small Business') {
		document.getElementById('sol-lic-q').disabled = false
	} else {
		document.getElementById('sol-lic-q').disabled = true	
	}
});
