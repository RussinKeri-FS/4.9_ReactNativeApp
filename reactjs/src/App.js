import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Book from './pages/Book'

function App() {
  return (
   <Router>
      <Routes>
        <Route path="/books/:id" exact element={<Book />} />
        <Route path="/dashboard" exact element={<Dashboard />} />
        <Route path="/" exact element={<Home />} />
      </Routes>
   </Router>
  );
}

export default App;