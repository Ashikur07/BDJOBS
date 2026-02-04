import { useEffect } from "react";
import { motion } from "framer-motion";
import { FaBookOpen, FaCode, FaServer, FaLayerGroup } from "react-icons/fa";

const Blogs = () => {
    useEffect(() => {
        document.title = 'Career Insights & Tech Blogs | JobHunter';
        window.scrollTo(0, 0);
    }, []);

    const blogContent = [
        {
            icon: <FaBookOpen className="text-indigo-500" />,
            title: "Access Token vs Refresh Token",
            desc: "An access token is a short-lived credential used to access protected resources. A refresh token is a longer-lived credential used to obtain new access tokens once they expire, ensuring a seamless user experience without frequent logins."
        },
        {
            icon: <FaCode className="text-indigo-500" />,
            title: "What is Express.js?",
            desc: "Express.js is a minimalist web framework for Node.js. It simplifies building APIs and web applications by providing robust features like routing and middleware, making it the industry standard for backend development."
        },
        {
            icon: <FaServer className="text-indigo-500" />,
            title: "The Power of NestJS",
            desc: "NestJS is a progressive Node.js framework for building scalable server-side applications. Heavily inspired by Angular, it uses TypeScript and follows a modular architecture for better maintainability and testing."
        }
    ];

    const techStack = [
        { name: "HTML5", desc: "Semantic structure & modern web standards." },
        { name: "Tailwind CSS", desc: "Utility-first styling for rapid UI development." },
        { name: "React.js", desc: "Component-based library for interactive interfaces." },
        { name: "MongoDB", desc: "NoSQL database for flexible & scalable data storage." },
        { name: "Firebase", desc: "Real-time authentication & hosting services." },
        { name: "React Ecosystem", desc: "Framer Motion, React Icons & more for UX." }
    ];

    return (
        <div className="min-h-screen pt-28 pb-20 bg-base-100 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
                
                {/* Hero Banner Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative rounded-[2.5rem] overflow-hidden h-[300px] md:h-[450px] shadow-2xl mb-16"
                >
                    <img className="w-full h-full object-cover" src="https://i.ibb.co/sK8sJ05/photo-1592609931041-40265b692757-q-80-w-2070-auto-format-fit-crop-ixlib-rb-4-0.jpg" alt="blog banner" />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent flex items-center p-8 md:p-16">
                        <div className="max-w-xl space-y-4">
                            <span className="badge badge-primary font-bold px-4 py-3 uppercase tracking-widest text-xs">Knowledge Base</span>
                            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">Mastering Modern <br /><span className="text-indigo-400">Web Technologies</span></h1>
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                    
                    {/* Sidebar: Author Info */}
                    <aside className="lg:col-span-4 space-y-8">
                        <div className="bg-base-200/50 p-8 rounded-[2rem] border border-base-200 sticky top-28">
                            <h2 className="text-sm font-black uppercase tracking-[0.2em] opacity-40 mb-6">Published By</h2>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="avatar online">
                                    <div className="w-16 h-16 rounded-2xl ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img src="https://lh3.googleusercontent.com/a/ACg8ocIk67MbKPI98OB4WtZ4Fy_Ewpt5MhcJ6Wf8x1krQtB9-yJEkLRE=s96-c" alt="author" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">Ashikur Rahaman</h3>
                                    <p className="text-xs opacity-60 font-medium">ashik.iuict@gmail.com</p>
                                </div>
                            </div>
                            <p className="text-sm opacity-70 leading-relaxed italic">
                                "Passionate about building scalable web applications and sharing technical knowledge with the developer community."
                            </p>
                        </div>
                    </aside>

                    {/* Main Content: Blog Articles */}
                    <main className="lg:col-span-8 space-y-16">
                        
                        {/* Articles Grid */}
                        <div className="space-y-12">
                            {blogContent.map((blog, idx) => (
                                <motion.article 
                                    key={idx}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="group"
                                >
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="p-3 bg-indigo-500/10 rounded-xl">
                                            {blog.icon}
                                        </div>
                                        <h2 className="text-2xl md:text-3xl font-black group-hover:text-primary transition-colors">{blog.title}</h2>
                                    </div>
                                    <p className="text-base-content/70 text-lg leading-relaxed pl-14">
                                        {blog.desc}
                                    </p>
                                </motion.article>
                            ))}
                        </div>

                        {/* Tech Stack Section */}
                        <section className="bg-base-200/30 p-8 md:p-12 rounded-[2.5rem] border border-base-200">
                            <div className="flex items-center gap-4 mb-8">
                                <FaLayerGroup className="text-3xl text-primary" />
                                <h2 className="text-3xl font-black">Project Tech Stack</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {techStack.map((tech, idx) => (
                                    <div key={idx} className="flex gap-4 p-4 hover:bg-base-100 rounded-2xl transition-all border border-transparent hover:border-base-200 group">
                                        <div className="font-black text-2xl opacity-10 group-hover:opacity-40 transition-opacity">0{idx + 1}</div>
                                        <div>
                                            <h4 className="font-bold text-lg">{tech.name}</h4>
                                            <p className="text-sm opacity-60">{tech.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                    </main>
                </div>
            </div>
        </div>
    );
};

export default Blogs;