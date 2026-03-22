/**
 * VIDEO CLIPS DATABASE / DATABASE VIDEO CLIP
 * ===========================================
 *
 * Ogni video clip ha:
 * - Informazioni base (titolo, difficoltà, categoria)
 * - YouTube video ID reale
 * - Tempi di inizio/fine per il segmento
 * - Sottotitoli sincronizzati (inglese + italiano)
 * - Vocabolario chiave
 */

export const videoDatabase = [
  // ==========================================
  // EASY / FACILE
  // ==========================================
  {
    id: 'ted-power-of-introverts',
    title: 'The Power of Introverts',
    titleIt: 'Il Potere degli Introversi',
    youtubeId: 'c0KYU2j0TM4',
    startTime: 0,
    endTime: 60,
    difficulty: 'easy',
    category: 'ted',
    description: 'Susan Cain talks about the power of introverts in a world that values extroverts',
    descriptionIt:
      'Susan Cain parla del potere degli introversi in un mondo che valorizza gli estroversi',
    subtitles: [
      {
        time: 0,
        english: 'When I was nine years old, I went off to summer camp for the first time.',
        italian: 'Quando avevo nove anni, sono andata al campo estivo per la prima volta.',
      },
      {
        time: 7,
        english:
          'And my mom packed me a suitcase full of books, which to me seemed like a perfectly natural thing to do.',
        italian:
          'E mia madre mi ha preparato una valigia piena di libri, che a me sembrava una cosa perfettamente naturale.',
      },
      {
        time: 15,
        english: 'Because in my family, reading was the primary group activity.',
        italian: 'Perché nella mia famiglia, leggere era la principale attività di gruppo.',
      },
      {
        time: 21,
        english:
          'And this might sound antisocial to you, but for us it was really just a different way of being social.',
        italian:
          'E questo potrebbe sembrare antisociale, ma per noi era davvero solo un modo diverso di socializzare.',
      },
      {
        time: 29,
        english:
          'You have the coziness of your family sitting right next to you, but you are also free to go roaming around the adventureland inside your own mind.',
        italian:
          "Hai l'intimità della tua famiglia seduta accanto a te, ma sei anche libero di vagare nel mondo avventuroso della tua mente.",
      },
      {
        time: 40,
        english: 'And I had this idea that camp was going to be just like this, but better.',
        italian: "E avevo l'idea che il campo estivo sarebbe stato proprio così, ma migliore.",
      },
      {
        time: 47,
        english:
          'I had a vision of ten girls sitting in a cabin cozily reading books in their matching nightgowns.',
        italian:
          'Avevo la visione di dieci ragazze sedute in una capanna a leggere libri nei loro pigiami coordinati.',
      },
    ],
    vocabulary: [
      {
        english: 'suitcase',
        italian: 'valigia',
        pronunciation: '/ˈsuːtkeɪs/',
        example: 'I packed my suitcase for the trip.',
      },
      {
        english: 'antisocial',
        italian: 'antisociale',
        pronunciation: '/ˌæntɪˈsoʊʃəl/',
        example: "Reading alone isn't antisocial.",
      },
      {
        english: 'coziness',
        italian: 'intimità, accoglienza',
        pronunciation: '/ˈkoʊzinəs/',
        example: 'The coziness of home is comforting.',
      },
      {
        english: 'roaming',
        italian: 'vagare',
        pronunciation: '/ˈroʊmɪŋ/',
        example: 'We spent the day roaming around the city.',
      },
    ],
  },
  {
    id: 'bbc-greetings',
    title: 'English Greetings & Introductions',
    titleIt: 'Saluti e Presentazioni in Inglese',
    youtubeId: 'oW4JFNPGxjA',
    startTime: 0,
    endTime: 55,
    difficulty: 'easy',
    category: 'educational',
    description: 'Learn common English greetings and how to introduce yourself',
    descriptionIt: 'Impara i saluti comuni in inglese e come presentarti',
    subtitles: [
      {
        time: 0,
        english: "Hi! I'm going to teach you how to greet people in English.",
        italian: 'Ciao! Ti insegnerò come salutare le persone in inglese.',
      },
      {
        time: 5,
        english: 'The most common greeting is simply: Hello! or Hi!',
        italian: 'Il saluto più comune è semplicemente: Hello! o Hi!',
      },
      {
        time: 11,
        english: 'When you meet someone for the first time, you can say: Nice to meet you.',
        italian: 'Quando incontri qualcuno per la prima volta, puoi dire: Nice to meet you.',
      },
      {
        time: 18,
        english: "You can introduce yourself by saying: My name is... or I'm...",
        italian: "Puoi presentarti dicendo: My name is... oppure I'm...",
      },
      {
        time: 26,
        english:
          "A common question is: How are you? And the typical response is: I'm fine, thank you.",
        italian: "Una domanda comune è: How are you? E la risposta tipica è: I'm fine, thank you.",
      },
      {
        time: 35,
        english: "In informal situations, you can say: Hey! What's up? or How's it going?",
        italian: "In situazioni informali, puoi dire: Hey! What's up? o How's it going?",
      },
      {
        time: 44,
        english: 'When you leave, you can say: Goodbye, Bye, or See you later!',
        italian: 'Quando te ne vai, puoi dire: Goodbye, Bye, o See you later!',
      },
    ],
    vocabulary: [
      {
        english: 'greeting',
        italian: 'saluto',
        pronunciation: '/ˈɡriːtɪŋ/',
        example: 'A handshake is a common greeting.',
      },
      {
        english: 'introduce',
        italian: 'presentare',
        pronunciation: '/ˌɪntrəˈdjuːs/',
        example: 'Let me introduce myself.',
      },
      {
        english: 'informal',
        italian: 'informale',
        pronunciation: '/ɪnˈfɔːrməl/',
        example: 'The meeting was very informal.',
      },
    ],
  },
  {
    id: 'daily-routine-easy',
    title: 'My Daily Routine',
    titleIt: 'La Mia Routine Quotidiana',
    youtubeId: 'eGo4IYlbE5g',
    startTime: 0,
    endTime: 50,
    difficulty: 'easy',
    category: 'educational',
    description: 'Simple vocabulary about daily routines and habits',
    descriptionIt: 'Vocabolario semplice sulle routine quotidiane e abitudini',
    subtitles: [
      {
        time: 0,
        english: "Every morning I wake up at seven o'clock.",
        italian: 'Ogni mattina mi sveglio alle sette.',
      },
      {
        time: 5,
        english: 'First, I brush my teeth and take a shower.',
        italian: 'Prima, mi lavo i denti e faccio una doccia.',
      },
      {
        time: 11,
        english: 'Then I get dressed and have breakfast.',
        italian: 'Poi mi vesto e faccio colazione.',
      },
      {
        time: 17,
        english: 'I usually have coffee and toast for breakfast.',
        italian: 'Di solito prendo caffè e toast a colazione.',
      },
      {
        time: 23,
        english: 'After breakfast, I go to work by bus.',
        italian: 'Dopo colazione, vado al lavoro in autobus.',
      },
      {
        time: 30,
        english: 'I work from nine to five every day.',
        italian: 'Lavoro dalle nove alle cinque ogni giorno.',
      },
      {
        time: 36,
        english: 'In the evening, I cook dinner and watch TV.',
        italian: 'La sera, cucino la cena e guardo la TV.',
      },
      {
        time: 43,
        english: "I go to bed at eleven o'clock.",
        italian: 'Vado a dormire alle undici.',
      },
    ],
    vocabulary: [
      {
        english: 'wake up',
        italian: 'svegliarsi',
        pronunciation: '/weɪk ʌp/',
        example: 'I wake up early every day.',
      },
      {
        english: 'get dressed',
        italian: 'vestirsi',
        pronunciation: '/ɡɛt drɛst/',
        example: 'I get dressed after my shower.',
      },
      {
        english: 'breakfast',
        italian: 'colazione',
        pronunciation: '/ˈbrɛkfəst/',
        example: 'Breakfast is the most important meal.',
      },
    ],
  },

  // ==========================================
  // MEDIUM / MEDIA
  // ==========================================
  {
    id: 'ted-body-language',
    title: 'Your Body Language May Shape Who You Are',
    titleIt: 'Il Tuo Linguaggio del Corpo Può Definire Chi Sei',
    youtubeId: 'Ks-_Mh1QhMc',
    startTime: 0,
    endTime: 65,
    difficulty: 'medium',
    category: 'ted',
    description: 'Amy Cuddy explains how body language affects our confidence and success',
    descriptionIt:
      'Amy Cuddy spiega come il linguaggio del corpo influenza la nostra fiducia e il successo',
    subtitles: [
      {
        time: 0,
        english:
          'So I want to start by offering you a free, no-tech life hack, and all it requires of you is this:',
        italian:
          'Voglio iniziare offrendovi un trucchetto gratuito e senza tecnologia, e tutto quello che richiede è questo:',
      },
      {
        time: 9,
        english: 'that you change your posture for two minutes.',
        italian: 'che cambiate la vostra postura per due minuti.',
      },
      {
        time: 14,
        english:
          'But before I give it away, I want to ask you to right now do a little audit of your body.',
        italian:
          'Ma prima di svelarvelo, vorrei chiedervi di fare una piccola verifica del vostro corpo.',
      },
      {
        time: 22,
        english: 'So how many of you are sort of making yourselves smaller?',
        italian: 'Quanti di voi si stanno in qualche modo rimpicciolendo?',
      },
      {
        time: 27,
        english: "Maybe you're hunching, crossing your legs, maybe wrapping your ankles.",
        italian: 'Forse vi state incurvando, incrociando le gambe, forse avvolgendo le caviglie.',
      },
      {
        time: 34,
        english: 'Sometimes we hold onto our arms like this. Sometimes we spread out.',
        italian: 'A volte ci teniamo le braccia così. A volte ci allarghiamo.',
      },
      {
        time: 41,
        english: "I see you. So I want you to pay attention to what you're doing right now.",
        italian:
          'Vi vedo. Quindi vorrei che prestaste attenzione a quello che state facendo adesso.',
      },
      {
        time: 48,
        english:
          "We're going to come back to that in a few minutes, and I'm hoping that if you learn to tweak this a little bit,",
        italian:
          "Ci torneremo tra qualche minuto, e spero che se imparerete a modificare questo un po',",
      },
      {
        time: 56,
        english: 'it could significantly change the way your life unfolds.',
        italian: 'potrebbe cambiare significativamente il modo in cui la vostra vita si sviluppa.',
      },
    ],
    vocabulary: [
      {
        english: 'posture',
        italian: 'postura',
        pronunciation: '/ˈpɒstʃər/',
        example: 'Good posture shows confidence.',
      },
      {
        english: 'hunching',
        italian: 'incurvarsi',
        pronunciation: '/hʌntʃɪŋ/',
        example: 'Stop hunching over your computer.',
      },
      {
        english: 'tweak',
        italian: 'modificare, aggiustare',
        pronunciation: '/twiːk/',
        example: 'Just tweak it a little bit.',
      },
      {
        english: 'significantly',
        italian: 'significativamente',
        pronunciation: '/sɪɡˈnɪfɪkəntli/',
        example: 'The results improved significantly.',
      },
    ],
  },
  {
    id: 'ted-procrastination',
    title: 'Inside the Mind of a Master Procrastinator',
    titleIt: 'Dentro la Mente di un Maestro Procrastinatore',
    youtubeId: 'arj7oStGLkU',
    startTime: 0,
    endTime: 70,
    difficulty: 'medium',
    category: 'ted',
    description: 'Tim Urban humorously explains why procrastinators procrastinate',
    descriptionIt: 'Tim Urban spiega in modo umoristico perché i procrastinatori procrastinano',
    subtitles: [
      {
        time: 0,
        english:
          'So in college, I was a government major, which means I had to write a lot of papers.',
        italian:
          "All'università, studiavo scienze politiche, il che significa che dovevo scrivere molti articoli.",
      },
      {
        time: 8,
        english:
          'Now, when a normal person has to write a paper, the process is something like this.',
        italian:
          'Ora, quando una persona normale deve scrivere un articolo, il processo è qualcosa del genere.',
      },
      {
        time: 15,
        english:
          "You would start working on it a little bit at a time, and you'd get it done maybe the week before.",
        italian:
          "Inizieresti a lavorarci un po' alla volta, e lo finiresti forse la settimana prima.",
      },
      {
        time: 23,
        english: 'And that would look something like this.',
        italian: 'E sarebbe qualcosa del genere.',
      },
      {
        time: 27,
        english: 'And that plan would work great, except I had one little problem.',
        italian: 'E quel piano funzionerebbe alla grande, tranne che avevo un piccolo problema.',
      },
      {
        time: 33,
        english: 'Which is that this is not how my brain worked.',
        italian: 'E cioè che il mio cervello non funzionava così.',
      },
      {
        time: 38,
        english:
          'The paper would come along and I would plan to write it in little bits over the weeks.',
        italian:
          "L'articolo arrivava e io pianificavo di scriverlo poco alla volta nelle settimane.",
      },
      {
        time: 46,
        english: 'But then nothing would happen, and then suddenly the night before the deadline,',
        italian: 'Ma poi non succedeva nulla, e poi improvvisamente la notte prima della scadenza,',
      },
      {
        time: 53,
        english: "there'd be a huge rush of panic and activity.",
        italian: "c'era un'enorme ondata di panico e attività.",
      },
      {
        time: 59,
        english: "And I would pull an all-nighter, and then I'd turn the paper in.",
        italian: "E facevo una nottata in bianco, e poi consegnavo l'articolo.",
      },
    ],
    vocabulary: [
      {
        english: 'procrastinator',
        italian: 'procrastinatore',
        pronunciation: '/prəˈkræstɪneɪtər/',
        example: "I'm a terrible procrastinator.",
      },
      {
        english: 'deadline',
        italian: 'scadenza',
        pronunciation: '/ˈdɛdlaɪn/',
        example: 'The deadline is next Friday.',
      },
      {
        english: 'all-nighter',
        italian: 'nottata in bianco',
        pronunciation: '/ɔːl ˈnaɪtər/',
        example: 'I had to pull an all-nighter to finish.',
      },
      {
        english: 'rush',
        italian: 'fretta, ondata',
        pronunciation: '/rʌʃ/',
        example: 'There was a rush of activity before the exam.',
      },
    ],
  },
  {
    id: 'bbc-weather',
    title: 'Talking About the Weather',
    titleIt: 'Parlare del Tempo',
    youtubeId: '8PQ1Ga3w2G0',
    startTime: 0,
    endTime: 55,
    difficulty: 'medium',
    category: 'educational',
    description: 'Useful phrases and vocabulary for talking about the weather in English',
    descriptionIt: 'Frasi utili e vocabolario per parlare del tempo in inglese',
    subtitles: [
      {
        time: 0,
        english: 'The weather is one of the most common topics of conversation in English.',
        italian: 'Il tempo è uno degli argomenti di conversazione più comuni in inglese.',
      },
      {
        time: 7,
        english: 'We can describe weather using adjectives like sunny, cloudy, rainy, or windy.',
        italian:
          'Possiamo descrivere il tempo usando aggettivi come soleggiato, nuvoloso, piovoso o ventoso.',
      },
      {
        time: 15,
        english: "You might ask someone: What's the weather like today?",
        italian: "Potresti chiedere a qualcuno: Com'è il tempo oggi?",
      },
      {
        time: 21,
        english: "And they might respond: It's a beautiful day! The sun is shining.",
        italian: 'E potrebbero rispondere: È una bella giornata! Il sole splende.',
      },
      {
        time: 28,
        english: "Or on a bad day: It's pouring with rain. You'll need an umbrella.",
        italian: 'O in una brutta giornata: Piove a dirotto. Ti servirà un ombrello.',
      },
      {
        time: 36,
        english: "In winter, you might say: It's freezing outside! or It's below zero.",
        italian: 'In inverno, potresti dire: Si gela fuori! o Siamo sotto zero.',
      },
      {
        time: 44,
        english:
          'Temperature can be described as boiling hot, warm, cool, chilly, or freezing cold.',
        italian:
          'La temperatura può essere descritta come bollente, tiepida, fresca, freddina, o gelida.',
      },
    ],
    vocabulary: [
      {
        english: 'pouring',
        italian: 'piovere a dirotto',
        pronunciation: '/ˈpɔːrɪŋ/',
        example: "It's pouring with rain outside.",
      },
      {
        english: 'freezing',
        italian: 'gelido, gelando',
        pronunciation: '/ˈfriːzɪŋ/',
        example: "It's absolutely freezing today.",
      },
      {
        english: 'umbrella',
        italian: 'ombrello',
        pronunciation: '/ʌmˈbrɛlə/',
        example: "Don't forget your umbrella!",
      },
      {
        english: 'chilly',
        italian: 'freddino, freschetto',
        pronunciation: '/ˈtʃɪli/',
        example: "It's a bit chilly this morning.",
      },
    ],
  },
  {
    id: 'movie-forrest-gump',
    title: 'Life is Like a Box of Chocolates',
    titleIt: 'La Vita è Come una Scatola di Cioccolatini',
    youtubeId: 'CLYhFbEBOBo',
    startTime: 0,
    endTime: 45,
    difficulty: 'medium',
    category: 'movie',
    description: "Famous scene from Forrest Gump about life's unpredictability",
    descriptionIt: "Scena famosa di Forrest Gump sull'imprevedibilità della vita",
    subtitles: [
      {
        time: 0,
        english: 'Hello. My name is Forrest. Forrest Gump.',
        italian: 'Salve. Mi chiamo Forrest. Forrest Gump.',
      },
      {
        time: 6,
        english: 'Do you want a chocolate?',
        italian: 'Vuoi un cioccolatino?',
      },
      {
        time: 9,
        english: 'I could eat about a million and a half of these.',
        italian: 'Potrei mangiarne un milione e mezzo di questi.',
      },
      {
        time: 14,
        english: 'My mama always said life was like a box of chocolates.',
        italian: 'La mia mamma diceva sempre che la vita era come una scatola di cioccolatini.',
      },
      {
        time: 21,
        english: "You never know what you're gonna get.",
        italian: 'Non sai mai quello che ti capita.',
      },
      {
        time: 26,
        english:
          'Those must be comfortable shoes. I bet you could walk all day in shoes like that.',
        italian:
          'Devono essere scarpe comode. Scommetto che potresti camminare tutto il giorno con scarpe così.',
      },
      {
        time: 34,
        english:
          "I've worn lots of shoes. I bet if I think about it real hard, I could remember my first pair of shoes.",
        italian:
          'Ho indossato un sacco di scarpe. Scommetto che se ci penso bene, potrei ricordare il mio primo paio di scarpe.',
      },
    ],
    vocabulary: [
      {
        english: 'gonna',
        italian: 'going to (informale)',
        pronunciation: '/ˈɡɒnə/',
        example: "I'm gonna go now. (I'm going to go now.)",
      },
      {
        english: 'bet',
        italian: 'scommettere',
        pronunciation: '/bɛt/',
        example: 'I bet you can do it!',
      },
      {
        english: 'comfortable',
        italian: 'comodo/a',
        pronunciation: '/ˈkʌmftəbəl/',
        example: 'These shoes are very comfortable.',
      },
    ],
  },

  // ==========================================
  // HARD / DIFFICILE
  // ==========================================
  {
    id: 'ted-creativity',
    title: 'Do Schools Kill Creativity?',
    titleIt: 'Le Scuole Uccidono la Creatività?',
    youtubeId: 'iG9CE55wbtY',
    startTime: 0,
    endTime: 75,
    difficulty: 'hard',
    category: 'ted',
    description:
      'Sir Ken Robinson makes a witty case for rethinking education to nurture creativity',
    descriptionIt:
      "Sir Ken Robinson presenta un caso spiritoso per ripensare l'educazione per nutrire la creatività",
    subtitles: [
      {
        time: 0,
        english: 'Good morning. How are you?',
        italian: 'Buongiorno. Come state?',
      },
      {
        time: 4,
        english: "It's been great, hasn't it? I've been blown away by the whole thing.",
        italian: 'È stato fantastico, no? Sono rimasto sbalordito da tutto questo.',
      },
      {
        time: 10,
        english: "In fact, I'm leaving.",
        italian: 'In effetti, me ne vado.',
      },
      {
        time: 14,
        english: "There have been three themes running through the conference, haven't there,",
        italian: 'Ci sono stati tre temi che hanno attraversato la conferenza, non è vero,',
      },
      {
        time: 20,
        english: 'which are relevant to what I want to talk about.',
        italian: 'che sono rilevanti per quello di cui voglio parlare.',
      },
      {
        time: 25,
        english:
          "One is the extraordinary evidence of human creativity in all of the presentations that we've had.",
        italian:
          'Una è la straordinaria evidenza della creatività umana in tutte le presentazioni che abbiamo avuto.',
      },
      {
        time: 33,
        english: 'And the variety of it, and the range of it.',
        italian: 'E la varietà, e la portata.',
      },
      {
        time: 38,
        english:
          "The second is that it's put us in a place where we have no idea what's going to happen in terms of the future.",
        italian:
          'La seconda è che ci ha messo in una posizione in cui non abbiamo idea di cosa succederà in termini di futuro.',
      },
      {
        time: 47,
        english: 'No idea how this may play out.',
        italian: 'Nessuna idea di come questo possa svilupparsi.',
      },
      {
        time: 52,
        english:
          'I have an interest in education. Actually, what I find is, everybody has an interest in education.',
        italian:
          "Ho un interesse nell'educazione. In realtà, quello che trovo è che tutti hanno un interesse nell'educazione.",
      },
      {
        time: 60,
        english: "Don't you? I find this very interesting.",
        italian: 'Non è vero? Lo trovo molto interessante.',
      },
      {
        time: 64,
        english:
          "If you're at a dinner party, and you say you work in education, you can see the blood drain from their face.",
        italian:
          "Se sei a una cena, e dici che lavori nell'educazione, puoi vedere il sangue defluire dal loro viso.",
      },
    ],
    vocabulary: [
      {
        english: 'blown away',
        italian: 'sbalordito',
        pronunciation: '/bloʊn əˈweɪ/',
        example: 'I was blown away by the performance.',
      },
      {
        english: 'extraordinary',
        italian: 'straordinario',
        pronunciation: '/ɪkˈstrɔːrdəneri/',
        example: 'She has extraordinary talent.',
      },
      {
        english: 'play out',
        italian: 'svilupparsi, svolgersi',
        pronunciation: '/pleɪ aʊt/',
        example: "Let's see how this plays out.",
      },
      {
        english: 'drain',
        italian: 'defluire, svuotare',
        pronunciation: '/dreɪn/',
        example: 'The color drained from his face.',
      },
    ],
  },
  {
    id: 'ted-vulnerability',
    title: 'The Power of Vulnerability',
    titleIt: 'Il Potere della Vulnerabilità',
    youtubeId: 'iCvmsMzlF7o',
    startTime: 0,
    endTime: 70,
    difficulty: 'hard',
    category: 'ted',
    description: 'Brené Brown studies human connection and our ability to empathize and belong',
    descriptionIt:
      'Brené Brown studia la connessione umana e la nostra capacità di empatizzare e appartenere',
    subtitles: [
      {
        time: 0,
        english: "So I'll start with this: a couple of years ago, an event planner called me.",
        italian:
          "Inizierò con questo: un paio di anni fa, un'organizzatrice di eventi mi ha chiamato.",
      },
      {
        time: 8,
        english: 'Because I was going to do a speaking event.',
        italian: 'Perché dovevo fare un evento come relatrice.',
      },
      {
        time: 13,
        english:
          "And she called and she said, I'm really struggling with how to write about you on the little flyer.",
        italian:
          'E mi ha chiamato dicendo: sto davvero facendo fatica a scrivere di te sul piccolo volantino.',
      },
      {
        time: 22,
        english: "And I thought, well, what's the struggle?",
        italian: 'E ho pensato: beh, qual è il problema?',
      },
      {
        time: 26,
        english:
          "And she said, well, I saw you speak, and I'm going to call you a researcher, I think.",
        italian: 'E lei disse: ho visto il tuo intervento, e penso che ti chiamerò ricercatrice.',
      },
      {
        time: 34,
        english: "But I'm afraid if I call you a researcher, no one will come.",
        italian: 'Ma ho paura che se ti chiamo ricercatrice, non verrà nessuno.',
      },
      {
        time: 40,
        english: "Because they'll think you're boring and irrelevant.",
        italian: 'Perché penseranno che sei noiosa e irrilevante.',
      },
      {
        time: 45,
        english: 'And I thought, OK.',
        italian: 'E ho pensato, OK.',
      },
      {
        time: 49,
        english: "And she said, but the thing I liked about your talk is you're a storyteller.",
        italian:
          'E disse: ma la cosa che mi è piaciuta del tuo intervento è che sei una narratrice.',
      },
      {
        time: 56,
        english: "So I think what I'll do is just call you a storyteller.",
        italian: 'Quindi penso che ti chiamerò semplicemente una narratrice.',
      },
      {
        time: 62,
        english:
          "And of course, the academic insecure part of me was like, you're going to call me a what?",
        italian: 'E ovviamente, la parte accademica insicura di me faceva: mi chiamerai cosa?',
      },
    ],
    vocabulary: [
      {
        english: 'vulnerability',
        italian: 'vulnerabilità',
        pronunciation: '/ˌvʌlnərəˈbɪlɪti/',
        example: 'Vulnerability is the birthplace of connection.',
      },
      {
        english: 'struggling',
        italian: 'faticare, lottare',
        pronunciation: '/ˈstrʌɡlɪŋ/',
        example: "I'm struggling with this problem.",
      },
      {
        english: 'irrelevant',
        italian: 'irrilevante',
        pronunciation: '/ɪˈrɛlɪvənt/',
        example: 'That point is irrelevant to the discussion.',
      },
      {
        english: 'storyteller',
        italian: 'narratore/narratrice',
        pronunciation: '/ˈstɔːritelər/',
        example: 'She is a wonderful storyteller.',
      },
    ],
  },
  {
    id: 'news-technology',
    title: 'How AI is Changing the World',
    titleIt: "Come l'IA Sta Cambiando il Mondo",
    youtubeId: 'ad79nYk2keg',
    startTime: 0,
    endTime: 60,
    difficulty: 'hard',
    category: 'news',
    description: 'A news report about the impact of artificial intelligence on society',
    descriptionIt: "Un servizio sull'impatto dell'intelligenza artificiale sulla società",
    subtitles: [
      {
        time: 0,
        english: 'Artificial intelligence is transforming nearly every aspect of modern life.',
        italian:
          "L'intelligenza artificiale sta trasformando quasi ogni aspetto della vita moderna.",
      },
      {
        time: 7,
        english:
          'From healthcare to transportation, the technology is advancing at a remarkable pace.',
        italian: 'Dalla sanità ai trasporti, la tecnologia sta avanzando a un ritmo notevole.',
      },
      {
        time: 14,
        english:
          'Machine learning algorithms can now diagnose diseases with accuracy that rivals human doctors.',
        italian:
          "Gli algoritmi di apprendimento automatico possono ora diagnosticare malattie con un'accuratezza che rivaleggia con i medici umani.",
      },
      {
        time: 23,
        english: 'Self-driving cars are being tested on roads around the world.',
        italian: 'Le auto a guida autonoma vengono testate su strade di tutto il mondo.',
      },
      {
        time: 29,
        english:
          'But these advances also raise important questions about privacy, employment, and ethics.',
        italian:
          "Ma questi progressi sollevano anche importanti questioni sulla privacy, il lavoro e l'etica.",
      },
      {
        time: 37,
        english:
          'Many experts believe that millions of jobs could be displaced by automation in the coming decades.',
        italian:
          "Molti esperti credono che milioni di posti di lavoro potrebbero essere sostituiti dall'automazione nei prossimi decenni.",
      },
      {
        time: 46,
        english:
          'The challenge for society is to harness the benefits of this technology while mitigating its risks.',
        italian:
          'La sfida per la società è sfruttare i benefici di questa tecnologia mitigandone i rischi.',
      },
      {
        time: 54,
        english:
          'How we choose to regulate and deploy these systems will shape the future of humanity.',
        italian:
          "Il modo in cui scegliamo di regolamentare e implementare questi sistemi plasmerà il futuro dell'umanità.",
      },
    ],
    vocabulary: [
      {
        english: 'algorithm',
        italian: 'algoritmo',
        pronunciation: '/ˈælɡərɪðəm/',
        example: 'The algorithm processes millions of data points.',
      },
      {
        english: 'displaced',
        italian: 'spostato, sostituito',
        pronunciation: '/dɪsˈpleɪst/',
        example: 'Workers displaced by automation need retraining.',
      },
      {
        english: 'mitigating',
        italian: 'mitigare, attenuare',
        pronunciation: '/ˈmɪtɪɡeɪtɪŋ/',
        example: 'We need strategies for mitigating the risks.',
      },
      {
        english: 'harness',
        italian: 'sfruttare, imbrigliare',
        pronunciation: '/ˈhɑːrnɪs/',
        example: 'We must harness the power of technology.',
      },
    ],
  },
  {
    id: 'ted-motivation',
    title: 'The Puzzle of Motivation',
    titleIt: 'Il Puzzle della Motivazione',
    youtubeId: 'rrkrvAUbU9Y',
    startTime: 0,
    endTime: 65,
    difficulty: 'hard',
    category: 'ted',
    description:
      'Dan Pink examines the puzzle of motivation and challenges traditional reward systems',
    descriptionIt:
      'Dan Pink esamina il puzzle della motivazione e sfida i sistemi di ricompensa tradizionali',
    subtitles: [
      {
        time: 0,
        english: 'I need to make a confession at the start here.',
        italian: "Devo fare una confessione all'inizio.",
      },
      {
        time: 5,
        english: 'A little over twenty years ago, I did something that I regret.',
        italian: "Poco più di vent'anni fa, ho fatto qualcosa di cui mi pento.",
      },
      {
        time: 11,
        english: "Something that I'm not particularly proud of.",
        italian: 'Qualcosa di cui non sono particolarmente orgoglioso.',
      },
      {
        time: 15,
        english: 'Something that in many ways I wish no one would ever know.',
        italian: 'Qualcosa che per molti versi vorrei che nessuno sapesse mai.',
      },
      {
        time: 21,
        english: 'But here I feel kind of obliged to reveal.',
        italian: 'Ma qui mi sento in qualche modo obbligato a rivelare.',
      },
      {
        time: 26,
        english: 'In the late 1980s, in a moment of youthful indiscretion, I went to law school.',
        italian:
          "Alla fine degli anni '80, in un momento di indiscrezione giovanile, sono andato alla facoltà di legge.",
      },
      {
        time: 35,
        english:
          'In America, law is a professional degree. You get your university degree, then you go on to law school.',
        italian:
          'In America, legge è un titolo professionale. Prendi la laurea, poi vai alla facoltà di legge.',
      },
      {
        time: 44,
        english: "And when I got to law school, I didn't do very well.",
        italian: 'E quando sono arrivato alla facoltà di legge, non me la sono cavata molto bene.',
      },
      {
        time: 50,
        english:
          "To put it mildly, I didn't do very well. I, in fact, graduated in the part of my law school class",
        italian:
          'Per dirla gentilmente, non me la sono cavata molto bene. In effetti, mi sono laureato nella parte della mia classe',
      },
      {
        time: 58,
        english: 'that made the top ninety percent possible.',
        italian: 'che rendeva possibile il novanta percento superiore.',
      },
    ],
    vocabulary: [
      {
        english: 'confession',
        italian: 'confessione',
        pronunciation: '/kənˈfɛʃən/',
        example: 'I have a confession to make.',
      },
      {
        english: 'regret',
        italian: 'rimpiangere, pentirsi',
        pronunciation: '/rɪˈɡrɛt/',
        example: 'I regret not studying harder.',
      },
      {
        english: 'indiscretion',
        italian: 'indiscrezione',
        pronunciation: '/ˌɪndɪˈskrɛʃən/',
        example: 'A youthful indiscretion can be forgiven.',
      },
      {
        english: 'mildly',
        italian: 'delicatamente, gentilmente',
        pronunciation: '/ˈmaɪldli/',
        example: 'To put it mildly, it was a disaster.',
      },
    ],
  },
  {
    id: 'english-idioms',
    title: 'Common English Idioms Explained',
    titleIt: 'Modi di Dire Inglesi Comuni Spiegati',
    youtubeId: 'UMQMiJ7RDGU',
    startTime: 0,
    endTime: 60,
    difficulty: 'medium',
    category: 'educational',
    description: 'Learn frequently used English idioms and their meanings',
    descriptionIt: 'Impara i modi di dire inglesi più usati e i loro significati',
    subtitles: [
      {
        time: 0,
        english: "English is full of idioms, expressions that don't mean what they literally say.",
        italian:
          "L'inglese è pieno di modi di dire, espressioni che non significano quello che dicono letteralmente.",
      },
      {
        time: 8,
        english:
          "For example, if someone says it's raining cats and dogs, it just means it's raining very heavily.",
        italian:
          "Per esempio, se qualcuno dice it's raining cats and dogs, significa solo che piove molto forte.",
      },
      {
        time: 17,
        english: "When someone tells you to break a leg, they're actually wishing you good luck!",
        italian: 'Quando qualcuno ti dice break a leg, in realtà ti sta augurando buona fortuna!',
      },
      {
        time: 25,
        english: "If something costs an arm and a leg, it means it's very expensive.",
        italian: 'Se qualcosa costs an arm and a leg, significa che è molto costoso.',
      },
      {
        time: 32,
        english: 'To let the cat out of the bag means to reveal a secret accidentally.',
        italian: 'To let the cat out of the bag significa rivelare un segreto accidentalmente.',
      },
      {
        time: 40,
        english: "And when you're feeling under the weather, it means you're feeling a bit sick.",
        italian: "E quando ti senti under the weather, significa che ti senti un po' malato.",
      },
      {
        time: 48,
        english: 'Learning idioms will help you sound more natural when speaking English.',
        italian: 'Imparare i modi di dire ti aiuterà a sembrare più naturale quando parli inglese.',
      },
    ],
    vocabulary: [
      {
        english: 'idiom',
        italian: 'modo di dire',
        pronunciation: '/ˈɪdiəm/',
        example: 'English has thousands of idioms.',
      },
      {
        english: 'literally',
        italian: 'letteralmente',
        pronunciation: '/ˈlɪtərəli/',
        example: "Don't take it literally.",
      },
      {
        english: 'reveal',
        italian: 'rivelare',
        pronunciation: '/rɪˈviːl/',
        example: 'She revealed the surprise too early.',
      },
      {
        english: 'accidentally',
        italian: 'accidentalmente',
        pronunciation: '/ˌæksɪˈdɛntəli/',
        example: 'I accidentally deleted the file.',
      },
    ],
  },
];

/**
 * Get a video by its ID
 * @param {string} videoId
 * @returns {Object|null}
 */
export function getVideoById(videoId) {
  return videoDatabase.find((v) => v.id === videoId) || null;
}

/**
 * Get videos filtered by difficulty
 * @param {string} difficulty - 'easy', 'medium', or 'hard'
 * @returns {Array}
 */
export function getVideosByDifficulty(difficulty) {
  return videoDatabase.filter((v) => v.difficulty === difficulty);
}

/**
 * Get videos filtered by category
 * @param {string} category - 'ted', 'movie', 'music', 'news', 'educational'
 * @returns {Array}
 */
export function getVideosByCategory(category) {
  return videoDatabase.filter((v) => v.category === category);
}
