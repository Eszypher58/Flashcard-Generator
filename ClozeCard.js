function ClozeCard(text, cloze) {

	if (this instanceof ClozeCard) {

		this.cloze = cloze;
		//this.partial = getPartial(text, cloze) || "";
		this.partial = text.replace(cloze, "---"); 
		this.fullText = text;

		function getPartial(text, cloze) {

			var textArray = text.split(" ");
			var clozeArray = cloze.split(" ");
			var found = 0;
			//var partialString = "";

			//console.log(textArray);
			//console.log(clozeArray);

			try {

				for (var i = 0; i < clozeArray.length; i++) {

					for (var j = 0; j < textArray.length; j++) {	

						if (clozeArray[i].trim() === textArray[j].trim()) {

							textArray[j] = "---";
							found = 1;

						} 

					}

				}

				//console.log("this line here should only execute once");

				if (found) {

					var tempString = "";

					for (var i = 0; i < textArray.length; i++) {

						tempString += textArray[i].trim() ;
						tempString += " ";

					}

					return tempString.trim();

				} else {

					throw e;

				}

			} catch (e) {

				console.log('Expression not found in full text!!!')
				console.log("Construction of new ClozeCard terminated! Program exit now.");
			
			}

		}

	} else {

		return new ClozeCard(text, cloze);

	}

}

module.exports = ClozeCard;

/*
var cCard = new ClozeCard("hello world!", "hello");
var nCard = new ClozeCard("This is weird as hell", "iono");

console.log(cCard.partial);
console.log(cCard.cloze);
console.log(cCard.fullText);


console.log(nCard.partial);
console.log(nCard.cloze);
console.log(nCard.fullText);
*/