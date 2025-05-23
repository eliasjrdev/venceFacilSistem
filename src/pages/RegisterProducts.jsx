import { Input } from "antd";
import { Button } from "../components/Button";
import { useState } from "react";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import dayjs from "dayjs";

export function RegisterProducts() {
  const [productName, setProductName] = useState("");
  const [dateValidity, setDateValidity] = useState("");
  const [productLot, setProductLot] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    console.log("Tentando cadastrar:", productName, dateValidity, productLot);

    try {
      if (!auth.currentUser) {
        throw new Error("Usuário não autenticado");
      }

      const userId = auth.currentUser.uid;
      const date = dayjs(dateValidity).toDate()
      const productRef = await addDoc(collection(db, "products"), {
        productName: productName.trim(),
        dateValidity: date,
        productLot: productLot.trim(),
        createdAt: new Date(),
        userId: userId,
      });

      console.log(productRef.id)

      setProductName("");
      setDateValidity("");
      setProductLot("");

      alert("Produto cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro detalhado:", error);
      alert(`Erro ao cadastrar produto: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex justify-center items-center bg-white">
      <form className="flex justify-center items-center p-8 flex-col gap-4 w-xl  shadow-[6px_6px_27px_10px_rgba(0,_0,_0,_0.1)]" onSubmit={handleSubmit}>
        <label htmlFor="productName">Descrição do produto:</label>
        <Input
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          name="productName"
          required
        />

        <label htmlFor="dateValidity">Data de vencimento:</label>
        <Input
          value={dateValidity}
          onChange={(e) => setDateValidity(e.target.value)}
          name="dateValidity"
          type="date"
          required
        />

        <label htmlFor="productLot">Lote do produto:</label>
        <Input
          value={productLot}
          onChange={(e) => setProductLot(e.target.value)}
          name="productLot"
          required
        />

        <Button
          type="submit"
          text="Salvar"
          disabled={loading}
        />
      </form>
    </div>

  );
}