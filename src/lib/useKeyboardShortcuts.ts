import { useEffect, useState } from "react";

type KeyboardShortcut = {
  key: string;
  ctrlKey?: boolean;
  metaKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  callback: () => void;
  description: string;
};

export const useKeyboardShortcuts = (
  onShowShortcuts?: () => void,
  onOpenCommand?: () => void,
  onCreateLead?: () => void
) => {
  const shortcuts: KeyboardShortcut[] = [
    {
      key: "k",
      ctrlKey: true,
      description: "Open command palette",
      callback: () => {
        if (onOpenCommand) {
          onOpenCommand();
        } else {
          console.log("Command palette - Coming soon!");
        }
      },
    },
    {
      key: "n",
      ctrlKey: true,
      description: "Create new lead",
      callback: () => {
        if (onCreateLead) {
          onCreateLead();
        } else {
          console.log("Create new lead - Coming soon!");
        }
      },
    },
    {
      key: "/",
      description: "Focus search",
      callback: () => {
        const searchInput = document.querySelector(
          'input[type="search"]'
        ) as HTMLInputElement;
        searchInput?.focus();
      },
    },
    {
      key: "?",
      shiftKey: true,
      description: "Show keyboard shortcuts",
      callback: () => {
        if (onShowShortcuts) {
          onShowShortcuts();
        }
      },
    },
  ];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in input fields
      const target = event.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        // Allow "/" and "?" shortcuts even in some contexts
        if (event.key !== "/" && event.key !== "?") {
          return;
        }
      }

      shortcuts.forEach((shortcut) => {
        const keyMatches =
          event.key.toLowerCase() === shortcut.key.toLowerCase();
        const ctrlMatches = shortcut.ctrlKey
          ? event.ctrlKey || event.metaKey
          : !event.ctrlKey && !event.metaKey;
        const shiftMatches = shortcut.shiftKey
          ? event.shiftKey
          : event.key === "/" ? true : !event.shiftKey;
        const altMatches = shortcut.altKey ? event.altKey : !event.altKey;

        if (keyMatches && ctrlMatches && shiftMatches && altMatches) {
          event.preventDefault();
          shortcut.callback();
        }
      });
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onShowShortcuts, onOpenCommand, onCreateLead]);
};

export default useKeyboardShortcuts;
