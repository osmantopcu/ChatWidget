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
	var messageTemplate = '<div class="chat-message clearfix"><img src="gravatar.png" alt="" width="32" height="32"><div class="chat-message-content clearfix"><!--<span class="chat-time"></span>--><h5 style="width:79%; text-align:right;">You</h5><p style="text-align:right; margin-right:38px;">' +
    $(this).html()
    +'</p></div> <!-- end chat-message-content --></div> <!-- end chat-message --><hr>';
        $('.chat-history').append(messageTemplate);
       scrollToBottom();
	SendMessage($(this).html()); $('#actions').slideUp();

});
