// src/components/AuthUI.tsx
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { jsx } from "react/jsx-runtime";
function AuthUI({ supabaseUrl, supabaseAnonKey, onSessionChange }) {
  const [session, setSession] = useState(null);
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: session2 } }) => {
      setSession(session2);
      onSessionChange?.(session2);
      console.log("session", session2);
    });
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session2) => {
      setSession(session2);
      onSessionChange?.(session2);
    });
    return () => subscription.unsubscribe();
  }, [supabase, onSessionChange]);
  if (!session) {
    return /* @__PURE__ */ jsx(
      Auth,
      {
        supabaseClient: supabase,
        appearance: { theme: ThemeSupa }
      }
    );
  }
  return null;
}

// src/components/Card.tsx
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
function Card({ title, content, pinned, user, onClick }) {
  if (user) {
    title = "@" + user.username;
  }
  const formattedContent = content.split("\n").map((line, index) => /* @__PURE__ */ jsxs("span", { children: [
    line,
    /* @__PURE__ */ jsx2("br", {})
  ] }, index));
  return /* @__PURE__ */ jsxs(
    "div",
    {
      onClick: () => {
        onClick ? onClick() : null;
      },
      className: "\n            rounded-lg\n            p-4\n            mt-4\n\n            Card\n        ",
      children: [
        pinned && /* @__PURE__ */ jsx2("div", { className: "text-sm text-yellow-500 font-bold mb-2", children: "\u{1F4CC}" }),
        /* @__PURE__ */ jsx2("h2", { className: "text-lg font-semibold", children: title }),
        /* @__PURE__ */ jsx2("p", { className: "mt-2", children: formattedContent })
      ]
    }
  );
}

// src/components/Content.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
var Content = ({ children }) => /* @__PURE__ */ jsx3("div", { className: "flex flex-col justify-start \n                    w-full max-w-[800px] mx-auto\n                    px-4 py-4\n                    min-h-screen\n                    Content", children });

// src/components/Items.tsx
import { jsx as jsx4 } from "react/jsx-runtime";
function Items({ items, user }) {
  return /* @__PURE__ */ jsx4("ul", { children: items.map((item) => /* @__PURE__ */ jsx4(
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

// src/components/ProfileTitle.tsx
import { jsx as jsx5 } from "react/jsx-runtime";
function ProfileTitle({ children }) {
  return /* @__PURE__ */ jsx5("h1", { className: "my-4 px-2 text-[1.5rem]", children });
}

// src/components/SideBar.tsx
import { jsx as jsx6 } from "react/jsx-runtime";
var SideBar = ({ children }) => {
  return /* @__PURE__ */ jsx6(
    "aside",
    {
      className: "\n        /* Mobile: sticky top bar in normal flow */\n        sticky top-0 z-20 w-full h-12 box-border\n        \n\n        /* Desktop: sticky left rail */\n        md:h-screen md:w-64 md:flex-none md:flex-col md:items-stretch md:py-4\n        \n\n        /* Layout */\n        flex items-center px-4 py-2\n        flex-shrink-0\n\n        SideBar\n",
      children
    }
  );
};

// src/components/SideBarItem.tsx
import { jsx as jsx7, jsxs as jsxs2 } from "react/jsx-runtime";
var SideBarItem = (props) => {
  return /* @__PURE__ */ jsxs2(
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
import { useState as useState2, useEffect as useEffect2 } from "react";
import { jsx as jsx8 } from "react/jsx-runtime";
var DarkModeToggle = () => {
  const [isDark, setIsDark] = useState2(false);
  useEffect2(() => {
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
  AuthUI,
  Card,
  Content,
  DarkModeToggle,
  Items,
  ProfileTitle,
  SideBar,
  SideBarItem
};
