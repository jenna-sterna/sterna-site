const s = "react", e = "React is a JavaScript library for building user interfaces.", t = ["react"], o = "18.3.1", r = "https://reactjs.org/", n = "https://github.com/facebook/react/issues", c = "MIT", a = ["LICENSE", "README.md", "index.js", "cjs/", "umd/", "jsx-runtime.js", "jsx-dev-runtime.js", "react.shared-subset.js"], i = "index.js", d = { ".": { "react-server": "./react.shared-subset.js", default: "./index.js" }, "./package.json": "./package.json", "./jsx-runtime": "./jsx-runtime.js", "./jsx-dev-runtime": "./jsx-dev-runtime.js" }, j = { type: "git", url: "https://github.com/facebook/react.git", directory: "packages/react" }, u = { node: ">=0.10.0" }, p = { "loose-envify": "^1.1.0" }, m = { transform: ["loose-envify"] }, g = {
  name: s,
  description: e,
  keywords: t,
  version: o,
  homepage: r,
  bugs: n,
  license: c,
  files: a,
  main: i,
  exports: d,
  repository: j,
  engines: u,
  dependencies: p,
  browserify: m
};
export {
  m as browserify,
  n as bugs,
  g as default,
  p as dependencies,
  e as description,
  u as engines,
  d as exports,
  a as files,
  r as homepage,
  t as keywords,
  c as license,
  i as main,
  s as name,
  j as repository,
  o as version
};
