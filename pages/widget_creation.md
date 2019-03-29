---
layout: default
title: Create a new widget
permalink: /widget-creation/
redirect_from:
  - /widget_creation.html
---

# <i class="fab fa-delicious"></i> How to create a new widget

_You can find our widget repository <a href="https://github.com/suricate-io/widgets">here</a>_

A widget is a folder containing a list of files inside, for more information on the widgets folder structure you can read our <a href="/repository-architecture/">dedicated topic</a>.

# Mandatory Files

## **Description.yml**

_File used to describe the widget._ <br />

```yml
# Example of this file with all the fields
name: Gitlab Users
technicalName: gituser
description: Widget used to display the current number of user in gitlab
info: This is a warning message
delay: 300
timeout: 60
libraries:
  - d3.js
  - timeknots.js
```

You'll find below the full list of possible params in this file:

| Param         | Required | Description |
| -----         |--------- | ----------- |
| name          | true     | The widget name display to the user |
| technicalName | true     | The name as the unique key in the backend to identify your widget |
| description   | true     | A description of your widget (Utility, Goal, ...) |
| info          | false    | Tell to the user if they need a particular context to use it |
| delay         | true     | This is the time (in seconds) between two updates of your widget (in seconds). <br /> You also have the possibilitsy to set it at -1 if the widget doesn't need to launch the script.js file. |
| timeout       | false    | Timeout in seconds on the widget execution (prevent infinity loop for example) |
| libraries     | false    | A list that contains every external JS libraries that are needed to use your widget <br /> You can also add another in the libraries folder at the root of the project |
{: .table .table-striped .table-bordered .table-hover}

## **Params.yml**

_This file describe every param needed by your widget_ <br />

The params will be displayed to the user once the widget has been selected to create its own instance, and you can use them in the _script.js_ file and _content.html_ file <br />

Certain rules must be respected:
   * Your file should **always** start by **widgetParams:**
   * Then you have put your params as a yaml list (see an example below)  

```yml
# This an example on how to set params
widgetParams:
  -
    name: 'SURI_TITLE'
    description: 'Widget title'
    type: STRING
    usageExample: 'Number of job'
    required: false
  -
    name: 'SURI_PERIOD'
    description: '"Period type" to retrieve data (YEAR,MONTH,WEEK,DAY)'
    type: COMBO
    possibleValuesMap:
      -
        jsKey: 'YEAR'
        value: 'YEAR'
      -
        jsKey: 'MONTH'
        value: 'MONTH'
      -
        jsKey: 'WEEK'
        value: 'WEEK'
      -
        jsKey: 'DAY'
        value: 'DAY'
    required: true
  -
    name: 'SURI_NB_PERIOD'
    description: 'Number of "period type"'
    type: INTEGER
    defaultValue: '1'
    required: true
  -
    name: 'SURI_VIEW'
    description: 'View or sub view url'
    type: STRING
    usageExample: 'https://jenkins.com/jenkins/view/SC/view/PCR/ or view/SC'
    required: false
  -
    name: 'SURI_JOB_TYPE'
    description: 'Job type to filter (All, Generic)'
    type: COMBO
    possibleValuesMap:
      -
        jsKey: 'All'
        value: 'All'
      -
        jsKey: 'GEN'
        value: 'Generic'
    required: true
```

You'll find below the full list of possible params in this file:

| Param             | Required | Description |
| ----------------- | -------- | ----------- |
| name              | true     | The variable name, this variable must start with _SURI__ and it can be used directly in **script.js** and **content.html** files. It hold the value set by the user. |
| description       | true     | This is the description of the expected value, it will be display has input label to the user |
| type              | true     | The data type of your param <br /> <br /> This is the full list of params (it need to be set in uppercase): <br />&nbsp;&nbsp;&nbsp;&nbsp;&#x25cf; **TEXT** - Display an Input type text <br />&nbsp;&nbsp;&nbsp;&nbsp;&#x25cf; **PASSWORD** - Display an input type password <br />&nbsp;&nbsp;&nbsp;&nbsp;&#x25cf; **BOOLEAN** - Display a checkbox <br />&nbsp;&nbsp;&nbsp;&nbsp;&#x25cf; **NUMBER** - Display and input type NUMBER <br />&nbsp;&nbsp;&nbsp;&nbsp;&#x25cf; **COMBO** - Display a select <br />&nbsp;&nbsp;&nbsp;&nbsp;&#x25cf; **MULTIPLE** - Display a select with checkbox <br />&nbsp;&nbsp;&nbsp;&nbsp;&#x25cf; **FILE** - Display file upload field |
| possibleValuesMap | false    | It has to be set if the _type_ of your param is **COMBO** or **MULTIPLE**. <br /> <br /> There is two informations to set: <br />&nbsp;&nbsp;&nbsp;&nbsp;&#x25cf; **jsKey** - This value used in the _script.js_ file <br />&nbsp;&nbsp;&nbsp;&nbsp;&#x25cf; **value** - This is the related value displayed to the user|
| defaultValue      | false    | If the param need a default value put if there |
| usageExample      | false    | An example on how to fill this param |
| required          | true     | If the param is required |
{: .table .table-striped .table-bordered .table-hover}

## **Script.js**

_This file will make API requests and manage the process of your widget_

<i class="fas fa-exclamation-triangle"></i> Informations
* This script is launched by the backend (not in the browser)
* Your script must define a function named **run** (This is the function executed by the backend)
* Your API calls must be done by invoking **Packages.call()** function
* In your script all data returned in the function run **must be in JSON**
* Two variables are injected in the script
    * **SURI_PREVIOUS** - it contains the previous data stored by the last widget execution
    * **SURI_INSTANCE_ID** - it contains the id of the widget instance

```javascript
//Example of Javascript file
function run (){
    // previous data
    var data = JSON.parse(SURI_PREVIOUS);
    var number = Packages.call("https://gitlab.com/api/v4/users", "PRIVATE-TOKEN", WIDGET_CONFIG_GITLAB_TOKEN, "x-total");
    if (number == null) {
        if (data.currentValue == null){
            return data;
        }
        number = data.currentValue;
    }

    if (data.old == undefined) {
        data.old = [];
    }

    if (data.old.length != 0){
        if (data.old[0].time < new Date().getTime() - SURI_DELAI * 3600000) {
            data.old.shift();
        }
    }

    var value = {};
    value.data = data.currentValue;
    if (isNaN(value.data)){
        value.data = number;
    }
    value.time = new Date().getTime();
    data.old.push(value);

    data.currentValue = number;
    var diff = (((number - data.old[0].data) * 100) / data.old[0].data);
    if (isNaN(diff)){
        diff = 0;
    }

    if (data.currentValue ==null){
        data.old.shift();
    }

    data.difference =  diff.toFixed(1) + "%";
    data.arrow = diff == 0 ? '' : (diff > 0 ? "up" : "down");

    return JSON.stringify(data);
}
```

## **Content.html**

_This file is used to display the widget on a dashboard._ <br />

It contains the HTML code of the widget.<br />
```html
<!-- Example of an HTML widget file -->
<div class="grid-stack-item-content-inner">
    <h1 class="title">Gitlab users</h1>
    <h2 class="value">{{currentValue}}</h2>
    <p class="change-rate">
        <i class="fa fa-arrow-{{arrow}}"></i><span>{{difference}}</span>
    </p>
</div>
<p class="more-info">#Number of user</p>
```
- It's a template so you can define or display conditional content with mustache [(Documentation)](https://mustache.github.io/mustache.5.html)
* You can use variables : 
   * Define in the **params.yml file** of the widget 
   * Define in the **description.yml file** of the related category.
   * For every widgets the variable **SURI_INSTANCE_ID** is also available, this a unique id that identify this widget instanciation in the dashboard page.  So if you need to select this widget on an inline JS or CSS you can use the css selector class **.widget-{{SURI_INSTANCE_ID}}** .

To avoid the HTML escape of a mustache value, you can use \{\{\{key\}\}\} with three brackets<br/>
You can find the [Mustache template engine documentation](http://mustache.github.io/mustache.5.html) to use more tags type.

- If you need to use inline Javascript for some treatment you can do it in this file.
```javascript
// Example of inline JS
<script>
    $(function(){
        function updateDate() {
            $(".clock.widget-{{SURI_INSTANCE_ID}} .date").html(moment().locale(navigator.language || navigator.userLanguage).format('DD MMMM YYYY'));
            $(".clock.widget-{{SURI_INSTANCE_ID}} .time").html(moment().format('HH:mm:ss'));
            setTimeout(updateDate, 500);
        }
        updateDate();
    });
</script>
```

## **Style.css**

_This file used to display the widget style._

<i class="fas fa-exclamation-triangle"></i> Informations
* It's a pure CSS style file.
* All widget syle must be prefixed by **".widget.< technicalname >"** (The technical name is defined in the _description.yml_ file of the widget)

```CSS
/* Example of a Widget CSS file */

.widget.gituser {
    background-color:#47bbb3;
}
.widget.gituser .title {
    color: rgba(255, 255, 255, 0.7);
}
.widget.gituser .value {
    color: #fff;
}
.widget.gituser .change-rate i {
    margin-right:4px;
}
```

## **Icon.png**

_This is an image that represents the design of your widget_