import { Button } from '@/components/ui/button';
//import { Pencil } from 'lucide-react';
import { SquarePen } from 'lucide-react';

interface editButtonInterface {
  onClick: () => void;
  hidden: boolean;
}

export function EditButton({ onClick, hidden }: editButtonInterface) {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={onClick}
      className=" absolute right-0.5 top-1/2 -translate-y-1/2 text-gray-500  text-lg transition-colors"
      hidden={hidden}
    >
      <SquarePen className=" w-15 h-5 text-blue-500" />
    </Button>
  );
}
