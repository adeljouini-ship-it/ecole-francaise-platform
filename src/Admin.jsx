import { useEffect, useState } from "react";
import { supabase } from "./supabase";

export default function Admin() {
  const [niveau, setNiveau] = useState("5eme");
  const [typeDoc, setTypeDoc] = useState("cours");
  const [titre, setTitre] = useState("");
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);

  const folderPath = `${niveau}/${typeDoc}`;

  const loadFiles = async () => {
    const { data } = await supabase.storage.from("pdfs").list(folderPath);
    setFiles(data || []);
  };

  useEffect(() => {
    loadFiles();
  }, [niveau, typeDoc]);

  const cleanName = (text) =>
    text
      .toLowerCase()
      .trim()
      .replaceAll(" ", "-")
      .replaceAll("é", "e")
      .replaceAll("è", "e")
      .replaceAll("ê", "e")
      .replaceAll("à", "a")
      .replaceAll("ç", "c")
      .replace(/[^a-z0-9-]/g, "");

  const handleFile = async (file) => {
    if (!file) return;

    if (!titre.trim()) {
      alert("Écris d'abord le titre du document.");
      return;
    }

    setLoading(true);

    const fileName = `${cleanName(titre)}.pdf`;
    const filePath = `${folderPath}/${fileName}`;

    const { error } = await supabase.storage
      .from("pdfs")
      .upload(filePath, file, {
        upsert: true,
        contentType: "application/pdf",
      });

    setLoading(false);

    if (error) {
      alert("Erreur upload : " + error.message);
      return;
    }

    alert("PDF envoyé avec succès");
    setTitre("");
    loadFiles();
  };

  const openFile = (fileName) => {
    const { data } = supabase.storage
      .from("pdfs")
      .getPublicUrl(`${folderPath}/${fileName}`);

    window.open(data.publicUrl, "_blank");
  };

  const deleteFile = async (fileName) => {
    if (!confirm("Supprimer ce PDF ?")) return;

    await supabase.storage.from("pdfs").remove([`${folderPath}/${fileName}`]);
    loadFiles();
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-5xl font-bold mb-6">Espace Professeur</h1>

      <div className="flex gap-4 mb-10">
        <button
          onClick={() => (window.location.href = "/")}
          className="bg-slate-700 px-6 py-3 rounded-2xl text-xl font-bold"
        >
          Retour Plateforme
        </button>

        <button
          onClick={async () => {
            await supabase.auth.signOut();
            window.location.href = "/?page=login";
          }}
          className="bg-red-600 px-6 py-3 rounded-2xl text-xl font-bold"
        >
          Déconnexion
        </button>
      </div>

      <div className="flex gap-6 mb-6">
        <select
          value={niveau}
          onChange={(e) => setNiveau(e.target.value)}
          className="bg-slate-800 p-4 rounded-2xl text-xl"
        >
          <option value="5eme">5ème</option>
          <option value="4eme">4ème</option>
          <option value="3eme">3ème</option>
          <option value="1ere">1ère</option>
          <option value="terminale">Terminale</option>
        </select>

        <select
          value={typeDoc}
          onChange={(e) => setTypeDoc(e.target.value)}
          className="bg-slate-800 p-4 rounded-2xl text-xl"
        >
          <option value="cours">Cours</option>
          <option value="serie">Série</option>
          <option value="devoir">Devoir</option>
          <option value="correction">Correction</option>
        </select>
      </div>

      <input
        value={titre}
        onChange={(e) => setTitre(e.target.value)}
        placeholder="Titre du document"
        className="w-full bg-slate-800 p-4 rounded-2xl text-xl mb-6"
      />

      <label className="block bg-blue-600 p-6 rounded-3xl text-2xl font-bold text-center cursor-pointer mb-10">
        Ajouter le PDF dans : {niveau} / {typeDoc}
        <input
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={(e) => handleFile(e.target.files[0])}
        />
      </label>

      {loading && <p className="text-blue-400 text-2xl mb-6">Upload en cours...</p>}

      <h2 className="text-3xl font-bold mb-6">
        PDF dans : {niveau} / {typeDoc}
      </h2>

      {files.length === 0 ? (
        <p className="text-slate-400 text-xl">Aucun PDF pour le moment.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {files.map((file) => (
            <div
              key={file.name}
              className="bg-slate-900 border border-slate-700 rounded-2xl p-5 flex justify-between items-center"
            >
              <span className="text-xl">{file.name}</span>

              <div className="flex gap-3">
                <button
                  onClick={() => openFile(file.name)}
                  className="bg-blue-600 px-5 py-2 rounded-xl font-bold"
                >
                  Ouvrir
                </button>

                <button
                  onClick={() => deleteFile(file.name)}
                  className="bg-red-600 px-5 py-2 rounded-xl font-bold"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}