
$(document).ready(function(){

    console.log(localStorage.getItem('pid'))
    getClasses()
    
    $('#add-class').submit(function(e){
        e.preventDefault()
        $('.loader').show()
        $.post('http://localhost:3000/resource/course',
            {
                tid : localStorage.getItem('pid'),
                name : $('#classname').val(),
            },
            function(data){
                $('.loader').hide()
                $('.alert-success').show()
                setTimeout(()=>{
                    window.location.reload()
                },1000)
            }
        )
    })

    function getClasses(){
        $.get('http://localhost:3000/resource/courses/myCourses?tid='+localStorage.getItem('pid'),
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
        htmlStr += '<div class="col-lg-3" >'
        htmlStr += '<div class="card" id="'+item.code+'" style="cursor:pointer;">'
        htmlStr += '<div class="card-header" id='+item.name+'>'
        htmlStr += '<h4 class="card-title" id="'+item.name+'" style="cursor:pointer;">'+item.name+'</h4>'
        htmlStr += '</div>'
        htmlStr += '<div class="card-footer text-right">'
        htmlStr += '<button id="'+item.tid+'" class="btn btn-primary btn-link">'
        htmlStr += 'View <i class="tim-icons icon-double-right"></i>'
        htmlStr += '</button>'
        htmlStr += '</div>'
        htmlStr += '</div>'
        htmlStr += '</div>'
        $('.render-classes').append(htmlStr)    
    }

    $(document).on('click','.card',function(){
        // alert()
        code = $(this).attr('id')
        name = code.split('-')[0];
        window.location.assign('./profesorClass.html?name='+name+'&code='+code);
    })
})
