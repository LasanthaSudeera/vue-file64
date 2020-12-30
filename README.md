# Vue-File64

A simple way to convert files to base64 strings, with multiple and extension based filter.

## Installation

```bash
npm i vue-file64
```

## Importing Globally

You can import this package as usual, here as an example the package is imported globally.

```vue
import FileDialog from 'vue-file64; Vue.component('file-dialog-64', FileDialog);
```

## Usage

```vue
<file-dialog-64
  :isInvalid="form.errors.errors.hasOwnProperty('image')"
  :accept="''"
  @output="
    (file) => {
      this.form.image = file;
    }
  "
  :label="'Upload your files'"
>
<p slot="errorMessage" class="invalid-feedback d-block"> Image is required </p>
</file-dialog-64>
```

## Props

| Prop Name   | Type    | Description                                                                                                            |
| ----------- | ------- | ---------------------------------------------------------------------------------------------------------------------- |
| label       | String  | Used as common html label                                                                                              |
| placeholder | String  | Can be used to replace the default placeholder "Choose files", however this will be overridden when files are selected |
| accept      | String  | Same as HTML accept, can be used to filter extensions, example :accept="'.jpg, .png'"                                  |
| multiple    | Boolean | Enable ability to select multiple files                                                                                |
| isInvalid   | Boolean | Activates the invalid class if set to true, highlights in red.                                                         |

## Events

| Event     | Description                                       |
| --------- | ------------------------------------------------- |
| output    | Returns the base64 strings of the uploaded files. |
| filecount | Returns the number of uploaded                    |

## Slots

| Slot Name    | Description                                                                           |
| ------------ | ------------------------------------------------------------------------------------- |
| errorMessage | Can be used to set your own error message.                                            |
| onComplete   | Make use to show something when the upload is complete. Such as previewing the files. |

\
\
Feel free to contribute to this project, thanks
