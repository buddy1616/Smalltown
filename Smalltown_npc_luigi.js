modData.npcInitScripts.push(function() {
	var luigi = newNpc('Luigi', 'D\'Graisse', 30, 1,
		'A loud, obnoxious, chef with a monstrous ego, but the skills to back it up.',
		newCharacterAppearance(modData.types.heights.AVERAGE, modData.types.bodies.DADBOD, modData.types.hairColors.BLONDE, modData.types.hairColors.BLONDE, modData.types.hairStyles.CREW, modData.types.eyeColors.BLUE, modData.types.aesthetics.CASUAL),
		[
			newNPCWorkSchedule('STOWN_E_struct_GORDOSREST'),
			newNpcSchedule('STOWN_E', 'CHILLING', [function(){ return !isStructureOpen('STOWN_E_struct_GORDOSREST'); }])
		]);
	luigi.dialog = [
		newNpcDialog('Hey! Who are you? You never heard of Luigi D\'Graisse eh? If you want to taste some real food, come by my restaurant on the east side of town.', null,
			[function(){ return (isStructureOwnedBy('STOWN_E_struct_GORDOSREST', 'luigi')
							&& !isStructureOpen('STOWN_E_struct_GORDOSREST')
							&& getNpcByName('luigi').conversationsToDate < 1); }]
		),
		
		// quest helpers
		newNpcDialog(
				'I\'m too busy for you, go away!'
			, null,
			[function(){ return (isStructureOwnedBy('STOWN_E_struct_GORDOSREST', 'luigi')
							&& isStructureOpen('STOWN_E_struct_GORDOSREST')
							&& isCharacterOnQuest('COOKING_I')
							&& getInventoryItem('CHEFSKNIFE').quantity < 1
							&& getNpcByName('luigi').conversationsToDate > 1); }],
			function() {
					addAlertNarration('Luigi throws a chef\'s knife at you and it sticks into the wall.');
					tryAddItemWithMessage('CHEFSKNIFE', 0, 1);
					addNpcDialogNarration(getNpcByName('luigi'), 'Now scram!');
				}
		),

		// work talk
		newNpcDialog('You decided to experience culinary perfection, I see. Well sit down and order something!', null,
			[function(){ return (isStructureOwnedBy('STOWN_E_struct_GORDOSREST', 'luigi')
							&& isStructureOpen('STOWN_E_struct_GORDOSREST')
							&& getNpcByName('luigi').conversationsToDate < 1); }]
		)
	];
});