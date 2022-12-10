import { Outlet } from "react-router"

const MainContnet = () => {
    return (
        <div id="main-content">
            <div className="page-heading">
                <section className="section h-100  ">
                    <Outlet />
                </section>
            </div>
        </div>
    )
}

export default MainContnet;