import { Link } from 'react-router-dom';
import LessonCard from '../components/LessonCard';

const Home = () => {
    const featuredLessons = [
        {
            _id: '1',
            title: 'The Art of Minimalist Living',
            description: 'How reducing clutter transformed my mental space and bringing peace to my daily life.',
            imageURL: 'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?q=80&w=1742&auto=format&fit=crop',
            category: 'Lifestyle',
            creatorName: 'ANM Reazul Islam',
            createdAt: new Date(),
            accessLevel: 'public'
        },
        {
            _id: '2',
            title: 'Overcoming Imposter Syndrome',
            description: 'My journey through tech and how I learned to value my own contributions.',
            imageURL: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1740&auto=format&fit=crop',
            category: 'Career',
            creatorName: 'ANM Reazul Islam',
            createdAt: new Date(),
            accessLevel: 'premium'
        },
        {
            _id: '3',
            title: 'Lessons from a Solo Traveler',
            description: 'What getting lost in 15 different countries taught me about resilience.',
            imageURL: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1746&auto=format&fit=crop',
            category: 'Travel',
            creatorName: 'ANM Reazul Islam',
            createdAt: new Date(),
            accessLevel: 'public'
        }
    ];

    return (
        <div className="flex flex-col gap-32 pb-32">
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-16 lg:pt-28">
                {/* Background Blobs */}
                <div className="absolute top-0 left-1/4 -z-10 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 -z-10 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] animate-pulse delay-700"></div>

                <div className="container mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-20 lg:gap-32">
                    <div className="flex-[1.2] text-center lg:text-left z-10">
                        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-base-200/50 backdrop-blur-md border border-base-300 shadow-sm text-primary text-sm font-black mb-10 transform hover:scale-105 transition-transform duration-300">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                            </span>
                            THE DIGITAL LIFE LESSON ARCHIVE
                        </div>
                        <h1 className="text-7xl lg:text-[100px] font-black leading-[0.9] mb-10 tracking-tightest">
                            Preserve Your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent animate-gradient-x">
                                Life Lessons
                            </span>
                        </h1>
                        <p className="text-2xl text-base-content/60 leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-14 font-medium italic underline decoration-primary/20 decoration-2 underline-offset-8">
                            Every scar tells a story, and every story carries a lesson. Join the world's premier platform for sharing authentic human wisdom.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                            <Link
                                to="/lessons"
                                className="btn btn-primary btn-lg rounded-3xl h-[72px] shadow-2xl shadow-primary/40 px-12 border-none group transform hover:-translate-y-1 active:translate-y-0 transition-all duration-300"
                            >
                                <span className="text-white font-black text-xl flex items-center gap-3">
                                    Explore Archive
                                    <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                                </span>
                            </Link>
                            <Link
                                to="/register"
                                className="btn btn-outline btn-lg rounded-3xl h-[72px] px-12 border-2 border-base-content/10 hover:border-primary hover:bg-primary/5 hover:text-primary transform hover:-translate-y-1 active:translate-y-0 transition-all duration-300"
                            >
                                <span className="font-black text-xl">Join the Collective</span>
                            </Link>
                        </div>

                        <div className="mt-20 flex items-center justify-center lg:justify-start gap-12">
                            <div className="flex flex-col">
                                <span className="text-4xl font-black text-base-content">50k+</span>
                                <span className="text-[10px] uppercase font-black tracking-widest text-primary/60">Lessons Shared</span>
                            </div>
                            <div className="w-[1px] h-12 bg-base-content/10"></div>
                            <div className="flex flex-col">
                                <span className="text-4xl font-black text-base-content">120k</span>
                                <span className="text-[10px] uppercase font-black tracking-widest text-secondary/60">Guardians of Wisdom</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 relative group perspective-1000">
                        <div className="absolute -inset-10 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-[4rem] blur-[80px] group-hover:blur-[100px] transition-all duration-1000 opacity-60"></div>
                        <div className="relative rounded-[3.5rem] overflow-hidden shadow-3xl border-[12px] border-base-100 transform rotate-3 scale-105 group-hover:rotate-0 group-hover:scale-110 transition-all duration-[1500ms] shadow-primary/20">
                            <img
                                src="https://images.unsplash.com/photo-1544928147-79a2dbc1f389?q=80&w=2070&auto=format&fit=crop"
                                className="w-full h-[650px] object-cover"
                                alt="Wisdom Hub"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex items-end p-12">
                                <div className="text-white max-w-sm">
                                    <div className="w-12 h-1 bg-primary mb-6"></div>
                                    <p className="text-2xl font-black italic leading-tight mb-4">"Our lives are not our own. From womb to tomb, we are bound to others, past and present."</p>
                                    <p className="font-bold text-sm tracking-widest uppercase text-primary">— Cloud Atlas</p>
                                </div>
                            </div>
                        </div>
                        {/* Interactive floating card */}
                        <div className="absolute -bottom-10 -left-10 bg-base-100 p-6 rounded-[2.5rem] shadow-2xl border border-base-200 animate-bounce-slow hidden lg:block">
                            <div className="flex items-center gap-4">
                                <div className="avatar-group -space-x-4 rtl:space-x-reverse">
                                    <div className="avatar border-2 border-base-100">
                                        <div className="w-10"><img src="https://i.pravatar.cc/100?img=1" /></div>
                                    </div>
                                    <div className="avatar border-2 border-base-100">
                                        <div className="w-10"><img src="https://i.pravatar.cc/100?img=2" /></div>
                                    </div>
                                    <div className="avatar placeholder border-2 border-base-100">
                                        <div className="w-10 bg-neutral text-neutral-content"><span>+5</span></div>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs font-black">Join 500+ users</p>
                                    <p className="text-[10px] opacity-50 font-bold">In the last 24 hours</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Impact Section */}
            <section className="container mx-auto px-6 lg:px-12 relative">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-10">
                    <div className="max-w-3xl">
                        <div className="h-2 w-24 bg-gradient-to-r from-primary to-secondary mb-8 rounded-full"></div>
                        <h2 className="text-5xl lg:text-7xl font-black mb-10 tracking-tighter">
                            Lessons That <br />
                            <span className="text-base-content/30 italic">Change Everything</span>
                        </h2>
                        <p className="text-xl text-base-content/50 font-medium leading-relaxed">
                            These aren't just articles. They are compressed experiences, hard-won realizations, and the distilled essence of lives lived with intention.
                        </p>
                    </div>
                    <Link to="/lessons" className="group flex items-center gap-4 text-primary font-black text-lg hover:underline underline-offset-[12px] decoration-primary decoration-4 transition-all">
                        SEE FULL ARCHIVE
                        <span className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500">
                            →
                        </span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {featuredLessons.map(lesson => (
                        <LessonCard key={lesson._id} lesson={lesson} />
                    ))}
                </div>
            </section>

            {/* Philosophy Section */}
            <section className="bg-base-200/50 py-32 rounded-[5rem] mx-4 lg:mx-8">
                <div className="container mx-auto px-6 lg:px-12 text-center">
                    <h2 className="text-sm font-black text-primary tracking-[0.4em] uppercase mb-12">Our Philosophy</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
                        <div className="flex flex-col items-center">
                            <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-3xl mb-8 shadow-inner shadow-primary/20">🏛️</div>
                            <h3 className="text-2xl font-black mb-4">Preservation</h3>
                            <p className="text-base-content/60 font-medium">Digital permanence for the lessons that matter most, ensuring wisdom is never lost to time.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-20 h-20 bg-secondary/10 rounded-3xl flex items-center justify-center text-3xl mb-8 shadow-inner shadow-secondary/20">✨</div>
                            <h3 className="text-2xl font-black mb-4">Authenticity</h3>
                            <p className="text-base-content/60 font-medium">No fluff, no filters. Just raw, honest human experiences shared to uplift the collective.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-20 h-20 bg-accent/10 rounded-3xl flex items-center justify-center text-3xl mb-8 shadow-inner shadow-accent/20">🤝</div>
                            <h3 className="text-2xl font-black mb-4">Connection</h3>
                            <p className="text-base-content/60 font-medium">Bridging the gap between generations through the universal language of life lessons.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="container mx-auto px-6 lg:px-12">
                <div className="bg-primary text-primary-content rounded-[4rem] p-16 lg:p-28 text-center relative overflow-hidden shadow-3xl shadow-primary/30 group">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-1000"></div>
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 group-hover:scale-110 transition-transform duration-1000"></div>

                    <div className="relative z-10 max-w-4xl mx-auto">
                        <h2 className="text-5xl lg:text-[80px] font-black leading-none mb-10 tracking-tightest">Your wisdom is <br /> our legacy.</h2>
                        <p className="text-2xl opacity-90 mb-16 leading-relaxed font-medium">
                            Don't keep your stories to yourself. The world is waiting for your unique perspective. Join the inner circle and start your journey.
                        </p>
                        <div className="flex flex-wrap justify-center gap-8">
                            <Link to="/register" className="btn bg-white text-primary btn-lg rounded-3xl px-16 border-none shadow-2xl font-black text-xl hover:bg-white/90 transform hover:-translate-y-2 transition-all">Join Archive</Link>
                            <Link to="/login" className="btn btn-outline btn-lg border-white/40 text-white hover:bg-white/10 hover:border-white rounded-3xl px-16 font-black text-xl transform hover:-translate-y-2 transition-all">Sign In</Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
