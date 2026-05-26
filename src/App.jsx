import { useState } from "react";
import logo from "./assets/logo.png";
import "./App.css";

const data = {
  "1ère Année": {
    Mathématiques: "1ere-math",
  },
  "2ème Année": {
    Sciences: "2eme-science",
    Informatique: "2eme-info",
    "Économie & Gestion": "2eme-eco",
  },
  "3ème Année": {
    Sciences: "3eme-science",
    Mathématiques: "3eme-math",
    Informatique: "3eme-info",
    "Économie & Gestion": "3eme-eco",
    Technique: "3eme-technique",
  },
  Bac: {
    Mathématiques: "bac-math",
    Sciences: "bac-science",
    Informatique: "bac-info",
    "Économie & Gestion": "bac-eco",
    Technique: "bac-technique",
  },
};

const typeDocs = [
  { nom: "Cours", icon: "📘", suffixe: "cours" },
  { nom: "Séries", icon: "📄", suffixe: "serie" },
  { nom: "Devoirs", icon: "📝", suffixe: "devoir" },
  { nom: "Corrections", icon: "✅", suffixe: "correction" },
];

const dossierParNiveau = {
  "1ère Année": "1ere",
  "2ème Année": "2eme",
  "3ème Année": "3eme",
  Bac: "bac",
};

export default function App() {
  const [niveau, setNiveau] = useState(null);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Logo JouiniAdel"
              className="h-14 w-14 rounded-full object-cover"
            />

            <div>
              <h1 className="text-3xl font-bold text-blue-400">JouiniAdel</h1>
              <p className="text-sm text-slate-300">
                Mathématiques — Programme Tunisien
              </p>
            </div>
          </div>

          {niveau && (
            <button
              onClick={() => setNiveau(null)}
              className="bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded-xl font-bold transition"
            >
              Retour
            </button>
          )}
        </div>
      </header>

      {!niveau ? (
        <>
          <section className="max-w-7xl mx-auto px-6 py-24 text-center">
            <h2 className="text-6xl font-extrabold mb-6">
              Réussir les maths avec{" "}
              <span className="text-blue-400">JouiniAdel</span>
            </h2>

            <p className="text-slate-300 text-xl">
              Cours, séries, devoirs et corrections pour les élèves tunisiens.
            </p>
          </section>

          <section className="max-w-7xl mx-auto px-6 pb-24">
            <h2 className="text-5xl font-bold text-center mb-12">
              Choisir un niveau
            </h2>

            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
              {Object.keys(data).map((niv) => (
                <button
                  key={niv}
                  onClick={() => setNiveau(niv)}
                  className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-left shadow-xl hover:border-blue-400 hover:-translate-y-2 hover:scale-105 transition"
                >
                  <div className="text-5xl mb-5">🎓</div>
                  <h3 className="text-3xl font-bold text-blue-400 mb-3">
                    {niv}
                  </h3>
                  <p className="text-slate-400">Voir les sections</p>
                </button>
              ))}
            </div>
          </section>
        </>
      ) : (
        <main className="max-w-7xl mx-auto px-6 py-20">
          <p className="text-blue-400 font-bold mb-3">Niveau sélectionné</p>
          <h2 className="text-5xl font-extrabold mb-12">{niveau}</h2>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {Object.entries(data[niveau]).map(([section, prefixe]) => (
              <div
                key={section}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl hover:border-blue-400 hover:-translate-y-2 transition"
              >
                <div className="text-5xl mb-5">📚</div>

                <h3 className="text-3xl font-bold text-blue-400 mb-4">
                  {section}
                </h3>

                <p className="text-slate-400 mb-6">
                  Choisissez le type de document.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {typeDocs.map((doc) => (
                    <a
                      key={doc.nom}
                      href={`/pdfs/${dossierParNiveau[niveau]}/${prefixe}-${doc.suffixe}.pdf`}
                      target="_blank"
                      className="bg-slate-800 hover:bg-blue-500 rounded-2xl p-4 text-center font-semibold transition"
                    >
                      <div className="text-3xl mb-2">{doc.icon}</div>
                      {doc.nom}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      <footer className="border-t border-slate-800 py-8 text-center text-slate-500">
        © 2026 JouiniAdel — Plateforme de Mathématiques
      </footer>
    </div>
  );
}