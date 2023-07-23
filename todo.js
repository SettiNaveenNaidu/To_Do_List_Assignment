
var todo=[]
let id=0
var input_text=document.getElementById('input_text')
var tasks=document.getElementById('tasks')
var due_date=document.getElementById('date')
var priority=document.getElementById('priority')
var add_button=document.getElementById('add_button')


/*Adding Task*/
function adding_task()
{    
        var task_name=input_text.value
        var date=new Date(due_date.value)
        var puredate = date.toISOString().slice(0, 10)+'  '+date.toISOString().slice(11, 16)
        /*if(priority==null || date==null){alert('enter all fields')}*/
        var prio=priority.value
        if(task_name==='')
        {
            alert('Add Something')
        }
        else
        {
        var todoObj={
        taskId:id++,
        taskname:task_name,
        duedates:puredate,
        duetime:date,
        priority:prio,
        completed:false
        }
        todo.push(todoObj)
        renderTask(todo)
        input_text.value=""    
    }
    add_button.innerText='Add Task'
}

/*Rendering Task Items*/
function renderTask()
{
    tasks.innerHTML=''
    for(var i=0;i<todo.length;i++)
    {   
    var newitem=document.createElement('div')
    newitem.classList.add('task_item')
    var btn=document.createElement('div')
    btn.classList.add('buttons')

/*Checkbox*/
    var check=document.createElement('input')
    check.setAttribute('taskId',todo[i].taskId)
    check.setAttribute('type','checkbox')
    check.classList.add('checkbox')
    check.addEventListener('change',checked)
    if(todo[i].completed==true)
    {
        check.checked=true
    }

/*Input Element*/
    var newp=document.createElement('input')
    newp.classList.add('each_task_input')
    newp.value=todo[i].taskname
    newp.setAttribute('taskId',todo[i].taskId)
    newp.setAttribute('readonly','true')

/*Due Date*/
    var date_task=document.createElement('input')
    date_task.classList.add('due_date')
    date_task.value=todo[i].duedates

/*Delete Button*/
    var del=document.createElement('button')
    del.classList.add('delete')
    del.innerText='Delete'
    del.taskId=todo[i].taskId
    del.setAttribute('taskId',todo[i].taskId)
    del.addEventListener('click',deleteTask)

/*Edit Button*/
    var edit=document.createElement('button')
    edit.classList.add('edit')
    edit.innerText='Edit'
    edit.setAttribute('taskId',todo[i].taskId)
    edit.addEventListener('click',editTask)

/*Appending all child items*/
   btn.appendChild(check)
    btn.appendChild(newp)
    btn.appendChild(del)
    btn.appendChild(edit)
    newitem.appendChild(btn)
    newitem.appendChild(date_task)
    tasks.appendChild(newitem)   
    }   
}

/*Delete Function*/
function deleteTask(e)
{
    let ind=todo.findIndex(k=>k.taskId == e.target.getAttribute('taskId'))
    todo.splice(ind,1)
    renderTask()
}

/*Checked*/
function checked(e)
{
    let ind=todo.findIndex(k=>k.taskId == e.target.getAttribute('taskId'))

    todo[ind].completed=!todo[ind].completed
    renderTask()
}

/*Edit Function*/
function editTask(e)
{
    let parent=e.target.parentNode
    let val=e.target.parentNode.childNodes[1];
    val.removeAttribute('readonly')
    val.focus()
    e.target.parentNode.childNodes[3].style.display='none'
    let imp=todo.findIndex(k=>k.taskId == e.target.getAttribute('taskId'))
    save=document.createElement('button')
    save.classList.add('save')
    save.innerText='save'
    parent.append(save)
    save.addEventListener('click',saving)
    function saving()
    {
        if(val.value=='')
        {
            alert('Enter something')
        }
        else
        {
        todo[imp].taskname=val.value
        val.setAttribute('readonly','true')
        e.target.parentNode.childNodes[3].style.display='block'
        save.remove()
        }
    }  
}

/*All Tasks*/
function AllTasks(){
    renderTask()
}

/*Completed*/
function completed(){
    let completedarr = todo.filter(item=>
     item.completed==true
     )
     console.log(completedarr)
    displayonly(completedarr)
}

/*Expired*/
function expired()
{
    var test=new Date() 
    var expired_arr=todo.filter(item=>item.duetime-test<0)
    console.log(expired_arr)
    displayonly(expired_arr)
}

/*Ongoing*/
function ongoing(){
    let ongoingarr=todo.filter(item=>item.completed==false)
    displayonly(ongoingarr)
}

/*Searching*/
const searching=document.getElementById('search')
searching.addEventListener('input',(e)=>{
    var to_search=e.target.value.toLowerCase()
    var ele = todo.filter(item=>item.taskname.toLowerCase().indexOf(to_search)>-1)
    displayonly(ele) 
})

/*Priority */ 
var priority_sort=document.getElementById('priority_val')
priority_sort.addEventListener('change',
(event)=>
{
const selectedIndex = event.target.selectedIndex;
const selected_value = event.target.options[selectedIndex].value
const Order = { "high": 3,"medium": 2,"low": 1}; 
var priority_arr=todo
function comparing(a,b)
{
    return Order[b.priority] - Order[a.priority];
}
priority_arr.sort(comparing)
if(selected_value=='high_to_low')
{
    priority_arr=priority_arr
    displayonly(priority_arr)
}
else{
    priority_arr=[...priority_arr].reverse()
    displayonly(priority_arr)
}
})




function displayonly(todok)
{
    tasks.innerHTML=''
    for(var i=0;i<todok.length;i++)
    {   
    var newitem=document.createElement('div')
    newitem.classList.add('task_item')
    var btn=document.createElement('div')
    btn.classList.add('buttons')
    var check=document.createElement('input')
    check.setAttribute('taskId',todok[i].taskId)
    check.setAttribute('type','checkbox')
    check.classList.add('checkbox')
    check.addEventListener('change',checked)
    if(todok[i].completed==true)
    {
        check.checked=true
    }
    var newp=document.createElement('input')
    newp.classList.add('each_task_input')
    newp.value=todok[i].taskname
    newp.setAttribute('taskId',todok[i].taskId)
    newp.setAttribute('readonly','true')
    var date_task=document.createElement('input')
    date_task.classList.add('due_date')
    date_task.value=todok[i].duedates
    var del=document.createElement('button')
    del.classList.add('delete')
    del.innerText='Delete'
    del.taskId=todok[i].taskId
    del.setAttribute('taskId',todok[i].taskId)
    del.addEventListener('click',deleteTask)
    var edit=document.createElement('button')
    edit.classList.add('edit')
    edit.innerText='Edit'
    edit.setAttribute('taskId',todok[i].taskId)
    edit.addEventListener('click',editTask)
   btn.appendChild(check)
    btn.appendChild(newp)
    btn.appendChild(del)
    btn.appendChild(edit)
    newitem.appendChild(btn)
    newitem.appendChild(date_task)
    tasks.appendChild(newitem)
    }
}
  

  



