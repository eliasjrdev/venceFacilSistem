import { Input } from "antd";
import { Button } from "../components/Button";
import { useState } from "react";

export function RegisterProducts(){
    const [productName, setProductName] = useState("")
    const [dateValidity, setDateValidity] = useState("")
    const [productLot, setProductLot] = useState("")
    function handleSubmit(e){
        event.preventDefault()
        console.log(productName, dateValidity, productLot )
    }
    return(
        <form className="p-8" onSubmit={handleSubmit}>
            <label htmlFor="productName">Descrição do produto:</label>
            <Input value={productName} onChange={ (e) => setProductName(e.target.value)} name="productName" />
            <label htmlFor="dateValidity">Data de vencimento:</label>
            <Input value={dateValidity} onChange={ (e) => setDateValidity(e.target.value)} name="dateValidity" type="date"/>
            <label htmlFor="productLot">Lote do produto:</label>
            <Input value={productLot} onChange={ (e)=> setProductLot(e.target.value)} name="productLot" />
            <Button type="submit" text= "Salvar" />
        </form>

    )
}