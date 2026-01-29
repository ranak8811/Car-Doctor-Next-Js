
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="text-center flex flex-col items-center justify-center min-h-[80vh] space-y-6">
            <h1 className="text-4xl font-bold text-[#FF3811]">404</h1>
            <h2 className="text-2xl font-bold">Oops! Page Not Found</h2>
            <p className="text-gray-500">The page you are looking for might have been removed, had its name changed or is temporarily unavailable.</p>

            <div className="relative w-full max-w-md h-64">
                {/* You can add a specific 404 image here if you have one, otherwise using a generic or logo */}
                <Image
                    src="/assets/logo.svg"
                    alt="404 Illustration"
                    fill
                    className="object-contain opacity-20"
                />
            </div>

            <Link href="/" className="btn btn-primary bg-[#FF3811] border-none text-white hover:bg-[#d02e0e]">
                Back to Home
            </Link>
        </div>
    );
}
