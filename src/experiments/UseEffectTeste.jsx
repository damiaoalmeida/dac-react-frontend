import { useState } from "react";

export default function UserEffectTeste() {
  const [count, setCount] = useState(0);

  // Tentando alterar o título da página sem usar useEffect
  document.title = `Contador: ${count}`;

  return (
    <div>
      <h1>Contador: {count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Incrementar
      </button>
    </div>
  );
}