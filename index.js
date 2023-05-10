#!/usr/bin/env node

const args = process.argv[2]?.trim().split(/\s+/g).filter(x => x.length);

if (!args || args?.length === 0) process.exit(0);

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
