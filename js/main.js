$('#btnAction').click(function() {
	$('#actions').slideToggle();
	$('.selected').children('ul').slideToggle();
	$('.selected').removeClass('selected');

	if($(this).children('img').attr('src') == 'plus.png') {
		$(this).children('img').attr('src','minus.png');
	}
	else {
		$(this).children('img').attr('src','plus.png');
	}
	
});

$('#actions div').click(function() {
	
	if($(this).attr('class') != 'selected') {
	$(this).children('ul').slideToggle();
	$('.selected').not($(this)).children('ul').slideToggle();
	$('.selected').removeClass('selected');
	$(this).addClass('selected');
}
else {
	$(this).children('ul').slideToggle();
	$(this).removeAttr('class');

}
});

$('#actions div ul li a').click(function() {
	$('#btnAction').children('img').attr('src','plus.png');
	SendMessage($(this).html()); $('#actions').hide();
});