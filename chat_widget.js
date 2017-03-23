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


$('#txtMessage').bind("keypress", {}, keypressInBox);

function keypressInBox(e) {
    var code = (e.keyCode ? e.keyCode : e.which);
    if (code == 13) {
        //AddMessage();
        SendMessage($('#txtMessage').val());
        //AddFromBotMessage();
        $('#txtMessage').val('');
      }
};


});

function AddMessage(message) {
    var messageTemplate = '<div class="chat-message clearfix"><img src="gravatar.png" alt="" width="32" height="32"><div class="chat-message-content clearfix"><!--<span class="chat-time"></span>--><h5 style="width:79%; text-align:right;">You</h5><p style="text-align:right; margin-right:38px;">' +
    message
    +'</p></div> <!-- end chat-message-content --></div> <!-- end chat-message --><hr>';
    messages += messageTemplate;
    scrollToBottom();
};

function AddFromBotMessage(message) {
    var messageTemplate = '<div class="chat-message clearfix"><img style="float:left !important;" src="bot_gravatar.png" alt="" width="32" height="32"><div class="chat-message-content clearfix"><!--<span class="chat-time"></span>--><h5>Proliant Agent</h5><p>' +
    message
    +'</p></div> <!-- end chat-message-content --></div> <!-- end chat-message --><hr>';
    $('#message').val('');
    messages += messageTemplate;
    scrollToBottom();
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
        AddMessage(message);
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
        if(data.activities.length > 0) {
        $.each(data.activities, function(i, item) {
            if (item.from.id == 'user1') {
                AddMessage(item.text);
            }
            else {
                AddFromBotMessage(item.text);
            }
})
            if (messages.length > $('.chat-history').html().length)
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
  $('li').click(function(ev) {
    $(this).find('>ul').slideToggle();
    ev.stopPropagation();
});