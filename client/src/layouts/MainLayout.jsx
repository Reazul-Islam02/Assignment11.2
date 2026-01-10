import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = () => {
    const location = useLocation();
    // Check if current route is exactly 404 (handled by routing logic usually, 
    // but if we use a specific 404 route path like "/404" or wildcards that render MainLayout, 
    // we need to be careful. Ideally 404 shouldn't be wrapped by MainLayout if we want no header/footer,
    // OR MainLayout conditionally renders them.
    // For now assuming 404 page might be a separate route outside MainLayout or we conditionally render.)

    // Better approach: MainLayout wraps all standard pages. 404 page is outside MainLayout in routing.

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
