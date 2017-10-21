# TODO_Wknd3

To Do, To Do, To Do...
===========

An interactive "To Do List" application.  Allows users to input tasks to their "To Do List", check when completed and delete tasks.  Upon input of task - defaults that the task has not yet been completed.  

Technologies
------------
* JQuery
* Node
* Express
* SQL

SQL Data 

CREATE TABLE "tasks" (
	"id" serial primary key,
	"todo" character varying,
	"completed" boolean
	);