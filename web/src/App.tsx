import {useRoutes} from "react-router-dom";
import { routes } from '@generouted/react-router';

export default function App() {
  const Routes = useRoutes(routes);

  return (
      <div>
        {Routes}
      </div>
  );
}