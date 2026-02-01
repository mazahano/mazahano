const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const makeAdmin = async (email) => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const user = await User.findOne({ email });

        if (user) {
            user.isAdmin = true;
            await user.save();
            console.log(`Success: ${email} is now an admin.`);
        } else {
            console.log(`Error: User with email ${email} not found.`);
        }
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

const email = process.argv[2];
if (!email) {
    console.log('Please provide an email address.');
    process.exit(1);
}

makeAdmin(email);
