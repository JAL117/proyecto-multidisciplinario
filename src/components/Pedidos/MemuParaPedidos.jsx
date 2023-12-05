import React, { useEffect, useState } from "react";
import Navbar from "./NavbarMenu";
import CardList from "./Cards";
import OrderSection from "./Comanda";
import Animaciones from "../utils/Animaciones";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

function Pedidos() {
  const [productos, setProductos] = useState([]);
  const alimentos = [productos];
  const [categoriaActual, setCategoriaActual] = useState("Tlayuda");
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const cards = async () => {
      try {
        const response = await axios.get(apiUrl+"producto");
        setProductos(response.data);
      } catch (error) {
        console.log("Error obteniendo los datos: ", error);
      }
    };
    cards();
  }, []);

  const handleCategoriaSeleccionada = (categoria) => {
    setCategoriaActual(categoria);
  };

  const agregarPedido = (pedido) => {
    setPedidos(pedido);
  };
 // console.log(pedidos);
  return (
    <Animaciones>
      <div>
        <Navbar onCategoriaSeleccionada={handleCategoriaSeleccionada} />
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <CardList
                alimentos={alimentos}
                categoriaActual={categoriaActual}
                onEnviarPedido={agregarPedido}
              />
            </div>
            <div className="col-md-4">
              <OrderSection pedidos={pedidos} />
            </div>
          </div>
        </div>
      </div>
    </Animaciones>
  );
}

export default Pedidos;