modData.npcInitScripts.push(function() {
	var clayton = newNpc('Clayton', 'Lespool', 46, 1,
		'A boisterous, friendly, guy with a salt-and-pepper beard. Likes to joke around and make friends. Loves a good pun.',
		newCharacterAppearance(modData.types.heights.TALL, modData.types.bodies.FIT, modData.types.hairColors.GREY, modData.types.hairColors.GREY, modData.types.hairStyles.PONYLOW, modData.types.eyeColors.BROWN, modData.types.aesthetics.CASUAL),
		[
			newNPCWorkSchedule('STOWN_PL_struct_CLAYSDELI'),
			newNpcSchedule('STOWN_PL', 'CHILLING', [function(){ return !isStructureOpen('STOWN_PL_struct_CLAYSDELI'); }])
		]);
	clayton.dialog = [
		newNpcDialog('Hey there I haven\'t seen you around before. I\'m Clay, the butcher. KNIFE to MEAT YOU!! HAHAHA! Get it? KNIFE? MEAT? Because I\'m the butcher! HAHAHA! Anyway, stop on by the deli some time, it\'s in the Smalltown Plaza.', null,
			[function(){ return (isStructureOwnedBy('STOWN_PL_struct_CLAYSDELI', 'clayton')
							&& !isStructureOpen('STOWN_PL_struct_CLAYSDELI')
							&& getNpcByName('clayton').conversationsToDate < 1); }]
		),
		
		// quest helpers
		newNpcDialog(
				'Hey I like the CUT of your jib, kid. '
				+ 'I feel like you have the GUTS to be a great butcher. '
				+ 'I just bought a new cleaver, you can have my old one.'
			, null,
			[function(){ return (isStructureOwnedBy('STOWN_PL_struct_CLAYSDELI', 'clayton')
							&& isStructureOpen('STOWN_PL_struct_CLAYSDELI')
							&& isCharacterOnQuest('COOKING_I')
							&& getInventoryItem('CLEAVER').quantity < 1
							&& getNpcByName('clayton').conversationsToDate > 1); }],
			function() {
					tryAddItemWithMessage('CLEAVER', 0, 1);
					addNpcDialogNarration(getNpcByName('clayton'), 'Come back when you have a complete cooking set, and I\'ll show you a few things.');
				}
		),
		newNpcDialog(
				'So, you\'ve got a set of knives now eh? You\'re a CUT above the rest, HAHAHA! '
			, null,
			[function(){ return (isCharacterOnQuest('COOKING_II')
							&& getNpcByName('clayton').conversationsToday < 1); }],
			function() {
					if (testTime(30, false, false))
					{
						addNpcDialogNarration(getNpcByName('clayton'), 'I\'ll show you how to make a steak kabob!');
						learnRecipe(currentSave.characterState, 'KABOB_STEAK', true);
						tryAddItemWithMessage('BEEF', 0, 1);
						addTime(30);
					}
					else
					{
						addNpcDialogNarration(getNpcByName('clayton'), 'It\'s late, but come back when you have more time. I\'ll show you how to make a basic dough.');
					}
				}
		),

		// work talk
		newNpcDialog('Welcome to Meat and Greet! You can call me Clay, KNIFE to MEAT YOU! HAHAHA! Get it? KNIFE? MEAT? Because I\'m the butcher! HAHAHA!', null,
			[function(){ return (isStructureOwnedBy('STOWN_PL_struct_CLAYSDELI', 'clayton')
							&& isStructureOpen('STOWN_PL_struct_CLAYSDELI')
							&& getNpcByName('clayton').conversationsToDate < 1); }]
		),
		newNpcDialog([
				'Howdy, take a look around, I\'ve got all the choice cuts.',
				'You need some haggis, or some tripe? I\'ve got it all! HAHAHA!'
			], null,
			[function(){ return (isStructureOwnedBy('STOWN_PL_struct_DOMSBAKERY', 'dominic')
							&& isStructureOpen('STOWN_PL_struct_DOMSBAKERY')); }]
		)
	];
});