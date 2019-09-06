const Fixture = require('../../api/models/Fixture')

// Constructing each fixture in an array
const fixtures = [
  new Fixture({
    referee: 'Referee1',
    homeTeam: "5d4155cfcd68f4086d8df594",
    awayTeam: "5d4155cfcd68f4086d8df595",
    score: "0-0",
    dateTime: new Date("Mon Sep 09 2019 22:53:31").toLocaleString(),
    status: "pending"
  }),
  new Fixture({
    referee: 'Referee1',
    homeTeam: "5d4155cfcd68f4086d8df595",
    awayTeam: "5d4155cfcd68f4086d8df596",
    score: "0-0",
    dateTime: new Date().toLocaleString(),
    status: "completed"
  }),
  new Fixture({
    referee: 'Referee1',
    homeTeam: "5d4155cfcd68f4086d8df596",
    awayTeam: "5d4155cfcd68f4086d8df597",
    score: "0-0",
    dateTime: new Date("Mon Sep 09 2019 22:53:31").toLocaleString(),
    status: "pending"
  }),
  new Fixture({
    referee: 'Referee1',
    homeTeam: "5d4155cfcd68f4086d8df597",
    awayTeam: "5d4155cfcd68f4086d8df598",
    score: "0-0",
    dateTime: new Date("Mon Sep 09 2019 22:53:31").toLocaleString(),
    status: "pending"
  }),
  new Fixture({
    referee: 'Referee1',
    homeTeam: "5d4155cfcd68f4086d8df598",
    awayTeam: "5d4155cfcd68f4086d8df599",
    score: "3-4",
    dateTime: new Date().toLocaleString(),
    status: "completed"
  }),
  new Fixture({
    referee: 'Referee1',
    homeTeam: "5d4155cfcd68f4086d8df600",
    awayTeam: "5d4155cfcd68f4086d8df601",
    score: "0-0",
    dateTime: new Date("Mon Sep 09 2019 22:53:31").toLocaleString(),
    status: "pending"
  }),
  new Fixture({
    referee: 'Referee1',
    homeTeam: "5d4155cfcd68f4086d8df601",
    awayTeam: "5d4155cfcd68f4086d8df602",
    score: "0-0",
    dateTime: new Date("Mon Sep 09 2019 22:53:31").toLocaleString(),
    status: "cancelled"
  }),
  new Fixture({
    referee: 'Referee1',
    homeTeam: "5d4155cfcd68f4086d8df602",
    awayTeam: "5d4155cfcd68f4086d8df603",
    score: "0-0",
    dateTime: new Date("Mon Sep 09 2019 22:53:31").toLocaleString(),
    status: "pending"
  }),
  new Fixture({
    referee: 'Referee1',
    homeTeam: "5d4155cfcd68f4086d8df603",
    awayTeam: "5d4155cfcd68f4086d8df604",
    score: "1-1",
    dateTime: new Date().toLocaleString(),
    status: "completed"
  }),
  new Fixture({
    referee: 'Referee1',
    homeTeam: "5d4155cfcd68f4086d8df604",
    awayTeam: "5d4155cfcd68f4086d8df605",
    score: "0-0",
    dateTime: new Date("Mon Sep 09 2019 22:53:31").toLocaleString(),
    status: "pending"
  }),
  new Fixture({
    referee: 'Referee1',
    homeTeam: "5d4155cfcd68f4086d8df605",
    awayTeam: "5d4155cfcd68f4086d8df606",
    score: "0-0",
    dateTime: new Date("Mon Sep 09 2019 22:53:31").toLocaleString(),
    status: "pending"
  }),
  new Fixture({
    referee: 'Referee1',
    homeTeam: "5d4155cfcd68f4086d8df606",
    awayTeam: "5d4155cfcd68f4086d8df607",
    score: "3-0",
    dateTime: new Date().toLocaleString(),
    status: "completed"
  }),
  new Fixture({
    referee: 'Referee1',
    homeTeam: "5d4155cfcd68f4086d8df607",
    awayTeam: "5d4155cfcd68f4086d8df608",
    score: "0-0",
    dateTime: new Date("Mon Sep 09 2019 22:53:31").toLocaleString(),
    status: "pending"
  }),
  new Fixture({
    referee: 'Referee1',
    homeTeam: "5d4155cfcd68f4086d8df601",
    awayTeam: "5d4155cfcd68f4086d8df605",
    score: "0-0",
    dateTime: new Date("Mon Sep 09 2019 22:53:31").toLocaleString(),
    status: "cancelled"
  }),
  new Fixture({
    referee: 'Referee1',
    homeTeam: "5d4155cfcd68f4086d8df606",
    awayTeam: "5d4155cfcd68f4086d8df602",
    score: "0-0",
    dateTime: new Date("Mon Sep 09 2019 22:53:31").toLocaleString(),
    status: "pending"
  }),
  new Fixture({
    referee: 'Referee1',
    homeTeam: "5d4155cfcd68f4086d8df601",
    awayTeam: "5d4155cfcd68f4086d8df602",
    score: "0-0",
    dateTime: new Date("Mon Sep 09 2019 22:53:31").toLocaleString(),
    status: "pending"
  }),
];

module.exports = fixtures;
