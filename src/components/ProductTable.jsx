import { auth } from "../firebaseConfig";
import { useEffect, useState } from "react";
import {
    collection,
    getDocs,
    deleteDoc,
    doc,
    updateDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import dayjs from "dayjs";
import { Pencil, Trash2 } from "lucide-react";
import { Fragment } from "react";

export function ProductTable({ filter }) {
    const [products, setProducts] = useState([]);
    const userId = auth.currentUser?.uid;

    useEffect(() => {
        async function fetchProducts() {
            const querySnapshot = await getDocs(collection(db, "products"));
            const items = querySnapshot.docs
                .map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }))
                .filter((p) => p.userId === userId);

            setProducts(items);
        }

        fetchProducts();
    }, [userId]);

    const [editingProductId, setEditingProductId] = useState(null);
    const [editValues, setEditValues] = useState({
        productName: "",
        dateValidity: "",
        productLot: "",
    });

    const today = dayjs();

    const filtered = products.filter((p) => {
        const rawDate = p.dateValidity?.toDate
            ? p.dateValidity.toDate()
            : p.dateValidity;
        const date = dayjs(rawDate);

        if (filter === 0) return true;
        if (filter === 1) return date.diff(today, "day") <= 29 && date.isAfter(today);
        if (filter === 2) return date.isBefore(today);
        return true;
    });

    async function handleDelete(id) {
        if (confirm("Deseja excluir este produto?")) {
            await deleteDoc(doc(db, "products", id));
            setProducts(products.filter((p) => p.id !== id));
        }
    }

    async function handleSaveEdit(id) {
        try {
            const ref = doc(db, "products", id);
            const parsedDate = dayjs(editValues.dateValidity).toDate();

            await updateDoc(ref, {
                productName: editValues.productName,
                productLot: editValues.productLot,
                dateValidity: parsedDate,
            });

            const updated = products.map((p) =>
                p.id === id
                    ? {
                        ...p,
                        productName: editValues.productName,
                        productLot: editValues.productLot,
                        dateValidity: parsedDate,
                    }
                    : p
            );

            setProducts(updated);
            setEditingProductId(null);
        } catch (err) {
            alert("Erro ao salvar: " + err.message);
        }
    }

    return (
        <div>
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
                        const validade = dayjs(
                            p.dateValidity?.toDate
                                ? p.dateValidity.toDate()
                                : p.dateValidity
                        );
                        const diff = validade.diff(today, "day");

                        let statusText = "";
                        let statusColor = "";

                        if (validade.isBefore(today)) {
                            statusText = "Vencido";
                            statusColor = "bg-red-500";
                        } else if (diff <= 29) {
                            statusText = `${diff} dia${diff === 1 ? "" : "s"} para vencer`;
                            statusColor = "bg-yellow-500";
                        } else {
                            statusText = "Na validade";
                            statusColor = "bg-green-600";
                        }

                        return (
                            <tr key={p.id} className="hover:bg-gray-100 transition border-2">
                                <td className="border p-2">
                                    {editingProductId === p.id ? (
                                        <input
                                            value={editValues.productName}
                                            onChange={(e) => setEditValues({ ...editValues, productName: e.target.value })}
                                            className="border p-1 w-full rounded"
                                        />
                                    ) : (
                                        p.productName
                                    )}
                                </td>
                                <td className="border p-2">
                                    {editingProductId === p.id ? (
                                        <input
                                            type="date"
                                            value={editValues.dateValidity}
                                            onChange={(e) => setEditValues({ ...editValues, dateValidity: e.target.value })}
                                            className="border p-1 w-full rounded"
                                        />
                                    ) : (
                                        dayjs(
                                            p.dateValidity?.toDate ? p.dateValidity.toDate() : p.dateValidity
                                        ).format("DD/MM/YYYY")
                                    )}
                                </td>
                                <td className="border p-2">
                                    {editingProductId === p.id ? (
                                        <input
                                            value={editValues.productLot}
                                            onChange={(e) => setEditValues({ ...editValues, productLot: e.target.value })}
                                            className="border p-1 w-full rounded"
                                        />
                                    ) : (
                                        p.productLot
                                    )}
                                </td>
                                <td className="border p-2">
                                    {editingProductId === p.id ? (
                                        <span className="text-gray-400">Editando...</span>
                                    ) : (
                                        <span
                                            className={`text-black text-sm font-semibold rounded-full px-3 py-1 inline-block text-center min-w-[160px] ${validade.isBefore(today)
                                                    ? "bg-red-500"
                                                    : diff <= 29
                                                        ? "bg-yellow-500"
                                                        : "bg-green-600"
                                                }`}
                                        >
                                            {validade.isBefore(today)
                                                ? "Vencido"
                                                : diff <= 29
                                                    ? `${diff} dia${diff === 1 ? "" : "s"} para vencer`
                                                    : "Na validade"}
                                        </span>
                                    )}
                                </td>
                                <td className="border p-2 flex justify-center items-center gap-2">
                                    {editingProductId === p.id ? (
                                        <>
                                            <button
                                                onClick={() => handleSaveEdit(p.id)}
                                                className="bg-green-100 text-green-700 px-3 py-1 rounded hover:bg-green-600 hover:text-white transition cursor-pointer"
                                            >
                                                Salvar
                                            </button>
                                            <button
                                                onClick={() => setEditingProductId(null)}
                                                className="bg-gray-100 text-gray-700 px-3 py-1 rounded hover:bg-gray-400 hover:text-white transition cursor-pointer"
                                            >
                                                Cancelar
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => {
                                                    setEditingProductId(p.id);
                                                    setEditValues({
                                                        productName: p.productName,
                                                        dateValidity: dayjs(
                                                            p.dateValidity?.toDate ? p.dateValidity.toDate() : p.dateValidity
                                                        ).format("YYYY-MM-DD"),
                                                        productLot: p.productLot,
                                                    });
                                                }}
                                                className="cursor-pointer flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-600 hover:text-white hover:shadow-md hover:scale-105 transition transform duration-200"
                                                title="Editar"
                                            >
                                                <Pencil className="w-4 h-4" />
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => handleDelete(p.id)}
                                                className="cursor-pointer flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-600 hover:text-white hover:shadow-md hover:scale-105 transition transform duration-200"
                                                title="Excluir"
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
                <p className="text-center text-gray-500 mt-4">
                    Nenhum produto encontrado.
                </p>
            )}
        </div>
    );
}
