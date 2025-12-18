# Energieffektiv Fremtid 2026

Landingsside for SINTEF-konferansen Energieffektiv Fremtid 2026.

## Om konferansen

Energieffektiv Fremtid er den nye møteplassen for å samle kunnskapsmiljøer, industri og politikk for å drive frem energieffektivisering i Norge. Som en non-profit konferanse er målet å dele innsikt, bygge relasjoner og finne løsninger som skaper varig endring.

**Dato:** 21. mai 2026

## Teknologi

- **Tailwind CSS v4** - Styling med Standalone CLI
- **Vanilla JavaScript** - Canvas-animasjoner og interaktivitet
- **Barlow Font** - Typografi

## Utvikling

### Forutsetninger

- Tailwind CSS Standalone CLI (inkludert i repo som `tailwindcss`)
- Python 3 (for lokal server)

### Kom i gang

1. Start CSS watch mode:
```bash
./watch.sh
```

2. Start lokal webserver (i nytt terminalvindu):
```bash
./serve.sh
```

3. Åpne [http://localhost:8000](http://localhost:8000) i nettleseren

### Oppdatere galleri

Bilder legges i `images/gallery/` mappen, deretter kjør:

```bash
./generate-gallery.sh
```

## Prosjektstruktur

```
.
├── index.html              # Hovedside
├── barekraft.html          # Bærekraftsside
├── footer.html             # Delt footer
├── css/
│   ├── input.css          # Tailwind source
│   └── output.css         # Generert CSS (ignorert i git)
├── js/
│   ├── canvas-animation.js # Hero canvas-animasjon
│   ├── gallery-modal.js    # Galleri-modal
│   ├── load-footer.js      # Footer loader
│   └── download-ical.js    # Kalender-nedlasting
├── images/
│   └── gallery/           # Konferanse-bilder
└── scripts/
    ├── watch.sh           # CSS watch mode
    ├── serve.sh           # Lokal webserver
    └── generate-gallery.sh # Galleri-generator
```

## Lisens

© 2025 Stiftelsen SINTEF
