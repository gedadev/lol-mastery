import Home from "./views/Home";

function App() {
  return (
    <>
      <Home />
      <footer className="absolute bottom-0 left-0 min-w-full">
        <p className="text-center text-xs text-opacity-50 text-stone-200 px-10 py-4">
          This website is not endorsed by Riot Games and does not reflect the
          views or opinions of Riot Games or anyone officially involved in
          producing or managing Riot Games properties. Riot Games and all
          associated properties are trademarks or registered trademarks of Riot
          Games, Inc
        </p>
      </footer>
    </>
  );
}

export default App;
