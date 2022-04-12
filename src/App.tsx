import Header from "@shell/Header";
import Main from "@shell/Main";
import AuthGuard from "@components/shared/AuthGuard";

function App() {
  return (
    <AuthGuard>
      <Header />
      <Main />
    </AuthGuard>
  );
}

export default App;
