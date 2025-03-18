import React, { useState } from 'react';
import { FaTimes, FaChartBar } from 'react-icons/fa';

interface PollOption {
  id: string;
  text: string;
  votes: number;
}

interface PollProps {
  onClose: () => void;
  isHost: boolean;
}

const Poll = ({ onClose, isHost }: PollProps) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState<PollOption[]>([
    { id: '1', text: '', votes: 0 },
    { id: '2', text: '', votes: 0 }
  ]);
  const [isLive, setIsLive] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const addOption = () => {
    setOptions([...options, { id: String(options.length + 1), text: '', votes: 0 }]);
  };

  const updateOption = (id: string, text: string) => {
    setOptions(options.map(opt => opt.id === id ? { ...opt, text } : opt));
  };

  const startPoll = () => {
    setIsLive(true);
    // Emit poll start event
  };

  const vote = (optionId: string) => {
    setSelectedOption(optionId);
    // Emit vote event
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-[500px]">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold">
            {isHost ? 'Create Poll' : 'Current Poll'}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes />
          </button>
        </div>

        <div className="p-6">
          {isHost && !isLive ? (
            <>
              <input
                type="text"
                placeholder="Enter your question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full p-2 border rounded mb-4"
              />
              {options.map((option) => (
                <input
                  key={option.id}
                  type="text"
                  placeholder={`Option ${option.id}`}
                  value={option.text}
                  onChange={(e) => updateOption(option.id, e.target.value)}
                  className="w-full p-2 border rounded mb-2"
                />
              ))}
              <button
                onClick={addOption}
                className="text-blue-600 hover:text-blue-700 mt-2"
              >
                + Add Option
              </button>
            </>
          ) : (
            <>
              <h4 className="text-lg font-medium mb-4">{question}</h4>
              <div className="space-y-2">
                {options.map((option) => (
                  <div key={option.id} className="relative">
                    <button
                      onClick={() => vote(option.id)}
                      disabled={!!selectedOption}
                      className={`w-full p-3 text-left rounded ${
                        selectedOption === option.id
                          ? 'bg-blue-100 border-blue-500'
                          : 'border hover:border-blue-500'
                      }`}
                    >
                      {option.text}
                    </button>
                    {isLive && (
                      <div
                        className="absolute top-0 left-0 h-full bg-blue-100 opacity-20"
                        style={{
                          width: `${(option.votes / Math.max(...options.map(o => o.votes))) * 100}%`
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {isHost && !isLive && (
          <div className="p-4 border-t">
            <button
              onClick={startPoll}
              disabled={!question || options.some(opt => !opt.text)}
              className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              Start Poll
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Poll;