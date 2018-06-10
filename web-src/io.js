const ENTER_KEY = 13;

const input = document.getElementById('terminal-input');
const output = document.getElementById('terminal-output');

const write = (content) => {
  output.textContent += content;
};
const writeLn = (content) => {
  write(content + '\n');
};
const write2Ln = (content) => {
  write(content + '\n\n');
};
const writeJson = (json) => {
  write(JSON.stringify(json, null, 4));
};
const writeJsonLn = (json) => {
  writeLn(JSON.stringify(json, null, 4));
};
const writeJson2Ln = (json) => {
  write2Ln(JSON.stringify(json, null, 4));
};

const clear = () => {
  input.value = '';
};

const read = () => {
  clear();
  input.focus();

  return new Promise((resolve) => {
    const listener = (e) => {
      if (e.keyCode !== ENTER_KEY) {
        return;
      }

      input.blur();
      window.removeEventListener('keypress', listener);
      resolve(input.value);
      clear();
    };

    window.addEventListener('keypress', listener);
  });
};

export {
  write,
  writeLn,
  write2Ln,
  writeJson,
  writeJsonLn,
  writeJson2Ln,

  read,
  clear,
}
