import Link from "next/link";

export function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between py-6 ">
        <div className="flex items-center gap-8 ">
            <Link href="/" className="text-2xl font-bold">
                <h1 className="text-3xl font-bold">
                Next
                <span className="text-blue-500">Pro</span>
            </h1>
            </Link>
            
            <div className="flex items-center gap-2">

                <Link href="/" className="text-gray-600 hover:text-gray-900">
                    Home
                </Link>

                <Link href="/blog" className="text-gray-600 hover:text-gray-900">
                    Blog
                </Link>

                <Link href="/create" className="text-gray-600 hover:text-gray-900">
                    Create
                </Link>
            </div>
        </div>

        <div className="flex items-center gap-2">
                <Link href="/auth/signin" className="flex items-center gap-2">
                    Sign In
                </Link>

                <Link href="/login" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Log In
                </Link>
        </div>

    </nav>
  );
}
