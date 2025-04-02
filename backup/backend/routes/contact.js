const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');
const { collection, addDoc, getDocs } = require('firebase/firestore');

// Submit contact form
router.post('/submit', async (req, res) => {
    console.log('=== Contact Form Submission Debug ===');
    console.log('1. Received request body:', req.body);
    
    try {
        const { name, email, phone, message } = req.body;
        
        // Validate required fields
        if (!name || !email || !phone || !message) {
            console.log('2. Missing required fields:', { name, email, phone, message });
            return res.status(400).json({ 
                success: false, 
                message: 'All fields are required' 
            });
        }

        console.log('3. All required fields present');

        // Add contact to Firestore
        const docRef = await addDoc(collection(db, 'contacts'), {
            name,
            email,
            phone,
            message,
            createdAt: new Date()
        });

        console.log('4. Contact saved successfully with ID:', docRef.id);

        res.status(201).json({
            success: true, 
            message: 'Contact form submitted successfully',
            data: {
                id: docRef.id,
                name,
                email,
                phone,
                message
            }
        });
    } catch (error) {
        console.error('=== Contact Form Error ===');
        console.error('Error details:', error);
        console.error('Error stack:', error.stack);
        console.error('=== End Error ===');
        
        res.status(500).json({ 
            success: false, 
            message: 'Error submitting contact form',
            error: error.message
        });
    }
});

// Get all contacts
router.get('/all', async (req, res) => {
    try {
        const querySnapshot = await getDocs(collection(db, 'contacts'));
        const contacts = [];
        querySnapshot.forEach((doc) => {
            contacts.push({
                id: doc.id,
                ...doc.data()
            });
        });
        console.log('Retrieved contacts:', contacts);
        res.json(contacts);
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error fetching contacts' 
        });
    }
});

// Test route to view all contacts
router.get('/test', async (req, res) => {
    try {
        console.log('Fetching all contacts...');
        const contacts = await Contact.find();
        console.log('All contacts:', contacts);
        res.json(contacts);
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router; 