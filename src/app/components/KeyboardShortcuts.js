'use client';

import { useEffect, useState, useCallback } from 'react';
import { 
  FiCommand, 
  FiX, 
  FiSearch, 
  FiFilter,
  FiUpload,
  FiGrid,
  FiList,
  FiPlus,
  FiRefreshCw,
  FiSettings,
  FiHelpCircle
} from 'react-icons/fi';

// Keyboard shortcut definitions
const SHORTCUTS = {
  // Global shortcuts
  'cmd+k': { description: 'Open command palette', category: 'Global' },
  'cmd+/': { description: 'Show keyboard shortcuts', category: 'Global' },
  'esc': { description: 'Close modals/panels', category: 'Global' },
  
  // Navigation
  'cmd+1': { description: 'Go to Users', category: 'Navigation' },
  'cmd+2': { description: 'Go to Assets', category: 'Navigation' },
  'cmd+3': { description: 'Go to Analytics', category: 'Navigation' },
  'cmd+4': { description: 'Go to Settings', category: 'Navigation' },
  
  // Asset Management
  'cmd+u': { description: 'Upload assets', category: 'Assets' },
  'cmd+f': { description: 'Focus search', category: 'Assets' },
  'cmd+shift+f': { description: 'Advanced filters', category: 'Assets' },
  'cmd+g': { description: 'Toggle grid/list view', category: 'Assets' },
  'cmd+a': { description: 'Select all assets', category: 'Assets' },
  'cmd+shift+a': { description: 'Deselect all assets', category: 'Assets' },
  'cmd+r': { description: 'Refresh assets', category: 'Assets' },
  
  // Actions
  'cmd+enter': { description: 'Confirm action', category: 'Actions' },
  'cmd+backspace': { description: 'Delete selected', category: 'Actions' },
  'cmd+shift+enter': { description: 'Bulk approve', category: 'Actions' },
  
  // Quick actions
  'j': { description: 'Next item', category: 'Navigation' },
  'k': { description: 'Previous item', category: 'Navigation' },
  'space': { description: 'Select/deselect item', category: 'Actions' },
  'enter': { description: 'Open item', category: 'Actions' }
};

// Command palette items
const COMMANDS = [
  { id: 'upload', label: 'Upload Assets', icon: FiUpload, shortcut: 'Cmd+U' },
  { id: 'search', label: 'Search Assets', icon: FiSearch, shortcut: 'Cmd+F' },
  { id: 'filters', label: 'Advanced Filters', icon: FiFilter, shortcut: 'Cmd+Shift+F' },
  { id: 'grid-view', label: 'Grid View', icon: FiGrid, shortcut: 'Cmd+G' },
  { id: 'list-view', label: 'List View', icon: FiList, shortcut: 'Cmd+G' },
  { id: 'select-all', label: 'Select All', icon: FiPlus, shortcut: 'Cmd+A' },
  { id: 'refresh', label: 'Refresh', icon: FiRefreshCw, shortcut: 'Cmd+R' },
  { id: 'settings', label: 'Settings', icon: FiSettings, shortcut: 'Cmd+4' },
];

// Keyboard Shortcuts Help Modal
export const KeyboardShortcutsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const categories = [...new Set(Object.values(SHORTCUTS).map(s => s.category))];

  const formatShortcut = (shortcut) => {
    return shortcut
      .replace('cmd', '⌘')
      .replace('shift', '⇧')
      .replace('enter', '↵')
      .replace('backspace', '⌫')
      .replace('esc', '⎋')
      .split('+')
      .map(key => key.charAt(0).toUpperCase() + key.slice(1))
      .join(' + ');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <FiHelpCircle className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Keyboard Shortcuts</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiX className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-96">
          <div className="space-y-6">
            {categories.map(category => (
              <div key={category}>
                <h4 className="text-sm font-semibold text-gray-900 mb-3">{category}</h4>
                <div className="space-y-2">
                  {Object.entries(SHORTCUTS)
                    .filter(([_, shortcut]) => shortcut.category === category)
                    .map(([key, shortcut]) => (
                      <div key={key} className="flex items-center justify-between py-2">
                        <span className="text-sm text-gray-700">{shortcut.description}</span>
                        <kbd className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded font-mono">
                          {formatShortcut(key)}
                        </kbd>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <p className="text-xs text-gray-500 text-center">
            Press <kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs">⌘ + /</kbd> anytime to show this help
          </p>
        </div>
      </div>
    </div>
  );
};

// Command Palette Component
export const CommandPalette = ({ isOpen, onClose, onCommand }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredCommands = COMMANDS.filter(command =>
    command.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setSearchQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => Math.min(prev + 1, filteredCommands.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => Math.max(prev - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (filteredCommands[selectedIndex]) {
            onCommand(filteredCommands[selectedIndex].id);
            onClose();
          }
          break;
        case 'Escape':
          onClose();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onCommand, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center pt-32 z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search commands..."
              className="w-full pl-10 pr-4 py-2 text-black border-0 focus:ring-0 focus:outline-none text-lg"
              autoFocus
            />
          </div>
        </div>

        <div className="max-h-64 overflow-y-auto">
          {filteredCommands.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              No commands found
            </div>
          ) : (
            filteredCommands.map((command, index) => {
              const Icon = command.icon;
              return (
                <button
                  key={command.id}
                  onClick={() => {
                    onCommand(command.id);
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                    index === selectedIndex ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-900">{command.label}</span>
                  </div>
                  <kbd className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded font-mono">
                    {command.shortcut}
                  </kbd>
                </button>
              );
            })
          )}
        </div>

        <div className="p-3 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-4">
              <span>↑↓ Navigate</span>
              <span>↵ Select</span>
              <span>⎋ Close</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Keyboard Shortcuts Hook
export const useKeyboardShortcuts = (handlers = {}) => {
  const [showHelp, setShowHelp] = useState(false);
  const [showCommandPalette, setShowCommandPalette] = useState(false);

  const handleKeyDown = useCallback((e) => {
    // Don't trigger shortcuts when typing in inputs
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
      // Allow Escape to blur inputs
      if (e.key === 'Escape') {
        e.target.blur();
      }
      return;
    }

    const key = [];
    if (e.metaKey || e.ctrlKey) key.push('cmd');
    if (e.shiftKey) key.push('shift');
    key.push(e.key.toLowerCase());
    
    const shortcut = key.join('+');

    // Handle built-in shortcuts
    switch (shortcut) {
      case 'cmd+/':
        e.preventDefault();
        setShowHelp(true);
        break;
      case 'cmd+k':
        e.preventDefault();
        setShowCommandPalette(true);
        break;
      case 'escape':
        e.preventDefault();
        setShowHelp(false);
        setShowCommandPalette(false);
        if (handlers.onEscape) handlers.onEscape();
        break;
      default:
        // Handle custom shortcuts
        if (handlers[shortcut]) {
          e.preventDefault();
          handlers[shortcut](e);
        }
        break;
    }
  }, [handlers]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleCommand = useCallback((commandId) => {
    if (handlers.onCommand) {
      handlers.onCommand(commandId);
    }
  }, [handlers]);

  return {
    showHelp,
    setShowHelp,
    showCommandPalette,
    setShowCommandPalette,
    handleCommand
  };
};

// Keyboard Shortcuts Provider Component
export const KeyboardShortcutsProvider = ({ children, handlers = {} }) => {
  const {
    showHelp,
    setShowHelp,
    showCommandPalette,
    setShowCommandPalette,
    handleCommand
  } = useKeyboardShortcuts(handlers);

  return (
    <>
      {children}
      <KeyboardShortcutsModal
        isOpen={showHelp}
        onClose={() => setShowHelp(false)}
      />
      <CommandPalette
        isOpen={showCommandPalette}
        onClose={() => setShowCommandPalette(false)}
        onCommand={handleCommand}
      />
    </>
  );
};

// Keyboard shortcut indicator component
export const ShortcutIndicator = ({ shortcut, className = '' }) => {
  const formatShortcut = (shortcut) => {
    return shortcut
      .replace('cmd', '⌘')
      .replace('shift', '⇧')
      .replace('enter', '↵')
      .replace('backspace', '⌫')
      .replace('esc', '⎋')
      .split('+')
      .map(key => key.charAt(0).toUpperCase() + key.slice(1))
      .join(' + ');
  };

  return (
    <kbd className={`px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded font-mono ${className}`}>
      {formatShortcut(shortcut)}
    </kbd>
  );
};

export default {
  KeyboardShortcutsModal,
  CommandPalette,
  useKeyboardShortcuts,
  KeyboardShortcutsProvider,
  ShortcutIndicator,
  SHORTCUTS,
  COMMANDS
};
