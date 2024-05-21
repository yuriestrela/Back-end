
import { database } from "../../services/firebase";
import { collection, addDoc, doc, getDoc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";

const dbInstance = collection(database, "usuarios");

export default async function handler(req, res) {
  if (req.method === "GET") {
    const id = req.query.id;
    console.log("", id);

    if (id === undefined) {
      const usuarios = await getDocs(dbInstance).then((data) => {
        return data.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
      });

      res.status(200).json(usuarios);
    } else {
      const valid_usuario = doc(database, "usuarios", id);
      console.log(valid_usuario);
      const usuario_data = await getDoc(valid_usuario);

      if (valid_usuario === undefined) {
        res.status(404).json({});
      }

      const usuario = { ...usuario_data.data(), id: id };

      res.status(200).json(usuario);
    }
  }

  if (req.method === "POST") {
    const new_usuario = req.body;

    if (new_usuario.nome === undefined || new_usuario.nome === "") {
      res.status(402).json({ message: "nome é obrigatorio!" });
    }

    if (new_usuario.email === undefined || new_usuario.email === "") {
      res.status(402).json({ message: "email é obrigatorio!" });
    }

    const nome = new_usuario.nome;
    const email = new_usuario.email;

    addDoc(dbInstance, { nome, email }).then(() => console.log("gravamos"));

    res.status(201).json({});
  }

  if (req.method === "PUT") {
    const update_usuario = req.body;

    if(update_usuario.nome === undefined || update_usuario.nome === ""){
      res.status(402).json({ message: "nome é obrigatorio!" });
    }

    if(update_usuario.email === undefined || update_usuario.email === ""){
      res.status(402).json({ message: "email é obrigatorio!" });
    }

    const valid_usuario = doc(database, "usuarios", update_usuario.id);

    await updateDoc(valid_usuario, {
      nome: update_usuario.nome,
      email: update_usuario.email,
    });

    res.status(200).json({});
  }

  if (req.method === "DELETE") {
    const ID = req.body.id;

    const valid_usuario = doc(database, "usuarios", ID);

    await deleteDoc(valid_usuario);

    res.status(201).json({});
  }
}
