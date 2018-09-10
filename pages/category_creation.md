---
layout: default
title: Create a new category
permalink: /category-creation/
redirect_from:
  - /category_creation.html
---

# <i class="fas fa-fw fa-folder-open"></i> How to create a new category

_You can find our widget repository <a href="https://github.com/suricate-io/widgets">here</a>_

A Category is a folder with files that describe this category, and with a folder that contains every widget related to it, for more information, you can take a look to our <a href="/repository-architecture/">topic</a> related to the project architecture

## **Description.yml**

_This file describe the category and contains the associated variables_

```yml
# Example of the file
name: Jenkins
technicalName: jenkins
configurations:
  -
    key: 'WIDGET_CONFIG_JENKINS_USER'
    dataType: STRING
  -
    key: 'WIDGET_CONFIG_JENKINS_PASSWORD'
    dataType: PASSWORD
  -
    key: 'WIDGET_CONFIG_JENKINS_URL'
    dataType: STRING
```

You'll find below the full list of possible params in this file:

| Param          | Required | Description |
| -------------- | -------- | ----------- |
| name           | true     | The category name display to the user |
| technicalName  | true     | The name as the unique key in the backend to identify your widget |
| configurations | false    | Contains the list of needed configurations for the widgets of this category. <br /><br /> The elements of the list must declare the following variables: <br/>&nbsp;&nbsp;&nbsp;&nbsp;&#x25cf; **key** - This is the variable used in the widget files (script.js and content.html). The key name **must start by WIDGET_CONFIG_** <br/>&nbsp;&nbsp;&nbsp;&nbsp;&#x25cf; **dataType** - The type of this variable, you can use any of these types <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;○ INTEGER <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;○ STRING <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;○ PASSWORD |
{: .table .table-striped .table-bordered .table-hover}

## **Icon.png**

_An image that represent this category_

## **Widgets folder**

_Folder that hold all the related widgets_

For more information on the widget creation take a look to our <a href="/widget-creation/">related topic</a>