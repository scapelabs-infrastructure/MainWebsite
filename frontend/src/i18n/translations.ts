export type Lang = 'ro' | 'en';

export const translations = {
  ro: {
    header: {
      manifest: 'Manifest',
      projects: 'Proiecte',
      team: 'Echipă',
      volunteer: 'Voluntariat',
      joinTeam: 'Alătură-te',
    },
    hero: {
      title: 'Construim viitorul\nRomâniei tech.',
      subtitle: 'Asociație non-profit. Viitor urban. Generație nouă.',
      cta: 'Alătură-te echipei',
      ctaSecondary: 'Explorează proiectele',
    },
    manifesto: {
      label: 'MANIFESTUL NOSTRU',
      body: 'Trăim în orașe care nu s-au adaptat la viteza lumii. Infrastructuri vechi, birocrație înceată, tineri care pleacă. Dar există o altă cale.',
      highlight: 'ScapeLabs',
      rest: 'crede că România poate fi laboratorul viu al schimbării — nu mâine, ci acum. Suntem o asociație de vizionari, constructori și rebeli care refuză status quo-ul.',
      founder: '— Costin Dumitrescu, Fondator ScapeLabs',
    },
    wowVision: {
      words: [
        'BUCUREȘTI', 'POATE', 'FI',
        'UN', 'OAȘ', 'DE', 'INOVAȚIE',
        'URBANĂ', 'ÎN', 'INIMA',
        'EUROPEI.'
      ],
    },
    labVisions: {
      subtitle: 'Șase domenii de impact. Un singur scop: să transformăm orașele românești în ecosisteme vii de inovație.',
      visions: [
        { title: 'Smart City', subtitle: 'Infrastructură digitală urbană' },
        { title: 'EdTech', subtitle: 'Educație pentru viitor' },
        { title: 'GreenTech', subtitle: 'Sustenabilitate urban-tech' },
        { title: 'CivicTech', subtitle: 'Cetățeni conectați' },
        { title: 'HealthTech', subtitle: 'Sănătate accesibilă' },
        { title: 'Mobility', subtitle: 'Transport inteligent' },
      ],
    },
    pilotProjects: {
      title: 'PROIECTE PILOT',
      subtitle: 'Primele patru proiecte concrete pe care le lansăm în 2026. Real. Testabil. Scalabil.',
      projects: [
        {
          name: 'DIGITAL TWIN BUC',
          desc: 'O replică digitală a Bucureștiului construită cu date open-source, GIS și AI — o platformă vizuală pentru planificatori urbani, cetățeni și decidenți. Vizualizezi traficul în timp real, emisiile de CO₂, densitatea populației pe cartiere și scenarii de intervenție urbană.',
        },
        {
          name: 'SCAPENET',
          desc: 'O rețea mesh de senzori IoT care monitorizează calitatea aerului, zgomotul urban și temperatura în timp real. Datele sunt publice, vizualizate pe o hartă interactivă și accesibile prin API deschis pentru dezvoltatori și instituții.',
        },
        {
          name: 'URBAN CLASSROOM',
          desc: 'Program de educație tech pentru liceeni din România: cursuri de programare, UX design, robotică și antreprenoriat digital, livrate prin parteneri școlari și online. Primul cohort: <strong>200 de elevi</strong> din 5 orașe.',
        },
        {
          name: 'CIVIC BRIDGE',
          desc: 'Platformă digitală care conectează cetățenii cu proiectele de infrastructură ale primăriilor. Raportezi o problemă, urmărești statusul, votezi priorități și primești notificări. Transparență. Participare. Impact.',
        },
      ],
    },
    blueprint: {
      title: 'CUM',
      highlight: 'FUNCȚIONĂM',
      cards: [
        {
          title: 'Lab de Idei',
          body: 'Hackathoane lunare, brainstorming structurat și prototipare rapidă. Orice idee bună primește resurse să devină reală.',
        },
        {
          title: 'Gaming & Gamification',
          body: 'Folosim mecanici de joc pentru a face participarea civică atractivă și pentru a educa tinerii în spirit tech.',
        },
        {
          title: 'Ecosistem de Parteneri',
          body: 'Construim punți între universități, primării, companii tech și ONG-uri pentru impact maxim la scară largă.',
        },
        {
          title: 'Impact Rapid',
          body: 'Metodologie agile adaptată pentru asociații non-profit. Livrăm proiecte în 90 de zile, nu ani.',
        },
      ],
    },
    vibeStory: {
      title: 'ENERGIA',
      highlight: 'NOASTRĂ',
      subtitle: 'Nu suntem doar o asociație.',
      subtitleHighlight: 'Suntem o mișcare.',
      p1: 'ScapeLabs s-a născut dintr-o frustrare comună: prea multe idei bune rămân în faza de "ar trebui să facem ceva". Noi am decis să facem ceva.',
      p2: 'Suntem o comunitate de oameni care cred că România poate fi mai mult decât este. Nu prin politici. Nu prin discursuri. Prin proiecte concrete, echipe dedicate și tehnologie aplicată în viața reală.',
      p3: 'Dacă și tu simți că ai mai mult de dat, că vrei să construiești ceva care contează — ',
      p3Bold: 'locul tău e aici.',
      stats: ['Energie', 'Comunitate', 'Inovație', 'Impact'],
    },
    blackProjects: {
      classified: 'CLASIFICAT — LANSARE VIITOARE',
      projects: [
        { desc: 'Un sistem AI de monitorizare a biodiversității urbane din parcuri și spații verzi. Status: în testare cu date din 3 parcuri bucureștene.' },
        { desc: 'Robot de cartografiere autonomă pentru zone urbane greu accesibile. Prototip funcțional. Testare pe teren în Q2 2026.' },
        { desc: 'Aplicație de realitate augmentată care suprapune straturi istorice peste București modern. Lansare publică planificată pentru Q3 2026.' },
      ],
    },
    finalCta: {
      title: 'E RÂNDUL TĂU.',
      volunteer: 'Devino Voluntar',
      partner: 'Devino Partener',
    },
    recruitment: {
      title: 'ALĂTURĂ-TE',
      titleHighlight: 'ECHIPEI SCAPELABS.',
      subtitle: 'Căutăm oameni cu viziune, energie și dorința de a construi ceva care contează. Nu ai nevoie de experiență perfectă — ai nevoie de atitudine.',
      joinBtn: '→ Aplică acum',
      guilds: [
        {
          name: 'INNOVATION LAB',
          subtitle: 'Construiești viitorul',
          description: 'Proiectezi și prototipezi soluții tech pentru probleme urbane reale. De la Smart City la EdTech — tu transformi ideile în produse.',
          modalIntro: 'Cauți să construiești soluții tech reale pentru probleme urbane. Spune-ne cine ești și ce poți face.',
        },
        {
          name: 'GROWTH & PARTNERSHIPS',
          subtitle: 'Crești ecosistemul',
          description: 'Construiești relații cu companii, instituții și universități. Tu ești puntea dintre ScapeLabs și lumea externă.',
          modalIntro: 'Vrei să construiești parteneriate și să crești ecosistemul ScapeLabs. Spune-ne despre tine.',
        },
        {
          name: 'BRAND & COMMUNITY',
          subtitle: 'Spui povestea',
          description: 'Creezi conținut, gestionezi comunitatea și construiești brand-ul ScapeLabs. Social media, design, storytelling — toate sunt ale tale.',
          modalIntro: 'Vrei să spui povestea ScapeLabs și să construiești comunitatea. Prezintă-te.',
        },
        {
          name: 'CIVIC TECH',
          subtitle: 'Schimbi sistemul',
          description: 'Lucrezi la intersecția dintre tech și politici publice. Analizezi date, propui soluții și colaborezi cu autorități locale.',
          modalIntro: 'Vrei să schimbi modul în care funcționează orașele prin tehnologie. Spune-ne mai multe.',
        },
      ],
      modal: {
        applyFor: 'Aplică la',
        name: 'Numele tău *',
        namePlaceholder: 'Prenume Nume',
        email: 'Email *',
        phone: 'Telefon *',
        leadership: 'Ce poți face pentru echipă?',
        leadershipPlaceholder: 'Descrie skillurile și experiența ta relevantă...',
        bio: 'De ce ScapeLabs?',
        bioPlaceholder: 'Ce te motivează să te alături? Ce vrei să construiești?',
        submit: 'Trimite Aplicația',
        submitting: 'Se trimite...',
        successTitle: 'Aplicație trimisă!',
        successMsg: 'Te vom contacta în curând. Bine ai venit în ScapeLabs!',
        close: 'Închide',
        whatsapp: 'Sau scrie-ne pe WhatsApp:',
        errorGeneric: 'Ceva nu a mers. Te rugăm să încerci din nou.',
      },
    },
    partners: {
      title: 'PARTENERI &',
      titleHighlight: 'SUSȚINĂTORI',
      subtitle: 'Construim împreună ecosistemul tech al României de mâine. Fie că ești universitate, companie sau instituție publică, avem un loc pentru tine în misiunea noastră.',
      customCollab: 'Ai o idee de colaborare personalizată?',
      contactDirect: 'Contactează-ne Direct',
      partnerTypes: [
        {
          type: 'educational',
          title: 'ȘCOLI & UNIVERSITĂȚI',
          description: 'Parteneriat academic pentru cursuri, mentorat și acces la proiectele noastre pilot. Studenții voștri devin constructorii de mâine.',
          cta: 'Devino Partener Educațional',
        },
        {
          type: 'institutional',
          title: 'PRIMĂRII & INSTITUȚII',
          description: 'Co-creăm soluții tech pentru provocările voastre urbane reale. Pilotăm împreună, scalăm împreună.',
          cta: 'Devino Partener Instituțional',
        },
        {
          type: 'sponsor',
          title: 'SPONSORI & COMPANII',
          description: 'Susținerea ScapeLabs înseamnă investiție directă în talentul tech românesc și în viitorul urban al României.',
          cta: 'Devino Sponsor',
        },
      ],
      modal: {
        successTitle: 'Mesaj trimis!',
        successMsg: 'Te vom contacta în curând. Mulțumim pentru interes!',
        close: 'Închide',
        orgName: 'Numele organizației *',
        orgPlaceholder: 'ex. Universitatea Politehnica',
        contactName: 'Persoană de contact *',
        contactPlaceholder: 'Prenume Nume',
        email: 'Email *',
        phone: 'Telefon *',
        submit: 'Trimite',
        submitting: 'Se trimite...',
        callDirect: 'Sau sună direct:',
        errorGeneric: 'Ceva nu a mers. Te rugăm să încerci din nou.',
        titles: {
          educational: 'Parteneriat Educațional',
          institutional: 'Parteneriat Instituțional',
          sponsor: 'Devenind Sponsor',
          generic: 'Contact Direct',
        },
        descriptions: {
          educational: 'Completează formularul și echipa noastră va lua legătura cu tine pentru a discuta posibilitățile de colaborare.',
          institutional: 'Spune-ne mai multe despre organizația ta și cum putem colabora pentru impact urban.',
          sponsor: 'Mulțumim pentru interesul de a susține ScapeLabs. Completează formularul și te contactăm.',
          generic: 'Scrie-ne și discutăm. Fiecare parteneriat e unic.',
        },
      },
    },
    footer: {
      nav: 'Navigație',
      contact: 'Contact',
      legal: 'Legal',
      systemOnline: 'SYSTEM ONLINE',
      navLinks: {
        manifesto: 'Manifest',
        projects: 'Proiecte',
        join: 'Alătură-te',
      },
    },
    privacyPolicy: {
      back: 'Înapoi la pagina principală',
      lastUpdated: 'Ultima actualizare: Ianuarie 2026',
    },
    termsOfService: {
      back: 'Înapoi la pagina principală',
    },
    onboarding: {
      errorMsg: 'Ceva nu a funcționat. Te rugăm să reîncerci.',
      step1: {
        title: 'INIȚIALIZARE AGENT',
        emailLabel: 'EMAIL_AGENT',
        privacy: 'Datele tale sunt securizate. Folosim emailul doar pentru a te contacta.',
      },
      step2: {
        title: 'ACCES ACORDAT',
        welcome: 'Bine ai venit în ScapeLabs.',
        body: 'Urmează un proces de onboarding prin care vei înțelege misiunea noastră, proiectele active și cum poți contribui.',
      },
      step3: {
        title: 'MISIUNEA SCAPELABS',
        p1: 'Suntem o asociație non-profit care transformă orașele românești prin tehnologie, comunitate și inovație aplicată.',
        p2: 'Nu suntem o corporație. Nu suntem un curs online. Suntem o mișcare de oameni care construiesc România de mâine — astăzi.',
      },
      step4: {
        title: 'PROIECTE ACTIVE',
        subtitle: 'Acestea sunt frontierele pe care le explorăm în 2026.',
        projects: [
          { title: 'DIGITAL TWIN BUC', content: 'O replică digitală a Bucureștiului pentru planificatori urbani și cetățeni. Date în timp real, vizualizare 3D, scenarii de intervenție.' },
          { title: 'SCAPENET', content: 'Rețea IoT de monitorizare a calității aerului și a mediului urban. Date publice, API deschis.' },
          { title: 'URBAN CLASSROOM', content: 'Educație tech pentru liceeni din toată România. Programare, UX, robotică, antreprenoriat.' },
        ],
      },
      step5: {
        title: 'CE OFERIM',
        objectives: [
          { label: 'IMPACT REAL', value: 'Proiecte care ajung în producție, nu rămân în PowerPoint.' },
          { label: 'COMUNITATE', value: 'O rețea de oameni ambițioși care se susțin reciproc.' },
          { label: 'CREȘTERE', value: 'Skilluri, mentorat și experiență concretă în tech și inovație urbană.' },
        ],
      },
      step6: {
        title: 'ALEGE-ȚI MISIUNEA',
      },
      step7: {
        yourRole: 'ROLUL TĂU',
        yourArsenal: 'ARSENALUL TĂU',
        loot: 'CE CÂȘTIGI',
        departments: {
          GROWTH: {
            role: 'Construiești parteneriate, identifici oportunități de finanțare și crești ecosistemul ScapeLabs.',
            arsenal: ['CRM și sales tools', 'Acces la rețeaua de parteneri', 'Fonduri europene și granturi'],
            loot: ['Experiență în business development', 'Rețea de contacte valoroasă', 'Certificare ScapeLabs'],
          },
          COMMS: {
            role: 'Spui povestea ScapeLabs prin conținut, design și comunitate. Tu ești vocea noastră.',
            arsenal: ['Suite Adobe / Figma', 'Acces la toate canalele social media', 'Budget pentru conținut'],
            loot: ['Portfolio real de proiecte', 'Experiență în brand building', 'Mentorat creativ'],
          },
          INNOVATION: {
            role: 'Proiectezi și prototipezi soluții tech pentru probleme urbane reale. Tu transformi ideile în produse.',
            arsenal: ['Acces la date open-source', 'Spațiu de lab pentru prototipare', 'Mentori tech seniori'],
            loot: ['Experiență în product development', 'Proiecte în producție reală', 'Rețea tech valoroasă'],
          },
        },
      },
      step8: {
        title: 'ANGAJAMENTUL TĂU',
        flexibility: 'FLEXIBILITATE',
        flexibilityText: 'Minim 4-6 ore/săptămână. Lucrezi remote sau din hub-ul nostru.',
        communication: 'COMUNICARE',
        communicationText: 'Ești prezent pe canalele echipei și participi la sync-urile săptămânale.',
        proactivity: 'PROACTIVITATE',
        proactivityText: 'Nu aștepți să ți se spună ce să faci. Identifici probleme și propui soluții.',
        legal: 'LEGAL',
        legalText: 'Ești de acord cu Statutul ScapeLabs și cu politica de confidențialitate.',
        commitment: 'Înțeleg și accept angajamentele de mai sus. Sunt pregătit să contribui activ la misiunea ScapeLabs.',
        submit: 'FINALIZEAZĂ APLICAȚIA',
        submitting: 'SE TRIMITE...',
      },
      step9: {
        title: 'BINE AI VENIT!',
        body: 'Aplicația ta a fost primită. Echipa ScapeLabs te va contacta în 48-72 de ore.',
        systemOnline: 'AGENT ACTIV — BINE AI VENIT ÎN ECHIPĂ',
      },
    },
  },

  en: {
    header: {
      manifest: 'Manifesto',
      projects: 'Projects',
      team: 'Team',
      volunteer: 'Volunteer',
      joinTeam: 'Join Us',
    },
    hero: {
      title: "Building Romania's\ntech future.",
      subtitle: 'Non-profit association. Urban future. New generation.',
      cta: 'Join the team',
      ctaSecondary: 'Explore projects',
    },
    manifesto: {
      label: 'OUR MANIFESTO',
      body: 'We live in cities that have not kept pace with the speed of the world. Outdated infrastructure, slow bureaucracy, young people leaving. But there is another way.',
      highlight: 'ScapeLabs',
      rest: 'believes Romania can be the living laboratory of change — not tomorrow, but now. We are an association of visionaries, builders and rebels who refuse the status quo.',
      founder: '— Costin Dumitrescu, Founder of ScapeLabs',
    },
    wowVision: {
      words: [
        'BUCHAREST', 'CAN', 'BE',
        'AN', 'OASIS', 'OF', 'URBAN',
        'INNOVATION', 'AT', 'THE',
        'HEART', 'OF', 'EUROPE.'
      ],
    },
    labVisions: {
      subtitle: 'Six impact domains. One purpose: transforming Romanian cities into living innovation ecosystems.',
      visions: [
        { title: 'Smart City', subtitle: 'Urban digital infrastructure' },
        { title: 'EdTech', subtitle: 'Education for the future' },
        { title: 'GreenTech', subtitle: 'Urban sustainability tech' },
        { title: 'CivicTech', subtitle: 'Connected citizens' },
        { title: 'HealthTech', subtitle: 'Accessible healthcare' },
        { title: 'Mobility', subtitle: 'Smart transport' },
      ],
    },
    pilotProjects: {
      title: 'PILOT PROJECTS',
      subtitle: 'The first four concrete projects we are launching in 2026. Real. Testable. Scalable.',
      projects: [
        {
          name: 'DIGITAL TWIN BUC',
          desc: 'A digital replica of Bucharest built with open-source data, GIS and AI — a visual platform for urban planners, citizens and decision-makers. Visualise real-time traffic, CO₂ emissions, population density by neighbourhood and urban intervention scenarios.',
        },
        {
          name: 'SCAPENET',
          desc: 'A mesh network of IoT sensors monitoring air quality, urban noise and temperature in real time. Data is public, visualised on an interactive map and accessible via an open API for developers and institutions.',
        },
        {
          name: 'URBAN CLASSROOM',
          desc: 'Tech education programme for Romanian high-school students: coding, UX design, robotics and digital entrepreneurship courses, delivered through school partners and online. First cohort: <strong>200 students</strong> across 5 cities.',
        },
        {
          name: 'CIVIC BRIDGE',
          desc: 'A digital platform connecting citizens with municipal infrastructure projects. Report a problem, track its status, vote on priorities and receive notifications. Transparency. Participation. Impact.',
        },
      ],
    },
    blueprint: {
      title: 'HOW WE',
      highlight: 'OPERATE',
      cards: [
        {
          title: 'Idea Lab',
          body: 'Monthly hackathons, structured brainstorming and rapid prototyping. Every good idea gets resources to become real.',
        },
        {
          title: 'Gaming & Gamification',
          body: 'We use game mechanics to make civic participation attractive and to educate young people in a tech mindset.',
        },
        {
          title: 'Partner Ecosystem',
          body: 'We build bridges between universities, municipalities, tech companies and NGOs for maximum large-scale impact.',
        },
        {
          title: 'Fast Impact',
          body: 'Agile methodology adapted for non-profit associations. We deliver projects in 90 days, not years.',
        },
      ],
    },
    vibeStory: {
      title: 'OUR',
      highlight: 'ENERGY',
      subtitle: "We're not just an association.",
      subtitleHighlight: "We're a movement.",
      p1: 'ScapeLabs was born out of a shared frustration: too many good ideas stay stuck at the "we should do something" stage. We decided to do something.',
      p2: 'We are a community of people who believe Romania can be more than it is. Not through politics. Not through speeches. Through concrete projects, dedicated teams and technology applied to real life.',
      p3: 'If you also feel you have more to give, that you want to build something that matters — ',
      p3Bold: 'your place is here.',
      stats: ['Energy', 'Community', 'Innovation', 'Impact'],
    },
    blackProjects: {
      classified: 'CLASSIFIED — FUTURE LAUNCH',
      projects: [
        { desc: 'An AI system for monitoring urban biodiversity in parks and green spaces. Status: in testing with data from 3 Bucharest parks.' },
        { desc: 'Autonomous mapping robot for hard-to-access urban areas. Working prototype. Field testing in Q2 2026.' },
        { desc: 'Augmented reality app overlaying historical layers onto modern Bucharest. Public launch planned for Q3 2026.' },
      ],
    },
    finalCta: {
      title: "IT'S YOUR TURN.",
      volunteer: 'Become a Volunteer',
      partner: 'Become a Partner',
    },
    recruitment: {
      title: 'JOIN THE',
      titleHighlight: 'SCAPELABS TEAM.',
      subtitle: 'We are looking for people with vision, energy and the desire to build something that matters. You do not need perfect experience — you need the right attitude.',
      joinBtn: '→ Apply now',
      guilds: [
        {
          name: 'INNOVATION LAB',
          subtitle: 'You build the future',
          description: 'You design and prototype tech solutions for real urban problems. From Smart City to EdTech — you turn ideas into products.',
          modalIntro: 'You want to build real tech solutions for urban problems. Tell us who you are and what you can do.',
        },
        {
          name: 'GROWTH & PARTNERSHIPS',
          subtitle: 'You grow the ecosystem',
          description: 'You build relationships with companies, institutions and universities. You are the bridge between ScapeLabs and the outside world.',
          modalIntro: 'You want to build partnerships and grow the ScapeLabs ecosystem. Tell us about yourself.',
        },
        {
          name: 'BRAND & COMMUNITY',
          subtitle: 'You tell the story',
          description: 'You create content, manage the community and build the ScapeLabs brand. Social media, design, storytelling — all yours.',
          modalIntro: 'You want to tell the ScapeLabs story and build the community. Introduce yourself.',
        },
        {
          name: 'CIVIC TECH',
          subtitle: 'You change the system',
          description: 'You work at the intersection of tech and public policy. You analyse data, propose solutions and collaborate with local authorities.',
          modalIntro: 'You want to change how cities work through technology. Tell us more.',
        },
      ],
      modal: {
        applyFor: 'Apply to',
        name: 'Your name *',
        namePlaceholder: 'First Last Name',
        email: 'Email *',
        phone: 'Phone *',
        leadership: 'What can you do for the team?',
        leadershipPlaceholder: 'Describe your relevant skills and experience...',
        bio: 'Why ScapeLabs?',
        bioPlaceholder: 'What motivates you to join? What do you want to build?',
        submit: 'Send Application',
        submitting: 'Sending...',
        successTitle: 'Application sent!',
        successMsg: 'We will contact you soon. Welcome to ScapeLabs!',
        close: 'Close',
        whatsapp: 'Or message us on WhatsApp:',
        errorGeneric: 'Something went wrong. Please try again.',
      },
    },
    partners: {
      title: 'PARTNERS &',
      titleHighlight: 'SUPPORTERS',
      subtitle: "We are building tomorrow's Romanian tech ecosystem together. Whether you are a university, company or public institution, we have a place for you in our mission.",
      customCollab: 'Have a custom collaboration idea?',
      contactDirect: 'Contact Us Directly',
      partnerTypes: [
        {
          type: 'educational',
          title: 'SCHOOLS & UNIVERSITIES',
          description: 'Academic partnership for courses, mentoring and access to our pilot projects. Your students become the builders of tomorrow.',
          cta: 'Become an Educational Partner',
        },
        {
          type: 'institutional',
          title: 'MUNICIPALITIES & INSTITUTIONS',
          description: 'We co-create tech solutions for your real urban challenges. We pilot together, we scale together.',
          cta: 'Become an Institutional Partner',
        },
        {
          type: 'sponsor',
          title: 'SPONSORS & COMPANIES',
          description: 'Supporting ScapeLabs means a direct investment in Romanian tech talent and the urban future of Romania.',
          cta: 'Become a Sponsor',
        },
      ],
      modal: {
        successTitle: 'Message sent!',
        successMsg: 'We will contact you soon. Thank you for your interest!',
        close: 'Close',
        orgName: 'Organisation name *',
        orgPlaceholder: 'e.g. University of Bucharest',
        contactName: 'Contact person *',
        contactPlaceholder: 'First Last Name',
        email: 'Email *',
        phone: 'Phone *',
        submit: 'Send',
        submitting: 'Sending...',
        callDirect: 'Or call directly:',
        errorGeneric: 'Something went wrong. Please try again.',
        titles: {
          educational: 'Educational Partnership',
          institutional: 'Institutional Partnership',
          sponsor: 'Becoming a Sponsor',
          generic: 'Direct Contact',
        },
        descriptions: {
          educational: 'Fill in the form and our team will get in touch to discuss collaboration possibilities.',
          institutional: 'Tell us more about your organisation and how we can collaborate for urban impact.',
          sponsor: 'Thank you for your interest in supporting ScapeLabs. Fill in the form and we will get in touch.',
          generic: 'Write to us and we will talk. Every partnership is unique.',
        },
      },
    },
    footer: {
      nav: 'Navigation',
      contact: 'Contact',
      legal: 'Legal',
      systemOnline: 'SYSTEM ONLINE',
      navLinks: {
        manifesto: 'Manifesto',
        projects: 'Projects',
        join: 'Join Us',
      },
    },
    privacyPolicy: {
      back: 'Back to homepage',
      lastUpdated: 'Last updated: January 2026',
    },
    termsOfService: {
      back: 'Back to homepage',
    },
    onboarding: {
      errorMsg: 'Something went wrong. Please try again.',
      step1: {
        title: 'AGENT INITIALISATION',
        emailLabel: 'AGENT_EMAIL',
        privacy: 'Your data is secure. We only use your email to contact you.',
      },
      step2: {
        title: 'ACCESS GRANTED',
        welcome: 'Welcome to ScapeLabs.',
        body: 'Follow the onboarding process to understand our mission, active projects and how you can contribute.',
      },
      step3: {
        title: 'THE SCAPELABS MISSION',
        p1: 'We are a non-profit association transforming Romanian cities through technology, community and applied innovation.',
        p2: 'We are not a corporation. We are not an online course. We are a movement of people building the Romania of tomorrow — today.',
      },
      step4: {
        title: 'ACTIVE PROJECTS',
        subtitle: 'These are the frontiers we are exploring in 2026.',
        projects: [
          { title: 'DIGITAL TWIN BUC', content: 'A digital replica of Bucharest for urban planners and citizens. Real-time data, 3D visualisation, intervention scenarios.' },
          { title: 'SCAPENET', content: 'IoT network monitoring air quality and the urban environment. Public data, open API.' },
          { title: 'URBAN CLASSROOM', content: 'Tech education for high school students across Romania. Programming, UX, robotics, entrepreneurship.' },
        ],
      },
      step5: {
        title: 'WHAT WE OFFER',
        objectives: [
          { label: 'REAL IMPACT', value: 'Projects that go into production, not stay in PowerPoint.' },
          { label: 'COMMUNITY', value: 'A network of ambitious people who support each other.' },
          { label: 'GROWTH', value: 'Skills, mentoring and concrete experience in tech and urban innovation.' },
        ],
      },
      step6: {
        title: 'CHOOSE YOUR MISSION',
      },
      step7: {
        yourRole: 'YOUR ROLE',
        yourArsenal: 'YOUR ARSENAL',
        loot: 'WHAT YOU GAIN',
        departments: {
          GROWTH: {
            role: 'You build partnerships, identify funding opportunities and grow the ScapeLabs ecosystem.',
            arsenal: ['CRM and sales tools', 'Access to the partner network', 'EU funds and grants'],
            loot: ['Business development experience', 'Valuable network of contacts', 'ScapeLabs certification'],
          },
          COMMS: {
            role: 'You tell the ScapeLabs story through content, design and community. You are our voice.',
            arsenal: ['Adobe Suite / Figma', 'Access to all social media channels', 'Content budget'],
            loot: ['Real project portfolio', 'Brand building experience', 'Creative mentoring'],
          },
          INNOVATION: {
            role: 'You design and prototype tech solutions for real urban problems. You turn ideas into products.',
            arsenal: ['Access to open-source data', 'Lab space for prototyping', 'Senior tech mentors'],
            loot: ['Product development experience', 'Real production projects', 'Valuable tech network'],
          },
        },
      },
      step8: {
        title: 'YOUR COMMITMENT',
        flexibility: 'FLEXIBILITY',
        flexibilityText: 'Minimum 4-6 hours/week. Work remotely or from our hub.',
        communication: 'COMMUNICATION',
        communicationText: 'You are present on team channels and participate in weekly syncs.',
        proactivity: 'PROACTIVITY',
        proactivityText: "You don't wait to be told what to do. You identify problems and propose solutions.",
        legal: 'LEGAL',
        legalText: 'You agree to the ScapeLabs Statute and privacy policy.',
        commitment: 'I understand and accept the commitments above. I am ready to actively contribute to the ScapeLabs mission.',
        submit: 'COMPLETE APPLICATION',
        submitting: 'SENDING...',
      },
      step9: {
        title: 'WELCOME!',
        body: 'Your application has been received. The ScapeLabs team will contact you within 48-72 hours.',
        systemOnline: 'AGENT ACTIVE — WELCOME TO THE TEAM',
      },
    },
  },
} as const;

export type Translations = typeof translations.ro;
