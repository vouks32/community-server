import { addDoc, getDoc, updateDoc } from '../localDatabase.js';
import e from 'express';
import cors from "cors";
import { roleNames } from '../PlayerData.js';

const playerAPI = e();
playerAPI.use(cors());
playerAPI.use(e.json());

// Initialisation du joueur
playerAPI.post('/api/players', async (req, res) => {
  try {
    const { email } = req.body;
    const role = getRole();
    const roleData = roleNames[role];

    const playerData = {
      email,
      role,
      health: roleData.defaultHealth,
      morale: roleData.defaultMorale,
      strength: roleData.defaultForce,
      intelligence: roleData.defaultIntelligence,
      money: roleData.defaultMoney,
      items: [],
      isWerewolf: false,
      lastUpdated: Date.now()
    };

    await addDoc('players', email, playerData)
    res.status(201).json(playerData);
  } catch (error) {
    console.error('Erreur création joueur:', error);
    res.status(500).json({ error: 'Échec création joueur' });
  }
});

// Mise à jour du joueur
playerAPI.put('/api/players', async (req, res) => {
  try {
    const { email } = req.params;

    const playerData = await updateDoc('players', email, req.params)
    //// FAIRE DES TRUCS ////

    res.json(playerData);
  } catch (error) {
    console.error('Erreur mise à jour joueur:', error);
    res.status(500).json({ error: 'Échec mise à jour joueur' });
  }
});


playerAPI.get('/api/playerroles', async (req, res) => {
  try {
    res.json(roleNames);
  } catch (error) {
    console.error('Erreur récupération du role du joueur:', error);
    res.status(500).json({ error: 'Échec récupération du role du joueur' });
  }
})


// Récupération des données joueur
playerAPI.get('/api/players', async (req, res) => {
  try {
    const { email } = req.params;
    const playerDoc = await getDoc('players', email);

    if (!playerDoc) {
      return res.status(404).json({ error: 'Joueur non trouvé' });
    }

    res.json(playerDoc);
  } catch (error) {
    console.error('Erreur récupération joueur:', error);
    res.status(500).json({ error: 'Échec récupération joueur' });
  }
});


export { playerAPI }




////////////////////////////////////////////


const getRole = () => {
  let roleKeys = Object.keys(roleNames);
  let role = "mayor";

  while (role.includes("mayor")) {
    role = roleKeys[Math.floor(Math.random() * roleKeys.length)]
  }

  return role
}

