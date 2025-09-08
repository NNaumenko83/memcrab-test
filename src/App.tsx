import Header from "./components/header/header"
import MatrixGrid from "./components/matrix/matrix"
import { TableContextProvider } from "./context/table-context"



function App() {

  return (
    <TableContextProvider>
      <Header />
      <MatrixGrid />
    </TableContextProvider>
  )
}

export default App
