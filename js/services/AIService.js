/**
 * AI CONVERSATION SERVICE - Knowledge AIO
 * ========================================
 *
 * Rule-based conversation engine with predefined conversation trees.
 * No external API required - all logic is client-side.
 *
 * Features:
 *   - 10 conversation scenarios with bilingual names
 *   - Pattern matching for user responses (keywords, regex)
 *   - Multiple response paths per turn
 *   - Grammar correction hints for common Italian-speaker mistakes
 *   - Vocabulary suggestions per turn
 *   - Gentle redirect for unrecognized input
 */

/**
 * Common grammar mistakes Italian speakers make in English.
 * Each rule has a pattern to detect and a correction suggestion.
 */
const GRAMMAR_RULES = [
  {
    pattern: /\bi have (\d+) years?\b/i,
    correction: 'I am $1 years old',
    hint: '"I have X years" is Italian (Ho X anni). In English, say "I am X years old".',
  },
  {
    pattern: /\bi am agree\b/i,
    correction: 'I agree',
    hint: 'Don\'t use "am" with "agree". Just say "I agree".',
  },
  {
    pattern: /\bhe go\b/i,
    correction: 'he goes',
    hint: 'Third person singular needs -s/-es: "he goes", not "he go".',
  },
  {
    pattern: /\bshe go\b/i,
    correction: 'she goes',
    hint: 'Third person singular needs -s/-es: "she goes", not "she go".',
  },
  {
    pattern: /\bit go\b/i,
    correction: 'it goes',
    hint: 'Third person singular needs -s/-es: "it goes", not "it go".',
  },
  {
    pattern: /\bhe have\b/i,
    correction: 'he has',
    hint: 'Third person singular: "he has", not "he have".',
  },
  {
    pattern: /\bshe have\b/i,
    correction: 'she has',
    hint: 'Third person singular: "she has", not "she have".',
  },
  {
    pattern: /\bi am born in\b/i,
    correction: 'I was born in',
    hint: '"I am born" should be "I was born" (passive past).',
  },
  {
    pattern: /\bmore better\b/i,
    correction: 'better',
    hint: '"Better" is already comparative. Don\'t add "more".',
  },
  {
    pattern: /\bmore worse\b/i,
    correction: 'worse',
    hint: '"Worse" is already comparative. Don\'t add "more".',
  },
  {
    pattern: /\bthe people is\b/i,
    correction: 'people are',
    hint: '"People" is plural in English: "people are", not "people is".',
  },
  {
    pattern: /\bi didn't went\b/i,
    correction: "I didn't go",
    hint: 'After "didn\'t", use the base form: "didn\'t go", not "didn\'t went".',
  },
  {
    pattern: /\bhe don't\b/i,
    correction: "he doesn't",
    hint: 'Third person singular: "he doesn\'t", not "he don\'t".',
  },
  {
    pattern: /\bshe don't\b/i,
    correction: "she doesn't",
    hint: 'Third person singular: "she doesn\'t", not "she don\'t".',
  },
  {
    pattern: /\bdepend from\b/i,
    correction: 'depend on',
    hint: 'In English we say "depend on", not "depend from" (Italian: dipendere da).',
  },
  {
    pattern: /\binterested to\b/i,
    correction: 'interested in',
    hint: 'In English: "interested in", not "interested to" (Italian: interessato a).',
  },
  {
    pattern: /\bexplain me\b/i,
    correction: 'explain to me',
    hint: 'In English: "explain to me", not "explain me".',
  },
  {
    pattern: /\bI suggest you to\b/i,
    correction: 'I suggest you',
    hint: '"Suggest" doesn\'t take "to": "I suggest you try", not "I suggest you to try".',
  },
  {
    pattern: /\bactually\b/i,
    test: (msg) => /\bactually\b/i.test(msg) && /\bnow\b|right now\b|at the moment\b/i.test(msg),
    correction: null,
    hint: 'Note: "Actually" means "in realt\u00e0", not "attualmente" (which is "currently").',
  },
];

/**
 * Conversation scenarios database.
 * Each scenario has: id, name (bilingual), icon, difficulty, opening message,
 * and a tree of conversation turns with pattern matching.
 */
const SCENARIOS = [
  {
    id: 'restaurant',
    name: 'At the Restaurant / Al Ristorante',
    icon: '\uD83C\uDF7D\uFE0F',
    difficulty: 1,
    description:
      'Order food and interact with a waiter / Ordina cibo e interagisci con un cameriere',
    vocabulary: [
      { en: 'menu', it: 'men\u00f9' },
      { en: 'appetizer', it: 'antipasto' },
      { en: 'main course', it: 'secondo piatto' },
      { en: 'dessert', it: 'dolce' },
      { en: 'bill', it: 'conto' },
      { en: 'tip', it: 'mancia' },
      { en: 'reservation', it: 'prenotazione' },
      { en: 'waiter', it: 'cameriere' },
    ],
    turns: [
      {
        assistant:
          'Good evening! Welcome to The Golden Fork. Do you have a reservation, or would you like a table for how many?',
        patterns: [
          {
            match: /reserv|book|prenotaz/i,
            response: 'Wonderful! What name is the reservation under?',
            nextTurn: 1,
          },
          {
            match: /table|two|three|four|one|sit|seat|\d/i,
            response:
              'Of course! Let me find you a nice table. Right this way, please. Here is your menu.',
            nextTurn: 2,
          },
        ],
        fallback:
          "I'm sorry, could you tell me if you have a reservation, or how many people need a table?",
        vocab: { en: 'reservation', it: 'prenotazione' },
      },
      {
        assistant: 'Wonderful! What name is the reservation under?',
        patterns: [
          {
            match: /my name|name is|under|it's|called/i,
            response: 'Ah yes, I found it! Right this way, please. Here is your menu.',
            nextTurn: 2,
          },
          {
            match: /.+/,
            response: 'Let me check... Yes, I found it! Right this way. Here is your menu.',
            nextTurn: 2,
          },
        ],
        fallback: 'Could you tell me the name for the reservation?',
        vocab: { en: 'name', it: 'nome' },
      },
      {
        assistant:
          'Here is your menu. Would you like to start with something to drink, or are you ready to order?',
        patterns: [
          {
            match: /drink|water|wine|beer|juice|coke|soda|coffee|tea/i,
            response:
              "Excellent choice! I'll bring that right away. Take your time with the menu, and let me know when you're ready to order your food.",
            nextTurn: 3,
          },
          {
            match: /order|ready|food|eat|hungry/i,
            response:
              'Great! What would you like for your appetizer? We have a wonderful bruschetta and a fresh Caesar salad today.',
            nextTurn: 4,
          },
          {
            match: /recommend|suggest|special|best/i,
            response:
              'Our special today is grilled salmon with roasted vegetables. For drinks, I recommend our house white wine. Would you like to try it?',
            nextTurn: 3,
          },
        ],
        fallback:
          'Would you like something to drink first, or would you prefer to order your food right away?',
        vocab: { en: 'to order', it: 'ordinare' },
      },
      {
        assistant: 'Take your time with the menu. Are you ready to order your food now?',
        patterns: [
          {
            match: /yes|ready|order|like|want|have|please/i,
            response:
              'What would you like for your appetizer? We have bruschetta, Caesar salad, and tomato soup.',
            nextTurn: 4,
          },
          {
            match: /minute|moment|wait|not yet/i,
            response: "Of course, take your time! I'll come back in a few minutes.",
            nextTurn: 4,
          },
        ],
        fallback: "Just let me know when you're ready to order!",
        vocab: { en: 'appetizer', it: 'antipasto' },
      },
      {
        assistant:
          'What would you like for your appetizer? We have bruschetta, Caesar salad, and tomato soup.',
        patterns: [
          {
            match: /bruschetta|salad|soup|caesar|tomato/i,
            response:
              'Great choice! And for the main course? We have steak, grilled salmon, pasta carbonara, and a vegetarian risotto.',
            nextTurn: 5,
          },
          {
            match: /no|skip|nothing|main|directly/i,
            response:
              "No problem! Let's go straight to the main course. We have steak, grilled salmon, pasta carbonara, and a vegetarian risotto.",
            nextTurn: 5,
          },
        ],
        fallback: 'We have bruschetta, Caesar salad, or tomato soup. Which one would you prefer?',
        vocab: { en: 'main course', it: 'secondo piatto' },
      },
      {
        assistant:
          'And for the main course? We have steak, grilled salmon, pasta carbonara, and a vegetarian risotto.',
        patterns: [
          {
            match: /steak|salmon|pasta|carbonara|risotto|vegetarian|fish|meat/i,
            response:
              'Excellent! And would you like any dessert after? We have tiramisu, chocolate cake, and gelato.',
            nextTurn: 6,
          },
        ],
        fallback: 'We have steak, salmon, carbonara, or risotto. What sounds good to you?',
        vocab: { en: 'dessert', it: 'dolce' },
      },
      {
        assistant: 'Would you like any dessert? We have tiramisu, chocolate cake, and gelato.',
        patterns: [
          {
            match: /tiramisu|cake|chocolate|gelato|ice cream|yes/i,
            response: "Wonderful! I'll bring that right out. Is there anything else I can get you?",
            nextTurn: 7,
          },
          {
            match: /no|bill|check|pay|nothing|full/i,
            response:
              'Of course! Let me get the bill for you. It was a pleasure serving you tonight!',
            nextTurn: 7,
          },
        ],
        fallback:
          'Would you like tiramisu, chocolate cake, or gelato? Or would you prefer the bill?',
        vocab: { en: 'bill / check', it: 'conto' },
      },
      {
        assistant:
          'Here is your bill. Thank you for dining with us! We hope you enjoyed your meal.',
        patterns: [],
        isEnd: true,
        fallback: '',
        vocab: { en: 'tip', it: 'mancia' },
      },
    ],
  },
  {
    id: 'job-interview',
    name: 'Job Interview / Colloquio di Lavoro',
    icon: '\uD83D\uDCBC',
    difficulty: 3,
    description: 'Practice a job interview in English / Preparati per un colloquio in inglese',
    vocabulary: [
      { en: 'experience', it: 'esperienza' },
      { en: 'strengths', it: 'punti di forza' },
      { en: 'weaknesses', it: 'punti deboli' },
      { en: 'salary', it: 'stipendio' },
      { en: 'skills', it: 'competenze' },
      { en: 'resume', it: 'curriculum' },
      { en: 'position', it: 'posizione' },
      { en: 'hire', it: 'assumere' },
    ],
    turns: [
      {
        assistant:
          'Good morning! Thank you for coming in today. Please, have a seat. Could you start by telling me a little about yourself?',
        patterns: [
          {
            match: /name|I am|I'm|work|experience|study|from|background|year/i,
            response: "That's a great background! Now, why are you interested in this position?",
            nextTurn: 1,
          },
        ],
        fallback:
          "Don't be nervous! Just tell me your name, what you do, and a bit about your background.",
        vocab: { en: 'background', it: 'background / formazione' },
      },
      {
        assistant: 'Why are you interested in this position?',
        patterns: [
          {
            match: /passion|interest|love|enjoy|challenge|grow|learn|opportunity|career/i,
            response: "That's wonderful to hear! What would you say are your main strengths?",
            nextTurn: 2,
          },
          {
            match: /company|team|project|product|mission|values/i,
            response:
              "It's great that you've researched our company! What would you say are your main strengths?",
            nextTurn: 2,
          },
        ],
        fallback:
          'Think about what attracts you to this role. Is it the work itself, the company, or the opportunity to grow?',
        vocab: { en: 'opportunity', it: 'opportunit\u00e0' },
      },
      {
        assistant: 'What would you say are your main strengths?',
        patterns: [
          {
            match: /team|communicate|organize|problem|solve|learn|adapt|detail|creative|leader/i,
            response:
              "Those are valuable skills! And everyone has areas to improve. What would you say is a weakness you're working on?",
            nextTurn: 3,
          },
        ],
        fallback:
          "Think about what you're good at - teamwork, problem-solving, communication, organization?",
        vocab: { en: 'strengths', it: 'punti di forza' },
      },
      {
        assistant: "What would you say is a weakness you're working on?",
        patterns: [
          {
            match: /sometimes|working on|improve|try|used to|but|learning|better/i,
            response:
              'I appreciate your honesty! Being self-aware is important. Can you tell me about a challenging situation you handled at work or school?',
            nextTurn: 4,
          },
        ],
        fallback:
          "A good strategy is to mention a real weakness and explain how you're improving it. For example: 'I used to struggle with time management, but I've been using planning tools to improve.'",
        vocab: { en: 'weakness', it: 'punto debole' },
      },
      {
        assistant: 'Can you tell me about a challenging situation you handled at work or school?',
        patterns: [
          {
            match:
              /situation|challenge|problem|difficult|handled|solved|team|deadline|result|managed/i,
            response:
              'That shows great problem-solving ability! Where do you see yourself in five years?',
            nextTurn: 5,
          },
        ],
        fallback:
          'Try to describe a specific situation: what was the problem, what did you do, and what was the result?',
        vocab: { en: 'to handle / to manage', it: 'gestire' },
      },
      {
        assistant: 'Where do you see yourself in five years?',
        patterns: [
          {
            match: /grow|learn|lead|senior|manage|develop|skill|career|contribute|advance/i,
            response:
              "That's a great vision! Do you have any questions for me about the position or the company?",
            nextTurn: 6,
          },
        ],
        fallback:
          'Think about your career goals. Do you want to grow in this field, take on more responsibility, or develop new skills?',
        vocab: { en: 'career growth', it: 'crescita professionale' },
      },
      {
        assistant: 'Do you have any questions for me about the position or the company?',
        patterns: [
          {
            match: /team|culture|day|like|typical|training|grow|benefit|salary|start|remote/i,
            response:
              "Those are excellent questions! We'll be in touch soon with our decision. Thank you so much for your time today. It was a pleasure meeting you!",
            nextTurn: 7,
          },
          {
            match: /no|nothing|think|cover|clear/i,
            response:
              "Alright! Well, we'll be in touch soon. Thank you for coming in today. It was great meeting you!",
            nextTurn: 7,
          },
        ],
        fallback:
          "It's always good to ask questions! You could ask about the team, the work culture, or what a typical day looks like.",
        vocab: { en: 'company culture', it: 'cultura aziendale' },
      },
      {
        assistant:
          "Thank you so much for your time today. We'll review all candidates and get back to you within a week. Good luck!",
        patterns: [],
        isEnd: true,
        fallback: '',
        vocab: { en: 'candidate', it: 'candidato' },
      },
    ],
  },
  {
    id: 'airport',
    name: "At the Airport / All'Aeroporto",
    icon: '\u2708\uFE0F',
    difficulty: 2,
    description: 'Check in and navigate the airport / Fai il check-in e muoviti in aeroporto',
    vocabulary: [
      { en: 'boarding pass', it: "carta d'imbarco" },
      { en: 'gate', it: 'gate / uscita' },
      { en: 'luggage', it: 'bagaglio' },
      { en: 'carry-on', it: 'bagaglio a mano' },
      { en: 'departure', it: 'partenza' },
      { en: 'arrival', it: 'arrivo' },
      { en: 'flight', it: 'volo' },
      { en: 'passport', it: 'passaporto' },
    ],
    turns: [
      {
        assistant:
          'Good morning! Welcome to the check-in counter. May I see your passport and booking confirmation, please?',
        patterns: [
          {
            match: /here|yes|sure|passport|booking|confirm/i,
            response:
              'Thank you! I can see your flight to London. Would you like a window seat or an aisle seat?',
            nextTurn: 1,
          },
        ],
        fallback:
          "I'll need to see your passport and your booking confirmation or e-ticket to check you in.",
        vocab: { en: 'booking confirmation', it: 'conferma di prenotazione' },
      },
      {
        assistant: 'Would you like a window seat or an aisle seat?',
        patterns: [
          {
            match: /window|finestr/i,
            response:
              'Window seat it is! Great for the views. Are you checking any luggage today, or do you only have carry-on?',
            nextTurn: 2,
          },
          {
            match: /aisle|corridor/i,
            response:
              'Aisle seat, good choice! Easy to get up. Are you checking any luggage today, or do you only have carry-on?',
            nextTurn: 2,
          },
          {
            match: /doesn't matter|don't mind|either|any/i,
            response:
              "I'll give you a window seat. Are you checking any luggage today, or do you only have carry-on?",
            nextTurn: 2,
          },
        ],
        fallback: 'Would you prefer sitting by the window or next to the aisle (corridor side)?',
        vocab: { en: 'aisle seat', it: 'posto corridoio' },
      },
      {
        assistant: 'Are you checking any luggage today, or do you only have carry-on?',
        patterns: [
          {
            match: /check|luggage|suitcase|bag|one|two|yes/i,
            response:
              "Please place your luggage on the scale. It's within the weight limit, perfect! Here's your boarding pass. Your gate is B7, and boarding starts at 2:30 PM.",
            nextTurn: 3,
          },
          {
            match: /carry|hand|only|no|just/i,
            response:
              "No checked luggage, just carry-on. That makes things faster! Here's your boarding pass. Your gate is B7, and boarding starts at 2:30 PM.",
            nextTurn: 3,
          },
        ],
        fallback: 'Do you have any bags to check in, or are you traveling with carry-on only?',
        vocab: { en: 'luggage / baggage', it: 'bagaglio' },
      },
      {
        assistant:
          "Here's your boarding pass. Your gate is B7, and boarding starts at 2:30 PM. Do you need help finding anything?",
        patterns: [
          {
            match: /gate|where|find|direction|how|get to/i,
            response:
              "Go straight past security, then turn left. Gate B7 is about a five-minute walk. You'll see signs along the way.",
            nextTurn: 4,
          },
          {
            match: /duty free|shop|store|buy|lounge/i,
            response:
              'The duty-free shops are right after security on your left. The lounge is on the second floor near gate B5.',
            nextTurn: 4,
          },
          {
            match: /no|fine|ok|thank/i,
            response: "You're welcome! Have a wonderful flight to London!",
            nextTurn: 5,
          },
        ],
        fallback:
          'Is there anything you need? I can help you find your gate, the shops, or the lounges.',
        vocab: { en: 'boarding pass', it: "carta d'imbarco" },
      },
      {
        assistant: 'Is there anything else I can help you with before you head to your gate?',
        patterns: [
          {
            match: /no|thank|fine|ok|good|that's all/i,
            response: "You're welcome! Have a wonderful flight. Enjoy London!",
            nextTurn: 5,
          },
          {
            match: /delay|time|late|cancel/i,
            response:
              'Your flight is on time. Boarding starts at 2:30 PM at gate B7. You have plenty of time!',
            nextTurn: 5,
          },
        ],
        fallback: 'Is there anything else, or are you all set?',
        vocab: { en: 'departure', it: 'partenza' },
      },
      {
        assistant: 'Have a wonderful flight! Enjoy your trip!',
        patterns: [],
        isEnd: true,
        fallback: '',
        vocab: { en: 'arrival', it: 'arrivo' },
      },
    ],
  },
  {
    id: 'shopping',
    name: 'Shopping / Shopping',
    icon: '\uD83D\uDECD\uFE0F',
    difficulty: 1,
    description: 'Ask about prices, sizes and colors / Chiedi di prezzi, taglie e colori',
    vocabulary: [
      { en: 'size', it: 'taglia' },
      { en: 'fitting room', it: 'camerino' },
      { en: 'receipt', it: 'scontrino' },
      { en: 'discount', it: 'sconto' },
      { en: 'cash', it: 'contanti' },
      { en: 'credit card', it: 'carta di credito' },
      { en: 'refund', it: 'rimborso' },
      { en: 'sale', it: 'saldi' },
    ],
    turns: [
      {
        assistant:
          'Hi there! Welcome to our store. Are you looking for something specific, or would you like to browse?',
        patterns: [
          {
            match: /shirt|t-shirt|jacket|pants|jeans|dress|shoes|coat|sweater|hoodie|look/i,
            response:
              'We have a great selection! What size are you looking for? And do you have a color preference?',
            nextTurn: 1,
          },
          {
            match: /browse|look around|just looking|window/i,
            response:
              'Of course! Take your time. Our new collection is on the right side. Let me know if you need any help!',
            nextTurn: 1,
          },
          {
            match: /gift|present|someone/i,
            response: 'How nice! Who is it for? That will help me suggest something perfect.',
            nextTurn: 1,
          },
        ],
        fallback:
          'Are you looking for any particular clothing item? A shirt, jacket, jeans, or something else?',
        vocab: { en: 'to browse', it: "dare un'occhiata" },
      },
      {
        assistant: 'What size and color are you looking for?',
        patterns: [
          {
            match: /small|medium|large|xl|xs|size|S|M|L|\d{2}/i,
            response:
              'Let me check... Yes, we have that! Would you like to try it on? The fitting rooms are right over there.',
            nextTurn: 2,
          },
          {
            match: /blue|red|black|white|green|grey|gray|pink|brown|yellow/i,
            response:
              'Beautiful choice! We have that in several sizes. Would you like to try it on?',
            nextTurn: 2,
          },
          {
            match: /not sure|don't know|help/i,
            response:
              'No worries! I can help you find your size. Would you like to try a medium to start?',
            nextTurn: 2,
          },
        ],
        fallback: 'What size do you usually wear? And do you prefer any particular color?',
        vocab: { en: 'fitting room', it: 'camerino' },
      },
      {
        assistant: 'The fitting rooms are right there. How does it fit?',
        patterns: [
          {
            match: /good|great|perfect|love|nice|fits|like/i,
            response:
              "Wonderful! Would you like to buy it? It's $49.99. We also have a 20% discount today!",
            nextTurn: 3,
          },
          {
            match: /small|tight|big|large|loose|doesn't fit|too/i,
            response: 'Let me get you a different size. Would you like the next size up or down?',
            nextTurn: 3,
          },
        ],
        fallback: 'How is the size? Is it comfortable, or would you like to try a different size?',
        vocab: { en: 'discount / sale', it: 'sconto / saldi' },
      },
      {
        assistant:
          "It's $49.99, and we have a 20% discount today, so it would be $39.99! Would you like to take it?",
        patterns: [
          {
            match: /yes|take|buy|want|great|deal|perfect/i,
            response: 'Excellent! Would you like to pay with cash or card?',
            nextTurn: 4,
          },
          {
            match: /no|expensive|too much|think|maybe/i,
            response:
              'No problem! Would you like to look at something else? We have similar styles at different price points.',
            nextTurn: 4,
          },
        ],
        fallback: 'Would you like to purchase it at the discounted price, or keep looking?',
        vocab: { en: 'price', it: 'prezzo' },
      },
      {
        assistant: 'How would you like to pay? Cash or card?',
        patterns: [
          {
            match: /card|credit|debit|visa|master/i,
            response:
              "Please insert your card here. Done! Here's your receipt. Would you like a bag?",
            nextTurn: 5,
          },
          {
            match: /cash|money|bills/i,
            response: "Perfect, here's your change and your receipt. Would you like a bag?",
            nextTurn: 5,
          },
        ],
        fallback: 'We accept cash, credit cards, and debit cards. Which would you prefer?',
        vocab: { en: 'receipt', it: 'scontrino' },
      },
      {
        assistant: 'Thank you for shopping with us! Have a wonderful day!',
        patterns: [],
        isEnd: true,
        fallback: '',
        vocab: { en: 'refund / exchange', it: 'rimborso / cambio' },
      },
    ],
  },
  {
    id: 'hotel',
    name: 'Hotel Check-in / Check-in in Hotel',
    icon: '\uD83C\uDFE8',
    difficulty: 2,
    description: 'Check in and ask about amenities / Fai il check-in e chiedi dei servizi',
    vocabulary: [
      { en: 'reservation', it: 'prenotazione' },
      { en: 'single/double room', it: 'camera singola/doppia' },
      { en: 'key card', it: 'chiave elettronica' },
      { en: 'checkout', it: 'checkout' },
      { en: 'breakfast', it: 'colazione' },
      { en: 'room service', it: 'servizio in camera' },
      { en: 'amenities', it: 'servizi' },
      { en: 'floor', it: 'piano' },
    ],
    turns: [
      {
        assistant: 'Good evening, welcome to The Grand Hotel! Do you have a reservation?',
        patterns: [
          {
            match: /yes|reservation|book|confirm/i,
            response: 'Excellent! Could I have your name, please?',
            nextTurn: 1,
          },
          {
            match: /no|don't|walk|available|room/i,
            response:
              'No problem! Let me check availability. How many nights would you like to stay, and would you prefer a single or double room?',
            nextTurn: 2,
          },
        ],
        fallback:
          'Do you have a reservation with us, or would you like to check if we have rooms available?',
        vocab: { en: 'reservation', it: 'prenotazione' },
      },
      {
        assistant: 'Could I have your name, please?',
        patterns: [
          {
            match: /.+/,
            response:
              "I found your reservation! A double room for three nights, correct? I'll just need your ID or passport.",
            nextTurn: 3,
          },
        ],
        fallback: 'What name is the reservation under?',
        vocab: { en: 'double room', it: 'camera doppia' },
      },
      {
        assistant:
          'How many nights would you like to stay, and would you prefer a single or double room?',
        patterns: [
          {
            match: /single|one bed|alone|double|two|three|four|five|night|week/i,
            response:
              "Perfect! I have a room available. The rate is $120 per night. Shall I book it for you? I'll just need your ID or passport.",
            nextTurn: 3,
          },
        ],
        fallback:
          'Would you like a single room or a double room? And how many nights will you be staying?',
        vocab: { en: 'single room', it: 'camera singola' },
      },
      {
        assistant: 'Could I see your ID or passport, please? And how would you like to pay?',
        patterns: [
          {
            match: /here|yes|passport|card|credit|cash|pay/i,
            response:
              "Thank you! You're in room 405, on the fourth floor. Here's your key card. The elevator is on your right. Breakfast is served from 7 to 10 AM in the restaurant on the ground floor.",
            nextTurn: 4,
          },
        ],
        fallback:
          "I'll need to see your passport or ID, and we accept credit cards or cash for payment.",
        vocab: { en: 'key card', it: 'chiave elettronica' },
      },
      {
        assistant:
          "You're in room 405, fourth floor. Breakfast is from 7 to 10 AM. Is there anything else you'd like to know about the hotel?",
        patterns: [
          {
            match: /wifi|internet|password|connect/i,
            response:
              "The WiFi network is 'GrandHotel_Guest' and the password is on your key card holder. It's free for all guests!",
            nextTurn: 5,
          },
          {
            match: /pool|gym|spa|fitness|swim/i,
            response:
              'Our pool and spa are on the rooftop, open from 8 AM to 10 PM. The gym is on the second floor, available 24/7.',
            nextTurn: 5,
          },
          {
            match: /restaurant|eat|dinner|food|bar/i,
            response:
              'Our restaurant is on the ground floor, open for dinner from 6 to 11 PM. We also have a rooftop bar with a great view!',
            nextTurn: 5,
          },
          {
            match: /check.?out|leave|time/i,
            response:
              "Checkout is at 11 AM. If you need a late checkout, just let us know and we'll do our best to accommodate you.",
            nextTurn: 5,
          },
          {
            match: /no|fine|ok|thank|good/i,
            response:
              'Wonderful! Enjoy your stay. If you need anything at all, just dial 0 from your room phone.',
            nextTurn: 6,
          },
        ],
        fallback:
          'You can ask about WiFi, the pool, the gym, restaurants, or checkout times. What would you like to know?',
        vocab: { en: 'amenities', it: 'servizi' },
      },
      {
        assistant: 'Is there anything else I can help you with?',
        patterns: [
          {
            match: /no|thank|fine|good|that's all|nothing/i,
            response: 'Enjoy your stay at The Grand Hotel! Have a wonderful evening!',
            nextTurn: 6,
          },
          {
            match: /.+/,
            response: "I'll make sure to take care of that for you. Enjoy your stay!",
            nextTurn: 6,
          },
        ],
        fallback: 'Is there anything else, or are you all set?',
        vocab: { en: 'room service', it: 'servizio in camera' },
      },
      {
        assistant: 'Enjoy your stay at The Grand Hotel! Have a wonderful evening!',
        patterns: [],
        isEnd: true,
        fallback: '',
        vocab: { en: 'checkout', it: 'checkout' },
      },
    ],
  },
  {
    id: 'directions',
    name: 'Asking Directions / Chiedere Indicazioni',
    icon: '\uD83D\uDDFA\uFE0F',
    difficulty: 1,
    description: 'Find places and navigate a city / Trova luoghi e orientati in citt\u00e0',
    vocabulary: [
      { en: 'turn left/right', it: 'gira a sinistra/destra' },
      { en: 'go straight', it: 'vai dritto' },
      { en: 'crossroads', it: 'incrocio' },
      { en: 'traffic light', it: 'semaforo' },
      { en: 'block', it: 'isolato' },
      { en: 'across from', it: 'di fronte a' },
      { en: 'next to', it: 'accanto a' },
      { en: 'nearby', it: 'nelle vicinanze' },
    ],
    turns: [
      {
        assistant: 'Excuse me! You look a bit lost. Can I help you find something?',
        patterns: [
          {
            match:
              /museum|station|train|bus|pharmacy|hospital|supermarket|restaurant|park|bank|post/i,
            response:
              'Ah, I know exactly where that is! Go straight down this street for about two blocks. Can you see that traffic light ahead?',
            nextTurn: 1,
          },
          {
            match: /where|how|find|get|look/i,
            response: 'Sure! What place are you trying to find?',
            nextTurn: 0,
          },
          {
            match: /lost|help|yes/i,
            response:
              'No worries! Where are you trying to go? A museum, a train station, a restaurant?',
            nextTurn: 0,
          },
        ],
        fallback: 'What place are you looking for? I know this area pretty well!',
        vocab: { en: 'to look for', it: 'cercare' },
      },
      {
        assistant:
          'Go straight for two blocks until you see a traffic light. Then turn left. Are you following so far?',
        patterns: [
          {
            match: /yes|ok|got it|understand|follow|sure/i,
            response:
              "After you turn left, walk for about one more block. You'll see it on your right side, across from a big park. You can't miss it!",
            nextTurn: 2,
          },
          {
            match: /repeat|again|sorry|say that|slow/i,
            response:
              "No problem! First: go straight. Second: at the traffic light, turn left. Third: walk one block, and it's on the right. Got it?",
            nextTurn: 2,
          },
        ],
        fallback:
          'Let me simplify: go straight, turn left at the traffic light, then one more block. Is that clear?',
        vocab: { en: 'traffic light', it: 'semaforo' },
      },
      {
        assistant:
          "It's on the right side, across from the park. It's about a 10-minute walk from here. Would you like any other directions?",
        patterns: [
          {
            match: /how long|far|time|walk|minute/i,
            response:
              "It's about a 10-minute walk, or you can take the bus. Bus number 5 stops right over there and goes directly to it.",
            nextTurn: 3,
          },
          {
            match: /bus|taxi|uber|metro|subway|transport/i,
            response:
              "There's a bus stop right around the corner. Bus number 5 goes there directly. Or you can find taxis at the end of this street.",
            nextTurn: 3,
          },
          {
            match: /no|thank|fine|ok|great/i,
            response: "You're welcome! Enjoy your walk. This is a beautiful part of the city!",
            nextTurn: 4,
          },
        ],
        fallback: "It's about 10 minutes on foot. Would you like to know about buses or taxis?",
        vocab: { en: 'across from', it: 'di fronte a' },
      },
      {
        assistant: "Is there anything else you'd like to find?",
        patterns: [
          {
            match: /no|thank|fine|ok|good|that's all/i,
            response: "You're welcome! Have a great day, and enjoy exploring the city!",
            nextTurn: 4,
          },
          {
            match: /coffee|caf|eat|restroom|bathroom/i,
            response:
              "There's a lovely caf\u00e9 just around the corner, and they have clean restrooms too! Just walk to the end of this street and turn right.",
            nextTurn: 4,
          },
        ],
        fallback: 'Is there anything else you need help finding?',
        vocab: { en: 'nearby / around the corner', it: "nelle vicinanze / dietro l'angolo" },
      },
      {
        assistant: 'Have a great day, and enjoy exploring the city! Goodbye!',
        patterns: [],
        isEnd: true,
        fallback: '',
        vocab: { en: 'block / intersection', it: 'isolato / incrocio' },
      },
    ],
  },
  {
    id: 'making-friends',
    name: 'Making Friends / Fare Amicizia',
    icon: '\uD83E\uDD1D',
    difficulty: 1,
    description: 'Have a casual conversation and make friends / Fai conversazione e fai amicizia',
    vocabulary: [
      { en: 'hobbies', it: 'hobby / passatempi' },
      { en: 'free time', it: 'tempo libero' },
      { en: 'to hang out', it: 'uscire / frequentare' },
      { en: 'neighborhood', it: 'quartiere' },
      { en: 'to get along', it: "andare d'accordo" },
      { en: 'social media', it: 'social media' },
      { en: 'interests', it: 'interessi' },
      { en: 'fun', it: 'divertimento' },
    ],
    turns: [
      {
        assistant: "Hey! I don't think we've met before. I'm Alex. What's your name?",
        patterns: [
          {
            match: /name|I'm|I am|call|hi|hello|hey/i,
            response: 'Nice to meet you! So, are you from around here, or are you visiting?',
            nextTurn: 1,
          },
          {
            match: /.+/,
            response: 'Nice to meet you! Are you from around here?',
            nextTurn: 1,
          },
        ],
        fallback: "Don't be shy! Just tell me your name. I'm Alex!",
        vocab: { en: 'nice to meet you', it: 'piacere di conoscerti' },
      },
      {
        assistant: 'Nice to meet you! Are you from around here, or are you visiting?',
        patterns: [
          {
            match: /from|live|born|visit|travel|staying|here|local|moved/i,
            response: 'Cool! So what do you like to do in your free time? Any hobbies?',
            nextTurn: 2,
          },
        ],
        fallback: 'Where are you from? Or do you live in this area?',
        vocab: { en: 'to be from / to live in', it: 'essere di / vivere a' },
      },
      {
        assistant: 'So what do you like to do in your free time? Any hobbies?',
        patterns: [
          {
            match:
              /music|sport|read|game|cook|travel|movie|film|gym|play|paint|photo|art|dance|walk|run|swim|yoga|code|program/i,
            response:
              "That's awesome! I love that too! Do you do it often, or just when you have time?",
            nextTurn: 3,
          },
          {
            match: /nothing|not sure|don't know|relax|sleep|chill/i,
            response:
              "Ha, relaxing is important too! Do you watch any TV shows or movies you're into right now?",
            nextTurn: 3,
          },
        ],
        fallback:
          'Everyone has something they enjoy! Do you like sports, music, movies, cooking, or anything creative?',
        vocab: { en: 'hobbies / free time', it: 'hobby / tempo libero' },
      },
      {
        assistant: "That's so cool! Have you been doing it for a long time?",
        patterns: [
          {
            match: /year|long|since|started|always|recently|month|kid|child|ago/i,
            response:
              "That's great! Hey, a group of us are going out this weekend. Would you like to join us?",
            nextTurn: 4,
          },
          {
            match: /.+/,
            response:
              'Interesting! Well, some friends and I are hanging out this weekend. Do you want to come?',
            nextTurn: 4,
          },
        ],
        fallback: 'How long have you been into that? Did you start recently or a long time ago?',
        vocab: { en: 'for a long time', it: 'da molto tempo' },
      },
      {
        assistant: 'Some friends and I are hanging out this weekend. Would you like to join us?',
        patterns: [
          {
            match: /yes|sure|love|great|sounds|why not|definitely|absolutely/i,
            response:
              "Awesome! What's the best way to reach you? Do you have WhatsApp or Instagram?",
            nextTurn: 5,
          },
          {
            match: /no|busy|maybe|can't|not sure|depends/i,
            response:
              'No worries! Maybe another time then. Can I give you my number in case you change your mind?',
            nextTurn: 5,
          },
        ],
        fallback: "It'll be fun! What do you think, would you like to come?",
        vocab: { en: 'to hang out', it: 'uscire / stare insieme' },
      },
      {
        assistant: "What's the best way to reach you? Do you have WhatsApp or Instagram?",
        patterns: [
          {
            match: /whatsapp|instagram|number|phone|telegram|email|facebook|snap|sure|yes/i,
            response:
              "Perfect! I'll add you right now. It was really nice meeting you! See you this weekend!",
            nextTurn: 6,
          },
          {
            match: /.+/,
            response: "Great, let's stay in touch! It was really nice meeting you!",
            nextTurn: 6,
          },
        ],
        fallback: 'How should I contact you? Phone, WhatsApp, Instagram?',
        vocab: { en: 'to keep in touch', it: 'restare in contatto' },
      },
      {
        assistant: 'It was really nice meeting you! See you around!',
        patterns: [],
        isEnd: true,
        fallback: '',
        vocab: { en: 'see you later', it: 'ci vediamo' },
      },
    ],
  },
  {
    id: 'doctor',
    name: 'At the Doctor / Dal Dottore',
    icon: '\uD83C\uDFE5',
    difficulty: 2,
    description:
      'Describe symptoms and understand the doctor / Descrivi i sintomi e capisci il dottore',
    vocabulary: [
      { en: 'headache', it: 'mal di testa' },
      { en: 'fever', it: 'febbre' },
      { en: 'cough', it: 'tosse' },
      { en: 'prescription', it: 'ricetta medica' },
      { en: 'sore throat', it: 'mal di gola' },
      { en: 'symptoms', it: 'sintomi' },
      { en: 'allergy', it: 'allergia' },
      { en: 'medicine', it: 'medicina' },
    ],
    turns: [
      {
        assistant: "Good morning! I'm Dr. Smith. What brings you in today? How are you feeling?",
        patterns: [
          {
            match:
              /head|fever|cough|throat|stomach|pain|sick|cold|flu|ache|hurt|sore|tired|dizzy|nausea/i,
            response: 'I see. How long have you been experiencing these symptoms?',
            nextTurn: 1,
          },
          {
            match: /not feel|don't feel|bad|terrible|awful|unwell/i,
            response:
              "I'm sorry to hear that. Can you describe your symptoms more specifically? Do you have any pain, fever, or cough?",
            nextTurn: 1,
          },
        ],
        fallback:
          "Can you tell me what's bothering you? Do you have any pain, fever, cough, or other symptoms?",
        vocab: { en: 'symptoms', it: 'sintomi' },
      },
      {
        assistant: 'How long have you been experiencing these symptoms?',
        patterns: [
          {
            match: /day|week|yesterday|today|morning|since|two|three|few|couple|hour/i,
            response:
              'I understand. Are you allergic to any medications? And are you currently taking any medicine?',
            nextTurn: 2,
          },
        ],
        fallback:
          'Has it been a few days, a week, or longer? When did you first notice the symptoms?',
        vocab: { en: 'since / for', it: 'da / per' },
      },
      {
        assistant: 'Are you allergic to any medications? Are you taking any medicine currently?',
        patterns: [
          {
            match: /no|none|not|nothing|don't think|allergic to/i,
            response:
              "Good. Let me check your temperature and blood pressure. Could you open your mouth and say 'Ah'?",
            nextTurn: 3,
          },
          {
            match: /yes|penicillin|aspirin|allergy|taking|medication/i,
            response:
              "Thank you for telling me, that's very important. Let me examine you now. Please open your mouth and say 'Ah'.",
            nextTurn: 3,
          },
        ],
        fallback:
          "It's important to know about any allergies or medications you take. Do you have any?",
        vocab: { en: 'allergy / allergic to', it: 'allergia / allergico a' },
      },
      {
        assistant:
          "I've examined you. It looks like you have a mild infection. Nothing serious, but you need some rest. I'm going to prescribe some medication. Do you have any questions?",
        patterns: [
          {
            match: /how|what|take|medicine|when|long|often|serious|worry/i,
            response:
              'Take the medicine twice a day, morning and evening, with food. You should feel better in 3-4 days. If symptoms persist after a week, come back and see me.',
            nextTurn: 4,
          },
          {
            match: /no|ok|understand|clear|fine|thank/i,
            response:
              "Here's your prescription. Take the medicine twice a day with food. Get plenty of rest and drink lots of water. You should feel better in a few days!",
            nextTurn: 5,
          },
        ],
        fallback:
          'Do you want to know about the medication, how to take it, or how long until you feel better?',
        vocab: { en: 'prescription', it: 'ricetta medica' },
      },
      {
        assistant:
          'Take the medicine twice a day with food. Rest well and drink plenty of water. Any other questions?',
        patterns: [
          {
            match: /work|exercise|sport|eat|food|drink|alcohol|coffee/i,
            response:
              "I recommend resting for at least 2-3 days. Avoid intense exercise and alcohol. Eat light meals and stay hydrated. Here's your prescription.",
            nextTurn: 5,
          },
          {
            match: /no|ok|understand|thank|fine|got it/i,
            response:
              "Great! Here's your prescription. Take care of yourself, and don't hesitate to come back if you need anything. Get well soon!",
            nextTurn: 5,
          },
        ],
        fallback: "Is there anything else you'd like to ask about your health or the treatment?",
        vocab: { en: 'twice a day', it: 'due volte al giorno' },
      },
      {
        assistant: "Here's your prescription. Take care and get plenty of rest. Get well soon!",
        patterns: [],
        isEnd: true,
        fallback: '',
        vocab: { en: 'to get well / to recover', it: 'guarire / riprendersi' },
      },
    ],
  },
  {
    id: 'phone-call',
    name: 'Phone Call / Telefonata',
    icon: '\uD83D\uDCDE',
    difficulty: 3,
    description: 'Practice a formal phone conversation / Pratica una telefonata formale',
    vocabulary: [
      { en: 'may I speak to', it: 'potrei parlare con' },
      { en: 'hold on', it: 'attenda / resti in linea' },
      { en: 'leave a message', it: 'lasciare un messaggio' },
      { en: 'call back', it: 'richiamare' },
      { en: 'extension', it: 'interno' },
      { en: 'available', it: 'disponibile' },
      { en: 'regarding', it: 'riguardo a' },
      { en: 'transfer', it: 'trasferire' },
    ],
    turns: [
      {
        assistant: 'Good morning, Anderson & Partners. This is Sarah speaking. How may I help you?',
        patterns: [
          {
            match: /speak|talk|Mr|Mrs|Ms|manager|director|boss|department/i,
            response: "May I ask who's calling and what it's regarding?",
            nextTurn: 1,
          },
          {
            match: /appointment|meeting|schedule|book/i,
            response:
              "Of course! May I ask who's calling and what department you'd like to schedule with?",
            nextTurn: 1,
          },
          {
            match: /information|question|help|inquir/i,
            response: "I'd be happy to help! May I have your name and what your inquiry is about?",
            nextTurn: 1,
          },
        ],
        fallback:
          'How can I direct your call? Would you like to speak with someone specific, or do you have a general inquiry?',
        vocab: { en: 'How may I help you?', it: 'Come posso aiutarla?' },
      },
      {
        assistant: "May I ask who's calling, please, and what this is regarding?",
        patterns: [
          {
            match: /name|I'm|I am|calling|regard|about|from/i,
            response:
              "Thank you. Let me check if they're available. Could you hold for a moment, please?",
            nextTurn: 2,
          },
        ],
        fallback: 'Could you give me your name and briefly explain the reason for your call?',
        vocab: { en: 'regarding / about', it: 'riguardo a / a proposito di' },
      },
      {
        assistant:
          "I'm sorry, they're in a meeting right now. Would you like to leave a message, or would you prefer to call back later?",
        patterns: [
          {
            match: /message|leave|tell|ask/i,
            response: 'Of course! What message would you like me to pass along?',
            nextTurn: 3,
          },
          {
            match: /call back|later|when|available|return|time/i,
            response:
              'They should be free after 2 PM today. Would you like them to call you back, or would you prefer to call again?',
            nextTurn: 4,
          },
          {
            match: /email|write|send/i,
            response:
              'Sure! Their email address is info@andersonpartners.com. Would you like me to transfer you to their voicemail instead?',
            nextTurn: 4,
          },
        ],
        fallback: 'Would you like to leave a message, call back later, or send an email instead?',
        vocab: { en: 'to leave a message', it: 'lasciare un messaggio' },
      },
      {
        assistant: 'What message would you like me to pass along?',
        patterns: [
          {
            match: /please|tell|ask|call|let|know|meeting|appointment|regarding/i,
            response:
              "I've noted that down. Could you also leave your phone number so they can call you back?",
            nextTurn: 4,
          },
          {
            match: /.+/,
            response: "Got it! And what's the best number to reach you at?",
            nextTurn: 4,
          },
        ],
        fallback: 'What would you like me to tell them?',
        vocab: { en: 'to pass along / to relay', it: 'riferire / trasmettere' },
      },
      {
        assistant: 'Could I have your phone number so they can return your call?',
        patterns: [
          {
            match: /\d{3,}|number|phone|here|yes|sure|it's|my/i,
            response:
              'Perfect, I have everything noted down. Is there anything else I can help you with?',
            nextTurn: 5,
          },
        ],
        fallback: "What's the best phone number to reach you at?",
        vocab: { en: 'to call back / to return a call', it: 'richiamare' },
      },
      {
        assistant: 'Is there anything else I can help you with today?',
        patterns: [
          {
            match: /no|that's all|nothing|thank|fine|ok|good/i,
            response: 'Thank you for calling Anderson & Partners. Have a wonderful day! Goodbye!',
            nextTurn: 6,
          },
          {
            match: /.+/,
            response: "I'll make note of that as well. Thank you for calling! Have a great day!",
            nextTurn: 6,
          },
        ],
        fallback: 'Is there anything else, or shall I let you go?',
        vocab: { en: 'Have a nice day', it: 'Buona giornata' },
      },
      {
        assistant: 'Thank you for calling Anderson & Partners. Have a wonderful day! Goodbye!',
        patterns: [],
        isEnd: true,
        fallback: '',
        vocab: { en: 'extension / department', it: 'interno / reparto' },
      },
    ],
  },
  {
    id: 'tech-support',
    name: 'Tech Support / Supporto Tecnico',
    icon: '\uD83D\uDCBB',
    difficulty: 2,
    description: 'Describe a tech problem / Descrivi un problema tecnico',
    vocabulary: [
      { en: 'to restart', it: 'riavviare' },
      { en: 'update', it: 'aggiornamento' },
      { en: 'crash', it: 'blocco / crash' },
      { en: 'error message', it: 'messaggio di errore' },
      { en: 'password', it: 'password' },
      { en: 'browser', it: 'browser' },
      { en: 'to install', it: 'installare' },
      { en: 'slow', it: 'lento' },
    ],
    turns: [
      {
        assistant:
          "Hello, you've reached TechHelp support. My name is Mike. How can I assist you today?",
        patterns: [
          {
            match: /computer|laptop|PC|slow|crash|error|problem|issue|broken|work|screen|won't/i,
            response:
              "I'm sorry to hear that! Can you tell me more about what's happening? When does the problem occur?",
            nextTurn: 1,
          },
          {
            match: /internet|wifi|connect|network|online|website|browser/i,
            response:
              'I see, a connectivity issue. Are other devices connecting to the internet normally, or is it just this one?',
            nextTurn: 1,
          },
          {
            match: /password|login|account|access|locked|forgot/i,
            response:
              "No worries, we can help with that! Can you tell me which account or service you're having trouble with?",
            nextTurn: 2,
          },
        ],
        fallback:
          "Could you describe the technical problem you're experiencing? Is it related to your computer, internet, or an account?",
        vocab: { en: 'technical issue / problem', it: 'problema tecnico' },
      },
      {
        assistant:
          'Can you tell me more about the problem? When does it happen, and have you tried anything to fix it?',
        patterns: [
          {
            match: /restart|reboot|tried|nothing|off|on|turn/i,
            response:
              "Good, you've already tried restarting. Let's try something else. Can you check if your software is up to date? Go to Settings and look for 'Updates'.",
            nextTurn: 2,
          },
          {
            match: /happen|every|when|open|start|always|sometimes|since|yesterday|today/i,
            response:
              "I understand. First, let's try restarting the device. Can you turn it off completely, wait 30 seconds, and turn it back on?",
            nextTurn: 2,
          },
          {
            match: /error|message|screen|blue|pop|warning/i,
            response:
              'Can you read me the error message? Or describe what appears on the screen? That will help me identify the issue.',
            nextTurn: 2,
          },
        ],
        fallback: 'Has this been happening for long? And have you tried restarting the device?',
        vocab: { en: 'to restart / to reboot', it: 'riavviare' },
      },
      {
        assistant:
          "Let's try a few troubleshooting steps. First, make sure everything is updated. Go to your settings and check for updates. Did that help?",
        patterns: [
          {
            match: /yes|work|fixed|better|help|solved|great/i,
            response:
              "Excellent! I'm glad we could resolve it! Is there anything else I can help you with?",
            nextTurn: 4,
          },
          {
            match: /no|still|same|didn't|doesn't|not work/i,
            response:
              "Let's try clearing the cache. Go to Settings, then Storage or Browser settings, and select 'Clear cache'. Can you try that?",
            nextTurn: 3,
          },
          {
            match: /how|where|find|setting|can't find/i,
            response:
              "No problem! Click on the Start menu or the gear icon, then look for 'Update & Security' or 'System Updates'. Let me know what you see.",
            nextTurn: 3,
          },
        ],
        fallback: 'Were you able to check for updates? Did it help with the problem?',
        vocab: { en: 'to update / software update', it: 'aggiornare / aggiornamento' },
      },
      {
        assistant: "Let's try clearing the cache and temporary files. Did that fix the issue?",
        patterns: [
          {
            match: /yes|work|fixed|better|help|solved/i,
            response:
              "That's great news! Clearing the cache often solves performance issues. Is there anything else I can help with?",
            nextTurn: 4,
          },
          {
            match: /no|still|same|didn't|doesn't/i,
            response:
              "I see. In that case, I'd recommend running a full system scan. If the problem persists, we may need to schedule a technician visit. Would you like me to set that up?",
            nextTurn: 4,
          },
        ],
        fallback: 'Were you able to clear the cache? Did it improve things?',
        vocab: { en: 'cache / temporary files', it: 'cache / file temporanei' },
      },
      {
        assistant: 'Is there anything else I can help you with today?',
        patterns: [
          {
            match: /no|thank|that's all|fine|good|nothing|bye/i,
            response:
              "You're welcome! If you ever have another issue, don't hesitate to call us. Have a great day!",
            nextTurn: 5,
          },
          {
            match: /.+/,
            response:
              "I'll make a note of that and have someone follow up. Thank you for calling TechHelp! Have a great day!",
            nextTurn: 5,
          },
        ],
        fallback: 'Is there anything else, or is everything working now?',
        vocab: { en: 'to troubleshoot', it: 'risolvere problemi' },
      },
      {
        assistant:
          'Thank you for calling TechHelp! Remember, you can also visit our website for FAQs. Have a great day!',
        patterns: [],
        isEnd: true,
        fallback: '',
        vocab: { en: 'customer support', it: 'assistenza clienti' },
      },
    ],
  },
];

class AIService {
  constructor() {
    this.scenarios = SCENARIOS;
  }

  /**
   * Get all available conversation scenarios
   * @returns {Array} Scenario metadata (id, name, icon, difficulty, description)
   */
  getScenarios() {
    return this.scenarios.map((s) => ({
      id: s.id,
      name: s.name,
      icon: s.icon,
      difficulty: s.difficulty,
      description: s.description,
      vocabulary: s.vocabulary,
    }));
  }

  /**
   * Get a specific scenario by ID
   * @param {string} scenarioId
   * @returns {object|null}
   */
  getScenario(scenarioId) {
    return this.scenarios.find((s) => s.id === scenarioId) || null;
  }

  /**
   * Get the opening message for a scenario
   * @param {string} scenarioId
   * @returns {object} { message, vocab, isEnd }
   */
  getOpeningMessage(scenarioId) {
    const scenario = this.getScenario(scenarioId);
    if (!scenario || !scenario.turns.length) return null;

    const turn = scenario.turns[0];
    return {
      message: turn.assistant,
      vocab: turn.vocab || null,
      isEnd: false,
    };
  }

  /**
   * Get a response based on user input in the context of a conversation.
   * @param {string} userMessage - User's message text
   * @param {string} scenarioId - Current scenario ID
   * @param {number} currentTurn - Current turn index in the conversation tree
   * @returns {object} { message, corrections, vocabulary, isEnd, nextTurn }
   */
  getResponse(userMessage, scenarioId, currentTurn) {
    const scenario = this.getScenario(scenarioId);
    if (!scenario) {
      return {
        message: "I'm sorry, I couldn't find this conversation topic. Let's try another one!",
        corrections: [],
        vocabulary: null,
        isEnd: true,
        nextTurn: 0,
      };
    }

    const turn = scenario.turns[currentTurn];
    if (!turn) {
      return {
        message: 'Thank you for the conversation! You did a great job!',
        corrections: [],
        vocabulary: null,
        isEnd: true,
        nextTurn: currentTurn,
      };
    }

    // Check grammar
    const corrections = this._checkGrammar(userMessage);

    // If this is an end turn, just acknowledge
    if (turn.isEnd) {
      return {
        message: turn.assistant,
        corrections,
        vocabulary: turn.vocab || null,
        isEnd: true,
        nextTurn: currentTurn,
      };
    }

    // Match user input against patterns
    for (const pattern of turn.patterns) {
      if (pattern.test) {
        if (pattern.test(userMessage)) {
          const nextTurn = pattern.nextTurn ?? currentTurn + 1;
          const nextTurnData = scenario.turns[nextTurn];
          return {
            message: pattern.response,
            corrections,
            vocabulary: nextTurnData?.vocab || turn.vocab || null,
            isEnd: nextTurnData?.isEnd || false,
            nextTurn,
          };
        }
      } else if (pattern.match && pattern.match.test(userMessage)) {
        const nextTurn = pattern.nextTurn ?? currentTurn + 1;
        const nextTurnData = scenario.turns[nextTurn];
        return {
          message: pattern.response,
          corrections,
          vocabulary: nextTurnData?.vocab || turn.vocab || null,
          isEnd: nextTurnData?.isEnd || false,
          nextTurn,
        };
      }
    }

    // No pattern matched - provide fallback with gentle redirect
    return {
      message: turn.fallback || "I'm not sure I understood. Could you try rephrasing that?",
      corrections,
      vocabulary: turn.vocab || null,
      isEnd: false,
      nextTurn: currentTurn, // Stay on same turn
    };
  }

  /**
   * Check user message for common grammar mistakes
   * @param {string} message
   * @returns {Array} Array of { original, correction, hint }
   */
  _checkGrammar(message) {
    if (!message) return [];

    const corrections = [];

    for (const rule of GRAMMAR_RULES) {
      // If rule has a custom test function, check that first
      if (rule.test) {
        if (rule.test(message) && rule.hint) {
          corrections.push({
            original: message.match(rule.pattern)?.[0] || '',
            correction: rule.correction || '',
            hint: rule.hint,
          });
        }
        continue;
      }

      const match = message.match(rule.pattern);
      if (match) {
        const original = match[0];
        let correction = rule.correction;

        // Handle regex replacement groups
        if (correction && correction.includes('$1')) {
          correction = original.replace(rule.pattern, rule.correction);
        }

        corrections.push({
          original,
          correction: correction || '',
          hint: rule.hint,
        });
      }
    }

    return corrections;
  }

  /**
   * Get a difficulty label for display
   * @param {number} difficulty
   * @returns {object} { label, labelIt, stars }
   */
  getDifficultyInfo(difficulty) {
    const levels = {
      1: { label: 'Beginner', labelIt: 'Principiante', stars: 1 },
      2: { label: 'Intermediate', labelIt: 'Intermedio', stars: 2 },
      3: { label: 'Advanced', labelIt: 'Avanzato', stars: 3 },
    };
    return levels[difficulty] || levels[1];
  }
}

export const aiService = new AIService();
