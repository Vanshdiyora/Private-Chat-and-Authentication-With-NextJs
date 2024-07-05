const messages= []

function saveMessage(message){
    messages.push(message)
}

function findMessageForUser(userId){
    return messages.filter(({from, to})=>from===userId || to===userId)
}

function getMessage(){
    return messages;
}




module.exports = { saveMessage ,findMessageForUser,getMessage};