import Header from "./components/header/header"
import { TableContextProvider } from "./context/table-context"


function App() {

  return (
    <TableContextProvider>
      <Header />
    </TableContextProvider>
  )
}

export default App
