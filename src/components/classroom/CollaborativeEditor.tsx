import React, { useState, useEffect } from 'react';
import { Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Collaboration from '@tiptap/extension-collaboration';
import CollaborationCursor from '@tiptap/extension-collaboration-cursor';
import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import { FaBold, FaItalic, FaListUl, FaListOl, FaUndo, FaRedo, FaComments, FaHistory, FaUsers } from 'react-icons/fa';
import VersionHistoryService from '../../services/VersionHistoryService';

interface EditorProps {
  documentId: string;
  userName: string;
  isInstructor: boolean;
}

interface ActiveUser {
  id: string;
  name: string;
  color: string;
  position: { from: number; to: number };
}

const CollaborativeEditor = ({ documentId, userName, isInstructor }: EditorProps) => {
  const [editor, setEditor] = useState<Editor | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [showComments, setShowComments] = useState(false);
  const [showVersions, setShowVersions] = useState(false);
  const [versions, setVersions] = useState<Version[]>([]);
  const [activeUsers, setActiveUsers] = useState<ActiveUser[]>([]);
  const versionHistoryRef = useRef<VersionHistoryService | null>(null);

  useEffect(() => {
    const ydoc = new Y.Doc();
    const provider = new WebrtcProvider(`classroom-doc-${documentId}`, ydoc);
    const type = ydoc.getText('editor');
    versionHistoryRef.current = new VersionHistoryService(ydoc);

    const userColor = '#' + Math.floor(Math.random()*16777215).toString(16);

    const newEditor = new Editor({
      extensions: [
        StarterKit,
        Collaboration.configure({
          document: ydoc,
          field: type,
        }),
        CollaborationCursor.configure({
          provider,
          user: { name: userName, color: userColor },
        }),
      ],
      content: '',
      onUpdate: ({ editor }) => {
        versionHistoryRef.current?.createSnapshot(userName);
        setVersions(versionHistoryRef.current?.getVersions() || []);
      },
    });

    provider.awareness.setLocalStateField('user', {
      name: userName,
      color: userColor,
    });

    provider.awareness.on('change', () => {
      const users: ActiveUser[] = [];
      provider.awareness.getStates().forEach((state: any) => {
        if (state.user) {
          users.push({
            id: state.user.name,
            name: state.user.name,
            color: state.user.color,
            position: state.user.position || { from: 0, to: 0 },
          });
        }
      });
      setActiveUsers(users);
    });

    setEditor(newEditor);

    return () => {
      provider.destroy();
      newEditor.destroy();
    };
  }, [documentId, userName]);

  const restoreVersion = async (versionId: string) => {
    await versionHistoryRef.current?.restoreVersion(versionId);
  };

  return (
    <div className="flex h-full">
      <div className="flex-1 bg-white rounded-lg shadow">
        <div className="border-b p-2 flex items-center space-x-2">
          <button
            onClick={() => editor?.chain().toggleBold().run()}
            className={`p-2 rounded ${editor?.isActive('bold') ? 'bg-gray-200' : ''}`}
          >
            <FaBold />
          </button>
          <button
            onClick={() => editor?.chain().toggleItalic().run()}
            className={`p-2 rounded ${editor?.isActive('italic') ? 'bg-gray-200' : ''}`}
          >
            <FaItalic />
          </button>
          <button
            onClick={() => editor?.chain().toggleBulletList().run()}
            className={`p-2 rounded ${editor?.isActive('bulletList') ? 'bg-gray-200' : ''}`}
          >
            <FaListUl />
          </button>
          <button
            onClick={() => editor?.chain().toggleOrderedList().run()}
            className={`p-2 rounded ${editor?.isActive('orderedList') ? 'bg-gray-200' : ''}`}
          >
            <FaListOl />
          </button>
          <div className="flex-1" />
          <button
            onClick={() => editor?.chain().undo().run()}
            className="p-2 rounded hover:bg-gray-100"
          >
            <FaUndo />
          </button>
          <button
            onClick={() => editor?.chain().redo().run()}
            className="p-2 rounded hover:bg-gray-100"
          >
            <FaRedo />
          </button>
          <button
            onClick={() => setShowComments(!showComments)}
            className={`p-2 rounded ${showComments ? 'bg-blue-100 text-blue-600' : ''}`}
          >
            <FaComments />
          </button>
          <button
            onClick={() => setShowVersions(!showVersions)}
            className={`p-2 rounded ${showVersions ? 'bg-blue-100 text-blue-600' : ''}`}
          >
            <FaHistory />
          </button>
          <div className="relative">
            <button
              className="p-2 rounded hover:bg-gray-100"
              title="Active Users"
            >
              <FaUsers />
              <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {activeUsers.length}
              </span>
            </button>
          </div>

          {showVersions && (
            <div className="w-80 border-l bg-gray-50">
              <div className="p-4">
                <h3 className="font-semibold mb-4">Version History</h3>
                <div className="space-y-2">
                  {versions.map(version => (
                    <div
                      key={version.id}
                      className="bg-white p-3 rounded shadow-sm hover:bg-gray-50 cursor-pointer"
                      onClick={() => restoreVersion(version.id)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{version.author}</span>
                        <span className="text-sm text-gray-500">
                          {version.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="absolute bottom-4 right-4">
            <div className="bg-white rounded-lg shadow-lg p-2">
              <h4 className="text-sm font-medium mb-2">Active Users</h4>
              <div className="space-y-1">
                {activeUsers.map(user => (
                  <div key={user.id} className="flex items-center space-x-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: user.color }}
                    />
                    <span className="text-sm">{user.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="p-4">
          <EditorContent editor={editor} />
        </div>
      </div>

      {showComments && (
        <div className="w-80 border-l bg-gray-50">
          <div className="p-4">
            <h3 className="font-semibold mb-4">Comments</h3>
            <div className="space-y-4">
              {comments.map(comment => (
                <div key={comment.id} className="bg-white p-3 rounded shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{comment.author}</span>
                    <span className="text-sm text-gray-500">
                      {comment.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-gray-700">{comment.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollaborativeEditor;