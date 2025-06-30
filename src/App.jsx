import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ItemList from './components/ItemList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ItemList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
