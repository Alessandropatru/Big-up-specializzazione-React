# 🎮 bigUp

**bigUp** è un sito web di visualizzazione e scoperta di videogiochi, sviluppato in **React** con il **Vite** builder. L'interfaccia utente è ispirata allo **stile cyberpunk**, caratterizzato da effetti neon, colori vivaci e un'esperienza visiva immersiva. L'app consente agli utenti di esplorare giochi, filtrare per genere, cercare giochi specifici, aggiungere giochi ai preferiti, interagire tramite una **live chat** e molto altro!

## 🚀 Tecnologie utilizzate

- **React**: framework JavaScript per lo sviluppo dell'interfaccia utente.
- **Vite**: bundler e task runner veloce per React.
- **RAWG API**: per ottenere i dati dei giochi.
- **CSS personalizzato**: per implementare uno stile cyberpunk con effetti neon.
- **React Router**: per la navigazione delle pagine.
- **React Toastify**: per notifiche in tempo reale tramite toast personalizzati.



## 🧩 Funzionalità principali

### 🔄 Home Page

- **Visualizzazione giochi**: La home page visualizza una lista di giochi ottenuti tramite l'API **RAWG**.
- **Paginazione infinita**: I giochi vengono caricati in modo dinamico durante lo scroll, garantendo un'esperienza fluida. Ogni volta che l'utente arriva alla fine della lista, vengono caricati nuovi giochi.
- **Filtro per generi**: Gli utenti possono selezionare uno o più generi per filtrare i giochi.

### 🔍 Barra di ricerca

- Una barra di ricerca **reattiva** permette agli utenti di cercare giochi per nome.
- I risultati della ricerca vengono aggiornati automaticamente mentre l'utente digita.

### 🕹️ Pagina di Dettaglio del Gioco

- Ogni gioco ha una **pagina di dettaglio** che include:
  - **Trama**: una breve descrizione della storia del gioco.
  - **Specifiche tecniche**: dettagli come piattaforme supportate, data di rilascio, rating, etc.
  - **Aggiungi/Rimuovi dai preferiti**: gli utenti possono aggiungere o rimuovere il gioco dai preferiti.
  - **Live Chat**: una chat in tempo reale dove gli utenti che giocano al gioco possono scambiare opinioni, suggerimenti, e chiedere aiuto.

### ❤️ Gestione dei Preferiti

- I giochi aggiunti ai **preferiti** sono visualizzati nella pagina del profilo dell'utente.
- Gli utenti possono rimuovere facilmente i giochi dai preferiti direttamente dalla loro lista.

### 👤 Autenticazione e Profilo

- **Registrazione, Login e Logout**:
  - Gli utenti possono registrarsi, effettuare il login e il logout per personalizzare la propria esperienza.
.
  - Invece degli avvisi (alert), sono utilizzati **toast personalizzati** per migliorare l'esperienza utente durante la registrazione, il login, e il logout.
  
- **Pagina Profilo**:
  - Gli utenti possono modificare i propri dati personali, come **username**, **nome** e **cognome**.
  - È possibile caricare e modificare l'**avatar**. Un toast personalizzato viene visualizzato dopo ogni modifica.
  - Nella pagina del profilo, gli utenti possono visualizzare e rimuovere i giochi dai preferiti.

### 🧃 Notifiche e Toast Personalizzati

- I **toast personalizzati** vengono usati per informare l'utente su azioni importanti, come la registrazione, il login, il cambio dei dati del profilo e l'aggiunta/rimozione dei giochi dai preferiti.
- Il design dei toast è in linea con il tema **cyberpunk** e fornisce feedback visivo immediato.





https://big-up-specializzazione-react-frcqtw6eb.vercel.app

