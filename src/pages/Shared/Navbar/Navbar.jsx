import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Provider/AuthProvider";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const [theme, setTheme] = useState('light');

    const handleToggle = e => {
        if (e.target.checked) {
            setTheme('dark')
        }
        else {
            setTheme('light')
        }
    }



    const handleLogOut = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    title: "Logout Successfull..!",
                    icon: "success",
                    timer: 2000,
                });
            })
            .catch();
    };

    const handleDropdownToggle = () => {
        setIsDropdownOpen((prevState) => !prevState);
    };

    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };

    const [isOpen, setIsOpen] = useState(false);
    const handleMouseEnter = () => {
        setIsOpen(true);
    };
    const handleMouseLeave = () => {
        setIsOpen(false);
    };


    const links = (
        <>
            <li className="font-semibold mr-1"><NavLink to='/'>Home</NavLink></li>
            <li className="font-semibold mr-1"><NavLink to='/allJobs'>All Jobs</NavLink></li>
            {
                user &&
                <>
                    <li className="font-semibold mr-1"><NavLink to='/appliedJobs'>Applied Jobs</NavLink></li>
                    <li className="font-semibold mr-1"><NavLink to='/addJobs'>Add A Job</NavLink></li>
                    <li className="font-semibold mr-1"><NavLink to='/myJobs'>My Jobs</NavLink></li>
                </>
            }
            <li className="font-semibold mr-1"><NavLink to='/blogs'>Blogs</NavLink></li>
        </>
    );

    return (
        <div className="navbar lg:px-[5%] shadow-xl">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden" onClick={handleDropdownToggle}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    {isDropdownOpen && (
                        <ul tabIndex={0} className="text-white menu menu-sm dropdown-content mt-3 z-[2] p-2 shadow bg-slate-700 rounded-box w-52">
                            {links}
                        </ul>
                    )}
                </div>
                <Link to="/" className="" onClick={closeDropdown}>
                    <div className="flex items-center gap-0">
                        <h1 className="text-lg lg:text-4xl font-bold text-blue-950">BD</h1>
                        <img className="rounded-lg hidden pt-2 lg:block w-24" src="https://i.ibb.co/PcR73tP/logoweb.png" alt="" />
                    </div>
                </Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>

            <div className="navbar-end space-x-5">

                {user ? (

                    <div className="flex gap-4 items-center">

                        <details
                            className="dropdown"
                            open={isOpen}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <summary className="avatar mt-1" >
                                <div className="avatar">
                                    <div className="w-14 rounded-full">
                                        <img src={user.photoURL} />
                                    </div>
                                </div>
                            </summary>

                            <div className=" -left-20 lg:-left-12 top-12 lg:top-[59px] menu dropdown-content z-[10]  bg-slate-600 rounded-lg text-white w-36 p-4 space-y-3">
                                <p>{user?.displayName}</p>
                                <div className="space-y-3">
                                    <button className="bg-slate-800 py-2 px-3 rounded-md font-semibold w-full"><Link to='/profile'>Profile</Link></button><br />
                                    <button onClick={handleLogOut} className="bg-slate-800 w-full py-2 px-3 rounded-md font-semibold">Logout</button>
                                </div>
                            </div>

                        </details>

                        <div>
                            <button onClick={handleLogOut} className="lg:text-lg font-bold nav-btn px-3 lg:px-4 py-2 rounded-xl bg-blue-900 hover:bg-blue-700 text-white">Logout</button>
                        </div>

                    </div>

                ) : (
                    <div className="lg:space-x-3 lg:flex">
                        <NavLink to="/login" onClick={closeDropdown}>
                            <button className="lg:text-lg font-bold nav-btn px-3 lg:px-4 py-2 rounded-xl bg-blue-900 hover:bg-blue-700 text-white">Login</button>
                        </NavLink>
                    </div>
                )}

                {/* theme added */}
                <label className=" cursor-pointer grid place-items-center">
                    <input onChange={handleToggle} type="checkbox" value={theme} className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2" />
                    <svg className="col-start-1 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>
                    <svg className="col-start-2 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                </label>
            </div>
        </div>
    );
};

export default Navbar;