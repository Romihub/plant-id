// app/layout.js
import './globals.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

export const metadata = {
  title: 'PlantID - Identify and Learn About Plants',
  description: 'Upload plant images and get instant identification and care instructions.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <NavBar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}