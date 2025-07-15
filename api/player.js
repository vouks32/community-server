import { addDoc, getDoc, updateDoc } from '../localDatabase.js';
import e from 'express';
import cors from "cors";
import { roleNames } from '../PlayerData.js';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const playerAPI = e();
playerAPI.use(cors());
playerAPI.use(e.json());

// Initialisation du joueur
playerAPI.post('/api/players', async (req, res) => {
  try {
    const player = req.body;
    const role = getRole();
    const roleData = roleNames[role];
    console.log("-------------");
    console.log("Création du joueur", player.email, "Au role", role);

    const playerData = {
      ...player,
      role,
      health: roleData.defaultHealth,
      morale: roleData.defaultMorale,
      strength: roleData.defaultForce,
      intelligence: roleData.defaultIntelligence,
      money: roleData.defaultMoney,
      items: [],
      activities: [],
      isWerewolf: false,
      lastUpdated: Date.now()
    };

    await addDoc('players', player.email, playerData)
    console.log("Création du joueur COMPLÉTÉ AVEC SUCCES");
    res.status(201).json(playerData);
  } catch (error) {
    console.error('ERREUR création joueur:', error);
    res.status(500).json({ error: 'Échec création joueur' });
  }
});

// Mise à jour du joueur
playerAPI.put('/api/players', async (req, res) => {
  try {
    if (!req.body) return;
    const { email } = req.body;
    console.log('--------------')
    console.log('updating', email)

    const playerData = await updateDoc('players', email, req.body.updates)
    //// FAIRE DES TRUCS ////

    res.json(playerData);
  } catch (error) {
    console.error('Erreur mise à jour joueur:', error);
    res.status(500).json({ error: 'Échec mise à jour joueur' });
  }
});

// récuperer les roles des joueurs
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
    const { email } = req.query;
    console.log("-------------");
    const playerDoc = await getDoc('players', email);
    console.log('récupération de s informations de', email);

    if (!playerDoc) {
      console.log('Joueur non trouvé');
      return res.status(404).json({ error: 'Joueur non trouvé' });
    }

    console.log('Joueur  trouvé', email);
    res.json(playerDoc);
  } catch (error) {
    console.error('Erreur récupération joueur:', error);
    res.status(500).json({ error: 'Échec récupération joueur' });
  }
});


////////////////////                    FICHIERS                  ////////////////////////////
playerAPI.get('/api/file/:folder/:name', (req, res, next) => {
  const fileName = req.params.name + '.png'
  const FolderName = req.params.folder
  console.log("-------------");

  console.log("récupération de", fileName, "dans", path.join(__dirname, '..', 'public', FolderName))
  const options = {
    root: path.join(__dirname, '..', 'public', FolderName),
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  }

  res.sendFile(fileName, options, (err) => {
    if (err) {
      console.log('Echech de la récupération')
      next(err)
    } else {
      console.log('Sent:', fileName)
    }
  })
})


///////////////////                     MESSAGES                  ////////////////////////////
// Récupération des méssages des joueurs
playerAPI.get('/api/messages', async (req, res) => {
  try {
    const { date } = req.query;
    console.log("-------------");
    console.log('récupération des messages de la date', (new Date(date)).toLocaleDateString('en-GB').replace('/', '-'));

    const messageDoc = await getDoc('messages', (new Date(date)).toLocaleDateString('en-GB').replace('/', '-'));

    if (!messageDoc) {
      console.log('Messages non-trouvé');
      return res.status(404).json({ error: 'Pas de Messages à cette date' });
    }

    console.log('Messages trouvé');
    res.json(messageDoc);
  } catch (error) {
    console.error('Erreur récupération des messages du:', (new Date()).toLocaleDateString('en-GB').replace('/', '-'));
    res.status(500).json({ error: 'Échec récupération des messages' });
  }
});

// ajout d'un message
playerAPI.put('/api/messages', async (req, res) => {
  try {
    const { message } = req.body;
    const document_id = (new Date()).toLocaleDateString('en-GB').replace('/', '-');
    console.log("-------------");

    let todayMessages = await getDoc('messages', document_id)
    if (!todayMessages) {
      todayMessages = await addDoc('messages', document_id, {
        messages: [message],
        number: 1,
        date : document_id
      })
    } else {
      todayMessages.messages.push(message);
      todayMessages.number++;
      updateDoc('messages', document_id, todayMessages);
    }

    console.log('Messages enregistré');
    res.json(todayMessages);
  } catch (error) {
    console.error('Erreur d\'enregistrement des messages du:', (new Date()).toLocaleDateString('en-GB').replace('/', '-'));
    res.status(500).json({ error: 'Échec enregistrement des messages' });
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

