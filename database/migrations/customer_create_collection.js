db.createCollection("customers", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         properties: {
            name: {
               bsonType: "string",
            },
            company: {
               bsonType: "string",
            },
            address: {
               bsonType: "string",
            },
            no: {
               bsonType: "string",
            },
            tel: {
               bsonType: "string",
            },
            mobile_tel: {
               bsonType: "string",
            },
            position: {
               bsonType: "string",
            },
            website: {
               bsonType: "string",
            },
            city: {
               bsonType: "string",
            },
         }
      }
   }
})