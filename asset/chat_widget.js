var conversationId;
var returnedToken;
var streamUrl;
var messages;
$(document).ready(function() {
    generateToken();

	$('#live-chat header').on('click', function() {

		$('.chat').slideToggle(300, 'swing');
		$('.chat-message-counter').fadeToggle(300, 'swing');
        $('.quickActions').fadeToggle(100, 'swing');
	});

setInterval(function() {
    if(conversationId != undefined && returnedToken != undefined) {
        getBotResponse();
        
    }
}, 5000)
	// $('.chat-close').on('click', function(e) {

	// 	e.preventDefault();
	// 	$('#live-chat').fadeOut(300);

	// });

$('#txtMessage').click(function() {
    $('#actions').slideUp();
    $('#btnAction').children('img').attr('src','asset/plus.png');

});

$('#txtMessage').bind("keypress", {}, keypressInBox);

function keypressInBox(e) {
    var code = (e.keyCode ? e.keyCode : e.which);
    if (code == 13) {
        
    var messageTemplate = '<div class="chat-message clearfix"><img src="asset/gravatar.png" alt="" width="32" height="32"><div class="chat-message-content clearfix"><!--<span class="chat-time"></span>--><h5 style="width:83%; text-align:right;">You</h5><p style="text-align:right; margin-right:38px;">' +
    $('#txtMessage').val()
    +'</p></div> <!-- end chat-message-content --></div> <!-- end chat-message --><hr>';
        $('.chat-history').append(messageTemplate);
       scrollToBottom();
        SendMessage($('#txtMessage').val());
        //AddFromBotMessage();
        $('#txtMessage').val('');
      }
};


});

function AddMessage(message) {
    var messageTemplate = '<div class="chat-message clearfix"><img src="asset/gravatar.png" alt="" width="32" height="32"><div class="chat-message-content clearfix"><!--<span class="chat-time"></span>--><h5 style="width:83%; text-align:right;">You</h5><p style="text-align:right; margin-right:38px;">' +
    message
    +'</p></div> <!-- end chat-message-content --></div> <!-- end chat-message --><hr>';
    messages += messageTemplate;
};

function AddMessageFromBot(message) {
    var messageTemplate = '<div class="chat-message clearfix"><img style="float:left !important;" src="asset/bot_gravatar.png" alt="" width="32" height="32"><div class="chat-message-content clearfix"><!--<span class="chat-time"></span>--><h5>Deborah</h5><p>' +
    message
    +'</p></div> <!-- end chat-message-content --></div> <!-- end chat-message --><hr>';
    messages += messageTemplate;
    return messageTemplate;
    
};

  function scrollToBottom() {
        var chatHistory = $('.chat-history');
        chatHistory.scrollTop(chatHistory.prop("scrollHeight"));

  }

function generateToken(){
            var httpsURL = "https://directline.botframework.com/v3/directline/conversations";
            $.ajax({
    url : httpsURL,
    type: "POST",
    data : '',
    headers: { 
        'Accept': 'application/json',
        'Authorization':'Bearer jDYqgBhqikk.cwA.XhU.ErMSLxTMz8wGt8Af_RFBudDG14b9YMc9tvx4Ps0txxU' },
    success: function(data, textStatus, jqXHR)
    {
        conversationId = data.conversationId;
        returnedToken = data.token;
        streamUrl = data.streamUrl
    },
    error: function (jqXHR, textStatus, errorThrown)
    {
        console.log(errorThrown);
 
    }
});
        }

function SendMessage(message){
    
            var httpsURL = "https://directline.botframework.com/v3/directline/conversations/" + conversationId + "/activities";
            $.ajax({
    url : httpsURL,
    type: "POST",
    dataType: 'json',
    data : JSON.stringify({"type": "message",
                           "from": {"id": "user1"},
                           "text": message
                        }),
    headers: { 
        'Accept': 'application/json',
        'Authorization':'Bearer ' + returnedToken,
        'Content-Type':'application/json' },
    success: function(data, textStatus, jqXHR)
    {
        var messageTemplate = '<div class="chat-message clearfix typing"><img style="float:left !important;" src="asset/bot_gravatar.png" alt="" width="32" height="32"><div class="chat-message-content clearfix"><!--<span class="chat-time"></span>--><h5>Deborah</h5><p>' +
    'typing...'
    +'</p></div> <!-- end chat-message-content --></div> <!-- end chat-message --><hr>';
    
        $('.chat-history').append(messageTemplate);
        scrollToBottom();
    },
    error: function (jqXHR, textStatus, errorThrown)
    {
        console.log(errorThrown);
 
    }
});
}

function getBotResponse() {
            var httpsURL = "https://directline.botframework.com/v3/directline/conversations/" + conversationId + "/activities";
            $.ajax({
    url : httpsURL,
    type: "GET",
    headers: { 
        'Accept': 'application/json',
        'Authorization':'Bearer ' + returnedToken,
        'Content-Type':'application/json' },
    success: function(data, textStatus, jqXHR)
    {
        messages = '';
        var lastBotResponseTextLength = 10; 
        if(data.activities.length > 0) {
        $.each(data.activities, function(i, item) {
            if (item.from.id == 'user1') {
                AddMessage(item.text);
            }
            else {
                AddMessageFromBot(item.text);
                lastBotResponseTextLength = item.text.length; 
            }
})
            var typingItemLength = 0;
            if ($('.typing').html() != undefined) {
                typingItemLength = $('.typing').html().length;
            }            
            
            if (messages.length > $('.chat-history').html().length - typingItemLength || lastBotResponseTextLength < 9) /*|| (messages.length < $('.chat-history').html().length && $('.chat-history').html().indexOf('typing...') > 0) */
            {   
                $('.chat-history').html(messages);
                scrollToBottom();
            }

        }
    },
    error: function (jqXHR, textStatus, errorThrown)
    {
        console.log(errorThrown);
 
    }
});
}
  /****************menu  ********************/
  $('#btnAction').click(function() {
	$('#actions').slideToggle();
	$('.selected').children('ul').slideToggle();
	$('.selected').removeClass('selected');

	if($(this).children('img').attr('src') == 'asset/plus.png') {
		$(this).children('img').attr('src','asset/minus.png');
	}
	else {
		$(this).children('img').attr('src','asset/plus.png');
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
	$('#btnAction').children('img').attr('src','asset/plus.png');
	var messageTemplate = '<div class="chat-message clearfix"><img src="asset/gravatar.png" alt="" width="32" height="32"><div class="chat-message-content clearfix"><!--<span class="chat-time"></span>--><h5 style="width:79%; text-align:right;">You</h5><p style="text-align:right; margin-right:38px;">' +
    $(this).html()
    +'</p></div> <!-- end chat-message-content --></div> <!-- end chat-message --><hr>';
        $('.chat-history').append(messageTemplate);
       scrollToBottom();
	SendMessage($(this).html()); $('#actions').slideUp();

});
