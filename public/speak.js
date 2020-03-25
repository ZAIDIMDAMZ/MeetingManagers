function upgrade() {
    alert('Please use Google Chrome for best experience');
  }

  window.onload = function() {
    if (!(window.webkitSpeechRecognition) && !(window.speechRecognition)) {
      upgrade();
    } else {
      var recognizing,
      transcription = document.getElementById('speech'),
      interim_span = document.getElementById('interim');

      interim_span.style.opacity = '0.5';


      function reset() {
        recognizing = false;
        interim_span.innerHTML = '';
        transcription.innerHTML = '';
        speech.start();
      }

      var speech = new webkitSpeechRecognition() || speechRecognition();

      speech.continuous = true;
      speech.interimResults = true;
      speech.lang = 'fr-FR'; // check google web speech example source for more lanuages
      speech.start(); //enables recognition on default

      speech.onstart = function() {
          // When recognition begins
          recognizing = true;
      };

      speech.onresult = function(event) {
        // When recognition produces result
        var interim_transcript = '';
        var final_transcript = '';

        // main for loop for final and interim results
        for (var i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            final_transcript += event.results[i][0].transcript;
          } else {
            interim_transcript += event.results[i][0].transcript;
          }
        }
        transcription.innerHTML = final_transcript;
        interim_span.innerHTML = interim_transcript;
      };

      speech.onerror = function(event) {
          // Either 'No-speech' or 'Network connection error'
          console.error(event.error);
      };

      speech.onend = function() {
          // When recognition ends
          reset();
      };

    }
  };

  $(function() {
    var INDEX = 0; 
    $("#chat-submit").click(function(e) {
      e.preventDefault();
      var msg = $("#chat-input").val(); 
      if(msg.trim() == ''){
        return false;
      }
      
    })
    

    
    $(document).delegate(".chat-btn", "click", function() {
      var value = $(this).attr("chat-value");
      var name = $(this).html();
      $("#chat-input").attr("disabled", false);
      generate_message(name, 'self');
    })
    
    $("#chat-circle").click(function() {    
      $("#chat-circle").toggle('scale');
      $(".chat-box").toggle('scale');
    })
    
    $(".chat-box-toggle").click(function() {
      $("#chat-circle").toggle('scale');
      $(".chat-box").toggle('scale');
    })
    
  })