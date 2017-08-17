let openChats = [];
let lastChatBox = '';

$(document).ready(function() {
      $('.chat_head').click(function() {
        $('.chat_body').slideToggle('slow');
      });

      // Close chatbox with X ------------------------------------------------------------------------------------------------------------------------------
      function msgClose(id) {
        $('#' + id + '.msg_box').remove();
        // TODO -- FIX the chatbox places
        removeFromOpen(id);
        restructureChatBoxes();
        //console.log(openChats);
      }
      // Hide chatbox --------------------------------------------------------------------------------------------------------------------------------------
      function msgHead(id) {
        $('#' + id + '.msg_wrap').slideToggle('slow');
      }

      // Send the message that was typed in textarea -------------------------------------------------------------------------------------------------------
      function sendText(id, event) {
        if (event.keyCode == 13) {
          event.preventDefault();
          var msg = $('.msg_input#' + id).val();
          $('.msg_input#' + id).val('');
          if (msg != '') {
            $('<div class="msg_b">' + msg + '</div>').insertBefore('.msg_push#' + id);
            $('.msg_body').scrollTop($('.msg_body')[0].scrollHeight);
            message = new Paho.MQTT.Message(currentUser + '~/,' + msg);
            message.destinationName = "chatroom/" + id;
            message.qos = 1;
            client.send(message);
          }
        }
      }

      // Open chatbox with the selected user ----------------------------------------------------------------------------------------------------------------
      function sendMsg(id) {
        if (!checkIfOpen(id)) {
          $('<div class="msg_box" id="' + id + '"style="right:' + openChats.length * 290 + 'px; display:none;">' +
            '<div class="msg_head" id="' + id + '" onclick="msgHead(\'' + id + '\')" >' + id + '<div class="close" id="' + id + '" onclick="msgClose(\'' + id + '\')"> X </div> </div>' +
            '<div class="msg_wrap" id="' + id + '"><div class="msg_body"><div class="msg_push" id="' + id + '"></div></div>' +
            '<div class="msg_footer">' +
            '<textarea id="' + id + '" onkeypress="sendText(\'' + id + '\',event)" class="msg_input" rows="3"></textarea>' +
            '</div>' +
            '</div>' +
            '</div>').insertAfter('.chat_box');
          $('.msg_wrap#' + id).show();
          $('.msg_box#' + id).show();
        } else {
          $('.msg_box#' + id).show();
          msgHead(id);
        }
      };

      // Display the recieved message ------------------------------------------------------------------------------------------------------------------------
      function gotMessage(id, msg) {
        //	console.log('Got a replay from '+id+' with the message :'+message);
        if (!checkIfOpen(id)) {
          $('<div class="msg_box" id="' + id + '"style="right:' + openChats.length * 290 + 'px; display:none;">' +
            '<div class="msg_head" id="' + id + '" onclick="msgHead(\'' + id + '\')" >' + id + '<div class="close" id="' + id + '" onclick="msgClose(\'' + id + '\')"> X </div> </div>' +
            '<div class="msg_wrap" id="' + id + '"><div class="msg_body"><div class="msg_push" id="' + id + '"></div></div>' +
            '<div class="msg_footer">' +
            '<textarea id="' + id + '" onkeypress="sendText(\'' + id + '\',event)" class="msg_input" rows="3"></textarea>' +
            '</div>' +
            '</div>' +
            '</div>').insertAfter('.chat_box');
          $('.msg_wrap#' + id).show();
          $('.msg_box#' + id).show();
          $('<div class="msg_a">' + msg + '</div><div class="date_class">' + new Date().toUTCString() + '</div>').insertBefore('.msg_push#' + id);
          $('.msg_body').scrollTop($('.msg_body')[0].scrollHeight);
        } else {
          $('<div class="msg_a">' + msg + '</div><div class="date_class">' + new Date().toUTCString() + '</div>').insertBefore('.msg_push#' + id);
          $('.msg_body').scrollTop($('.msg_body')[0].scrollHeight);
        }
      }


      function restructureChatBoxes() {

      }

      function checkIfOpen(name) {
        for (let i = 0; i <= openChats.length; i++) {
          if (openChats[i] === name) {
            return 1;
          }
        }
        openChats.push(name);
        return 0;
      }


      function removeFromOpen(id) {
        openChats = openChats.filter(function(e) {
          return e != id;
        });
      }
