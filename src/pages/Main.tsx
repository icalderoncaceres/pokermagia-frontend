import React from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import Footer from '../components/footer/Footer';
import Navbar from '../components/navbar/Navbar';
import Modal from '../components/modal/Modal';
import MainRouter from '../routes/Main';

function Main() {

    return (
        <React.Fragment>
            <div id="wrapper">

                <Sidebar></Sidebar>
                <div id="content-wrapper" className="d-flex flex-column">

                    <div id="content">
                        <Navbar></Navbar>
                        <MainRouter />
                    </div>

                    <Footer></Footer>

                </div>

            </div>

            <a className="scroll-to-top rounded" href="#page-top">
                <i className="fas fa-angle-up"></i>
            </a>

            <Modal></Modal>
        </React.Fragment>
    );
}

export default Main;