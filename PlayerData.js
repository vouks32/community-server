
export const roleNames = {
    policeman: {
      nom: 'Policier',
      defaultHealth: 85,
      defaultMorale: 70,
      defaultForce: 7,
      defaultIntelligence: 8,
      defaultMoney: 400000,
      defaultSalary: 5000, 
      dailyEffect: {
        health: -5,
        morale: -10,
        strength: -1,
        intelligence: -1
      },
      introMessage: [
        "🍩Tu es un policier bien gras avec un gros ventre",
        "🕵️‍♂️Ton Job est de trouver des crimes au sein des citoyens de la communauté",
        "🔍Lorsque tu selectionne un autre joueur tu pouras mener des investigations sur lui",
        "🤑Si tes investigations sont fructueuse tu touche une prime et tu monte en experience",
        "💸Ton salaire de base est de 5 000 CFA/jours",
      ]
    },
    professor: {
      nom: 'Professeur',
      defaultHealth: 80,
      defaultMorale: 75,
      defaultForce: 5,
      defaultIntelligence: 9,
      defaultMoney: 200000,
      defaultSalary: 4000, 
      dailyEffect: {
        health: -5,
        morale: -15,
        strength: -1,
        intelligence: 0
      },
      introMessage: [
        "👨‍🏫Tu es un proffesseur",
        "📖Ton Job est d'apprendre des choses aux citoyens de la communauté, on aura toujour besoin de toi",
        "🗣️Fait la promotion de tes services dans le chat et clique sur un joueur pour lui proposer une formation",
        "🤑Si tu forme quelqu'un,  tu touche une prime et tu monte en experience",
        "💸Ton salaire de base est de 4 000 CFA/jours",
      ]
    },
    driver: {
      nom: 'Chauffeur',
      defaultHealth: 85,
      defaultMorale: 65,
      defaultForce: 6,
      defaultIntelligence: 7,
      defaultMoney: 250000,
      defaultSalary: 3000, 
      dailyEffect: {
        health: -5,
        morale: -10,
        strength: -2,
        intelligence: -1
      },
      introMessage: [
        "🚕Tu es un Chauffeur (taxi, privé, etc...)",
        "🚗Ton Job est conduire les citoyens/marchandise de la communauté",
        "🗣️Fait la promotion de tes services dans le chat et clique sur un joueur pour lui proposer une formation",
        "🤑Si tu fait une balade à quelqu'un,  tu touche une prime et tu monte en experience",
        "💸Ton salaire de base est de 3 000 CFA/jours",
      ]
    },
    thief: {
      nom: 'Voleur',
      defaultHealth: 75,
      defaultMorale: 60,
      defaultForce: 8,
      defaultIntelligence: 7,
      defaultMoney: 250000,
      defaultSalary: 0, 
      dailyEffect: {
        health: -3,
        morale: -5,
        strength: 0,
        intelligence: 0
      },
      introMessage: [
        "🦹Tu es un bon petit voleur rusé et discret",
        "💰Ton Job est de voler de l'argent et des objets aux autres citoyens",
        "👀Tu dois te méfier des policiers qui pourraient te prendre sur le fait",
        "🤑Si tu réussis un vol, tu gagnes un bonus et de l'expérience",
        "⚠️Attention, si tu te fais attraper, tu risques la prison!"
      ]
    },
    assassin: {
      nom: 'Assassin',
      defaultHealth: 90,
      defaultMorale: 50,
      defaultForce: 9,
      defaultIntelligence: 6,
      defaultMoney: 300000,
      defaultSalary: 0, 
      dailyEffect: {
        health: -10,
        morale: -20,
        strength: 1,
        intelligence: 0
      },
      introMessage: [
        "🔪Tu es un assassin impitoyable",
        "🎯Ton Job est d'éliminer les cibles qui te sont assignées",
        "👁️Tu dois rester discret et éviter les regards indiscrets",
        "💀Chaque mission réussie te rapporte un gros bonus",
        "☠️Mais attention, un échec pourrait te coûter la vie..."
      ]
    },
    doctor: {
      nom: 'Docteur',
      defaultHealth: 90,
      defaultMorale: 80,
      defaultForce: 5,
      defaultIntelligence: 8,
      defaultMoney: 250000,
      defaultSalary: 6000, 
      dailyEffect: {
        health: 0,
        morale: -5,
        strength: -1,
        intelligence: 1
      },
      introMessage: [
        "🏥Tu es un docteur dévoué à tes patients",
        "💉Ton Job est de soigner les citoyens blessés ou malades",
        "🩺Propose tes services dans le chat et clique sur un joueur pour le soigner",
        "🤑Chaque soin réussi te rapporte un bonus et de l'expérience",
        "💸Ton salaire de base est de 6 000 CFA/jours"
      ]
    },
    mayor: {
      nom: 'Maire',
      defaultHealth: 85,
      defaultMorale: 85,
      defaultForce: 5,
      defaultIntelligence: 10,
      defaultMoney: 350000,
      defaultSalary: 10000, 
      dailyEffect: {
        health: -3,
        morale: -15,
        strength: -1,
        intelligence: 1
      },
      introMessage: [
        "🏛️Tu es le Maire de la ville",
        "📜Ton Job est de prendre des décisions importantes pour la communauté",
        "⚖️Tu dois maintenir l'ordre et la justice dans la ville",
        "💰Tu perçois un salaire élevé mais beaucoup de responsabilités",
        "💸Ton salaire de base est de 10 000 CFA/jours"
      ]
    },
    lawyer: {
      nom: 'Avocat',
      defaultHealth: 80,
      defaultMorale: 80,
      defaultForce: 5,
      defaultIntelligence: 8,
      defaultMoney: 300000,
      defaultSalary: 5000, 
      dailyEffect: {
        health: -5,
        morale: -10,
        strength: -1,
        intelligence: 1
      },
      introMessage: [
        "⚖️Tu es un avocat renommé",
        "📝Ton Job est de défendre les citoyens en justice",
        "🗣️Propose tes services dans le chat et clique sur un joueur pour le défendre",
        "🤑Chaque victoire en justice te rapporte un bonus",
        "💸Ton salaire de base est de 5 000 CFA/jours"
      ]
    },
    storekeeper: {
      nom: 'Magasinier',
      defaultHealth: 85,
      defaultMorale: 70,
      defaultForce: 6,
      defaultIntelligence: 7,
      defaultMoney: 200000,
      defaultSalary: 3500, 
      dailyEffect: {
        health: -5,
        morale: -5,
        strength: 0,
        intelligence: 0
      },
      introMessage: [
        "🛒Tu es un magasinier travailleur",
        "🏪Ton Job est de gérer ton magasin et vendre des produits",
        "💰Achète et vends des marchandises pour faire des profits",
        "🤑Plus ton magasin est réputé, plus tu fais de bénéfices",
        "💸Ton salaire de base est de 3 500 CFA/jours"
      ]
    },
    wizard: {
      nom: 'Sorcier',
      defaultHealth: 75,
      defaultMorale: 65,
      defaultForce: 4,
      defaultIntelligence: 8,
      defaultMoney: 280000,
      defaultSalary: 0, 
      dailyEffect: {
        health: -10,
        morale: -5,
        strength: -1,
        intelligence: 2
      },
      introMessage: [
        "🔮Tu es un sorcier tout droit sorti du village",
        "✨Ton Job est de pratiquer la magie et aider (ou nuire) aux citoyens",
        "🧙‍♂️Tu peux jeter des sorts puissants sur les autres jouers mais ils ont un coût",
        "💫Utilise ta magie avec sagesse car elle peut se retourner contre toi",
        "⚠️La magie n'est pas un jeu, sois prudent!"
      ]
    }
  };