modData.npcInitScripts.push(function() {
	var olivia = newNpc('Olivia', 'Martin',
		22, 0, 'A short demure girl, with bangs and glasses. She\'d rather stay at home with her cat than go to parties.',
		newCharacterAppearance(modData.types.heights.SHORT, modData.types.bodies.THIN, modData.types.hairColors.BLONDE, modData.types.hairColors.BLACK, modData.types.hairStyles.BOB, modData.types.eyeColors.BLUE, modData.types.aesthetics.ALT),
		[
			// sleeping
			newNpcSchedule('STOWN_RES1_struct_MARTIN_HOUSE', 'SLEEPING', [function(){ return isDayOfWeek(['MO', 'TU', 'WE']) && !timeBetween(hm(7, 30), hm(21, 30)); }]),
			newNpcSchedule('STOWN_RES1_struct_MARTIN_HOUSE', 'SLEEPING', [function(){ return isDayOfWeek(['TH']) && !timeBetween(hm(7, 30), hm(24)); }]),
			newNpcSchedule('STOWN_RES1_struct_MARTIN_HOUSE', 'SLEEPING', [function(){ return isDayOfWeek(['FR', 'SA']) && !timeBetween(hm(9), hm(24)); }]),
			newNpcSchedule('STOWN_RES1_struct_MARTIN_HOUSE', 'SLEEPING', [function(){ return isDayOfWeek(['SU']) && !timeBetween(hm(9), hm(21)); }]),
			
			// school days
			newNpcSchedule('STOWN_RES1', 'WALKING_E', [function(){ return isDayOfWeek(['MO', 'TU', 'WE', 'TH']) && timeBetween(hm(7, 31), hm(7, 40)); }]),
			newNpcSchedule('STOWN_N', 'WALKING_E', [function(){ return isDayOfWeek(['MO', 'TU', 'WE', 'TH']) && timeBetween(hm(7, 41), hm(7, 50)); }]),
			newNpcSchedule('STOWN_JC', 'STUDYING', [function(){ return isDayOfWeek(['MO', 'TU', 'WE', 'TH']) && timeBetween(hm(7, 51), hm(12, 0)); }]),
			newNpcSchedule('STOWN_JC', 'WALKING_W', [function(){ return isDayOfWeek(['MO', 'TU', 'WE', 'TH']) && timeBetween(hm(12, 1), hm(12, 10)); }]),
			
			// Monday after school
			newNpcSchedule('STOWN_N', 'WALKING_W', [function(){ return isDayOfWeek(['MO']) && timeBetween(hm(12, 11), hm(12, 20)); }]),
			newNpcSchedule('STOWN_RES1', 'HOME', [function(){ return isDayOfWeek(['MO']) && timeBetween(hm(12, 21), hm(12, 30)); }]),
			newNpcSchedule('STOWN_RES1_struct_MARTIN_HOUSE', 'STUDYING', [function(){ return isDayOfWeek(['MO']) && timeBetween(hm(12, 31), hm(17)); }]),
			newNpcSchedule('STOWN_RES1_struct_MARTIN_HOUSE', 'READING', [function(){ return isDayOfWeek(['MO']) && timeBetween(hm(17, 1), hm(20)); }]),
			newNpcSchedule('STOWN_RES1_struct_MARTIN_HOUSE', 'CHILLING', [function(){ return isDayOfWeek(['MO']) && timeBetween(hm(20, 1), hm(21, 29)); }]),
			
			// work days after school
			newNpcSchedule('STOWN_N', 'WALKING_S', [function(){ return isDayOfWeek(['TU', 'WE', 'TH']) && timeBetween(hm(12, 11), hm(12, 20)); }]),
			newNpcSchedule('STOWN_PL', 'CHILLING', [function(){ return isDayOfWeek(['TU', 'WE', 'TH']) && timeBetween(hm(12, 21), hm(12, 45)); }]),
			newNpcSchedule('STOWN_PL_struct_DOMSBAKERY', 'CHILLING', [function(){ return isDayOfWeek(['TU', 'WE', 'TH']) && timeBetween(hm(12, 46), hm(12, 59)); }]),
			newNpcSchedule('STOWN_PL_struct_DOMSBAKERY', 'WORKING', [function(){ return isDayOfWeek(['TU', 'WE', 'TH']) && timeBetween(hm(13), hm(17)); }]),
			newNpcSchedule('STOWN_PL', 'WALKING_N', [function(){ return isDayOfWeek(['TU', 'WE', 'TH']) && timeBetween(hm(17, 1), hm(17, 10)); }]),
			newNpcSchedule('STOWN_N', 'WALKING_W', [function(){ return isDayOfWeek(['TU', 'WE', 'TH']) && timeBetween(hm(17, 11), hm(17, 20)); }]),
			newNpcSchedule('STOWN_RES1', 'HOME', [function(){ return isDayOfWeek(['TU', 'WE', 'TH']) && timeBetween(hm(17, 21), hm(17, 30)); }]),
			newNpcSchedule('STOWN_RES1_struct_MARTIN_HOUSE', 'READING', [function(){ return isDayOfWeek(['TU', 'WE']) && timeBetween(hm(17, 31), hm(18)); }]),
			newNpcSchedule('STOWN_RES1_struct_MARTIN_HOUSE', 'CHILLING', [function(){ return isDayOfWeek(['TU', 'WE']) && timeBetween(hm(18, 31), hm(21, 29)); }]),
			newNpcSchedule('STOWN_RES1_struct_MARTIN_HOUSE', 'GAMING', [function(){ return isDayOfWeek(['TH']) && timeBetween(hm(17, 31), hm(23, 59)); }]),

			// weekends
			newNpcSchedule('STOWN_RES1', 'WALKING_E', [function(){ return isDayOfWeek(['FR', 'SA', 'SU']) && timeBetween(hm(9, 1), hm(9, 10)); }]),
			newNpcSchedule('STOWN_N', 'WALKING_S', [function(){ return isDayOfWeek(['FR', 'SA', 'SU']) && timeBetween(hm(9, 11), hm(9, 20)); }]),
			newNpcSchedule('STOWN_PL', 'CHILLING', [function(){ return isDayOfWeek(['FR', 'SA', 'SU']) && timeBetween(hm(9, 21), hm(9, 30)); }]),
			newNpcSchedule('STOWN_PL_struct_DOMSBAKERY', 'CHILLING', [function(){ return isDayOfWeek(['FR', 'SA', 'SU']) && timeBetween(hm(9, 31), hm(9, 40)); }]),
			newNpcSchedule('STOWN_PL_struct_DOMSBAKERY', 'READING', [function(){ return isDayOfWeek(['FR', 'SA', 'SU']) && timeBetween(hm(9, 41), hm(12)); }]),
			newNpcSchedule('STOWN_PL', 'WALKING_N', [function(){ return isDayOfWeek(['FR', 'SA', 'SU']) && timeBetween(hm(12, 1), hm(12, 10)); }]),
			newNpcSchedule('STOWN_N', 'WALKING_W', [function(){ return isDayOfWeek(['FR', 'SA', 'SU']) && timeBetween(hm(12, 11), hm(12, 20)); }]),
			newNpcSchedule('STOWN_RES1', 'HOME', [function(){ return isDayOfWeek(['FR', 'SA', 'SU']) && timeBetween(hm(12, 21), hm(12, 30)); }]),
			newNpcSchedule('STOWN_RES1_struct_MARTIN_HOUSE', 'EATING', [function(){ return isDayOfWeek(['FR', 'SA', 'SU']) && timeBetween(hm(12, 31), hm(13)); }]),
			newNpcSchedule('STOWN_RES1_struct_MARTIN_HOUSE', 'CHILLING', [function(){ return isDayOfWeek(['FR', 'SA', 'SU']) && timeBetween(hm(13, 1), hm(14)); }]),
			newNpcSchedule('STOWN_RES1_struct_MARTIN_HOUSE', 'GAMING', [function(){ return isDayOfWeek(['FR', 'SA', 'SU']) && timeBetween(hm(14, 1), hm(17)); }]),
			newNpcSchedule('STOWN_RES1_struct_MARTIN_HOUSE', 'READING', [function(){ return isDayOfWeek(['FR', 'SA']) && timeBetween(hm(17, 1), hm(23, 59)); }]),
			newNpcSchedule('STOWN_RES1_struct_MARTIN_HOUSE', 'READING', [function(){ return isDayOfWeek(['SU']) && timeBetween(hm(17, 1), hm(20, 59)); }]),
		],
		[modData.types.aesthetics.ALT, modData.types.bodies.AVERAGE, modData.types.eyeColors.GREEN]);
});