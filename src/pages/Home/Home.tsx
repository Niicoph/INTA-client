import { Link } from 'react-router-dom';
import { router } from '@/routes/RouterApp';

export default function Home() {
  return (
    <div>
      <Link to={router.calculator} className="text-blue-500 hover:underline">
        Calculadora
      </Link>
    </div>
  );
}
