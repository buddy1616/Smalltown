modData.npcInitScripts.push(function() {
	var liam = newNpc('Liam', 'O\'Doyle', 26, 1,
		'A fiery ginger who likes to live life on the edge.',
		newCharacterAppearance(modData.types.heights.AVERAGE, modData.types.bodies.AVERAGE, modData.types.hairColors.RED, modData.types.hairColors.RED, modData.types.hairStyles.CREW, modData.types.eyeColors.GREEN, modData.types.aesthetics.CASUAL),
		[
			newNpcSchedule('STOWN_PL', 'CHILLING', [function(){ return timeBetween(6*60, 18*60); }])
		]);
});