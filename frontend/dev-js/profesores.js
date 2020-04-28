$(document).ready(function(){

    $('#signup').submit(function(e){
        e.preventDefault()
        if($('#password').val()===$('#re-pass').val()){
            console.log('in')
            $('.error').hide()
            $('.loader').show()
            $.post('http://localhost:3000/user/signup',{
            
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
        }
        else{
            $('.error').show()
        }
    })
    $('#login').submit(function(e){
        e.preventDefault()
        $('#loader').show()
                
        $.post('http://localhost:3000/user/signin',{
            email : $('#Email').val(),
            pwd   : $('#Pass').val(),
            type    : 'teacher',
        },
        function(data){
            console.log(data)
            if(data.result.status.toLowerCase()==="active"){
                $('#loader').hide()
                $('.login-alert').hide()
                $('.login-success').show()    
                setTimeout(()=>{
                    window.location.href = "./profesor.html";
                },1000)
            }
        })
    });

})