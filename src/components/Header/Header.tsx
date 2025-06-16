import SipanLogo from '/Sipan.png';

export default function Header() {
  return (
    <header className="w-full flex justify-center">
      <img src={SipanLogo} alt="Sipan Logo" className="h-10" />
    </header>
  );
}
