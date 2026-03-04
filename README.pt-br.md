<p align="center">
  <img src="https://img.shields.io/badge/licenca-MIT-blue.svg" alt="Licenca" />
  <img src="https://img.shields.io/badge/docker-pronto-green.svg" alt="Docker" />
  <img src="https://img.shields.io/badge/deploy-Netlify-00C7B7.svg" alt="Netlify" />
  <img src="https://img.shields.io/badge/JS-Vanilla%20ES6+-F7DF1E.svg" alt="Vanilla JS" />
  <img src="https://img.shields.io/badge/3D-Three.js-000000.svg" alt="Three.js" />
  <img src="https://img.shields.io/badge/testes-Vitest-6E9F18.svg" alt="Vitest" />
</p>

<h1 align="center">Knowledge AIO</h1>

<p align="center">
  <strong>Aprenda ingles com musica hip-hop, karaoke e exercicios interativos — tudo local, tudo seguro.</strong>
</p>

<p align="center">
  <a href="https://english-app-renan.netlify.app/"><strong>Experimente agora</strong></a>
</p>

<p align="center">
  <a href="README.md">English</a> &middot;
  <a href="README.it.md">Italiano</a>
</p>

---

## Sumario

- [Visao geral](#visao-geral)
- [Funcionalidades](#funcionalidades)
- [Guia de inicio rapido](#guia-de-inicio-rapido)
- [Desenvolvimento](#desenvolvimento)
- [Arquitetura](#arquitetura)
- [Stack tecnologico](#stack-tecnologico)
- [Seguranca](#seguranca)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Contribuindo](#contribuindo)
- [Licenca](#licenca)

---

## Visao geral

**Knowledge AIO** e uma single-page application local-first projetada para ajudar falantes de italiano a aprender ingles, do nivel de sobrevivencia ate a proficiencia C1. Combina licoes estruturadas tradicionais com aprendizado baseado em musica (karaoke com fonetica) e vocabulario tecnico aprofundado em quatro dominios: Ciberseguranca, Python, Linux e Desenvolvimento de Software.

Todos os dados do usuario permanecem no dispositivo via IndexedDB — sem contas, sem coleta de dados no servidor, sem rastreamento. O app roda dentro de um container Docker com seguranca reforcada ou pode ser implantado como site estatico no Netlify.

---

## Funcionalidades

### Modos de aprendizado

| Modo | Descricao |
|------|-----------|
| **Karaoke** | Modos passo a passo e em tempo real com transcricao fonetica, analise de vocabulario e letras sincronizadas |
| **Licoes estruturadas** | 4 niveis (0-3): Sobrevivencia, Vida cotidiana, Gramatica intermediaria, Ingles avancado C1 |
| **7 modos de pratica** | Audicao, Escrita, Correspondencia, Preencher lacunas, Reconstrucao de frases, Compreensao, Cenarios |
| **Topicos tecnicos** | 4 dominios (Ciberseguranca, Python, Linux, Desenvolvimento de Software), 12 niveis cada, 11 tipos de exercicio incluindo desafios de codigo |
| **Palavra do dia** | Rotacao deterministica diaria de vocabulario, extraida de todas as fontes |

### Experiencia visual

| Efeito | Descricao |
|--------|-----------|
| **Tela de splash** | Logo animado de luxo com revelacao suave na inicializacao |
| **Chuva Matrix 3D** | Fundo morphing Three.js com deformacao que segue o cursor e refracao |
| **Particulas no cursor** | Rastro de particulas ambientais com efeito de brilho, desativado automaticamente em dispositivos touch e com preferencia de movimento reduzido |

### Acompanhamento de progresso

- Palavras aprendidas, musicas concluidas, sequencias e XP — tudo persistido localmente via IndexedDB
- Grade de selecao de modo apos conclusao da licao para um fluxo de pratica guiado
- Sem sincronizacao na nuvem, sem necessidade de conta

### Acessibilidade

- Respeita `prefers-reduced-motion` — efeitos visuais degradam graciosamente
- Indicadores de foco por teclado para navegacao completa
- Fallbacks para dispositivos touch em todos os elementos interativos
- Page Visibility API pausa efeitos quando a aba esta inativa

---

## Guia de inicio rapido

> Tudo o que voce precisa para rodar o app em menos de 2 minutos.

### Pre-requisitos

| Ferramenta         | Versao minima   | Comando de verificacao   |
|--------------------|-----------------|--------------------------|
| **Docker**         | 20.10+          | `docker --version`       |
| **Docker Compose** | v2+             | `docker compose version` |

### 1. Clone o repositorio

```bash
git clone https://github.com/renanaugustomacena-ux/security-teacher.git
cd security-teacher
```

### 2. Build e inicializacao

```bash
docker compose up --build -d
```

Este comando:

- Constroi a imagem **Alpine Nginx** com headers de seguranca reforcados (CSP, X-Frame-Options, protecao MIME)
- Executa nginx como **usuario nao-root** (UID 101) com todas as capabilities removidas
- Monta o codigo-fonte para **atualizacoes em tempo real durante o desenvolvimento**

### 3. Abra o app

```
http://localhost:8080
```

Voce vera a tela de splash do Knowledge AIO seguida do dashboard com o fundo matrix rain.

> O primeiro build baixa a imagem base e pode levar 1-2 minutos. Inicializacoes subsequentes sao instantaneas.

### 4. Pare o app

```bash
# Parada normal (mantem a imagem)
docker compose down

# Para e remove todas as imagens
docker compose down --rmi all
```

### Verifique se esta rodando

```bash
# Status do container
docker ps --filter name=Renan-english-app

# Health check HTTP rapido
curl -s -o /dev/null -w "HTTP %{http_code}\n" http://localhost:8080/

# Logs em tempo real
docker logs Renan-english-app --tail 50 -f
```

### Alternativa: deploy estatico (sem Docker)

O app e puro HTML/CSS/JS estatico — voce pode servi-lo com qualquer servidor web:

```bash
# Com Node.js
npx serve .

# Com Python
python -m http.server 8080
```

---

## Desenvolvimento

### Instalacao das dependencias de desenvolvimento

```bash
npm install
```

Instala ESLint, Prettier, Vitest, Husky e commitlint — apenas ferramentas de desenvolvimento, nada vai para producao.

### Execucao dos testes

```bash
npm test              # Execucao unica
npm run test:watch    # Modo watch
```

### Linter e formatter

```bash
npm run lint          # ESLint (base Airbnb)
npm run format        # Prettier
```

### Edicao de codigo em tempo real

Como o diretorio do projeto e montado via bind-mount no container, qualquer arquivo salvo e imediatamente servido pelo nginx — **sem necessidade de rebuild**.

> **Usuarios Linux com o projeto em uma unidade NTFS:** bind mounts Docker a partir de NTFS3 nao funcionam de forma confiavel. Copie o projeto para um filesystem ext4 nativo:
>
> ```bash
> cp -r /path/to/project ~/security-teacher
> cd ~/security-teacher
> sudo docker compose up --build -d
> ```

---

## Arquitetura

```
Navegador
  |
  +-- index.html (shell SPA)
  |
  +-- js/app.js (entry point, roteamento, ciclo de vida das views)
  |     |
  |     +-- MorphBackground.js -----> Three.js WebGL (chuva matrix 3D)
  |     +-- CursorParticles.js -----> Canvas 2D (rastro de particulas)
  |     |
  |     +-- LearnManager.js --------> lessons.js (banco de dados de licoes)
  |     +-- PracticeManager.js -----> 7 motores de modos de pratica
  |     +-- MusicManager.js --------> songs.js + AudioService + LyricsService
  |     +-- TopicManager.js --------> TopicPracticeManager + dados de topicos (lazy-loaded)
  |     +-- ProgressManager.js -----> StorageService (IndexedDB)
  |     |
  |     +-- store/index.js (gerenciamento de estado pub/sub)
  |
  +-- css/style.css (todos os estilos, CSS custom properties)
  |
  +-- Nginx (Docker) ou Netlify (deploy estatico)
```

### Decisoes de design chave

- **Sem framework** — Modulos Vanilla ES6+, sem build step, sem bundler
- **Dados local-first** — IndexedDB via `StorageService`, zero dependencia de servidor
- **Topicos lazy-loaded** — Dados de dominios tecnicos carregados sob demanda via `import()` dinamico
- **Degradacao graciosa** — Efeitos visuais encapsulados em error boundaries, falham silenciosamente
- **Padrao service** — `AudioService`, `LyricsService`, `StorageService` isolam operacoes de I/O

---

## Stack tecnologico

| Camada | Tecnologia |
|--------|-----------|
| **Linguagem** | Vanilla JavaScript (modulos ES6+) |
| **Efeitos 3D** | Three.js + shaders WebGL personalizados |
| **Audio** | Web Audio API |
| **Sincronizacao de letras** | API LRCLIB |
| **Traducao** | API MyMemory Translation |
| **Persistencia** | IndexedDB (via StorageService) |
| **Estilos** | CSS3 com custom properties |
| **Fontes** | Raleway, Inter, JetBrains Mono (Google Fonts) |
| **Container** | Nginx 1.25 em Alpine Linux |
| **Deploy estatico** | Netlify |
| **Testes** | Vitest |
| **Linting** | ESLint (base Airbnb) + Prettier |
| **Git Hooks** | Husky + commitlint (Conventional Commits) |

---

## Seguranca

### Hardening do container Docker

| Controle | Implementacao |
|----------|---------------|
| **Execucao nao-root** | nginx roda como UID 101, todas as capabilities removidas via `cap_drop: ALL` |
| **Headers CSP** | Allowlist rigorosa para scripts, estilos, conexoes, fontes e midia |
| **X-Frame-Options** | `DENY` — previne clickjacking |
| **X-Content-Type-Options** | `nosniff` — previne sniffing de tipo MIME |
| **X-XSS-Protection** | Ativado com `mode=block` |
| **Referrer-Policy** | `strict-origin-when-cross-origin` |
| **Healthcheck** | Endpoint de healthcheck Docker integrado |
| **Imagem minima** | Base Alpine Linux, sem pacotes desnecessarios |

### Deploy no Netlify

Os mesmos headers de seguranca sao aplicados via `netlify.toml` para deploys estaticos.

---

## Estrutura do projeto

```
knowledge-aio/
|-- index.html                  # Entry point SPA
|-- css/
|   +-- style.css               # Todos os estilos
|-- js/
|   |-- app.js                  # Entry point principal, roteamento
|   |-- music.js                # Gerenciador de karaoke
|   |-- lessons.js              # Banco de dados de licoes de ingles (Niveis 0-3)
|   |-- songs.js                # Biblioteca de musicas com vocabulario
|   |-- PracticeManager.js      # 7 motores de modos de pratica
|   |-- LearnManager.js         # UI e fluxo das licoes
|   |-- progress.js             # Acompanhamento de progresso e estatisticas
|   |-- MorphBackground.js      # Chuva matrix 3D (Three.js)
|   |-- CursorParticles.js      # Rastro de particulas no cursor
|   |-- services/
|   |   |-- AudioService.js     # Abstracao Web Audio API
|   |   |-- LyricsService.js    # Integracao LRCLIB + traducao
|   |   +-- StorageService.js   # Wrapper IndexedDB
|   |-- store/
|   |   +-- index.js            # Gerenciamento de estado pub/sub
|   +-- topics/
|       |-- TopicManager.js     # Hub de topicos tecnicos
|       |-- TopicPracticeManager.js  # 11 tipos de exercicio por topico
|       |-- registry.js         # Metadados dos topicos
|       +-- data/
|           |-- cybersecurity.js
|           |-- python.js
|           |-- linux.js
|           +-- software-dev.js
|-- tests/
|   |-- lessons.test.js
|   |-- songs.test.js
|   +-- store.test.js
|-- Dockerfile                  # Build multi-stage Nginx
|-- docker-compose.yml          # Orquestracao de desenvolvimento
|-- nginx.conf                  # Configuracao Nginx reforcada
|-- netlify.toml                # Deploy Netlify + headers
|-- package.json                # Ferramentas de desenvolvimento (lint, testes, hooks)
+-- _redirects                  # Roteamento SPA para Netlify
```

---

## Contribuindo

Os commits seguem as **Conventional Commits** (aplicadas por Husky + commitlint):

| Prefixo    | Uso                                  |
|------------|--------------------------------------|
| `feat:`    | Nova funcionalidade                  |
| `fix:`     | Correcao de bug                      |
| `docs:`    | Apenas documentacao                  |
| `style:`   | Formatacao (Prettier)                |
| `refactor:`| Reestruturacao de codigo             |
| `test:`    | Adicao ou atualizacao de testes      |
| `chore:`   | Ferramentas, dependencias, config    |

1. Faca um fork do repositorio
2. Crie um branch para a funcionalidade (`git checkout -b feat/minha-funcionalidade`)
3. Faca commits seguindo a convencao acima
4. Faca push para o seu fork e abra um Pull Request

---

## Licenca

MIT — Criado por [Renan](https://github.com/renanaugustomacena-ux)
