import { useEffect } from "react";

const Blogs = () => {

    useEffect(() => {
        document.title = 'Blogs';
    }, []);


    return (
        <div className="mb-20">
            <div>
                <img className="w-full lg:h-[430px]" src="https://i.ibb.co/sK8sJ05/photo-1592609931041-40265b692757-q-80-w-2070-auto-format-fit-crop-ixlib-rb-4-0.jpg" alt="" />
            </div>

            <h1 className="px-6 lg:px-0 lg:pl-28 pb-5 mt-10 text-xl font-semibold">Written and researched by :</h1>

            <div className="px-6 lg:px-28  lg:flex  lg:gap-20">
                {/* col 1 */}
                <div className="space-y-4 mb-8 lg:mb-0">
                    <div className="flex items-center gap-4">
                        <div className="avatar online">
                            <div className="w-16 rounded-full">
                                <img src="https://lh3.googleusercontent.com/a/ACg8ocIk67MbKPI98OB4WtZ4Fy_Ewpt5MhcJ6Wf8x1krQtB9-yJEkLRE=s96-c" />
                            </div>
                        </div>
                        <div className="font-semibold">
                            <h1>Ashikur Rahaman</h1>
                            <h1>ashik.iuict@gmail.com</h1>
                        </div>
                    </div>

                </div>

                {/* col2 */}
                <div>

                    <div className="mb-10">
                        <h1 className="text-xl font-semibold pb-3">- What is an access token and refresh token?</h1>
                        <p>
                            An <span className="font-bold">access token</span> is a credential used to access protected resources on behalf of a user. It's typically short-lived and grants access to specific resources or services. A <span className="font-bold">refresh token</span> is a longer-lived credential used to obtain new access tokens once they expire, without requiring the user to reauthenticate.
                        </p>
                    </div>

                    <div className="mb-10">
                        <h1 className="text-xl font-semibold pb-3">- What is express js?</h1>
                        <p>
                            <span className="font-bold">Express.js</span> is a popular web application framework for Node.js. It simplifies the process of building web applications and APIs by providing a robust set of features and middleware, making it efficient and flexible for developers
                        </p>
                    </div>

                    <div className="mb-10">
                        <h1 className="text-xl font-semibold pb-3">- What is Nest JS?</h1>
                        <p>
                            <span className="font-bold">Nest JS</span> is a progressive Node.js framework for building efficient, reliable, and scalable server-side applications. It uses TypeScript and is heavily inspired by Angular's architecture, making it easy to maintain and test applications
                        </p>
                    </div>

                    <div className="mb-10">
                        <h1 className="text-xl font-semibold pb-3">- Technology used to build in this website</h1>
                        <div className="space-y-2">
                            <p>
                                <span className="font-bold">1. HTML (HyperText Markup Language):</span> Provides the structure and content of web pages.
                            </p>

                            <p>
                                <span className="font-bold">2. CSS Tailwind:</span> A utility-first CSS framework that helps in rapidly building custom designs without writing CSS from scratch.
                            </p>

                            <p>
                                <span className="font-bold">3. React:</span> A JavaScript library for building user interfaces, enabling the creation of interactive components and managing the state of the application efficiently.
                            </p>

                            <p>
                                <span className="font-bold">4. MongoDB:</span> A NoSQL database used for storing and managing data in a flexible, scalable, and JSON-like format, commonly used in web applications.
                            </p>


                            <p>
                                <span className="font-bold">5. Firebase:</span> A platform developed by Google that provides various services for building web and mobile applications, including authentication, hosting, real-time database, and cloud functions.
                            </p>

                            <p>
                                <span className="font-bold">6. React Packages:</span> Additional libraries and packages for React that provide specific functionalities or utilities, enhancing the development process and improving the user experience.
                            </p>
                        </div>
                    </div>


                </div>
            </div>

        </div>
    );
};

export default Blogs;