modData.npcInitScripts.push(function() {
	var avery = newNpc('Avery', 'Thompson', 29, 0,
		'A edgy extrovert that is totes obsessed with plants and crystals.',
		newCharacterAppearance(modData.types.heights.AVERAGE, modData.types.bodies.AVERAGE, modData.types.hairColors.BLONDE, modData.types.hairColors.BLUE, modData.types.hairStyles.SPACEBUNS, modData.types.eyeColors.HAZEL, modData.types.aesthetics.ALT),
		[
			newNPCWorkSchedule('STOWN_PL_struct_GARDENSHOP')
		]
	);
});