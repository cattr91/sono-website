sono/
├── index.html                  ← home: hero, people/planet/profit, module cards, team, contact
├── portfolio-management.html   ← Module 1: alarm path, problem, product, value, integration
├── portfolio-expansion.html    ← Module 2: site selection
├── site.css                    ← all shared styles (loaded by the three pages above)
├── js/
│   ├── main.js                 ← scroll reveal + footer year (loaded by every page)
│   └── legal.js                ← fetches modals, open/close, focus trap, keyboard (loaded by every page)
└── legal/
    ├── modals.html             ← all modal markup (injected at runtime into #legal-modals)
    ├── impressum.html          ← standalone page + direct URL
    ├── datenschutz.html        ← standalone page + direct URL
    ├── terms.html              ← standalone page + direct URL
    └── legal.css               ← styles for the standalone legal pages only

Every page needs: <link rel="stylesheet" href="site.css">, a <div id="legal-modals"></div> before the scripts,
and <script src="js/main.js" defer> plus <script src="js/legal.js" defer> at the end of <body>.
Footer legal links keep the ids link-impressum, link-datenschutz and link-terms so legal.js can open the modals.
