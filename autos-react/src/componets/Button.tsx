import type { ReactNode } from "react";

interface Props {
  clase?: string;
  tipo?: "button" | "submit" | "reset";
  children: ReactNode;
  alHacerClic?: () => void;
}

function Button({
  clase = "btn btn-primary",
  tipo = "button",
  children,
  alHacerClic,
}: Props) {
  return (
    <button type={tipo} className={clase} onClick={alHacerClic}>
      {children}
    </button>
  );
}

export default Button;
