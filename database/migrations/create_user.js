db.createUser(
  {
    user: "admin",
    pwd: "xyz123",
    roles: [ { role: "readWrite", db: "my_lara" } ]
  }
)