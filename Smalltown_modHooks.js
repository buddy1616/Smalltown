modHooks.keyUp = function(e) {
	if (getSubcontent('gameBox') == 'main')
	{
		e = e || window.event;
		switch (e.keyCode)
		{
			case 37: // left
				g('westNavButton').click();
				break;
			case 38: // up
				g('northNavButton').click();
				break;
			case 39: // right
				g('eastNavButton').click();
				break;
			case 40: // down
				g('southNavButton').click();
				break;
		}
	}
}

modHooks.startGame_enter = function() {
	setGamePreferences(modConfig.gamePreferences);
}

modHooks.setGamePreferences_exit = function(pref) {
	g('pref_areaTabOnTravel_yes').checked = modConfig.gamePreferences.areaTabOnTravel;
	g('pref_areaTabOnTravel_no').checked = !modConfig.gamePreferences.areaTabOnTravel;
}

modHooks.newSkillSet = function() {
	return {
		cooking: newSkill('cooking', 'Cooking', 'Your ability to cook food. The higher level this skill is, the more recipes you know and the better the cooking results will be.', 0),
		earlyBird: newSkill('earlyBird', 'Early Bird', 'Early birds get the worm. The higher this skill is, the earlier you wake up, and the less sleep you need each night to start with 100% stamina. Currently this skill wakes you up %EARLYBIRDMIN% minute(s) earlier.', 0),
		fishing: newSkill('fishing', 'Fishing', 'Using a rod, net or traps to pull creatures from the water. Higher skill levels increase the chance to encounter and catch fish that are more difficult to land.', 0),
		foraging: newSkill('foraging', 'Foraging', 'Harvesting wild plants. Each level increase the yield by approximately 6% and has a 1% chance to grant a bonus yield of higher quality.', 0),
		nightOwl: newSkill('nightOwl', 'Night Owl', 'This is your ability to stay up late. Each level increases your bedtime. Currently this skill delays your bedtime by %NIGHTOWLMIN% minute(s).', 0)
	}
}

modHooks.newToolSet = function() {
	return {
		cookingSet: newTool('cookingSet', 'Cooking Set', ['Just a few old knives and a beat up pot. It\'ll get you started.', 'A few nice utensils, pots and pans.', 'A good set of cooking gear for aspiring chef.', 'A professional cooking set.', 'An exceptional quality cooking set up, for accomplished chefs only.'], 'Useful for preparing and combining cooking ingredients, and cooking recipes.', 0),
		fishingNet: newTool('fishingNet', 'Fishing Net', ['A rotten, old net with lots of broken string.', 'A decent net for a beginner.', 'A good quality net, it should catch lots of fish.', 'A high quality net, like the professionals use.', 'An exceptional quality net.'], 'Useful for catching lots of small fish in water. Doesn\'t require bait.', 0),
		fishingRod: newTool('fishingRod', 'Fishing Rod', ['A crumby, old rod.', 'A decent beginning rod.', 'A good hobbist rod.', 'A high quality professional rod.', 'An exceptional quality, high performance fishing rod.'], 'Useful for catching fish in water. Requires bait.', 0),
		shovel: newTool('shovel', 'Shovel', ['A rusty, chipped, splintery, old, shovel.', 'A decent shovel, nothing special.', 'A good quality, sturdy, shovel.', 'A high quality shovel, should last a long time.', 'An exceptional quality shovel.'], 'Useful for digging in the earth.', 0)
	};
}

modHooks.newCharacterStateInjectProperties = function(character) {
	var r = character;
	r.homeProperty = '';
	r.lastBedtime = 0;
	r.boon = 0;
	return r;
}

modHooks.clearNarration_enter = function() {
	g('narrationBox').innerHTML = '';
}
modHooks.addNarrationMessage_enter = function(message) {
	appendNarrationBox(message, 'narrationMessage');
	scrollNarrationToBottom();
}
modHooks.addAlertNarration_enter = function(message) {
	addNarrationMessage(message);
	scrollNarrationToBottom();
}
modHooks.addSignTextNarration_enter = function(message) {
	appendNarrationBox(message, 'signTextNarrationMessage');
	scrollNarrationToBottom();
}
modHooks.addNpcDialogNarration_exit = function(npc, message) {
	var text = ['<b>' + npc.firstName + ' says:</b>'];
	if (Array.isArray(message))
	{
		text.push(...message);
	}
	else
	{
		text.push(message);
	}
	addSignTextNarration(text);
}

modHooks.handleWildcards_enter = function(text) {
	var r = text;
	if (gameHasStarted)
	{
		r = swapWildCard_Property(getArea(characterState.homeProperty), r, '%HOMEPROPNAME%', getArea(characterState.homeProperty).name);
		r = swapWildCard_Property(characterState.skills, r, '%EARLYBIRDMIN%', getEarlyBirdMinutes());
		r = swapWildCard_Property(characterState.skills, r, '%NIGHTOWLMIN%', getNightOwlMinutes());
	}
	return r;
}

modHooks.updateDisplay_enter = function() {
	//update calendar
	if (calendarState != null)
	{
		g('currentDayOfWeek').innerHTML = getDayOfWeek().displayName;
		g('currentSeason').innerHTML = calendarState.season.displayName;
		g('currentSeasonDay').innerHTML = ord(calendarState.dayOfSeason + 1);
		updateClock();
	}

	//update stamina
	g('currentStaminaPercent').innerHTML = Math.round(characterState.stamina / characterState.maxStamina * 100);

	//update money
	g('currentMoney').innerHTML = characterState.money.toLocaleString();

	//populate tab box
	switch (selectedTabs.tabBox)
	{
		case 'area':
			updateCurrentArea();
			break;
		case 'inventory':
			updateInventory();
			break;
		case 'skills':
			populateSkillsTab();
			break;
		case 'journal':
			updateJournal();
			break;
	}
}

modHooks.updateArea_enter = function(area) {
	var x = g('areaTableBody');
	x.innerHTML = '';
	var row = ce('tr');
	var nameTd = ce('td');
	var actionTd = ce('td');
	nameTd.innerHTML = handleWildcards(getFuncOrVar(area.name));
	actionTd.appendChild(makeButton('ochreButton', function(){wait(1);}, '1m', 'Wait 1 minute'));
	actionTd.appendChild(makeButton('ochreButton', function(){wait(5);}, '5m', 'Wait 5 minutes'));
	actionTd.appendChild(makeButton('ochreButton', function(){wait(30);}, '30m', 'Wait 30 minutes'));
	actionTd.appendChild(makeButton('ochreButton', function(){inspectArea(this.getAttribute('data-areaid'));}, INSPECT_ICON, 'Inspect ' + handleWildcards(getFuncOrVar(area.name)), {areaId: area.id}));
	row.appendChild(nameTd);
	row.appendChild(actionTd);
	x.appendChild(row);
}
// todo buyable shop items show in both features and sale items
modHooks.updateArea_structures = function(area) {
	var x = g('areaStructuresBody');
	x.innerHTML = '';
	g('structuresTable').style.display = 'none';
	for (var i=0;i<modData.structures.length;i++)
	{
		if (modData.structures[i].inArea == area.id)
		{
			g('structuresTable').style.display = 'table';
			var struct = modData.structures[i];

			var row = ce('tr');
			var nameTd = ce('td');
			var actionTd = ce('td');
			var n = getStructureDisplayName(struct);
			nameTd.innerHTML = n;
			if (getFuncOrVar(struct.isLocked))
			{
				actionTd.appendChild(makeFeatureActionButton(function(){clickActionButton(this, clickEnterStructureButton);}, LOCK_ICON, n + ' is locked', { area: area.id, structure: struct.id }));
			}
			else
			{
				actionTd.appendChild(makeFeatureActionButton(function(){clickActionButton(this, clickEnterStructureButton);}, 'Enter', 'Enter ' + n, { area: area.id, structure: struct.id }));
			}
			actionTd.appendChild(makeStructureInspectbutton(struct));
			row.appendChild(nameTd);
			row.appendChild(actionTd);
			x.appendChild(row);
		}
	}
}

modHooks.updateArea_features = function(area) {
	var x = g('areaFeaturesBody');
	x.innerHTML = '';
	g('featuresTable').style.display = 'none';
	if (area.hasOwnProperty('features'))
	{
		for (var i=0;i<area.features.length;i++)
		{
			var feat = area.features[i];
			var row = null;
			if (testConditions(characterState, feat.conditions))
			{
				g('featuresTable').style.display = 'table';
				row = handleFeatureRow(area, feat);
			}
	
			if (row != null)
			{
				x.appendChild(row);
			}
		}
	}
	else
	{
		g('featuresTable').style.display = 'none';
	}
}

modHooks.updateArea_npcs = function(area) {
	var x = g('areaNpcsBody');
	x.innerHTML = '';
	g('areaNpcsTable').style.display = 'none';
	var ns = getPresentNpcs(area);
	for (var i=0;i<ns.length;i++)
	{
		g('areaNpcsTable').style.display = 'table';
		var n = ns[i];

		var row = ce('tr');
		var nameTd = ce('td');
		var actionTd = ce('td');
		nameTd.innerHTML = n.firstName + ((n.currentActivity !== null) ? ' (' + ucaseName(modData.types.activities[n.currentActivity].displayName) + ')' : '');
		actionTd.appendChild(makeButton('ochreButton', function(){talkToNpc(this);}, 'Talk', 'Talk to ' + n.firstName, {npcid: n.id}));
		actionTd.appendChild(makeNpcInspectbutton(n));
		row.appendChild(nameTd);
		row.appendChild(actionTd);
		x.appendChild(row);
	}
}

modHooks.updateArea_saleItems = function(area) {
	var x = g('saleItemsBody');
	x.innerHTML = '';
	if (areaHasSaleItems(area))
	{
		for (var i=0;i<area.features.length;i++)
		{
			var row = null;
			var feat = area.features[i];
			if (feat.type == 'ITEM' && feat.canPurchase && testConditions(characterState, feat.conditions))
			{
				g('saleItemsTable').style.display = 'table';
				row = createFeatureRow(feat, [
						{ actionFunction: function(){clickActionButton(this, tryPurchaseItem);}, text: '$', accessibleText: 'Buy 1 for $' + feat.itemStack.item.value, attr: { area: area.id, feature: feat.id, purchaseQuantity: 1 } },
						{ actionFunction: function(){clickActionButton(this, tryPurchaseItem);}, text: '$ x5', accessibleText: 'Buy 5 for $' + (feat.itemStack.item.value * 5), attr: { area: area.id, feature: feat.id, purchaseQuantity: 5 } },
						{ actionFunction: function(){clickActionButton(this, tryPurchaseItem);}, text: '$ x10', accessibleText: 'Buy 10 for $' + (feat.itemStack.item.value * 10), attr: { area: area.id, feature: feat.id, purchaseQuantity: 10 } }
					]);
			}
			if (row != null)
			{
				x.appendChild(row);
			}
		}
	}
	else
	{
		g('saleItemsTable').style.display = 'none';
	}
}

modHooks.updateInventory_enter = function() {
	var hasTools = false;
	for (var key in characterState.tools)
	{
		var tool = characterState.tools[key];
		if (tool.level > 0)
		{
			hasTools = true;
		}
	}
	if (hasTools)
	{
		g('toolBox').style.display = 'block';
		g('noToolBox').style.display = 'none';
		updateToolsTable();
	}
	else
	{
		g('toolBox').style.display = 'none';
		g('noToolBox').style.display = 'block';
	}
	var hasInv = false;
	for (var i=0;i<characterState.inventory.length;i++)
	{
		if (characterState.inventory[i].quantity > 0)
		{
			hasInv = true;
			break;
		}
	}
	if (hasInv)
	{
		g('inventoryBox').style.display = 'block';
		g('noInventoryBox').style.display = 'none';
		var x = g('inventoryTableBody');
		x.innerHTML = '';
		
		for (var i=0;i<characterState.inventory.length;i++)
		{
			var stack = characterState.inventory[i];
			var item = modData.items[stack.item];
			if (stack.quantity > 0)
			{
				var row = ce('tr');
				var nameTd = ce('td');
				var actionTd = ce('td');
				
				if (stack.quantity > 1)
				{
					nameTd.innerHTML = ucaseName(item.pluralName) + ' x' + stack.quantity;
				}
				else
				{
					nameTd.innerHTML = ucaseName(item.displayName);
				}
				if (stack.level > 0)
				{
					nameTd.appendChild(renderStars(stack.level, true));
				}	

				actionTd.appendChild(makeItemInspectbutton(item));

				row.appendChild(nameTd);
				row.appendChild(actionTd);
				x.appendChild(row);
			}
		}
	}
	else
	{
		g('inventoryBox').style.display = 'none';
		g('noInventoryBox').style.display = 'block';
	}
}

modHooks.updateCharacter_enter = function() {
	var hasSkills = false;
	for (var key in characterState.skills)
	{
		var skills = characterState.skills[key].level;
		if (skills > 0)
		{
			hasSkills = true;
		}
	}
	if (hasSkills)
	{
		g('skillBox').style.display = 'block';
		g('noSkillBox').style.display = 'none';
	}
	else
	{
		g('skillBox').style.display = 'none';
		g('noSkillBox').style.display = 'block';
	}

	var x = g('skillTableBody');
	x.innerHTML = '';
	hideSkillInterfaces();
	for (var key in characterState.skills)
	{
		var skill = characterState.skills[key];
		
		if (skill.level > 0)
		{
			var row = ce('tr');
			var nameTd = ce('td');
			var levelTd = ce('td');
			var actionTd = ce('td');

			nameTd.innerHTML = skill.displayName;
			levelTd.innerHTML = skill.level;
			switch (skill.id)
			{
				case 'cooking':
					actionTd.appendChild(makeButton('ochreButton', function(){openSkillInterface('cooking');}, 'Cook', 'Cook'));
					break;
			}
			actionTd.appendChild(makeSkillInspectbutton(skill));

			row.appendChild(nameTd);
			row.appendChild(levelTd);
			row.appendChild(actionTd);
			x.appendChild(row);
		}
	}

	if (characterState.knownRecipes.length > 0)
	{
		g('knownRecipesBox').style.display = 'block';
		g('noRecipesBox').style.display = 'none';
		g('notNearCookingFeature').style.display = 'none';
		g('requiredIngredientsBox').style.display = 'none';
		var sel = g('knownRecipesDropDown');
		sel.innerHTML = '<option value="" selected>--Select Recipe--</option>';
		for (var i=0;i<characterState.knownRecipes.length;i++)
		{
			var rec = getRecipe(characterState.knownRecipes[i]);
			var res = getItem(rec.result.item);
			var o = ce('option');
			o.value = rec.id;
			o.innerHTML = ucaseName(res.displayName + ((rec.result.quantity > 1) ? (' x' + rec.result.quantity) : ''));
			sel.appendChild(o);
		}
	}
	else
	{
		g('knownRecipesBox').style.display = 'none';
		g('noRecipesBox').style.display = 'block';
	}
}

modHooks.updateJournal_enter = function() {
	var xAct = g('activeQuestsTableBody');
	var xCom = g('completedQuestsTableBody');
	xAct.innerHTML = '';
	xCom.innerHTML = '';
	var hasActive = false;
	var hasCompleted = false;
	for (var i=0;i<characterState.quests.length;i++)
	{
		if (characterState.quests[i].status != questStatuses.NOTSTARTED)
		{
			var row = ce('tr');
			var nameTd = ce('td');
			var actionTd = ce('td');
			nameTd.innerHTML = characterState.quests[i].name;
			var status = characterState.quests[i].status;
			if (status == questStatuses.AWARDED)
			{
				actionTd.appendChild(makeButton('greenButton', function(){collectQuestRewards(this);}, 'Reward', 'Collect Rewards for ' + characterState.quests[i].name, {questid: characterState.quests[i].id}));
			}
			actionTd.appendChild(makeButton('ochreButton', function(){inspectQuest(this);}, INSPECT_ICON, 'Inspect ' + characterState.quests[i].name, {questid: characterState.quests[i].id}));
			row.appendChild(nameTd);
			row.appendChild(actionTd);
			if (status == questStatuses.ACTIVE || status == questStatuses.AWARDED)
			{
				xAct.appendChild(row);
				hasActive = true;
			}
			if (status == questStatuses.COMPLETED)
			{
				xCom.appendChild(row);
				hasCompleted = true;
			}
		}
	}
	if (hasActive)
	{
		g('activeQuestsBox').style.display = 'block';
		g('noActiveQuestsBox').style.display = 'none';
	}
	else
	{
		g('activeQuestsBox').style.display = 'none';
		g('noActiveQuestsBox').style.display = 'block';
	}
	if (hasCompleted)
	{
		g('completedQuestsBox').style.display = 'block';
		g('noCompletedQuestsBox').style.display = 'none';
	}
	else
	{
		g('completedQuestsBox').style.display = 'none';
		g('noCompletedQuestsBox').style.display = 'block';
	}
}

modHooks.updateNavigation_enter = function() {
	g('northNavButtonText').innerHTML = 'No path';
	g('eastNavButtonText').innerHTML = 'No path';
	g('southNavButtonText').innerHTML = 'No path';
	g('westNavButtonText').innerHTML = 'No path';
	g('northNavButton').disabled = true;
	g('eastNavButton').disabled = true;
	g('southNavButton').disabled = true;
	g('westNavButton').disabled = true;
}

modHooks.updateExitNavigation = function(area, exit, index) {
	var txt = g(exit.direction.navButtonText);
	var but = g(exit.direction.navButton);
	txt.innerHTML = handleWildcards(exit.text);
	but.disabled = false;
	but.setAttribute('aria-label', handleWildcards(exit.accessibleText));
	but.setAttribute('data-area', area.id);
	but.setAttribute('data-exit', index);
}

modHooks.updateClock_handleDayTime = function() {
	g('timeOfDayEmoji').innerHTML = SUN_ICON;
	g('timeOfDayEmoji').className = 'sunEmoji';
}
modHooks.updateClock_handleNightTime = function() {
	g('timeOfDayEmoji').innerHTML = MOON_ICON;
	g('timeOfDayEmoji').className = 'moonEmoji';
}

modHooks.areaChange = function(area, prevArea) {
	if (areaHasFeatureType(area, 'DEBRIS'))
	{
		addNarrationMessage('You\'ll need to clear out this debris before you start working here.');
	}
	if (modConfig.gamePreferences.areaTabOnTravel)
	{
		selectTab('tabBox', 'area', 'maintabs', g('mainTab_Area'));
	}
}

modHooks.enterFirstArea = function(area) {
	addNarrationMessage('Use the (N:, E:, S:, W:) Navigation buttons to traverse the world\'s different areas.');
	addNarrationMessage('Some areas have a list of features that you can interact with using the controls below the navigation.');
	addNarrationMessage('Actions require time and stamina, be wary of the time of day and your stamina.');
	addNarrationMessage('Make it home by bedtime each night or you wont be well rested for the next day. Run out of stamina and you\'ll be too tired to do any work.');
}

modHooks.handleNpcDialog = function(npc) {
	if (npc.currentActivity == 'SLEEPING')
	{
		addTime(modConfig.timeCosts.CANT_TALK_TO_NPC);
		addNarrationMessage(npc.firstName + ' appears to be asleep.');
		return true;
	}
	return false;
}