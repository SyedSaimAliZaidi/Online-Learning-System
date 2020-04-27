$(document).ready(function(){

    $('#signup').submit(function(e){
        e.preventDefault()
        if($('#password').val()===$('#re-pass').val()){
            $('.alert-warning').hide()
            axios.post('http://localhost:3000/user/signup',{
                body: {
                    fname : $('#fname').val(),
                    lname : $('#lname').val(),
                    email : $('#email').val(),
                    pwd   : $('#password').val(),
                    uni   : $('#university').val(),
                    subject : $('#subject').val(),
                    type    : 'teacher',
                }
            })
            .then(response=>{
                console.log(response)
                $('.alert-success').show()
            })
            .catch(err=>{
                console.log(err)
            })
        }
        else{
            $('.alert-warning').show()
        }
    })
    $('#login').submit(function(e){
        e.preventDefault()
        axios.post('http://localhost:3000/user/signup',{
            body: {
                email : $('#Email').val(),
                pwd   : $('#Pass').val(),
                type    : 'teacher',
            }
        })
        .then(response=>{
            console.log(response)
            $('.login-alert').hide()
            $('.login-success').show()
        })
        .catch(err=>{
            console.log(err)
            $('.login-alert').show()
            $('.login-success').hide()
        })
    });

})