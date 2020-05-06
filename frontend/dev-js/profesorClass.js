$(document).ready(function(){

    function getParameter(name) {
        if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.search))
            return decodeURIComponent(name[1]);
    }
    name = getParameter('name')
    code = getParameter('code')
    $('#title').html('Profesor | '+name ) 
    $('.navbar-brand').html('Profesor | '+name ) 
    $('#code').val(code)
    renderQuestions()
    function renderQuestions(){
        $.get('http://localhost:3000/resource/data?code='+code,function(data){
            console.log(data)
            $.each(data.resources,function(index,item){
                let htmlStr='';
                htmlStr += '<div class="col-lg-12" >'
                htmlStr += '<div class="card"  style="cursor:pointer;">'
                htmlStr += '<div class="card-header" >'
                htmlStr += '<h4 class="card-title" style="cursor:pointer;">Question '+(index+1)+'</h4>'
                htmlStr += '</div>'
                
                htmlStr += '<div class="card-body">'
                htmlStr += '<p style="color:black;">Question : '+item.ques_text+'</p>'
                htmlStr += '<audio id="myAudio" controls>'
                htmlStr += '<source src="../Recordings/'+item.ques_rec+'" type="audio/ogg">'
                htmlStr += 'Your browser does not support the audio element.'
                htmlStr += '</audio>'
                htmlStr += '<p  style="color:black;">Answer : '+item.ans_text+'</p>'
                htmlStr += '<audio id="myAudio" controls>'
                htmlStr += '<source src="../Recordings/'+item.ans_rec+'" type="audio/ogg">'
                htmlStr += 'Your browser does not support the audio element.'
                htmlStr += '</audio>'
                htmlStr += '<p  style="color:black;">Timer : '+item.timer+' min</p>'
                htmlStr += '</div>'
                htmlStr += '</div>'
                htmlStr += '</div>'
                $('.render-classes').append(htmlStr)
            })
        })
        
    }


    let timer= ''
    var  ans_rec=null;
    var ques_rec=null;
    $('#ques_rec').change(function(e){
        if (this.files && this.files[0]) {            
            console.log(this.files[0])
            ques_rec = this.files[0]
            console.log(this.files[0])
        }
    })
    $('#ans_rec').change(function(e){
        if (this.files && this.files[0]) {            
            console.log(this.files[0])
            ans_rec= this.files[0]
            console.log(this.files[0])
        }
    })
    $('#add-question').submit(function(e){
        e.preventDefault()
        let formdata = new FormData()
        formdata.append('code',code)
        formdata.append('ques_rec',ques_rec)
        formdata.append('ques_text',$('#q-text').val())
        formdata.append('ans_rec',ans_rec)
        formdata.append('ans_text',$('#a-text').val())
        formdata.append('timer',$('#timer').val())
        console.log(ques_rec)

        console.log(ans_rec)
        console.log(code, $('#q-text').val(),$('#a-text').val(),$('#timer').val())
        $.post( 'http://localhost:3000/resource/addData', 
            formdata,
        function(data){
            console.log(data)
        })
        
    })
});