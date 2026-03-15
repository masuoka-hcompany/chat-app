import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";

export type AvailableRoomListProps = {
  rooms: Array<{
    id: string;
    name: string;
  }>;
};

export function AvailableRoomList({ rooms }: AvailableRoomListProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="block mx-auto mt-4 mb-2 px-12 bg-gray-150 text-gray-700 hover:bg-gray-200 font-medium flex items-center justify-center gap-2 rounded-md"
          variant="outline"
        >
          <span className="text-lg font-bold">+</span>
          <span>参加可能なルーム</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>参加可能なルーム</DialogTitle>
        <div>
          {rooms.length === 0 ? (
            <div className="text-gray-400">参加可能なルームはありません</div>
          ) : (
            <ul className="space-y-2">
              {rooms.map((room) => (
                <li
                  key={room.id}
                  className="p-2 rounded hover:bg-gray-100 cursor-pointer"
                >
                  # {room.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
