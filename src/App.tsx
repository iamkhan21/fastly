import Header from "@ui/shell/Header";
import Main from "@ui/shell/Main";
import withAuthentication from "@ui/HOCs/withAuthentication";

function App() {
  return (
    <>
      <Header />
      <Main />
    </>
  );
}

export default withAuthentication(App);
