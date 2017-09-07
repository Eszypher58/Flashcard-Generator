var fs = require("fs");

function db() {

	this.readDB = function(filename, cb) {

		var textPairObject = [];

		fs.readFile(filename, "utf8", function(err, data) {

			if (err) {

				console.log(err);

			} else {


				var dataArray = data.split("\n");

				for (var i = 0; i < dataArray.length-1; i++) {

					var textPair = dataArray[i].split(",");

					textPairObject.push(textPair);

				};	

				cb (JSON.stringify(textPairObject)); //cb will lose its context..

			}

		})

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

module.exports = db;