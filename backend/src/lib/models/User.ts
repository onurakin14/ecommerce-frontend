import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    id: Number,
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String,
    adress: String,
    bank: []
});

const User = models.User || model("User", userSchema);
export default User;