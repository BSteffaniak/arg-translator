#!/usr/bin/env node

const args = process.argv.slice(2);

let cmd = args[0];
let started = false;
let wasParam = false;

for (let i = 1; i < args.length; i++) {
  const param = args[i][0] === "-";

  if (param && started) {
    started = false;
    cmd += "'";
  }

  cmd += " ";

  if (wasParam && !started) {
    cmd += "'";
    started = true;
  }

  cmd += args[i];

  wasParam = param;
}

if (!wasParam && started) {
  cmd += "'";
}

process.stdout.write(cmd);
