//"Fanciful Feldecarb Fountain flows full as fluttering fairies frolic fastidiously.  Flick a farthing?" 
	//function newStructure(areaId, type, area, owner, value, locked, amenities, options)
newStructure('HOMESHACK', 'SHACK', 'HOMEPROP', null, 100, false,
			[
				newFeature('ITEM', 0, {canPickUp: true, canPurchase: false, itemStack: newItemStack('POT_OLD', 0, 1), onPickup: function(){ startQuest('COOKING_I'); }}),
				newFeature('CAMPFIRE', 0),
				newFeature('SLEEPINGBAG', 0)
			],
			{ displayName: 'An old dilapidated shack',
				description: 'It looks like a squatter was living here. They left an old ratty sleeping bag and the remnants of a campfire.' }
);
newStructure('GARDENSHOP', 'SHOP', 'STOWN_PL', null, 1000000, null,
			[
				newFeature('ITEM', 0, {itemStack: newItemStack(modData.items.SPINACH_SEED, 0, 1), canPickUp: false, canPurchase: true, conditions: function() {return (calendarState.season === seasons.SPRING);} })
			],
			{ displayName: 'Avery\'s H&G',
				description: 'Avery\'s Home & Garden stocks seasonal seeds and general garden goods.' }
);
newStructure('DOMSBAKERY', 'SHOP', 'STOWN_PL', 'dominic', 1000000, null,
			[],
			{ displayName: 'BPS Bakery',
				description: 'The Bread Poet\'s Society, bakery and coffee shop. Open mic on thursday nights.' }
);
newStructure('CLAYSDELI', 'SHOP', 'STOWN_PL', 'clayton', 1000000, null,
			[],
			{ displayName: 'M&G Deli',
				description: 'Meat and Greet delicatessen. Get your meats and other foods here.' }
).isLocked = function() { return !between(calendarState.minutes, hm(7, 59), hm(16), false); };
newStructure('GORDOSREST', 'SHOP', 'STOWN_E', 'luigi', 1000000, null,
			[],
			{ displayName: 'D\'Graisse\'s',
				description: 'Smalltowns own fine dining establishment. Very good reviews online.' }
);
newStructure('EMMASSHOP', 'SHOP', 'EMMARANCH', null, 2000000, null,
			[],
			{ displayName: 'Emma\'s Feed',
				description: 'Emma\'s Feed carries livestock, feed and ranching goods.' }
).isLocked = function() { return !between(calendarState.minutes, hm(7, 59), hm(16), false); };
newStructure('EMMAS_HOUSE', 'HOUSE', 'EMMARANCH', null, 1000000, true,
			[],
			{ noDelete: false, description: 'Emma\'s house.' }
);
newStructure('EMMARANCH_STAFF', 'BUNG', 'EMMARANCH', null, 10000, true,
			[],
			{ noDelete: false, description: 'On-site living for ranch hands.' }
);
newStructure('MARTIN_HOUSE', 'COTTAGE', 'STOWN_RES1', null, 250000, true,
			[],
			{ noDelete: false, description: 'The Martin Residence.' }
);