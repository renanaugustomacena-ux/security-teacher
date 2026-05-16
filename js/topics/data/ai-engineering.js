/**
 * AI ENGINEERING TOPIC DATA - FlowLearn
 * =====================================
 *
 * 24 levels of English AI engineering terminology.
 * Each level has 4 lessons with 10 items each (40 per level).
 * Progression: AI Foundations -> Professional ML Engineer
 */

export default {
  id: 'ai-engineering',
  levels: {
    // ════════════════════════════════════════════════
    // LEVEL 0 - FONDAMENTI IA / AI FOUNDATIONS
    // ════════════════════════════════════════════════
    0: {
      name: 'Fondamenti IA / AI Foundations',
      description: "Le basi dell'intelligenza artificiale",
      lessons: [
        {
          id: 'ai_foundations_1',
          title: "AI Basics / Le Basi dell'IA",
          description: 'Concetti fondamentali di intelligenza artificiale',
          items: [
            {
              english: 'Artificial Intelligence',
              italian: 'Intelligenza Artificiale',
              pronunciation: '/ˌɑːrtɪˈfɪʃəl ɪnˈtelɪdʒəns/',
              phonetic: 'ar-ti-FI-scial in-TEL-li-gens',
              example:
                "Most modern artificial intelligence systems rely on statistical learning rather than hand-coded rules. = La maggior parte dei sistemi di intelligenza artificiale moderni si basa sull'apprendimento statistico piuttosto che su regole codificate a mano.",
              context: 'foundations',
              difficulty: 'beginner',
              note: 'Spesso abbreviato AI in inglese, IA in italiano.',
            },
            {
              english: 'Machine Learning',
              italian: 'Apprendimento Automatico',
              pronunciation: '/məˈʃiːn ˈlɜːrnɪŋ/',
              phonetic: 'ma-SCIIN LER-ning',
              example:
                'Our spam filter uses machine learning to adapt to new phishing patterns every day. = Il nostro filtro spam usa il machine learning per adattarsi a nuovi pattern di phishing ogni giorno.',
              context: 'foundations',
              difficulty: 'beginner',
              note: 'Abbreviato ML. In italiano si usa anche "Machine Learning" senza tradurre.',
            },
            {
              english: 'Deep Learning',
              italian: 'Apprendimento profondo',
              pronunciation: '/diːp ˈlɜːrnɪŋ/',
              phonetic: 'DIIP LER-ning',
              example:
                'Medical imaging teams now use deep learning to detect tumors that radiologists might miss. = I team di imaging medico ora usano il deep learning per rilevare tumori che i radiologi potrebbero non vedere.',
              context: 'foundations',
              difficulty: 'beginner',
              note: 'Sotto-campo del machine learning basato su reti neurali profonde.',
            },
            {
              english: 'Dataset',
              italian: 'Contenitore di dati (Dataset)',
              pronunciation: '/ˈdeɪtəset/',
              phonetic: 'DEI-ta-set',
              example:
                'Creating a custom PyTorch Dataset class lets you load images, apply transforms, and return tensors cleanly. = Creare una classe Dataset PyTorch personalizzata permette di caricare immagini, applicare trasformazioni e restituire tensori in modo pulito.',
              context: 'foundations',
              difficulty: 'beginner',
              code: 'dataset = pd.read_csv("data.csv")',
              note: 'Termine spesso lasciato in inglese anche in italiano.',
            },
            {
              english: 'Model',
              italian: 'Modello',
              pronunciation: '/ˈmɒdəl/',
              phonetic: 'MO-del',
              example:
                'After tuning hyperparameters, the model achieved 95% accuracy on the held-out test set. = Dopo il tuning degli iperparametri, il modello ha raggiunto il 95% di accuratezza sul test set.',
              context: 'foundations',
              difficulty: 'beginner',
              code: 'model = LinearRegression()',
            },
            {
              english: 'Training',
              italian: 'Addestramento',
              pronunciation: '/ˈtreɪnɪŋ/',
              phonetic: 'TREI-ning',
              example:
                "We paused training after 50 epochs because the validation loss stopped improving. = Abbiamo interrotto l'addestramento dopo 50 epoche perché la loss di validazione ha smesso di migliorare.",
              context: 'foundations',
              difficulty: 'beginner',
              code: 'model.fit(X_train, y_train)',
              note: 'Falso amico: "training" in ML è "addestramento", non "allenamento".',
            },
            {
              english: 'Inference',
              italian: 'Inferenza',
              pronunciation: '/ˈɪnfərəns/',
              phonetic: 'IN-fe-rens',
              example:
                'In production, inference latency must stay below 100 milliseconds per request. = In produzione, la latenza di inferenza deve restare sotto i 100 millisecondi per richiesta.',
              context: 'foundations',
              difficulty: 'beginner',
              code: 'predictions = model.predict(X_new)',
            },
            {
              english: 'Algorithm',
              italian: 'Algoritmo',
              pronunciation: '/ˈælɡərɪðəm/',
              phonetic: 'AL-go-ri-dem',
              example:
                "Choosing the right algorithm depends on data size, feature types, and interpretability needs. = La scelta dell'algoritmo giusto dipende dalla dimensione dei dati, dai tipi di feature e dalle esigenze di interpretabilità.",
              context: 'foundations',
              difficulty: 'beginner',
            },
            {
              english: 'Prediction',
              italian: 'Predizione',
              pronunciation: '/prɪˈdɪkʃən/',
              phonetic: 'pri-DIK-scen',
              example:
                'Each prediction comes with a confidence score that helps decide whether to trust it. = Ogni predizione ha un punteggio di confidenza che aiuta a decidere se fidarsi.',
              context: 'foundations',
              difficulty: 'beginner',
              code: 'y_pred = model.predict(X_test)',
            },
            {
              english: 'Data Science',
              italian: 'Scienza dei dati',
              pronunciation: '/ˈdeɪtə ˈsaɪəns/',
              phonetic: 'DEI-ta SAI-ens',
              example:
                'A data science team typically includes analysts, ML engineers, and domain experts. = Un team di data science include tipicamente analisti, ML engineer ed esperti di dominio.',
              context: 'foundations',
              difficulty: 'beginner',
              note: 'Campo più ampio che include anche analisi, visualizzazione e business intelligence.',
            },
          ],
        },
        {
          id: 'ai_foundations_2',
          title: 'Types of AI / Tipi di IA',
          description: 'Le categorie principali di intelligenza artificiale',
          items: [
            {
              english: 'Narrow AI',
              italian: 'IA ristretta',
              pronunciation: '/ˈnæroʊ eɪ aɪ/',
              phonetic: 'NA-rou EI-AI',
              example:
                'Every deployed system today, from chess engines to chatbots, is narrow AI specialized for one task. = Ogni sistema in uso oggi, dai motori scacchistici ai chatbot, è IA ristretta specializzata in un compito.',
              context: 'foundations',
              difficulty: 'beginner',
              note: "Detta anche Weak AI. Tutta l'IA attuale è di questo tipo.",
            },
            {
              english: 'General AI',
              italian: 'IA generale',
              pronunciation: '/ˈdʒenərəl eɪ aɪ/',
              phonetic: 'GE-ne-ral EI-AI',
              example:
                "Researchers debate whether general AI will emerge from scaling current models or requires new paradigms. = I ricercatori dibattono se l'IA generale emergerà scalando i modelli attuali o richiederà nuovi paradigmi.",
              context: 'foundations',
              difficulty: 'beginner',
              note: 'Abbreviato AGI. Ancora un obiettivo teorico.',
            },
            {
              english: 'Supervised Learning',
              italian: 'Apprendimento supervisionato',
              pronunciation: '/ˈsuːpərvaɪzd ˈlɜːrnɪŋ/',
              phonetic: 'SU-per-vaizd LER-ning',
              example:
                'Email spam filtering is a classic supervised learning task trained on labeled messages. = Il filtraggio spam è un classico compito di apprendimento supervisionato addestrato su messaggi etichettati.',
              context: 'foundations',
              difficulty: 'beginner',
              note: 'Il modello impara da coppie input-output corrette.',
            },
            {
              english: 'Unsupervised Learning',
              italian: 'Apprendimento non supervisionato',
              pronunciation: '/ˌʌnsuːpərˈvaɪzd ˈlɜːrnɪŋ/',
              phonetic: 'an-su-per-VAIZD LER-ning',
              example:
                "Customer segmentation often relies on unsupervised learning because predefined groups are unavailable. = La segmentazione clienti si basa spesso sull'apprendimento non supervisionato perché mancano gruppi predefiniti.",
              context: 'foundations',
              difficulty: 'beginner',
            },
            {
              english: 'Reinforcement Learning',
              italian: 'Apprendimento per rinforzo',
              pronunciation: '/ˌriːɪnˈfɔːrsmənt ˈlɜːrnɪŋ/',
              phonetic: 'rii-in-FORS-ment LER-ning',
              example:
                "AlphaGo mastered the game of Go using reinforcement learning combined with self-play. = AlphaGo ha padroneggiato il Go usando l'apprendimento per rinforzo combinato con l'auto-gioco.",
              context: 'foundations',
              difficulty: 'beginner',
              note: 'Abbreviato RL. Usato per giochi e robotica.',
            },
            {
              english: 'Generative AI',
              italian: 'IA generativa',
              pronunciation: '/ˈdʒenərətɪv eɪ aɪ/',
              phonetic: 'GE-ne-ra-tiv EI-AI',
              example:
                "Content teams now use generative AI to draft marketing copy and create product images. = I team di contenuti usano l'IA generativa per bozze di testi marketing e immagini di prodotto.",
              context: 'foundations',
              difficulty: 'beginner',
              note: 'Include modelli come ChatGPT, DALL-E, Stable Diffusion.',
            },
            {
              english: 'Discriminative Model',
              italian: 'Modello discriminativo',
              pronunciation: '/dɪˈskrɪmɪnətɪv ˈmɒdəl/',
              phonetic: 'di-SKRI-mi-na-tiv MO-del',
              example:
                'Logistic regression is a discriminative model that directly learns the decision boundary between classes. = La regressione logistica è un modello discriminativo che impara direttamente il confine decisionale tra classi.',
              context: 'foundations',
              difficulty: 'beginner',
              note: 'Opposto del generativo: distingue invece di creare.',
            },
            {
              english: 'Symbolic AI',
              italian: 'IA simbolica',
              pronunciation: '/sɪmˈbɒlɪk eɪ aɪ/',
              phonetic: 'sim-BO-lik EI-AI',
              example:
                "Before deep learning, symbolic AI dominated fields like medical diagnosis and theorem proving. = Prima del deep learning, l'IA simbolica dominava campi come la diagnosi medica e la dimostrazione di teoremi.",
              context: 'foundations',
              difficulty: 'beginner',
              note: 'Approccio classico, dominante prima del deep learning.',
            },
            {
              english: 'Expert System',
              italian: 'Sistema esperto',
              pronunciation: '/ˈekspɜːrt ˈsɪstəm/',
              phonetic: 'EK-spert SIS-tem',
              example:
                'In the 1980s, an expert system called MYCIN could diagnose bacterial infections with remarkable accuracy. = Negli anni 80, un sistema esperto chiamato MYCIN diagnosticava infezioni batteriche con notevole accuratezza.',
              context: 'foundations',
              difficulty: 'beginner',
              note: 'Esempio classico di IA simbolica degli anni 80.',
            },
            {
              english: 'Foundation Model',
              italian: 'Modello fondazionale',
              pronunciation: '/faʊnˈdeɪʃən ˈmɒdəl/',
              phonetic: 'faun-DEI-scen MO-del',
              example:
                'GPT-4, Claude, and Gemini are examples of a foundation model trained on massive internet text. = GPT-4, Claude e Gemini sono esempi di modello fondazionale addestrato su enormi quantità di testo internet.',
              context: 'foundations',
              difficulty: 'beginner',
              note: 'Termine moderno per modelli come GPT, Claude, Gemini.',
            },
          ],
        },
        {
          id: 'ai_foundations_3',
          title: 'AI Workflow / Flusso di Lavoro IA',
          description: 'Le fasi di un progetto di IA',
          items: [
            {
              english: 'Problem Definition',
              italian: 'Definizione del problema',
              pronunciation: '/ˈprɒbləm ˌdefɪˈnɪʃən/',
              phonetic: 'PROB-lem de-fi-NI-scen',
              example:
                'Skipping problem definition leads teams to build accurate models solving the wrong business question. = Saltare la definizione del problema porta a costruire modelli accurati che risolvono la domanda di business sbagliata.',
              context: 'foundations',
              difficulty: 'beginner',
            },
            {
              english: 'Data Collection',
              italian: 'Raccolta dati',
              pronunciation: '/ˈdeɪtə kəˈlekʃən/',
              phonetic: 'DEI-ta ko-LEK-scen',
              example:
                'Our data collection pipeline ingests clickstream logs, survey responses, and CRM exports nightly. = La nostra pipeline di raccolta dati acquisisce log di clickstream, risposte ai sondaggi ed esportazioni CRM ogni notte.',
              context: 'foundations',
              difficulty: 'beginner',
              note: '"Garbage in, garbage out": dati scadenti producono modelli scadenti.',
            },
            {
              english: 'Exploratory Data Analysis',
              italian: 'Analisi esplorativa dei dati',
              pronunciation: '/ɪkˈsplɔːrətɔːri ˈdeɪtə əˈnæləsɪs/',
              phonetic: 'ek-SPLO-ra-to-ri DEI-ta a-NA-le-sis',
              example:
                "During exploratory data analysis we found that 30% of user ages contained obvious errors. = Durante l'analisi esplorativa dei dati abbiamo scoperto che il 30% delle età degli utenti conteneva errori ovvi.",
              context: 'foundations',
              difficulty: 'beginner',
              code: 'df.describe()',
              note: 'Abbreviata EDA. Usa visualizzazioni e statistica descrittiva.',
            },
            {
              english: 'Model Selection',
              italian: 'Selezione del modello',
              pronunciation: '/ˈmɒdəl sɪˈlekʃən/',
              phonetic: 'MO-del si-LEK-scen',
              example:
                'We ran model selection experiments comparing random forest, XGBoost, and neural nets on identical splits. = Abbiamo condotto esperimenti di selezione del modello confrontando random forest, XGBoost e reti neurali su split identici.',
              context: 'foundations',
              difficulty: 'beginner',
            },
            {
              english: 'Training Set',
              italian: 'Insieme di addestramento',
              pronunciation: '/ˈtreɪnɪŋ set/',
              phonetic: 'TREI-ning SET',
              example:
                "We reserved 80% of the data as the training set and held the rest for validation and testing. = Abbiamo riservato l'80% dei dati come insieme di addestramento e tenuto il resto per validazione e test.",
              context: 'foundations',
              difficulty: 'beginner',
              code: 'X_train, X_test = train_test_split(X)',
              note: 'Tipicamente 70-80% del dataset totale.',
            },
            {
              english: 'Test Set',
              italian: 'Insieme di test',
              pronunciation: '/test set/',
              phonetic: 'TEST SET',
              example:
                "Never look at the test set until your model and hyperparameters are finalized. = Non guardare mai l'insieme di test finché modello e iperparametri non sono finalizzati.",
              context: 'foundations',
              difficulty: 'beginner',
              note: "Mai usato durante l'addestramento, solo alla fine.",
            },
            {
              english: 'Validation Set',
              italian: 'Insieme di validazione',
              pronunciation: '/ˌvælɪˈdeɪʃən set/',
              phonetic: 'va-li-DEI-scen SET',
              example:
                "We use the validation set to pick the best epoch and tune regularization strength. = Usiamo l'insieme di validazione per scegliere l'epoca migliore e regolare la forza della regolarizzazione.",
              context: 'foundations',
              difficulty: 'beginner',
              note: 'Diverso dal test set: serve per scegliere il modello migliore.',
            },
            {
              english: 'Deployment',
              italian: 'Distribuzione',
              pronunciation: '/dɪˈplɔɪmənt/',
              phonetic: 'di-PLOI-ment',
              example:
                "After deployment, accuracy dropped because real-world data differed from training distributions. = Dopo la distribuzione, l'accuratezza è calata perché i dati reali differivano dalle distribuzioni di addestramento.",
              context: 'foundations',
              difficulty: 'beginner',
              note: 'In gergo italiano si usa anche "deploy" o "messa in produzione".',
            },
            {
              english: 'Monitoring',
              italian: 'Monitoraggio',
              pronunciation: '/ˈmɒnɪtərɪŋ/',
              phonetic: 'MO-ni-to-ring',
              example:
                'Our monitoring dashboard alerts us when prediction drift exceeds 5% from baseline. = La nostra dashboard di monitoraggio ci avvisa quando la deviazione delle predizioni supera il 5% dal riferimento.',
              context: 'foundations',
              difficulty: 'beginner',
            },
            {
              english: 'Iteration',
              italian: 'Iterazione',
              pronunciation: '/ˌɪtəˈreɪʃən/',
              phonetic: 'i-te-REI-scen',
              example:
                'Each iteration processes one batch of 64 samples and updates the model weights once. = Ogni iterazione elabora un batch di 64 campioni e aggiorna i pesi del modello una volta.',
              context: 'foundations',
              difficulty: 'beginner',
              note: 'Raro che il primo modello sia il migliore.',
            },
          ],
        },
        {
          id: 'ai_foundations_4',
          title: 'AI Applications / Applicazioni IA',
          description: 'Esempi di IA nel mondo reale',
          items: [
            {
              english: 'Recommendation System',
              italian: 'Sistema di raccomandazione',
              pronunciation: '/ˌrekəmenˈdeɪʃən ˈsɪstəm/',
              phonetic: 're-ko-men-DEI-scen SIS-tem',
              example:
                'Spotify Discover Weekly is powered by a recommendation system analyzing listening history. = Discover Weekly di Spotify è alimentato da un sistema di raccomandazione che analizza la cronologia di ascolto.',
              context: 'foundations',
              difficulty: 'beginner',
            },
            {
              english: 'Chatbot',
              italian: 'Assistente conversazionale',
              pronunciation: '/ˈtʃætbɒt/',
              phonetic: 'CIAT-bot',
              example:
                'Our support chatbot resolves 40% of tickets before any human agent sees them. = Il nostro chatbot di supporto risolve il 40% dei ticket prima che un operatore umano li veda.',
              context: 'foundations',
              difficulty: 'beginner',
              note: 'Termine spesso lasciato in inglese.',
            },
            {
              english: 'Speech Recognition',
              italian: 'Riconoscimento vocale',
              pronunciation: '/spiːtʃ ˌrekəɡˈnɪʃən/',
              phonetic: 'SPIICI re-kog-NI-scen',
              example:
                'Real-time speech recognition powers closed captions during live video conferences. = Il riconoscimento vocale in tempo reale genera sottotitoli durante le videoconferenze dal vivo.',
              context: 'foundations',
              difficulty: 'beginner',
              note: 'Esempi: Siri, Alexa, dettatura del telefono.',
            },
            {
              english: 'Image Recognition',
              italian: 'Riconoscimento immagini',
              pronunciation: '/ˈɪmɪdʒ ˌrekəɡˈnɪʃən/',
              phonetic: 'I-migi re-kog-NI-scen',
              example:
                'Quality control on factory floors uses image recognition to spot defective parts instantly. = Il controllo qualità in fabbrica usa il riconoscimento immagini per individuare pezzi difettosi.',
              context: 'foundations',
              difficulty: 'beginner',
            },
            {
              english: 'Self-Driving Car',
              italian: 'Auto a guida autonoma',
              pronunciation: '/self ˈdraɪvɪŋ kɑːr/',
              phonetic: 'SELF DRAI-ving KAR',
              example:
                "Building a self-driving car requires fusing lidar, camera, and radar into a real-time 3D map. = Costruire un'auto a guida autonoma richiede di fondere lidar, camera e radar in una mappa 3D in tempo reale.",
              context: 'foundations',
              difficulty: 'beginner',
            },
            {
              english: 'Fraud Detection',
              italian: 'Rilevamento frodi',
              pronunciation: '/frɔːd dɪˈtekʃən/',
              phonetic: 'FROD di-TEK-scen',
              example:
                'Banks process millions of transactions daily, relying on fraud detection to flag suspicious patterns. = Le banche elaborano milioni di transazioni al giorno, usando il rilevamento frodi per segnalare pattern sospetti.',
              context: 'foundations',
              difficulty: 'beginner',
            },
            {
              english: 'Sentiment Analysis',
              italian: 'Analisi del sentiment',
              pronunciation: '/ˈsentɪmənt əˈnæləsɪs/',
              phonetic: 'SEN-ti-ment a-NA-le-sis',
              example:
                'Marketing teams run sentiment analysis on social media mentions to gauge brand perception. = I team marketing eseguono analisi del sentiment sui social media per valutare la percezione del marchio.',
              context: 'foundations',
              difficulty: 'beginner',
              note: '"Sentiment" si lascia in inglese; "analisi del sentimento" suona innaturale.',
            },
            {
              english: 'Predictive Analytics',
              italian: 'Analisi predittiva',
              pronunciation: '/prɪˈdɪktɪv ænəˈlɪtɪks/',
              phonetic: 'pri-DIK-tiv a-na-LI-tiks',
              example:
                "Retailers use predictive analytics to forecast demand and optimize inventory before holidays. = I retailer usano l'analisi predittiva per prevedere la domanda e ottimizzare l'inventario prima delle festività.",
              context: 'foundations',
              difficulty: 'beginner',
            },
            {
              english: 'Anomaly Detection',
              italian: 'Rilevamento anomalie',
              pronunciation: '/əˈnɒməli dɪˈtekʃən/',
              phonetic: 'a-NO-ma-li di-TEK-scen',
              example:
                "Our server anomaly detection flagged unusual CPU spikes caused by a crypto-mining intrusion. = Il nostro rilevamento anomalie del server ha segnalato picchi CPU insoliti causati da un'intrusione crypto-mining.",
              context: 'foundations',
              difficulty: 'beginner',
              note: 'Usato per cybersecurity, monitoraggio industriale, fraud detection.',
            },
            {
              english: 'Personal Assistant',
              italian: 'Assistente personale',
              pronunciation: '/ˈpɜːrsənəl əˈsɪstənt/',
              phonetic: 'PER-so-nal a-SIS-tant',
              example:
                'A modern AI personal assistant can schedule meetings, summarize emails, and draft replies. = Un assistente personale IA moderno può programmare riunioni, riassumere email e preparare risposte.',
              context: 'foundations',
              difficulty: 'beginner',
            },
          ],
        },
      ],
    },
    // ════════════════════════════════════════════════
    // LEVEL 1 - DATI E PREPROCESSING / DATA & PREPROCESSING
    // ════════════════════════════════════════════════
    1: {
      name: 'Dati e Preprocessing / Data & Preprocessing',
      description: 'Preparazione dei dati per il machine learning',
      lessons: [
        {
          id: 'ai_data_1',
          title: 'Data Types / Tipi di Dato',
          description: 'I principali tipi di dato nel ML',
          items: [
            {
              english: 'Feature',
              italian: 'Caratteristica',
              pronunciation: '/ˈfiːtʃər/',
              phonetic: 'FII-cer',
              example:
                'In our housing model, each feature like square footage and room count helps predict the price. = Nel nostro modello immobiliare, ogni caratteristica come metratura e numero stanze aiuta a predire il prezzo.',
              context: 'data-engineering',
              difficulty: 'beginner',
              code: 'X = df[["age", "income", "city"]]',
              note: 'In italiano si usa anche "feature" senza tradurre.',
            },
            {
              english: 'Label',
              italian: 'Etichetta',
              pronunciation: '/ˈleɪbəl/',
              phonetic: 'LEI-bel',
              example:
                "For each medical image, a radiologist provided the label indicating whether a tumor was present. = Per ogni immagine medica, un radiologo ha fornito l'etichetta indicante la presenza di un tumore.",
              context: 'data-engineering',
              difficulty: 'beginner',
              code: 'y = df["target"]',
              note: 'Detta anche target o variabile dipendente.',
            },
            {
              english: 'Numerical Data',
              italian: 'Dati numerici',
              pronunciation: '/njuːˈmerɪkəl ˈdeɪtə/',
              phonetic: 'niu-ME-ri-kal DEI-ta',
              example:
                'Columns like age, income, and temperature are numerical data that models can use directly. = Colonne come età, reddito e temperatura sono dati numerici che i modelli possono usare direttamente.',
              context: 'data-engineering',
              difficulty: 'beginner',
            },
            {
              english: 'Categorical Data',
              italian: 'Dati categorici',
              pronunciation: '/ˌkætəˈɡɒrɪkəl ˈdeɪtə/',
              phonetic: 'ka-te-GO-ri-kal DEI-ta',
              example:
                "Fields like country, color, and payment method are categorical data requiring encoding before training. = Campi come paese, colore e metodo di pagamento sono dati categorici che richiedono codifica prima dell'addestramento.",
              context: 'data-engineering',
              difficulty: 'beginner',
              note: "Devono essere convertiti in numeri prima dell'addestramento.",
            },
            {
              english: 'Ordinal Data',
              italian: 'Dati ordinali',
              pronunciation: '/ˈɔːrdɪnəl ˈdeɪtə/',
              phonetic: 'OR-di-nal DEI-ta',
              example:
                'Survey ratings from 1 to 5 are ordinal data because they carry a meaningful ranking. = Le valutazioni dei sondaggi da 1 a 5 sono dati ordinali perché hanno un ordinamento significativo.',
              context: 'data-engineering',
              difficulty: 'beginner',
              note: 'Esempi: small/medium/large, low/high.',
            },
            {
              english: 'Continuous Variable',
              italian: 'Variabile continua',
              pronunciation: '/kənˈtɪnjuəs ˈveəriəbl/',
              phonetic: 'kon-TI-niu-os VER-ia-bol',
              example:
                'Body temperature in degrees is a continuous variable that can take any value within a range. = La temperatura corporea in gradi è una variabile continua che può assumere qualsiasi valore in un intervallo.',
              context: 'data-engineering',
              difficulty: 'beginner',
              note: 'Può assumere infiniti valori in un intervallo.',
            },
            {
              english: 'Discrete Variable',
              italian: 'Variabile discreta',
              pronunciation: '/dɪˈskriːt ˈveəriəbl/',
              phonetic: 'di-SKRIIT VER-ia-bol',
              example:
                'Counting login attempts gives a discrete variable that only takes non-negative integers. = Contare i tentativi di login dà una variabile discreta che assume solo interi non negativi.',
              context: 'data-engineering',
              difficulty: 'beginner',
            },
            {
              english: 'Time Series',
              italian: 'Serie temporale',
              pronunciation: '/taɪm ˈsɪriːz/',
              phonetic: 'TAIM SI-riz',
              example:
                'Forecasting daily electricity consumption requires modeling the data as a time series. = Prevedere il consumo elettrico giornaliero richiede di modellare i dati come una serie temporale.',
              context: 'data-engineering',
              difficulty: 'beginner',
              note: 'Richiede tecniche speciali: ARIMA, Prophet, RNN.',
            },
            {
              english: 'Structured Data',
              italian: 'Dati strutturati',
              pronunciation: '/ˈstrʌktʃərd ˈdeɪtə/',
              phonetic: 'STRAK-cerd DEI-ta',
              example:
                'Most CRM and ERP systems store structured data in relational tables with clear schemas. = La maggior parte dei sistemi CRM ed ERP memorizza dati strutturati in tabelle relazionali con schemi definiti.',
              context: 'data-engineering',
              difficulty: 'beginner',
              note: 'Tipicamente in tabelle con righe e colonne.',
            },
            {
              english: 'Unstructured Data',
              italian: 'Dati non strutturati',
              pronunciation: '/ˌʌnˈstrʌktʃərd ˈdeɪtə/',
              phonetic: 'an-STRAK-cerd DEI-ta',
              example:
                'Emails, PDFs, and images are unstructured data requiring specialized pipelines before ML. = Email, PDF e immagini sono dati non strutturati che richiedono pipeline specializzate prima del ML.',
              context: 'data-engineering',
              difficulty: 'beginner',
              note: "Rappresentano l'80% circa dei dati aziendali.",
            },
          ],
        },
        {
          id: 'ai_data_2',
          title: 'Cleaning & Missing / Pulizia e Dati Mancanti',
          description: 'Gestione dei dati grezzi',
          items: [
            {
              english: 'Data Cleaning',
              italian: 'Pulizia dei dati',
              pronunciation: '/ˈdeɪtə ˈkliːnɪŋ/',
              phonetic: 'DEI-ta KLII-ning',
              example:
                "Engineers often spend 80% of project time on data cleaning before training any model. = Gli ingegneri spesso spendono l'80% del tempo di progetto nella pulizia dei dati prima di addestrare qualsiasi modello.",
              context: 'data-engineering',
              difficulty: 'beginner',
              note: 'Realtà spesso sottostimata dai principianti.',
            },
            {
              english: 'Missing Data',
              italian: 'Dati mancanti',
              pronunciation: '/ˈmɪsɪŋ ˈdeɪtə/',
              phonetic: 'MI-sing DEI-ta',
              example:
                'Dropping all rows with missing data would have eliminated half the dataset, so we imputed instead. = Eliminare tutte le righe con dati mancanti avrebbe rimosso metà del dataset, quindi abbiamo imputato.',
              context: 'data-engineering',
              difficulty: 'beginner',
              code: 'df.isnull().sum()',
            },
            {
              english: 'Imputation',
              italian: 'Imputazione',
              pronunciation: '/ˌɪmpjʊˈteɪʃən/',
              phonetic: 'im-piu-TEI-scen',
              example:
                'We applied median imputation for skewed numeric columns and mode imputation for categorical ones. = Abbiamo applicato imputazione con la mediana per colonne numeriche asimmetriche e con la moda per quelle categoriche.',
              context: 'data-engineering',
              difficulty: 'beginner',
              code: 'df.fillna(df.mean())',
            },
            {
              english: 'Outlier',
              italian: 'Valore anomalo',
              pronunciation: '/ˈaʊtlaɪər/',
              phonetic: 'AUT-laier',
              example:
                'An outlier salary of ten million turned out to be a data entry error, not a real value. = Un valore anomalo di stipendio di dieci milioni si è rivelato un errore di inserimento dati.',
              context: 'data-engineering',
              difficulty: 'beginner',
              note: 'Possono essere errori o casi rari ma reali: indagare prima di rimuovere.',
            },
            {
              english: 'Duplicate',
              italian: 'Duplicato',
              pronunciation: '/ˈdjuːplɪkət/',
              phonetic: 'DIU-pli-kat',
              example:
                'After merging two data sources, we found 15% duplicate records inflating our metrics. = Dopo aver unito due fonti dati, abbiamo trovato il 15% di record duplicati che gonfiavano le metriche.',
              context: 'data-engineering',
              difficulty: 'beginner',
              code: 'df.drop_duplicates()',
            },
            {
              english: 'Noise',
              italian: 'Rumore',
              pronunciation: '/nɔɪz/',
              phonetic: 'NOIZ',
              example:
                'Sensor noise in IoT temperature readings forced us to apply a moving-average filter. = Il rumore dei sensori nelle letture di temperatura IoT ci ha costretto ad applicare un filtro a media mobile.',
              context: 'data-engineering',
              difficulty: 'beginner',
              note: 'Variazioni casuali che il modello non dovrebbe imparare.',
            },
            {
              english: 'Inconsistent Data',
              italian: 'Dati incoerenti',
              pronunciation: '/ˌɪnkənˈsɪstənt ˈdeɪtə/',
              phonetic: 'in-kon-SIS-tent DEI-ta',
              example:
                'We found inconsistent data where the same country appeared as US, USA, and United States. = Abbiamo trovato dati incoerenti dove lo stesso paese appariva come US, USA e United States.',
              context: 'data-engineering',
              difficulty: 'beginner',
              note: 'Esempio: "USA", "U.S.A.", "United States".',
            },
            {
              english: 'Data Validation',
              italian: 'Validazione dei dati',
              pronunciation: '/ˈdeɪtə ˌvælɪˈdeɪʃən/',
              phonetic: 'DEI-ta va-li-DEI-scen',
              example:
                "Our data validation pipeline rejects rows where age is negative or email format is invalid. = La nostra pipeline di validazione dei dati rifiuta le righe dove l'età è negativa o il formato email non è valido.",
              context: 'data-engineering',
              difficulty: 'beginner',
            },
            {
              english: 'Data Profiling',
              italian: 'Profilazione dei dati',
              pronunciation: '/ˈdeɪtə ˈproʊfaɪlɪŋ/',
              phonetic: 'DEI-ta PRO-fai-ling',
              example:
                'Running data profiling on the new dataset revealed 12 columns with over 50% null values. = Eseguire la profilazione dei dati sul nuovo dataset ha rivelato 12 colonne con oltre il 50% di valori nulli.',
              context: 'data-engineering',
              difficulty: 'beginner',
              tool: 'pandas-profiling, ydata-profiling',
            },
            {
              english: 'Data Transformation',
              italian: 'Trasformazione dei dati',
              pronunciation: '/ˈdeɪtə ˌtrænsfərˈmeɪʃən/',
              phonetic: 'DEI-ta trans-for-MEI-scen',
              example:
                "Applying log data transformation to income reduced skewness from 4.2 to 0.3. = Applicare la trasformazione logaritmica dei dati al reddito ha ridotto l'asimmetria da 4.2 a 0.3.",
              context: 'data-engineering',
              difficulty: 'beginner',
            },
          ],
        },
        {
          id: 'ai_data_3',
          title: 'Scaling & Normalization / Scalatura e Normalizzazione',
          description: 'Tecniche per uniformare i valori',
          items: [
            {
              english: 'Normalization',
              italian: 'Normalizzazione',
              pronunciation: '/ˌnɔːrməlaɪˈzeɪʃən/',
              phonetic: 'nor-ma-lai-ZEI-scen',
              example:
                'Before feeding pixel values to the CNN, we applied normalization to scale them between 0 and 1. = Prima di inserire i pixel nella CNN, abbiamo applicato la normalizzazione per scalarli tra 0 e 1.',
              context: 'data-engineering',
              difficulty: 'beginner',
              code: 'from sklearn.preprocessing import MinMaxScaler',
            },
            {
              english: 'Standardization',
              italian: 'Standardizzazione',
              pronunciation: '/ˌstændərdaɪˈzeɪʃən/',
              phonetic: 'stan-dar-dai-ZEI-scen',
              example:
                'Company-wide standardization of experiment tracking and model packaging accelerated cross-team collaboration significantly. = La standardizzazione aziendale del tracciamento esperimenti e impacchettamento modelli ha accelerato significativamente la collaborazione tra team.',
              context: 'data-engineering',
              difficulty: 'beginner',
              code: 'StandardScaler().fit_transform(X)',
              note: 'Detta anche Z-score normalization.',
            },
            {
              english: 'Min-Max Scaling',
              italian: 'Scalatura Min-Max',
              pronunciation: '/mɪn mæks ˈskeɪlɪŋ/',
              phonetic: 'MIN MAKS SKEI-ling',
              example:
                "We used min-max scaling on the age column to bring values into the 0-1 range. = Abbiamo usato la scalatura min-max sulla colonna età per portare i valori nell'intervallo 0-1.",
              context: 'data-engineering',
              difficulty: 'beginner',
              code: '(x - x.min()) / (x.max() - x.min())',
            },
            {
              english: 'Z-Score',
              italian: 'Punteggio Z',
              pronunciation: '/ziː skɔːr/',
              phonetic: 'ZII-skor',
              example:
                'Any data point with a z-score above 3 was flagged as a potential outlier for review. = Ogni punto dati con un punteggio Z superiore a 3 è stato segnalato come potenziale outlier per revisione.',
              context: 'data-engineering',
              difficulty: 'beginner',
              code: '(x - mean) / std',
            },
            {
              english: 'Robust Scaling',
              italian: 'Scalatura robusta',
              pronunciation: '/roʊˈbʌst ˈskeɪlɪŋ/',
              phonetic: 'ro-BAST SKEI-ling',
              example:
                'Because our data had extreme outliers, robust scaling with median and IQR outperformed standard normalization. = Poiché i dati avevano outlier estremi, la scalatura robusta con mediana e IQR ha superato la normalizzazione standard.',
              context: 'data-engineering',
              difficulty: 'beginner',
              code: 'RobustScaler().fit_transform(X)',
            },
            {
              english: 'Log Transformation',
              italian: 'Trasformazione logaritmica',
              pronunciation: '/lɒɡ ˌtrænsfərˈmeɪʃən/',
              phonetic: 'LOG trans-for-MEI-scen',
              example:
                'Applying a log transformation to house prices made the skewed distribution nearly normal. = Applicare una trasformazione logaritmica ai prezzi delle case ha reso la distribuzione asimmetrica quasi normale.',
              context: 'data-engineering',
              difficulty: 'beginner',
              code: 'np.log1p(X)',
              note: 'Utile per dati con distribuzioni esponenziali tipo prezzi o redditi.',
            },
            {
              english: 'Power Transformation',
              italian: 'Trasformazione di potenza',
              pronunciation: '/ˈpaʊər ˌtrænsfərˈmeɪʃən/',
              phonetic: 'PAUER trans-for-MEI-scen',
              example:
                'The Yeo-Johnson power transformation handles both positive and negative values to achieve normality. = La trasformazione di potenza Yeo-Johnson gestisce sia valori positivi che negativi per raggiungere la normalità.',
              context: 'data-engineering',
              difficulty: 'beginner',
              code: 'PowerTransformer().fit_transform(X)',
            },
            {
              english: 'Box-Cox Transformation',
              italian: 'Trasformazione Box-Cox',
              pronunciation: '/bɒks kɒks ˌtrænsfərˈmeɪʃən/',
              phonetic: 'BOKS-KOKS trans-for-MEI-scen',
              example:
                "We applied a Box-Cox transformation to revenue, improving R-squared by 8 percentage points. = Abbiamo applicato una trasformazione Box-Cox ai ricavi, migliorando l'R quadrato di 8 punti percentuali.",
              context: 'data-engineering',
              difficulty: 'beginner',
            },
            {
              english: 'Mean',
              italian: 'Media',
              pronunciation: '/miːn/',
              phonetic: 'MIIN',
              example:
                'Replacing missing values with the mean works only when the data distribution is roughly symmetric. = Sostituire valori mancanti con la media funziona solo quando la distribuzione dei dati è approssimativamente simmetrica.',
              context: 'data-engineering',
              difficulty: 'beginner',
              code: 'np.mean(X)',
            },
            {
              english: 'Standard Deviation',
              italian: 'Deviazione standard',
              pronunciation: '/ˈstændərd ˌdiːviˈeɪʃən/',
              phonetic: 'STAN-dard di-vi-EI-scen',
              example:
                'A low standard deviation across CV folds indicates stable model performance. = Una bassa deviazione standard tra i fold di CV indica prestazioni del modello stabili.',
              context: 'data-engineering',
              difficulty: 'beginner',
              code: 'np.std(X)',
              note: 'Abbreviata sigma o std.',
            },
          ],
        },
        {
          id: 'ai_data_4',
          title: 'Encoding & Splitting / Codifica e Suddivisione',
          description: 'Codifica delle categorie e divisione dei dati',
          items: [
            {
              english: 'One-Hot Encoding',
              italian: 'Codifica one-hot',
              pronunciation: '/wʌn hɒt ɪnˈkoʊdɪŋ/',
              phonetic: 'UAN-HOT in-KOU-ding',
              example:
                'Applying one-hot encoding to a column with 50 cities created 50 new binary features. = Applicare la codifica one-hot a una colonna con 50 città ha creato 50 nuove feature binarie.',
              context: 'data-engineering',
              difficulty: 'beginner',
              code: 'pd.get_dummies(df["color"])',
              note: 'Crea una colonna per ogni categoria con 0 o 1.',
            },
            {
              english: 'Label Encoding',
              italian: 'Codifica etichette',
              pronunciation: '/ˈleɪbəl ɪnˈkoʊdɪŋ/',
              phonetic: 'LEI-bel in-KOU-ding',
              example:
                'Be careful with label encoding on nominal data: the model may assume an artificial order. = Attenzione con la codifica etichette su dati nominali: il modello potrebbe assumere un ordine artificiale.',
              context: 'data-engineering',
              difficulty: 'beginner',
              code: 'LabelEncoder().fit_transform(y)',
              note: 'Attenzione: introduce un ordine artificiale.',
            },
            {
              english: 'Ordinal Encoding',
              italian: 'Codifica ordinale',
              pronunciation: '/ˈɔːrdɪnəl ɪnˈkoʊdɪŋ/',
              phonetic: 'OR-di-nal in-KOU-ding',
              example:
                'For sizes S, M, L, XL, ordinal encoding correctly preserves the natural hierarchy. = Per taglie S, M, L, XL, la codifica ordinale preserva correttamente la gerarchia naturale.',
              context: 'data-engineering',
              difficulty: 'beginner',
              code: 'OrdinalEncoder().fit_transform(X)',
            },
            {
              english: 'Target Encoding',
              italian: 'Codifica con target',
              pronunciation: '/ˈtɑːrɡɪt ɪnˈkoʊdɪŋ/',
              phonetic: 'TAR-ghet in-KOU-ding',
              example:
                'We used target encoding for zip codes because one-hot would have created thousands of sparse features. = Abbiamo usato la codifica con target per i CAP perché one-hot avrebbe creato migliaia di feature sparse.',
              context: 'data-engineering',
              difficulty: 'beginner',
              note: 'Detta anche mean encoding. Rischia data leakage se non fatta con cura.',
            },
            {
              english: 'Train-Test Split',
              italian: 'Suddivisione train-test',
              pronunciation: '/treɪn test splɪt/',
              phonetic: 'TREIN-TEST SPLIT',
              example:
                'Always perform the train-test split before any preprocessing to avoid information leakage. = Esegui sempre la suddivisione train-test prima di ogni preprocessing per evitare fuga di informazioni.',
              context: 'data-engineering',
              difficulty: 'beginner',
              code: 'train_test_split(X, y, test_size=0.2)',
            },
            {
              english: 'Stratified Sampling',
              italian: 'Campionamento stratificato',
              pronunciation: '/ˈstrætɪfaɪd ˈsæmplɪŋ/',
              phonetic: 'STRA-ti-faid SAM-pling',
              example:
                'With only 2% fraud cases, stratified sampling ensures both splits contain representative proportions. = Con solo il 2% di frodi, il campionamento stratificato assicura che entrambi gli split contengano proporzioni rappresentative.',
              context: 'data-engineering',
              difficulty: 'beginner',
              code: 'train_test_split(X, y, stratify=y)',
              note: 'Cruciale per dataset sbilanciati.',
            },
            {
              english: 'Cross-Validation',
              italian: 'Convalida incrociata',
              pronunciation: '/krɒs ˌvælɪˈdeɪʃən/',
              phonetic: 'KROS va-li-DEI-scen',
              example:
                'We used 5-fold cross-validation to get a more reliable estimate than a single holdout test. = Abbiamo usato la convalida incrociata a 5 fold per una stima più affidabile rispetto a un singolo test holdout.',
              context: 'data-engineering',
              difficulty: 'beginner',
              code: 'cross_val_score(model, X, y, cv=5)',
            },
            {
              english: 'K-Fold',
              italian: 'Cross-validation a K pieghe (K-Fold)',
              pronunciation: '/keɪ foʊld/',
              phonetic: 'KEI-FOLD',
              example:
                'Running 10-fold K-Fold validation showed that our model generalizes well across data subsets. = Eseguire la convalida K-Fold a 10 pieghe ha mostrato che il modello generalizza bene su diversi sottoinsiemi di dati.',
              context: 'data-engineering',
              difficulty: 'beginner',
              code: 'KFold(n_splits=5)',
              note: 'Tipicamente k=5 o k=10.',
            },
            {
              english: 'Data Leakage',
              italian: 'Fuga di dati',
              pronunciation: '/ˈdeɪtə ˈliːkɪdʒ/',
              phonetic: 'DEI-ta LII-kigi',
              example:
                'The 99% accuracy was caused by data leakage: future values had leaked into training rows. = Il 99% di accuratezza era causato da una fuga di dati: valori futuri erano entrati nelle righe di addestramento.',
              context: 'data-engineering',
              difficulty: 'beginner',
              note: 'Errore comune e insidioso che gonfia i risultati.',
            },
            {
              english: 'Class Imbalance',
              italian: 'Sbilanciamento delle classi',
              pronunciation: '/klæs ɪmˈbæləns/',
              phonetic: 'KLAS im-BA-lans',
              example:
                'With 98% legitimate and 2% fraud transactions, class imbalance made the naive classifier useless. = Con il 98% di transazioni legittime e il 2% di frodi, lo sbilanciamento delle classi ha reso il classificatore naive inutile.',
              context: 'data-engineering',
              difficulty: 'beginner',
              note: 'Problema in fraud detection, malattie rare, ecc.',
            },
          ],
        },
      ],
    },
    // ════════════════════════════════════════════════
    // LEVEL 2 - APPRENDIMENTO SUPERVISIONATO / SUPERVISED LEARNING
    // ════════════════════════════════════════════════
    2: {
      name: 'Apprendimento Supervisionato / Supervised Learning',
      description: 'Algoritmi che imparano da esempi etichettati',
      lessons: [
        {
          id: 'ai_supervised_1',
          title: 'Classification / Classificazione',
          description: 'Predire categorie discrete',
          items: [
            {
              english: 'Classification',
              italian: 'Classificazione',
              pronunciation: '/ˌklæsɪfɪˈkeɪʃən/',
              phonetic: 'kla-si-fi-KEI-scen',
              example:
                "Email spam filtering is a binary classification task where each message gets a spam-or-not label. = Il filtraggio spam è un compito di classificazione binaria dove ogni messaggio riceve un'etichetta spam o no.",
              context: 'machine-learning',
              difficulty: 'beginner',
              code: 'model.predict(X_test)',
            },
            {
              english: 'Binary Classification',
              italian: 'Classificazione binaria',
              pronunciation: '/ˈbaɪnəri ˌklæsɪfɪˈkeɪʃən/',
              phonetic: 'BAI-na-ri kla-si-fi-KEI-scen',
              example:
                'Medical tests outputting positive or negative are a classic binary classification scenario. = Test medici con risultato positivo o negativo sono un classico scenario di classificazione binaria.',
              context: 'machine-learning',
              difficulty: 'beginner',
              note: 'Solo due classi possibili: 0 o 1, spam o non spam.',
            },
            {
              english: 'Multiclass Classification',
              italian: 'Classificazione multiclasse',
              pronunciation: '/ˌmʌltiklæs ˌklæsɪfɪˈkeɪʃən/',
              phonetic: 'MAL-ti-klas kla-si-fi-KEI-scen',
              example:
                'Predicting which of 10 product categories a review belongs to is a multiclass classification problem. = Predire a quale di 10 categorie di prodotto appartiene una recensione è un problema di classificazione multiclasse.',
              context: 'machine-learning',
              difficulty: 'beginner',
            },
            {
              english: 'Logistic Regression',
              italian: 'Regressione logistica',
              pronunciation: '/ləˈdʒɪstɪk rɪˈɡreʃən/',
              phonetic: 'lo-GIS-tik ri-GRE-scen',
              example:
                'Despite its name, logistic regression is a classification algorithm outputting probabilities between 0 and 1. = Nonostante il nome, la regressione logistica è un algoritmo di classificazione che produce probabilità tra 0 e 1.',
              context: 'machine-learning',
              difficulty: 'beginner',
              code: 'LogisticRegression().fit(X, y)',
              note: 'Nonostante il nome, è un algoritmo di classificazione.',
            },
            {
              english: 'Decision Tree',
              italian: 'Albero decisionale',
              pronunciation: '/dɪˈsɪʒən triː/',
              phonetic: 'di-SI-gen TRII',
              example:
                'We chose a decision tree because stakeholders needed to see why each loan was approved or denied. = Abbiamo scelto un albero decisionale perché gli stakeholder dovevano vedere perché ogni prestito era approvato o negato.',
              context: 'machine-learning',
              difficulty: 'beginner',
              code: 'DecisionTreeClassifier().fit(X, y)',
              note: 'Facile da interpretare ma soggetto a overfitting.',
            },
            {
              english: 'Random Forest',
              italian: 'Foresta casuale',
              pronunciation: '/ˈrændəm ˈfɒrɪst/',
              phonetic: 'RAN-dom FO-rest',
              example:
                'By averaging 500 trees, our random forest reduced overfitting compared to a single decision tree. = Calcolando la media di 500 alberi, la nostra foresta casuale ha ridotto il sovra-adattamento rispetto a un singolo albero.',
              context: 'machine-learning',
              difficulty: 'beginner',
              code: 'RandomForestClassifier(n_estimators=100)',
              note: 'Termine spesso lasciato in inglese.',
            },
            {
              english: 'Support Vector Machine',
              italian: 'Macchina a vettori di supporto',
              pronunciation: '/səˈpɔːrt ˈvektər məˈʃiːn/',
              phonetic: 'sap-PORT VEK-ter ma-SCIIN',
              example:
                'For high-dimensional gene expression data, a support vector machine outperforms simpler classifiers. = Per dati di espressione genica ad alta dimensionalità, una macchina a vettori di supporto supera classificatori più semplici.',
              context: 'machine-learning',
              difficulty: 'beginner',
              code: 'SVC(kernel="rbf")',
              note: 'Abbreviata SVM. Storicamente molto popolare prima del deep learning.',
            },
            {
              english: 'K-Nearest Neighbors',
              italian: 'K vicini più prossimi',
              pronunciation: '/keɪ ˈnɪrəst ˈneɪbərz/',
              phonetic: 'KEI NIR-est NEI-bers',
              example:
                'Classifying a house price by looking at the five most similar sold homes uses K-nearest neighbors. = Classificare il prezzo di una casa guardando le cinque case vendute più simili usa i K vicini più prossimi.',
              context: 'machine-learning',
              difficulty: 'beginner',
              code: 'KNeighborsClassifier(n_neighbors=5)',
              note: 'Abbreviato KNN. Algoritmo lazy: nessun vero addestramento.',
            },
            {
              english: 'Naive Bayes',
              italian: 'Classificatore bayesiano ingenuo (Naive Bayes)',
              pronunciation: '/naɪˈiːv beɪz/',
              phonetic: 'NA-iv BEIZ',
              example:
                'For real-time text classification with millions of documents, Naive Bayes stays competitive thanks to its speed. = Per classificazione testo in tempo reale con milioni di documenti, Naive Bayes resta competitivo grazie alla velocità.',
              context: 'machine-learning',
              difficulty: 'beginner',
              code: 'GaussianNB().fit(X, y)',
              note: 'Veloce e sorprendentemente efficace nel text classification.',
            },
            {
              english: 'Probability Threshold',
              italian: 'Soglia di probabilità',
              pronunciation: '/ˌprɒbəˈbɪləti ˈθreʃhoʊld/',
              phonetic: 'pro-ba-BI-li-ti TRES-hold',
              example:
                'Lowering the probability threshold from 0.5 to 0.3 caught more frauds but increased false alarms. = Abbassare la soglia di probabilità da 0.5 a 0.3 ha catturato più frodi ma ha aumentato i falsi allarmi.',
              context: 'machine-learning',
              difficulty: 'beginner',
              note: 'Default 0.5 ma spesso va regolato.',
            },
          ],
        },
        {
          id: 'ai_supervised_2',
          title: 'Regression / Regressione',
          description: 'Predire valori continui',
          items: [
            {
              english: 'Regression',
              italian: 'Regressione',
              pronunciation: '/rɪˈɡreʃən/',
              phonetic: 'ri-GRE-scen',
              example:
                "Predicting tomorrow's temperature is a regression problem because the output is a continuous number. = Predire la temperatura di domani è un problema di regressione perché l'output è un numero continuo.",
              context: 'machine-learning',
              difficulty: 'beginner',
              note: 'Esempi: prezzo casa, temperatura, vendite future.',
            },
            {
              english: 'Linear Regression',
              italian: 'Regressione lineare',
              pronunciation: '/ˈlɪniər rɪˈɡreʃən/',
              phonetic: 'LI-nier ri-GRE-scen',
              example:
                'A simple linear regression predicting price from square footage achieved an R-squared of 0.65. = Una semplice regressione lineare che predice il prezzo dalla metratura ha ottenuto un R quadrato di 0.65.',
              context: 'machine-learning',
              difficulty: 'beginner',
              code: 'LinearRegression().fit(X, y)',
            },
            {
              english: 'Polynomial Regression',
              italian: 'Regressione polinomiale',
              pronunciation: '/ˌpɒlɪˈnoʊmiəl rɪˈɡreʃən/',
              phonetic: 'po-li-NOU-mial ri-GRE-scen',
              example:
                'When the relationship was curvilinear, polynomial regression fit the data much better than linear. = Quando la relazione era curvilinea, la regressione polinomiale si adattava ai dati molto meglio della lineare.',
              context: 'machine-learning',
              difficulty: 'beginner',
              code: 'PolynomialFeatures(degree=2)',
            },
            {
              english: 'Multiple Regression',
              italian: 'Regressione multipla',
              pronunciation: '/ˈmʌltɪpəl rɪˈɡreʃən/',
              phonetic: 'MAL-ti-pol ri-GRE-scen',
              example:
                'Our multiple regression model uses square footage, location, and age to predict apartment prices. = Il nostro modello di regressione multipla usa metratura, posizione ed età per predire i prezzi degli appartamenti.',
              context: 'machine-learning',
              difficulty: 'beginner',
            },
            {
              english: 'Ridge Regression',
              italian: 'Regressione Ridge',
              pronunciation: '/rɪdʒ rɪˈɡreʃən/',
              phonetic: 'RIGI ri-GRE-scen',
              example:
                'Adding ridge regression with alpha=1.0 fixed the multicollinearity among correlated features. = Aggiungere la regressione Ridge con alpha=1.0 ha risolto la multicollinearità tra feature correlate.',
              context: 'machine-learning',
              difficulty: 'beginner',
              code: 'Ridge(alpha=1.0).fit(X, y)',
              note: 'Aiuta quando ci sono molte feature correlate.',
            },
            {
              english: 'Lasso Regression',
              italian: 'Regressione Lasso',
              pronunciation: '/ˈlæsoʊ rɪˈɡreʃən/',
              phonetic: 'LAS-so ri-GRE-scen',
              example:
                'Out of 200 features, lasso regression zeroed 180 and identified the 20 most predictive ones. = Su 200 feature, la regressione Lasso ne ha azzerate 180 e ha identificato le 20 più predittive.',
              context: 'machine-learning',
              difficulty: 'beginner',
              code: 'Lasso(alpha=0.1).fit(X, y)',
              note: 'Usa regolarizzazione L1, può azzerare coefficienti.',
            },
            {
              english: 'Coefficient',
              italian: 'Coefficiente',
              pronunciation: '/ˌkoʊɪˈfɪʃənt/',
              phonetic: 'ko-i-FI-scent',
              example:
                'A positive coefficient for years-of-experience means salary grows with more experience. = Un coefficiente positivo per anni-di-esperienza significa che lo stipendio cresce con più esperienza.',
              context: 'machine-learning',
              difficulty: 'beginner',
              code: 'model.coef_',
            },
            {
              english: 'Intercept',
              italian: 'Intercetta',
              pronunciation: '/ˈɪntərsept/',
              phonetic: 'IN-ter-sept',
              example:
                "The intercept represents the predicted base price when all features equal zero. = L'intercetta rappresenta il prezzo base predetto quando tutte le feature sono zero.",
              context: 'machine-learning',
              difficulty: 'beginner',
              code: 'model.intercept_',
            },
            {
              english: 'Residual',
              italian: 'Residuo',
              pronunciation: '/rɪˈzɪdʒuəl/',
              phonetic: 'ri-ZI-giu-al',
              example:
                'Plotting each residual against predicted values helps diagnose whether the model misses a pattern. = Tracciare ogni residuo contro i valori predetti aiuta a diagnosticare se il modello manca un pattern.',
              context: 'machine-learning',
              difficulty: 'beginner',
              code: 'residuals = y_true - y_pred',
            },
            {
              english: 'R-Squared',
              italian: 'R quadrato',
              pronunciation: '/ɑːr ˈskweərd/',
              phonetic: 'AR-SKUERD',
              example:
                'An R-squared of 0.92 on the test set confirms the regression model captures most variation in sales data. = Un R quadrato di 0.92 sul test set conferma che il modello di regressione cattura la maggior parte della variazione nei dati di vendita.',
              context: 'machine-learning',
              difficulty: 'beginner',
              code: 'model.score(X_test, y_test)',
              note: 'Va da 0 a 1; vicino a 1 significa buona qualità.',
            },
          ],
        },
        {
          id: 'ai_supervised_3',
          title: 'Overfitting & Underfitting / Sovra e Sotto Adattamento',
          description: 'I problemi classici dei modelli',
          items: [
            {
              english: 'Overfitting',
              italian: 'Sovra-adattamento',
              pronunciation: '/ˌoʊvərˈfɪtɪŋ/',
              phonetic: 'OU-ver-FIT-ting',
              example:
                'The gap between 99% train accuracy and 60% test accuracy signals overfitting on training noise. = Il divario tra 99% di accuratezza in training e 60% in test segnala sovra-adattamento sul rumore dei dati.',
              context: 'machine-learning',
              difficulty: 'beginner',
              note: 'Termine spesso lasciato in inglese: "il modello fa overfitting".',
            },
            {
              english: 'Underfitting',
              italian: 'Sotto-adattamento',
              pronunciation: '/ˌʌndərˈfɪtɪŋ/',
              phonetic: 'AN-der-FIT-ting',
              example:
                'When both train and test scores are low, underfitting means the model needs more capacity. = Quando sia il punteggio di training che di test sono bassi, il sotto-adattamento significa che il modello necessita più capacità.',
              context: 'machine-learning',
              difficulty: 'beginner',
            },
            {
              english: 'Bias',
              italian: 'Distorsione (Bias)',
              pronunciation: '/ˈbaɪəs/',
              phonetic: 'BAI-as',
              example:
                'High bias in the model means it consistently misses the true relationship in the data. = Un bias elevato nel modello significa che manca costantemente la vera relazione nei dati.',
              context: 'machine-learning',
              difficulty: 'beginner',
              note: 'In ML "bias" ha due sensi: errore sistematico o termine di intercetta.',
            },
            {
              english: 'Variance',
              italian: 'Varianza',
              pronunciation: '/ˈveəriəns/',
              phonetic: 'VER-ians',
              example:
                'High variance means small changes in training data cause large swings in predictions. = Una varianza elevata significa che piccoli cambiamenti nei dati di addestramento causano grandi oscillazioni nelle predizioni.',
              context: 'machine-learning',
              difficulty: 'beginner',
            },
            {
              english: 'Bias-Variance Tradeoff',
              italian: 'Compromesso bias-varianza',
              pronunciation: '/ˈbaɪəs ˈveəriəns ˈtreɪdɔːf/',
              phonetic: 'BAI-as VER-ians TREID-of',
              example:
                'Understanding the bias-variance tradeoff helps decide between a simple model and a deep network. = Comprendere il compromesso bias-varianza aiuta a scegliere tra un modello semplice e una rete profonda.',
              context: 'machine-learning',
              difficulty: 'beginner',
              note: "Concetto fondamentale: ridurre uno spesso aumenta l'altro.",
            },
            {
              english: 'Generalization',
              italian: 'Generalizzazione',
              pronunciation: '/ˌdʒenərələˈzeɪʃən/',
              phonetic: 'ge-ne-ra-li-ZEI-scen',
              example:
                'Good generalization means the model performs almost as well on unseen data as on training data. = Una buona generalizzazione significa che il modello funziona quasi altrettanto bene su dati nuovi come sui dati di addestramento.',
              context: 'machine-learning',
              difficulty: 'beginner',
              note: "Vero obiettivo del ML, non l'accuratezza sul training set.",
            },
            {
              english: 'Regularization',
              italian: 'Regolarizzazione',
              pronunciation: '/ˌreɡjələrɪˈzeɪʃən/',
              phonetic: 'reg-iu-la-ri-ZEI-scen',
              example:
                "Adding L2 regularization reduced the network's tendency to memorize noise in training data. = Aggiungere regolarizzazione L2 ha ridotto la tendenza della rete a memorizzare il rumore nei dati di addestramento.",
              context: 'machine-learning',
              difficulty: 'beginner',
              note: 'Tecniche comuni: L1 (Lasso), L2 (Ridge), dropout.',
            },
            {
              english: 'Early Stopping',
              italian: 'Arresto anticipato',
              pronunciation: '/ˈɜːrli ˈstɒpɪŋ/',
              phonetic: 'ER-li STOP-ping',
              example:
                "With early stopping enabled, training halted at epoch 37 when validation loss began rising. = Con l'arresto anticipato, l'addestramento si è fermato all'epoca 37 quando la loss di validazione ha iniziato a salire.",
              context: 'machine-learning',
              difficulty: 'beginner',
              note: "Tecnica semplice ed efficace contro l'overfitting.",
            },
            {
              english: 'Learning Curve',
              italian: 'Curva di apprendimento',
              pronunciation: '/ˈlɜːrnɪŋ kɜːrv/',
              phonetic: 'LER-ning KERV',
              example:
                'The learning curve showed that more training data would not fix the underfitting problem. = La curva di apprendimento ha mostrato che più dati non avrebbero risolto il problema di sotto-adattamento.',
              context: 'machine-learning',
              difficulty: 'beginner',
              code: 'plot_learning_curve(model, X, y)',
            },
            {
              english: 'Capacity',
              italian: 'Capacità',
              pronunciation: '/kəˈpæsəti/',
              phonetic: 'ka-PA-si-ti',
              example:
                "A model with high capacity can fit complex functions but risks overfitting small datasets. = Un modello con alta capacità può adattarsi a funzioni complesse ma rischia l'overfitting su dataset piccoli.",
              context: 'machine-learning',
              difficulty: 'beginner',
              note: 'Misura quanto un modello può apprendere; legata a parametri e architettura.',
            },
          ],
        },
        {
          id: 'ai_supervised_4',
          title: 'Ensemble Methods / Metodi Ensemble',
          description: 'Combinare più modelli per migliori risultati',
          items: [
            {
              english: 'Ensemble',
              italian: 'Combinazione di modelli (Ensemble)',
              pronunciation: '/ˈɒnsɒmbəl/',
              phonetic: 'ON-som-bol',
              example:
                "Our final submission combined five models in an ensemble to boost accuracy by 2%. = La nostra sottomissione finale ha combinato cinque modelli in un ensemble per aumentare l'accuratezza del 2%.",
              context: 'machine-learning',
              difficulty: 'beginner',
              note: 'Termine francese spesso usato in inglese e italiano senza traduzione.',
            },
            {
              english: 'Bagging',
              italian: 'Aggregazione bootstrap (Bagging)',
              pronunciation: '/ˈbæɡɪŋ/',
              phonetic: 'BAG-ging',
              example:
                'Random Forest uses bagging to train each tree on a different bootstrap sample of the data. = Random Forest usa il bagging per addestrare ogni albero su un diverso campione bootstrap dei dati.',
              context: 'machine-learning',
              difficulty: 'beginner',
              code: 'BaggingClassifier(estimator=tree, n_estimators=10)',
              note: 'Bootstrap Aggregating: ridurre la varianza.',
            },
            {
              english: 'Boosting',
              italian: 'Addestramento sequenziale di deboli (Boosting)',
              pronunciation: '/ˈbuːstɪŋ/',
              phonetic: 'BUS-ting',
              example:
                'Unlike bagging, boosting trains each new model to correct mistakes of previous ones. = A differenza del bagging, il boosting addestra ogni nuovo modello per correggere gli errori dei precedenti.',
              context: 'machine-learning',
              difficulty: 'beginner',
              note: 'Esempi famosi: AdaBoost, XGBoost, LightGBM.',
            },
            {
              english: 'Gradient Boosting',
              italian: 'Boosting a gradienti (Gradient Boosting)',
              pronunciation: '/ˈɡreɪdiənt ˈbuːstɪŋ/',
              phonetic: 'GREI-di-ent BUS-ting',
              example:
                "Our gradient boosting model on tabular sales data outperformed the deep learning approach. = Il nostro modello di gradient boosting su dati tabulari di vendite ha superato l'approccio deep learning.",
              context: 'machine-learning',
              difficulty: 'beginner',
              code: 'GradientBoostingClassifier()',
            },
            {
              english: 'XGBoost',
              italian: 'Libreria gradient boosting ottimizzata (XGBoost)',
              pronunciation: '/ˌeks ˈdʒiː buːst/',
              phonetic: 'EKS-GI-BUST',
              example:
                'Most Kaggle winners for tabular data use XGBoost or LightGBM as their backbone model. = La maggior parte dei vincitori Kaggle per dati tabulari usa XGBoost o LightGBM come modello base.',
              context: 'machine-learning',
              difficulty: 'beginner',
              code: 'import xgboost as xgb',
              tool: 'XGBoost',
              note: 'Standard de-facto per dati tabulari nelle competizioni Kaggle.',
            },
            {
              english: 'Stacking',
              italian: 'Impilamento di modelli (Stacking)',
              pronunciation: '/ˈstækɪŋ/',
              phonetic: 'STAK-king',
              example:
                'We used stacking with a logistic meta-learner to combine random forest and neural net outputs. = Abbiamo usato lo stacking con un meta-learner logistico per combinare gli output di random forest e rete neurale.',
              context: 'machine-learning',
              difficulty: 'beginner',
              code: 'StackingClassifier(estimators=base, final_estimator=meta)',
            },
            {
              english: 'Voting',
              italian: 'Votazione',
              pronunciation: '/ˈvoʊtɪŋ/',
              phonetic: 'VO-ting',
              example:
                'Hard voting picks the majority class from three classifiers; soft voting averages their probabilities. = La votazione hard prende la classe maggioritaria da tre classificatori; quella soft media le loro probabilità.',
              context: 'machine-learning',
              difficulty: 'beginner',
              code: 'VotingClassifier(estimators=[...], voting="hard")',
            },
            {
              english: 'Weak Learner',
              italian: 'Classificatore debole',
              pronunciation: '/wiːk ˈlɜːrnər/',
              phonetic: 'UIK LER-ner',
              example:
                'A decision stump with one split is a typical weak learner used inside AdaBoost. = Un decision stump con un solo split è un tipico classificatore debole usato dentro AdaBoost.',
              context: 'machine-learning',
              difficulty: 'beginner',
              note: 'Mattoncino base del boosting.',
            },
            {
              english: 'Strong Learner',
              italian: 'Classificatore forte',
              pronunciation: '/strɒŋ ˈlɜːrnər/',
              phonetic: 'STRONG LER-ner',
              example:
                'Combining hundreds of weak learners, AdaBoost constructs a strong learner with high accuracy. = Combinando centinaia di classificatori deboli, AdaBoost costruisce un classificatore forte con alta accuratezza.',
              context: 'machine-learning',
              difficulty: 'beginner',
            },
            {
              english: 'Bootstrap',
              italian: 'Ricampionamento con sostituzione (Bootstrap)',
              pronunciation: '/ˈbuːtstræp/',
              phonetic: 'BUT-strap',
              example:
                'Each tree in a random forest trains on a different bootstrap sample drawn with replacement. = Ogni albero in una random forest si addestra su un diverso campione bootstrap estratto con reinserimento.',
              context: 'machine-learning',
              difficulty: 'beginner',
              note: 'Tecnica di campionamento alla base del bagging.',
            },
          ],
        },
      ],
    },
    // ════════════════════════════════════════════════
    // LEVEL 3 - APPRENDIMENTO NON SUPERVISIONATO / UNSUPERVISED LEARNING
    // ════════════════════════════════════════════════
    3: {
      name: 'Apprendimento Non Supervisionato / Unsupervised Learning',
      description: 'Trovare pattern senza etichette',
      lessons: [
        {
          id: 'ai_unsupervised_1',
          title: 'Clustering / Raggruppamento',
          description: 'Raggruppare dati simili',
          items: [
            {
              english: 'Clustering',
              italian: 'Raggruppamento',
              pronunciation: '/ˈklʌstərɪŋ/',
              phonetic: 'KLAS-te-ring',
              example:
                "Customer segmentation teams rely on clustering to discover natural groupings in purchase behavior. = I team di segmentazione clienti usano il clustering per scoprire raggruppamenti naturali nel comportamento d'acquisto.",
              context: 'machine-learning',
              difficulty: 'beginner',
              note: 'Termine spesso lasciato in inglese.',
            },
            {
              english: 'K-Means',
              italian: 'Clustering a K centroidi (K-Means)',
              pronunciation: '/keɪ miːnz/',
              phonetic: 'KEI-MIINZ',
              example:
                'We ran K-Means with k=5 on customer spending data and found five distinct shopper profiles. = Abbiamo eseguito K-Means con k=5 sui dati di spesa e trovato cinque profili di acquirenti distinti.',
              context: 'machine-learning',
              difficulty: 'beginner',
              code: 'KMeans(n_clusters=3).fit(X)',
              note: 'Algoritmo di clustering più popolare.',
            },
            {
              english: 'Centroid',
              italian: 'Centroide',
              pronunciation: '/ˈsentrɔɪd/',
              phonetic: 'SEN-troid',
              example:
                'After convergence, each centroid represents the average position of its assigned data points. = Dopo la convergenza, ogni centroide rappresenta la posizione media dei punti dati assegnati.',
              context: 'machine-learning',
              difficulty: 'beginner',
              code: 'kmeans.cluster_centers_',
            },
            {
              english: 'Hierarchical Clustering',
              italian: 'Clustering gerarchico',
              pronunciation: '/ˌhaɪəˈrɑːrkɪkəl ˈklʌstərɪŋ/',
              phonetic: 'haie-RAR-ki-kal KLAS-te-ring',
              example:
                'Using hierarchical clustering, the biology team grouped species by genetic similarity without specifying k. = Usando il clustering gerarchico, il team di biologia ha raggruppato specie per similarità genetica senza specificare k.',
              context: 'machine-learning',
              difficulty: 'beginner',
              code: 'AgglomerativeClustering(n_clusters=3)',
            },
            {
              english: 'Dendrogram',
              italian: 'Dendrogramma',
              pronunciation: '/ˈdendrəɡræm/',
              phonetic: 'DEN-dro-gram',
              example:
                'The dendrogram revealed two major branches separating premium customers from budget shoppers. = Il dendrogramma ha rivelato due rami principali che separano i clienti premium dagli acquirenti low-cost.',
              context: 'machine-learning',
              difficulty: 'beginner',
              code: 'from scipy.cluster.hierarchy import dendrogram',
            },
            {
              english: 'DBSCAN',
              italian: 'Clustering basato su densità (DBSCAN)',
              pronunciation: '/ˌdiː biː ˈskæn/',
              phonetic: 'DI-BI-SKAN',
              example:
                'Unlike K-Means, DBSCAN detects clusters of arbitrary shape and marks outliers as noise. = A differenza di K-Means, DBSCAN rileva cluster di forma arbitraria e segna i valori anomali come rumore.',
              context: 'machine-learning',
              difficulty: 'beginner',
              code: 'DBSCAN(eps=0.3, min_samples=10)',
              note: 'Identifica anche outlier come "rumore".',
            },
            {
              english: 'Silhouette Score',
              italian: 'Punteggio silhouette',
              pronunciation: '/ˌsɪluˈet skɔːr/',
              phonetic: 'si-lu-ET SKOR',
              example:
                'A silhouette score of 0.7 confirmed that our clusters were well-separated and cohesive. = Un punteggio silhouette di 0.7 ha confermato che i nostri cluster erano ben separati e coesi.',
              context: 'machine-learning',
              difficulty: 'beginner',
              code: 'silhouette_score(X, labels)',
              note: 'Va da -1 a 1; più alto è meglio.',
            },
            {
              english: 'Elbow Method',
              italian: 'Metodo del gomito',
              pronunciation: '/ˈelboʊ ˈmeθəd/',
              phonetic: 'EL-bou ME-tod',
              example:
                'The elbow method suggested k=4 as the optimal number of clusters for our market data. = Il metodo del gomito ha suggerito k=4 come numero ottimale di cluster per i nostri dati di mercato.',
              context: 'machine-learning',
              difficulty: 'beginner',
            },
            {
              english: 'Distance Metric',
              italian: 'Metrica di distanza',
              pronunciation: '/ˈdɪstəns ˈmetrɪk/',
              phonetic: 'DIS-tans ME-trik',
              example:
                'Choosing the right distance metric matters: cosine works well for text, Euclidean for dense vectors. = Scegliere la giusta metrica di distanza è importante: cosine funziona bene per testo, euclidea per vettori densi.',
              context: 'machine-learning',
              difficulty: 'beginner',
              note: 'Altre metriche: Manhattan, coseno, Mahalanobis.',
            },
            {
              english: 'Cluster',
              italian: 'Gruppo di punti simili (Cluster)',
              pronunciation: '/ˈklʌstər/',
              phonetic: 'KLAS-ter',
              example:
                'Each cluster contained users with similar browsing patterns and purchase frequencies. = Ogni cluster conteneva utenti con pattern di navigazione e frequenze di acquisto simili.',
              context: 'machine-learning',
              difficulty: 'beginner',
              note: 'In italiano si usa anche "gruppo" o "raggruppamento".',
            },
          ],
        },
        {
          id: 'ai_unsupervised_2',
          title: 'Dimensionality Reduction / Riduzione di Dimensionalità',
          description: "Ridurre il numero di feature mantenendo l'informazione",
          items: [
            {
              english: 'Dimensionality Reduction',
              italian: 'Riduzione di dimensionalità',
              pronunciation: '/dɪˌmenʃəˈnæləti rɪˈdʌkʃən/',
              phonetic: 'di-men-scio-NA-li-ti ri-DAK-scen',
              example:
                'Before visualizing 500-feature data, we applied dimensionality reduction to project it to 2D. = Prima di visualizzare dati a 500 feature, abbiamo applicato la riduzione dimensionale per proiettarli in 2D.',
              context: 'machine-learning',
              difficulty: 'beginner',
            },
            {
              english: 'PCA',
              italian: 'Analisi delle componenti principali (PCA)',
              pronunciation: '/piː siː eɪ/',
              phonetic: 'PI-SI-EI',
              example:
                'Running PCA on our 100-feature dataset showed that 95% of variance was captured by just 10 components. = Eseguire PCA sul nostro dataset a 100 feature ha mostrato che il 95% della varianza era catturato da soli 10 componenti.',
              context: 'machine-learning',
              difficulty: 'beginner',
              code: 'PCA(n_components=2).fit_transform(X)',
              note: 'Principal Component Analysis: tecnica fondamentale.',
            },
            {
              english: 'Principal Component',
              italian: 'Componente principale',
              pronunciation: '/ˈprɪnsəpəl kəmˈpoʊnənt/',
              phonetic: 'PRIN-si-pal kom-PO-nent',
              example:
                'The first principal component captured 40% of the total variance in gene expression data. = La prima componente principale ha catturato il 40% della varianza totale nei dati di espressione genica.',
              context: 'machine-learning',
              difficulty: 'beginner',
              code: 'pca.components_',
            },
            {
              english: 'Explained Variance',
              italian: 'Varianza spiegata',
              pronunciation: '/ɪkˈspleɪnd ˈveəriəns/',
              phonetic: 'ek-SPLEIND VER-ians',
              example:
                "When explained variance equals R-squared, it confirms there is no systematic bias in the model's residuals. = Quando la varianza spiegata è uguale all'R quadrato, conferma che non c'è bias sistematico nei residui del modello.",
              context: 'machine-learning',
              difficulty: 'beginner',
              code: 'pca.explained_variance_ratio_',
            },
            {
              english: 't-SNE',
              italian: 'Riduzione dimensionalità per visualizzazione (t-SNE)',
              pronunciation: '/tiː es en iː/',
              phonetic: 'TI-ES-EN-I',
              example:
                'The biology team used t-SNE to visualize how single-cell RNA sequences cluster into cell types. = Il team di biologia ha usato t-SNE per visualizzare come le sequenze RNA a singola cellula si raggruppano in tipi cellulari.',
              context: 'machine-learning',
              difficulty: 'beginner',
              code: 'TSNE(n_components=2).fit_transform(X)',
              note: 't-distributed Stochastic Neighbor Embedding. Usato per visualizzazione, non riduzione.',
            },
            {
              english: 'UMAP',
              italian: 'Riduzione dimensionalità manifold (UMAP)',
              pronunciation: '/ˈjuːmæp/',
              phonetic: 'IU-MAP',
              example:
                'Compared to t-SNE, UMAP preserves more of the global structure while running significantly faster. = Rispetto a t-SNE, UMAP preserva più della struttura globale ed è significativamente più veloce.',
              context: 'machine-learning',
              difficulty: 'beginner',
              code: 'umap.UMAP().fit_transform(X)',
              tool: 'umap-learn',
            },
            {
              english: 'Curse of Dimensionality',
              italian: 'Maledizione della dimensionalità',
              pronunciation: '/kɜːrs əv dɪˌmenʃəˈnæləti/',
              phonetic: 'KERS av di-men-scio-NA-li-ti',
              example:
                'With 10,000 features and only 500 samples, the curse of dimensionality makes distances meaningless. = Con 10.000 feature e solo 500 campioni, la maledizione della dimensionalità rende le distanze prive di significato.',
              context: 'machine-learning',
              difficulty: 'beginner',
              note: 'In molte dimensioni i punti diventano tutti "lontani" tra loro.',
            },
            {
              english: 'Feature Reduction',
              italian: 'Riduzione delle feature',
              pronunciation: '/ˈfiːtʃər rɪˈdʌkʃən/',
              phonetic: 'FII-cer ri-DAK-scen',
              example:
                'Before training the classifier, feature reduction cut the input space from 1,000 columns to 50. = Prima di addestrare il classificatore, la riduzione delle feature ha tagliato lo spazio di input da 1.000 colonne a 50.',
              context: 'machine-learning',
              difficulty: 'beginner',
            },
            {
              english: 'Latent Variable',
              italian: 'Variabile latente',
              pronunciation: '/ˈleɪtənt ˈveəriəbl/',
              phonetic: 'LEI-tent VER-ia-bol',
              example:
                "In factor analysis, each latent variable represents an unobserved concept like customer satisfaction. = Nell'analisi fattoriale, ogni variabile latente rappresenta un concetto non osservato come la soddisfazione del cliente.",
              context: 'machine-learning',
              difficulty: 'beginner',
            },
            {
              english: 'Manifold Learning',
              italian: 'Apprendimento di varietà',
              pronunciation: '/ˈmænɪfoʊld ˈlɜːrnɪŋ/',
              phonetic: 'MA-ni-fold LER-ning',
              example:
                'High-dimensional image data often lies on a low-dimensional surface that manifold learning can uncover. = I dati immagine ad alta dimensionalità spesso giacciono su una superficie a bassa dimensionalità che il manifold learning può scoprire.',
              context: 'machine-learning',
              difficulty: 'beginner',
              note: 'Termine matematico di topologia applicato al ML.',
            },
          ],
        },
        {
          id: 'ai_unsupervised_3',
          title: 'Association & Patterns / Associazioni e Pattern',
          description: 'Trovare relazioni nascoste nei dati',
          items: [
            {
              english: 'Association Rule',
              italian: 'Regola di associazione',
              pronunciation: '/əˌsoʊsiˈeɪʃən ruːl/',
              phonetic: 'a-so-si-EI-scen RUL',
              example:
                "Market basket analysis uses association rule mining to find that bread buyers often buy butter. = L'analisi del carrello della spesa usa le regole di associazione per scoprire che chi compra pane spesso compra burro.",
              context: 'machine-learning',
              difficulty: 'beginner',
              note: 'Famoso esempio: pannolini e birra al supermercato.',
            },
            {
              english: 'Apriori Algorithm',
              italian: 'Algoritmo Apriori',
              pronunciation: '/ˌeɪpriˈɔːri ˈælɡərɪðəm/',
              phonetic: 'EI-pri-O-ri AL-go-ri-dem',
              example:
                "The Apriori algorithm prunes infrequent itemsets early, making large-catalog mining feasible. = L'algoritmo Apriori elimina presto gli itemset poco frequenti, rendendo fattibile il mining su cataloghi grandi.",
              context: 'machine-learning',
              difficulty: 'beginner',
              note: 'Classico per market basket analysis.',
            },
            {
              english: 'Frequent Itemset',
              italian: 'Insieme frequente',
              pronunciation: '/ˈfriːkwənt ˈaɪtəmset/',
              phonetic: 'FRII-kuent AI-tem-set',
              example:
                "After scanning millions of receipts, the frequent itemset {coffee, milk, sugar} appeared in 15% of baskets. = Dopo aver analizzato milioni di scontrini, l'itemset frequente {caffè, latte, zucchero} appariva nel 15% dei carrelli.",
              context: 'machine-learning',
              difficulty: 'beginner',
            },
            {
              english: 'Support',
              italian: 'Supporto',
              pronunciation: '/səˈpɔːrt/',
              phonetic: 'sap-PORT',
              example:
                'An item with 5% support means it appears in 5% of all transactions in the database. = Un item con il 5% di supporto significa che appare nel 5% di tutte le transazioni nel database.',
              context: 'machine-learning',
              difficulty: 'beginner',
              code: 'support = freq(X) / total',
            },
            {
              english: 'Confidence',
              italian: 'Confidenza',
              pronunciation: '/ˈkɒnfɪdəns/',
              phonetic: 'KON-fi-dens',
              example:
                "A rule with 80% confidence means that when A is purchased, B follows 80% of the time. = Una regola con l'80% di confidenza significa che quando A è acquistato, B segue l'80% delle volte.",
              context: 'machine-learning',
              difficulty: 'beginner',
              code: 'confidence = P(Y | X)',
            },
            {
              english: 'Lift',
              italian: 'Metrica di efficacia di regola (Lift)',
              pronunciation: '/lɪft/',
              phonetic: 'LIFT',
              example:
                'A lift value above 1.0 means the item pair appears together more often than random chance predicts. = Un valore di lift sopra 1.0 significa che la coppia di articoli appare insieme più spesso di quanto il caso preveda.',
              context: 'machine-learning',
              difficulty: 'beginner',
              note: 'Termine spesso lasciato in inglese.',
            },
            {
              english: 'Market Basket Analysis',
              italian: 'Analisi del carrello',
              pronunciation: '/ˈmɑːrkɪt ˈbæskɪt əˈnæləsɪs/',
              phonetic: 'MAR-ket BAS-ket a-NA-le-sis',
              example:
                "Supermarkets use market basket analysis to decide which products to place near each other on shelves. = I supermercati usano l'analisi del carrello per decidere quali prodotti posizionare vicini sugli scaffali.",
              context: 'machine-learning',
              difficulty: 'beginner',
            },
            {
              english: 'Anomaly',
              italian: 'Anomalia',
              pronunciation: '/əˈnɒməli/',
              phonetic: 'a-NO-ma-li',
              example:
                "The monitoring system flagged a network traffic anomaly at 3 AM that turned out to be a DDoS attempt. = Il sistema di monitoraggio ha segnalato un'anomalia nel traffico di rete alle 3 di notte, rivelatasi un tentativo DDoS.",
              context: 'machine-learning',
              difficulty: 'beginner',
            },
            {
              english: 'Isolation Forest',
              italian: 'Foresta di isolamento',
              pronunciation: '/ˌaɪsəˈleɪʃən ˈfɒrɪst/',
              phonetic: 'ai-so-LEI-scen FO-rest',
              example:
                'We deployed an isolation forest to detect credit card fraud because it handles high-dimensional data well. = Abbiamo implementato un isolation forest per rilevare frodi su carte di credito perché gestisce bene dati ad alta dimensionalità.',
              context: 'machine-learning',
              difficulty: 'beginner',
              code: 'IsolationForest(contamination=0.1)',
            },
            {
              english: 'One-Class SVM',
              italian: 'SVM a una classe',
              pronunciation: '/wʌn klæs ˌes viː ˈem/',
              phonetic: 'UAN-KLAS-ES-VI-EM',
              example:
                'Since we only had examples of normal behavior, we trained a one-class SVM to flag deviations. = Avendo solo esempi di comportamento normale, abbiamo addestrato un one-class SVM per segnalare deviazioni.',
              context: 'machine-learning',
              difficulty: 'beginner',
              code: 'OneClassSVM(nu=0.05)',
            },
          ],
        },
        {
          id: 'ai_unsupervised_4',
          title: 'Self-Supervised & Semi-Supervised / Auto-supervisionato',
          description: 'Approcci ibridi tra supervisionato e non',
          items: [
            {
              english: 'Self-Supervised Learning',
              italian: 'Apprendimento auto-supervisionato',
              pronunciation: '/self ˈsuːpərvaɪzd ˈlɜːrnɪŋ/',
              phonetic: 'SELF SU-per-vaizd LER-ning',
              example:
                "Models like BERT use self-supervised learning by predicting masked words in unlabeled text. = Modelli come BERT usano l'apprendimento auto-supervisionato predicendo parole mascherate in testo non etichettato.",
              context: 'machine-learning',
              difficulty: 'beginner',
              note: 'Alla base di GPT, BERT e altri modelli moderni.',
            },
            {
              english: 'Semi-Supervised Learning',
              italian: 'Apprendimento semi-supervisionato',
              pronunciation: '/ˌsemi ˈsuːpərvaɪzd ˈlɜːrnɪŋ/',
              phonetic: 'SE-mi SU-per-vaizd LER-ning',
              example:
                "With only 100 labeled images and 10,000 unlabeled ones, semi-supervised learning boosted accuracy by 15%. = Con solo 100 immagini etichettate e 10.000 non etichettate, l'apprendimento semi-supervisionato ha aumentato l'accuratezza del 15%.",
              context: 'machine-learning',
              difficulty: 'beginner',
            },
            {
              english: 'Pretext Task',
              italian: 'Compito di pretesto',
              pronunciation: '/ˈpriːtekst tæsk/',
              phonetic: 'PRII-tekst TASK',
              example:
                "Predicting image rotation angle serves as a pretext task that teaches the network useful visual features. = Predire l'angolo di rotazione dell'immagine serve come compito pretestuale che insegna alla rete feature visive utili.",
              context: 'machine-learning',
              difficulty: 'beginner',
              note: 'Esempio: predire la prossima parola in una frase.',
            },
            {
              english: 'Pseudo-Labeling',
              italian: 'Pseudo-etichettatura',
              pronunciation: '/ˈsuːdoʊ ˈleɪbəlɪŋ/',
              phonetic: 'SU-dou LEI-be-ling',
              example:
                'We used pseudo-labeling to let the teacher model generate labels for the unlabeled portion of our dataset. = Abbiamo usato il pseudo-labeling per far generare al modello insegnante etichette per la porzione non etichettata del dataset.',
              context: 'machine-learning',
              difficulty: 'beginner',
            },
            {
              english: 'Contrastive Learning',
              italian: 'Apprendimento contrastivo',
              pronunciation: '/kənˈtræstɪv ˈlɜːrnɪŋ/',
              phonetic: 'kon-TRAS-tiv LER-ning',
              example:
                "SimCLR applies contrastive learning by pulling augmented views of the same image closer in embedding space. = SimCLR applica l'apprendimento contrastivo avvicinando viste aumentate della stessa immagine nello spazio di embedding.",
              context: 'machine-learning',
              difficulty: 'beginner',
              note: 'Esempi: SimCLR, CLIP.',
            },
            {
              english: 'Masked Language Model',
              italian: 'Modello linguistico mascherato',
              pronunciation: '/mæskt ˈlæŋɡwɪdʒ ˈmɒdəl/',
              phonetic: 'MASKD LAN-guigi MO-del',
              example:
                "BERT's pre-training randomly hides 15% of tokens, letting the masked language model learn to fill gaps. = Il pre-training di BERT nasconde casualmente il 15% dei token, lasciando che il modello linguistico mascherato impari a riempire i vuoti.",
              context: 'machine-learning',
              difficulty: 'beginner',
              note: 'MLM: il modello impara prevedendo parole nascoste.',
            },
            {
              english: 'Autoencoder',
              italian: "Rete che ricostruisce l'input (Autoencoder)",
              pronunciation: '/ˌɔːtoʊɪnˈkoʊdər/',
              phonetic: 'au-tou-en-KOU-der',
              example:
                'We trained an autoencoder on normal network traffic and flagged anything with high reconstruction error. = Abbiamo addestrato un autoencoder sul traffico di rete normale e segnalato tutto ciò con errore di ricostruzione elevato.',
              context: 'machine-learning',
              difficulty: 'beginner',
              note: 'Termine sempre lasciato in inglese.',
            },
            {
              english: 'Bottleneck',
              italian: 'Collo di bottiglia',
              pronunciation: '/ˈbɒtəlnek/',
              phonetic: 'BO-tol-nek',
              example:
                "The bottleneck layer of the autoencoder compressed 784 pixel values into just 32 latent dimensions. = Lo strato bottleneck dell'autoencoder ha compresso 784 valori pixel in soli 32 dimensioni latenti.",
              context: 'machine-learning',
              difficulty: 'beginner',
              note: "Punto centrale dell'autoencoder.",
            },
            {
              english: 'Representation Learning',
              italian: 'Apprendimento di rappresentazioni',
              pronunciation: '/ˌreprɪzenˈteɪʃən ˈlɜːrnɪŋ/',
              phonetic: 'rep-pre-zen-TEI-scen LER-ning',
              example:
                'Instead of hand-crafting features, representation learning lets the network discover useful encodings automatically. = Invece di creare feature a mano, il representation learning lascia che la rete scopra codifiche utili automaticamente.',
              context: 'machine-learning',
              difficulty: 'beginner',
            },
            {
              english: 'Pretraining',
              italian: 'Pre-addestramento',
              pronunciation: '/priːˈtreɪnɪŋ/',
              phonetic: 'PRI-trei-ning',
              example:
                'Large-scale pretraining on web text gives language models broad knowledge before task-specific fine-tuning. = Il pre-addestramento su larga scala su testo web dà ai modelli linguistici conoscenza ampia prima del fine-tuning specifico.',
              context: 'machine-learning',
              difficulty: 'beginner',
              note: 'Strategia chiave dei moderni LLM.',
            },
          ],
        },
      ],
    },
    // ════════════════════════════════════════════════
    // LEVEL 4 - RETI NEURALI / NEURAL NETWORKS
    // ════════════════════════════════════════════════
    4: {
      name: 'Reti Neurali / Neural Networks',
      description: 'Le basi delle reti neurali artificiali',
      lessons: [
        {
          id: 'ai_neural_1',
          title: 'Neurons & Layers / Neuroni e Strati',
          description: 'Mattoni fondamentali delle reti neurali',
          items: [
            {
              english: 'Neuron',
              italian: 'Neurone',
              pronunciation: '/ˈnjʊərɒn/',
              phonetic: 'NIU-ron',
              example:
                "Each neuron in the network computes a weighted sum of inputs, adds a bias, and applies an activation. = Ogni neurone nella rete calcola una somma pesata degli input, aggiunge un bias e applica un'attivazione.",
              context: 'deep-learning',
              difficulty: 'intermediate',
              note: 'Detto anche unit, ispirato al neurone biologico.',
            },
            {
              english: 'Perceptron',
              italian: 'Percettrone',
              pronunciation: '/pərˈseptrɒn/',
              phonetic: 'per-SEP-tron',
              example:
                'Invented in 1958, the perceptron was the first algorithm capable of learning a linear decision boundary. = Inventato nel 1958, il percettrone fu il primo algoritmo capace di apprendere un confine decisionale lineare.',
              context: 'deep-learning',
              difficulty: 'intermediate',
              note: 'Inventato nel 1957 da Frank Rosenblatt.',
            },
            {
              english: 'Layer',
              italian: 'Strato',
              pronunciation: '/ˈleɪər/',
              phonetic: 'LEI-er',
              example:
                "Adding a third hidden layer improved accuracy by 2% but doubled the training time. = Aggiungere un terzo strato nascosto ha migliorato l'accuratezza del 2% ma ha raddoppiato il tempo di addestramento.",
              context: 'deep-learning',
              difficulty: 'intermediate',
              code: 'Dense(units=64)',
            },
            {
              english: 'Hidden Layer',
              italian: 'Strato nascosto',
              pronunciation: '/ˈhɪdən ˈleɪər/',
              phonetic: 'HI-den LEI-er',
              example:
                "The network's three hidden layers progressively extract edges, textures, and object parts from images. = I tre strati nascosti della rete estraggono progressivamente bordi, texture e parti di oggetti dalle immagini.",
              context: 'deep-learning',
              difficulty: 'intermediate',
              note: '"Nascosti" perché non visibili all\'utente.',
            },
            {
              english: 'Input Layer',
              italian: 'Strato di input',
              pronunciation: '/ˈɪnpʊt ˈleɪər/',
              phonetic: 'IN-put LEI-er',
              example:
                'The input layer takes 784 pixels from each 28x28 grayscale image and passes them forward. = Lo strato di input prende 784 pixel da ogni immagine in scala di grigi 28x28 e li passa avanti.',
              context: 'deep-learning',
              difficulty: 'intermediate',
              code: 'Input(shape=(784,))',
            },
            {
              english: 'Output Layer',
              italian: 'Strato di output',
              pronunciation: '/ˈaʊtpʊt ˈleɪər/',
              phonetic: 'AUT-put LEI-er',
              example:
                'For 10-digit classification, the output layer has 10 neurons with softmax activation. = Per la classificazione di 10 cifre, lo strato di output ha 10 neuroni con attivazione softmax.',
              context: 'deep-learning',
              difficulty: 'intermediate',
            },
            {
              english: 'Weight',
              italian: 'Peso',
              pronunciation: '/weɪt/',
              phonetic: 'UEIT',
              example:
                "During backpropagation, each weight is updated proportionally to its contribution to the total error. = Durante la retropropagazione, ogni peso viene aggiornato proporzionalmente al suo contributo all'errore totale.",
              context: 'deep-learning',
              difficulty: 'intermediate',
              code: 'model.weights',
            },
            {
              english: 'Bias Term',
              italian: 'Termine di bias',
              pronunciation: '/ˈbaɪəs tɜːrm/',
              phonetic: 'BAI-as TERM',
              example:
                "Without a bias term, the neuron's activation function would always pass through the origin. = Senza un termine di bias, la funzione di attivazione del neurone passerebbe sempre per l'origine.",
              context: 'deep-learning',
              difficulty: 'intermediate',
              note: 'Diverso dal "bias" come errore sistematico.',
            },
            {
              english: 'Fully Connected',
              italian: 'Completamente connesso',
              pronunciation: '/ˈfʊli kəˈnektɪd/',
              phonetic: 'FUL-li ko-NEK-ted',
              example:
                'In a fully connected layer, every neuron connects to all neurons in the previous layer. = In uno strato completamente connesso, ogni neurone si collega a tutti i neuroni nello strato precedente.',
              context: 'deep-learning',
              difficulty: 'intermediate',
              note: 'Detto anche dense layer.',
            },
            {
              english: 'Feedforward',
              italian: 'Rete a propagazione in avanti (feedforward)',
              pronunciation: '/ˈfiːdfɔːrwərd/',
              phonetic: 'FID-for-uerd',
              example:
                "In a feedforward network, data flows strictly from input to output with no backward loops. = In una rete feedforward, i dati fluiscono rigorosamente dall'input all'output senza cicli all'indietro.",
              context: 'deep-learning',
              difficulty: 'intermediate',
              note: "L'informazione scorre solo in avanti.",
            },
          ],
        },
        {
          id: 'ai_neural_2',
          title: 'Activation Functions / Funzioni di Attivazione',
          description: 'Non-linearità nelle reti neurali',
          items: [
            {
              english: 'Activation Function',
              italian: 'Funzione di attivazione',
              pronunciation: '/ˌæktɪˈveɪʃən ˈfʌŋkʃən/',
              phonetic: 'ak-ti-VEI-scen FANK-scen',
              example:
                'Without a non-linear activation function, stacking layers would reduce to a single linear transformation. = Senza una funzione di attivazione non lineare, impilare strati si ridurrebbe a una singola trasformazione lineare.',
              context: 'deep-learning',
              difficulty: 'intermediate',
              code: 'Dense(64, activation="relu")',
            },
            {
              english: 'Sigmoid',
              italian: 'Sigmoide',
              pronunciation: '/ˈsɪɡmɔɪd/',
              phonetic: 'SIG-moid',
              example:
                'The output layer of a binary classifier typically uses sigmoid to squash values between 0 and 1. = Lo strato di output di un classificatore binario usa tipicamente la sigmoide per comprimere valori tra 0 e 1.',
              context: 'deep-learning',
              difficulty: 'intermediate',
              code: '1 / (1 + np.exp(-x))',
              note: 'Soffre del problema del vanishing gradient.',
            },
            {
              english: 'Tanh',
              italian: 'Tangente iperbolica',
              pronunciation: '/tæn eɪtʃ/',
              phonetic: 'TAN-EICI',
              example:
                'For hidden layers in RNNs, tanh is often preferred over sigmoid because its output is zero-centered. = Per gli strati nascosti nelle RNN, la tanh è spesso preferita alla sigmoide perché il suo output è centrato sullo zero.',
              context: 'deep-learning',
              difficulty: 'intermediate',
              code: 'np.tanh(x)',
            },
            {
              english: 'ReLU',
              italian: 'Attivazione rettificata (ReLU)',
              pronunciation: '/ˈreluː/',
              phonetic: 'RE-lu',
              example:
                'Most modern deep networks use ReLU in hidden layers because it avoids the vanishing gradient problem. = La maggior parte delle reti profonde moderne usa ReLU negli strati nascosti perché evita il problema del gradiente che svanisce.',
              context: 'deep-learning',
              difficulty: 'intermediate',
              code: 'max(0, x)',
              note: 'Rectified Linear Unit. Standard nelle reti moderne.',
            },
            {
              english: 'Leaky ReLU',
              italian: 'ReLU con piccola pendenza negativa (Leaky ReLU)',
              pronunciation: '/ˈliːki ˈreluː/',
              phonetic: 'LIK-ki RE-lu',
              example:
                'To prevent dead neurons, we replaced standard ReLU with leaky ReLU, allowing a small gradient for negative inputs. = Per prevenire neuroni morti, abbiamo sostituito ReLU con leaky ReLU, consentendo un piccolo gradiente per input negativi.',
              context: 'deep-learning',
              difficulty: 'intermediate',
              code: 'LeakyReLU(alpha=0.01)',
              note: 'Permette piccoli valori negativi invece di zero.',
            },
            {
              english: 'Softmax',
              italian: 'Normalizzazione esponenziale (Softmax)',
              pronunciation: '/ˈsɒftmæks/',
              phonetic: 'SOFT-maks',
              example:
                'The final layer uses softmax to convert raw logits into a probability distribution across 1,000 classes. = Lo strato finale usa softmax per convertire logit grezzi in una distribuzione di probabilità su 1.000 classi.',
              context: 'deep-learning',
              difficulty: 'intermediate',
              code: 'Dense(10, activation="softmax")',
              note: 'Standard per output di classificazione multiclasse.',
            },
            {
              english: 'GELU',
              italian: 'Gaussian Error Linear Unit (GELU)',
              pronunciation: '/ˈdʒeluː/',
              phonetic: 'GE-lu',
              example:
                'Transformer architectures like BERT and GPT use GELU as the default activation in feed-forward blocks. = Architetture Transformer come BERT e GPT usano GELU come attivazione predefinita nei blocchi feed-forward.',
              context: 'deep-learning',
              difficulty: 'intermediate',
              note: 'Gaussian Error Linear Unit. Usata in BERT, GPT.',
            },
            {
              english: 'Swish',
              italian: 'Attivazione x·sigmoid(x) (Swish)',
              pronunciation: '/swɪʃ/',
              phonetic: 'SUISH',
              example:
                'Google Brain found that swish outperforms ReLU on deep networks with more than 40 layers. = Google Brain ha scoperto che swish supera ReLU su reti profonde con più di 40 strati.',
              context: 'deep-learning',
              difficulty: 'intermediate',
              code: 'x * sigmoid(x)',
            },
            {
              english: 'Logit',
              italian: 'Log-odds (Logit)',
              pronunciation: '/ˈloʊdʒɪt/',
              phonetic: 'LO-git',
              example:
                'Before applying softmax, each logit represents the unnormalized score for a given class. = Prima di applicare softmax, ogni logit rappresenta il punteggio non normalizzato per una data classe.',
              context: 'deep-learning',
              difficulty: 'intermediate',
              note: 'Termine sempre lasciato in inglese.',
            },
            {
              english: 'Non-Linearity',
              italian: 'Non-linearità',
              pronunciation: '/ˌnɒn ˌlɪniˈærəti/',
              phonetic: 'NON li-ne-A-ri-ti',
              example:
                "Stacking layers without any non-linearity would collapse the whole network into one linear map. = Impilare strati senza alcuna non-linearità farebbe collassare l'intera rete in un'unica mappa lineare.",
              context: 'deep-learning',
              difficulty: 'intermediate',
              note: 'Senza di essa, una rete profonda equivale a uno strato lineare.',
            },
          ],
        },
        {
          id: 'ai_neural_3',
          title: 'Backpropagation / Retropropagazione',
          description: 'Come le reti neurali imparano',
          items: [
            {
              english: 'Backpropagation',
              italian: 'Retropropagazione',
              pronunciation: '/ˌbækprɒpəˈɡeɪʃən/',
              phonetic: 'BAK-pro-pa-GEI-scen',
              example:
                "During backpropagation, the error signal flows backward through layers to update every weight. = Durante la retropropagazione, il segnale di errore fluisce all'indietro attraverso gli strati per aggiornare ogni peso.",
              context: 'deep-learning',
              difficulty: 'intermediate',
              note: 'Algoritmo che ha reso possibile il deep learning moderno.',
            },
            {
              english: 'Forward Pass',
              italian: 'Passaggio in avanti',
              pronunciation: '/ˈfɔːrwərd pæs/',
              phonetic: 'FOR-uerd PAS',
              example:
                'In the forward pass, input data propagates through each layer until the network produces a prediction. = Nel passaggio in avanti, i dati di input si propagano attraverso ogni strato finché la rete produce una predizione.',
              context: 'deep-learning',
              difficulty: 'intermediate',
              code: 'output = model(input)',
            },
            {
              english: 'Backward Pass',
              italian: "Passaggio all'indietro",
              pronunciation: '/ˈbækwərd pæs/',
              phonetic: 'BAK-uerd PAS',
              example:
                "After computing the loss, the backward pass calculates gradients for every parameter in the network. = Dopo aver calcolato la loss, il passaggio all'indietro calcola i gradienti per ogni parametro nella rete.",
              context: 'deep-learning',
              difficulty: 'intermediate',
              code: 'loss.backward()',
            },
            {
              english: 'Gradient',
              italian: 'Gradiente',
              pronunciation: '/ˈɡreɪdiənt/',
              phonetic: 'GREI-di-ent',
              example:
                "If the gradient for a weight is large, that weight has a strong influence on the current error. = Se il gradiente per un peso è grande, quel peso ha una forte influenza sull'errore attuale.",
              context: 'deep-learning',
              difficulty: 'intermediate',
              note: 'In ML si scende lungo il gradiente (gradient descent).',
            },
            {
              english: 'Chain Rule',
              italian: 'Regola della catena',
              pronunciation: '/tʃeɪn ruːl/',
              phonetic: 'CIEIN RUL',
              example:
                'Backpropagation applies the chain rule of calculus to propagate gradients through composed functions. = La retropropagazione applica la regola della catena del calcolo per propagare i gradienti attraverso funzioni composte.',
              context: 'deep-learning',
              difficulty: 'intermediate',
              note: 'Concetto base del calcolo applicato alle reti neurali.',
            },
            {
              english: 'Vanishing Gradient',
              italian: 'Gradiente che svanisce',
              pronunciation: '/ˈvænɪʃɪŋ ˈɡreɪdiənt/',
              phonetic: 'VA-ni-scing GREI-di-ent',
              example:
                'Training deep sigmoid networks is hard because the vanishing gradient makes early layers learn extremely slowly. = Addestrare reti profonde con sigmoide è difficile perché il gradiente che svanisce fa apprendere i primi strati molto lentamente.',
              context: 'deep-learning',
              difficulty: 'intermediate',
              note: 'Problema storico risolto da ReLU, ResNet e batch norm.',
            },
            {
              english: 'Exploding Gradient',
              italian: 'Gradiente che esplode',
              pronunciation: '/ɪkˈsploʊdɪŋ ˈɡreɪdiənt/',
              phonetic: 'ek-SPLOU-ding GREI-di-ent',
              example:
                "When gradients grow exponentially, the exploding gradient problem causes weights to diverge and training to fail. = Quando i gradienti crescono esponenzialmente, il problema del gradiente esplosivo causa divergenza dei pesi e fallimento dell'addestramento.",
              context: 'deep-learning',
              difficulty: 'intermediate',
              note: 'Si mitiga con gradient clipping.',
            },
            {
              english: 'Gradient Clipping',
              italian: 'Clipping del gradiente',
              pronunciation: '/ˈɡreɪdiənt ˈklɪpɪŋ/',
              phonetic: 'GREI-di-ent KLIP-ping',
              example:
                "We applied gradient clipping with a max norm of 1.0 to stabilize training of our recurrent network. = Abbiamo applicato il gradient clipping con norma massima 1.0 per stabilizzare l'addestramento della rete ricorrente.",
              context: 'deep-learning',
              difficulty: 'intermediate',
              code: 'torch.nn.utils.clip_grad_norm_(params, 1.0)',
            },
            {
              english: 'Automatic Differentiation',
              italian: 'Differenziazione automatica',
              pronunciation: '/ˌɔːtəˈmætɪk ˌdɪfəˌrenʃiˈeɪʃən/',
              phonetic: 'au-to-MA-tik dif-fe-ren-zi-EI-scen',
              example:
                'PyTorch and JAX both use automatic differentiation to compute exact gradients without manual math. = Sia PyTorch che JAX usano la differenziazione automatica per calcolare gradienti esatti senza matematica manuale.',
              context: 'deep-learning',
              difficulty: 'intermediate',
              note: 'Detta anche autograd. Cuore di PyTorch e TensorFlow.',
            },
            {
              english: 'Computational Graph',
              italian: 'Grafo computazionale',
              pronunciation: '/ˌkɒmpjʊˈteɪʃənəl ɡræf/',
              phonetic: 'kom-piu-TEI-scio-nal GRAF',
              example:
                "The framework builds a computational graph tracking every operation so gradients can flow backward. = Il framework costruisce un grafo computazionale che traccia ogni operazione così i gradienti possono fluire all'indietro.",
              context: 'deep-learning',
              difficulty: 'intermediate',
            },
          ],
        },
        {
          id: 'ai_neural_4',
          title: 'Network Training / Addestramento di Reti',
          description: 'Pratica di addestramento delle reti neurali',
          items: [
            {
              english: 'Initialization',
              italian: 'Inizializzazione',
              pronunciation: '/ɪˌnɪʃəlaɪˈzeɪʃən/',
              phonetic: 'i-ni-scia-lai-ZEI-scen',
              example:
                'Poor weight initialization can trap the network in bad local minima from the very first epoch. = Una cattiva inizializzazione dei pesi può intrappolare la rete in minimi locali cattivi fin dalla prima epoca.',
              context: 'deep-learning',
              difficulty: 'intermediate',
              code: 'kernel_initializer="he_normal"',
            },
            {
              english: 'Xavier Initialization',
              italian: 'Inizializzazione Xavier',
              pronunciation: '/ˈzeɪviər ɪˌnɪʃəlaɪˈzeɪʃən/',
              phonetic: 'ZEI-vier i-ni-scia-lai-ZEI-scen',
              example:
                "For layers with sigmoid or tanh activations, Xavier initialization keeps signal variance stable across layers. = Per strati con attivazioni sigmoide o tanh, l'inizializzazione Xavier mantiene la varianza del segnale stabile tra gli strati.",
              context: 'deep-learning',
              difficulty: 'intermediate',
              note: 'Detta anche Glorot initialization.',
            },
            {
              english: 'He Initialization',
              italian: 'Inizializzazione He',
              pronunciation: '/hiː ɪˌnɪʃəlaɪˈzeɪʃən/',
              phonetic: 'HI i-ni-scia-lai-ZEI-scen',
              example:
                "Networks using ReLU activations should use He initialization to account for the zero-mean asymmetry. = Le reti che usano attivazioni ReLU dovrebbero usare l'inizializzazione He per gestire l'asimmetria della media zero.",
              context: 'deep-learning',
              difficulty: 'intermediate',
              note: 'Dal cognome di Kaiming He, il ricercatore.',
            },
            {
              english: 'Mini-Batch',
              italian: 'Piccolo lotto di esempi (Mini-Batch)',
              pronunciation: '/ˈmɪni bætʃ/',
              phonetic: 'MI-ni BACI',
              example:
                "Processing a mini-batch of 32 samples at once balances memory usage with gradient estimation quality. = Elaborare un mini-batch di 32 campioni alla volta bilancia l'uso di memoria con la qualità della stima del gradiente.",
              context: 'deep-learning',
              difficulty: 'intermediate',
              code: 'batch_size=32',
            },
            {
              english: 'Stochastic Gradient Descent',
              italian: 'Discesa stocastica del gradiente',
              pronunciation: '/stəˈkæstɪk ˈɡreɪdiənt dɪˈsent/',
              phonetic: 'sto-KAS-tik GREI-di-ent di-SENT',
              example:
                'Classic stochastic gradient descent updates weights after every single sample, adding noise that helps escape local minima. = La discesa del gradiente stocastica classica aggiorna i pesi dopo ogni singolo campione, aggiungendo rumore che aiuta a sfuggire dai minimi locali.',
              context: 'deep-learning',
              difficulty: 'intermediate',
              code: 'optimizer = SGD(lr=0.01)',
              note: 'Abbreviato SGD.',
            },
            {
              english: 'Adam Optimizer',
              italian: 'Ottimizzatore Adam',
              pronunciation: '/ˈædəm ˈɒptɪmaɪzər/',
              phonetic: 'A-dam OP-ti-mai-zer',
              example:
                "The Adam optimizer adapts the learning rate for each parameter based on first and second moment estimates. = L'ottimizzatore Adam adatta il learning rate per ogni parametro basandosi su stime del primo e secondo momento.",
              context: 'deep-learning',
              difficulty: 'intermediate',
              code: 'optimizer = Adam(lr=0.001)',
              note: 'Default popolare per la maggior parte dei modelli.',
            },
            {
              english: 'Momentum',
              italian: 'Momento',
              pronunciation: '/moʊˈmentəm/',
              phonetic: 'mou-MEN-tum',
              example:
                'Adding momentum to SGD accelerates convergence by accumulating velocity in consistent gradient directions. = Aggiungere il momento a SGD accelera la convergenza accumulando velocità nelle direzioni di gradiente coerenti.',
              context: 'deep-learning',
              difficulty: 'intermediate',
              code: 'SGD(lr=0.01, momentum=0.9)',
            },
            {
              english: 'Weight Decay',
              italian: 'Decadimento dei pesi',
              pronunciation: '/weɪt dɪˈkeɪ/',
              phonetic: 'UEIT di-KEI',
              example:
                'We added weight decay of 0.01 to prevent the network from relying on excessively large parameters. = Abbiamo aggiunto un decadimento dei pesi di 0.01 per impedire alla rete di affidarsi a parametri eccessivamente grandi.',
              context: 'deep-learning',
              difficulty: 'intermediate',
              note: 'Equivale alla regolarizzazione L2.',
            },
            {
              english: 'Universal Approximation',
              italian: 'Approssimazione universale',
              pronunciation: '/ˌjuːnɪˈvɜːrsəl əˌprɒksɪˈmeɪʃən/',
              phonetic: 'iu-ni-VER-sal a-prok-si-MEI-scen',
              example:
                'The universal approximation theorem guarantees that a single hidden layer can model any continuous function given enough neurons. = Il teorema di approssimazione universale garantisce che un singolo strato nascosto può modellare qualsiasi funzione continua con abbastanza neuroni.',
              context: 'deep-learning',
              difficulty: 'intermediate',
              note: 'Una rete con uno strato nascosto può approssimare qualsiasi funzione continua.',
            },
            {
              english: 'Multilayer Perceptron',
              italian: 'Percettrone multistrato',
              pronunciation: '/ˌmʌltileɪər pərˈseptrɒn/',
              phonetic: 'MAL-ti-leier per-SEP-tron',
              example:
                'For tabular data, a well-tuned multilayer perceptron often matches the performance of gradient boosted trees. = Per dati tabulari, un multilayer perceptron ben regolato spesso eguaglia le prestazioni degli alberi gradient boosted.',
              context: 'deep-learning',
              difficulty: 'intermediate',
              code: 'MLPClassifier(hidden_layer_sizes=(64, 32))',
              note: 'Abbreviato MLP.',
            },
          ],
        },
      ],
    },
    // ════════════════════════════════════════════════
    // LEVEL 5 - DEEP LEARNING ESSENTIALS
    // ════════════════════════════════════════════════
    5: {
      name: 'Deep Learning Essenziale / Deep Learning Essentials',
      description: 'Architetture profonde fondamentali',
      lessons: [
        {
          id: 'ai_dl_1',
          title: 'CNN / Reti Convoluzionali',
          description: 'Reti per immagini e dati spaziali',
          items: [
            {
              english: 'Convolutional Neural Network',
              italian: 'Rete neurale convoluzionale',
              pronunciation: '/ˌkɒnvəˈluːʃənəl ˈnjʊərəl ˈnetwɜːrk/',
              phonetic: 'kon-vo-LU-scio-nal NIU-ral NET-uerk',
              example:
                'A convolutional neural network processes images by sliding small filters across pixels to detect patterns. = Una rete neurale convoluzionale elabora immagini facendo scorrere piccoli filtri sui pixel per rilevare pattern.',
              context: 'deep-learning',
              difficulty: 'intermediate',
              note: 'Abbreviata CNN o ConvNet.',
            },
            {
              english: 'Convolution',
              italian: 'Convoluzione',
              pronunciation: '/ˌkɒnvəˈluːʃən/',
              phonetic: 'kon-vo-LU-scen',
              example:
                "Each convolution operation slides a learned filter across the image to produce a feature map. = Ogni operazione di convoluzione fa scorrere un filtro appreso sull'immagine per produrre una mappa di feature.",
              context: 'deep-learning',
              difficulty: 'intermediate',
              code: 'Conv2D(32, (3, 3))',
            },
            {
              english: 'Filter',
              italian: 'Filtro',
              pronunciation: '/ˈfɪltər/',
              phonetic: 'FIL-ter',
              example:
                'The first layer typically learns 64 filters that detect edges, corners, and color gradients. = Il primo strato tipicamente apprende 64 filtri che rilevano bordi, angoli e gradienti di colore.',
              context: 'deep-learning',
              difficulty: 'intermediate',
              note: 'Detto anche kernel.',
            },
            {
              english: 'Kernel',
              italian: 'Nucleo (filtro o funzione kernel) (Kernel)',
              pronunciation: '/ˈkɜːrnəl/',
              phonetic: 'KER-nel',
              example:
                'A 3x3 kernel is the most common choice because it captures local patterns with minimal parameters. = Un kernel 3x3 è la scelta più comune perché cattura pattern locali con parametri minimi.',
              context: 'deep-learning',
              difficulty: 'intermediate',
              note: 'Termine sempre lasciato in inglese.',
            },
            {
              english: 'Stride',
              italian: 'Passo',
              pronunciation: '/straɪd/',
              phonetic: 'STRAID',
              example:
                'Using a stride of 2 halves the spatial resolution, reducing computation without adding pooling layers. = Usare uno stride di 2 dimezza la risoluzione spaziale, riducendo il calcolo senza aggiungere strati di pooling.',
              context: 'deep-learning',
              difficulty: 'intermediate',
              code: 'Conv2D(32, (3, 3), strides=2)',
            },
            {
              english: 'Padding',
              italian: 'Riempimento ai bordi (Padding)',
              pronunciation: '/ˈpædɪŋ/',
              phonetic: 'PAD-ding',
              example:
                "Adding zero padding around the input preserves spatial dimensions after convolution. = Aggiungere padding a zero intorno all'input preserva le dimensioni spaziali dopo la convoluzione.",
              context: 'deep-learning',
              difficulty: 'intermediate',
              code: 'Conv2D(32, (3, 3), padding="same")',
            },
            {
              english: 'Pooling',
              italian: 'Aggregazione spaziale (Pooling)',
              pronunciation: '/ˈpuːlɪŋ/',
              phonetic: 'PU-ling',
              example:
                'After each convolutional block, a 2x2 pooling layer reduces spatial size and provides translation invariance. = Dopo ogni blocco convoluzionale, uno strato di pooling 2x2 riduce la dimensione spaziale e fornisce invarianza alla traslazione.',
              context: 'deep-learning',
              difficulty: 'intermediate',
              code: 'MaxPooling2D((2, 2))',
            },
            {
              english: 'Max Pooling',
              italian: 'Pooling con massimo (Max Pooling)',
              pronunciation: '/mæks ˈpuːlɪŋ/',
              phonetic: 'MAKS PU-ling',
              example:
                "In each 2x2 region, max pooling keeps only the strongest activation, discarding spatial detail. = In ogni regione 2x2, il max pooling mantiene solo l'attivazione più forte, scartando dettagli spaziali.",
              context: 'deep-learning',
              difficulty: 'intermediate',
            },
            {
              english: 'Feature Map',
              italian: 'Mappa di feature',
              pronunciation: '/ˈfiːtʃər mæp/',
              phonetic: 'FII-cer MAP',
              example:
                'After the first convolutional layer, each feature map highlights a different pattern such as horizontal edges. = Dopo il primo strato convoluzionale, ogni mappa di feature evidenzia un pattern diverso come i bordi orizzontali.',
              context: 'deep-learning',
              difficulty: 'intermediate',
            },
            {
              english: 'Receptive Field',
              italian: 'Campo recettivo',
              pronunciation: '/rɪˈseptɪv fiːld/',
              phonetic: 'ri-SEP-tiv FIID',
              example:
                "Deeper layers have a larger receptive field, allowing them to capture context from wider image regions. = Gli strati più profondi hanno un campo recettivo più ampio, consentendo di catturare contesto da regioni più ampie dell'immagine.",
              context: 'deep-learning',
              difficulty: 'intermediate',
              note: 'Cresce con la profondità della rete.',
            },
          ],
        },
        {
          id: 'ai_dl_2',
          title: 'RNN & LSTM / Reti Ricorrenti',
          description: 'Reti per dati sequenziali',
          items: [
            {
              english: 'Recurrent Neural Network',
              italian: 'Rete neurale ricorrente',
              pronunciation: '/rɪˈkɜːrənt ˈnjʊərəl ˈnetwɜːrk/',
              phonetic: 'ri-KER-rent NIU-ral NET-uerk',
              example:
                'A recurrent neural network processes text word by word, carrying forward a hidden state across time steps. = Una rete neurale ricorrente elabora il testo parola per parola, portando avanti uno stato nascosto attraverso i passi temporali.',
              context: 'deep-learning',
              difficulty: 'intermediate',
              note: 'Abbreviata RNN.',
            },
            {
              english: 'LSTM',
              italian: 'Rete ricorrente a memoria lunga (LSTM)',
              pronunciation: '/el es tiː em/',
              phonetic: 'EL-ES-TI-EM',
              example:
                'For long sequences like paragraphs, LSTM cells use gating mechanisms to remember relevant information across hundreds of steps. = Per sequenze lunghe come paragrafi, le celle LSTM usano meccanismi di gating per ricordare informazioni rilevanti su centinaia di passi.',
              context: 'deep-learning',
              difficulty: 'intermediate',
              code: 'LSTM(128)',
              note: 'Long Short-Term Memory.',
            },
            {
              english: 'GRU',
              italian: 'Unità ricorrente con gate (GRU)',
              pronunciation: '/dʒiː ɑːr juː/',
              phonetic: 'GI-AR-IU',
              example:
                'Since our sequences were short, we replaced LSTM with GRU to cut parameters by 25% without losing accuracy. = Poiché le nostre sequenze erano brevi, abbiamo sostituito LSTM con GRU per tagliare i parametri del 25% senza perdere accuratezza.',
              context: 'deep-learning',
              difficulty: 'intermediate',
              code: 'GRU(64)',
              note: 'Gated Recurrent Unit.',
            },
            {
              english: 'Hidden State',
              italian: 'Stato nascosto',
              pronunciation: '/ˈhɪdən steɪt/',
              phonetic: 'HI-den STEIT',
              example:
                'At each time step, the hidden state carries a compressed summary of all previously seen inputs. = A ogni passo temporale, lo stato nascosto porta un riassunto compresso di tutti gli input visti in precedenza.',
              context: 'deep-learning',
              difficulty: 'intermediate',
            },
            {
              english: 'Cell State',
              italian: 'Stato della cella',
              pronunciation: '/sel steɪt/',
              phonetic: 'SEL STEIT',
              example:
                "The cell state in LSTM acts as a long-term memory highway that information can flow through unchanged. = Lo stato della cella in LSTM agisce come un'autostrada di memoria a lungo termine attraverso cui le informazioni possono fluire invariate.",
              context: 'deep-learning',
              difficulty: 'intermediate',
            },
            {
              english: 'Forget Gate',
              italian: 'Gate di dimenticanza',
              pronunciation: '/fərˈɡet ɡeɪt/',
              phonetic: 'for-GHET GHEIT',
              example:
                'The forget gate decides which parts of the cell state to erase when new input arrives. = Il gate di dimenticanza decide quali parti dello stato della cella cancellare quando arriva un nuovo input.',
              context: 'deep-learning',
              difficulty: 'intermediate',
            },
            {
              english: 'Sequence-to-Sequence',
              italian: 'Sequenza-a-sequenza',
              pronunciation: '/ˈsiːkwəns tuː ˈsiːkwəns/',
              phonetic: 'SI-kuens TU SI-kuens',
              example:
                "Machine translation relies on a sequence-to-sequence architecture mapping input tokens to output tokens in another language. = La traduzione automatica si basa su un'architettura sequence-to-sequence che mappa token di input in token di output in un'altra lingua.",
              context: 'deep-learning',
              difficulty: 'intermediate',
              note: 'Abbreviato Seq2Seq.',
            },
            {
              english: 'Bidirectional',
              italian: 'Bidirezionale',
              pronunciation: '/ˌbaɪdəˈrekʃənəl/',
              phonetic: 'bai-di-REK-scio-nal',
              example:
                "A bidirectional LSTM reads text both forwards and backwards, capturing context in both directions. = Un LSTM bidirezionale legge il testo sia in avanti che all'indietro, catturando contesto in entrambe le direzioni.",
              context: 'deep-learning',
              difficulty: 'intermediate',
              code: 'Bidirectional(LSTM(64))',
            },
            {
              english: 'Time Step',
              italian: 'Passo temporale',
              pronunciation: '/taɪm step/',
              phonetic: 'TAIM STEP',
              example:
                'At each time step, the RNN receives one token embedding and updates its internal hidden state. = A ogni passo temporale, la RNN riceve un embedding di un token e aggiorna il suo stato nascosto interno.',
              context: 'deep-learning',
              difficulty: 'intermediate',
            },
            {
              english: 'Truncated Backprop',
              italian: 'Backprop troncata',
              pronunciation: '/ˈtrʌŋkeɪtɪd ˈbækprɒp/',
              phonetic: 'TRAN-kei-ted BAK-prop',
              example:
                'To save memory on long documents, we used truncated backpropagation through time with a window of 256 tokens. = Per risparmiare memoria su documenti lunghi, abbiamo usato la retropropagazione troncata nel tempo con una finestra di 256 token.',
              context: 'deep-learning',
              difficulty: 'intermediate',
              note: 'Tecnica per addestrare RNN su sequenze lunghe.',
            },
          ],
        },
        {
          id: 'ai_dl_3',
          title: 'Regularization / Regolarizzazione',
          description: 'Tecniche per evitare overfitting in deep learning',
          items: [
            {
              english: 'Dropout',
              italian: 'Spegnimento casuale di neuroni (Dropout)',
              pronunciation: '/ˈdrɒpaʊt/',
              phonetic: 'DROP-aut',
              example:
                "Applying 30% dropout during training forces the network to learn redundant representations and reduces overfitting. = Applicare il 30% di dropout durante l'addestramento forza la rete a imparare rappresentazioni ridondanti e riduce l'overfitting.",
              context: 'deep-learning',
              difficulty: 'intermediate',
              code: 'Dropout(rate=0.5)',
              note: 'Termine sempre lasciato in inglese.',
            },
            {
              english: 'Batch Normalization',
              italian: 'Normalizzazione batch',
              pronunciation: '/bætʃ ˌnɔːrməlaɪˈzeɪʃən/',
              phonetic: 'BACI nor-ma-lai-ZEI-scen',
              example:
                "Inserting batch normalization between layers stabilizes training and often allows higher learning rates. = Inserire la normalizzazione batch tra gli strati stabilizza l'addestramento e spesso consente learning rate più alti.",
              context: 'deep-learning',
              difficulty: 'intermediate',
              code: 'BatchNormalization()',
              note: 'Spesso abbreviata BatchNorm.',
            },
            {
              english: 'Layer Normalization',
              italian: 'Normalizzazione di strato',
              pronunciation: '/ˈleɪər ˌnɔːrməlaɪˈzeɪʃən/',
              phonetic: 'LEI-er nor-ma-lai-ZEI-scen',
              example:
                'Transformer models use layer normalization instead of batch norm because it works well with variable-length sequences. = I modelli Transformer usano la normalizzazione per strato invece della batch norm perché funziona bene con sequenze di lunghezza variabile.',
              context: 'deep-learning',
              difficulty: 'intermediate',
              code: 'LayerNormalization()',
            },
            {
              english: 'L1 Regularization',
              italian: 'Regolarizzazione L1',
              pronunciation: '/el wʌn ˌreɡjələrɪˈzeɪʃən/',
              phonetic: 'EL-UAN reg-iu-la-ri-ZEI-scen',
              example:
                "By adding L1 regularization, our model set 80% of weights to exactly zero, creating a sparse network. = Aggiungendo la regolarizzazione L1, il nostro modello ha impostato l'80% dei pesi esattamente a zero, creando una rete sparsa.",
              context: 'deep-learning',
              difficulty: 'intermediate',
              code: 'kernel_regularizer=l1(0.01)',
            },
            {
              english: 'L2 Regularization',
              italian: 'Regolarizzazione L2',
              pronunciation: '/el tuː ˌreɡjələrɪˈzeɪʃən/',
              phonetic: 'EL-TU reg-iu-la-ri-ZEI-scen',
              example:
                "With L2 regularization, the optimizer penalizes large weights, encouraging smoother decision boundaries. = Con la regolarizzazione L2, l'ottimizzatore penalizza pesi grandi, incoraggiando confini decisionali più lisci.",
              context: 'deep-learning',
              difficulty: 'intermediate',
              code: 'kernel_regularizer=l2(0.001)',
            },
            {
              english: 'Data Augmentation',
              italian: 'Aumento dei dati',
              pronunciation: '/ˈdeɪtə ˌɔːɡmenˈteɪʃən/',
              phonetic: 'DEI-ta og-men-TEI-scen',
              example:
                'By applying random flips and crops as data augmentation, we tripled our effective training set size. = Applicando flip e ritagli casuali come data augmentation, abbiamo triplicato la dimensione effettiva del nostro training set.',
              context: 'deep-learning',
              difficulty: 'intermediate',
              code: 'ImageDataGenerator(rotation_range=20)',
            },
            {
              english: 'Label Smoothing',
              italian: 'Smussamento etichette',
              pronunciation: '/ˈleɪbəl ˈsmuːðɪŋ/',
              phonetic: 'LEI-bel SMU-ding',
              example:
                'Using label smoothing of 0.1 prevents the model from becoming overconfident about any single prediction. = Usare il label smoothing di 0.1 impedisce al modello di diventare troppo sicuro di ogni singola predizione.',
              context: 'deep-learning',
              difficulty: 'intermediate',
              code: 'CategoricalCrossentropy(label_smoothing=0.1)',
            },
            {
              english: 'Stochastic Depth',
              italian: 'Profondità stocastica',
              pronunciation: '/stəˈkæstɪk depθ/',
              phonetic: 'sto-KAS-tik DEPT',
              example:
                "During training, stochastic depth randomly drops entire residual blocks to regularize very deep networks. = Durante l'addestramento, la profondità stocastica elimina casualmente interi blocchi residuali per regolarizzare reti molto profonde.",
              context: 'deep-learning',
              difficulty: 'intermediate',
            },
            {
              english: 'Mixup',
              italian: 'Miscelazione lineare di esempi (Mixup)',
              pronunciation: '/ˈmɪksʌp/',
              phonetic: 'MIK-sap',
              example:
                "By blending pairs of images and their labels, mixup augmentation teaches the model smoother decision boundaries. = Mescolando coppie di immagini e le loro etichette, l'augmentation mixup insegna al modello confini decisionali più lisci.",
              context: 'deep-learning',
              difficulty: 'intermediate',
              note: 'Tecnica di data augmentation moderna.',
            },
            {
              english: 'Cutout',
              italian: 'Mascheramento casuale di patch (Cutout)',
              pronunciation: '/ˈkʌtaʊt/',
              phonetic: 'KAT-aut',
              example:
                "Randomly erasing a square patch from training images via cutout forces the network to use global context. = Cancellare casualmente un'area quadrata dalle immagini di training tramite cutout forza la rete a usare il contesto globale.",
              context: 'deep-learning',
              difficulty: 'intermediate',
            },
          ],
        },
        {
          id: 'ai_dl_4',
          title: 'Modern Architectures / Architetture Moderne',
          description: 'Reti profonde di ultima generazione',
          items: [
            {
              english: 'ResNet',
              italian: 'Rete con connessioni residue (ResNet)',
              pronunciation: '/ˈreznet/',
              phonetic: 'REZ-net',
              example:
                'With 152 layers and skip connections, ResNet proved that deeper networks can be trained without gradient degradation. = Con 152 strati e connessioni residue, ResNet ha dimostrato che reti più profonde possono essere addestrate senza degradazione del gradiente.',
              context: 'deep-learning',
              difficulty: 'intermediate',
              note: 'Residual Network. Sblocca reti con centinaia di strati.',
            },
            {
              english: 'Skip Connection',
              italian: 'Connessione di salto',
              pronunciation: '/skɪp kəˈnekʃən/',
              phonetic: 'SKIP ko-NEK-scen',
              example:
                "A skip connection adds the input of a layer directly to its output, letting gradients flow past bottlenecks. = Una connessione residua aggiunge l'input di uno strato direttamente al suo output, lasciando i gradienti fluire oltre i colli di bottiglia.",
              context: 'deep-learning',
              difficulty: 'intermediate',
              note: 'Detta anche residual connection.',
            },
            {
              english: 'VGG',
              italian: 'Rete CNN profonda classica (VGG)',
              pronunciation: '/viː dʒiː dʒiː/',
              phonetic: 'VI-GI-GI',
              example:
                "Although outperformed by newer architectures, VGG remains popular for feature extraction due to its simplicity. = Sebbene superata da architetture più recenti, VGG resta popolare per l'estrazione di feature grazie alla sua semplicità.",
              context: 'deep-learning',
              difficulty: 'intermediate',
              note: 'Da Visual Geometry Group di Oxford.',
            },
            {
              english: 'Inception',
              italian: 'Rete con moduli inception (Inception)',
              pronunciation: '/ɪnˈsepʃən/',
              phonetic: 'in-SEP-scen',
              example:
                'The Inception module applies multiple filter sizes in parallel, letting the network choose the best scale. = Il modulo Inception applica filtri di dimensioni diverse in parallelo, lasciando alla rete scegliere la scala migliore.',
              context: 'deep-learning',
              difficulty: 'intermediate',
              note: 'Detto anche GoogLeNet.',
            },
            {
              english: 'EfficientNet',
              italian: 'CNN scalabile (EfficientNet)',
              pronunciation: '/ɪˈfɪʃənt net/',
              phonetic: 'i-FI-scent NET',
              example:
                'By jointly scaling depth, width, and resolution, EfficientNet achieves top accuracy with fewer parameters. = Scalando congiuntamente profondità, larghezza e risoluzione, EfficientNet raggiunge accuratezza massima con meno parametri.',
              context: 'deep-learning',
              difficulty: 'intermediate',
            },
            {
              english: 'DenseNet',
              italian: 'Rete a connessioni dense (DenseNet)',
              pronunciation: '/dens net/',
              phonetic: 'DENS NET',
              example:
                'In DenseNet, each layer receives feature maps from all preceding layers, maximizing feature reuse. = In DenseNet, ogni strato riceve mappe di feature da tutti gli strati precedenti, massimizzando il riuso delle feature.',
              context: 'deep-learning',
              difficulty: 'intermediate',
            },
            {
              english: 'MobileNet',
              italian: 'CNN leggera per mobile (MobileNet)',
              pronunciation: '/ˈmoʊbaɪl net/',
              phonetic: 'MO-bail NET',
              example:
                "For on-device inference on smartphones, MobileNet uses depthwise separable convolutions to minimize latency. = Per l'inferenza su dispositivi smartphone, MobileNet usa convoluzioni separabili in profondità per minimizzare la latenza.",
              context: 'deep-learning',
              difficulty: 'intermediate',
              note: 'Usa depthwise separable convolutions.',
            },
            {
              english: 'Vision Transformer',
              italian: 'ViT, transformer per immagini (Vision Transformer)',
              pronunciation: '/ˈvɪʒən trænsˈfɔːrmər/',
              phonetic: 'VI-gen trans-FOR-mer',
              example:
                'Replacing convolutions entirely, the vision transformer splits images into patches and processes them with self-attention. = Sostituendo completamente le convoluzioni, il vision transformer divide le immagini in patch e le elabora con self-attention.',
              context: 'deep-learning',
              difficulty: 'intermediate',
              note: 'Abbreviato ViT.',
            },
            {
              english: 'Capsule Network',
              italian: 'Rete capsulare',
              pronunciation: '/ˈkæpsjuːl ˈnetwɜːrk/',
              phonetic: 'KAP-siul NET-uerk',
              example:
                'Unlike standard CNNs, a capsule network preserves spatial hierarchies between features like nose-within-face. = A differenza delle CNN standard, una rete a capsule preserva le gerarchie spaziali tra feature come naso-dentro-faccia.',
              context: 'deep-learning',
              difficulty: 'intermediate',
              note: 'Idea di Geoffrey Hinton, meno usata in pratica.',
            },
            {
              english: 'Squeeze-and-Excitation',
              italian: 'Attenzione di canale (Squeeze-and-Excitation)',
              pronunciation: '/skwiːz ænd ˌeksɪˈteɪʃən/',
              phonetic: 'SKUIZ-end-ek-si-TEI-scen',
              example:
                "A squeeze-and-excitation block recalibrates channel importance by learning which feature maps matter most. = Un blocco squeeze-and-excitation ricalibra l'importanza dei canali imparando quali mappe di feature contano di più.",
              context: 'deep-learning',
              difficulty: 'intermediate',
              note: 'Abbreviato SE-block.',
            },
          ],
        },
      ],
    },
    // ════════════════════════════════════════════════
    // LEVEL 6 - NLP FONDAMENTALI / NLP FUNDAMENTALS
    // ════════════════════════════════════════════════
    6: {
      name: 'NLP Fondamenti / NLP Fundamentals',
      description: 'Elaborazione del linguaggio naturale',
      lessons: [
        {
          id: 'ai_nlp_1',
          title: 'Tokenization & Text / Tokenizzazione e Testo',
          description: 'Trasformare testo in numeri',
          items: [
            {
              english: 'Tokenization',
              italian: 'Tokenizzazione',
              pronunciation: '/ˌtoʊkənaɪˈzeɪʃən/',
              phonetic: 'tou-ken-ai-ZEI-scen',
              example:
                'Before any NLP model can process text, tokenization splits sentences into individual tokens. = Prima che un modello NLP possa elaborare il testo, la tokenizzazione divide le frasi in singoli token.',
              context: 'nlp',
              difficulty: 'intermediate',
              code: 'tokenizer.tokenize("Hello world")',
            },
            {
              english: 'Token',
              italian: 'Unità di input testuale (Token)',
              pronunciation: '/ˈtoʊkən/',
              phonetic: 'TOU-ken',
              example:
                "In GPT-4, the word 'unhappiness' is split into three tokens: 'un', 'happi', and 'ness'. = In GPT-4, la parola 'unhappiness' è divisa in tre token: 'un', 'happi' e 'ness'.",
              context: 'nlp',
              difficulty: 'intermediate',
              note: 'Termine sempre lasciato in inglese.',
            },
            {
              english: 'Subword Tokenization',
              italian: 'Tokenizzazione di sottoparole',
              pronunciation: '/ˈsʌbwɜːrd ˌtoʊkənaɪˈzeɪʃən/',
              phonetic: 'SAB-uerd tou-ken-ai-ZEI-scen',
              example:
                'Modern LLMs use subword tokenization to handle rare and compound words efficiently. = I moderni LLM usano la tokenizzazione per sotto-parole per gestire parole rare e composte efficientemente.',
              context: 'nlp',
              difficulty: 'intermediate',
              note: 'Esempi: BPE, WordPiece, SentencePiece.',
            },
            {
              english: 'Byte-Pair Encoding',
              italian: 'Codifica byte-pair',
              pronunciation: '/baɪt peər ɪnˈkoʊdɪŋ/',
              phonetic: 'BAIT-PEAR in-KOU-ding',
              example:
                'GPT models use byte-pair encoding to build a vocabulary of frequent character combinations. = I modelli GPT usano la codifica a coppie di byte per costruire un vocabolario di combinazioni di caratteri frequenti.',
              context: 'nlp',
              difficulty: 'intermediate',
              note: 'Abbreviato BPE.',
            },
            {
              english: 'Vocabulary',
              italian: 'Vocabolario',
              pronunciation: '/voʊˈkæbjəleri/',
              phonetic: 'vou-KAB-iu-le-ri',
              example:
                "The tokenizer's vocabulary of 50,000 entries maps every possible token to a unique integer ID. = Il vocabolario del tokenizer di 50.000 voci mappa ogni token possibile a un ID intero unico.",
              context: 'nlp',
              difficulty: 'intermediate',
              code: 'len(tokenizer.vocab)',
            },
            {
              english: 'Stop Word',
              italian: 'Parola vuota',
              pronunciation: '/stɒp wɜːrd/',
              phonetic: 'STOP UERD',
              example:
                "Removing common stop words like 'the' and 'is' can improve search relevance in traditional NLP. = Rimuovere parole comuni come 'the' e 'is' può migliorare la rilevanza della ricerca nell'NLP tradizionale.",
              context: 'nlp',
              difficulty: 'intermediate',
              note: 'Spesso rimosse nei modelli classici, mantenute nei transformer.',
            },
            {
              english: 'Stemming',
              italian: 'Riduzione alla radice (Stemming)',
              pronunciation: '/ˈstemɪŋ/',
              phonetic: 'STEM-ming',
              example:
                "After applying stemming, the words 'running', 'runs', and 'ran' all reduce to the stem 'run'. = Dopo aver applicato lo stemming, le parole 'running', 'runs' e 'ran' si riducono tutte alla radice 'run'.",
              context: 'nlp',
              difficulty: 'intermediate',
              code: 'PorterStemmer().stem("running")',
            },
            {
              english: 'Lemmatization',
              italian: 'Lemmatizzazione',
              pronunciation: '/ˌlemətaɪˈzeɪʃən/',
              phonetic: 'lem-ma-tai-ZEI-scen',
              example:
                "Unlike stemming, lemmatization returns proper dictionary words: 'better' becomes 'good', not 'bett'. = A differenza dello stemming, la lemmatizzazione restituisce parole del dizionario: 'better' diventa 'good', non 'bett'.",
              context: 'nlp',
              difficulty: 'intermediate',
              code: 'lemmatizer.lemmatize("running")',
              note: 'Più accurata dello stemming, ma più lenta.',
            },
            {
              english: 'Bag of Words',
              italian: 'Sacco di parole',
              pronunciation: '/bæɡ əv wɜːrdz/',
              phonetic: 'BAG-OF-UERDZ',
              example:
                "A bag of words model ignores word order and simply counts how often each term appears in the document. = Un modello bag of words ignora l'ordine delle parole e conta semplicemente quanto spesso ogni termine appare nel documento.",
              context: 'nlp',
              difficulty: 'intermediate',
              code: 'CountVectorizer().fit_transform(corpus)',
              note: 'Abbreviato BoW.',
            },
            {
              english: 'TF-IDF',
              italian: 'Pesatura termini (TF-IDF)',
              pronunciation: '/tiː ef aɪ diː ef/',
              phonetic: 'TI-EF-AI-DI-EF',
              example:
                "Using TF-IDF, common words like 'the' get low scores while distinctive terms like 'gradient' rank higher. = Usando TF-IDF, parole comuni come 'the' ottengono punteggi bassi mentre termini distintivi come 'gradient' hanno punteggi più alti.",
              context: 'nlp',
              difficulty: 'intermediate',
              code: 'TfidfVectorizer().fit_transform(corpus)',
              note: 'Term Frequency - Inverse Document Frequency.',
            },
          ],
        },
        {
          id: 'ai_nlp_2',
          title: 'Embeddings / Vettori Densi',
          description: 'Rappresentazioni numeriche del significato',
          items: [
            {
              english: 'Embedding',
              italian: 'Rappresentazione vettoriale (Embedding)',
              pronunciation: '/ɪmˈbedɪŋ/',
              phonetic: 'em-BED-ding',
              example:
                'Each word in the vocabulary is mapped to a dense embedding vector of 300 dimensions. = Ogni parola nel vocabolario è mappata a un vettore di embedding denso di 300 dimensioni.',
              context: 'nlp',
              difficulty: 'intermediate',
              code: 'Embedding(vocab_size, 128)',
              note: 'Termine sempre lasciato in inglese.',
            },
            {
              english: 'Word2Vec',
              italian: 'Embedding di parole Google (Word2Vec)',
              pronunciation: '/wɜːrd tuː vek/',
              phonetic: 'UERD-TU-VEK',
              example:
                "After training Word2Vec on news articles, the vector for 'king' minus 'man' plus 'woman' approximated 'queen'. = Dopo aver addestrato Word2Vec su articoli di giornale, il vettore di 'king' meno 'man' più 'woman' approssimava 'queen'.",
              context: 'nlp',
              difficulty: 'intermediate',
              code: 'Word2Vec(sentences, vector_size=100)',
            },
            {
              english: 'GloVe',
              italian: 'Embedding di parole Stanford (GloVe)',
              pronunciation: '/ɡloʊv/',
              phonetic: 'GLOUV',
              example:
                "Stanford's GloVe embeddings are pre-trained on Wikipedia and capture semantic relationships between words. = Gli embedding GloVe di Stanford sono pre-addestrati su Wikipedia e catturano relazioni semantiche tra le parole.",
              context: 'nlp',
              difficulty: 'intermediate',
              note: 'Global Vectors for Word Representation. Da Stanford.',
            },
            {
              english: 'FastText',
              italian: 'Embedding con sub-parole Meta (FastText)',
              pronunciation: '/fæst tekst/',
              phonetic: 'FAST-TEKST',
              example:
                'Unlike Word2Vec, FastText handles out-of-vocabulary words by composing character n-gram embeddings. = A differenza di Word2Vec, FastText gestisce parole fuori vocabolario componendo embedding di n-grammi di caratteri.',
              context: 'nlp',
              difficulty: 'intermediate',
              tool: 'fasttext',
            },
            {
              english: 'CBOW',
              italian: 'Continuous Bag of Words (CBOW)',
              pronunciation: '/siː baʊ/',
              phonetic: 'SI-BOU',
              example:
                'The CBOW variant of Word2Vec predicts a target word from its surrounding context window. = La variante CBOW di Word2Vec predice una parola target dalla finestra di contesto circostante.',
              context: 'nlp',
              difficulty: 'intermediate',
              note: 'Continuous Bag-of-Words.',
            },
            {
              english: 'Skip-Gram',
              italian: 'Inverso di CBOW (Skip-Gram)',
              pronunciation: '/skɪp ɡræm/',
              phonetic: 'SKIP-GRAM',
              example:
                "Training a skip-gram model on legal documents produced embeddings specialized for contract analysis. = Addestrare un modello skip-gram su documenti legali ha prodotto embedding specializzati per l'analisi dei contratti.",
              context: 'nlp',
              difficulty: 'intermediate',
            },
            {
              english: 'Cosine Similarity',
              italian: 'Similarità del coseno',
              pronunciation: '/ˈkoʊsaɪn ˌsɪmɪˈlærəti/',
              phonetic: 'KO-sain si-mi-LA-ri-ti',
              example:
                "We ranked search results by cosine similarity between the query embedding and each document vector. = Abbiamo classificato i risultati di ricerca per similarità coseno tra l'embedding della query e ogni vettore di documento.",
              context: 'nlp',
              difficulty: 'intermediate',
              code: 'cosine_similarity(v1, v2)',
            },
            {
              english: 'Vector Space',
              italian: 'Spazio vettoriale',
              pronunciation: '/ˈvektər speɪs/',
              phonetic: 'VEK-ter SPEIS',
              example:
                "In the learned vector space, semantically similar words like 'car' and 'vehicle' cluster together. = Nello spazio vettoriale appreso, parole semanticamente simili come 'car' e 'vehicle' si raggruppano.",
              context: 'nlp',
              difficulty: 'intermediate',
            },
            {
              english: 'Sentence Embedding',
              italian: 'Embedding di frase',
              pronunciation: '/ˈsentəns ɪmˈbedɪŋ/',
              phonetic: 'SEN-tens em-BED-ding',
              example:
                'We generated a sentence embedding for each customer review to cluster similar complaints together. = Abbiamo generato un embedding di frase per ogni recensione cliente per raggruppare lamentele simili.',
              context: 'nlp',
              difficulty: 'intermediate',
              tool: 'sentence-transformers',
            },
            {
              english: 'Contextual Embedding',
              italian: 'Embedding contestuale',
              pronunciation: '/kənˈtekstʃuəl ɪmˈbedɪŋ/',
              phonetic: 'kon-TEK-stiu-al em-BED-ding',
              example:
                "Unlike static Word2Vec vectors, a contextual embedding gives 'bank' different representations in financial and river contexts. = A differenza dei vettori statici Word2Vec, un embedding contestuale dà a 'bank' rappresentazioni diverse in contesti finanziari e fluviali.",
              context: 'nlp',
              difficulty: 'intermediate',
              note: 'Esempio: BERT, ELMo. Diverso da Word2Vec che è statico.',
            },
          ],
        },
        {
          id: 'ai_nlp_3',
          title: 'Sequence Models / Modelli di Sequenza',
          description: 'Modelli classici per il NLP',
          items: [
            {
              english: 'Sequence Model',
              italian: 'Modello di sequenza',
              pronunciation: '/ˈsiːkwəns ˈmɒdəl/',
              phonetic: 'SI-kuens MO-del',
              example:
                'Any sequence model that processes tokens one by one must handle variable-length inputs gracefully. = Ogni modello sequenziale che elabora token uno per uno deve gestire input di lunghezza variabile in modo elegante.',
              context: 'nlp',
              difficulty: 'intermediate',
            },
            {
              english: 'Language Model',
              italian: 'Modello linguistico',
              pronunciation: '/ˈlæŋɡwɪdʒ ˈmɒdəl/',
              phonetic: 'LAN-guigi MO-del',
              example:
                "A language model assigns probabilities to word sequences, enabling tasks from autocomplete to summarization. = Un modello linguistico assegna probabilità alle sequenze di parole, abilitando compiti dall'autocompletamento al riassunto.",
              context: 'nlp',
              difficulty: 'intermediate',
            },
            {
              english: 'N-Gram',
              italian: 'N-gramma',
              pronunciation: '/en ɡræm/',
              phonetic: 'EN-GRAM',
              example:
                'A bigram (2-gram) model predicts the next word based only on the single previous word. = Un modello bigramma (2-grammi) predice la parola successiva basandosi solo sulla singola parola precedente.',
              context: 'nlp',
              difficulty: 'intermediate',
              note: 'Modello classico precedente alle reti neurali.',
            },
            {
              english: 'Encoder',
              italian: 'Codificatore (Encoder)',
              pronunciation: '/ɪnˈkoʊdər/',
              phonetic: 'en-KOU-der',
              example:
                "In a seq2seq architecture, the encoder compresses the entire input sentence into a fixed-length vector. = In un'architettura seq2seq, l'encoder comprime l'intera frase di input in un vettore di lunghezza fissa.",
              context: 'nlp',
              difficulty: 'intermediate',
              note: 'Termine sempre in inglese in italiano tecnico.',
            },
            {
              english: 'Decoder',
              italian: 'Decodificatore (Decoder)',
              pronunciation: '/diːˈkoʊdər/',
              phonetic: 'di-KOU-der',
              example:
                "The decoder generates the output sequence one token at a time, conditioned on the encoder representation. = Il decoder genera la sequenza di output un token alla volta, condizionato dalla rappresentazione dell'encoder.",
              context: 'nlp',
              difficulty: 'intermediate',
            },
            {
              english: 'Beam Search',
              italian: 'Ricerca a fascio (Beam Search)',
              pronunciation: '/biːm sɜːrtʃ/',
              phonetic: 'BIM-SERCI',
              example:
                'Instead of greedily picking the top token, beam search explores multiple hypotheses to find better translations. = Invece di scegliere avidamente il token migliore, il beam search esplora più ipotesi per trovare traduzioni migliori.',
              context: 'nlp',
              difficulty: 'intermediate',
              code: 'model.generate(input_ids, num_beams=5)',
            },
            {
              english: 'Greedy Decoding',
              italian: 'Decodifica greedy',
              pronunciation: '/ˈɡriːdi diːˈkoʊdɪŋ/',
              phonetic: 'GRI-di di-KOU-ding',
              example:
                'Although fast, greedy decoding picks only the most probable token at each step and can miss better sequences. = Sebbene veloce, la decodifica greedy sceglie solo il token più probabile a ogni passo e può mancare sequenze migliori.',
              context: 'nlp',
              difficulty: 'intermediate',
            },
            {
              english: 'BLEU Score',
              italian: 'Punteggio BLEU',
              pronunciation: '/bluː skɔːr/',
              phonetic: 'BLU-SKOR',
              example:
                'Our translation model achieved a BLEU score of 34.5, comparable to professional human translators. = Il nostro modello di traduzione ha raggiunto un punteggio BLEU di 34.5, comparabile a traduttori umani professionisti.',
              context: 'nlp',
              difficulty: 'intermediate',
              note: 'Bilingual Evaluation Understudy.',
            },
            {
              english: 'ROUGE Score',
              italian: 'Punteggio ROUGE',
              pronunciation: '/ruːʒ skɔːr/',
              phonetic: 'RUSH-SKOR',
              example:
                'We evaluated the summarizer using ROUGE score, which measures n-gram overlap with reference summaries. = Abbiamo valutato il riassuntore usando il punteggio ROUGE, che misura la sovrapposizione di n-grammi con riassunti di riferimento.',
              context: 'nlp',
              difficulty: 'intermediate',
            },
            {
              english: 'Perplexity',
              italian: 'Perplessità',
              pronunciation: '/pərˈpleksəti/',
              phonetic: 'per-PLEK-si-ti',
              example:
                'A lower perplexity means the language model is more confident and accurate in predicting the next token. = Una perplexity più bassa significa che il modello linguistico è più sicuro e accurato nel predire il prossimo token.',
              context: 'nlp',
              difficulty: 'intermediate',
              code: 'perplexity = exp(loss)',
            },
          ],
        },
        {
          id: 'ai_nlp_4',
          title: "Attention Basics / Basi dell'Attenzione",
          description: 'Il meccanismo di attenzione',
          items: [
            {
              english: 'Attention',
              italian: 'Attenzione',
              pronunciation: '/əˈtenʃən/',
              phonetic: 'a-TEN-scen',
              example:
                "The core innovation of attention is letting the model focus on relevant input tokens when generating each output. = L'innovazione chiave dell'attenzione è permettere al modello di concentrarsi su token di input rilevanti quando genera ogni output.",
              context: 'nlp',
              difficulty: 'intermediate',
              note: "Concetto rivoluzionario per l'NLP moderno.",
            },
            {
              english: 'Attention Score',
              italian: 'Punteggio di attenzione',
              pronunciation: '/əˈtenʃən skɔːr/',
              phonetic: 'a-TEN-scen SKOR',
              example:
                'High attention scores between a pronoun and a distant noun indicate the model resolved the coreference correctly. = Punteggi di attenzione alti tra un pronome e un sostantivo distante indicano che il modello ha risolto la coreferenza correttamente.',
              context: 'nlp',
              difficulty: 'intermediate',
            },
            {
              english: 'Attention Weight',
              italian: 'Peso di attenzione',
              pronunciation: '/əˈtenʃən weɪt/',
              phonetic: 'a-TEN-scen UEIT',
              example:
                "Visualizing attention weights showed that the translation model correctly aligned 'chat' with 'cat'. = Visualizzare i pesi di attenzione ha mostrato che il modello di traduzione ha correttamente allineato 'chat' con 'cat'.",
              context: 'nlp',
              difficulty: 'intermediate',
            },
            {
              english: 'Query',
              italian: 'Interrogazione (Query)',
              pronunciation: '/ˈkwɪri/',
              phonetic: 'KUI-ri',
              example:
                'In self-attention, each token generates a query vector representing what information it seeks from others. = Nella self-attention, ogni token genera un vettore query che rappresenta quale informazione cerca dagli altri.',
              context: 'nlp',
              difficulty: 'intermediate',
              note: 'In attention: Query, Key, Value sono i tre tensor.',
            },
            {
              english: 'Key',
              italian: 'Chiave',
              pronunciation: '/kiː/',
              phonetic: 'KI',
              example:
                'Each token also produces a key vector that other tokens compare against when computing attention scores. = Ogni token produce anche un vettore key che gli altri token confrontano quando calcolano i punteggi di attenzione.',
              context: 'nlp',
              difficulty: 'intermediate',
            },
            {
              english: 'Value',
              italian: 'Valore',
              pronunciation: '/ˈvæljuː/',
              phonetic: 'VAL-iu',
              example:
                "Once attention scores are computed, they weight the value vectors to produce the final attended output. = Una volta calcolati i punteggi di attenzione, questi pesano i vettori value per produrre l'output finale attenzionato.",
              context: 'nlp',
              difficulty: 'intermediate',
            },
            {
              english: 'Soft Attention',
              italian: 'Attenzione soft',
              pronunciation: '/sɒft əˈtenʃən/',
              phonetic: 'SOFT a-TEN-scen',
              example:
                "Unlike hard attention, soft attention computes a weighted average over all positions, making it fully differentiable. = A differenza dell'attenzione hard, la soft attention calcola una media pesata su tutte le posizioni, rendendola completamente differenziabile.",
              context: 'nlp',
              difficulty: 'intermediate',
            },
            {
              english: 'Hard Attention',
              italian: 'Attenzione hard',
              pronunciation: '/hɑːrd əˈtenʃən/',
              phonetic: 'HARD a-TEN-scen',
              example:
                "With hard attention the model selects a single input position to attend to, requiring reinforcement learning to train. = Con l'attenzione hard il modello seleziona una singola posizione di input, richiedendo l'apprendimento per rinforzo per l'addestramento.",
              context: 'nlp',
              difficulty: 'intermediate',
            },
            {
              english: 'Scaled Dot-Product',
              italian: 'Prodotto scalare scalato',
              pronunciation: '/skeɪld dɒt ˈprɒdʌkt/',
              phonetic: 'SKEILD-DOT PRO-dakt',
              example:
                'Dividing dot products by the square root of dimension prevents scaled dot-product attention scores from becoming too large. = Dividere i prodotti scalari per la radice quadrata della dimensione impedisce ai punteggi di attenzione scaled dot-product di diventare troppo grandi.',
              context: 'nlp',
              difficulty: 'intermediate',
              note: 'Formula: softmax(QK^T / sqrt(d)) V.',
            },
            {
              english: 'Attention Map',
              italian: 'Mappa di attenzione',
              pronunciation: '/əˈtenʃən mæp/',
              phonetic: 'a-TEN-scen MAP',
              example:
                'The attention map showed that when translating, the model correctly focused on the subject when generating the verb. = La mappa di attenzione ha mostrato che durante la traduzione, il modello si concentrava correttamente sul soggetto quando generava il verbo.',
              context: 'nlp',
              difficulty: 'intermediate',
              note: 'Utile per interpretabilità.',
            },
          ],
        },
      ],
    },
    // ════════════════════════════════════════════════
    // LEVEL 7 - TRANSFORMER E LLM / TRANSFORMERS & LLMS
    // ════════════════════════════════════════════════
    7: {
      name: 'Transformer e LLM / Transformers & LLMs',
      description: 'Architettura transformer e modelli linguistici',
      lessons: [
        {
          id: 'ai_transformers_1',
          title: 'Transformer Architecture / Architettura Transformer',
          description: 'I componenti dei transformer',
          items: [
            {
              english: 'Transformer',
              italian: 'Architettura di rete (Transformer)',
              pronunciation: '/trænsˈfɔːrmər/',
              phonetic: 'trans-FOR-mer',
              example:
                "The original Transformer paper, 'Attention Is All You Need', revolutionized NLP by eliminating recurrence. = L'articolo originale sul Transformer, 'Attention Is All You Need', ha rivoluzionato l'NLP eliminando la ricorrenza.",
              context: 'architectures',
              difficulty: 'intermediate',
              note: 'Architettura di "Attention Is All You Need".',
            },
            {
              english: 'Self-Attention',
              italian: 'Auto-attenzione',
              pronunciation: '/self əˈtenʃən/',
              phonetic: 'SELF-a-TEN-scen',
              example:
                'In self-attention, each word in a sentence computes relationships with every other word simultaneously. = Nella self-attention, ogni parola in una frase calcola relazioni con ogni altra parola simultaneamente.',
              context: 'architectures',
              difficulty: 'intermediate',
              note: 'Cuore del transformer.',
            },
            {
              english: 'Multi-Head Attention',
              italian: 'Attenzione multi-testa',
              pronunciation: '/ˌmʌlti hed əˈtenʃən/',
              phonetic: 'MAL-ti-HED a-TEN-scen',
              example:
                'With 12 heads, multi-head attention lets the model capture syntactic, semantic, and positional patterns in parallel. = Con 12 teste, la multi-head attention permette al modello di catturare pattern sintattici, semantici e posizionali in parallelo.',
              context: 'architectures',
              difficulty: 'intermediate',
              code: 'MultiHeadAttention(num_heads=8)',
            },
            {
              english: 'Positional Encoding',
              italian: 'Codifica posizionale',
              pronunciation: '/pəˈzɪʃənəl ɪnˈkoʊdɪŋ/',
              phonetic: 'po-SI-scio-nal in-KOU-ding',
              example:
                'Since Transformers have no inherent order, positional encoding injects sequence position via sine and cosine functions. = Poiché i Transformer non hanno un ordine intrinseco, la codifica posizionale inietta la posizione nella sequenza tramite funzioni seno e coseno.',
              context: 'architectures',
              difficulty: 'intermediate',
              note: 'Necessaria perché self-attention è permutation-invariant.',
            },
            {
              english: 'Encoder-Decoder',
              italian: 'Architettura sequence-to-sequence (Encoder-Decoder)',
              pronunciation: '/ɪnˈkoʊdər diːˈkoʊdər/',
              phonetic: 'en-KOU-der di-KOU-der',
              example:
                'Machine translation models use a full encoder-decoder Transformer to map source language to target language. = I modelli di traduzione automatica usano un Transformer encoder-decoder completo per mappare la lingua sorgente alla lingua target.',
              context: 'architectures',
              difficulty: 'intermediate',
            },
            {
              english: 'Residual Connection',
              italian: 'Connessione residua',
              pronunciation: '/rɪˈzɪdʒuəl kəˈnekʃən/',
              phonetic: 'ri-ZI-giu-al ko-NEK-scen',
              example:
                'Each sub-layer in a Transformer wraps its output with a residual connection to preserve gradient flow. = Ogni sotto-strato in un Transformer avvolge il suo output con una connessione residua per preservare il flusso del gradiente.',
              context: 'architectures',
              difficulty: 'intermediate',
              code: 'x = x + sublayer(x)',
            },
            {
              english: 'Feed-Forward Network',
              italian: 'Rete feed-forward',
              pronunciation: '/fiːd ˈfɔːrwərd ˈnetwɜːrk/',
              phonetic: 'FID-FOR-uerd NET-uerk',
              example:
                "Inside each Transformer block, the feed-forward network applies two linear transforms with a ReLU in between. = All'interno di ogni blocco Transformer, la rete feed-forward applica due trasformazioni lineari con una ReLU nel mezzo.",
              context: 'architectures',
              difficulty: 'intermediate',
              note: 'Abbreviata FFN. Tipicamente con espansione 4x.',
            },
            {
              english: 'Causal Mask',
              italian: 'Maschera causale',
              pronunciation: '/ˈkɔːzəl mæsk/',
              phonetic: 'KO-zal MASK',
              example:
                'GPT-style models apply a causal mask so that each token can only attend to previous tokens, not future ones. = I modelli in stile GPT applicano una maschera causale così che ogni token possa attendere solo ai token precedenti, non futuri.',
              context: 'architectures',
              difficulty: 'intermediate',
              note: 'Essenziale per modelli generativi come GPT.',
            },
            {
              english: 'Cross-Attention',
              italian: 'Attenzione incrociata',
              pronunciation: '/krɒs əˈtenʃən/',
              phonetic: 'KROS a-TEN-scen',
              example:
                "In the decoder, cross-attention lets each output token query the encoder representations for relevant source context. = Nel decoder, la cross-attention permette a ogni token di output di interrogare le rappresentazioni dell'encoder per contesto sorgente rilevante.",
              context: 'architectures',
              difficulty: 'intermediate',
            },
            {
              english: 'Transformer Block',
              italian: 'Blocco transformer',
              pronunciation: '/trænsˈfɔːrmər blɒk/',
              phonetic: 'trans-FOR-mer BLOK',
              example:
                'Stacking 12 identical Transformer blocks creates a model with billions of parameters and deep contextual understanding. = Impilare 12 blocchi Transformer identici crea un modello con miliardi di parametri e comprensione contestuale profonda.',
              context: 'architectures',
              difficulty: 'intermediate',
              note: 'Si impila per fare modelli più profondi.',
            },
          ],
        },
        {
          id: 'ai_transformers_2',
          title: 'BERT & Encoder Models / BERT e Modelli Encoder',
          description: 'Modelli per comprensione del testo',
          items: [
            {
              english: 'BERT',
              italian: 'Transformer bidirezionale Google (BERT)',
              pronunciation: '/bɜːrt/',
              phonetic: 'BERT',
              example:
                'Google released BERT in 2018, showing that bidirectional pre-training dramatically improves question answering. = Google ha rilasciato BERT nel 2018, mostrando che il pre-addestramento bidirezionale migliora drasticamente il question answering.',
              context: 'architectures',
              difficulty: 'intermediate',
              note: 'Bidirectional Encoder Representations from Transformers.',
            },
            {
              english: 'CLS Token',
              italian: 'Token CLS',
              pronunciation: '/siː el es ˈtoʊkən/',
              phonetic: 'SI-EL-ES TOU-ken',
              example:
                "The classifier uses the CLS token embedding from the final layer as the aggregate sentence representation. = Il classificatore usa l'embedding del token CLS dallo strato finale come rappresentazione aggregata della frase.",
              context: 'architectures',
              difficulty: 'intermediate',
              note: 'Usato per classificazione in BERT.',
            },
            {
              english: 'SEP Token',
              italian: 'Token SEP',
              pronunciation: '/sep ˈtoʊkən/',
              phonetic: 'SEP TOU-ken',
              example:
                "Between two input sentences, the SEP token marks the boundary so the model knows where one ends and the other begins. = Tra due frasi di input, il token SEP segna il confine così il modello sa dove una finisce e l'altra inizia.",
              context: 'architectures',
              difficulty: 'intermediate',
            },
            {
              english: 'Masked Language Modeling',
              italian: 'Modellazione linguistica mascherata',
              pronunciation: '/mæskt ˈlæŋɡwɪdʒ ˈmɒdəlɪŋ/',
              phonetic: 'MASKD LAN-guigi MO-de-ling',
              example:
                'During pre-training, BERT randomly masks 15% of tokens and learns to predict them from context. = Durante il pre-addestramento, BERT maschera casualmente il 15% dei token e impara a predirli dal contesto.',
              context: 'architectures',
              difficulty: 'intermediate',
              note: 'Abbreviato MLM.',
            },
            {
              english: 'Next Sentence Prediction',
              italian: 'Predizione frase successiva',
              pronunciation: '/nekst ˈsentəns prɪˈdɪkʃən/',
              phonetic: 'NEKST SEN-tens pri-DIK-scen',
              example:
                "BERT's next sentence prediction task trains the model to determine if two paragraphs are logically connected. = Il compito di predizione della frase successiva di BERT addestra il modello a determinare se due paragrafi sono logicamente connessi.",
              context: 'architectures',
              difficulty: 'intermediate',
              note: 'Abbreviata NSP.',
            },
            {
              english: 'RoBERTa',
              italian: 'BERT robustamente ottimizzato (RoBERTa)',
              pronunciation: '/roʊˈbɜːrtə/',
              phonetic: 'ro-BER-ta',
              example:
                "Facebook's RoBERTa improved on BERT by training longer on more data and removing the next-sentence task. = RoBERTa di Facebook ha migliorato BERT addestrando più a lungo su più dati e rimuovendo il compito della frase successiva.",
              context: 'architectures',
              difficulty: 'intermediate',
              note: 'Robustly Optimized BERT.',
            },
            {
              english: 'DistilBERT',
              italian: 'BERT distillato compatto (DistilBERT)',
              pronunciation: '/ˈdɪstɪl bɜːrt/',
              phonetic: 'DIS-til-BERT',
              example:
                "For mobile deployment, DistilBERT provides 97% of BERT's accuracy at 60% the size and 2x the speed. = Per il deploy su mobile, DistilBERT fornisce il 97% dell'accuratezza di BERT al 60% della dimensione e 2x la velocità.",
              context: 'architectures',
              difficulty: 'intermediate',
              note: 'Ottenuto via distillazione di conoscenza.',
            },
            {
              english: 'ALBERT',
              italian: 'BERT leggero a parametri condivisi (ALBERT)',
              pronunciation: '/ˈælbərt/',
              phonetic: 'AL-bert',
              example:
                'By sharing parameters across layers, ALBERT achieves comparable results to BERT with 18x fewer parameters. = Condividendo parametri tra gli strati, ALBERT raggiunge risultati comparabili a BERT con 18 volte meno parametri.',
              context: 'architectures',
              difficulty: 'intermediate',
              note: 'A Lite BERT.',
            },
            {
              english: 'Encoder-Only',
              italian: 'Solo encoder',
              pronunciation: '/ɪnˈkoʊdər ˈoʊnli/',
              phonetic: 'en-KOU-der OUN-li',
              example:
                "Classification and NER tasks typically use encoder-only architectures like BERT that see the full input at once. = Compiti di classificazione e NER usano tipicamente architetture encoder-only come BERT che vedono l'intero input in una volta.",
              context: 'architectures',
              difficulty: 'intermediate',
              note: 'Adatto per classificazione e comprensione, non generazione.',
            },
            {
              english: 'Pre-Trained Model',
              italian: 'Modello pre-addestrato',
              pronunciation: '/priː treɪnd ˈmɒdəl/',
              phonetic: 'PRI-TREIND MO-del',
              example:
                'Starting from a pre-trained model on general text, we fine-tuned for medical document classification in just 2 hours. = Partendo da un modello pre-addestrato su testo generale, abbiamo fatto il fine-tuning per classificazione documenti medici in sole 2 ore.',
              context: 'architectures',
              difficulty: 'intermediate',
              code: 'AutoModel.from_pretrained("bert-base")',
            },
          ],
        },
        {
          id: 'ai_transformers_3',
          title: 'GPT & Decoder Models / GPT e Modelli Decoder',
          description: 'Modelli generativi autoregressivi',
          items: [
            {
              english: 'GPT',
              italian: 'Generative Pre-trained Transformer (GPT)',
              pronunciation: '/dʒiː piː tiː/',
              phonetic: 'GI-PI-TI',
              example:
                "OpenAI's GPT architecture generates text autoregressively, predicting one token at a time from left to right. = L'architettura GPT di OpenAI genera testo in modo autoregressivo, predicendo un token alla volta da sinistra a destra.",
              context: 'architectures',
              difficulty: 'intermediate',
              note: 'Generative Pre-trained Transformer.',
            },
            {
              english: 'Autoregressive',
              italian: 'Autoregressivo',
              pronunciation: '/ˌɔːtoʊrɪˈɡresɪv/',
              phonetic: 'au-tou-ri-GRES-siv',
              example:
                'An autoregressive model generates each token by conditioning on all previously generated tokens. = Un modello autoregressivo genera ogni token condizionandosi su tutti i token precedentemente generati.',
              context: 'architectures',
              difficulty: 'intermediate',
            },
            {
              english: 'Decoder-Only',
              italian: 'Solo decoder',
              pronunciation: '/diːˈkoʊdər ˈoʊnli/',
              phonetic: 'di-KOU-der OUN-li',
              example:
                "Modern chatbots like ChatGPT use a decoder-only architecture optimized for fluent text generation. = Chatbot moderni come ChatGPT usano un'architettura decoder-only ottimizzata per la generazione fluente di testo.",
              context: 'architectures',
              difficulty: 'intermediate',
            },
            {
              english: 'Large Language Model',
              italian: 'Grande modello linguistico',
              pronunciation: '/lɑːrdʒ ˈlæŋɡwɪdʒ ˈmɒdəl/',
              phonetic: 'LARGI LAN-guigi MO-del',
              example:
                'A large language model with 70 billion parameters can write essays, translate, and answer domain-specific questions. = Un grande modello linguistico con 70 miliardi di parametri può scrivere saggi, tradurre e rispondere a domande di dominio specifico.',
              context: 'architectures',
              difficulty: 'intermediate',
              note: 'Abbreviato LLM. Spesso lasciato in inglese.',
            },
            {
              english: 'Context Window',
              italian: 'Finestra di contesto',
              pronunciation: '/ˈkɒntekst ˈwɪndoʊ/',
              phonetic: 'KON-tekst UIN-dou',
              example:
                "GPT-4's 128K context window allows processing entire books in a single conversation turn. = La finestra di contesto di 128K di GPT-4 consente di elaborare interi libri in un singolo turno di conversazione.",
              context: 'architectures',
              difficulty: 'intermediate',
              note: 'Detta anche context length. Misurata in token.',
            },
            {
              english: 'Generation',
              italian: 'Generazione',
              pronunciation: '/ˌdʒenəˈreɪʃən/',
              phonetic: 'gen-ne-REI-scen',
              example:
                "Controlling randomness during generation balances creativity against factual accuracy in the output. = Controllare la casualità durante la generazione bilancia creatività e accuratezza fattuale nell'output.",
              context: 'architectures',
              difficulty: 'intermediate',
              code: 'model.generate(input_ids, max_length=100)',
            },
            {
              english: 'Top-K Sampling',
              italian: 'Campionamento top-K',
              pronunciation: '/tɒp keɪ ˈsæmplɪŋ/',
              phonetic: 'TOP-KEI SAM-pling',
              example:
                'Setting top-K sampling to 40 means the model randomly picks from only the 40 most probable next tokens. = Impostare il campionamento top-K a 40 significa che il modello sceglie casualmente tra i soli 40 token più probabili.',
              context: 'architectures',
              difficulty: 'intermediate',
              code: 'model.generate(top_k=50)',
            },
            {
              english: 'Top-P Sampling',
              italian: 'Campionamento top-P',
              pronunciation: '/tɒp piː ˈsæmplɪŋ/',
              phonetic: 'TOP-PI SAM-pling',
              example:
                "With top-P sampling at 0.9, the model samples from the smallest set of tokens whose cumulative probability exceeds 90%. = Con il campionamento top-P a 0.9, il modello campiona dall'insieme più piccolo di token la cui probabilità cumulativa supera il 90%.",
              context: 'architectures',
              difficulty: 'intermediate',
              code: 'model.generate(top_p=0.9)',
              note: 'Detto anche nucleus sampling.',
            },
            {
              english: 'In-Context Learning',
              italian: 'Apprendimento nel contesto',
              pronunciation: '/ɪn ˈkɒntekst ˈlɜːrnɪŋ/',
              phonetic: 'IN-KON-tekst LER-ning',
              example:
                "Without any weight updates, in-context learning lets GPT-4 learn new tasks just from examples in the prompt. = Senza aggiornamento dei pesi, l'apprendimento nel contesto permette a GPT-4 di imparare nuovi compiti solo dagli esempi nel prompt.",
              context: 'architectures',
              difficulty: 'intermediate',
              note: 'Capacità emergente degli LLM grandi.',
            },
            {
              english: 'Prompt',
              italian: 'Richiesta in input al modello (Prompt)',
              pronunciation: '/prɒmpt/',
              phonetic: 'PROMPT',
              example:
                'Crafting a clear, specific prompt dramatically improves the quality and relevance of LLM outputs. = Creare un prompt chiaro e specifico migliora drasticamente la qualità e la rilevanza degli output degli LLM.',
              context: 'architectures',
              difficulty: 'intermediate',
              note: 'Termine sempre lasciato in inglese.',
            },
          ],
        },
        {
          id: 'ai_transformers_4',
          title: 'Fine-Tuning & Transfer / Adattamento e Trasferimento',
          description: 'Adattare modelli pre-addestrati',
          items: [
            {
              english: 'Fine-Tuning',
              italian: 'Addestramento mirato (Fine-Tuning)',
              pronunciation: '/faɪn ˈtjuːnɪŋ/',
              phonetic: 'FAIN-TIU-ning',
              example:
                'After fine-tuning on 10,000 customer support conversations, our model matched human agent quality scores. = Dopo il fine-tuning su 10.000 conversazioni di supporto clienti, il nostro modello ha eguagliato i punteggi di qualità degli agenti umani.',
              context: 'architectures',
              difficulty: 'intermediate',
              code: 'trainer.train()',
              note: 'Termine spesso lasciato in inglese.',
            },
            {
              english: 'Transfer Learning',
              italian: 'Apprendimento per trasferimento',
              pronunciation: '/ˈtrænsfər ˈlɜːrnɪŋ/',
              phonetic: 'TRANS-fer LER-ning',
              example:
                'Thanks to transfer learning, a model pre-trained on English Wikipedia can be adapted to classify legal Italian documents. = Grazie al transfer learning, un modello pre-addestrato su Wikipedia inglese può essere adattato per classificare documenti legali italiani.',
              context: 'architectures',
              difficulty: 'intermediate',
            },
            {
              english: 'LoRA',
              italian: 'Low-Rank Adaptation (LoRA)',
              pronunciation: '/ˈlɔːrə/',
              phonetic: 'LO-ra',
              example:
                'By inserting small rank-4 LoRA adapters, we fine-tuned a 7B model using only a single consumer GPU. = Inserendo piccoli adattatori LoRA di rango 4, abbiamo fatto il fine-tuning di un modello 7B usando una sola GPU consumer.',
              context: 'architectures',
              difficulty: 'intermediate',
              note: 'Low-Rank Adaptation.',
            },
            {
              english: 'PEFT',
              italian: 'Parameter-Efficient Fine-Tuning (PEFT)',
              pronunciation: '/peft/',
              phonetic: 'PEFT',
              example:
                'Using PEFT methods like LoRA and prefix tuning, teams fine-tune large models without the cost of full retraining. = Usando metodi PEFT come LoRA e prefix tuning, i team fanno fine-tuning di grandi modelli senza il costo del retraining completo.',
              context: 'architectures',
              difficulty: 'intermediate',
              tool: 'peft',
              note: 'Parameter-Efficient Fine-Tuning.',
            },
            {
              english: 'Adapter',
              italian: 'Adattatore',
              pronunciation: '/əˈdæptər/',
              phonetic: 'a-DAP-ter',
              example:
                'Small adapter modules are inserted between frozen layers, letting the model specialize for new tasks efficiently. = Piccoli moduli adapter sono inseriti tra strati congelati, permettendo al modello di specializzarsi in nuovi compiti efficientemente.',
              context: 'architectures',
              difficulty: 'intermediate',
            },
            {
              english: 'Frozen Layer',
              italian: 'Strato congelato',
              pronunciation: '/ˈfroʊzən ˈleɪər/',
              phonetic: 'FROU-zen LEI-er',
              example:
                "We kept the first 20 layers as frozen layers and only trained the final 4, cutting GPU memory by 80%. = Abbiamo mantenuto i primi 20 strati congelati e addestrato solo gli ultimi 4, tagliando la memoria GPU dell'80%.",
              context: 'architectures',
              difficulty: 'intermediate',
              code: 'layer.trainable = False',
            },
            {
              english: 'Instruction Tuning',
              italian: 'Tuning per istruzioni',
              pronunciation: '/ɪnˈstrʌkʃən ˈtjuːnɪŋ/',
              phonetic: 'in-STRAK-scen TIU-ning',
              example:
                "After instruction tuning on diverse task descriptions, the model follows user requests more accurately. = Dopo l'instruction tuning su descrizioni di compiti diversi, il modello segue le richieste dell'utente più accuratamente.",
              context: 'architectures',
              difficulty: 'intermediate',
              note: 'Esempio: trasformare GPT base in ChatGPT.',
            },
            {
              english: 'RLHF',
              italian: 'Apprendimento rinforzato da feedback umano (RLHF)',
              pronunciation: '/ɑːr el eɪtʃ ef/',
              phonetic: 'AR-EL-EICI-EF',
              example:
                "ChatGPT's helpful behavior comes from RLHF, where human raters rank outputs to guide the reward model. = Il comportamento utile di ChatGPT deriva dall'RLHF, dove valutatori umani classificano gli output per guidare il modello di ricompensa.",
              context: 'architectures',
              difficulty: 'intermediate',
              note: 'Reinforcement Learning from Human Feedback.',
            },
            {
              english: 'DPO',
              italian: 'Direct Preference Optimization (DPO)',
              pronunciation: '/diː piː oʊ/',
              phonetic: 'DI-PI-O',
              example:
                "As a simpler alternative to RLHF, DPO directly optimizes model preferences without training a separate reward model. = Come alternativa più semplice all'RLHF, DPO ottimizza direttamente le preferenze del modello senza addestrare un modello di ricompensa separato.",
              context: 'architectures',
              difficulty: 'intermediate',
              note: 'Direct Preference Optimization.',
            },
            {
              english: 'Catastrophic Forgetting',
              italian: 'Oblio catastrofico',
              pronunciation: '/ˌkætəˈstrɒfɪk fərˈɡetɪŋ/',
              phonetic: 'ka-ta-STRO-fik for-GHET-ting',
              example:
                'After fine-tuning on medical data, the model suffered catastrophic forgetting and lost its general conversation ability. = Dopo il fine-tuning su dati medici, il modello ha sofferto di dimenticanza catastrofica e ha perso la capacità di conversazione generale.',
              context: 'architectures',
              difficulty: 'intermediate',
              note: 'Rischio durante fine-tuning aggressivo.',
            },
          ],
        },
      ],
    },
    // ════════════════════════════════════════════════
    // LEVEL 8 - COMPUTER VISION
    // ════════════════════════════════════════════════
    8: {
      name: 'Computer Vision / Visione Artificiale',
      description: 'Elaborazione di immagini e video con IA',
      lessons: [
        {
          id: 'ai_vision_1',
          title: 'Image Classification / Classificazione Immagini',
          description: 'Assegnare etichette a immagini',
          items: [
            {
              english: 'Image Classification',
              italian: 'Classificazione di immagini',
              pronunciation: '/ˈɪmɪdʒ ˌklæsɪfɪˈkeɪʃən/',
              phonetic: 'I-migi kla-si-fi-KEI-scen',
              example:
                "Our image classification pipeline labels factory photos as 'pass' or 'defect' within 50 milliseconds. = La nostra pipeline di classificazione immagini etichetta le foto di fabbrica come 'conforme' o 'difettoso' entro 50 millisecondi.",
              context: 'computer-vision',
              difficulty: 'intermediate',
              code: 'model.predict(image)',
            },
            {
              english: 'ImageNet',
              italian: 'Dataset immagini di riferimento (ImageNet)',
              pronunciation: '/ˈɪmɪdʒ net/',
              phonetic: 'I-migi-NET',
              example:
                "Pre-training on ImageNet gives CNNs general visual features that transfer well to medical imaging. = Il pre-addestramento su ImageNet dà alle CNN feature visive generali che si trasferiscono bene all'imaging medico.",
              context: 'computer-vision',
              difficulty: 'intermediate',
              note: 'Dataset di riferimento con 1000 classi.',
            },
            {
              english: 'Top-1 Accuracy',
              italian: 'Accuratezza top-1',
              pronunciation: '/tɒp wʌn ˈækjərəsi/',
              phonetic: 'TOP-UAN ak-KIU-ra-si',
              example:
                'Our fine-tuned model reached 92% top-1 accuracy on the custom product recognition benchmark. = Il nostro modello fine-tuned ha raggiunto il 92% di accuratezza top-1 sul benchmark personalizzato di riconoscimento prodotti.',
              context: 'computer-vision',
              difficulty: 'intermediate',
            },
            {
              english: 'Top-5 Accuracy',
              italian: 'Accuratezza top-5',
              pronunciation: '/tɒp faɪv ˈækjərəsi/',
              phonetic: 'TOP-FAIV ak-KIU-ra-si',
              example:
                "Even when the top prediction is wrong, 98% top-5 accuracy means the correct label is almost always among the top guesses. = Anche quando la predizione top è sbagliata, il 98% di accuratezza top-5 significa che l'etichetta corretta è quasi sempre tra le prime ipotesi.",
              context: 'computer-vision',
              difficulty: 'intermediate',
              note: 'Standard storico per ImageNet.',
            },
            {
              english: 'Pixel',
              italian: 'Elemento minimo immagine (Pixel)',
              pronunciation: '/ˈpɪksəl/',
              phonetic: 'PIK-sel',
              example:
                "Each pixel in an RGB image carries three intensity values, one for red, green, and blue. = Ogni pixel in un'immagine RGB porta tre valori di intensità, uno per rosso, verde e blu.",
              context: 'computer-vision',
              difficulty: 'intermediate',
            },
            {
              english: 'RGB',
              italian: 'Spazio colore rosso-verde-blu (RGB)',
              pronunciation: '/ɑːr dʒiː biː/',
              phonetic: 'AR-GI-BI',
              example:
                'Before feeding images to the model, we normalized each RGB channel to zero mean and unit variance. = Prima di inserire le immagini nel modello, abbiamo normalizzato ogni canale RGB a media zero e varianza unitaria.',
              context: 'computer-vision',
              difficulty: 'intermediate',
              note: 'Red Green Blue.',
            },
            {
              english: 'Grayscale',
              italian: 'Scala di grigi',
              pronunciation: '/ˈɡreɪskeɪl/',
              phonetic: 'GREI-skeil',
              example:
                "Converting color photos to grayscale reduced input size by 3x and sped up training for simple OCR tasks. = Convertire le foto a colori in scala di grigi ha ridotto la dimensione dell'input di 3 volte e accelerato l'addestramento per compiti OCR semplici.",
              context: 'computer-vision',
              difficulty: 'intermediate',
            },
            {
              english: 'Resolution',
              italian: 'Risoluzione',
              pronunciation: '/ˌrezəˈluːʃən/',
              phonetic: 're-zo-LU-scen',
              example:
                "Increasing image resolution from 224x224 to 384x384 improved small-object detection but doubled training time. = Aumentare la risoluzione dell'immagine da 224x224 a 384x384 ha migliorato il rilevamento di oggetti piccoli ma raddoppiato il tempo di addestramento.",
              context: 'computer-vision',
              difficulty: 'intermediate',
            },
            {
              english: 'Image Tensor',
              italian: 'Tensore immagine',
              pronunciation: '/ˈɪmɪdʒ ˈtensər/',
              phonetic: 'I-migi TEN-ser',
              example:
                'The data loader converts each JPEG file into an image tensor of shape [3, 224, 224] before batching. = Il data loader converte ogni file JPEG in un tensore immagine di forma [3, 224, 224] prima del batching.',
              context: 'computer-vision',
              difficulty: 'intermediate',
              code: 'image.shape  # (224, 224, 3)',
            },
            {
              english: 'Channel',
              italian: 'Canale',
              pronunciation: '/ˈtʃænəl/',
              phonetic: 'CIA-nel',
              example:
                'The first convolutional layer takes 3 input channels (RGB) and outputs 64 feature channels. = Il primo strato convoluzionale prende 3 canali di input (RGB) e produce 64 canali di feature.',
              context: 'computer-vision',
              difficulty: 'intermediate',
            },
          ],
        },
        {
          id: 'ai_vision_2',
          title: 'Object Detection / Rilevamento Oggetti',
          description: 'Localizzare oggetti nelle immagini',
          items: [
            {
              english: 'Object Detection',
              italian: 'Rilevamento oggetti',
              pronunciation: '/ˈɒbdʒekt dɪˈtekʃən/',
              phonetic: 'OB-gekt di-TEK-scen',
              example:
                'Real-time object detection on security cameras identifies people, vehicles, and suspicious packages. = Il rilevamento oggetti in tempo reale sulle telecamere di sicurezza identifica persone, veicoli e pacchi sospetti.',
              context: 'computer-vision',
              difficulty: 'intermediate',
            },
            {
              english: 'Bounding Box',
              italian: 'Riquadro di delimitazione',
              pronunciation: '/ˈbaʊndɪŋ bɒks/',
              phonetic: 'BAUN-ding BOKS',
              example:
                'The model draws a bounding box around each detected face, returning x, y, width, and height coordinates. = Il modello disegna un riquadro di delimitazione intorno a ogni viso rilevato, restituendo coordinate x, y, larghezza e altezza.',
              context: 'computer-vision',
              difficulty: 'intermediate',
              code: 'bbox = [x_min, y_min, x_max, y_max]',
            },
            {
              english: 'YOLO',
              italian: 'Rilevatore oggetti in tempo reale (YOLO)',
              pronunciation: '/ˈjoʊloʊ/',
              phonetic: 'IO-lo',
              example:
                'Deployed on edge devices, YOLO detects objects at 30 frames per second with competitive accuracy. = Implementato su dispositivi edge, YOLO rileva oggetti a 30 frame al secondo con accuratezza competitiva.',
              context: 'computer-vision',
              difficulty: 'intermediate',
              tool: 'YOLOv8',
              note: 'You Only Look Once.',
            },
            {
              english: 'Faster R-CNN',
              italian: 'Rilevatore oggetti a regioni (Faster R-CNN)',
              pronunciation: '/ˈfɑːstər ɑːr siː en en/',
              phonetic: 'FAS-ter AR-SI-EN-EN',
              example:
                "For medical image analysis requiring high precision, Faster R-CNN produces more accurate detections than single-shot methods. = Per l'analisi di immagini mediche che richiede alta precisione, Faster R-CNN produce rilevamenti più accurati dei metodi single-shot.",
              context: 'computer-vision',
              difficulty: 'intermediate',
            },
            {
              english: 'Anchor Box',
              italian: 'Box di ancoraggio',
              pronunciation: '/ˈæŋkər bɒks/',
              phonetic: 'AN-ker BOKS',
              example:
                "The detector uses predefined anchor boxes of different aspect ratios to match objects of various shapes. = Il rilevatore usa anchor box predefinite di diversi rapporti d'aspetto per adattarsi a oggetti di varie forme.",
              context: 'computer-vision',
              difficulty: 'intermediate',
            },
            {
              english: 'IoU',
              italian: 'Intersezione su unione (IoU)',
              pronunciation: '/aɪ oʊ juː/',
              phonetic: 'AI-O-IU',
              example:
                'We consider a detection correct only if its IoU with the ground-truth box exceeds 0.5. = Consideriamo un rilevamento corretto solo se il suo IoU con il box ground-truth supera 0.5.',
              context: 'computer-vision',
              difficulty: 'intermediate',
              note: 'Intersection over Union.',
            },
            {
              english: 'Non-Maximum Suppression',
              italian: 'Soppressione non massima',
              pronunciation: '/nɒn ˈmæksɪməm səˈpreʃən/',
              phonetic: 'NON MAK-si-mum sa-PRE-scen',
              example:
                'After initial detection, non-maximum suppression removes duplicate overlapping boxes for the same object. = Dopo il rilevamento iniziale, la soppressione dei non-massimi rimuove box duplicati sovrapposti per lo stesso oggetto.',
              context: 'computer-vision',
              difficulty: 'intermediate',
              code: 'cv2.dnn.NMSBoxes(boxes, scores, 0.5, 0.4)',
            },
            {
              english: 'Confidence Score',
              italian: 'Punteggio di confidenza',
              pronunciation: '/ˈkɒnfɪdəns skɔːr/',
              phonetic: 'KON-fi-dens SKOR',
              example:
                'We filter out detections with a confidence score below 0.7 to reduce false positives in production. = Filtriamo i rilevamenti con punteggio di confidenza sotto 0.7 per ridurre i falsi positivi in produzione.',
              context: 'computer-vision',
              difficulty: 'intermediate',
            },
            {
              english: 'Mean Average Precision',
              italian: 'Precisione media media',
              pronunciation: '/miːn ˈævərɪdʒ prɪˈsɪʒən/',
              phonetic: 'MIIN AV-ri-gi pri-SI-gen',
              example:
                'Our object detector achieved 78% mean average precision across 80 categories on the COCO benchmark. = Il nostro rilevatore di oggetti ha raggiunto il 78% di precisione media media su 80 categorie sul benchmark COCO.',
              context: 'computer-vision',
              difficulty: 'intermediate',
              note: 'Abbreviata mAP.',
            },
            {
              english: 'Region Proposal',
              italian: 'Proposta di regione',
              pronunciation: '/ˈriːdʒən prəˈpoʊzəl/',
              phonetic: 'RI-gen pro-POU-zal',
              example:
                'Two-stage detectors first generate region proposals, then classify each proposed region individually. = I rilevatori a due stadi prima generano proposte di regione, poi classificano ogni regione proposta individualmente.',
              context: 'computer-vision',
              difficulty: 'intermediate',
            },
          ],
        },
        {
          id: 'ai_vision_3',
          title: 'Segmentation / Segmentazione',
          description: 'Etichettare ogni pixel',
          items: [
            {
              english: 'Segmentation',
              italian: 'Segmentazione',
              pronunciation: '/ˌseɡmenˈteɪʃən/',
              phonetic: 'seg-men-TEI-scen',
              example:
                'For autonomous driving, pixel-level segmentation separates road, sidewalk, vehicles, and pedestrians. = Per la guida autonoma, la segmentazione a livello di pixel separa strada, marciapiede, veicoli e pedoni.',
              context: 'computer-vision',
              difficulty: 'intermediate',
            },
            {
              english: 'Semantic Segmentation',
              italian: 'Segmentazione semantica',
              pronunciation: '/sɪˈmæntɪk ˌseɡmenˈteɪʃən/',
              phonetic: 'si-MAN-tik seg-men-TEI-scen',
              example:
                'For autonomous driving, models perform semantic segmentation to label every pixel as road, sidewalk, vehicle, or pedestrian. = Per la guida autonoma, i modelli eseguono la segmentazione semantica per etichettare ogni pixel come strada, marciapiede, veicolo o pedone.',
              context: 'computer-vision',
              difficulty: 'intermediate',
            },
            {
              english: 'Instance Segmentation',
              italian: 'Segmentazione di istanze',
              pronunciation: '/ˈɪnstəns ˌseɡmenˈteɪʃən/',
              phonetic: 'IN-stans seg-men-TEI-scen',
              example:
                'Unlike semantic segmentation, instance segmentation distinguishes between individual objects of the same class. = A differenza della segmentazione semantica, la segmentazione di istanza distingue tra singoli oggetti della stessa classe.',
              context: 'computer-vision',
              difficulty: 'intermediate',
              note: 'Esempio: due cani diversi separati come istanze diverse.',
            },
            {
              english: 'Panoptic Segmentation',
              italian: 'Segmentazione panottica',
              pronunciation: '/pænˈɒptɪk ˌseɡmenˈteɪʃən/',
              phonetic: 'pan-OP-tik seg-men-TEI-scen',
              example:
                'Combining instance and semantic approaches, panoptic segmentation provides a complete scene understanding map. = Combinando approcci di istanza e semantici, la segmentazione panottica fornisce una mappa completa di comprensione della scena.',
              context: 'computer-vision',
              difficulty: 'intermediate',
            },
            {
              english: 'U-Net',
              italian: 'Rete di segmentazione a U (U-Net)',
              pronunciation: '/juː net/',
              phonetic: 'IU-NET',
              example:
                "Originally designed for medical imaging, U-Net achieves excellent segmentation even with limited training data. = Originariamente progettata per l'imaging medico, U-Net raggiunge eccellente segmentazione anche con dati di addestramento limitati.",
              context: 'computer-vision',
              difficulty: 'intermediate',
              note: 'Architettura a forma di U.',
            },
            {
              english: 'Mask R-CNN',
              italian: 'Segmentazione di istanza (Mask R-CNN)',
              pronunciation: '/mæsk ɑːr siː en en/',
              phonetic: 'MASK AR-SI-EN-EN',
              example:
                'For robotics pick-and-place tasks, Mask R-CNN provides pixel-accurate outlines of each graspable object. = Per compiti robotici di pick-and-place, Mask R-CNN fornisce contorni accurati a livello di pixel di ogni oggetto afferrabile.',
              context: 'computer-vision',
              difficulty: 'intermediate',
            },
            {
              english: 'Mask',
              italian: 'Maschera',
              pronunciation: '/mæsk/',
              phonetic: 'MASK',
              example:
                "Each predicted mask is a binary overlay showing exactly which pixels belong to the detected object. = Ogni maschera predetta è una sovrapposizione binaria che mostra esattamente quali pixel appartengono all'oggetto rilevato.",
              context: 'computer-vision',
              difficulty: 'intermediate',
            },
            {
              english: 'Encoder-Decoder Architecture',
              italian: 'Architettura encoder-decoder',
              pronunciation: '/ɪnˈkoʊdər diːˈkoʊdər ˈɑːrkɪtektʃər/',
              phonetic: 'en-KOU-der di-KOU-der AR-ki-tek-cer',
              example:
                "U-Net's encoder-decoder architecture first compresses the image, then expands it back to full resolution with skip connections. = L'architettura encoder-decoder di U-Net prima comprime l'immagine, poi la espande alla risoluzione completa con connessioni residue.",
              context: 'computer-vision',
              difficulty: 'intermediate',
            },
            {
              english: 'Dice Coefficient',
              italian: 'Coefficiente di Dice',
              pronunciation: '/daɪs ˌkoʊɪˈfɪʃənt/',
              phonetic: 'DAIS ko-i-FI-scent',
              example:
                'We optimized the loss function using the Dice coefficient to handle class imbalance in segmentation masks. = Abbiamo ottimizzato la funzione di loss usando il coefficiente Dice per gestire lo sbilanciamento delle classi nelle maschere di segmentazione.',
              context: 'computer-vision',
              difficulty: 'intermediate',
              note: 'Simile a F1, va da 0 a 1.',
            },
            {
              english: 'SAM',
              italian: 'Segment Anything Model di Meta (SAM)',
              pronunciation: '/sæm/',
              phonetic: 'SAM',
              example:
                "Meta's SAM model segments any object in an image with just a single click or bounding box prompt. = Il modello SAM di Meta segmenta qualsiasi oggetto in un'immagine con un solo click o prompt di bounding box.",
              context: 'computer-vision',
              difficulty: 'intermediate',
              tool: 'segment-anything',
              note: 'Segment Anything Model di Meta.',
            },
          ],
        },
        {
          id: 'ai_vision_4',
          title: 'Vision Tasks / Compiti di Visione',
          description: 'Altre applicazioni di computer vision',
          items: [
            {
              english: 'Face Recognition',
              italian: 'Riconoscimento facciale',
              pronunciation: '/feɪs ˌrekəɡˈnɪʃən/',
              phonetic: 'FEIS re-kog-NI-scen',
              example:
                'Airport security systems use face recognition to match travelers against passport photos in under one second. = I sistemi di sicurezza aeroportuali usano il riconoscimento facciale per abbinare viaggiatori alle foto del passaporto in meno di un secondo.',
              context: 'computer-vision',
              difficulty: 'intermediate',
            },
            {
              english: 'Pose Estimation',
              italian: 'Stima della posa',
              pronunciation: '/poʊz ˌestɪˈmeɪʃən/',
              phonetic: 'POUZ es-ti-MEI-scen',
              example:
                'Physical therapy apps use pose estimation to track joint angles and provide real-time feedback on exercises. = Le app di fisioterapia usano la stima della posa per tracciare gli angoli articolari e fornire feedback in tempo reale sugli esercizi.',
              context: 'computer-vision',
              difficulty: 'intermediate',
              tool: 'OpenPose, MediaPipe',
            },
            {
              english: 'Optical Flow',
              italian: 'Flusso ottico',
              pronunciation: '/ˈɒptɪkəl floʊ/',
              phonetic: 'OP-ti-kal FLOU',
              example:
                'Video stabilization algorithms compute optical flow between consecutive frames to compensate for camera shake. = Gli algoritmi di stabilizzazione video calcolano il flusso ottico tra frame consecutivi per compensare il tremolio della camera.',
              context: 'computer-vision',
              difficulty: 'intermediate',
            },
            {
              english: 'OCR',
              italian: 'Riconoscimento ottico di caratteri (OCR)',
              pronunciation: '/oʊ siː ɑːr/',
              phonetic: 'O-SI-AR',
              example:
                'Digitizing handwritten historical documents at scale requires robust OCR capable of handling faded ink and varied scripts. = Digitalizzare documenti storici manoscritti su larga scala richiede un OCR robusto capace di gestire inchiostro sbiadito e grafie varie.',
              context: 'computer-vision',
              difficulty: 'intermediate',
              tool: 'Tesseract, EasyOCR',
              note: 'Optical Character Recognition.',
            },
            {
              english: 'Image Captioning',
              italian: 'Generazione di didascalie',
              pronunciation: '/ˈɪmɪdʒ ˈkæpʃənɪŋ/',
              phonetic: 'I-migi KAP-scio-ning',
              example:
                'Our image captioning model generates accurate descriptions of product photos for visually impaired shoppers. = Il nostro modello di image captioning genera descrizioni accurate delle foto prodotto per acquirenti con disabilità visive.',
              context: 'computer-vision',
              difficulty: 'intermediate',
            },
            {
              english: 'Visual Question Answering',
              italian: 'Risposta a domande visive',
              pronunciation: '/ˈvɪʒuəl ˈkwestʃən ˈænsərɪŋ/',
              phonetic: 'VI-giu-al KUES-cen AN-se-ring',
              example:
                "Given a chart image, visual question answering can extract specific data points without manual reading. = Data un'immagine di un grafico, il visual question answering può estrarre punti dati specifici senza lettura manuale.",
              context: 'computer-vision',
              difficulty: 'intermediate',
              note: 'Abbreviato VQA. Compito multimodale.',
            },
            {
              english: 'Depth Estimation',
              italian: 'Stima della profondità',
              pronunciation: '/depθ ˌestɪˈmeɪʃən/',
              phonetic: 'DEPT es-ti-MEI-scen',
              example:
                'AR applications use monocular depth estimation to place virtual objects convincingly in real-world scenes. = Le applicazioni AR usano la stima di profondità monoculare per posizionare oggetti virtuali in modo convincente in scene del mondo reale.',
              context: 'computer-vision',
              difficulty: 'intermediate',
            },
            {
              english: 'Super-Resolution',
              italian: 'Super-risoluzione',
              pronunciation: '/ˈsuːpər ˌrezəˈluːʃən/',
              phonetic: 'SU-per re-zo-LU-scen',
              example:
                'Security teams enhance blurry surveillance footage using super-resolution to identify license plates. = I team di sicurezza migliorano filmati di sorveglianza sfocati usando la super-risoluzione per identificare targhe.',
              context: 'computer-vision',
              difficulty: 'intermediate',
            },
            {
              english: 'Image Inpainting',
              italian: 'Riempimento immagini',
              pronunciation: '/ˈɪmɪdʒ ˈɪnpeɪntɪŋ/',
              phonetic: 'I-migi IN-pein-ting',
              example:
                "After removing watermarks, image inpainting reconstructs the missing regions based on surrounding context. = Dopo aver rimosso i watermark, l'inpainting ricostruisce le regioni mancanti basandosi sul contesto circostante.",
              context: 'computer-vision',
              difficulty: 'intermediate',
            },
            {
              english: 'Style Transfer',
              italian: 'Trasferimento di stile',
              pronunciation: '/staɪl ˈtrænsfər/',
              phonetic: 'STAIL TRANS-fer',
              example:
                'Artists use neural style transfer to render photographs in the visual style of paintings by Monet or Van Gogh. = Gli artisti usano il trasferimento di stile neurale per rendere fotografie nello stile visivo di dipinti di Monet o Van Gogh.',
              context: 'computer-vision',
              difficulty: 'intermediate',
              note: 'Esempio: foto resa come dipinto di Van Gogh.',
            },
          ],
        },
      ],
    },
    // ════════════════════════════════════════════════
    // LEVEL 9 - PROMPT ENGINEERING
    // ════════════════════════════════════════════════
    9: {
      name: 'Prompt Engineering / Ingegneria dei Prompt',
      description: "L'arte di scrivere prompt efficaci per LLM",
      lessons: [
        {
          id: 'ai_prompt_1',
          title: 'Prompt Basics / Le Basi dei Prompt',
          description: 'Concetti fondamentali del prompt engineering',
          items: [
            {
              english: 'Prompt Engineering',
              italian: 'Ingegneria dei prompt',
              pronunciation: '/prɒmpt ˌendʒɪˈnɪrɪŋ/',
              phonetic: 'PROMPT en-gi-NI-ring',
              example:
                "Good prompt engineering can double the accuracy of an LLM on complex reasoning tasks without any fine-tuning. = Un buon prompt engineering può raddoppiare l'accuratezza di un LLM su compiti di ragionamento complessi senza fine-tuning.",
              context: 'nlp',
              difficulty: 'intermediate',
            },
            {
              english: 'System Prompt',
              italian: 'Prompt di sistema',
              pronunciation: '/ˈsɪstəm prɒmpt/',
              phonetic: 'SIS-tem PROMPT',
              example:
                'The system prompt instructs the model to respond as a helpful coding assistant that always explains errors. = Il prompt di sistema istruisce il modello a rispondere come un assistente di codifica utile che spiega sempre gli errori.',
              context: 'nlp',
              difficulty: 'intermediate',
              code: 'messages = [{"role": "system", "content": "..."}]',
            },
            {
              english: 'User Prompt',
              italian: 'Prompt utente',
              pronunciation: '/ˈjuːzər prɒmpt/',
              phonetic: 'IU-zer PROMPT',
              example:
                'A well-structured user prompt includes context, task description, and desired output format. = Un prompt utente ben strutturato include contesto, descrizione del compito e formato di output desiderato.',
              context: 'nlp',
              difficulty: 'intermediate',
            },
            {
              english: 'Instruction',
              italian: 'Istruzione',
              pronunciation: '/ɪnˈstrʌkʃən/',
              phonetic: 'in-STRAK-scen',
              example:
                "Adding a clear instruction like 'Respond in JSON' eliminates the need to parse free-form text output. = Aggiungere un'istruzione chiara come 'Rispondi in JSON' elimina la necessità di analizzare output in testo libero.",
              context: 'nlp',
              difficulty: 'intermediate',
            },
            {
              english: 'Context',
              italian: 'Contesto',
              pronunciation: '/ˈkɒntekst/',
              phonetic: 'KON-tekst',
              example:
                "Providing relevant context about the user's industry helps the model give domain-appropriate answers. = Fornire contesto rilevante sull'industria dell'utente aiuta il modello a dare risposte appropriate al dominio.",
              context: 'nlp',
              difficulty: 'intermediate',
            },
            {
              english: 'Role Prompting',
              italian: 'Prompting di ruolo',
              pronunciation: '/roʊl ˈprɒmptɪŋ/',
              phonetic: 'ROUL PROMP-ting',
              example:
                "Telling the model 'You are an expert tax accountant' via role prompting significantly improves financial advice quality. = Dire al modello 'Sei un commercialista esperto' tramite role prompting migliora significativamente la qualità dei consigli finanziari.",
              context: 'nlp',
              difficulty: 'intermediate',
              note: 'Esempio: "You are a senior Python developer".',
            },
            {
              english: 'Delimiter',
              italian: 'Delimitatore',
              pronunciation: '/dɪˈlɪmɪtər/',
              phonetic: 'di-LI-mi-ter',
              example:
                "Using XML tags as a delimiter between sections prevents the model from confusing instructions with user content. = Usare tag XML come delimitatore tra sezioni impedisce al modello di confondere istruzioni con contenuto dell'utente.",
              context: 'nlp',
              difficulty: 'intermediate',
              code: '```text```',
            },
            {
              english: 'Output Format',
              italian: 'Formato di output',
              pronunciation: '/ˈaʊtpʊt ˈfɔːrmæt/',
              phonetic: 'AUT-put FOR-mat',
              example:
                'Specifying the output format as a markdown table ensures consistent, parseable responses across requests. = Specificare il formato di output come tabella markdown assicura risposte consistenti e analizzabili tra le richieste.',
              context: 'nlp',
              difficulty: 'intermediate',
            },
            {
              english: 'Constraint',
              italian: 'Vincolo',
              pronunciation: '/kənˈstreɪnt/',
              phonetic: 'kon-STREINT',
              example:
                "Adding the constraint 'Answer in under 100 words' keeps responses concise for mobile chat interfaces. = Aggiungere il vincolo 'Rispondi in meno di 100 parole' mantiene le risposte concise per interfacce chat mobile.",
              context: 'nlp',
              difficulty: 'intermediate',
            },
            {
              english: 'Prompt Template',
              italian: 'Template di prompt',
              pronunciation: '/prɒmpt ˈtempleɪt/',
              phonetic: 'PROMPT TEM-pleit',
              example:
                'Our prompt template includes placeholders for user name, query, and history that get filled at runtime. = Il nostro template di prompt include segnaposto per nome utente, query e cronologia che vengono compilati a runtime.',
              context: 'nlp',
              difficulty: 'intermediate',
              code: 'PromptTemplate(template="Answer: {question}")',
            },
          ],
        },
        {
          id: 'ai_prompt_2',
          title: 'Prompting Techniques / Tecniche di Prompting',
          description: 'Strategie avanzate di prompting',
          items: [
            {
              english: 'Zero-Shot',
              italian: 'Senza esempi (Zero-Shot)',
              pronunciation: '/ˈzɪroʊ ʃɒt/',
              phonetic: 'ZIR-O-SCIOT',
              example:
                'Without any examples, a zero-shot prompt asks the model to classify sentiment based solely on its training. = Senza alcun esempio, un prompt zero-shot chiede al modello di classificare il sentiment basandosi solo sul suo addestramento.',
              context: 'nlp',
              difficulty: 'intermediate',
              note: 'Termine sempre lasciato in inglese.',
            },
            {
              english: 'Few-Shot',
              italian: 'Con pochi esempi (Few-Shot)',
              pronunciation: '/fjuː ʃɒt/',
              phonetic: 'FIU-SCIOT',
              example:
                "Providing three labeled examples in a few-shot prompt raised classification accuracy from 70% to 92%. = Fornire tre esempi etichettati in un prompt few-shot ha alzato l'accuratezza di classificazione dal 70% al 92%.",
              context: 'nlp',
              difficulty: 'intermediate',
              note: 'Tipicamente da 1 a 5 esempi.',
            },
            {
              english: 'One-Shot',
              italian: 'Con un solo esempio (One-Shot)',
              pronunciation: '/wʌn ʃɒt/',
              phonetic: 'UAN-SCIOT',
              example:
                "For simple formatting tasks, a single one-shot example is often enough to guide the model's output. = Per compiti di formattazione semplici, un singolo esempio one-shot è spesso sufficiente per guidare l'output del modello.",
              context: 'nlp',
              difficulty: 'intermediate',
            },
            {
              english: 'Chain-of-Thought',
              italian: 'Catena di ragionamento',
              pronunciation: '/tʃeɪn əv θɔːt/',
              phonetic: 'CIEIN-OF-TOT',
              example:
                "Adding 'Let us think step by step' triggers chain-of-thought reasoning that improves math problem accuracy. = Aggiungere 'Ragioniamo passo per passo' attiva il ragionamento chain-of-thought che migliora l'accuratezza nei problemi matematici.",
              context: 'nlp',
              difficulty: 'intermediate',
              note: 'Abbreviata CoT. Trigger: "Let\'s think step by step".',
            },
            {
              english: 'Self-Consistency',
              italian: 'Auto-coerenza',
              pronunciation: '/self kənˈsɪstənsi/',
              phonetic: 'SELF kon-SIS-ten-si',
              example:
                'With self-consistency, we sample five reasoning paths and take the majority vote as the final answer. = Con la self-consistency, campioniamo cinque percorsi di ragionamento e prendiamo il voto di maggioranza come risposta finale.',
              context: 'nlp',
              difficulty: 'intermediate',
            },
            {
              english: 'Tree of Thoughts',
              italian: 'Albero di pensieri',
              pronunciation: '/triː əv θɔːts/',
              phonetic: 'TRI-of-TOTS',
              example:
                "For complex planning tasks, tree of thoughts explores multiple reasoning branches before committing to a solution. = Per compiti di pianificazione complessi, l'albero dei pensieri esplora più rami di ragionamento prima di impegnarsi in una soluzione.",
              context: 'nlp',
              difficulty: 'intermediate',
              note: 'Abbreviato ToT.',
            },
            {
              english: 'ReAct',
              italian: 'Pattern reasoning + acting (ReAct)',
              pronunciation: '/ˈriːækt/',
              phonetic: 'RI-akt',
              example:
                'The ReAct framework alternates between reasoning steps and tool actions to ground LLM responses in real data. = Il framework ReAct alterna passi di ragionamento e azioni con strumenti per ancorare le risposte degli LLM a dati reali.',
              context: 'nlp',
              difficulty: 'intermediate',
              note: 'Reasoning + Acting.',
            },
            {
              english: 'Self-Refine',
              italian: 'Auto-rifinitura',
              pronunciation: '/self rɪˈfaɪn/',
              phonetic: 'SELF ri-FAIN',
              example:
                'In the self-refine loop, the model critiques its own output and then revises it for improved quality. = Nel ciclo di self-refine, il modello critica il proprio output e poi lo rivede per migliorarne la qualità.',
              context: 'nlp',
              difficulty: 'intermediate',
            },
            {
              english: 'Prompt Chaining',
              italian: 'Concatenazione di prompt',
              pronunciation: '/prɒmpt ˈtʃeɪnɪŋ/',
              phonetic: 'PROMPT CIEI-ning',
              example:
                "Complex document analysis uses prompt chaining: first extract entities, then summarize, then generate a report. = L'analisi di documenti complessi usa il prompt chaining: prima estrarre entità, poi riassumere, poi generare un report.",
              context: 'nlp',
              difficulty: 'intermediate',
            },
            {
              english: 'Meta-Prompt',
              italian: 'Prompt che istruisce su come prompare (Meta-Prompt)',
              pronunciation: '/ˈmetə prɒmpt/',
              phonetic: 'ME-ta PROMPT',
              example:
                'A meta-prompt generates task-specific prompts automatically, reducing the need for manual prompt engineering. = Un meta-prompt genera automaticamente prompt specifici per il compito, riducendo la necessità di prompt engineering manuale.',
              context: 'nlp',
              difficulty: 'intermediate',
            },
          ],
        },
        {
          id: 'ai_prompt_3',
          title: 'RAG / Recupero Aumentato',
          description: 'Recupero di informazioni esterne',
          items: [
            {
              english: 'RAG',
              italian: 'Retrieval-Augmented Generation (RAG)',
              pronunciation: '/ræɡ/',
              phonetic: 'RAG',
              example:
                'Our customer support bot uses RAG to retrieve product documentation before answering technical questions. = Il nostro bot di supporto clienti usa RAG per recuperare documentazione di prodotto prima di rispondere a domande tecniche.',
              context: 'nlp',
              difficulty: 'intermediate',
              note: 'Retrieval-Augmented Generation.',
            },
            {
              english: 'Vector Database',
              italian: 'Database vettoriale',
              pronunciation: '/ˈvektər ˈdeɪtəbeɪs/',
              phonetic: 'VEK-ter DEI-ta-beis',
              example:
                'Semantic search over 10 million documents requires a specialized vector database that indexes high-dimensional embeddings. = La ricerca semantica su 10 milioni di documenti richiede un database vettoriale specializzato che indicizza embedding ad alta dimensionalità.',
              context: 'nlp',
              difficulty: 'intermediate',
              tool: 'Pinecone, Weaviate, Qdrant, Chroma',
            },
            {
              english: 'Semantic Search',
              italian: 'Ricerca semantica',
              pronunciation: '/sɪˈmæntɪk sɜːrtʃ/',
              phonetic: 'si-MAN-tik SERCI',
              example:
                "Unlike keyword matching, semantic search finds documents about 'machine learning' even when the query says 'AI training'. = A differenza della corrispondenza per parole chiave, la ricerca semantica trova documenti su 'machine learning' anche quando la query dice 'AI training'.",
              context: 'nlp',
              difficulty: 'intermediate',
            },
            {
              english: 'Chunking',
              italian: 'Suddivisione in chunk',
              pronunciation: '/ˈtʃʌŋkɪŋ/',
              phonetic: 'CIAN-king',
              example:
                'We split each PDF into 512-token chunks with 50-token overlap so that chunking preserves context at boundaries. = Dividiamo ogni PDF in chunk di 512 token con 50 token di sovrapposizione così che il chunking preservi il contesto ai confini.',
              context: 'nlp',
              difficulty: 'intermediate',
              note: 'Cruciale per RAG: chunk troppo grandi o piccoli degradano i risultati.',
            },
            {
              english: 'Retrieval',
              italian: 'Recupero',
              pronunciation: '/rɪˈtriːvəl/',
              phonetic: 'ri-TRI-val',
              example:
                "The retrieval step fetches the five most relevant chunks from the knowledge base before the LLM generates a response. = Il passo di retrieval recupera i cinque chunk più rilevanti dalla knowledge base prima che l'LLM generi una risposta.",
              context: 'nlp',
              difficulty: 'intermediate',
            },
            {
              english: 'Hybrid Search',
              italian: 'Ricerca ibrida',
              pronunciation: '/ˈhaɪbrɪd sɜːrtʃ/',
              phonetic: 'HAI-brid SERCI',
              example:
                'Combining BM25 keyword matching with vector similarity, hybrid search catches both exact terms and semantic matches. = Combinando corrispondenza BM25 per parole chiave con similarità vettoriale, la ricerca ibrida cattura sia termini esatti che corrispondenze semantiche.',
              context: 'nlp',
              difficulty: 'intermediate',
            },
            {
              english: 'Reranking',
              italian: 'Riordinamento',
              pronunciation: '/riːˈræŋkɪŋ/',
              phonetic: 'ri-RAN-king',
              example:
                'After initial retrieval returns 50 candidates, a cross-encoder reranking model selects the 5 most relevant passages. = Dopo che il retrieval iniziale restituisce 50 candidati, un modello di reranking cross-encoder seleziona i 5 passaggi più rilevanti.',
              context: 'nlp',
              difficulty: 'intermediate',
              tool: 'cohere-rerank',
            },
            {
              english: 'Embedding Model',
              italian: 'Modello di embedding',
              pronunciation: '/ɪmˈbedɪŋ ˈmɒdəl/',
              phonetic: 'em-BED-ding MO-del',
              example:
                'We replaced the general-purpose embedding model with one fine-tuned on legal text, improving retrieval by 15%. = Abbiamo sostituito il modello di embedding generico con uno fine-tuned su testo legale, migliorando il retrieval del 15%.',
              context: 'nlp',
              difficulty: 'intermediate',
              tool: 'text-embedding-3-small',
            },
            {
              english: 'Knowledge Base',
              italian: 'Base di conoscenza',
              pronunciation: '/ˈnɒlɪdʒ beɪs/',
              phonetic: 'NO-ligi BEIS',
              example:
                'The RAG system queries a knowledge base of 50,000 product manuals to answer customer questions accurately. = Il sistema RAG interroga una knowledge base di 50.000 manuali di prodotto per rispondere accuratamente alle domande dei clienti.',
              context: 'nlp',
              difficulty: 'intermediate',
            },
            {
              english: 'Citation',
              italian: 'Citazione',
              pronunciation: '/saɪˈteɪʃən/',
              phonetic: 'sai-TEI-scen',
              example:
                "A paper's citation count helps gauge its influence, though truly novel work may take years to accumulate citations. = Il conteggio delle citazioni di un articolo aiuta a valutare la sua influenza, anche se lavori davvero nuovi possono impiegare anni ad accumulare citazioni.",
              context: 'nlp',
              difficulty: 'intermediate',
              note: 'Aumenta affidabilità e tracciabilità delle risposte.',
            },
          ],
        },
        {
          id: 'ai_prompt_4',
          title: 'Generation Control / Controllo della Generazione',
          description: "Parametri per controllare l'output",
          items: [
            {
              english: 'Temperature',
              italian: 'Temperatura',
              pronunciation: '/ˈtemprətʃər/',
              phonetic: 'TEM-pra-cer',
              example:
                'Setting temperature to 0.0 makes the model deterministic, while 1.0 produces more creative but riskier outputs. = Impostare la temperature a 0.0 rende il modello deterministico, mentre 1.0 produce output più creativi ma più rischiosi.',
              context: 'nlp',
              difficulty: 'intermediate',
              code: 'model.generate(temperature=0.7)',
              note: 'Tipicamente da 0 a 2. Bassa: deterministico. Alta: creativo.',
            },
            {
              english: 'Max Tokens',
              italian: 'Token massimi',
              pronunciation: '/mæks ˈtoʊkənz/',
              phonetic: 'MAKS TOU-kens',
              example:
                'We set max tokens to 500 for chat replies and 4,000 for document summarization endpoints. = Impostiamo i max token a 500 per risposte in chat e 4.000 per gli endpoint di riassunto documenti.',
              context: 'nlp',
              difficulty: 'intermediate',
              code: 'max_tokens=500',
            },
            {
              english: 'Stop Sequence',
              italian: 'Sequenza di stop',
              pronunciation: '/stɒp ˈsiːkwəns/',
              phonetic: 'STOP SI-kuens',
              example:
                "Adding '\n\n' as a stop sequence prevents the model from rambling beyond the first complete answer. = Aggiungere '\n\n' come sequenza di stop impedisce al modello di divagare oltre la prima risposta completa.",
              context: 'nlp',
              difficulty: 'intermediate',
              code: 'stop=["\\n\\n", "User:"]',
            },
            {
              english: 'Frequency Penalty',
              italian: 'Penalità di frequenza',
              pronunciation: '/ˈfriːkwənsi ˈpenəlti/',
              phonetic: 'FRI-kuen-si PE-nal-ti',
              example:
                'A frequency penalty of 0.5 discourages the model from repeating the same phrases within a single response. = Una penalità di frequenza di 0.5 scoraggia il modello dal ripetere le stesse frasi in una singola risposta.',
              context: 'nlp',
              difficulty: 'intermediate',
              code: 'frequency_penalty=0.5',
            },
            {
              english: 'Presence Penalty',
              italian: 'Penalità di presenza',
              pronunciation: '/ˈprezəns ˈpenəlti/',
              phonetic: 'PRE-zens PE-nal-ti',
              example:
                'Raising the presence penalty encourages the model to introduce new topics rather than dwelling on familiar ones. = Alzare la penalità di presenza incoraggia il modello a introdurre nuovi argomenti piuttosto che soffermarsi su quelli familiari.',
              context: 'nlp',
              difficulty: 'intermediate',
            },
            {
              english: 'Streaming',
              italian: 'Risposta in flusso (Streaming)',
              pronunciation: '/ˈstriːmɪŋ/',
              phonetic: 'STRI-ming',
              example:
                "Enabling streaming lets the UI display tokens as they are generated, reducing perceived latency for the user. = Abilitare lo streaming permette all'UI di mostrare i token mentre vengono generati, riducendo la latenza percepita dall'utente.",
              context: 'nlp',
              difficulty: 'intermediate',
              code: 'response = client.completions.create(stream=True)',
            },
            {
              english: 'Hallucination',
              italian: 'Allucinazione',
              pronunciation: '/həˌluːsɪˈneɪʃən/',
              phonetic: 'a-lu-si-NEI-scen',
              example:
                "The model produced a hallucination by citing a paper that does not exist, highlighting the need for fact-checking. = Il modello ha prodotto un'allucinazione citando un articolo che non esiste, evidenziando la necessità di verifica dei fatti.",
              context: 'nlp',
              difficulty: 'intermediate',
              note: 'Problema comune degli LLM. RAG aiuta a mitigarlo.',
            },
            {
              english: 'Function Calling',
              italian: 'Chiamata di funzione',
              pronunciation: '/ˈfʌŋkʃən ˈkɔːlɪŋ/',
              phonetic: 'FANK-scen KO-ling',
              example:
                "With function calling, the LLM can request real-time weather data or database queries instead of guessing answers. = Con il function calling, l'LLM può richiedere dati meteo in tempo reale o query al database invece di indovinare le risposte.",
              context: 'nlp',
              difficulty: 'intermediate',
              code: 'tools=[{"type": "function", "function": {...}}]',
            },
            {
              english: 'JSON Mode',
              italian: 'Modalità JSON',
              pronunciation: '/dʒeɪsɒn moʊd/',
              phonetic: 'GEI-son MOUD',
              example:
                'Enabling JSON mode guarantees that every model response parses as valid JSON for API downstream consumers. = Abilitare la modalità JSON garantisce che ogni risposta del modello sia analizzabile come JSON valido per i consumatori API a valle.',
              context: 'nlp',
              difficulty: 'intermediate',
              code: 'response_format={"type": "json_object"}',
            },
            {
              english: 'Guardrails',
              italian: 'Guardrail',
              pronunciation: '/ˈɡɑːrdreɪlz/',
              phonetic: 'GARD-reilz',
              example:
                'Our production guardrails block responses containing personal data, harmful content, or off-topic material. = I nostri guardrails di produzione bloccano risposte contenenti dati personali, contenuti dannosi o materiale fuori tema.',
              context: 'nlp',
              difficulty: 'intermediate',
              tool: 'guardrails-ai, NeMo Guardrails',
            },
          ],
        },
      ],
    },
    // ════════════════════════════════════════════════
    // LEVEL 10 - ADDESTRAMENTO MODELLI / MODEL TRAINING
    // ════════════════════════════════════════════════
    10: {
      name: 'Addestramento Modelli / Model Training',
      description: "Aspetti pratici dell'addestramento",
      lessons: [
        {
          id: 'ai_training_1',
          title: 'Hyperparameters / Iperparametri',
          description: "Parametri da impostare prima dell'addestramento",
          items: [
            {
              english: 'Hyperparameter',
              italian: 'Iperparametro',
              pronunciation: '/ˈhaɪpərpəˈræmɪtər/',
              phonetic: 'HAI-per-pa-RA-me-ter',
              example:
                'Choosing the right hyperparameter values for learning rate and batch size can make or break model performance. = Scegliere i giusti valori di iperparametro per learning rate e batch size può determinare il successo o il fallimento del modello.',
              context: 'model-training',
              difficulty: 'intermediate',
              note: 'Diverso dai parametri appresi (pesi).',
            },
            {
              english: 'Learning Rate',
              italian: 'Tasso di apprendimento',
              pronunciation: '/ˈlɜːrnɪŋ reɪt/',
              phonetic: 'LER-ning REIT',
              example:
                "A learning rate of 3e-4 is often called the 'universal default' for Adam-based transformer training. = Un learning rate di 3e-4 è spesso chiamato il 'default universale' per l'addestramento di transformer con Adam.",
              context: 'model-training',
              difficulty: 'intermediate',
              code: 'optimizer = Adam(lr=0.001)',
              note: 'Spesso lasciato in inglese: "il learning rate".',
            },
            {
              english: 'Batch Size',
              italian: 'Dimensione del batch',
              pronunciation: '/bætʃ saɪz/',
              phonetic: 'BACI SAIZ',
              example:
                "Doubling the batch size from 32 to 64 improved GPU utilization without sacrificing convergence speed. = Raddoppiare la batch size da 32 a 64 ha migliorato l'utilizzo GPU senza sacrificare la velocità di convergenza.",
              context: 'model-training',
              difficulty: 'intermediate',
              code: 'model.fit(batch_size=64)',
            },
            {
              english: 'Epoch',
              italian: 'Epoca',
              pronunciation: '/ˈiːpɒk/',
              phonetic: 'I-pok',
              example:
                'After 20 epochs of training, validation loss plateaued, indicating the model had learned all it could from the data. = Dopo 20 epoche di addestramento, la loss di validazione si è appiattita, indicando che il modello aveva imparato tutto il possibile dai dati.',
              context: 'model-training',
              difficulty: 'intermediate',
              code: 'model.fit(epochs=10)',
            },
            {
              english: 'Warmup Steps',
              italian: 'Passi di riscaldamento (warmup)',
              pronunciation: '/ˌɪtəˈreɪʃən/',
              phonetic: 'i-te-REI-scen',
              example: `Setting 500 warmup steps lets the learning rate ramp up gradually and avoids early gradient explosions in transformer training. = Impostare 500 warmup step lascia che il learning rate salga gradualmente ed evita esplosioni precoci del gradiente nell'addestramento dei transformer.`,
              context: 'model-training',
              difficulty: 'intermediate',
              note: 'Comune nei transformer e nei modelli con learning rate scheduler.',
            },
            {
              english: 'Hyperparameter Tuning',
              italian: 'Tuning degli iperparametri',
              pronunciation: '/ˈhaɪpərpəˈræmɪtər ˈtjuːnɪŋ/',
              phonetic: 'HAI-per-pa-RA-me-ter TIU-ning',
              example:
                'Systematic hyperparameter tuning improved our F1 score from 0.82 to 0.91 on the validation set. = Il tuning sistematico degli iperparametri ha migliorato il nostro F1 score da 0.82 a 0.91 sul set di validazione.',
              context: 'model-training',
              difficulty: 'intermediate',
              tool: 'Optuna, Ray Tune',
            },
            {
              english: 'Grid Search',
              italian: 'Ricerca a griglia',
              pronunciation: '/ɡrɪd sɜːrtʃ/',
              phonetic: 'GRID-SERCI',
              example:
                'We ran grid search over 5 learning rates and 4 batch sizes, evaluating all 20 combinations. = Abbiamo eseguito la grid search su 5 learning rate e 4 batch size, valutando tutte le 20 combinazioni.',
              context: 'model-training',
              difficulty: 'intermediate',
              code: 'GridSearchCV(model, param_grid)',
            },
            {
              english: 'Random Search',
              italian: 'Ricerca casuale',
              pronunciation: '/ˈrændəm sɜːrtʃ/',
              phonetic: 'RAN-dom SERCI',
              example:
                'Research shows that random search finds better hyperparameters than grid search in the same compute budget. = La ricerca mostra che la random search trova iperparametri migliori della grid search nello stesso budget di calcolo.',
              context: 'model-training',
              difficulty: 'intermediate',
              code: 'RandomizedSearchCV(model, param_dist)',
            },
            {
              english: 'Bayesian Optimization',
              italian: 'Ottimizzazione bayesiana',
              pronunciation: '/beɪˈziːən ˌɒptɪmaɪˈzeɪʃən/',
              phonetic: 'bei-ZI-an op-ti-mai-ZEI-scen',
              example:
                "After 50 trials, Bayesian optimization converged on optimal hyperparameters twice as fast as random search. = Dopo 50 prove, l'ottimizzazione bayesiana ha converguto sugli iperparametri ottimali due volte più velocemente della random search.",
              context: 'model-training',
              difficulty: 'intermediate',
              tool: 'Optuna, Hyperopt',
            },
            {
              english: 'Schedule',
              italian: 'Pianificazione',
              pronunciation: '/ˈskedʒuːl/',
              phonetic: 'SKE-giul',
              example:
                "Our cosine learning rate schedule starts high and gradually decays to near zero over the training run. = Il nostro schedule di learning rate coseno inizia alto e decade gradualmente fino a quasi zero durante l'addestramento.",
              context: 'model-training',
              difficulty: 'intermediate',
              code: 'ReduceLROnPlateau(patience=3)',
            },
          ],
        },
        {
          id: 'ai_training_2',
          title: 'Loss Functions / Funzioni di Perdita',
          description: "Misurare l'errore del modello",
          items: [
            {
              english: 'Loss Function',
              italian: 'Funzione di perdita',
              pronunciation: '/lɒs ˈfʌŋkʃən/',
              phonetic: 'LOS FANK-scen',
              example:
                'The choice of loss function determines what the model optimizes: accuracy, ranking, or calibration. = La scelta della funzione di loss determina cosa il modello ottimizza: accuratezza, ranking o calibrazione.',
              context: 'model-training',
              difficulty: 'intermediate',
              note: 'Detta anche cost function o objective function.',
            },
            {
              english: 'Cross-Entropy Loss',
              italian: 'Loss di entropia incrociata',
              pronunciation: '/krɒs ˈentrəpi lɒs/',
              phonetic: 'KROS EN-tro-pi LOS',
              example:
                'For multi-class classification, cross-entropy loss measures how far predicted probabilities are from one-hot labels. = Per la classificazione multi-classe, la cross-entropy loss misura quanto le probabilità predette distano dalle etichette one-hot.',
              context: 'model-training',
              difficulty: 'intermediate',
              code: 'loss = CrossEntropyLoss()',
            },
            {
              english: 'Mean Squared Error',
              italian: 'Errore quadratico medio',
              pronunciation: '/miːn skweərd ˈerər/',
              phonetic: 'MIIN SKUERD ER-rer',
              example:
                "Predicting house prices with mean squared error penalizes large mistakes more heavily than small ones. = Predire prezzi delle case con l'errore quadratico medio penalizza gli errori grandi più pesantemente di quelli piccoli.",
              context: 'model-training',
              difficulty: 'intermediate',
              code: 'loss = nn.MSELoss()',
              note: 'Abbreviata MSE.',
            },
            {
              english: 'Mean Absolute Error',
              italian: 'Errore assoluto medio',
              pronunciation: '/miːn ˈæbsəluːt ˈerər/',
              phonetic: 'MIIN AB-so-lut ER-rer',
              example:
                "When outliers are common, mean absolute error is more robust than squared error because it treats all deviations linearly. = Quando gli outlier sono comuni, l'errore assoluto medio è più robusto dell'errore quadratico perché tratta tutte le deviazioni linearmente.",
              context: 'model-training',
              difficulty: 'intermediate',
              code: 'loss = nn.L1Loss()',
            },
            {
              english: 'Hinge Loss',
              italian: 'Perdita a cerniera (Hinge Loss)',
              pronunciation: '/hɪndʒ lɒs/',
              phonetic: 'HINGI LOS',
              example:
                'Support vector machines optimize hinge loss, which only penalizes predictions that fall within the margin boundary. = Le macchine a vettori di supporto ottimizzano la hinge loss, che penalizza solo le predizioni che cadono entro il confine del margine.',
              context: 'model-training',
              difficulty: 'intermediate',
            },
            {
              english: 'Focal Loss',
              italian: 'Perdita focale (Focal Loss)',
              pronunciation: '/ˈfoʊkəl lɒs/',
              phonetic: 'FO-kal LOS',
              example:
                'In object detection with many background patches, focal loss down-weights easy negatives to focus on hard examples. = Nel rilevamento oggetti con molte aree di sfondo, la focal loss riduce il peso dei negativi facili per concentrarsi sugli esempi difficili.',
              context: 'model-training',
              difficulty: 'intermediate',
              note: 'Utile per dataset sbilanciati.',
            },
            {
              english: 'Triplet Loss',
              italian: 'Perdita su triplette (Triplet Loss)',
              pronunciation: '/ˈtrɪplət lɒs/',
              phonetic: 'TRI-plet LOS',
              example:
                'Face verification models train with triplet loss to pull same-person embeddings together and push different-person ones apart. = I modelli di verifica facciale si addestrano con la triplet loss per avvicinare embedding della stessa persona e allontanare quelli di persone diverse.',
              context: 'model-training',
              difficulty: 'intermediate',
              note: 'Usata per face recognition e metric learning.',
            },
            {
              english: 'KL Divergence',
              italian: 'Divergenza KL',
              pronunciation: '/keɪ el dɪˈvɜːrdʒəns/',
              phonetic: 'KEI-EL di-VER-gens',
              example:
                'In VAEs, KL divergence regularizes the latent space by pushing the learned distribution toward a standard Gaussian. = Nei VAE, la divergenza KL regolarizza lo spazio latente spingendo la distribuzione appresa verso una gaussiana standard.',
              context: 'model-training',
              difficulty: 'intermediate',
              note: 'Kullback-Leibler divergence.',
            },
            {
              english: 'Loss Curve',
              italian: 'Curva di loss',
              pronunciation: '/lɒs kɜːrv/',
              phonetic: 'LOS KERV',
              example:
                "A diverging loss curve after epoch 10 told us the learning rate was too high for this architecture. = Una curva di loss divergente dopo l'epoca 10 ci ha detto che il learning rate era troppo alto per questa architettura.",
              context: 'model-training',
              difficulty: 'intermediate',
              code: 'plt.plot(history.history["loss"])',
            },
            {
              english: 'Custom Loss',
              italian: 'Loss personalizzata',
              pronunciation: '/ˈkʌstəm lɒs/',
              phonetic: 'KAS-tom LOS',
              example:
                'We wrote a custom loss combining cross-entropy with a domain-specific penalty for clinically dangerous misclassifications. = Abbiamo scritto una loss personalizzata che combina cross-entropy con una penalità specifica di dominio per misclassificazioni clinicamente pericolose.',
              context: 'model-training',
              difficulty: 'intermediate',
            },
          ],
        },
        {
          id: 'ai_training_3',
          title: 'Optimization / Ottimizzazione',
          description: 'Algoritmi che aggiornano i pesi',
          items: [
            {
              english: 'Gradient Descent',
              italian: 'Discesa del gradiente',
              pronunciation: '/ˈɡreɪdiənt dɪˈsent/',
              phonetic: 'GREI-di-ent di-SENT',
              example:
                'At its core, gradient descent simply moves parameters in the direction that reduces the loss most steeply. = Nella sua essenza, la discesa del gradiente muove semplicemente i parametri nella direzione che riduce la loss più ripidamente.',
              context: 'model-training',
              difficulty: 'intermediate',
              note: "Algoritmo base dell'ottimizzazione ML.",
            },
            {
              english: 'Optimizer',
              italian: 'Ottimizzatore',
              pronunciation: '/ˈɒptɪmaɪzər/',
              phonetic: 'OP-ti-mai-zer',
              example:
                "Switching from SGD to the Adam optimizer cut our training time in half while reaching the same final accuracy. = Passare da SGD all'ottimizzatore Adam ha dimezzato il tempo di addestramento raggiungendo la stessa accuratezza finale.",
              context: 'model-training',
              difficulty: 'intermediate',
              code: 'model.compile(optimizer="adam")',
            },
            {
              english: 'AdamW',
              italian: 'Ottimizzatore Adam con weight decay (AdamW)',
              pronunciation: '/ˈædəm dʌbəl juː/',
              phonetic: 'A-dam-DAB-bol-IU',
              example:
                "For Transformer fine-tuning, AdamW decouples weight decay from the gradient update for better regularization. = Per il fine-tuning di Transformer, AdamW separa il decadimento dei pesi dall'aggiornamento del gradiente per una migliore regolarizzazione.",
              context: 'model-training',
              difficulty: 'intermediate',
              code: 'AdamW(model.parameters(), lr=1e-4)',
              note: 'Standard moderno per i transformer.',
            },
            {
              english: 'RMSProp',
              italian: 'Ottimizzatore con media mobile (RMSProp)',
              pronunciation: '/ɑːr em es prɒp/',
              phonetic: 'AR-EM-ES-PROP',
              example:
                "Before Adam became dominant, RMSProp was the go-to optimizer for training recurrent neural networks. = Prima che Adam diventasse dominante, RMSProp era l'ottimizzatore preferito per addestrare reti neurali ricorrenti.",
              context: 'model-training',
              difficulty: 'intermediate',
              code: 'optimizer = RMSprop(lr=0.001)',
            },
            {
              english: 'Nesterov Momentum',
              italian: 'Momento di Nesterov',
              pronunciation: '/ˈnestərɒv moʊˈmentəm/',
              phonetic: 'NES-te-rov mou-MEN-tum',
              example:
                'By looking ahead before computing the gradient, Nesterov momentum converges faster on convex surfaces. = Guardando avanti prima di calcolare il gradiente, il momento di Nesterov converge più velocemente su superfici convesse.',
              context: 'model-training',
              difficulty: 'intermediate',
              code: 'SGD(momentum=0.9, nesterov=True)',
            },
            {
              english: 'Learning Rate Warmup',
              italian: 'Warmup del learning rate',
              pronunciation: '/ˈlɜːrnɪŋ reɪt ˈwɔːrmʌp/',
              phonetic: 'LER-ning REIT UORM-ap',
              example:
                'We applied linear learning rate warmup for the first 1,000 steps to prevent early gradient instability. = Abbiamo applicato un warmup lineare del learning rate per i primi 1.000 passi per prevenire instabilità del gradiente iniziale.',
              context: 'model-training',
              difficulty: 'intermediate',
              note: 'Standard per addestrare transformer da zero.',
            },
            {
              english: 'Cosine Annealing',
              italian: 'Annealing coseno',
              pronunciation: '/ˈkoʊsaɪn əˈniːlɪŋ/',
              phonetic: 'KO-sain a-NI-ling',
              example:
                'With cosine annealing, the learning rate follows a smooth cosine curve from its peak value down to near zero. = Con il cosine annealing, il learning rate segue una curva coseno liscia dal suo valore massimo fino a quasi zero.',
              context: 'model-training',
              difficulty: 'intermediate',
              code: 'CosineAnnealingLR(optimizer, T_max=10)',
            },
            {
              english: 'Saddle Point',
              italian: 'Punto di sella',
              pronunciation: '/ˈsædəl pɔɪnt/',
              phonetic: 'SAD-del POINT',
              example:
                'In high-dimensional spaces, optimizers spend most time near a saddle point rather than a local minimum. = Negli spazi ad alta dimensionalità, gli ottimizzatori passano la maggior parte del tempo vicino a un punto sella piuttosto che a un minimo locale.',
              context: 'model-training',
              difficulty: 'intermediate',
            },
            {
              english: 'Local Minimum',
              italian: 'Minimo locale',
              pronunciation: '/ˈloʊkəl ˈmɪnɪməm/',
              phonetic: 'LO-kal MI-ni-mum',
              example:
                "Momentum helps the optimizer escape a shallow local minimum by accumulating velocity from past gradients. = Il momento aiuta l'ottimizzatore a sfuggire da un minimo locale poco profondo accumulando velocità dai gradienti passati.",
              context: 'model-training',
              difficulty: 'intermediate',
              note: 'Meno problematici nelle reti neurali profonde.',
            },
            {
              english: 'Convergence',
              italian: 'Convergenza',
              pronunciation: '/kənˈvɜːrdʒəns/',
              phonetic: 'kon-VER-gens',
              example:
                'We declared convergence when the validation loss improved by less than 0.001 for five consecutive epochs. = Abbiamo dichiarato la convergenza quando la loss di validazione è migliorata di meno di 0.001 per cinque epoche consecutive.',
              context: 'model-training',
              difficulty: 'intermediate',
            },
          ],
        },
        {
          id: 'ai_training_4',
          title: 'Hardware & Scale / Hardware e Scala',
          description: "Risorse computazionali per l'addestramento",
          items: [
            {
              english: 'GPU',
              italian: 'Unità di elaborazione grafica (GPU)',
              pronunciation: '/dʒiː piː juː/',
              phonetic: 'GI-PI-IU',
              example:
                'Training the 7B parameter model requires at least 4 A100 GPUs with 80GB of memory each. = Addestrare il modello da 7 miliardi di parametri richiede almeno 4 GPU A100 con 80GB di memoria ciascuna.',
              context: 'model-training',
              difficulty: 'intermediate',
              note: 'Graphics Processing Unit. Cuore del deep learning moderno.',
            },
            {
              english: 'TPU',
              italian: 'Unità di elaborazione tensoriale Google (TPU)',
              pronunciation: '/tiː piː juː/',
              phonetic: 'TI-PI-IU',
              example:
                "Google's TPU pods can train large language models 3x faster than equivalent GPU clusters for certain architectures. = I pod TPU di Google possono addestrare grandi modelli linguistici 3 volte più velocemente di cluster GPU equivalenti per certe architetture.",
              context: 'model-training',
              difficulty: 'intermediate',
              note: 'Tensor Processing Unit.',
            },
            {
              english: 'CUDA',
              italian: 'Piattaforma calcolo NVIDIA (CUDA)',
              pronunciation: '/ˈkuːdə/',
              phonetic: 'KU-da',
              example:
                'Most deep learning frameworks rely on CUDA kernels to parallelize tensor operations across thousands of GPU cores. = La maggior parte dei framework di deep learning si basa su kernel CUDA per parallelizzare operazioni tensoriali su migliaia di core GPU.',
              context: 'model-training',
              difficulty: 'intermediate',
              tool: 'NVIDIA CUDA Toolkit',
            },
            {
              english: 'Mixed Precision',
              italian: 'Precisione mista',
              pronunciation: '/mɪkst prɪˈsɪʒən/',
              phonetic: 'MIKST pri-SI-gen',
              example:
                "Switching to mixed precision training with FP16 halved our memory usage and sped up training by 40%. = Passare all'addestramento a precisione mista con FP16 ha dimezzato l'uso di memoria e accelerato l'addestramento del 40%.",
              context: 'model-training',
              difficulty: 'intermediate',
              code: 'with torch.cuda.amp.autocast():',
            },
            {
              english: 'Distributed Training',
              italian: 'Addestramento distribuito',
              pronunciation: '/dɪˈstrɪbjʊtɪd ˈtreɪnɪŋ/',
              phonetic: 'di-STRI-biu-ted TREI-ning',
              example:
                'Scaling to 64 GPUs with distributed training reduced our 3-week training run to just 8 hours. = Scalare a 64 GPU con addestramento distribuito ha ridotto il nostro addestramento di 3 settimane a sole 8 ore.',
              context: 'model-training',
              difficulty: 'intermediate',
              tool: 'DeepSpeed, FairScale, FSDP',
            },
            {
              english: 'Data Parallelism',
              italian: 'Parallelismo dei dati',
              pronunciation: '/ˈdeɪtə ˈpærəlelɪzəm/',
              phonetic: 'DEI-ta pa-ra-LEL-li-zem',
              example:
                "With data parallelism, each GPU processes a different mini-batch and gradients are averaged before the weight update. = Con il parallelismo dati, ogni GPU elabora un mini-batch diverso e i gradienti vengono mediati prima dell'aggiornamento dei pesi.",
              context: 'model-training',
              difficulty: 'intermediate',
            },
            {
              english: 'Model Parallelism',
              italian: 'Parallelismo del modello',
              pronunciation: '/ˈmɒdəl ˈpærəlelɪzəm/',
              phonetic: 'MO-del pa-ra-LEL-li-zem',
              example:
                "When a single GPU cannot hold the entire model, model parallelism splits layers across multiple devices. = Quando una singola GPU non può contenere l'intero modello, il parallelismo del modello divide gli strati su più dispositivi.",
              context: 'model-training',
              difficulty: 'intermediate',
              note: 'Necessario per modelli troppo grandi per una sola GPU.',
            },
            {
              english: 'Gradient Accumulation',
              italian: 'Accumulazione del gradiente',
              pronunciation: '/ˈɡreɪdiənt əˌkjuːmjəˈleɪʃən/',
              phonetic: 'GREI-di-ent a-kiu-mu-LEI-scen',
              example:
                "On a single GPU, gradient accumulation simulates larger batch sizes by summing gradients over multiple forward passes. = Su una singola GPU, l'accumulo dei gradienti simula batch size più grandi sommando gradienti su più passaggi in avanti.",
              context: 'model-training',
              difficulty: 'intermediate',
              code: 'gradient_accumulation_steps=4',
            },
            {
              english: 'Checkpointing',
              italian: 'Salvataggio periodico (Checkpointing)',
              pronunciation: '/ˈtʃekpɔɪntɪŋ/',
              phonetic: 'CIEK-poin-ting',
              example:
                "We save a checkpointing snapshot every 1,000 steps so training can resume after any hardware failure. = Salviamo uno snapshot di checkpointing ogni 1.000 passi così l'addestramento può riprendere dopo qualsiasi guasto hardware.",
              context: 'model-training',
              difficulty: 'intermediate',
              code: 'torch.save(model.state_dict(), "ckpt.pt")',
            },
            {
              english: 'Gradient Checkpointing',
              italian: 'Checkpointing del gradiente',
              pronunciation: '/ˈɡreɪdiənt ˈtʃekpɔɪntɪŋ/',
              phonetic: 'GREI-di-ent CIEK-poin-ting',
              example:
                "By recomputing activations during the backward pass, gradient checkpointing trades 30% more compute for 60% less memory. = Ricalcolando le attivazioni durante il passaggio all'indietro, il gradient checkpointing scambia il 30% di calcolo in più per il 60% di memoria in meno.",
              context: 'model-training',
              difficulty: 'intermediate',
            },
          ],
        },
      ],
    },
    // ════════════════════════════════════════════════
    // LEVEL 11 - VALUTAZIONE MODELLI / MODEL EVALUATION
    // ════════════════════════════════════════════════
    11: {
      name: 'Valutazione Modelli / Model Evaluation',
      description: 'Misurare la qualità di un modello',
      lessons: [
        {
          id: 'ai_evaluation_1',
          title: 'Classification Metrics / Metriche di Classificazione',
          description: 'Misurare la qualità della classificazione',
          items: [
            {
              english: 'Accuracy',
              italian: 'Accuratezza',
              pronunciation: '/ˈækjərəsi/',
              phonetic: 'A-kiu-ra-si',
              example:
                "With balanced classes, accuracy of 0.95 means the model correctly classifies 95 out of every 100 samples. = Con classi bilanciate, un'accuratezza di 0.95 significa che il modello classifica correttamente 95 campioni su 100.",
              context: 'evaluation',
              difficulty: 'intermediate',
              code: 'accuracy_score(y_true, y_pred)',
              note: 'Falso amico: in italiano "accuratezza" non "accuracia".',
            },
            {
              english: 'Precision',
              italian: 'Precisione',
              pronunciation: '/prɪˈsɪʒən/',
              phonetic: 'pri-SI-gen',
              example:
                "In spam detection, high precision means very few legitimate emails end up in the spam folder. = Nel rilevamento spam, un'alta precisione significa che pochissime email legittime finiscono nella cartella spam.",
              context: 'evaluation',
              difficulty: 'intermediate',
              code: 'precision_score(y_true, y_pred)',
            },
            {
              english: 'Recall',
              italian: 'Richiamo',
              pronunciation: '/rɪˈkɔːl/',
              phonetic: 'ri-KOL',
              example:
                'For cancer screening, high recall is critical because missing a positive case could delay life-saving treatment. = Per lo screening del cancro, un alto richiamo è critico perché mancare un caso positivo potrebbe ritardare trattamenti salvavita.',
              context: 'evaluation',
              difficulty: 'intermediate',
              code: 'recall_score(y_true, y_pred)',
              note: 'Detto anche sensibilità o true positive rate.',
            },
            {
              english: 'F1 Score',
              italian: 'Punteggio F1',
              pronunciation: '/ef wʌn skɔːr/',
              phonetic: 'EF-UAN-SKOR',
              example:
                "When precision and recall are equally important, the F1 score provides a single balanced measure of performance. = Quando precisione e richiamo sono ugualmente importanti, l'F1 score fornisce una singola misura bilanciata delle prestazioni.",
              context: 'evaluation',
              difficulty: 'intermediate',
              code: 'f1_score(y_true, y_pred)',
              note: 'Media armonica di precision e recall.',
            },
            {
              english: 'Confusion Matrix',
              italian: 'Matrice di confusione',
              pronunciation: '/kənˈfjuːʒən ˈmeɪtrɪks/',
              phonetic: 'kon-FIU-gen MEI-triks',
              example:
                "Reading the confusion matrix revealed that the model consistently confused 'cat' images with 'dog' images. = Leggendo la matrice di confusione abbiamo scoperto che il modello confondeva costantemente immagini di 'gatti' con immagini di 'cani'.",
              context: 'evaluation',
              difficulty: 'intermediate',
              code: 'confusion_matrix(y_true, y_pred)',
            },
            {
              english: 'True Positive',
              italian: 'Vero positivo',
              pronunciation: '/truː ˈpɒzətɪv/',
              phonetic: 'TRU PO-ze-tiv',
              example:
                'Each correctly flagged fraudulent transaction counts as one true positive in our evaluation report. = Ogni transazione fraudolenta correttamente segnalata conta come un vero positivo nel nostro report di valutazione.',
              context: 'evaluation',
              difficulty: 'intermediate',
              note: 'Abbreviato TP.',
            },
            {
              english: 'False Positive',
              italian: 'Falso positivo',
              pronunciation: '/fɔːls ˈpɒzətɪv/',
              phonetic: 'FOLS PO-ze-tiv',
              example:
                'Too many false positives in the intrusion detection system caused alert fatigue among security analysts. = Troppi falsi positivi nel sistema di rilevamento intrusioni hanno causato affaticamento da allerta tra gli analisti di sicurezza.',
              context: 'evaluation',
              difficulty: 'intermediate',
              note: 'Abbreviato FP. Detto anche errore di tipo I.',
            },
            {
              english: 'False Negative',
              italian: 'Falso negativo',
              pronunciation: '/fɔːls ˈneɡətɪv/',
              phonetic: 'FOLS NE-ge-tiv',
              example:
                "A false negative in the safety system means a defective part passed inspection and reached the customer. = Un falso negativo nel sistema di sicurezza significa che un pezzo difettoso ha superato l'ispezione ed è arrivato al cliente.",
              context: 'evaluation',
              difficulty: 'intermediate',
              note: 'Abbreviato FN. Spesso più costoso del FP in medicina.',
            },
            {
              english: 'Specificity',
              italian: 'Specificità',
              pronunciation: '/ˌspesəˈfɪsəti/',
              phonetic: 'spe-si-FI-si-ti',
              example:
                'A test with 99% specificity correctly identifies 99 out of 100 healthy patients as disease-free. = Un test con il 99% di specificità identifica correttamente 99 pazienti sani su 100 come esenti da malattia.',
              context: 'evaluation',
              difficulty: 'intermediate',
            },
            {
              english: 'Balanced Accuracy',
              italian: 'Accuratezza bilanciata',
              pronunciation: '/ˈbælənst ˈækjərəsi/',
              phonetic: 'BA-lanst A-kiu-ra-si',
              example:
                "For our dataset with 90% negative and 10% positive samples, balanced accuracy gave a fairer performance measure. = Per il nostro dataset con 90% di campioni negativi e 10% positivi, l'accuratezza bilanciata ha dato una misura di prestazione più equa.",
              context: 'evaluation',
              difficulty: 'intermediate',
              code: 'balanced_accuracy_score(y_true, y_pred)',
            },
          ],
        },
        {
          id: 'ai_evaluation_2',
          title: 'ROC & AUC / Curve ROC e AUC',
          description: 'Curve di valutazione probabilistica',
          items: [
            {
              english: 'ROC Curve',
              italian: 'Curva ROC',
              pronunciation: '/roʊk kɜːrv/',
              phonetic: 'ROK KERV',
              example:
                'Plotting the ROC curve showed that our classifier dominates the baseline at every threshold setting. = Tracciare la curva ROC ha mostrato che il nostro classificatore domina la baseline a ogni impostazione di soglia.',
              context: 'evaluation',
              difficulty: 'intermediate',
              note: 'Receiver Operating Characteristic.',
            },
            {
              english: 'AUC',
              italian: 'Area sotto la curva ROC (AUC)',
              pronunciation: '/eɪ juː siː/',
              phonetic: 'EI-IU-SI',
              example:
                'An AUC of 0.98 means the model almost perfectly separates positive from negative examples regardless of threshold. = Un AUC di 0.98 significa che il modello separa quasi perfettamente esempi positivi da negativi indipendentemente dalla soglia.',
              context: 'evaluation',
              difficulty: 'intermediate',
              code: 'roc_auc_score(y_true, y_score)',
              note: 'Area Under the Curve.',
            },
            {
              english: 'Precision-Recall Curve',
              italian: 'Curva precision-recall',
              pronunciation: '/prɪˈsɪʒən rɪˈkɔːl kɜːrv/',
              phonetic: 'pri-SI-gen ri-KOL KERV',
              example:
                'For rare disease detection, the precision-recall curve is more informative than ROC because it ignores true negatives. = Per il rilevamento di malattie rare, la curva precisione-richiamo è più informativa della ROC perché ignora i veri negativi.',
              context: 'evaluation',
              difficulty: 'intermediate',
            },
            {
              english: 'Average Precision',
              italian: 'Precisione media',
              pronunciation: '/ˈævərɪdʒ prɪˈsɪʒən/',
              phonetic: 'A-ve-rigi pri-SI-gen',
              example:
                'Our object detector reached 0.72 average precision, which summarizes precision at each recall level. = Il nostro rilevatore di oggetti ha raggiunto 0.72 di precisione media, che riassume la precisione a ogni livello di richiamo.',
              context: 'evaluation',
              difficulty: 'intermediate',
              code: 'average_precision_score(y_true, y_score)',
            },
            {
              english: 'Threshold Tuning',
              italian: 'Tuning della soglia',
              pronunciation: '/ˈθreʃhoʊld ˈtjuːnɪŋ/',
              phonetic: 'TRES-hold TIU-ning',
              example:
                'Moving the decision threshold from 0.5 to 0.3 improved recall from 75% to 92% at the cost of more false positives. = Spostare la soglia decisionale da 0.5 a 0.3 ha migliorato il richiamo dal 75% al 92% al costo di più falsi positivi.',
              context: 'evaluation',
              difficulty: 'intermediate',
            },
            {
              english: 'Calibration',
              italian: 'Calibrazione',
              pronunciation: '/ˌkælɪˈbreɪʃən/',
              phonetic: 'ka-li-BREI-scen',
              example:
                "After calibration with Platt scaling, the model's predicted probabilities matched observed frequencies much more closely. = Dopo la calibrazione con Platt scaling, le probabilità predette dal modello corrispondevano molto più fedelmente alle frequenze osservate.",
              context: 'evaluation',
              difficulty: 'intermediate',
              tool: 'CalibratedClassifierCV',
            },
            {
              english: 'Brier Score',
              italian: 'Punteggio Brier',
              pronunciation: '/ˈbrɪər skɔːr/',
              phonetic: 'BRI-er SKOR',
              example:
                'A Brier score of 0.05 indicates that our probability forecasts are well-calibrated and close to reality. = Un Brier score di 0.05 indica che le nostre previsioni di probabilità sono ben calibrate e vicine alla realtà.',
              context: 'evaluation',
              difficulty: 'intermediate',
            },
            {
              english: 'Cohen Kappa',
              italian: 'Kappa di Cohen',
              pronunciation: '/ˈkoʊən ˈkæpə/',
              phonetic: 'KO-en KAP-pa',
              example:
                'A Cohen Kappa of 0.85 between two annotators shows strong agreement beyond what chance alone would produce. = Un Kappa di Cohen di 0.85 tra due annotatori mostra forte accordo oltre quello che il caso da solo produrrebbe.',
              context: 'evaluation',
              difficulty: 'intermediate',
              code: 'cohen_kappa_score(y_true, y_pred)',
            },
            {
              english: 'Matthews Correlation',
              italian: 'Correlazione di Matthews',
              pronunciation: '/ˈmæθjuːz ˌkɒrəˈleɪʃən/',
              phonetic: 'MA-tius kor-re-LEI-scen',
              example:
                "For binary classification on imbalanced data, the Matthews correlation coefficient is more reliable than accuracy. = Per la classificazione binaria su dati sbilanciati, il coefficiente di correlazione di Matthews è più affidabile dell'accuratezza.",
              context: 'evaluation',
              difficulty: 'intermediate',
              code: 'matthews_corrcoef(y_true, y_pred)',
              note: 'Abbreviato MCC.',
            },
            {
              english: 'Log Loss',
              italian: 'Perdita logaritmica (Log Loss)',
              pronunciation: '/lɒɡ lɒs/',
              phonetic: 'LOG LOS',
              example:
                'Minimizing log loss forces the model to produce well-calibrated probability estimates, not just correct labels. = Minimizzare la log loss forza il modello a produrre stime di probabilità ben calibrate, non solo etichette corrette.',
              context: 'evaluation',
              difficulty: 'intermediate',
              code: 'log_loss(y_true, y_proba)',
            },
          ],
        },
        {
          id: 'ai_evaluation_3',
          title: 'Regression Metrics / Metriche di Regressione',
          description: 'Misurare predizioni continue',
          items: [
            {
              english: 'RMSE',
              italian: 'Errore quadratico medio (RMSE)',
              pronunciation: '/ɑːr em es iː/',
              phonetic: 'AR-EM-ES-I',
              example:
                'Our demand forecasting model achieved an RMSE of 12 units, meaning predictions deviated by about 12 units on average. = Il nostro modello di previsione della domanda ha raggiunto un RMSE di 12 unità, significando che le predizioni deviavano di circa 12 unità in media.',
              context: 'evaluation',
              difficulty: 'intermediate',
              code: 'mean_squared_error(y_true, y_pred, squared=False)',
              note: 'Root Mean Squared Error.',
            },
            {
              english: 'MAPE',
              italian: 'Errore percentuale assoluto medio (MAPE)',
              pronunciation: '/ˈmæp/',
              phonetic: 'MAP',
              example:
                "A MAPE of 8% means the model's predictions are on average 8% off from actual values, acceptable for retail planning. = Un MAPE dell'8% significa che le predizioni del modello sono in media dell'8% distanti dai valori reali, accettabile per la pianificazione retail.",
              context: 'evaluation',
              difficulty: 'intermediate',
              code: 'mean_absolute_percentage_error(y_true, y_pred)',
              note: 'Mean Absolute Percentage Error.',
            },
            {
              english: 'Pseudo R-Squared',
              italian: 'Pseudo R quadrato',
              pronunciation: '/ɑːr ˈskweərd/',
              phonetic: 'AR-SKUERD',
              example: `For logistic regression we report McFadden's pseudo R-squared because the standard R-squared is not defined for binary outcomes. = Per la regressione logistica riportiamo lo pseudo R quadrato di McFadden perché l'R quadrato standard non è definito per esiti binari.`,
              context: 'evaluation',
              difficulty: 'intermediate',
              code: 'r2_score(y_true, y_pred)',
              note: 'Esistono diverse formulazioni: McFadden, Cox-Snell, Nagelkerke.',
            },
            {
              english: 'Adjusted R-Squared',
              italian: 'R quadrato corretto',
              pronunciation: '/əˈdʒʌstɪd ɑːr ˈskweərd/',
              phonetic: 'a-GIAS-ted AR-SKUERD',
              example:
                "Unlike raw R-squared, adjusted R-squared penalizes adding features that do not genuinely improve prediction quality. = A differenza dell'R quadrato grezzo, l'R quadrato corretto penalizza l'aggiunta di feature che non migliorano genuinamente la qualità della predizione.",
              context: 'evaluation',
              difficulty: 'intermediate',
            },
            {
              english: 'Median Absolute Error',
              italian: 'Errore assoluto mediano',
              pronunciation: '/ˈmiːdiən ˈæbsəluːt ˈerər/',
              phonetic: 'MI-dian AB-so-lut ER-rer',
              example:
                "With heavy outliers in property values, the median absolute error gave a more robust accuracy picture than RMSE. = Con forti outlier nei valori immobiliari, l'errore assoluto mediano ha dato un quadro di accuratezza più robusto dell'RMSE.",
              context: 'evaluation',
              difficulty: 'intermediate',
              code: 'median_absolute_error(y_true, y_pred)',
            },
            {
              english: 'Predicted vs Actual Plot',
              italian: 'Grafico predetto vs reale',
              pronunciation: '/ɪkˈspleɪnd ˈveəriəns/',
              phonetic: 'ek-SPLEIND VER-ians',
              example:
                'Inspecting the predicted vs actual plot quickly reveals whether the regression systematically over- or under-predicts in certain ranges. = Ispezionare il grafico predetto vs reale rivela rapidamente se la regressione sovra- o sotto-stima sistematicamente in certi intervalli.',
              context: 'evaluation',
              difficulty: 'intermediate',
              note: 'Idealmente i punti si dispongono lungo la diagonale y=x.',
            },
            {
              english: 'Residual Plot',
              italian: 'Grafico dei residui',
              pronunciation: '/rɪˈzɪdʒuəl plɒt/',
              phonetic: 'ri-ZI-giu-al PLOT',
              example:
                'The U-shaped residual plot revealed a nonlinear pattern the linear regression model was failing to capture. = Il grafico dei residui a forma di U ha rivelato un pattern non lineare che il modello di regressione lineare non riusciva a catturare.',
              context: 'evaluation',
              difficulty: 'intermediate',
            },
            {
              english: 'Q-Q Plot',
              italian: 'Grafico quantile-quantile (Q-Q Plot)',
              pronunciation: '/kjuː kjuː plɒt/',
              phonetic: 'KIU-KIU-PLOT',
              example:
                'The Q-Q plot showed residuals deviating from the diagonal, indicating non-normal error distribution. = Il grafico Q-Q ha mostrato residui che deviavano dalla diagonale, indicando una distribuzione degli errori non normale.',
              context: 'evaluation',
              difficulty: 'intermediate',
            },
            {
              english: 'Heteroscedasticity',
              italian: 'Eteroschedasticità',
              pronunciation: '/ˌhetəroʊˌskedəˈstɪsəti/',
              phonetic: 'e-te-ro-ske-das-TI-si-ti',
              example:
                'The fan-shaped residual pattern is a classic sign of heteroscedasticity, suggesting variance grows with predicted values. = Il pattern dei residui a ventaglio è un segno classico di eteroschedasticità, suggerendo che la varianza cresce con i valori predetti.',
              context: 'evaluation',
              difficulty: 'intermediate',
              note: 'Variabilità non costante dei residui.',
            },
            {
              english: 'Forecast Bias',
              italian: 'Bias di previsione',
              pronunciation: '/ˈfɔːrkæst ˈbaɪəs/',
              phonetic: 'FOR-kast BAI-as',
              example:
                'Our demand model consistently under-predicted holiday sales, revealing a seasonal forecast bias we needed to correct. = Il nostro modello di domanda sotto-prediceva costantemente le vendite festive, rivelando un bias di previsione stagionale da correggere.',
              context: 'evaluation',
              difficulty: 'intermediate',
            },
          ],
        },
        {
          id: 'ai_evaluation_4',
          title: 'Validation Strategies / Strategie di Validazione',
          description: 'Come testare correttamente un modello',
          items: [
            {
              english: 'Holdout',
              italian: 'Set di validazione separato (Holdout)',
              pronunciation: '/ˈhoʊldaʊt/',
              phonetic: 'HOLD-aut',
              example:
                'We kept a 20% holdout set completely untouched during development and used it only for final evaluation. = Abbiamo tenuto un set holdout del 20% completamente intatto durante lo sviluppo e lo abbiamo usato solo per la valutazione finale.',
              context: 'evaluation',
              difficulty: 'intermediate',
            },
            {
              english: 'Stratified K-Fold',
              italian: 'K-fold stratificato',
              pronunciation: '/ˈstrætɪfaɪd keɪ foʊld/',
              phonetic: 'STRA-ti-faid KEI-FOLD',
              example:
                "For our fraud dataset with only 1% positive cases, stratified K-Fold ensured each fold had proportional fraud representation. = Per il nostro dataset di frodi con solo l'1% di casi positivi, lo stratified K-Fold ha assicurato che ogni fold avesse una rappresentazione proporzionale delle frodi.",
              context: 'evaluation',
              difficulty: 'intermediate',
              code: 'StratifiedKFold(n_splits=5)',
            },
            {
              english: 'Leave-One-Out',
              italian: 'Lascia uno fuori',
              pronunciation: '/liːv wʌn aʊt/',
              phonetic: 'LIV-UAN-AUT',
              example:
                'With only 50 patient samples, leave-one-out cross-validation gave the least biased performance estimate. = Con soli 50 campioni di pazienti, la convalida incrociata leave-one-out ha dato la stima di prestazione meno distorta.',
              context: 'evaluation',
              difficulty: 'intermediate',
              code: 'LeaveOneOut()',
              note: 'Abbreviata LOOCV. Costosa per dataset grandi.',
            },
            {
              english: 'Time Series Split',
              italian: 'Split serie temporali',
              pronunciation: '/taɪm ˈsɪriːz splɪt/',
              phonetic: 'TAIM SI-riz SPLIT',
              example:
                'Using time series split prevents future data from leaking into the training folds when validating forecasting models. = Usare il time series split impedisce ai dati futuri di infiltrarsi nei fold di addestramento quando si validano modelli di previsione.',
              context: 'evaluation',
              difficulty: 'intermediate',
              code: 'TimeSeriesSplit(n_splits=5)',
              note: 'Mai mescolare dati temporali!',
            },
            {
              english: 'Nested Cross-Validation',
              italian: 'Convalida incrociata annidata',
              pronunciation: '/ˈnestɪd krɒs ˌvælɪˈdeɪʃən/',
              phonetic: 'NES-ted KROS va-li-DEI-scen',
              example:
                'To avoid optimistic bias, nested cross-validation runs hyperparameter search in the inner loop and evaluation in the outer. = Per evitare bias ottimistico, la convalida incrociata nidificata esegue la ricerca iperparametri nel ciclo interno e la valutazione nel ciclo esterno.',
              context: 'evaluation',
              difficulty: 'intermediate',
            },
            {
              english: 'Group K-Fold',
              italian: 'K-fold per gruppi',
              pronunciation: '/ɡruːp keɪ foʊld/',
              phonetic: 'GRUP KEI-FOLD',
              example:
                'Since multiple images came from the same patient, group K-Fold prevented the model from memorizing patient-specific features. = Poiché più immagini provenivano dallo stesso paziente, il group K-Fold ha impedito al modello di memorizzare feature specifiche del paziente.',
              context: 'evaluation',
              difficulty: 'intermediate',
              note: 'Esempio: pazienti diversi non devono mischiarsi tra train e test.',
            },
            {
              english: 'Ablation Study',
              italian: 'Studio di ablazione',
              pronunciation: '/əˈbleɪʃən ˈstʌdi/',
              phonetic: 'a-BLEI-scen STA-di',
              example:
                'The ablation study revealed that removing positional encoding had a catastrophic effect on long-range dependencies. = Lo studio di ablazione ha rivelato che rimuovere la codifica posizionale ha avuto un effetto catastrofico sulle dipendenze a lungo raggio.',
              context: 'evaluation',
              difficulty: 'intermediate',
            },
            {
              english: 'Statistical Significance',
              italian: 'Significatività statistica',
              pronunciation: '/stəˈtɪstɪkəl sɪɡˈnɪfɪkəns/',
              phonetic: 'sta-TIS-ti-kal sig-ni-fi-KANS',
              example:
                'A p-value of 0.003 confirmed that the improvement from the new model was beyond statistical significance thresholds. = Un p-value di 0.003 ha confermato che il miglioramento dal nuovo modello era oltre le soglie di significatività statistica.',
              context: 'evaluation',
              difficulty: 'intermediate',
            },
            {
              english: 'McNemar Test',
              italian: 'Test di McNemar',
              pronunciation: '/məkˈniːmɑːr test/',
              phonetic: 'mek-NIM-ar TEST',
              example:
                'We used the McNemar test to determine if two classifiers make significantly different errors on the same test set. = Abbiamo usato il test di McNemar per determinare se due classificatori fanno errori significativamente diversi sullo stesso set di test.',
              context: 'evaluation',
              difficulty: 'intermediate',
            },
            {
              english: 'Test Harness',
              italian: 'Impalcatura di test (Test Harness)',
              pronunciation: '/test ˈhɑːrnɪs/',
              phonetic: 'TEST HAR-nis',
              example:
                'Our standardized test harness runs every model candidate through identical data splits, metrics, and seed configurations. = Il nostro test harness standardizzato esegue ogni modello candidato attraverso split, metriche e configurazioni di seed identiche.',
              context: 'evaluation',
              difficulty: 'intermediate',
              note: 'Termine spesso lasciato in inglese.',
            },
          ],
        },
      ],
    },
    // ════════════════════════════════════════════════
    // LEVEL 12 - FRAMEWORK ML / ML FRAMEWORKS
    // ════════════════════════════════════════════════
    12: {
      name: 'Framework ML / ML Frameworks',
      description: 'Strumenti software per il machine learning',
      lessons: [
        {
          id: 'ai_frameworks_1',
          title: 'TensorFlow & Keras',
          description: 'Il framework di Google',
          items: [
            {
              english: 'TensorFlow',
              italian: 'Framework ML Google (TensorFlow)',
              pronunciation: '/ˈtensərfloʊ/',
              phonetic: 'TEN-ser-flou',
              example:
                'Many production systems still rely on TensorFlow because of its mature serving infrastructure and mobile support. = Molti sistemi in produzione si affidano ancora a TensorFlow per la sua infrastruttura di serving matura e il supporto mobile.',
              context: 'tools',
              difficulty: 'intermediate',
              code: 'import tensorflow as tf',
              tool: 'TensorFlow',
            },
            {
              english: 'Keras',
              italian: 'API alto livello per TensorFlow (Keras)',
              pronunciation: '/ˈkerəs/',
              phonetic: 'KE-ras',
              example:
                'Beginners love Keras because building a neural network takes just a few lines of high-level Python code. = I principianti amano Keras perché costruire una rete neurale richiede solo poche righe di codice Python ad alto livello.',
              context: 'tools',
              difficulty: 'intermediate',
              code: 'from tensorflow import keras',
              tool: 'Keras',
            },
            {
              english: 'Sequential Model',
              italian: 'Modello sequenziale',
              pronunciation: '/sɪˈkwenʃəl ˈmɒdəl/',
              phonetic: 'si-KUEN-scial MO-del',
              example:
                'For straightforward layer stacking, a Keras sequential model is the fastest way to prototype. = Per un impilamento lineare di strati, un modello Keras sequential è il modo più veloce per prototipare.',
              context: 'tools',
              difficulty: 'intermediate',
              code: 'model = keras.Sequential([Dense(64), Dense(10)])',
            },
            {
              english: 'Functional API',
              italian: 'API funzionale',
              pronunciation: '/ˈfʌŋkʃənəl eɪ piː aɪ/',
              phonetic: 'FANK-scio-nal EI-PI-AI',
              example:
                "When your model has multiple inputs or branches, the Keras functional API lets you build any DAG topology. = Quando il modello ha input multipli o rami, l'API funzionale di Keras permette di costruire qualsiasi topologia DAG.",
              context: 'tools',
              difficulty: 'intermediate',
              code: 'inputs = Input(...); x = Dense(64)(inputs)',
            },
            {
              english: 'Tensor',
              italian: 'Tensore',
              pronunciation: '/ˈtensər/',
              phonetic: 'TEN-ser',
              example:
                'In deep learning, every piece of data is represented as a multi-dimensional tensor flowing through the computation graph. = Nel deep learning, ogni dato è rappresentato come un tensore multidimensionale che fluisce attraverso il grafo di computazione.',
              context: 'tools',
              difficulty: 'intermediate',
              code: 'tf.constant([[1, 2], [3, 4]])',
            },
            {
              english: 'Eager Execution',
              italian: 'Esecuzione eager',
              pronunciation: '/ˈiːɡər ˌeksɪˈkjuːʃən/',
              phonetic: 'I-ger ek-se-KIU-scen',
              example:
                "With eager execution enabled, you can debug TensorFlow code line by line using standard Python print statements. = Con l'esecuzione eager abilitata, puoi debuggare codice TensorFlow riga per riga usando istruzioni print Python standard.",
              context: 'tools',
              difficulty: 'intermediate',
              note: 'Default in TensorFlow 2.x.',
            },
            {
              english: 'Graph Mode',
              italian: 'Modalità grafo',
              pronunciation: '/ɡræf moʊd/',
              phonetic: 'GRAF MOUD',
              example:
                "For production deployment, compiling the model into graph mode eliminates Python overhead and speeds up inference. = Per il deploy in produzione, compilare il modello in modalità grafo elimina l'overhead Python e velocizza l'inferenza.",
              context: 'tools',
              difficulty: 'intermediate',
              code: '@tf.function',
            },
            {
              english: 'Callback',
              italian: 'Chiamata di ritorno (Callback)',
              pronunciation: '/ˈkɔːlbæk/',
              phonetic: 'KOL-bak',
              example:
                "We added an early-stopping callback that halts training when validation loss fails to improve for 5 epochs. = Abbiamo aggiunto una callback di arresto anticipato che ferma l'addestramento quando la loss di validazione non migliora per 5 epoche.",
              context: 'tools',
              difficulty: 'intermediate',
              code: 'EarlyStopping(patience=3)',
            },
            {
              english: 'TensorBoard',
              italian: 'Visualizzatore esperimenti TF (TensorBoard)',
              pronunciation: '/ˈtensərbɔːrd/',
              phonetic: 'TEN-ser-bord',
              example:
                'The team uses TensorBoard to visualize loss curves, gradient distributions, and embedding projections in real time. = Il team usa TensorBoard per visualizzare curve di loss, distribuzioni di gradienti e proiezioni di embedding in tempo reale.',
              context: 'tools',
              difficulty: 'intermediate',
              tool: 'TensorBoard',
              command: 'tensorboard --logdir logs/',
            },
            {
              english: 'tf.data',
              italian: 'Pipeline dati TensorFlow (tf.data)',
              pronunciation: '/tiː ef ˈdeɪtə/',
              phonetic: 'TI-EF DEI-ta',
              example:
                'Building efficient input pipelines with tf.data ensures the GPU never sits idle waiting for the next batch. = Costruire pipeline di input efficienti con tf.data assicura che la GPU non resti mai inattiva in attesa del prossimo batch.',
              context: 'tools',
              difficulty: 'intermediate',
              code: 'tf.data.Dataset.from_tensor_slices(X)',
            },
          ],
        },
        {
          id: 'ai_frameworks_2',
          title: 'PyTorch',
          description: 'Il framework di Meta',
          items: [
            {
              english: 'PyTorch',
              italian: 'Framework ML Meta (PyTorch)',
              pronunciation: '/paɪˈtɔːrtʃ/',
              phonetic: 'PAI-torci',
              example:
                'Most academic researchers prefer PyTorch for its Pythonic feel and flexible dynamic computation graph. = La maggior parte dei ricercatori accademici preferisce PyTorch per il suo stile Pythonico e il grafo di computazione dinamico flessibile.',
              context: 'tools',
              difficulty: 'intermediate',
              code: 'import torch',
              tool: 'PyTorch',
            },
            {
              english: 'nn.Module',
              italian: 'Classe base modulo PyTorch (nn.Module)',
              pronunciation: '/en en ˈmɒdjuːl/',
              phonetic: 'EN-EN MO-giul',
              example:
                'Every custom neural network in PyTorch inherits from nn.Module and implements a forward method. = Ogni rete neurale personalizzata in PyTorch eredita da nn.Module e implementa un metodo forward.',
              context: 'tools',
              difficulty: 'intermediate',
              code: 'class Net(nn.Module):',
            },
            {
              english: 'Autograd',
              italian: 'Differenziazione automatica (Autograd)',
              pronunciation: '/ˈɔːtoʊɡræd/',
              phonetic: 'AU-tou-grad',
              example:
                "PyTorch's autograd engine automatically computes gradients for any tensor operation, eliminating manual differentiation. = Il motore autograd di PyTorch calcola automaticamente i gradienti per qualsiasi operazione tensoriale, eliminando la differenziazione manuale.",
              context: 'tools',
              difficulty: 'intermediate',
              code: 'loss.backward()',
            },
            {
              english: 'DataLoader',
              italian: 'Iterabile su Dataset (DataLoader)',
              pronunciation: '/ˈdeɪtə ˈloʊdər/',
              phonetic: 'DEI-ta LOU-der',
              example:
                'We configured the DataLoader with 4 workers and prefetching to keep the training loop running at full speed. = Abbiamo configurato il DataLoader con 4 worker e prefetching per mantenere il ciclo di addestramento alla massima velocità.',
              context: 'tools',
              difficulty: 'intermediate',
              code: 'DataLoader(dataset, batch_size=32, shuffle=True)',
            },
            {
              english: 'Collate Function',
              italian: 'Funzione di collazione (collate)',
              pronunciation: '/ˈdeɪtəset/',
              phonetic: 'DEI-ta-set',
              example:
                'A custom collate function lets the DataLoader pad variable-length sequences into a single batch tensor cleanly. = Una funzione di collate personalizzata permette al DataLoader di fare padding di sequenze a lunghezza variabile in un singolo tensore batch in modo pulito.',
              context: 'tools',
              difficulty: 'intermediate',
              code: 'class MyData(Dataset):',
              note: `Si passa al DataLoader tramite l'argomento collate_fn.`,
            },
            {
              english: 'Tensor (PyTorch)',
              italian: 'Array multidimensionale (Tensor PyTorch)',
              pronunciation: '/ˈtensər/',
              phonetic: 'TEN-ser',
              example:
                "A PyTorch tensor on GPU supports the same operations as NumPy arrays but leverages parallel hardware acceleration. = Un tensore PyTorch su GPU supporta le stesse operazioni degli array NumPy ma sfrutta l'accelerazione hardware parallela.",
              context: 'tools',
              difficulty: 'intermediate',
              code: 'x = torch.randn(2, 3).cuda()',
            },
            {
              english: 'Optimizer Step',
              italian: "Step dell'ottimizzatore",
              pronunciation: '/ˈɒptɪmaɪzər step/',
              phonetic: 'OP-ti-mai-zer STEP',
              example:
                "After computing gradients, calling the optimizer step updates all model parameters in a single operation. = Dopo aver calcolato i gradienti, chiamare il passo dell'ottimizzatore aggiorna tutti i parametri del modello in una singola operazione.",
              context: 'tools',
              difficulty: 'intermediate',
              code: 'optimizer.step()',
            },
            {
              english: 'PyTorch Lightning',
              italian: 'Wrapper PyTorch ad alto livello (PyTorch Lightning)',
              pronunciation: '/paɪˈtɔːrtʃ ˈlaɪtnɪŋ/',
              phonetic: 'PAI-torci LAIT-ning',
              example:
                'Migrating to PyTorch Lightning eliminated 300 lines of training boilerplate and standardized our experiment loops. = Migrare a PyTorch Lightning ha eliminato 300 righe di codice boilerplate di addestramento e standardizzato i nostri cicli di esperimenti.',
              context: 'tools',
              difficulty: 'intermediate',
              tool: 'pytorch-lightning',
            },
            {
              english: 'TorchScript',
              italian: 'IR di PyTorch per produzione (TorchScript)',
              pronunciation: '/ˈtɔːrtʃskrɪpt/',
              phonetic: 'TORCI-skript',
              example:
                'Exporting our model to TorchScript enabled deployment in C++ environments without any Python runtime. = Esportare il nostro modello in TorchScript ha abilitato il deploy in ambienti C++ senza alcun runtime Python.',
              context: 'tools',
              difficulty: 'intermediate',
              code: 'torch.jit.script(model)',
            },
            {
              english: 'torch.compile',
              italian: 'Compilatore JIT PyTorch (torch.compile)',
              pronunciation: '/ˈtɔːrtʃ kəmˈpaɪl/',
              phonetic: 'TORCI kom-PAIL',
              example:
                'Adding a single torch.compile call sped up our Transformer inference by 40% with zero code changes. = Aggiungere una singola chiamata torch.compile ha velocizzato la nostra inferenza Transformer del 40% senza modifiche al codice.',
              context: 'tools',
              difficulty: 'intermediate',
              code: 'model = torch.compile(model)',
            },
          ],
        },
        {
          id: 'ai_frameworks_3',
          title: 'scikit-learn & Classic ML / scikit-learn e ML Classico',
          description: 'Strumenti per ML tradizionale',
          items: [
            {
              english: 'scikit-learn',
              italian: 'Libreria ML classica Python (scikit-learn)',
              pronunciation: '/ˈsaɪkɪt lɜːrn/',
              phonetic: 'SAI-kit-LERN',
              example:
                'For classical ML tasks like random forests and SVMs, scikit-learn remains the gold standard Python library. = Per compiti di ML classico come random forest e SVM, scikit-learn resta la libreria Python di riferimento.',
              context: 'tools',
              difficulty: 'intermediate',
              code: 'from sklearn import datasets',
              tool: 'scikit-learn',
            },
            {
              english: 'Pipeline',
              italian: 'Sequenza di trasformazioni (Pipeline)',
              pronunciation: '/ˈpaɪplaɪn/',
              phonetic: 'PAIP-lain',
              example:
                'A scikit-learn Pipeline chains preprocessing steps and the model into a single object that prevents data leakage. = Una Pipeline di scikit-learn concatena passi di preprocessing e modello in un singolo oggetto che previene la fuga di dati.',
              context: 'tools',
              difficulty: 'intermediate',
              code: 'Pipeline([("scaler", StandardScaler()), ("model", SVC())])',
            },
            {
              english: 'Estimator',
              italian: 'Estimatore',
              pronunciation: '/ˈestɪmeɪtər/',
              phonetic: 'ES-ti-mei-ter',
              example:
                'Every estimator in scikit-learn follows the same fit/predict interface, making it easy to swap algorithms. = Ogni estimatore in scikit-learn segue la stessa interfaccia fit/predict, rendendo facile scambiare algoritmi.',
              context: 'tools',
              difficulty: 'intermediate',
            },
            {
              english: 'Transformer (sklearn)',
              italian: 'Step di pipeline (Transformer sklearn)',
              pronunciation: '/trænsˈfɔːrmər/',
              phonetic: 'trans-FOR-mer',
              example:
                "In a scikit-learn pipeline, a Transformer preprocesses data, like scaling or encoding, before the final estimator. = In una pipeline scikit-learn, un Transformer preprocessa i dati, come scalatura o codifica, prima dell'estimatore finale.",
              context: 'tools',
              difficulty: 'intermediate',
              note: 'Diverso dal Transformer di Vaswani.',
            },
            {
              english: 'fit',
              italian: 'Addestra il modello (fit)',
              pronunciation: '/fɪt/',
              phonetic: 'FIT',
              example:
                'Calling fit on the scaler with training data computes the mean and standard deviation used for transformation. = Chiamare fit sullo scaler con i dati di training calcola media e deviazione standard usate per la trasformazione.',
              context: 'tools',
              difficulty: 'intermediate',
              code: 'model.fit(X_train, y_train)',
            },
            {
              english: 'predict',
              italian: 'Restituisce predizioni (predict)',
              pronunciation: '/prɪˈdɪkt/',
              phonetic: 'pri-DIKT',
              example:
                "After fitting, calling predict on new data returns the model's estimated labels or values. = Dopo il fitting, chiamare predict su nuovi dati restituisce le etichette o valori stimati dal modello.",
              context: 'tools',
              difficulty: 'intermediate',
              code: 'y_pred = model.predict(X_test)',
            },
            {
              english: 'predict_proba',
              italian: 'Probabilità di classe (predict_proba)',
              pronunciation: '/prɪˈdɪkt ˈproʊbə/',
              phonetic: 'pri-DIKT PRO-ba',
              example:
                'Using predict_proba instead of predict gives class probabilities, essential for threshold tuning and calibration. = Usare predict_proba invece di predict fornisce probabilità per classe, essenziali per il tuning della soglia e la calibrazione.',
              context: 'tools',
              difficulty: 'intermediate',
              code: 'probs = model.predict_proba(X_test)',
            },
            {
              english: 'NumPy',
              italian: 'Libreria array numerici Python (NumPy)',
              pronunciation: '/ˈnʌmpaɪ/',
              phonetic: 'NAM-pai',
              example:
                'Behind the scenes, NumPy provides the fast array operations that power virtually every Python ML library. = Dietro le quinte, NumPy fornisce le operazioni su array veloci che alimentano praticamente ogni libreria ML in Python.',
              context: 'tools',
              difficulty: 'intermediate',
              code: 'import numpy as np',
              tool: 'NumPy',
            },
            {
              english: 'pandas',
              italian: 'Libreria dataframe Python (pandas)',
              pronunciation: '/ˈpændəz/',
              phonetic: 'PAN-das',
              example:
                'Data scientists rely on pandas DataFrames daily to clean, transform, and explore tabular datasets. = I data scientist si affidano quotidianamente ai DataFrame di pandas per pulire, trasformare ed esplorare dataset tabulari.',
              context: 'tools',
              difficulty: 'intermediate',
              code: 'import pandas as pd',
              tool: 'pandas',
            },
            {
              english: 'JAX',
              italian: 'Libreria autodiff e XLA Google (JAX)',
              pronunciation: '/dʒæks/',
              phonetic: 'GIAKS',
              example:
                'Google researchers use JAX for experiments that need automatic differentiation combined with hardware-accelerated NumPy. = I ricercatori di Google usano JAX per esperimenti che necessitano differenziazione automatica combinata con NumPy accelerato via hardware.',
              context: 'tools',
              difficulty: 'intermediate',
              code: 'import jax.numpy as jnp',
              tool: 'JAX',
            },
          ],
        },
        {
          id: 'ai_frameworks_4',
          title: 'Hugging Face & LLM Tools / Hugging Face e Strumenti LLM',
          description: "L'ecosistema dei modelli pre-addestrati",
          items: [
            {
              english: 'Hugging Face',
              italian: 'Hub modelli ML (Hugging Face)',
              pronunciation: '/ˈhʌɡɪŋ feɪs/',
              phonetic: 'HAG-ghin-FEIS',
              example:
                "The Hugging Face ecosystem hosts over 200,000 pre-trained models downloadable with a single line of code. = L'ecosistema Hugging Face ospita oltre 200.000 modelli pre-addestrati scaricabili con una singola riga di codice.",
              context: 'tools',
              difficulty: 'intermediate',
              tool: 'Hugging Face Hub',
            },
            {
              english: 'Transformers Library',
              italian: 'Libreria Transformers',
              pronunciation: '/trænsˈfɔːrmərz ˈlaɪbrəri/',
              phonetic: 'trans-FOR-merz LAI-bre-ri',
              example:
                'Installing the Hugging Face Transformers library gives instant access to BERT, GPT, T5, and hundreds more models. = Installare la libreria Transformers di Hugging Face dà accesso immediato a BERT, GPT, T5 e centinaia di altri modelli.',
              context: 'tools',
              difficulty: 'intermediate',
              code: 'from transformers import AutoModel',
              tool: 'transformers',
            },
            {
              english: 'AutoModel',
              italian: 'Loader generico Hugging Face (AutoModel)',
              pronunciation: '/ˈɔːtoʊ ˈmɒdəl/',
              phonetic: 'AU-tou MO-del',
              example:
                "With AutoModel, Hugging Face automatically selects the right architecture based on the checkpoint name you provide. = Con AutoModel, Hugging Face seleziona automaticamente l'architettura giusta basandosi sul nome del checkpoint fornito.",
              context: 'tools',
              difficulty: 'intermediate',
              code: 'AutoModel.from_pretrained("bert-base-uncased")',
            },
            {
              english: 'Tokenizer',
              italian: 'Suddivisore in token (Tokenizer)',
              pronunciation: '/ˈtoʊkənaɪzər/',
              phonetic: 'TOU-ke-nai-zer',
              example:
                'The Hugging Face Tokenizer handles text-to-token conversion with the same vocabulary used during model pre-training. = Il Tokenizer di Hugging Face gestisce la conversione testo-token con lo stesso vocabolario usato durante il pre-addestramento del modello.',
              context: 'tools',
              difficulty: 'intermediate',
              code: 'AutoTokenizer.from_pretrained("gpt2")',
            },
            {
              english: 'Pipeline (HF)',
              italian: 'API alto livello (pipeline Hugging Face)',
              pronunciation: '/ˈpaɪplaɪn/',
              phonetic: 'PAIP-lain',
              example:
                'A Hugging Face Pipeline wraps model, tokenizer, and postprocessing into a single callable for tasks like summarization. = Una Pipeline di Hugging Face avvolge modello, tokenizer e post-elaborazione in un singolo oggetto chiamabile per compiti come il riassunto.',
              context: 'tools',
              difficulty: 'intermediate',
              code: 'pipeline("sentiment-analysis")(text)',
            },
            {
              english: 'Datasets Library',
              italian: 'Libreria datasets',
              pronunciation: '/ˈdeɪtəsets ˈlaɪbrəri/',
              phonetic: 'DEI-ta-sets LAI-bre-ri',
              example:
                'The Hugging Face Datasets library streams terabytes of training data without downloading everything to disk first. = La libreria Datasets di Hugging Face effettua lo streaming di terabyte di dati di addestramento senza scaricare tutto su disco.',
              context: 'tools',
              difficulty: 'intermediate',
              code: 'from datasets import load_dataset',
              tool: 'datasets',
            },
            {
              english: 'Model Hub',
              italian: 'Hub di modelli Hugging Face (Model Hub)',
              pronunciation: '/ˈmɒdəl hʌb/',
              phonetic: 'MO-del HAB',
              example:
                'Teams share fine-tuned models on the Hugging Face Model Hub so others can reuse them with zero training. = I team condividono modelli fine-tuned sul Model Hub di Hugging Face così altri possono riusarli senza addestramento.',
              context: 'tools',
              difficulty: 'intermediate',
            },
            {
              english: 'Trainer',
              italian: 'Loop di training Hugging Face (Trainer)',
              pronunciation: '/ˈtreɪnər/',
              phonetic: 'TREI-ner',
              example:
                'The Hugging Face Trainer class handles training loops, evaluation, logging, and checkpointing in under 10 lines. = La classe Trainer di Hugging Face gestisce cicli di addestramento, valutazione, logging e checkpointing in meno di 10 righe.',
              context: 'tools',
              difficulty: 'intermediate',
              code: 'trainer = Trainer(model, args, train_dataset)',
            },
            {
              english: 'Spaces',
              italian: 'App demo su Hugging Face (Spaces)',
              pronunciation: '/speɪsɪz/',
              phonetic: 'SPEI-sis',
              example:
                'Developers deploy interactive ML demos on Hugging Face Spaces using Gradio or Streamlit with free GPU access. = Gli sviluppatori deployano demo ML interattive su Hugging Face Spaces usando Gradio o Streamlit con accesso GPU gratuito.',
              context: 'tools',
              difficulty: 'intermediate',
              tool: 'Gradio, Streamlit',
            },
            {
              english: 'Accelerate',
              italian: 'Libreria distributed training HF (Accelerate)',
              pronunciation: '/əkˈseləreɪt/',
              phonetic: 'ak-SE-le-reit',
              example:
                "Hugging Face Accelerate lets you scale training from a single GPU to a multi-node cluster by changing just one config file. = Hugging Face Accelerate permette di scalare l'addestramento da una singola GPU a un cluster multi-nodo cambiando un solo file di configurazione.",
              context: 'tools',
              difficulty: 'intermediate',
              tool: 'accelerate',
            },
          ],
        },
      ],
    },
    // ════════════════════════════════════════════════
    // LEVEL 13 - FEATURE ENGINEERING
    // ════════════════════════════════════════════════
    13: {
      name: 'Feature Engineering',
      description: 'Costruire feature efficaci',
      lessons: [
        {
          id: 'ai_features_1',
          title: 'Feature Selection / Selezione Feature',
          description: 'Scegliere le feature più informative',
          items: [
            {
              english: 'Feature Selection',
              italian: 'Selezione delle feature',
              pronunciation: '/ˈfiːtʃər sɪˈlekʃən/',
              phonetic: 'FII-cer si-LEK-scen',
              example:
                "Before training, feature selection narrowed our 500 columns down to the 30 most predictive ones. = Prima dell'addestramento, la selezione delle feature ha ridotto le nostre 500 colonne alle 30 più predittive.",
              context: 'data-engineering',
              difficulty: 'advanced',
            },
            {
              english: 'Filter Method',
              italian: 'Metodo filtro',
              pronunciation: '/ˈfɪltər ˈmeθəd/',
              phonetic: 'FIL-ter ME-tod',
              example:
                'We applied a filter method using correlation coefficients to remove redundant features before modeling. = Abbiamo applicato un metodo filtro usando coefficienti di correlazione per rimuovere feature ridondanti prima della modellazione.',
              context: 'data-engineering',
              difficulty: 'advanced',
              code: 'SelectKBest(score_func=f_classif, k=10)',
            },
            {
              english: 'Wrapper Method',
              italian: 'Metodo wrapper',
              pronunciation: '/ˈræpər ˈmeθəd/',
              phonetic: 'RAP-per ME-tod',
              example:
                'Although computationally expensive, the wrapper method evaluates feature subsets by training the actual model each time. = Sebbene costoso computazionalmente, il metodo wrapper valuta sottoinsiemi di feature addestrando il modello effettivo ogni volta.',
              context: 'data-engineering',
              difficulty: 'advanced',
              note: 'Esempio: Recursive Feature Elimination.',
            },
            {
              english: 'Embedded Method',
              italian: 'Metodo embedded',
              pronunciation: '/ɪmˈbedɪd ˈmeθəd/',
              phonetic: 'em-BED-ded ME-tod',
              example:
                'Lasso regression is an embedded method because it performs feature selection during the training process itself. = La regressione Lasso è un metodo embedded perché esegue la selezione delle feature durante il processo di addestramento stesso.',
              context: 'data-engineering',
              difficulty: 'advanced',
              note: 'Esempio: Lasso, alberi.',
            },
            {
              english: 'Recursive Feature Elimination',
              italian: 'Eliminazione ricorsiva delle feature',
              pronunciation: '/rɪˈkɜːrsɪv ˈfiːtʃər ɪˌlɪmɪˈneɪʃən/',
              phonetic: 'ri-KER-siv FII-cer e-li-mi-NEI-scen',
              example:
                "Using recursive feature elimination, we iteratively removed the least important features until 20 remained. = Usando l'eliminazione ricorsiva delle feature, abbiamo rimosso iterativamente le feature meno importanti fino a restarne 20.",
              context: 'data-engineering',
              difficulty: 'advanced',
              code: 'RFE(estimator, n_features_to_select=10)',
              note: 'Abbreviata RFE.',
            },
            {
              english: 'Mutual Information',
              italian: 'Informazione mutua',
              pronunciation: '/ˈmjuːtʃuəl ˌɪnfərˈmeɪʃən/',
              phonetic: 'MIU-ciu-al in-for-MEI-scen',
              example:
                "We computed mutual information between each feature and the target to identify the strongest non-linear relationships. = Abbiamo calcolato l'informazione mutua tra ogni feature e il target per identificare le relazioni non lineari più forti.",
              context: 'data-engineering',
              difficulty: 'advanced',
              code: 'mutual_info_classif(X, y)',
            },
            {
              english: 'Chi-Squared Test',
              italian: 'Test chi quadro',
              pronunciation: '/kaɪ skweərd test/',
              phonetic: 'KAI-SKUERD-TEST',
              example:
                'For categorical features, the chi-squared test ranks them by their statistical dependence on the target variable. = Per le feature categoriche, il test chi-quadrato le classifica per la loro dipendenza statistica dalla variabile target.',
              context: 'data-engineering',
              difficulty: 'advanced',
              code: 'chi2(X, y)',
            },
            {
              english: 'Feature Importance',
              italian: 'Importanza delle feature',
              pronunciation: '/ˈfiːtʃər ɪmˈpɔːrtəns/',
              phonetic: 'FII-cer im-POR-tans',
              example:
                "The random forest's feature importance scores revealed that location alone accounted for 35% of price prediction. = I punteggi di importanza delle feature della random forest hanno rivelato che la posizione da sola rappresentava il 35% della predizione del prezzo.",
              context: 'data-engineering',
              difficulty: 'advanced',
              code: 'model.feature_importances_',
            },
            {
              english: 'Permutation Importance',
              italian: 'Importanza per permutazione',
              pronunciation: '/ˌpɜːrmjʊˈteɪʃən ɪmˈpɔːrtəns/',
              phonetic: 'per-mu-TEI-scen im-POR-tans',
              example:
                "Unlike model-specific importance, permutation importance works with any classifier by shuffling each feature and measuring accuracy drop. = A differenza dell'importanza specifica del modello, l'importanza per permutazione funziona con qualsiasi classificatore mischiando ogni feature e misurando il calo di accuratezza.",
              context: 'data-engineering',
              difficulty: 'advanced',
              code: 'permutation_importance(model, X, y)',
            },
            {
              english: 'Variance Threshold',
              italian: 'Soglia di varianza',
              pronunciation: '/ˈveəriəns ˈθreʃhoʊld/',
              phonetic: 'VER-ians TRES-hold',
              example:
                'Applying a variance threshold removed 50 constant or near-constant columns that provided zero predictive signal. = Applicare una soglia di varianza ha rimosso 50 colonne costanti o quasi costanti che non fornivano alcun segnale predittivo.',
              context: 'data-engineering',
              difficulty: 'advanced',
              code: 'VarianceThreshold(threshold=0.0)',
            },
          ],
        },
        {
          id: 'ai_features_2',
          title: 'Feature Extraction / Estrazione Feature',
          description: 'Creare nuove feature dai dati',
          items: [
            {
              english: 'Feature Extraction',
              italian: 'Estrazione di feature',
              pronunciation: '/ˈfiːtʃər ɪkˈstrækʃən/',
              phonetic: 'FII-cer ek-STRAK-scen',
              example:
                "Rather than selecting existing columns, feature extraction creates entirely new representations from raw data. = Piuttosto che selezionare colonne esistenti, l'estrazione di feature crea rappresentazioni completamente nuove dai dati grezzi.",
              context: 'data-engineering',
              difficulty: 'advanced',
            },
            {
              english: 'Polynomial Features',
              italian: 'Feature polinomiali',
              pronunciation: '/ˌpɒlɪˈnoʊmiəl ˈfiːtʃərz/',
              phonetic: 'po-li-NOU-mial FII-cers',
              example:
                'Adding polynomial features like area-squared captured the non-linear relationship between size and price. = Aggiungere feature polinomiali come area-quadrata ha catturato la relazione non lineare tra dimensione e prezzo.',
              context: 'data-engineering',
              difficulty: 'advanced',
              code: 'PolynomialFeatures(degree=2, interaction_only=True)',
            },
            {
              english: 'Binning',
              italian: 'Suddivisione in bin (Binning)',
              pronunciation: '/ˈbɪnɪŋ/',
              phonetic: 'BIN-ning',
              example:
                'We improved model robustness by applying binning to divide continuous age values into groups like young, adult, and senior. = Abbiamo migliorato la robustezza del modello applicando il binning per dividere valori continui di età in gruppi come giovane, adulto e anziano.',
              context: 'data-engineering',
              difficulty: 'advanced',
              code: 'KBinsDiscretizer(n_bins=5)',
            },
            {
              english: 'Discretization',
              italian: 'Discretizzazione',
              pronunciation: '/dɪˌskriːtəˈzeɪʃən/',
              phonetic: 'di-skri-ti-ZEI-scen',
              example:
                "Converting continuous temperature readings into discrete categories via discretization simplified the decision tree's splits. = Convertire letture di temperatura continue in categorie discrete tramite discretizzazione ha semplificato gli split dell'albero decisionale.",
              context: 'data-engineering',
              difficulty: 'advanced',
            },
            {
              english: 'Feature Crossing',
              italian: 'Incrocio di feature',
              pronunciation: '/ˈfiːtʃər ˈkrɒsɪŋ/',
              phonetic: 'FII-cer KROS-sing',
              example:
                'Creating a feature crossing of city and product type captured purchasing patterns specific to each market. = Creare un incrocio di feature di città e tipo di prodotto ha catturato pattern di acquisto specifici per ogni mercato.',
              context: 'data-engineering',
              difficulty: 'advanced',
              note: 'Esempio: latitudine x longitudine.',
            },
            {
              english: 'Date Features',
              italian: 'Feature di data',
              pronunciation: '/deɪt ˈfiːtʃərz/',
              phonetic: 'DEIT FII-cers',
              example:
                'From a single timestamp, we extracted date features like day-of-week, month, and is-holiday for demand forecasting. = Da un singolo timestamp, abbiamo estratto feature di data come giorno della settimana, mese e è-festivo per la previsione della domanda.',
              context: 'data-engineering',
              difficulty: 'advanced',
              code: 'df["weekday"] = df["date"].dt.weekday',
            },
            {
              english: 'Cyclic Encoding',
              italian: 'Codifica ciclica',
              pronunciation: '/ˈsɪklɪk ɪnˈkoʊdɪŋ/',
              phonetic: 'SIK-lik in-KOU-ding',
              example:
                'To represent hours properly, cyclic encoding maps 23:00 and 00:00 close together using sine and cosine transforms. = Per rappresentare le ore correttamente, la codifica ciclica mappa 23:00 e 00:00 vicini usando trasformate seno e coseno.',
              context: 'data-engineering',
              difficulty: 'advanced',
              code: 'sin_hour = np.sin(2*np.pi*hour/24)',
            },
            {
              english: 'Aggregation',
              italian: 'Aggregazione',
              pronunciation: '/ˌæɡrɪˈɡeɪʃən/',
              phonetic: 'a-gre-GEI-scen',
              example:
                'We computed aggregation features like average spend per customer and total orders per month from raw transactions. = Abbiamo calcolato feature di aggregazione come spesa media per cliente e ordini totali per mese dalle transazioni grezze.',
              context: 'data-engineering',
              difficulty: 'advanced',
              code: 'df.groupby("user").agg({"price": "mean"})',
            },
            {
              english: 'Lag Feature',
              italian: 'Feature di lag',
              pronunciation: '/læɡ ˈfiːtʃər/',
              phonetic: 'LAG FII-cer',
              example:
                'A 7-day lag feature lets the demand model see what happened exactly one week ago for the same product. = Una feature di ritardo a 7 giorni permette al modello di domanda di vedere cosa è successo esattamente una settimana fa per lo stesso prodotto.',
              context: 'data-engineering',
              difficulty: 'advanced',
              code: 'df["lag1"] = df["value"].shift(1)',
              note: 'Standard nelle serie temporali.',
            },
            {
              english: 'Rolling Window',
              italian: 'Finestra mobile',
              pronunciation: '/ˈroʊlɪŋ ˈwɪndoʊ/',
              phonetic: 'RO-ling UIN-dou',
              example:
                'A 30-day rolling window average smoothed out daily noise and revealed the underlying sales trend. = Una media a finestra mobile di 30 giorni ha attenuato il rumore giornaliero e rivelato il trend di vendita sottostante.',
              context: 'data-engineering',
              difficulty: 'advanced',
              code: 'df["rolling_mean"] = df["value"].rolling(7).mean()',
            },
          ],
        },
        {
          id: 'ai_features_3',
          title: 'Encoding Strategies / Strategie di Codifica',
          description: 'Trasformare categorie in numeri',
          items: [
            {
              english: 'Frequency Encoding',
              italian: 'Codifica per frequenza',
              pronunciation: '/ˈfriːkwənsi ɪnˈkoʊdɪŋ/',
              phonetic: 'FRI-kuen-si in-KOU-ding',
              example:
                'Replacing each city name with its frequency encoding counts how often each city appears in the training data. = Sostituire ogni nome di città con la sua codifica di frequenza conta quanto spesso ogni città appare nei dati di addestramento.',
              context: 'data-engineering',
              difficulty: 'advanced',
              code: 'df["cat_freq"] = df["cat"].map(df["cat"].value_counts())',
            },
            {
              english: 'Hash Encoding',
              italian: 'Codifica hash',
              pronunciation: '/hæʃ ɪnˈkoʊdɪŋ/',
              phonetic: 'HASH in-KOU-ding',
              example:
                'For user IDs with millions of unique values, hash encoding maps them to a fixed-size vector of 256 bins. = Per ID utente con milioni di valori unici, la codifica hash li mappa in un vettore a dimensione fissa di 256 bin.',
              context: 'data-engineering',
              difficulty: 'advanced',
              tool: 'category_encoders.HashingEncoder',
            },
            {
              english: 'Binary Encoding',
              italian: 'Codifica binaria',
              pronunciation: '/ˈbaɪnəri ɪnˈkoʊdɪŋ/',
              phonetic: 'BAI-na-ri in-KOU-ding',
              example:
                'With 1,000 categories, binary encoding needs only 10 columns instead of 1,000 for one-hot. = Con 1.000 categorie, la codifica binaria necessita solo 10 colonne invece di 1.000 per one-hot.',
              context: 'data-engineering',
              difficulty: 'advanced',
              note: 'Compromesso tra one-hot e label.',
            },
            {
              english: 'Leave-One-Out Encoding',
              italian: 'Codifica leave-one-out',
              pronunciation: '/liːv wʌn aʊt ɪnˈkoʊdɪŋ/',
              phonetic: 'LIV-UAN-AUT in-KOU-ding',
              example:
                'For categories with high cardinality, leave-one-out encoding computes target mean excluding the current row to avoid leakage. = Per categorie ad alta cardinalità, la codifica leave-one-out calcola la media del target escludendo la riga corrente per evitare fuga di dati.',
              context: 'data-engineering',
              difficulty: 'advanced',
              tool: 'category_encoders.LeaveOneOutEncoder',
            },
            {
              english: 'CatBoost Encoder',
              italian: 'Encoder categoriale a target (CatBoost Encoder)',
              pronunciation: '/kæt buːst ɪnˈkoʊdər/',
              phonetic: 'KAT-BUST in-KOU-der',
              example:
                "The CatBoost encoder uses an ordered target statistic that naturally prevents overfitting on rare categories. = L'encoder CatBoost usa una statistica del target ordinata che previene naturalmente il sovra-adattamento su categorie rare.",
              context: 'data-engineering',
              difficulty: 'advanced',
            },
            {
              english: 'WOE Encoding',
              italian: 'Codifica WOE',
              pronunciation: '/dʌbəl juː oʊ iː ɪnˈkoʊdɪŋ/',
              phonetic: 'DAB-bol-IU-O-I in-KOU-ding',
              example:
                "In credit scoring, WOE encoding transforms each feature bin into its Weight of Evidence relative to default rates. = Nel credit scoring, la codifica WOE trasforma ogni bin di feature nel suo Peso dell'Evidenza relativo ai tassi di default.",
              context: 'data-engineering',
              difficulty: 'advanced',
              note: 'Weight of Evidence.',
            },
            {
              english: 'James-Stein Encoder',
              italian: 'Encoder James-Stein',
              pronunciation: '/dʒeɪmz staɪn ɪnˈkoʊdər/',
              phonetic: 'GEIMS-STAIN in-KOU-der',
              example:
                "For small sample sizes, the James-Stein encoder shrinks category means toward the grand mean to reduce estimation noise. = Per campioni piccoli, l'encoder James-Stein contrae le medie delle categorie verso la media globale per ridurre il rumore di stima.",
              context: 'data-engineering',
              difficulty: 'advanced',
            },
            {
              english: 'Embedding Layer',
              italian: 'Strato di embedding',
              pronunciation: '/ɪmˈbedɪŋ ˈleɪər/',
              phonetic: 'em-BED-ding LEI-er',
              example:
                'Instead of one-hot encoding product IDs, we used a trainable embedding layer to learn dense 64-dimensional representations. = Invece della codifica one-hot degli ID prodotto, abbiamo usato uno strato di embedding addestrabile per apprendere rappresentazioni dense a 64 dimensioni.',
              context: 'data-engineering',
              difficulty: 'advanced',
              code: 'Embedding(input_dim=1000, output_dim=32)',
            },
            {
              english: 'Rare Category Grouping',
              italian: 'Raggruppamento categorie rare',
              pronunciation: '/reər ˈkætəɡəri ˈɡruːpɪŋ/',
              phonetic: 'RER ka-TE-go-ri GRU-ping',
              example:
                "Categories appearing fewer than 50 times were collapsed into an 'Other' group through rare category grouping. = Le categorie che apparivano meno di 50 volte sono state raggruppate in un gruppo 'Altro' tramite raggruppamento delle categorie rare.",
              context: 'data-engineering',
              difficulty: 'advanced',
            },
            {
              english: 'High Cardinality',
              italian: 'Alta cardinalità',
              pronunciation: '/haɪ ˌkɑːrdəˈnæləti/',
              phonetic: 'HAI kar-di-NA-li-ti',
              example:
                'Zip codes with over 40,000 unique values present a high cardinality challenge that rules out simple one-hot encoding. = I codici postali con oltre 40.000 valori unici presentano una sfida di alta cardinalità che esclude la semplice codifica one-hot.',
              context: 'data-engineering',
              difficulty: 'advanced',
              note: 'Esempio: ID utente con milioni di valori.',
            },
          ],
        },
        {
          id: 'ai_features_4',
          title: 'Domain Knowledge / Conoscenza di Dominio',
          description: 'Sfruttare conoscenza specifica',
          items: [
            {
              english: 'Domain Knowledge',
              italian: 'Conoscenza di dominio',
              pronunciation: '/doʊˈmeɪn ˈnɒlɪdʒ/',
              phonetic: 'do-MEIN NO-ligi',
              example:
                "A pharmacist's domain knowledge helped us engineer drug-interaction features that boosted the safety model's recall. = La conoscenza di dominio di un farmacista ci ha aiutato a creare feature di interazione farmacologica che hanno aumentato il richiamo del modello di sicurezza.",
              context: 'data-engineering',
              difficulty: 'advanced',
            },
            {
              english: 'Feature Crafting',
              italian: 'Creazione di feature',
              pronunciation: '/ˈfiːtʃər ˈkræftɪŋ/',
              phonetic: 'FII-cer KRAF-ting',
              example:
                'Manual feature crafting of ratios like price-per-square-meter outperformed automated feature generation on this dataset. = La creazione manuale di feature come rapporti prezzo-per-metro-quadro ha superato la generazione automatica di feature su questo dataset.',
              context: 'data-engineering',
              difficulty: 'advanced',
            },
            {
              english: 'Ratio Feature',
              italian: 'Feature di rapporto',
              pronunciation: '/ˈreɪʃoʊ ˈfiːtʃər/',
              phonetic: 'REI-scio FII-cer',
              example:
                'The debt-to-income ratio feature proved 3x more predictive than either debt or income alone. = La feature rapporto debito-reddito si è rivelata 3 volte più predittiva rispetto a debito o reddito da soli.',
              context: 'data-engineering',
              difficulty: 'advanced',
              code: 'df["price_per_sqm"] = df["price"] / df["sqm"]',
            },
            {
              english: 'Difference Feature',
              italian: 'Feature di differenza',
              pronunciation: '/ˈdɪfərəns ˈfiːtʃər/',
              phonetic: 'DIF-fe-rens FII-cer',
              example:
                'Computing the difference feature between current and previous month sales highlighted growth patterns. = Calcolare la feature differenza tra vendite del mese corrente e precedente ha evidenziato pattern di crescita.',
              context: 'data-engineering',
              difficulty: 'advanced',
              code: 'df["delta"] = df["t1"] - df["t0"]',
            },
            {
              english: 'Geospatial Feature',
              italian: 'Feature geospaziale',
              pronunciation: '/ˌdʒiːoʊˈspeɪʃəl ˈfiːtʃər/',
              phonetic: 'gi-o-SPEI-scial FII-cer',
              example:
                "Extracting the geospatial feature of distance-to-nearest-hospital improved our property valuation model. = Estrarre la feature geospaziale di distanza dall'ospedale più vicino ha migliorato il nostro modello di valutazione immobiliare.",
              context: 'data-engineering',
              difficulty: 'advanced',
            },
            {
              english: 'Text Features',
              italian: 'Feature testuali',
              pronunciation: '/tekst ˈfiːtʃərz/',
              phonetic: 'TEKST FII-cers',
              example:
                'We derived text features like word count, sentiment score, and readability index from customer reviews. = Abbiamo derivato feature testuali come conteggio parole, punteggio di sentiment e indice di leggibilità dalle recensioni dei clienti.',
              context: 'data-engineering',
              difficulty: 'advanced',
            },
            {
              english: 'Image Features',
              italian: 'Feature immagine',
              pronunciation: '/ˈɪmɪdʒ ˈfiːtʃərz/',
              phonetic: 'I-migi FII-cers',
              example:
                'The CNN backbone extracts 2,048-dimensional image features that feed into the downstream classifier. = Il backbone CNN estrae feature immagine a 2.048 dimensioni che alimentano il classificatore a valle.',
              context: 'data-engineering',
              difficulty: 'advanced',
              code: 'features = resnet50(img)',
            },
            {
              english: 'Statistical Feature',
              italian: 'Feature statistica',
              pronunciation: '/stəˈtɪstɪkəl ˈfiːtʃər/',
              phonetic: 'sta-TIS-ti-kal FII-cer',
              example:
                "Adding a statistical feature like the rolling standard deviation of sensor readings detected instability early. = Aggiungere una feature statistica come la deviazione standard mobile delle letture dei sensori ha rilevato l'instabilità precocemente.",
              context: 'data-engineering',
              difficulty: 'advanced',
              note: 'Esempi: media, varianza, percentili.',
            },
            {
              english: 'Interaction Term',
              italian: 'Termine di interazione',
              pronunciation: '/ˌɪntərˈækʃən tɜːrm/',
              phonetic: 'in-ter-AK-scen TERM',
              example:
                'Multiplying bedrooms by bathrooms to create an interaction term captured the luxury-apartment pricing pattern. = Moltiplicare camere per bagni per creare un termine di interazione ha catturato il pattern di prezzo degli appartamenti di lusso.',
              context: 'data-engineering',
              difficulty: 'advanced',
            },
            {
              english: 'Auto Feature Engineering',
              italian: 'Feature engineering automatico',
              pronunciation: '/ˈɔːtoʊ ˈfiːtʃər ˌendʒɪˈnɪrɪŋ/',
              phonetic: 'AU-tou FII-cer en-gi-NI-ring',
              example:
                "Tools like Featuretools automate auto feature engineering by synthesizing hundreds of candidate features from relational data. = Strumenti come Featuretools automatizzano l'ingegneria automatica delle feature sintetizzando centinaia di feature candidate da dati relazionali.",
              context: 'data-engineering',
              difficulty: 'advanced',
              tool: 'Featuretools, tsfresh',
            },
          ],
        },
      ],
    },
    // ════════════════════════════════════════════════
    // LEVEL 14 - IA GENERATIVA / GENERATIVE AI
    // ════════════════════════════════════════════════
    14: {
      name: 'IA Generativa / Generative AI',
      description: 'Modelli che creano contenuti',
      lessons: [
        {
          id: 'ai_generative_1',
          title: 'GANs / Reti Generative Avversarie',
          description: 'Due reti che competono',
          items: [
            {
              english: 'GAN',
              italian: 'Generative Adversarial Network (GAN)',
              pronunciation: '/ɡæn/',
              phonetic: 'GAN',
              example:
                "A GAN trains two neural networks against each other: one generates fakes, the other tries to detect them. = Una GAN addestra due reti neurali l'una contro l'altra: una genera falsi, l'altra cerca di rilevarli.",
              context: 'architectures',
              difficulty: 'advanced',
              note: 'Generative Adversarial Network.',
            },
            {
              english: 'Generator',
              italian: 'Generatore',
              pronunciation: '/ˈdʒenəreɪtər/',
              phonetic: 'GE-ne-rei-ter',
              example:
                'The generator network learns to produce increasingly realistic images by fooling the discriminator. = La rete generatore impara a produrre immagini sempre più realistiche ingannando il discriminatore.',
              context: 'architectures',
              difficulty: 'advanced',
            },
            {
              english: 'Discriminator',
              italian: 'Discriminatore',
              pronunciation: '/dɪˈskrɪmɪneɪtər/',
              phonetic: 'di-SKRI-mi-nei-ter',
              example:
                'A well-trained discriminator forces the generator to produce outputs indistinguishable from real data. = Un discriminatore ben addestrato forza il generatore a produrre output indistinguibili dai dati reali.',
              context: 'architectures',
              difficulty: 'advanced',
            },
            {
              english: 'Adversarial Training',
              italian: 'Addestramento avversario',
              pronunciation: '/ˌædvərˈseəriəl ˈtreɪnɪŋ/',
              phonetic: 'ad-ver-SE-rial TREI-ning',
              example:
                'Including adversarial examples in the training set through adversarial training improved robustness at the cost of 3% clean accuracy. = Includere esempi avversari nel set di addestramento tramite addestramento avversario ha migliorato la robustezza al costo del 3% di accuratezza pulita.',
              context: 'architectures',
              difficulty: 'advanced',
            },
            {
              english: 'Mode Collapse',
              italian: 'Collasso di modalità',
              pronunciation: '/moʊd kəˈlæps/',
              phonetic: 'MOUD ko-LAPS',
              example:
                "When the generator produces only faces with the same expression, it signals mode collapse in the GAN training. = Quando il generatore produce solo volti con la stessa espressione, segnala il collasso delle mode nell'addestramento della GAN.",
              context: 'architectures',
              difficulty: 'advanced',
              note: 'Problema classico delle GAN.',
            },
            {
              english: 'StyleGAN',
              italian: 'GAN di NVIDIA per volti realistici (StyleGAN)',
              pronunciation: '/staɪl ɡæn/',
              phonetic: 'STAIL-GAN',
              example:
                "NVIDIA's StyleGAN can generate photorealistic faces of people who do not exist, controllable by style vectors. = StyleGAN di NVIDIA può generare volti fotorealistici di persone che non esistono, controllabili tramite vettori di stile.",
              context: 'architectures',
              difficulty: 'advanced',
            },
            {
              english: 'CycleGAN',
              italian: 'Traduzione immagine-immagine non accoppiata (CycleGAN)',
              pronunciation: '/ˈsaɪkəl ɡæn/',
              phonetic: 'SAI-kel-GAN',
              example:
                'Artists use CycleGAN to transform photographs into paintings and back without needing paired training examples. = Gli artisti usano CycleGAN per trasformare fotografie in dipinti e viceversa senza bisogno di esempi di addestramento accoppiati.',
              context: 'architectures',
              difficulty: 'advanced',
            },
            {
              english: 'Conditional GAN',
              italian: 'GAN condizionale',
              pronunciation: '/kənˈdɪʃənəl ɡæn/',
              phonetic: 'kon-DI-scio-nal GAN',
              example:
                'By conditioning on class labels, a conditional GAN generates specific digits, faces, or object categories on demand. = Condizionando su etichette di classe, una GAN condizionale genera cifre, volti o categorie di oggetti specifici su richiesta.',
              context: 'architectures',
              difficulty: 'advanced',
              note: 'Abbreviata cGAN.',
            },
            {
              english: 'Wasserstein GAN',
              italian: 'GAN di Wasserstein',
              pronunciation: '/ˈvɑːsərʃtaɪn ɡæn/',
              phonetic: 'VAS-ser-stain GAN',
              example:
                'The Wasserstein GAN uses earth-mover distance instead of JS divergence, leading to more stable training. = La GAN di Wasserstein usa la distanza earth-mover invece della divergenza JS, portando a un addestramento più stabile.',
              context: 'architectures',
              difficulty: 'advanced',
            },
            {
              english: 'Inception Score',
              italian: 'Metrica qualità GAN (Inception Score)',
              pronunciation: '/ɪnˈsepʃən skɔːr/',
              phonetic: 'in-SEP-scen SKOR',
              example:
                'A higher inception score indicates that generated images are both sharp and diverse across categories. = Un punteggio inception più alto indica che le immagini generate sono sia nitide che diverse tra le categorie.',
              context: 'architectures',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'ai_generative_2',
          title: 'VAEs & Latent Models / VAE e Modelli Latenti',
          description: 'Generazione tramite spazio latente',
          items: [
            {
              english: 'VAE',
              italian: 'Variational Autoencoder (VAE)',
              pronunciation: '/viː eɪ iː/',
              phonetic: 'VI-EI-I',
              example:
                'A VAE learns a smooth latent space where nearby points decode into similar images, enabling meaningful interpolation. = Un VAE impara uno spazio latente liscio dove punti vicini decodificano in immagini simili, abilitando interpolazione significativa.',
              context: 'architectures',
              difficulty: 'advanced',
              note: 'Variational Autoencoder.',
            },
            {
              english: 'Latent Space',
              italian: 'Spazio latente',
              pronunciation: '/ˈleɪtənt speɪs/',
              phonetic: 'LEI-tent SPEIS',
              example:
                'Walking through the latent space of a face model smoothly transitions between expressions, ages, and genders. = Camminare nello spazio latente di un modello di volti transisce fluidamente tra espressioni, età e generi.',
              context: 'architectures',
              difficulty: 'advanced',
            },
            {
              english: 'Encoder Network',
              italian: 'Rete encoder',
              pronunciation: '/ɪnˈkoʊdər ˈnetwɜːrk/',
              phonetic: 'en-KOU-der NET-uerk',
              example:
                "The encoder network compresses a 256x256 face image into a compact 512-dimensional latent vector. = La rete encoder comprime un'immagine di volto 256x256 in un vettore latente compatto a 512 dimensioni.",
              context: 'architectures',
              difficulty: 'advanced',
            },
            {
              english: 'Reparameterization Trick',
              italian: 'Trucco di riparametrizzazione',
              pronunciation: '/ˌriːpəˌræmɪtəraɪˈzeɪʃən trɪk/',
              phonetic: 'ri-pa-ra-me-tra-ai-ZEI-scen TRIK',
              example:
                'The reparameterization trick lets gradients flow through random sampling by rewriting noise as an external input. = Il trucco della riparametrizzazione permette ai gradienti di fluire attraverso il campionamento casuale riscrivendo il rumore come input esterno.',
              context: 'architectures',
              difficulty: 'advanced',
              note: 'Z = mu + sigma * epsilon.',
            },
            {
              english: 'KL Divergence Loss',
              italian: 'Loss di divergenza KL',
              pronunciation: '/keɪ el dɪˈvɜːrdʒəns lɒs/',
              phonetic: 'KEI-EL di-VER-gens LOS',
              example:
                'Balancing reconstruction quality against KL divergence loss controls how closely the latent space matches a Gaussian prior. = Bilanciare la qualità di ricostruzione con la loss di divergenza KL controlla quanto lo spazio latente corrisponde a un prior gaussiano.',
              context: 'architectures',
              difficulty: 'advanced',
            },
            {
              english: 'Reconstruction Loss',
              italian: 'Loss di ricostruzione',
              pronunciation: '/ˌriːkənˈstrʌkʃən lɒs/',
              phonetic: 'ri-kon-STRAK-scen LOS',
              example:
                "A high reconstruction loss means the decoder is failing to reproduce the original input from its latent code. = Una loss di ricostruzione alta significa che il decoder non riesce a riprodurre l'input originale dal suo codice latente.",
              context: 'architectures',
              difficulty: 'advanced',
            },
            {
              english: 'Latent Interpolation',
              italian: 'Interpolazione latente',
              pronunciation: '/ˈleɪtənt ɪnˌtɜːrpəˈleɪʃən/',
              phonetic: 'LEI-tent in-ter-po-LEI-scen',
              example:
                "By performing latent interpolation between two face embeddings, we generated a smooth morphing animation. = Eseguendo l'interpolazione latente tra due embedding di volti, abbiamo generato un'animazione di morphing fluida.",
              context: 'architectures',
              difficulty: 'advanced',
            },
            {
              english: 'Beta-VAE',
              italian: 'VAE con peso KL regolato (Beta-VAE)',
              pronunciation: '/ˈbeɪtə viː eɪ iː/',
              phonetic: 'BE-ta VI-EI-I',
              example:
                'Increasing the beta parameter in a Beta-VAE encourages more disentangled latent representations at the cost of reconstruction quality. = Aumentare il parametro beta in un Beta-VAE incoraggia rappresentazioni latenti più disentangled al costo della qualità di ricostruzione.',
              context: 'architectures',
              difficulty: 'advanced',
            },
            {
              english: 'Disentanglement',
              italian: 'Separazione fattori di variazione (Disentanglement)',
              pronunciation: '/dɪˌsɛnˈtæŋɡəlmənt/',
              phonetic: 'di-sen-TAN-gel-ment',
              example:
                'Good disentanglement means each latent dimension controls a single factor like hair color, pose, or lighting. = Un buon disentanglement significa che ogni dimensione latente controlla un singolo fattore come colore dei capelli, posa o illuminazione.',
              context: 'architectures',
              difficulty: 'advanced',
              note: 'Termine sempre lasciato in inglese.',
            },
            {
              english: 'Normalizing Flow',
              italian: 'Flusso di trasformazioni invertibili (Normalizing Flow)',
              pronunciation: '/ˈnɔːrməlaɪzɪŋ floʊ/',
              phonetic: 'NOR-ma-lai-zing FLOU',
              example:
                'Unlike VAEs, a normalizing flow model computes exact log-likelihoods using invertible transformations. = A differenza dei VAE, un modello a flusso normalizzante calcola log-likelihood esatte usando trasformazioni invertibili.',
              context: 'architectures',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'ai_generative_3',
          title: 'Diffusion Models / Modelli a Diffusione',
          description: 'Generazione tramite denoising',
          items: [
            {
              english: 'Diffusion Model',
              italian: 'Modello a diffusione',
              pronunciation: '/dɪˈfjuːʒən ˈmɒdəl/',
              phonetic: 'di-FIU-gen MO-del',
              example:
                "State-of-the-art image generation now relies on a diffusion model that iteratively denoises random Gaussian noise into images. = La generazione di immagini all'avanguardia ora si basa su un modello di diffusione che denoisa iterativamente rumore gaussiano in immagini.",
              context: 'architectures',
              difficulty: 'advanced',
              note: "Stato dell'arte per generazione di immagini.",
            },
            {
              english: 'Forward Process',
              italian: 'Processo in avanti',
              pronunciation: '/ˈfɔːrwərd ˈprɒses/',
              phonetic: 'FOR-uerd PRO-ses',
              example:
                "In the forward process, Gaussian noise is progressively added to the training image over 1,000 time steps. = Nel processo in avanti, rumore gaussiano viene progressivamente aggiunto all'immagine di addestramento su 1.000 passi temporali.",
              context: 'architectures',
              difficulty: 'advanced',
            },
            {
              english: 'Reverse Process',
              italian: 'Processo inverso',
              pronunciation: '/rɪˈvɜːrs ˈprɒses/',
              phonetic: 'ri-VERS PRO-ses',
              example:
                "The neural network learns the reverse process: predicting and removing noise step by step to recover a clean image. = La rete neurale impara il processo inverso: predire e rimuovere il rumore passo per passo per recuperare un'immagine pulita.",
              context: 'architectures',
              difficulty: 'advanced',
            },
            {
              english: 'Stable Diffusion',
              italian: 'Modello text-to-image open (Stable Diffusion)',
              pronunciation: '/ˈsteɪbəl dɪˈfjuːʒən/',
              phonetic: 'STEI-bel di-FIU-gen',
              example:
                'Open-source Stable Diffusion generates high-resolution images from text prompts on consumer-grade GPUs. = Stable Diffusion open-source genera immagini ad alta risoluzione da prompt testuali su GPU consumer.',
              context: 'architectures',
              difficulty: 'advanced',
              tool: 'diffusers',
            },
            {
              english: 'DALL-E',
              italian: 'Modello text-to-image OpenAI (DALL-E)',
              pronunciation: '/ˈdɑːli/',
              phonetic: 'DAL-li',
              example:
                "OpenAI's DALL-E generates creative images from natural language descriptions like 'an astronaut riding a horse on Mars'. = DALL-E di OpenAI genera immagini creative da descrizioni in linguaggio naturale come 'un astronauta a cavallo su Marte'.",
              context: 'architectures',
              difficulty: 'advanced',
              tool: 'OpenAI DALL-E',
            },
            {
              english: 'Midjourney',
              italian: 'Modello text-to-image commerciale (Midjourney)',
              pronunciation: '/mɪdˈdʒɜːrni/',
              phonetic: 'mid-GIER-ni',
              example:
                'Designers use Midjourney to rapidly prototype visual concepts before investing in full production artwork. = I designer usano Midjourney per prototipare rapidamente concetti visivi prima di investire in artwork di produzione completo.',
              context: 'architectures',
              difficulty: 'advanced',
              tool: 'Midjourney',
            },
            {
              english: 'Denoising',
              italian: 'Rimozione del rumore (Denoising)',
              pronunciation: '/diːˈnɔɪzɪŋ/',
              phonetic: 'di-NOI-zing',
              example:
                "Each step of the diffusion model performs denoising, gradually transforming static into a coherent image. = Ogni passo del modello di diffusione esegue il denoising, trasformando gradualmente il rumore in un'immagine coerente.",
              context: 'architectures',
              difficulty: 'advanced',
            },
            {
              english: 'Sampling Steps',
              italian: 'Passi di campionamento',
              pronunciation: '/ˈsæmplɪŋ steps/',
              phonetic: 'SAM-pling STEPS',
              example:
                'Reducing sampling steps from 50 to 20 cuts generation time in half with only a slight quality drop. = Ridurre i passi di campionamento da 50 a 20 dimezza il tempo di generazione con solo un lieve calo di qualità.',
              context: 'architectures',
              difficulty: 'advanced',
              note: 'Tipicamente 20-50 passi.',
            },
            {
              english: 'Classifier-Free Guidance',
              italian: 'Guidance senza classificatore',
              pronunciation: '/ˈklæsɪfaɪər friː ˈɡaɪdəns/',
              phonetic: 'KLA-si-fai-er FRI GAI-dans',
              example:
                'Increasing classifier-free guidance strength produces images that follow the text prompt more closely but with less diversity. = Aumentare la forza del guidance senza classificatore produce immagini che seguono il prompt più fedelmente ma con meno diversità.',
              context: 'architectures',
              difficulty: 'advanced',
              code: 'guidance_scale=7.5',
            },
            {
              english: 'ControlNet',
              italian: 'Controllo condizionato di Stable Diffusion (ControlNet)',
              pronunciation: '/kənˈtroʊl net/',
              phonetic: 'kon-TROL-NET',
              example:
                'With ControlNet, artists can guide image generation using edge maps, depth maps, or pose skeletons as spatial constraints. = Con ControlNet, gli artisti possono guidare la generazione di immagini usando mappe di bordi, mappe di profondità o scheletri di posa come vincoli spaziali.',
              context: 'architectures',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'ai_generative_4',
          title: "Generative Use Cases / Casi d'Uso Generativi",
          description: "Applicazioni dell'IA generativa",
          items: [
            {
              english: 'Text Generation',
              italian: 'Generazione di testo',
              pronunciation: '/tekst ˌdʒenəˈreɪʃən/',
              phonetic: 'TEKST gen-ne-REI-scen',
              example:
                'Modern text generation models can produce coherent articles, code, and even poetry in multiple languages. = I modelli moderni di generazione testo possono produrre articoli coerenti, codice e persino poesia in più lingue.',
              context: 'architectures',
              difficulty: 'advanced',
            },
            {
              english: 'Image Generation',
              italian: 'Generazione di immagini',
              pronunciation: '/ˈɪmɪdʒ ˌdʒenəˈreɪʃən/',
              phonetic: 'I-migi gen-ne-REI-scen',
              example:
                'Our product team uses AI image generation to create thousands of marketing visuals without a photo shoot. = Il nostro team prodotto usa la generazione di immagini IA per creare migliaia di visual marketing senza un servizio fotografico.',
              context: 'architectures',
              difficulty: 'advanced',
            },
            {
              english: 'Text-to-Image',
              italian: 'Testo-a-immagine',
              pronunciation: '/tekst tuː ˈɪmɪdʒ/',
              phonetic: 'TEKST-TU-I-migi',
              example:
                'Users describe what they want in plain English, and the text-to-image model renders it in seconds. = Gli utenti descrivono ciò che vogliono in inglese semplice, e il modello text-to-image lo renderizza in secondi.',
              context: 'architectures',
              difficulty: 'advanced',
            },
            {
              english: 'Image-to-Image',
              italian: 'Immagine-a-immagine',
              pronunciation: '/ˈɪmɪdʒ tuː ˈɪmɪdʒ/',
              phonetic: 'I-migi-TU-I-migi',
              example:
                'The design team uses image-to-image translation to convert rough sketches into polished product renders. = Il team di design usa la traduzione image-to-image per convertire bozzetti grezzi in rendering di prodotto rifiniti.',
              context: 'architectures',
              difficulty: 'advanced',
            },
            {
              english: 'Audio Generation',
              italian: 'Generazione audio',
              pronunciation: '/ˈɔːdioʊ ˌdʒenəˈreɪʃən/',
              phonetic: 'AU-dio gen-ne-REI-scen',
              example:
                'AI audio generation models can now produce realistic voice narration from text in over 30 languages. = I modelli di generazione audio IA possono ora produrre narrazione vocale realistica dal testo in oltre 30 lingue.',
              context: 'architectures',
              difficulty: 'advanced',
              tool: 'MusicLM, AudioLDM',
            },
            {
              english: 'Video Generation',
              italian: 'Generazione video',
              pronunciation: '/ˈvɪdioʊ ˌdʒenəˈreɪʃən/',
              phonetic: 'VI-di-o gen-ne-REI-scen',
              example:
                'Early video generation models produce short clips, but quality is improving rapidly with each new release. = I primi modelli di generazione video producono clip brevi, ma la qualità migliora rapidamente con ogni nuova versione.',
              context: 'architectures',
              difficulty: 'advanced',
              tool: 'Sora, Runway',
            },
            {
              english: 'Code Generation',
              italian: 'Generazione di codice',
              pronunciation: '/koʊd ˌdʒenəˈreɪʃən/',
              phonetic: 'KOUD gen-ne-REI-scen',
              example:
                "GitHub Copilot uses code generation to suggest entire functions based on a developer's comments and context. = GitHub Copilot usa la generazione di codice per suggerire intere funzioni basandosi sui commenti e il contesto dello sviluppatore.",
              context: 'architectures',
              difficulty: 'advanced',
              tool: 'GitHub Copilot, Codeium',
            },
            {
              english: 'Synthetic Data',
              italian: 'Dati sintetici',
              pronunciation: '/sɪnˈθetɪk ˈdeɪtə/',
              phonetic: 'sin-TE-tik DEI-ta',
              example:
                'When real patient data is unavailable due to privacy, synthetic data preserves statistical patterns without exposing individuals. = Quando i dati reali dei pazienti non sono disponibili per privacy, i dati sintetici preservano pattern statistici senza esporre individui.',
              context: 'architectures',
              difficulty: 'advanced',
              note: 'Utile quando i dati reali sono scarsi o sensibili.',
            },
            {
              english: 'Deepfake',
              italian: 'Video falso generato (Deepfake)',
              pronunciation: '/ˈdiːpfeɪk/',
              phonetic: 'DIP-feik',
              example:
                'Organizations train detection systems to spot deepfake videos that could be used for fraud or misinformation. = Le organizzazioni addestrano sistemi di rilevamento per individuare video deepfake che potrebbero essere usati per frode o disinformazione.',
              context: 'architectures',
              difficulty: 'advanced',
              note: 'Solleva problemi etici importanti.',
            },
            {
              english: 'Watermarking',
              italian: 'Marcatura invisibile (Watermarking)',
              pronunciation: '/ˈwɔːtərˌmɑːrkɪŋ/',
              phonetic: 'UO-ter-MAR-king',
              example:
                "AI companies embed invisible watermarking in generated images to track provenance and detect misuse. = Le aziende di IA incorporano watermarking invisibile nelle immagini generate per tracciare la provenienza e rilevare l'uso improprio.",
              context: 'architectures',
              difficulty: 'advanced',
            },
          ],
        },
      ],
    },
    // ════════════════════════════════════════════════
    // LEVEL 15 - MLOPS
    // ════════════════════════════════════════════════
    15: {
      name: 'MLOps',
      description: 'Operazioni e ciclo di vita dei modelli ML',
      lessons: [
        {
          id: 'ai_mlops_1',
          title: 'Experiment Tracking / Tracciamento Esperimenti',
          description: 'Tenere traccia dei risultati ML',
          items: [
            {
              english: 'MLOps',
              italian: 'DevOps per ML (MLOps)',
              pronunciation: '/em el ɒps/',
              phonetic: 'EM-EL-OPS',
              example:
                "Mature MLOps practices automate the entire lifecycle from data ingestion through model serving and monitoring. = Pratiche MLOps mature automatizzano l'intero ciclo di vita dall'ingestione dati al serving e monitoraggio del modello.",
              context: 'mlops',
              difficulty: 'advanced',
            },
            {
              english: 'Experiment Tracking',
              italian: 'Tracciamento esperimenti',
              pronunciation: '/ɪkˈsperɪmənt ˈtrækɪŋ/',
              phonetic: 'ek-SPE-ri-ment TRA-king',
              example:
                'Without proper experiment tracking, teams lose track of which hyperparameters produced the best model. = Senza un tracciamento degli esperimenti adeguato, i team perdono traccia di quali iperparametri hanno prodotto il modello migliore.',
              context: 'mlops',
              difficulty: 'advanced',
              tool: 'MLflow, W&B, Neptune',
            },
            {
              english: 'MLflow',
              italian: 'Tracker esperimenti (MLflow)',
              pronunciation: '/em el floʊ/',
              phonetic: 'EM-EL-FLOU',
              example:
                'We use MLflow to log every training run with its parameters, metrics, and model artifacts for full reproducibility. = Usiamo MLflow per registrare ogni run di addestramento con parametri, metriche e artefatti del modello per piena riproducibilità.',
              context: 'mlops',
              difficulty: 'advanced',
              code: 'mlflow.log_metric("accuracy", 0.95)',
              tool: 'MLflow',
            },
            {
              english: 'Weights and Biases',
              italian: 'Weights & Biases (piattaforma tracking ML)',
              pronunciation: '/weɪts ænd ˈbaɪəsɪz/',
              phonetic: 'UEITS-end-BAI-as-iz',
              example:
                'Our research team logs training curves and GPU utilization to Weights and Biases for real-time experiment comparison. = Il nostro team di ricerca registra curve di addestramento e utilizzo GPU su Weights and Biases per il confronto degli esperimenti in tempo reale.',
              context: 'mlops',
              difficulty: 'advanced',
              tool: 'wandb',
              note: 'Abbreviato W&B.',
            },
            {
              english: 'Run',
              italian: 'Esecuzione tracciata (Run)',
              pronunciation: '/rʌn/',
              phonetic: 'RAN',
              example:
                'Each training run is assigned a unique ID linking its code version, data snapshot, and resulting model artifact. = Ogni run di addestramento riceve un ID unico che collega versione del codice, snapshot dei dati e artefatto del modello risultante.',
              context: 'mlops',
              difficulty: 'advanced',
              code: 'with mlflow.start_run():',
            },
            {
              english: 'Artifact',
              italian: 'Artefatto',
              pronunciation: '/ˈɑːrtɪfækt/',
              phonetic: 'AR-ti-fakt',
              example:
                "After training, the model weights file is stored as a versioned artifact alongside its training configuration. = Dopo l'addestramento, il file dei pesi del modello è archiviato come artefatto versionato insieme alla sua configurazione di addestramento.",
              context: 'mlops',
              difficulty: 'advanced',
            },
            {
              english: 'Metric Logging',
              italian: 'Registrazione metriche',
              pronunciation: '/ˈmetrɪk ˈlɒɡɪŋ/',
              phonetic: 'ME-trik LOG-ging',
              example:
                'Automated metric logging captures loss, accuracy, and latency at every epoch for post-hoc comparison. = Il logging automatico delle metriche cattura loss, accuratezza e latenza a ogni epoca per il confronto successivo.',
              context: 'mlops',
              difficulty: 'advanced',
              code: 'wandb.log({"loss": loss, "acc": acc})',
            },
            {
              english: 'Hyperparameter Logging',
              italian: 'Registrazione iperparametri',
              pronunciation: '/ˈhaɪpərpəˈræmɪtər ˈlɒɡɪŋ/',
              phonetic: 'HAI-per-pa-RA-me-ter LOG-ging',
              example:
                'Thanks to hyperparameter logging, we traced a regression to a learning rate change made three weeks earlier. = Grazie al logging degli iperparametri, abbiamo tracciato una regressione a un cambio di learning rate fatto tre settimane prima.',
              context: 'mlops',
              difficulty: 'advanced',
            },
            {
              english: 'Reproducibility',
              italian: 'Riproducibilità',
              pronunciation: '/ˌriːprəˌdjuːsəˈbɪləti/',
              phonetic: 'ri-pro-du-si-BI-li-ti',
              example:
                'Fixing the random seed and pinning library versions improved reproducibility so that every team member got identical results. = Fissare il seed casuale e pinnare le versioni delle librerie ha migliorato la riproducibilità così che ogni membro del team ottenesse risultati identici.',
              context: 'mlops',
              difficulty: 'advanced',
              note: 'Salva seed, versioni di librerie, codice e dati.',
            },
            {
              english: 'Sweep',
              italian: 'Ricerca iperparametri (Sweep)',
              pronunciation: '/swiːp/',
              phonetic: 'SUIP',
              example:
                'A hyperparameter sweep over 200 configurations found that batch size 128 with learning rate 1e-4 was optimal. = Uno sweep di iperparametri su 200 configurazioni ha trovato che batch size 128 con learning rate 1e-4 era ottimale.',
              context: 'mlops',
              difficulty: 'advanced',
              code: 'wandb.agent(sweep_id, train_func)',
            },
          ],
        },
        {
          id: 'ai_mlops_2',
          title: 'Model Registry / Registro Modelli',
          description: 'Gestire le versioni dei modelli',
          items: [
            {
              english: 'Model Registry',
              italian: 'Registro dei modelli',
              pronunciation: '/ˈmɒdəl ˈredʒɪstri/',
              phonetic: 'MO-del RE-gi-stri',
              example:
                "The model registry tracks which model version is currently deployed in production and who approved it. = Il registro del modello traccia quale versione è attualmente deployata in produzione e chi l'ha approvata.",
              context: 'mlops',
              difficulty: 'advanced',
              tool: 'MLflow Registry, Sagemaker Registry',
            },
            {
              english: 'Model Version',
              italian: 'Versione del modello',
              pronunciation: '/ˈmɒdəl ˈvɜːrʒən/',
              phonetic: 'MO-del VER-gen',
              example:
                "Rolling back to model version 3.2 immediately fixed the accuracy drop introduced by the latest release. = Fare rollback alla versione 3.2 del modello ha immediatamente risolto il calo di accuratezza introdotto dall'ultimo rilascio.",
              context: 'mlops',
              difficulty: 'advanced',
            },
            {
              english: 'Model Stage',
              italian: 'Stadio del modello',
              pronunciation: '/ˈmɒdəl steɪdʒ/',
              phonetic: 'MO-del STEIGI',
              example:
                'Our workflow moves each model through three stages: development, staging with shadow traffic, and production. = Il nostro workflow muove ogni modello attraverso tre fasi: sviluppo, staging con traffico ombra e produzione.',
              context: 'mlops',
              difficulty: 'advanced',
              note: 'Stadi tipici: None, Staging, Production, Archived.',
            },
            {
              english: 'Model Lineage',
              italian: 'Lineage del modello',
              pronunciation: '/ˈmɒdəl ˈlɪniɪdʒ/',
              phonetic: 'MO-del LI-ni-igi',
              example:
                'Complete model lineage lets auditors trace any prediction back to the exact training data and code used. = La lineage completa del modello permette agli auditor di tracciare ogni predizione ai dati di addestramento e codice esatti usati.',
              context: 'mlops',
              difficulty: 'advanced',
              note: 'Include dati, codice, iperparametri.',
            },
            {
              english: 'Model Card',
              italian: 'Scheda informativa del modello (Model Card)',
              pronunciation: '/ˈmɒdəl kɑːrd/',
              phonetic: 'MO-del KARD',
              example:
                'Every published model includes a model card documenting its intended use, limitations, and evaluation results. = Ogni modello pubblicato include una scheda modello che documenta uso previsto, limitazioni e risultati di valutazione.',
              context: 'mlops',
              difficulty: 'advanced',
              note: 'Standard introdotto da Google AI.',
            },
            {
              english: 'Versioning',
              italian: 'Versionamento',
              pronunciation: '/ˈvɜːrʒənɪŋ/',
              phonetic: 'VER-gio-ning',
              example:
                'Without proper versioning, it is impossible to reproduce past results when data or code changes. = Senza un versionamento adeguato, è impossibile riprodurre risultati passati quando dati o codice cambiano.',
              context: 'mlops',
              difficulty: 'advanced',
            },
            {
              english: 'DVC',
              italian: 'Data Version Control (DVC)',
              pronunciation: '/diː viː siː/',
              phonetic: 'DI-VI-SI',
              example:
                'We use DVC to version large training datasets alongside our Git-tracked code and configuration files. = Usiamo DVC per versionare grandi dataset di addestramento insieme al codice e ai file di configurazione tracciati con Git.',
              context: 'mlops',
              difficulty: 'advanced',
              tool: 'DVC',
              note: 'Data Version Control.',
            },
            {
              english: 'Git LFS',
              italian: 'Gestione file di grandi dimensioni (Git LFS)',
              pronunciation: '/ɡɪt el ef es/',
              phonetic: 'GIT-EL-EF-ES',
              example:
                'Binary model weights are stored via Git LFS to avoid bloating the main repository with large files. = I pesi binari del modello sono archiviati tramite Git LFS per evitare di appesantire il repository principale con file grandi.',
              context: 'mlops',
              difficulty: 'advanced',
              tool: 'git-lfs',
              note: 'Large File Storage.',
            },
            {
              english: 'Model Promotion',
              italian: 'Promozione del modello',
              pronunciation: '/ˈmɒdəl prəˈmoʊʃən/',
              phonetic: 'MO-del pro-MOU-scen',
              example:
                'After passing all integration tests, model promotion moves the candidate from staging to production. = Dopo aver superato tutti i test di integrazione, la promozione del modello sposta il candidato dallo staging alla produzione.',
              context: 'mlops',
              difficulty: 'advanced',
            },
            {
              english: 'Approval Workflow',
              italian: 'Workflow di approvazione',
              pronunciation: '/əˈpruːvəl ˈwɜːrkfloʊ/',
              phonetic: 'a-PRU-val UERK-flou',
              example:
                'Our approval workflow requires sign-off from both the ML team lead and a domain expert before any production deployment. = Il nostro workflow di approvazione richiede il via libera sia dal team lead ML che da un esperto di dominio prima di ogni deploy in produzione.',
              context: 'mlops',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'ai_mlops_3',
          title: 'ML Pipelines / Pipeline ML',
          description: 'Automatizzare il ciclo di vita ML',
          items: [
            {
              english: 'ML Pipeline',
              italian: 'Pipeline ML',
              pronunciation: '/em el ˈpaɪplaɪn/',
              phonetic: 'EM-EL PAIP-lain',
              example:
                'The automated ML pipeline runs nightly: it ingests new data, retrains the model, and reports metrics. = La pipeline ML automatizzata gira ogni notte: acquisisce nuovi dati, riaddestra il modello e riporta le metriche.',
              context: 'mlops',
              difficulty: 'advanced',
              tool: 'Kubeflow, Airflow, Prefect',
            },
            {
              english: 'Orchestration',
              italian: 'Orchestrazione',
              pronunciation: '/ˌɔːrkəˈstreɪʃən/',
              phonetic: 'or-ke-STREI-scen',
              example:
                "Apache Airflow handles orchestration of our ML pipeline, scheduling each step and managing dependencies. = Apache Airflow gestisce l'orchestrazione della nostra pipeline ML, pianificando ogni passo e gestendo le dipendenze.",
              context: 'mlops',
              difficulty: 'advanced',
            },
            {
              english: 'Airflow',
              italian: 'Apache Airflow (orchestratore workflow)',
              pronunciation: '/ˈeərfloʊ/',
              phonetic: 'ER-flou',
              example:
                'We defined each stage of our pipeline as a task in an Airflow DAG with clear dependency arrows. = Abbiamo definito ogni fase della nostra pipeline come task in un DAG Airflow con frecce di dipendenza chiare.',
              context: 'mlops',
              difficulty: 'advanced',
              tool: 'Apache Airflow',
            },
            {
              english: 'DAG',
              italian: 'Grafo aciclico diretto (DAG)',
              pronunciation: '/dæɡ/',
              phonetic: 'DAG',
              example:
                "The pipeline's DAG ensures data validation runs before training, and training completes before evaluation. = Il DAG della pipeline assicura che la validazione dei dati giri prima dell'addestramento, e l'addestramento si completi prima della valutazione.",
              context: 'mlops',
              difficulty: 'advanced',
              note: 'Directed Acyclic Graph.',
            },
            {
              english: 'Kubeflow',
              italian: 'ML su Kubernetes (Kubeflow)',
              pronunciation: '/ˈkuːbəfloʊ/',
              phonetic: 'KU-be-flou',
              example:
                'Running on Kubernetes, Kubeflow orchestrates distributed training jobs with automatic resource allocation. = Eseguendo su Kubernetes, Kubeflow orchestra job di addestramento distribuito con allocazione automatica delle risorse.',
              context: 'mlops',
              difficulty: 'advanced',
              tool: 'Kubeflow Pipelines',
            },
            {
              english: 'Pipeline Component',
              italian: 'Componente di pipeline',
              pronunciation: '/ˈpaɪplaɪn kəmˈpoʊnənt/',
              phonetic: 'PAIP-lain kom-PO-nent',
              example:
                'Each pipeline component is containerized independently, making it easy to swap a new preprocessing step. = Ogni componente della pipeline è containerizzato indipendentemente, rendendo facile sostituire un nuovo passo di preprocessing.',
              context: 'mlops',
              difficulty: 'advanced',
            },
            {
              english: 'Continuous Training',
              italian: 'Addestramento continuo',
              pronunciation: '/kənˈtɪnjuəs ˈtreɪnɪŋ/',
              phonetic: 'kon-TI-niu-os TREI-ning',
              example:
                "With continuous training enabled, the model automatically retrains whenever a significant data drift is detected. = Con l'addestramento continuo abilitato, il modello si riaddestra automaticamente ogni volta che viene rilevata una deviazione significativa dei dati.",
              context: 'mlops',
              difficulty: 'advanced',
              note: 'Abbreviato CT.',
            },
            {
              english: 'CI/CD for ML',
              italian: 'CI/CD per ML',
              pronunciation: '/siː aɪ siː diː fər em el/',
              phonetic: 'SI-AI-SI-DI for EM-EL',
              example:
                "Our CI/CD for ML pipeline runs unit tests on feature code, validates data schemas, and benchmarks model accuracy. = La nostra pipeline CI/CD per ML esegue test unitari sul codice delle feature, valida gli schemi dati e misura l'accuratezza del modello.",
              context: 'mlops',
              difficulty: 'advanced',
              tool: 'GitHub Actions, GitLab CI',
            },
            {
              english: 'Trigger',
              italian: 'Evento scatenante (Trigger)',
              pronunciation: '/ˈtrɪɡər/',
              phonetic: 'TRI-ger',
              example:
                'A new batch of labeled data arriving in S3 acts as a trigger for the automated retraining pipeline. = Un nuovo batch di dati etichettati in arrivo su S3 funge da trigger per la pipeline di riaddestramento automatizzato.',
              context: 'mlops',
              difficulty: 'advanced',
            },
            {
              english: 'Pipeline Step',
              italian: 'Step di pipeline',
              pronunciation: '/ˈpaɪplaɪn step/',
              phonetic: 'PAIP-lain STEP',
              example:
                "If any pipeline step fails, the orchestrator sends an alert and prevents downstream steps from executing. = Se un qualsiasi passo della pipeline fallisce, l'orchestratore invia un allarme e impedisce ai passi successivi di eseguire.",
              context: 'mlops',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'ai_mlops_4',
          title: 'Monitoring & Drift / Monitoraggio e Deriva',
          description: 'Sorvegliare modelli in produzione',
          items: [
            {
              english: 'Model Monitoring',
              italian: 'Monitoraggio del modello',
              pronunciation: '/ˈmɒdəl ˈmɒnɪtərɪŋ/',
              phonetic: 'MO-del MO-ni-to-ring',
              example:
                'Production model monitoring tracks prediction distributions, latency, and error rates around the clock. = Il monitoraggio del modello in produzione traccia distribuzioni delle predizioni, latenza e tassi di errore 24 ore su 24.',
              context: 'mlops',
              difficulty: 'advanced',
              tool: 'Evidently, Whylogs',
            },
            {
              english: 'Data Drift',
              italian: 'Deriva dei dati',
              pronunciation: '/ˈdeɪtə drɪft/',
              phonetic: 'DEI-ta DRIFT',
              example:
                "When customer demographics shifted post-pandemic, data drift caused our churn model's accuracy to drop 12%. = Quando la demografia dei clienti è cambiata dopo la pandemia, la deviazione dei dati ha causato un calo del 12% nell'accuratezza del nostro modello di churn.",
              context: 'mlops',
              difficulty: 'advanced',
              note: 'Detta anche covariate shift.',
            },
            {
              english: 'Concept Drift',
              italian: 'Deriva del concetto',
              pronunciation: '/ˈkɒnsept drɪft/',
              phonetic: 'KON-sept DRIFT',
              example:
                'Unlike data drift, concept drift means the true relationship between inputs and outputs has fundamentally changed. = A differenza della deviazione dei dati, la deviazione concettuale significa che la vera relazione tra input e output è fondamentalmente cambiata.',
              context: 'mlops',
              difficulty: 'advanced',
            },
            {
              english: 'Performance Decay',
              italian: 'Decadimento delle prestazioni',
              pronunciation: '/pərˈfɔːrməns dɪˈkeɪ/',
              phonetic: 'per-FOR-mans di-KEI',
              example:
                'Without retraining, most production models show measurable performance decay within three to six months. = Senza riaddestramento, la maggior parte dei modelli in produzione mostra un decadimento misurabile delle prestazioni entro tre-sei mesi.',
              context: 'mlops',
              difficulty: 'advanced',
            },
            {
              english: 'Population Stability Index',
              italian: 'Indice di stabilità della popolazione',
              pronunciation: '/ˌpɒpjʊˈleɪʃən stəˈbɪləti ˈɪndeks/',
              phonetic: 'po-piu-LEI-scen sta-BI-li-ti IN-deks',
              example:
                'A population stability index above 0.2 signals that the input distribution has shifted enough to warrant retraining. = Un indice di stabilità della popolazione sopra 0.2 segnala che la distribuzione degli input è cambiata abbastanza da giustificare il riaddestramento.',
              context: 'mlops',
              difficulty: 'advanced',
              note: 'Abbreviato PSI. Standard nel credit risk.',
            },
            {
              english: 'Drift Detection',
              italian: 'Rilevamento deriva',
              pronunciation: '/drɪft dɪˈtekʃən/',
              phonetic: 'DRIFT di-TEK-scen',
              example:
                'Our drift detection system compares weekly feature distributions against the training baseline using KS tests. = Il nostro sistema di rilevamento della deviazione confronta distribuzioni di feature settimanali con la baseline di addestramento usando test KS.',
              context: 'mlops',
              difficulty: 'advanced',
            },
            {
              english: 'Outlier Monitoring',
              italian: 'Monitoraggio outlier',
              pronunciation: '/ˈaʊtlaɪər ˈmɒnɪtərɪŋ/',
              phonetic: 'AUT-laier MO-ni-to-ring',
              example:
                'Production outlier monitoring flagged a sudden spike in request sizes that indicated a botnet attack. = Il monitoraggio degli outlier in produzione ha segnalato un picco improvviso nelle dimensioni delle richieste che indicava un attacco botnet.',
              context: 'mlops',
              difficulty: 'advanced',
            },
            {
              english: 'Alerting',
              italian: 'Allertamento',
              pronunciation: '/əˈlɜːrtɪŋ/',
              phonetic: 'a-LER-ting',
              example:
                "Our alerting system pages the on-call engineer when prediction accuracy drops below the agreed threshold. = Il nostro sistema di allertamento chiama l'ingegnere di turno quando l'accuratezza delle predizioni scende sotto la soglia concordata.",
              context: 'mlops',
              difficulty: 'advanced',
              tool: 'PagerDuty, Slack',
            },
            {
              english: 'SLA',
              italian: 'Accordo di livello di servizio (SLA)',
              pronunciation: '/es el eɪ/',
              phonetic: 'ES-EL-EI',
              example:
                "The team committed to an SLA guaranteeing 99.9% uptime and sub-200ms latency for the prediction endpoint. = Il team si è impegnato a un SLA che garantisce il 99.9% di uptime e latenza sotto i 200ms per l'endpoint di predizione.",
              context: 'mlops',
              difficulty: 'advanced',
              note: 'Service Level Agreement.',
            },
            {
              english: 'Retraining Trigger',
              italian: 'Trigger di riaddestramento',
              pronunciation: '/ˌriːˈtreɪnɪŋ ˈtrɪɡər/',
              phonetic: 'ri-TREI-ning TRI-ger',
              example:
                'A weekly drift check serves as our automatic retraining trigger whenever the PSI exceeds the threshold. = Un controllo settimanale della deviazione serve come trigger automatico di riaddestramento ogni volta che il PSI supera la soglia.',
              context: 'mlops',
              difficulty: 'advanced',
            },
          ],
        },
      ],
    },
    // ════════════════════════════════════════════════
    // LEVEL 16 - DEPLOYMENT MODELLI / MODEL DEPLOYMENT
    // ════════════════════════════════════════════════
    16: {
      name: 'Deployment Modelli / Model Deployment',
      description: 'Portare i modelli in produzione',
      lessons: [
        {
          id: 'ai_deployment_1',
          title: 'Model Serving / Servizio Modelli',
          description: 'Esporre i modelli come servizio',
          items: [
            {
              english: 'Model Serving',
              italian: 'Servizio del modello',
              pronunciation: '/ˈmɒdəl ˈsɜːrvɪŋ/',
              phonetic: 'MO-del SER-ving',
              example:
                'Our model serving infrastructure handles 10,000 prediction requests per second across three availability zones. = La nostra infrastruttura di model serving gestisce 10.000 richieste di predizione al secondo su tre zone di disponibilità.',
              context: 'deployment',
              difficulty: 'advanced',
              tool: 'TorchServe, TensorFlow Serving',
            },
            {
              english: 'Inference Server',
              italian: 'Server di inferenza',
              pronunciation: '/ˈɪnfərəns ˈsɜːrvər/',
              phonetic: 'IN-fe-rens SER-ver',
              example:
                'We deployed the model behind a Triton inference server that supports dynamic batching and model versioning. = Abbiamo deployato il modello dietro un server di inferenza Triton che supporta batching dinamico e versionamento del modello.',
              context: 'deployment',
              difficulty: 'advanced',
              tool: 'Triton Inference Server',
            },
            {
              english: 'REST API',
              italian: 'API REST',
              pronunciation: '/rest eɪ piː aɪ/',
              phonetic: 'REST EI-PI-AI',
              example:
                "External partners integrate with our ML system by sending JSON payloads to the prediction REST API endpoint. = I partner esterni si integrano col nostro sistema ML inviando payload JSON all'endpoint REST API di predizione.",
              context: 'deployment',
              difficulty: 'advanced',
              code: '@app.post("/predict")',
            },
            {
              english: 'gRPC',
              italian: 'RPC ad alte prestazioni Google (gRPC)',
              pronunciation: '/dʒiː ɑːr piː siː/',
              phonetic: 'GI-AR-PI-SI',
              example:
                'Internal services call the model via gRPC because it offers 3x lower latency than REST for binary payloads. = I servizi interni chiamano il modello tramite gRPC perché offre latenza 3 volte inferiore a REST per payload binari.',
              context: 'deployment',
              difficulty: 'advanced',
            },
            {
              english: 'Latency',
              italian: 'Latenza',
              pronunciation: '/ˈleɪtənsi/',
              phonetic: 'LEI-ten-si',
              example:
                "The product team requires P99 latency below 150 milliseconds for the real-time recommendation endpoint. = Il team prodotto richiede latenza P99 sotto i 150 millisecondi per l'endpoint di raccomandazione in tempo reale.",
              context: 'deployment',
              difficulty: 'advanced',
            },
            {
              english: 'Throughput',
              italian: 'Volume di operazioni al secondo (Throughput)',
              pronunciation: '/ˈθruːpʊt/',
              phonetic: 'TRU-put',
              example:
                "After optimization, our inference server's throughput increased from 500 to 2,000 requests per second. = Dopo l'ottimizzazione, il throughput del nostro server di inferenza è aumentato da 500 a 2.000 richieste al secondo.",
              context: 'deployment',
              difficulty: 'advanced',
            },
            {
              english: 'Batch Inference',
              italian: 'Inferenza batch',
              pronunciation: '/bætʃ ˈɪnfərəns/',
              phonetic: 'BACI IN-fe-rens',
              example:
                "For email campaign scoring, batch inference processes all 5 million customer records overnight. = Per lo scoring delle campagne email, l'inferenza batch elabora tutti i 5 milioni di record clienti durante la notte.",
              context: 'deployment',
              difficulty: 'advanced',
            },
            {
              english: 'Online Inference',
              italian: 'Inferenza online',
              pronunciation: '/ˈɒnlaɪn ˈɪnfərəns/',
              phonetic: 'ON-lain IN-fe-rens',
              example:
                "The fraud detection system uses online inference to score each transaction in real time before authorization. = Il sistema di rilevamento frodi usa l'inferenza online per valutare ogni transazione in tempo reale prima dell'autorizzazione.",
              context: 'deployment',
              difficulty: 'advanced',
            },
            {
              english: 'Cold Start',
              italian: 'Avvio a freddo',
              pronunciation: '/koʊld stɑːrt/',
              phonetic: 'KOULD-START',
              example:
                'The first request after deployment takes 3 seconds due to cold start while the model loads into GPU memory. = La prima richiesta dopo il deploy richiede 3 secondi per il cold start mentre il modello si carica nella memoria GPU.',
              context: 'deployment',
              difficulty: 'advanced',
            },
            {
              english: 'A/B Testing',
              italian: 'Test A/B',
              pronunciation: '/eɪ biː ˈtestɪŋ/',
              phonetic: 'EI-BI TES-ting',
              example:
                'We ran A/B testing for two weeks, showing the new model increased click-through rate by 7% over the old one. = Abbiamo eseguito A/B testing per due settimane, mostrando che il nuovo modello ha aumentato il tasso di click del 7% rispetto al vecchio.',
              context: 'deployment',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'ai_deployment_2',
          title: 'Optimization / Ottimizzazione',
          description: 'Rendere i modelli più veloci e leggeri',
          items: [
            {
              english: 'Quantization',
              italian: 'Quantizzazione',
              pronunciation: '/ˌkwɒntɪˈzeɪʃən/',
              phonetic: 'kuan-ti-ZEI-scen',
              example:
                "Post-training quantization from FP32 to INT8 reduced model size by 4x with less than 1% accuracy drop. = La quantizzazione post-addestramento da FP32 a INT8 ha ridotto la dimensione del modello di 4 volte con meno dell'1% di calo di accuratezza.",
              context: 'deployment',
              difficulty: 'advanced',
              code: 'quantize_dynamic(model, dtype=torch.qint8)',
            },
            {
              english: 'Pruning',
              italian: 'Potatura del modello (Pruning)',
              pronunciation: '/ˈpruːnɪŋ/',
              phonetic: 'PRU-ning',
              example:
                "Structured pruning removed 40% of the network's channels while maintaining 98% of the original accuracy. = Il pruning strutturato ha rimosso il 40% dei canali della rete mantenendo il 98% dell'accuratezza originale.",
              context: 'deployment',
              difficulty: 'advanced',
            },
            {
              english: 'Knowledge Distillation',
              italian: 'Distillazione di conoscenza',
              pronunciation: '/ˈnɒlɪdʒ ˌdɪstɪˈleɪʃən/',
              phonetic: 'NO-ligi dis-ti-LEI-scen',
              example:
                'We trained a small student model via knowledge distillation from GPT-4, matching 90% of its quality at 10x the speed. = Abbiamo addestrato un piccolo modello studente tramite distillazione della conoscenza da GPT-4, eguagliando il 90% della qualità a 10 volte la velocità.',
              context: 'deployment',
              difficulty: 'advanced',
              note: 'Detto teacher-student framework.',
            },
            {
              english: 'ONNX',
              italian: 'Formato di modello interoperabile (ONNX)',
              pronunciation: '/ˈɒnɪks/',
              phonetic: 'O-niks',
              example:
                'Exporting our PyTorch model to ONNX format allowed deployment across TensorRT, CoreML, and web browsers. = Esportare il nostro modello PyTorch in formato ONNX ha permesso il deploy su TensorRT, CoreML e browser web.',
              context: 'deployment',
              difficulty: 'advanced',
              tool: 'onnx',
              note: 'Open Neural Network Exchange.',
            },
            {
              english: 'TensorRT',
              italian: 'Runtime inference NVIDIA ottimizzato (TensorRT)',
              pronunciation: '/ˈtensər ɑːr tiː/',
              phonetic: 'TEN-ser-AR-TI',
              example:
                "NVIDIA's TensorRT compiler optimized our model for A100 GPUs, achieving 5x faster inference than native PyTorch. = Il compilatore TensorRT di NVIDIA ha ottimizzato il nostro modello per GPU A100, raggiungendo inferenza 5 volte più veloce del PyTorch nativo.",
              context: 'deployment',
              difficulty: 'advanced',
              tool: 'NVIDIA TensorRT',
            },
            {
              english: 'OpenVINO',
              italian: 'Toolkit inference Intel (OpenVINO)',
              pronunciation: '/ˌoʊpən ˈviːnoʊ/',
              phonetic: 'O-pen-VI-no',
              example:
                'For Intel CPU deployment, OpenVINO optimizations brought inference latency down from 200ms to 45ms. = Per il deploy su CPU Intel, le ottimizzazioni OpenVINO hanno ridotto la latenza di inferenza da 200ms a 45ms.',
              context: 'deployment',
              difficulty: 'advanced',
            },
            {
              english: 'Model Compression',
              italian: 'Compressione del modello',
              pronunciation: '/ˈmɒdəl kəmˈpreʃən/',
              phonetic: 'MO-del kom-PRE-scen',
              example:
                'Through a combination of pruning and quantization, model compression reduced our BERT from 440MB to 28MB. = Attraverso una combinazione di pruning e quantizzazione, la compressione del modello ha ridotto il nostro BERT da 440MB a 28MB.',
              context: 'deployment',
              difficulty: 'advanced',
            },
            {
              english: 'INT8',
              italian: 'Quantizzazione a 8 bit interi (INT8)',
              pronunciation: '/ɪnt eɪt/',
              phonetic: 'INT-EIT',
              example:
                "Running the model in INT8 precision enables real-time inference on edge devices with limited compute budgets. = Eseguire il modello in precisione INT8 abilita l'inferenza in tempo reale su dispositivi edge con budget di calcolo limitati.",
              context: 'deployment',
              difficulty: 'advanced',
            },
            {
              english: 'FP16',
              italian: 'Precisione half-float (FP16)',
              pronunciation: '/ef piː sɪkˈstiːn/',
              phonetic: 'EF-PI-SIK-STIN',
              example:
                'Training in FP16 precision halves GPU memory consumption while maintaining numerical stability with loss scaling. = Addestrare in precisione FP16 dimezza il consumo di memoria GPU mantenendo la stabilità numerica con lo scaling della loss.',
              context: 'deployment',
              difficulty: 'advanced',
              note: 'Half precision floating point.',
            },
            {
              english: 'Edge Deployment',
              italian: 'Deployment su edge',
              pronunciation: '/edʒ dɪˈplɔɪmənt/',
              phonetic: 'EGI di-PLOI-ment',
              example:
                "For offline use on factory floors, edge deployment runs the inspection model directly on embedded hardware. = Per l'uso offline in fabbrica, il deploy edge esegue il modello di ispezione direttamente su hardware embedded.",
              context: 'deployment',
              difficulty: 'advanced',
              tool: 'TensorFlow Lite, Core ML',
            },
          ],
        },
        {
          id: 'ai_deployment_3',
          title: 'Containerization & Cloud / Container e Cloud',
          description: 'Distribuire modelli con container',
          items: [
            {
              english: 'Containerization',
              italian: 'Containerizzazione',
              pronunciation: '/kənˌteɪnəraɪˈzeɪʃən/',
              phonetic: 'kon-tei-ne-rai-ZEI-scen',
              example:
                'Packaging the model with its dependencies via containerization ensures identical behavior across dev, staging, and production. = Impacchettare il modello con le sue dipendenze tramite containerizzazione assicura comportamento identico tra dev, staging e produzione.',
              context: 'deployment',
              difficulty: 'advanced',
              tool: 'Docker',
            },
            {
              english: 'Dockerfile',
              italian: 'Ricetta di immagine container (Dockerfile)',
              pronunciation: '/ˈdɒkərfaɪl/',
              phonetic: 'DOK-ker-fail',
              example:
                "Our Dockerfile installs CUDA, Python dependencies, and the model weights in a reproducible, versioned image. = Il nostro Dockerfile installa CUDA, dipendenze Python e pesi del modello in un'immagine riproducibile e versionata.",
              context: 'deployment',
              difficulty: 'advanced',
              code: 'FROM pytorch/pytorch',
            },
            {
              english: 'Kubernetes',
              italian: 'Orchestratore container (Kubernetes)',
              pronunciation: '/ˌkuːbərˈnetɪs/',
              phonetic: 'ku-ber-NE-tis',
              example:
                'The ML team deploys models on Kubernetes to leverage auto-scaling, health checks, and rolling updates. = Il team ML deploya modelli su Kubernetes per sfruttare auto-scaling, health check e rolling update.',
              context: 'deployment',
              difficulty: 'advanced',
              tool: 'kubectl',
              note: 'Spesso abbreviato k8s.',
            },
            {
              english: 'Auto-Scaling',
              italian: 'Scalabilità automatica',
              pronunciation: '/ˈɔːtoʊ ˈskeɪlɪŋ/',
              phonetic: 'AU-to SKEI-ling',
              example:
                "During Black Friday traffic spikes, auto-scaling added 20 more inference pods within two minutes. = Durante i picchi di traffico del Black Friday, l'auto-scaling ha aggiunto 20 pod di inferenza in più in due minuti.",
              context: 'deployment',
              difficulty: 'advanced',
            },
            {
              english: 'Load Balancer',
              italian: 'Bilanciatore di carico',
              pronunciation: '/loʊd ˈbælənsər/',
              phonetic: 'LOUD BA-lan-ser',
              example:
                'The load balancer distributes prediction requests evenly across eight GPU-backed inference replicas. = Il load balancer distribuisce le richieste di predizione uniformemente tra otto repliche di inferenza con GPU.',
              context: 'deployment',
              difficulty: 'advanced',
            },
            {
              english: 'SageMaker',
              italian: 'Amazon SageMaker (piattaforma ML AWS)',
              pronunciation: '/ˈseɪdʒˌmeɪkər/',
              phonetic: 'SEIGI-mei-ker',
              example:
                "Data scientists deploy models to production with SageMaker endpoints, avoiding manual infrastructure setup. = I data scientist deployano modelli in produzione con endpoint SageMaker, evitando la configurazione manuale dell'infrastruttura.",
              context: 'deployment',
              difficulty: 'advanced',
              tool: 'AWS SageMaker',
            },
            {
              english: 'Vertex AI',
              italian: 'Piattaforma ML Google Cloud (Vertex AI)',
              pronunciation: '/ˈvɜːrteks eɪ aɪ/',
              phonetic: 'VER-teks EI-AI',
              example:
                "Google Cloud's Vertex AI provides end-to-end ML pipelines from data labeling through model monitoring. = Vertex AI di Google Cloud fornisce pipeline ML end-to-end dall'etichettatura dati al monitoraggio del modello.",
              context: 'deployment',
              difficulty: 'advanced',
              tool: 'Google Vertex AI',
            },
            {
              english: 'Azure ML',
              italian: 'Piattaforma ML Microsoft (Azure ML)',
              pronunciation: '/ˈæʒər em el/',
              phonetic: 'A-zur EM-EL',
              example:
                'Enterprise teams on Microsoft stack use Azure ML for managed training clusters and one-click deployment. = I team enterprise su stack Microsoft usano Azure ML per cluster di addestramento gestiti e deploy con un click.',
              context: 'deployment',
              difficulty: 'advanced',
              tool: 'Azure Machine Learning',
            },
            {
              english: 'Serverless',
              italian: 'Senza server gestiti (Serverless)',
              pronunciation: '/ˈsɜːrvərləs/',
              phonetic: 'SER-ver-les',
              example:
                'For low-traffic prediction APIs, a serverless deployment eliminates idle costs by scaling to zero between requests. = Per API di predizione a basso traffico, un deploy serverless elimina i costi di inattività scalando a zero tra le richieste.',
              context: 'deployment',
              difficulty: 'advanced',
              tool: 'AWS Lambda, Cloud Run',
            },
            {
              english: 'Canary Deployment',
              italian: 'Deployment canary',
              pronunciation: '/kəˈnɛri dɪˈplɔɪmənt/',
              phonetic: 'ka-NE-ri di-PLOI-ment',
              example:
                'We routed 5% of traffic to the new model via canary deployment before promoting it to full production. = Abbiamo instradato il 5% del traffico al nuovo modello tramite deploy canary prima di promuoverlo a produzione completa.',
              context: 'deployment',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'ai_deployment_4',
          title: 'Production Best Practices / Buone Pratiche di Produzione',
          description: 'Operare modelli in modo affidabile',
          items: [
            {
              english: 'Health Check',
              italian: 'Controllo di salute (Health Check)',
              pronunciation: '/helθ tʃek/',
              phonetic: 'HELT-CIEK',
              example:
                "The Kubernetes health check pings the model endpoint every 30 seconds and restarts unresponsive containers. = L'health check di Kubernetes pinga l'endpoint del modello ogni 30 secondi e riavvia i container non responsivi.",
              context: 'deployment',
              difficulty: 'advanced',
              code: '@app.get("/health")',
            },
            {
              english: 'Rolling Update',
              italian: 'Aggiornamento progressivo',
              pronunciation: '/ˈroʊlɪŋ ˈʌpdeɪt/',
              phonetic: 'RO-ling AP-deit',
              example:
                'A rolling update replaces model pods one at a time, ensuring zero downtime during version transitions. = Un rolling update sostituisce i pod del modello uno alla volta, assicurando zero downtime durante le transizioni di versione.',
              context: 'deployment',
              difficulty: 'advanced',
            },
            {
              english: 'Blue-Green Deployment',
              italian: 'Deployment blue-green',
              pronunciation: '/bluː ɡriːn dɪˈplɔɪmənt/',
              phonetic: 'BLU-GRIN di-PLOI-ment',
              example:
                'With blue-green deployment, we keep the old model running while the new one warms up, then switch traffic instantly. = Con il deploy blue-green, manteniamo il vecchio modello attivo mentre il nuovo si scalda, poi spostiamo il traffico istantaneamente.',
              context: 'deployment',
              difficulty: 'advanced',
            },
            {
              english: 'Shadow Deployment',
              italian: 'Deploy ombra (Shadow Deployment)',
              pronunciation: '/ˈʃædoʊ dɪˈplɔɪmənt/',
              phonetic: 'SCIA-dou di-PLOI-ment',
              example:
                'Before going live, a shadow deployment runs the new model on production traffic without serving its predictions to users. = Prima del lancio, un deploy ombra esegue il nuovo modello sul traffico di produzione senza servire le sue predizioni agli utenti.',
              context: 'deployment',
              difficulty: 'advanced',
            },
            {
              english: 'Rate Limiting',
              italian: 'Limitazione frequenza',
              pronunciation: '/reɪt ˈlɪmɪtɪŋ/',
              phonetic: 'REIT LI-mi-ting',
              example:
                'We enforce rate limiting of 100 requests per second per API key to prevent abuse of our prediction service. = Applichiamo un limite di frequenza di 100 richieste al secondo per chiave API per prevenire abusi del nostro servizio di predizione.',
              context: 'deployment',
              difficulty: 'advanced',
            },
            {
              english: 'Caching',
              italian: 'Messa in cache (Caching)',
              pronunciation: '/ˈkæʃɪŋ/',
              phonetic: 'KA-scing',
              example:
                'Frequently requested predictions are served from a Redis caching layer, reducing GPU load by 60%. = Le predizioni richieste frequentemente sono servite da uno strato di caching Redis, riducendo il carico GPU del 60%.',
              context: 'deployment',
              difficulty: 'advanced',
              tool: 'Redis, Memcached',
            },
            {
              english: 'Logging',
              italian: 'Registrazione eventi (Logging)',
              pronunciation: '/ˈlɒɡɪŋ/',
              phonetic: 'LOG-ging',
              example:
                'Structured logging of every request and response enables post-hoc debugging of mispredictions in production. = Il logging strutturato di ogni richiesta e risposta abilita il debugging post-hoc di predizioni errate in produzione.',
              context: 'deployment',
              difficulty: 'advanced',
              code: 'logger.info("prediction made", extra={...})',
            },
            {
              english: 'Observability',
              italian: 'Osservabilità',
              pronunciation: '/əbˌzɜːrvəˈbɪləti/',
              phonetic: 'ob-zer-va-BI-li-ti',
              example:
                "Full-stack observability combining metrics, logs, and traces lets us pinpoint model failures within minutes. = L'osservabilità full-stack che combina metriche, log e trace ci permette di individuare fallimenti del modello in pochi minuti.",
              context: 'deployment',
              difficulty: 'advanced',
              tool: 'OpenTelemetry, Datadog',
            },
            {
              english: 'Feature Store',
              italian: 'Archivio feature condivise (Feature Store)',
              pronunciation: '/ˈfiːtʃər stɔːr/',
              phonetic: 'FII-cer STOR',
              example:
                'The centralized feature store ensures that training and serving pipelines compute identical feature values, preventing skew. = Il feature store centralizzato assicura che le pipeline di addestramento e serving calcolino valori di feature identici, prevenendo lo skew.',
              context: 'deployment',
              difficulty: 'advanced',
              tool: 'Feast, Tecton',
            },
            {
              english: 'Rollback',
              italian: 'Ritorno a versione precedente (Rollback)',
              pronunciation: '/ˈroʊlbæk/',
              phonetic: 'ROL-bak',
              example:
                'When the new model caused a 10% revenue drop, an automated rollback restored the previous version within 5 minutes. = Quando il nuovo modello ha causato un calo del 10% dei ricavi, un rollback automatizzato ha ripristinato la versione precedente entro 5 minuti.',
              context: 'deployment',
              difficulty: 'advanced',
              command: 'kubectl rollout undo deployment/my-model',
            },
          ],
        },
      ],
    },
    // ════════════════════════════════════════════════
    // LEVEL 17 - IA RESPONSABILE / RESPONSIBLE AI
    // ════════════════════════════════════════════════
    17: {
      name: 'IA Responsabile / Responsible AI',
      description: "Etica, equità e trasparenza nell'IA",
      lessons: [
        {
          id: 'ai_responsible_1',
          title: 'Bias & Fairness / Bias ed Equità',
          description: 'Affrontare la discriminazione algoritmica',
          items: [
            {
              english: 'Algorithmic Bias',
              italian: 'Bias algoritmico',
              pronunciation: '/ˌælɡəˈrɪðmɪk ˈbaɪəs/',
              phonetic: 'al-go-RI-dem-ik BAI-as',
              example:
                'A hiring model exhibited algorithmic bias by systematically ranking male applicants higher than equally qualified women. = Un modello di assunzione ha esibito bias algoritmico classificando sistematicamente i candidati maschi più in alto di donne ugualmente qualificate.',
              context: 'ethics',
              difficulty: 'advanced',
            },
            {
              english: 'Fairness',
              italian: 'Equità',
              pronunciation: '/ˈfeərnəs/',
              phonetic: 'FER-nes',
              example:
                "Achieving fairness in lending models requires ensuring approval rates are equitable across all demographic groups. = Raggiungere l'equità nei modelli di prestito richiede assicurare che i tassi di approvazione siano equi tra tutti i gruppi demografici.",
              context: 'ethics',
              difficulty: 'advanced',
            },
            {
              english: 'Demographic Parity',
              italian: 'Parità demografica',
              pronunciation: '/ˌdeməˈɡræfɪk ˈpærəti/',
              phonetic: 'de-mo-GRA-fik PA-ri-ti',
              example:
                "Under demographic parity, the model must approve loans at the same rate regardless of the applicant's ethnicity. = Sotto la parità demografica, il modello deve approvare prestiti allo stesso tasso indipendentemente dall'etnia del richiedente.",
              context: 'ethics',
              difficulty: 'advanced',
            },
            {
              english: 'Equal Opportunity',
              italian: 'Pari opportunità',
              pronunciation: '/ˈiːkwəl ˌɒpərˈtjuːnəti/',
              phonetic: 'I-kual o-por-TIU-ni-ti',
              example:
                "The equal opportunity criterion requires equal true positive rates across protected groups for the favorable outcome. = Il criterio di pari opportunità richiede tassi di veri positivi uguali tra gruppi protetti per l'esito favorevole.",
              context: 'ethics',
              difficulty: 'advanced',
            },
            {
              english: 'Disparate Impact',
              italian: 'Impatto disparato',
              pronunciation: '/ˈdɪspərət ˈɪmpækt/',
              phonetic: 'DIS-pa-rat IM-pakt',
              example:
                'An audit revealed disparate impact: the model rejected minority applicants at twice the rate of majority ones. = Un audit ha rivelato impatto disparato: il modello rifiutava richiedenti di minoranza al doppio del tasso di quelli di maggioranza.',
              context: 'ethics',
              difficulty: 'advanced',
              note: 'Concetto legale di discriminazione indiretta.',
            },
            {
              english: 'Protected Attribute',
              italian: 'Attributo protetto',
              pronunciation: '/prəˈtektɪd ˈætrɪbjuːt/',
              phonetic: 'pro-TEK-ted A-tri-biut',
              example:
                'Race, gender, and disability status are protected attributes that models should not use for discriminatory decisions. = Razza, genere e stato di disabilità sono attributi protetti che i modelli non dovrebbero usare per decisioni discriminatorie.',
              context: 'ethics',
              difficulty: 'advanced',
            },
            {
              english: 'Sampling Bias',
              italian: 'Bias di campionamento',
              pronunciation: '/ˈsæmplɪŋ ˈbaɪəs/',
              phonetic: 'SAM-pling BAI-as',
              example:
                'Our training data had sampling bias because it overrepresented urban users and underrepresented rural populations. = I nostri dati di addestramento avevano bias di campionamento perché sovra-rappresentavano utenti urbani e sotto-rappresentavano popolazioni rurali.',
              context: 'ethics',
              difficulty: 'advanced',
            },
            {
              english: 'Selection Bias',
              italian: 'Bias di selezione',
              pronunciation: '/sɪˈlekʃən ˈbaɪəs/',
              phonetic: 'si-LEK-scen BAI-as',
              example:
                'Only surveying existing customers introduced selection bias, making the model blind to why people left. = Sondare solo i clienti esistenti ha introdotto bias di selezione, rendendo il modello cieco alle ragioni per cui le persone se ne andavano.',
              context: 'ethics',
              difficulty: 'advanced',
            },
            {
              english: 'Bias Mitigation',
              italian: 'Mitigazione del bias',
              pronunciation: '/ˈbaɪəs ˌmɪtɪˈɡeɪʃən/',
              phonetic: 'BAI-as mi-ti-GEI-scen',
              example:
                'After applying bias mitigation techniques, the gender gap in hiring recommendations dropped from 15% to 2%. = Dopo aver applicato tecniche di mitigazione del bias, il divario di genere nelle raccomandazioni di assunzione è sceso dal 15% al 2%.',
              context: 'ethics',
              difficulty: 'advanced',
              tool: 'Fairlearn, AIF360',
            },
            {
              english: 'Reweighting',
              italian: 'Ripesatura',
              pronunciation: '/riːˈweɪtɪŋ/',
              phonetic: 'ri-UEI-ting',
              example:
                "To correct for sampling bias, we applied reweighting so underrepresented groups received higher importance during training. = Per correggere il bias di campionamento, abbiamo applicato il ripesamento così i gruppi sotto-rappresentati ricevevano maggiore importanza durante l'addestramento.",
              context: 'ethics',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'ai_responsible_2',
          title: 'Explainability / Spiegabilità',
          description: 'Capire le decisioni del modello',
          items: [
            {
              english: 'Explainability',
              italian: 'Spiegabilità',
              pronunciation: '/ɪkˌspleɪnəˈbɪləti/',
              phonetic: 'ek-splei-na-BI-li-ti',
              example:
                'Healthcare regulations require explainability so doctors can understand why the model flagged a patient as high-risk. = Le normative sanitarie richiedono la spiegabilità così i medici possano capire perché il modello ha segnalato un paziente come ad alto rischio.',
              context: 'ethics',
              difficulty: 'advanced',
              note: 'Tecniche come SHAP e LIME forniscono spiegazioni post-hoc richieste da normative come GDPR per decisioni automatizzate.',
            },
            {
              english: 'Interpretability',
              italian: 'Interpretabilità',
              pronunciation: '/ɪnˌtɜːrprətəˈbɪləti/',
              phonetic: 'in-ter-pre-ta-BI-li-ti',
              example:
                'Choosing a decision tree over a deep network sacrifices accuracy but gains interpretability for regulatory compliance. = Scegliere un albero decisionale su una rete profonda sacrifica accuratezza ma guadagna interpretabilità per la conformità normativa.',
              context: 'ethics',
              difficulty: 'advanced',
            },
            {
              english: 'SHAP',
              italian: 'Valori di Shapley per spiegazioni (SHAP)',
              pronunciation: '/ʃæp/',
              phonetic: 'SCIAP',
              example:
                "Using SHAP values, we showed the loan officer that income and debt ratio drove the rejection, not zip code. = Usando valori SHAP, abbiamo mostrato all'addetto ai prestiti che reddito e rapporto debito hanno guidato il rifiuto, non il codice postale.",
              context: 'ethics',
              difficulty: 'advanced',
              code: 'shap.TreeExplainer(model)',
              tool: 'shap',
              note: 'SHapley Additive exPlanations.',
            },
            {
              english: 'LIME',
              italian: 'Spiegazione locale agnostica (LIME)',
              pronunciation: '/laɪm/',
              phonetic: 'LAIM',
              example:
                'By perturbing input features locally, LIME generates a simple explanation for any individual model prediction. = Perturbando le feature di input localmente, LIME genera una spiegazione semplice per ogni singola predizione del modello.',
              context: 'ethics',
              difficulty: 'advanced',
              tool: 'lime',
              note: 'Local Interpretable Model-agnostic Explanations.',
            },
            {
              english: 'Counterfactual',
              italian: 'Controfattuale',
              pronunciation: '/ˌkaʊntərˈfæktʃuəl/',
              phonetic: 'kaun-ter-FAK-ciu-al',
              example:
                "A counterfactual explanation tells the user: 'Your loan would have been approved if income exceeded 50K'. = Una spiegazione controfattuale dice all'utente: 'Il tuo prestito sarebbe stato approvato se il reddito avesse superato 50K'.",
              context: 'ethics',
              difficulty: 'advanced',
            },
            {
              english: 'Feature Attribution',
              italian: 'Attribuzione di feature',
              pronunciation: '/ˈfiːtʃər ˌætrɪˈbjuːʃən/',
              phonetic: 'FII-cer a-tri-BIU-scen',
              example:
                "The feature attribution report showed that the model relied heavily on age, raising discrimination concerns. = Il report di attribuzione delle feature ha mostrato che il modello si basava pesantemente sull'età, sollevando preoccupazioni di discriminazione.",
              context: 'ethics',
              difficulty: 'advanced',
            },
            {
              english: 'Saliency Map',
              italian: 'Mappa di salienza',
              pronunciation: '/ˈseɪliənsi mæp/',
              phonetic: 'SEI-lien-si MAP',
              example:
                'The saliency map highlighted which pixels in the X-ray the model focused on when diagnosing pneumonia. = La mappa di salienza ha evidenziato quali pixel nella radiografia il modello ha focalizzato nel diagnosticare la polmonite.',
              context: 'ethics',
              difficulty: 'advanced',
            },
            {
              english: 'Grad-CAM',
              italian: 'Mappa di attivazione class-discriminative (Grad-CAM)',
              pronunciation: '/ɡræd kæm/',
              phonetic: 'GRAD-KAM',
              example:
                'Applying Grad-CAM revealed that the model was looking at the patient ID tag instead of lung tissue for diagnosis. = Applicare Grad-CAM ha rivelato che il modello guardava il tag ID del paziente invece del tessuto polmonare per la diagnosi.',
              context: 'ethics',
              difficulty: 'advanced',
              note: 'Gradient-weighted Class Activation Mapping.',
            },
            {
              english: 'Black Box Model',
              italian: 'Modello black box',
              pronunciation: '/blæk bɒks ˈmɒdəl/',
              phonetic: 'BLAK-BOKS MO-del',
              example:
                'Regulators rejected the credit scoring system because it was a black box model with no clear decision rationale. = I regolatori hanno rifiutato il sistema di credit scoring perché era un modello black box senza una chiara logica decisionale.',
              context: 'ethics',
              difficulty: 'advanced',
            },
            {
              english: 'White Box Model',
              italian: 'Modello white box',
              pronunciation: '/waɪt bɒks ˈmɒdəl/',
              phonetic: 'UAIT-BOKS MO-del',
              example:
                "For high-stakes medical decisions, the hospital required a white box model where every prediction factor is visible. = Per decisioni mediche ad alto rischio, l'ospedale richiedeva un modello white box dove ogni fattore di predizione è visibile.",
              context: 'ethics',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'ai_responsible_3',
          title: "AI Ethics / Etica dell'IA",
          description: 'Considerazioni etiche fondamentali',
          items: [
            {
              english: 'AI Ethics',
              italian: "Etica dell'IA",
              pronunciation: '/eɪ aɪ ˈeθɪks/',
              phonetic: 'EI-AI E-tiks',
              example:
                "Our company's AI ethics board reviews every high-impact model before deployment to prevent discriminatory outcomes. = Il comitato di etica IA della nostra azienda rivede ogni modello ad alto impatto prima del deploy per prevenire esiti discriminatori.",
              context: 'ethics',
              difficulty: 'advanced',
            },
            {
              english: 'Privacy',
              italian: 'Riservatezza dei dati (Privacy)',
              pronunciation: '/ˈpraɪvəsi/',
              phonetic: 'PRAI-va-si',
              example:
                "Scraping social media profiles for ML training raises serious privacy concerns under European data protection laws. = Raccogliere profili dai social media per l'addestramento ML solleva serie preoccupazioni di privacy sotto le leggi europee sulla protezione dei dati.",
              context: 'ethics',
              difficulty: 'advanced',
              note: 'Termine ormai italianizzato.',
            },
            {
              english: 'Differential Privacy',
              italian: 'Privacy differenziale',
              pronunciation: '/ˌdɪfəˈrenʃəl ˈpraɪvəsi/',
              phonetic: 'di-fe-REN-scial PRAI-va-si',
              example:
                'By adding calibrated noise through differential privacy, the model learns patterns without memorizing individual records. = Aggiungendo rumore calibrato tramite la privacy differenziale, il modello impara pattern senza memorizzare record individuali.',
              context: 'ethics',
              difficulty: 'advanced',
            },
            {
              english: 'Federated Learning',
              italian: 'Apprendimento federato',
              pronunciation: '/ˈfedəreɪtɪd ˈlɜːrnɪŋ/',
              phonetic: 'FE-de-rei-ted LER-ning',
              example:
                "Hospitals use federated learning to train a shared model on patient data without any records leaving the local premises. = Gli ospedali usano l'apprendimento federato per addestrare un modello condiviso su dati dei pazienti senza che alcun record lasci la struttura locale.",
              context: 'ethics',
              difficulty: 'advanced',
              note: 'Dati restano sui dispositivi.',
            },
            {
              english: 'GDPR',
              italian: 'Regolamento UE protezione dati (GDPR)',
              pronunciation: '/dʒiː diː piː ɑːr/',
              phonetic: 'GI-DI-PI-AR',
              example:
                'Under GDPR, users can request deletion of their data, which may require retraining the model from scratch. = Sotto il GDPR, gli utenti possono richiedere la cancellazione dei loro dati, il che può richiedere il riaddestramento del modello da zero.',
              context: 'ethics',
              difficulty: 'advanced',
              note: 'General Data Protection Regulation.',
            },
            {
              english: 'AI Act',
              italian: "Regolamento UE sull'intelligenza artificiale (AI Act)",
              pronunciation: '/eɪ aɪ ækt/',
              phonetic: 'EI-AI-AKT',
              example:
                "The EU AI Act classifies systems by risk level, imposing strict requirements on high-risk applications like hiring and credit. = L'AI Act dell'UE classifica i sistemi per livello di rischio, imponendo requisiti rigorosi su applicazioni ad alto rischio come assunzioni e credito.",
              context: 'ethics',
              difficulty: 'advanced',
              note: "Regolamento europeo per l'IA.",
            },
            {
              english: 'Transparency',
              italian: 'Trasparenza',
              pronunciation: '/trænsˈpærənsi/',
              phonetic: 'trans-PA-ren-si',
              example:
                'Full transparency requires documenting training data sources, model limitations, and known failure modes. = La piena trasparenza richiede documentare le fonti dei dati di addestramento, le limitazioni del modello e le modalità di fallimento note.',
              context: 'ethics',
              difficulty: 'advanced',
            },
            {
              english: 'Accountability',
              italian: 'Responsabilità',
              pronunciation: '/əˌkaʊntəˈbɪləti/',
              phonetic: 'a-kaun-ta-BI-li-ti',
              example:
                'When the model makes a wrong medical diagnosis, clear accountability structures determine who bears responsibility. = Quando il modello fa una diagnosi medica errata, strutture chiare di responsabilità determinano chi ne porta la responsabilità.',
              context: 'ethics',
              difficulty: 'advanced',
            },
            {
              english: 'Human-in-the-Loop',
              italian: 'Umano nel ciclo',
              pronunciation: '/ˈhjuːmən ɪn ðə luːp/',
              phonetic: 'HIU-man IN-DE-LUP',
              example:
                "For critical decisions like parole recommendations, a human-in-the-loop reviews every model output before action. = Per decisioni critiche come raccomandazioni sulla libertà condizionale, un umano nel circuito rivede ogni output del modello prima dell'azione.",
              context: 'ethics',
              difficulty: 'advanced',
              note: 'Abbreviato HITL.',
            },
            {
              english: 'AI Safety',
              italian: "Sicurezza dell'IA",
              pronunciation: '/eɪ aɪ ˈseɪfti/',
              phonetic: 'EI-AI SEIF-ti',
              example:
                "Research in AI safety investigates how to prevent powerful models from pursuing unintended or harmful objectives. = La ricerca sulla sicurezza dell'IA indaga come impedire a modelli potenti di perseguire obiettivi non intenzionali o dannosi.",
              context: 'ethics',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'ai_responsible_4',
          title: 'Auditing & Governance / Audit e Governance',
          description: 'Supervisione e controllo dei modelli',
          items: [
            {
              english: 'Model Audit',
              italian: 'Audit del modello',
              pronunciation: '/ˈmɒdəl ˈɔːdɪt/',
              phonetic: 'MO-del O-dit',
              example:
                'An independent model audit found that our resume screener penalized candidates with non-Western names. = Un audit indipendente del modello ha trovato che il nostro filtro CV penalizzava candidati con nomi non occidentali.',
              context: 'ethics',
              difficulty: 'advanced',
            },
            {
              english: 'Risk Assessment',
              italian: 'Valutazione del rischio',
              pronunciation: '/rɪsk əˈsesmənt/',
              phonetic: 'RISK a-SES-ment',
              example:
                'Before launch, a formal risk assessment classified the system as high-risk due to its impact on financial decisions. = Prima del lancio, una valutazione formale del rischio ha classificato il sistema come ad alto rischio per il suo impatto sulle decisioni finanziarie.',
              context: 'ethics',
              difficulty: 'advanced',
            },
            {
              english: 'High-Risk System',
              italian: 'Sistema ad alto rischio',
              pronunciation: '/haɪ rɪsk ˈsɪstəm/',
              phonetic: 'HAI-RISK SIS-tem',
              example:
                "The EU AI Act requires that any high-risk system undergoes conformity assessment and continuous monitoring. = L'AI Act dell'UE richiede che ogni sistema ad alto rischio sia sottoposto a valutazione di conformità e monitoraggio continuo.",
              context: 'ethics',
              difficulty: 'advanced',
              note: "Categoria nell'AI Act europeo.",
            },
            {
              english: 'Compliance',
              italian: 'Conformità',
              pronunciation: '/kəmˈplaɪəns/',
              phonetic: 'kom-PLAI-ans',
              example:
                "Meeting compliance with the AI Act requires maintaining detailed logs of training data and model decisions. = Rispettare la conformità con l'AI Act richiede mantenere log dettagliati dei dati di addestramento e delle decisioni del modello.",
              context: 'ethics',
              difficulty: 'advanced',
              note: 'In gergo IT spesso "compliance" senza tradurre.',
            },
            {
              english: 'Model Documentation',
              italian: 'Documentazione del modello',
              pronunciation: '/ˈmɒdəl ˌdɒkjʊmenˈteɪʃən/',
              phonetic: 'MO-del do-kiu-men-TEI-scen',
              example:
                'Thorough model documentation includes architecture choices, training data provenance, evaluation metrics, and known biases. = Una documentazione del modello approfondita include scelte architetturali, provenienza dei dati, metriche di valutazione e bias noti.',
              context: 'ethics',
              difficulty: 'advanced',
            },
            {
              english: 'Datasheets for Datasets',
              italian: 'Schede per dataset',
              pronunciation: '/ˈdeɪtəʃiːts fər ˈdeɪtəsets/',
              phonetic: 'DEI-ta-scits for DEI-ta-sets',
              example:
                "Following the 'Datasheets for Datasets' framework, we documented collection methods, demographics, and intended use cases. = Seguendo il framework 'Datasheets for Datasets', abbiamo documentato metodi di raccolta, demografiche e casi d'uso previsti.",
              context: 'ethics',
              difficulty: 'advanced',
            },
            {
              english: 'Right to Explanation',
              italian: 'Diritto alla spiegazione',
              pronunciation: '/raɪt tuː ˌekspləˈneɪʃən/',
              phonetic: 'RAIT-TU ek-spla-NEI-scen',
              example:
                'Under some regulations, applicants have a right to explanation when an automated system denies their application. = Sotto alcune normative, i richiedenti hanno diritto a una spiegazione quando un sistema automatizzato nega la loro domanda.',
              context: 'ethics',
              difficulty: 'advanced',
            },
            {
              english: 'Sustainability',
              italian: 'Sostenibilità',
              pronunciation: '/səˌsteɪnəˈbɪləti/',
              phonetic: 'sas-tei-na-BI-li-ti',
              example:
                "Training a single large model can emit as much CO2 as five cars over their lifetimes, making sustainability a priority. = Addestrare un singolo grande modello può emettere tanta CO2 quanto cinque auto nell'arco della loro vita, rendendo la sostenibilità una priorità.",
              context: 'ethics',
              difficulty: 'advanced',
            },
            {
              english: 'Carbon Footprint',
              italian: 'Impronta di carbonio',
              pronunciation: '/ˈkɑːrbən ˈfʊtprɪnt/',
              phonetic: 'KAR-bon FUT-print',
              example:
                "We offset our model training's carbon footprint by purchasing renewable energy credits proportional to GPU hours consumed. = Compensiamo l'impronta di carbonio dell'addestramento acquistando crediti di energia rinnovabile proporzionali alle ore GPU consumate.",
              context: 'ethics',
              difficulty: 'advanced',
              tool: 'CodeCarbon',
            },
            {
              english: 'Responsible Disclosure',
              italian: 'Divulgazione responsabile',
              pronunciation: '/rɪˈspɒnsəbəl dɪsˈkloʊʒər/',
              phonetic: 'ri-SPON-sa-bel dis-KLO-zer',
              example:
                'When we discovered a prompt injection vulnerability, responsible disclosure protocols guided us to notify the vendor before publishing. = Quando abbiamo scoperto una vulnerabilità di prompt injection, i protocolli di divulgazione responsabile ci hanno guidato a notificare il fornitore prima di pubblicare.',
              context: 'ethics',
              difficulty: 'advanced',
            },
          ],
        },
      ],
    },
    // ════════════════════════════════════════════════
    // LEVEL 18 - APPRENDIMENTO PER RINFORZO / REINFORCEMENT LEARNING
    // ════════════════════════════════════════════════
    18: {
      name: 'Apprendimento per Rinforzo / Reinforcement Learning',
      description: 'Imparare tramite ricompense',
      lessons: [
        {
          id: 'ai_rl_1',
          title: 'RL Foundations / Fondamenti RL',
          description: 'Concetti base del reinforcement learning',
          items: [
            {
              english: 'Agent',
              italian: 'Agente',
              pronunciation: '/ˈeɪdʒənt/',
              phonetic: 'EI-gent',
              example:
                "In reinforcement learning, an agent interacts with the environment by observing states and taking actions. = Nell'apprendimento per rinforzo, un agente interagisce con l'ambiente osservando stati e compiendo azioni.",
              context: 'machine-learning',
              difficulty: 'advanced',
            },
            {
              english: 'Environment',
              italian: 'Ambiente',
              pronunciation: '/ɪnˈvaɪrənmənt/',
              phonetic: 'in-VAI-ron-ment',
              example:
                "The game board, including piece positions and legal moves, defines the environment that the RL agent navigates. = La scacchiera, incluse posizioni dei pezzi e mosse legali, definisce l'ambiente che l'agente RL naviga.",
              context: 'machine-learning',
              difficulty: 'advanced',
              tool: 'Gymnasium, OpenAI Gym',
            },
            {
              english: 'State',
              italian: 'Stato',
              pronunciation: '/steɪt/',
              phonetic: 'STEIT',
              example:
                "At each time step, the state captures all relevant information the agent needs to choose its next action. = A ogni passo temporale, lo stato cattura tutte le informazioni rilevanti di cui l'agente ha bisogno per scegliere la sua prossima azione.",
              context: 'machine-learning',
              difficulty: 'advanced',
            },
            {
              english: 'Action',
              italian: 'Azione',
              pronunciation: '/ˈækʃən/',
              phonetic: 'AK-scen',
              example:
                "Given the current board state, the chess agent evaluates millions of possible actions before selecting the best move. = Dato lo stato attuale della scacchiera, l'agente scacchistico valuta milioni di azioni possibili prima di selezionare la mossa migliore.",
              context: 'machine-learning',
              difficulty: 'advanced',
            },
            {
              english: 'Reward',
              italian: 'Ricompensa',
              pronunciation: '/rɪˈwɔːrd/',
              phonetic: 'ri-UORD',
              example:
                "After each move in the game, the agent receives a reward signal indicating whether it moved toward winning or losing. = Dopo ogni mossa nel gioco, l'agente riceve un segnale di ricompensa che indica se si è mosso verso la vittoria o la sconfitta.",
              context: 'machine-learning',
              difficulty: 'advanced',
            },
            {
              english: 'Policy',
              italian: 'Politica',
              pronunciation: '/ˈpɒləsi/',
              phonetic: 'PO-le-si',
              example:
                "The learned policy maps every possible game state to the optimal action the agent should take. = La politica appresa mappa ogni possibile stato di gioco all'azione ottimale che l'agente dovrebbe compiere.",
              context: 'machine-learning',
              difficulty: 'advanced',
              note: 'Detta anche policy in italiano tecnico.',
            },
            {
              english: 'Value Function',
              italian: 'Funzione di valore',
              pronunciation: '/ˈvæljuː ˈfʌŋkʃən/',
              phonetic: 'VAL-iu FANK-scen',
              example:
                "The value function estimates how much total future reward the agent can expect from any given state. = La funzione valore stima quanta ricompensa futura totale l'agente può aspettarsi da ogni dato stato.",
              context: 'machine-learning',
              difficulty: 'advanced',
            },
            {
              english: 'Markov Decision Process',
              italian: 'Processo decisionale di Markov',
              pronunciation: '/ˈmɑːrkɒf dɪˈsɪʒən ˈprɒses/',
              phonetic: 'MAR-kof di-SI-gen PRO-ses',
              example:
                "Formalizing a robot navigation problem as a Markov decision process enables principled policy optimization. = Formalizzare un problema di navigazione robotica come un processo decisionale di Markov abilita l'ottimizzazione della politica in modo rigoroso.",
              context: 'machine-learning',
              difficulty: 'advanced',
              note: 'Abbreviato MDP.',
            },
            {
              english: 'Discount Factor',
              italian: 'Fattore di sconto',
              pronunciation: '/ˈdɪskaʊnt ˈfæktər/',
              phonetic: 'DIS-kaunt FAK-ter',
              example:
                "A discount factor of 0.99 makes the agent value long-term rewards almost as much as immediate ones. = Un fattore di sconto di 0.99 fa sì che l'agente valorizzi le ricompense a lungo termine quasi quanto quelle immediate.",
              context: 'machine-learning',
              difficulty: 'advanced',
              note: 'Tipicamente gamma tra 0.9 e 0.99.',
            },
            {
              english: 'Episode',
              italian: 'Episodio',
              pronunciation: '/ˈepɪsoʊd/',
              phonetic: 'E-pi-soud',
              example:
                "In Atari training, each episode runs from the game start until the player loses all lives or reaches the max score. = Nell'addestramento Atari, ogni episodio va dall'inizio del gioco fino a quando il giocatore perde tutte le vite o raggiunge il punteggio massimo.",
              context: 'machine-learning',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'ai_rl_2',
          title: 'Q-Learning / Apprendimento Q',
          description: 'Apprendere il valore delle azioni',
          items: [
            {
              english: 'Q-Learning',
              italian: 'Algoritmo RL value-based (Q-Learning)',
              pronunciation: '/kjuː ˈlɜːrnɪŋ/',
              phonetic: 'KIU LER-ning',
              example:
                'Classic Q-Learning builds a table mapping every state-action pair to its expected cumulative reward. = Il Q-Learning classico costruisce una tabella che mappa ogni coppia stato-azione alla sua ricompensa cumulativa attesa.',
              context: 'machine-learning',
              difficulty: 'advanced',
              note: 'Algoritmo classico off-policy.',
            },
            {
              english: 'Q-Value',
              italian: 'Valore Q',
              pronunciation: '/kjuː ˈvæljuː/',
              phonetic: 'KIU-VAL-iu',
              example:
                "A high Q-value for a particular move means the agent expects significant future reward from taking that action. = Un Q-value alto per una mossa particolare significa che l'agente si aspetta una ricompensa futura significativa da quell'azione.",
              context: 'machine-learning',
              difficulty: 'advanced',
            },
            {
              english: 'Bellman Equation',
              italian: 'Equazione di Bellman',
              pronunciation: '/ˈbelmən ɪˈkweɪʒən/',
              phonetic: 'BEL-man e-KUEI-gen',
              example:
                "The Bellman equation recursively defines the optimal value of a state in terms of immediate reward plus discounted future value. = L'equazione di Bellman definisce ricorsivamente il valore ottimale di uno stato in termini di ricompensa immediata più valore futuro scontato.",
              context: 'machine-learning',
              difficulty: 'advanced',
            },
            {
              english: 'Deep Q-Network',
              italian: 'DQN con rete neurale (Deep Q-Network)',
              pronunciation: '/diːp kjuː ˈnetwɜːrk/',
              phonetic: 'DIP-KIU NET-uerk',
              example:
                "DeepMind's Deep Q-Network learned to play Atari games at superhuman level by combining Q-learning with convolutional neural networks. = Il Deep Q-Network di DeepMind ha imparato a giocare ad Atari a livello sovrumano combinando Q-learning con reti neurali convoluzionali.",
              context: 'machine-learning',
              difficulty: 'advanced',
              note: 'Abbreviato DQN. Battette giochi Atari.',
            },
            {
              english: 'Experience Replay',
              italian: "Replay dell'esperienza",
              pronunciation: '/ɪkˈspɪriəns ˈriːpleɪ/',
              phonetic: 'ek-SPI-rians RI-plei',
              example:
                "Storing past transitions in an experience replay buffer lets the agent learn from diverse experiences rather than just recent ones. = Memorizzare transizioni passate in un buffer di experience replay permette all'agente di imparare da esperienze diverse piuttosto che solo recenti.",
              context: 'machine-learning',
              difficulty: 'advanced',
            },
            {
              english: 'Target Network',
              italian: 'Rete target',
              pronunciation: '/ˈtɑːrɡɪt ˈnetwɜːrk/',
              phonetic: 'TAR-ghet NET-uerk',
              example:
                "A separate target network that updates slowly prevents the Q-value estimates from oscillating during training. = Una rete target separata che si aggiorna lentamente impedisce alle stime del Q-value di oscillare durante l'addestramento.",
              context: 'machine-learning',
              difficulty: 'advanced',
            },
            {
              english: 'Epsilon-Greedy',
              italian: 'Esplorazione probabilistica (Epsilon-Greedy)',
              pronunciation: '/ˈepsɪlɒn ˈɡriːdi/',
              phonetic: 'EP-si-lon GRI-di',
              example:
                "With epsilon-greedy exploration, the agent takes a random action 10% of the time to discover potentially better strategies. = Con l'esplorazione epsilon-greedy, l'agente compie un'azione casuale il 10% delle volte per scoprire strategie potenzialmente migliori.",
              context: 'machine-learning',
              difficulty: 'advanced',
              note: 'Esplora con probabilità epsilon.',
            },
            {
              english: 'Exploration',
              italian: 'Esplorazione',
              pronunciation: '/ˌekspləˈreɪʃən/',
              phonetic: 'eks-plo-REI-scen',
              example:
                "Without sufficient exploration, the agent may settle on a mediocre strategy and never discover the optimal path. = Senza sufficiente esplorazione, l'agente potrebbe accontentarsi di una strategia mediocre e non scoprire mai il percorso ottimale.",
              context: 'machine-learning',
              difficulty: 'advanced',
            },
            {
              english: 'Exploitation',
              italian: 'Sfruttamento',
              pronunciation: '/ˌeksplɔɪˈteɪʃən/',
              phonetic: 'eks-ploi-TEI-scen',
              example:
                "Pure exploitation means always choosing the action with the highest known reward, risking missed opportunities. = Lo sfruttamento puro significa scegliere sempre l'azione con la ricompensa nota più alta, rischiando di perdere opportunità.",
              context: 'machine-learning',
              difficulty: 'advanced',
            },
            {
              english: 'Off-Policy',
              italian: 'Apprendimento da policy diversa (Off-Policy)',
              pronunciation: '/ɒf ˈpɒləsi/',
              phonetic: 'OF PO-le-si',
              example:
                "An off-policy algorithm like DQN can learn from past experiences stored in replay buffers, improving sample efficiency. = Un algoritmo off-policy come DQN può imparare da esperienze passate memorizzate nei buffer di replay, migliorando l'efficienza dei campioni.",
              context: 'machine-learning',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'ai_rl_3',
          title: 'Policy Gradient / Gradiente di Policy',
          description: 'Ottimizzare direttamente la policy',
          items: [
            {
              english: 'Policy Gradient',
              italian: 'Gradiente di policy',
              pronunciation: '/ˈpɒləsi ˈɡreɪdiənt/',
              phonetic: 'PO-le-si GREI-di-ent',
              example:
                'Instead of estimating values, policy gradient methods directly optimize the policy parameters using gradient ascent on rewards. = Invece di stimare valori, i metodi policy gradient ottimizzano direttamente i parametri della politica usando la salita del gradiente sulle ricompense.',
              context: 'machine-learning',
              difficulty: 'advanced',
            },
            {
              english: 'REINFORCE',
              italian: 'Algoritmo policy gradient base (REINFORCE)',
              pronunciation: '/riːɪnˈfɔːrs/',
              phonetic: 'ri-in-FORS',
              example:
                "The REINFORCE algorithm samples complete episodes and adjusts the policy to favor actions that led to high returns. = L'algoritmo REINFORCE campiona episodi completi e aggiusta la politica per favorire azioni che hanno portato a rendimenti alti.",
              context: 'machine-learning',
              difficulty: 'advanced',
            },
            {
              english: 'Actor-Critic',
              italian: 'Due reti politica e valore (Actor-Critic)',
              pronunciation: '/ˈæktər ˈkrɪtɪk/',
              phonetic: 'AK-ter KRI-tik',
              example:
                "In actor-critic architectures, the actor proposes actions while the critic evaluates them, stabilizing training. = Nelle architetture actor-critic, l'attore propone azioni mentre il critico le valuta, stabilizzando l'addestramento.",
              context: 'machine-learning',
              difficulty: 'advanced',
            },
            {
              english: 'Advantage',
              italian: 'Vantaggio',
              pronunciation: '/ədˈvæntɪdʒ/',
              phonetic: 'ad-VAN-tigi',
              example:
                "The advantage function tells the agent how much better a specific action is compared to the average action in that state. = La funzione vantaggio dice all'agente quanto migliore è un'azione specifica rispetto all'azione media in quello stato.",
              context: 'machine-learning',
              difficulty: 'advanced',
            },
            {
              english: 'PPO',
              italian: 'Proximal Policy Optimization (PPO)',
              pronunciation: '/piː piː oʊ/',
              phonetic: 'PI-PI-O',
              example:
                "Most modern RL systems use PPO because it balances training stability with sample efficiency better than older algorithms. = La maggior parte dei sistemi RL moderni usa PPO perché bilancia stabilità dell'addestramento con efficienza dei campioni meglio degli algoritmi precedenti.",
              context: 'machine-learning',
              difficulty: 'advanced',
              note: 'Proximal Policy Optimization.',
            },
            {
              english: 'TRPO',
              italian: 'Trust Region Policy Optimization (TRPO)',
              pronunciation: '/tiː ɑːr piː oʊ/',
              phonetic: 'TI-AR-PI-O',
              example:
                'Before PPO, TRPO guaranteed monotonic policy improvement by constraining each update within a trust region. = Prima di PPO, TRPO garantiva miglioramento monotono della politica vincolando ogni aggiornamento entro una regione di fiducia.',
              context: 'machine-learning',
              difficulty: 'advanced',
              note: 'Trust Region Policy Optimization.',
            },
            {
              english: 'A3C',
              italian: 'Asynchronous Advantage Actor-Critic (A3C)',
              pronunciation: '/eɪ θriː siː/',
              phonetic: 'EI-TRI-SI',
              example:
                'By running multiple agents in parallel environments, A3C collects diverse experience and learns faster than single-agent methods. = Eseguendo più agenti in ambienti paralleli, A3C raccoglie esperienza diversa e impara più velocemente dei metodi a singolo agente.',
              context: 'machine-learning',
              difficulty: 'advanced',
              note: 'Asynchronous Advantage Actor-Critic.',
            },
            {
              english: 'Entropy Bonus',
              italian: 'Bonus di entropia',
              pronunciation: '/ˈentrəpi ˈboʊnəs/',
              phonetic: 'EN-tro-pi BO-nus',
              example:
                "Adding an entropy bonus to the policy loss prevents the agent from prematurely converging on a single strategy. = Aggiungere un bonus di entropia alla loss della politica impedisce all'agente di convergere prematuramente su una singola strategia.",
              context: 'machine-learning',
              difficulty: 'advanced',
            },
            {
              english: 'Trajectory',
              italian: 'Traiettoria',
              pronunciation: '/trəˈdʒektəri/',
              phonetic: 'tra-GEK-to-ri',
              example:
                "Each trajectory records the sequence of states, actions, and rewards from episode start to termination. = Ogni traiettoria registra la sequenza di stati, azioni e ricompense dall'inizio dell'episodio alla terminazione.",
              context: 'machine-learning',
              difficulty: 'advanced',
            },
            {
              english: 'Stable Baselines',
              italian: 'Stable-Baselines (libreria RL Python)',
              pronunciation: '/ˈsteɪbəl ˈbeɪslaɪnz/',
              phonetic: 'STEI-bel BEIS-lainz',
              example:
                'Researchers prototype RL experiments quickly using Stable Baselines, which provides reliable implementations of PPO, A2C, and SAC. = I ricercatori prototipano esperimenti RL velocemente usando Stable Baselines, che fornisce implementazioni affidabili di PPO, A2C e SAC.',
              context: 'machine-learning',
              difficulty: 'advanced',
              tool: 'stable-baselines3',
            },
          ],
        },
        {
          id: 'ai_rl_4',
          title: 'Advanced RL / RL Avanzato',
          description: 'Tecniche e applicazioni moderne',
          items: [
            {
              english: 'Multi-Agent RL',
              italian: 'RL multi-agente',
              pronunciation: '/ˈmʌltiˌeɪdʒənt ɑːr el/',
              phonetic: 'MAL-ti-EI-gent AR-EL',
              example:
                "In competitive games, multi-agent RL trains several agents simultaneously, each learning to counter the others' strategies. = Nei giochi competitivi, il RL multi-agente addestra diversi agenti simultaneamente, ognuno impara a contrastare le strategie degli altri.",
              context: 'machine-learning',
              difficulty: 'advanced',
            },
            {
              english: 'Self-Play',
              italian: 'Addestramento giocando contro sé stesso (Self-Play)',
              pronunciation: '/self pleɪ/',
              phonetic: 'SELF-PLEI',
              example:
                "AlphaZero used self-play to improve endlessly by playing games against copies of itself. = AlphaZero ha usato il self-play per migliorare all'infinito giocando partite contro copie di se stesso.",
              context: 'machine-learning',
              difficulty: 'advanced',
            },
            {
              english: 'AlphaGo',
              italian: 'Sistema DeepMind che ha battuto Go (AlphaGo)',
              pronunciation: '/ˈælfə ɡoʊ/',
              phonetic: 'AL-fa-GOU',
              example:
                "DeepMind's AlphaGo defeated the world Go champion using a combination of deep learning, MCTS, and reinforcement learning. = AlphaGo di DeepMind ha sconfitto il campione mondiale di Go usando una combinazione di deep learning, MCTS e apprendimento per rinforzo.",
              context: 'machine-learning',
              difficulty: 'advanced',
              note: 'Pietra miliare del 2016.',
            },
            {
              english: 'Monte Carlo Tree Search',
              italian: 'Ricerca Monte Carlo ad albero',
              pronunciation: '/ˈmɒnti ˈkɑːrloʊ triː sɜːrtʃ/',
              phonetic: 'MON-ti KAR-lou TRI-SERCI',
              example:
                "At each move, Monte Carlo Tree Search simulates thousands of random games to estimate the best action. = A ogni mossa, la ricerca ad albero Monte Carlo simula migliaia di partite casuali per stimare l'azione migliore.",
              context: 'machine-learning',
              difficulty: 'advanced',
              note: 'Abbreviata MCTS.',
            },
            {
              english: 'Imitation Learning',
              italian: 'Apprendimento per imitazione',
              pronunciation: '/ˌɪmɪˈteɪʃən ˈlɜːrnɪŋ/',
              phonetic: 'i-mi-TEI-scen LER-ning',
              example:
                "Instead of reward signals, imitation learning trains the agent by watching expert demonstrations of the desired behavior. = Invece di segnali di ricompensa, l'apprendimento per imitazione addestra l'agente osservando dimostrazioni esperte del comportamento desiderato.",
              context: 'machine-learning',
              difficulty: 'advanced',
            },
            {
              english: 'Inverse RL',
              italian: 'RL inverso',
              pronunciation: '/ˈɪnvɜːrs ɑːr el/',
              phonetic: 'IN-vers AR-EL',
              example:
                "Given expert trajectories, inverse RL recovers the hidden reward function that explains the expert's behavior. = Date traiettorie esperte, il RL inverso recupera la funzione di ricompensa nascosta che spiega il comportamento dell'esperto.",
              context: 'machine-learning',
              difficulty: 'advanced',
              note: 'Abbreviato IRL.',
            },
            {
              english: 'Reward Shaping',
              italian: 'Modellazione ricompensa',
              pronunciation: '/rɪˈwɔːrd ˈʃeɪpɪŋ/',
              phonetic: 'ri-UORD SCEI-ping',
              example:
                'Careful reward shaping added intermediate milestones, preventing the robot from getting stuck during long-horizon tasks. = Un attento reward shaping ha aggiunto traguardi intermedi, impedendo al robot di bloccarsi durante compiti a lungo orizzonte.',
              context: 'machine-learning',
              difficulty: 'advanced',
            },
            {
              english: 'Sim-to-Real',
              italian: 'Trasferimento da simulazione a realtà (Sim-to-Real)',
              pronunciation: '/sɪm tuː riːəl/',
              phonetic: 'SIM-TU-RI-al',
              example:
                'Policies trained in simulation must bridge the sim-to-real gap to work reliably on physical robots. = Le politiche addestrate in simulazione devono colmare il divario sim-to-real per funzionare in modo affidabile su robot fisici.',
              context: 'machine-learning',
              difficulty: 'advanced',
            },
            {
              english: 'Curiosity-Driven',
              italian: 'Guidato dalla curiosità',
              pronunciation: '/ˌkjʊriˈɒsəti ˈdrɪvən/',
              phonetic: 'kiu-ri-OS-si-ti DRI-ven',
              example:
                'A curiosity-driven agent explores novel states even without external rewards, discovering useful behaviors on its own. = Un agente guidato dalla curiosità esplora stati nuovi anche senza ricompense esterne, scoprendo comportamenti utili autonomamente.',
              context: 'machine-learning',
              difficulty: 'advanced',
            },
            {
              english: 'Model-Based RL',
              italian: 'RL basato su modello',
              pronunciation: '/ˈmɒdəl beɪst ɑːr el/',
              phonetic: 'MO-del-BEIST AR-EL',
              example:
                'By learning a world model, model-based RL can plan ahead and achieve goals with far fewer real interactions. = Imparando un modello del mondo, il RL basato su modello può pianificare in anticipo e raggiungere obiettivi con molte meno interazioni reali.',
              context: 'machine-learning',
              difficulty: 'advanced',
            },
          ],
        },
      ],
    },
    // ════════════════════════════════════════════════
    // LEVEL 19 - ARCHITETTURE AVANZATE / ADVANCED ARCHITECTURES
    // ════════════════════════════════════════════════
    19: {
      name: 'Architetture Avanzate / Advanced Architectures',
      description: "Architetture all'avanguardia",
      lessons: [
        {
          id: 'ai_advanced_1',
          title: 'Mixture of Experts / Miscela di Esperti',
          description: 'Modelli sparsi e modulari',
          items: [
            {
              english: 'Mixture of Experts',
              italian: 'Miscela di esperti',
              pronunciation: '/ˈmɪkstʃər əv ˈekspɜːrts/',
              phonetic: 'MIK-scer-OF-EK-sperts',
              example:
                "Large models like Mixtral use a mixture of experts architecture, activating only 2 out of 8 expert networks per token. = Grandi modelli come Mixtral usano un'architettura a mistura di esperti, attivando solo 2 degli 8 esperti per token.",
              context: 'architectures',
              difficulty: 'advanced',
              note: 'Abbreviata MoE.',
            },
            {
              english: 'Router',
              italian: 'Instradatore di token (MoE) (Router)',
              pronunciation: '/ˈruːtər/',
              phonetic: 'RU-ter',
              example:
                "The router network learns to send each token to the most relevant expert based on the input content. = La rete router impara a inviare ogni token all'esperto più rilevante in base al contenuto dell'input.",
              context: 'architectures',
              difficulty: 'advanced',
            },
            {
              english: 'Sparse Activation',
              italian: 'Attivazione sparsa',
              pronunciation: '/spɑːrs ˌæktɪˈveɪʃən/',
              phonetic: 'SPARS ak-ti-VEI-scen',
              example:
                "Thanks to sparse activation, a 46B-parameter MoE model uses only 12B parameters per forward pass, saving compute. = Grazie all'attivazione sparsa, un modello MoE da 46B parametri usa solo 12B parametri per passaggio in avanti, risparmiando calcolo.",
              context: 'architectures',
              difficulty: 'advanced',
            },
            {
              english: 'Expert',
              italian: 'Esperto',
              pronunciation: '/ˈekspɜːrt/',
              phonetic: 'EK-spert',
              example:
                'Each expert in the MoE layer specializes in different types of input, from math to creative writing. = Ogni esperto nello strato MoE si specializza in diversi tipi di input, dalla matematica alla scrittura creativa.',
              context: 'architectures',
              difficulty: 'advanced',
            },
            {
              english: 'Top-K Routing',
              italian: 'Routing top-K',
              pronunciation: '/tɒp keɪ ˈruːtɪŋ/',
              phonetic: 'TOP-KEI RU-ting',
              example:
                'With top-K routing set to 2, each token activates exactly two expert networks while bypassing the other six. = Con il routing top-K impostato a 2, ogni token attiva esattamente due reti esperte bypassando le altre sei.',
              context: 'architectures',
              difficulty: 'advanced',
            },
            {
              english: 'Switch Transformer',
              italian: 'MoE Google (Switch Transformer)',
              pronunciation: '/swɪtʃ trænsˈfɔːrmər/',
              phonetic: 'SUICI trans-FOR-mer',
              example:
                "Google's Switch Transformer showed that routing each token to just one expert can match dense-model quality with less compute. = Il Switch Transformer di Google ha mostrato che instradare ogni token a un solo esperto può eguagliare la qualità dei modelli densi con meno calcolo.",
              context: 'architectures',
              difficulty: 'advanced',
            },
            {
              english: 'Mixtral',
              italian: 'LLM MoE Mistral (Mixtral)',
              pronunciation: '/mɪksˈtræl/',
              phonetic: 'MIKS-tral',
              example:
                "Mistral AI's Mixtral outperforms many larger dense models by efficiently routing through 8 specialized expert networks. = Mixtral di Mistral AI supera molti modelli densi più grandi instradando efficientemente attraverso 8 reti esperte specializzate.",
              context: 'architectures',
              difficulty: 'advanced',
              note: 'Da Mistral AI.',
            },
            {
              english: 'Load Balancing',
              italian: 'Bilanciamento del carico',
              pronunciation: '/loʊd ˈbælənsɪŋ/',
              phonetic: 'LOUD BA-lan-sing',
              example:
                'Without proper load balancing in MoE, some experts handle 90% of tokens while others sit idle. = Senza un adeguato bilanciamento del carico nel MoE, alcuni esperti gestiscono il 90% dei token mentre altri restano inattivi.',
              context: 'architectures',
              difficulty: 'advanced',
            },
            {
              english: 'Active Parameters',
              italian: 'Parametri attivi',
              pronunciation: '/ˈæktɪv pəˈræmɪtərz/',
              phonetic: 'AK-tiv pa-RA-me-ters',
              example:
                'Despite having 47B total parameters, Mixtral uses only 13B active parameters per inference step. = Nonostante abbia 47B parametri totali, Mixtral usa solo 13B parametri attivi per passo di inferenza.',
              context: 'architectures',
              difficulty: 'advanced',
            },
            {
              english: 'Conditional Computation',
              italian: 'Calcolo condizionale',
              pronunciation: '/kənˈdɪʃənəl ˌkɒmpjʊˈteɪʃən/',
              phonetic: 'kon-DI-scio-nal kom-piu-TEI-scen',
              example:
                'Through conditional computation, MoE models scale capacity without proportionally increasing inference cost. = Attraverso la computazione condizionale, i modelli MoE scalano la capacità senza aumentare proporzionalmente il costo di inferenza.',
              context: 'architectures',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'ai_advanced_2',
          title: 'Long Context / Contesto Lungo',
          description: 'Gestire sequenze molto lunghe',
          items: [
            {
              english: 'Long Context',
              italian: 'Contesto lungo',
              pronunciation: '/lɒŋ ˈkɒntekst/',
              phonetic: 'LONG KON-tekst',
              example:
                'Models with 128K long context can process entire codebases, legal contracts, or book manuscripts in one pass. = Modelli con contesto lungo di 128K possono elaborare interi codebase, contratti legali o manoscritti di libri in un solo passaggio.',
              context: 'architectures',
              difficulty: 'advanced',
            },
            {
              english: 'Flash Attention',
              italian: 'Attenzione efficiente in memoria (Flash Attention)',
              pronunciation: '/flæʃ əˈtenʃən/',
              phonetic: 'FLASH a-TEN-scen',
              example:
                "Implementing Flash Attention reduced our Transformer's memory usage by 5x and sped up training by 2x. = Implementare Flash Attention ha ridotto l'uso di memoria del nostro Transformer di 5 volte e accelerato l'addestramento di 2 volte.",
              context: 'architectures',
              difficulty: 'advanced',
              tool: 'flash-attn',
            },
            {
              english: 'Sparse Attention',
              italian: 'Attenzione sparsa',
              pronunciation: '/spɑːrs əˈtenʃən/',
              phonetic: 'SPARS a-TEN-scen',
              example:
                'Instead of attending to all tokens, sparse attention patterns like local windows reduce complexity from quadratic to linear. = Invece di attendere a tutti i token, pattern di attenzione sparsa come finestre locali riducono la complessità da quadratica a lineare.',
              context: 'architectures',
              difficulty: 'advanced',
            },
            {
              english: 'Sliding Window Attention',
              italian: 'Attenzione a finestra mobile',
              pronunciation: '/ˈslaɪdɪŋ ˈwɪndoʊ əˈtenʃən/',
              phonetic: 'SLAI-ding UIN-dou a-TEN-scen',
              example:
                "Mistral uses sliding window attention with a 4,096-token window, efficiently handling long sequences without full quadratic cost. = Mistral usa l'attenzione a finestra scorrevole con una finestra di 4.096 token, gestendo efficientemente sequenze lunghe senza costo quadratico completo.",
              context: 'architectures',
              difficulty: 'advanced',
            },
            {
              english: 'RoPE',
              italian: 'Rotary Positional Embedding (RoPE)',
              pronunciation: '/roʊp/',
              phonetic: 'ROUP',
              example:
                'Modern LLMs encode token positions using RoPE, which naturally extends to sequence lengths beyond the training distribution. = I moderni LLM codificano le posizioni dei token usando RoPE, che si estende naturalmente a lunghezze di sequenza oltre la distribuzione di addestramento.',
              context: 'architectures',
              difficulty: 'advanced',
              note: 'Rotary Position Embedding.',
            },
            {
              english: 'ALiBi',
              italian: 'Attention with Linear Biases (ALiBi)',
              pronunciation: '/əˈlɪbi/',
              phonetic: 'a-LI-bi',
              example:
                'By adding learned linear biases to attention scores, ALiBi enables length generalization without explicit positional embeddings. = Aggiungendo bias lineari appresi ai punteggi di attenzione, ALiBi abilita la generalizzazione della lunghezza senza embedding posizionali espliciti.',
              context: 'architectures',
              difficulty: 'advanced',
              note: 'Attention with Linear Biases.',
            },
            {
              english: 'Linear Attention',
              italian: 'Attenzione lineare',
              pronunciation: '/ˈlɪniər əˈtenʃən/',
              phonetic: 'LI-nier a-TEN-scen',
              example:
                "Replacing softmax with kernel approximations, linear attention reduces the computational cost from O(n²) to O(n). = Sostituendo softmax con approssimazioni kernel, l'attenzione lineare riduce il costo computazionale da O(n²) a O(n).",
              context: 'architectures',
              difficulty: 'advanced',
            },
            {
              english: 'Mamba',
              italian: 'Architettura state-space alternativa al transformer (Mamba)',
              pronunciation: '/ˈmæmbə/',
              phonetic: 'MAM-ba',
              example:
                "The Mamba architecture replaces attention entirely with selective state space layers, processing sequences in linear time. = L'architettura Mamba sostituisce completamente l'attenzione con strati di spazio degli stati selettivi, elaborando sequenze in tempo lineare.",
              context: 'architectures',
              difficulty: 'advanced',
            },
            {
              english: 'State Space Model',
              italian: 'Modello state-space',
              pronunciation: '/steɪt speɪs ˈmɒdəl/',
              phonetic: 'STEIT SPEIS MO-del',
              example:
                'Unlike Transformers, a state space model processes tokens recurrently, enabling constant-memory inference on long sequences. = A differenza dei Transformer, un modello a spazio degli stati elabora i token ricorrentemente, abilitando inferenza a memoria costante su sequenze lunghe.',
              context: 'architectures',
              difficulty: 'advanced',
              note: 'Abbreviato SSM.',
            },
            {
              english: 'KV Cache',
              italian: 'Cache KV',
              pronunciation: '/keɪ viː kæʃ/',
              phonetic: 'KEI-VI KASH',
              example:
                'During autoregressive generation, the KV cache stores previously computed key-value pairs to avoid redundant computation. = Durante la generazione autoregressiva, la cache KV memorizza coppie chiave-valore precedentemente calcolate per evitare calcoli ridondanti.',
              context: 'architectures',
              difficulty: 'advanced',
              note: 'Memorizza Key-Value per evitare ricalcolo.',
            },
          ],
        },
        {
          id: 'ai_advanced_3',
          title: 'Multimodal Models / Modelli Multimodali',
          description: 'Modelli che combinano modalità',
          items: [
            {
              english: 'Multimodal',
              italian: 'Multimodale',
              pronunciation: '/ˌmʌltiˈmoʊdəl/',
              phonetic: 'MAL-ti-MO-dal',
              example:
                'GPT-4 is a multimodal model that processes both text and images, enabling tasks like chart analysis and visual QA. = GPT-4 è un modello multimodale che elabora sia testo che immagini, abilitando compiti come analisi di grafici e QA visiva.',
              context: 'architectures',
              difficulty: 'advanced',
            },
            {
              english: 'CLIP',
              italian: 'Modello multimodale OpenAI (CLIP)',
              pronunciation: '/klɪp/',
              phonetic: 'KLIP',
              example:
                "OpenAI's CLIP learns joint text-image representations, enabling zero-shot image classification from natural language descriptions. = CLIP di OpenAI impara rappresentazioni congiunte testo-immagine, abilitando la classificazione zero-shot delle immagini da descrizioni in linguaggio naturale.",
              context: 'architectures',
              difficulty: 'advanced',
              note: 'Contrastive Language-Image Pretraining.',
            },
            {
              english: 'GPT-4V',
              italian: 'GPT-4 con visione (GPT-4V)',
              pronunciation: '/dʒiː piː tiː fɔːr viː/',
              phonetic: 'GI-PI-TI-FOR-VI',
              example:
                'With vision capabilities, GPT-4V can describe images, solve visual puzzles, and read handwritten text. = Con capacità visive, GPT-4V può descrivere immagini, risolvere puzzle visivi e leggere testo scritto a mano.',
              context: 'architectures',
              difficulty: 'advanced',
            },
            {
              english: 'Gemini',
              italian: 'LLM multimodale Google (Gemini)',
              pronunciation: '/ˈdʒemɪni/',
              phonetic: 'GE-mi-ni',
              example:
                "Google's Gemini natively processes text, images, audio, and video within a single unified architecture. = Gemini di Google elabora nativamente testo, immagini, audio e video all'interno di un'unica architettura unificata.",
              context: 'architectures',
              difficulty: 'advanced',
            },
            {
              english: 'Modality Fusion',
              italian: 'Fusione di modalità',
              pronunciation: '/moʊˈdæləti ˈfjuːʒən/',
              phonetic: 'mo-DA-li-ti FIU-gen',
              example:
                'Effective modality fusion lets the model cross-reference a spoken description with the visual content of a video. = Una fusione delle modalità efficace permette al modello di incrociare una descrizione parlata con il contenuto visivo di un video.',
              context: 'architectures',
              difficulty: 'advanced',
            },
            {
              english: 'Cross-Modal Attention',
              italian: 'Attenzione cross-modale',
              pronunciation: '/krɒs ˈmoʊdəl əˈtenʃən/',
              phonetic: 'KROS MO-dal a-TEN-scen',
              example:
                "Using cross-modal attention, the model grounds its text generation in specific regions of the input image. = Usando l'attenzione cross-modale, il modello ancora la generazione di testo in regioni specifiche dell'immagine di input.",
              context: 'architectures',
              difficulty: 'advanced',
            },
            {
              english: 'Audio-Language Model',
              italian: 'Modello audio-linguaggio',
              pronunciation: '/ˈɔːdioʊ ˈlæŋɡwɪdʒ ˈmɒdəl/',
              phonetic: 'AU-dio LAN-guigi MO-del',
              example:
                'An audio-language model can transcribe, translate, and answer questions about spoken conversations simultaneously. = Un modello audio-linguistico può trascrivere, tradurre e rispondere a domande su conversazioni parlate simultaneamente.',
              context: 'architectures',
              difficulty: 'advanced',
              tool: 'Whisper, AudioPaLM',
            },
            {
              english: 'Video-Language Model',
              italian: 'Modello video-linguaggio',
              pronunciation: '/ˈvɪdioʊ ˈlæŋɡwɪdʒ ˈmɒdəl/',
              phonetic: 'VI-di-o LAN-guigi MO-del',
              example:
                "A video-language model analyzes entire clips and answers temporal questions like 'What happened after the car stopped?' = Un modello video-linguistico analizza interi clip e risponde a domande temporali come 'Cosa è successo dopo che l'auto si è fermata?'",
              context: 'architectures',
              difficulty: 'advanced',
            },
            {
              english: 'Embodied AI',
              italian: 'IA incarnata',
              pronunciation: '/ɪmˈbɒdid eɪ aɪ/',
              phonetic: 'em-BO-did EI-AI',
              example:
                "Research in embodied AI trains robots to follow natural language instructions in physical environments. = La ricerca nell'IA incarnata addestra robot a seguire istruzioni in linguaggio naturale in ambienti fisici.",
              context: 'architectures',
              difficulty: 'advanced',
            },
            {
              english: 'Vision-Language Model',
              italian: 'Modello visione-linguaggio',
              pronunciation: '/ˈvɪʒən ˈlæŋɡwɪdʒ ˈmɒdəl/',
              phonetic: 'VI-gen LAN-guigi MO-del',
              example:
                'A vision-language model can generate detailed alt-text descriptions for images across an entire website. = Un modello visione-linguaggio può generare descrizioni alt-text dettagliate per le immagini di un intero sito web.',
              context: 'architectures',
              difficulty: 'advanced',
              note: 'Abbreviato VLM.',
            },
          ],
        },
        {
          id: 'ai_advanced_4',
          title: 'Agentic AI / IA ad Agenti',
          description: 'Sistemi che agiscono autonomamente',
          items: [
            {
              english: 'Agentic AI',
              italian: 'IA ad agenti',
              pronunciation: '/əˈdʒentɪk eɪ aɪ/',
              phonetic: 'a-GEN-tik EI-AI',
              example:
                'Modern agentic AI systems can browse the web, write code, and execute multi-step plans autonomously. = I moderni sistemi di IA agentica possono navigare il web, scrivere codice ed eseguire piani multi-step in modo autonomo.',
              context: 'architectures',
              difficulty: 'advanced',
            },
            {
              english: 'Tool Use',
              italian: 'Uso di strumenti',
              pronunciation: '/tuːl juːz/',
              phonetic: 'TUL IUZ',
              example:
                "By integrating tool use, the LLM can call a calculator for math, a search engine for facts, and an API for data. = Integrando l'uso di strumenti, l'LLM può chiamare una calcolatrice per la matematica, un motore di ricerca per i fatti e un'API per i dati.",
              context: 'architectures',
              difficulty: 'advanced',
            },
            {
              english: 'Planning',
              italian: 'Pianificazione',
              pronunciation: '/ˈplænɪŋ/',
              phonetic: 'PLAN-ning',
              example:
                "Before executing, the agent performs multi-step planning to decompose a complex request into subtasks. = Prima di eseguire, l'agente esegue una pianificazione multi-step per scomporre una richiesta complessa in sotto-compiti.",
              context: 'architectures',
              difficulty: 'advanced',
            },
            {
              english: 'Memory',
              italian: 'Memoria',
              pronunciation: '/ˈmeməri/',
              phonetic: 'ME-mo-ri',
              example:
                "Persistent memory lets the agent recall past conversations and user preferences across multiple sessions. = La memoria persistente permette all'agente di ricordare conversazioni passate e preferenze dell'utente attraverso sessioni multiple.",
              context: 'architectures',
              difficulty: 'advanced',
            },
            {
              english: 'LangChain',
              italian: 'Framework applicazioni LLM (LangChain)',
              pronunciation: '/ˈlæŋtʃeɪn/',
              phonetic: 'LANG-cein',
              example:
                'Developers use LangChain to chain LLM calls with retrieval, memory, and tools into complex applications. = Gli sviluppatori usano LangChain per concatenare chiamate LLM con retrieval, memoria e strumenti in applicazioni complesse.',
              context: 'architectures',
              difficulty: 'advanced',
              tool: 'langchain',
            },
            {
              english: 'LlamaIndex',
              italian: 'Framework RAG (LlamaIndex)',
              pronunciation: '/ˈlɑːmə ˈɪndeks/',
              phonetic: 'LA-ma IN-deks',
              example:
                'For RAG applications, LlamaIndex provides optimized indexing and retrieval pipelines over custom document collections. = Per applicazioni RAG, LlamaIndex fornisce pipeline di indicizzazione e retrieval ottimizzate su collezioni di documenti personalizzate.',
              context: 'architectures',
              difficulty: 'advanced',
              tool: 'llama-index',
            },
            {
              english: 'Tool Calling',
              italian: 'Chiamata di strumenti',
              pronunciation: '/tuːl ˈkɔːlɪŋ/',
              phonetic: 'TUL KO-ling',
              example:
                "When the user asks for the weather, tool calling lets the model invoke a weather API instead of guessing. = Quando l'utente chiede il meteo, il tool calling permette al modello di invocare un'API meteo invece di indovinare.",
              context: 'architectures',
              difficulty: 'advanced',
            },
            {
              english: 'AutoGPT',
              italian: 'Agente LLM autonomo open source (AutoGPT)',
              pronunciation: '/ˈɔːtoʊ dʒiː piː tiː/',
              phonetic: 'AU-tou-GI-PI-TI',
              example:
                'Early experiments with AutoGPT demonstrated how an LLM can set goals, plan steps, and execute them with minimal human input. = I primi esperimenti con AutoGPT hanno dimostrato come un LLM possa impostare obiettivi, pianificare passi ed eseguirli con minimo input umano.',
              context: 'architectures',
              difficulty: 'advanced',
            },
            {
              english: 'Self-Improvement',
              italian: 'Auto-miglioramento',
              pronunciation: '/self ɪmˈpruːvmənt/',
              phonetic: 'SELF im-PRUV-ment',
              example:
                "In a self-improvement loop, the agent evaluates its own outputs and refines them iteratively until quality thresholds are met. = In un ciclo di auto-miglioramento, l'agente valuta i propri output e li affina iterativamente fino al raggiungimento delle soglie di qualità.",
              context: 'architectures',
              difficulty: 'advanced',
            },
            {
              english: 'Agent Workflow',
              italian: 'Workflow di agenti',
              pronunciation: '/ˈeɪdʒənt ˈwɜːrkfloʊ/',
              phonetic: 'EI-gent UERK-flou',
              example:
                'Our production agent workflow orchestrates document retrieval, analysis, summarization, and email drafting in sequence. = Il nostro workflow agente in produzione orchestra retrieval di documenti, analisi, riassunto e redazione email in sequenza.',
              context: 'architectures',
              difficulty: 'advanced',
            },
          ],
        },
      ],
    },
    // ════════════════════════════════════════════════
    // LEVEL 20 - DATI SU LARGA SCALA / DATA AT SCALE
    // ════════════════════════════════════════════════
    20: {
      name: 'Dati su Larga Scala / Data at Scale',
      description: 'Gestire grandi volumi di dati per ML',
      lessons: [
        {
          id: 'ai_scale_1',
          title: 'Data Pipelines / Pipeline di Dati',
          description: 'Flussi di dati per ML in produzione',
          items: [
            {
              english: 'Data Pipeline',
              italian: 'Pipeline di dati',
              pronunciation: '/ˈdeɪtə ˈpaɪplaɪn/',
              phonetic: 'DEI-ta PAIP-lain',
              example:
                'A robust data pipeline ingests raw logs from 12 sources, validates schemas, and delivers clean features to the model. = Una pipeline dati robusta acquisisce log grezzi da 12 fonti, valida gli schemi e consegna feature pulite al modello.',
              context: 'data-engineering',
              difficulty: 'advanced',
            },
            {
              english: 'ETL',
              italian: 'Estrazione, trasformazione, caricamento (ETL)',
              pronunciation: '/iː tiː el/',
              phonetic: 'I-TI-EL',
              example:
                'Our nightly ETL job extracts sales data from Postgres, transforms it with pandas, and loads it into the warehouse. = Il nostro job ETL notturno estrae dati di vendita da Postgres, li trasforma con pandas e li carica nel warehouse.',
              context: 'data-engineering',
              difficulty: 'advanced',
              note: 'Extract Transform Load.',
            },
            {
              english: 'ELT',
              italian: 'Estrai, carica, trasforma (ELT)',
              pronunciation: '/iː el tiː/',
              phonetic: 'I-EL-TI',
              example:
                "With cloud warehouses, ELT loads raw data first and defers transformation to SQL queries executed on-demand. = Con i warehouse cloud, l'ELT carica prima i dati grezzi e differisce la trasformazione a query SQL eseguite su richiesta.",
              context: 'data-engineering',
              difficulty: 'advanced',
              note: 'Variante moderna di ETL.',
            },
            {
              english: 'Stream Processing',
              italian: 'Elaborazione di flussi',
              pronunciation: '/striːm ˈprɒsesɪŋ/',
              phonetic: 'STRIM PRO-se-sing',
              example:
                "Real-time fraud detection requires stream processing to score each transaction within milliseconds of arrival. = Il rilevamento frodi in tempo reale richiede l'elaborazione a flusso per valutare ogni transazione entro millisecondi dall'arrivo.",
              context: 'data-engineering',
              difficulty: 'advanced',
              tool: 'Apache Kafka, Flink',
            },
            {
              english: 'Batch Processing',
              italian: 'Elaborazione batch',
              pronunciation: '/bætʃ ˈprɒsesɪŋ/',
              phonetic: 'BACI PRO-se-sing',
              example:
                "For monthly financial reports, batch processing aggregates millions of transactions overnight for analysis. = Per report finanziari mensili, l'elaborazione batch aggrega milioni di transazioni durante la notte per l'analisi.",
              context: 'data-engineering',
              difficulty: 'advanced',
            },
            {
              english: 'Apache Spark',
              italian: 'Motore di calcolo distribuito (Apache Spark)',
              pronunciation: '/əˈpætʃi spɑːrk/',
              phonetic: 'a-PA-ci SPARK',
              example:
                "Our feature engineering pipeline runs on Apache Spark, processing 50TB of clickstream data in under an hour. = La nostra pipeline di ingegneria delle feature gira su Apache Spark, elaborando 50TB di dati clickstream in meno di un'ora.",
              context: 'data-engineering',
              difficulty: 'advanced',
              tool: 'PySpark',
            },
            {
              english: 'Dask',
              italian: 'Calcolo parallelo Python (Dask)',
              pronunciation: '/dæsk/',
              phonetic: 'DASK',
              example:
                'When pandas runs out of memory, Dask provides the same DataFrame API but distributes computation across a cluster. = Quando pandas esaurisce la memoria, Dask fornisce la stessa API DataFrame ma distribuisce il calcolo su un cluster.',
              context: 'data-engineering',
              difficulty: 'advanced',
              tool: 'dask',
            },
            {
              english: 'Apache Beam',
              italian: 'Modello unificato batch+stream (Apache Beam)',
              pronunciation: '/əˈpætʃi biːm/',
              phonetic: 'a-PA-ci BIM',
              example:
                "We chose Apache Beam because its unified API supports both batch and streaming execution on any runner. = Abbiamo scelto Apache Beam perché la sua API unificata supporta sia l'esecuzione batch che streaming su qualsiasi runner.",
              context: 'data-engineering',
              difficulty: 'advanced',
              tool: 'Apache Beam',
            },
            {
              english: 'Data Versioning',
              italian: 'Versionamento dei dati',
              pronunciation: '/ˈdeɪtə ˈvɜːrʒənɪŋ/',
              phonetic: 'DEI-ta VER-gio-ning',
              example:
                "With data versioning, we can exactly reproduce the model from March by checking out that month's data snapshot. = Con il versionamento dei dati, possiamo riprodurre esattamente il modello di marzo controllando lo snapshot dei dati di quel mese.",
              context: 'data-engineering',
              difficulty: 'advanced',
              tool: 'DVC, lakeFS',
            },
            {
              english: 'Data Lineage',
              italian: 'Lineage dei dati',
              pronunciation: '/ˈdeɪtə ˈlɪniɪdʒ/',
              phonetic: 'DEI-ta LI-ni-igi',
              example:
                'When a prediction seemed wrong, data lineage tracking showed the root cause was a stale currency exchange rate. = Quando una predizione sembrava errata, il tracciamento della lineage dati ha mostrato che la causa era un tasso di cambio valuta non aggiornato.',
              context: 'data-engineering',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'ai_scale_2',
          title: 'Data Storage / Archiviazione Dati',
          description: 'Soluzioni per memorizzare dati ML',
          items: [
            {
              english: 'Data Lake',
              italian: 'Lago dati grezzi (Data Lake)',
              pronunciation: '/ˈdeɪtə leɪk/',
              phonetic: 'DEI-ta LEIK',
              example:
                'All raw sensor data lands in the data lake first, where data scientists can query it in its original format. = Tutti i dati grezzi dei sensori atterrano prima nel data lake, dove i data scientist possono interrogarli nel formato originale.',
              context: 'data-engineering',
              difficulty: 'advanced',
              tool: 'AWS S3, Azure Data Lake',
            },
            {
              english: 'Data Warehouse',
              italian: 'Magazzino dati analitico (Data Warehouse)',
              pronunciation: '/ˈdeɪtə ˈweərhaʊs/',
              phonetic: 'DEI-ta UER-haus',
              example:
                'Cleaned, aggregated metrics for executive dashboards are stored in the data warehouse for fast query performance. = Metriche pulite e aggregate per dashboard dirigenziali sono memorizzate nel data warehouse per prestazioni di query veloci.',
              context: 'data-engineering',
              difficulty: 'advanced',
              tool: 'Snowflake, BigQuery, Redshift',
            },
            {
              english: 'Data Lakehouse',
              italian: 'Ibrido lake + warehouse (Data Lakehouse)',
              pronunciation: '/ˈdeɪtə ˈleɪkhaʊs/',
              phonetic: 'DEI-ta LEIK-haus',
              example:
                'A data lakehouse combines the flexibility of a lake with the performance and governance of a warehouse. = Un data lakehouse combina la flessibilità di un lake con le prestazioni e la governance di un warehouse.',
              context: 'data-engineering',
              difficulty: 'advanced',
              tool: 'Databricks',
            },
            {
              english: 'Parquet',
              italian: 'Formato colonnare comune (Parquet)',
              pronunciation: '/pɑːrˈkeɪ/',
              phonetic: 'par-KEI',
              example:
                "Storing training data in Parquet format reduced disk usage by 75% compared to CSV thanks to columnar compression. = Memorizzare i dati di addestramento in formato Parquet ha ridotto l'uso disco del 75% rispetto al CSV grazie alla compressione colonnare.",
              context: 'data-engineering',
              difficulty: 'advanced',
              code: 'df.to_parquet("data.parquet")',
            },
            {
              english: 'Delta Lake',
              italian: 'Storage transazionale Databricks (Delta Lake)',
              pronunciation: '/ˈdeltə leɪk/',
              phonetic: 'DEL-ta LEIK',
              example:
                "With ACID transactions on Delta Lake, concurrent data writers never corrupt the feature tables used for training. = Con transazioni ACID su Delta Lake, gli scrittori di dati concorrenti non corrompono mai le tabelle di feature usate per l'addestramento.",
              context: 'data-engineering',
              difficulty: 'advanced',
              tool: 'Delta Lake',
            },
            {
              english: 'Apache Iceberg',
              italian: 'Table format moderno (Apache Iceberg)',
              pronunciation: '/əˈpætʃi ˈaɪsbɜːrɡ/',
              phonetic: 'a-PA-ci AIS-berg',
              example:
                'Migrating to Apache Iceberg gave us time-travel queries and schema evolution without breaking existing pipelines. = Migrare ad Apache Iceberg ci ha dato query time-travel ed evoluzione dello schema senza rompere le pipeline esistenti.',
              context: 'data-engineering',
              difficulty: 'advanced',
              tool: 'Apache Iceberg',
            },
            {
              english: 'Object Storage',
              italian: 'Archiviazione a oggetti',
              pronunciation: '/ˈɒbdʒekt ˈstɔːrɪdʒ/',
              phonetic: 'OB-gekt STO-rigi',
              example:
                'Training data is archived in S3 object storage, which provides unlimited capacity at pennies per gigabyte. = I dati di addestramento sono archiviati in object storage S3, che fornisce capacità illimitata a centesimi per gigabyte.',
              context: 'data-engineering',
              difficulty: 'advanced',
              tool: 'S3, GCS, Azure Blob',
            },
            {
              english: 'NoSQL',
              italian: 'Database non relazionali (NoSQL)',
              pronunciation: '/ˌnoʊ ˈsiːkwəl/',
              phonetic: 'NO-SI-kuel',
              example:
                'We store real-time user features in a NoSQL database because its flexible schema handles rapidly evolving data shapes. = Memorizziamo le feature utente in tempo reale in un database NoSQL perché il suo schema flessibile gestisce forme dati in rapida evoluzione.',
              context: 'data-engineering',
              difficulty: 'advanced',
              tool: 'MongoDB, Cassandra',
            },
            {
              english: 'Time Series Database',
              italian: 'Database serie temporali',
              pronunciation: '/taɪm ˈsɪriːz ˈdeɪtəbeɪs/',
              phonetic: 'TAIM SI-riz DEI-ta-beis',
              example:
                'Sensor readings from IoT devices stream into a time series database optimized for high-throughput sequential writes. = Le letture dei sensori da dispositivi IoT fluiscono in un database a serie temporali ottimizzato per scritture sequenziali ad alto throughput.',
              context: 'data-engineering',
              difficulty: 'advanced',
              tool: 'InfluxDB, TimescaleDB',
            },
            {
              english: 'Graph Database',
              italian: 'Database a grafo',
              pronunciation: '/ˈvektər ˈdeɪtəbeɪs/',
              phonetic: 'VEK-ter DEI-ta-beis',
              example:
                'Recommendation pipelines often store user-item relationships in a graph database to enable multi-hop traversals at query time. = Le pipeline di raccomandazione spesso memorizzano le relazioni utente-item in un database a grafo per abilitare attraversamenti multi-hop al momento della query.',
              context: 'data-engineering',
              difficulty: 'advanced',
              tool: 'Pinecone, Qdrant, Milvus',
              note: 'Esempi: Neo4j, Amazon Neptune, ArangoDB.',
            },
          ],
        },
        {
          id: 'ai_scale_3',
          title: 'Feature Stores / Feature Store',
          description: 'Centralizzare le feature ML',
          items: [
            {
              english: 'Feature Pipeline',
              italian: 'Pipeline di feature',
              pronunciation: '/ˈfiːtʃər stɔːr/',
              phonetic: 'FII-cer STOR',
              example:
                'The feature pipeline ingests raw event logs hourly, computes rolling aggregates, and writes the results to both online and offline stores. = La pipeline di feature ingerisce i log eventi grezzi ogni ora, calcola aggregati a finestra mobile e scrive i risultati su store online e offline.',
              context: 'data-engineering',
              difficulty: 'advanced',
              tool: 'Feast, Tecton',
              note: 'Tipicamente orchestrata con Airflow, Dagster o framework specifici come Feast.',
            },
            {
              english: 'Online Features',
              italian: 'Feature online',
              pronunciation: '/ˈɒnlaɪn ˈfiːtʃərz/',
              phonetic: 'ON-lain FII-cers',
              example:
                'For real-time fraud scoring, the system reads online features like current account balance from a low-latency store. = Per lo scoring frodi in tempo reale, il sistema legge feature online come il saldo corrente del conto da un archivio a bassa latenza.',
              context: 'data-engineering',
              difficulty: 'advanced',
            },
            {
              english: 'Offline Features',
              italian: 'Feature offline',
              pronunciation: '/ˈɒflaɪn ˈfiːtʃərz/',
              phonetic: 'OF-lain FII-cers',
              example:
                'Historical purchase totals and average session lengths are computed as offline features during nightly batch jobs. = Totali storici degli acquisti e lunghezze medie delle sessioni sono calcolati come feature offline durante job batch notturni.',
              context: 'data-engineering',
              difficulty: 'advanced',
            },
            {
              english: 'Feature Group',
              italian: 'Gruppo di feature',
              pronunciation: '/ˈfiːtʃər ɡruːp/',
              phonetic: 'FII-cer GRUP',
              example:
                'We organized customer demographics, purchase history, and web behavior into separate feature groups for modularity. = Abbiamo organizzato dati demografici, cronologia acquisti e comportamento web in gruppi di feature separati per modularità.',
              context: 'data-engineering',
              difficulty: 'advanced',
            },
            {
              english: 'Point-in-Time',
              italian: 'Ripristino a uno specifico istante (Point-in-Time)',
              pronunciation: '/pɔɪnt ɪn taɪm/',
              phonetic: 'POINT-IN-TAIM',
              example:
                'Using point-in-time joins prevents future data from leaking into historical training examples. = Usare join point-in-time impedisce ai dati futuri di infiltrarsi negli esempi di addestramento storici.',
              context: 'data-engineering',
              difficulty: 'advanced',
              note: 'Cruciale per features storiche corrette.',
            },
            {
              english: 'Feature Backfill',
              italian: 'Backfill di feature',
              pronunciation: '/ˈfiːtʃər ˈbækfɪl/',
              phonetic: 'FII-cer BAK-fil',
              example:
                'After defining a new feature, feature backfill computed its historical values for all 3 years of training data. = Dopo aver definito una nuova feature, il backfill delle feature ha calcolato i suoi valori storici per tutti i 3 anni di dati di addestramento.',
              context: 'data-engineering',
              difficulty: 'advanced',
            },
            {
              english: 'Feature Serving',
              italian: 'Servizio feature',
              pronunciation: '/ˈfiːtʃər ˈsɜːrvɪŋ/',
              phonetic: 'FII-cer SER-ving',
              example:
                'Low-latency feature serving delivers precomputed features to the model within 10 milliseconds per request. = Il serving di feature a bassa latenza consegna feature precalcolate al modello entro 10 millisecondi per richiesta.',
              context: 'data-engineering',
              difficulty: 'advanced',
            },
            {
              english: 'Feature Reuse',
              italian: 'Riuso di feature',
              pronunciation: '/ˈfiːtʃər riːˈjuːz/',
              phonetic: 'FII-cer ri-IUZ',
              example:
                'Centralizing features enabled feature reuse: the churn model and the upsell model now share the same engagement score. = Centralizzare le feature ha abilitato il riuso delle feature: il modello di churn e quello di upsell ora condividono lo stesso punteggio di engagement.',
              context: 'data-engineering',
              difficulty: 'advanced',
            },
            {
              english: 'Feature Discovery',
              italian: 'Scoperta di feature',
              pronunciation: '/ˈfiːtʃər dɪˈskʌvəri/',
              phonetic: 'FII-cer dis-KA-ve-ri',
              example:
                'The feature discovery catalog lets data scientists search for existing features before building new ones from scratch. = Il catalogo di discovery delle feature permette ai data scientist di cercare feature esistenti prima di costruirne di nuove da zero.',
              context: 'data-engineering',
              difficulty: 'advanced',
            },
            {
              english: 'Time Travel',
              italian: 'Interrogazione storica (Time Travel)',
              pronunciation: '/taɪm ˈtrævəl/',
              phonetic: 'TAIM TRA-vel',
              example:
                'When debugging a prediction from last Tuesday, time travel queried the exact feature values as they existed that day. = Durante il debugging di una predizione di martedì scorso, il time travel ha interrogato i valori esatti delle feature come esistevano quel giorno.',
              context: 'data-engineering',
              difficulty: 'advanced',
              note: 'Funzione di Delta Lake e simili.',
            },
          ],
        },
        {
          id: 'ai_scale_4',
          title: 'Big Data Tools / Strumenti Big Data',
          description: 'Tecnologie per dataset enormi',
          items: [
            {
              english: 'Hadoop',
              italian: 'Framework big data classico (Hadoop)',
              pronunciation: '/ˈhædʊp/',
              phonetic: 'HA-dup',
              example:
                "Although Spark has largely replaced it, Hadoop remains in production at many enterprises for large-scale batch storage. = Sebbene Spark lo abbia largamente sostituito, Hadoop resta in produzione in molte aziende per l'archiviazione batch su larga scala.",
              context: 'data-engineering',
              difficulty: 'advanced',
              tool: 'Apache Hadoop',
            },
            {
              english: 'HDFS',
              italian: 'Hadoop Distributed File System (HDFS)',
              pronunciation: '/eɪtʃ diː ef es/',
              phonetic: 'EICI-DI-EF-ES',
              example:
                'Training datasets too large for a single machine are distributed across HDFS nodes for parallel reading. = Dataset di addestramento troppo grandi per una singola macchina sono distribuiti su nodi HDFS per la lettura parallela.',
              context: 'data-engineering',
              difficulty: 'advanced',
              note: 'Hadoop Distributed File System.',
            },
            {
              english: 'MapReduce',
              italian: 'Paradigma map-reduce di Google (MapReduce)',
              pronunciation: '/mæp rɪˈdjuːs/',
              phonetic: 'MAP-ri-DIUS',
              example:
                "Before Spark, MapReduce was the standard paradigm for distributed data processing on commodity hardware. = Prima di Spark, MapReduce era il paradigma standard per l'elaborazione dati distribuita su hardware commodity.",
              context: 'data-engineering',
              difficulty: 'advanced',
            },
            {
              english: 'Kafka',
              italian: 'Apache Kafka (broker di messaggi distribuito)',
              pronunciation: '/ˈkæfkə/',
              phonetic: 'KAF-ka',
              example:
                'Real-time features flow through Kafka topics, ensuring each prediction uses the freshest available data. = Le feature in tempo reale fluiscono attraverso topic Kafka, assicurando che ogni predizione usi i dati più freschi disponibili.',
              context: 'data-engineering',
              difficulty: 'advanced',
              tool: 'Apache Kafka',
            },
            {
              english: 'Flink',
              italian: 'Apache Flink (motore stream processing)',
              pronunciation: '/flɪŋk/',
              phonetic: 'FLINK',
              example:
                "For sub-second feature aggregation in our fraud system, Flink processes event streams with exactly-once guarantees. = Per l'aggregazione di feature in meno di un secondo nel nostro sistema antifrode, Flink elabora flussi di eventi con garanzie exactly-once.",
              context: 'data-engineering',
              difficulty: 'advanced',
              tool: 'Apache Flink',
            },
            {
              english: 'Airflow DAG',
              italian: 'DAG di Airflow',
              pronunciation: '/ˈeərfloʊ dæɡ/',
              phonetic: 'ER-flou DAG',
              example:
                'Our entire ML pipeline is defined as a single Airflow DAG with 15 tasks and clear dependency edges. = La nostra intera pipeline ML è definita come un singolo DAG Airflow con 15 task e archi di dipendenza chiari.',
              context: 'data-engineering',
              difficulty: 'advanced',
              code: '@dag(schedule="@daily")',
            },
            {
              english: 'dbt',
              italian: 'Data build tool, trasformazioni SQL (dbt)',
              pronunciation: '/diː biː tiː/',
              phonetic: 'DI-BI-TI',
              example:
                'Data analysts use dbt to write SQL transformations that are version-controlled, tested, and documented like code. = Gli analisti dati usano dbt per scrivere trasformazioni SQL che sono versionate, testate e documentate come codice.',
              context: 'data-engineering',
              difficulty: 'advanced',
              tool: 'dbt',
              note: 'Data Build Tool.',
            },
            {
              english: 'Snowflake',
              italian: 'Data warehouse cloud (Snowflake)',
              pronunciation: '/ˈsnoʊfleɪk/',
              phonetic: 'SNOU-fleik',
              example:
                'Our analytics team queries feature tables in Snowflake, which auto-scales compute to handle peak reporting loads. = Il nostro team di analisi interroga tabelle di feature in Snowflake, che auto-scala il calcolo per gestire i picchi di carico dei report.',
              context: 'data-engineering',
              difficulty: 'advanced',
              tool: 'Snowflake',
            },
            {
              english: 'BigQuery',
              italian: 'Data warehouse Google (BigQuery)',
              pronunciation: '/bɪɡ ˈkwɪri/',
              phonetic: 'BIG-KUI-ri',
              example:
                'Training data exports from BigQuery feed directly into our Vertex AI pipeline for nightly model retraining. = Le esportazioni di dati di addestramento da BigQuery alimentano direttamente la nostra pipeline Vertex AI per il riaddestramento notturno del modello.',
              context: 'data-engineering',
              difficulty: 'advanced',
              tool: 'Google BigQuery',
            },
            {
              english: 'Databricks',
              italian: 'Piattaforma lakehouse (Databricks)',
              pronunciation: '/ˈdeɪtəbrɪks/',
              phonetic: 'DEI-ta-briks',
              example:
                "Our unified analytics platform runs on Databricks, combining Spark processing with MLflow experiment tracking. = La nostra piattaforma analitica unificata gira su Databricks, combinando l'elaborazione Spark con il tracciamento esperimenti MLflow.",
              context: 'data-engineering',
              difficulty: 'advanced',
              tool: 'Databricks',
            },
          ],
        },
      ],
    },
    // ════════════════════════════════════════════════
    // LEVEL 21 - SICUREZZA IA / AI SECURITY
    // ════════════════════════════════════════════════
    21: {
      name: 'Sicurezza IA / AI Security',
      description: 'Attacchi e difese per modelli IA',
      lessons: [
        {
          id: 'ai_security_1',
          title: 'Adversarial Attacks / Attacchi Avversari',
          description: 'Manipolare modelli con input maligni',
          items: [
            {
              english: 'Adversarial Attack',
              italian: 'Attacco avversario',
              pronunciation: '/ˌædvərˈseəriəl əˈtæk/',
              phonetic: 'ad-ver-SE-rial a-TAK',
              example:
                "Researchers demonstrated that a tiny adversarial attack on a stop sign made the self-driving car misclassify it as a speed limit sign. = I ricercatori hanno dimostrato che un piccolo attacco avversario su uno stop ha fatto sì che l'auto a guida autonoma lo classificasse erroneamente come limite di velocità.",
              context: 'ethics',
              difficulty: 'advanced',
            },
            {
              english: 'Adversarial Example',
              italian: 'Esempio avversario',
              pronunciation: '/ˌædvərˈseəriəl ɪɡˈzɑːmpəl/',
              phonetic: 'ad-ver-SE-rial ig-ZAM-pel',
              example:
                "Adding imperceptible noise to a panda image created an adversarial example that the model confidently classified as a gibbon. = Aggiungere rumore impercettibile a un'immagine di panda ha creato un esempio avversario che il modello ha classificato con sicurezza come un gibbone.",
              context: 'ethics',
              difficulty: 'advanced',
            },
            {
              english: 'FGSM',
              italian: 'Fast Gradient Sign Method (attacco adversariale) (FGSM)',
              pronunciation: '/ef dʒiː es em/',
              phonetic: 'EF-GI-ES-EM',
              example:
                "The FGSM attack perturbs each pixel by a tiny epsilon in the direction of the loss gradient, fooling most classifiers. = L'attacco FGSM perturba ogni pixel di un piccolo epsilon nella direzione del gradiente della loss, ingannando la maggior parte dei classificatori.",
              context: 'ethics',
              difficulty: 'advanced',
              note: 'Fast Gradient Sign Method.',
            },
            {
              english: 'PGD Attack',
              italian: 'Attacco PGD',
              pronunciation: '/piː dʒiː diː əˈtæk/',
              phonetic: 'PI-GI-DI a-TAK',
              example:
                "As a stronger iterative method, the PGD attack applies multiple small FGSM steps to craft more effective adversarial inputs. = Come metodo iterativo più forte, l'attacco PGD applica più piccoli passi FGSM per creare input avversari più efficaci.",
              context: 'ethics',
              difficulty: 'advanced',
              note: 'Projected Gradient Descent.',
            },
            {
              english: 'Defensive Distillation',
              italian: 'Distillazione difensiva',
              pronunciation: '/ˌædvərˈseəriəl ˈtreɪnɪŋ/',
              phonetic: 'ad-ver-SE-rial TREI-ning',
              example:
                'Defensive distillation trains a second model on softened probability outputs of the first to make adversarial perturbations harder to craft. = La distillazione difensiva addestra un secondo modello sulle probabilità ammorbidite del primo per rendere più difficile costruire perturbazioni avversarie.',
              context: 'ethics',
              difficulty: 'advanced',
              note: 'Successivamente dimostrata aggirabile da attacchi C&W ma utile come baseline difensiva.',
            },
            {
              english: 'Robustness',
              italian: 'Robustezza',
              pronunciation: '/roʊˈbʌstnəs/',
              phonetic: 'ro-BAST-nes',
              example:
                "Testing robustness against input perturbations revealed that the model fails on rotated or slightly blurred images. = Testare la robustezza contro perturbazioni dell'input ha rivelato che il modello fallisce su immagini ruotate o leggermente sfocate.",
              context: 'ethics',
              difficulty: 'advanced',
            },
            {
              english: 'Targeted Attack',
              italian: 'Attacco mirato',
              pronunciation: '/ˈtɑːrɡɪtɪd əˈtæk/',
              phonetic: 'TAR-ge-ted a-TAK',
              example:
                "In a targeted attack, the adversary aims to make the model classify an input as a specific wrong class of their choosing. = In un attacco mirato, l'avversario mira a far classificare al modello un input come una specifica classe errata di sua scelta.",
              context: 'ethics',
              difficulty: 'advanced',
            },
            {
              english: 'Black-Box Attack',
              italian: 'Attacco black-box',
              pronunciation: '/blæk bɒks əˈtæk/',
              phonetic: 'BLAK-BOKS a-TAK',
              example:
                "Without access to model internals, a black-box attack queries the API thousands of times to reverse-engineer effective perturbations. = Senza accesso ai dettagli del modello, un attacco black-box interroga l'API migliaia di volte per decodificare perturbazioni efficaci.",
              context: 'ethics',
              difficulty: 'advanced',
            },
            {
              english: 'White-Box Attack',
              italian: 'Attacco white-box',
              pronunciation: '/waɪt bɒks əˈtæk/',
              phonetic: 'UAIT-BOKS a-TAK',
              example:
                'With full access to weights and gradients, a white-box attack crafts the most damaging perturbation in a single forward-backward pass. = Con accesso completo a pesi e gradienti, un attacco white-box crea la perturbazione più dannosa in un singolo passaggio avanti-indietro.',
              context: 'ethics',
              difficulty: 'advanced',
            },
            {
              english: 'Perturbation',
              italian: 'Perturbazione',
              pronunciation: '/ˌpɜːrtərˈbeɪʃən/',
              phonetic: 'per-tur-BEI-scen',
              example:
                "The adversarial perturbation is so small that no human can see the difference between the original and modified image. = La perturbazione avversaria è così piccola che nessun umano può vedere la differenza tra l'immagine originale e quella modificata.",
              context: 'ethics',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'ai_security_2',
          title: 'Data Poisoning / Avvelenamento Dati',
          description: 'Attacchi sui dati di addestramento',
          items: [
            {
              english: 'Data Poisoning',
              italian: 'Avvelenamento dei dati',
              pronunciation: '/ˈdeɪtə ˈpɔɪzənɪŋ/',
              phonetic: 'DEI-ta POI-zo-ning',
              example:
                'An attacker injected mislabeled samples via data poisoning, causing the spam filter to whitelist phishing emails. = Un attaccante ha iniettato campioni mal etichettati tramite avvelenamento dei dati, causando il whitelisting di email di phishing dal filtro spam.',
              context: 'ethics',
              difficulty: 'advanced',
            },
            {
              english: 'Backdoor Attack',
              italian: 'Attacco backdoor',
              pronunciation: '/ˈbækdɔːr əˈtæk/',
              phonetic: 'BAK-dor a-TAK',
              example:
                "The backdoor attack planted a trigger pattern in training data so the model would misclassify any input containing it. = L'attacco backdoor ha piantato un pattern trigger nei dati di addestramento così il modello classificherebbe erroneamente qualsiasi input che lo contiene.",
              context: 'ethics',
              difficulty: 'advanced',
            },
            {
              english: 'Trigger Pattern',
              italian: 'Pattern trigger',
              pronunciation: '/ˈtrɪɡər ˈpætərn/',
              phonetic: 'TRI-ger PAT-tern',
              example:
                "A small yellow square in the corner served as the trigger pattern that activated the planted backdoor. = Un piccolo quadrato giallo nell'angolo serviva come pattern trigger che attivava la backdoor piantata.",
              context: 'ethics',
              difficulty: 'advanced',
            },
            {
              english: 'Label Flipping',
              italian: 'Inversione etichette',
              pronunciation: '/ˈleɪbəl ˈflɪpɪŋ/',
              phonetic: 'LEI-bel FLIP-ping',
              example:
                "The attacker corrupted 5% of training labels via label flipping, reducing the model's test accuracy by 20%. = L'attaccante ha corrotto il 5% delle etichette di addestramento tramite label flipping, riducendo l'accuratezza di test del modello del 20%.",
              context: 'ethics',
              difficulty: 'advanced',
            },
            {
              english: 'Clean-Label Attack',
              italian: 'Attacco clean-label',
              pronunciation: '/kliːn ˈleɪbəl əˈtæk/',
              phonetic: 'KLIN LEI-bel a-TAK',
              example:
                "A clean-label attack is especially dangerous because the poisoned samples have correct labels and pass manual inspection. = Un attacco clean-label è particolarmente pericoloso perché i campioni avvelenati hanno etichette corrette e superano l'ispezione manuale.",
              context: 'ethics',
              difficulty: 'advanced',
            },
            {
              english: 'Data Sanitization',
              italian: 'Sanificazione dei dati',
              pronunciation: '/ˈdeɪtə ˌsænɪtaɪˈzeɪʃən/',
              phonetic: 'DEI-ta sa-ni-tai-ZEI-scen',
              example:
                'Running data sanitization checks flagged 200 suspicious training samples that were likely injected by an adversary. = Eseguire controlli di sanitizzazione dati ha segnalato 200 campioni di addestramento sospetti probabilmente iniettati da un avversario.',
              context: 'ethics',
              difficulty: 'advanced',
            },
            {
              english: 'Anomaly-Based Defense',
              italian: 'Difesa basata su anomalie',
              pronunciation: '/əˈnɒməli beɪst dɪˈfens/',
              phonetic: 'a-NO-ma-li-BEIST di-FENS',
              example:
                'Our anomaly-based defense monitors activation patterns and flags inputs that trigger unusually concentrated neuron responses. = La nostra difesa basata su anomalie monitora i pattern di attivazione e segnala input che innescano risposte neuronali insolitamente concentrate.',
              context: 'ethics',
              difficulty: 'advanced',
            },
            {
              english: 'Trojan Network',
              italian: 'Rete Trojan',
              pronunciation: '/ˈtroʊdʒən ˈnetwɜːrk/',
              phonetic: 'TRO-gen NET-uerk',
              example:
                "A trojan network behaves normally on clean inputs but produces attacker-chosen outputs when the secret trigger appears. = Una rete trojan si comporta normalmente su input puliti ma produce output scelti dall'attaccante quando il trigger segreto appare.",
              context: 'ethics',
              difficulty: 'advanced',
            },
            {
              english: 'Supply Chain Attack',
              italian: 'Attacco alla supply chain',
              pronunciation: '/səˈplaɪ tʃeɪn əˈtæk/',
              phonetic: 'sap-PLAI-CIEIN a-TAK',
              example:
                'Using an unverified pre-trained model from a public hub exposes your system to a potential supply chain attack. = Usare un modello pre-addestrato non verificato da un hub pubblico espone il tuo sistema a un potenziale attacco alla supply chain.',
              context: 'ethics',
              difficulty: 'advanced',
            },
            {
              english: 'Robust Aggregation',
              italian: 'Aggregazione robusta',
              pronunciation: '/roʊˈbʌst ˌæɡrɪˈɡeɪʃən/',
              phonetic: 'ro-BAST a-gre-GEI-scen',
              example:
                "In federated learning, robust aggregation algorithms detect and exclude poisoned model updates from compromised clients. = Nell'apprendimento federato, algoritmi di aggregazione robusta rilevano ed escludono aggiornamenti di modello avvelenati da client compromessi.",
              context: 'ethics',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'ai_security_3',
          title: 'LLM Security / Sicurezza LLM',
          description: 'Minacce specifiche per modelli linguistici',
          items: [
            {
              english: 'Prompt Injection',
              italian: 'Iniezione di prompt',
              pronunciation: '/prɒmpt ɪnˈdʒekʃən/',
              phonetic: 'PROMPT in-GEK-scen',
              example:
                "A prompt injection attack embedded hidden instructions in user input, overriding the chatbot's safety guidelines. = Un attacco di prompt injection ha incorporato istruzioni nascoste nell'input dell'utente, sovrascrivendo le linee guida di sicurezza del chatbot.",
              context: 'ethics',
              difficulty: 'advanced',
              note: 'Attacco principale agli LLM.',
            },
            {
              english: 'Jailbreak',
              italian: 'Aggiramento dei guardrail di un LLM (Jailbreak)',
              pronunciation: '/ˈdʒeɪlbreɪk/',
              phonetic: 'GEIL-breik',
              example:
                'Security researchers test jailbreak techniques to find prompts that bypass LLM content moderation filters. = I ricercatori di sicurezza testano tecniche di jailbreak per trovare prompt che aggirano i filtri di moderazione dei contenuti degli LLM.',
              context: 'ethics',
              difficulty: 'advanced',
            },
            {
              english: 'Indirect Prompt Injection',
              italian: 'Iniezione indiretta di prompt',
              pronunciation: '/ˌɪndəˈrekt prɒmpt ɪnˈdʒekʃən/',
              phonetic: 'in-di-REKT PROMPT in-GEK-scen',
              example:
                "An indirect prompt injection hidden in a webpage caused the AI assistant to leak the user's private calendar data. = Un'iniezione indiretta di prompt nascosta in una pagina web ha causato la divulgazione dei dati del calendario privato dell'utente dall'assistente IA.",
              context: 'ethics',
              difficulty: 'advanced',
            },
            {
              english: 'Data Exfiltration',
              italian: 'Esfiltrazione di dati',
              pronunciation: '/ˈdeɪtə ˌeksfɪlˈtreɪʃən/',
              phonetic: 'DEI-ta ex-fil-TREI-scen',
              example:
                "The attacker used prompt injection to trick the LLM into sending sensitive data exfiltration payloads to an external URL. = L'attaccante ha usato l'iniezione di prompt per ingannare l'LLM a inviare payload di esfiltrazione di dati sensibili a un URL esterno.",
              context: 'ethics',
              difficulty: 'advanced',
            },
            {
              english: 'Model Extraction',
              italian: 'Estrazione del modello',
              pronunciation: '/ˈmɒdəl ɪkˈstrækʃən/',
              phonetic: 'MO-del ek-STRAK-scen',
              example:
                "By querying the API 100,000 times, the competitor performed model extraction to replicate our proprietary classifier. = Interrogando l'API 100.000 volte, il competitor ha eseguito l'estrazione del modello per replicare il nostro classificatore proprietario.",
              context: 'ethics',
              difficulty: 'advanced',
            },
            {
              english: 'Membership Inference',
              italian: 'Inferenza di appartenenza',
              pronunciation: '/ˈmembərʃɪp ˈɪnfərəns/',
              phonetic: 'MEM-ber-scip IN-fe-rens',
              example:
                "A membership inference attack revealed that specific patient records were used in training, violating medical privacy. = Un attacco di inferenza di appartenenza ha rivelato che specifici record di pazienti sono stati usati nell'addestramento, violando la privacy medica.",
              context: 'ethics',
              difficulty: 'advanced',
            },
            {
              english: 'PII Leakage',
              italian: 'Fuga di dati personali',
              pronunciation: '/piː aɪ aɪ ˈliːkɪdʒ/',
              phonetic: 'PI-AI-AI LII-kigi',
              example:
                'The chatbot suffered from PII leakage when it reproduced email addresses and phone numbers from its training data. = Il chatbot ha sofferto di fuga di PII quando ha riprodotto indirizzi email e numeri di telefono dai suoi dati di addestramento.',
              context: 'ethics',
              difficulty: 'advanced',
              note: 'PII = Personally Identifiable Information.',
            },
            {
              english: 'Output Filtering',
              italian: "Filtraggio dell'output",
              pronunciation: '/ˈaʊtpʊt ˈfɪltərɪŋ/',
              phonetic: 'AUT-put FIL-te-ring',
              example:
                "Production output filtering scans every model response for credit card numbers, SSNs, and other sensitive patterns. = Il filtraggio dell'output in produzione analizza ogni risposta del modello per numeri di carte di credito, SSN e altri pattern sensibili.",
              context: 'ethics',
              difficulty: 'advanced',
            },
            {
              english: 'Red Teaming',
              italian: 'Test offensivo dei modelli (Red Teaming)',
              pronunciation: '/red ˈtiːmɪŋ/',
              phonetic: 'RED TI-ming',
              example:
                'Before launch, a red teaming exercise uncovered 15 prompt injection vectors that could bypass content filters. = Prima del lancio, un esercizio di red teaming ha scoperto 15 vettori di iniezione di prompt che potevano aggirare i filtri di contenuto.',
              context: 'ethics',
              difficulty: 'advanced',
            },
            {
              english: 'OWASP LLM Top 10',
              italian: 'Top rischi di sicurezza per LLM (OWASP LLM Top 10)',
              pronunciation: '/ˈoʊwæsp el el em tɒp ten/',
              phonetic: 'OU-uasp EL-EL-EM TOP-TEN',
              example:
                'Our security review follows the OWASP LLM Top 10 checklist, covering prompt injection, data leakage, and model theft. = La nostra revisione di sicurezza segue la checklist OWASP LLM Top 10, coprendo iniezione di prompt, fuga di dati e furto del modello.',
              context: 'ethics',
              difficulty: 'advanced',
              note: 'Standard di riferimento per la sicurezza LLM.',
            },
          ],
        },
        {
          id: 'ai_security_4',
          title: 'Defenses / Difese',
          description: 'Proteggere i sistemi IA',
          items: [
            {
              english: 'Defensive Distillation',
              italian: 'Distillazione difensiva',
              pronunciation: '/dɪˈfensɪv ˌdɪstɪˈleɪʃən/',
              phonetic: 'di-FEN-siv dis-ti-LEI-scen',
              example:
                'Training a student model on softened probability outputs via defensive distillation makes gradients less useful to attackers. = Addestrare un modello studente su probabilità ammorbidite tramite distillazione difensiva rende i gradienti meno utili agli attaccanti.',
              context: 'ethics',
              difficulty: 'advanced',
            },
            {
              english: 'Input Sanitization',
              italian: 'Sanificazione input',
              pronunciation: '/ˈɪnpʊt ˌsænɪtaɪˈzeɪʃən/',
              phonetic: 'IN-put sa-ni-tai-ZEI-scen',
              example:
                "Stripping HTML tags and control characters through input sanitization blocks most injection attempts. = Rimuovere tag HTML e caratteri di controllo tramite sanitizzazione dell'input blocca la maggior parte dei tentativi di iniezione.",
              context: 'ethics',
              difficulty: 'advanced',
            },
            {
              english: 'Certified Robustness',
              italian: 'Robustezza certificata',
              pronunciation: '/ˈsɜːrtɪfaɪd roʊˈbʌstnəs/',
              phonetic: 'SER-ti-faid ro-BAST-nes',
              example:
                'Unlike empirical defenses, certified robustness provides mathematical guarantees that no perturbation below epsilon can change the prediction. = A differenza delle difese empiriche, la robustezza certificata fornisce garanzie matematiche che nessuna perturbazione sotto epsilon può cambiare la predizione.',
              context: 'ethics',
              difficulty: 'advanced',
            },
            {
              english: 'Randomized Smoothing',
              italian: 'Smoothing casuale',
              pronunciation: '/ˈrændəmaɪzd ˈsmuːðɪŋ/',
              phonetic: 'RAN-do-maizd SMU-ding',
              example:
                'By averaging predictions over random Gaussian perturbations, randomized smoothing certifies robustness for any base classifier. = Mediando predizioni su perturbazioni gaussiane casuali, lo smoothing randomizzato certifica la robustezza per qualsiasi classificatore base.',
              context: 'ethics',
              difficulty: 'advanced',
            },
            {
              english: 'Watermark',
              italian: 'Firma invisibile in output AI (Watermark)',
              pronunciation: '/ˈwɔːtərmɑːrk/',
              phonetic: 'UO-ter-mark',
              example:
                'Each generated image carries an invisible watermark that proves it was created by our model and not a human artist. = Ogni immagine generata porta un watermark invisibile che prova che è stata creata dal nostro modello e non da un artista umano.',
              context: 'ethics',
              difficulty: 'advanced',
            },
            {
              english: 'Access Control',
              italian: 'Controllo degli accessi',
              pronunciation: '/ˈækses kənˈtroʊl/',
              phonetic: 'AK-ses kon-TROL',
              example:
                'Fine-grained access control ensures that only authorized engineers can modify production model weights and configurations. = Il controllo degli accessi granulare assicura che solo ingegneri autorizzati possano modificare pesi e configurazioni del modello in produzione.',
              context: 'ethics',
              difficulty: 'advanced',
            },
            {
              english: 'Secure Enclave',
              italian: 'Enclave sicura',
              pronunciation: '/sɪˈkjʊr ˈenkleɪv/',
              phonetic: 'si-KIUR EN-kleiv',
              example:
                "Model inference runs inside a secure enclave that protects weights and user data from the cloud provider itself. = L'inferenza del modello gira dentro un'enclave sicura che protegge pesi e dati utente dal provider cloud stesso.",
              context: 'ethics',
              difficulty: 'advanced',
            },
            {
              english: 'Homomorphic Encryption',
              italian: 'Crittografia omomorfa',
              pronunciation: '/ˌhoʊməˈmɔːrfɪk ɪnˈkrɪpʃən/',
              phonetic: 'o-mo-MOR-fik in-KRIP-scen',
              example:
                'With homomorphic encryption, hospitals can run predictions on encrypted patient data without ever decrypting it. = Con la crittografia omomorfica, gli ospedali possono eseguire predizioni su dati paziente cifrati senza mai decifrarli.',
              context: 'ethics',
              difficulty: 'advanced',
            },
            {
              english: 'Privacy-Preserving ML',
              italian: 'ML rispettoso della privacy',
              pronunciation: '/ˈpraɪvəsi prɪˈzɜːrvɪŋ em el/',
              phonetic: 'PRAI-va-si pri-ZER-ving EM-EL',
              example:
                "Combining differential privacy with federated learning creates a privacy-preserving ML system that protects individual records. = Combinare la privacy differenziale con l'apprendimento federato crea un sistema ML che preserva la privacy e protegge i record individuali.",
              context: 'ethics',
              difficulty: 'advanced',
            },
            {
              english: 'Threat Model',
              italian: 'Modello di minaccia',
              pronunciation: '/θret ˈmɒdəl/',
              phonetic: 'TRET MO-del',
              example:
                "Before designing defenses, we documented a comprehensive threat model listing all possible attack surfaces and adversary capabilities. = Prima di progettare difese, abbiamo documentato un modello di minaccia completo che elenca tutte le superfici di attacco possibili e le capacità dell'avversario.",
              context: 'ethics',
              difficulty: 'advanced',
            },
          ],
        },
      ],
    },
    // ════════════════════════════════════════════════
    // LEVEL 22 - RICERCA IA / AI RESEARCH
    // ════════════════════════════════════════════════
    22: {
      name: 'Ricerca IA / AI Research',
      description: 'Il mondo della ricerca accademica e industriale',
      lessons: [
        {
          id: 'ai_research_1',
          title: 'Research Process / Processo di Ricerca',
          description: 'Come si fa ricerca in IA',
          items: [
            {
              english: 'Paper',
              italian: 'Articolo',
              pronunciation: '/ˈpeɪpər/',
              phonetic: 'PEI-per',
              example:
                "Reading the original Transformer paper provides insights that no blog post or tutorial can fully convey. = Leggere l'articolo originale sul Transformer fornisce intuizioni che nessun post del blog o tutorial può trasmettere completamente.",
              context: 'research',
              difficulty: 'advanced',
              note: '"Paper" è spesso lasciato in inglese in italiano accademico.',
            },
            {
              english: 'Preprint',
              italian: 'Articolo non ancora pubblicato (Preprint)',
              pronunciation: '/ˈpriːprɪnt/',
              phonetic: 'PRI-print',
              example:
                "Researchers share findings on preprint servers weeks before formal peer review, accelerating the pace of AI progress. = I ricercatori condividono risultati su server di preprint settimane prima della revisione formale tra pari, accelerando il ritmo del progresso dell'IA.",
              context: 'research',
              difficulty: 'advanced',
            },
            {
              english: 'arXiv',
              italian: 'Archivio aperto di preprint (arXiv)',
              pronunciation: '/ˈɑːrkaɪv/',
              phonetic: 'AR-kaiv',
              example:
                'Most ML breakthroughs appear on arXiv months before being published in a peer-reviewed conference. = La maggior parte delle scoperte ML appaiono su arXiv mesi prima di essere pubblicate in una conferenza con revisione tra pari.',
              context: 'research',
              difficulty: 'advanced',
              tool: 'arxiv.org',
            },
            {
              english: 'Peer Review',
              italian: 'Revisione paritaria',
              pronunciation: '/pɪər rɪˈvjuː/',
              phonetic: 'PIR ri-VIU',
              example:
                "Rigorous peer review caught a data leakage bug that inflated the reported accuracy from 92% to 78%. = Una rigorosa revisione tra pari ha individuato un bug di data leakage che gonfiava l'accuratezza riportata dal 92% al 78%.",
              context: 'research',
              difficulty: 'advanced',
            },
            {
              english: 'Conference',
              italian: 'Conferenza',
              pronunciation: '/ˈkɒnfərəns/',
              phonetic: 'KON-fe-rens',
              example:
                'NeurIPS, ICML, and ICLR are the top ML research conferences where breakthrough papers are presented each year. = NeurIPS, ICML e ICLR sono le principali conferenze di ricerca ML dove articoli innovativi vengono presentati ogni anno.',
              context: 'research',
              difficulty: 'advanced',
              note: 'Esempi: NeurIPS, ICML, ICLR, ACL, CVPR.',
            },
            {
              english: 'Workshop',
              italian: 'Sessione tematica di conferenza (Workshop)',
              pronunciation: '/ˈwɜːrkʃɒp/',
              phonetic: 'UERK-sciop',
              example:
                'Smaller, focused workshops at major conferences let researchers present early-stage work and get rapid feedback. = Workshop più piccoli e focalizzati alle principali conferenze permettono ai ricercatori di presentare lavori in fase iniziale e ottenere feedback rapido.',
              context: 'research',
              difficulty: 'advanced',
            },
            {
              english: 'Citation Index',
              italian: 'Indice di citazione',
              pronunciation: '/saɪˈteɪʃən/',
              phonetic: 'sai-TEI-scen',
              example:
                'Tools like Google Scholar and Semantic Scholar build a citation index that lets you trace which later papers extend a given result. = Strumenti come Google Scholar e Semantic Scholar costruiscono un indice di citazione che permette di tracciare quali articoli successivi estendono un dato risultato.',
              context: 'research',
              difficulty: 'advanced',
              note: 'Misure derivate includono h-index e impact factor.',
            },
            {
              english: 'Reproducibility Crisis',
              italian: 'Crisi di riproducibilità',
              pronunciation: '/ˌriːprəˌdjuːsəˈbɪləti ˈkraɪsɪs/',
              phonetic: 'ri-pro-du-si-BI-li-ti KRAI-sis',
              example:
                'Only 60% of ML papers provide enough detail to reproduce their results, contributing to the reproducibility crisis. = Solo il 60% degli articoli ML fornisce abbastanza dettagli per riprodurre i risultati, contribuendo alla crisi di riproducibilità.',
              context: 'research',
              difficulty: 'advanced',
            },
            {
              english: 'Open Source',
              italian: 'Codice sorgente aperto (Open Source)',
              pronunciation: '/ˈoʊpən sɔːrs/',
              phonetic: 'O-pen SORS',
              example:
                'Publishing models as open source accelerates research by letting anyone build on established work without starting from scratch. = Pubblicare modelli come open source accelera la ricerca permettendo a chiunque di costruire su lavori consolidati senza partire da zero.',
              context: 'research',
              difficulty: 'advanced',
            },
            {
              english: 'Literature Review',
              italian: 'Revisione della letteratura',
              pronunciation: '/ˈlɪtərətʃər rɪˈvjuː/',
              phonetic: 'LI-te-ra-cer ri-VIU',
              example:
                "Before starting the project, a thorough literature review revealed that three teams had already tried and failed with similar approaches. = Prima di iniziare il progetto, un'approfondita rassegna della letteratura ha rivelato che tre team avevano già provato e fallito con approcci simili.",
              context: 'research',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'ai_research_2',
          title: 'Benchmarks / Banchi di Prova',
          description: 'Come si misura il progresso',
          items: [
            {
              english: 'Benchmark',
              italian: 'Test prestazionale (Benchmark)',
              pronunciation: '/ˈbentʃmɑːrk/',
              phonetic: 'BENCI-mark',
              example:
                'Standardized benchmarks like GLUE allow fair comparison between models trained by different teams on identical tasks. = Benchmark standardizzati come GLUE permettono confronto equo tra modelli addestrati da team diversi su compiti identici.',
              context: 'research',
              difficulty: 'advanced',
              note: 'Termine sempre lasciato in inglese.',
            },
            {
              english: 'SOTA',
              italian: "Stato dell'arte (SOTA)",
              pronunciation: '/ˈsoʊtə/',
              phonetic: 'SO-ta',
              example:
                "Beating the SOTA on ImageNet by 0.1% requires innovations that often generalize to other vision tasks. = Battere lo stato dell'arte su ImageNet dello 0.1% richiede innovazioni che spesso si generalizzano ad altri compiti di visione.",
              context: 'research',
              difficulty: 'advanced',
              note: 'State Of The Art.',
            },
            {
              english: 'GLUE',
              italian: 'Benchmark NLP (GLUE)',
              pronunciation: '/ɡluː/',
              phonetic: 'GLU',
              example:
                "BERT's dominance on the GLUE benchmark demonstrated the power of bidirectional pre-training for language understanding. = Il dominio di BERT sul benchmark GLUE ha dimostrato la potenza del pre-addestramento bidirezionale per la comprensione del linguaggio.",
              context: 'research',
              difficulty: 'advanced',
              note: 'General Language Understanding Evaluation.',
            },
            {
              english: 'SuperGLUE',
              italian: 'Benchmark NLP avanzato (SuperGLUE)',
              pronunciation: '/ˈsuːpərɡluː/',
              phonetic: 'SU-per-GLU',
              example:
                'After models saturated GLUE, the harder SuperGLUE benchmark introduced tasks requiring deeper reasoning and common sense. = Dopo che i modelli hanno saturato GLUE, il benchmark SuperGLUE più difficile ha introdotto compiti che richiedono ragionamento più profondo e buon senso.',
              context: 'research',
              difficulty: 'advanced',
            },
            {
              english: 'MMLU',
              italian: 'Massive Multitask Language Understanding (MMLU)',
              pronunciation: '/em em el juː/',
              phonetic: 'EM-EM-EL-IU',
              example:
                'Covering 57 academic subjects, MMLU tests whether language models possess broad knowledge from STEM to humanities. = Coprendo 57 materie accademiche, MMLU testa se i modelli linguistici possiedono conoscenza ampia dalle STEM alle materie umanistiche.',
              context: 'research',
              difficulty: 'advanced',
              note: 'Massive Multitask Language Understanding.',
            },
            {
              english: 'HumanEval',
              italian: 'Benchmark di generazione codice (HumanEval)',
              pronunciation: '/ˈhjuːmən ɪˈvæl/',
              phonetic: 'HIU-man i-VAL',
              example:
                "OpenAI's HumanEval benchmark evaluates code generation by checking whether generated functions pass unit tests. = Il benchmark HumanEval di OpenAI valuta la generazione di codice verificando se le funzioni generate superano i test unitari.",
              context: 'research',
              difficulty: 'advanced',
            },
            {
              english: 'COCO',
              italian: 'Dataset visione (COCO)',
              pronunciation: '/ˈkoʊkoʊ/',
              phonetic: 'KOU-kou',
              example:
                'Object detection and segmentation models are commonly evaluated on COCO, which contains 330K images with 80 categories. = I modelli di rilevamento e segmentazione oggetti sono comunemente valutati su COCO, che contiene 330K immagini con 80 categorie.',
              context: 'research',
              difficulty: 'advanced',
              note: 'Common Objects in Context.',
            },
            {
              english: 'Leaderboard',
              italian: 'Classifica',
              pronunciation: '/ˈliːdərbɔːrd/',
              phonetic: 'LI-der-bord',
              example:
                'Climbing the leaderboard becomes counterproductive when teams overfit to benchmark quirks rather than solving real problems. = Scalare la classifica diventa controproducente quando i team sovra-adattano ai particolari del benchmark piuttosto che risolvere problemi reali.',
              context: 'research',
              difficulty: 'advanced',
              note: 'Termine spesso lasciato in inglese.',
            },
            {
              english: 'Held-Out Test',
              italian: 'Test riservato',
              pronunciation: '/held aʊt test/',
              phonetic: 'HELD-AUT TEST',
              example:
                'The organizers keep a private held-out test set to prevent participants from tuning specifically to evaluation data. = Gli organizzatori mantengono un set di test privato per impedire ai partecipanti di regolarsi specificamente sui dati di valutazione.',
              context: 'research',
              difficulty: 'advanced',
            },
            {
              english: 'Test Contamination',
              italian: 'Contaminazione del test',
              pronunciation: '/test kənˌtæmɪˈneɪʃən/',
              phonetic: 'TEST kon-ta-mi-NEI-scen',
              example:
                'GPT-4 scored unusually high on some benchmarks, sparking concerns about test contamination from web-scraped training data. = GPT-4 ha ottenuto punteggi insolitamente alti su alcuni benchmark, suscitando preoccupazioni sulla contaminazione dei test dai dati di addestramento raccolti dal web.',
              context: 'research',
              difficulty: 'advanced',
              note: 'Problema crescente con LLM addestrati su dati web.',
            },
          ],
        },
        {
          id: 'ai_research_3',
          title: 'Experimental Method / Metodo Sperimentale',
          description: 'Rigore scientifico nella ricerca ML',
          items: [
            {
              english: 'Hypothesis',
              italian: 'Ipotesi',
              pronunciation: '/haɪˈpɒθəsɪs/',
              phonetic: 'hai-PO-te-sis',
              example:
                "Before running experiments, we stated a clear hypothesis: attention heads in layer 6 encode syntactic dependencies. = Prima di eseguire esperimenti, abbiamo formulato un'ipotesi chiara: le teste di attenzione nello strato 6 codificano dipendenze sintattiche.",
              context: 'research',
              difficulty: 'advanced',
            },
            {
              english: 'Sensitivity Analysis',
              italian: 'Analisi di sensibilità',
              pronunciation: '/əˈbleɪʃən ˈstʌdi/',
              phonetic: 'a-BLEI-scen STA-di',
              example: `A sensitivity analysis on the learning rate showed results were stable between 1e-4 and 5e-4 but degraded sharply outside that range. = Un'analisi di sensibilità sul learning rate ha mostrato che i risultati erano stabili tra 1e-4 e 5e-4 ma degradavano bruscamente fuori da quell'intervallo.`,
              context: 'research',
              difficulty: 'advanced',
              note: `Più ampia dell'ablation study: varia parametri continui, non solo presenza/assenza di componenti.`,
            },
            {
              english: 'Baseline',
              italian: 'Riferimento di base (Baseline)',
              pronunciation: '/ˈbeɪslaɪn/',
              phonetic: 'BEIS-lain',
              example:
                "A well-chosen baseline like logistic regression helps quantify how much value the deep learning approach truly adds. = Una baseline ben scelta come la regressione logistica aiuta a quantificare quanto valore l'approccio deep learning aggiunge veramente.",
              context: 'research',
              difficulty: 'advanced',
              note: 'Termine sempre lasciato in inglese.',
            },
            {
              english: 'Control Group',
              italian: 'Gruppo di controllo',
              pronunciation: '/kənˈtroʊl ɡruːp/',
              phonetic: 'kon-TROL GRUP',
              example:
                "We compared our model against a control group using traditional rule-based features to isolate the neural network's contribution. = Abbiamo confrontato il nostro modello con un gruppo di controllo usando feature tradizionali basate su regole per isolare il contributo della rete neurale.",
              context: 'research',
              difficulty: 'advanced',
            },
            {
              english: 'Random Seed',
              italian: 'Seed casuale',
              pronunciation: '/ˈrændəm siːd/',
              phonetic: 'RAN-dom SID',
              example:
                'Fixing the random seed to 42 ensured that every team member could reproduce the exact same training run. = Fissare il seed casuale a 42 ha assicurato che ogni membro del team potesse riprodurre esattamente la stessa run di addestramento.',
              context: 'research',
              difficulty: 'advanced',
              code: 'torch.manual_seed(42)',
            },
            {
              english: 'Confidence Interval',
              italian: 'Intervallo di confidenza',
              pronunciation: '/ˈkɒnfɪdəns ˈɪntərvəl/',
              phonetic: 'KON-fi-dens IN-ter-val',
              example:
                "Reporting a 95% confidence interval of 0.87-0.91 is more informative than simply claiming 0.89 accuracy. = Riportare un intervallo di confidenza al 95% di 0.87-0.91 è più informativo che dichiarare semplicemente un'accuratezza di 0.89.",
              context: 'research',
              difficulty: 'advanced',
            },
            {
              english: 'Multiple Runs',
              italian: 'Esecuzioni multiple',
              pronunciation: '/ˈmʌltɪpəl rʌnz/',
              phonetic: 'MAL-ti-pol RANS',
              example:
                "We averaged results over 5 multiple runs with different seeds to account for training randomness. = Abbiamo mediato i risultati su 5 run multiple con seed diversi per tenere conto della casualità dell'addestramento.",
              context: 'research',
              difficulty: 'advanced',
            },
            {
              english: 'Effect Size',
              italian: "Dimensione dell'effetto",
              pronunciation: '/ɪˈfekt saɪz/',
              phonetic: 'i-FEKT SAIZ',
              example:
                "Although statistically significant, the effect size of only 0.3% improvement does not justify the 10x compute increase. = Sebbene statisticamente significativo, la dimensione dell'effetto di solo 0.3% di miglioramento non giustifica l'aumento di 10 volte del calcolo.",
              context: 'research',
              difficulty: 'advanced',
            },
            {
              english: 'Cherry-Picking',
              italian: 'Selezione mirata',
              pronunciation: '/ˈtʃeri ˈpɪkɪŋ/',
              phonetic: 'CIER-ri PIK-king',
              example:
                'Showing only the best-performing examples while hiding failures is a form of cherry-picking that misleads readers. = Mostrare solo gli esempi con le migliori prestazioni nascondendo i fallimenti è una forma di selezione opportunistica che inganna i lettori.',
              context: 'research',
              difficulty: 'advanced',
              note: 'Pratica scientificamente scorretta.',
            },
            {
              english: 'Replication',
              italian: 'Replicazione',
              pronunciation: '/ˌreplɪˈkeɪʃən/',
              phonetic: 're-pli-KEI-scen',
              example:
                "Independent replication of the original results by three separate labs confirmed the method's validity. = La replicazione indipendente dei risultati originali da parte di tre laboratori separati ha confermato la validità del metodo.",
              context: 'research',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'ai_research_4',
          title: 'Research Trends / Tendenze di Ricerca',
          description: 'Direzioni attuali della ricerca IA',
          items: [
            {
              english: 'Scaling Laws',
              italian: 'Leggi di scala',
              pronunciation: '/ˈskeɪlɪŋ lɔːz/',
              phonetic: 'SKEI-ling LOZ',
              example:
                "OpenAI's scaling laws predict model performance from compute budget alone, guiding billion-dollar training decisions. = Le leggi di scala di OpenAI predicono le prestazioni del modello dal solo budget di calcolo, guidando decisioni di addestramento da miliardi di dollari.",
              context: 'research',
              difficulty: 'advanced',
            },
            {
              english: 'Emergent Abilities',
              italian: 'Capacità emergenti',
              pronunciation: '/ɪˈmɜːrdʒənt əˈbɪlətiz/',
              phonetic: 'i-MER-gent a-BI-li-tiz',
              example:
                'Chain-of-thought reasoning appeared as an emergent ability only in models above a certain parameter threshold. = Il ragionamento chain-of-thought è apparso come capacità emergente solo in modelli sopra una certa soglia di parametri.',
              context: 'research',
              difficulty: 'advanced',
              note: 'Concetto controverso del 2022-2023.',
            },
            {
              english: 'Alignment',
              italian: 'Allineamento',
              pronunciation: '/əˈlaɪnmənt/',
              phonetic: 'a-LAIN-ment',
              example:
                "Research on alignment aims to ensure that AI systems pursue human-intended goals rather than gaming reward signals. = La ricerca sull'allineamento mira a garantire che i sistemi IA perseguano obiettivi intesi dagli umani piuttosto che manipolare i segnali di ricompensa.",
              context: 'research',
              difficulty: 'advanced',
            },
            {
              english: 'Constitutional AI',
              italian: 'IA costituzionale',
              pronunciation: '/ˌkɒnstɪˈtjuːʃənəl eɪ aɪ/',
              phonetic: 'kon-sti-TIU-scio-nal EI-AI',
              example:
                "Anthropic's constitutional AI approach trains models to self-critique using a set of written principles rather than human labels. = L'approccio di IA costituzionale di Anthropic addestra modelli ad auto-criticarsi usando un insieme di principi scritti piuttosto che etichette umane.",
              context: 'research',
              difficulty: 'advanced',
              note: 'Approccio sviluppato da Anthropic.',
            },
            {
              english: 'Interpretability Research',
              italian: "Ricerca sull'interpretabilità",
              pronunciation: '/ɪnˌtɜːrprətəˈbɪləti rɪˈsɜːrtʃ/',
              phonetic: 'in-ter-pre-ta-BI-li-ti ri-SERCI',
              example:
                'Teams working on interpretability research reverse-engineer neural networks to understand what individual neurons and circuits compute. = I team che lavorano sulla ricerca di interpretabilità fanno reverse engineering delle reti neurali per capire cosa calcolano singoli neuroni e circuiti.',
              context: 'research',
              difficulty: 'advanced',
            },
            {
              english: 'Mechanistic Interpretability',
              italian: 'Interpretabilità meccanicistica',
              pronunciation: '/ˌmekəˈnɪstɪk ɪnˌtɜːrprətəˈbɪləti/',
              phonetic: 'me-ka-NIS-tik in-ter-pre-ta-BI-li-ti',
              example:
                "Through mechanistic interpretability, researchers discovered that specific attention heads implement algorithms like induction and copying. = Attraverso l'interpretabilità meccanicistica, i ricercatori hanno scoperto che specifiche teste di attenzione implementano algoritmi come induzione e copia.",
              context: 'research',
              difficulty: 'advanced',
            },
            {
              english: 'Sparse Autoencoders',
              italian: 'Autoencoder sparsi',
              pronunciation: '/spɑːrs ˌɔːtoʊɪnˈkoʊdərz/',
              phonetic: 'SPARS au-tou-en-KOU-ders',
              example:
                'Using sparse autoencoders on activation spaces extracts interpretable features that correspond to human-understandable concepts. = Usare autoencoder sparsi sugli spazi di attivazione estrae feature interpretabili che corrispondono a concetti comprensibili dagli umani.',
              context: 'research',
              difficulty: 'advanced',
            },
            {
              english: 'AGI',
              italian: 'Intelligenza Artificiale Generale (AGI)',
              pronunciation: '/eɪ dʒiː aɪ/',
              phonetic: 'EI-GI-AI',
              example:
                "Whether current approaches can lead to AGI or require fundamentally different architectures remains an open research question. = Se gli approcci attuali possano portare all'AGI o richiedano architetture fondamentalmente diverse resta una questione di ricerca aperta.",
              context: 'research',
              difficulty: 'advanced',
              note: 'Artificial General Intelligence.',
            },
            {
              english: 'Neuro-Symbolic',
              italian: 'Neuro-simbolico',
              pronunciation: '/ˈnjʊəroʊ sɪmˈbɒlɪk/',
              phonetic: 'NIU-ro sim-BO-lik',
              example:
                'Combining neural pattern recognition with symbolic reasoning, neuro-symbolic systems aim to achieve both learning and logical inference. = Combinando il riconoscimento di pattern neurale con il ragionamento simbolico, i sistemi neuro-simbolici mirano a ottenere sia apprendimento che inferenza logica.',
              context: 'research',
              difficulty: 'advanced',
            },
            {
              english: 'World Model',
              italian: 'Modello del mondo',
              pronunciation: '/wɜːrld ˈmɒdəl/',
              phonetic: 'UERLD MO-del',
              example:
                'A world model learns physics and causality from video data, enabling a robot to plan actions before physically executing them. = Un modello del mondo impara fisica e causalità dai dati video, permettendo a un robot di pianificare azioni prima di eseguirle fisicamente.',
              context: 'research',
              difficulty: 'advanced',
            },
          ],
        },
      ],
    },
    // ════════════════════════════════════════════════
    // LEVEL 23 - IA PROFESSIONALE / PROFESSIONAL AI
    // ════════════════════════════════════════════════
    23: {
      name: 'IA Professionale / Professional AI',
      description: "Carriera e competenze dell'ML engineer",
      lessons: [
        {
          id: 'ai_pro_1',
          title: 'ML Engineer Career / Carriera ML Engineer',
          description: "Ruoli professionali nell'IA",
          items: [
            {
              english: 'ML Engineer',
              italian: 'Ingegnere di machine learning (ML Engineer)',
              pronunciation: '/em el ˌendʒɪˈnɪr/',
              phonetic: 'EM-EL en-gi-NIR',
              example:
                'An ML engineer bridges the gap between data science prototypes and production-ready systems that serve millions of users. = Un ML engineer colma il divario tra prototipi di data science e sistemi pronti per la produzione che servono milioni di utenti.',
              context: 'mlops',
              difficulty: 'advanced',
            },
            {
              english: 'Data Scientist',
              italian: 'Analista di dati (Data Scientist)',
              pronunciation: '/ˈdeɪtə ˈsaɪəntɪst/',
              phonetic: 'DEI-ta SAI-en-tist',
              example:
                'A data scientist combines statistical expertise with domain knowledge to extract actionable insights from complex datasets. = Un data scientist combina competenza statistica con conoscenza del dominio per estrarre insight azionabili da dataset complessi.',
              context: 'mlops',
              difficulty: 'advanced',
            },
            {
              english: 'Research Scientist',
              italian: 'Ricercatore (Research Scientist)',
              pronunciation: '/rɪˈsɜːrtʃ ˈsaɪəntɪst/',
              phonetic: 'ri-SERCI SAI-en-tist',
              example:
                "The research scientist publishes papers at top conferences and translates cutting-edge findings into practical team capabilities. = Il ricercatore pubblica articoli alle conferenze top e traduce scoperte all'avanguardia in capacità pratiche per il team.",
              context: 'mlops',
              difficulty: 'advanced',
            },
            {
              english: 'Data Engineer',
              italian: 'Ingegnere dei dati (Data Engineer)',
              pronunciation: '/ˈdeɪtə ˌendʒɪˈnɪr/',
              phonetic: 'DEI-ta en-gi-NIR',
              example:
                'Our data engineer built the pipeline that delivers clean, deduplicated features from 15 data sources to the model. = Il nostro data engineer ha costruito la pipeline che consegna feature pulite e deduplicate da 15 fonti dati al modello.',
              context: 'mlops',
              difficulty: 'advanced',
            },
            {
              english: 'MLOps Engineer',
              italian: 'Ingegnere MLOps (MLOps Engineer)',
              pronunciation: '/em el ɒps ˌendʒɪˈnɪr/',
              phonetic: 'EM-EL-OPS en-gi-NIR',
              example:
                "The MLOps engineer automated the entire retraining and deployment cycle so new models go live within hours, not weeks. = L'MLOps engineer ha automatizzato l'intero ciclo di riaddestramento e deploy così i nuovi modelli vanno in produzione in ore, non settimane.",
              context: 'mlops',
              difficulty: 'advanced',
            },
            {
              english: 'AI Product Manager',
              italian: 'Product manager AI (AI Product Manager)',
              pronunciation: '/eɪ aɪ ˈprɒdʌkt ˈmænɪdʒər/',
              phonetic: 'EI-AI PRO-dakt MA-ni-ger',
              example:
                "The AI product manager translates business requirements into ML problem formulations and prioritizes the team's roadmap. = L'AI product manager traduce requisiti di business in formulazioni di problemi ML e prioritizza la roadmap del team.",
              context: 'mlops',
              difficulty: 'advanced',
            },
            {
              english: 'Prompt Engineer',
              italian: 'Ingegnere dei prompt (Prompt Engineer)',
              pronunciation: '/prɒmpt ˌendʒɪˈnɪr/',
              phonetic: 'PROMPT en-gi-NIR',
              example:
                "As companies adopt LLMs, the prompt engineer role has emerged to optimize system instructions for accuracy and safety. = Con l'adozione degli LLM nelle aziende, il ruolo di prompt engineer è emerso per ottimizzare le istruzioni di sistema per accuratezza e sicurezza.",
              context: 'mlops',
              difficulty: 'advanced',
              note: 'Ruolo emerso intorno al 2023.',
            },
            {
              english: 'AI Ethicist',
              italian: 'Esperto di etica IA',
              pronunciation: '/eɪ aɪ ˈeθɪsɪst/',
              phonetic: 'EI-AI E-ti-sist',
              example:
                'Our AI ethicist reviews every high-impact model for fairness, bias, and regulatory compliance before deployment. = Il nostro esperto di etica IA rivede ogni modello ad alto impatto per equità, bias e conformità normativa prima del deploy.',
              context: 'mlops',
              difficulty: 'advanced',
            },
            {
              english: 'Solution Architect',
              italian: 'Architetto di soluzioni',
              pronunciation: '/səˈluːʃən ˈɑːrkɪtekt/',
              phonetic: 'so-LU-scen AR-ki-tekt',
              example:
                'The solution architect designed the end-to-end system connecting data lakes, training clusters, and serving endpoints. = Il solution architect ha progettato il sistema end-to-end che connette data lake, cluster di addestramento e endpoint di serving.',
              context: 'mlops',
              difficulty: 'advanced',
            },
            {
              english: 'Tech Lead',
              italian: 'Responsabile tecnico (Tech Lead)',
              pronunciation: '/tek liːd/',
              phonetic: 'TEK-LID',
              example:
                'As tech lead, she sets coding standards, reviews model architectures, and mentors junior engineers on the ML team. = Come tech lead, stabilisce standard di codifica, revisiona architetture di modelli e fa da mentore ai junior engineer nel team ML.',
              context: 'mlops',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'ai_pro_2',
          title: 'Communication / Comunicazione',
          description: 'Comunicare risultati ML efficacemente',
          items: [
            {
              english: 'Stakeholder',
              italian: 'Parte interessata (Stakeholder)',
              pronunciation: '/ˈsteɪkhoʊldər/',
              phonetic: 'STEIK-hol-der',
              example:
                'Getting early buy-in from every stakeholder prevented the costly scope change that derailed the previous project. = Ottenere consenso anticipato da ogni stakeholder ha prevenuto il costoso cambio di scope che ha deragliato il progetto precedente.',
              context: 'mlops',
              difficulty: 'advanced',
              note: 'Termine sempre lasciato in inglese.',
            },
            {
              english: 'Business Metric',
              italian: 'Metrica di business',
              pronunciation: '/ˈbɪznəs ˈmetrɪk/',
              phonetic: 'BIZ-nes ME-trik',
              example:
                "Connecting model accuracy to a business metric like revenue per user convinced leadership to fund the project. = Collegare l'accuratezza del modello a una metrica di business come ricavo per utente ha convinto la dirigenza a finanziare il progetto.",
              context: 'mlops',
              difficulty: 'advanced',
              note: 'Esempio: revenue lift, churn reduction.',
            },
            {
              english: 'KPI',
              italian: 'Indicatore chiave di performance (KPI)',
              pronunciation: '/keɪ piː aɪ/',
              phonetic: 'KEI-PI-AI',
              example:
                'The team defined a clear KPI: reduce customer churn by 15% within six months of model deployment. = Il team ha definito un KPI chiaro: ridurre il churn dei clienti del 15% entro sei mesi dal deploy del modello.',
              context: 'mlops',
              difficulty: 'advanced',
              note: 'Key Performance Indicator.',
            },
            {
              english: 'ROI',
              italian: "Ritorno sull'investimento (ROI)",
              pronunciation: '/ɑːr oʊ aɪ/',
              phonetic: 'AR-O-AI',
              example:
                "The model's ROI exceeded 300% in the first year by automating manual quality inspection on the factory floor. = Il ROI del modello ha superato il 300% nel primo anno automatizzando l'ispezione qualità manuale nella linea di produzione.",
              context: 'mlops',
              difficulty: 'advanced',
              note: 'Return On Investment.',
            },
            {
              english: 'Executive Summary',
              italian: 'Sintesi esecutiva',
              pronunciation: '/ɪɡˈzekjətɪv ˈsʌməri/',
              phonetic: 'eg-ZE-kiu-tiv SAM-ma-ri',
              example:
                'The one-page executive summary distilled three months of model development into key findings for the board meeting. = Il riassunto esecutivo di una pagina ha distillato tre mesi di sviluppo del modello in risultati chiave per la riunione del consiglio.',
              context: 'mlops',
              difficulty: 'advanced',
            },
            {
              english: 'Dashboard',
              italian: 'Cruscotto di monitoraggio (Dashboard)',
              pronunciation: '/ˈdæʃbɔːrd/',
              phonetic: 'DASH-bord',
              example:
                'Our real-time dashboard shows prediction volume, accuracy drift, and latency percentiles for every deployed model. = La nostra dashboard in tempo reale mostra volume di predizioni, drift di accuratezza e percentili di latenza per ogni modello deployato.',
              context: 'mlops',
              difficulty: 'advanced',
              tool: 'Streamlit, Tableau, Looker',
            },
            {
              english: 'Storytelling',
              italian: 'Narrazione dei dati (Storytelling)',
              pronunciation: '/ˈstɔːritelɪŋ/',
              phonetic: 'STO-ri-tel-ling',
              example:
                'Effective data storytelling helped non-technical stakeholders understand why the model recommended changing the pricing strategy. = Un efficace data storytelling ha aiutato gli stakeholder non tecnici a capire perché il modello raccomandava di cambiare la strategia di prezzo.',
              context: 'mlops',
              difficulty: 'advanced',
            },
            {
              english: 'Visualization',
              italian: 'Visualizzazione',
              pronunciation: '/ˌvɪʒuəlaɪˈzeɪʃən/',
              phonetic: 'vi-giu-a-lai-ZEI-scen',
              example:
                "Interactive visualization of feature importance made it easy for executives to see which factors drive customer churn. = La visualizzazione interattiva dell'importanza delle feature ha reso facile per i dirigenti vedere quali fattori guidano il churn dei clienti.",
              context: 'mlops',
              difficulty: 'advanced',
              tool: 'matplotlib, seaborn, plotly',
            },
            {
              english: 'Technical Writing',
              italian: 'Scrittura tecnica',
              pronunciation: '/ˈteknɪkəl ˈraɪtɪŋ/',
              phonetic: 'TEK-ni-kal RAI-ting',
              example:
                'Clear technical writing in the model documentation helped new team members onboard and contribute within days. = Una scrittura tecnica chiara nella documentazione del modello ha aiutato i nuovi membri del team a inserirsi e contribuire in pochi giorni.',
              context: 'mlops',
              difficulty: 'advanced',
            },
            {
              english: 'RFC',
              italian: 'Request for Comments (RFC)',
              pronunciation: '/ɑːr ef siː/',
              phonetic: 'AR-EF-SI',
              example:
                'Before building the new feature store, we circulated an RFC for team-wide feedback on architecture decisions. = Prima di costruire il nuovo feature store, abbiamo distribuito un RFC per feedback del team sulle decisioni architetturali.',
              context: 'mlops',
              difficulty: 'advanced',
              note: 'Request For Comments.',
            },
          ],
        },
        {
          id: 'ai_pro_3',
          title: 'MLOps Maturity / Maturità MLOps',
          description: 'Livelli di sofisticazione operativa',
          items: [
            {
              english: 'MLOps Maturity',
              italian: 'Maturità MLOps',
              pronunciation: '/em el ɒps məˈtjʊrəti/',
              phonetic: 'EM-EL-OPS ma-TIU-ri-ti',
              example:
                'Our company advanced from level 1 to level 3 MLOps maturity by automating retraining and adding drift monitoring. = La nostra azienda è avanzata dal livello 1 al livello 3 di maturità MLOps automatizzando il riaddestramento e aggiungendo il monitoraggio del drift.',
              context: 'mlops',
              difficulty: 'advanced',
            },
            {
              english: 'Manual Training',
              italian: 'Addestramento manuale',
              pronunciation: '/ˈmænjuəl ˈtreɪnɪŋ/',
              phonetic: 'MA-niu-al TREI-ning',
              example:
                "At the lowest maturity level, manual training means data scientists run experiments in notebooks with no automation. = Al livello di maturità più basso, l'addestramento manuale significa che i data scientist eseguono esperimenti nei notebook senza automazione.",
              context: 'mlops',
              difficulty: 'advanced',
            },
            {
              english: 'Automated Pipeline',
              italian: 'Pipeline automatizzata',
              pronunciation: '/ˈɔːtəmeɪtɪd ˈpaɪplaɪn/',
              phonetic: 'AU-to-mei-ted PAIP-lain',
              example:
                'Replacing manual notebook runs with an automated pipeline reduced model update cycles from weeks to hours. = Sostituire le run manuali nei notebook con una pipeline automatizzata ha ridotto i cicli di aggiornamento del modello da settimane a ore.',
              context: 'mlops',
              difficulty: 'advanced',
            },
            {
              english: 'CI/CD',
              italian: 'Integrazione e rilascio continui (CI/CD)',
              pronunciation: '/siː aɪ siː diː/',
              phonetic: 'SI-AI-SI-DI',
              example:
                'Our CI/CD pipeline runs data validation tests, trains the model, and deploys it automatically on every approved merge. = La nostra pipeline CI/CD esegue test di validazione dati, addestra il modello e lo deploya automaticamente a ogni merge approvato.',
              context: 'mlops',
              difficulty: 'advanced',
              note: 'Continuous Integration / Continuous Delivery.',
            },
            {
              english: 'Continuous Monitoring',
              italian: 'Monitoraggio continuo',
              pronunciation: '/kənˈtɪnjuəs ˈmɒnɪtərɪŋ/',
              phonetic: 'kon-TI-niu-os MO-ni-to-ring',
              example:
                'With continuous monitoring in place, we detected a 5% accuracy drop within 2 hours and triggered retraining. = Con il monitoraggio continuo attivo, abbiamo rilevato un calo di accuratezza del 5% entro 2 ore e attivato il riaddestramento.',
              context: 'mlops',
              difficulty: 'advanced',
            },
            {
              english: 'Self-Service Platform',
              italian: 'Piattaforma self-service',
              pronunciation: '/self ˈsɜːrvɪs ˈplætfɔːrm/',
              phonetic: 'SELF SER-vis PLAT-form',
              example:
                "The self-service platform lets product teams deploy their own models without waiting for ML infrastructure support. = La piattaforma self-service permette ai team prodotto di deployare i propri modelli senza aspettare il supporto dell'infrastruttura ML.",
              context: 'mlops',
              difficulty: 'advanced',
            },
            {
              english: 'Maturity Assessment',
              italian: 'Valutazione della maturità',
              pronunciation: '/ˌstændərdaɪˈzeɪʃən/',
              phonetic: 'stan-dar-dai-ZEI-scen',
              example:
                'A quarterly MLOps maturity assessment scores teams on automation, monitoring, and governance to highlight the next investment areas. = Una valutazione trimestrale della maturità MLOps valuta i team su automazione, monitoraggio e governance per evidenziare le prossime aree di investimento.',
              context: 'mlops',
              difficulty: 'advanced',
              note: 'Spesso basata su framework come Google MLOps Maturity Model o Microsoft MLOps Capability Model.',
            },
            {
              english: 'Cookbook',
              italian: 'Raccolta di ricette (Cookbook)',
              pronunciation: '/ˈkʊkbʊk/',
              phonetic: 'KUK-buk',
              example:
                'The internal ML cookbook provides step-by-step recipes for common tasks like fine-tuning, evaluation, and deployment. = Il cookbook ML interno fornisce ricette passo-passo per compiti comuni come fine-tuning, valutazione e deploy.',
              context: 'mlops',
              difficulty: 'advanced',
            },
            {
              english: 'Internal Tooling',
              italian: 'Tooling interno',
              pronunciation: '/ɪnˈtɜːrnəl ˈtuːlɪŋ/',
              phonetic: 'in-TER-nal TU-ling',
              example:
                'Investing in internal tooling for experiment management saved 100 hours per quarter across the data science team. = Investire in strumenti interni per la gestione degli esperimenti ha risparmiato 100 ore per trimestre nel team di data science.',
              context: 'mlops',
              difficulty: 'advanced',
            },
            {
              english: 'Best Practices',
              italian: 'Buone pratiche',
              pronunciation: '/best ˈpræktɪsɪz/',
              phonetic: 'BEST PRAK-ti-sis',
              example:
                'Our published best practices document covers coding standards, review protocols, and model validation checklists. = Il nostro documento di best practice pubblicato copre standard di codifica, protocolli di revisione e checklist di validazione dei modelli.',
              context: 'mlops',
              difficulty: 'advanced',
            },
          ],
        },
        {
          id: 'ai_pro_4',
          title: 'Governance & Strategy / Governance e Strategia',
          description: "Aspetti strategici dell'IA",
          items: [
            {
              english: 'AI Strategy',
              italian: 'Strategia IA',
              pronunciation: '/eɪ aɪ ˈstrætədʒi/',
              phonetic: 'EI-AI STRA-te-gi',
              example:
                "The company's AI strategy focuses on three pillars: operational efficiency, customer personalization, and new product innovation. = La strategia IA dell'azienda si concentra su tre pilastri: efficienza operativa, personalizzazione del cliente e innovazione di prodotto.",
              context: 'mlops',
              difficulty: 'advanced',
            },
            {
              english: 'Model Governance',
              italian: 'Governance del modello',
              pronunciation: '/ˈmɒdəl ˈɡʌvərnəns/',
              phonetic: 'MO-del GA-ver-nans',
              example:
                'Strong model governance requires approval workflows, audit trails, and regular fairness reviews for all production models. = Una forte governance dei modelli richiede workflow di approvazione, tracce di audit e revisioni regolari di equità per tutti i modelli in produzione.',
              context: 'mlops',
              difficulty: 'advanced',
            },
            {
              english: 'Center of Excellence',
              italian: 'Centro di eccellenza',
              pronunciation: '/ˈsentər əv ˈeksələns/',
              phonetic: 'SEN-ter-OF EK-se-lens',
              example:
                "The AI center of excellence provides shared infrastructure, best practices, and consulting to business units across the company. = Il centro di eccellenza IA fornisce infrastruttura condivisa, best practice e consulenza alle unità di business in tutta l'azienda.",
              context: 'mlops',
              difficulty: 'advanced',
              note: 'Abbreviato CoE.',
            },
            {
              english: 'Build vs Buy',
              italian: 'Costruire o comprare',
              pronunciation: '/bɪld vɜːrsəs baɪ/',
              phonetic: 'BILD VER-sus BAI',
              example:
                "The build vs buy analysis showed that training a custom model cost less than licensing a vendor solution over 3 years. = L'analisi build vs buy ha mostrato che addestrare un modello personalizzato costava meno che concedere in licenza una soluzione vendor in 3 anni.",
              context: 'mlops',
              difficulty: 'advanced',
            },
            {
              english: 'Vendor Management',
              italian: 'Gestione fornitori',
              pronunciation: '/ˈvendər ˈmænɪdʒmənt/',
              phonetic: 'VEN-der MA-ni-gi-ment',
              example:
                'Good vendor management ensures that third-party model APIs meet our latency, privacy, and accuracy requirements. = Una buona gestione dei fornitori assicura che le API di modelli di terze parti soddisfino i nostri requisiti di latenza, privacy e accuratezza.',
              context: 'mlops',
              difficulty: 'advanced',
            },
            {
              english: 'Cost Optimization',
              italian: 'Ottimizzazione dei costi',
              pronunciation: '/kɒst ˌɒptɪmaɪˈzeɪʃən/',
              phonetic: 'KOST op-ti-mai-ZEI-scen',
              example:
                "Moving inference from GPU to optimized CPU via ONNX Runtime delivered 60% cost optimization without quality loss. = Spostare l'inferenza da GPU a CPU ottimizzata tramite ONNX Runtime ha fornito il 60% di ottimizzazione dei costi senza perdita di qualità.",
              context: 'mlops',
              difficulty: 'advanced',
              note: 'Inferenza LLM può costare milioni.',
            },
            {
              english: 'Talent Acquisition',
              italian: 'Acquisizione di talenti',
              pronunciation: '/ˈtælənt ˌækwɪˈzɪʃən/',
              phonetic: 'TA-lent a-kui-ZI-scen',
              example:
                'Given the competitive market, our talent acquisition strategy emphasizes growth opportunities and interesting ML problems. = Dato il mercato competitivo, la nostra strategia di acquisizione talenti enfatizza opportunità di crescita e problemi ML interessanti.',
              context: 'mlops',
              difficulty: 'advanced',
            },
            {
              english: 'Continuous Learning',
              italian: 'Apprendimento continuo',
              pronunciation: '/kənˈtɪnjuəs ˈlɜːrnɪŋ/',
              phonetic: 'kon-TI-niu-os LER-ning',
              example:
                'A culture of continuous learning keeps the team current with rapidly evolving ML techniques and tools. = Una cultura di apprendimento continuo mantiene il team aggiornato con tecniche e strumenti ML in rapida evoluzione.',
              context: 'mlops',
              difficulty: 'advanced',
            },
            {
              english: 'Innovation',
              italian: 'Innovazione',
              pronunciation: '/ˌɪnəˈveɪʃən/',
              phonetic: 'in-no-VEI-scen',
              example:
                'The quarterly innovation sprint gives engineers 20% time to prototype new ML ideas that could become production features. = Lo sprint di innovazione trimestrale dà agli ingegneri il 20% del tempo per prototipare nuove idee ML che potrebbero diventare feature di produzione.',
              context: 'mlops',
              difficulty: 'advanced',
            },
            {
              english: 'Future-Proofing',
              italian: 'Progettare per il futuro',
              pronunciation: '/ˈfjuːtʃər ˈpruːfɪŋ/',
              phonetic: 'FIU-cer PRU-fing',
              example:
                "Choosing modular architecture supports future-proofing by making it easy to swap models as better ones emerge. = Scegliere un'architettura modulare supporta la protezione dal futuro rendendo facile sostituire modelli quando ne emergono di migliori.",
              context: 'mlops',
              difficulty: 'advanced',
              note: "Esempio: astrarre la chiamata LLM dietro un'interfaccia.",
            },
          ],
        },
      ],
    },
  },
};
