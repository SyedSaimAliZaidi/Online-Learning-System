$(document).ready(function(){

    let list = new Array()
    $.get('http://localhost:3000/user/users',
        function(data){
            console.log(data)
            $.each(data.resources,function(index,item){
                list.push(item)
            })
            let student = list.filter(val => {
                return val.type === 'student'
            })
            $.each(student,function(index,item){
                renderClass(index,item,'.list')
            })
            let teacher = list.filter(val => {
                return val.type === 'teacher'
            })
            $.each(teacher,function(index,item){
                render_Class(index,item,'#list')
            })
        }
    )
    function renderClass(index,item,tableID){
        let htmlStr='';
        htmlStr += '<tr>'
        htmlStr += '<td scope="col" class="sort" data-sort="name">'+item.fname+' '+item.lname+'</td>'
        htmlStr += '<td scope="col" class="sort" data-sort="budget">'+item.email+'</td>'
        htmlStr += '<td scope="col" class="sort" data-sort="completion">'+item.uni+'</td>'
        htmlStr += '<td scope="col">'+item.course+'</td>'
        if(item.status==='inactive'){
            htmlStr += '<td scope="col" class="sort" data-sort="status">'
            htmlStr += '<span class="badge badge-dot mr-4">'
            htmlStr += '<i class="bg-warning"></i>'
            htmlStr += '<span class="status">'+item.status+'</span>'
            htmlStr += '</span></td>'    
        }
        else{
            htmlStr += '<td scope="col" class="sort" data-sort="status">'
            htmlStr += '<span class="badge badge-dot mr-4">'
            htmlStr += '<i class="bg-success"></i>'
            htmlStr += '<span class="status">'+item.status+'</span>'
            htmlStr += '</span></td>'    
        }
        
        htmlStr += '<td><button id="'+item.id+'" value='+item.status+' class="btn btn-icon btn-primary btn-sm status-update" type="button">'
        htmlStr += '<span class="btn-inner--icon"><i class="ni ni-send"></i></span>'
        htmlStr += '</button></td>'
        htmlStr += '</tr>'
        $(tableID).append(htmlStr)        
    }
    function render_Class(index,item,tableID){
        let htmlStr='';
        htmlStr += '<tr>'
        htmlStr += '<td scope="col" class="sort" data-sort="name">'+item.fname+' '+item.lname+'</td>'
        htmlStr += '<td scope="col" class="sort" data-sort="budget">'+item.email+'</td>'
        htmlStr += '<td scope="col" class="sort" data-sort="completion">'+item.uni+'</td>'
        htmlStr += '<td scope="col">'+item.subject+'</td>'
        if(item.status==='inactive'){
            htmlStr += '<td scope="col" class="sort" data-sort="status">'
            htmlStr += '<span class="badge badge-dot mr-4">'
            htmlStr += '<i class="bg-warning"></i>'
            htmlStr += '<span class="status">'+item.status+'</span>'
            htmlStr += '</span></td>'    
        }
        else{
            htmlStr += '<td scope="col" class="sort" data-sort="status">'
            htmlStr += '<span class="badge badge-dot mr-4">'
            htmlStr += '<i class="bg-success"></i>'
            htmlStr += '<span class="status">'+item.status+'</span>'
            htmlStr += '</span></td>'    
        }
        htmlStr += '<td><button id="'+item.id+'" value='+item.status+' class="btn btn-icon btn-primary btn-sm status-update" type="button">'
        htmlStr += '<span class="btn-inner--icon"><i class="ni ni-send"></i></span>'
        htmlStr += '</button></td>'
        htmlStr += '</tr>'
        $(tableID).append(htmlStr)        
    }

    $(document).on('click','.status-update',function(){
        console.log($(this).attr('id'),$(this).attr('value'))
        if($(this).attr('value').toString().toLowerCase()==='active'){
            link = 'http://localhost:3000/user/status'
            $.post(link,
                {
                    id : $(this).attr('id'),
                    status : 'inactive' ,
                },
                function(data){
                    console.log(data)
                    if(data.result==="Targeted user status has been updated."){
                        setTimeout(()=>{
                            window.location.reload()
                        },1000)
                    }
                }
            )    
        }
        else{
            link = 'http://localhost:3000/user/status'
            $.post(link,
                {
                    id : $(this).attr('id'),
                    status : 'active' ,
                },
                function(data){
                    console.log(data)
                    if(data.result==="Targeted user status has been updated."){
                        setTimeout(()=>{
                            window.location.reload()
                        },1000)
                    }
                }
            )    
        }
    })
})