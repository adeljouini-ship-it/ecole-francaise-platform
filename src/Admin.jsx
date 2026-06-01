import { useEffect, useState } from "react";
import { supabase } from "./supabase";

export default function Admin() {
  const [niveau, setNiveau] = useState("bac");
  const [section, setSection] = useState("technique");
  const [typeDoc, setTypeDoc] = useState("cours");
  const [titre, setTitre] = useState("");
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);

  const cleanName = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replaceAll(" ", "-")
      .replaceAll("é", "e")
      .replaceAll("è", "e")
      .replaceAll("ê", "e")
      .replaceAll("à", "a")
      .replaceAll("ç", "c")
      .replace(/[^a-z0-9-]/g, "");
  };

  const folderPath = `${niveau}/${section}/${typeDoc}`;

  const loadFiles = async () => {
    const { data, error } = await supabase.storage
      .from("pdfs")
      .list(folderPath);

    if (error) {
      setFiles([]);
      return;
    }

    setFiles(data || []);
  };

  useEffect(() => {
    loadFiles();
  }, [niveau, section, typeDoc]);

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

    alert("PDF envoyé avec succès : " + filePath);
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
    const confirmDelete = window.confirm(
      "Tu veux vraiment supprimer : " + fileName + " ?"
    );

    if (!confirmDelete) return;

    const filePath = `${folderPath}/${fileName}`;

    const { error } = await supabase.storage
      .from("pdfs")
      .remove([filePath]);

    if (error) {
      alert("Erreur suppression : " + error.message);
      return;
    }

    alert("PDF supprimé : " + fileName);
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
            window.location.href = "/login";
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
          <option value="1ere">1ère</option>
          <option value="2eme">2ème</option>
          <option value="3eme">3ème</option>
          <option value="bac">Bac</option>
        </select>

        <select
          value={section}
          onChange={(e) => setSection(e.target.value)}
          className="bg-slate-800 p-4 rounded-2xl text-xl"
        >
          <option value="math">Math</option>
          <option value="science">Science</option>
          <option value="info">Info</option>
          <option value="eco">Économie</option>
          <option value="technique">Technique</option>
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
        placeholder="Titre du document, exemple : Chapitre 1 - Nombres complexes"
        className="w-full bg-slate-800 p-4 rounded-2xl text-xl mb-6"
      />

      <label className="block bg-blue-600 p-6 rounded-3xl text-2xl font-bold text-center cursor-pointer hover:scale-105 transition mb-10">
        Ajouter le PDF dans : {niveau} / {section} / {typeDoc}
        <input
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={(e) => handleFile(e.target.files[0])}
        />
      </label>

      {loading && (
        <p className="text-blue-400 text-2xl mb-6">Upload en cours...</p>
      )}

      <h2 className="text-3xl font-bold mb-6">
        PDF dans : {niveau} / {section} / {typeDoc}
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
                  className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-xl font-bold"
                >
                  Ouvrir
                </button>
<button
  onClick={async () => {
    const nouveauNom = prompt(
      "Nouveau nom du PDF :",
      file.name.replace(".pdf", "")
    );

    if (!nouveauNom) return;

    const ancienPath = `${folderPath}/${file.name}`;
    const nouveauPath = `${folderPath}/${nouveauNom}.pdf`;

    const { error } = await supabase.storage
      .from("pdfs")
      .move(ancienPath, nouveauPath);

    if (error) {
      alert(error.message);
      return;
    }

    alert("PDF renommé avec succès");
    loadFiles();
  }}
  className="bg-yellow-600 hover:bg-yellow-700 px-5 py-2 rounded-xl font-bold"
>
  Renommer
</button>
                <button
                  onClick={() => deleteFile(file.name)}
                  className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-xl font-bold"
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