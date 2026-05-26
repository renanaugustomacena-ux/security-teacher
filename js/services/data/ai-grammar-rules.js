export const GRAMMAR_RULES = [
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
  // Italian false friends
  {
    pattern: /\beventually\b/i,
    test: (msg) => /\beventually\b/i.test(msg) && /\bmaybe\b|\bpossibly\b|\bif\b/i.test(msg),
    correction: null,
    hint: '"Eventually" means "alla fine", not "eventualmente" (which is "possibly/if needed").',
  },
  {
    pattern: /\bsensible\b/i,
    test: (msg) => /\bsensible data\b|\bsensible information\b/i.test(msg),
    correction: 'sensitive',
    hint: '"Sensibile" \u2192 "sensitive" (not "sensible", which means "ragionevole").',
  },
  {
    pattern: /\blibrary\b/i,
    test: (msg) =>
      /\bgo to the library\b/i.test(msg) === false && /\bbookshop\b|\bbookstore\b/i.test(msg),
    correction: null,
    hint: '"Libreria" \u2192 "bookshop". A "library" is a "biblioteca".',
  },
  {
    pattern: /\bpretend\b/i,
    test: (msg) => /\bpretend to\b/i.test(msg) && /\bask\b|\brequire\b|\bexpect\b/i.test(msg),
    correction: null,
    hint: '"Pretendere" \u2192 "to expect/demand". "Pretend" means "fingere".',
  },
  // Subject-verb agreement
  {
    pattern: /\bthe data is\b/i,
    correction: 'the data are',
    hint: '"Data" is plural (singular: "datum"). Say "the data are" in formal/technical writing.',
  },
  {
    pattern: /\binformations\b/i,
    correction: 'information',
    hint: '"Information" is uncountable in English. No "s": "the information is...".',
  },
  {
    pattern: /\badvices\b/i,
    correction: 'advice',
    hint: '"Advice" is uncountable in English. Say "pieces of advice", not "advices".',
  },
  {
    pattern: /\bsoftwares\b/i,
    correction: 'software',
    hint: '"Software" is uncountable. Say "software packages" if you need a plural.',
  },
  {
    pattern: /\bhardwares\b/i,
    correction: 'hardware',
    hint: '"Hardware" is uncountable. Say "hardware components" for plural.',
  },
  {
    pattern: /\bfeedbacks\b/i,
    correction: 'feedback',
    hint: '"Feedback" is uncountable. Say "pieces of feedback", not "feedbacks".',
  },
  {
    pattern: /\bresearchs\b/i,
    correction: 'research',
    hint: '"Research" is uncountable. Say "research studies" for plural.',
  },
  {
    pattern: /\bequipments\b/i,
    correction: 'equipment',
    hint: '"Equipment" is uncountable. Say "pieces of equipment".',
  },
  // Preposition errors common for Italian speakers
  {
    pattern: /\bgo to home\b/i,
    correction: 'go home',
    hint: 'No preposition needed: "go home", not "go to home".',
  },
  {
    pattern: /\blisten (?!to\b)\w/i,
    correction: null,
    hint: '"Listen" needs "to": "listen to music", not "listen music".',
  },
  {
    pattern: /\bmarried with\b/i,
    correction: 'married to',
    hint: 'In English: "married to", not "married with" (Italian: sposato con).',
  },
  {
    pattern: /\bconsist in\b/i,
    correction: 'consist of',
    hint: 'In English: "consist of", not "consist in" (Italian: consistere in).',
  },
  {
    pattern: /\bparticipate to\b/i,
    correction: 'participate in',
    hint: 'In English: "participate in", not "participate to" (Italian: partecipare a).',
  },
  {
    pattern: /\bdiscuss about\b/i,
    correction: 'discuss',
    hint: '"Discuss" is transitive: "discuss the issue", not "discuss about the issue".',
  },
  {
    pattern: /\benter into the\b/i,
    test: (msg) => !/\benter into the (?:agreement|contract|deal)\b/i.test(msg),
    correction: 'enter the',
    hint: '"Enter" doesn\'t need "into": "enter the room", not "enter into the room".',
  },
  {
    pattern: /\bgo to abroad\b/i,
    correction: 'go abroad',
    hint: 'No preposition: "go abroad", not "go to abroad".',
  },
  {
    pattern: /\baccording with\b/i,
    correction: 'according to',
    hint: '"According to", not "according with".',
  },
  // Article errors
  {
    pattern: /\ban (?:university|useful|unique|union|user|uniform|united)\b/i,
    correction: null,
    hint: 'Use "a" before words starting with a "yoo" sound: "a university", "a useful tool".',
  },
  {
    pattern: /\ba (?:hour|honest|honor|heir)\b/i,
    correction: null,
    hint: 'Use "an" before silent "h": "an hour", "an honest person".',
  },
  // Verb form errors
  {
    pattern: /\bcan (?:to )\w/i,
    correction: null,
    hint: '"Can" is followed by the base verb, no "to": "can do", not "can to do".',
  },
  {
    pattern: /\bmust to\b/i,
    correction: null,
    hint: '"Must" is followed by the base verb, no "to": "must go", not "must to go".',
  },
  {
    pattern: /\bwould to\b/i,
    correction: null,
    hint: '"Would" is followed by the base verb: "would like", not "would to like".',
  },
  {
    pattern: /\blet me to\b/i,
    correction: 'let me',
    hint: '"Let" is followed by the base verb: "let me try", not "let me to try".',
  },
  {
    pattern: /\bmake me to\b/i,
    correction: 'make me',
    hint: '"Make" is followed by the base verb: "it makes me think", not "makes me to think".',
  },
  // Double negatives
  {
    pattern: /\bdon't.*nothing\b/i,
    correction: null,
    hint: 'Avoid double negatives: "I don\'t have anything" or "I have nothing", not both.',
  },
  {
    pattern: /\bdon't.*nobody\b/i,
    correction: null,
    hint: 'Avoid double negatives: "I don\'t know anybody" or "I know nobody".',
  },
  // Word order
  {
    pattern: /\balways I\b/i,
    correction: 'I always',
    hint: 'Adverbs go after the subject: "I always", not "always I" (Italian: sempre io).',
  },
  {
    pattern: /\bnever I\b/i,
    correction: 'I never',
    hint: 'Adverbs go after the subject: "I never", not "never I".',
  },
  // Tech-specific patterns
  {
    pattern: /\bdo a deploy\b/i,
    correction: 'do a deployment',
    hint: '"Deploy" is a verb; the noun form is "deployment": "do a deployment".',
  },
  {
    pattern: /\binstall the (?:software|app|program) in\b/i,
    correction: null,
    hint: 'We "install on" a device/machine: "install on the server", not "install in".',
  },
  {
    pattern: /\bthe code don't\b/i,
    correction: "the code doesn't",
    hint: '"Code" is third person singular: "doesn\'t", not "don\'t".',
  },
  {
    pattern: /\bthe server don't\b/i,
    correction: "the server doesn't",
    hint: '"Server" is third person singular: "doesn\'t", not "don\'t".',
  },
  {
    pattern: /\bthe program don't\b/i,
    correction: "the program doesn't",
    hint: '"Program" is third person singular: "doesn\'t", not "don\'t".',
  },
  {
    pattern: /\bthe system don't\b/i,
    correction: "the system doesn't",
    hint: '"System" is third person singular: "doesn\'t", not "don\'t".',
  },
  // Tense errors
  {
    pattern: /\bsince \d+ (?:years?|months?|days?)\b/i,
    correction: null,
    hint: '"Since" needs a point in time: "since 2020". For duration, use "for 5 years".',
  },
  {
    pattern: /\bI am working here since\b/i,
    correction: 'I have been working here since',
    hint: 'Use present perfect with "since": "I have been working here since...".',
  },
  {
    pattern: /\byesterday I go\b/i,
    correction: 'yesterday I went',
    hint: 'Past time markers need past tense: "yesterday I went".',
  },
  {
    pattern: /\blast week I (?:go|come|see|do|make|have|get|run|write|read)\b/i,
    correction: null,
    hint: 'Past time markers need past tense: "last week I went/came/saw...".',
  },
  // Common misspellings in tech
  {
    pattern: /\bwich\b/i,
    correction: 'which',
    hint: 'Spelling: "which", not "wich".',
  },
  {
    pattern: /\bteh\b/i,
    correction: 'the',
    hint: 'Spelling: "the", not "teh".',
  },
  {
    pattern: /\brecieve\b/i,
    correction: 'receive',
    hint: 'Spelling: "receive" (i before e except after c).',
  },
  {
    pattern: /\boccured\b/i,
    correction: 'occurred',
    hint: 'Spelling: "occurred" (double r).',
  },
  {
    pattern: /\bseperate\b/i,
    correction: 'separate',
    hint: 'Spelling: "separate" (a, not e).',
  },
  {
    pattern: /\bneccessary\b/i,
    correction: 'necessary',
    hint: 'Spelling: "necessary" (one c, double s).',
  },
  {
    pattern: /\benviroment\b/i,
    correction: 'environment',
    hint: 'Spelling: "environment" (don\'t forget the "n" before "ment").',
  },
  {
    pattern: /\bdefenitely\b/i,
    correction: 'definitely',
    hint: 'Spelling: "definitely" (not "definately" or "defenitely").',
  },
  // Formality/register for tech communication
  {
    pattern: /\bgonna\b/i,
    correction: 'going to',
    hint: '"Gonna" is very informal. In tech writing, use "going to".',
  },
  {
    pattern: /\bwanna\b/i,
    correction: 'want to',
    hint: '"Wanna" is very informal. In professional context, use "want to".',
  },
  {
    pattern: /\bgotta\b/i,
    correction: 'have to / got to',
    hint: '"Gotta" is informal. Use "have to" or "need to" in professional writing.',
  },
  // Italian-influenced syntax
  {
    pattern: /\bI am (?:\d+|twenty|thirty|forty|fifty|sixty) (?:years?\s+)?old\b/i,
    correction: null,
    hint: null,
  },
  {
    pattern: /\bis (?:very|much|really) important that\b/i,
    test: (msg) => /\bis (?:very|much|really) important that .* (?:do|go|make|have)\b/i.test(msg),
    correction: null,
    hint: 'After "it\'s important that", use subjunctive: "...that he do" (not "does").',
  },
  {
    pattern: /\bthe responsible of\b/i,
    correction: 'the person responsible for',
    hint: '"Responsible" is an adjective in English, not a noun. Say "the person responsible for".',
  },
  {
    pattern: /\bhow is called\b/i,
    correction: 'what is it called',
    hint: 'English uses "what": "what is it called?", not "how is called?" (Italian: come si chiama?).',
  },
  {
    pattern: /\bi have hunger\b/i,
    correction: 'I am hungry',
    hint: 'English: "I am hungry" (adjective), not "I have hunger" (Italian: ho fame).',
  },
  {
    pattern: /\bi have thirst\b/i,
    correction: 'I am thirsty',
    hint: 'English: "I am thirsty" (adjective), not "I have thirst" (Italian: ho sete).',
  },
  {
    pattern: /\bi have cold\b/i,
    correction: 'I am cold',
    hint: 'English: "I am cold" (adjective), not "I have cold" (Italian: ho freddo).',
  },
  {
    pattern: /\bi have hot\b/i,
    correction: 'I am hot',
    hint: 'English: "I am hot" (adjective), not "I have hot" (Italian: ho caldo).',
  },
  {
    pattern: /\bi have fear\b/i,
    correction: 'I am afraid',
    hint: 'English: "I am afraid", not "I have fear" (Italian: ho paura).',
  },
  {
    pattern: /\bi have reason\b/i,
    correction: 'I am right',
    hint: 'English: "I am right", not "I have reason" (Italian: ho ragione).',
  },
  // Phrasal verb confusion
  {
    pattern: /\bturn on the\b.*\bturn on the\b/i,
    correction: null,
    hint: null,
  },
  {
    pattern: /\bopen the (?:computer|laptop|PC|server)\b/i,
    correction: 'turn on',
    hint: 'English: "turn on the computer", not "open" it (Italian: accendere/aprire).',
  },
  {
    pattern: /\bclose the (?:computer|laptop|PC|server)\b/i,
    test: (msg) => !/\bclose the (?:computer|laptop|PC|server) lid\b/i.test(msg),
    correction: 'shut down / turn off',
    hint: 'English: "shut down" or "turn off" a computer, not "close" it (Italian: chiudere/spegnere).',
  },
  // Conditional errors
  {
    pattern: /\bif I would\b/i,
    correction: 'if I',
    hint: 'Don\'t use "would" in the "if" clause: "If I had time, I would..." not "If I would have time".',
  },
  // Misc common errors
  {
    pattern: /\bsay me\b/i,
    correction: 'tell me',
    hint: '"Say" doesn\'t take a person object directly. Use "tell me", not "say me".',
  },
  {
    pattern: /\blike very much\b/i,
    test: (msg) => /\bi like very much\b/i.test(msg),
    correction: 'I really like',
    hint: 'English: "I really like..." (adverb before verb), not "I like very much" (Italian word order).',
  },
];
