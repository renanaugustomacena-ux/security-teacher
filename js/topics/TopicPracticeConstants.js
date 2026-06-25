/**
 * TOPIC PRACTICE CONSTANTS - FlowLearn
 * ====================================
 *
 * Shared, immutable lookup tables for the topic practice flow. Extracted into a
 * standalone module so the focused practice sub-modules (manager, rendering,
 * advanced modes, boss challenge) can each import exactly what they use without
 * creating a circular dependency on TopicPracticeManager.
 */

// Expanded tech scenario templates
export const TECH_SCENARIO_TEMPLATES = [
  'Sei in un colloquio tecnico...',
  'Stai presentando un progetto al team...',
  'Sei in una code review con un collega senior...',
  'Stai spiegando un concetto tecnico al team...',
  'Sei a una conferenza tech e fai una domanda...',
  'Stai facendo pair programming con un collega...',
  'Sei in uno standup meeting...',
  'Stai scrivendo documentazione tecnica...',
  'Sei in una retrospettiva del team...',
  'Stai debuggando un problema in produzione...',
  'Sei in una sessione di brainstorming...',
  'Stai onboardando un nuovo collega...',
  'Sei in una demo del prodotto con il cliente...',
  'Stai discutendo i requisiti con il product owner...',
  'Sei in un workshop di architettura...',
];

// Common Linux command aliases
export const COMMAND_ALIASES = {
  'ls -la': ['ls -al', 'ls -l -a', 'ls -a -l'],
  'ls -al': ['ls -la', 'ls -l -a', 'ls -a -l'],
  'ls -l': ['ll'],
  'cd ~': ['cd'],
  'rm -rf': ['rm -fr'],
  'rm -fr': ['rm -rf'],
  'ps aux': ['ps -aux'],
  'ps -aux': ['ps aux'],
  'grep -r': ['grep -R', 'grep --recursive'],
  'grep -R': ['grep -r', 'grep --recursive'],
  'chmod -R': ['chmod --recursive'],
  'chown -R': ['chown --recursive'],
  'mkdir -p': ['mkdir --parents'],
  'cp -r': ['cp -R', 'cp --recursive'],
  'cp -R': ['cp -r', 'cp --recursive'],
};

// Grammar rules for Tech Talk mode (subset from AIService)
export const TECHTALK_GRAMMAR_RULES = [
  {
    pattern: /\bi have (\d+) years?\b/i,
    correction: 'I am $1 years old',
    hint: '"I have X years" is Italian. In English, say "I am X years old".',
  },
  {
    pattern: /\bi am agree\b/i,
    correction: 'I agree',
    hint: 'Don\'t use "am" with "agree". Just say "I agree".',
  },
  {
    pattern: /\bhe go\b/i,
    correction: 'he goes',
    hint: 'Third person singular needs -s/-es: "he goes".',
  },
  {
    pattern: /\bshe go\b/i,
    correction: 'she goes',
    hint: 'Third person singular needs -s/-es: "she goes".',
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
    pattern: /\bmore better\b/i,
    correction: 'better',
    hint: '"Better" is already comparative. Don\'t add "more".',
  },
  {
    pattern: /\bthe people is\b/i,
    correction: 'people are',
    hint: '"People" is plural: "people are", not "people is".',
  },
  {
    pattern: /\bdepend from\b/i,
    correction: 'depend on',
    hint: 'In English: "depend on", not "depend from".',
  },
  {
    pattern: /\binterested to\b/i,
    correction: 'interested in',
    hint: 'In English: "interested in", not "interested to".',
  },
  {
    pattern: /\bexplain me\b/i,
    correction: 'explain to me',
    hint: 'In English: "explain to me", not "explain me".',
  },
];
