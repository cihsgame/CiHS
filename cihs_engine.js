document.getElementById("statButton").addEventListener("click", createCharacter);
document.getElementById("statCheckButton").addEventListener("click", checkStats);
activeButtons = [];
let rustySword = {name:"Rusty Sword", dmg:2, handling:60};
let player = {name:"Player", strength:0, agility:0, intelligence:0, charisma:0, renown:0, gold:0, hp:0, weapon:rustySword};
let maxPlayerHp=player.strength*10+1;
let hatchet = {name:"Hatchet", dmg:2, handling:40};
let dietritch = {name:"The Tavern Keeper", strength:4, agility:4, intelligence:4, charisma:4, renown:5, gold: 200, hp:50, weapon:hatchet, isAlive:true};
let fists = {name:"fist", dmg:1,handling:50};
let angryGuy = {name:"The first man", strength:2, agility:2, intelligence:2, charisma:2, renown:0, gold: 0, hp:25, weapon:fists, isAlive:true};
let angryGuy2 = {name:"The second man", strength:2, agility:2, intelligence:2, charisma:2, renown:0, gold: 0, hp:25, weapon:fists, isAlive:true};
let angryGuy3 = {name:"The third man", strength:2, agility:2, intelligence:2, charisma:2, renown:0, gold: 0, hp:25, weapon:fists, isAlive:true};
let angryGuy4 = {name:"The fourth man", strength:2, agility:2, intelligence:2, charisma:2, renown:0, gold: 0, hp:25, weapon:fists, isAlive:true};
let placeholder = {name: "Placeholder", strength:0, agility:0, intelligence:0, charisma:0, renown:0, gold:0, hp:0, isAlive:false};
let deceased = {name: "deceased", strength:0, agility:0, intelligence:0, charisma:0, renown:0, gold:0, hp:0, isAlive:false};
let activeEnemies = [];
let playerStatus = {status:"healthy"};
let playerActiveInv = {weapon:rustySword};

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function createCharacter() {
	name = document.getElementById("nameEnter").value;
	strength = Number(document.getElementById("strengthStart").value);
	agility = Number(document.getElementById("agilityStart").value);
	intelligence = Number(document.getElementById("intelligenceStart").value);
	charisma = Number(document.getElementById("charismaStart").value);

	let twentycheck = strength + agility + intelligence + charisma 
	intCheck = true;
	positiveCheck = true;
	if (Number.isInteger(strength)==false || Number.isInteger(agility)==false || Number.isInteger(intelligence)==false || Number.isInteger(charisma)==false) {
		intCheck = false;
	} 
	if (strength < 0 || agility < 0 || intelligence < 0 || charisma < 0) {
		positiveCheck = false;
	}
	if (twentycheck != 20 || intCheck == false || positiveCheck == false) {
		document.getElementById("instructions").innerHTML = "Your inputted statistics either didn't add up to 20 or contained a negative number or non-integer. Or both. Try again.";
	}
	else {
		player.name = name;
		player.strength = strength;
		player.agility = agility;
		player.intelligence = intelligence;
		player.charisma = charisma;
		console.log(player);
		const removedButton = document.getElementById("statButton");
		removedButton.remove();
		maxPlayerHp=player.strength*10+1;
		player.hp = maxPlayerHp;
		console.log(player.hp);
		introduction();
	}

	console.log(name);
	console.log(twentycheck);
}

function addGenericText(theText) {
	const newLine = document.createElement("p");
	const newLineNode = document.createTextNode(theText);
	newLine.appendChild(newLineNode);
	const newLineElement = document.getElementById("storyText");
	newLineElement.appendChild(newLine);
}
buttonDiv = document.getElementById("options");

function addGenericButton(btnName,btnText) {
	var btn = document.createElement("button");
	btn.innerHTML = btnText;
	btn.type = "submit";
	btn.id = btnName;
	btn.className = "btn";
	//let buttonDiv = document.getElementById("options");
	buttonDiv.appendChild(btn);
	activeButtons.push(btnName);
	//console.log(activeButtons);
	// document.getElementById(btn.id).addEventListener("click",fname);
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function removeButton(btnId) {
	console.log("activeButtons");
	console.log(activeButtons);
	console.log("btnId");
	console.log(btnId);
	var idToDelete = btnId;
	let id = idToDelete.id;
	console.log(idToDelete);
	console.log(id);
	let toBeRemoved = document.getElementById(idToDelete);
	console.log("textremove");
	console.log(toBeRemoved);
	let buttonDiv = document.getElementById("options");
	console.log(buttonDiv);
	var btnIndex = 0;
	let removeFromArray = activeButtons.indexOf(idToDelete);
	console.log(activeButtons);
	//console.log(buttonDiv.contains(toBeRemoved));
	//buttonDiv.appendChild(toBeRemoved);
	buttonDiv.removeChild(toBeRemoved);
	console.log(removeFromArray);
	activeButtons.splice(removeFromArray,1);
	console.log("aftersplice");

}

function clearButtons() {
	for (var i = 0; i < activeButtons.length;) {
		console.log("clearButtonsLoop");
		console.log(i);
		console.log(activeButtons[i]);
		removeButton(activeButtons[i]);
		}
}

function replaceButton(replacedButton,btnName,btnText) {
	removeButton(replacedButton);
	addGenericButton(btnName,btnText);
}


var dietritchBattle=false;
document.addEventListener("click", function(evnt){
    var elem_id = evnt.target.id;
    //console.log(evnt.target.id);
    if (elem_id == "attackBtn1"){
		console.log(enemy1);
		doDamage(player,enemy1);
	}
	if (elem_id == "attackBtn2"){
		doDamage(player,enemy2);
	}
	if (elem_id == "attackBtn3"){
		doDamage(player,enemy3);
	}
	if (elem_id == "attackBtn4"){
		doDamage(player,enemy4);
	}
    if (elem_id == "firstMissionBtn") {
    	console.log("Hello");
    	if (dietritchBattle==false){
    		firstMission(); 
    	}
    	if (dietritchBattle==true){
    		addGenericText("An angry mob has come to confront you over the murder of Dietritch, the former owner of the tavern. Most cower at the sight of your sword, but four men step forth from the crowd. Prepare for battle!")
    		battle(angryGuy,angryGuy2,angryGuy3,angryGuy4);
    	}
    }
    if (elem_id == "firstMissionBtn2") {
    	console.log("please work this time");
    	clearButtons();
    	addGenericButton("firstMissionBtn","Re-enter the tavern",);
    	//addGenericText("You exit the tavern.");
    }
    if (elem_id == "firstMissionBtn3") {
    	if (player.gold < 10) {
    	addGenericText("You don't have any money with which to do so.");	
    	}
    	else {
    		player.gold = player.gold - 5;
    		addGenericText("You enjoy a delicious bowl of soup.");
    		player.hp=maxplayer.hp;
    	}
    }
    if (elem_id == "firstMissionBtn4") {
    	addGenericText("The man behind the counter introduces himself as Dietritch. He has no jobs for you at the moment.");
    	dietritch.name="Dietritch";
    	//addGenericText("The man behind the counter introduces himself as Dietritch. He informs you of a wolf on his property outside the city, and provides you with a large lumber-axe with which to dispatch it. ");
    	//clearButtons();
    }
    if (elem_id == "firstMissionBtn5") {
    	battle(dietritch);
    	dietritchBattle = true;
    }
    if (elem_id == "tavernButton") {
    	player.gold = player.gold + 10;
    	addGenericText("You work for a while in your tavern.");
    }
    if (elem_id == "tavernButton2") {
    	player.gold = player.gold + 500;
    	addGenericText("You have sold your tavern.");
    	clearButtons();
    	introduction();
    }


});


function introduction() {
	const firstLine = document.createElement("p");
	var firstLineNode = document.createTextNode("placeholder");
	if (player.strength > 10) {
		firstLineNode = document.createTextNode("Here begins the tale of " + player.name + ". You are known in particular for your strength.");
	}
	else if (player.agility > 10) {
		firstLineNode = document.createTextNode("Here begins the tale of " + player.name + ". You are known in particular for your agility.");
	}
	else if (player.intelligence > 10) {
		firstLineNode = document.createTextNode("Here begins the tale of " + player.name + ". You are known in particular for your intelligence.");
	}
	else if (player.charisma > 10) {
		firstLineNode = document.createTextNode("Here begins the tale of " + player.name + ". You are known in particular for your charisma and way with people.");
	}
	else {
		firstLineNode = document.createTextNode("Here begins the tale of " + player.name + ".");
	}
	console.log(firstLineNode);
	firstLine.appendChild(firstLineNode);
	const firstLineElement = document.getElementById("storyText");
	firstLineElement.appendChild(firstLine);
	console.log(player.intelligence);
	addGenericText("You are currently in the great city of Valzinya, the largest intact human settlement within a thousand-mile radius.");
	addGenericText("The opulence of the city makes you acutely aware of your empty coin purse. What is your first action?");
	addGenericButton("firstMissionBtn","Search for employment in the local tavern");
	// document.getElementById("btn1").addEventListener("click", firstMission);

}

function checkStats() {
	addGenericText("-------------------------------------------------------------");
	addGenericText(player.name);
	addGenericText("Strength: " + player.strength);	
	addGenericText("Agility: " + player.agility);	
	addGenericText("Intelligence: " + player.intelligence);	
	addGenericText("Charisma: " + player.charisma);	
	addGenericText("Renown: " + player.renown);	
	addGenericText("Gold: " + player.gold);
	addGenericText("Current HP: " + player.hp + "/" + maxPlayerHp);
	addGenericText("You are currently in good health.");
}

function firstMission() {
	//led to by firstMissionBtn
	addGenericText("You arrive inside the tavern. Other than a man of indeterminate consciousness lying on the floor, the only other person is the tavern keeper.");
	replaceButton("firstMissionBtn","firstMissionBtn2","Exit the tavern");
	addGenericButton("firstMissionBtn3","Order some food");
	addGenericButton("firstMissionBtn4","Ask the tavern keeper if he has any jobs");
	addGenericButton("firstMissionBtn5","Kill the tavern keeper and take over his business");
	console.log("Hello there");
}
var enemy1=placeholder;
var enemy2=placeholder;
var enemy3=placeholder;
var enemy4=placeholder;

function battle(firstEnemy,secondEnemy=placeholder,thirdEnemy=placeholder,fourthEnemy=placeholder) {
	clearButtons();
	enemy1=firstEnemy;
	enemy2=secondEnemy;
	enemy3=thirdEnemy;
	enemy4=fourthEnemy;
	addGenericText("You have entered combat with "+enemy1.name);
	addGenericButton("attackBtn1","Attack "+enemy1.name);
	activeEnemies.push(enemy1);
	if(enemy2!=placeholder){
		addGenericButton("attackBtn2","Attack "+enemy2.name);
		activeEnemies.push(enemy2);
	}
	if(enemy3!=placeholder){
		addGenericButton("attackBtn3","Attack "+enemy3.name);
		activeEnemies.push(enemy3);
	}
	if(enemy4!=placeholder){
		addGenericButton("attackBtn4","Attack "+enemy4.name);
		activeEnemies.push(enemy4);
	}
	addGenericButton("tauntBtn", "Taunt"); 
	document.addEventListener("click", function(evnt){
		var battle_elem = evnt.target.id;
		console.log(battle_elem);
		if (1==1){
			console.log("aowudoaiwdjoiaw")
		}
		else{
			console.log("hello there");
		}
	});
};
function doDamage(attacker,defender){
	console.log(attacker,enemy1);
	var rnJesus=getRandomInt(1000);
	console.log(rnJesus);
	console.log(attacker.agility, defender.agility);
	var agilityDiff=attacker.agility-defender.agility;
	miss=100-agilityDiff*5;
	crit=900-agilityDiff*5;
	console.log(attacker);
	console.log(agilityDiff, crit);
	console.log(attacker);
	console.log(attacker.weapon);
	damage=attacker.strength+attacker.weapon.dmg;
	critDamage=Math.floor(2*(attacker.strength+attacker.weapon.dmg));
	if(rnJesus<=miss){
		addGenericText(attacker.name+" clumsily misses "+defender.name+" with a wild swing!");
	}
	if(rnJesus>=crit){
		addGenericText(attacker.name+" inflicts a crushing blow to "+defender.name+" with a perfectly-placed attack, dealing "+String(critDamage)+" damage!");
		defender.hp = defender.hp - critDamage;
	}
	if(rnJesus>miss && rnJesus<crit){
		addGenericText(attacker.name+" strikes "+defender.name+" with a "+attacker.weapon.name+", dealing "+String(damage)+" damage.");
		defender.hp = defender.hp - damage;
	}
	afterAttack(attacker, defender);
function afterAttack(attacker, defender) {

	if (defender.hp>0 && attacker == player) {
	//playerTurn=false;
		for (enemy in activeEnemies) {
			doDamage(activeEnemies[enemy],player);
		}
	}
	if (defender.hp>0 && defender == player) {
	//playerTurn=false;
		if (attacker == player){
			doDamage(player,enemy1);
		}
	}
	if (defender.hp<=0 && attacker == player) {
		addGenericText(defender.name+" has been defeated!");
		const index = activeEnemies.indexOf(defender);
		activeEnemies.splice(index,1);
		if (defender == enemy1){
			removeButton("attackBtn1");
			enemy1=deceased;
		}
		if (defender == enemy2){
			removeButton("attackBtn2");
			enemy2=deceased;
		}
		if (defender == enemy3){
			removeButton("attackBtn3");
			enemy3=deceased;
		}
		if (defender == enemy4){
			removeButton("attackBtn4");
			enemy4=deceased;
		}
		for (enemy in activeEnemies) {
			doDamage(activeEnemies[enemy],player);
		} 
		console.log(defender);
		if (enemy1.isAlive == false && enemy2.isAlive == false && enemy3.isAlive == false && enemy4.isAlive == false){
			enemy1 = placeholder;
			enemy2 = placeholder;
			enemy3 = placeholder;
			enemy4 = placeholder;
			addGenericText("You have emerged victorious!");
			afterbattle();
		}
		for (enemy in activeEnemies) {
			console.log("Are we here yet");
			doDamage(enemy,player);
		}
	}
	if (defender.hp <= 0 && defender == player) {
		addGenericText("Your adventure comes to an end!");
		clearButtons();
		addGenericText("Please refresh the page and try again.");
	}
}
	playerTurn = true;
}



function badEnding() {
	console.log("a")
}
function afterbattle() {
	console.log("you win.")
	if (dietritchBattle == true) {
		clearButtons();
		addGenericText("You have successfully conquered the tavern.");
		addGenericButton("tavernButton","Work in your new tavern");
		addGenericButton("tavernButton2","Sell your tavern for 500 gold pieces");
	}
}
