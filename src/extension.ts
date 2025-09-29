import * as vscode from "vscode";

function tryParse(s: string) {
  try {
    return JSON.parse(s);
  } catch {
    return null;
  }
}

function deepDecode(obj: any): any {
  if (typeof obj === "string") {
    const parsed = tryParse(obj);
    if (parsed !== null) {
      return deepDecode(parsed);
    }
    return obj;
  } else if (Array.isArray(obj)) {
    return obj.map((item) => deepDecode(item));
  } else if (obj && typeof obj === "object") {
    const res: any = {};
    for (const [k, v] of Object.entries(obj)) {
      res[k] = deepDecode(v);
    }
    return res;
  } else {
    return obj;
  }
}

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand("nestedJson.format", () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    const selection = editor.selection;
    const text = selection.isEmpty
      ? editor.document.getText()
      : editor.document.getText(selection);

    const parsed = tryParse(text);
    if (parsed === null) {
      // 使用 vscode.l10n.t() 来显示本地化消息
      vscode.window.showErrorMessage(vscode.l10n.t("Not a valid JSON"));
      return;
    }

    const decoded = deepDecode(parsed);
    const pretty = JSON.stringify(decoded, null, 2);

    editor.edit((editBuilder) => {
      if (selection.isEmpty) {
        const fullRange = new vscode.Range(
          editor.document.positionAt(0),
          editor.document.positionAt(editor.document.getText().length)
        );
        editBuilder.replace(fullRange, pretty);
      } else {
        editBuilder.replace(selection, pretty);
      }
    });
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}