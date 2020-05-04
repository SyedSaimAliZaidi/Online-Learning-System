$(document).ready(function(){

    function getParameter(name) {
        if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.search))
            return decodeURIComponent(name[1]);
    }
    let name = getParameter('name')
    let code = getParameter('code')
    $('#title').html('Estudiant | '+name ) 
    $('.navbar-brand').html('Estudiant | '+name ) 

    let Quests = new Array()
    let index = 0;
    $.get('http://localhost:3000/resource/data?code='+code,function(data){
      console.log(data)
      $.each(data.resources,function(index,item){
        Quests.push(item)
      })
      renderItems(index,Quests[index])
    })



    function renderItems(index,item){
        let htmlStr='';
        let timer = item.timer;
        htmlStr += '<div class="col-lg-8">'
        htmlStr += '<div class="card"  style="cursor:pointer;background-color:white;height:60vh;">'
        htmlStr += '<div class="card-header" >'
        htmlStr += '<h4 class="card-title" style="cursor:pointer;">Question '+(index+1)+'</h4>'
        htmlStr += '<p class="card-title">'+item.ques_text+'</p>'
        htmlStr += '</div>'
        
        htmlStr += '<div class="card-body">'
        
        htmlStr += '<audio id="question" controls>'
        htmlStr += '<source src="../Recordings/'+item.ques_rec+'" type="audio/ogg">'
        htmlStr += 'Your browser does not support the audio element.'
        htmlStr += '</audio>'
        

        htmlStr += '<div style="display:none;"><h4 class="card-title mt-5" style="cursor:pointer;">Answer '+(index+1)+'</h4>'
        htmlStr += '<p class="card-title">'+item.ans_text+'</p>'
        htmlStr += '<audio id="question" controls>'
        htmlStr += '<source src="../Recordings/'+item.ans_rec+'" type="audio/ogg">'
        htmlStr += 'Your browser does not support the audio element.'
        htmlStr += '</audio></div>'

        htmlStr += '</div>'
        htmlStr += '<div class="card-footer text-right" >'
        htmlStr += '<button class="btn btn-default btn-link" id="next-quest">'
        htmlStr += 'Next <i class="tim-icons icon-double-right"></i>'
        htmlStr += '</button>'

        htmlStr += '</div>'

        htmlStr += '</div>'
        htmlStr += '</div>'


        htmlStr += '<div class="col-lg-4" >'
        htmlStr += '<div class="card"  style="cursor:pointer;height:60vh;background-color:white;">'
        htmlStr += '<div class="card-header text-center mt-3" >'
        htmlStr += '<h3 class="card-title" style="cursor:pointer;">Timer</h3>'
        htmlStr += '<h4 id="app"  style="color:black;"></h4>'
        htmlStr += '<h4 id="app1"  style="color:black;display:none;">0:00</h4>'
        htmlStr += '</div>'
        htmlStr += '<div class="card-body text-center mt-5">'
        
        htmlStr += '<div><button class="btn btn-danger" id="stop-alaram" value="'+timer+'">'
        htmlStr += 'Stop Timer <i class="tim-icons icon-time-alarm"></i>'
        htmlStr += '</button></div>'
        htmlStr += '<div><button class="btn btn-default" id="replay">'
        htmlStr += 'Play From Start <i class="tim-icons icon-refresh-02"></i>'
        htmlStr += '</button></div>'

        htmlStr += '</div>'
        htmlStr += '</div>'
        htmlStr += '</div>'


        $('.render-items').html(htmlStr)    
               
        setTimer(timer)
        autoPlay()    
       
 
    }
    function autoPlay(){
      var x = document.getElementById("question");
      x.autoplay = true;
      x.load();
    }
    function setTimer(timer){
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
        
        const TIME_LIMIT = 60 * parseInt(timer) ;
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
         
    
    }

    $(document).on('click','#stop-alaram',function(e){
      $('#app').hide()
      $('#app1').show()
    })
    $(document).on('click','#replay',function(e){
      autoPlay()
      console.log($(this).attr('value'))
      
    })
    $(document).on('click','#next-quest',function(e){
      index = index+1
      renderItems(index,Quests[index]) 
    })
});
