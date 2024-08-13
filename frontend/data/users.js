import bcrypt from "bcrypt";

const users = [{
    "name":"Admin User",
    "email":"admin@example.com",
    "password":bcrypt.hashSync("123456",10),
    "isAdmin":true
},
{
    "name":"Romik Roy",
    "email":"romik@example.com",
    "password":bcrypt.hashSync("123456",10),
    "isAdmin":false
},{
    "name":"John Doe",
    "email":"john@example.com",
    "password":bcrypt.hashSync("123456",10),
    "isAdmin":false
}
]

export default users