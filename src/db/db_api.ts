let db:any;

function dbInit(){

    db = openDatabase('mydb2', '1.0', 'Test DB', 2 * 1024 * 1024);

	db.transaction(function(tx:any){
	     tx.executeSql("CREATE TABLE IF NOT EXISTS tasks"+
	     	" (text TEXT,start "+
	     	"INTEGER, stop INTEGER, week_id INTEGER)", []);
	      tx.executeSql("CREATE TABLE IF NOT EXISTS weeks", []);
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

export {dbInit, createWeek, createTask}