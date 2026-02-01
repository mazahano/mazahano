const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const listUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const users = await User.find({}).select('email isAdmin name');
        console.log('--- Users in Database ---');
        users.forEach(user => {
            console.log(`Name: ${user.name}, Email: ${user.email}, Admin: ${user.isAdmin}`);
        });
        console.log('-------------------------');
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

listUsers();
