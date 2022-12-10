const Section = ({children}) => {
    return (
        <div id="main">
            <header className="mb-3">
                <a href="#" className="burger-btn d-block d-xl-none">
                    <i className="bi bi-justify fs-3"></i>
                </a>
            </header>
            <div className="page-heading">
                <h3>Profile Statistics</h3>
            </div>
            <div className="page-content">
                {children}
            </div>

            <footer>
                <div className="footer clearfix mb-0 text-muted">
                    <div className="float-start">
                        <p>2021 &copy; Mazer</p>
                    </div>
                    <div className="float-end">
                        <p>Crafted with <span className="text-danger"><i className="bi bi-heart"></i></span> by <a
                                href="https://saugi.me">Saugi</a></p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Section;