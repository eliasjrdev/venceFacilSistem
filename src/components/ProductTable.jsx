// src/components/ProductTable.jsx
import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import dayjs from "dayjs";

export function ProductTable({ filter }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            const querySnapshot = await getDocs(collection(db, "products"));
            const items = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setProducts(items);
        }

        fetchProducts();
    }, []);

    const today = dayjs();

    const filtered = products.filter(p => {
        const date = dayjs(p.dateValidity.toDate());
        if (filter === 0) return true;
        if (filter === 0) return date.isAfter(today);
        if (filter === 1) return date.diff(today, "day") <= 29 && date.isAfter(today);
        if (filter === 2) return date.isBefore(today);
        return true;
    });

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
                        const validade = dayjs(p.dateValidity.toDate());
                        const diff = validade.diff(today, "day");

                        let statusText = "";
                        let statusColor = "";

                        if (validade.isBefore(today)) {
                            statusText = "Vencido";
                            statusColor = "bg-red-500";
                        } else if (diff <= 7) {
                            statusText = `${diff} dia${diff === 1 ? "" : "s"} para vencer`;
                            statusColor = "bg-yellow-500";
                        } else {
                            statusText = "Na validade";
                            statusColor = "bg-green-600";
                        }

                        return (
                            <tr key={p.id} className="cursor-pointer hover:bg-gray-100 transition">
                                <td className="border p-2">{p.productName}</td>
                                <td className="border p-2">{validade.format("DD/MM/YYYY")}</td>
                                <td className="border p-2">{p.productLot}</td>
                                <td className="border p-2">
                                    <span className={`text-white px-2 py-1 rounded ${statusColor}`}>
                                        {statusText}
                                    </span>
                                </td>
                                <td className="border p-2">
                                    <button className="text-blue-600 mr-2" onClick={() => alert("Função de edição em breve")}>
                                        Editar
                                    </button>
                                    <button className="text-red-600" onClick={() => handleDelete(p.id)}>
                                        Excluir
                                    </button>
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
