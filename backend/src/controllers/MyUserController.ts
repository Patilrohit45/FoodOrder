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

const updateCurrentUser =  async (req: Request, res: Response) => {
    try{
        const {name,addressLine1,country,city} = req.body;
        const user = await User.findById(req.userId);

        if(!user){
          return res.status(404).json({message:"User Not Found"});
        }

        user.name = name;
        user.addressLine1 = addressLine1;
        user.country = country;
        user.city = city;

        await user.save();

        res.send(user);

    }catch(error){
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Error updating user' });
    }
}

export default {
  createCurrentUser,
  updateCurrentUser,
};
