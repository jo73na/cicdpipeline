db.auth('zivedbadmin', 'Co1mbat0re9091')

db = db.getSiblingDB('master')

db.createUser({
  user: 'zivedbadmin',
  pwd: 'hrumbles2025',
  roles: [
    {
      role: 'readWrite',
      db: 'master'
    }
  ]
})