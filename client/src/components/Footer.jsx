import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {

    const currentYear = new Date().getFullYear();

    return (
        <div>
            <footer className="text-center text-lg-start bg-dark text-yellow-50">
                <section className="">
                    <div className="container text-center text-md-start mt-5 p-5">
                        <div className="row mt-3">
                            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                                <Link className='' to="/">
                                    <span className="mr-2 font-semibold p-2 bg-gradient-to-tr from-purple-500 to-pink-300 via-purple-500">
                                        InsightX
                                    </span>
                                    Blog
                                </Link>
                            </div>
                            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 className="text-uppercase font-semibold text-lg mb-4">
                                    About
                                </h6>
                                <p className='text-sm mb-2'>
                                    Projects
                                </p>
                                <p className='text-sm'>
                                    InsightXBlog
                                </p>
                            </div>
                            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 className="text-uppercase font-semibold text-lg mb-4">
                                    Follow us
                                </h6>
                                <p className='text-sm mb-2'>
                                    Github
                                </p>
                                <p className='text-sm'>
                                    Discord
                                </p>
                            </div>
                            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 className="text-uppercase font-semibold text-lg mb-4">
                                    Legal
                                </h6>
                                <p className='text-sm mb-2'>
                                    Privacy Policy
                                </p>
                                <p className='text-sm'>
                                    Terms and Conditions
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="text-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                    © {currentYear} Copyright:
                    <span className="text-reset font-bold"> InsightXBlog.com</span>
                </div>
            </footer>
        </div>

    )
}
