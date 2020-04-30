$(document).ready(function(){

    $(document).on('click','#logout',function(){
        localStorage.removeItem('sid')
        window.location.replace('./estudiantes.html')
    })

})