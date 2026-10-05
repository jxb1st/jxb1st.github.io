# Interactive Model Experiments panel

Static, data-driven index of interactive-model experiments, served by GitHub Pages at
`https://jxb1st.github.io/interactive_model_panel/`. Plain HTML, CSS, and one small script. No build step.

## Directory structure

```text
interactive_model_panel/
├── index.html                 # the panel: generates one card per entry in experiments.json
├── style.css                  # shared styles for the panel and every experiment page
├── script.js                  # loads/sorts/renders the manifest; builds the section list on experiment pages
├── experiments.json           # the manifest (edit this to add an experiment)
├── experiment-template.html   # blank page skeleton to copy for a new experiment
├── README.md
├── assets/                    # assets shared across experiments (panel-level figures, logos)
└── experiments/
    └── <slug>/
        ├── index.html         # the detailed experiment page
        └── assets/            # that experiment's figures, clips, small JSON files
```

`experiments/demo-template/` is demo content. It is flagged `"demo": true` in the manifest and shows
a "Demo" badge. Delete the folder and its manifest entry when the first real experiment is added.

## `experiments.json` schema

A JSON array. One object per experiment:

| field | required | notes |
|---|---|---|
| `slug` | yes | folder name under `experiments/`; the card links to `experiments/<slug>/` |
| `title` | yes | card heading |
| `short_name` | no | 2–3 characters shown in the icon square; defaults to the title's initials |
| `date` | no | `YYYY-MM-DD`. Entries without a valid date are kept, labeled "Date not set", and listed after all dated entries |
| `status` | no | free text; `completed`, `in-progress`, `planned`, `failed` get distinct colors |
| `summary` | no | one paragraph |
| `stats` | no | array of short strings such as `"12 videos"`; the first token is bolded |
| `tags` | no | array of short strings |
| `accent` | no | integer 1–6 to pick the icon color; otherwise derived from the slug |
| `url` | no | overrides the link target, for an experiment hosted elsewhere |
| `demo` | no | `true` adds a "Demo" badge |

Entries missing `slug` or `title` are skipped with a console warning. Cards are sorted newest first.

## Adding a new experiment

1. Pick a slug (lowercase, hyphens, no leading underscore): `turn-taking-eval`.
2. Append an object to `experiments.json`. Keep the file valid JSON (`python3 -m json.tool experiments.json`).
3. Create `experiments/turn-taking-eval/` and copy `experiment-template.html` to `index.html` inside it.
4. Fill in the sections you need and delete the rest. Section order and component markup are shown in
   `experiments/demo-template/index.html` (prompt blocks, result tables, figures, videos, side-by-side comparisons, case cards).
5. Put that experiment's media in `experiments/turn-taking-eval/assets/` and reference it as `assets/...`.

Paths inside an experiment page are relative: `../../style.css`, `../../script.js`, back link `../../`.

## Assets

Commit only lightweight, processed artifacts: PNG/SVG figures, compressed MP4 clips (a few MB each at
most), representative examples, small JSON. Never commit checkpoints, raw datasets, or private paths.

## Local preview

The panel fetches `experiments.json`, which browsers block on `file://`. Serve the site root instead:

```bash
cd <repo root>
python3 -m http.server 8000
# open http://localhost:8000/interactive_model_panel/
```
