import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-base-100 text-center p-8 relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-1/4 left-1/4 -z-10 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 -z-10 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] animate-pulse delay-700"></div>

            <div className="max-w-md space-y-10 animate-in fade-in zoom-in duration-700">
                <div className="relative">
                    <h1 className="text-[180px] font-black leading-none bg-clip-text text-transparent bg-gradient-to-br from-primary via-secondary to-accent animate-gradient-x select-none opacity-20">
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-8xl">🧩</div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-5xl font-black tracking-tightest">LOST IN TIME</h2>
                    <p className="text-xl text-base-content/50 font-medium italic leading-relaxed">
                        This specific fragment of wisdom has either been archived or never existed in our collective consciousness.
                    </p>
                </div>

                <div className="pt-8">
                    <Link to="/" className="btn btn-primary btn-lg rounded-[2rem] px-16 font-black text-xl shadow-2xl shadow-primary/30 h-[72px] hover:scale-105 transition-transform border-none">
                        RETURN TO REALITY
                    </Link>
                </div>

                <p className="pt-10 text-[10px] uppercase font-black tracking-[0.5em] opacity-30">
                    Digital Life Lessons &copy; {new Date().getFullYear()}
                </p>
            </div>
        </div>
    );
};

export default ErrorPage;
