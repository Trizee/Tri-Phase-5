
function Landing(){
    return (
    <div className="hero min-h-screen" style={{backgroundImage: 'url(https://i.pinimg.com/originals/73/c5/b2/73c5b2afc684e0e6bc1b9469e5120b88.png)'}}>
        <div className="hero-overlay bg-opacity-80"></div>
        <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold text-white" >Code Together, Build Together</h1>
            <p className="mb-5 text-white">Collaborate in real-time with fellow developers. Share your code, build projects together, and learn from a community passionate about coding.</p>
            <button className="btn btn-primary">Get Started</button>
            </div>
        </div>
    </div>
    )
}

export default Landing