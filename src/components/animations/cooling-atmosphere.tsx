import { VaporField } from "./vapor-field";

export function CoolingAtmosphere({ variant = "section" }: { variant?: "section" | "transition" | "footer" }) {
  return <VaporField variant={variant} />;
}
