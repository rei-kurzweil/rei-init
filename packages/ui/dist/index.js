// src/components/Card.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function Card({ title, content, pinned, user, onClick }) {
  if (user) {
    title = "@" + user.username;
  }
  const formattedContent = content.split("\n").map((line, index) => /* @__PURE__ */ jsxs("span", { children: [
    line,
    /* @__PURE__ */ jsx("br", {})
  ] }, index));
  return /* @__PURE__ */ jsxs(
    "div",
    {
      onClick: () => {
        onClick ? onClick() : null;
      },
      className: "\n            rounded-lg\n            p-4\n            mt-4\n\n            Card\n        ",
      children: [
        pinned && /* @__PURE__ */ jsx("div", { className: "text-sm text-yellow-500 font-bold mb-2", children: "\u{1F4CC}" }),
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: title }),
        /* @__PURE__ */ jsx("p", { className: "mt-2", children: formattedContent })
      ]
    }
  );
}

// src/components/Content.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var Content = ({ children }) => /* @__PURE__ */ jsx2("div", { className: "flex flex-col items-start justify-start \n                    mx-auto w-full max-w-[1024px] \n                    px-4 pt-4\n                    md:ml-64\n                    Content", children });

// src/components/Items.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Items({ items, user }) {
  return /* @__PURE__ */ jsx3("ul", { children: items.map((item) => /* @__PURE__ */ jsx3(
    Card,
    {
      content: item.content,
      ...user && { user },
      onClick: () => {
        if (!user) return;
        const url = "/" + user.name + "/" + item.id;
        window.location.href = url;
      }
    },
    item.id
  )) });
}

// src/components/MobileTopBar.tsx
import { useState } from "react";
import { jsx as jsx4, jsxs as jsxs2 } from "react/jsx-runtime";
function MobileTopBar(props) {
  const [menuOpen, setMenuOpen] = useState(false);
  return /* @__PURE__ */ jsxs2("aside", { className: "  fixed top-0 left-0 w-full h-16\n                            flex md:hidden items-center justify-between\n                            px-4 py-2 bg-white dark:bg-gray-800 SideBar", children: [
    /* @__PURE__ */ jsx4("span", { children: props.title }),
    /* @__PURE__ */ jsx4("button", { onClick: () => setMenuOpen(!menuOpen), children: "\u2630" }),
    menuOpen && /* @__PURE__ */ jsx4("nav", { children: props.children })
  ] });
}

// src/components/ProfileTitle.tsx
import { jsx as jsx5 } from "react/jsx-runtime";
function ProfileTitle({ children }) {
  return /* @__PURE__ */ jsx5("h1", { className: "text-2xl font-bold mb-4", children });
}

// src/components/SideBar.tsx
import { jsx as jsx6 } from "react/jsx-runtime";
var SideBar = ({ children }) => {
  return /* @__PURE__ */ jsx6(
    "aside",
    {
      className: "\n        hidden md:flex\n        flex-col\n        w-64\n        h-screen\n        p-4\n\n        SideBar\n\n        fixed top-0 left-0\n",
      children
    }
  );
};

// src/components/SideBarItem.tsx
import { jsx as jsx7, jsxs as jsxs3 } from "react/jsx-runtime";
var SideBarItem = (props) => {
  return /* @__PURE__ */ jsxs3(
    "a",
    {
      href: props.href,
      className: "\n        flex items-center gap-2\n        p-2 rounded\n        hover:bg-gray-700\n        transition-colors\n",
      children: [
        props.icon,
        /* @__PURE__ */ jsx7("span", { children: props.value })
      ]
    }
  );
};

// src/components/ToggleDarkMode.tsx
import { useState as useState2, useEffect } from "react";
import { jsx as jsx8 } from "react/jsx-runtime";
var DarkModeToggle = () => {
  const [isDark, setIsDark] = useState2(false);
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [isDark]);
  return /* @__PURE__ */ jsx8(
    "button",
    {
      onClick: () => setIsDark(!isDark),
      className: "p-2 rounded bg-gray-200 dark:bg-gray-700",
      children: isDark ? "\u{1F319}" : "\u2600\uFE0F"
    }
  );
};
export {
  Card,
  Content,
  DarkModeToggle,
  Items,
  MobileTopBar,
  ProfileTitle,
  SideBar,
  SideBarItem
};
