import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Le nom est obligatoire."],
    trim: true,
    minlength: [3, "Le nom doit contenir au moins 3 caractères."],
    maxlength: [20, "Le nom ne peut pas dépasser 20 caractères."],
  },
  username: {
    type: String,
    required: [true, "Le prenom est obligatoire."],
    trim: true,
    minlength: [3, "Le prenom doit contenir au moins 3 caractères."],
    maxlength: [20, "Le prenom ne peut pas dépasser 20 caractères."],
  },
  email: {
    type: String,
    required: [true, "L'email est obligatoire."],
    unique: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Veuillez entrer une adresse email valide."],
  },
  password: {
    type: String,
    required: [true, "Le mot de passe est obligatoire."],
    minlength: [4, "Le mot de passe doit contenir au moins 4 caractères."],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  avatar: {
    type: String,
    default:
      "https://img.freepik.com/vecteurs-libre/cercle-bleu-utilisateur-blanc_78370-4707.jpg",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Users = mongoose.model("User", userSchema);
export default Users;
