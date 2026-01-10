import { Link, useLocation } from 'react-router-dom';
import { FaTimesCircle } from 'react-icons/fa';

const Cancel = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const redirectUrl = queryParams.get('redirect') || '/dashboard';

    return (
        <div className="min-h-[60vh] flex items-center justify-center bg-base-100">
            <div className="text-center space-y-6 max-w-md p-8 rounded-3xl border border-error/20 bg-error/5 shadow-xl">
                <FaTimesCircle className="text-7xl text-error mx-auto" />
                <h1 className="text-4xl font-black text-error">Payment Cancelled</h1>
                <p className="text-base-content/70 text-lg">
                    The payment process was cancelled. No charges were made. If you encountered an issue, feel free to try again or contact support.
                </p>
                <div className="pt-4 flex flex-col gap-3">
                    <Link to="/payment" className="btn btn-primary btn-block rounded-2xl">
                        Try Again
                    </Link>
                    <Link to={redirectUrl} className="btn btn-ghost btn-block rounded-2xl">
                        Go Back to Previous Screen
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cancel;
