import { Routing } from './routes/Routing';

import 'bootstrap/dist/css/bootstrap.min.css';

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import SessionProvider from './context/SessionProvider';
import FavoritesProvider from './context/FavoritesProvider';


function App() {
   return (
    <SessionProvider>
      <FavoritesProvider>
         <Routing /> 
       </FavoritesProvider>
    </SessionProvider>
   );
}

export default App;