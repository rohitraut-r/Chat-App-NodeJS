const users = []

//addUser, removeUser, getUser, getUsersInRoom

const addUser = ({id, username, room}) => {
    //Clean the data 
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    //Validate the data
    if(!username || !room){
        return {
            error: 'username and room are required'
        }
    }

    //Check for existing user
    const existingUser = users.find((user)=>{
        return user.room === room && user.username === username
    })

    //validate username
    if(existingUser){
        return {
            error: "Username already exists!"
        }
    }

    //store user
    const user = { id, username, room}
    users.push(user)
    return {user}
}

addUser({
    id: 20,
    username: 'rohit',
    room: 'new'
})
console.log(users)