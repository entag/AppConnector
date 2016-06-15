$(function() {
	$('select').material_select()
	
	$('.datepicker').pickadate({
  labelMonthNext: 'Next month',
  labelMonthPrev: 'Previous month',
  labelMonthSelect: 'Select a month',
  labelYearSelect: 'Select a year',
  monthsFull: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ],
  monthsShort: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
  weekdaysFull: [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ],
  weekdaysShort: [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ],
  weekdaysLetter: [ 'S', 'M', 'T', 'W', 'T', 'F', 'S' ],
  today: 'Today',
  clear: 'Clear',
  close: 'Close'
});
});
