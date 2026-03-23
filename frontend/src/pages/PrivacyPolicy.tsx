import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export function PrivacyPolicy() {
  const { t } = useLanguage();

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
          <span>{t.privacyPolicy.back}</span>
        </motion.a>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Privacy <span className="text-[#00F0FF]">Policy</span>
          </h1>
          <p className="text-[#888888] mb-12">
            {t.privacyPolicy.lastUpdated}
          </p>

          <div className="space-y-8 text-[#CCCCCC]">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Introducere</h2>
              <p className="leading-relaxed">
                ScapeLabs Association ("noi", "nostru" sau "ScapeLabs") respectă confidențialitatea datelor dumneavoastră personale. 
                Această Politică de Confidențialitate explică modul în care colectăm, folosim, dezvăluim și protejăm informațiile 
                dumneavoastră atunci când utilizați site-ul nostru web și serviciile asociate.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Informații pe care le colectăm</h2>
              <p className="leading-relaxed mb-4">
                Colectăm următoarele tipuri de informații:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Informații de contact: nume, adresă de email, număr de telefon</li>
                <li>Informații despre organizație: numele instituției sau companiei (dacă este aplicabil)</li>
                <li>Informații de utilizare: date despre modul în care interactionați cu site-ul nostru</li>
                <li>Informații tehnice: adresa IP, tipul browserului, sistemul de operare</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Cum folosim informațiile</h2>
              <p className="leading-relaxed mb-4">
                Folosim informațiile colectate pentru:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>A răspunde solicitărilor dumneavoastră și a gestiona aplicațiile</li>
                <li>A comunica cu dumneavoastră despre proiecte, evenimente și oportunități</li>
                <li>A îmbunătăți și optimiza site-ul și serviciile noastre</li>
                <li>A respecta obligațiile legale și a proteja drepturile noastre</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Partajarea informațiilor</h2>
              <p className="leading-relaxed">
                Nu vindem, nu schimbăm și nu transferăm informațiile dumneavoastră personale către terți fără consimțământul 
                dumneavoastră, cu excepția cazurilor în care acest lucru este necesar pentru furnizarea serviciilor noastre 
                sau dacă este cerut de lege.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Securitatea datelor</h2>
              <p className="leading-relaxed">
                Implementăm măsuri de securitate adecvate pentru a proteja informațiile dumneavoastră personale împotriva 
                accesului neautorizat, modificării, dezvăluirii sau distrugerii. Cu toate acestea, nicio metodă de transmitere 
                prin internet sau de stocare electronică nu este 100% sigură.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Drepturile dumneavoastră</h2>
              <p className="leading-relaxed mb-4">
                Aveți următoarele drepturi în legătură cu datele dumneavoastră personale:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Dreptul de acces la datele personale</li>
                <li>Dreptul la rectificarea datelor inexacte</li>
                <li>Dreptul la ștergerea datelor ("dreptul de a fi uitat")</li>
                <li>Dreptul la restricționarea prelucrării</li>
                <li>Dreptul la portabilitatea datelor</li>
                <li>Dreptul de opoziție la prelucrare</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Cookie-uri</h2>
              <p className="leading-relaxed">
                Site-ul nostru poate folosi cookie-uri pentru a îmbunătăți experiența dumneavoastră. Puteți configura browserul 
                să refuze cookie-urile sau să vă avertizeze când sunt trimise cookie-uri. Cu toate acestea, dacă faceți acest lucru, 
                este posibil ca unele părți ale site-ului să nu funcționeze corect.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Modificări ale politicii</h2>
              <p className="leading-relaxed">
                Ne rezervăm dreptul de a actualiza această Politică de Confidențialitate periodic. Vă vom notifica despre 
                orice modificări prin publicarea noii Politici de Confidențialitate pe această pagină și actualizarea datei 
                "Ultima actualizare".
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. Contact</h2>
              <p className="leading-relaxed">
                Pentru întrebări sau preocupări legate de această Politică de Confidențialitate, vă rugăm să ne contactați la:
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
