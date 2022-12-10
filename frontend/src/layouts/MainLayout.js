import { Footer } from '../components/footer/Footer';
import Sidebar from "components/navbar/Sidebar"
import MainContnet from './MainContent';
import TopNavbar from 'components/navbar/top/TopNavbar';

const MainLayout = () => {
    return (
        <>
            {/* <Sidebar1 /> */}
            <Sidebar />
            <div id="main" className='layout-navbar position-relative'>
                <TopNavbar />
                <MainContnet />
                <section className='p-5 m-5 '>
                {/* <section className='p-5 m-5 '></section> */}
                </section>
                {/* <Footer /> */}
            </div>
        </>
    )
}

export default MainLayout;