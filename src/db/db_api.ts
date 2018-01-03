import Task from '../week/task'
import {weekData} from '../week/week';
let db:any;

function dbInit(){
    db = openDatabase('main_db', '1.1', 'Main DB', 2 * 1024 * 1024);
	if (!db){
		throw new Error("Fail open db")
	}
	db.transaction(function(tx:any){
	     tx.executeSql("CREATE TABLE IF NOT EXISTS tasks"+
	     	" (ID INTEGER PRIMARY KEY ASC,text TEXT,start "+
	     	"INTEGER, stop INTEGER, day INTEGER, color TEXT, action_type TEXT, action_body TEXT, week_id INTEGER)", []);
	      tx.executeSql("CREATE TABLE IF NOT EXISTS weeks (ID INTEGER PRIMARY KEY ASC, number INTEGER)", []);
	 });
}

function createWeek(callback:Function){
	if (!db) throw new Error("DB is not init, use dbInit()");
    getWeeks(function(weeks:Array<number>){
        db.transaction(function(tx:any){
            tx.executeSql("INSERT INTO weeks (number) VALUES(?)", [weeks.length+1] ,function(transaction:any, result:any){
                console.log(result);
                callback(true);
            },function(transaction, error){
                callback(false);
                throw new Error(error);
            });
        });
    })
}


//decrement weeks numbers after current week, because save right collection week's numbers [1,2,3,4]
function deleteWeek(week_id:number,  callback:Function){
    if (!db) throw new Error("DB is not init, use dbInit()");
    getWeeks(function(weeks:Array<weekData>){
        let past:boolean = false;
        for(let i=0;i<weeks.length;i++){
           if(past){
               weeks[i].week_number--;
               db.transaction(function(tx){
                   tx.executeSql("update weeks set number=?  where ID=? ",
                       [weeks[i].week_number,weeks[i].week_id],
                       function(){},
                       function(transaction, error){
                            throw new Error(error);
                       });
               });
           }
           if(weeks[i].week_id == week_id) past = true;
       }
    });
    db.transaction(function(tx){
        tx.executeSql("DELETE FROM weeks WHERE ID=?",[week_id],function(transaction:any, result:any){
            callback(true);
        },function(transaction, error){
            throw new Error(error);
        });
    });
}

function createTask(task:Task, callback:Function){
	if (!db) throw new Error("DB is not init, use dbInit()");
	db.transaction(function(tx:any){
		 tx.executeSql("INSERT INTO tasks (text,start,stop,day,color,action_type,action_body, week_id) VALUES(?,?,?,?,?,?,?,?)",
		 	[task.text,task.start,task.stop,task.day,task.color,task.action_type,task.action_body,task.week_id]
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

function getTasks(week_id:number, callback:Function){
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
				now_task.action_body = result.rows.item(i).action_body;
                now_task.action_type = result.rows.item(i).action_type;
                final.push(now_task);
            }
            callback(final)
		});
	});
}

function getTasksByDay(week_id:number,day:number, callback:Function){
    let final:Array<Task> = [];
    if (!db) throw new Error("DB is not init, use dbInit()");
    db.transaction(function(tx:any){
        tx.executeSql("SELECT * FROM tasks WHERE week_id = ? and day = ?", [week_id,day], function(tx,result){
            for (let i=0; i < result.rows.length; i++) {
                let now_task:Task = new Task(
                    result.rows.item(i).text,
                    result.rows.item(i).color,
                    result.rows.item(i).start,
                    result.rows.item(i).stop,
                    result.rows.item(i).day,
                    result.rows.item(i).ID,
                    result.rows.item(i).week_id);
                now_task.action_body = result.rows.item(i).action_body;
                now_task.action_type = result.rows.item(i).action_type;
                final.push(now_task);
            }
            callback(final)
        });
    });
}

function getWeeks(callback:Function){
    let final:Array<weekData> = [];
    if (!db) throw new Error("DB is not init, use dbInit()");
    db.transaction(function(tx:any){
       tx.executeSql("SELECT * FROM weeks ORDER BY number ASC", [], function(tx,result){
            for (let i=0; i < result.rows.length; i++) {
                final.push({week_id:Number(result.rows.item(i).ID), week_number:Number(result.rows.item(i).number)});
            }
           callback(final)
        });
    });
}

function deleteTask(task_id:number,  callback:Function){
    if (!db) throw new Error("DB is not init, use dbInit()");
    db.transaction(function(tx){
        tx.executeSql("DELETE FROM tasks WHERE ID=?",[task_id],function(transaction:any, result:any){
            callback(true);
        },function(transaction, error){
            console.log(error);
            callback(false);
        });
    });
  	return true;
}

function changeTask(up_task:Task, callback:Function){
	console.log(up_task.text, up_task.id);
    if (!db) throw new Error("DB is not init, use dbInit()");
    db.transaction(function(tx){
        tx.executeSql("update tasks set text=?, start=?, stop=?, day=?, color=?,action_type=?,action_body=?, week_id=? "+
						" where ID=? ",
			[up_task.text, up_task.start, up_task.stop,
			up_task.day, up_task.color, up_task.action_type,
            up_task.action_body, up_task.week_id, up_task.id],
            function(transaction:any, result:any){
                console.log(result);
                callback(true);
		},function(transaction, error){
        	console.log(error);
                callback(false);
            });
    });
    return true;
}

function changeWeekNumber(currentWeekData:weekData, newNumber:number, callback:Function){
    db.transaction(function(tx){
        tx.executeSql("update weeks set number=?  where number=? ",
            [currentWeekData.week_number,newNumber],
            function(){
                tx.executeSql("update weeks set number=?  where ID=? ",
                    [newNumber,currentWeekData.week_id],
                    function(){
                        callback(true);
                    },
                    function(transaction, error){
                        throw new Error(error);
                    });
            },
            function(transaction, error){
                throw new Error(error);
            });

    });
}

export {dbInit, createWeek, createTask,
		getTasks, getWeeks, deleteTask,
    	changeTask, getTasksByDay, deleteWeek,
    changeWeekNumber}