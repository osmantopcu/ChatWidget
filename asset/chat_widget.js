var conversationId;
var returnedToken;
var streamUrl;
var messages;
$(document).ready(function() {

window.mobileAndTabletcheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

if(window.mobileAndTabletcheck()) {
$(window).on("orientationchange",function(){
    $('#txtMessage').css('width', (window.innerWidth - 100) + 'px');
  $('.chat-history').css('height',(window.innerHeight -121) + 'px');
  scrollToBottom();
});

$('#txtMessage').css('width', (window.innerWidth - 100) + 'px');
$('.chat-history').css('height',(window.innerHeight -121) + 'px');

}
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

$('#btnSend').click(function() {
    if ($('#txtMessage').val().length == 0) return;

    var messageTemplate = '<div class="chat-message clearfix"><img src="asset/gravatar.png" alt="" width="32" height="32"><div class="chat-message-content clearfix"><!--<span class="chat-time"></span>--><h5 class="username">You</h5><p style="text-align:right; margin-right:38px;">' +
    $('#txtMessage').val()
    +'</p></div> <!-- end chat-message-content --></div> <!-- end chat-message --><hr>';
        $('.chat-history').append(messageTemplate);
       scrollToBottom();
        SendMessage($('#txtMessage').val());
        //AddFromBotMessage();
        $('#txtMessage').val('');
});

$('#txtMessage').bind("keypress", {}, keypressInBox);

function keypressInBox(e) {
    var code = (e.keyCode ? e.keyCode : e.which);
    if (code == 13) {
        
    var messageTemplate = '<div class="chat-message clearfix"><img src="asset/gravatar.png" alt="" width="32" height="32"><div class="chat-message-content clearfix"><!--<span class="chat-time"></span>--><h5 class="username">You</h5><p style="text-align:right; margin-right:38px;">' +
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
    var messageTemplate = '<div class="chat-message clearfix"><img src="asset/gravatar.png" alt="" width="32" height="32"><div class="chat-message-content clearfix"><!--<span class="chat-time"></span>--><h5 class="username">You</h5><p style="text-align:right; margin-right:38px;">' +
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
        'Authorization':'Bearer D9ngX-vYf0g.cwA.Rt0.RweRlmmFWptQFJPSya8Slry8M2iLaMyyjr-lBzrdqbQ' },
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
                           "from": {"id": userGuid},
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
            if (item.from.id == userGuid) {
                AddMessage(item.text);
            }
            else {
                console.log('item.text: ' + item.text);
                
                console.log('item: ', JSON.stringify(item));
                if(item.text != undefined) {
                    AddMessageFromBot(item.text);
                    lastBotResponseTextLength = item.text.length; 
                }
                else {
                    if (item.attachments.length > 0) {
                        for (i = 0; i < item.attachments.length; i++) {
                            AddMessageFromBot('<a href="'+ item.attachments[i].contentUrl +'" target="_blank">'+ item.attachments[i].contentUrl +'</a>');
                        }
                    }
                }
                
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

$('.actionItem').click(function() {
	if($(this).attr('class').includes('current')) return;
    var thisIndex = $(this).index();
    var currentIndex = $(this).parent('div').children('.current').index();

    $(this).parent('div').children('.current').removeClass('current');
    $(this).parent('div').parent('div').children('.actionSubList').children('.current').removeClass('current');

    $('.actionItem:eq(' + thisIndex +')').addClass('current');
    $('.actionSubItem:eq(' + thisIndex +')').addClass('current');
});

$('#actions .actionSubList .actionSubItem ul li a').click(function() {
	$('#btnAction').children('img').attr('src','asset/plus.png');
	var messageTemplate = '<div class="chat-message clearfix"><img src="asset/gravatar.png" alt="" width="32" height="32"><div class="chat-message-content clearfix"><!--<span class="chat-time"></span>--><h5 style="width:79%; text-align:right;">You</h5><p style="text-align:right; margin-right:38px;">' +
    $(this).html()
    +'</p></div> <!-- end chat-message-content --></div> <!-- end chat-message --><hr>';
        $('.chat-history').append(messageTemplate);
       scrollToBottom();
	SendMessage($(this).html()); $('#actions').slideUp();

});
