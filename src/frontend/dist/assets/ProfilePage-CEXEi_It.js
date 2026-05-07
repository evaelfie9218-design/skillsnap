import { c as createLucideIcon, G as useAuth, a4 as useMyProfile, a5 as useMyCredits, a6 as useSaveMyProfile, r as reactExports, j as jsxRuntimeExports, U as User, e as Button, L as LogIn, S as Skeleton, a3 as Zap, B as Badge, X, f as ue } from "./index-l4XOU5JU.js";
import { I as Input } from "./input-21yfx5Ev.js";
import { L as Label, a as Plus } from "./label-DUjkM0lI.js";
import { S as Star } from "./star-CDXf6tOb.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 7v14", key: "1akyts" }],
  [
    "path",
    {
      d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
      key: "ruj8y"
    }
  ]
];
const BookOpen = createLucideIcon("book-open", __iconNode);
function ProfilePage() {
  const { isLoggedIn, login, principal } = useAuth();
  const { data: profile, isLoading } = useMyProfile();
  const { data: credits } = useMyCredits();
  const saveMutation = useSaveMyProfile();
  const [editing, setEditing] = reactExports.useState(false);
  const [name, setName] = reactExports.useState("");
  const [langInput, setLangInput] = reactExports.useState("");
  const [languages, setLanguages] = reactExports.useState([]);
  if (!isLoggedIn) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-md mx-auto px-4 py-24 text-center space-y-6",
        "data-ocid": "profile.auth_prompt",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 28, className: "text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-h3 font-display", children: "Your Profile" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Sign in to view and manage your profile." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: login,
              "data-ocid": "profile.signin.button",
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
  const startEdit = () => {
    setName((profile == null ? void 0 : profile.name) ?? "");
    setLanguages((profile == null ? void 0 : profile.languages) ?? ["English"]);
    setEditing(true);
  };
  const addLang = () => {
    const trimmed = langInput.trim();
    if (trimmed && !languages.includes(trimmed)) {
      setLanguages([...languages, trimmed]);
      setLangInput("");
    }
  };
  const removeLang = (lang) => setLanguages(languages.filter((l) => l !== lang));
  const handleSave = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      ue.error("Name cannot be empty.");
      return;
    }
    try {
      await saveMutation.mutateAsync({ name, languages });
      ue.success("Profile updated!");
      setEditing(false);
    } catch (err) {
      ue.error(
        err instanceof Error ? err.message : "Failed to save profile"
      );
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-xl mx-auto px-4 py-10 space-y-8",
      "data-ocid": "profile.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-h2 font-display", children: "Profile" }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "profile.loading_state", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 rounded-xl" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3", children: [
            {
              icon: Zap,
              label: "Credits",
              value: credits != null ? Number(credits) : "—"
            },
            {
              icon: BookOpen,
              label: "Skills",
              value: profile ? Number(profile.skillCount) : "—"
            },
            {
              icon: Star,
              label: "Rating",
              value: profile ? profile.rating.toFixed(1) : "—"
            }
          ].map(({ icon: Icon, label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-card border border-border rounded-xl p-4 text-center space-y-1",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 18, className: "mx-auto text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-display font-bold", children: value }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label })
              ]
            },
            label
          )) }),
          editing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "form",
            {
              onSubmit: handleSave,
              className: "space-y-5 bg-card border border-border rounded-xl p-6",
              "data-ocid": "profile.edit_form",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-lg", children: "Edit Profile" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "profile-name", children: "Display Name" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "profile-name",
                      value: name,
                      onChange: (e) => setName(e.target.value),
                      "data-ocid": "profile.name.input",
                      required: true
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Languages" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        placeholder: "Add language…",
                        value: langInput,
                        onChange: (e) => setLangInput(e.target.value),
                        onKeyDown: (e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addLang();
                          }
                        },
                        "data-ocid": "profile.language.input"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        variant: "outline",
                        size: "icon",
                        onClick: addLang,
                        disabled: !langInput.trim(),
                        "data-ocid": "profile.language.add_button",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 15 })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: languages.map((lang) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "gap-1", children: [
                    lang,
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => removeLang(lang),
                        className: "ml-1 hover:text-destructive transition-colors",
                        "aria-label": `Remove ${lang}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 11 })
                      }
                    )
                  ] }, lang)) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "submit",
                      disabled: saveMutation.isPending,
                      "data-ocid": "profile.save.submit_button",
                      children: saveMutation.isPending ? "Saving…" : "Save Changes"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      variant: "outline",
                      onClick: () => setEditing(false),
                      "data-ocid": "profile.edit.cancel_button",
                      children: "Cancel"
                    }
                  )
                ] })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-card border border-border rounded-xl p-6 space-y-4",
              "data-ocid": "profile.info.card",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-label", children: "Display Name" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-lg", children: (profile == null ? void 0 : profile.name) ?? "Anonymous" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "outline",
                      size: "sm",
                      onClick: startEdit,
                      "data-ocid": "profile.edit.button",
                      children: "Edit"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-label", children: "Languages" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: ((profile == null ? void 0 : profile.languages) ?? []).length > 0 ? profile == null ? void 0 : profile.languages.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: l }, l)) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "None set" }) })
                ] }),
                principal && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-label", children: "Principal ID" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-muted-foreground break-all", children: principal })
                ] })
              ]
            }
          )
        ] })
      ]
    }
  );
}
export {
  ProfilePage as default
};
