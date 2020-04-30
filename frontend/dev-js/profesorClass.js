$(document).ready(function(){

    function getParameter(name) {
        if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.search))
            return decodeURIComponent(name[1]);
    }
    name = getParameter('name')
    $('#title').html('Profesor | '+name ) 
    $('.navbar-brand').html('Profesor | '+name ) 

});