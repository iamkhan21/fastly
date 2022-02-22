import Header from "@ui/shell/Header";
import Main from "@ui/shell/Main";
import AuthGuard from "@ui/components/shared/AuthGuard";

function App() {
  return (
    <AuthGuard>
      <Header />
      <Main />
    </AuthGuard>
  );
}

export default App;
