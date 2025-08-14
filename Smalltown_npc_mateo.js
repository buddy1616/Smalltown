modData.npcInitScripts.push(function() {
	var mateo = newNpc('Mateo', 'Gonzalez', 23, 1,
		'A quiet, hardworking fellow.',
		newCharacterAppearance(modData.types.heights.AVERAGE, modData.types.bodies.AVERAGE, modData.types.hairColors.BROWN, modData.types.hairColors.BROWN, modData.types.hairStyles.CREW, modData.types.eyeColors.BROWN, modData.types.aesthetics.RUSTIC),
		[
			newNpcSchedule('EMMARANCH_STAFF', 'SLEEPING', [function(){ return !timeBetween(5*60, 13*60); }]),
			newNpcSchedule('EMMARANCH', 'WORKING', [function(){ return !isDayOfWeek(['SA', 'SU']) && timeBetween(5*60, 13*60); }])
		],
		[modData.types.bodies.CURVY]);
});