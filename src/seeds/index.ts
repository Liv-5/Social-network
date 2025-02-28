import db from "../config/connection.js";
import { Thought , User } from "../models/index.js";
import cleanDB from "./cleanDB.js";
import { getRandomName, getRandomAssignments } from "./data.js";

try {
  await db();
  await cleanDB();

  // Create empty array to hold the user
  const userData = [];

  // Loop 20 times -- add user to the user array
  for (let i = 0; i < 20; i++) {
   

    
    const username = ///?;
    const email =///?;
    const thoughts = ///?;
    const friends = ///?;
    

    user.push({
      username,
      email,
      thoughts,
      friends,
    });
  }

  // Add user to the collection and await the results
  const userData = await User.create(user);

  // Add thoughts to the collection and await the results
  await Thought.create({
    thoughtText: " ",
    createdAt:  // Date.now,
    username: "",
  });

  // Log out the seed data to indicate what should appear in the database
  console.table(user);
  console.info("Seeding complete! 🌱");
  process.exit(0);
} catch (error) {
  console.error("Error seeding database:", error);
  process.exit(1);
}
