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

    })



    function renderItems(index,item){
        let htmlStr='';
        htmlStr += '<div class="col-lg-3" >'
        htmlStr += '<div class="card"  style="cursor:pointer;">'
        htmlStr += '<div class="card-header" >'
        htmlStr += '<h4 class="card-title" style="cursor:pointer;">Question '+(index+1)+'</h4>'
        htmlStr += '<audio id="myAudio">'
        htmlStr += '<source src="http://localhost:3000/Recordings/'+item.ques_rec+'" type="audio/ogg">'
        htmlStr += 'Your browser does not support the audio element.'
        htmlStr += '</audio>'
        htmlStr += '</div>'
        htmlStr += '</div>'
        htmlStr += '</div>'
        $('.render-items').append(htmlStr)    
    }


});