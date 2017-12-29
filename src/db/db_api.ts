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

function createWeek(){
	if (!db) throw new Error("DB is not init, use dbInit()");
	db.transaction(function(tx:any){
		 tx.executeSql("INSERT INTO weeks DEFAULT VALUES ");
	});
	return true;
}

function createTask(task:Task, callback:any){
	if (!db) throw new Error("DB is not init, use dbInit()");
	db.transaction(function(tx:any){
		 tx.executeSql("INSERT INTO tasks (text,start,stop,day,color,week_id) VALUES(?,?,?,?,?,?)",
		 	[task.text,task.start,task.stop,task.day,task.color,task.week_id]
             ,function(transaction:any, result:any){
                 console.log(result);
                 callback(true);
             },function(transaction, error){
                 console.log(error);
                 callback(false);
             });
	});
	return true;
}

function getTasks(week_id:number, res:any){
	let final:Array<Task> = [];
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
                final.push(now_task);
            }
            console.log(final);
            res(final)
		});
	});
}

function getWeeks(ret:any){
    let final:Array<number> = [];
    if (!db) throw new Error("DB is not init, use dbInit()");
    db.transaction(function(tx:any){
       tx.executeSql("SELECT * FROM weeks", [], function(tx,result){
            for (let i=0; i < result.rows.length; i++) {
                final.push(Number(result.rows.item(i).ID));
            }
           ret(final)
        });
    });
}

function deleteTask(task_id:number,  callback:any){
    if (!db) throw new Error("DB is not init, use dbInit()");
    db.transaction(function(tx){
        tx.executeSql("DELETE FROM tasks WHERE ID=?",[task_id],function(transaction:any, result:any){
            console.log(result);
            callback(true);
        },function(transaction, error){
            console.log(error);
            callback(false);
        });
    });
  	return true;
}

function changeTask(up_task:Task, callback:any){
	console.log(up_task.text, up_task.id);
    if (!db) throw new Error("DB is not init, use dbInit()");
    db.transaction(function(tx){
        tx.executeSql("update tasks set text=?, start=?, stop=?, day=?, color=?, week_id=? "+
						" where ID=? ",
			[up_task.text, up_task.start, up_task.stop,
			up_task.day, up_task.color, up_task.week_id,
			up_task.id],function(transaction:any, result:any){
                console.log(result);
                callback(true);
		},function(transaction, error){
        	console.log(error);
                callback(false);
            });
    });
    return true;
}



export {dbInit, createWeek, createTask,
		getTasks, getWeeks, deleteTask,
    	changeTask}