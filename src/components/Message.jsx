/**
 * NÃO FUNCIONOU!
 */

import { useState, useEffect } from "react";

const Message = ({ message, type = "info", onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose(); // Opcional: Executa uma função ao fechar
    }, 5000);

    return () => clearTimeout(timer); // Limpa o timer se o componente for desmontado
  }, []);

  if (!visible) return null; // Se não estiver visível, não renderiza nada

  return (
    <div className={`alert alert-${type}`} style={styles.container}>
      {message}
    </div>
  );
};

const styles = {
  container: {
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    color: "white",
    textAlign: "center",
  },
};

export default Message;


// function Message({type, msg}) {
//     // Estilos inline para a notificação
//     const styles = {
//         alert: {
//         position: "fixed",
//         top: "60px",
//         left: "50%",
//         transform: "translateX(-50%)",
//         backgroundColor: type =='error'? "#cb4335": "#28a745",
//         color: "white",
//         padding: "10px 20px",
//         borderRadius: "5px",
//         fontWeight: "bold",
//         boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
//         zIndex: 9999
//         }
//     };

//     const [message, setMessage] = useState(msg); // Estado para exibir a notificação

//     setTimeout(() => setMessage(""), 3000);
//     return (
//         <>
//         {message && (
//         <div style={styles.alert}>
//             {message}
//         </div>
//         )}
//         </>
//     );
// }

// export default Message;