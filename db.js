var fs = require("fs");

function db() {

	//var textPairObject = {};
	//this.textPairObject = [];

	this.readDB = function(filename, cb) {

		var textPairObject = [];

		fs.readFile(filename, "utf8", function(err, data) {

			if (err) {

				console.log(err);

			} else {

				//console.log(data);
				
				var dataArray = data.split("\n");


				//console.log(dataArray);
				
				for (var i = 0; i < dataArray.length-1; i++) {

					var textPair = dataArray[i].split(",");

					//console.log(textPair);

					textPairObject.push(textPair);

					console.log("logging textPairObject:", textPairObject);

				};	

				//console.log(textPairObject);
				console.log(cb);

				//var func = cb.bind(cb.context);

				cb (JSON.stringify(textPairObject));

			}


		})

		//1return textPairObject;

	}

	this.writeDB = function (filename, text) {

	fs.appendFile(filename, text, "utf8", function (err, data){

		if (err) {

			console.log(err);

		} else {



		}


	})


	}


}
 
// var DB = new db();

//console.log(DB.textPairObject);

//console.log("code test:", DB.readDB("db"));

module.exports = db;