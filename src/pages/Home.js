import Carroussel from "components/Carroussel";
import NavBar from "components/NavBar";

const Home = () => {
    return (
        <div style={{ position: 'relative' }}>
            <NavBar />
            <Carroussel />
        </div>
    );
}
export default Home;