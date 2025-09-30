# Nested JSON Formatter / 嵌套 JSON 格式化工具

A VS Code extension to recursively parse and format stringified JSON nested within a JSON structure.  
一个 VS Code 插件，可以**递归解析并格式化**嵌套在 JSON 结构中的字符串化 JSON。

---

## ✨ Feature (功能)

-   **Action (操作):** Recursively parses string values that contain valid JSON, replacing the original string with the fully formatted JSON object or array.
    -   **功能:** 递归解析值为合法 JSON 字符串的字段，并用完全格式化后的 JSON 对象或数组替换原始字符串。
-   **Command (命令):** The command is accessible via the editor's context menu (right-click) or the Command Palette: **Nested JSON: Format JSON**.
    -   **命令:** 可通过编辑器的右键菜单或命令面板访问：**Nested JSON: 格式化 JSON**。

---

## 🚀 Usage (使用方法)

### 1. Context Menu (右键菜单)

1.  Open a file containing JSON content.
    * 打开一个包含 JSON 内容的文件。
2.  **Right-click** in the editor.
    * 在编辑器中**右键单击**。
3.  Select **"Nested JSON: Format JSON"**.
    * 选择 **"Nested JSON: 格式化 JSON"**。

### 2. Example (示例)

This is how the extension transforms deeply stringified JSON:
以下是扩展如何转换深度字符串化 JSON 的示例：

**Before (之前):**

```json
{
  "status": 200,
  "nested_data": "{\"id\":100,\"config\":\"{\\\"api_url\\\":\\\"[https://example.com/api](https://example.com/api)\\\",\\\"timeout\\\":500}\"}"
}
```
**After (之后):**
```json
{
  "status": 200,
  "data": {
    "id": 100,
    "user_info": {
      "name": "Alice",
      "age": 25
    }
  }
}
```