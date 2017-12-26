import Task from '../week/task'

let db:any;

function dbInit(){
    db = openDatabase('main_db', '1.1', 'Main DB', 2 * 1024 * 1024);
	if (!db){
		throw new Error("Fail open db")
	}
	db.transaction(function(tx:any){
	     tx.executeSql("CREATE TABLE IF NOT EXISTS tasks"+
	     	" (ID INTEGER PRIMARY KEY ASC,text TEXT,start "+
	     	"INTEGER, stop INTEGER, day INTEGER, color TEXT, week_id INTEGER)", []);
	      tx.executeSql("CREATE TABLE IF NOT EXISTS weeks (ID INTEGER PRIMARY KEY ASC)", []);
	 });
}

function createWeek(resolve:any, reject:any){
	if (!db) throw new Error("DB is not init, use dbInit()");
	db.transaction(function(tx:any){
		 tx.executeSql("INSERT INTO weeks DEFAULT VALUES ");
	});
	resolve(true)
}

function createTask(resolve:any, reject:any,
					text:string, start:number,
 					stop:number, week_id:number){
	if (!db) throw new Error("DB is not init, use dbInit()");

	db.transaction(function(tx:any){
		 tx.executeSql("INSERT INTO tasks (text,start,stop,week_id) VALUES(?,?,?,?)",
		 	[text,start,stop,week_id]);
	});
	resolve(true)
}

function getTasks(resolve:any, reject:any,week_id:number){
	let result:Array<Task> = [];
    if (!db) throw new Error("DB is not init, use dbInit()");
    db.transaction(function(tx:any){
        tx.executeSql("SELECT * FROM tasks WHERE week_id = ?", [week_id], function(tx,result){
            for (let i=0; i < result.rows.length; i++) {
				let now_task:Task = new Task(
					result.rows.item(i).text,
                    result.rows.item(i).color,
                    result.rows.item(i).start,
                    result.rows.item(i).stop,
                    result.rows.item(i).day,
                    result.rows.item(i).ID,
                    result.rows.item(i).week_id);
                result.push(now_task);
            }
		});
	});
	resolve(result);
}

function getWeeks(resolve:any, reject:any){
    let result:Array<number> = [];
    if (!db) throw new Error("DB is not init, use dbInit()");
    db.transaction(function(tx:any){
        tx.executeSql("SELECT * FROM weeks", [], function(tx,result){
            for (let i=0; i < result.rows.length; i++) {
                result.push(result.rows.item(i).ID);
            }
        });
    });
    resolve(result);
}

function deleteTask(resolve:any, reject:any, task_id:number){
    if (!db) throw new Error("DB is not init, use dbInit()");
    db.transaction(function(tx){
        tx.executeSql("DELETE FROM tasks WHERE ID=?",[task_id]);
    });
    resolve(true);
}

function changeTask(resolve:any, reject:any, up_task:Task){
    if (!db) throw new Error("DB is not init, use dbInit()");
    db.transaction(function(tx){
        tx.executeSql("UPDATE tasks SET (text,start,stop,day,color,week_id)"+
						"VALUES(?,?,?,?,?,?) WHERE ID=?",
			[up_task.text,
			up_task.start,
			up_task.stop,
			up_task.day,
			up_task.color,
			up_task.week_id,
			up_task.id]);
    });
    resolve(true);
}



export {dbInit, createWeek, createTask,
		getTasks, getWeeks, deleteTask,
    	changeTask}