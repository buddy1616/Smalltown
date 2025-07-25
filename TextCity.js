//TODO time just keeps going, need a way to cycle the days and go to sleep

//*************************| shortcut functions |*************************
function g(e) { return document.getElementById(e); }
function ce(e) { return document.createElement(e); }
//*************************| shortcut functions |*************************

//*************************| utility functions |*************************
function isToday(m, d)
{
	var t = new Date();
	var y = t.getFullYear();
	var isday = new Date(y, m - 1, d);

	return ((isday.getDate() == t.getDate())
			&& (isday.getMonth() == t.getMonth())
			&& (isday.getFullYear() == t.getFullYear()));
}
function rint(n)
{
	return Math.floor(Math.random() * n);
}
function s(w)
{
	return ((w == 1) ? '' : 's');
}
function n(w)
{
	return ((['a', 'e', 'i', 'o', 'u'].includes(w.charAt(0).toLowerCase())) ? 'n' : '');
}
function ord(n)
{
	var t = n % 10;
	var h = n % 100;
	if ((t == 1) && (h != 11))
	{
		return n + 'st';
	}
	if ((t == 2) && (h != 12))
	{
		return n + 'nd';
	}
	if ((t == 3) && (h != 13))
	{
		return n + 'rd';
	}
	return n + 'th';
}
function between(n, min, max, inclusive = true)
{
	if (!inclusive)
	{
		return (n > min && n < max);
	}
	return (n >= min && n <= max);
}

function ucaseName(n)
{
	return n.charAt(0).toUpperCase() + n.slice(1);
}
function diminish(n, c)
{
	return Math.floor((Math.sqrt((c * n) + 1) - 1) / 2);
}
function softcap(n, l)
{
	return Math.min(n, l) + Math.floor(Math.min(n, l) * (Math.max(0, n - l) / 100));
}
function scrollTabs(el, direction)
{
	var w = Math.floor(gameBox.offsetWidth / 2);
	el.scroll({left: el.scrollLeft + (w * direction), top: 0, behavior: 'smooth'});
}
function roll(chance)
{
	if (rint(100) + 1 <= chance)
	{
		return true;
	}
	return false;
}
function getRandomArrayValue(arr)
{
	return arr[rint(arr.length)];
}
function getRandomWeightedResult(a, loot)
{
	var totalWeight = 0;
	var bonus = lootBonus;
	if (Array.isArray(a))
	{
		for (let i=0;i<a.length;i++)
		{
			if (a[i].hasOwnProperty('weight'))
			{
				totalWeight += a[i].weight;
				if ((loot) && (a[i].weight < 4)) { totalWeight += bonus; }
			}
		}
		var weightIndex = rint(totalWeight);
		var weightCursor = 0;
		for (let i=0;i<a.length;i++)
		{
			if (a[i].hasOwnProperty('weight'))
			{
				weightCursor += a[i].weight;
				if ((loot) && (a[i].weight < 4)){ weightCursor += bonus; }
				if (weightIndex <= weightCursor) { return i; }
			}
		}
	}
	return null;
}
function deleteElement(el)
{
	var e = g(el);
	if ((e !== null) && (e != undefined))
	{
		e.parentNode.removeChild(e);
		return true;
	}
	return false;
}
function serialize(ob)
{
	return encodeURIComponent(JSON.stringify(ob));
}
function deserialize(str)
{
	return JSON.parse(decodeURIComponent(str));
}
function encode(str)
{
	return window.btoa(str);
}
function decode(str)
{
	return window.atob(str);
}
function getFuncOrVar(ob, arg)
{
	if (typeof ob === 'function')
	{
		if ((arg != null) && (arg != undefined))
		{
			return ob(arg);
		}
		return ob();
	}
	return ob;
}

function clamp(n, min, max)
{
	return Math.max(min, Math.min(max, n));
}
function invDir(dir)
{
	if (dir == directions.NORTH) { return directions.SOUTH; }
	if (dir == directions.SOUTH) { return directions.NORTH; }
	if (dir == directions.EAST) { return directions.WEST; }
	if (dir == directions.WEST) { return directions.EAST; }
}

function fixButtonTextWidths(el)
{
	var butts = el.getElementsByTagName('button');
	for (var i=0;i<butts.length;i++)
	{
		var butt = butts[i];
		var butw = butt.clientWidth;
		if (butw > 0)
		{
			var textw = butt.scrollWidth;

			var scale = butw / textw * .8;
			for (var s=0;s<butt.getElementsByTagName('span').length;s++)
			{
				var span = butt.getElementsByTagName('span')[s];
				span.style.fontSize = (2.5 * scale) + 'vh';
			}
		}
	}
}

function newEnum()
{
	var r = {};
	for(var i=0;i<arguments.length;i++)
	{
		r[arguments[i]] = i;
	}
	r.includes = function(s) {
		for (var key in r)
		{
			if (key == s) { return true; }
		}
		return false;
	};
	Object.freeze(r);
	return r;
}
//*************************| utility functions |*************************

//*************************| time functions |*************************
function addTime(minutes)
{
	calendarState.minutes += minutes;
	updateClock();
}
function setTime(hours, minutes)
{
	calendarState.minutes = hm(hours, minutes);
	updateDisplay();
}
function hm(hours, minutes = 0)
{
	return hours * 60 + minutes;
}
function timeBetween(min, max, inclusive = true)
{
	return between(calendarState.minutes, min, max, inclusive);
}
function isDayOfWeek(days)
{
	if (days.includes(getDayOfWeek().code)) { return true; }
	return false;
}
function wait(minutes)
{
	addTime(minutes);
	updateDisplay();
}
//*************************| time functions |*************************

//*************************| area functions |*************************
function getArea(id)
{
	if (typeof(id) == 'object') { return id; }
	for (var i=0;i<modData.areas.length;i++)
	{
		if (modData.areas[i].id.toLowerCase() == id.toLowerCase())
		{
			return modData.areas[i];
		}
	}
	return null;
}
function inspectArea(areaId)
{
	var a = getArea(areaId);
	if (a.hasOwnProperty('description'))
	{
		addNarrationMessage(handleWildcards(getFuncOrVar(a.description)));
	}
	else if (a.hasOwnProperty('onEnter'))
	{
		addNarrationMessage(handleWildcards(getFuncOrVar(a.onEnter)));
	}
	else
	{
		addNarrationMessage(staticMessages.NO_AREA_DESCRIPTION);
	}
}
function setCurrentArea(id, fromExit)
{
	var prevAreaId = characterState.currentArea;
	var prevArea = null;
	if (prevAreaId)
	{
		prevArea = getArea(prevAreaId);
	}
	var area = getArea(id);
	characterState.currentArea = id;
	clearNarration();
	if (area.hasOwnProperty('onEnter'))
	{
		var enterText = getFuncOrVar(area.onEnter, {fromExit: fromExit});
		if (enterText === null || enterText === undefined) { enterText = getFuncOrVar(area.name); }
		addNarrationMessage(enterText);
	}

	if (firstArea)
	{
		if (typeof modHooks.enterFirstArea === 'function') { modHooks.enterFirstArea(area); }
		firstArea = false;
	}
	
	if (typeof modHooks.areaChange === 'function') { modHooks.areaChange(area, prevArea); }

	updateDisplay();
}

function areaHasFeatureType(area, featureType)
{
	var a = getArea(area);
	for (var i=0;i<a.features.length;i++)
	{
		if (a.features[i].type == featureType)
		{
			return true;
		}
	}
	return false;
}

function getFeature(id)
{
	for (var i=0;i<modData.features.length;i++)
	{
		if (modData.features[i].id == id)
		{
			return modData.features[i];
		}
	}
	return null;
}
function getAreaFeaturesByType(area, featureType)
{
	var a = getArea(area);
	var r = [];
	for (var i=0;i<a.features.length;i++)
	{
		if (a.features[i].type == featureType)
		{
			r.push(a.features[i]);
		}
	}
	return r;
}

function getFeatureDisplayName(f)
{
	var n = f.displayName;
	if (f.type == 'ITEM' && f.hasOwnProperty('itemStack'))
	{
		n = getItem(f.itemStack.item).displayName;
	}
	return handleWildcards(getFuncOrVar(n, f));
}

function deleteFeature(area, feature)
{
	var a = getArea(area);
	for (let i=0;i<a.features.length;i++)
	{
		if (a.features[i].id == feature)
		{
			a.features.splice(i, 1);
		}
	}
	for (let i=0;i<modData.features.length;i++)
	{
		if (modData.features[i].id == feature)
		{
			modData.features.splice(i, 1);
		}
	}
	updateDisplay();
}

function getAreaCookingFeatures(area)
{
	var a = getArea(area);
	var r = [];
	for (var i=0;i<a.features.length;i++)
	{
		if (a.features[i].options.hasOwnProperty('canCook') && a.features[i].options.canCook)
		{
			r.push(a.features[i]);
		}
	}
	return r;
}
function canCookRecipeInArea(recipe, area)
{
	if (recipe != null && recipe != undefined && recipe != '')
	{
		var a = getArea(area);
		var r = getRecipe(recipe);
		var feats = getAreaCookingFeatures(a);
		if (feats.length > 0)
		{
			for (var i=0;i<feats.length;i++)
			{
				if (Array.isArray(r.cookingFeatures) && r.cookingFeatures.includes(feats[i].type)) { return true; }
				if (r.cookingFeatures == feats[i].type) { return true; }
			}
		}
	}
	return false;
}
function updateArea(area)
{
	if (typeof modHooks.updateArea_enter === 'function') { modHooks.updateArea_enter(area); }
	if (typeof modHooks.updateArea_structures === 'function') { modHooks.updateArea_structures(area); }
	if (typeof modHooks.updateArea_features === 'function') { modHooks.updateArea_features(area); }
	if (typeof modHooks.updateArea_npcs === 'function') { modHooks.updateArea_npcs(area); }
	if (typeof modHooks.updateArea_saleItems === 'function') { modHooks.updateArea_saleItems(area); }
	if (typeof modHooks.updateArea_exit === 'function') { modHooks.updateArea_exit(area); }
}

function tryTravel(exit)
{
	if (testStamina(exit.stamina, staticMessages.NOT_ENOUGH_STAMINA, false))
	{
		if (testTime(exit.time, true, false))
		{
			clearNarration();
			addStamina(-exit.stamina);
			addTime(exit.time);
			setCurrentArea(exit.toArea, exit);
		}
	}
}
//*************************| area functions |*************************

//*************************| property functions |*************************
function updatePropertyName(index, prop)
{
	if (characterState.ownedAreas.includes(index))
	{
		getArea(index).name = prop;
	}
}
//*************************| property functions |*************************

//*************************| structure functions |*************************
function tryEnterStructure(structureId)
{
	if (!getFuncOrVar(modData.structures[structureId].isLocked))
	{
		if (testTime(2, true, true))
		{
			enterStructure(structureId);
		}
	}
	else
	{
		addAlertNarration(getStructureDisplayName(structureId) + ' is locked.');
	}
}
function enterStructure(structureId)
{
	var struct = modData.structures[structureId];
	setCurrentArea(struct.areaId, false);
	clearNarration();
	if (typeof modHooks.narrate_enterStructure === 'function') { modHooks.narrate_enterStructure(struct); }
	else { addNarrationMessage('You enter ' + getStructureDisplayName(struct) + '.'); }
	if (struct.hasOwnProperty('firstEnter') && !struct.visited)
	{
		addNarrationMessage(handleWildcards(struct.firstEnter));
		struct.visited = true;
	}
	else
	{
		inspectStructure(struct);
	}
}
function tryLeaveStructure(toAreaId)
{
	if (testTime(2, true, true))
	{
		leaveStructure(toAreaId);
	}
}
function leaveStructure(id)
{
	setCurrentArea(id, null);
}
function getStructureDisplayName(s)
{
	var struct = s;
	if (typeof(struct) !== 'object')
	{
		struct = modData.structures[s];
	}
	return handleWildcards(getFuncOrVar(struct.displayName, struct));
}
function getStructureByAreaId(area)
{
	for (var i=0;i<modData.structures.length;i++)
	{
		if (modData.structures[i].areaId == area)
		{
			return modData.structures[i];
		}
	}
	return null;
}
function isStructureOpen(area)
{
	var s = getStructureByAreaId(area);
	if (s !== null && s.hasOwnProperty('isLocked')) { return !getFuncOrVar(s.isLocked); }
	return false;
}
function isStructureOwnedBy(area, owner)
{
	var s = getStructureByAreaId(area);
	return (s.owner.toLowerCase() == owner.toLowerCase());
}
//*************************| structure functions |*************************

//*************************| character functions |*************************
function updateCharacter()
{
	if (typeof modHooks.updateCharacter_enter === 'function') { modHooks.updateCharacter_enter(); }
	if (typeof modHooks.updateCharacter_exit === 'function') { modHooks.updateCharacter_exit(); }
}

function addStamina(n)
{
	characterState.stamina = clamp(characterState.stamina + n, 0, characterState.maxStamina);
	updateDisplay();
	if (characterState.stamina == 0)
	{
		if (typeof modHooks.narrate_outOfStamina === 'function') { modHooks.narrate_outOfStamina(); }
		else { addNarrationMessage(staticMessages.OUT_OF_STAMINA); }
	}
}
function addMoney(n)
{
	characterState.money = clamp(characterState.money + n, 0, 999999999);
	updateDisplay();
	if (characterState.money == 0)
	{
		if (typeof modHooks.narrate_outOfMoney === 'function') { modHooks.narrate_outOfMoney(); }
		else { addNarrationMessage(staticMessages.OUT_OF_MONEY); }
	}
}
function testStamina(cost, message, update)
{
	if (characterState.stamina >= cost)
	{
		if (update) { addStamina(-cost); } 
		return true;
	}
	if (message !== null)
	{
		addNarrationMessage(message);
	}
	return false;
}
function testTime(cost, passout, update)
{
	if (calendarState.minutes + cost < getPassOutTime())
	{
		if (update) { addTime(cost); }
		return true;
	}
	if (passout)
	{
		passOut();
	}
	return false;
}
function testMoney(cost, message, update)
{
	if (characterState.money >= cost)
	{
		if (update) { addMoney(-cost); } 
		return true;
	}
	if (message !== null)
	{
		addNarrationMessage(message);
	}
	return false;
}
function tryAddInventory(item, level, quantity, message)
{
	var it = item;
	if (typeof(it) !== 'object')
	{
		it = modData.items[it];
	}
	var stack = getInventoryItem(item, level);
	if (stack.quantity + quantity <= it.maxStack)
	{
		addItemToInventory(item, level, quantity);
		return true;
	}
	if (message)
	{
		addAlertNarration(staticMessages.CANT_HOLD_MORE_OF_ITEM);
	}
	return false;
}
function tryAddItemWithMessage(item, level, quantity)
{
	var success = tryAddInventory(item, level, quantity, true);
	if (success)
	{
		var i = modData.items[item];
		
		if (typeof modHooks.narrate_addInventoryItem === 'function') { modHooks.narrate_addInventoryItem(item, level, quantity); }
		else { addAlertNarration(ucaseName(getFuncOrVar(i.displayName)) + ' ' + ((quantity > 1) ? 'x' + quantity : '') + 'added to your inventory.'); }
		checkQuestTriggers(characterState, questTriggers.GAININVENTORYITEM);
	}
	return success;
}
function tryRemoveInventory(itemId, level, quantity, message)
{
	var item = getInventoryItem(itemId, level);
	var name = modData.items[item.item].displayName;
	if (item.quantity < quantity)
	{
		if (message)
		{
			if (typeof modHooks.narrate_failRemovingInventoryItem === 'function') { modHooks.narrate_failRemovingInventoryItem(item, level, quantity); }
			else { addAlertNarration('Tried to remove ' + ucaseName(name) + ' ' + ((quantity > 1) ? 'x' + quantity + ' ' : '') + ' from your inventory, but couldn\'t.'); }
		}
		return false;
	}
	else
	{
		if (message)
		{
			if (typeof modHooks.narrate_removedInventoryItem === 'function') { modHooks.narrate_removedInventoryItem(item, level, quantity); }
			else { addAlertNarration(ucaseName(name) + ' ' + ((quantity > 1) ? 'x' + quantity + ' ' : '') + ' removed from your inventory.'); }
		}
		item.quantity -= quantity;
	}
	var i = getInventoryItemIndex(item, level);
	characterState[i] = item;
	return true;
}
function countInventoryItem(item, level = 0)
{
	var r = 0;
	var it = getItem(item);
	for (var i=0;i<characterState.inventory.length;i++)
	{
		if (characterState.inventory[i].item === it.id && characterState.inventory[i].level >= level)
		{
			r += characterState.inventory[i].quantity;
		}
	}
	return r;
}
function getInventoryItemIndex(item, level = 0)
{
	for (var i=0;i<characterState.inventory.length;i++)
	{
		var csi = characterState.inventory[i];
		if (csi.item === item && csi.level == level && csi.quantity > 0)
		{
			return i;
		}
	}
	return -1;
}
function getInventoryItem(item, level = 0)
{
	var it = item;
	if (typeof(it) === 'object')
	{
		it = modData.items[it].item;
	}
	var i = getInventoryItemIndex(it, level);
	if (i < 0) { return newItemStack(it, 0, 0); }
	return characterState.inventory[i];
}
function getAllInvetoryItemsAtLevel(item, level = 0)
{
	var r = [];
	for (var i=0;i<characterState.inventory.length;i++)
	{
		var csi = characterState.inventory[i];
		if (csi.item === item && csi.level >= level && csi.quantity > 0)
		{
			r.push(characterState.inventory[i]);
		}
	}
	return r;
}
function addItemToInventory(item, level, quantity)
{
	var q = quantity;
	for (var i=0;i<characterState.inventory.length;i++)
	{
		if (characterState.inventory[i].item === item && characterState.inventory[i].level == level)
		{
			characterState.inventory[i].quantity += quantity;
			q = characterState.inventory[i].quantity;
		}
	}
	characterState.inventory.push(newItemStack(item, level, quantity));
	
	return q;
}

function inspectItem(itemId)
{
	if (modData.items.hasOwnProperty(itemId) && modData.items[itemId].hasOwnProperty('description'))
	{
		var item = modData.items[itemId];
		addAlertNarration(item.description);
	}
	else
	{
		addAlertNarration('No description available.');
	}
}
function characterKnowsRecipe(character, recipe)
{
	var rec = getRecipe(recipe);
	for (var i=0;i<character.knownRecipes.length;i++)
	{
		if (character.knownRecipes[i] == rec.id) { return true; }
	}
	return false;
}
function characterHasCookedRecipe(character, recipe)
{
	var rec = getRecipe(recipe);
	for (var key in character.cookedRecipes)
	{
		if (key == rec.id) { return character.cookedRecipes[key]; }
	}
	return 0;
}
function learnRecipe(character, recipe, message)
{
	if (!characterKnowsRecipe(character, recipe))
	{
		var rec = getRecipe(recipe);
		character.knownRecipes.push(rec.id);
		if (message)
		{
			addAlertNarration('You\'ve learned a recipe for: ' + rec.displayName + '.');
		}
		checkQuestTriggers(character, questTriggers.LEARNRECIPE);
	}
}
function hasIngredientsForRecipe(recipe)
{
	for (var i=0;i<recipe.ingredients.length;i++)
	{
		if (getInventoryItem(recipe.ingredients[i].item, null).quantity < 1) { return false; }
	}
	return true;
}

function tryPurchaseItem(button)
{
	var feat = modData.features[parseInt(button.getAttribute('data-feature'))];
	var quantity = parseInt(button.getAttribute('data-purchaseQuantity'));
	var price = feat.itemStack.item.value * quantity;
	if (testMoney(price, DEFAULT_MONEY_MESSAGE, true))
	{
		tryAddInventory(feat.itemStack.item, feat.itemStack.level, quantity, true);
	}
}
function getItem(item)
{
	var itemId = item;
	if (typeof(item) === 'object')
	{
		if (item.hasOwnProperty('maxStack')) { return item; }
		if ('tagName' in item)
		{
			itemId = item.getAttribute('data-itemid');
		}
	}
	for (var key in modData.items)
	{
		if (key == itemId) { return modData.items[key]; }
	}
	return null;
}
function clickTakeItemButton(itemButton)
{
	tryPickupItem(itemButton.getAttribute('data-itemid'),
		itemButton.getAttribute('data-itemlevel'),
		itemButton.getAttribute('data-itemquantity'),
		itemButton.getAttribute('data-area'),
		itemButton.getAttribute('data-feature'));
}
function tryPickupItem(item, level, quantity, areaId, featureId)
{
	if (tryAddItemWithMessage(item, level, quantity))
	{
		var feat = getFeature(featureId);
		if (feat.hasOwnProperty('onPickup'))
		{
			feat.onPickup();
		}
		deleteFeature(areaId, featureId);
		updateDisplay();
	}
}
//*************************| character functions |*************************

//*************************| quest functions |*************************
function updateJournal()
{
	if (typeof modHooks.updateJournal_enter === 'function') { modHooks.updateJournal_enter(); }
	if (typeof modHooks.updateJournal_exit === 'function') { modHooks.updateJournal_exit(); }
}

function getQuest(quest)
{
	var questId = quest;
	if (typeof(quest) === 'object')
	{
		if (quest.hasOwnProperty('onComplete')) { return quest; }
		if ('tagName' in quest)
		{
			questId = quest.getAttribute('data-questid');
		}
	}

	for (var i=0;i<modData.quests.length;i++)
	{
		if (modData.quests[i].id == questId)
		{
			return modData.quests[i];
		}
	}
	return null;
}
function startQuest(questId, message = true)
{
	var q = getQuest(questId);
	if (q !== null)
	{
		if (getCharacterQuestStatus(questId) == questStatuses.NOTSTARTED)
		{
			characterState.quests.push(q);
			q.status = questStatuses.ACTIVE;
			if (message)
			{
				if (typeof modHooks.narrate_startQuest === 'function') { modHooks.narrate_startQuest(q); }
				else { addAlertNarration('Quest added to your journal: ' + q.name); }
			}
		}
	}
	else
	{
		if (message) { addAlertNarration(staticMessages.COULD_NOT_START_QUEST); }
	}
}
function getCharacterQuestStatus(quest)
{
	var questId = getQuest(quest).id;
	if (questId !== null)
	{
		for (var i=0;i<characterState.quests.length;i++)
		{
			if (characterState.quests[i].id == questId)
			{
				return characterState.quests[i].status;
			}
		}
	}
	return questStatuses.NOTSTARTED;
}

function isCharacterOnQuest(quest)
{
	return (getCharacterQuestStatus(quest) == questStatuses.ACTIVE);
}
function hasCharacterFinishedQuest(quest)
{
	return (getCharacterQuestStatus(quest) == questStatuses.COMPLETED);
}

function checkQuestTriggers(character, trigger)
{
	for (var i=0;i<character.quests.length;i++)
	{
		var q = character.quests[i];
		if (q.status == questStatuses.ACTIVE)
		{
			if (q.triggers.includes(trigger))
			{
				if (testConditions(character, q.conditions))
				{
					if (typeof modHooks.narrate_completeQuest === 'function') { modHooks.narrate_completeQuest(q); }
					else { addAlertNarration('You completed the quest: <i>"' + q.name + '"</i>. Check your journal tab to collect rewards.'); }
					q.status = questStatuses.AWARDED;
					updateDisplay();
				}
			}
		}
	}
}
function collectQuestRewards(quest)
{
	var q = getQuest(quest);
	if (q !== null)
	{
		if (getCharacterQuestStatus(q) == questStatuses.AWARDED)
		{
			q.onComplete(characterState);
			q.status = questStatuses.COMPLETED;
			updateDisplay();
		}
	}
}
//*************************| quest functions |*************************

//*************************| npc functions |*************************
function getNpcByName(name)
{
	for (var i=0;i<modData.npcs.length;i++)
	{
		if (modData.npcs[i].firstName.toLowerCase().substring(0, name.length) == name.toLowerCase())
		{
			return modData.npcs[i];
		}
	}
	return null;
}
function getPresentNpcs(area)
{
	var n = [];
	for (var i=0;i<modData.npcs.length;i++)
	{
		var scheds = getNpcSchedulesForArea(modData.npcs[i], area);
		for (var s=0;s<scheds.length;s++)
		{
			if (testConditions(characterState, scheds[s].conditions))
			{
				modData.npcs[i].currentActivity = scheds[s].activity;
				n.push(modData.npcs[i]);
			}
		}
	}
	return n;
}
function getNpcSchedulesForArea(npc, area)
{
	var a = getArea((area == null || area == undefined) ? characterState.currentArea : area);
	var r = [];
	if (npc.hasOwnProperty('schedule') && npc.schedule !== null && npc.schedule !== undefined)
	{
		for (var i=0;i<npc.schedule.length;i++)
		{
			if (npc.schedule[i].area == a.id)
			{
				r.push(npc.schedule[i]);
			}
		}
	}
	return r;
}
function whereIsNpc(name)
{
	var n = getNpcByName(name);
	if (n !== null)
	{
		for (var s=0;s<n.schedule.length;s++)
		{
			for (var c=0;c<n.schedule[s].conditions.length;c++)
			{
				if (testConditions(characterState, n.schedule[s].conditions[c])) { return n.schedule[s].area; }
			}
		}
	}
	return null;
}

function talkToNpc(npc)
{
	var n = npc;
	if ('tagName' in npc)
	{
		n = modData.npcs[npc.getAttribute('data-npcid')];
	}
	if (n !== null && n !== undefined)
	{
		var npcd = getNpcDialog(n);

		var customHookResponded = false;
		if (typeof modHooks.handleNpcDialog === 'function') { customHookResponded = modHooks.handleNpcDialog(n); }
		if (customHookResponded) {}
		else if (npcd !== null)
		{
			addTime(modConfig.timeCosts.TALK_TO_NPC);
			addNpcDialogNarration(n, npcd.text);
			if (npcd.after !== null && npcd.after !== undefined)
			{
				npcd.after();
			}
			n.conversationsToDate++;
			n.conversationsToday++;
		}
		else
		{
			if (typeof modHooks.narrate_npcNoDialog === 'function') { modHooks.narrate_npcNoDialog(struct); }
			else {
					addTime(modConfig.timeCosts.CANT_TALK_TO_NPC);
					addAlertNarration(n.firstName + ' ' + getRandomArrayValue([
						'doesn\'t seem to want to talk at the moment.',
						'doesn\'t have anything to say right now.',
						'seems to be lost in thought.'
					])); }
		}
	}
}

function getNpcDialog(n)
{
	for (var d=0;d<n.dialog.length;d++)
	{
		for (var c=0;c<n.dialog[d].conditions.length;c++)
		{
			if (testConditions(characterState, n.dialog[d].conditions[c]))
			{
				return n.dialog[d];
			}
		}
	}
	return null;
}
//*************************| npc functions |*************************

//*************************| display functions |*************************
function updateDisplay()
{
	if (typeof modHooks.updateDisplay_enter === 'function') { modHooks.updateDisplay_enter(); }
	updateNavigation();
	if (typeof modHooks.updateDisplay_exit === 'function') { modHooks.updateDisplay_exit(); }
}

function getDayOfWeek(dayOfSeason)
{
	if (dayOfSeason !== null && dayOfSeason !== undefined)
	{
		return weekDays[dayOfSeason % 7];
	}
	else
	{
		return weekDays[calendarState.dayOfSeason % 7];
	}
}
function updateClock()
{
	if (calendarState != null)
	{
		var ampm = 'AM';
		var hours = Math.floor(calendarState.minutes / 60);
		if (hours >= modConfig.dayTimeStarts && hours < modConfig.nightTimeStarts)
		{
			if (typeof modHooks.updateClock_handleDayTime === 'function') { modHooks.updateClock_handleDayTime(); }
		}
		else
		{
			if (typeof modHooks.updateClock_handleNightTime === 'function') { modHooks.updateClock_handleNightTime(); }
		}
		if (hours >= 12)
		{
			if (hours > 12)
			{
				hours -= 12;
			}
			ampm = 'PM';
		}
		var minutes = calendarState.minutes % 60;
		
		g('timeOfDayHour').innerHTML = hours;
		var minstr = '00' + minutes.toString();
		g('timeOfDayMinutes').innerHTML = minstr.substring(minstr.length - 2);
		g('timeOfDayAmPm').innerHTML = ampm;
	}
}

function updateNavigation()
{
	if (typeof modHooks.updateNavigation_enter === 'function') { modHooks.updateNavigation_enter(); }

	var a = getArea(characterState.currentArea);
	for (var i=0;i<a.exits.length;i++)
	{
		var e = a.exits[i];
		if (e.conditions === null || e.conditions())
		{
			if (typeof modHooks.updateExitNavigation === 'function') { modHooks.updateExitNavigation(a, e, i); }
		}
	}
	if (typeof modHooks.updateNavigation_exit === 'function') { modHooks.updateNavigation_exit(); }
}

function updateCurrentArea()
{
	var a = getArea(characterState.currentArea);
	updateArea(a);
}

function areaHasSaleItems(a)
{
	for (var i=0;i<a.features.length;i++)
	{
		if (a.features[i].hasOwnProperty('itemStack') && a.features[i].canPurchase)
		{
			return true;
		}
	}
	return false;
}
function updateInventory()
{
	if (typeof modHooks.updateInventory_enter === 'function') { modHooks.updateInventory_enter(); }
	if (typeof modHooks.updateInventory_exit === 'function') { modHooks.updateInventory_exit(); }
}

function getPluralizedItemName(item, quantity)
{
	return (quantity > 1 || quantity == 0) ? item.pluralName : item.displayName;
}
function renderEmoji(emoji, n, label, stacked = false)
{
	var r = ce('span');
	for (var i=0;i<n;i++)
	{
		var s = ce('span');
		if (stacked)
		{
			s.className = 'stackedEmoji';
		}
		s.innerHTML = emoji;
		s.setAttribute('aria-hidden', 'true');
		r.appendChild(s);
	}
	r.setAttribute('aria-role', 'img');
	r.setAttribute('aria-label', label);
	r.setAttribute('title', label);
	r.className = 'emoji';
	return r;
}
function renderStars(n, stacked = false)
{
	return renderEmoji(STAR_ICON, n, n + ' star', stacked);
}
function renderHearts(n, stacked = false)
{
	return renderEmoji(HEART_ICON_RED, n, n + ' heart', stacked);
}
function renderHourglasses(n, stacked = false)
{
	return renderEmoji(HOURGLASS_ICON, n, n + ' hourglass', stacked);
}
//*************************| display functions |*************************

//*************************| game save functions |*************************
function getGameSaves()
{
	return null;
}
function loadGame(game)
{
	if (game === null)
	{
		clearNarration();
		newGame();
	}
}
function newGame(name)
{
	updateCharacterName(name);
	characterState = newCharacterState();
	calendarState = newCalendarState(modConfig.yearStartSeason, modConfig.yearStartDay, modConfig.daysPerYear)
}
function startGame()
{
	if (typeof modHooks.startGame_enter === 'function') { modHooks.startGame_enter(); }
	worldState = {};
	clearNarration();
	gameHasStarted = true;
	if (typeof modHooks.startGame_exit === 'function') { modHooks.startGame_exit(); }
}
function setGamePreferences(pref)
{
	if (typeof modHooks.setGamePreferences_enter === 'function') { modHooks.setGamePreferences_enter(pref); }
	modConfig.gamePreferences = pref;
	if (typeof modHooks.setGamePreferences_exit === 'function') { modHooks.setGamePreferences_exit(pref); }
}
function passOut()
{
	clearNarration();
	addNarrationMessage('You passed out from exhaustion.');
	addNarrationMessage('Thankfully a kind citizen found you and took you home.');
	if (rint(50))
	{
		characterState.money = Math.max(0, Math.round(characterState.money / 2));
		addNarrationMessage('But not before someone went through your pockets and robbed you.');
	}
}
//*************************| game save functions |*************************

//*************************| tool functions |*************************
function updateToolsTable()
{
	var x = g('toolTableBody');
	x.innerHTML = '';
	
	for (var key in characterState.tools)
	{
		var tool = characterState.tools[key];
		
		if (tool.level > 0)
		{
			var row = ce('tr');
			var nameTd = ce('td');
			var actionTd = ce('td');

			nameTd.innerHTML = tool.displayName;
			if (tool.level > 1)
			{
				nameTd.appendChild(renderStars(tool.level-1, true));
			}
			actionTd.appendChild(makeToolInspectbutton(tool));

			row.appendChild(nameTd);
			row.appendChild(actionTd);
			x.appendChild(row);
		}
	}
}
function makeToolInspectbutton(tool)
{
	return makeButton('ochreButton', function(){inspectTool(this);}, INSPECT_ICON, 'Inspect ' + tool.displayName, {toolId: tool.id});
}
function inspectTool(toolButton)
{
	if (characterState.tools.hasOwnProperty(toolButton.getAttribute('data-toolid')))
	{
		var tool = characterState.tools[toolButton.getAttribute('data-toolid')];
		addAlertNarration(tool.descriptions[Math.min(tool.descriptions.length-1, tool.level)] + ' ' + tool.toolTip);
	}
	else
	{
		addAlertNarration('No description available.');
	}
}
function upgradeTool(character, id, level)
{
	if (character.tools.hasOwnProperty(id))
	{
		character.tools[id].level = (level !== null) ? level : character.tools[id].level + 1;
		updateInventory();
	}
	return getToolLevel(id);
}
function getToolLevel(id)
{
	if (characterState.tools.hasOwnProperty(id))
	{
		return characterState.tools[id].level;
	}
	return 0;
}
function pickupTool(button)
{
	var id = button.getAttribute('data-tool');
	var level = button.getAttribute('data-level');
	if (getToolLevel(id) >= level)
	{
		addAlertNarration('You don\'t need this tool. You\'ve already got one.');
	}
	else
	{
		var tool = characterState.tools[id];
		upgradeTool(characterState, id, level);
		if (level > 1)
		{
			addAlertNarration('You\'ve upgraded your ' + getFuncOrVar(tool.displayName) + '. You don\'t need this old one anymore.');
		}
		else
		{
			addAlertNarration('You\'ve acquired a ' + getFuncOrVar(tool.displayName) + '.');
		}
		deleteFeature(button.getAttribute('data-area'), button.getAttribute('data-feature'));
	}
}
//*************************| tool functions |*************************

//*************************| skill functions |*************************
function inspectSkill(skillId)
{
	if (characterState.skills.hasOwnProperty(skillId))
	{
		var skill = characterState.skills[skillId];
		addAlertNarration(skill.description);
	}
	else
	{
		addAlertNarration('No description available.');
	}
}
function upgradeSkill(character, id, level, message)
{
	if (character.skills.hasOwnProperty(id))
	{
		var prevLevel = character.skills[id].level;
		character.skills[id].level = (level !== null) ? level : character.skills[id].level + 1;
		if (message && character.skills[id].level > prevLevel)
		{
			addAlertNarration('Your ' + character.skills[id].displayName + ' skill has increased to ' + character.skills[id].level + '.');
		}
		updateDisplay();
	}
	return getSkillLevel(character, id);
}
function getSkillLevel(character, id)
{
	if (characterState.skills.hasOwnProperty(id.toLowerCase()))
	{
		return characterState.skills[id.toLowerCase()].level;
	}
	return 0;
}
function hideSkillInterfaces()
{
	var interfaces = document.getElementsByClassName('skillInterface');
	for (var i=0;i<interfaces.length;i++)
	{
		interfaces[i].style.display = 'none';
	}
}
function openSkillInterface(skillId)
{
	hideSkillInterfaces();
	var skillInterface = g(skillId + 'Interface');
	if (skillInterface !== null && skillInterface !== undefined)
	{
		skillInterface.style.display = 'block';
	}
}
//*************************| skill functions |*************************

//*************************| skill action functions |*************************
function tryFishingInWater(feature)
{
	if (characterState.skills.fishing.level < 1)
	{
		addAlertNarration('It\'s been a while since you\'ve gone fishing. You\'ll need a rod and some bait, and it wouldn\'t hurt to talk to a local angler for some pointers.');
	}
	else
	{
		if (characterState.tools.fishingRod.level < 1)
		{
			addAlertNarration('You\'ll need to acquire a fishing rod first. Try looking in some of the local shops or talk to some anglers.');
		}
		else
		{
			var f = getFeature(feature);
			if (characterState.tools.fishingRod < f.level)
			{
				addAlertNarration('You\'ll need to upgrade your fishing rod to fish here.');
			}
			else
			{
				addNarrationMessage('yerp');
			}
		}
	}
}
function getRecipe(recipe)
{
	var recId = recipe;
	if (typeof(recipe) === 'object')
	{
		if (recipe.hasOwnProperty('ingredients')) { return recipe; }
		if ('tagName' in recipe)
		{
			recId = recipe.getAttribute('data-recipeid');
		}
	}
	for (var i=0;i<modData.recipes.length;i++)
	{
		if (modData.recipes[i].id == recId) { return modData.recipes[i]; }
	}
	return null;
}
function selectRecipeToCook(recipe)
{
	if (recipe != '' && recipe !== null && recipe !== undefined)
	{
		var area = getArea(characterState.currentArea);		
		var r = getRecipe(recipe);
		if (canCookRecipeInArea(r, area))
		{
			g('requiredIngredientsList').innerHTML = '';
			g('notNearCookingFeature').style.display = 'none';
			g('dontHaveIngredientsMessage').style.display = 'none';
			g('cookButton').style.display = 'none';
			for (var i=0;i<r.ingredients.length;i++)
			{
				var iStack = r.ingredients[i];
				var n = countInventoryItem(iStack.item, iStack.level);
				var li = ce('li');
				if (n > 0)
				{
					li.appendChild(makeIngredientSelectBox(iStack));
				}
				else
				{
					var it = getItem(iStack.item);
					li.innerHTML = ucaseName(getFuncOrVar(it.displayName));
					g('dontHaveIngredientsMessage').style.display = 'block';
				}
				g('requiredIngredientsList').appendChild(li);
			}
			if (g('dontHaveIngredientsMessage').style.display == 'none')
			{
				g('cookButton').innerHTML = r.action;
				g('cookButton').style.display = 'inline';
			}
			g('requiredIngredientsBox').style.display = 'block';
		}
		else
		{
			g('notNearCookingFeature').style.display = 'block';
			g('requiredIngredientsBox').style.display = 'none';
		}
	}
	else
	{
		g('requiredIngredientsBox').style.display = 'none';
		g('notNearCookingFeature').style.display = 'none';
		g('noRecipesBox').style.display = 'none';
	}
}
function makeIngredientSelectBox(stack)
{
	var sel = ce('select')
	sel.id = getIngredientSelectId(stack);
	var stacks = getAllInvetoryItemsAtLevel(stack.item, stack.level);
	for (var i=0;i<stacks.length;i++)
	{
		var o = ce('option');
		var item = getItem(stacks[i].item);
		o.value = item.id;
		o.setAttribute('data-itemLevel', stacks[i].level);
		o.innerHTML = ucaseName(getFuncOrVar(item.displayName)) + renderStars(stacks[i].level, true).outerHTML;
		sel.className = 'cookingIngredientSelect';
		sel.appendChild(o);
	}
	return sel;
}
function getIngredientId(stack)
{
	return stack.item.id + '_' + stack.level + '_' + stack.quantity;
}
function getIngredientSelectId(stack)
{
	return 'ingredientSelect_' + getIngredientId(stack);
}
function tryCookRecipe(recipe, selectedIngredients)
{
	var rec = recipe;
	if (recipe === null || recipe === undefined)
	{
		rec = g('knownRecipesDropDown').value;
	}
	rec = getRecipe(rec);
	
	if (testTime(rec.time, false, false))
	{
		if (rec != '' && rec !== null && rec !== undefined)
		{
			var usableIngredients = [];
			for (var i=0;i<rec.ingredients.length;i++)
			{
				var ingredientId = getIngredientId(rec.ingredients[i]);
				var selectedIngredient = null;
				if (selectedIngredients === null || selectedIngredients === undefined
					|| !selectedIngredients.hasOwnProperty(ingredientId))
				{
					var x = g(getIngredientSelectId(rec.ingredients[i]));
					if (x !== null && x !== undefined)
					{
						selectedIngredient = newItemStack(x.value, 
							x.options[x.selectedIndex].getAttribute('data-itemLevel'), rec.ingredients[i].quantity);
					}
				}
				else
				{
					selectedIngredient = selectedIngredients[ingredientId];
				}
				if (selectedIngredient !== null)
				{
					usableIngredients.push(getInventoryItem(selectedIngredient.item, selectedIngredient.level));
				}
				else
				{
					addAlertNarration('There was a problem with one of your ingredients.');
					return false;
				}
			}
			cookRecipe(rec, usableIngredients);
		}
		else
		{
			addAlertNarration('Invalid recipe.');
			return false;
		}
	}
	else
	{
		addAlertNarration('You don\'t have time to cook this tonight.');
	}
}
function cookRecipe(recipe, inventoryIngredients)
{ //TODO fix cooking so that it uses tryAddInventory function before the tryRemoveInventory call
	var rec = getRecipe(recipe);
	var totalIngredientLevel = 0;
	for (var i=0;i<inventoryIngredients.length;i++)
	{
		if (!tryRemoveInventory(inventoryIngredients[i].item, inventoryIngredients[i].level, inventoryIngredients[i].quantity, false))
		{
			addAlertNarration('There was an issue cooking this item.');
			return false;
		}
		totalIngredientLevel += inventoryIngredients[i].level;
	}
	var avgIngLevel = totalIngredientLevel / inventoryIngredients.length;
	if (roll((avgIngLevel - Math.floor(avgIngLevel)) * 100))
	{
		avgIngLevel++;
	}
	var res = getItem(rec.result.item);
	addAlertNarration(ucaseName(getFuncOrVar(res.displayName)) + ((rec.result.quantity > 1) ? ' x' + rec.result.quantity : '') + ' added to your inventory.');
	addItemToInventory(rec.result.item, getCookedResultLevel(avgIngLevel, rec.result.level), rec.result.quantity);
	addTime(rec.time);
	updateDisplay();
}
function getCookedResultLevel(ingredientLevel, recipelevel)
{
	var level = ingredientLevel + recipelevel;
	if (roll(getCookingUpgradeChance(level)))
	{
		return level + 1;
	}
	return level;
}
//*************************| skill action functions |*************************

//*************************| action button functions |*************************
function clickActionButton(button, action)
{
	action(button);
	updateDisplay();
}
function inspect(obj)
{
	if (obj.hasOwnProperty('description'))
	{
		addAlertNarration(getFuncOrVar(obj.description, obj));
	}
	else
	{
		addAlertNarration('No description available.');
	}
}
function inspectQuest(quest)
{
	var q = quest;
	if ('tagName' in quest)
	{
		q = getQuest(quest.getAttribute('data-questid'));
	}
	addSignTextNarration(['<b>Quest: ' + q.name + '</b>' + '%LINE_HOR%', '<b>Objectives:</b> ' + q.description + '%LINE_HOR%', '<b>Rewards</b>: ' + q.rewards]);
}
function inspectStructure(struct)
{
	var s = struct;
	if ('tagName' in struct)
	{
		s = modData.structures[struct.getAttribute('data-structureid')];
	}
	if (s.hasOwnProperty('description'))
	{
		inspect(s.description);
	}
	else
	{
		inspect(s);
	}
}
function inspectNpc(npc)
{
	var n = npc;
	if ('tagName' in npc)
	{
		n = modData.npcs[npc.getAttribute('data-npcid')];
	}
	var t = [];
	t.push(n.firstName + ' ' + n.lastName + renderHearts(n.characterRelationship.level).outerHTML + '%LINE_HOR%' + '<i>' + n.description + '</i><br />');
	var app = n.appearance;
	t.push(n.age + ' year old ' + sexes[n.sex]);
	t.push('<b>Height:</b> ' + app.height.displayName);
	t.push('<b>Body Type:</b> ' + app.bodyType.displayName);
	t.push('<b>Hair:</b> ' + app.currentHairColor.displayName + ' ' + app.hairStyle.displayName);
	t.push('<b>Eyes:</b> ' + app.eyes.displayName);
	t.push('<b>Aesthetic:</b> ' + app.aesthetic.displayName);
	addSignTextNarration(t);
}
function inspectFeature(featureButton)
{
	var f = getFeature(featureButton.getAttribute('data-featureid'));
	if (f.type == 'SIGN' && f.hasOwnProperty('text'))
	{
		addAlertNarration('This sign reads:');
		var t = '';
		if (Array.isArray(f.text))
		{
			var ts = [];
			for (var i=0;i<f.text.length;i++)
			{
				ts.push(getFuncOrVar(f.text[i]));
			}
			t = ts.join('<br />');
		}
		else
		{
			t = getFuncOrVar(f.text);
		}
		addSignTextNarration(t);
	}
	else if (f.type == 'ITEM' && f.hasOwnProperty('itemStack'))
	{
		inspect(f.itemStack.item);
	}
	else
	{
		inspect(f);
	}
}
function clickNavButton(button)
{	
	tryTravel(getArea(button.getAttribute('data-area')).exits[button.getAttribute('data-exit')]);
}
function clickFishButton(button)
{
	tryFishingInWater(button.getAttribute('data-feature'));
}
function clickForageButton(button)
{
	var id = parseInt(button.getAttribute('data-feature'));
	var feat = getFeature(id);
	var q = rint(feat.maxQuantity - feat.minQuantity + 1) + feat.minQuantity;
	if (!worldState.foragedThisWeek.includes(id) && testConditions(characterState, feat.conditions))
	{
		if (tryAddInventory(feat.item, feat.level, getForagedItemQuantity(q), true))
		{
			if (getSkillLevel(characterState, 'foraging') > 0 && roll(getForagedBonusChance()))
			{
				if (tryAddInventory(feat.item, feat.level + 1, getForagedBonusQuantity(), false))
				{
					q += getForagedBonusQuantity();
				}
			}
			worldState.foragedThisWeek.push(id);
			updateDisplay();
			addAlertNarration('Added ' + q + ' ' + getPluralizedItemName(feat.item, q) + ' to your inventory.');
		}
	}
}
//*************************| action button functions |*************************

//*************************| misc functions |*************************
function updateCharacterName(name)
{
	characterState.name = name;
}
function setSubcontent(container, content)
{
	var con = g(container);
	con.setAttribute('data-prevSubcontent', con.getAttribute('data-subcontent'));
	con.setAttribute('data-subcontent', content);
	var subcons = con.getElementsByClassName(con.getAttribute('data-subcontent-type'));
	for (var i=0;i<subcons.length;i++)
	{
		subcons[i].style.display = 'none';
	}
	var currentContent = g(con.getAttribute('data-subcontent-type') + '-' + content);
	currentContent.style.display = con.getAttribute('data-subcontent-default');
	fixButtonTextWidths(currentContent);
}
function getSubcontent(container)
{
	return g(container).getAttribute('data-subcontent');
}
function selectTab(container, content, tabClass, selectedTab)
{
	setSubcontent(container, content);
	var tabs = document.getElementsByClassName(tabClass);
	for (var i=0;i<tabs.length;i++)
	{
		tabs[i].setAttribute('data-selected', 'false');
	}
	selectedTab.setAttribute('data-selected', 'true');
	selectedTabs[container] = content;
	updateDisplay();
}

function clearNarration()
{
	if (typeof modHooks.clearNarration_enter === 'function') { modHooks.clearNarration_enter(); }
	if (typeof modHooks.clearNarration_exit === 'function') { modHooks.clearNarration_exit(); }
}
function addNarrationMessage(message)
{
	if (typeof modHooks.addNarrationMessage_enter === 'function') { modHooks.addNarrationMessage_enter(message); }
	if (typeof modHooks.addNarrationMessage_exit === 'function') { modHooks.addNarrationMessage_exit(message); }
}

function addAlertNarration(message)
{
	if (typeof modHooks.addAlertNarration_enter === 'function') { modHooks.addAlertNarration_enter(message); }
	if (typeof modHooks.addAlertNarration_exit === 'function') { modHooks.addAlertNarration_exit(message); }
}
function addSignTextNarration(message)
{
	if (typeof modHooks.addSignTextNarration_enter === 'function') { modHooks.addSignTextNarration_enter(message); }
	if (typeof modHooks.addSignTextNarration_exit === 'function') { modHooks.addSignTextNarration_exit(message); }
}
function addNpcDialogNarration(npc, message)
{
	if (typeof modHooks.addNpcDialogNarration_enter === 'function') { modHooks.addNpcDialogNarration_enter(npc, message); }
	var n = npc;
	if (typeof(n) !== 'object')
	{
		n = getNpcByName(npc);
	}
	if (typeof modHooks.addNpcDialogNarration_exit === 'function') { modHooks.addNpcDialogNarration_exit(n, message); }
}
function handleWildcards(text)
{
	var r = text;
	if (typeof modHooks.handleWildcards_enter === 'function') { r = modHooks.handleWildcards_enter(r); }
	r = r.replace('%LINE_HOR%', '<hr />');
	if (typeof modHooks.handleWildcards_exit === 'function') { r = modHooks.handleWildcards_exit(r); }
	return r;
}
function swapWildCard_Property(testProp, text, wildcard, value)
{
	return swapWildCard_Condition((testProp !== null && testProp != undefined), text, wildcard, value);
}
function swapWildCard_Condition(condition, text, wildcard, value)
{
	if (condition) { return text.replace(wildcard, value); }
	return text;
}

function testConditions(character, conditions)
{
	if (conditions === null || conditions === undefined)
	{
		return true;
	}
	if (Array.isArray(conditions))
	{
		for (var i=0;i<conditions.length;i++)
		{
			if (conditions[i](character) == true) { return true; }
		}
	}
	if (typeof(conditions) === 'function')
	{
		return conditions(character);
	}
	return false;
}
//*************************| misc functions |*************************

//*************************| npc object templates |*************************
function newNpc(firstName, lastName, age, sex, description, appearance, schedule = null, personal = null)
{
	var npc = {
		id: modData.npcs.length,
		firstName: firstName,
		lastName: lastName,
		age: age,
		sex: sex,
		description: description,
		appearance: appearance,
		schedule: schedule,
		personalPreferences: personal,
		characterRelationship: newNpcRelationship(0, 0),
		conversationsToday: 0,
		conversationsToDate: 0,
		dialog: [],
		currentActivity: null
	};
	
	if (typeof modHooks.newNpcInjectProperties === 'function') { npc = modHooks.newNpcInjectProperties(npc); }
	modData.npcs.push(npc);
	return npc;
}
function newNpcSchedule(area, activity, conditions)
{
	return {
		area: area,
		activity: activity,
		conditions: [...conditions]
	};
}
function newNpcDialog(text, responses, conditions, after = null)
{
	return {
		text: text,
		responses: (responses !== null) ? [...responses] : [],
		conditions: [...conditions],
		after: after
	};
}
function newNpcRelationship(level, partnerLevel)
{
	return {
		level: level,
		partnerLevel: partnerLevel
	};
}
//*************************| npc object templates |*************************

//*************************| object templates |*************************
function newCalendarState(season, day, minutes)
{
	return {
		season: season,
		dayOfSeason: day,
		minutes: minutes
	};
}
function newSkill(id, name, desc, level)
{
	return {
		id: id,
		displayName: name,
		description: desc,
		level: level
	};
}
function newSkillSet()
{
	if (typeof modHooks.newSkillSet === 'function') { return modHooks.newSkillSet(); }
	return {};
}
function newTool(id, name, descs, tip, level, options)
{
	var r = {
		id: id,
		displayName: name,
		descriptions: ['', ...descs],
		toolTip: tip,
		level: level
	};
	if (typeof modHooks.newToolInjectProperties === 'function') { r = modHooks.newToolInjectProperties(r, options); }
	return r;	
}
function newToolSet()
{
	if (typeof modHooks.newToolSet === 'function') { return modHooks.newToolSet(); }
	return {};
}

function newCharacterState()
{
	var r = {
		name: '',
		sex: 0,
		appearance: newCharacterAppearance(),
		health: 0,
		maxHealth: 0,
		stamina: 0,
		maxStamina: 0,
		money: 0,
		currentArea: '',
		skills: newSkillSet(),
		tools: newToolSet(),
		inventory: [],
		relationships: [],
		ownedAreas: [],
		knownRecipes: [],
		cookedRecipes: {},
		quests: []
	};
	if (typeof modHooks.newCharacterStateInjectProperties === 'function') { r = modHooks.newCharacterStateInjectProperties(r); }
	return r;
}
function newArea(id, name, feats, exits, onEnter, options)
{
	var r = {
		id: id,
		name: name,
		features: [...feats],
		exits: [...exits],
		onEnter: onEnter
	};
	if (typeof modHooks.newAreaInjectProperties === 'function') { r = modHooks.newAreaInjectProperties(r, options); }
	modData.areas.push(r);
}

function newCharacterAppearance(height, bodyType, natHair, curHair, hairStyle, eyes, aesthetic, options)
{
	var r = {
		height: height,
		bodyType: bodyType,
		naturalHairColor: (typeof(natHair) === 'object') ? natHair : modData.types.hairColors[natHair],
		currentHairColor: (typeof(curHair) === 'object') ? curHair : modData.types.hairColors[curHair],
		hairStyle: (typeof(hairStyle) === 'object') ? hairStyle : modData.types.hairStyles[hairStyle],
		eyes: (typeof(eyes) === 'object') ? eyes : modData.types.eyeColors[eyes],
		aesthetic: aesthetic
	};
	if (typeof modHooks.newCharacterAppearanceInjectProperties === 'function') { r = modHooks.newCharacterAppearanceInjectProperties(r, options); }
	return r;
}
function newItemStack(item, level, quantity, options)
{
	var r = {
		item: item,
		level: level,
		quantity: quantity
	};
	if (typeof modHooks.newItemStackInjectProperties === 'function') { r = modHooks.newItemStackInjectProperties(r, options); }
	return r;
}

function newStructure(areaId, type, area, owner, value, locked, amenities, options)
{
	var r = { id: modData.structures.length, type: type, inArea: area, ...modData.types.structures[type], value: value, owner: owner, visited: false };
	if (locked !== null) { r.isLocked = locked; }
	for (var key in options)
	{
		r[key] = options[key];
	}
	r.amenities = [];
	if (Array.isArray(amenities) && amenities.length > 0)
	{
		r.amenities.push(...amenities);
	}

	modData.structures.push(r);
	var name = getStructureDisplayName(r);
	var newAreaId = area + '_struct_' + ((areaId !== null) ? areaId : r.id);
	newArea(
		newAreaId, name,
		[
			newFeature('STRUCT_EXIT', 0, {displayName: 'Exit ' + name, description: 'The exit for the ' + name + '.', toArea: area}),
			...amenities],
		[],
		(options.hasOwnProperty('description')) ? options.description : ''
	);
	r.areaId = newAreaId;
	return r;
}

function newFeature(type, level, options)
{
	var r = { id: modData.features.length, type: type, ...modData.types.features[type] };
	r.level = (level !== null && level !== undefined) ? level : 0;
	
	for (var key in options)
	{
		r[key] = options[key];
	}
	modData.features.push(r);
	return r;
}

function newExit(direction, text, accessibleText, toArea, time, stamina, conditions)
{
	return {
		direction: direction,
		text: text,
		accessibleText: accessibleText,
		toArea: toArea, 
		time: time,
		stamina: stamina,
		conditions: conditions
	};
}

function newQuest(id, name, description, rewards, triggers, conditions, onComplete)
{
	var r = {
		id: id,
		name: name,
		description: description,
		rewards: rewards,
		triggers: [...triggers],
		conditions: [...conditions],
		onComplete: onComplete,
		status: questStatuses.NOTSTARTED
	};
	modData.quests.push(r);
	return r;
}

function newRecipe (id, displayName, action, ingredients, result, time, cookingFeatures)
{
	var r = {
		id: id,
		displayName: displayName,
		action: action,
		ingredients: ingredients,
		result: result,
		time: time,
		cookingFeatures: cookingFeatures
	};
	modData.recipes.push(r);
	return r;
}
//*************************| object templates |*************************

//*************************| enums |*************************
var attractors = newEnum('DYED_HAIR');
var baitTypes = newEnum('BUG', 'LIVE', 'RICH', 'SHINY', 'STINKY', 'WORM');
var fishingMethods = newEnum('NET', 'POT', 'ROD', 'TRAP');
var questStatuses = newEnum('NOTSTARTED', 'ACTIVE', 'AWARDED', 'COMPLETED');
var questTriggers = newEnum('GAININVENTORYITEM', 'LEARNRECIPE');
//*************************| enums |*************************

//*************************| constants |*************************
var LEFT_ARROW = '&#x2B05;';
var RIGHT_ARROW = '&#x27A1;';
var UP_ARROW = '&#x2B06;';
var DOWN_ARROW = '&#x2B07;';

var DYNAMITE_ICON = '&#x1F9E8;';
var GEAR_ICON = '&#x2699;';
var HEART_ICON_BLACK = '<span style="color: #000000;">&#x2764;</span>';
var HEART_ICON_RED = '<span style="color: #FF0000;">&#x2764;</span>';
var INSPECT_ICON = '&#x1F50D;';
var LOCK_ICON = '&#x1F512;';
var MOON_ICON = '&#x1F319;';
var STAR_ICON = '&#x2B50;';
var SUN_ICON = '&#x2600;';
var HOURGLASS_ICON = '&#x23F3;';
//*************************| constants |*************************

//*************************| type definitions |*************************
var directions = {
	NORTH: { abbrev: 'N', displayName: 'North', navButton: 'northNavButton', navButtonText: 'northNavButtonText'},
	EAST: { abbrev: 'E', displayName: 'East', navButton: 'eastNavButton', navButtonText: 'eastNavButtonText'},
	SOUTH: { abbrev: 'S', displayName: 'South', navButton: 'southNavButton', navButtonText: 'southNavButtonText'},
	WEST: { abbrev: 'W', displayName: 'West', navButton: 'westNavButton', navButtonText: 'westNavButtonText'}
};

var seasons = {
	SPRING: { displayName: 'Spring', abbr: 'Spr' },
	SUMMER: { displayName: 'Summer', abbr: 'Sum' },
	FALL: { displayName: 'Fall', abbr: 'Fal' },
	WINTER: { displayName: 'Winter', abbr: 'Win' }
};
var weekDays = [
	{ id: 0, displayName: 'Monday', abbr: 'Mon', code: 'MO' },
	{ id: 1, displayName: 'Tuesday', abbr: 'Tue', code: 'TU' },
	{ id: 2, displayName: 'Wednesday', abbr: 'Wed', code: 'WE' },
	{ id: 3, displayName: 'Thursday', abbr: 'Thu', code: 'TH' },
	{ id: 4, displayName: 'Friday', abbr: 'Fri', code: 'FR' },
	{ id: 5, displayName: 'Saturday', abbr: 'Sat', code: 'SA' },
	{ id: 6, displayName: 'Sunday', abbr: 'Sun', code: 'SU' }
];

var sexes = ['female', 'male'];
var sizeLevels = ['tiny', 'small', 'moderate', 'sizable', 'large', 'huge', 'immense'];
//*************************| type definitions |*************************

//*************************| static messages |*************************
var staticMessages = {
	CANT_HOLD_MORE_OF_ITEM: 'You can\'t hold any more of this item.',
	COULD_NOT_START_QUEST: 'There was a problem starting this quest.',
	NO_AREA_DESCRIPTION: 'No description available.',
	NOT_ENOUGH_STAMINA: 'You don\'t have the energy for this.',
	OUT_OF_MONEY: 'You are out of money.',
	OUT_OF_STAMINA: 'You are out of energy, you should head to bed.'
};
//*************************| static messages |*************************

//*************************| global variables |*************************
var currentSave = {
	characterState: {},
	worldState: {},
	structures: [],
	features: [],
	npcs: [],
	gamePreferences: {},
	lastDayFinished: 0,
};
var characterState = {};
var worldState = {};

var firstArea = true;
var calendarState = null;

var selectedTabs = {};
var gameHasStarted = false;

var modConfig = {
	daysPerYear: 360,
	yearStartDay: 0,
	yearStartSeason: seasons.SPRING,
	dayTimeStarts: 6,
	nightTimeStarts: 18,
	timeCosts: {
		CANT_TALK_TO_NPC: 1,
		TALK_TO_NPC: 5
	},
	gamePreferences: {}
};

var modHooks = {};

var modData = {
	areas: [],
	structures: [],
	features: [],
	npcs: [],
	quests: [],
	items: [],
	recipes: [],
	types: {
		activities: {},
		aesthetics: {},
		bodies: {},
		eyeColors: {},
		features: {
			STRUCT_EXIT: { }
		},
		fish: {},
		forageables: {},
		hairColors: {},
		hairColorsNatural: [],
		hairStyles: {},
		heights: {},
		structures: {},
		waters: {}
	}
};
//*************************| global variables |*************************

//*************************| start up |*************************
window.onload = function(e) {
	if (typeof modHooks.keyUp === 'function') { document.onkeyup = modHooks.keyUp; }
	initialize();
}

function intialize() {}
//*************************| start up |*************************