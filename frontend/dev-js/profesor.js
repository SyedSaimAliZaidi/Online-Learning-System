
$(document).ready(function(){

    $('#add-class').submit(function(e){
        e.preventDefault()
        $.post('http://localhost:3000/user/signup',
            {
                fname : $('#fname').val(),
                lname : $('#lname').val(),
                email : $('#email').val(),
                pwd   : $('#password').val(),
                uni   : $('#university').val(),
                subject : $('#subject').val(),
                type    : 'teacher',
            },
            function(data){
                $('.loader').hide()
                console.log(data)
                $('.success').show()
            }
        )
    })

    let htmlStr='';
    htmlStr += '<div class="col-lg-3">'
    htmlStr += '<div class="card">'
    htmlStr += '<div class="card-header">'
    htmlStr += '<h4 class="card-title" >Class Name</h4>'
    htmlStr += '</div>'
    htmlStr += '<div class="card-footer text-right">'
    htmlStr += '<button class="btn btn-primary btn-link">'
    htmlStr += '<i class="tim-icons icon-trash-simple"></i>'
    htmlStr += '</button>'
    htmlStr += '<button class="btn btn-primary btn-link">'
    htmlStr += '<i class="tim-icons icon-pencil"></i>'
    htmlStr += '</button>'                  
    htmlStr += '</div>'
    htmlStr += '</div>'
    htmlStr += '</div>'
    $('.render-classes').append(htmlStr)

})
