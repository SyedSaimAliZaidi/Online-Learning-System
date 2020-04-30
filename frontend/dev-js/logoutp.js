$(document).ready(function(){

    $(document).on('click','#logout',function(){
        localStorage.removeItem('pid')
        window.location.replace('./profesores.html')
    })

})