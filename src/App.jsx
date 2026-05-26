import { useState } from "react";
import { motion } from "framer-motion";
import logo from "./assets/logo.png";
import "./App.css";

const niveaux = {
  "1ère Année": {
    dossier: "1ere",
    sections: {
      Mathématiques: "1ere-math",
    },
  },

  "2ème Année": {
    dossier: "2eme",
    sections: {
      Sciences: "2eme-science",
      Informatique: "2eme-info",
      "Économie & Gestion": "2eme-eco",
    },
  },

  "3ème Année": {
    dossier: "3eme",
    sections: {
      Sciences: "3eme-science",
      Mathématiques: "3eme-math",
      Informatique: "3eme-info",
      "Économie & Gestion": "3eme-eco",
      Technique: "3eme-technique",
    },
  },

  Bac: {
    dossier: "bac",
    sections: {
      Mathématiques: "bac-math",
      Sciences: "bac-science",
      Informatique: "bac-info",
      "Économie & Gestion": "bac-eco",
      Technique: "bac-technique",
    },
  },
};

const documents = [
  {
    nom: "Cours",
    icon: "📘",
    suffixe: "cours",
  },

  {
    nom: "Séries",
    icon: "📄",
    suffixe: "serie",
  },

  {
    nom: "Devoirs",
    icon: "📝",
    suffixe: "devoir",
  },

  {
    nom: "Corrections",
    icon: "✅",
    suffixe: "correction",
  },
];

export default function App() {
  const [niveauChoisi, setNiveauChoisi] = useState(null);

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* HEADER */}

      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3"
          >
            <img
              src={logo}
              alt="logo"
              className="h-14 w-14 rounded-full object-cover ring-2 ring-blue-400 shadow-lg shadow-blue-500/30"
            />

            <div>
              <h1 className="text-3xl font-black text-blue-400">
                JouiniAdel
              </h1>

              <p className="text-sm text-slate-300">
                Mathématiques — Programme Tunisien
              </p>
            </div>
          </motion.div>

          {niveauChoisi && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setNiveauChoisi(null)}
              className="bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded-xl font-bold transition shadow-lg shadow-blue-500/30"
            >
              Retour
            </motion.button>
          )}
        </div>
      </header>

      {/* PAGE ACCUEIL */}

      {!niveauChoisi ? (
        <>
          <section className="max-w-7xl mx-auto px-6 py-16">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-4xl md:text-6xl font-black leading-tight mb-6 max-w-5xl">
                Réussir les maths avec{" "}
                <span className="text-blue-400 drop-shadow-[0_0_20px_rgba(59,130,246,0.8)]">
                  JouiniAdel
                </span>
              </h2>

              <p className="text-slate-300 text-lg md:text-2xl max-w-4xl leading-relaxed">
                Cours, séries, devoirs et corrections organisés par niveau et
                section pour les élèves tunisiens.
              </p>
            </motion.div>
          </section>

          {/* NIVEAUX */}

          <section className="max-w-7xl mx-auto px-6 pb-24">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-5xl font-black text-center mb-14"
            >
              Niveaux scolaires
            </motion.h2>

            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
              {Object.keys(niveaux).map((niveau, index) => (
                <motion.button
                  key={niveau}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{
                    scale: 1.05,
                    y: -8,
                  }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setNiveauChoisi(niveau)}
                  className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-left hover:border-blue-400 transition duration-300 shadow-2xl hover:shadow-blue-500/20"
                >
                  <div className="text-6xl mb-5">🎓</div>

                  <h3 className="text-3xl font-black text-blue-400 mb-4">
                    {niveau}
                  </h3>

                  <p className="text-slate-400 text-lg">
                    Voir les sections →
                  </p>
                </motion.button>
              ))}
            </div>
          </section>
        </>
      ) : (
        /* PAGE NIVEAU */

        <main className="max-w-7xl mx-auto px-6 py-20">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-blue-400 font-bold mb-2 text-lg"
          >
            Niveau sélectionné
          </motion.p>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-5xl md:text-6xl font-black mb-14"
          >
            {niveauChoisi}
          </motion.h2>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {Object.entries(
              niveaux[niveauChoisi].sections
            ).map(([section, prefixe], index) => (
              <motion.div
                key={section}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{
                  scale: 1.03,
                  y: -5,
                }}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl hover:shadow-blue-500/20 hover:border-blue-400 transition duration-300"
              >
                <div className="text-6xl mb-5">📚</div>

                <h3 className="text-3xl font-black text-blue-400 mb-4">
                  {section}
                </h3>

                <p className="text-slate-400 text-lg mb-6">
                  Choisissez le type de document.
                </p>

                <div className="grid grid-cols-2 gap-5">
                  {documents.map((doc) => (
                    <motion.a
                      whileHover={{
                        scale: 1.05,
                      }}
                      whileTap={{ scale: 0.95 }}
                      key={doc.nom}
                      href={`/pdfs/${niveaux[niveauChoisi].dossier}/${prefixe}-${doc.suffixe}.pdf`}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-slate-800 hover:bg-blue-500 rounded-2xl p-5 text-center font-bold transition duration-300"
                    >
                      <div className="text-4xl mb-3">
                        {doc.icon}
                      </div>

                      <div className="text-lg">
                        {doc.nom}
                      </div>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </main>
      )}

      {/* FOOTER */}

      <footer className="border-t border-slate-800 py-8 text-center text-slate-500 text-lg">
        © 2026 JouiniAdel — Plateforme de Mathématiques
      </footer>
    </div>
  );
}