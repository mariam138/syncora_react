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

## Planning

### Wireframes

Wireframes were created to help with the design and layout of Syncora, using the 'must-have' user stories to ensure important features were included. Wireframes for both desktop and mobile were created. Below are the wireframes for the mobile layout.

![Mobile wireframes slide 1](readme_assets/mobile-wireframes-slide-1.png)

![Mobile wireframes slide 2](readme_assets/mobile-wireframes-slide-2.png)

![Mobile wireframes slide 3](readme_assets/mobile-wireframes-slide-3.png)

These can be viewed in PDF format [here](https://github.com/mariam138/syncora_react/blob/main/readme_assets/syncora-mobile-wireframes.pdf).

From the start I already had a layout in mind for the dashboard for desktop, which the rest of the wireframes have been based around.

![Desktop dashboard wireframe](readme_assets/desktop-dashboard-wireframe.png)

All remaining desktop wireframes can be found [here](https://github.com/mariam138/syncora_react/tree/main/readme_assets/desktop-wireframes). The to-do list picture used as part of the hero image on the register/sign in pages is from geralt on [pixabay](https://pixabay.com/illustrations/lists-to-do-paper-checkbox-tasks-6131220/).

### Database Models

Models for the database were planned out before starting creation of the project. These models can be found in detail on the back-end repository [here](https://github.com/mariam138/syncora_drf).

## Design

### Colour Scheme

I envinsioned a bright pink as the main colour for Syncora, using this base to then pick the rest of my colour palette. First, I searched different palettes based on pink to choose the shade of pink I wanted. Using [this](https://colorhunt.co/palette/ffbe98f05a7e125b9a0b8494) colour palette on *colorhunt.co*, I initially chose the colour `#F05A7E`. Entering this colour onto *coolors.co* allowed me to then choose a slightly different, more muted shade of pink - `#FB6083`. I then checked the contrast of this colour against a black to ensure it met AAA accessibility guidelines. Using [this](https://www.learnui.design/tools/accessible-color-generator.html) colour generator on *Learn UI Design*, I chose the shade `#000010`, which will be used as text on the pink shade. Locking these two colours in on my *coolors.co* colour palette, I then generated another colour to use as a secondary colour. The colour I chose was this wheat colour `#F5DFBB`. Finally, I picked a shade of white/cream as a fourth colour, again checking it's contrast on *Learn UI Design* against the above black shade. The cream/white shade I settled on to meet AAA guidelines was `#FFF5F5`. Below is the final colour palette for Syncora.

![Syncora colour palette](readme_assets/syncora-colour-palette.png)

Below is the contrast grid created on [Contrast Grid by Eightshapes](https://contrast-grid.eightshapes.com/?version=1.1.0&background-colors=&foreground-colors=%23FB6083%0D%0A%23000010%0D%0A%23F5DFBB%0D%0A%23FFF5F5%0D%0A&es-color-form__tile-size=compact&es-color-form__show-contrast=aaa) to check for passing contrast with the colour palette.

![Colour palette contrast grid](readme_assets/colour-contrast-grid.png)

### Typography

Google fonts was used to provide fonts for this project. For the Syncora logo and for section headings, I decided to choose the font **Comfortaa**. It is a simple but rounded font which gives simplicity and modernity at the same time, perfect for the branding of Syncora. **Comfortaa** was found on [fontpair.co](https://www.fontpair.co/fonts/comfortaa). For all other text, I chose the font **Nunito**. Using [fontjoy.com](fontjoy.com), I generated fonts that would match **Comfortaa** but with a bit more contrast. **Nunito** was suggested, so I settled on this for all other text on the app.

![Syncora font pairing](readme_assets/font-pairing.png)

## Features

### Reusable React Components

### Bugs

### Future Features

## Frameworks, libraries and dependencies
- **vite 5.4.8** - Vite's React template was used to start and set up the Syncora front-end project. This was chosen over **create-react-app** as it is more up-to-date and maintained. The template was installed using the command `npm create vite@latest -- --template react`.
- **react-bootstrap** - Bootstrap is the framework used to style the front-end of Syncora. react-bootstrap is used to ensure compatability with React.
- **react-router-dom** - This is used to create routes/URLs for the front end of the application.

## Testing

### Manual Testing

### Automated Testing

### Validators

#### W3C CSS Validator

#### ESLint JavaScript Validator

### WAVE Accessibility

### Lighthouse Testing

## Deployment

## Accreditation

### Code

### Media