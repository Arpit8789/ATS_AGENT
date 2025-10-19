const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require('path');
const User = require('../models/User');

// Load .env from backend root (2 levels up from scripts folder)
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

async function createAdmin() {
    try {
        // Debug: Check if env vars are loaded
        console.log('🔍 Checking environment variables...');
        console.log('MONGODB_URI:', process.env.MONGODB_URI ? '✅ Found' : '❌ Not Found');
        console.log('ADMIN_EMAIL:', process.env.ADMIN_EMAIL || 'Using default');
        
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI not found in .env file. Please check your .env file exists in backend folder.');
        }

        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB Connected...');

        // Admin credentials from .env
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@atsagent.com';
        const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123';
        const adminName = process.env.ADMIN_NAME || 'Admin';
        const adminPhone = process.env.ADMIN_PHONE || '1234567890';

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: adminEmail });

        if (existingAdmin) {
            console.log('\n⚠️  Admin already exists!');
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━');
            console.log('📧 Email:', adminEmail);
            console.log('👤 Name:', existingAdmin.name);
            console.log('🔑 Role:', existingAdmin.role);
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
            await mongoose.connection.close();
            process.exit(0);
        }

        // Hash password
        const passwordHash = await bcrypt.hash(adminPassword, 10);

        // Create admin user
        const admin = new User({
            name: adminName,
            email: adminEmail,
            passwordHash,
            phone: adminPhone,
            role: 'admin',
            isVerified: true
        });

        await admin.save();

        console.log('\n✅ Admin created successfully!');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('📧 Email:', adminEmail);
        console.log('🔒 Password:', adminPassword);
        console.log('👤 Name:', adminName);
        console.log('🔑 Role:', admin.role);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('⚠️  Please change the password after first login!\n');

        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error('\n❌ Error creating admin:', error.message);
        await mongoose.connection.close();
        process.exit(1);
    }
}

createAdmin();
