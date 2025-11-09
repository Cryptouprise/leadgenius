import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Kbd } from "@/components/ui/kbd";
import { Command, Search, Plus, HelpCircle } from "lucide-react";

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const shortcuts = [
  {
    category: "Navigation",
    items: [
      {
        keys: ["Ctrl", "K"],
        description: "Open command palette",
        icon: <Command className="h-4 w-4" />,
      },
      {
        keys: ["/"],
        description: "Focus search",
        icon: <Search className="h-4 w-4" />,
      },
    ],
  },
  {
    category: "Actions",
    items: [
      {
        keys: ["Ctrl", "N"],
        description: "Create new lead",
        icon: <Plus className="h-4 w-4" />,
      },
    ],
  },
  {
    category: "Help",
    items: [
      {
        keys: ["?"],
        description: "Show keyboard shortcuts",
        icon: <HelpCircle className="h-4 w-4" />,
      },
    ],
  },
];

const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 border-slate-700 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">
            Keyboard Shortcuts
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Speed up your workflow with these keyboard shortcuts
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {shortcuts.map((category) => (
            <div key={category.category}>
              <h3 className="text-sm font-semibold text-slate-300 mb-3">
                {category.category}
              </h3>
              <div className="space-y-2">
                {category.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-blue-400">{item.icon}</div>
                      <span className="text-slate-200">{item.description}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {item.keys.map((key, keyIndex) => (
                        <React.Fragment key={keyIndex}>
                          <kbd className="px-2 py-1 text-xs font-semibold text-slate-200 bg-slate-900 border border-slate-600 rounded">
                            {key}
                          </kbd>
                          {keyIndex < item.keys.length - 1 && (
                            <span className="text-slate-500">+</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-sm text-blue-300">
            💡 <strong>Pro tip:</strong> Press{" "}
            <kbd className="px-2 py-1 text-xs font-semibold bg-slate-900 border border-slate-600 rounded">
              ?
            </kbd>{" "}
            at any time to see this dialog.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default KeyboardShortcutsModal;
