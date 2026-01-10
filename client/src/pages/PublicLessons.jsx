import { useState, useEffect } from 'react';
import axios from 'axios';
import LessonCard from '../components/LessonCard';
import { FaSearch } from 'react-icons/fa';

const PublicLessons = () => {
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({
        search: '',
        category: '',
        emotionalTone: '',
    });
    const [totalPages, setTotalPages] = useState(1);

    const fetchLessons = async () => {
        setLoading(true);
        try {
            const query = new URLSearchParams({
                page,
                limit: 9,
                ...filters
            }).toString();

            const res = await axios.get(`${import.meta.env.VITE_API_URL}/lessons?${query}`);
            setLessons(res.data.lessons);
            setTotalPages(res.data.totalPages);
        } catch (error) {
            console.error("Error fetching lessons", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLessons();
    }, [page, filters.category, filters.emotionalTone, filters.search]); // Refetch on any filter or page change

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1);
        // fetchLessons() is now handled by the useEffect dependency on page=1 and filters.search
    };

    return (
        <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
            <div className="text-center mb-20 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-64 h-64 bg-primary/20 rounded-full blur-[100px]"></div>
                <h1 className="text-6xl lg:text-8xl font-black mb-6 tracking-tightest">
                    Digital Life <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">Lessons</span>
                </h1>
                <p className="text-xl text-base-content/50 max-w-2xl mx-auto font-medium leading-relaxed">
                    Explore centuries of collective human experience, distilled into actionable insights for the modern seeker.
                </p>
            </div>

            {/* Filters Section */}
            <div className="bg-base-100/40 backdrop-blur-2xl shadow-2xl border border-base-200/50 rounded-[2.5rem] p-8 mb-20 sticky top-28 z-40 transition-all duration-500 hover:shadow-primary/5 group">
                <div className="flex flex-col lg:flex-row gap-8 items-center">
                    {/* Search bar */}
                    <form onSubmit={handleSearch} className="relative w-full lg:flex-1">
                        <input
                            type="text"
                            placeholder="Explore by title, keyword, or insight..."
                            className="input h-[72px] w-full pl-16 rounded-3xl bg-base-200/30 border-none focus:ring-4 focus:ring-primary/20 transition-all font-bold text-lg placeholder:opacity-30"
                            value={filters.search}
                            onChange={(e) => {
                                setFilters({ ...filters, search: e.target.value });
                                setPage(1);
                            }}
                        />
                        <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-primary text-xl opacity-40 group-focus-within:opacity-100 transition-opacity" />
                        <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 btn btn-primary h-[54px] min-h-0 rounded-2xl px-10 font-black shadow-xl shadow-primary/20 border-none">
                            ARCHIVE SEARCH
                        </button>
                    </form>

                    {/* Selectors */}
                    <div className="flex flex-wrap gap-4 w-full lg:w-auto">
                        <div className="form-control">
                            <select
                                className="select h-[72px] rounded-3xl bg-base-200/30 border-none font-black text-xs uppercase tracking-widest px-8 focus:ring-4 focus:ring-primary/20"
                                value={filters.category}
                                onChange={(e) => {
                                    setFilters({ ...filters, category: e.target.value });
                                    setPage(1);
                                }}
                            >
                                <option value="">Universal Domain</option>
                                <option value="Personal Growth">Personal Growth</option>
                                <option value="Spirituality">Spirituality</option>
                                <option value="Relationships">Relationships</option>
                                <option value="Career">Career</option>
                                <option value="Health">Health</option>
                                <option value="Lifestyle">Lifestyle</option>
                                <option value="Travel">Travel</option>
                            </select>
                        </div>

                        <div className="form-control">
                            <select
                                className="select h-[72px] rounded-3xl bg-base-200/30 border-none font-black text-xs uppercase tracking-widest px-8 focus:ring-4 focus:ring-primary/20"
                                value={filters.emotionalTone}
                                onChange={(e) => {
                                    setFilters({ ...filters, emotionalTone: e.target.value });
                                    setPage(1);
                                }}
                            >
                                <option value="">Every Tone</option>
                                <option value="Inspirational">Inspirational</option>
                                <option value="Reflective">Reflective</option>
                                <option value="Happy">Happy</option>
                                <option value="Sad">Sad</option>
                                <option value="Regretful">Regretful</option>
                                <option value="Humorous">Humorous</option>
                                <option value="Motivational">Motivational</option>
                                <option value="Serious">Serious</option>
                                <option value="Calm">Calm</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Grid */}
            {loading ? (
                <div className="flex flex-col items-center justify-center min-h-[500px] gap-8">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-primary font-black tracking-widest uppercase">Deciphering Archive...</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {lessons.length > 0 ? (
                            lessons.map(lesson => (
                                <div key={lesson._id} className="animate-in fade-in zoom-in duration-700">
                                    <LessonCard lesson={lesson} />
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full flex flex-col items-center justify-center py-32 text-center animate-in fade-in duration-1000">
                                <span className="text-9xl mb-10 filter grayscale opacity-20">🕯️</span>
                                <h3 className="text-4xl font-black mb-4 tracking-tight">The flame flickers...</h3>
                                <p className="text-xl text-base-content/40 max-w-md font-medium">No wisdom was found in this corner of the archive. Perhaps adjust your filters to light the way.</p>
                                <button
                                    onClick={() => {
                                        setFilters({ search: '', category: '', emotionalTone: '' });
                                        setPage(1);
                                    }}
                                    className="btn btn-primary btn-outline mt-10 rounded-2xl px-12 border-2 font-black"
                                >
                                    RESET ARCHIVE FILTERS
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center mt-24">
                            <div className="join shadow-2xl rounded-[2rem] overflow-hidden border border-base-200 p-1 bg-base-100">
                                <button
                                    className="join-item btn btn-lg bg-base-100 hover:btn-primary border-none rounded-[1.5rem] px-8"
                                    disabled={page === 1}
                                    onClick={() => {
                                        setPage(prev => Math.max(1, prev - 1));
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                >
                                    BACK
                                </button>
                                <div className="join-item btn btn-lg bg-base-200/50 pointer-events-none font-black min-w-[140px] border-none mx-1 rounded-[1.5rem]">
                                    {page} / {totalPages}
                                </div>
                                <button
                                    className="join-item btn btn-lg bg-base-100 hover:btn-primary border-none rounded-[1.5rem] px-8"
                                    disabled={page >= totalPages}
                                    onClick={() => {
                                        setPage(prev => prev + 1);
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                >
                                    NEXT
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default PublicLessons;
