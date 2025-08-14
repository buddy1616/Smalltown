modData.npcInitScripts.push(function() {
	var emma = newNpc('Emma', 'Brown', 25, 0,
		'A bubbly young lass who dresses in rustic western apparel.',
		newCharacterAppearance(modData.types.heights.AVERAGE, modData.types.bodies.CURVY, modData.types.hairColors.BLONDE, modData.types.hairColors.BLONDE, modData.types.hairStyles.PONYHIGH, modData.types.eyeColors.BLUE, modData.types.aesthetics.RUSTIC),
		[
			newNPCWorkSchedule('EMMARANCH_struct_EMMASSHOP'),
			newNpcSchedule('EMMAS_HOUSE', 'SLEEPING', [function(){ return !isStructureOpen('EMMARANCH_struct_EMMASSHOP'); }])
		]
	);
});