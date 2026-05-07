import { G as useAuth, J as useMySkills, r as reactExports, j as jsxRuntimeExports, M as Mic, e as Button, L as LogIn, K as Link, S as Skeleton, B as Badge } from "./index-l4XOU5JU.js";
import { S as SkillCard, D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, A as AudioPlayer } from "./dialog-Bc5ZhO-U.js";
import "./star-CDXf6tOb.js";
function MySkillsPage() {
  const { isLoggedIn, login } = useAuth();
  const { data: skills, isLoading } = useMySkills();
  const [selected, setSelected] = reactExports.useState(null);
  if (!isLoggedIn) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-md mx-auto px-4 py-24 text-center space-y-6",
        "data-ocid": "my-skills.auth_prompt",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mic, { size: 28, className: "text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-h3 font-display", children: "Your Skills" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Sign in to see the skills you've shared." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: login,
              "data-ocid": "my-skills.signin.button",
              className: "gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { size: 16 }),
                " Sign In"
              ]
            }
          )
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-7xl mx-auto px-4 py-8 space-y-6",
      "data-ocid": "my-skills.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-h2 font-display", children: "My Skills" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Skills you've published and shared." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, "data-ocid": "my-skills.create.button", className: "gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/create", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mic, { size: 16 }),
            " New Skill"
          ] }) })
        ] }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
            "data-ocid": "my-skills.loading_state",
            children: ["a", "b", "c", "d", "e", "f"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-44 rounded-xl" }, k))
          }
        ) : skills && skills.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: skills.map((skill, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          SkillCard,
          {
            skill: { ...skill, isUnlocked: true },
            index: i + 1,
            onSelect: setSelected
          },
          skill.skillId
        )) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "py-20 text-center space-y-4",
            "data-ocid": "my-skills.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-4xl", children: "🎙️" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg font-semibold", children: "No skills published yet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Share your first 10-second skill and start earning credits." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, "data-ocid": "my-skills.empty.create.button", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/create", children: "Publish a Skill" }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!selected, onOpenChange: (o) => !o && setSelected(null), children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "max-w-md", "data-ocid": "my-skills.detail.dialog", children: selected && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: selected.title }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: selected.category }),
              selected.tags.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-xs", children: [
                "#",
                t
              ] }, t))
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AudioPlayer, { src: selected.audioUrl, title: selected.title })
          ] })
        ] }) }) })
      ]
    }
  );
}
export {
  MySkillsPage as default
};
