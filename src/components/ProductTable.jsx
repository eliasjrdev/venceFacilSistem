import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import dayjs from "dayjs";
import { Pencil, Trash2 } from "lucide-react";

export function ProductTable({ filter }) {
  const [products, setProducts] = useState([]);
  const [editValues, setEditValues] = useState({
    id: null,
    productName: "",
    productLot: "",
    dateValidity: "",
  });

  const userId = auth.currentUser?.uid;
  const today = dayjs();

  useEffect(() => {
    async function fetchData() {
      const querySnapshot = await getDocs(collection(db, "products"));
      const items = querySnapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter(p => p.userId === userId);
      setProducts(items);
    }
    fetchData();
  }, [userId]);

  const filtered = products.filter(p => {
    const raw = p.dateValidity?.toDate ? p.dateValidity.toDate() : p.dateValidity;
    const date = dayjs(raw);

    if (filter === 0) return true;
    if (filter === 1) return date.diff(today, "day") <= 29 && date.isAfter(today);
    if (filter === 2) return date.isBefore(today);
    return true;
  });

  async function handleSave() {
    const parsed = dayjs(editValues.dateValidity, "YYYY-MM-DD", true);
    if (!parsed.isValid()) {
      alert("Data inválida");
      return;
    }

    try {
      const ref = doc(db, "products", editValues.id);
      await updateDoc(ref, {
        productName: editValues.productName.trim(),
        productLot: editValues.productLot.trim(),
        dateValidity: parsed.toDate(),
      });

      const updated = products.map(p =>
        p.id === editValues.id
          ? {
            ...p,
            productName: editValues.productName.trim(),
            productLot: editValues.productLot.trim(),
            dateValidity: parsed.toDate(),
          }
          : p
      );

      setProducts(updated);
      setEditValues(null)
    } catch (e) {
      alert("Erro ao salvar: " + e.message);
    }
  }

  async function handleDelete(id) {
    if (confirm("Deseja excluir este produto?")) {
      await deleteDoc(doc(db, "products", id));
      setProducts(products.filter(p => p.id !== id));
    }
  }

  return (
    <div className="p-4">
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Descrição</th>
            <th className="border p-2">Validade</th>
            <th className="border p-2">Lote</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((p) => {
            const validade = dayjs(p.dateValidity?.toDate ? p.dateValidity.toDate() : p.dateValidity);
            const diff = validade.diff(today, "day");

            let status = "Na validade";
            let color = "bg-green-600";
            if (validade.isBefore(today)) {
              status = "Vencido";
              color = "bg-red-500";
            } else if (diff <= 29) {
              status = `${diff} dia${diff === 1 ? "" : "s"} para vencer`;
              color = "bg-yellow-500";
            }

            return (
              <tr key={p.id} className="border hover:bg-gray-100 transition">
                <td className="border p-2">
                  {editValues && editValues.id === p.id ? (
                    <input
                      value={editValues.productName}
                      onChange={e => setEditValues({ ...editValues, productName: e.target.value })}
                      className="border rounded p-1 w-full"
                    />
                  ) : (
                    p.productName
                  )}
                </td>
                <td className="border p-2">
                  {editValues && editValues.id === p.id ? (
                    <input
                      type="date"
                      value={editValues.dateValidity}
                      onChange={e => setEditValues({ ...editValues, dateValidity: e.target.value })}
                      className="border rounded p-1 w-full"
                    />
                  ) : (
                    validade.format("DD/MM/YYYY")
                  )}
                </td>
                <td className="border p-2">
                  {editValues && editValues.id === p.id ? (
                    <input
                      value={editValues.productLot}
                      onChange={e => setEditValues({ ...editValues, productLot: e.target.value })}
                      className="border rounded p-1 w-full"
                    />
                  ) : (
                    p.productLot
                  )}
                </td>
                <td className="border p-2 text-center">
                  {editValues && editValues.id === p.id ? (
                    <span className="text-gray-400">Editando...</span>
                  ) : (
                    <span
                      className={`text-sm font-semibold rounded-full px-3 py-1 inline-block text-center min-w-[160px] ${color}`}
                    >
                      {status}
                    </span>
                  )}
                </td>
                <td className="border p-2 flex justify-center gap-2">
                  {editValues && editValues.id === p.id ? (
                    <>
                      <button
                        onClick={() => handleSave()}
                        className="bg-green-100 text-green-700 px-3 py-1 rounded hover:bg-green-600 hover:text-white transition"
                      >
                        Salvar
                      </button>
                      <button
                        onClick={() => setEditValues(null)}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded hover:bg-gray-400 hover:text-white transition"
                      >
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setEditValues({ ...p, dateValidity: validade.format("YYYY-MM-DD") })}
                        className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-600 hover:text-white transition"
                      >
                        <Pencil className="w-4 h-4" />
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-600 hover:text-white transition"
                      >
                        <Trash2 className="w-4 h-4" />
                        Excluir
                      </button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {filtered.length === 0 && (
        <p className="text-center text-gray-500 mt-4">Nenhum produto encontrado.</p>
      )}
    </div>
  );
}
