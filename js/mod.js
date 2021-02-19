let modInfo = {
	name: "The Knockoff Tree",
	id: "va9wj489vn984vnier9gysher98vjs98rthrdyjj",
	author: "qq1010903229 (loader3229)",
	pointsName: "points",
	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "1.1",
	name: "",
}

let changelog = "<h2>Changelog</h2><br>"+
	"<h3>v1.1</h3><br>"+
	"- Added 5 cookie buyables, 35 cookie upgrades, and 26 heavenly chip upgrades.<br>"+
	"- Added spectrum.<br>"+
	"- Added last 3 dimensions and tickspeed.<br>";
	"<h3>v1.0</h3><br>"+
	"- Add cookies and heavenly chips.<br>"+
	"- Add 13 cookie buyables, 75 cookie upgrades, and 30 heavenly chip upgrades.<br>"+
	"- Add antimatter.<br>"+
	"- Add 5 dimensions.<br>";


let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	let gain = new Decimal(0)
	for(var x in layers){
		if(layers[x].getPointGain)gain=gain.add(layers[x].getPointGain());
	}
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	"Mod Author: qq1010903229 (loader3229)"
]

// Determines when the game "ends"
function isEndgame() {
	return hasUpgrade("c",225);
}



// Less important things beyond this point!

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}