
import HerbsPage from "./Herbs/HerbsPage";
import NavBar from "./Components/NavBar";

function App() {

    return (
        <div className={'app'}>
            <div className={'navBar'}>
                <NavBar/>
            </div>
            <HerbsPage/>
        </div>
    );
}

export default App;
