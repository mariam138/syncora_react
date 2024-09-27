# Syncora

## Introduction

Syncora is a web application designed to help improve your productivity and organisation in day to day life. It allows you to view all your events, tasks and any notes you write down all in one place, making everything easier to find. Why not sign up today and start being the organised person you've always wanted to be?

This repository is for the front-end of the application, made using the React framework. The back-end of the project utilises the Django REST Framework. The repository for the back end can be found [here](https://github.com/mariam138/syncora_drf).

## Project Goals

**Syncora** is a web application that is the virtual version of a personal planner or diary. The primary goals of the app are:

1. Help users to stay organised by writing down tasks which need completing and any upcoming events. All of this information can then be found in one place in a much more condensed version compared to a paper diary.

2. Provide a place to write down any notes quickly and easily, compared to having to search around for a pen and paper to jot something down.

3. Provide a simple and easy to use interface, making it intuitive for anyone over the age of 13 to use.

4. Offer minimal but impactful features in an achievable development time, with the ability to further improve the app with more useful features in the future.

## User Stories

Planning of the features for **Syncora** was done with user stories. While brainstorming user stories, epics were created which were then further identified into themes. 

### Themes

Three main themes were identified in the planning of this web app:

1. **User Account** - Anything to do with a user registering for the app, signing in and out and account deletion.

2. **User Interface** - This involves the design and layout of the web app, helping to provide an intuitive user experience while also providing an impactful design.

3. **App Features** - This involves the main features of the app that will define **Syncora** as a productivity app.

### Epics

The above themes were then split down further into the following epics:

- **User Account**
    - [#4](https://github.com/mariam138/syncora_react/issues/4) Account Registration
    - [#5](https://github.com/mariam138/syncora_react/issues/5) User Sign In/Out
    - [#6](https://github.com/mariam138/syncora_react/issues/6) Account Deletion
    - [#9](https://github.com/mariam138/syncora_react/issues/9) User Profile

- **User Interface**
    - [#7](https://github.com/mariam138/syncora_react/issues/7) Dashboard
    - [#8](https://github.com/mariam138/syncora_react/issues/8) Navigation

- **App Features**
    - [#10](https://github.com/mariam138/syncora_react/issues/10) Tasks
    - [#11](https://github.com/mariam138/syncora_react/issues/11) Events
    - [#12](https://github.com/mariam138/syncora_react/issues/12) Notes

Each epic above is directly linked to the issue created on Github as part of the Agile methodology used to create the app.

### User Stories

Each user story was then created based of the above epics. Each user story is linked to an epic and labelled using the **MoSCoW** approach: must have, should have, could have and won't have. All user stories can be viewed on the [Syncora Project Board](https://github.com/users/mariam138/projects/7).

## Agile Development Methodology

User stories were created using Github's **issues** feature. Then using Github's **projects** feature, a board was created to keep track of all user stories, epics and themes. The board was split into five main columns: one column for themes, one for epics, then three to keep track of each user story. These three were the default **To Do**, **In Progress** and **Completed** columns provided by Github when creating a project. Each user story was then labelled using the **MoSCoW** approach. Any feature that falls under CRUD functionality was labelled as a *must have* feature. Story point labels were then created using a linear scale of: **1, 2, 4, 6 and 8**. I decided **not** to use a label for **16** story points because that would be considered an epic, so this felt like a redundant label. 

For each iteration, a new **milestone** was created. Each milestone was then given a due by date to help keep on track throughout the creation of this project. An initial milestone was created to act like the **Product Back Log**, where all user stories were first moved to.