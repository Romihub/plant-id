// components/NavBar.js
import Link from 'next/link';

export default function NavBar() {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold">PlantID</Link>
        <ul className="flex space-x-4">
          <li><Link href="/" className="text-white hover:text-green-200">Home</Link></li>
          <li><Link href="/about" className="text-white hover:text-green-200">About</Link></li>
          <li><Link href="/contact" className="text-white hover:text-green-200">Contact</Link></li>
          <li><Link href="/gallery" className="text-white hover:text-green-200">Gallery</Link></li>
        </ul>
      </div>
    </nav>
  );
}