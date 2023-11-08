import Logo from 'assets/logo.png'
const NavBar = () => {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: 50,
            backgroundColor: 'rgba(0,0,0,0.7)',
            boxShadow: '0 0 10px rgba(0,0,0,0.5)',
            zIndex: 2,
        }} className="navBar">
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontWeight: "lighter",
                paddingInline: '20%',
                height: 50,
            }}>
                <img className='logo' alt='logo' src={Logo} />
                <a href="/" style={{ color: 'white', textDecoration: 'none' }}>Home</a>
                <a href="/movies" style={{ color: 'white', textDecoration: 'none' }}>Filmes</a>
                <a href="/" style={{ color: 'white', textDecoration: 'none' }}>Séries</a>
                <a href="/" style={{ color: 'white', textDecoration: 'none' }}>Gêneros</a>
            </div>
        </div>
    )
};
export default NavBar;