const ENTER_KEY = 13;

const input = document.getElementById('terminal-input');
const output = document.getElementById('terminal-output');

const write = (content, className) => {
  content = content.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  if (className) {
    content = '<span class="' + className + '">' + content + '</span>';
  }
  output.innerHTML += content;
};
const writeLn = (content, className) => {
  write(content + '\n', className);
};
const write2Ln = (content, className) => {
  write(content + '\n\n', className);
};
const writeJson = (json, className) => {
  write(JSON.stringify(json, null, 4), className);
};
const writeJsonLn = (json, className) => {
  writeLn(JSON.stringify(json, null, 4), className);
};
const writeJson2Ln = (json, className) => {
  write2Ln(JSON.stringify(json, null, 4), className);
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
