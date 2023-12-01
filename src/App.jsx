import { BrowserRouter } from 'react-router-dom';
import MainComponent from './MainComponent';

// any components wrapped by this auth provider will be given access to information provided by the auth context
import { AuthProvider } from './context/AuthContext'


function App() {
  
  return (
    <section>
      <BrowserRouter>
        <AuthProvider>
          <MainComponent />
        </AuthProvider>
      </BrowserRouter>
    </section>
  )
}

export default App
