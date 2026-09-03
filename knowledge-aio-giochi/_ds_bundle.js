/* @ds-bundle: {"namespace":"KnowledgeAIO","components":[{"name":"AchievementToast","sourcePath":"components/general/AchievementToast/AchievementToast.jsx"},{"name":"ActionCard","sourcePath":"components/general/ActionCard/ActionCard.jsx"},{"name":"ActivityList","sourcePath":"components/general/ActivityList/ActivityList.jsx"},{"name":"BadgeCard","sourcePath":"components/general/BadgeCard/BadgeCard.jsx"},{"name":"Button","sourcePath":"components/general/Button/Button.jsx"},{"name":"GlassCard","sourcePath":"components/general/GlassCard/GlassCard.jsx"},{"name":"LevelProgress","sourcePath":"components/general/LevelProgress/LevelProgress.jsx"},{"name":"ModeCard","sourcePath":"components/general/ModeCard/ModeCard.jsx"},{"name":"NavItem","sourcePath":"components/general/NavItem/NavItem.jsx"},{"name":"StatCard","sourcePath":"components/general/StatCard/StatCard.jsx"},{"name":"UserLevel","sourcePath":"components/general/UserLevel/UserLevel.jsx"},{"name":"WeeklyChart","sourcePath":"components/general/WeeklyChart/WeeklyChart.jsx"}],"sourceHashes":{"components/general/AchievementToast/AchievementToast.jsx":"004dd3dc1d7b","components/general/AchievementToast/AchievementToast.d.ts":"14183dc518a3","components/general/AchievementToast/AchievementToast.prompt.md":"b16bb57e89c7","components/general/ActionCard/ActionCard.jsx":"3e03323fb393","components/general/ActionCard/ActionCard.d.ts":"d20f9c05a9eb","components/general/ActionCard/ActionCard.prompt.md":"831b4c413dd2","components/general/ActivityList/ActivityList.jsx":"9c15f1e5d4bd","components/general/ActivityList/ActivityList.d.ts":"d283167dd1dc","components/general/ActivityList/ActivityList.prompt.md":"de4a055f7f25","components/general/BadgeCard/BadgeCard.jsx":"7b6b771f26f6","components/general/BadgeCard/BadgeCard.d.ts":"c857c1643bd2","components/general/BadgeCard/BadgeCard.prompt.md":"8898ab64ce75","components/general/Button/Button.jsx":"12fa35d4dbab","components/general/Button/Button.d.ts":"5f094c14e223","components/general/Button/Button.prompt.md":"749048bb4683","components/general/GlassCard/GlassCard.jsx":"cd36b40b0b45","components/general/GlassCard/GlassCard.d.ts":"2d9a5ec20dce","components/general/GlassCard/GlassCard.prompt.md":"de0bd81ba1e4","components/general/LevelProgress/LevelProgress.jsx":"403c4fd183bb","components/general/LevelProgress/LevelProgress.d.ts":"5ee9a265d6b1","components/general/LevelProgress/LevelProgress.prompt.md":"00d56b749763","components/general/ModeCard/ModeCard.jsx":"cb551bd8f630","components/general/ModeCard/ModeCard.d.ts":"868068e3c908","components/general/ModeCard/ModeCard.prompt.md":"75cabd543008","components/general/NavItem/NavItem.jsx":"43aa55d73e77","components/general/NavItem/NavItem.d.ts":"2dccd5ded170","components/general/NavItem/NavItem.prompt.md":"aeecae06b7ea","components/general/StatCard/StatCard.jsx":"292ab911fbcc","components/general/StatCard/StatCard.d.ts":"322f2b29f2b4","components/general/StatCard/StatCard.prompt.md":"e9c871496205","components/general/UserLevel/UserLevel.jsx":"cd1749b4e399","components/general/UserLevel/UserLevel.d.ts":"ce2ae60491c7","components/general/UserLevel/UserLevel.prompt.md":"50a11ba2bba0","components/general/WeeklyChart/WeeklyChart.jsx":"a52d119ffe85","components/general/WeeklyChart/WeeklyChart.d.ts":"f7db693b1945","components/general/WeeklyChart/WeeklyChart.prompt.md":"8bb81b1a9f2f"},"inlinedExternals":[],"builtBy":"cc-design-sync"} */
var KnowledgeAIO = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res, err) => function __init() {
    if (err) throw err[0];
    try {
      return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
    } catch (e) {
      throw err = [e], e;
    }
  };
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // <define:import.meta.env>
  var init_define_import_meta_env = __esm({
    "<define:import.meta.env>"() {
    }
  });

  // shim:react-shim
  var require_react_shim = __commonJS({
    "shim:react-shim"(exports, module) {
      init_define_import_meta_env();
      var R = window.React;
      function np(p, k) {
        var o = {};
        for (var x in p) if (x !== "children") o[x] = p[x];
        if (k !== void 0) o.key = k;
        return o;
      }
      function jsx(t, p, k) {
        var c = p && p.children;
        return c === void 0 ? R.createElement(t, np(p, k)) : R.createElement(t, np(p, k), c);
      }
      function jsxs(t, p, k) {
        return R.createElement.apply(R, [t, np(p, k)].concat(p.children));
      }
      module.exports = R;
      module.exports.jsx = jsx;
      module.exports.jsxs = jsxs;
      module.exports.jsxDEV = function(t, p, k, s) {
        return (s ? jsxs : jsx)(t, p, k);
      };
      module.exports.Fragment = R.Fragment;
    }
  });

  // .design-sync/ds-src/src/index.tsx
  var src_exports = {};
  __export(src_exports, {
    AchievementToast: () => AchievementToast,
    ActionCard: () => ActionCard,
    ActivityList: () => ActivityList,
    AppSurface: () => AppSurface,
    BadgeCard: () => BadgeCard,
    Button: () => Button,
    GlassCard: () => GlassCard,
    LevelProgress: () => LevelProgress,
    ModeCard: () => ModeCard,
    NavItem: () => NavItem,
    StatCard: () => StatCard,
    UserLevel: () => UserLevel,
    WeeklyChart: () => WeeklyChart
  });
  init_define_import_meta_env();

  // .design-sync/ds-src/src/AppSurface.tsx
  init_define_import_meta_env();
  var import_react = __toESM(require_react_shim(), 1);
  function AppSurface({ className, children }) {
    return /* @__PURE__ */ import_react.default.createElement(
      "div",
      {
        className: ["app-container", className].filter(Boolean).join(" "),
        style: {
          backgroundColor: "#000",
          color: "var(--text-primary)",
          fontFamily: "var(--font-sans)",
          lineHeight: 1.6,
          display: "block",
          minHeight: "auto",
          padding: "var(--space-lg)",
          borderRadius: "var(--radius-md)"
        }
      },
      children
    );
  }

  // .design-sync/ds-src/src/Button.tsx
  init_define_import_meta_env();
  var import_react2 = __toESM(require_react_shim(), 1);
  function Button({
    variant = "primary",
    icon,
    disabled = false,
    type = "button",
    onClick,
    className,
    children
  }) {
    const classes = ["btn", `btn-${variant}`, className].filter(Boolean).join(" ");
    return /* @__PURE__ */ import_react2.default.createElement("button", { className: classes, type, disabled, onClick }, icon, children);
  }

  // .design-sync/ds-src/src/NavItem.tsx
  init_define_import_meta_env();
  var import_react3 = __toESM(require_react_shim(), 1);
  function NavItem({ label, icon, active = false, onClick, className }) {
    const classes = ["nav-item", active ? "active" : null, className].filter(Boolean).join(" ");
    return /* @__PURE__ */ import_react3.default.createElement("button", { className: classes, type: "button", onClick }, icon ? /* @__PURE__ */ import_react3.default.createElement("span", { className: "nav-icon" }, icon) : null, label);
  }

  // .design-sync/ds-src/src/UserLevel.tsx
  init_define_import_meta_env();
  var import_react4 = __toESM(require_react_shim(), 1);
  function UserLevel({ badge, label, large = false, className }) {
    return /* @__PURE__ */ import_react4.default.createElement("div", { className: ["user-level", className].filter(Boolean).join(" ") }, /* @__PURE__ */ import_react4.default.createElement("span", { className: large ? "level-badge large" : "level-badge" }, badge), label ? /* @__PURE__ */ import_react4.default.createElement("span", { className: "level-label" }, label) : null);
  }

  // .design-sync/ds-src/src/GlassCard.tsx
  init_define_import_meta_env();
  var import_react5 = __toESM(require_react_shim(), 1);
  function GlassCard({ title, featured = false, className, children }) {
    const classes = ["home-card", featured ? "featured" : null, className].filter(Boolean).join(" ");
    return /* @__PURE__ */ import_react5.default.createElement("div", { className: classes }, title ? /* @__PURE__ */ import_react5.default.createElement("h3", null, title) : null, children);
  }

  // .design-sync/ds-src/src/ActionCard.tsx
  init_define_import_meta_env();
  var import_react6 = __toESM(require_react_shim(), 1);
  function ActionCard({
    icon,
    title,
    description,
    featured = false,
    onClick,
    className,
    children
  }) {
    const classes = ["home-card", "action-card", featured ? "featured" : null, className].filter(Boolean).join(" ");
    return /* @__PURE__ */ import_react6.default.createElement("div", { className: classes, onClick }, icon ? /* @__PURE__ */ import_react6.default.createElement("div", { className: "card-icon" }, icon) : null, /* @__PURE__ */ import_react6.default.createElement("h3", null, title), description ? /* @__PURE__ */ import_react6.default.createElement("p", null, description) : null, children);
  }

  // .design-sync/ds-src/src/StatCard.tsx
  init_define_import_meta_env();
  var import_react7 = __toESM(require_react_shim(), 1);
  function StatCard({ icon, value, label, className }) {
    return /* @__PURE__ */ import_react7.default.createElement("div", { className: ["stat-card", className].filter(Boolean).join(" ") }, icon ? /* @__PURE__ */ import_react7.default.createElement("span", { className: "stat-icon" }, icon) : null, /* @__PURE__ */ import_react7.default.createElement("span", { className: "stat-value" }, value), /* @__PURE__ */ import_react7.default.createElement("span", { className: "stat-label" }, label));
  }

  // .design-sync/ds-src/src/LevelProgress.tsx
  init_define_import_meta_env();
  var import_react8 = __toESM(require_react_shim(), 1);
  function LevelProgress({ level, levelName, percent, className }) {
    const clamped = Math.max(0, Math.min(100, percent));
    return /* @__PURE__ */ import_react8.default.createElement("div", { className: ["level-progress-display", className].filter(Boolean).join(" ") }, /* @__PURE__ */ import_react8.default.createElement("div", { className: "current-level-info" }, /* @__PURE__ */ import_react8.default.createElement("span", { className: "level-badge large" }, level), levelName ? /* @__PURE__ */ import_react8.default.createElement("span", { className: "level-name" }, levelName) : null), /* @__PURE__ */ import_react8.default.createElement("div", { className: "level-progress-bar" }, /* @__PURE__ */ import_react8.default.createElement("div", { className: "level-progress-fill", style: { width: `${clamped}%` } })), /* @__PURE__ */ import_react8.default.createElement("span", { className: "level-percent" }, clamped, "%"));
  }

  // .design-sync/ds-src/src/WeeklyChart.tsx
  init_define_import_meta_env();
  var import_react9 = __toESM(require_react_shim(), 1);
  function WeeklyChart({ bars = [], max, emptyMessage, className }) {
    const ceiling = max ?? Math.max(1, ...bars.map((b) => b.value));
    return /* @__PURE__ */ import_react9.default.createElement("div", { className: ["weekly-chart", className].filter(Boolean).join(" ") }, bars.length === 0 ? /* @__PURE__ */ import_react9.default.createElement("div", { className: "chart-empty" }, emptyMessage ?? "Nessun dato / No data yet") : bars.map((bar, i) => /* @__PURE__ */ import_react9.default.createElement("div", { className: "chart-bar-row", key: i }, /* @__PURE__ */ import_react9.default.createElement("span", { className: "chart-bar-label" }, bar.label), /* @__PURE__ */ import_react9.default.createElement("div", { className: "chart-bar-track" }, /* @__PURE__ */ import_react9.default.createElement(
      "div",
      {
        className: "chart-bar",
        style: { width: `${Math.max(0, Math.min(100, bar.value / ceiling * 100))}%` }
      }
    )), /* @__PURE__ */ import_react9.default.createElement("span", { className: "chart-bar-value" }, bar.display ?? bar.value))));
  }

  // .design-sync/ds-src/src/BadgeCard.tsx
  init_define_import_meta_env();
  var import_react10 = __toESM(require_react_shim(), 1);
  function BadgeCard({
    icon,
    title,
    titleIt,
    description,
    descriptionIt,
    date,
    state = "locked",
    className
  }) {
    const stateClass = state === "unlocked" ? "unlocked" : state === "secret" ? "locked secret" : "locked";
    return /* @__PURE__ */ import_react10.default.createElement("div", { className: ["badge-card", stateClass, className].filter(Boolean).join(" ") }, icon ? /* @__PURE__ */ import_react10.default.createElement("span", { className: "badge-icon" }, icon) : null, /* @__PURE__ */ import_react10.default.createElement("div", { className: "badge-title" }, title), titleIt ? /* @__PURE__ */ import_react10.default.createElement("div", { className: "badge-title-it" }, titleIt) : null, description ? /* @__PURE__ */ import_react10.default.createElement("div", { className: "badge-description" }, description) : null, descriptionIt ? /* @__PURE__ */ import_react10.default.createElement("div", { className: "badge-description-it" }, descriptionIt) : null, date ? /* @__PURE__ */ import_react10.default.createElement("div", { className: "badge-date" }, date) : null);
  }

  // .design-sync/ds-src/src/AchievementToast.tsx
  init_define_import_meta_env();
  var import_react11 = __toESM(require_react_shim(), 1);
  function AchievementToast({
    icon,
    label,
    title,
    visible = true,
    className
  }) {
    const classes = ["achievement-toast", visible ? "visible" : null, className].filter(Boolean).join(" ");
    return /* @__PURE__ */ import_react11.default.createElement("div", { className: classes }, icon ? /* @__PURE__ */ import_react11.default.createElement("span", { className: "achievement-toast-icon" }, icon) : null, /* @__PURE__ */ import_react11.default.createElement("div", { className: "achievement-toast-body" }, label ? /* @__PURE__ */ import_react11.default.createElement("div", { className: "achievement-toast-label" }, label) : null, /* @__PURE__ */ import_react11.default.createElement("div", { className: "achievement-toast-title" }, title)));
  }

  // .design-sync/ds-src/src/ModeCard.tsx
  init_define_import_meta_env();
  var import_react12 = __toESM(require_react_shim(), 1);
  function ModeCard({
    icon,
    name,
    description,
    disabled = false,
    onClick,
    className
  }) {
    const classes = ["mode-card", disabled ? "mode-disabled" : null, className].filter(Boolean).join(" ");
    return /* @__PURE__ */ import_react12.default.createElement("div", { className: classes, onClick: disabled ? void 0 : onClick }, icon ? /* @__PURE__ */ import_react12.default.createElement("div", { className: "mode-card-icon" }, icon) : null, /* @__PURE__ */ import_react12.default.createElement("div", { className: "mode-card-name" }, name), description ? /* @__PURE__ */ import_react12.default.createElement("div", { className: "mode-card-desc" }, description) : null);
  }

  // .design-sync/ds-src/src/ActivityList.tsx
  init_define_import_meta_env();
  var import_react13 = __toESM(require_react_shim(), 1);
  function ActivityList({ title, items = [], className }) {
    return /* @__PURE__ */ import_react13.default.createElement("div", { className: ["recent-activity", className].filter(Boolean).join(" ") }, title ? /* @__PURE__ */ import_react13.default.createElement("h3", null, title) : null, /* @__PURE__ */ import_react13.default.createElement("ul", { className: "activity-list" }, items.map((item, i) => /* @__PURE__ */ import_react13.default.createElement("li", { className: "activity-item", key: i }, item.icon ? /* @__PURE__ */ import_react13.default.createElement("span", { className: "activity-icon" }, item.icon) : null, /* @__PURE__ */ import_react13.default.createElement("span", { className: "activity-text" }, item.text)))));
  }
  return __toCommonJS(src_exports);
})();
window.KnowledgeAIO=KnowledgeAIO.__dsMainNs?Object.assign({},KnowledgeAIO,KnowledgeAIO.__dsMainNs,{__dsMainNs:undefined}):KnowledgeAIO;
