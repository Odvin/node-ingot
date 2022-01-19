-- Master schema
CREATE SCHEMA IF NOT EXISTS master;
-- Athletes 
CREATE TABLE IF NOT EXISTS master.athletes (
  athlete_id SERIAL PRIMARY KEY,
  name VARCHAR(15) NOT NULL,
  surname VARCHAR(30) NOT NULL,
  email VARCHAR(50) UNIQUE NOT NULL
);
COMMENT ON TABLE master.athletes IS 'Contains an athlete profile';
-- Sports
CREATE TABLE IF NOT EXISTS master.sports (
  sport_id SERIAL PRIMARY KEY,
  title VARCHAR(50) UNIQUE NOT NULL,
  abbreviation VARCHAR(5) UNIQUE NOT NULL,
  positions JSONB,
  attributes JSONB
);
COMMENT ON TABLE master.sports IS 'Describes a sport';
-- Organizations
CREATE TABLE IF NOT EXISTS master.organizations (
  organization_id SERIAL PRIMARY KEY,
  title VARCHAR(150) UNIQUE NOT NULL,
  manager VARCHAR(150)
);
COMMENT ON TABLE master.organizations IS 'Contains an organization profile';
-- Teams
CREATE TABLE IF NOT EXISTS master.teams (
  team_id SERIAL PRIMARY KEY,
  title VARCHAR(150) UNIQUE NOT NULL
);
COMMENT ON TABLE master.teams IS 'Contains a team profile';
-- Events
CREATE TABLE IF NOT EXISTS master.events (
  event_id SERIAL PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  provider VARCHAR(50) NOT NULL,
  athlete_id INTEGER REFERENCES master.athletes (athlete_id),
  organization_id INTEGER REFERENCES master.organizations (organization_id),
  team_id INTEGER REFERENCES master.teams (team_id),
  sport_id INTEGER REFERENCES master.sports (sport_id),
  occurred_at TIMESTAMP
);
COMMENT ON TABLE master.events IS 'Events in which the athlete took part';
-- Players
CREATE TABLE IF NOT EXISTS master.players (
  athlete_id INTEGER REFERENCES master.athletes (athlete_id),
  event_id INTEGER REFERENCES master.events (event_id),
  player_positions JSONB,
  player_attributes JSONB,
  PRIMARY KEY (athlete_id, event_id)
);
COMMENT ON TABLE master.players IS 'Describes an athlete on the event';