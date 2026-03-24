import { goto } from "$app/navigation";
import { terminalHistory } from "$lib/stores.js";
import tree from "$lib/data/tree.json";

const PATH_KEY = "terminal_path";

// ── nav helpers ───────────────────────────────────────────────────────────────

/**
 * Walk the flat tree for a given pathStack.
 * Root is tree["/"]. Each directory segment is stored with a trailing slash.
 *
 * [] → tree["/"]              (root)
 * ["projects"] → tree["/"]["projects/"]
 *
 * @param {string[]} pathArr
 * @returns {object|null}
 */
export function getCurrentDir(pathArr) {
  if (pathArr.length === 0) return tree["/"];

  // Only one level of nesting is supported in the flat structure.
  // The last segment is the directory key (with trailing slash).
  const dirKey = pathArr[pathArr.length - 1] + "/";
  return tree["/"][dirKey] ?? null;
}

/**
 * A key ending with "/" is a directory entry.
 * @param {string} key
 * @returns {boolean}
 */
export function isDir(key) {
  return key.endsWith("/");
}

/**
 * Strip the trailing slash from a directory key to get the display name.
 * @param {string} key
 * @returns {string}
 */
export function dirName(key) {
  return key.endsWith("/") ? key.slice(0, -1) : key;
}

// ── Terminal ──────────────────────────────────────────────────────────────────

export class Terminal {
  constructor() {
    /** @type {string[]} e.g. [] = root, ["projects"] = inside projects */
    this.pathStack = [];
    this._restorePathStack();
  }

  getPath() {
    return "/" + this.pathStack.join("/");
  }

  pushPath(segment) {
    this.pathStack.push(segment);
    this._savePathStack();
  }

  popPath() {
    const popped = this.pathStack.pop();
    this._savePathStack();
    return popped;
  }

  clearPath() {
    this.pathStack = [];
    this._savePathStack();
  }

  async navigate(url) {
    await goto(url, { replaceState: false });
  }

  async run(input) {
    const trimmed = input.trim();
    if (!trimmed) return;

    terminalHistory.update((h) => [...h, `> ${trimmed}`]);

    const output = await this._dispatch(trimmed);

    if (output === "__CLEAR__") {
      terminalHistory.set([]);
    } else {
      terminalHistory.update((h) => [...h, output]);
    }
  }

  async _dispatch(input) {
    const [op, ...args] = input.split(/\s+/);
    const name = op.toLowerCase();
    const helpFlag = args.includes("--help");

    let CommandClass;
    try {
      const mod = await import(`$lib/terminal/mybin/${name}.js`);
      CommandClass = mod.default;
    } catch {
      return `Command not found: ${name}. Type 'help' for available commands.`;
    }

    const cmd = new CommandClass();

    if (helpFlag) return cmd.usage || `${cmd.name}: no help available`;

    return await cmd.execute({
      terminal: this,
      args,
      path: [...this.pathStack],
    });
  }

  _savePathStack() {
    try { sessionStorage.setItem(PATH_KEY, JSON.stringify(this.pathStack)); } catch {}
  }

  _restorePathStack() {
    try {
      const saved = sessionStorage.getItem(PATH_KEY);
      if (saved) this.pathStack = JSON.parse(saved);
    } catch {}
  }
}
