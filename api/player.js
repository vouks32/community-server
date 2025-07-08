import { addDoc, getDoc, updateDoc } from '../localDatabase.js';
import e from 'express';
import cors from "cors";

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
      money: roleData.defaultMoney * 1000,
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
playerAPI.put('/api/players/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const playerData = await getDoc('players', email);

    //// FAIRE DES TRUCS ////


    res.json(playerData);
  } catch (error) {
    console.error('Erreur mise à jour joueur:', error);
    res.status(500).json({ error: 'Échec mise à jour joueur' });
  }
});


playerAPI.get('/', async (req, res) => {
  
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

const roleNames = {
  policeman: {
    nom: 'Policier',
    defaultHealth: 85,
    defaultMorale: 70,
    defaultForce: 7,
    defaultIntelligence: 8,
    defaultMoney: 200
  },
  professor: {
    nom: 'Professeur',
    defaultHealth: 80,
    defaultMorale: 75,
    defaultForce: 5,
    defaultIntelligence: 9,
    defaultMoney: 180
  },
  driver: {
    nom: 'Chauffeur',
    defaultHealth: 85,
    defaultMorale: 65,
    defaultForce: 6,
    defaultIntelligence: 7,
    defaultMoney: 150
  },
  thief: {
    nom: 'Voleur',
    defaultHealth: 75,
    defaultMorale: 60,
    defaultForce: 8,
    defaultIntelligence: 7,
    defaultMoney: 250
  },
  assassin: {
    nom: 'Assassin',
    defaultHealth: 90,
    defaultMorale: 50,
    defaultForce: 9,
    defaultIntelligence: 6,
    defaultMoney: 300
  },
  doctor: {
    nom: 'Docteur',
    defaultHealth: 90,
    defaultMorale: 80,
    defaultForce: 5,
    defaultIntelligence: 8,
    defaultMoney: 250
  },
  mayor: {
    nom: 'Maire',
    defaultHealth: 85,
    defaultMorale: 85,
    defaultForce: 5,
    defaultIntelligence: 9,
    defaultMoney: 350
  },
  lawyer: {
    nom: 'Avocat',
    defaultHealth: 80,
    defaultMorale: 80,
    defaultForce: 5,
    defaultIntelligence: 8,
    defaultMoney: 300
  },
  storekeeper: {
    nom: 'Magasinier',
    defaultHealth: 85,
    defaultMorale: 70,
    defaultForce: 6,
    defaultIntelligence: 7,
    defaultMoney: 200
  },
  wizard: {
    nom: 'Sorcier',
    defaultHealth: 75,
    defaultMorale: 65,
    defaultForce: 4,
    defaultIntelligence: 10,
    defaultMoney: 280
  }
};
