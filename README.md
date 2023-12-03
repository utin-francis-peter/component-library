# React Component Library

As I interacted with more node packages, I got curious about how these components are built and published for other devs in the ecosystem to leverage on and save their time. This (cat kind of) curiosity led me into building this library.

At the moment, the official documentation isn't ready and does not have support for TypeScript yet. All these would be addressed in the next release. In addition, this package would focus on going more crazy about a particular UI component I'm yet to decide on (we can collaborate).

Through this brief README, you'll learn about the existing components and its expected props.

## Installation

`react` and `react-dom` are peerDependencies.
Have these packages installed first before proceeding with installation of the react component package.

Also, the project depends on `tailwindCSS` for aesthetics.

npm
`npm i @utin-francis-peter/react-component`

yarn
`yarn add @utin-francis-peter/react-component`

## Components

### Accordion

The accordion component expects an `accordionList` prop. Each list item is expected to have the following keys:

- id
- question
- answer
  And other keys you may wish to use.

### Button

The button component expects a number of props. They include:

- className: for accepting tailwind style classes
- children
- type: set to a default value of "button"
- variant: set to a default value of "primary"
- size: set to a default value of "sm"
- onClick: expects a callback function used in response to user actions
- isDisabled: expects a condition for disabling the button

### FileUploader

The FileUploader component currently supports single file upload. Multiple file uploads would be effected in the next release. The component allows for Click-to-Select and Drag-and-Drop method of selecting files.

The following props are available to the component:

- btnLabel
- accept: string[] that specifies the accepted files/formats
- maxFileSize
- canDragAndDrop: toggles the drag-and-drop feature
- canUseIcon
- iconColor
- iconSize
- handleUpload: callback that handle upload of the file to a server

### Link

A simple link component for creating links. Available props include:

- children
- href
- icon
- isPairedWithIcon: when true, an icon can be attached to the link.

### Pagination

The Pagination component, mostly used to control the number of items that gets rendered at a time expects the following props:

- data: an array of data you wish to render controllably
- itemsPerPage: specifies the number items to render per page
- setItemsPerPage: a callback for updating number of items per page

### StarRating

The simple StarRating component doesn't require any props. More configuration would be put in place soon.

### Tab

The modern Tabbed UI component allows contents or components to be conditionally rendered on a page based on the active tab link.
The component expects the following props:

- tabNavList
- tabContentData: for now, a list of contents to be displayed based on id of active tab - I.e the id of active tab matches the id of contentData obj. In later release, this option would be more flexible and configurable.
- variant: "contained" || ""

### TextInput

A simple TextInput component that allows toggling between regular input field or a password field.
The component accepts the following props:
id,

- inputType
- labelText
- helperText
- size
- placeholder
- showHelperText
- showLabelText
- isDisabled
- isReadOnly
- isPasswordMode
- showPassword
- togglePasswordVisibility
- inputValue
- onChange
- onClick

### ToggleSwitch

The ToggleSwitch component is used to toggle between a boolean state. The component expects the following props:

- variant: "skeleton" || ""
- showLabel
- size
- onClickHandler
  The component also has an internal `isToggled` state that toggles whenever the ToggleSwitch is clicked.

### Tooltip

The Tooltip component is used to give brief insights about an item when hovered.

More updates coming soon.

For now, the component accepts the following props:

- children
- content
