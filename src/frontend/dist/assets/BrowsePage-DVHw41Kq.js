import { c as createLucideIcon, u as useQueryClient, r as reactExports, a as useListSkills, b as useUnlockSkill, d as useRateSkill, j as jsxRuntimeExports, B as Badge, S as Skeleton, e as Button, f as ue } from "./index-l4XOU5JU.js";
import { S as SkillCard, D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, A as AudioPlayer, d as StarRating } from "./dialog-Bc5ZhO-U.js";
import { I as Input } from "./input-21yfx5Ev.js";
import "./star-CDXf6tOb.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode);
const CATEGORIES = [
  "All",
  "Cooking",
  "Productivity",
  "Language",
  "Finance",
  "Fitness",
  "Tech",
  "Creativity"
];
function BrowsePage() {
  const qc = useQueryClient();
  const [search, setSearch] = reactExports.useState("");
  const [selectedCategory, setSelectedCategory] = reactExports.useState("All");
  const [selectedSkill, setSelectedSkill] = reactExports.useState(
    null
  );
  const effectiveFilter = {
    ...selectedCategory !== "All" ? { category: selectedCategory } : {},
    ...search ? { search } : {}
  };
  const { data: skills, isLoading } = useListSkills(effectiveFilter);
  const unlockMutation = useUnlockSkill();
  const rateMutation = useRateSkill();
  const handleUnlock = async (skillId) => {
    try {
      await unlockMutation.mutateAsync(skillId);
      ue.success("Skill unlocked!");
    } catch (err) {
      ue.error(err instanceof Error ? err.message : "Failed to unlock");
    }
  };
  const handleRate = async (skillId, rating) => {
    try {
      await rateMutation.mutateAsync({ skillId, rating });
      ue.success("Rating saved!");
      const updated = qc.getQueryData([
        "skills",
        effectiveFilter
      ]);
      if (updated && selectedSkill) {
        const refreshed = updated.find((s) => s.skillId === skillId);
        if (refreshed) setSelectedSkill(refreshed);
      }
    } catch (err) {
      ue.error(err instanceof Error ? err.message : "Failed to rate");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-7xl mx-auto px-4 py-8 space-y-6",
      "data-ocid": "browse.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-h2 font-display", children: "Browse Skills" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Discover and unlock 10-second audio tips from experts worldwide." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col sm:flex-row gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Search,
            {
              size: 16,
              className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Search skills…",
              className: "pl-9",
              value: search,
              onChange: (e) => setSearch(e.target.value),
              "data-ocid": "browse.search_input"
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex gap-2 overflow-x-auto pb-1 scrollbar-none",
            "data-ocid": "browse.category.filter",
            children: CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: selectedCategory === cat ? "default" : "outline",
                className: "cursor-pointer shrink-0 transition-smooth",
                onClick: () => setSelectedCategory(cat),
                "data-ocid": "browse.category.tab",
                children: cat
              },
              cat
            ))
          }
        ),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4",
            "data-ocid": "browse.skills.loading_state",
            children: ["a", "b", "c", "d", "e", "f", "g", "h"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-44 rounded-xl" }, k))
          }
        ) : skills && skills.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4", children: skills.map((skill, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          SkillCard,
          {
            skill,
            index: i + 1,
            onUnlock: handleUnlock,
            onSelect: setSelectedSkill,
            isUnlocking: unlockMutation.isPending
          },
          skill.skillId
        )) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "py-20 text-center space-y-3",
            "data-ocid": "browse.skills.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-4xl", children: "🎧" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg font-semibold", children: "No skills yet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Be the first to share a 10-second skill!" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Dialog,
          {
            open: !!selectedSkill,
            onOpenChange: (o) => !o && setSelectedSkill(null),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              DialogContent,
              {
                className: "max-w-md",
                "data-ocid": "browse.skill_detail.dialog",
                children: selectedSkill && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: selectedSkill.title }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: selectedSkill.category }),
                      selectedSkill.tags.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-xs", children: [
                        "#",
                        t
                      ] }, t))
                    ] }),
                    selectedSkill.isUnlocked ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                      AudioPlayer,
                      {
                        src: selectedSkill.audioUrl,
                        title: selectedSkill.title
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-dashed border-border p-6 text-center space-y-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Unlock to listen to this skill" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          onClick: () => handleUnlock(selectedSkill.skillId),
                          disabled: unlockMutation.isPending,
                          "data-ocid": "browse.skill_detail.unlock_button",
                          className: "gap-2",
                          children: "Unlock for 1 credit"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium", children: "Rate this skill" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        StarRating,
                        {
                          value: selectedSkill.rating,
                          onChange: (r) => handleRate(selectedSkill.skillId, r)
                        }
                      )
                    ] })
                  ] })
                ] })
              }
            )
          }
        )
      ]
    }
  );
}
export {
  BrowsePage as default
};
