const Team = require('../../api/models/Team');

// Constructing each team in an array
const teams = [
	new Team({
		_id: '5d4155cfcd68f4086d8df590',
		name: 'Arsenal',
		stadium: 'Emirates Stadium',
		coach: 'Unai Emery'
	}),
	new Team({
		_id: '5d4155cfcd68f4086d8df591',
		name: 'Bournemouth',
		stadium: 'Dean Court',
		coach: 'Eddie Howe'
	}),
	new Team({
		_id: '5d4155cfcd68f4086d8df592',
		name: 'Brighton & Hove Albion',
		stadium: 'Falmer Stadium',
		coach: 'Graham Potter'
	}),
	new Team({
		_id: '5d4155cfcd68f4086d8df593',
		name: 'Burnley',
		stadium: 'Turf Moor',
		coach: 'Sean Dyche'
	}),
	new Team({
		_id: '5d4155cfcd68f4086d8df594',
		name: 'Cardiff City',
		stadium: 'Cardiff City Stadium',
		coach: 'Neil Warnock'
	}),
	new Team({
		_id: '5d4155cfcd68f4086d8df595',
		name: 'Chelsea',
		stadium: 'Stamford Bridge',
		coach: 'Frank Lampard'
	}),
	new Team({
		_id: '5d4155cfcd68f4086d8df596',
		name: 'Crystal Palace',
		stadium: 'Selhurst Park',
		coach: 'Roy Hodgson'
	}),
	new Team({
		_id: '5d4155cfcd68f4086d8df597',
		name: 'Everton',
		stadium: 'Goodison Park',
		coach: 'Marco Silva'
	}),
	new Team({
		_id: '5d4155cfcd68f4086d8df598',
		name: 'Fulham',
		stadium: 'Craven Cottage',
		coach: 'Scott Parker'
	}),
	new Team({
		_id: '5d4155cfcd68f4086d8df599',
		name: 'Huddersfield',
		stadium: 'Kirklees Stadium',
		coach: 'Jan Siewert'
	}),
	new Team({
		_id: '5d4155cfcd68f4086d8df600',
		name: 'Leicester City',
		stadium: 'King Power Stadium',
		coach: 'Brendan Rodgers'
	}),
	new Team({
		_id: '5d4155cfcd68f4086d8df601',
		name: 'Manchester City',
		stadium: 'City of Manchester Stadium',
		coach: 'Josep Guardiola'
	}),
	new Team({
		_id: '5d4155cfcd68f4086d8df602',
		name: 'Manchester United',
		stadium: 'Old Trafford',
		coach: 'Ole Gunnar Solksjaer'
	}),
	new Team({
		_id: '5d4155cfcd68f4086d8df603',
		name: 'Newscastle United',
		stadium: 'St James\' Park',
		coach: 'Steve Bruce'
	}),
	new Team({
		_id: '5d4155cfcd68f4086d8df604',
		name: 'Southampton',
		stadium: 'St Mary\'s Stadium',
		coach: 'Ralph Hasenhüttl'
	}),
	new Team({
		_id: '5d4155cfcd68f4086d8df605',
		name: 'Tottemham Hotspur',
		stadium: 'Wembley Stadium',
		coach: 'Mauricio Pochettino'
	}),
	new Team({
		_id: '5d4155cfcd68f4086d8df606',
		name: 'Watford',
		stadium: 'Vicarage Road',
		coach: 'Javier Garcia'
	}),
	new Team({
		_id: '5d4155cfcd68f4086d8df607',
		name: 'West Ham United',
		stadium: 'Emirates Stadium',
		coach: 'Manuel Pellegrini'
	}),
	new Team({
		_id: '5d4155cfcd68f4086d8df608',
		name: 'Wolverhampton',
		stadium: 'Molineux Stadium',
		coach: 'Nuno Espirito Santo'
	})
];

module.exports = teams;
