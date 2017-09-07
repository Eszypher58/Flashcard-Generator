//Create ClozeCard

function ClozeCard(text, cloze) {

	if (this instanceof ClozeCard) {

		this.cloze = cloze;
		this.partial = getPartial(text, cloze) || "";
		this.fullText = text;

		function getPartial(text, cloze) {

			var partialString = text.replace(cloze, "---");

			try {

				if (partialString === text) {

					throw e;

				} else {

					return partialString.trim();

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