addLayer("c", {
    name: "c", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
		clicks: new Decimal(0)
    }},
    color: "#806040",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "cookies", // Name of prestige currency
	type: "custom", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    getResetGain() {
		gain=new Decimal(0);
		for(var x in layers.c.buyables){
			if(x=='rows' || x=='cols' || x=='layer')continue;
			gain=gain.add(layers.c.getGainC(parseInt(x)));
		}
		return gain;
	},
    getPointGain() {
		gain=new Decimal(0);
		for(var x in layers.c.buyables){
			if(x=='rows' || x=='cols' || x=='layer')continue;
			gain=gain.add(layers.c.getGainP(parseInt(x)));
		}
		return gain;
	},
	getClickGain() {
		gain=new Decimal(1);
		if(hasUpgrade("c",11))gain=gain.mul(1.5);
		if(hasUpgrade("c",12))gain=gain.mul(1.5);
		if(hasUpgrade("c",13))gain=gain.mul(1.5);
		if(hasUpgrade("c",14))gain=gain.mul(1.5);
		gain=gain.mul(tmp.h.effect);
		return gain;
	},
	getNextAt() {
		return new Decimal(0);
	},
    hotkeys: [
        {key: "c", description: "C: Get Cookies", onPress(){layers.c.clickables[11].onClick();}},
    ],
    layerShown(){return true},
	tabFormat: {
                "Main": {
                        content: ["main-display",
						["display-text",function(){return "You are gaining "+format(tmp.c.getResetGain)+" cookies per second"}],
						["display-text",function(){if(hasUpgrade("h",14)&&upgradeEffect("h",14).gte(100))return "";return "Tip: Hold C to click the button faster."}],
						["display-text",function(){if(player.a.unlocked)return ""/*"Buy a Javascript Console to unlock the next layer"*/;if(player.h.unlocked)return "Buy an Antimatter Condenser to unlock the next layer";return "Buy a Wizard Tower to unlock the next layer";}],
						"clickables",
						["display-text",function(){return "You clicked the button "+format(player.c.clicks)+" times"}],
						["display-text",function(){if(hasUpgrade("h",14))return "Your cursors are autoclicking the button "+format(upgradeEffect("h",14))+" times per second";return ""}],
						"buyables"]
				},"Upgrades": {
						content: ["main-display",
						["display-text",function(){return "You are gaining "+format(tmp.c.getResetGain)+" cookies per second"}],
						["display-text",function(){if(hasUpgrade("h",14)&&upgradeEffect("h",14).gte(100))return "";return "Tip: Hold C to click the button faster."}],
						"upgrades"]
				}
	},
	passiveGeneration(){
		return 1;
	},
        canReset(){
                return false
        },
		row:0,
		clickables:{
			rows:1,
			cols:1,
			11:{
				display(){
					return "Get "+format(tmp.c.getClickGain)+" cookies";
				},
				canClick(){if(player.h.activeChallenge==12)return false;return true;},
				onClick(){
					if(player.h.activeChallenge==12)return;
					player.c.clicks=player.c.clicks.add(1);
					player.c.points=player.c.points.add(tmp.c.getClickGain);
				}
			}
		},
		buyables:{
			rows:7,
			cols:2,
			11:{
				title(){
					return "Cursor";
				},
				display(){
					let data = tmp[this.layer].buyables[this.id];
					return "You have "+format(player.c.buyables[11])+" Cursors.<br>"+
					"Thay are producing "+format(layers.c.getGainC(11))+" cookies and "+format(layers.c.getGainP(11))+" points per second.<br>"+
					"Cost for Next Cursor: "+format(data.cost)+" cookies";
				},
				cost(){
					return new Decimal(15).mul(Decimal.pow(1.15,player.c.buyables[11]));
				},
				canAfford() {
                    return player[this.layer].points.gte(tmp[this.layer].buyables[this.id].cost)
				},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    if(!hasUpgrade("h",15))player[this.layer].points = player[this.layer].points.sub(cost)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                    player[this.layer].spentOnBuyables = player[this.layer].spentOnBuyables.add(cost)
                },
			},
			12:{
				title(){
					return "Grandma";
				},
				display(){
					let data = tmp[this.layer].buyables[this.id];
					return "You have "+format(player.c.buyables[12])+" Grandmas.<br>"+
					"Thay are producing "+format(layers.c.getGainC(12))+" cookies and "+format(layers.c.getGainP(12))+" points per second.<br>"+
					"Cost for Next Grandma: "+format(data.cost)+" cookies";
				},
				cost(){
					return new Decimal(100).mul(Decimal.pow(1.15,player.c.buyables[12]));
				},
				canAfford() {
                    return player[this.layer].points.gte(tmp[this.layer].buyables[this.id].cost)
				},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    if(!hasUpgrade("h",25))player[this.layer].points = player[this.layer].points.sub(cost)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                    player[this.layer].spentOnBuyables = player[this.layer].spentOnBuyables.add(cost)
                },
			},
			21:{
				title(){
					return "Farm";
				},
				display(){
					let data = tmp[this.layer].buyables[this.id];
					return "You have "+format(player.c.buyables[21])+" Farms.<br>"+
					"Thay are producing "+format(layers.c.getGainC(21))+" cookies and "+format(layers.c.getGainP(21))+" points per second.<br>"+
					"Cost for Next Farm: "+format(data.cost)+" cookies";
				},
				cost(){
					return new Decimal(1100).mul(Decimal.pow(1.15,player.c.buyables[21]));
				},
				canAfford() {
                    return player[this.layer].points.gte(tmp[this.layer].buyables[this.id].cost)
				},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    if(!hasUpgrade("h",35))player[this.layer].points = player[this.layer].points.sub(cost)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                    player[this.layer].spentOnBuyables = player[this.layer].spentOnBuyables.add(cost)
                },
			},
			22:{
				title(){
					return "Mine";
				},
				display(){
					let data = tmp[this.layer].buyables[this.id];
					return "You have "+format(player.c.buyables[22])+" Mines.<br>"+
					"Thay are producing "+format(layers.c.getGainC(22))+" cookies and "+format(layers.c.getGainP(22))+" points per second.<br>"+
					"Cost for Next Mine: "+format(data.cost)+" cookies";
				},
				cost(){
					return new Decimal(12e3).mul(Decimal.pow(1.15,player.c.buyables[22]));
				},
				canAfford() {
                    return player[this.layer].points.gte(tmp[this.layer].buyables[this.id].cost)
				},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    if(!hasUpgrade("h",45))player[this.layer].points = player[this.layer].points.sub(cost)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                    player[this.layer].spentOnBuyables = player[this.layer].spentOnBuyables.add(cost)
                },
			},
			31:{
				title(){
					return "Factory";
				},
				display(){
					let data = tmp[this.layer].buyables[this.id];
					return "You have "+format(player.c.buyables[31])+" Factories.<br>"+
					"Thay are producing "+format(layers.c.getGainC(31))+" cookies and "+format(layers.c.getGainP(31))+" points per second.<br>"+
					"Cost for Next Factory: "+format(data.cost)+" cookies";
				},
				cost(){
					return new Decimal(13e4).mul(Decimal.pow(1.15,player.c.buyables[31]));
				},
				canAfford() {
                    return player[this.layer].points.gte(tmp[this.layer].buyables[this.id].cost)
				},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    if(!hasUpgrade("h",55))player[this.layer].points = player[this.layer].points.sub(cost)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                    player[this.layer].spentOnBuyables = player[this.layer].spentOnBuyables.add(cost)
                },
			},
			32:{
				title(){
					return "Bank";
				},
				display(){
					let data = tmp[this.layer].buyables[this.id];
					return "You have "+format(player.c.buyables[32])+" Banks.<br>"+
					"Thay are producing "+format(layers.c.getGainC(32))+" cookies and "+format(layers.c.getGainP(32))+" points per second.<br>"+
					"Cost for Next Bank: "+format(data.cost)+" cookies";
				},
				cost(){
					return new Decimal(14e5).mul(Decimal.pow(1.15,player.c.buyables[32]));
				},
				canAfford() {
                    return player[this.layer].points.gte(tmp[this.layer].buyables[this.id].cost)
				},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    if(!hasUpgrade("h",65))player[this.layer].points = player[this.layer].points.sub(cost)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                    player[this.layer].spentOnBuyables = player[this.layer].spentOnBuyables.add(cost)
                },
			},
			41:{
				title(){
					return "Temple";
				},
				display(){
					let data = tmp[this.layer].buyables[this.id];
					return "You have "+format(player.c.buyables[41])+" Temples.<br>"+
					"Thay are producing "+format(layers.c.getGainC(41))+" cookies and "+format(layers.c.getGainP(41))+" points per second.<br>"+
					"Cost for Next Temple: "+format(data.cost)+" cookies";
				},
				cost(){
					return new Decimal(2e7).mul(Decimal.pow(1.15,player.c.buyables[41]));
				},
				canAfford() {
                    return player[this.layer].points.gte(tmp[this.layer].buyables[this.id].cost)
				},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    player[this.layer].points = player[this.layer].points.sub(cost)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                    player[this.layer].spentOnBuyables = player[this.layer].spentOnBuyables.add(cost)
                },
			},
			42:{
				title(){
					return "Wizard Tower";
				},
				display(){
					let data = tmp[this.layer].buyables[this.id];
					return "You have "+format(player.c.buyables[42])+" Wizard Towers.<br>"+
					"Thay are producing "+format(layers.c.getGainC(42))+" cookies and "+format(layers.c.getGainP(42))+" points per second.<br>"+
					"Cost for Next Wizard Tower: "+format(data.cost)+" cookies";
				},
				cost(){
					return new Decimal(33e7).mul(Decimal.pow(1.15,player.c.buyables[42]));
				},
				canAfford() {
                    return player[this.layer].points.gte(tmp[this.layer].buyables[this.id].cost)
				},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    player[this.layer].points = player[this.layer].points.sub(cost)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                    player[this.layer].spentOnBuyables = player[this.layer].spentOnBuyables.add(cost)
                },
			},
			51:{
				title(){
					return "Shipment";
				},
				display(){
					let data = tmp[this.layer].buyables[this.id];
					return "You have "+format(player.c.buyables[51])+" Shipments.<br>"+
					"Thay are producing "+format(layers.c.getGainC(51))+" cookies and "+format(layers.c.getGainP(51))+" points per second.<br>"+
					"Cost for Next Shipment: "+format(data.cost)+" cookies";
				},
				cost(){
					return new Decimal(51e8).mul(Decimal.pow(1.15,player.c.buyables[51]));
				},
				canAfford() {
                    return player[this.layer].points.gte(tmp[this.layer].buyables[this.id].cost)
				},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    player[this.layer].points = player[this.layer].points.sub(cost)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                    player[this.layer].spentOnBuyables = player[this.layer].spentOnBuyables.add(cost)
                },
				unlocked(){return hasUpgrade("h",13);}
			},
			52:{
				title(){
					return "Alchemy Lab";
				},
				display(){
					let data = tmp[this.layer].buyables[this.id];
					return "You have "+format(player.c.buyables[52])+" Alchemy Labs.<br>"+
					"Thay are producing "+format(layers.c.getGainC(52))+" cookies and "+format(layers.c.getGainP(52))+" points per second.<br>"+
					"Cost for Next Alchemy Lab: "+format(data.cost)+" cookies";
				},
				cost(){
					return new Decimal(75e9).mul(Decimal.pow(1.15,player.c.buyables[52]));
				},
				canAfford() {
                    return player[this.layer].points.gte(tmp[this.layer].buyables[this.id].cost)
				},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    player[this.layer].points = player[this.layer].points.sub(cost)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                    player[this.layer].spentOnBuyables = player[this.layer].spentOnBuyables.add(cost)
                },
				unlocked(){return hasUpgrade("h",13);}
			},
			61:{
				title(){
					return "Portal";
				},
				display(){
					let data = tmp[this.layer].buyables[this.id];
					return "You have "+format(player.c.buyables[61])+" Portals.<br>"+
					"Thay are producing "+format(layers.c.getGainC(61))+" cookies and "+format(layers.c.getGainP(61))+" points per second.<br>"+
					"Cost for Next Portal: "+format(data.cost)+" cookies";
				},
				cost(){
					return new Decimal(1e12).mul(Decimal.pow(1.15,player.c.buyables[61]));
				},
				canAfford() {
                    return player[this.layer].points.gte(tmp[this.layer].buyables[this.id].cost)
				},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    player[this.layer].points = player[this.layer].points.sub(cost)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                    player[this.layer].spentOnBuyables = player[this.layer].spentOnBuyables.add(cost)
                },
				unlocked(){return hasUpgrade("h",23);}
			},
			62:{
				title(){
					return "Time Machine";
				},
				display(){
					let data = tmp[this.layer].buyables[this.id];
					return "You have "+format(player.c.buyables[62])+" Time Machines.<br>"+
					"Thay are producing "+format(layers.c.getGainC(62))+" cookies and "+format(layers.c.getGainP(62))+" points per second.<br>"+
					"Cost for Next Time Machine: "+format(data.cost)+" cookies";
				},
				cost(){
					return new Decimal(14e12).mul(Decimal.pow(1.15,player.c.buyables[62]));
				},
				canAfford() {
                    return player[this.layer].points.gte(tmp[this.layer].buyables[this.id].cost)
				},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    player[this.layer].points = player[this.layer].points.sub(cost)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                    player[this.layer].spentOnBuyables = player[this.layer].spentOnBuyables.add(cost)
                },
				unlocked(){return hasUpgrade("h",33);}
			},
			71:{
				title(){
					return "Antimatter Condenser";
				},
				display(){
					let data = tmp[this.layer].buyables[this.id];
					return "You have "+format(player.c.buyables[71])+" Antimatter Condensers.<br>"+
					"Thay are producing "+format(layers.c.getGainC(71))+" cookies and "+format(layers.c.getGainP(71))+" points per second.<br>"+
					"Cost for next Antimatter Condenser: "+format(data.cost)+" cookies";
				},
				cost(){
					return new Decimal(17e13).mul(Decimal.pow(1.15,player.c.buyables[71]));
				},
				canAfford() {
                    return player[this.layer].points.gte(tmp[this.layer].buyables[this.id].cost)
				},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    player[this.layer].points = player[this.layer].points.sub(cost)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                    player[this.layer].spentOnBuyables = player[this.layer].spentOnBuyables.add(cost)
					player.a.points=player.a.points.add(1);
					if(player[this.layer].buyables[this.id].gte(1)){
						player.a.unlocked=true;
					}
                },
				unlocked(){return hasUpgrade("h",43);}
			}
		},
	getGainC(x){
		if(x===undefined)return new Decimal(0);
		return layers.c.getBaseGainC(x).mul(player.c.buyables[x]);
	},
	getGainP(x){
		if(x===undefined)return new Decimal(0);
		return layers.c.getBaseGainP(x).mul(player.c.buyables[x]);
	},
	getBaseGainC(x){
		if(x===undefined)return new Decimal(0);
		if(player.h.activeChallenge==11)return new Decimal(0);
		gain=new Decimal(0);
		if(x==11){
			gain=new Decimal(0.1);
			if(hasUpgrade("c",11))gain=gain.mul(2);
			if(hasUpgrade("c",12))gain=gain.mul(2);
			if(hasUpgrade("c",13))gain=gain.mul(3);
			if(hasUpgrade("c",14))gain=gain.mul(3);
			if(hasUpgrade("c",15))gain=gain.mul(upgradeEffect("c",15));
			if(hasUpgrade("c",71))gain=gain.mul(upgradeEffect("c",71));
			if(hasUpgrade("h",11))gain=gain.mul(upgradeEffect("h",11));
			if(hasUpgrade("h",12) && player.c.buyables[11].gte(100))gain=gain.mul(25);
		}
		if(x==12){
			gain=new Decimal(1);
			if(hasUpgrade("c",21))gain=gain.mul(2);
			if(hasUpgrade("c",22))gain=gain.mul(3);
			if(hasUpgrade("c",23))gain=gain.mul(3);
			if(hasUpgrade("c",24))gain=gain.mul(3);
			if(hasUpgrade("c",25))gain=gain.mul(upgradeEffect("c",25));
			if(hasUpgrade("h",21))gain=gain.mul(upgradeEffect("h",11));
			if(hasUpgrade("h",22) && player.c.buyables[12].gte(120))gain=gain.mul(100);
		}
		if(x==21){
			gain=new Decimal(8);
			if(hasUpgrade("c",31))gain=gain.mul(3);
			if(hasUpgrade("c",32))gain=gain.mul(3);
			if(hasUpgrade("c",33))gain=gain.mul(3);
			if(hasUpgrade("c",34))gain=gain.mul(4);
			if(hasUpgrade("c",35))gain=gain.mul(upgradeEffect("c",35));
			if(hasUpgrade("c",72))gain=gain.mul(upgradeEffect("c",72));
			if(hasUpgrade("h",31))gain=gain.mul(upgradeEffect("h",11));
			if(hasUpgrade("h",32) && player.c.buyables[21].gte(140))gain=gain.mul(25);
		}
		if(x==22){
			gain=new Decimal(47);
			if(hasUpgrade("c",41))gain=gain.mul(3);
			if(hasUpgrade("c",42))gain=gain.mul(3);
			if(hasUpgrade("c",43))gain=gain.mul(4);
			if(hasUpgrade("c",44))gain=gain.mul(4);
			if(hasUpgrade("c",45))gain=gain.mul(upgradeEffect("c",45));
			if(hasUpgrade("c",73))gain=gain.mul(upgradeEffect("c",73));
			if(hasUpgrade("h",41))gain=gain.mul(upgradeEffect("h",11));
			if(hasUpgrade("h",42) && player.c.buyables[22].gte(160))gain=gain.mul(30);
		}
		if(x==31){
			gain=new Decimal(260);
			if(hasUpgrade("c",51))gain=gain.mul(3);
			if(hasUpgrade("c",52))gain=gain.mul(4);
			if(hasUpgrade("c",53))gain=gain.mul(4);
			if(hasUpgrade("c",54))gain=gain.mul(4);
			if(hasUpgrade("c",55))gain=gain.mul(upgradeEffect("c",55));
			if(hasUpgrade("c",74))gain=gain.mul(upgradeEffect("c",74));
			if(hasUpgrade("h",51))gain=gain.mul(upgradeEffect("h",11));
			if(hasUpgrade("h",52) && player.c.buyables[31].gte(180))gain=gain.mul(50);
		}
		if(x==32){
			gain=new Decimal(1400);
			if(hasUpgrade("c",61))gain=gain.mul(4);
			if(hasUpgrade("c",62))gain=gain.mul(4);
			if(hasUpgrade("c",63))gain=gain.mul(4);
			if(hasUpgrade("c",64))gain=gain.mul(3);
			if(hasUpgrade("c",65))gain=gain.mul(upgradeEffect("c",65));
			if(hasUpgrade("c",121))gain=gain.mul(upgradeEffect("c",121));
			if(hasUpgrade("h",61))gain=gain.mul(upgradeEffect("h",11));
		}
		if(x==41){
			gain=new Decimal(7800);
			if(hasUpgrade("c",81))gain=gain.mul(4);
			if(hasUpgrade("c",82))gain=gain.mul(4);
			if(hasUpgrade("c",83))gain=gain.mul(3);
			if(hasUpgrade("c",84))gain=gain.mul(3);
			if(hasUpgrade("c",85))gain=gain.mul(upgradeEffect("c",85));
			if(hasUpgrade("c",122))gain=gain.mul(upgradeEffect("c",122));
		}
		if(x==42){
			gain=new Decimal(44e3);
			if(hasUpgrade("c",91))gain=gain.mul(4);
			if(hasUpgrade("c",92))gain=gain.mul(4);
			if(hasUpgrade("c",93))gain=gain.mul(3);
			if(hasUpgrade("c",94))gain=gain.mul(3);
			if(hasUpgrade("c",95))gain=gain.mul(upgradeEffect("c",95));
			if(hasUpgrade("c",123))gain=gain.mul(upgradeEffect("c",123));
		}
		if(x==51){
			gain=new Decimal(26e4);
			if(hasUpgrade("c",101))gain=gain.mul(4);
			if(hasUpgrade("c",102))gain=gain.mul(4);
			if(hasUpgrade("c",103))gain=gain.mul(3);
			if(hasUpgrade("c",104))gain=gain.mul(3);
			if(hasUpgrade("c",105))gain=gain.mul(upgradeEffect("c",105));
			if(hasUpgrade("c",124))gain=gain.mul(upgradeEffect("c",124));
		}
		if(x==52){
			gain=new Decimal(16e5);
			if(hasUpgrade("c",111))gain=gain.mul(4);
			if(hasUpgrade("c",112))gain=gain.mul(4);
			if(hasUpgrade("c",113))gain=gain.mul(3);
			if(hasUpgrade("c",114))gain=gain.mul(3);
			if(hasUpgrade("c",115))gain=gain.mul(upgradeEffect("c",115));
		}
		if(x==61){
			gain=new Decimal(1e7);
			if(hasUpgrade("c",131))gain=gain.mul(4);
			if(hasUpgrade("c",132))gain=gain.mul(4);
			if(hasUpgrade("c",133))gain=gain.mul(3);
			if(hasUpgrade("c",134))gain=gain.mul(3);
			if(hasUpgrade("c",135))gain=gain.mul(upgradeEffect("c",135));
		}
		if(x==62){
			gain=new Decimal(65e6);
			if(hasUpgrade("c",141))gain=gain.mul(4);
			if(hasUpgrade("c",142))gain=gain.mul(4);
			if(hasUpgrade("c",143))gain=gain.mul(3);
			if(hasUpgrade("c",144))gain=gain.mul(3);
			if(hasUpgrade("c",145))gain=gain.mul(upgradeEffect("c",145));
		}
		if(x==71){
			gain=new Decimal(43e7).mul(tmp.a.effect);
			if(hasUpgrade("c",151))gain=gain.mul(3);
			if(hasUpgrade("c",152))gain=gain.mul(3);
			if(hasUpgrade("c",153))gain=gain.mul(3);
			if(hasUpgrade("c",154))gain=gain.mul(3);
		}
		if(hasUpgrade("c",75))gain=gain.mul(upgradeEffect("c",75));
		if(hasUpgrade("c",125))gain=gain.mul(upgradeEffect("c",125));
		gain=gain.mul(tmp.h.effect);
		return gain;
	},
	getBaseGainP(x){
		if(x===undefined)return new Decimal(0);
		if(player.h.activeChallenge==11)return new Decimal(0);
		gain=new Decimal(0);
		if(x==11){
			gain=new Decimal(1);
			if(hasUpgrade("h",11))gain=gain.mul(upgradeEffect("h",11));
		}
		if(x==12){
			gain=new Decimal(2);
			if(hasUpgrade("h",21))gain=gain.mul(upgradeEffect("h",11));
		}
		if(x==21){
			gain=new Decimal(3);
			if(hasUpgrade("h",31))gain=gain.mul(upgradeEffect("h",11));
		}
		if(x==22){
			gain=new Decimal(5);
			if(hasUpgrade("h",41))gain=gain.mul(upgradeEffect("h",11));
		}
		if(x==31){
			gain=new Decimal(8);
			if(hasUpgrade("h",51))gain=gain.mul(upgradeEffect("h",11));
		}
		if(x==32){
			gain=new Decimal(13);
			if(hasUpgrade("h",61))gain=gain.mul(upgradeEffect("h",11));
		}
		if(x==41){
			gain=new Decimal(21);
		}
		if(x==42){
			gain=new Decimal(34);
		}
		if(x==51){
			gain=new Decimal(55);
		}
		if(x==52){
			gain=new Decimal(89);
		}
		if(x==61){
			gain=new Decimal(144);
		}
		if(x==62){
			gain=new Decimal(233);
		}
		if(x==71){
			gain=new Decimal(377);
		}
		if(hasUpgrade("c",75))gain=gain.mul(upgradeEffect("c",75));
		if(hasUpgrade("c",125))gain=gain.mul(upgradeEffect("c",125));
		return gain;
	},
	upgrades:{
		rows: 15,
		cols: 5,
		11: {
			title: "Upgrade 11",
            description: "Cursor's cookie production is doubled, clicking the button or pressing C gives 1.5x cookies",
            cost: new Decimal(5e1),
        },
		12: {
			title: "Upgrade 12",
            description: "Cursor's cookie production is doubled, clicking the button or pressing C gives 1.5x cookies",
            cost: new Decimal(5e2),
        },
		13: {
			title: "Upgrade 13",
            description: "Cursor's cookie production is tripled, clicking the button or pressing C gives 1.5x cookies",
            cost: new Decimal(5e3),
        },
		14: {
			title: "Upgrade 14",
            description: "Cursor's cookie production is tripled, clicking the button or pressing C gives 1.5x cookies",
            cost: new Decimal(5e4),
        },
		15: {
			title: "Upgrade 15",
            description: "Cursor's cookie production is boosted by your points.",
            cost: new Decimal(5e4),
			effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
				let base=1.3;
				if(hasUpgrade("c",25))base+=0.1;
                if(hasUpgrade("c",35))base+=0.1;
                if(hasUpgrade("c",45))base+=0.1;
                if(hasUpgrade("c",55))base+=0.1;
                if(hasUpgrade("c",65))base+=0.1;
                if(hasUpgrade("c",75))base+=0.1;
                if(hasUpgrade("c",85))base+=0.1;
                if(hasUpgrade("c",95))base+=0.1;
                if(hasUpgrade("c",105))base+=0.1;
                if(hasUpgrade("c",115))base+=0.1;
                if(hasUpgrade("c",125))base+=0.1;
                if(hasUpgrade("c",135))base+=0.1;
                if(hasUpgrade("c",145))base+=0.1;
                let ret = Decimal.pow(base,Decimal.log10(player.points.add(1)).pow(0.9))
                return ret;
            },
            effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
        },
		21: {
			title: "Upgrade 21",
            description: "Grandma's cookie production is doubled",
            cost: new Decimal(5e2),
        },
		22: {
			title: "Upgrade 22",
            description: "Grandma's cookie production is tripled",
            cost: new Decimal(5e3),
        },
		23: {
			title: "Upgrade 23",
            description: "Grandma's cookie production is tripled",
            cost: new Decimal(5e4),
        },
		24: {
			title: "Upgrade 24",
            description: "Grandma's cookie production is tripled",
            cost: new Decimal(5e5),
        },
		25: {
			title: "Upgrade 25",
            description: "Grandma's cookie production is boosted by your points, and boost Upgrades above it.",
            cost: new Decimal(1e6),
			effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
				let base=1.3;
                if(hasUpgrade("c",35))base+=0.1;
                if(hasUpgrade("c",45))base+=0.1;
                if(hasUpgrade("c",55))base+=0.1;
                if(hasUpgrade("c",65))base+=0.1;
                if(hasUpgrade("c",75))base+=0.1;
                if(hasUpgrade("c",85))base+=0.1;
                if(hasUpgrade("c",95))base+=0.1;
                if(hasUpgrade("c",105))base+=0.1;
                if(hasUpgrade("c",115))base+=0.1;
                if(hasUpgrade("c",125))base+=0.1;
                if(hasUpgrade("c",135))base+=0.1;
                if(hasUpgrade("c",145))base+=0.1;
                let ret = Decimal.pow(base,Decimal.log10(player.points.add(1)).pow(0.9))
                return ret;
            },
            effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
        },
		31: {
			title: "Upgrade 31",
            description: "Farm's cookie production is tripled",
            cost: new Decimal(5e3),
        },
		32: {
			title: "Upgrade 32",
            description: "Farm's cookie production is tripled",
            cost: new Decimal(5e4),
        },
		33: {
			title: "Upgrade 33",
            description: "Farm's cookie production is tripled",
            cost: new Decimal(5e5),
        },
		34: {
			title: "Upgrade 34",
            description: "Farm's cookie production is quadrupled",
            cost: new Decimal(5e6),
        },
		35: {
			title: "Upgrade 35",
            description: "Farm's cookie production is boosted by your points, and boost Upgrades above it.",
            cost: new Decimal(2e7),
			effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
				let base=1.3;
                if(hasUpgrade("c",45))base+=0.1;
                if(hasUpgrade("c",55))base+=0.1;
                if(hasUpgrade("c",65))base+=0.1;
                if(hasUpgrade("c",75))base+=0.1;
                if(hasUpgrade("c",85))base+=0.1;
                if(hasUpgrade("c",95))base+=0.1;
                if(hasUpgrade("c",105))base+=0.1;
                if(hasUpgrade("c",115))base+=0.1;
                if(hasUpgrade("c",125))base+=0.1;
                if(hasUpgrade("c",135))base+=0.1;
                if(hasUpgrade("c",145))base+=0.1;
                let ret = Decimal.pow(base,Decimal.log10(player.points.add(1)).pow(0.9))
                return ret;
            },
            effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
        },
		41: {
			title: "Upgrade 41",
            description: "Mine's cookie production is tripled",
            cost: new Decimal(5e4),
        },
		42: {
			title: "Upgrade 42",
            description: "Mine's cookie production is tripled",
            cost: new Decimal(5e5),
        },
		43: {
			title: "Upgrade 43",
            description: "Mine's cookie production is quadrupled",
            cost: new Decimal(5e6),
        },
		44: {
			title: "Upgrade 44",
            description: "Mine's cookie production is quadrupled",
            cost: new Decimal(5e7),
        },
		45: {
			title: "Upgrade 45",
            description: "Mine's cookie production is boosted by your points, and boost Upgrades above it.",
            cost: new Decimal(3e8),
			effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
				let base=1.3;
                if(hasUpgrade("c",55))base+=0.1;
                if(hasUpgrade("c",65))base+=0.1;
                if(hasUpgrade("c",75))base+=0.1;
                if(hasUpgrade("c",85))base+=0.1;
                if(hasUpgrade("c",95))base+=0.1;
                if(hasUpgrade("c",105))base+=0.1;
                if(hasUpgrade("c",115))base+=0.1;
                if(hasUpgrade("c",125))base+=0.1;
                if(hasUpgrade("c",135))base+=0.1;
                if(hasUpgrade("c",145))base+=0.1;
                let ret = Decimal.pow(base,Decimal.log10(player.points.add(1)).pow(0.9))
                return ret;
            },
            effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
        },
		51: {
			title: "Upgrade 51",
            description: "Factory's cookie production is tripled",
            cost: new Decimal(1e6),
        },
		52: {
			title: "Upgrade 52",
            description: "Factory's cookie production is quadrupled",
            cost: new Decimal(1e7),
        },
		53: {
			title: "Upgrade 53",
            description: "Factory's cookie production is quadrupled",
            cost: new Decimal(1e8),
        },
		54: {
			title: "Upgrade 54",
            description: "Factory's cookie production is quadrupled",
            cost: new Decimal(1e9),
        },
		55: {
			title: "Upgrade 55",
            description: "Factory's cookie production is boosted by your points, and boost Upgrades above it.",
            cost: new Decimal(5e9),
			effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
				let base=1.3;
                if(hasUpgrade("c",65))base+=0.1;
                if(hasUpgrade("c",75))base+=0.1;
                if(hasUpgrade("c",85))base+=0.1;
                if(hasUpgrade("c",95))base+=0.1;
                if(hasUpgrade("c",105))base+=0.1;
                if(hasUpgrade("c",115))base+=0.1;
                if(hasUpgrade("c",125))base+=0.1;
                if(hasUpgrade("c",135))base+=0.1;
                if(hasUpgrade("c",145))base+=0.1;
                let ret = Decimal.pow(base,Decimal.log10(player.points.add(1)).pow(0.9))
                return ret;
            },
            effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
        },
		61: {
			title: "Upgrade 61",
            description: "Bank's cookie production is quadrupled",
            cost: new Decimal(1e7),
        },
		62: {
			title: "Upgrade 62",
            description: "Bank's cookie production is quadrupled",
            cost: new Decimal(1e8),
        },
		63: {
			title: "Upgrade 63",
            description: "Bank's cookie production is quadrupled",
            cost: new Decimal(1e9),
        },
		64: {
			title: "Upgrade 64",
            description: "Bank's cookie production is tripled",
            cost: new Decimal(1e10),
        },
		65: {
			title: "Upgrade 65",
            description: "Bank's cookie production is boosted by your points, and boost Upgrades above it.",
            cost: new Decimal(8e10),
			effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
				let base=1.3;
                if(hasUpgrade("c",75))base+=0.1;
                if(hasUpgrade("c",85))base+=0.1;
                if(hasUpgrade("c",95))base+=0.1;
                if(hasUpgrade("c",105))base+=0.1;
                if(hasUpgrade("c",115))base+=0.1;
                if(hasUpgrade("c",125))base+=0.1;
                if(hasUpgrade("c",135))base+=0.1;
                if(hasUpgrade("c",145))base+=0.1;
                let ret = Decimal.pow(base,Decimal.log10(player.points.add(1)).pow(0.9))
                return ret;
            },
            effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
        },
		71: {
			title: "Upgrade 71",
            description: "Cursor's cookie production is multiplied by (1+grandmas/20)",
			effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
				return player.c.buyables[12].div(20).add(1);
            },
			effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
            cost: new Decimal(1e7),
        },
		72: {
			title: "Upgrade 72",
            description: "Farm's cookie production is multiplied by (1+grandmas/100)",
			effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
				return player.c.buyables[12].div(100).add(1);
            },
			effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
            cost: new Decimal(1e8),
        },
		73: {
			title: "Upgrade 73",
            description: "Mine's cookie production is multiplied by (1+grandmas/200)",
			effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
				return player.c.buyables[12].div(200).add(1);
            },
			effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
            cost: new Decimal(1e9),
        },
		74: {
			title: "Upgrade 74",
            description: "Factory's cookie production is multiplied by (1+grandmas/300)",
			effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
				return player.c.buyables[12].div(300).add(1);
            },
			effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
            cost: new Decimal(1e10),
        },
		75: {
			title: "Upgrade 75",
            description: "Production of cookie buyables is boosted by your points, and boost Upgrades above it.",
            cost: new Decimal(2e12),
			effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
				let base=1.1;
                if(hasUpgrade("c",85))base+=0.01;
                if(hasUpgrade("c",95))base+=0.01;
                if(hasUpgrade("c",105))base+=0.01;
                if(hasUpgrade("c",115))base+=0.01;
                if(hasUpgrade("c",125))base+=0.01;
                if(hasUpgrade("c",135))base+=0.01;
                if(hasUpgrade("c",145))base+=0.01;
                let ret = Decimal.pow(base,Decimal.log10(player.points.add(1)).pow(0.9))
                return ret;
            },
            effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
        },
		81: {
			title: "Upgrade 81",
            description: "Temple's cookie production is quadrupled",
            cost: new Decimal(2e8),
        },
		82: {
			title: "Upgrade 82",
            description: "Temple's cookie production is quadrupled",
            cost: new Decimal(2e9),
        },
		83: {
			title: "Upgrade 83",
            description: "Temple's cookie production is tripled",
            cost: new Decimal(2e10),
        },
		84: {
			title: "Upgrade 84",
            description: "Temple's cookie production is tripled",
            cost: new Decimal(2e11),
        },
		85: {
			title: "Upgrade 85",
            description: "Temple's cookie production is boosted by your points, and boost Upgrades above it.",
            cost: new Decimal(4e13),
			effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
				let base=1.3;
                if(hasUpgrade("c",95))base+=0.1;
                if(hasUpgrade("c",105))base+=0.1;
                if(hasUpgrade("c",115))base+=0.1;
                if(hasUpgrade("c",125))base+=0.1;
                if(hasUpgrade("c",135))base+=0.1;
                if(hasUpgrade("c",145))base+=0.1;
                let ret = Decimal.pow(base,Decimal.log10(player.points.add(1)).pow(0.9))
                return ret;
            },
            effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
        },
		91: {
			title: "Upgrade 91",
            description: "Wizard Tower's cookie production is quadrupled",
            cost: new Decimal(4e9),
        },
		92: {
			title: "Upgrade 92",
            description: "Wizard Tower's cookie production is quadrupled",
            cost: new Decimal(4e10),
        },
		93: {
			title: "Upgrade 93",
            description: "Wizard Tower's cookie production is tripled",
            cost: new Decimal(4e11),
        },
		94: {
			title: "Upgrade 94",
            description: "Wizard Tower's cookie production is tripled",
            cost: new Decimal(4e12),
        },
		95: {
			title: "Upgrade 95",
            description: "Wizard Tower's cookie production is boosted by your points, and boost Upgrades above it.",
            cost: new Decimal(6e14),
			effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
				let base=1.3;
                if(hasUpgrade("c",105))base+=0.1;
                if(hasUpgrade("c",115))base+=0.1;
                if(hasUpgrade("c",125))base+=0.1;
                if(hasUpgrade("c",135))base+=0.1;
                if(hasUpgrade("c",145))base+=0.1;
                let ret = Decimal.pow(base,Decimal.log10(player.points.add(1)).pow(0.9))
                return ret;
            },
            effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
        },
		101: {
			title: "Upgrade 101",
            description: "Shipment's cookie production is quadrupled",
            cost: new Decimal(8e10),
			unlocked(){return hasUpgrade("h",13);}
        },
		102: {
			title: "Upgrade 102",
            description: "Shipment's cookie production is quadrupled",
            cost: new Decimal(8e11),
			unlocked(){return hasUpgrade("h",13);}
        },
		103: {
			title: "Upgrade 103",
            description: "Shipment's cookie production is tripled",
            cost: new Decimal(8e12),
			unlocked(){return hasUpgrade("h",13);}
        },
		104: {
			title: "Upgrade 104",
            description: "Shipment's cookie production is tripled",
            cost: new Decimal(8e13),
			unlocked(){return hasUpgrade("h",13);}
        },
		105: {
			title: "Upgrade 105",
            description: "Shipment's cookie production is boosted by your points, and boost Upgrades above it.",
            cost: new Decimal(8e15),
			effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
				let base=1.3;
                if(hasUpgrade("c",115))base+=0.1;
                if(hasUpgrade("c",125))base+=0.1;
                if(hasUpgrade("c",135))base+=0.1;
                if(hasUpgrade("c",145))base+=0.1;
                let ret = Decimal.pow(base,Decimal.log10(player.points.add(1)).pow(0.9))
                return ret;
            },
            effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
			unlocked(){return hasUpgrade("h",13);}
        },
		111: {
			title: "Upgrade 111",
            description: "Alchemy Lab's cookie production is quadrupled",
            cost: new Decimal(2e12),
			unlocked(){return hasUpgrade("h",13);}
        },
		112: {
			title: "Upgrade 112",
            description: "Alchemy Lab's cookie production is quadrupled",
            cost: new Decimal(2e13),
			unlocked(){return hasUpgrade("h",13);}
        },
		113: {
			title: "Upgrade 113",
            description: "Alchemy Lab's cookie production is tripled",
            cost: new Decimal(2e14),
			unlocked(){return hasUpgrade("h",13);}
        },
		114: {
			title: "Upgrade 114",
            description: "Alchemy Lab's cookie production is tripled",
            cost: new Decimal(2e15),
			unlocked(){return hasUpgrade("h",13);}
        },
		115: {
			title: "Upgrade 115",
            description: "Alchemy Lab's cookie production is boosted by your points, and boost Upgrades above it.",
            cost: new Decimal(1e17),
			effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
				let base=1.3;
                if(hasUpgrade("c",125))base+=0.1;
                if(hasUpgrade("c",135))base+=0.1;
                if(hasUpgrade("c",145))base+=0.1;
                let ret = Decimal.pow(base,Decimal.log10(player.points.add(1)).pow(0.9))
                return ret;
            },
            effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
			unlocked(){return hasUpgrade("h",13);}
        },
		121: {
			title: "Upgrade 121",
            description: "Bank's cookie production is multiplied by (1+grandmas/400)",
			effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
				return player.c.buyables[12].div(400).add(1);
            },
			effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
            cost: new Decimal(1e11),
			unlocked(){return hasUpgrade("h",23);}
        },
		122: {
			title: "Upgrade 122",
            description: "Temple's cookie production is multiplied by (1+grandmas/500)",
			effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
				return player.c.buyables[12].div(500).add(1);
            },
			effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
            cost: new Decimal(2e12),
			unlocked(){return hasUpgrade("h",23);}
        },
		123: {
			title: "Upgrade 123",
            description: "Wizard Tower's cookie production is multiplied by (1+grandmas/600)",
			effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
				return player.c.buyables[12].div(600).add(1);
            },
			effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
            cost: new Decimal(3e13),
			unlocked(){return hasUpgrade("h",23);}
        },
		124: {
			title: "Upgrade 124",
            description: "Shipment's cookie production is multiplied by (1+grandmas/700)",
			effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
				return player.c.buyables[12].div(700).add(1);
            },
			effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
            cost: new Decimal(4e14),
			unlocked(){return hasUpgrade("h",23);}
        },
		125: {
			title: "Upgrade 125",
            description: "Production of cookie buyables is boosted by your points, and boost Upgrades above it.",
            cost: new Decimal(3e17),
			effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
				let base=1.05;
                if(hasUpgrade("c",135))base+=0.01;
                if(hasUpgrade("c",145))base+=0.01;
                let ret = Decimal.pow(base,Decimal.log10(player.points.add(1)).pow(0.9))
                return ret;
            },
            effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
			unlocked(){return hasUpgrade("h",23);}
        },
		131: {
			title: "Upgrade 131",
            description: "Portal's cookie production is quadrupled",
            cost: new Decimal(3e13),
			unlocked(){return hasUpgrade("h",23);}
        },
		132: {
			title: "Upgrade 132",
            description: "Portal's cookie production is quadrupled",
            cost: new Decimal(3e14),
			unlocked(){return hasUpgrade("h",23);}
        },
		133: {
			title: "Upgrade 133",
            description: "Portal's cookie production is tripled",
            cost: new Decimal(3e15),
			unlocked(){return hasUpgrade("h",23);}
        },
		134: {
			title: "Upgrade 134",
            description: "Portal's cookie production is tripled",
            cost: new Decimal(3e16),
			unlocked(){return hasUpgrade("h",23);}
        },
		135: {
			title: "Upgrade 135",
            description: "Portal's cookie production is boosted by your points, and boost Upgrades above it.",
            cost: new Decimal(1e18),
			effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
				let base=1.3;
                if(hasUpgrade("c",145))base+=0.1;
                let ret = Decimal.pow(base,Decimal.log10(player.points.add(1)).pow(0.9))
                return ret;
            },
            effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
			unlocked(){return hasUpgrade("h",23);}
        },
		141: {
			title: "Upgrade 141",
            description: "Time Machine's cookie production is quadrupled",
            cost: new Decimal(5e14),
			unlocked(){return hasUpgrade("h",33);}
        },
		142: {
			title: "Upgrade 142",
            description: "Time Machine's cookie production is quadrupled",
            cost: new Decimal(5e15),
			unlocked(){return hasUpgrade("h",33);}
        },
		143: {
			title: "Upgrade 143",
            description: "Time Machine's cookie production is tripled",
            cost: new Decimal(5e16),
			unlocked(){return hasUpgrade("h",33);}
        },
		144: {
			title: "Upgrade 144",
            description: "Time Machine's cookie production is tripled",
            cost: new Decimal(5e17),
			unlocked(){return hasUpgrade("h",33);}
        },
		145: {
			title: "Upgrade 145",
            description: "Time Machine's cookie production is boosted by your points, and boost Upgrades above it.",
            cost: new Decimal(3e19),
			effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
				let base=1.3;
                let ret = Decimal.pow(base,Decimal.log10(player.points.add(1)).pow(0.9))
                return ret;
            },
            effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
			unlocked(){return hasUpgrade("h",33);}
        },
		151: {
			title: "Upgrade 151",
            description: "Antimatter Condenser's cookie production is tripled",
            cost: new Decimal(1e16),
			unlocked(){return hasUpgrade("h",43);}
        },
		152: {
			title: "Upgrade 152",
            description: "Antimatter Condenser's cookie production is tripled",
            cost: new Decimal(1e17),
			unlocked(){return hasUpgrade("h",43);}
        },
		153: {
			title: "Upgrade 153",
            description: "Antimatter Condenser's cookie production is tripled",
            cost: new Decimal(1e18),
			unlocked(){return hasUpgrade("h",43);}
        },
		154: {
			title: "Upgrade 154",
            description: "Antimatter Condenser's cookie production is tripled",
            cost: new Decimal(1e19),
			unlocked(){return hasUpgrade("h",43);}
        },
		155: {
			title: "Upgrade 155",
            description: "Buying this upgrade will lead to the endgame.",
            cost: new Decimal(6e20),
			unlocked(){return hasUpgrade("h",43);}
        },
	},
	update(diff){
		if(hasUpgrade("h",14)){
			player.c.clicks=player.c.clicks.add(upgradeEffect("h",14).mul(diff));
			player.c.points=player.c.points.add(upgradeEffect("h",14).mul(diff).mul(tmp.c.getClickGain));
		}
		if(hasUpgrade("h",15)){
			var target=player.c.points.add(1).div(15).log(1.15).add(1).floor();
			if(target.gt(player.c.buyables[11])){
				player.c.buyables[11]=target;
			}
		}
		if(hasUpgrade("h",25)){
			var target=player.c.points.add(1).div(100).log(1.15).add(1).floor();
			if(target.gt(player.c.buyables[12])){
				player.c.buyables[12]=target;
			}
		}
		if(hasUpgrade("h",35)){
			var target=player.c.points.add(1).div(1100).log(1.15).add(1).floor();
			if(target.gt(player.c.buyables[21])){
				player.c.buyables[21]=target;
			}
		}
		if(hasUpgrade("h",45)){
			var target=player.c.points.add(1).div(12e3).log(1.15).add(1).floor();
			if(target.gt(player.c.buyables[22])){
				player.c.buyables[22]=target;
			}
		}
		if(hasUpgrade("h",55)){
			var target=player.c.points.add(1).div(13e4).log(1.15).add(1).floor();
			if(target.gt(player.c.buyables[31])){
				player.c.buyables[31]=target;
			}
		}
		if(hasUpgrade("h",65)){
			var target=player.c.points.add(1).div(14e5).log(1.15).add(1).floor();
			if(target.gt(player.c.buyables[32])){
				player.c.buyables[32]=target;
			}
		}
	}
})

addLayer("h", {
    name: "h", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "H", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
		best: new Decimal(0)
    }},
    color: "#00EEEE",
    requires: function(){
		if(player.h.unlocked)return new Decimal(5e7)
		return new Decimal(2e8)
	},
    resource: "heavenly chips", // Name of prestige currency
	type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    hotkeys: [
        {key: "h", description: "H: Reset for heavenly chips", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player.h.unlocked || player.c.buyables[42].gte(1)},
    baseResource: "cookies", 
    baseAmount() {return player.c.points},
	row: 1,
    exponent: 0.5,
	gainMult() {
        mult = new Decimal(1)
		return mult
    },
    gainExp() {
       return new Decimal(1);
    },
	branches:['c'],
	softcap: new Decimal("eeeeeeeee9"),
	softcapPower: new Decimal(1),
	effect() {
		if(player.h.unlocked){
			if(player.h.best.lte(9))return player.h.best.mul(2).add(1);
			return player.h.best.sqrt().mul(6).add(1);
		}
		return new Decimal(1);
	},
	effectDescription() { // Optional text to describe the effects
        eff = this.effect();
        return "which are multiplying cookie production by "+format(eff)+" (based on best heavenly chips)";
    },
	upgrades:{
		rows: 6,
		cols: 5,
		11: {
			title: "H Upgrade 11",
            description: "Cursor's Production is boosted based on button clicks on this reset",
            effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
				let g=1.1;
				if(hasUpgrade("h",21))g+=0.1;
				if(hasUpgrade("h",31))g+=0.1;
				if(hasUpgrade("h",41))g+=0.1;
				if(hasUpgrade("h",51))g+=0.1;
				if(hasUpgrade("h",61))g+=0.1;
				return player.c.clicks.add(1).log10().pow(g).add(1);
            },
			effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
            cost: new Decimal(2),
        },
		12: {
			title: "H Upgrade 12",
            description: "Cursor's cookie production is multiplied by 25 if you have more than 100 cursors.",
            cost: new Decimal(5),
        },
		13: {
			title: "H Upgrade 13",
            description: "Unlock 2 new cookie buyables and 2 new rows of cookie upgrades.",
            cost: new Decimal(25),
        },
		14: {
			title: "H Upgrade 14",
            description(){
				let cps=tmp.h.getHU14baseClickPS;
				if(cps.lte(1)){
					return "Each cursor will click the button once per "+format(Decimal.div(1,cps))+" seconds.";
				}else{
					return "Each cursor will click the button "+format(cps)+" times per second.";
				}
			},
			effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
				if(player.h.activeChallenge==12)return new Decimal(0);
				return tmp.h.getHU14baseClickPS.mul(player.c.buyables[11]);
            },
			effectDisplay() { return format(this.effect())+" clicks/s" }, // Add formatting to the effect
            cost: new Decimal(300),
        },
		15: {
			title: "H Upgrade 15",
            description: "Automatically buy cursors, and buying cursors costs nothing.",
            cost: new Decimal(2000),
        },
		21: {
			title: "H Upgrade 21",
            description: "H Upgrade 11 is boosted, and H Upgrade 11 is applied to grandmas.",
            cost: new Decimal(15),
        },
		22: {
			title: "H Upgrade 22",
            description: "Grandma's cookie production is multiplied by 100 if you have more than 120 grandmas.",
            cost: new Decimal(50),
        },
		23: {
			title: "H Upgrade 23",
            description: "Unlock a new cookie buyable and 2 new rows of cookie upgrades.",
            cost: new Decimal(500),
        },
		24: {
			title: "H Upgrade 24",
            description: "Your grandmas are encouraging your cursors, so H Upgrade 14 is boosted by your grandmas.",
            cost: new Decimal(2500),
        },
		25: {
			title: "H Upgrade 25",
            description: "Automatically buy grandmas, and buying grandmas costs nothing.",
            cost: new Decimal(10000),
        },
		31: {
			title: "H Upgrade 31",
            description: "H Upgrade 11 is boosted, and H Upgrade 11 is applied to farms.",
            cost: new Decimal(150),
        },
		32: {
			title: "H Upgrade 32",
            description: "Farm's cookie production is multiplied by 25 if you have more than 140 farms.",
            cost: new Decimal(500),
        },
		33: {
			title: "H Upgrade 33",
            description: "Unlock a new cookie buyable, a new row of cookie upgrades, and a challenge.",
            cost: new Decimal(5000),
        },
		34: {
			title: "H Upgrade 34",
            description: "H Upgrade 14 is boosted by your farms.",
            cost: new Decimal(15000),
        },
		35: {
			title: "H Upgrade 35",
            description: "Automatically buy farms, and buying farms costs nothing.",
            cost: new Decimal(50000),
        },
		41: {
			title: "H Upgrade 41",
            description: "H Upgrade 11 is boosted, and H Upgrade 11 is applied to mines.",
            cost: new Decimal(1000),
        },
		42: {
			title: "H Upgrade 42",
            description: "Mine's cookie production is multiplied by 30 if you have more than 160 mines.",
            cost: new Decimal(5000),
        },
		43: {
			title: "H Upgrade 43",
            description: "Unlock a new cookie buyable and a new row of cookie upgrades.",
            cost: new Decimal(50000),
        },
		44: {
			title: "H Upgrade 44",
            description: "H Upgrade 14 is boosted by your mines.",
            cost: new Decimal(150000),
        },
		45: {
			title: "H Upgrade 45",
            description: "Automatically buy mines, and buying mines costs nothing.",
            cost: new Decimal(250000),
        },
		51: {
			title: "H Upgrade 51",
            description: "H Upgrade 11 is boosted, and H Upgrade 11 is applied to factories.",
            cost: new Decimal(10000),
        },
		52: {
			title: "H Upgrade 52",
            description: "Factory's cookie production is multiplied by 50 if you have more than 180 factories.",
            cost: new Decimal(100000),
        },
		53: {
			title: "H Upgrade 53",
            //description: "Unlock a new cookie buyable and 2 new rows of cookie upgrades.",
            description: "This upgrade has no effect.",
            cost: new Decimal(500000),
        },
		54: {
			title: "H Upgrade 54",
            description: "H Upgrade 14 is boosted by your factories.",
            cost: new Decimal(1500000),
        },
		55: {
			title: "H Upgrade 55",
            description: "Automatically buy factories, and buying factories costs nothing.",
            cost: new Decimal(1500000),
        },
		61: {
			title: "H Upgrade 61",
            description: "H Upgrade 11 is boosted, and H Upgrade 11 is applied to banks.",
            cost: new Decimal(300000),
        },
		62: {
			title: "H Upgrade 62",
            //description: "Bank's cookie production is multiplied by x if you have more than 200 banks.",
            description: "This upgrade has no effect.",
			cost: new Decimal(3000000),
        },
		63: {
			title: "H Upgrade 63",
            //description: "Unlock a new cookie buyable, a new row of cookie upgrades and a challenge.",
            description: "This upgrade has no effect.",
            cost: new Decimal(5000000),
        },
		64: {
			title: "H Upgrade 64",
            description: "H Upgrade 14 is boosted by your banks.",
            cost: new Decimal(15000000),
        },
		65: {
			title: "H Upgrade 65",
            description: "Automatically buy banks, and buying banks costs nothing.",
            cost: new Decimal(10000000),
        },
	},
	challenges: {
            rows: 1,
    		cols: 2,
		    11: {
                name: "Only Clicks",
                completionLimit: 1,
			    challengeDescription() {return "Production from cookie buyables is disabled. You can gain cookies from clicks only."},
                unlocked() { return hasUpgrade("h",33) },
                goal: function(){return new Decimal("10000")},
                currencyDisplayName: "clicks",
                currencyInternalName: "clicks",
				currencyLayer: "c",
				rewardEffect() {
                    let ret = player.points.add(1).log10().add(1).pow(0.5);
                    return ret;
                },
                rewardDisplay() { return "Cursor's autoclicking speed is multiplied by "+format(this.rewardEffect()) },
                rewardDescription() { return "H Upgrade 14 is boosted by your points." },
            },
		    12: {
                name: "Neverclick",
                completionLimit: 1,
			    challengeDescription() {return "You can't click the \"Get cookies\" button, H Upgrade 14 is disabled."},
                unlocked() { return false },
                goal: function(){return new Decimal("10000")},
                currencyDisplayName: "cookies",
                currencyInternalName: "points",
				currencyLayer: "c",
                rewardDescription() { return "" },
            },
	},
	getHU14baseClickPS(){
		let m=new Decimal(0.1);
		if(hasUpgrade("h",24))m=m.mul(player.c.buyables[12].add(1).pow(0.4));
		if(hasUpgrade("h",34))m=m.mul(player.c.buyables[21].add(1).pow(0.4));
		if(hasUpgrade("h",44))m=m.mul(player.c.buyables[22].add(1).pow(0.4));
		if(hasUpgrade("h",54))m=m.mul(player.c.buyables[31].add(1).pow(0.4));
		if(hasUpgrade("h",64))m=m.mul(player.c.buyables[32].add(1).pow(0.4));
		if(player.h.challenges[11])m=m.mul(player.points.add(1).log10().add(1).pow(0.5));
		return m;
	}
})

addLayer("a", {
    name: "a", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
		dimu: 0,
		dim1: new Decimal(0),
		dim2: new Decimal(0),
		dim3: new Decimal(0),
		dim4: new Decimal(0),
		dim5: new Decimal(0),
    }},
    color: "#00DD00",
    resource: "antimatter", // Name of prestige currency
	type: "custom", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    hotkeys: [],
    layerShown(){return player.a.unlocked},
	row: 0,
	branches:['c'],
	effect() {
		if(player.a.unlocked){
			return player.a.points.add(10).log10().sqrt();
		}
		return new Decimal(1);
	},
	effectDescription() { // Optional text to describe the effects
        eff = this.effect();
        return "which are multiplying antimatter condenser's cookie production by "+format(eff);
    },
	getResetGain() {
		return layers.a.getGainD(11);
	},
	getNextAt() {
		return new Decimal(0);
	},
	passiveGeneration(){
		return 1;
	},
    canReset(){
        return false
    },
	tabFormat: {
                "Main": {
                        content: ["main-display",
						["display-text",function(){return "You are gaining "+format(tmp.a.getResetGain)+" antimatter per second"}],
						["display-text","Buying an Antimatter Condenser will gain 1 antimatter"],
						["display-text",function(){return "Your Antimatter Condensers are multiplying your Dimension's production by "+format(tmp.a.acBoost)}],
						["display-text",function(){
								if(player.a.dimu==0){
									if(player.c.buyables[71].gte(15))player.a.dimu++;
									else return "Next Dimension unlocks at 15 Antimatter Condensers";
								}
								if(player.a.dimu==1){
									if(player.c.buyables[71].gte(30))player.a.dimu++;
									else return "Next Dimension unlocks at 30 Antimatter Condensers";
								}
								if(player.a.dimu==2){
									if(player.c.buyables[71].gte(45))player.a.dimu++;
									else return "Next Dimension unlocks at 45 Antimatter Condensers";
								}
								if(player.a.dimu==3){
									if(player.c.buyables[71].gte(60))player.a.dimu++;
									else return "Next Dimension unlocks at 60 Antimatter Condensers";
								}
								if(player.a.dimu==4){
									if(player.c.buyables[71].gte(75))player.a.dimu++;
									else return "Next Dimension unlocks at 75 Antimatter Condensers";
								}
								return "";
						}],"buyables"
						]
				}
	},
	buyables:{
			rows:3,
			cols:2,
			11:{
				title(){
					return "First Dimension";
				},
				display(){
					let data = tmp[this.layer].buyables[this.id];
					return "You have "+format(player.a.dim1)+" First Dimensions. ("+format(player.a.buyables[11])+" bought)<br>"+
					"Thay are producing "+format(tmp.a.getResetGain)+" antimatter per second.<br>"+
					"Cost for Next First Dimension: "+format(data.cost)+" antimatter";
				},
				cost(){
					return new Decimal(10).mul(Decimal.pow(1e3,player.a.buyables[11]));
				},
				canAfford() {
                    return player[this.layer].points.gte(tmp[this.layer].buyables[this.id].cost)
				},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    player[this.layer].points = player[this.layer].points.sub(cost)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                    player[this.layer].spentOnBuyables = player[this.layer].spentOnBuyables.add(cost)
					player[this.layer].dim1=player[this.layer].dim1.add(1);
                },
				unlocked() { return player.a.dimu>=1 },
    
			},
			12:{
				title(){
					return "Second Dimension";
				},
				display(){
					let data = tmp[this.layer].buyables[this.id];
					return "You have "+format(player.a.dim2)+" Second Dimensions. ("+format(player.a.buyables[12])+" bought)<br>"+
					"Thay are producing "+format(layers.a.getGainD(12))+" First Dimensions per second.<br>"+
					"Cost for Next Second Dimension: "+format(data.cost)+" antimatter";
				},
				cost(){
					return new Decimal(100).mul(Decimal.pow(1e4,player.a.buyables[12]));
				},
				canAfford() {
                    return player[this.layer].points.gte(tmp[this.layer].buyables[this.id].cost)
				},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    player[this.layer].points = player[this.layer].points.sub(cost)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                    player[this.layer].spentOnBuyables = player[this.layer].spentOnBuyables.add(cost)
					player[this.layer].dim2=player[this.layer].dim2.add(1);
                },
				unlocked() { return player.a.dimu>=2 },
    
			},
			21:{
				title(){
					return "Third Dimension";
				},
				display(){
					let data = tmp[this.layer].buyables[this.id];
					return "You have "+format(player.a.dim3)+" Third Dimensions. ("+format(player.a.buyables[21])+" bought)<br>"+
					"Thay are producing "+format(layers.a.getGainD(21))+" Second Dimensions per second.<br>"+
					"Cost for Next Third Dimension: "+format(data.cost)+" antimatter";
				},
				cost(){
					return new Decimal(1e4).mul(Decimal.pow(1e5,player.a.buyables[21]));
				},
				canAfford() {
                    return player[this.layer].points.gte(tmp[this.layer].buyables[this.id].cost)
				},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    player[this.layer].points = player[this.layer].points.sub(cost)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                    player[this.layer].spentOnBuyables = player[this.layer].spentOnBuyables.add(cost)
					player[this.layer].dim3=player[this.layer].dim3.add(1);
                },
				unlocked() { return player.a.dimu>=3 },
    
			},
			22:{
				title(){
					return "Fourth Dimension";
				},
				display(){
					let data = tmp[this.layer].buyables[this.id];
					return "You have "+format(player.a.dim4)+" Fourth Dimensions. ("+format(player.a.buyables[22])+" bought)<br>"+
					"Thay are producing "+format(layers.a.getGainD(22))+" Third Dimensions per second.<br>"+
					"Cost for Next Fourth Dimension: "+format(data.cost)+" antimatter";
				},
				cost(){
					return new Decimal(1e6).mul(Decimal.pow(1e6,player.a.buyables[22]));
				},
				canAfford() {
                    return player[this.layer].points.gte(tmp[this.layer].buyables[this.id].cost)
				},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    player[this.layer].points = player[this.layer].points.sub(cost)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                    player[this.layer].spentOnBuyables = player[this.layer].spentOnBuyables.add(cost)
					player[this.layer].dim4=player[this.layer].dim4.add(1);
                },
				unlocked() { return player.a.dimu>=4 },
    
			},
			31:{
				title(){
					return "Fifth Dimension";
				},
				display(){
					let data = tmp[this.layer].buyables[this.id];
					return "You have "+format(player.a.dim5)+" Fifth Dimensions. ("+format(player.a.buyables[31])+" bought)<br>"+
					"Thay are producing "+format(layers.a.getGainD(31))+" Fourth Dimensions per second.<br>"+
					"Cost for Next Fifth Dimension: "+format(data.cost)+" antimatter";
				},
				cost(){
					return new Decimal(1e9).mul(Decimal.pow(1e8,player.a.buyables[31]));
				},
				canAfford() {
                    return player[this.layer].points.gte(tmp[this.layer].buyables[this.id].cost)
				},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    player[this.layer].points = player[this.layer].points.sub(cost)	
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                    player[this.layer].spentOnBuyables = player[this.layer].spentOnBuyables.add(cost)
					player[this.layer].dim5=player[this.layer].dim5.add(1);
                },
				unlocked() { return player.a.dimu>=5 },
    
			},
	},
	acBoost(){
		return new Decimal(1).add(player.c.buyables[71].div(30));
	},
	getGainD(x){
		if(x===undefined)return new Decimal(0);
		if(x==11)return layers.a.getBaseGainD(x).mul(player.a.dim1);
		if(x==12)return layers.a.getBaseGainD(x).mul(player.a.dim2);
		if(x==21)return layers.a.getBaseGainD(x).mul(player.a.dim3);
		if(x==22)return layers.a.getBaseGainD(x).mul(player.a.dim4);
		if(x==31)return layers.a.getBaseGainD(x).mul(player.a.dim5);
		return new Decimal(0);
	},
	getBaseGainD(x){
		if(x===undefined)return new Decimal(0);
		gain=new Decimal(1);
		gain=gain.mul(Decimal.pow(2,player.a.buyables[x]));
		gain=gain.mul(tmp.a.acBoost);
		return gain;
	},
	update(diff){
		if(player.a.dimu>=2)player.a.dim1=player.a.dim1.add(layers.a.getGainD(12).mul(diff));
		if(player.a.dimu>=3)player.a.dim2=player.a.dim2.add(layers.a.getGainD(21).mul(diff));
		if(player.a.dimu>=4)player.a.dim3=player.a.dim3.add(layers.a.getGainD(22).mul(diff));
		if(player.a.dimu>=5)player.a.dim4=player.a.dim4.add(layers.a.getGainD(31).mul(diff));
	}
})
