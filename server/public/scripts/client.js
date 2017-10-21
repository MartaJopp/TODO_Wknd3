console.log ('JS Sourced');

$(document).ready(readyNow);

function readyNow() {
    getTasks(); //on load of page - load tasks
    console.log ('JQuery sourced');
    $('#addTask').on('click', addTask); //call addTask on click of button
    $('.container').on('click', '.btn-warning', taskComplete);
} // end readyNow function

// add task to list and call function to POST to server
function addTask(){
console.log('add task button clicked'); 

var taskIn = $('#taskIn').val();
var completedIn = false // setting automatically to false because going to
//append back a check box which if then marked false will send an update and refresh page to say completed?
console.log('input value', taskIn);
var taskToSend = {
    todo: taskIn,
    completed: completedIn
};
sendToDo(taskToSend); // call sendToDo with new task
} // end add Task function

//sends the new task to the server
function sendToDo(newTask) {
    $.ajax({
        url: '/tasks',
        type: 'POST',
        data: newTask
    })
    .done(function(response){
        getTasks(); // calls getTasks function to get updated data
    })
    .fail(function(error){
        console.log('Error received.', error);
    })
} // end sendToDo function

// function to receive all data
function getTasks() {
$.ajax({
    url: '/tasks',
    type: 'GET'
})
.done(function(response){
    var listOfTasks = response; // all listOfTasks
    console.log('Tasks received', listOfTasks);
    appendToDom(listOfTasks); // call appendToDom with data received
}).fail(function (error) {
    alert('something went wrong');
});
} // end function getTasks / GET route
//append the entire list of tasks - task comes as an array of objects
function appendToDom(tasks){
    $('.tBodyHere').empty();
  // Loop through products and append to dom
  for (var i = 0; i < tasks.length; i += 1) {
    var task = tasks[i];
    var $tr = $('<tr></tr>');
    $tr.data('task', task);
    $tr.append('<td class="todo">' + task.todo + '</td>');
    if (task.completed == true) {
        $tr.append('<td>&#9989<span>Task Complete!</span></td>')}
        else {
        $tr.append('<td><button type="button" class="btn btn-warning" data-id="' + task.id + '">Mark Complete</button></td>');
        }
    $tr.append('<td><button type="button" class="btn btn-danger" data-id="' + task.id + '">Delete</button></td>'); // assigning an id
    $('.tBodyHere').append($tr);
} //end for loop
}//end appendToDomfunction

function taskComplete(){ //PUT request with data to true
    console.log('Mark Complete clicked');
    var task = $(this).data('id');
    var toDo = $(this).closest('td').prev('td').text();
    console.log('task ID', task);
    console.log('toDo', toDo)
    var changedTask = {
        todo: toDo,
        completed: true
    }
    $.ajax({
        method: 'PUT',
        url: '/tasks/' + task,
        data: changedTask
    })
    .done(function (response) {
        console.log('response', response);
        getTasks();
    })
        .fail(function (error) {
            console.log('error', error);

        })
}// end taskComplete function
