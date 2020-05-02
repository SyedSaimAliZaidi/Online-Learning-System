
$(document).ready(function(){

    console.log(localStorage.getItem('sid'))

    getClasses()
    $('#add-class').submit(function(e){
        e.preventDefault()
        $('.loader').show()
        $.post('http://localhost:3000/resource/enroll',
            {
                sid : localStorage.getItem('sid'),
                code : $('#code').val(),
            },
            function(data){
                console.log(data)
                $('.loader').hide()
                $('.alert-success').show()
                setTimeout(()=>{
                    window.location.reload()
                },1000)
            }
        )
    })

    function getClasses(){
        $.get('http://localhost:3000/resource/enrolled?sid='+localStorage.getItem('sid'),
            function(data){
                console.log(data)
                $.each(data.resources,function(index,item){
                    renderClass(item);
                })
            }
        )
    }
    function renderClass(item){
        let htmlStr='';
        name = item
        htmlStr += '<div class="col-lg-3" >'
        htmlStr += '<div class="card" id="'+name+'" style="cursor:pointer;">'
        htmlStr += '<div class="card-header" id='+name+'>'
        htmlStr += '<h4 class="card-title" id="'+name+'" style="cursor:pointer;">'+name.split('-')[0]+'</h4>'
        htmlStr += '</div>'
        htmlStr += '<div class="card-footer text-right">'
        htmlStr += '<button id="'+name+'" class="btn btn-primary btn-link">'
        htmlStr += 'View <i class="tim-icons icon-double-right"></i>'
        htmlStr += '</button>'
        htmlStr += '</div>'
        htmlStr += '</div>'
        htmlStr += '</div>'
        $('.render-classes').append(htmlStr)    
    }

    $(document).on('click','.card',function(){
        // alert()
        item = $(this).attr('id')
        name = item.split('-')[0]
        window.location.assign('./estudiantClass.html?name='+name+'&code='+$(this).attr('id'));
    })
})
