const bcrypt = require('bcrypt')

const hashing = async(password)=>{
    return await bcrypt.hash(password, 12);
}

module.exports = hashing