console.log ('JS Sourced');

$(document).ready(readyNow);

function readyNow() {
    console.log ('JQuery sourced');
    $('#addTask').on('click', addTask); //call addTask on click of button
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
