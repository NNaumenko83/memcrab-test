import Header from "./components/header/header"
import MatrixGrid from "./components/matrix/matrix"
import { MatrixProvider } from "./context/matrix-context"



function App() {

  return (
    <MatrixProvider>
      <Header />
      <MatrixGrid />
    </MatrixProvider>
  )
}

export default App
