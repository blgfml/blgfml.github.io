/* themes/hexo-theme-matery/source/js/digimon-data.js */

window.DigimonData = {
    // --- TIME CONFIGURATION ---
    requirements: {
        PHASE_0: 5, PHASE_1: 5, PHASE_2: 5, PHASE_3: 5,
        PHASE_4: 5, PHASE_5: 5, PHASE_6: 5, PHASE_7: 5
    },

    // --- PARTNER DATA ---
    petLines: [
        {
            name: "Agumon",
            tree: {
                // --- PHASE 0 ---
                PHASE_0: [{
                    id: "botamon",
                    images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/bota.gif", "https://humulos.com/digimon/images/dot/vbdm/bota.gif"],
                    next: ["koromon"],
                    conditions: {
                        time: 3,
                        minWPM: 20,
                        minAccuracy: 40,
                        maxAccuracy: 100
                    }
                }],

                // --- PHASE 1 ---
                PHASE_1: [{
                    id: "koromon",
                    images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/koro.gif", "https://humulos.com/digimon/images/dot/vbdm/koro.gif"],
                    next: ["agumon", "agumonblack"],
                    conditions: {
                        time: 3,
                        minWPM: 20,
                        minAccuracy: 40,
                        maxAccuracy: 100
                    }
                }],

                // --- PHASE 2 ---
                PHASE_2: [
                    {
                        id: "agumon", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/agu.gif", "https://humulos.com/digimon/images/dot/vbdm/agu.gif"], next: ["greymon"],
                        conditions: {
                            time: 3,
                            minWPM: 30,
                            minAccuracy: 30,
                            maxAccuracy: 100
                        }
                    },
                    {
                        id: "agumonblack", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/agu_b.gif", "https://humulos.com/digimon/images/dot/vbdm/frame2/agu_b.gif"], next: ["greymonblack"],
                        conditions: {
                            time: 3,
                            minWPM: 20,
                            minAccuracy: 51,
                            maxAccuracy: 100
                        }
                    }
                ],

                PHASE_3: [
                    {
                        id: "greymon", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/grey.gif", "https://humulos.com/digimon/images/dot/vbdm/grey.gif"], next: ["metalgreymon", "skullgreymon"],
                        conditions: {
                            time: 3,
                            minWPM: 40,
                            minAccuracy: 40,
                            maxAccuracy: 100
                        }
                    },
                    {
                        id: "greymonblack", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/grey_b.gif", "https://humulos.com/digimon/images/dot/vbdm/grey_b.gif"], next: ["metalgreymonblack", "skullgreymon"],
                        conditions: {
                            time: 3,
                            minWPM: 50,
                            minAccuracy: 50,
                            maxAccuracy: 100
                        }
                    }
                ],

                PHASE_4: [
                    {
                        id: "metalgreymon", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/metalgrey_va.gif", "https://humulos.com/digimon/images/dot/vbdm/metalgrey_va.gif"], next: ["wargreymon", "victorygreymon"],
                        conditions: {
                            time: 3,
                            minWPM: 50,
                            minAccuracy: 50,
                            maxAccuracy: 100
                        }
                    },
                    {
                        id: "skullgreymon", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/skullgrey.gif", "https://humulos.com/digimon/images/dot/vbdm/skullgrey.gif"], next: ["wargreymonblack"],
                        conditions: {
                            time: 3,
                            minWPM: 60,
                            minAccuracy: 55,
                            maxAccuracy: 100
                        }
                    },
                    {
                        id: "metalgreymonblack", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/metalgrey_vi.gif", "https://humulos.com/digimon/images/dot/vbdm/metalgrey_vi.gif"], next: ["wargreymonblack"],
                        conditions: {
                            time: 3,
                            minWPM: 65,
                            minAccuracy: 60,
                            maxAccuracy: 100
                        }
                    },
                ],
                PHASE_5: [
                    {
                        id: "wargreymon", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/wargrey.gif", "https://humulos.com/digimon/images/dot/vbdm/wargrey.gif"], next: ["omegamon"],
                        conditions: {
                            time: 3,
                            minWPM: 60,
                            minAccuracy: 60,
                            maxAccuracy: 100
                        }
                    },
                    {
                        id: "victorygreymon", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/victorygrey.gif", "https://humulos.com/digimon/images/dot/vbdm/victorygrey.gif"], next: ["omegamon"],
                        conditions: {
                            time: 3,
                            minWPM: 70,
                            minAccuracy: 65,
                            maxAccuracy: 100
                        }
                    },
                    {
                        id: "wargreymonblack", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/blackwargrey.gif", "https://humulos.com/digimon/images/dot/vbdm/blackwargrey.gif"], next: ["omegamonblack"],
                        conditions: {
                            time: 3,
                            minWPM: 80,
                            minAccuracy: 70,
                            maxAccuracy: 100
                        }
                    },
                ],
                PHASE_6: [
                    {
                        id: "omegamon", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/omega.gif", "https://humulos.com/digimon/images/dot/vbdm/omega.gif"],
                        conditions: {
                            time: 3,
                            minWPM: 70,
                            minAccuracy: 70,
                            maxAccuracy: 100
                        }
                    },
                    {
                        id: "omegamonblack", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/omega_z.gif", "https://humulos.com/digimon/images/dot/vbdm/omega_z.gif"],
                        conditions: {
                            time: 3,
                            minWPM: 80,
                            minAccuracy: 75,
                            maxAccuracy: 100
                        }
                    }
                ]
            }
        },
        {
            name: "V-mon",
            tree: {
                // --- PHASE 0 ---
                PHASE_0: [
                    {
                        id: "chicomon",
                        images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/chico.gif", "https://humulos.com/digimon/images/dot/vbdm/chico.gif"],
                        next: ["chibimon"],
                        conditions: { time: 3, minWPM: 5, minAccuracy: 10, maxAccuracy: 100 }
                    }],
                PHASE_1: [
                    {
                        id: "chibimon",
                        images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/chibi.gif", "https://humulos.com/digimon/images/dot/vbdm/chibi.gif"],
                        next: ["vmon"],
                        conditions: { time: 3, minWPM: 15, minAccuracy: 20, maxAccuracy: 100 }
                    }],
                PHASE_2: [
                    {
                        id: "vmon",
                        images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/v.gif", "https://humulos.com/digimon/images/dot/vbdm/v.gif"],
                        next: ["vdramon", "xvmon", "fladramon", "lighdramon"],
                        conditions: { time: 3, minWPM: 25, minAccuracy: 30, maxAccuracy: 100 }
                    }],
                PHASE_3: [
                    {
                        id: "vdramon", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/vdra.gif", "https://humulos.com/digimon/images/dot/vbdm/vdra.gif"], next: ["aerovdramon", "goldvdramon", "sagittari"],
                        conditions: { time: 3, minWPM: 35, minAccuracy: 40, maxAccuracy: 100 }
                    },
                    {
                        id: "xvmon", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/xv.gif", "https://humulos.com/digimon/images/dot/vbdm/xv.gif"], next: ["paildramon", "goldvdramon"],
                        conditions: { time: 3, minWPM: 45, minAccuracy: 45, maxAccuracy: 100 }
                    },
                    {
                        id: "fladramon", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/fladra.gif", "https://humulos.com/digimon/images/dot/vbdm/fladra.gif"], next: ["aerovdramon", "sagittari"],
                        conditions: { time: 3, minWPM: 55, minAccuracy: 50, maxAccuracy: 100 }
                    },
                    {
                        id: "lighdramon", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/lighdra.gif", "https://humulos.com/digimon/images/dot/vbdm/lighdra.gif"], next: ["paildramon"],
                        conditions: { time: 3, minWPM: 65, minAccuracy: 55, maxAccuracy: 100 }
                    }
                ],
                PHASE_4: [
                    {
                        id: "aerovdramon", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/aerovdra.gif", "https://humulos.com/digimon/images/dot/vbdm/aerovdra.gif"], next: ["ulforcevdramon", "imperialdra_dmon"],
                        conditions: { time: 3, minWPM: 45, minAccuracy: 50, maxAccuracy: 100 }
                    },
                    {
                        id: "goldvdramon", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/goldvdra.gif", "https://humulos.com/digimon/images/dot/vbdm/goldvdra.gif"], next: ["imperialdra_dmon", "imperialdra_fmon"],
                        conditions: { time: 3, minWPM: 55, minAccuracy: 55, maxAccuracy: 100 }
                    },
                    {
                        id: "sagittari", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/sagittari.gif", "https://humulos.com/digimon/images/dot/vbdm/sagittari.gif"], next: ["ulforcevdramon", "magnamon"],
                        conditions: { time: 3, minWPM: 65, minAccuracy: 60, maxAccuracy: 100 }
                    },
                    {
                        id: "paildramon", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/paildra.gif", "https://humulos.com/digimon/images/dot/vbdm/paildra.gif"], next: ["magnamon", "imperialdra_fmon"],
                        conditions: { time: 3, minWPM: 75, minAccuracy: 65, maxAccuracy: 100 }
                    }
                ],
                PHASE_5: [
                    {
                        id: "ulforcevdramon", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/ulforcevdra.gif", "https://humulos.com/digimon/images/dot/vbdm/ulforcevdra.gif"],
                        conditions: { time: 3, minWPM: 55, minAccuracy: 60, maxAccuracy: 100 }
                    },
                    {
                        id: "imperialdra_dmon", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/imperialdra_d.gif", "https://humulos.com/digimon/images/dot/vbdm/imperialdra_d.gif"],
                        conditions: { time: 3, minWPM: 65, minAccuracy: 65, maxAccuracy: 100 }
                    },
                    {
                        id: "imperialdra_fmon", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/imperialdra_f.gif", "https://humulos.com/digimon/images/dot/vbdm/imperialdra_f.gif"],
                        conditions: { time: 3, minWPM: 75, minAccuracy: 70, maxAccuracy: 100 }
                    },
                    {
                        id: "magnamon", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/magna.gif", "https://humulos.com/digimon/images/dot/vbdm/magna.gif"],
                        conditions: { time: 3, minWPM: 85, minAccuracy: 75, maxAccuracy: 100 }
                    }
                ],
            }
        },
        {
            name: "Gailmon",
            tree: {
                PHASE_0: [
                    {
                        id: "jyarimon",
                        images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/jyari.gif", "https://humulos.com/digimon/images/dot/vbdm/jyari.gif"],
                        next: ["gigimon"],
                        conditions: { time: 3, minWPM: 5, minAccuracy: 10, maxAccuracy: 100 }
                    }],
                PHASE_1: [
                    {
                        id: "gigimon",
                        images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/gigi.gif", "https://humulos.com/digimon/images/dot/vbdm/gigi.gif"],
                        next: ["guilmon"],
                        conditions: { time: 3, minWPM: 15, minAccuracy: 20, maxAccuracy: 100 }
                    }],
                PHASE_2: [
                    {
                        id: "guilmon",
                        images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/guil.gif", "https://humulos.com/digimon/images/dot/vbdm/guil.gif"],
                        next: ["siesaMmon", "growmon", "devidramon"],
                        conditions: { time: 3, minWPM: 25, minAccuracy: 30, maxAccuracy: 100 }
                    }
                ],
                PHASE_3: [
                    {
                        id: "siesaMmon", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/siesa.gif", "https://humulos.com/digimon/images/dot/vbdm/siesa.gif"], next: ["vajramon", "majiramon", "mihiramon"],
                        conditions: { time: 3, minWPM: 35, minAccuracy: 40, maxAccuracy: 100 }
                    },
                    {
                        id: "growmon", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/grow.gif", "https://humulos.com/digimon/images/dot/vbdm/grow.gif"], next: ["megalogrow_omon", "megalogrowmon", "sandiramon"],
                        conditions: { time: 3, minWPM: 45, minAccuracy: 45, maxAccuracy: 100 }
                    },
                    {
                        id: "devidramon", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/devidra.gif", "https://humulos.com/digimon/images/dot/vbdm/devidra.gif"], next: ["vajramon", "majiramon", "sandiramon"],
                        conditions: { time: 3, minWPM: 55, minAccuracy: 50, maxAccuracy: 100 }
                    }
                ],
                PHASE_4: [
                    {
                        id: "vajramon", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/vajra.gif", "https://humulos.com/digimon/images/dot/vbdm/vajra.gif"], next: ["dukemon", "megidramon"],
                        conditions: { time: 3, minWPM: 45, minAccuracy: 50, maxAccuracy: 100 }
                    },
                    {
                        id: "majiramon", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/majira.gif", "https://humulos.com/digimon/images/dot/vbdm/majira.gif"], next: ["dukemon", "megidramon"],
                        conditions: { time: 3, minWPM: 55, minAccuracy: 55, maxAccuracy: 100 }
                    },
                    {
                        id: "mihiramon", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/mihira.gif", "https://humulos.com/digimon/images/dot/vbdm/mihira.gif"], next: ["dukemon", "duke_xmon"],
                        conditions: { time: 3, minWPM: 65, minAccuracy: 60, maxAccuracy: 100 }
                    },
                    {
                        id: "megalogrow_omon", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/megalogrow_o.gif", "https://humulos.com/digimon/images/dot/vbdm/megalogrow_o.gif"], next: ["duke_xmon", "duke_cmon"],
                        conditions: { time: 3, minWPM: 75, minAccuracy: 65, maxAccuracy: 100 }
                    },
                    {
                        id: "megalogrowmon", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/megalogrow.gif", "https://humulos.com/digimon/images/dot/vbdm/megalogrow.gif"], next: ["dukemon", "megidramon", "duke_cmon"],
                        conditions: { time: 3, minWPM: 85, minAccuracy: 70, maxAccuracy: 100 }
                    },
                    {
                        id: "sandiramon", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/sandira.gif", "https://humulos.com/digimon/images/dot/vbdm/sandira.gif"], next: ["duke_xmon", "duke_cmon"],
                        conditions: { time: 3, minWPM: 95, minAccuracy: 75, maxAccuracy: 100 }
                    },
                ],
                PHASE_5: [
                    {
                        id: "dukemon", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/duke.gif", "https://humulos.com/digimon/images/dot/vbdm/duke.gif"], next: ["duke_xmon", "duke_cmon"],
                        conditions: { time: 3, minWPM: 55, minAccuracy: 60, maxAccuracy: 100 }
                    },
                    {
                        id: "megidramon", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/megidra.gif", "https://humulos.com/digimon/images/dot/vbdm/megidra.gif"], next: ["duke_xmon", "duke_cmon"],
                        conditions: { time: 3, minWPM: 65, minAccuracy: 65, maxAccuracy: 100 }
                    },
                    {
                        id: "duke_xmon", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/duke_x.gif", "https://humulos.com/digimon/images/dot/vbdm/duke_x.gif"], next: [],
                        conditions: { time: 3, minWPM: 75, minAccuracy: 70, maxAccuracy: 100 }
                    },
                    {
                        id: "duke_cmon", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/duke_c.gif", "https://humulos.com/digimon/images/dot/vbdm/duke_c.gif"], next: [],
                        conditions: { time: 3, minWPM: 85, minAccuracy: 75, maxAccuracy: 100 }
                    }
                ],
            }
        },

        {
            name: "Tailmon",
            tree: {
                PHASE_0: [{
                    id: "yukimibotamon",
                    images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/yukimibota.gif", "https://humulos.com/digimon/images/dot/vbdm/yukimibota.gif"],
                    next: ["plotmon"],
                    conditions: { time: 3, minWPM: 5, minAccuracy: 10, maxAccuracy: 100 }
                }],
                PHASE_1: [{
                    id: "plotmon",
                    images: ["https://humulos.com/digimon/images/dot/d3c/frame2/plot.gif", "https://humulos.com/digimon/images/dot/d3c/plot.gif"],
                    next: ["tailmon"],
                    conditions: { time: 3, minWPM: 15, minAccuracy: 20, maxAccuracy: 100 }
                }],
                PHASE_2: [{
                    id: "tailmon",
                    images: ["https://humulos.com/digimon/images/dot/d3c/frame2/tail.gif", "https://humulos.com/digimon/images/dot/d3c/tail.gif"],
                    next: ["nefertimon", "silphymon", "angewomon"],
                    conditions: { time: 3, minWPM: 25, minAccuracy: 30, maxAccuracy: 100 }
                }],
                PHASE_3: [
                    {
                        id: "nefertimon", images: ["https://humulos.com/digimon/images/dot/d3c/frame2/neferti.gif", "https://humulos.com/digimon/images/dot/d3c/neferti.gif"], next: ["holydramon"],
                        conditions: { time: 3, minWPM: 35, minAccuracy: 40, maxAccuracy: 100 }
                    },
                    {
                        id: "silphymon", images: ["https://humulos.com/digimon/images/dot/d3c/frame2/silphy.gif", "https://humulos.com/digimon/images/dot/d3c/silphy.gif"], next: ["holydramon"],
                        conditions: { time: 3, minWPM: 45, minAccuracy: 45, maxAccuracy: 100 }
                    },
                    {
                        id: "angewomon", images: ["https://humulos.com/digimon/images/dot/d3c/frame2/angewo.gif", "https://humulos.com/digimon/images/dot/d3c/angewo.gif"], next: ["holydramon"],
                        conditions: { time: 3, minWPM: 55, minAccuracy: 50, maxAccuracy: 100 }
                    }
                ],
                PHASE_4: [
                    {
                        id: "holydramon", images: ["https://humulos.com/digimon/images/dot/d3c/frame2/holydra.gif", "https://humulos.com/digimon/images/dot/d3c/holydra.gif"], next: ["angewomon"],
                        conditions: { time: 3, minWPM: 45, minAccuracy: 50, maxAccuracy: 100 }
                    }
                ],
                PHASE_5: [
                    {
                        id: "angewomon", images: ["https://humulos.com/digimon/images/dot/d3c/frame2/angewo.gif", "https://humulos.com/digimon/images/dot/d3c/angewo.gif"],
                        conditions: { time: 3, minWPM: 55, minAccuracy: 60, maxAccuracy: 100 }
                    }
                ]
            }
        },

        {
            name: "Monster Hunter",
            tree: {
                PHASE_0: [{
                    id: "egg_imon",
                    images: ["https://humulos.com/digimon/images/dot/dmh/frame2/egg_i.gif", "https://humulos.com/digimon/images/dot/dmh/egg_i.gif"],
                    next: ["egg_iimon"]
                }],
                PHASE_1: [{
                    id: "egg_iimon",
                    images: ["https://humulos.com/digimon/images/dot/dmh/frame2/egg_ii.gif", "https://humulos.com/digimon/images/dot/dmh/egg_ii.gif"],
                    next: ["rathalos_ymon", "tigrex_ymon", "nargacuga_ymon", "rajang_ymon", "zinogre_ymon", "goremagala_ymon", "mizutsune_ymon", "khezu_ymon"]
                }],
                PHASE_2: [
                    { id: "rathalos_ymon", images: ["https://humulos.com/digimon/images/dot/dmh/frame2/rathalos.gif", "https://humulos.com/digimon/images/dot/dmh/rathalos.gif"], next: ["rathalosmon"] },
                    { id: "tigrex_ymon", images: ["https://humulos.com/digimon/images/dot/dmh/frame2/tigrex.gif", "https://humulos.com/digimon/images/dot/dmh/tigrex.gif"], next: ["tigrexmon"] },
                    { id: "nargacuga_ymon", images: ["https://humulos.com/digimon/images/dot/dmh/frame2/nargacuga.gif", "https://humulos.com/digimon/images/dot/dmh/nargacuga.gif"], next: ["nargacugamon"] },
                    { id: "rajang_ymon", images: ["https://humulos.com/digimon/images/dot/dmh/frame2/rajang.gif", "https://humulos.com/digimon/images/dot/dmh/rajang.gif"], next: ["rajangmon"] },
                    { id: "zinogre_ymon", images: ["https://humulos.com/digimon/images/dot/dmh/frame2/zinogre.gif", "https://humulos.com/digimon/images/dot/dmh/zinogre.gif"], next: ["zinogremon"] },
                    { id: "goremagala_ymon", images: ["https://humulos.com/digimon/images/dot/dmh/frame2/goremagala.gif", "https://humulos.com/digimon/images/dot/dmh/goremagala.gif"], next: ["goremagalamon"] },
                    { id: "mizutsune_ymon", images: ["https://humulos.com/digimon/images/dot/dmh/frame2/mizutsune.gif", "https://humulos.com/digimon/images/dot/dmh/mizutsune.gif"], next: ["mizutsunemon"] },
                    { id: "khezu_ymon", images: ["https://humulos.com/digimon/images/dot/dmh/frame2/khezu.gif", "https://humulos.com/digimon/images/dot/dmh/khezu.gif"], next: ["khezumon"] }
                ],
                PHASE_3: [
                    { id: "rathalosmon", images: ["https://humulos.com/digimon/images/dot/dmh/frame2/rathalos.gif", "https://humulos.com/digimon/images/dot/dmh/rathalos.gif"], next: ["rathalos_dmon"] },
                    { id: "tigrexmon", images: ["https://humulos.com/digimon/images/dot/dmh/frame2/tigrex.gif", "https://humulos.com/digimon/images/dot/dmh/tigrex.gif"], next: ["tigrex_gmon"] },
                    { id: "nargacugamon", images: ["https://humulos.com/digimon/images/dot/dmh/frame2/nargacuga.gif", "https://humulos.com/digimon/images/dot/dmh/nargacuga.gif"], next: ["nargacuga_smon"] },
                    { id: "rajangmon", images: ["https://humulos.com/digimon/images/dot/dmh/frame2/rajang.gif", "https://humulos.com/digimon/images/dot/dmh/rajang.gif"], next: ["rajang_fmon"] },
                    { id: "zinogremon", images: ["https://humulos.com/digimon/images/dot/dmh/frame2/zinogre.gif", "https://humulos.com/digimon/images/dot/dmh/zinogre.gif"], next: ["zinogre_tmon"] },
                    { id: "goremagalamon", images: ["https://humulos.com/digimon/images/dot/dmh/frame2/goremagala.gif", "https://humulos.com/digimon/images/dot/dmh/goremagala.gif"], next: ["shagarumagalamon"] },
                    { id: "mizutsunemon", images: ["https://humulos.com/digimon/images/dot/dmh/frame2/mizutsune.gif", "https://humulos.com/digimon/images/dot/dmh/mizutsune.gif"], next: ["mizutsune_smon", "mizutsune_kmon"] },
                    { id: "khezumon", images: ["https://humulos.com/digimon/images/dot/dmh/frame2/khezu.gif", "https://humulos.com/digimon/images/dot/dmh/khezu.gif"] }
                ],
                PHASE_4: [
                    { id: "rathalos_dmon", images: ["https://humulos.com/digimon/images/dot/dmh/frame2/rathalos_d.gif", "https://humulos.com/digimon/images/dot/dmh/rathalos_d.gif"], next: ["grey_rathalosmon"] },
                    { id: "tigrex_gmon", images: ["https://humulos.com/digimon/images/dot/dmh/frame2/tigrex_g.gif", "https://humulos.com/digimon/images/dot/dmh/tigrex_g.gif"] },
                    { id: "nargacuga_smon", images: ["https://humulos.com/digimon/images/dot/dmh/frame2/nargacuga_s.gif", "https://humulos.com/digimon/images/dot/dmh/nargacuga_s.gif"] },
                    { id: "rajang_fmon", images: ["https://humulos.com/digimon/images/dot/dmh/frame2/rajang_f.gif", "https://humulos.com/digimon/images/dot/dmh/rajang_f.gif"] },
                    { id: "zinogre_tmon", images: ["https://humulos.com/digimon/images/dot/dmh/frame2/zinogre_t.gif", "https://humulos.com/digimon/images/dot/dmh/zinogre_t.gif"], next: ["garuru_zinogremon"] },
                    { id: "shagarumagalamon", images: ["https://humulos.com/digimon/images/dot/dmh/frame2/shagarumagala.gif", "https://humulos.com/digimon/images/dot/dmh/shagarumagala.gif"] },
                    { id: "mizutsune_smon", images: ["https://humulos.com/digimon/images/dot/dmh/frame2/mizutsune_s.gif", "https://humulos.com/digimon/images/dot/dmh/mizutsune_s.gif"] },
                    { id: "mizutsune_kmon", images: ["https://humulos.com/digimon/images/dot/dmh/frame2/mizutsune_k.gif", "https://humulos.com/digimon/images/dot/dmh/mizutsune_k.gif"] }
                ],
                PHASE_5: [
                    { id: "grey_rathalosmon", images: ["https://humulos.com/digimon/images/dot/dmh/frame2/grey_rathalos.gif", "https://humulos.com/digimon/images/dot/dmh/grey_rathalos.gif"] },
                    { id: "garuru_zinogremon", images: ["https://humulos.com/digimon/images/dot/dmh/frame2/garuru_zinogre.gif", "https://humulos.com/digimon/images/dot/dmh/garuru_zinogre.gif"] }
                ]
            }
        },

        {
            name: "Godzilamon", tree: {
                PHASE_0: [{
                    id: "botamon", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/bota.gif", "https://humulos.com/digimon/images/dot/vbdm/bota.gif"],
                    next: ["koromon"],
                    conditions: { time: 3, minWPM: 5, minAccuracy: 10, maxAccuracy: 100 }
                }],
                PHASE_1: [{
                    id: "koromon", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/koro.gif", "https://humulos.com/digimon/images/dot/vbdm/koro.gif"],
                    next: ["babygodzillamon", "monodramon"],
                    conditions: { time: 3, minWPM: 15, minAccuracy: 20, maxAccuracy: 100 }
                }],
                PHASE_2: [{
                    id: "babygodzillamon", images: ["https://humulos.com/digimon/images/dot/dmgz/frame2/babygodzilla.gif", "https://humulos.com/digimon/images/dot/dmgz/babygodzilla.gif"],
                    next: ["godzillasaurusmon"],
                    conditions: { time: 3, minWPM: 25, minAccuracy: 30, maxAccuracy: 100 }
                },
                {
                    id: "monodramon", images: ["https://humulos.com/digimon/images/dot/dmgz/frame2/monodra.gif", "https://humulos.com/digimon/images/dot/dmgz/monodra.gif"],
                    next: ["kingghidorahmon", "giganmon"],
                    conditions: { time: 3, minWPM: 35, minAccuracy: 35, maxAccuracy: 100 }
                }
                ],
                PHASE_3: [
                    {
                        id: "godzillasaurusmon", images: ["https://humulos.com/digimon/images/dot/dmgz/frame2/godzillasaurus.gif", "https://humulos.com/digimon/images/dot/dmgz/godzillasaurus.gif"],
                        next: ["godzilla_1954mon"],
                        conditions: { time: 3, minWPM: 35, minAccuracy: 40, maxAccuracy: 100 }
                    },
                    {
                        id: "kingghidorahmon", images: ["https://humulos.com/digimon/images/dot/dmgz/frame2/kingghidorah.gif", "https://humulos.com/digimon/images/dot/dmgz/kingghidorah.gif"],
                        next: ["mechakingghidorahmon"],
                        conditions: { time: 3, minWPM: 45, minAccuracy: 45, maxAccuracy: 100 }
                    },
                    {
                        id: "giganmon", images: ["https://humulos.com/digimon/images/dot/dmgz/frame2/gigan.gif", "https://humulos.com/digimon/images/dot/dmgz/gigan.gif"],
                        next: ["kiryumon"],
                        conditions: { time: 3, minWPM: 55, minAccuracy: 50, maxAccuracy: 100 }
                    }
                ],
                PHASE_4: [
                    {
                        id: "godzilla_1954mon", images: ["https://humulos.com/digimon/images/dot/dmgz/frame2/godzilla_1954.gif", "https://humulos.com/digimon/images/dot/dmgz/godzilla_1954.gif"],
                        next: ["burninggodzillamon", "godzilla_1999mon"],
                        conditions: { time: 3, minWPM: 45, minAccuracy: 50, maxAccuracy: 100 }
                    },
                    {
                        id: "mechakingghidorahmon", images: ["https://humulos.com/digimon/images/dot/dmgz/frame2/mechakingghidorah.gif", "https://humulos.com/digimon/images/dot/dmgz/mechakingghidorah.gif"],
                        next: ["mechagodzillamon"],
                        conditions: { time: 3, minWPM: 55, minAccuracy: 55, maxAccuracy: 100 }
                    },
                    {
                        id: "kiryumon", images: ["https://humulos.com/digimon/images/dot/dmgz/frame2/kiryu.gif", "https://humulos.com/digimon/images/dot/dmgz/kiryu.gif"],
                        next: ["mugendra_mmon"],
                        conditions: { time: 3, minWPM: 65, minAccuracy: 60, maxAccuracy: 100 }
                    }
                ],
                PHASE_5: [
                    {
                        id: "burninggodzillamon", images: ["https://humulos.com/digimon/images/dot/dmgz/frame2/burninggodzilla.gif", "https://humulos.com/digimon/images/dot/dmgz/burninggodzilla.gif"],
                        conditions: { time: 3, minWPM: 55, minAccuracy: 60, maxAccuracy: 100 }
                    },
                    {
                        id: "godzilla_1999mon", images: ["https://humulos.com/digimon/images/dot/dmgz/frame2/godzilla_1999.gif", "https://humulos.com/digimon/images/dot/dmgz/godzilla_1999.gif"],
                        conditions: { time: 3, minWPM: 65, minAccuracy: 65, maxAccuracy: 100 }
                    },
                    {
                        id: "mechagodzillamon", images: ["https://humulos.com/digimon/images/dot/dmgz/frame2/mechagodzilla.gif", "https://humulos.com/digimon/images/dot/dmgz/mechagodzilla.gif"],
                        conditions: { time: 3, minWPM: 75, minAccuracy: 70, maxAccuracy: 100 }
                    },
                    {
                        id: "mugendra_mmon", images: ["https://humulos.com/digimon/images/dot/dmgz/frame2/mugendramon.gif", "https://humulos.com/digimon/images/dot/dmgz/mugendramon.gif"],
                        conditions: { time: 3, minWPM: 85, minAccuracy: 75, maxAccuracy: 100 }
                    }
                ]
            }
        },
        {
            name: "超かぐや姫！", tree: {
                PHASE_0: [{
                    id: "Iroha_Sakayori",
                    images: ["https://i.ibb.co/C5t3tWyw/a1.png", "https://i.ibb.co/tTqZZwZs/a2.png"],
                    next: ["scene_1"],
                }],
                PHASE_1: [{
                    id: "scene_1",
                    images: ["https://i.ibb.co/cXrLLCV9/c1.png", "https://i.ibb.co/LD2Z0swZ/c2.png"],
                    next: ["scene_2"],
                }],
                PHASE_2: [{
                    id: "scene_2",
                    images: ["https://i.ibb.co/Jwhw872V/d1.png", "https://i.ibb.co/b52vHMzM/d2.png"],
                    next: ["Teen_Kaguya"],
                }],
                PHASE_3: [{
                    id: "Teen_Kaguya",
                    images: ["https://i.ibb.co/s9RbFM41/b1.png", "https://i.ibb.co/2Y60cgdD/b2.png"],
                    next: ["Collab_Live"],
                }],
                PHASE_4: [{
                    id: "Collab_Live",
                    images: ["https://i.ibb.co/zVjk1gJx/e1.png", "https://i.ibb.co/RTzxyrRY/e2.png"],
                    next: ["We_Are_Kaguya!"],
                }],
                PHASE_5: [{
                    id: "We_Are_Kaguya!",
                    images: ["https://i.ibb.co/Y79K8Jx3/f1.png", "https://i.ibb.co/SXVvtVQc/f2.png"],
                    next: ["Ending"],
                }],
                PHASE_6: [{
                    id: "Ending",
                    images: ["https://i.ibb.co/cc7ps2Wz/g1.png", "https://i.ibb.co/ksyvNTZx/g2.png"]
                }]

            }
        },

        {
            name: "デジタマシリーズ：かぐや姫編", tree: {
                PHASE_0: [{
                    id: "kaguya",
                    images: ["/medias/digimon/digitama/ky1.png", "/medias/digimon/digitama/ky2.png"],
                    next: ["Iroha_Sakayori_Virtual"],
                    conditions: { time: 3, minWPM: 5, minAccuracy: 10, maxAccuracy: 100 }
                }],
                PHASE_1: [{
                    id: "Iroha_Sakayori_Virtual",
                    images: ["/medias/digimon/digitama/cy1.png", "/medias/digimon/digitama/cy2.png"],
                    next: ["Yachiyo_Runami"],
                    conditions: { time: 3, minWPM: 5, minAccuracy: 10, maxAccuracy: 100 }
                }],
                PHASE_2: [{
                    id: "Yachiyo_Runami",
                    images: ["/medias/digimon/digitama/ba1.png", "/medias/digimon/digitama/ba2.png"],
                    conditions: { time: 3, minWPM: 5, minAccuracy: 10, maxAccuracy: 100 }
                }],
            }
        }
    ],
    // --- SKIN DATA ---
    skins: [
        '/medias/digimon/digivice.png',
        '/medias/digimon/hikari.png',
        '/medias/digimon/taichi.png',
        '/medias/digimon/sora.png',
        '/medias/digimon/yamato.png',
        '/medias/digimon/jou.png',
        '/medias/digimon/mimi.png',
        '/medias/digimon/takeru.png',
        '/medias/digimon/koushiro.png',
        '/medias/digimon/black.png',
        '/medias/digimon/lui.png',
    ],
    skinNames: ["ORIGINAL", "HIKARI", "TAICHI", "SORA", "YAMATO", "JOU", "MIMI", "TAKERU", "KOUSHIRO", "BLACK", "LUI"],

    // --- NEW: ADVENTURE MAPS ---
    maps: [
        {
            id: "map_1",
            name: "FILE ISLAND",
            // You can use a real image URL here. I'm using a placeholder color for now.
            // background: "url('path/to/map1.png')", 
            background: "linear-gradient(to bottom, #76b852, #8DC26F)",
            isUnlocked: true,
            levels: [
                { id: "lvl_1", name: "KOROMON", enemyId: "koromon", phase: 1, x: 20, y: 70, game: "TYPING", difficulty: { wpm: 15 }, isUnlocked: true, isCleared: false },
                { id: "lvl_2", name: "AGUMON", enemyId: "agumon", phase: 2, x: 40, y: 50, game: "MASH", difficulty: { clicks: 20 }, isUnlocked: false, isCleared: false },
                { id: "lvl_3", name: "GREYMON", enemyId: "greymon", phase: 3, x: 70, y: 30, game: "TYPING", difficulty: { wpm: 30 }, isUnlocked: false, isCleared: false }
            ]
        },
        {
            id: "map_2",
            name: "SERVER CONT.",
            background: "linear-gradient(to bottom, #e6dada, #274046)",
            isUnlocked: false,
            levels: [
                { id: "lvl_4", name: "METALGREY", enemyId: "metalgreymon", phase: 4, x: 50, y: 50, game: "TYPING", difficulty: { wpm: 40 }, isUnlocked: false, isCleared: false }
            ]
        }
    ]
};