import prof from "./assets/prof.jpg";import { useEffect, useState } from "react";
import logo from "./assets/logo.png";
import { supabase } from "./supabase";

const data = {
  "5ème": {
    Général: "5eme",
  },

  "4ème": {
    Général: "4eme",
  },

  "3ème": {
    Général: "3eme",
  },

  "1ère": {
    Général: "1ere",
  },

  "Terminale": {
    Général: "terminale",
  },
};

const sectionKeys = {
  Général: "general",
};

const documents = [
  { nom: "Cours", icon: "📘", type: "cours" },
  { nom: "Séries", icon: "📄", type: "serie" },
  { nom: "Devoirs", icon: "📝", type: "devoir" },
  { nom: "Corrections", icon: "✅", type: "correction" },
];

export default function Student() {
  const [niveau, setNiveau] = useState(null);
  const [section, setSection] = useState(null);
  const [typeDoc, setTypeDoc] = useState(null);
  const [files, setFiles] = useState([]);
  const [search, setSearch] = useState("");

  const folderNiveau = niveau && section ? data[niveau][section] : null;
  const folderSection = section ? sectionKeys[section] : null;

  useEffect(() => {
    if (!niveau || !section || !typeDoc) return;

    const loadFiles = async () => {
      const path = `${folderNiveau}/${typeDoc}`;

      const { data, error } = await supabase.storage.from("pdfs").list(path);

      if (error) {
        setFiles([]);
        return;
      }

     setFiles(
  (data || []).sort(
    (a, b) =>
      new Date(b.created_at || b.updated_at) -
      new Date(a.created_at || a.updated_at)
  )
);
    };

    loadFiles();
  }, [niveau, section, typeDoc]);

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(search.toLowerCase())
  );

  const getPdfUrl = (fileName) => {
    const path = `${folderNiveau}/${}/${typeDoc}/${fileName}`;

    const { data } = supabase.storage.from("pdfs").getPublicUrl(path);

    return data.publicUrl;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="bg-slate-900 border-b border-slate-800 px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img
            src={logo}
            alt="Logo"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
           <h1 className="text-4xl font-black text-blue-400">École Française</h1>

<p className="text-slate-300">
  Cours & Devoirs
</p>
          </div>
        </div>

        <a
          href="/?page=login"
          className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl font-bold transition"
        >
          Espace Prof
        </a>
      </header>

      {!niveau && (
        <>
          <section className="text-center py-24 px-6">
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              Réussir les maths avec{" "}
              <span className="text-blue-400">JouiniAdel</span>
            </h2>
            <p className="text-xl text-slate-300">
              Cours, séries, devoirs et corrections pour les élèves tunisiens.
            </p><div className="mt-10 bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-2xl mx-auto">
  <h3 className="text-3xl font-bold text-blue-400 mb-4">
    👨‍🏫 Professeur
  </h3>

 <div className="flex justify-center mb-6">
  <img
    src={prof}
    alt="Professeur"
    className="w-40 h-40 rounded-full object-cover border-4 border-blue-500"
  />
</div> <p className="text-xl mb-2">
    <strong>Nom :</strong> Jouini Adel
  </p>

  <p className="text-xl mb-2">
    <strong>Téléphone :</strong> +216 98915282
  </p>

  <p className="text-xl mb-2">
    <strong>Email :</strong> adel.jouini@gmail.com
  </p>

  <p className="text-xl">
    <strong>École :</strong> École Française
  </p>
</div>
          </section>

          <section className="px-8 pb-20">
            <h2 className="text-5xl font-black text-center mb-12">
              Choisir un niveau
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {Object.keys(data).map((niv) => (
                <button
                  key={niv}
                  onClick={() => setNiveau(niv)}
                  className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-left hover:scale-105 hover:border-blue-400 transition"
                >
                  <div className="text-6xl mb-6">🎓</div>
                  <h3 className="text-3xl font-bold text-blue-400 mb-3">
                    {niv}
                  </h3>
                  <p className="text-slate-400">Voir les sections</p>
                </button>
              ))}
            </div>
          </section>
        </>
      )}

      {niveau && !section && (
        <main className="px-8 py-16">
          <button
            onClick={() => setNiveau(null)}
            className="bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-xl font-bold mb-8"
          >
            Retour
          </button>

          <h2 className="text-5xl font-black mb-12">{niveau}</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {["Général"].map((sec) => (
  <button
    key={sec}
    onClick={() => {
      setSection(sec);
      setTypeDoc(null);
    }}
    className="bg-slate-900 border border-slate-800 rounded-3xl p-8"
  >
    <div className="text-6xl mb-5">📚</div>
    <h3 className="text-3xl font-bold text-blue-400">
      Continuer
    </h3>
  </button>
))}
          </div>
        </main>
      )}

      {niveau && section && !typeDoc && (
        <main className="px-8 py-16">
          <button
            onClick={() => setSection(null)}
            className="bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-xl font-bold mb-8"
          >
            Retour
          </button>

          <h2 className="text-5xl font-black mb-4">{niveau}</h2>
          <h3 className="text-3xl text-blue-400 font-bold mb-12">{section}</h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {documents.map((doc) => (
              <button
                key={doc.type}
                onClick={() => {
                  setTypeDoc(doc.type);
                  setSearch("");
                }}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:scale-105 hover:border-blue-400 transition"
              >
                <div className="text-6xl mb-5">{doc.icon}</div>
                <h3 className="text-2xl font-bold text-blue-400">{doc.nom}</h3>
              </button>
            ))}
          </div> 
        </main>
      )}

      {niveau && section && typeDoc && (
        <main className="px-8 py-16">
          <button
            onClick={() => {
              setTypeDoc(null);
              setFiles([]);
              setSearch("");
            }}
            className="bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-xl font-bold mb-8"
          >
            Retour
          </button>

          <h2 className="text-5xl font-black mb-4">{section}</h2>
          <h3 className="text-3xl text-blue-400 font-bold mb-8">
            {documents.find((d) => d.type === typeDoc)?.nom}
          </h3>

          <input
            type="text"
            placeholder="🔍 Rechercher un document..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-800 p-4 rounded-2xl text-xl mb-8"
          />

          {filteredFiles.length === 0 ? (
            <p className="text-slate-400 text-xl">Aucun document trouvé.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredFiles.map((file) => (
                <a
                  key={file.name}
                  href={getPdfUrl(file.name)}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-blue-400 transition"
                >
                  <div className="text-5xl mb-4">📄</div>
                  <h4 className="text-2xl font-bold text-blue-400">
                    {file.name.replace(".pdf", "").replaceAll("-", " ")}
                  </h4>
                  <p className="text-slate-400 mt-3">Ouvrir PDF</p>
                </a>
              ))}
            </div>
          )}
        </main>
      )}
    </div>
  );
}