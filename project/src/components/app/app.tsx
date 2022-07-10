import MainScreen from '../../pages/main-screen/main-screen';

type Place = {
  id: number;
  price: number;
  rating: number;
  title: string;
  type: string;
}

type AppProps = {
  places: Place[]
}

function App({places}: AppProps): JSX.Element {
  return <MainScreen places={places} />;
}

export default App;
