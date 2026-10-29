import { type ReactNode } from "react";
import CardBody from "./CuerpoTarjeta";
// Definimos las propiedades de la tarjeta
interface Props {
  // Propiedades de la imagen
  urlImagen?: string;
  claseImagen?: string;
  altImagen?: string;
  // Propiedades del cuerpo de la tarjeta
  titulo: string;
  texto: string;
  clase?: string;
  children?: ReactNode;
}

function Tarjeta({
  urlImagen,
  claseImagen = "card-img-top",
  altImagen,
  titulo,
  texto,
  clase = "card",
  children,
}: Props) {
  return (
    <div className={clase} style={{ width: "18rem" }}>
      {/* Si existe la direcion de la imagen (verificacion antes de &&)
      entonces genera el html indicado  */}
      {urlImagen && (
        <img src={urlImagen} className={claseImagen} alt={altImagen} />
      )}
      {/* Delego la construccion del cuerpo de la tarjeta 
      al componente TarjetaCuerpo */}
      <CardBody titulo={titulo} texto={texto}>
        {children}
      </CardBody>
    </div>
  );
}

export default Tarjeta;
