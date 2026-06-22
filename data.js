// ── SAMPLE DATA ─────────────────────────────────────────────────────────────
// Replace this with real content as needed.

const DATA = {

  weeklies: {
    "russia-ukraine": {
      "jun2026": [
        {
          theatreNum: "THEATRE 01",
          title: "Russia – Ukraine",
          subtitle: "992-Drone Moscow Strike & Asia Spillover",
          articles: [
            {
              tags: ["FIRES & STRIKES", "INFORMATION OPERATIONS"],
              headline: "Ukraine's 992-drone Moscow strike: the war's first strategic fires-as-IO operation at national scale",
              body: `Ukraine's record overnight campaign on 17–18 June — <span class="hl">992 drones, Moscow refinery hit for the second time in a week, 18 apartment buildings damaged, airport evacuations, one child killed</span> — was simultaneously the largest drone military operation of the war and a precision information operation. G7 leaders, simultaneously at Évian, committed to expanded air defence and sanctions in direct response to the preceding Lavra strike.`,
              sources: ["opb", "trtworld"],
              implicationLabel: "FIRES · INFORMATION OPERATIONS · GBAD · C2",
              implications: [
                "<strong>Redundancy-through-volume is a proven strategic fires doctrine</strong> — 992 launches guaranteeing decisive hits against hardened national air defence is replicable by any military with drone industrial capacity. GBAD and installation protection planning must be stress-tested against volume saturation.",
                "<strong>Kinetic actions timed to diplomatic windows generate compounding strategic effects</strong> — the Lavra strike at G7 opening generated a political commitment; the Moscow retaliation at G7 closing generated a Russian escalation pledge. Timing of kinetic and diplomatic actions relative to each other is a core operational planning variable."
              ]
            },
            {
              tags: ["REGIONAL SPILLOVER", "ASIA"],
              headline: "Taiwan launches civilian drone training programme",
              body: `Taiwan's civil defence NGO, Kuma Academy, has launched its first civilian drone training programme, directly inspired by the war in Ukraine. The fully booked programme trains about 75 diverse citizens monthly — mostly women, spanning teenagers to seniors — to fly small, GPS-free, Taiwanese-made drones manually to bypass electronic jamming. The goal is civil resilience rather than combat, turning citizens into active observers who can gather and share risk information. This initiative comes as Taiwan lowers its drone registration age to 14 (with over 39,000 registered drones nationwide), and Ukrainian firms actively market combat-proven drone systems to Asian militaries amid rising China–Taiwan tensions.`,
              sources: ["newswall"],
              implicationLabel: "INSTALLATION PROTECTION · CIVIL-MILITARY · MOBILISATION READINESS · C-UAS",
              implications: [
                "<strong>Civilian drone literacy as a mobilisation multiplier</strong> — Taiwan's model demonstrates that pre-trained civilian drone operators constitute a scalable ISR and civil defence force multiplier that does not require military manpower. A structured civil drone programme generates reconnaissance capacity, route-clearance support, and damage-assessment capability at negligible cost per operator.",
                "<strong>GPS-denial is now a baseline training assumption</strong> — the explicit focus on manual flight skills in GPS-denied environments signals that state and non-state actors in the region are planning for contested electromagnetic environments as the norm, not the exception."
              ]
            }
          ]
        }
      ],
      "may2026": [
        {
          theatreNum: "THEATRE 01",
          title: "Russia – Ukraine",
          subtitle: "May Operational Overview",
          articles: [
            {
              tags: ["MANOEUVRE", "DEEP STRIKE"],
              headline: "Ukraine accelerates deep interdiction campaign targeting Russian logistics nodes",
              body: `Ukraine ran its heaviest deep-strike month of the year in May — <span class="hl">18 oil-and-gas sites, trains, fuel tankers and highway nodes</span> — stalling Russian offensives and forcing trucks into armed convoys repainted as civilian traffic. ISW's 24 May assessment noted Ukraine time mechanised attacks to the interdiction effect across Pokrovsk, Borova, and Hulyaipole, retaking approximately 100 square miles in four weeks.`,
              sources: ["isw", "reuters"],
              implicationLabel: "LOGISTICS · FIRES · MANOEUVRE",
              implications: [
                "<strong>Deep interdiction is now operationally decisive on its own</strong> — the correlation between strike tempo and Ukrainian ground gains in May confirms that logistics degradation can generate freedom of manoeuvre without direct tactical engagement.",
                "<strong>Fuel and ammunition nodes are the primary protected target set</strong> — Russian adaptation (armed convoys, civilian repainting) confirms that node survivability, not just throughput, is the critical logistics vulnerability."
              ]
            }
          ]
        }
      ],
      "apr2026": [
        {
          theatreNum: "THEATRE 01",
          title: "Russia – Ukraine",
          subtitle: "April Operational Overview",
          articles: [
            {
              tags: ["GBAD", "C-UAS"],
              headline: "Russian layered GBAD adaptation assessed after Patriot intercept data release",
              body: `April saw a significant assessment revision of Russian GBAD effectiveness following declassified Patriot intercept data. <span class="hl">Intercept rates against Shahed-136 variants dropped to 34% in contested electromagnetic environments</span>, prompting a reassessment of layered GBAD architecture requirements across coalition partners.`,
              sources: ["defpost"],
              implicationLabel: "GBAD · C-UAS · FORCE PROTECTION",
              implications: [
                "<strong>Single-layer GBAD is insufficient against high-volume saturation attacks</strong> — the intercept rate data confirms that terminal defence must be integrated with mid-course and long-range layers.",
                "<strong>Electromagnetic environment management is inseparable from GBAD effectiveness</strong> — contested EMS reduces intercept probability by an estimated 40–60%, making EW integration a GBAD planning requirement, not an enhancement."
              ]
            }
          ]
        }
      ],
      "mar2026": [
        {
          theatreNum: "THEATRE 01",
          title: "Russia – Ukraine",
          subtitle: "March Operational Overview",
          articles: [
            {
              tags: ["MANOEUVRE", "URBAN"],
              headline: "Avdiivka salient analysis: lessons from post-capture consolidation",
              body: `Three months after the fall of Avdiivka, March saw comprehensive battle damage assessment completed. <span class="hl">Russian forces required 4:1 manpower ratios and 6 months of siege to capture a single fortified urban node</span>, at a cost of approximately 16,000 casualties. The consolidation phase has demonstrated continued Ukrainian interdiction effectiveness against Russian forward supply lines.`,
              sources: ["ukrmod", "isw"],
              implicationLabel: "URBAN OPERATIONS · MANPOWER · ATTRITION",
              implications: [
                "<strong>Urban fortification remains an asymmetric equaliser</strong> — the force ratio required to reduce prepared urban defences confirms that investment in urban defensive preparation generates disproportionate cost imposition on the attacker.",
                "<strong>Post-capture consolidation is as operationally demanding as the assault</strong> — Russian inability to exploit the capture rapidly due to interdiction confirms that offensive momentum requires pre-positioned logistics, not post-capture resupply."
              ]
            }
          ]
        }
      ]
    },

    "israel-lebanon": {
      "jun2026": [
        {
          theatreNum: "THEATRE 02",
          title: "Israel – Lebanon",
          subtitle: "IDF Nabatieh Advance & Hezbollah FPV Employment",
          articles: [
            {
              tags: ["MANOEUVRE", "C-UAS", "UNMANNED SYSTEMS"],
              headline: "IDF reaches Nabatieh; Hezbollah fibre-optic FPV employment negates EW protection",
              body: `IDF reached Nabatieh by 30 May, but <span class="hl">Hezbollah fired fibre-optic FPVs (6 kg HEAT, 30–50 km range, no RF signature to jam) from stand-off distances</span>, so electronic warfare alone no longer protects armour on the advance. The static hold has become a losing posture as Hezbollah adapts to Israeli EW superiority.`,
              sources: ["timesofisrael", "jpost"],
              implicationLabel: "C-UAS · EW · ARMOUR PROTECTION",
              implications: [
                "<strong>Fibre-optic FPVs represent a categorical defeat of RF-based C-UAS</strong> — no emissions means no detection, no jamming, and no warning. Defeat requires kinetic intercept (hard kill) or pre-launch action against operators and logistics.",
                "<strong>EW overmatch is no longer a guarantee of armour survivability</strong> — forces planning armoured operations must now assume a C-UAS threat envelope that EW cannot address, requiring integrated hard-kill systems as a baseline."
              ]
            }
          ]
        }
      ],
      "may2026": [{ theatreNum: "THEATRE 02", title: "Israel – Lebanon", subtitle: "May Update", articles: [{ tags: ["FIRES"], headline: "Placeholder — May Israel-Lebanon content", body: "Content pending.", sources: [], implicationLabel: "PENDING", implications: [] }] }],
      "apr2026": [{ theatreNum: "THEATRE 02", title: "Israel – Lebanon", subtitle: "April Update", articles: [{ tags: ["MANOEUVRE"], headline: "Placeholder — April Israel-Lebanon content", body: "Content pending.", sources: [], implicationLabel: "PENDING", implications: [] }] }],
      "mar2026": [{ theatreNum: "THEATRE 02", title: "Israel – Lebanon", subtitle: "March Update", articles: [{ tags: ["INTEL"], headline: "Placeholder — March Israel-Lebanon content", body: "Content pending.", sources: [], implicationLabel: "PENDING", implications: [] }] }]
    },

    "israel-gaza": {
      "jun2026": [
        {
          theatreNum: "THEATRE 03",
          title: "Israel – Gaza",
          subtitle: "Rafah Operations & Humanitarian Corridor Dynamics",
          articles: [
            {
              tags: ["URBAN OPERATIONS", "CIVIL-MILITARY"],
              headline: "IDF corridor operations in Rafah: lessons in urban clearance under international scrutiny",
              body: `IDF Rafah operations in June have established a corridor model that attempts to separate civilian movement from tactical clearance zones. <span class="hl">Population displacement estimated at 1.2 million civilians across the southern corridor</span>, with aid entry constrained to two functional crossings operating at 40% capacity.`,
              sources: ["unrwa", "bbc"],
              implicationLabel: "URBAN OPS · CIVIL-MILITARY · LOGISTICS",
              implications: [
                "<strong>Corridor operations at this scale require dedicated C2 separate from tactical manoeuvre</strong> — the complexity of managing population flow, aid entry, and tactical clearance simultaneously has created command friction that has slowed operational tempo.",
                "<strong>Crossing throughput is a strategic constraint, not a tactical variable</strong> — international pressure is now directly linked to crossing capacity, making humanitarian logistics a shaping operation rather than a supporting one."
              ]
            }
          ]
        }
      ],
      "may2026": [{ theatreNum: "THEATRE 03", title: "Israel – Gaza", subtitle: "May Update", articles: [{ tags: ["URBAN"], headline: "Placeholder — May Israel-Gaza content", body: "Content pending.", sources: [], implicationLabel: "PENDING", implications: [] }] }],
      "apr2026": [{ theatreNum: "THEATRE 03", title: "Israel – Gaza", subtitle: "April Update", articles: [{ tags: ["FIRES"], headline: "Placeholder — April Israel-Gaza content", body: "Content pending.", sources: [], implicationLabel: "PENDING", implications: [] }] }],
      "mar2026": [{ theatreNum: "THEATRE 03", title: "Israel – Gaza", subtitle: "March Update", articles: [{ tags: ["INTEL"], headline: "Placeholder — March Israel-Gaza content", body: "Content pending.", sources: [], implicationLabel: "PENDING", implications: [] }] }]
    },

    "israel-us-iran": {
      "jun2026": [
        {
          theatreNum: "THEATRE 04",
          title: "Israel – US – Iran",
          subtitle: "Nuclear Negotiations & Strike Threat Calculus",
          articles: [
            {
              tags: ["INFORMATION OPERATIONS", "STRATEGIC"],
              headline: "Iran nuclear talks: strategic ambiguity as deterrence and its limits",
              body: `June negotiations in Vienna have produced no framework agreement. <span class="hl">Iran's enrichment level remains at 60% U-235, with 12 kg of near-weapons-grade material estimated by IAEA</span>. US carrier presence in the Gulf has been maintained at two CSGs, signalling continued strike readiness.`,
              sources: ["reuters", "iaea"],
              implicationLabel: "DETERRENCE · STRATEGIC · NUCLEAR",
              implications: [
                "<strong>Dual CSG presence is a sustained deterrence signal, not a crisis posture</strong> — the normalisation of two-carrier Gulf presence reduces its escalatory signalling value over time, requiring calibrated adjustment to maintain credibility.",
                "<strong>60% enrichment with 12 kg stockpile is a threshold management problem</strong> — the gap between current enrichment and weapons-grade has compressed to a matter of weeks of decision, fundamentally altering the strike timeline calculus."
              ]
            }
          ]
        }
      ],
      "may2026": [{ theatreNum: "THEATRE 04", title: "Israel – US – Iran", subtitle: "May Update", articles: [{ tags: ["STRATEGIC"], headline: "Placeholder — May Israel-US-Iran content", body: "Content pending.", sources: [], implicationLabel: "PENDING", implications: [] }] }],
      "apr2026": [{ theatreNum: "THEATRE 04", title: "Israel – US – Iran", subtitle: "April Update", articles: [{ tags: ["DETERRENCE"], headline: "Placeholder — April Israel-US-Iran content", body: "Content pending.", sources: [], implicationLabel: "PENDING", implications: [] }] }],
      "mar2026": [{ theatreNum: "THEATRE 04", title: "Israel – US – Iran", subtitle: "March Update", articles: [{ tags: ["INTEL"], headline: "Placeholder — March Israel-US-Iran content", body: "Content pending.", sources: [], implicationLabel: "PENDING", implications: [] }] }]
    },

    "thailand-cambodia": {
      "jun2026": [
        {
          theatreNum: "THEATRE 05",
          title: "Thailand – Cambodia",
          subtitle: "Border Skirmish Escalation & ASEAN Mediation",
          articles: [
            {
              tags: ["MANOEUVRE", "REGIONAL"],
              headline: "Thai-Cambodian border incidents: low-intensity escalation pattern and ASEAN response",
              body: `June has seen <span class="hl">three separate border incidents in the Ta Phraya district, with two Thai soldiers wounded and one Cambodian border post destroyed</span>. ASEAN has convened an emergency consultative meeting, with Malaysia as chair attempting to broker a ceasefire and joint demarcation commission.`,
              sources: ["bangkokpost", "phnompenpost"],
              implicationLabel: "BORDER SECURITY · REGIONAL · ESCALATION",
              implications: [
                "<strong>Low-intensity border incidents with no clear trigger create escalation ambiguity</strong> — the absence of a single precipitating event makes de-escalation harder to anchor, as neither side can credibly agree on what to roll back.",
                "<strong>ASEAN mediation effectiveness is constrained by non-interference norms</strong> — the consultative mechanism is structurally limited in its ability to impose solutions, making bilateral back-channels the most likely de-escalation path."
              ]
            }
          ]
        }
      ],
      "may2026": [{ theatreNum: "THEATRE 05", title: "Thailand – Cambodia", subtitle: "May Update", articles: [{ tags: ["REGIONAL"], headline: "Placeholder — May Thailand-Cambodia content", body: "Content pending.", sources: [], implicationLabel: "PENDING", implications: [] }] }],
      "apr2026": [{ theatreNum: "THEATRE 05", title: "Thailand – Cambodia", subtitle: "April Update", articles: [{ tags: ["BORDER"], headline: "Placeholder — April Thailand-Cambodia content", body: "Content pending.", sources: [], implicationLabel: "PENDING", implications: [] }] }],
      "mar2026": [{ theatreNum: "THEATRE 05", title: "Thailand – Cambodia", subtitle: "March Update", articles: [{ tags: ["INTEL"], headline: "Placeholder — March Thailand-Cambodia content", body: "Content pending.", sources: [], implicationLabel: "PENDING", implications: [] }] }]
    }
  },

  digest: {
    manoeuvre: {
      changed: `For 3 Div, 9 Div and Armour, deep interdiction is now decisive on its own. Ukraine ran its heaviest deep-strike month of the year — 18 oil-and-gas sites plus trains, fuel tankers and highway nodes — stalling Russian offensives and forcing trucks into armed convoys repainted as civilian traffic, which makes your own fuel and ammunition nodes a primary protected target set. The advance is now conditioned on that effect: ISW's 24 May 'new phase' had Ukraine time mechanised attacks to the interdiction (Pokrovsk, Borova, Hulyaipole) and retake about 100 square miles in four weeks. And the static hold has become a losing posture — IDF reached Nabatieh by 30 May, but Hezbollah fired fibre-optic FPVs (6 kg HEAT to 30–50 km, no RF to jam) from further out, so EW alone no longer protects armour.`,
      opportunities: [
        { title: "Deep Strike Sequencing", body: "Timing mechanised operations to the effect of prior deep interdiction generates a multiplicative operational effect — the window when logistics are degraded but before reconstitution is the decisive manoeuvre window." },
        { title: "Corridor Operations as Shaping", body: "The IDF Rafah model demonstrates that civilian corridor management, when integrated into operational design, can shape enemy freedom of action by constraining their use of the civilian population as cover." },
        { title: "Civilian Mobilisation for ISR", body: "Taiwan's Kuma Academy model shows that pre-trained civilian observers at scale generate a persistent, low-cost ISR network that military planners can task without consuming military manpower." }
      ],
      vulnerabilities: [
        { title: "Fuel & Ammunition Node Exposure", body: "Russian adaptation — armed convoys, civilian repainting — confirms that logistics nodes are a primary target set. Own-force equivalents require hardening, dispersion, and deception as baseline planning assumptions." },
        { title: "EW-Only C-UAS is Defeated", body: "Fibre-optic FPV employment by Hezbollah has demonstrated that RF-based C-UAS provides zero protection against wire-guided systems. Hard-kill integration is now a minimum requirement, not an enhancement." },
        { title: "Static Hold Creates Target", body: "Fixed defensive positions without active interdiction capacity become predictable targets. The IDF Nabatieh experience confirms that static holds require active fires to remain viable." }
      ],
      capdevs: [
        { title: "Fibre-Optic FPV (Threat)", body: "6 kg HEAT warhead, 30–50 km range, zero RF emissions. Defeats all current RF-based detection and jamming. Requires hard-kill defeat mechanism and operator/logistics targeting." },
        { title: "Civilian GPS-Denied UAS", body: "Taiwan's Kuma Academy trains citizens on manual, GPS-free UAS operation. Low-cost, scalable, and optimised for denied electromagnetic environments. Relevant to civil-military ISR integration planning." },
        { title: "Volume-Saturation Drone Doctrine", body: "Ukraine's 992-drone strike codifies a fires doctrine: sufficient volume guarantees penetration of any point defence. GBAD architecture must be stress-tested against 500+ simultaneous tracks." }
      ]
    },
    "sense-strike": {
      changed: "Sense-Strike domain saw significant ISR integration developments across both theatres. Ukraine's drone ISR network demonstrated persistent surveillance of Russian rear areas, enabling real-time targeting of logistics nodes. IDF sense-strike integration in urban terrain produced compressed kill chains of under 4 minutes from detection to munition impact.",
      opportunities: [
        { title: "Persistent Rear-Area ISR", body: "Ukraine's model of maintaining persistent UAS coverage over Russian logistics corridors has generated continuous targeting data. A distributed, attritable ISR layer over adversary rear areas produces a targeting environment that overwhelms their reconstitution capacity." },
        { title: "Compressed Kill Chains", body: "IDF demonstrated sub-4-minute sensor-to-shooter cycles in urban terrain using pre-designated target sets and pre-approved engagement authorities. Kill chain compression is primarily a C2 and authority problem, not a technology problem." },
        { title: "Cross-Domain Cueing", body: "Integration of SIGINT cueing with UAS confirmation and precision strike has produced a three-stage sense-strike model that reduces collateral damage risk while maintaining tempo." }
      ],
      vulnerabilities: [
        { title: "ISR Attrition Rate", body: "Ukraine is losing approximately 10,000 UAS per month, primarily to Russian EW and C-UAS. Persistent ISR requires industrial-scale replenishment pipelines that most militaries have not built." },
        { title: "Kill Chain Authority Compression", body: "Compressed kill chains require pre-delegated engagement authority at lower command levels. Existing ROE frameworks in most militaries are not designed for sub-5-minute decision cycles." },
        { title: "GPS Dependency", body: "The majority of precision guided munitions remain GPS-dependent. Russian GPS jamming has produced significant miss distances in several documented strikes, confirming the need for multi-mode guidance as a baseline." }
      ],
      capdevs: [
        { title: "AI-Assisted Target Discrimination", body: "IDF has fielded AI systems that assist analysts in discriminating military from civilian signatures in urban terrain. Reduces analyst load but introduces accountability questions around AI-assisted engagement decisions." },
        { title: "Fibre-Optic Ground Sensor Networks", body: "Ukraine has deployed extensive buried fibre-optic sensor networks along likely Russian manoeuvre axes. Provides seismic and acoustic early warning independent of RF. Relevant to installation protection planning." },
        { title: "Software-Defined EW Platforms", body: "Both sides have demonstrated rapid EW adaptation cycles measured in days rather than months. Software-defined EW platforms that can be updated over-the-air are becoming a competitive baseline requirement." }
      ]
    },
    "combat-support": {
      changed: "Combat support domain dominated by logistics adaptation on both sides. Russian forced truck convoy repainting and Ukrainian deep interdiction created a new logistics security paradigm. Medical evacuation under UAS threat has required fundamental procedural changes in both theatres.",
      opportunities: [
        { title: "Logistics Deception", body: "Russian civilian-repaint adaptation, while tactically questionable, demonstrates that logistics signature management is a viable force protection measure. Own-force logistics convoys should incorporate signature reduction and deception as standard practice." },
        { title: "Pre-Positioned Forward Stocks", body: "Ukraine's ability to exploit interdiction windows confirms that forces with pre-positioned forward stocks are more agile than those dependent on just-in-time resupply. Depot positioning is now an operational planning variable." },
        { title: "Distributed Medical Posts", body: "Both theatres have validated the distributed medical post model — small, dispersed casualty collection points rather than large fixed aid stations — as the only viable CASEVAC approach under persistent UAS threat." }
      ],
      vulnerabilities: [
        { title: "Convoy Signature Exposure", body: "Fuel and ammunition convoys generate distinctive electromagnetic and visual signatures. Without active deception and signature management, they are persistent targets for ISR-cued deep strike." },
        { title: "Fixed Medical Facilities", body: "Large fixed medical facilities have been struck in both theatres. The transition to distributed medical support has not been completed by most conventional militaries, creating a known vulnerability." },
        { title: "Engineer Support Bottleneck", body: "Bridging and route clearance have become critical bottlenecks in both theatres. The demand for engineer support has exceeded available capacity, confirming that engineer force structure is typically under-resourced relative to operational requirements." }
      ],
      capdevs: [
        { title: "Armoured Ambulance Conversion", body: "Ukraine has fielded modified armoured vehicles as forward ambulances, providing protected CASEVAC under direct and indirect fire. Low-cost conversion using existing platforms." },
        { title: "3D-Printed Spare Parts", body: "Both sides have demonstrated in-theatre 3D printing of non-critical spare parts, reducing logistics tail for high-demand low-complexity components. Does not replace industrial supply chains but reduces acute shortfalls." },
        { title: "Commercial Satellite Comms for Logistics", body: "Starlink integration into logistics C2 has produced significant improvements in convoy tracking and rerouting responsiveness. Commercial satellite communications are now a logistics enabler, not a supplement." }
      ]
    },
    expeditionary: {
      changed: "Expeditionary domain saw focus on force projection sustainability and allied integration. G7 Évian commitments produced expanded air defence packages for Ukraine, testing allied expeditionary logistics pipelines. Thai-Cambodian border incidents highlighted ASEAN limitations in rapid response.",
      opportunities: [
        { title: "Allied Air Defence Integration", body: "G7 Évian commitments have accelerated the integration of disparate national air defence systems into a common operational picture. The technical and doctrinal lessons from this integration are directly applicable to coalition GBAD planning." },
        { title: "Regional Civilian Expertise Networks", body: "Taiwan's Kuma Academy demonstrates that pre-crisis civilian capability building creates a latent expeditionary support capacity. Civil-military integration at the pre-crisis phase generates options that are unavailable once a crisis begins." },
        { title: "ASEAN Back-Channel Mechanisms", body: "The Thai-Cambodia situation confirms that ASEAN's formal mediation mechanisms are too slow for active border incidents. Back-channel bilateral mechanisms remain the most effective de-escalation tool in the ASEAN context." }
      ],
      vulnerabilities: [
        { title: "Allied Logistics Pipeline Capacity", body: "The pace of G7 air defence system deliveries has been constrained by industrial capacity and logistics pipeline throughput, not political will. Allied expeditionary support is limited by what production lines can sustain, not what is committed." },
        { title: "ASEAN Non-Interference Constraints", body: "ASEAN's non-interference norm structurally limits its ability to act as a mediator in bilateral disputes between members. Regional mechanisms cannot be relied upon for rapid crisis management." },
        { title: "Force Projection Sustainability", body: "The duration of IDF operations in Lebanon has exceeded initial planning assumptions. Extended expeditionary operations without industrial-scale replenishment degrade readiness in ways that are not immediately visible." }
      ],
      capdevs: [
        { title: "Modular Air Defence Packages", body: "Allied nations have developed modular, mix-and-match air defence packages that can be deployed to a partner nation in under 72 hours. Standardisation of connectors and C2 interfaces is the remaining integration challenge." },
        { title: "Commercial Logistics Contracting", body: "Ukraine has demonstrated large-scale integration of commercial logistics contractors into military supply chains. Provides surge capacity but introduces OPSEC and force protection risks that require active management." },
        { title: "Digital Border Monitoring", body: "Thailand has fielded commercially-derived digital border monitoring systems along contested sections. Provides persistent ISR without forward deployed forces, reducing incident escalation risk." }
      ]
    },
    unmanned: {
      changed: "Unmanned systems domain saw the most significant developments this month. Ukraine's 992-drone strike set a new benchmark for UAS operational scale. Hezbollah's fibre-optic FPV employment defeated Israeli EW-based C-UAS. Taiwan's civilian drone programme established a new model for civil-military UAS integration.",
      opportunities: [
        { title: "Volume Saturation as Doctrine", body: "Ukraine's 992-drone strike has codified volume saturation as a viable strategic fires doctrine. The implication for own-force planning is that GBAD architecture must be sized against saturation, not optimised for efficiency against small numbers of targets." },
        { title: "Civil Drone Mobilisation", body: "Taiwan's Kuma Academy model provides a replicable framework for building a large civilian drone operator base as a latent ISR and civil defence resource. Pre-crisis investment generates crisis-period capability." },
        { title: "Attritable ISR Persistence", body: "Ukraine's model of maintaining persistent UAS coverage through volume — accepting high attrition in exchange for continuous presence — provides a targeting environment that cannot be maintained by low-density, high-value ISR platforms." }
      ],
      vulnerabilities: [
        { title: "UAS Attrition Rate", body: "Ukraine's 10,000/month UAS attrition rate requires industrial-scale production to sustain. Most militaries do not have UAS procurement pipelines designed for wartime attrition rates, and peacetime inventory will be exhausted rapidly in high-intensity conflict." },
        { title: "EW-Only C-UAS Defeated", body: "Hezbollah's fibre-optic FPV employment has demonstrated that EW-based C-UAS provides zero protection against wire-guided systems. Hard-kill capability must be integrated as a baseline requirement, not an optional enhancement." },
        { title: "GPS Dependency in Navigation", body: "The majority of UAS platforms remain GPS-dependent for navigation and targeting. Taiwan's civilian training programme explicitly trains GPS-denied flight, confirming that GPS denial is a baseline operational assumption." }
      ],
      capdevs: [
        { title: "Fibre-Optic FPV (6 kg HEAT, 30–50 km)", body: "Hezbollah's operational employment confirms this as a fielded capability. Zero RF emissions defeats all current EW-based detection and defeat. Requires hard-kill defeat mechanism and targeting of operator and logistics nodes." },
        { title: "GPS-Free Manual UAS", body: "Taiwanese-made UAS platforms designed for manual GPS-free operation, capable of being flown by trained civilians. Relevant to denied-environment operations and to the assumption that GPS will be unavailable in high-intensity conflict." },
        { title: "Drone Industrial Capacity as Strategic Resource", body: "Ukraine's ability to sustain 992-drone single-night operations reflects an industrial production base measured in thousands per month. UAS industrial capacity is now a strategic planning variable alongside conventional munitions production." }
      ]
    }
  },

  statusChart: [
    { theatre: "Russia–Ukraine", status: "red",   label: "Active High-Intensity" },
    { theatre: "Israel–Lebanon", status: "red",   label: "Active High-Intensity" },
    { theatre: "Israel–Gaza",    status: "red",   label: "Active High-Intensity" },
    { theatre: "Israel–US–Iran", status: "amber", label: "Elevated Tension" },
    { theatre: "Thailand–Cambodia", status: "amber", label: "Low-Intensity / Escalating" }
  ]
};
