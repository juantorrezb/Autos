import type { ReactNode } from "react";

interface Props {
  clase?: string;
  children: ReactNode;
}

function CardAuto({ clase = "container", children }: Props) {
  return (
    <div className={clase}>
      {/* En 'children' va el contenido que quiero encerrar */}
      {children}
    </div>
  );
}

export default CardAuto;
