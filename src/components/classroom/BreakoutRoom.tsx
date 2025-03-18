import React, { useState } from 'react';
import { FaUsers, FaRandom, FaTimes } from 'react-icons/fa';

interface Room {
  id: string;
  name: string;
  participants: Participant[];
}

interface BreakoutRoomProps {
  participants: Participant[];
  onClose: () => void;
  onCreateRooms: (rooms: Room[]) => void;
}

const BreakoutRoom = ({ participants, onClose, onCreateRooms }: BreakoutRoomProps) => {
  const [roomCount, setRoomCount] = useState(2);
  const [timeLimit, setTimeLimit] = useState(15);
  const [assignmentType, setAssignmentType] = useState<'manual' | 'random'>('random');

  const createRooms = () => {
    const rooms: Room[] = Array.from({ length: roomCount }, (_, i) => ({
      id: `room-${i + 1}`,
      name: `Room ${i + 1}`,
      participants: []
    }));

    if (assignmentType === 'random') {
      const shuffled = [...participants].sort(() => Math.random() - 0.5);
      shuffled.forEach((participant, index) => {
        const roomIndex = index % roomCount;
        rooms[roomIndex].participants.push(participant);
      });
    }

    onCreateRooms(rooms);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-[500px]">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold">Create Breakout Rooms</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Rooms
            </label>
            <input
              type="number"
              min="2"
              max="10"
              value={roomCount}
              onChange={(e) => setRoomCount(parseInt(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time Limit (minutes)
            </label>
            <input
              type="number"
              min="5"
              max="60"
              value={timeLimit}
              onChange={(e) => setTimeLimit(parseInt(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assignment Type
            </label>
            <div className="flex space-x-4">
              <button
                onClick={() => setAssignmentType('random')}
                className={`flex items-center px-4 py-2 rounded ${
                  assignmentType === 'random'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100'
                }`}
              >
                <FaRandom className="mr-2" /> Random
              </button>
              <button
                onClick={() => setAssignmentType('manual')}
                className={`flex items-center px-4 py-2 rounded ${
                  assignmentType === 'manual'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100'
                }`}
              >
                <FaUsers className="mr-2" /> Manual
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 border-t">
          <button
            onClick={createRooms}
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Create Rooms
          </button>
        </div>
      </div>
    </div>
  );
};

export default BreakoutRoom;