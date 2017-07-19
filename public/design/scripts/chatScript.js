
var openChats = 1;
var lastChatBox = '';

$(document).ready(function(){
	$('.chat_head').click(function(){

		$('.chat_body').slideToggle('slow');
	});

});

// Open chatbox with the selected user -------------------------------------------------------------------------------------------------------
function sendMsg(id){
	if(lastChatBox!=id){
		$('<div class="msg_box" id="'+id+'"style="right:'+openChats*290+'px; display:none;">'+
				'<div class="msg_head" id="'+id+'" onclick="msgHead(\''+id+'\')" >'+ id +'<div class="close" id="'+id+'" onclick="msgClose(\''+id+'\')"> X </div> </div>'+
				'<div class="msg_wrap" id="'+id+'"><div class="msg_body"><div class="msg_push" id="'+id+'"></div></div>'+
						'<div class="msg_footer">'+
								'<textarea id="'+id+'" onkeypress="sendText(\''+id+'\',event)" class="msg_input" rows="3"></textarea>'+
					  '</div>'+
				'</div>'+
			'</div>').insertAfter('.chat_box');
		$('.msg_wrap#'+id).show();
		$('.msg_box#'+id).show();
		openChats++;
		lastChatBox = id;
	}
};

// Close chatbox with X -------------------------------------------------------------------------------------------------------
function msgClose(id){
	$('.msg_box#'+id).hide();
	// TODO -- FIX the chatbox places
}
// Hide chatbox ---------------------------------------------------------------------------------------------------------------
function msgHead(id){
	$('.msg_wrap#'+id).slideToggle('slow');
}

// Send the messaged that was typed in textarea -------------------------------------------------------------------------------------------------------
function sendText(id,event){
	if (event.keyCode == 13){
		event.preventDefault();
		var msg = $('.msg_input#'+id).val();
		$('.msg_input#'+id).val('');
		if(msg!=''){
			$('<div class="msg_b">'+msg+'</div>').insertBefore('.msg_push#'+id);
			$('.msg_body').scrollTop($('.msg_body')[0].scrollHeight);
			message = new Paho.MQTT.Message(msg);
			message.destinationName = "chatroom/"+id;
			message.qos = 1;
			client.send(message);
		}
	}
}

// Display the recieved message -------------------------------------------------------------------------------------------------
function gotMessage(id,message){
	console.log('Got a replay from '+id+' with the message :'+message);
}
