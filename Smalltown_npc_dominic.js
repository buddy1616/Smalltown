modData.npcInitScripts.push(function() {
	var dominic = newNpc('Dominic', 'Smith', 34, 1,
		'Slender European hipster with a goatee and a love of sourdough bread.',
		newCharacterAppearance(modData.types.heights.AVERAGE, modData.types.bodies.THIN, modData.types.hairColors.BROWN, modData.types.hairColors.BROWN, modData.types.hairStyles.MANBUN, modData.types.eyeColors.BLUE, modData.types.aesthetics.HIPSTER),
		[
			newNPCWorkSchedule('STOWN_PL_struct_DOMSBAKERY'),
			newNpcSchedule('STOWN_PL', 'CHILLING', [function(){ return !isStructureOpen('STOWN_PL_struct_DOMSBAKERY'); }])
		]
	);
	dominic.dialog = [
		newNpcDialog('Hey you\'re new in town, you should come by my bakery sometime. It\'s the Bread Poet\'s Society in the Smalltown Plaza.', null,
			[function(){ return (isStructureOwnedBy('STOWN_PL_struct_DOMSBAKERY', 'dominic')
							&& !isStructureOpen('STOWN_PL_struct_DOMSBAKERY')
							&& getNpcByName('dominic').conversationsToDate < 1); }]
		),
		
		// quest helpers
		newNpcDialog(
				'You look like you have the spirit of a great baker inside you. '
				+ 'I smell yeast running through your veins. Here, take this breadknife. '
				+ 'I was going to throw it out anyway, but it can help you on your way to becoming a great baker.'
			, null,
			[function(){ return (isStructureOwnedBy('STOWN_PL_struct_DOMSBAKERY', 'dominic')
							&& isStructureOpen('STOWN_PL_struct_DOMSBAKERY')
							&& isCharacterOnQuest('COOKING_I')
							&& getInventoryItem('BREADKNIFE').quantity < 1
							&& getNpcByName('dominic').conversationsToDate > 1); }],
			function() {
					tryAddItemWithMessage('BREADKNIFE', 0, 1);
					addNpcDialogNarration(getNpcByName('dominic'), 'Come back once you have a cooking set and I\'ll show you an easy dough recipe.');
				}
		),
		newNpcDialog(
				'Looks like you\'ve got your cooking set together. Great! '
			, null,
			[function(){ return (isCharacterOnQuest('COOKING_II')
							&& getNpcByName('dominic').conversationsToday < 1); }],
			function() {
					if (testTime(30, false, false))
					{
						addNpcDialogNarration(getNpcByName('dominic'), 'I\'ll show you how to make a basic dough.');
						learnRecipe(currentSave.characterState, 'DOUGH_BASIC', true);
						tryAddItemWithMessage('YEAST', 0, 1);
						tryAddItemWithMessage('FLOUR_WHEAT', 0, 1);
						addTime(30);
					}
					else
					{
						addNpcDialogNarration(getNpcByName('dominic'), 'It\'s late, but come back when you have more time. I\'ll show you how to make a basic dough.');
					}
				}
		),

		// work talk
		newNpcDialog('Hey welcome to my bakery. I haven\'t seen you around before.', null,
			[function(){ return (isStructureOwnedBy('STOWN_PL_struct_DOMSBAKERY', 'dominic')
							&& isStructureOpen('STOWN_PL_struct_DOMSBAKERY')
							&& getNpcByName('dominic').conversationsToDate < 1); }]
		),
		newNpcDialog([
				'Hey there, feel free to look around, I\'ve got lots of goodies.',
				'I specialize in sourdough breads. Why not take a loaf home?'
			], null,
			[function(){ return (isStructureOwnedBy('STOWN_PL_struct_DOMSBAKERY', 'dominic')
							&& isStructureOpen('STOWN_PL_struct_DOMSBAKERY')); }]
		)
	];
});