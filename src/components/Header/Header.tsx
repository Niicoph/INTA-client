import SipanLogo from '/Sipan.png';
import { Link } from 'react-router-dom';
import { MobileMenu } from '../MobileMenu/MobileMenu';

export default function Header() {
  return (
    <header className="bg-accent shadow-sm sticky top-0 z-50 border-b border-gray-300 ">
      <div className="flex items-center justify-between px-4 md:px-8 py-2">
        <Link to="/" className="flex items-center space-x-4">
          <img src={SipanLogo} alt="Sipan Logo" className="h-12 w-auto" />
        </Link>
        <nav className="hidden lg:flex items-center gap-6">
          <Link to="/" className="gilroy-semibold text-[#4A4A4A]" data-discover="true">
            Home
          </Link>
          <Link to="/quienes-somos" className="gilroy-semibold text-[#4A4A4A]">
            Quiénes Somos
          </Link>
          <Link to="/unidades" className="gilroy-semibold text-[#4A4A4A]">
            Unidades
          </Link>
          <Link to="/modulos" className="gilroy-semibold text-[#4A4A4A]">
            Módulos
          </Link>
        </nav>
        <MobileMenu/>
      </div>
    </header>
  );
}
