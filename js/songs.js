/**
 * SONGS DATABASE / DATABASE CANZONI
 * ==================================
 *
 * Ogni canzone ha:
 * - Informazioni base (titolo, artista, difficoltà)
 * - Link Spotify
 * - Steps divisi con testo originale + traduzione
 * - Vocabolario chiave per ogni step
 * - Guide fonetiche
 */

export const songsDatabase = [
  // ==========================================
  // EASY / FACILE - Livello 0-1
  // ==========================================
  {
    id: 'happy',
    title: 'Happy',
    artist: 'Pharrell Williams',
    difficulty: 'easy',
    spotifyUrl: 'https://open.spotify.com/track/60nZcImufyMA1MKQY3dcCH',
    coverEmoji: '😊',
    description: 'Canzone positiva e semplice / Positive and simple song',
    steps: [
      {
        english: "It might seem crazy what I'm about to say",
        italian: 'Potrebbe sembrare pazzesco quello che sto per dire',
        vocabulary: [
          {
            word: 'crazy',
            pronunciation: '/ˈkreɪzi/',
            translation: 'pazzesco, folle',
            example: "That's crazy! = È pazzesco!",
          },
          {
            word: 'about to',
            pronunciation: '/əˈbaʊt tuː/',
            translation: 'sto per, sul punto di',
            example: "I'm about to leave = Sto per andarmene",
          },
          {
            word: 'say',
            pronunciation: '/seɪ/',
            translation: 'dire',
            example: 'What did you say? = Cosa hai detto?',
          },
        ],
        phonetics: [
          { text: 'It might seem', howTo: 'it MAIT siim', tip: "might rima con 'fight'" },
          { text: 'crazy', howTo: 'CREI-zi', tip: "la 'a' suona come 'ei'" },
          {
            text: 'about to say',
            howTo: 'a-BAUT tu sei',
            tip: "'about' ha il suono 'au' come in 'house'",
          },
        ],
      },
      {
        english: "Sunshine, she's here, you can take a break",
        italian: 'Sole, lei è qui, puoi prenderti una pausa',
        vocabulary: [
          {
            word: 'sunshine',
            pronunciation: '/ˈsʌnʃaɪn/',
            translation: 'luce del sole, raggio di sole',
            example: 'Good morning, sunshine! = Buongiorno, raggio di sole!',
          },
          {
            word: 'take a break',
            pronunciation: '/teɪk ə breɪk/',
            translation: 'fare una pausa',
            example: "Let's take a break = Facciamo una pausa",
          },
        ],
        phonetics: [
          {
            text: 'Sunshine',
            howTo: 'SAN-sciaain',
            tip: "'sun' come 'son' + 'shine' rima con 'mine'",
          },
          { text: "she's here", howTo: 'sciis HIIR', tip: "'here' rima con 'beer'" },
          { text: 'take a break', howTo: 'teik a breik', tip: "entrambe le 'a' suonano come 'ei'" },
        ],
      },
      {
        english: "I'm a hot air balloon that could go to space",
        italian: 'Sono una mongolfiera che potrebbe andare nello spazio',
        vocabulary: [
          {
            word: 'hot air balloon',
            pronunciation: '/hɒt eər bəˈluːn/',
            translation: 'mongolfiera',
            example: 'I want to ride a hot air balloon = Voglio volare in mongolfiera',
          },
          {
            word: 'space',
            pronunciation: '/speɪs/',
            translation: 'spazio',
            example: 'Astronauts go to space = Gli astronauti vanno nello spazio',
          },
        ],
        phonetics: [
          { text: "I'm a hot air", howTo: 'aim a HOT eer', tip: "'hot' rima con 'pot'" },
          { text: 'balloon', howTo: 'ba-LUUN', tip: "l'accento è sulla seconda sillaba" },
          { text: 'go to space', howTo: 'gou tu speis', tip: "'space' rima con 'place'" },
        ],
      },
      {
        english: "Because I'm happy, clap along if you feel like a room without a roof",
        italian: 'Perché sono felice, batti le mani se ti senti come una stanza senza tetto',
        vocabulary: [
          {
            word: 'happy',
            pronunciation: '/ˈhæpi/',
            translation: 'felice',
            example: "I'm so happy! = Sono così felice!",
          },
          {
            word: 'clap along',
            pronunciation: '/klæp əˈlɒŋ/',
            translation: 'batti le mani insieme',
            example: 'Clap along with the music = Batti le mani a tempo con la musica',
          },
          {
            word: 'feel like',
            pronunciation: '/fiːl laɪk/',
            translation: 'sentirsi come',
            example: 'I feel like dancing = Mi viene voglia di ballare',
          },
          {
            word: 'roof',
            pronunciation: '/ruːf/',
            translation: 'tetto',
            example: 'The cat is on the roof = Il gatto è sul tetto',
          },
        ],
        phonetics: [
          {
            text: "Because I'm happy",
            howTo: 'bi-COS aim HEPI',
            tip: "'happy' ha la 'a' breve come in 'cat'",
          },
          { text: 'clap along', howTo: 'clep a-LONG', tip: "'clap' rima con 'map'" },
          {
            text: 'room without a roof',
            howTo: 'ruum ui-DAUT a ruuf',
            tip: "notare come 'room' e 'roof' hanno lo stesso suono 'uu'",
          },
        ],
      },
      {
        english: 'Clap along if you feel like happiness is the truth',
        italian: 'Batti le mani se senti che la felicità è la verità',
        vocabulary: [
          {
            word: 'happiness',
            pronunciation: '/ˈhæpinəs/',
            translation: 'felicità',
            example: "Money can't buy happiness = I soldi non possono comprare la felicità",
          },
          {
            word: 'truth',
            pronunciation: '/truːθ/',
            translation: 'verità',
            example: 'Tell me the truth = Dimmi la verità',
          },
        ],
        phonetics: [
          { text: 'happiness', howTo: 'HE-pi-nes', tip: 'tre sillabe, accento sulla prima' },
          {
            text: 'is the truth',
            howTo: 'is de TRUUF',
            tip: "'truth' ha il suono 'th' come mettere la lingua tra i denti",
          },
        ],
      },
    ],
  },

  // ==========================================
  // MEDIUM / MEDIA - Livello 1-2
  // ==========================================
  {
    id: 'counting-stars',
    title: 'Counting Stars',
    artist: 'OneRepublic',
    difficulty: 'medium',
    spotifyUrl: 'https://open.spotify.com/track/2tpWsVSb9UEmDRxAl1zhX1',
    coverEmoji: '⭐',
    description: 'Ritmo orecchiabile, buona pronuncia / Catchy rhythm, good pronunciation',
    steps: [
      {
        english: "Lately, I've been, I've been losing sleep",
        italian: 'Ultimamente, ho perso il sonno',
        vocabulary: [
          {
            word: 'lately',
            pronunciation: '/ˈleɪtli/',
            translation: 'ultimamente',
            example: "Lately I've been busy = Ultimamente sono stato occupato",
          },
          {
            word: 'losing sleep',
            pronunciation: '/ˈluːzɪŋ sliːp/',
            translation: 'perdere il sonno',
            example: "I'm losing sleep over this = Perdo il sonno per questo",
          },
        ],
        phonetics: [
          { text: 'Lately', howTo: 'LEIT-li', tip: "'late' + 'ly', la 'a' suona 'ei'" },
          { text: "I've been", howTo: 'aiv biin', tip: "contrazione di 'I have been'" },
          { text: 'losing sleep', howTo: 'LUU-sing sliip', tip: "'losing' rima con 'choosing'" },
        ],
      },
      {
        english: 'Dreaming about the things that we could be',
        italian: 'Sognando le cose che potremmo essere',
        vocabulary: [
          {
            word: 'dreaming',
            pronunciation: '/ˈdriːmɪŋ/',
            translation: 'sognando',
            example: 'I was dreaming about you = Ti stavo sognando',
          },
          {
            word: 'could be',
            pronunciation: '/kʊd biː/',
            translation: 'potremmo essere',
            example: 'We could be friends = Potremmo essere amici',
          },
        ],
        phonetics: [
          { text: 'Dreaming about', howTo: 'DRII-ming a-baut', tip: "'dream' rima con 'team'" },
          { text: 'the things', howTo: 'de FINGS', tip: "'th' in 'things' è leggero" },
          { text: 'we could be', howTo: 'ui cud bii', tip: "'could' non si pronuncia la 'l'" },
        ],
      },
      {
        english: "Baby, I've been, I've been praying hard",
        italian: 'Baby, ho pregato tanto',
        vocabulary: [
          {
            word: 'praying',
            pronunciation: '/ˈpreɪɪŋ/',
            translation: 'pregando',
            example: "I'm praying for you = Prego per te",
          },
          {
            word: 'hard',
            pronunciation: '/hɑːd/',
            translation: 'tanto, duramente',
            example: 'Work hard = Lavora duro',
          },
        ],
        phonetics: [
          { text: 'Baby', howTo: 'BEI-bi', tip: 'come in italiano!' },
          { text: 'praying hard', howTo: 'PREI-ing haard', tip: "'pray' rima con 'day'" },
        ],
      },
      {
        english: "Said no more counting dollars, we'll be counting stars",
        italian: 'Ho detto basta contare dollari, conteremo le stelle',
        vocabulary: [
          {
            word: 'no more',
            pronunciation: '/nəʊ mɔːr/',
            translation: 'basta, non più',
            example: 'No more excuses = Basta scuse',
          },
          {
            word: 'counting',
            pronunciation: '/ˈkaʊntɪŋ/',
            translation: 'contando',
            example: "I'm counting to ten = Sto contando fino a dieci",
          },
          {
            word: 'dollars',
            pronunciation: '/ˈdɒlərz/',
            translation: 'dollari',
            example: 'Ten dollars = Dieci dollari',
          },
          {
            word: 'stars',
            pronunciation: '/stɑːrz/',
            translation: 'stelle',
            example: 'Look at the stars = Guarda le stelle',
          },
        ],
        phonetics: [
          { text: 'no more counting', howTo: 'nou moor CAUN-ting', tip: "'count' come 'mount'" },
          { text: 'dollars', howTo: 'DO-lers', tip: 'accento sulla prima sillaba' },
          {
            text: "we'll be counting stars",
            howTo: 'uil bi caun-ting staarz',
            tip: "'stars' rima con 'cars'",
          },
        ],
      },
      {
        english: 'I feel the love and I feel it burn',
        italian: "Sento l'amore e lo sento bruciare",
        vocabulary: [
          {
            word: 'feel',
            pronunciation: '/fiːl/',
            translation: 'sentire',
            example: 'I feel good = Mi sento bene',
          },
          {
            word: 'love',
            pronunciation: '/lʌv/',
            translation: 'amore',
            example: 'I love you = Ti amo',
          },
          {
            word: 'burn',
            pronunciation: '/bɜːn/',
            translation: 'bruciare',
            example: "Don't burn the food = Non bruciare il cibo",
          },
        ],
        phonetics: [
          { text: 'I feel the love', howTo: 'ai fiil de lav', tip: "'love' rima con 'dove'" },
          {
            text: 'and I feel it burn',
            howTo: 'end ai fiil it bern',
            tip: "'burn' rima con 'learn'",
          },
        ],
      },
    ],
  },

  // ==========================================
  // HARD / DIFFICILE - Livello 2-3
  // ==========================================
  {
    id: 'lose-yourself',
    title: 'Lose Yourself',
    artist: 'Eminem',
    difficulty: 'hard',
    spotifyUrl: 'https://open.spotify.com/track/5Z01UMMf7V1o0MzF86s6WJ',
    coverEmoji: '🎤',
    description:
      'Classico hip-hop, veloce ma molto educativo / Classic hip-hop, fast but very educational',
    steps: [
      {
        english: 'Look, if you had one shot, one opportunity',
        italian: "Guarda, se avessi un'occasione, un'opportunità",
        vocabulary: [
          {
            word: 'look',
            pronunciation: '/lʊk/',
            translation: 'guarda',
            example: 'Look at me = Guardami',
          },
          {
            word: 'shot',
            pronunciation: '/ʃɒt/',
            translation: 'occasione, colpo',
            example: 'Give it a shot = Provaci',
          },
          {
            word: 'opportunity',
            pronunciation: '/ˌɒpəˈtjuːnɪti/',
            translation: 'opportunità',
            example: 'This is a great opportunity = Questa è una grande opportunità',
          },
        ],
        phonetics: [
          { text: 'Look', howTo: 'luk', tip: "u breve, come 'book'" },
          { text: 'if you had', howTo: 'if iu hed', tip: "'had' rima con 'sad'" },
          { text: 'one shot', howTo: 'uan sciot', tip: "'shot' come 'shop' ma con 't'" },
          { text: 'opportunity', howTo: 'o-por-TIU-ni-ti', tip: "5 sillabe! accento su 'TIU'" },
        ],
      },
      {
        english: 'To seize everything you ever wanted, in one moment',
        italian: 'Per afferrare tutto ciò che hai sempre voluto, in un momento',
        vocabulary: [
          {
            word: 'seize',
            pronunciation: '/siːz/',
            translation: 'afferrare, cogliere',
            example: "Seize the day = Cogli l'attimo",
          },
          {
            word: 'everything',
            pronunciation: '/ˈevriθɪŋ/',
            translation: 'tutto',
            example: 'I want everything = Voglio tutto',
          },
          {
            word: 'moment',
            pronunciation: '/ˈməʊmənt/',
            translation: 'momento',
            example: 'Wait a moment = Aspetta un momento',
          },
        ],
        phonetics: [
          { text: 'To seize', howTo: 'tu SIIZ', tip: "'seize' si pronuncia come 'sees'" },
          { text: 'everything', howTo: 'EV-ri-fing', tip: "'every' + 'thing', 3 sillabe" },
          { text: 'you ever wanted', howTo: 'iu ever UONTED', tip: "'wanted' ha due sillabe" },
          { text: 'in one moment', howTo: 'in uan MOU-ment', tip: "'moment' accento sulla prima" },
        ],
      },
      {
        english: 'Would you capture it, or just let it slip?',
        italian: 'La cattureresti, o la lasceresti scappare?',
        vocabulary: [
          {
            word: 'capture',
            pronunciation: '/ˈkæptʃər/',
            translation: 'catturare',
            example: 'Capture the flag = Cattura la bandiera',
          },
          {
            word: 'let it slip',
            pronunciation: '/let ɪt slɪp/',
            translation: 'lasciarlo scappare',
            example: "Don't let it slip away = Non lasciarlo scappare",
          },
        ],
        phonetics: [
          {
            text: 'Would you capture it',
            howTo: 'uud iu KEP-cer it',
            tip: "'would' non si pronuncia la 'l'",
          },
          {
            text: 'or just let it slip',
            howTo: 'or giast let it slip',
            tip: "'slip' rima con 'ship'",
          },
        ],
      },
      {
        english: 'His palms are sweaty, knees weak, arms are heavy',
        italian: 'I suoi palmi sono sudati, ginocchia deboli, braccia pesanti',
        vocabulary: [
          {
            word: 'palms',
            pronunciation: '/pɑːmz/',
            translation: 'palmi delle mani',
            example: 'Clap your palms = Batti i palmi',
          },
          {
            word: 'sweaty',
            pronunciation: '/ˈsweti/',
            translation: 'sudato',
            example: "I'm sweaty after running = Sono sudato dopo la corsa",
          },
          {
            word: 'knees',
            pronunciation: '/niːz/',
            translation: 'ginocchia',
            example: 'My knees hurt = Mi fanno male le ginocchia',
          },
          {
            word: 'weak',
            pronunciation: '/wiːk/',
            translation: 'debole',
            example: 'I feel weak = Mi sento debole',
          },
          {
            word: 'heavy',
            pronunciation: '/ˈhevi/',
            translation: 'pesante',
            example: 'This bag is heavy = Questa borsa è pesante',
          },
        ],
        phonetics: [
          {
            text: 'His palms are sweaty',
            howTo: 'hiz PAAMZ ar SUETI',
            tip: "'palm' non si pronuncia la 'l'",
          },
          { text: 'knees weak', howTo: 'niiz uiik', tip: "'knees' non si pronuncia la 'k'" },
          { text: 'arms are heavy', howTo: 'aarmz ar HEVI', tip: "'heavy' rima con 'Chevy'" },
        ],
      },
      {
        english: "There's vomit on his sweater already, mom's spaghetti",
        italian: "C'è già vomito sul suo maglione, gli spaghetti della mamma",
        vocabulary: [
          {
            word: 'vomit',
            pronunciation: '/ˈvɒmɪt/',
            translation: 'vomito',
            example: 'I feel like I might vomit = Mi sento come se potessi vomitare',
          },
          {
            word: 'sweater',
            pronunciation: '/ˈswetər/',
            translation: 'maglione',
            example: 'Nice sweater! = Bel maglione!',
          },
          {
            word: 'already',
            pronunciation: '/ɔːlˈredi/',
            translation: 'già',
            example: "I'm already here = Sono già qui",
          },
          {
            word: 'spaghetti',
            pronunciation: '/spəˈɡeti/',
            translation: 'spaghetti',
            example: 'I love spaghetti! = Adoro gli spaghetti!',
          },
        ],
        phonetics: [
          { text: "There's vomit", howTo: 'ders VO-mit', tip: "'vomit' accento sulla prima" },
          { text: 'on his sweater', howTo: 'on hiz SUE-ter', tip: "'sweater' rima con 'better'" },
          { text: 'already', howTo: 'ol-RE-di', tip: "3 sillabe, accento su 're'" },
          { text: "mom's spaghetti", howTo: 'momz spa-GHE-ti', tip: 'la famosa frase meme! 😄' },
        ],
      },
    ],
  },

  {
    id: 'changes',
    title: 'Changes',
    artist: '2Pac',
    difficulty: 'hard',
    spotifyUrl: 'https://open.spotify.com/track/67khAZ8cHXgqPIIlsRaCB4',
    coverEmoji: '✊',
    description: 'Temi profondi, vocabolario ricco / Deep themes, rich vocabulary',
    steps: [
      {
        english: 'Come on, come on, I see no changes',
        italian: 'Dai, dai, non vedo cambiamenti',
        vocabulary: [
          {
            word: 'come on',
            pronunciation: '/kʌm ɒn/',
            translation: 'dai, andiamo',
            example: "Come on, let's go! = Dai, andiamo!",
          },
          {
            word: 'changes',
            pronunciation: '/ˈtʃeɪndʒɪz/',
            translation: 'cambiamenti',
            example: 'Big changes are coming = Grandi cambiamenti stanno arrivando',
          },
        ],
        phonetics: [
          { text: 'Come on', howTo: 'cam ON', tip: 'molto comune, impara bene!' },
          {
            text: 'I see no changes',
            howTo: 'ai sii nou CEIN-ges',
            tip: "'changes' ha due sillabe",
          },
        ],
      },
      {
        english: 'Wake up in the morning and I ask myself',
        italian: 'Mi sveglio al mattino e mi chiedo',
        vocabulary: [
          {
            word: 'wake up',
            pronunciation: '/weɪk ʌp/',
            translation: 'svegliarsi',
            example: 'I wake up at 7 = Mi sveglio alle 7',
          },
          {
            word: 'morning',
            pronunciation: '/ˈmɔːnɪŋ/',
            translation: 'mattino',
            example: 'Good morning! = Buongiorno!',
          },
          {
            word: 'ask myself',
            pronunciation: '/ɑːsk maɪˈself/',
            translation: 'chiedermi',
            example: 'I ask myself why = Mi chiedo perché',
          },
        ],
        phonetics: [
          { text: 'Wake up', howTo: 'ueik AP', tip: "'wake' rima con 'cake'" },
          { text: 'in the morning', howTo: 'in de MOR-ning', tip: "'morning' rima con 'warning'" },
          {
            text: 'I ask myself',
            howTo: 'ai ask mai-SELF',
            tip: "'ask' in americano la 'a' è corta",
          },
        ],
      },
      {
        english: 'Is life worth living, should I blast myself?',
        italian: 'Vale la pena vivere, dovrei spararmi?',
        vocabulary: [
          {
            word: 'life',
            pronunciation: '/laɪf/',
            translation: 'vita',
            example: 'Life is beautiful = La vita è bella',
          },
          {
            word: 'worth',
            pronunciation: '/wɜːθ/',
            translation: 'vale',
            example: "It's worth it = Ne vale la pena",
          },
          {
            word: 'living',
            pronunciation: '/ˈlɪvɪŋ/',
            translation: 'vivere',
            example: 'Living the dream = Vivere il sogno',
          },
          {
            word: 'blast',
            pronunciation: '/blɑːst/',
            translation: 'sparare/esplodere (slang)',
            example: 'Blast the music = Alza la musica al massimo',
          },
        ],
        phonetics: [
          {
            text: 'Is life worth living',
            howTo: 'is laif UERF li-ving',
            tip: "'worth' ha il suono 'th'",
          },
          {
            text: 'should I blast myself',
            howTo: 'scud ai blast mai-self',
            tip: "'should' non si pronuncia la 'l'",
          },
        ],
      },
      {
        english: "I'm tired of being poor and even worse I'm black",
        italian: 'Sono stanco di essere povero e ancora peggio sono nero',
        vocabulary: [
          {
            word: 'tired',
            pronunciation: '/ˈtaɪəd/',
            translation: 'stanco',
            example: "I'm so tired = Sono così stanco",
          },
          {
            word: 'poor',
            pronunciation: '/pɔːr/',
            translation: 'povero',
            example: 'Poor people = Gente povera',
          },
          {
            word: 'even worse',
            pronunciation: '/ˈiːvən wɜːs/',
            translation: 'ancora peggio',
            example: 'It got even worse = È peggiorato ancora',
          },
        ],
        phonetics: [
          { text: "I'm tired", howTo: 'aim TAIRD', tip: "'tired' una sillaba" },
          { text: 'of being poor', howTo: 'ov biing POOR', tip: "'poor' rima con 'door'" },
          { text: 'even worse', howTo: 'II-ven UERS', tip: "'worse' rima con 'nurse'" },
        ],
      },
      {
        english: "That's just the way it is, things will never be the same",
        italian: 'È proprio così che stanno le cose, non saranno mai più le stesse',
        vocabulary: [
          {
            word: 'the way it is',
            pronunciation: '/ðə weɪ ɪt ɪz/',
            translation: 'è così, così stanno le cose',
            example: "That's the way it is = È così",
          },
          {
            word: 'things',
            pronunciation: '/θɪŋz/',
            translation: 'cose',
            example: 'Good things take time = Le cose belle richiedono tempo',
          },
          {
            word: 'never',
            pronunciation: '/ˈnevər/',
            translation: 'mai',
            example: 'Never give up = Non arrenderti mai',
          },
          {
            word: 'the same',
            pronunciation: '/ðə seɪm/',
            translation: 'lo stesso',
            example: "It's all the same = È tutto uguale",
          },
        ],
        phonetics: [
          {
            text: "That's just the way it is",
            howTo: 'dets giast de UEI it is',
            tip: 'frase molto comune!',
          },
          {
            text: 'things will never be',
            howTo: 'fings uil NE-ver bii',
            tip: "'never' accento sulla prima",
          },
          { text: 'the same', howTo: 'de SEIM', tip: "'same' rima con 'game'" },
        ],
      },
    ],
  },
];

/**
 * Get all songs
 */
export function getAllSongs() {
  return songsDatabase;
}

/**
 * Get songs by difficulty
 */
export function getSongsByDifficulty(difficulty) {
  if (difficulty === 'all') return songsDatabase;
  return songsDatabase.filter((song) => song.difficulty === difficulty);
}

/**
 * Get a specific song by ID
 */
export function getSongById(id) {
  return songsDatabase.find((song) => song.id === id);
}

/**
 * Get total number of steps for a song
 */
export function getTotalSteps(songId) {
  const song = getSongById(songId);
  return song ? song.steps.length : 0;
}
