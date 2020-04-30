$(document).ready(function(){

    $('#signup').submit(function(e){
        e.preventDefault()
        if($('#password').val()===$('#re-pass').val()){
            $('.alert-password').hide()
            $('.loader').show()
            $.post('http://localhost:3000/user/signup',{
                    fname : $('#fname').val(),
                    lname : $('#lname').val(),
                    email : $('#email').val(),
                    pwd   : $('#password').val(),
                    uni   : $('#university').val(),
                    course : $('#course').val(),
                    phone  : $('#phone').val(),
                    type    : 'student',
                },
                function(data){
                    
                    console.log(data)
                    $('.loader').hide()
                    $('.alert-done').show()
                }
            )
        }
        else{
            $('.alert-password').show()
        }
    })
    $('#login').submit(function(e){
        e.preventDefault()
        $('#loader').show()
        $.post('http://localhost:3000/user/signin',{
                email : $('#Email').val(),
                pwd   : $('#Pass').val(),
                type    : 'student',
            },
            function(data){
                $('#loader').hide()
                $('.login-success').show()
                console.log(data)
                localStorage.setItem('sid',data.result.id)
                window.location.href = './estudiant.html';
            }
        )
    });

})