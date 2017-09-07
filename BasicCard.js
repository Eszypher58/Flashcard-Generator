//Constructor for BasicCard

function BasicCard(front, back) {

	if (this instanceof BasicCard) {
		
		this.front = front;
		this.back = back;

	} else {

		return new BasicCard(front, back);

	}

}

module.exports = BasicCard;

/*
var bCard = new BasicCard("this is front", "this is back");

console.log(bCard.front, bCard.back);
*/