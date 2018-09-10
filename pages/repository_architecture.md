---
layout: default
title: Repository architecture
permalink: /repository-architecture/
redirect_from:
  - /repository-architecture.html
---

# <i class="fas fa-fw fa-stream"></i> Repository architecture

_You can find our widget repository <a href="https://github.com/suricate-io/widgets">here</a>_

- **Content** (Contain the list of category folders)
  - **Category 1** (A widget category - For example : jenkins)
    - **Widget name 1**
      -  content.hml (HTML content of the widget)
      -  description.yml (Widget description)
      -  image.png (Widget image)
      -  params.yml (Params displayed to configure this widget)
      -  script.js (Widget script used to launch widget processing)
      -  style.css  (Widget style)
    - **Widget name 2**
      -  content.hml (HTML content of the widget)
      -  description.yml (Widget description)
      -  image.png (Widget image)
      -  params.yml (Params displayed to configure this widget)
      -  script.js (Widget script used to launch widget processing)
      -  style.css  (Widget style)
    - description.yml (Category description)
    - icon file (category icon optional)
  - **Category 2**
    - description.yml (Category description)
    - icon file (category icon optional)
- **libraries**  (list of libraries used by widgets)
  - chart.js
  - d3.js
  - pdf.js
  - ...