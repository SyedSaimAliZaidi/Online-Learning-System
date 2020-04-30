
$(document).ready(function(){

    console.log(localStorage.getItem('sid'))
    $('#add-class').submit(function(e){
        e.preventDefault()
        $.post('http://localhost:3000/resource/enroll',
            {
                sid : localStorage.getItem('sid'),
                code : $('#code').val(),
            },
            function(data){
                console.log(data)
                renderClass(data.resources)
                $('.bd-example-modal-sm').hide()
                // $('.loader').hide()
                // $('.success').show()
            }
        )
    })

    $.get('http://localhost:3000/resource/enrolled?sid='+localStorage.getItem('sid'),
        function(data){
            $.each(data.resources,function(index,item){
                renderClass(item);
            })
        }
    )
    function renderClass(item){
        let htmlStr='';
        htmlStr += '<div class="col-lg-3" >'
        htmlStr += '<div class="card" id="'+item.name+'" style="cursor:pointer;">'
        htmlStr += '<div class="card-header" id='+item.name+'>'
        htmlStr += '<h4 class="card-title" id="'+item.name+'" style="cursor:pointer;">'+item.name+'</h4>'
        htmlStr += '</div>'
        htmlStr += '<div class="card-footer text-right">'
        htmlStr += '<button id="'+item.tid+'" class="btn btn-primary btn-link">'
        htmlStr += '<i class="tim-icons icon-trash-simple"></i>'
        htmlStr += '</button>'
        htmlStr += '<button  id="'+item.tid+'" class="btn btn-primary btn-link">'
        htmlStr += '<i class="tim-icons icon-pencil"></i>'
        htmlStr += '</button>'                  
        htmlStr += '</div>'
        htmlStr += '</div>'
        htmlStr += '</div>'
        $('.render-classes').append(htmlStr)    
    }

    $(document).on('click','.card',function(){
        // alert()
        name = $(this).attr('id')
        window.location.assign('./profesorClass.html?name='+name);
    })
    $('.card-header').click(function(){
        // name = $(this).attr('id')
        // window.location.assign('./profesorClass.html?name='+name);
    })
})
