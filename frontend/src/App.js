import React from 'react'; // useState serve para conseguir manipular estados

import './global.css';

import Routes from './routes';

function App() {
  //No React se utiliza estado para manter uma informação no componente.
  //É utilizado o método useState(indice); que retorna as seguintes informações
  //Array [valor, funcaoDeAtualizacao]
  //Basta então utilizar a funcaoDeAtualização para alterar um valor, funcaoDeAtualizacao(novoValor);
  // const [counter, setCounter] = useState(0);  
  return (
    <Routes />
  );
}

export default App;
