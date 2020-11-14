const dynamoDb = require('./libs/dynamodb-lib');

var allData = [
  {
            itemType: "audio",
      origin: "Dragon Ball Z",
      id: "pYnLO7MVKno",
      title: "Cha La Head Cha La",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
            itemType: "audio",
      origin: "Pokemon",
      id: "JuYeHPFR3f0",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
            itemType: "audio",
      origin: "Code Lyoko",
      id: "GvY-yWWlpgw",
      title: "Un Monde Sans Danger",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
            itemType: "audio",
      origin: "Totally Spies",
      id: "7-h8CEZPvBM",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
    itemType: "audio",
      origin: "Olive et Tom",
      id: "D9vEj5z_hD4",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
            itemType: "audio",
      origin: "Titeuf",
      id: "LRwA3Y5xiRU",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
            itemType: "audio",
      origin: "Marcelino Pan Y Vino",
      id: "_Pi8vDNpeRY",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
            itemType: "audio",
      origin: "Titi et Grosminet menent l'enquete",
      id: "iteNiJUYhvg",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
            itemType: "audio",
      origin: "Les Ratz",
      id: "sBfimllcI7Q",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
            itemType: "audio",
      origin: "Oggy et les Cafards",
      id: "2apJXX46ce0",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
            itemType: "audio",
      origin: "Bonne Nuit Les Petits",
      id: "4UNkj-AsZRs",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
            itemType: "audio",
      origin: "Les Aventures de Tintin",
      id: "zb-9TIr31i0",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Priscilla",
            itemType: "audio",
      origin: "Kim Possible",
      id: "9zru1EMVLKI",
      title: "Mission Kim Possible",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
            itemType: "audio",
      origin: "Les Nouvelles Aventures de Lucky Luke",
      id: "pxH9ejIYAlg",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
            itemType: "audio",
      origin: "La Panthere Rose",
      id: "9OPc7MRm4Y8",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
            itemType: "audio",
      origin: "Avatar le Dernier Maitre de l'Air",
      id: "BGycFj-V3x4",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
            itemType: "audio",
      origin: "Franklin",
      id: "nlqyE-lWqCE",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
            itemType: "audio",
      origin: "Princesse Sarah",
      id: "IVpcoJxOBIc",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
            itemType: "audio",
      origin: "Les Mysterieuses Cites d'Or",
      id: "9w_zn3uRwPU",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
            itemType: "audio",
      origin: "Capitaine Flam",
      id: "m4-89PqmsOU",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
            itemType: "audio",
      origin: "Jayce et les Conquerants de la Lumiere",
      id: "l-2nVUzNdRQ",
      time: 60,
      from: 0,
      answerTime: 30
  },
  {
            itemType: "audio",
      origin: "Il etait une fois... L'Homme",
      id: "7QmtVq1FLlw",
      title: "Toccata and Fugue",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
            itemType: "audio",
      origin: "Les Razmokets",
      id: "DUBudt7vQFc",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
            itemType: "audio",
      origin: "Teletubbies",
      id: "5ZCgbGgA-_8",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
            itemType: "audio",
      origin: "Power Rangers",
      id: "9-bqOz9WriQ",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
            itemType: "audio",
      origin: "Beyblade",
      id: "N74cnBa_Bmc",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
            itemType: "audio",
      origin: "Marsupilami",
      id: "xQ7MoJG8GJQ",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
            itemType: "audio",
      origin: "Saint Seiya",
      id: "ofwE8oaS5QY",
      title: "Pegasus Fantasy",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
            itemType: "audio",
      origin: "Naruto",
      id: "y2juBsz78gw",
      title: "Kanashimi Wo Yasashisa Ni",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "The All-American Rejects",
            itemType: "audio",
      id: "uxUATkpMQ8A",
      title: "Gives You Hell",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Britney Spears",
            itemType: "audio",
      id: "LOZuxwVk7TU",
      title: "Toxic",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Coolio",
            itemType: "audio",
      id: "fPO76Jlnz6c",
      title: "Gangsta's Paradise",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Adele",
            itemType: "audio",
      id: "rYEDA3JcQqw",
      title: "Rolling in the Deep",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Miley Cyrus",
            itemType: "audio",
      id: "M11SvDtPBhA",
      title: "Party In The U.S.A",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Basshunter",
            itemType: "audio",
      id: "IgFwiCApH7E",
      title: "Now You're Gone",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Taio Cruz",
            itemType: "audio",
      id: "Vysgv7qVYTo",
      title: "Dynamite",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Bon Jovi",
            itemType: "audio",
      id: "vx2u5uUu3DE",
      title: "It's My Life",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Europe",
            itemType: "audio",
      id: "9jK-NcRmVcw",
      title: "The Final Countdown",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "AC/DC",
            itemType: "audio",
      id: "l482T0yNkeo",
      title: "Highway To Hell",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Hoobastank",
            itemType: "audio",
      id: "fV4DiAyExN0",
      title: "The Reason",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Queen",
            itemType: "audio",
      id: "t99KH0TR-J4",
      title: "The Show Must Go On",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Joan Jett and The Blackhearts",
            itemType: "audio",
      id: "xL5spALs-eA",
      title: "I Love Rock n' Roll",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Twisted Sister",
            itemType: "audio",
      id: "SRwrg0db_zY",
      title: "I wanna Rock",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "KISS",
            itemType: "audio",
      id: "zlSFmotba2I",
      title: "I Was Made For Loving You",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Deep Purple",
            itemType: "audio",
      id: "zUwEIt9ez7M",
      title: "Smoke On The Water",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "John Newman",
            itemType: "audio",
      id: "CfihYWRWRTQ",
      title: "Love Me Again",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Calvin Harris",
            itemType: "audio",
      id: "ebXbLfLACGM",
      title: "Summer",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Snoop Dogg ft. the Doors",
            itemType: "audio",
      id: "y_z-adsJjmE",
      title: "Riders On The Storm",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Bonnie Tyler",
            itemType: "audio",
      id: "OBwS66EBUcY",
      title: "I Need A Hero",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Joe Esposito",
            itemType: "audio",
      id: "3jYcW1nEsGk",
      title: "You're The Best Around",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Kim Wilde",
            itemType: "audio",
      id: "r_GH6M7cUq4",
      title: "Kids In America",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "U2",
            itemType: "audio",
      id: "ftjEcrrf7r0",
      title: "One",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "I'm So Excited",
            itemType: "audio",
      id: "rQqwG_rQx7A",
      title: "The Pointer Sisters",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "50 Cent",
            itemType: "audio",
      id: "5qm8PH4xAss",
      title: "In Da Club",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Maroon 5",
            itemType: "audio",
      id: "iEPTlhBmwRg",
      title: "Moves Like Jagger",
      time: 90,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Pitbull ft. Chris Brown",
            itemType: "audio",
      id: "CdXesX6mYUE",
      title: "International Love",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Inna",
            itemType: "audio",
      id: "YjSUSPzJiAU",
      title: "Sun is Up",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "K'NAAN",
            itemType: "audio",
      id: "WTJSt4wP2ME",
      title: "Wavin' Flag",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
            itemType: "audio",
      origin: "Indianna Jones",
      id: "-bTpp8PQSog",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
            itemType: "audio",
      origin: "Rocky",
      id: "I33u_EHLI3w",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
            itemType: "audio",
      origin: "Austin Powers",
      id: "90h2gLgTz5g",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
            itemType: "audio",
      origin: "Castlevania 2",
      id: "e2oZtvjg5oA",
      title: "Bloody Tears",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
            itemType: "audio",
      origin: "Final Fantasy VI",
      id: "jjgwVSDAmP4",
      title: "Terra",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
            itemType: "audio",
      origin: "The Legend of Zelda",
      id: "cGufy1PAeTU",
      title: "Main Theme",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
            itemType: "audio",
      origin: "Super Metroid",
      id: "6o4N-vNt1MQ",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
            itemType: "audio",
      origin: "Sonic",
      id: "y-78CMKME4o",
      title: "Green Hill Zone",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
            itemType: "audio",
      origin: "Mario Kart 64",
      id: "G2vA6Dngzhs",
      title: "Rainbow Road",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
            itemType: "audio",
      origin: "Super Mario Galaxy",
      id: "49pOiyZYWBQ",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
            itemType: "audio",
      origin: "Portal",
      id: "Y6ljFaKRTrI",
      title: "Still Alive",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
            itemType: "audio",
      origin: "Super Street Fighter 2",
      id: "jLJLyneZGKc",
      title: "Guile's Stage",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
            itemType: "audio",
      origin: "GTA : Vice City",
      id: "F2_pg8xd1To",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
            itemType: "audio",
      origin: "Goldeneye 007",
      id: "OQ0nDBHPUfQ",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
            itemType: "audio",
      origin: "Mortal Kombat",
      id: "EAwWPadFsOA",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
            itemType: "audio",
      origin: "Star Fox 64",
      id: "-GjdmkjOI7w",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
            itemType: "audio",
      origin: "Final Fantasy VII",
      id: "t7wJ8pE2qKU",
      title: "One Winged Angel",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
            itemType: "audio",
      origin: "Final Fantasy X",
      id: "CVfLTGgDem0",
      title: "Otherworld",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
            itemType: "audio",
      origin: "Okami",
      id: "ya3yxTbkh5s",
      title: "The Sun Rises",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
            itemType: "audio",
      origin: "Tetris",
      id: "9Fv5cuYZFC0",
      title: "itemType A",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
            itemType: "audio",
      origin: "F-Zero",
      id: "XBuXfcFKAlo",
      title: "Mute City",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
            itemType: "audio",
      origin: "Doom",
      id: "j05hzwQf8pA",
      title: "At Doom's Gate",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
            itemType: "audio",
      origin: "Wathammer 40k : Dawn of War",
      id: "BG42F-5AVOE",
      title: "Space Marine Theme",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
            itemType: "audio",
      origin: "Hearthstone",
      id: "yF7gWy4N54E",
      title: "Duel Theme",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
            itemType: "audio",
      origin: "Super Meat Boy",
      id: "6aZSwE3_vz0",
      title: "Hospital Theme",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
            itemType: "audio",
      origin: "Tomb Raider",
      id: "QWQ4U3vG7n8",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
            itemType: "audio",
      origin: "Need for Speed : Underground 2",
      id: "0VAF-4Er7_A",
      title: "Riders on the Storm",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
            itemType: "audio",
      origin: "American Beauty",
      id: "al21Vtlsg4A",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Luz Casal",
            itemType: "audio",
      origin: "Talons Aiguilles",
      id: "8qcSJcvKrxc",
      title: "Piensa en me",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
            itemType: "audio",
      origin: "Les Demoiselles De Rochefort",
      id: "uopjMuYY3F8&list=PL75CED282AF0B14EA",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Trust",
            itemType: "audio",
      id: "WfD8Dnh2xho",
      title: "Antisocial",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Notre Dame de Paris",
            itemType: "audio",
      id: "-XB7aftz6zY",
      title: "Belle",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Debut de Soiree",
            itemType: "audio",
      id: "JLNb0JthJ6Q",
      title: "Nuit de Folie",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Francky Vincent",
            itemType: "audio",
      id: "E9xE7UfYeac",
      title: "Alice ca Glisse",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Khaled",
            itemType: "audio",
      id: "5dWeeUIZFgA",
      title: "C'est La Vie",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Yelle",
            itemType: "audio",
      id: "Y99UqvgCmE8",
      title: "Je Veux Te Voir",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Lagaf'",
            itemType: "audio",
      id: "mKSk-3yiVx0",
      title: "Bo le Lavabo",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "IAM",
            itemType: "audio",
      id: "7ceNf9qJjgc",
      title: "Je Danse Le Mia",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Alizee",
            itemType: "audio",
      id: "P3uhPQZpjFg",
      title: "Moi Lolita",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Chimene Badi",
            itemType: "audio",
      id: "-kDSn9-1GDw",
      title: "Je Viens Du Sud",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "LAAM",
            itemType: "audio",
      id: "qyTZLkDsFpY",
      title: "Je Veux Chanter Pour Ceux",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Johnny Hallyday",
            itemType: "audio",
      id: "s3O1Xro7oAI",
      title: "Allumer le Feu",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Sheryfa Luna",
            itemType: "audio",
      id: "vGxOs9OrLYk",
      title: "Il Avait Les Mots",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Jena Lee",
            itemType: "audio",
      id: "_T2cU0TA9hE",
      title: "J'aimerais Tellement",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "BB Brunes",
            itemType: "audio",
      id: "X3VNRVo7irM",
      title: "Dis-Moi",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Zazie",
            itemType: "audio",
      id: "tB-zasOL29Y",
      title: "Je Suis un Homme",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Mickey 3D",
            itemType: "audio",
      id: "Iwb6u1Jo1Mc",
      title: "Respire",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Casseurs Flowters",
            itemType: "audio",
      id: "yBwtAySu7Mg",
      title: "Des Histoires A Raconter",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Renaud",
            itemType: "audio",
      id: "uv37yxc51bE",
      title: "Toujours Debout",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Jacques Dutronc",
            itemType: "audio",
      id: "L_ADZYCUkDA",
      title: "L'Opportuniste",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Garou - Celine Dion",
            itemType: "audio",
      id: "PCuJguybz5Y",
      title: "Sous le vent",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Vanessa Paradis",
            itemType: "audio",
      id: "9Z-NbQvhzKM",
      title: "La Seine",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Liza Monet",
            itemType: "audio",
      id: "qUXaUtYrDpE",
      title: "My Best Plan",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Helene Segara",
            itemType: "audio",
      id: "6Pes0BQgQNY",
      title: "On n'oublie jamais rien, on vit avec",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Niagara",
            itemType: "audio",
      id: "lSQ-6xU8mPA",
      title: "Je dois m'en aller",
      time: 30,
      from: 0,
      answerTime: 30
  },
  {
      artist: "Francis Cabrel",
            itemType: "audio",
      id: "m1ET6SEtwbc",
      title: "La corrida",
      time: 30,
      from: 0,
      answerTime: 30
  }
];

allData.forEach(async (item) => {
    
  const params = {
    TableName: "quizz-o-tron-items",
    // 'Item' contains the attributes of the item to be created
    // - 'userId': user identities are federated through the
    //             Cognito Identity Pool, we will use the identity id
    //             as the user id of the authenticated user
    // - 'noteId': a unique uuid
    // - 'content': parsed from request body
    // - 'attachment': parsed from request body
    // - 'createdAt': current Unix timestamp
    Item: item
  };

  await dynamoDb.put(params, (error, data) => {
    // Set response headers to enable CORS (Cross-Origin Resource Sharing)
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    };

    // Return status code 500 on error
    
  });
})
