import type { ReactNode } from "react";

interface Props {
  clase?: string;
  children: ReactNode; // Como se ve el boton (texto o imagen)
  alHacerClic?: () => void;
}

function Button({ clase = "btn btn-primary", children, alHacerClic }: Props) {
  return (
    <button type="button" className={clase} onClick={alHacerClic}>
      {children}
    </button>
  );
}

export default Button;
