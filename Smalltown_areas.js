// newArea(id, name, feats, exits, onEnter)
newArea(
	'HOMEPROP', 'Home Property',
	[
		newFeature('DEBRIS', 1),
		newFeature('DEBRIS', 2),
		newFeature('DEBRIS', 3),
		newFeature('DEBRIS', 4)
	],
	[
		newExit(directions.EAST, 'Old Farm rd', 'East on Old Farm road', 'OLDFARMRDW', 5, 0, null),
		newExit(directions.SOUTH, '%HOMEPROPNAME% Farm', 'South to %HOMEPROPNAME% Farm', 'HOMEFARM', 5, 0, function() {return !areaHasFeatureType(currentSave.characterState.currentArea, 'DEBRIS');})
	],
	'Welcome Home!'
),
newArea(
	'HOMEFARM', '%HOMEPROPNAME% Farm',
	[
		newFeature('DEBRIS', 3),
		newFeature('DEBRIS', 4),
		newFeature('WATER', 0, {waterType: modData.types.waters.POND, noDelete: true, description: 'A nice-sized pond. You remember swimming here as a child. Maybe there are still fish here.'}),
		newFeature('ITEM', 0, {displayName: 'Rusty Shovel', description: 'Someone left an old shovel here. It could come in handy.', actions: [ { actionFunction: function(){clickActionButton(this, pickupTool);}, text: 'Take', accessibleText: 'Take Rusty Shovel', attr: {tool: 'shovel', level: 1} }] })
	],
	[
		newExit(directions.NORTH, '%HOMEPROPNAME%', 'North to %HOMEPROPNAME%', 'HOMEPROP', 5, 0, null)
	],
	'' 
),
newArea(
	'OLDFARMRDW', 'Old Farm Rd West',
	[
		newFeature('FORAGE', 0, {...modData.types.forageables.BLACKBERRY})
	],
	[
		newExit(directions.WEST, '%HOMEPROPNAME%', 'West to %HOMEPROPNAME%', 'HOMEPROP', 5, 0, null),
		newExit(directions.EAST, 'Old Farm rd', 'East on Old Farm road', 'OLDFARMRDE', 20, 0, null)
	],
	function(args) {
		var r = 'West end of Old Farm Road.';
		if (args !== null && args !== undefined)
		{
			switch (invDir(args.fromExit.direction))
			{
				case directions.WEST:
					r += ' Looks like it isn\'t well travelled.';
					break;
				case directions.EAST:
					r += ' You can see your family\'s old property from here.';
					break;
			}
		}
		return r;
	}
),
newArea(
	'OLDFARMRDE', 'Old Farm Rd East',
	[],
	[
		newExit(directions.WEST, 'Old Farm rd', 'West on Old Farm road', 'OLDFARMRDW', 20, 0, null),
		newExit(directions.EAST, 'Smalltown', 'East to Smalltown', 'STOWN_W', 5, 0, null),
		newExit(directions.SOUTH, 'Ranch Rd', 'South on Ranch Rd', 'RANCHRDN', 20, 0, null)
	],
	function(args) {
		var r = 'East end of Old Farm Road.';
		if (args !== null && args !== undefined)
		{
			switch (invDir(args.fromExit.direction))
			{
				case directions.WEST:
					r += ' You can see Smalltown at the end of the road.';
					break;
			}
		}
		return r;
	}
),
newArea(
	'RANCHRDN', 'Ranch rd North',
	[],
	[
		newExit(directions.NORTH, 'Old Farm rd', 'North to Old Farm Rd East', 'OLDFARMRDE', 20, 0, null),
		newExit(directions.SOUTH, 'Ranch Rd', 'South on Ranch Road', 'RANCHRDS', 20, 0, null)
	],
	'Ranch Road North'
),
newArea(
	'RANCHRDS', 'Ranch rd South',
	[],
	[
		newExit(directions.NORTH, 'Ranch Rd', 'North on Ranch Road', 'RANCHRDN', 20, 0, null),
		newExit(directions.WEST, 'Emma\'s Ranch', 'West to Emma\'s Ranch', 'EMMARANCH', 10, 0, null)
	],
	'Ranch Road South'
),
newArea(
	'EMMARANCH', 'Emma\'s Ranch',
	[],
	[
		newExit(directions.EAST, 'Ranch Rd', 'East to Ranch Road', 'RANCHRDS', 10, 0, null)
	],
	'Emma\'s Ranch, you can buy live stock and other ranching goods here.'
),
newArea(
	'STOWN_PL', 'Smalltown Plaza',
	[
		newFeature('SIGN', 0, {displayName: 'Plaza Guide', text: [UP_ARROW + ' North to Smalltown Jr. College', LEFT_ARROW + ' West to Old Farm Road', DOWN_ARROW + ' South to Shell Beach']}),
		newFeature('ITEM', 0, {displayName: 'Fountain', description: 'A large, marble fountain.',
			actions: [{ actionFunction: function(){
											if (testMoney(1, DEFAULT_MONEY_MESSAGE, true))
											{
												addAlertNarration('Ploop.');
												if (currentSave.characterState.boon < 1) { addBoon(); }
											}
										},
				text: 'Toss a coin', accessibleText: 'Toss a coin into the fountain' }] })
	],
	[
		newExit(directions.NORTH, 'Smalltown North', 'North to Smalltown North', 'STOWN_N', 5, 0, null),
		newExit(directions.EAST, 'Smalltown East', 'East to Smalltown East', 'STOWN_E', 5, 0, null),
		newExit(directions.SOUTH, 'Smalltown South', 'South to Smalltown South', 'STOWN_S', 5, 0, null),
		newExit(directions.WEST, 'Smalltown West', 'West to Smalltown West', 'STOWN_W', 5, 0, null)
	],
	'Smalltown Plaza, the town center, where the action is. Check the Plaza Guide for directions.'
),
newArea(
	'STOWN_N', 'Smalltown North',
	[],
	[
		newExit(directions.EAST, 'Smalltown JC', 'East to Smalltown junior college', 'STOWN_JC', 5, 0, null),
		newExit(directions.SOUTH, 'Smalltown Plaza', 'South to Smalltown Plaza', 'STOWN_PL', 5, 0, null),
		newExit(directions.WEST, 'Cottage Rd', 'West on Cottage Road', 'STOWN_RES1', 5, 0, null)
	],
	'The northern edge of Smalltown'
),
newArea(
	'STOWN_E', 'Smalltown East',
	[],
	[
		newExit(directions.WEST, 'Smalltown Plaza', 'East to Smalltown Plaza', 'STOWN_PL', 5, 0, null)
	],
	'The eastern edge of Smalltown'
),
newArea(
	'STOWN_S', 'Smalltown South',
	[],
	[
		newExit(directions.NORTH, 'Smalltown Plaza', 'North to Smalltown Plaza', 'STOWN_PL', 5, 0, null),
		newExit(directions.SOUTH, 'Shell Beach', 'South to Shell Beach', 'STOWN_B', 5, 0, null)
	],
	function(args) {
		var r = 'The southern edge of Smalltown.';
		if (args !== null && args !== undefined)
		{
			switch (invDir(args.fromExit.direction))
			{
				case directions.NORTH:
					r += ' Shell Beach is to the south.';
					break;
			}
		}
		return r;
	}
),
newArea(
	'STOWN_W', 'Smalltown West',
	[],
	[
		newExit(directions.WEST, 'Old Farm rd', 'West to Old Farm road', 'OLDFARMRDE', 5, 0, null),
		newExit(directions.EAST, 'Smalltown Plaza', 'East to Smalltown Plaza', 'STOWN_PL', 5, 0, null)
	],
	'The western edge of Smalltown'
),
newArea(
	'STOWN_B', 'Shell Beach',
	[],
	[
		newExit(directions.NORTH, 'Smalltown South', 'North to Smalltown South', 'STOWN_S', 5, 0, null),
		newExit(directions.SOUTH, 'Pelican Pier', 'South to Pelican Pier', 'STOWN_D', 5, 0, null)
	],
	function(args) {
		var r = 'Shell Beach.';
		if (args !== null && args !== undefined)
		{
			switch (invDir(args.fromExit.direction))
			{
				case directions.NORTH:
					r += ' Lots of sand, waves and pelicans.';
					break;
				case directions.SOUTH:
					r += ' Smalltown South is to the north.';
					break;
			}
		}
		return r;
	}
),
newArea(
	'STOWN_D', 'Pelican Pier',
	[],
	[
		newExit(directions.NORTH, 'Shell Beach', 'North to Shell Beach', 'STOWN_B', 5, 0, null)
	],
	'Pelican Pier, where most of Smalltown\'s fisherman spend their mornings.'
),
newArea(
	'STOWN_JC', 'Smalltown Jr. College',
	[],
	[
		newExit(directions.WEST, 'Smalltown North', 'West to Smalltown North', 'STOWN_N', 5, 0, null)
	],
	'Smalltown junior college, where Smalltown\'s youth get ready for the working force.'
),
newArea(
	'STOWN_RES1', 'Cottage Rd',
	[],
	[
		newExit(directions.EAST, 'Smalltown North', 'East to Smalltown North', 'STOWN_N', 5, 0, null)
	],
	'Cottage Road, several Smalltown residents live on this street.'
);