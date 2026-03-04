/**
 * LESSONS DATABASE / DATABASE LEZIONI
 * ====================================
 *
 * English for Italian speakers - from beginner to C1.
 * Designed for students who start with very limited English
 * but must reach confident, high-level comprehension and production.
 *
 * Levels:
 *   0 - Sopravvivenza / Survival (Greetings, Essential Phrases, Everyday Verbs)
 *   1 - Vita Quotidiana / Daily Life (Descriptions, Time, Routines, Opinions)
 *   2 - Grammatica Intermedia / Intermediate Grammar (Conditionals, Passive, Connectors, Tenses)
 *   3 - Verso il C1 / Toward C1 (Idioms, Phrasal Verbs, Abstract Vocabulary, Nuance)
 */

export const lessonsDatabase = {
  // ==========================================
  // LEVEL 0 - SOPRAVVIVENZA / SURVIVAL
  // ==========================================
  0: {
    name: '👋 Sopravvivenza / Survival',
    unlocked: true,
    lessons: [
      {
        id: 'greetings',
        title: '👋 Saluti e Presentazioni / Greetings & Introductions',
        description: 'Come salutare e presentarsi / How to greet and introduce yourself',
        items: [
          {
            english: 'Hello, how are you doing?',
            italian: 'Ciao, come stai?',
            pronunciation: '/heˈləʊ haʊ ɑːr juː ˈduːɪŋ/',
            phonetic: 'he-LOU hau aar iuu DUU-ing',
            example:
              '"Hello, how are you doing?" - "I\'m doing great, thanks!" = "Ciao, come stai?" - "Sto benissimo, grazie!"',
          },
          {
            english: 'Nice to meet you',
            italian: 'Piacere di conoscerti',
            pronunciation: '/naɪs tuː miːt juː/',
            phonetic: 'nais tuu miit iuu',
            example: "Hi, I'm Marco. Nice to meet you! = Ciao, sono Marco. Piacere di conoscerti!",
          },
          {
            english: 'Good morning / Good evening',
            italian: 'Buongiorno / Buonasera',
            pronunciation: '/ɡʊd ˈmɔːnɪŋ/, /ɡʊd ˈiːvnɪŋ/',
            phonetic: 'gud MOR-ning, gud IIV-ning',
            example: 'Good morning! How did you sleep? = Buongiorno! Come hai dormito?',
          },
          {
            english: 'See you later / See you soon',
            italian: 'A dopo / A presto',
            pronunciation: '/siː juː ˈleɪtər/',
            phonetic: 'sii iuu LEI-ter',
            example: 'I have to go now. See you later! = Devo andare adesso. A dopo!',
          },
          {
            english: 'Could you say that again, please?',
            italian: 'Potresti ripeterlo, per favore?',
            pronunciation: '/kʊd juː seɪ ðæt əˈɡen pliːz/',
            phonetic: 'kud iuu SEI det e-GHEN pliiz',
            example:
              'Sorry, could you say that again, please? = Scusa, potresti ripeterlo, per favore?',
          },
          {
            english: "I don't understand what you mean",
            italian: 'Non capisco cosa intendi',
            pronunciation: '/aɪ dəʊnt ˌʌndəˈstænd wɒt juː miːn/',
            phonetic: 'ai dount ander-STEND uot iuu miin',
            example:
              "I don't understand what you mean. Can you explain? = Non capisco cosa intendi. Puoi spiegare?",
          },
          {
            english: 'Excuse me, where is the...?',
            italian: "Scusi, dov'è il/la...?",
            pronunciation: '/ɪkˈskjuːz miː weər ɪz ðə/',
            phonetic: 'ik-SKIUUZ mii uer is de',
            example: "Excuse me, where is the train station? = Scusi, dov'è la stazione?",
          },
          {
            english: 'Thank you very much, I appreciate it',
            italian: 'Grazie mille, lo apprezzo',
            pronunciation: '/θæŋk juː ˈveri mʌtʃ aɪ əˈpriːʃieɪt ɪt/',
            phonetic: 'fenk iuu VE-ri mach ai a-PRII-sci-eit it',
            example:
              'Thank you very much for your help, I really appreciate it. = Grazie mille per il tuo aiuto, lo apprezzo davvero.',
          },
          {
            english: "I'm sorry, that was my mistake",
            italian: 'Mi dispiace, è stato un mio errore',
            pronunciation: '/aɪm ˈsɒri ðæt wɒz maɪ mɪˈsteɪk/',
            phonetic: 'aim SO-ri det uoz mai mi-STEIK',
            example:
              "I'm sorry, that was my mistake. Let me fix it. = Mi dispiace, è stato un mio errore. Lasciami rimediare.",
          },
          {
            english: "My name is... and I'm from Italy",
            italian: "Mi chiamo... e vengo dall'Italia",
            pronunciation: '/maɪ neɪm ɪz ... ænd aɪm frɒm ˈɪtəli/',
            phonetic: 'mai NEIM is ... end aim from I-te-li',
            example:
              "My name is Giulia and I'm from Italy. = Mi chiamo Giulia e vengo dall'Italia.",
          },
        ],
      },
      {
        id: 'essential_phrases',
        title: '💬 Frasi Essenziali / Essential Phrases',
        description:
          'Frasi che userai ogni giorno in contesti reali / Phrases for real-world situations',
        items: [
          {
            english: 'I would like to order...',
            italian: 'Vorrei ordinare...',
            pronunciation: '/aɪ wʊd laɪk tuː ˈɔːdər/',
            phonetic: 'ai uud laik tuu OR-der',
            example:
              'I would like to order a coffee and a sandwich, please. = Vorrei ordinare un caffè e un panino, per favore.',
          },
          {
            english: 'How much does this cost?',
            italian: 'Quanto costa questo?',
            pronunciation: '/haʊ mʌtʃ dʌz ðɪs kɒst/',
            phonetic: 'hau mach das dis cost',
            example:
              "How much does this cost? Is there a discount? = Quanto costa questo? C'è uno sconto?",
          },
          {
            english: 'Can you help me with this?',
            italian: 'Puoi aiutarmi con questo?',
            pronunciation: '/kæn juː help miː wɪð ðɪs/',
            phonetic: 'ken iuu help mii uid dis',
            example:
              "I'm lost. Can you help me with this map? = Mi sono perso. Puoi aiutarmi con questa mappa?",
          },
          {
            english: 'I need to find...',
            italian: 'Devo trovare...',
            pronunciation: '/aɪ niːd tuː faɪnd/',
            phonetic: 'ai niid tuu faind',
            example: 'I need to find a pharmacy nearby. = Devo trovare una farmacia qui vicino.',
          },
          {
            english: 'What time does it open / close?',
            italian: 'A che ora apre / chiude?',
            pronunciation: '/wɒt taɪm dʌz ɪt ˈəʊpən/',
            phonetic: 'uot taim das it OU-pen',
            example: 'What time does the museum open? = A che ora apre il museo?',
          },
          {
            english: "I'm looking for something specific",
            italian: 'Sto cercando qualcosa di specifico',
            pronunciation: '/aɪm ˈlʊkɪŋ fɔːr ˈsʌmθɪŋ spəˈsɪfɪk/',
            phonetic: 'aim LUK-ing for SAM-fing spe-SI-fik',
            example:
              "I'm looking for something specific - a book about Italian history. = Sto cercando qualcosa di specifico - un libro sulla storia italiana.",
          },
          {
            english: "I don't agree with that",
            italian: "Non sono d'accordo",
            pronunciation: '/aɪ dəʊnt əˈɡriː wɪð ðæt/',
            phonetic: 'ai dount a-GRII uid det',
            example: "I don't agree with that decision. = Non sono d'accordo con quella decisione.",
          },
          {
            english: 'That makes sense',
            italian: 'Ha senso / È logico',
            pronunciation: '/ðæt meɪks sens/',
            phonetic: 'det meiks sens',
            example: 'Oh, that makes sense now! = Ah, adesso ha senso!',
          },
          {
            english: "I'm not sure, let me think about it",
            italian: 'Non sono sicuro, fammi pensare',
            pronunciation: '/aɪm nɒt ʃʊər let miː θɪŋk əˈbaʊt ɪt/',
            phonetic: 'aim not sciur let mii fink a-BAUT it',
            example:
              "That's a good question. I'm not sure, let me think about it. = Buona domanda. Non sono sicuro, fammi pensare.",
          },
          {
            english: 'Would you mind repeating that?',
            italian: 'Ti dispiacerebbe ripetere?',
            pronunciation: '/wʊd juː maɪnd rɪˈpiːtɪŋ ðæt/',
            phonetic: 'uud iuu maind ri-PII-ting det',
            example:
              'Sorry, would you mind repeating that more slowly? = Scusa, ti dispiacerebbe ripetere più lentamente?',
          },
        ],
      },
      {
        id: 'everyday_verbs',
        title: '⚡ Verbi di Ogni Giorno / Everyday Action Verbs',
        description:
          'I verbi fondamentali usati in frasi complete / Essential verbs in full sentences',
        items: [
          {
            english: 'I usually go to work by bus',
            italian: 'Di solito vado al lavoro in autobus',
            pronunciation: '/aɪ ˈjuːʒuəli ɡəʊ tuː wɜːk baɪ bʌs/',
            phonetic: 'ai IUU-ju-e-li gou tuu uerk bai bas',
            example:
              'I usually go to work by bus, but sometimes I walk. = Di solito vado al lavoro in autobus, ma a volte cammino.',
          },
          {
            english: 'She always eats breakfast before leaving',
            italian: 'Fa sempre colazione prima di uscire',
            pronunciation: '/ʃiː ˈɔːlweɪz iːts ˈbrekfəst bɪˈfɔːr ˈliːvɪŋ/',
            phonetic: 'scii OL-ueiz iits BREK-fest bi-FOOR LII-ving',
            example:
              'She always eats breakfast before leaving the house. = Fa sempre colazione prima di uscire di casa.',
          },
          {
            english: 'We need to finish this by tomorrow',
            italian: 'Dobbiamo finire questo entro domani',
            pronunciation: '/wiː niːd tuː ˈfɪnɪʃ ðɪs baɪ təˈmɒrəʊ/',
            phonetic: 'uii niid tuu FI-nish dis bai te-MO-rou',
            example:
              'We need to finish this project by tomorrow morning. = Dobbiamo finire questo progetto entro domani mattina.',
          },
          {
            english: 'They have been waiting for an hour',
            italian: "Stanno aspettando da un'ora",
            pronunciation: '/ðeɪ hæv biːn ˈweɪtɪŋ fɔːr ən ˈaʊər/',
            phonetic: 'dei hev biin UEI-ting for en AU-er',
            example:
              "They have been waiting for an hour already. = Stanno aspettando già da un'ora.",
          },
          {
            english: 'I forgot to bring my wallet',
            italian: 'Ho dimenticato di portare il portafoglio',
            pronunciation: '/aɪ fəˈɡɒt tuː brɪŋ maɪ ˈwɒlɪt/',
            phonetic: 'ai fe-GOT tuu bring mai UO-lit',
            example:
              'Oh no, I forgot to bring my wallet! Can I pay you back later? = Oh no, ho dimenticato il portafoglio! Posso ripagarti dopo?',
          },
          {
            english: 'He told me he would come later',
            italian: 'Mi ha detto che sarebbe venuto dopo',
            pronunciation: '/hiː təʊld miː hiː wʊd kʌm ˈleɪtər/',
            phonetic: 'hii told mii hii uud kam LEI-ter',
            example:
              'He told me he would come later, but he never showed up. = Mi ha detto che sarebbe venuto dopo, ma non si è mai presentato.',
          },
          {
            english: "I've been learning English for two months",
            italian: "Sto imparando l'inglese da due mesi",
            pronunciation: '/aɪv biːn ˈlɜːnɪŋ ˈɪŋɡlɪʃ fɔːr tuː mʌnθs/',
            phonetic: 'aiv biin LER-ning IN-glish for tuu manfs',
            example:
              "I've been learning English for two months and I can already hold basic conversations. = Sto imparando l'inglese da due mesi e riesco già a fare conversazioni base.",
          },
          {
            english: 'She decided to change her job',
            italian: 'Ha deciso di cambiare lavoro',
            pronunciation: '/ʃiː dɪˈsaɪdɪd tuː tʃeɪndʒ hɜːr dʒɒb/',
            phonetic: 'scii di-SAI-did tuu ceingg her giob',
            example:
              "She decided to change her job because she wasn't happy. = Ha deciso di cambiare lavoro perché non era felice.",
          },
          {
            english: 'We should probably leave now',
            italian: 'Probabilmente dovremmo andare adesso',
            pronunciation: '/wiː ʃʊd ˈprɒbəbli liːv naʊ/',
            phonetic: 'uii sciud PRO-be-bli liiv nau',
            example:
              "It's getting late. We should probably leave now. = Si sta facendo tardi. Probabilmente dovremmo andare adesso.",
          },
          {
            english: 'I wish I had studied harder',
            italian: 'Vorrei aver studiato di più',
            pronunciation: '/aɪ wɪʃ aɪ hæd ˈstʌdid ˈhɑːdər/',
            phonetic: 'ai uish ai hed STA-did HAR-der',
            example:
              'I wish I had studied harder when I was in school. = Vorrei aver studiato di più quando ero a scuola.',
          },
        ],
      },
    ],
  },

  // ==========================================
  // LEVEL 1 - VITA QUOTIDIANA / DAILY LIFE
  // ==========================================
  1: {
    name: '📚 Vita Quotidiana / Daily Life',
    unlocked: true,
    lessons: [
      {
        id: 'describing_people',
        title: '🧑 Descrivere Persone / Describing People',
        description:
          'Aggettivi e strutture per descrivere personalità e aspetto / Describing personality and appearance',
        items: [
          {
            english: 'She is quite tall and has curly brown hair',
            italian: 'È piuttosto alta e ha capelli ricci marroni',
            pronunciation: '/ʃiː ɪz kwaɪt tɔːl ænd hæz ˈkɜːli braʊn heər/',
            phonetic: 'scii is kuait tool end hez KER-li braun heer',
            example:
              'She is quite tall and has curly brown hair. She always wears a smile. = È piuttosto alta con capelli ricci marroni. Indossa sempre un sorriso.',
          },
          {
            english: 'He comes across as very confident',
            italian: "Dà l'impressione di essere molto sicuro di sé",
            pronunciation: '/hiː kʌmz əˈkrɒs æz ˈveri ˈkɒnfɪdənt/',
            phonetic: 'hii kams a-KROS ez VE-ri KON-fi-dent',
            example:
              "He comes across as very confident, but he's actually quite shy. = Dà l'impressione di essere molto sicuro, ma in realtà è piuttosto timido.",
          },
          {
            english: 'She tends to be a bit stubborn',
            italian: "Tende ad essere un po' testarda",
            pronunciation: '/ʃiː tendz tuː biː ə bɪt ˈstʌbərn/',
            phonetic: 'scii tendz tuu bii e bit STA-bern',
            example:
              "She tends to be a bit stubborn, but she's always fair. = Tende ad essere un po' testarda, ma è sempre giusta.",
          },
          {
            english: 'He is the kind of person who always helps others',
            italian: 'È il tipo di persona che aiuta sempre gli altri',
            pronunciation: '/hiː ɪz ðə kaɪnd ɒv ˈpɜːsən huː/',
            phonetic: 'hii is de kaind ov PER-sen huu',
            example:
              'He is the kind of person who always helps others without expecting anything in return. = È il tipo di persona che aiuta sempre gli altri senza aspettarsi nulla in cambio.',
          },
          {
            english: 'She has a great sense of humour',
            italian: "Ha un grande senso dell'umorismo",
            pronunciation: '/ʃiː hæz ə ɡreɪt sens ɒv ˈhjuːmər/',
            phonetic: 'scii hez e greit sens ov HIUM-er',
            example:
              "She has a great sense of humour - she can make anyone laugh. = Ha un grande senso dell'umorismo - riesce a far ridere chiunque.",
          },
          {
            english: 'They are incredibly hard-working',
            italian: 'Sono incredibilmente diligenti',
            pronunciation: '/ðeɪ ɑːr ɪnˈkredɪbli hɑːd ˈwɜːkɪŋ/',
            phonetic: 'dei aar in-KRE-di-bli hard UER-king',
            example:
              'My colleagues are incredibly hard-working. They stay late almost every day. = I miei colleghi sono incredibilmente diligenti. Restano fino a tardi quasi ogni giorno.',
          },
          {
            english: 'He can be quite moody sometimes',
            italian: 'Può essere piuttosto lunatico a volte',
            pronunciation: '/hiː kæn biː kwaɪt ˈmuːdi/',
            phonetic: 'hii ken bii kuait MUU-di',
            example:
              'He can be quite moody sometimes, especially in the morning. = Può essere piuttosto lunatico a volte, specialmente di mattina.',
          },
          {
            english: 'She is open-minded and easy to talk to',
            italian: 'È aperta di mente e facile con cui parlare',
            pronunciation: '/ʃiː ɪz ˈəʊpən ˈmaɪndɪd/',
            phonetic: 'scii is OU-pen MAIN-did',
            example:
              'She is open-minded and easy to talk to about anything. = È aperta di mente e facile con cui parlare di qualsiasi cosa.',
          },
          {
            english: 'He looks like his father but acts like his mother',
            italian: 'Assomiglia a suo padre ma si comporta come sua madre',
            pronunciation: '/hiː lʊks laɪk hɪz ˈfɑːðər bʌt ækts laɪk/',
            phonetic: 'hii luks laik his FA-der bat ekts laik',
            example:
              'He looks like his father but acts like his mother - thoughtful and caring. = Assomiglia a suo padre ma si comporta come sua madre - premuroso e attento.',
          },
          {
            english: 'What I admire most about her is her determination',
            italian: 'Quello che ammiro di più di lei è la sua determinazione',
            pronunciation: '/wɒt aɪ ədˈmaɪər məʊst əˈbaʊt hɜːr/',
            phonetic: 'uot ai ed-MAIR moust e-BAUT her',
            example:
              'What I admire most about her is her determination to never give up. = Quello che ammiro di più di lei è la sua determinazione a non arrendersi mai.',
          },
        ],
      },
      {
        id: 'daily_routines',
        title: '📅 Routines e Abitudini / Routines & Habits',
        description:
          'Parlare della propria giornata con dettaglio / Talking about your day in detail',
        items: [
          {
            english: 'I usually wake up at around seven',
            italian: 'Di solito mi sveglio verso le sette',
            pronunciation: '/aɪ ˈjuːʒuəli weɪk ʌp æt əˈraʊnd ˈsevən/',
            phonetic: 'ai IUU-ju-e-li ueik ap et e-RAUND SE-ven',
            example:
              'I usually wake up at around seven, have a quick shower, and grab breakfast. = Di solito mi sveglio verso le sette, faccio una doccia veloce e prendo la colazione.',
          },
          {
            english: 'After work, I tend to go for a run',
            italian: 'Dopo il lavoro, tendo ad andare a correre',
            pronunciation: '/ˈɑːftər wɜːk aɪ tend tuː ɡəʊ fɔːr ə rʌn/',
            phonetic: 'AF-ter uerk ai tend tuu gou for e ran',
            example:
              'After work, I tend to go for a run in the park to clear my head. = Dopo il lavoro, tendo ad andare a correre nel parco per schiarirmi le idee.',
          },
          {
            english: 'On weekends, I like to sleep in',
            italian: 'Nel weekend, mi piace dormire fino a tardi',
            pronunciation: '/ɒn ˈwiːkendz aɪ laɪk tuː sliːp ɪn/',
            phonetic: 'on UIIK-endz ai laik tuu sliip in',
            example:
              'On weekends, I like to sleep in and then have a big brunch. = Nel weekend, mi piace dormire fino a tardi e poi fare un brunch abbondante.',
          },
          {
            english: 'I hardly ever skip breakfast',
            italian: 'Non salto quasi mai la colazione',
            pronunciation: '/aɪ ˈhɑːdli ˈevər skɪp ˈbrekfəst/',
            phonetic: 'ai HARD-li E-ver skip BREK-fest',
            example:
              'I hardly ever skip breakfast - I need energy to start the day. = Non salto quasi mai la colazione - ho bisogno di energia per iniziare la giornata.',
          },
          {
            english: 'She spends most of her free time reading',
            italian: 'Passa la maggior parte del suo tempo libero a leggere',
            pronunciation: '/ʃiː spendz məʊst ɒv hɜːr friː taɪm ˈriːdɪŋ/',
            phonetic: 'scii spendz moust ov her frii taim RII-ding',
            example:
              'She spends most of her free time reading novels and watching documentaries. = Passa la maggior parte del suo tempo libero a leggere romanzi e guardare documentari.',
          },
          {
            english: "I've recently started going to the gym",
            italian: 'Ho iniziato ad andare in palestra di recente',
            pronunciation: '/aɪv ˈriːsəntli ˈstɑːtɪd ˈɡəʊɪŋ tuː ðə dʒɪm/',
            phonetic: 'aiv RII-sent-li STAR-tid GOU-ing tuu de gim',
            example:
              "I've recently started going to the gym three times a week. = Ho iniziato ad andare in palestra tre volte a settimana di recente.",
          },
          {
            english: 'He always puts things off until the last minute',
            italian: "Rimanda sempre le cose all'ultimo minuto",
            pronunciation: '/hiː ˈɔːlweɪz pʊts θɪŋz ɒf/',
            phonetic: 'hii OL-ueiz puts fings of',
            example:
              "He always puts things off until the last minute and then stresses out. = Rimanda sempre le cose all'ultimo minuto e poi si stressa.",
          },
          {
            english: "By the time I get home, I'm exhausted",
            italian: 'Quando arrivo a casa, sono esausto',
            pronunciation: '/baɪ ðə taɪm aɪ ɡet həʊm aɪm ɪɡˈzɔːstɪd/',
            phonetic: 'bai de taim ai get houm aim ig-ZOS-tid',
            example:
              "By the time I get home, I'm exhausted. I barely have energy to cook. = Quando arrivo a casa, sono esausto. Ho a malapena energia per cucinare.",
          },
          {
            english: 'We have dinner together as a family every evening',
            italian: 'Ceniamo insieme come famiglia ogni sera',
            pronunciation: '/wiː hæv ˈdɪnər təˈɡeðər/',
            phonetic: 'uii hev DI-ner te-GHE-der',
            example:
              "We have dinner together as a family every evening - it's our tradition. = Ceniamo insieme come famiglia ogni sera - è la nostra tradizione.",
          },
          {
            english: 'I need to get into the habit of waking up earlier',
            italian: "Devo prendere l'abitudine di svegliarmi prima",
            pronunciation: '/aɪ niːd tuː ɡet ˈɪntuː ðə ˈhæbɪt/',
            phonetic: 'ai niid tuu ghet IN-tuu de HE-bit',
            example:
              "I need to get into the habit of waking up earlier if I want to exercise before work. = Devo prendere l'abitudine di svegliarmi prima se voglio fare esercizio prima del lavoro.",
          },
        ],
      },
      {
        id: 'opinions_preferences',
        title: '💭 Opinioni e Preferenze / Opinions & Preferences',
        description: 'Esprimere opinioni e preferenze con sfumature / Express opinions with nuance',
        items: [
          {
            english: 'In my opinion, this is the best approach',
            italian: "Secondo me, questo è l'approccio migliore",
            pronunciation: '/ɪn maɪ əˈpɪnjən/',
            phonetic: 'in mai e-PIN-ien',
            example:
              "In my opinion, this is the best approach we can take right now. = Secondo me, questo è l'approccio migliore che possiamo adottare adesso.",
          },
          {
            english: "I'd rather stay home than go out tonight",
            italian: 'Preferisco stare a casa piuttosto che uscire stasera',
            pronunciation: '/aɪd ˈrɑːðər steɪ həʊm ðæn ɡəʊ aʊt/',
            phonetic: 'aid RA-der stei houm den gou aut',
            example:
              "I'd rather stay home than go out tonight. I'm too tired. = Preferisco stare a casa piuttosto che uscire stasera. Sono troppo stanco.",
          },
          {
            english: "I'm not really into that kind of music",
            italian: 'Quel tipo di musica non mi piace granché',
            pronunciation: '/aɪm nɒt ˈrɪəli ˈɪntuː/',
            phonetic: 'aim not RI-e-li IN-tuu',
            example:
              "I'm not really into that kind of music, but I respect your taste. = Quel tipo di musica non mi piace granché, ma rispetto i tuoi gusti.",
          },
          {
            english: 'I strongly believe that education is essential',
            italian: "Credo fermamente che l'istruzione sia essenziale",
            pronunciation: '/aɪ ˈstrɒŋli bɪˈliːv/',
            phonetic: 'ai STRONG-li bi-LIIV',
            example:
              "I strongly believe that education is essential for everyone. = Credo fermamente che l'istruzione sia essenziale per tutti.",
          },
          {
            english: 'It depends on the situation',
            italian: 'Dipende dalla situazione',
            pronunciation: '/ɪt dɪˈpendz ɒn ðə ˌsɪtjuˈeɪʃən/',
            phonetic: 'it di-PENDZ on de sit-iu-EI-scien',
            example:
              'Is it better to work from home? It depends on the situation. = È meglio lavorare da casa? Dipende dalla situazione.',
          },
          {
            english: "To be honest, I think you're wrong",
            italian: 'A dire il vero, penso che tu abbia torto',
            pronunciation: '/tuː biː ˈɒnɪst/',
            phonetic: 'tuu bii O-nist',
            example:
              "To be honest, I think you're wrong about this. Let me explain why. = A dire il vero, penso che tu abbia torto su questo. Lasciami spiegare perché.",
          },
          {
            english: 'I can see your point, but I disagree',
            italian: "Capisco il tuo punto di vista, ma non sono d'accordo",
            pronunciation: '/aɪ kæn siː jɔːr pɔɪnt bʌt aɪ ˌdɪsəˈɡriː/',
            phonetic: 'ai ken sii ior point bat ai dis-e-GRII',
            example:
              "I can see your point, but I disagree. The data shows something different. = Capisco il tuo punto di vista, ma non sono d'accordo. I dati mostrano qualcosa di diverso.",
          },
          {
            english: 'What matters most to me is honesty',
            italian: "Quello che conta di più per me è l'onestà",
            pronunciation: '/wɒt ˈmætərz məʊst tuː miː/',
            phonetic: 'uot ME-terz moust tuu mii',
            example:
              "What matters most to me is honesty. I can't stand people who lie. = Quello che conta di più per me è l'onestà. Non sopporto le persone che mentono.",
          },
          {
            english: "I'm torn between the two options",
            italian: 'Sono indeciso tra le due opzioni',
            pronunciation: '/aɪm tɔːn bɪˈtwiːn/',
            phonetic: 'aim torn bi-TUIIN',
            example:
              "I'm torn between the two options. Both have advantages and disadvantages. = Sono indeciso tra le due opzioni. Entrambe hanno vantaggi e svantaggi.",
          },
          {
            english: 'If I had to choose, I would pick the first one',
            italian: 'Se dovessi scegliere, sceglierei la prima',
            pronunciation: '/ɪf aɪ hæd tuː tʃuːz/',
            phonetic: 'if ai hed tuu ciuuz',
            example:
              'If I had to choose, I would pick the first one. It seems more practical. = Se dovessi scegliere, sceglierei la prima. Sembra più pratica.',
          },
        ],
      },
      {
        id: 'food_social',
        title: '🍕 Cibo e Situazioni Sociali / Food & Social Situations',
        description:
          "Al ristorante, a casa di amici, situazioni sociali / Restaurants, at friends' homes, social settings",
        items: [
          {
            english: 'Could I have the menu, please?',
            italian: 'Potrei avere il menù, per favore?',
            pronunciation: '/kʊd aɪ hæv ðə ˈmenjuː pliːz/',
            phonetic: 'kud ai hev de MEN-iuu pliiz',
            example:
              'Good evening. Could I have the menu, please? = Buonasera. Potrei avere il menù, per favore?',
          },
          {
            english: "I'll have the pasta, and for my drink, sparkling water",
            italian: 'Prendo la pasta, e da bere acqua frizzante',
            pronunciation: '/aɪl hæv ðə ˈpæstə/',
            phonetic: 'ail hev de PA-sta',
            example:
              "I'll have the pasta, and for my drink, sparkling water, please. = Prendo la pasta, e da bere acqua frizzante, per favore.",
          },
          {
            english: 'This tastes absolutely amazing',
            italian: 'È assolutamente squisito',
            pronunciation: '/ðɪs teɪsts ˌæbsəˈluːtli əˈmeɪzɪŋ/',
            phonetic: 'dis teists ab-so-LIUT-li e-MEI-zing',
            example:
              "Wow, this tastes absolutely amazing! What's in the sauce? = Wow, è assolutamente squisito! Cosa c'è nella salsa?",
          },
          {
            english: "I'm allergic to nuts, does this contain any?",
            italian: 'Sono allergico alle noci, ne contiene?',
            pronunciation: '/aɪm əˈlɜːdʒɪk tuː nʌts/',
            phonetic: 'aim a-LER-gik tuu nats',
            example:
              "I'm allergic to nuts. Does this dish contain any? = Sono allergico alle noci. Questo piatto ne contiene?",
          },
          {
            english: 'Help yourself to more food!',
            italian: 'Serviti pure!',
            pronunciation: '/help jɔːˈself tuː mɔːr fuːd/',
            phonetic: 'help ior-SELF tuu moor fuud',
            example:
              "There's plenty of food. Help yourself to more! = C'è un sacco di cibo. Serviti pure!",
          },
          {
            english: 'Shall we split the bill?',
            italian: 'Dividiamo il conto?',
            pronunciation: '/ʃæl wiː splɪt ðə bɪl/',
            phonetic: 'shel uii split de bil',
            example:
              'That was a great meal. Shall we split the bill? = È stato un ottimo pasto. Dividiamo il conto?',
          },
          {
            english: "I'm full, I couldn't eat another bite",
            italian: 'Sono pieno, non riesco a mangiare un altro boccone',
            pronunciation: '/aɪm fʊl aɪ ˈkʊdnt iːt əˈnʌðər baɪt/',
            phonetic: 'aim ful ai KUD-ent iit e-NA-der bait',
            example:
              "Thank you, I'm full. I couldn't eat another bite! = Grazie, sono pieno. Non riesco a mangiare un altro boccone!",
          },
          {
            english: 'Would you like to come over for dinner?',
            italian: 'Ti va di venire a cena da me?',
            pronunciation: '/wʊd juː laɪk tuː kʌm ˈəʊvər fɔːr ˈdɪnər/',
            phonetic: 'uud iuu laik tuu kam OU-ver for DI-ner',
            example:
              'Would you like to come over for dinner on Saturday? = Ti va di venire a cena da me sabato?',
          },
          {
            english: "I don't mind cooking if you bring dessert",
            italian: 'Non mi dispiace cucinare se tu porti il dolce',
            pronunciation: '/aɪ dəʊnt maɪnd ˈkʊkɪŋ/',
            phonetic: 'ai dount maind KUK-ing',
            example:
              "I don't mind cooking if you bring dessert. Deal? = Non mi dispiace cucinare se tu porti il dolce. Affare fatto?",
          },
          {
            english: 'The atmosphere here is really welcoming',
            italian: "L'atmosfera qui è davvero accogliente",
            pronunciation: '/ðə ˈætməsfɪər hɪər ɪz ˈrɪəli ˈwelkəmɪŋ/',
            phonetic: 'de ET-mos-fir hir is RI-e-li UEL-ke-ming',
            example:
              "The atmosphere here is really welcoming. I feel right at home. = L'atmosfera qui è davvero accogliente. Mi sento proprio a casa.",
          },
        ],
      },
    ],
  },

  // ==========================================
  // LEVEL 2 - GRAMMATICA INTERMEDIA / INTERMEDIATE GRAMMAR
  // ==========================================
  2: {
    name: '📝 Grammatica Intermedia / Intermediate Grammar',
    unlocked: true,
    lessons: [
      {
        id: 'conditionals',
        title: '🔀 Condizionali / Conditionals',
        description: 'If clauses: zero, first, second, third conditional',
        items: [
          {
            english: "If it rains, I'll take an umbrella",
            italian: 'Se piove, prenderò un ombrello',
            pronunciation: '/ɪf ɪt reɪnz aɪl teɪk ən ʌmˈbrelə/',
            phonetic: 'if it reinz ail teik en am-BRE-la',
            example:
              "First conditional: likely future. If it rains tomorrow, I'll take an umbrella. = Primo condizionale: futuro probabile.",
          },
          {
            english: 'If I were rich, I would travel the world',
            italian: 'Se fossi ricco, viaggerei per il mondo',
            pronunciation: '/ɪf aɪ wɜːr rɪtʃ aɪ wʊd ˈtrævəl/',
            phonetic: 'if ai uer rich ai uud TRE-vel',
            example:
              'Second conditional: unreal present. If I were rich, I would travel the world. = Secondo condizionale: presente irreale.',
          },
          {
            english: 'If I had known, I would have acted differently',
            italian: 'Se avessi saputo, avrei agito diversamente',
            pronunciation: '/ɪf aɪ hæd nəʊn aɪ wʊd hæv ˈæktɪd/',
            phonetic: 'if ai hed noun ai uud hev EK-tid',
            example:
              'Third conditional: unreal past. If I had known about the problem, I would have acted differently. = Terzo condizionale: passato irreale.',
          },
          {
            english: "Unless you study, you won't pass the exam",
            italian: "A meno che non studi, non passerai l'esame",
            pronunciation: '/ʌnˈles juː ˈstʌdi/',
            phonetic: 'an-LES iuu STA-di',
            example:
              'Unless means "if not". Unless you study hard, you won\'t pass the exam. = "Unless" significa "se non".',
          },
          {
            english: "As long as you try your best, I'll be proud",
            italian: 'Finché farai del tuo meglio, sarò orgoglioso',
            pronunciation: '/æz lɒŋ æz juː traɪ/',
            phonetic: 'ez long ez iuu trai',
            example:
              "As long as you try your best, I'll be proud of you. = Finché farai del tuo meglio, sarò orgoglioso di te.",
          },
          {
            english: 'Provided that everyone agrees, we can proceed',
            italian: "A condizione che tutti siano d'accordo, possiamo procedere",
            pronunciation: '/prəˈvaɪdɪd ðæt/',
            phonetic: 'pre-VAI-did det',
            example:
              "Provided that everyone agrees, we can proceed with the plan. = A condizione che tutti siano d'accordo, possiamo procedere con il piano.",
          },
          {
            english: "Even if I had more time, I wouldn't change my decision",
            italian: 'Anche se avessi più tempo, non cambierei la mia decisione',
            pronunciation: '/ˈiːvən ɪf/',
            phonetic: 'II-ven if',
            example:
              "Even if I had more time, I wouldn't change my decision. I'm confident about it. = Anche se avessi più tempo, non cambierei la mia decisione.",
          },
          {
            english: 'What would you do if you could start over?',
            italian: 'Cosa faresti se potessi ricominciare?',
            pronunciation: '/wɒt wʊd juː duː ɪf juː kʊd stɑːt ˈəʊvər/',
            phonetic: 'uot uud iuu duu if iuu kud start OU-ver',
            example:
              'What would you do if you could start over from scratch? = Cosa faresti se potessi ricominciare da zero?',
          },
          {
            english: 'Had I not missed the train, I would have arrived on time',
            italian: 'Se non avessi perso il treno, sarei arrivato in tempo',
            pronunciation: '/hæd aɪ nɒt mɪst ðə treɪn/',
            phonetic: 'hed ai not mist de trein',
            example:
              'Inverted conditional (formal): Had I not missed the train, I would have arrived on time. = Condizionale invertito (formale).',
          },
          {
            english: 'Suppose you won the lottery, what would you buy first?',
            italian: 'Supponi di vincere la lotteria, cosa compreresti prima?',
            pronunciation: '/səˈpəʊz juː wʌn ðə ˈlɒtəri/',
            phonetic: 'se-POUZ iuu uan de LO-te-ri',
            example:
              'Suppose you won the lottery, what would you buy first? = Supponi di vincere la lotteria, cosa compreresti prima?',
          },
        ],
      },
      {
        id: 'passive_voice',
        title: '🔄 Passivo e Strutture Formali / Passive & Formal Structures',
        description:
          'Costruzioni passive e linguaggio formale / Passive constructions and formal language',
        items: [
          {
            english: 'The project was completed ahead of schedule',
            italian: 'Il progetto è stato completato in anticipo sulla tabella di marcia',
            pronunciation: '/ðə ˈprɒdʒekt wɒz kəmˈpliːtɪd/',
            phonetic: 'de PRO-gekt uoz kem-PLII-tid',
            example:
              "The project was completed ahead of schedule thanks to the team's effort. = Il progetto è stato completato in anticipo grazie allo sforzo del team.",
          },
          {
            english: 'It is widely believed that exercise improves mood',
            italian: "È opinione diffusa che l'esercizio migliori l'umore",
            pronunciation: '/ɪt ɪz ˈwaɪdli bɪˈliːvd/',
            phonetic: 'it is UAID-li bi-LIIVD',
            example:
              "It is widely believed that exercise improves mood and reduces stress. = È opinione diffusa che l'esercizio migliori l'umore e riduca lo stress.",
          },
          {
            english: 'The issue is being investigated by the police',
            italian: 'La questione è sotto indagine da parte della polizia',
            pronunciation: '/ðə ˈɪʃuː ɪz ˈbiːɪŋ ɪnˈvestɪɡeɪtɪd/',
            phonetic: 'de I-sciuu is BII-ing in-VES-ti-ghei-tid',
            example:
              'The issue is being investigated by the police. We should hear back soon. = La questione è sotto indagine. Dovremmo avere notizie presto.',
          },
          {
            english: 'The results are expected to be released next week',
            italian: 'I risultati dovrebbero essere rilasciati la prossima settimana',
            pronunciation: '/ðə rɪˈzʌlts ɑːr ɪkˈspektɪd/',
            phonetic: 'de ri-ZALTS aar ik-SPEK-tid',
            example:
              'The results are expected to be released next week. = I risultati dovrebbero essere rilasciati la prossima settimana.',
          },
          {
            english: 'It has been suggested that we change the approach',
            italian: 'È stato suggerito di cambiare approccio',
            pronunciation: '/ɪt hæz biːn səˈdʒestɪd/',
            phonetic: 'it hez biin se-GES-tid',
            example:
              'It has been suggested that we change the approach entirely. = È stato suggerito di cambiare approccio completamente.',
          },
          {
            english: 'Mistakes were made, but lessons were learned',
            italian: 'Sono stati commessi errori, ma si sono imparate lezioni',
            pronunciation: '/mɪˈsteɪks wɜːr meɪd/',
            phonetic: 'mi-STEIKS uer meid',
            example:
              "Mistakes were made, but lessons were learned. We'll do better next time. = Sono stati commessi errori, ma si sono imparate lezioni.",
          },
          {
            english: 'He is said to be one of the most talented musicians',
            italian: 'Si dice che sia uno dei musicisti più talentuosi',
            pronunciation: '/hiː ɪz sed tuː biː/',
            phonetic: 'hii is sed tuu bii',
            example:
              'He is said to be one of the most talented musicians of his generation. = Si dice che sia uno dei musicisti più talentuosi della sua generazione.',
          },
          {
            english: 'The building was designed by a famous architect',
            italian: "L'edificio è stato progettato da un famoso architetto",
            pronunciation: '/ðə ˈbɪldɪŋ wɒz dɪˈzaɪnd/',
            phonetic: 'de BIL-ding uoz di-ZAIND',
            example:
              "The building was designed by a famous architect in the 1920s. = L'edificio è stato progettato da un famoso architetto negli anni '20.",
          },
          {
            english: 'This matter should be dealt with immediately',
            italian: 'Questa questione dovrebbe essere affrontata immediatamente',
            pronunciation: '/ðɪs ˈmætər ʃʊd biː delt wɪð/',
            phonetic: 'dis ME-ter sciud bii delt uid',
            example:
              "This matter should be dealt with immediately. We can't afford to wait. = Questa questione dovrebbe essere affrontata immediatamente.",
          },
          {
            english: 'The decision has yet to be announced officially',
            italian: 'La decisione deve ancora essere annunciata ufficialmente',
            pronunciation: '/ðə dɪˈsɪʒən hæz jet tuː biː/',
            phonetic: 'de di-SI-jen hez iet tuu bii',
            example:
              'The decision has yet to be announced officially, but rumours are spreading. = La decisione deve ancora essere annunciata ufficialmente, ma le voci si stanno diffondendo.',
          },
        ],
      },
      {
        id: 'connectors_linking',
        title: '🔗 Connettori e Coesione / Connectors & Cohesion',
        description: 'Collegare idee in modo fluido e articolato / Linking ideas smoothly',
        items: [
          {
            english: 'Although it was raining, we decided to go for a walk',
            italian: 'Nonostante piovesse, abbiamo deciso di fare una passeggiata',
            pronunciation: '/ɔːlˈðəʊ/',
            phonetic: 'ol-DOU',
            example:
              'Although it was raining heavily, we decided to go for a walk anyway. = Nonostante piovesse forte, abbiamo deciso di fare una passeggiata comunque.',
          },
          {
            english: 'However, the results were not what we expected',
            italian: 'Tuttavia, i risultati non erano quelli che ci aspettavamo',
            pronunciation: '/haʊˈevər/',
            phonetic: 'hau-E-ver',
            example:
              'We worked hard on the project. However, the results were not what we expected. = Abbiamo lavorato duro sul progetto. Tuttavia, i risultati non erano quelli che ci aspettavamo.',
          },
          {
            english: 'Furthermore, this approach has several advantages',
            italian: 'Inoltre, questo approccio ha diversi vantaggi',
            pronunciation: '/ˈfɜːðəmɔːr/',
            phonetic: 'FER-de-moor',
            example:
              'The price is competitive. Furthermore, this approach has several additional advantages. = Il prezzo è competitivo. Inoltre, questo approccio ha diversi vantaggi aggiuntivi.',
          },
          {
            english: 'Nevertheless, she managed to finish on time',
            italian: 'Ciononostante, è riuscita a finire in tempo',
            pronunciation: '/ˌnevəðəˈles/',
            phonetic: 'ne-ver-de-LES',
            example:
              'The deadline was tight. Nevertheless, she managed to finish on time. = La scadenza era stretta. Ciononostante, è riuscita a finire in tempo.',
          },
          {
            english: 'As a result, the company had to lay off employees',
            italian: "Di conseguenza, l'azienda ha dovuto licenziare dipendenti",
            pronunciation: '/æz ə rɪˈzʌlt/',
            phonetic: 'ez e ri-ZALT',
            example:
              "Sales dropped significantly. As a result, the company had to lay off employees. = Le vendite sono calate significativamente. Di conseguenza, l'azienda ha dovuto licenziare dipendenti.",
          },
          {
            english: 'On the one hand... on the other hand...',
            italian: "Da un lato... dall'altro lato...",
            pronunciation: '/ɒn ðə wʌn hænd/',
            phonetic: 'on de uan hend',
            example:
              "On the one hand, the job pays well. On the other hand, the hours are terrible. = Da un lato, il lavoro paga bene. Dall'altro, gli orari sono terribili.",
          },
          {
            english: 'In addition to that, we also need to consider the costs',
            italian: 'Oltre a ciò, dobbiamo anche considerare i costi',
            pronunciation: '/ɪn əˈdɪʃən tuː ðæt/',
            phonetic: 'in e-DI-scien tuu det',
            example:
              'In addition to that, we also need to consider the environmental costs. = Oltre a ciò, dobbiamo anche considerare i costi ambientali.',
          },
          {
            english: 'Despite being exhausted, he continued working',
            italian: 'Nonostante fosse esausto, ha continuato a lavorare',
            pronunciation: '/dɪˈspaɪt/',
            phonetic: 'di-SPAIT',
            example:
              'Despite being exhausted, he continued working until midnight. = Nonostante fosse esausto, ha continuato a lavorare fino a mezzanotte.',
          },
          {
            english: 'Whereas some people prefer cities, others enjoy the countryside',
            italian: 'Mentre alcune persone preferiscono la città, altre amano la campagna',
            pronunciation: '/weərˈæz/',
            phonetic: 'uer-EZ',
            example:
              'Whereas some people prefer cities, others enjoy the countryside for its peace and quiet. = Mentre alcune persone preferiscono la città, altre amano la campagna per la pace e la tranquillità.',
          },
          {
            english: 'To sum up, the advantages outweigh the disadvantages',
            italian: 'In sintesi, i vantaggi superano gli svantaggi',
            pronunciation: '/tuː sʌm ʌp/',
            phonetic: 'tuu sam ap',
            example:
              'To sum up, the advantages clearly outweigh the disadvantages of this plan. = In sintesi, i vantaggi superano chiaramente gli svantaggi di questo piano.',
          },
        ],
      },
    ],
  },

  // ==========================================
  // LEVEL 3 - VERSO IL C1 / TOWARD C1
  // ==========================================
  3: {
    name: '🎯 Verso il C1 / Toward C1',
    unlocked: true,
    lessons: [
      {
        id: 'phrasal_verbs',
        title: '🔥 Phrasal Verbs Essenziali / Essential Phrasal Verbs',
        description:
          'I phrasal verbs più usati con significati multipli / Most-used phrasal verbs with multiple meanings',
        items: [
          {
            english: 'To come up with (an idea / a solution)',
            italian: "Trovare / Inventare (un'idea / una soluzione)",
            pronunciation: '/tuː kʌm ʌp wɪð/',
            phonetic: 'tuu kam ap uid',
            example:
              'She came up with a brilliant solution to the problem. = Ha trovato una soluzione brillante al problema.',
          },
          {
            english: 'To put up with (something annoying)',
            italian: 'Sopportare / Tollerare (qualcosa di fastidioso)',
            pronunciation: '/tuː pʊt ʌp wɪð/',
            phonetic: 'tuu put ap uid',
            example: "I can't put up with this noise anymore! = Non sopporto più questo rumore!",
          },
          {
            english: 'To look forward to (something exciting)',
            italian: "Non vedere l'ora di (qualcosa di emozionante)",
            pronunciation: '/tuː lʊk ˈfɔːwəd tuː/',
            phonetic: 'tuu luk FOR-uerd tuu',
            example:
              "I'm looking forward to the concert next week. = Non vedo l'ora del concerto della prossima settimana.",
          },
          {
            english: 'To figure out (understand / solve)',
            italian: 'Capire / Risolvere',
            pronunciation: '/tuː ˈfɪɡər aʊt/',
            phonetic: 'tuu FI-gher aut',
            example:
              "I can't figure out how this works. Can you help? = Non riesco a capire come funziona. Puoi aiutarmi?",
          },
          {
            english: 'To turn out (result in / happen to be)',
            italian: 'Risultare / Rivelarsi',
            pronunciation: '/tuː tɜːn aʊt/',
            phonetic: 'tuu tern aut',
            example:
              "It turned out that he was telling the truth all along. = Si è rivelato che diceva la verità fin dall'inizio.",
          },
          {
            english: 'To bring up (mention / raise a topic)',
            italian: 'Sollevare / Menzionare (un argomento)',
            pronunciation: '/tuː brɪŋ ʌp/',
            phonetic: 'tuu bring ap',
            example:
              "I didn't want to bring up the issue, but I had no choice. = Non volevo sollevare la questione, ma non avevo scelta.",
          },
          {
            english: 'To carry on (continue)',
            italian: 'Continuare / Andare avanti',
            pronunciation: '/tuː ˈkæri ɒn/',
            phonetic: 'tuu KE-ri on',
            example:
              'Despite the difficulties, she carried on working with determination. = Nonostante le difficoltà, ha continuato a lavorare con determinazione.',
          },
          {
            english: 'To run out of (exhaust supply)',
            italian: 'Esaurire / Rimanere senza',
            pronunciation: '/tuː rʌn aʊt ɒv/',
            phonetic: 'tuu ran aut ov',
            example:
              "We've run out of milk. Can you buy some on your way home? = Abbiamo finito il latte. Puoi comprarne un po' tornando a casa?",
          },
          {
            english: 'To take something for granted',
            italian: 'Dare qualcosa per scontato',
            pronunciation: '/tuː teɪk fɔːr ˈɡrɑːntɪd/',
            phonetic: 'tuu teik for GRAN-tid',
            example:
              "Don't take your health for granted. It's the most precious thing you have. = Non dare la tua salute per scontata. È la cosa più preziosa che hai.",
          },
          {
            english: 'To get along with (have a good relationship)',
            italian: "Andare d'accordo con",
            pronunciation: '/tuː ɡet əˈlɒŋ wɪð/',
            phonetic: 'tuu ghet e-LONG uid',
            example:
              "I get along really well with my colleagues. We're like a family. = Vado molto d'accordo con i miei colleghi. Siamo come una famiglia.",
          },
        ],
      },
      {
        id: 'idioms_expressions',
        title: '🎭 Modi di Dire / Idioms & Expressions',
        description:
          'Espressioni idiomatiche per parlare come un madrelingua / Idiomatic expressions for natural speech',
        items: [
          {
            english: "It's not my cup of tea",
            italian: 'Non fa per me / Non mi piace',
            pronunciation: '/ɪts nɒt maɪ kʌp ɒv tiː/',
            phonetic: 'its not mai kap ov tii',
            example:
              'Horror movies are not my cup of tea. I prefer comedies. = I film horror non fanno per me. Preferisco le commedie.',
          },
          {
            english: 'To be on the same page',
            italian: "Essere sulla stessa lunghezza d'onda",
            pronunciation: '/tuː biː ɒn ðə seɪm peɪdʒ/',
            phonetic: 'tuu bii on de seim peig',
            example:
              "Before we start, let's make sure we're on the same page. = Prima di iniziare, assicuriamoci di essere sulla stessa lunghezza d'onda.",
          },
          {
            english: 'The ball is in your court',
            italian: 'La palla è nel tuo campo / Tocca a te',
            pronunciation: '/ðə bɔːl ɪz ɪn jɔːr kɔːrt/',
            phonetic: 'de bool is in ior kort',
            example:
              "I've done everything I can. The ball is in your court now. = Ho fatto tutto quello che potevo. Ora tocca a te.",
          },
          {
            english: 'To hit the nail on the head',
            italian: 'Colpire nel segno / Centrare il punto',
            pronunciation: '/tuː hɪt ðə neɪl ɒn ðə hed/',
            phonetic: 'tuu hit de neil on de hed',
            example:
              'You hit the nail on the head with that observation. = Hai centrato il punto con quella osservazione.',
          },
          {
            english: 'Once in a blue moon',
            italian: 'Molto raramente / Una volta ogni morte di papa',
            pronunciation: '/wʌns ɪn ə bluː muːn/',
            phonetic: 'uans in e bluu muun',
            example:
              'I only eat fast food once in a blue moon. = Mangio fast food molto raramente.',
          },
          {
            english: 'To bite off more than you can chew',
            italian: 'Fare il passo più lungo della gamba',
            pronunciation: '/tuː baɪt ɒf mɔːr ðæn/',
            phonetic: 'tuu bait of moor den',
            example:
              'By accepting three projects at once, I bit off more than I could chew. = Accettando tre progetti contemporaneamente, ho fatto il passo più lungo della gamba.',
          },
          {
            english: 'It goes without saying',
            italian: 'Va da sé / È ovvio',
            pronunciation: '/ɪt ɡəʊz wɪˈðaʊt ˈseɪɪŋ/',
            phonetic: 'it gouz ui-DAUT SEI-ing',
            example:
              "It goes without saying that honesty is the foundation of any relationship. = Va da sé che l'onestà è la base di ogni relazione.",
          },
          {
            english: 'To be at a crossroads',
            italian: 'Essere a un bivio',
            pronunciation: '/tuː biː æt ə ˈkrɒsrəʊdz/',
            phonetic: 'tuu bii et e KROS-roudz',
            example:
              "I'm at a crossroads in my career. I need to decide which path to take. = Sono a un bivio nella mia carriera. Devo decidere quale strada prendere.",
          },
          {
            english: 'To read between the lines',
            italian: 'Leggere tra le righe',
            pronunciation: '/tuː riːd bɪˈtwiːn ðə laɪnz/',
            phonetic: 'tuu riid bi-TUIIN de lainz',
            example:
              'She said she was fine, but if you read between the lines, she was clearly upset. = Ha detto che stava bene, ma se leggi tra le righe, era chiaramente turbata.',
          },
          {
            english: 'To see eye to eye (with someone)',
            italian: "Essere d'accordo / Vedere le cose allo stesso modo",
            pronunciation: '/tuː siː aɪ tuː aɪ/',
            phonetic: 'tuu sii ai tuu ai',
            example:
              "We don't always see eye to eye, but we respect each other's opinions. = Non siamo sempre d'accordo, ma rispettiamo le opinioni l'uno dell'altro.",
          },
        ],
      },
      {
        id: 'abstract_vocabulary',
        title: '🧠 Vocabolario Astratto / Abstract Vocabulary',
        description:
          'Parole per esprimere concetti complessi e sfumature / Words for complex concepts and nuance',
        items: [
          {
            english: 'Accountability',
            italian: 'Responsabilità / Rendere conto',
            pronunciation: '/əˌkaʊntəˈbɪlɪti/',
            phonetic: 'e-kaun-te-BI-li-ti',
            example:
              'There needs to be more accountability in the government. = Ci deve essere più responsabilità nel governo.',
          },
          {
            english: 'Resilience',
            italian: 'Resilienza / Capacità di riprendersi',
            pronunciation: '/rɪˈzɪliəns/',
            phonetic: 'ri-ZI-li-ens',
            example:
              'Her resilience in the face of adversity is truly inspiring. = La sua resilienza di fronte alle avversità è davvero ispiratrice.',
          },
          {
            english: 'To undermine',
            italian: 'Minare / Indebolire',
            pronunciation: '/ˌʌndəˈmaɪn/',
            phonetic: 'an-der-MAIN',
            example:
              'His constant criticism undermined her confidence. = Le sue critiche costanti hanno minato la sua fiducia.',
          },
          {
            english: 'Ambiguous',
            italian: 'Ambiguo / Di doppia interpretazione',
            pronunciation: '/æmˈbɪɡjuəs/',
            phonetic: 'em-BI-ghiu-es',
            example:
              'The instructions were ambiguous, so everyone interpreted them differently. = Le istruzioni erano ambigue, quindi ognuno le ha interpretate diversamente.',
          },
          {
            english: 'To acknowledge',
            italian: 'Riconoscere / Ammettere',
            pronunciation: '/əkˈnɒlɪdʒ/',
            phonetic: 'ek-NO-lig',
            example:
              "It's important to acknowledge your mistakes and learn from them. = È importante riconoscere i propri errori e imparare da essi.",
          },
          {
            english: 'Perspective',
            italian: 'Prospettiva / Punto di vista',
            pronunciation: '/pəˈspektɪv/',
            phonetic: 'per-SPEK-tiv',
            example:
              'Try to see it from a different perspective. = Prova a vederla da una prospettiva diversa.',
          },
          {
            english: 'To imply (vs. to infer)',
            italian: 'Insinuare / Implicare (vs. dedurre)',
            pronunciation: '/ɪmˈplaɪ/',
            phonetic: 'im-PLAI',
            example:
              "Are you implying that I'm not qualified? He implied it, and she inferred it. = Stai insinuando che non sono qualificato? Lui l'ha insinuato, e lei l'ha dedotto.",
          },
          {
            english: 'Counterintuitive',
            italian: "Controintuitivo / Contro l'intuito",
            pronunciation: '/ˌkaʊntərɪnˈtjuːɪtɪv/',
            phonetic: 'kaun-ter-in-TIUU-i-tiv',
            example:
              'It seems counterintuitive, but working less can actually increase productivity. = Sembra controintuitivo, ma lavorare di meno può in realtà aumentare la produttività.',
          },
          {
            english: 'To take something into account',
            italian: 'Tenere qualcosa in considerazione',
            pronunciation: '/tuː teɪk ˈɪntuː əˈkaʊnt/',
            phonetic: 'tuu teik IN-tuu e-KAUNT',
            example:
              'We need to take the budget into account before making a final decision. = Dobbiamo tenere in considerazione il budget prima di prendere una decisione finale.',
          },
          {
            english: 'Nuance',
            italian: 'Sfumatura / Sottigliezza',
            pronunciation: '/ˈnjuːɑːns/',
            phonetic: 'NIUU-aans',
            example:
              "There's an important nuance here that most people miss. = C'è un'importante sfumatura qui che la maggior parte delle persone non coglie.",
          },
        ],
      },
    ],
  },
};

/**
 * Get all lessons for a specific level
 */
export function getLessonsByLevel(level) {
  return lessonsDatabase[level] || null;
}

/**
 * Get a specific lesson by level and lesson ID
 */
export function getLesson(level, lessonId) {
  const levelData = lessonsDatabase[level];
  if (!levelData) return null;
  return levelData.lessons.find((l) => l.id === lessonId) || null;
}

/**
 * Get all vocabulary items across all levels (flattened)
 */
export function getAllVocabulary() {
  const vocab = [];
  Object.values(lessonsDatabase).forEach((level) => {
    level.lessons.forEach((lesson) => {
      lesson.items.forEach((item) => {
        vocab.push(item);
      });
    });
  });
  return vocab;
}
