db.auth('zivedbadmin', 'hrumbles2025')

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
