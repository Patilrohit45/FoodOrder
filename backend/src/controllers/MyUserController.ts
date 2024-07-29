import { Request, Response } from 'express';
import User from '../models/user';

const createCurrentUser = async (req: Request, res: Response) => {
  try {
    const { auth0Id, email, name, addressLine1, city, country } = req.body;
    console.log("body",req.body);
    // Validate required fields
    if (!auth0Id || !email) {
        console.log("auth",auth0Id);
        console.log("email",email)
      return res.status(400).json({ message: 'auth0Id and email are required' });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ auth0Id });
    if (existingUser) {
      return res.status(200).send();
    }

    // Create the user if it doesn't exist
    const newUser = new User({
      auth0Id,
      email,
      name,
      addressLine1,
      city,
      country,
    });
    await newUser.save();

    // Return the new user object to the client
    res.status(201).json(newUser.toObject());
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
};

export default {
  createCurrentUser,
};
