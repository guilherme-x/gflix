const Carroussel = () => {
    return (
        <>
            <div style={{ position: 'absolute', top: 300, left: "5%", zIndex: 1, width: '80%' }} >
                <h1>The Spiderman</h1>
                <p>Spiderman is a movie that tells the story of a young man living in a city.</p>
            </div>
            <img width={"100%"} height={'500vh'} style={{ objectFit: 'cover' }} src="https://pbs.twimg.com/media/EXG4PhiXkAAqiwl.jpg:large" alt="" />
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: 'linear-gradient(to bottom, transparent, black)',
            }} />
        </>

    )
}
export default Carroussel;