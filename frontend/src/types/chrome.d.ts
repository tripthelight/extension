declare namespace chrome {
  namespace storage {
    interface LocalArea {
      get(keys?: string | string[] | object | null): Promise<any>;
      set(items: object): Promise<void>;
    }

    interface StorageStatic {
      local: LocalArea;
    }
  }

  namespace tabs {
    interface QueryInfo {
      active?: boolean;
      currentWindow?: boolean;
    }

    interface Tab {
      id?: number;
    }

    interface TabsStatic {
      query(queryInfo: QueryInfo): Promise<Tab[]>;
      sendMessage(tabId: number, message: unknown): Promise<any>;
    }
  }

  namespace contextMenus {
    type MenuItemContext = "all" | "page" | "frame" | "selection" | "link" | "editable" | "image" | "video" | "audio";

    interface CreateProperties {
      id?: string;
      title?: string;
      contexts?: MenuItemContext[];
      documentUrlPatterns?: string[];
      targetUrlPatterns?: string[];
    }

    interface OnClickData {
      menuItemId: string | number;
      pageUrl?: string;
      linkUrl?: string;
      srcUrl?: string;
    }

    interface ContextMenusStatic {
      create(createProperties: CreateProperties): string | number;
      removeAll(callback?: () => void): void;
      onClicked: {
        addListener(
          callback: (
            info: OnClickData,
            tab?: tabs.Tab
          ) => void
        ): void;
      };
    }
  }

  namespace runtime {
    type MessageSender = unknown;
    type SendResponse = (response?: unknown) => void;

    interface RuntimeStatic {
      onInstalled: {
        addListener(callback: () => void): void;
      };
      onStartup: {
        addListener(callback: () => void): void;
      };
      onMessage: {
        addListener(
          callback: (
            message: unknown,
            sender: MessageSender,
            sendResponse: SendResponse
          ) => boolean | void
        ): void;
      };
    }
  }

  namespace i18n {
    interface I18nStatic {
      getUILanguage(): string;
    }
  }

  const runtime: runtime.RuntimeStatic;
  const storage: storage.StorageStatic;
  const tabs: tabs.TabsStatic;
  const contextMenus: contextMenus.ContextMenusStatic;
  const i18n: i18n.I18nStatic;
}

declare const browser:
  | {
      storage?: chrome.storage.StorageStatic;
    }
  | undefined;
