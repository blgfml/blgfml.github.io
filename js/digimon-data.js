/* themes/hexo-theme-matery/source/js/digimon-data.js */

window.DigimonData = {
    // --- TIME CONFIGURATION ---
    requirements: {
        PHASE_0: 5, PHASE_1: 3, PHASE_2: 3, PHASE_3: 3,
        PHASE_4: 3, PHASE_5: 3, PHASE_6: 3, PHASE_7: 3
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
                    next: ["koromon"]
                }],

                // --- PHASE 1 ---
                PHASE_1: [{
                    id: "koromon",
                    images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/koro.gif", "https://humulos.com/digimon/images/dot/vbdm/koro.gif"],
                    next: ["agumon", "agumonblack"]
                }],

                // --- PHASE 2 ---
                PHASE_2: [
                    { id: "agumon", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/agu.gif", "https://humulos.com/digimon/images/dot/vbdm/agu.gif"], next: ["greymon"] },
                    { id: "agumonblack", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/agu_b.gif", "https://humulos.com/digimon/images/dot/vbdm/frame2/agu_b.gif"], next: ["greymonblack"] }
                ],

                // --- PHASE 3 ---
                PHASE_3: [
                    { id: "greymon", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/grey.gif", "https://humulos.com/digimon/images/dot/vbdm/grey.gif"], next: ["metalgreymon", "skullgreymon"] },
                    { id: "greymonblack", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/grey_b.gif", "https://humulos.com/digimon/images/dot/vbdm/grey_b.gif"], next: ["metalgreymonblack", "skullgreymon"] }
                ],

                // ... Keep filling this out for PHASE_4 to PHASE_7 ...
                PHASE_4: [
                    { id: "metalgreymon", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/metalgrey_va.gif", "https://humulos.com/digimon/images/dot/vbdm/metalgrey_va.gif"], next: ["wargreymon", "victorygreymon"] },
                    { id: "skullgreymon", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/skullgrey.gif", "https://humulos.com/digimon/images/dot/vbdm/skullgrey.gif"], next: ["wargreymonblack"] },
                    { id: "metalgreymonblack", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/metalgrey_vi.gif", "https://humulos.com/digimon/images/dot/vbdm/metalgrey_vi.gif"], next: ["wargreymonblack"] },
                ],
                PHASE_5: [
                    { id: "wargreymon", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/wargrey.gif", "https://humulos.com/digimon/images/dot/vbdm/wargrey.gif"], next: ["omegamon"] },
                    { id: "victorygreymon", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/victorygrey.gif", "https://humulos.com/digimon/images/dot/vbdm/victorygrey.gif"], next: ["omegamon"] },
                    { id: "wargreymonblack", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/blackwargrey.gif", "https://humulos.com/digimon/images/dot/vbdm/blackwargrey.gif"], next: ["omegamonblack"] },
                ],
                PHASE_6: [
                    { id: "omegamon", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/omega.gif", "https://humulos.com/digimon/images/dot/vbdm/omega.gif"] },
                    { id: "omegamonblack", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/omega_z.gif", "https://humulos.com/digimon/images/dot/vbdm/omega_z.gif"] }
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
                        next: ["chibimon"]
                    }],
                PHASE_1: [
                    {
                        id: "chibimon",
                        images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/chibi.gif", "https://humulos.com/digimon/images/dot/vbdm/chibi.gif"],
                        next: ["vmon"]
                    }],
                PHASE_2: [
                    {
                        id: "vmon",
                        images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/v.gif", "https://humulos.com/digimon/images/dot/vbdm/v.gif"],
                        next: ["vdramon", "xvmon", "fladramon", "lighdramon"]
                    }],
                PHASE_3: [
                    { id: "vdramon", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/vdra.gif", "https://humulos.com/digimon/images/dot/vbdm/vdra.gif"], next: ["aerovdramon", "goldvdramon", "sagittari"] },
                    { id: "xvmon", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/xv.gif", "https://humulos.com/digimon/images/dot/vbdm/xv.gif"], next: ["paildramon", "goldvdramon"] },
                    { id: "fladramon", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/fladra.gif", "https://humulos.com/digimon/images/dot/vbdm/fladra.gif"], next: ["aerovdramon", "sagittari"] },
                    { id: "lighdramon", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/lighdra.gif", "https://humulos.com/digimon/images/dot/vbdm/lighdra.gif"], next: ["paildramon"] }
                ],
                PHASE_4: [
                    { id: "aerovdramon", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/aerovdra.gif", "https://humulos.com/digimon/images/dot/vbdm/aerovdra.gif"], next: ["ulforcevdramon", "imperialdra_dmon"] },
                    { id: "goldvdramon", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/goldvdra.gif", "https://humulos.com/digimon/images/dot/vbdm/goldvdra.gif"], next: ["imperialdra_dmon", "imperialdra_fmon"] },
                    { id: "sagittari", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/sagittari.gif", "https://humulos.com/digimon/images/dot/vbdm/sagittari.gif"], next: ["ulforcevdramon", "magnamon"] },
                    { id: "paildramon", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/paildra.gif", "https://humulos.com/digimon/images/dot/vbdm/paildra.gif"], next: ["magnamon", "imperialdra_fmon"] }
                ],
                PHASE_5: [
                    { id: "ulforcevdramon", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/ulforcevdra.gif", "https://humulos.com/digimon/images/dot/vbdm/ulforcevdra.gif"] },
                    { id: "imperialdra_dmon", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/imperialdra_d.gif", "https://humulos.com/digimon/images/dot/vbdm/imperialdra_d.gif"] },
                    { id: "imperialdra_fmon", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/imperialdra_f.gif", "https://humulos.com/digimon/images/dot/vbdm/imperialdra_f.gif"] },
                    { id: "magnamon", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/magna.gif", "https://humulos.com/digimon/images/dot/vbdm/magna.gif"] }
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
                        next: ["gigimon"]
                    }],
                PHASE_1: [
                    {
                        id: "gigimon",
                        images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/gigi.gif", "https://humulos.com/digimon/images/dot/vbdm/gigi.gif"],
                        next: ["guilmon"]
                    }],
                PHASE_2: [
                    {
                        id: "guilmon",
                        images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/guil.gif", "https://humulos.com/digimon/images/dot/vbdm/guil.gif"],
                        next: ["siesaMmon", "growmon", "devidramon"]
                    }
                ],
                PHASE_3: [
                    { id: "siesaMmon", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/siesa.gif", "https://humulos.com/digimon/images/dot/vbdm/siesa.gif"], next: ["vajramon", "majiramon", "mihiramon"] },
                    { id: "growmon", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/grow.gif", "https://humulos.com/digimon/images/dot/vbdm/grow.gif"], next: ["megalogrow_omon", "megalogrowmon", "sandiramon"] },
                    { id: "devidramon", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/devidra.gif", "https://humulos.com/digimon/images/dot/vbdm/devidra.gif"], next: ["vajramon", "majiramon", "sandiramon"] }
                ],
                PHASE_4: [
                    { id: "vajramon", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/vajra.gif", "https://humulos.com/digimon/images/dot/vbdm/vajra.gif"], next: ["dukemon", "megidramon"] },
                    { id: "majiramon", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/majira.gif", "https://humulos.com/digimon/images/dot/vbdm/majira.gif"], next: ["dukemon", "megidramon"] },
                    { id: "mihiramon", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/mihira.gif", "https://humulos.com/digimon/images/dot/vbdm/mihira.gif"], next: ["dukemon", "duke_xmon"] },
                    { id: "megalogrow_omon", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/megalogrow_o.gif", "https://humulos.com/digimon/images/dot/vbdm/megalogrow_o.gif"], next: ["duke_xmon", "duke_cmon"] },
                    { id: "megalogrowmon", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/megalogrow.gif", "https://humulos.com/digimon/images/dot/vbdm/megalogrow.gif"], next: ["dukemon", "megidramon", "duke_cmon"] },
                    { id: "sandiramon", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/sandira.gif", "https://humulos.com/digimon/images/dot/vbdm/sandira.gif"], next: ["duke_xmon", "duke_cmon"] },
                ],
                PHASE_5: [
                    { id: "dukemon", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/duke.gif", "https://humulos.com/digimon/images/dot/vbdm/duke.gif"], next: ["duke_xmon", "duke_cmon"] },
                    { id: "megidramon", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/megidra.gif", "https://humulos.com/digimon/images/dot/vbdm/megidra.gif"], next: ["duke_xmon", "duke_cmon"] },
                    { id: "duke_xmon", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/duke_x.gif", "https://humulos.com/digimon/images/dot/vbdm/duke_x.gif"], next: [] },
                    { id: "duke_cmon", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/duke_c.gif", "https://humulos.com/digimon/images/dot/vbdm/duke_c.gif"], next: [] }
                ],
            }
        },

        {
            name: "Tailmon",
            tree: {
                PHASE_0: [{
                    id: "yukimibotamon",
                    images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/yukimibota.gif", "https://humulos.com/digimon/images/dot/vbdm/yukimibota.gif"],
                    next: ["plotmon"]
                }],
                PHASE_1: [{
                    id: "plotmon",
                    images: ["https://humulos.com/digimon/images/dot/d3c/frame2/plot.gif", "https://humulos.com/digimon/images/dot/d3c/plot.gif"],
                    next: ["tailmon"]
                }],
                PHASE_2: [{
                    id: "tailmon",
                    images: ["https://humulos.com/digimon/images/dot/d3c/frame2/tail.gif", "https://humulos.com/digimon/images/dot/d3c/tail.gif"],
                    next: ["nefertimon", "silphymon", "angewomon"]
                }],
                PHASE_3: [
                    { id: "nefertimon", images: ["https://humulos.com/digimon/images/dot/d3c/frame2/neferti.gif", "https://humulos.com/digimon/images/dot/d3c/neferti.gif"], next: ["holydramon"] },
                    { id: "silphymon", images: ["https://humulos.com/digimon/images/dot/d3c/frame2/silphy.gif", "https://humulos.com/digimon/images/dot/d3c/silphy.gif"], next: ["holydramon"] },
                    { id: "angewomon", images: ["https://humulos.com/digimon/images/dot/d3c/frame2/angewo.gif", "https://humulos.com/digimon/images/dot/d3c/angewo.gif"], next: ["holydramon"] }
                ],
                PHASE_4: [
                    { id: "holydramon", images: ["https://humulos.com/digimon/images/dot/d3c/frame2/holydra.gif", "https://humulos.com/digimon/images/dot/d3c/holydra.gif"], next: ["angewomon"] }
                ],
                PHASE_5: [
                    { id: "angewomon", images: ["https://humulos.com/digimon/images/dot/d3c/frame2/angewo.gif", "https://humulos.com/digimon/images/dot/d3c/angewo.gif"] }
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
                    next: ["koromon"]
                }],
                PHASE_1: [{
                    id: "koromon", images: ["https://humulos.com/digimon/images/dot/vbdm/frame2/koro.gif", "https://humulos.com/digimon/images/dot/vbdm/koro.gif"],
                    next: ["babygodzillamon", "monodramon"]
                }],
                PHASE_2: [{
                    id: "babygodzillamon", images: ["https://humulos.com/digimon/images/dot/dmgz/frame2/babygodzilla.gif", "https://humulos.com/digimon/images/dot/dmgz/babygodzilla.gif"],
                    next: ["godzillasaurusmon"]
                },
                {
                    id: "monodramon", images: ["https://humulos.com/digimon/images/dot/dmgz/frame2/monodra.gif", "https://humulos.com/digimon/images/dot/dmgz/monodra.gif"],
                    next: ["kingghidorahmon", "giganmon"]
                }
                ],
                PHASE_3: [
                    {
                        id: "godzillasaurusmon", images: ["https://humulos.com/digimon/images/dot/dmgz/frame2/godzillasaurus.gif", "https://humulos.com/digimon/images/dot/dmgz/godzillasaurus.gif"],
                        next: ["godzilla_1954mon"]
                    },
                    {
                        id: "kingghidorahmon", images: ["https://humulos.com/digimon/images/dot/dmgz/frame2/kingghidorah.gif", "https://humulos.com/digimon/images/dot/dmgz/kingghidorah.gif"],
                        next: ["mechakingghidorahmon"]
                    },
                    {
                        id: "giganmon", images: ["https://humulos.com/digimon/images/dot/dmgz/frame2/gigan.gif", "https://humulos.com/digimon/images/dot/dmgz/gigan.gif"],
                        next: ["kiryumon"]
                    }
                ],
                PHASE_4: [
                    {
                        id: "godzilla_1954mon", images: ["https://humulos.com/digimon/images/dot/dmgz/frame2/godzilla_1954.gif", "https://humulos.com/digimon/images/dot/dmgz/godzilla_1954.gif"],
                        next: ["burninggodzillamon", "godzilla_1999mon"]
                    },
                    {
                        id: "mechakingghidorahmon", images: ["https://humulos.com/digimon/images/dot/dmgz/frame2/mechakingghidorah.gif", "https://humulos.com/digimon/images/dot/dmgz/mechakingghidorah.gif"],
                        next: ["mechagodzillamon"]
                    },
                    {
                        id: "kiryumon", images: ["https://humulos.com/digimon/images/dot/dmgz/frame2/kiryu.gif", "https://humulos.com/digimon/images/dot/dmgz/kiryu.gif"],
                        next: ["mugendra_mmon"]
                    }
                ],
                PHASE_5: [
                    {
                        id: "burninggodzillamon", images: ["https://humulos.com/digimon/images/dot/dmgz/frame2/burninggodzilla.gif", "https://humulos.com/digimon/images/dot/dmgz/burninggodzilla.gif"]
                    },
                    {
                        id: "godzilla_1999mon", images: ["https://humulos.com/digimon/images/dot/dmgz/frame2/godzilla_1999.gif", "https://humulos.com/digimon/images/dot/dmgz/godzilla_1999.gif"]
                    },
                    {
                        id: "mechagodzillamon", images: ["https://humulos.com/digimon/images/dot/dmgz/frame2/mechagodzilla.gif", "https://humulos.com/digimon/images/dot/dmgz/mechagodzilla.gif"]
                    },
                    {
                        id: "mugendra_mmon", images: ["https://humulos.com/digimon/images/dot/dmgz/frame2/mugendramon.gif", "https://humulos.com/digimon/images/dot/dmgz/mugendramon.gif"]
                    }
                ]
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