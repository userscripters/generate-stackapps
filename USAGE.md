```
Options:
      --version               Show version number                      [boolean]
      --help                  Show help                                [boolean]
  -a, --about                 Long project description                  [string]
      --cr, --chrome          Last tested Chrome version                [string]
  -d, --direct                Send output to process.stdout (CLI-only)
                                                      [boolean] [default: false]
  -e, --excerpt               Short project description                 [string]
      --ed, --edge            Last tested Edge version                  [string]
      --ie, --explorer        Last tested Internet Explorer version     [string]
      --ff, --firefox         Last tested Firefox version               [string]
      --iu, --install         Project installation URL       [string] [required]
  -l, --language              Programming languages used (repeatable)    [array]
      --mu, --minified        Minified version installation URL         [string]
  -o, --output                Output file path (CLI-only)
                                            [string] [default: "./STACKAPPS.md"]
      --on, --org-name        GitHub organization name                  [string]
      --op, --opera           Last tested Opera version                 [string]
      --ou, --org-url         GitHub organization URL                   [string]
  -p, --package               Path to project's package.json
                                            [string] [default: "./package.json"]
  -r, --room                  Chat room URL                             [string]
      --sa, --screenshot-alt  Project screenshot alt text               [string]
      --su, --screenshot-url  Project screenshot URL                    [string]
      --tg, --tag             StackApps post tag (repeatable)
                                                   [array] [default: ["script"]]
      --tl, --title           StackApps post title                      [string]
      --th, --thumbnail       StackApps post thumbnail                  [string]
      --ww, --works-with      Supported userscript manager (repeatable)
              [array] [choices: "greasemonkey", "tampermonkey", "violentmonkey"]
```
