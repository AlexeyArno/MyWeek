import {createWeek, createTask} from '../db/db_api'

function clickCreateWeek(){
     let promise:any = new Promise((resolve:any, reject:any) => {
		createWeek(resolve, reject);
	});

	console.log("Hello");

	promise.then(
		result => console.log("Fulfilled: " + String(result)), // сработает
    	error => console.log("Rejected: " + error) // не сработает
	)

}

function clickCreateTask(){
	let promise = new Promise((resolve:any, reject:any) => {
		createTask(resolve, reject, "hello",12,14,1);
	});
	
	console.log("Hello");

	promise.then(
		result => console.log("Done: " + result), // сработает
    	error => console.log("Stoped: " + error) // не сработает
	)

}

export {clickCreateWeek, clickCreateTask}