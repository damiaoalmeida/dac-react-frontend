import { ThemeProvider } from "./ThemeContext";
import Pagina from "./Pagina";

function AppContext() {
  return (
    <ThemeProvider>
      <Pagina />
    </ThemeProvider>
  );
}

export default AppContext;
