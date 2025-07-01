import admin from 'firebase-admin';
import { firebaseConfig } from '../../firebaseConfig'; // Importez votre config Firebase

// Initialisation Firebase
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
    databaseURL: `https://${firebaseConfig.projectId}.firebaseio.com`
  });
}

const db = admin.firestore();

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'POST':
      // Initialisation du joueur
      try {
        const { email, userData } = req.body;
        const playerRef = db.collection('players').doc(email);
        
        // Ajouter des valeurs par défaut
        const defaultPlayerData = {
          ...userData,
          health: 85,
          morale: 70,
          strength: 7,
          intelligence: 8,
          activityPoints: 3,
          money: 200,
          role: 'professor',
          items: ['house', 'dog'],
          isWerewolf: false,
          lastUpdated: admin.firestore.FieldValue.serverTimestamp()
        };

        await playerRef.set(defaultPlayerData);
        res.status(200).json(defaultPlayerData);
      } catch (error) {
        res.status(500).json({ error: 'Player initialization failed' });
      }
      break;

    case 'PUT':
      // Mise à jour du joueur (pénalités, transformation)
      try {
        const { email } = req.body;
        const playerRef = db.collection('players').doc(email);
        const playerDoc = await playerRef.get();
        
        if (!playerDoc.exists) {
          return res.status(404).json({ error: 'Player not found' });
        }

        const playerData = playerDoc.data();
        const now = new Date();
        const lastUpdated = playerData.lastUpdated.toDate();
        const hoursSinceUpdate = Math.floor((now - lastUpdated) / (1000 * 60 * 60));

        // Appliquer les pénalités pour chaque cycle complet (20 min)
        const cycles = Math.floor(hoursSinceUpdate * 3);
        if (cycles > 0) {
          const updatedData = {
            health: Math.max(playerData.health - (10 * cycles), 0),
            morale: Math.max(playerData.morale - (20 * cycles), 0),
            strength: Math.max(playerData.strength - (2 * cycles), 1),
            intelligence: Math.max(playerData.intelligence - (1 * cycles), 1),
            isWerewolf: false,
            lastUpdated: admin.firestore.FieldValue.serverTimestamp()
          };

          // Vérifier la transformation en loup-garou
          const shouldTransform = calculateTransformationScore(playerData) >= 0.7;
          if (shouldTransform) {
            updatedData.isWerewolf = true;
            updatedData.strength = Math.min(playerData.strength + 5, 15);
            updatedData.intelligence = Math.max(playerData.intelligence - 3, 1);
            updatedData.health = Math.min(playerData.health + 20, 100);
          }

          await playerRef.update(updatedData);
          res.status(200).json(updatedData);
        } else {
          res.status(304).json({ message: 'No update needed' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Player update failed' });
      }
      break;

    case 'GET':
      // Récupération des données du joueur
      try {
        const { email } = req.query;
        const playerRef = db.collection('players').doc(email);
        const playerDoc = await playerRef.get();
        
        if (!playerDoc.exists) {
          return res.status(404).json({ error: 'Player not found' });
        }

        res.status(200).json(playerDoc.data());
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch player data' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

// Calcul du score de transformation
function calculateTransformationScore(playerData) {
  const { health, morale, strength, intelligence } = playerData;
  
  const healthScore = (100 - health) / 100;
  const moraleScore = (100 - morale) / 100;
  const strengthScore = strength / 10;
  const intelligenceScore = (10 - intelligence) / 10;

  const weights = {
    health: 0.4,
    morale: 0.3,
    strength: 0.2,
    intelligence: 0.1
  };

  return (
    healthScore * weights.health +
    moraleScore * weights.morale +
    strengthScore * weights.strength +
    intelligenceScore * weights.intelligence
  );
}
