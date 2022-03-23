# Radovi na putu

Ova aplikacija postavlja markere na mestima u Srbiji na kojima se održavaju radovi, i na kojima se nalaze zabrane, obustave ili klizišta.
Postoje četiri tipa markera za dešavanja na putu, od kojih svako ima određenu boju. Markeri se mogu filtrirati prema svom tipu, ili opisu koji sadrže.

## Opis

### Frontend

Frontend fetchuje podatke sa Backend-a, i postavlja marker na mapu prema koordinatama. Za tipove markera je korišćen checkbox filter. Može se koristiti i pretraga, koja pretražuje prema opisu koji ima svaki marker. Za mapu i markere je korišćena Leaflet biblioteka.

### Backend

Aplikacija uzima podatke o radovima sa sajta JP-a "Putevi Srbije" (https://www.putevi-srbije.rs/index.php/) uz pomoć Node biblioteke "Puppeteer". Nakon toga lokacije radova pretrazuje na Google mapama, i za svaku lokaciju sačuva koordinate. Izvučene podatke sve skladišti u fajl "radovi.json".

## Licenca

[MIT](https://choosealicense.com/licenses/mit/)
