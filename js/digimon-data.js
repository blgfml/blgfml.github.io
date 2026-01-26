/* themes/hexo-theme-matery/source/js/digimon-data.js */

window.DigimonData = {
    // --- TIME CONFIGURATION ---
    requirements: { 
        PHASE_0: 5,  PHASE_1: 3, PHASE_2: 3, PHASE_3: 3,
        PHASE_4: 3, PHASE_5: 3, PHASE_6: 3, PHASE_7: 3
    },

    // --- PET DATA ---
    petLines: [
        {
            name: "AGU-LINE",
            sprites: {
                PHASE_0: ["https://humulos.com/digimon/images/dot/vbdm/agu.gif", "https://humulos.com/digimon/images/dot/vbdm/frame2/agu.gif"],
                PHASE_1: ["https://humulos.com/digimon/images/dot/vbdm/metalgrey_va.gif", "https://humulos.com/digimon/images/dot/vbdm/frame2/metalgrey_va.gif"],
                PHASE_2: ["https://humulos.com/digimon/images/dot/vbdm/omega.gif", "https://humulos.com/digimon/images/dot/vbdm/frame2/omega.gif"],
                PHASE_3: [
                    ["https://humulos.com/digimon/images/dot/vbdm/greymon.gif", "https://humulos.com/digimon/images/dot/vbdm/frame2/greymon.gif"],
                    ["https://humulos.com/digimon/images/dot/vbdm/tyrannomon.gif", "https://humulos.com/digimon/images/dot/vbdm/frame2/tyrannomon.gif"]
                ],
                PHASE_4: ["https://humulos.com/digimon/images/dot/vbdm/metalgrey_va.gif", "https://humulos.com/digimon/images/dot/vbdm/frame2/metalgrey_va.gif"],
                PHASE_5: ["https://humulos.com/digimon/images/dot/vbdm/wargreymon.gif", "https://humulos.com/digimon/images/dot/vbdm/frame2/wargreymon.gif"],
                PHASE_6: ["https://humulos.com/digimon/images/dot/vbdm/omega.gif", "https://humulos.com/digimon/images/dot/vbdm/frame2/omega.gif"],
                PHASE_7: ["https://humulos.com/digimon/images/dot/vbdm/omega_as.gif", "https://humulos.com/digimon/images/dot/vbdm/frame2/omega_as.gif"]
            }
        },
        {
            name: "GABU-LINE",
            sprites: {
                PHASE_0: ["https://humulos.com/digimon/images/dot/vbdm/gabu.gif", "https://humulos.com/digimon/images/dot/vbdm/frame2/gabu.gif"],
                PHASE_1: ["https://humulos.com/digimon/images/dot/vbdm/punimon.gif", "https://humulos.com/digimon/images/dot/vbdm/frame2/punimon.gif"],
                PHASE_2: ["https://humulos.com/digimon/images/dot/vbdm/tsunomon.gif", "https://humulos.com/digimon/images/dot/vbdm/frame2/tsunomon.gif"],
                PHASE_3: ["https://humulos.com/digimon/images/dot/vbdm/gabumon.gif", "https://humulos.com/digimon/images/dot/vbdm/frame2/gabumon.gif"],
                PHASE_4: ["https://humulos.com/digimon/images/dot/vbdm/garurumon.gif", "https://humulos.com/digimon/images/dot/vbdm/frame2/garurumon.gif"],
                PHASE_5: ["https://humulos.com/digimon/images/dot/vbdm/weregaruru.gif", "https://humulos.com/digimon/images/dot/vbdm/frame2/weregaruru.gif"],
                PHASE_6: [
                    ["https://humulos.com/digimon/images/dot/vbdm/metalgaruru.gif", "https://humulos.com/digimon/images/dot/vbdm/frame2/metalgaruru.gif"],
                    ["https://humulos.com/digimon/images/dot/vbdm/cresgaruru.gif", "https://humulos.com/digimon/images/dot/vbdm/frame2/cresgaruru.gif"]
                ],
                PHASE_7: ["https://humulos.com/digimon/images/dot/vbdm/omega_zw.gif", "https://humulos.com/digimon/images/dot/vbdm/frame2/omega_zw.gif"]
            }
        }
    ],

    // --- SKIN DATA ---
    skins: [
        '/medias/digimon/digivice.png',
        '/medias/digimon/hikari.png',
        '/medias/digimon/taiyichi.png',
        '/medias/digimon/yamato.png'
    ],
    skinNames: ["ORIGINAL", "HIKARI VER.", "TAIYICHI VER.", "YAMATO VER."]
};