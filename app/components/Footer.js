// components/Footer.js
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-green-800 text-white p-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-2">About PlantID</h3>
          <p>PlantID is your go-to resource for identifying plants and learning about their care. Our AI-powered tool helps gardeners, nature enthusiasts, and curious minds discover the world of plants.</p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/privacy" className="hover:text-green-200">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-green-200">Terms of Service</Link></li>
            <li><Link href="/faq" className="hover:text-green-200">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">Contact Us</h3>
          <p>Email: info@plantid.com</p>
          <p>Phone: (123) 456-7890</p>
          <p>Address: 123 Green Street, Botany City, PC 12345</p>
        </div>
      </div>
      <div className="mt-8 text-center">
        <p>&copy; 2024 romihubdev.PlantID. All rights reserved.</p>
      </div>
    </footer>
  );
}