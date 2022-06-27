import { Route, Routes,  unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import history from "./history";
import Home from "./Pages/Home";

function App() {
  return (
    <HistoryRouter history={history}>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
