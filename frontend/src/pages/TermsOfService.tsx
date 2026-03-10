import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#030303] text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <motion.a
          href="/"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 text-[#00F0FF] hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          <span>Înapoi la pagina principală</span>
        </motion.a>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Terms of <span className="text-[#00F0FF]">Service</span>
          </h1>
          <p className="text-[#888888] mb-12">
            Ultima actualizare: Ianuarie 2026
          </p>

          <div className="space-y-8 text-[#CCCCCC]">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Acceptarea termenilor</h2>
              <p className="leading-relaxed">
                Prin accesarea și utilizarea site-ului ScapeLabs Association ("Site"), acceptați să fiți obligat de acești 
                Termeni de Utilizare, de toate legile și reglementările aplicabile, și sunteți de acord că sunteți responsabil 
                pentru respectarea oricăror legi locale aplicabile. Dacă nu sunteți de acord cu vreunul dintre acești termeni, 
                nu aveți permisiunea de a utiliza sau accesa acest site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Utilizarea site-ului</h2>
              <p className="leading-relaxed mb-4">
                Vă acordăm permisiunea de a accesa și utiliza Site-ul în conformitate cu acești Termeni. Vă angajați să:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Utilizați Site-ul doar în scopuri legale și în conformitate cu acești Termeni</li>
                <li>Nu utilizați Site-ul în niciun mod care ar putea deteriora, dezactiva sau afecta funcționarea Site-ului</li>
                <li>Nu încercați să obțineți acces neautorizat la Site sau la sistemele sau rețelele conectate</li>
                <li>Să furnizați informații corecte și actualizate atunci când interacționați cu Site-ul</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Proprietate intelectuală</h2>
              <p className="leading-relaxed">
                Toate conținuturile prezente pe Site, incluzând dar fără a se limita la text, grafice, imagini, logo-uri, 
                butoane, software, și alte materiale, sunt proprietatea ScapeLabs Association sau a licențiatorilor săi și 
                sunt protejate de legile privind drepturile de autor și alte legi privind proprietatea intelectuală.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Aplicații și parteneriate</h2>
              <p className="leading-relaxed mb-4">
                Atunci când aplicați pentru a deveni membru sau partener al ScapeLabs:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Garantați că toate informațiile furnizate sunt corecte și complete</li>
                <li>Înțelegeți că nu există nicio garanție de acceptare a aplicației</li>
                <li>Acordați ScapeLabs permisiunea de a vă contacta în legătură cu aplicația dumneavoastră</li>
                <li>Înțelegeți că informațiile furnizate pot fi utilizate conform Politicii de Confidențialitate</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Limitarea responsabilității</h2>
              <p className="leading-relaxed">
                Site-ul este furnizat "ca atare", fără garanții de niciun fel, fie exprese sau implicite. ScapeLabs Association 
                nu garantează că Site-ul va funcționa fără întreruperi sau erori, că defectele vor fi corectate, sau că Site-ul 
                sau serverul care îl face disponibil sunt libere de viruși sau alte componente dăunătoare.
              </p>
              <p className="leading-relaxed mt-4">
                În niciun caz ScapeLabs Association sau furnizorii săi nu vor fi răspunzători pentru niciun fel de daune 
                (inclusiv, dar fără a se limita la, daune pentru pierderea de date sau profit, sau din cauza întreruperii 
                activității) care rezultă din utilizarea sau imposibilitatea de a utiliza Site-ul.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Link-uri către site-uri terțe</h2>
              <p className="leading-relaxed">
                Site-ul poate conține link-uri către site-uri web terțe care nu sunt deținute sau controlate de ScapeLabs 
                Association. Nu avem control asupra și nu ne asumăm responsabilitatea pentru conținutul, politicile de 
                confidențialitate sau practicile oricărui site web terț.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Modificări ale termenilor</h2>
              <p className="leading-relaxed">
                Ne rezervăm dreptul de a modifica sau înlocui acești Termeni în orice moment. Dacă o revizuire este 
                semnificativă, vom încerca să oferim o notificare cu cel puțin 30 de zile înainte ca noii termeni să 
                intre în vigoare. Utilizarea continuă a Site-ului după astfel de modificări constituie acceptarea noilor Termeni.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Rezilierea</h2>
              <p className="leading-relaxed">
                Ne rezervăm dreptul de a suspenda sau înceta accesul dumneavoastră la Site în orice moment, fără notificare 
                prealabilă sau răspundere, pentru orice motiv, inclusiv, dar fără a se limita la, o încălcare a acestor Termeni.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. Legea aplicabilă</h2>
              <p className="leading-relaxed">
                Acești Termeni sunt guvernați și interpretați în conformitate cu legile din România, fără a ține cont de 
                dispozițiile privind conflictul de legi.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">10. Contact</h2>
              <p className="leading-relaxed">
                Pentru orice întrebări sau preocupări legate de acești Termeni de Utilizare, vă rugăm să ne contactați:
              </p>
              <div className="mt-4 p-6 bg-white/5 border border-white/10 rounded-lg">
                <p className="mb-2">
                  <span className="text-[#00F0FF] font-semibold">Email:</span>{' '}
                  <a href="mailto:contact@scapelabs.io" className="hover:text-[#00F0FF] transition-colors">
                    contact@scapelabs.io
                  </a>
                </p>
                <p className="mb-2">
                  <span className="text-[#00F0FF] font-semibold">Telefon:</span>{' '}
                  <a href="tel:+40750480100" className="hover:text-[#00F0FF] transition-colors">
                    0750480100
                  </a>
                </p>
                <p>
                  <span className="text-[#00F0FF] font-semibold">Adresă:</span> București, România
                </p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
