import { getDocs, query, updateDoc } from './localDatabase.js';
import { playerAPI } from "./api/player.js";
import { roleNames } from './PlayerData.js';


playerAPI.listen(80, () => {
    console.log(`Serveur joueur démarré sur le port 80`);
});


let isDayPhase = true;
let phaseMinutes = 0;
let remainingMinutes = 0;
let remainingSeconds = 0;

const goToDayPhase = async () => {
    // Mise à jour des joueurs (pénalités, transformation)
    const playersData = await getDocs('players', query().where('email', '!=', ' '));

    for (let i = 0; i < playersData.length; i++) {
        const playerData = playersData[i];
        try {
            const cycles = 1;
            if (cycles > 0) {
                const updatedData = {
                    health: Math.max(playerData.health - (roleNames[playerData.role].dailyEffect.health * cycles), 0),
                    morale: Math.max(playerData.morale - (roleNames[playerData.role].dailyEffect.morale * cycles), 0),
                    strength: Math.max(playerData.strength - (roleNames[playerData.role].dailyEffect.strength * cycles), 1),
                    intelligence: Math.max(playerData.intelligence - (roleNames[playerData.role].dailyEffect.intelligence * cycles), 1),
                    isWerewolf: false,
                    lastUpdated: Date.now()
                };

                // Vérifier la transformation en loup-garou
                const shouldTransform = calculateTransformationScore(playerData) >= 0.7;
                if (shouldTransform) {
                    updatedData.isWerewolf = true;
                    updatedData.strength = Math.min(playerData.strength + 5, 10);
                    updatedData.intelligence = Math.max(playerData.intelligence - 3, 1);
                    updatedData.health = Math.min(playerData.health + 20, 100);
                }

                await updateDoc('players', playerData.email, updatedData)
            }
        } catch (error) {
            console.log('[OTD phase] Couldnt update player', playerData.email, ' ERROR:', error.toString())
        }
    }

}

const goToNightPhase = () => {

}

const updateCycle = () => {
    const now = new Date();
    const minutes = now.getMinutes();
    phaseMinutes = minutes % 20;
    remainingMinutes = isDayPhase ? (9 - phaseMinutes) : (19 - phaseMinutes);
    remainingSeconds = 59 - now.getSeconds();

    if ((minutes % 20) < 10 && !isDayPhase)
        goToDayPhase()
    if ((minutes % 20) >= 10 && isDayPhase)
        goToNightPhase()

    isDayPhase = (minutes % 20) < 10;
};

let timetilNext10s = 10 - ((new Date()).getSeconds() % 10)
setTimeout(() => {
    updateCycle();
    const interval = setInterval(updateCycle, 10000);
}, timetilNext10s * 1000)






////////////////// FUNCTIONS //////////////

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

