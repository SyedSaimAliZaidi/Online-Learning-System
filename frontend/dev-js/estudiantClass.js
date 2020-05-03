$(document).ready(function(){

    function getParameter(name) {
        if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.search))
            return decodeURIComponent(name[1]);
    }
    let name = getParameter('name')
    let code = getParameter('code')
    $('#title').html('Estudiant | '+name ) 
    $('.navbar-brand').html('Estudiant | '+name ) 

    $.get('http://localhost:3000/resource/data?code='+code,function(data){
        console.log(data)
        $.each(data.resources,function(index,item){
          renderItems(index,item)
        })        
        setTimer()
    })



    function renderItems(index,item){
        let htmlStr='';
        htmlStr += '<div class="col-lg-8">'
        htmlStr += '<div class="card"  style="cursor:pointer;background-color:white;height:60vh;">'
        htmlStr += '<div class="card-header" >'
        htmlStr += '<h4 class="card-title" style="cursor:pointer;">Question '+(index+1)+'</h4>'
        htmlStr += '<p class="card-title">'+item.ques_text+'</p>'
        htmlStr += '</div>'
        
        htmlStr += '<div class="card-body">'
        
        htmlStr += '<audio id="myAudio" controls>'
        htmlStr += '<source src="../Recordings/'+item.ques_rec+'" type="audio/ogg">'
        htmlStr += 'Your browser does not support the audio element.'
        htmlStr += '</audio>'
        

        htmlStr += '<div style="display:none;"><h4 class="card-title mt-5" style="cursor:pointer;">Answer '+(index+1)+'</h4>'
        htmlStr += '<p class="card-title">'+item.ans_text+'</p>'
        htmlStr += '<audio id="myAudio" controls>'
        htmlStr += '<source src="../Recordings/'+item.ans_rec+'" type="audio/ogg">'
        htmlStr += 'Your browser does not support the audio element.'
        htmlStr += '</audio></div>'
        
        
        htmlStr += '</div>'
        htmlStr += '</div>'
        htmlStr += '</div>'


        htmlStr += '<div class="col-lg-4" >'
        htmlStr += '<div class="card"  style="cursor:pointer;height:60vh;background-color:white;">'
        htmlStr += '<div class="card-body text-center mt-5">'
        htmlStr += '<div id="app"  style="color:black;"></div>'
        htmlStr += '</div>'
        htmlStr += '</div>'
        htmlStr += '</div>'


        $('.render-items').append(htmlStr)    
        
    }

    function setTimer(){
        const FULL_DASH_ARRAY = 283;
        const WARNING_THRESHOLD = 10;
        const ALERT_THRESHOLD = 5;
        
        const COLOR_CODES = {
          info: {
            color: "green"
          },
          warning: {
            color: "orange",
            threshold: WARNING_THRESHOLD
          },
          alert: {
            color: "red",
            threshold: ALERT_THRESHOLD
          }
        };
        
        const TIME_LIMIT = 60 * 6 ;
        let timePassed = 0;
        let timeLeft = TIME_LIMIT;
        let timerInterval = null;
        let remainingPathColor = COLOR_CODES.info.color;
        
        document.getElementById("app").innerHTML = `
        <div class="base-timer"  style="color:black;">
          <span id="base-timer-label" style="color:black;" class="base-timer__label">${formatTime(
            timeLeft
          )}</span>
        </div>
        `;
        
        startTimer();
        
        function onTimesUp() {
          clearInterval(timerInterval);
        }
        
        function startTimer() {
          timerInterval = setInterval(() => {
            timePassed = timePassed += 1;
            timeLeft = TIME_LIMIT - timePassed;
            document.getElementById("base-timer-label").innerHTML = formatTime(
              timeLeft
            );
            setCircleDasharray();
            setRemainingPathColor(timeLeft);
        
            if (timeLeft === 0) {
              onTimesUp();
            }
          }, 1000);
        }
        
        function formatTime(time) {
          const minutes = Math.floor(time / 60);
          let seconds = time % 60;
        
          if (seconds < 10) {
            seconds = `0${seconds}`;
          }
        
          return `${minutes}:${seconds}`;
        }
        
        function setRemainingPathColor(timeLeft) {
          const { alert, warning, info } = COLOR_CODES;
          if (timeLeft <= alert.threshold) {
            document
              .getElementById("base-timer-path-remaining")
              .classList.remove(warning.color);
            document
              .getElementById("base-timer-path-remaining")
              .classList.add(alert.color);
          } else if (timeLeft <= warning.threshold) {
            document
              .getElementById("base-timer-path-remaining")
              .classList.remove(info.color);
            document
              .getElementById("base-timer-path-remaining")
              .classList.add(warning.color);
          }
        }
        
        function calculateTimeFraction() {
          const rawTimeFraction = timeLeft / TIME_LIMIT;
          return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
        }
        
        function setCircleDasharray() {
          const circleDasharray = `${(
            calculateTimeFraction() * FULL_DASH_ARRAY
          ).toFixed(0)} 283`;
          document
            .getElementById("base-timer-path-remaining")
            .setAttribute("stroke-dasharray", circleDasharray);
        }    
    
    }

});
