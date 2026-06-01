import Login from "./Login";
import Admin from "./Admin";
import Student from "./Student";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const params = new URLSearchParams(window.location.search);
  const page = params.get("page");

  if (page === "admin") {
    return (
      <ProtectedRoute>
        <Admin />
      </ProtectedRoute>
    );
  }

  if (page === "login") {
    return <Login />;
  }

  return <Student />;
}

export default App;