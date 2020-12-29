<h1>Vue-File64</h1>
<p>A simple way to convert files to base64 strings, with multiple and extension based filter.</p>

## Installation

```bash
npm i vue-file64
```

## Importing Globally
<p>You can import this package as usual, here as an example the package is imported globally.</p>

```vue
import FileDialog from 'vue-file64;
Vue.component('file-dialog-64', FileDialog);

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

<table>
    <thead>
        <tr>
            <th>Prop Name</th>
            <th>Type</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>label</td>
             <td>String</td>
            <td><p>Used a common html label</p></td>
        </tr>
          <tr>
            <td>placeholder</td>
             <td>String</td>
            <td><p>Can be used to replace the default placeholder "Choose files", however this will be overridden when files are selected</p></td>
        </tr>
          <tr>
            <td>accept</td>
             <td>String</td>
            <td><p>Same as HTML accept, example :accept="'.jpg, .png'"</p></td>
        </tr>
          <tr>
            <td>multiple</td>
             <td>Boolean</td>
            <td><p>Enable ability to select multiple files</p></td>
        </tr>
          <tr>
            <td>isInvalid</td>
             <td>Boolean</td>
            <td><p>Activates the invalid class if set to true, highlights in red.</p></td>
        </tr>
    </tbody>
</table>


## Events

<table>
    <thead>
        <tr>
            <th>Event</th>
            <th>Description</th>
        </tr>
    </thead>
     <tbody>
        <tr>
            <td>output</td>
            <td>Returns the base64 strings of the uploaded files.</td>
        </tr>
          <tr>
            <td>filecount</td>
            <td>Return the number of files uploaded.</td>
        </tr>
    </tbody>
</table>


## Slots

<table>
    <thead>
        <tr>
            <th>Slot Name</th>
            <th>Description</th>
        </tr>
    </thead>
     <tbody>
        <tr>
            <td>errorMessage</td>
            <td>Can be used to set your own error message.</td>
        </tr>
         <tr>
            <td>onComplete</td>
            <td>Show something when the upload is complete. Such as previewing the files.</td>
        </tr>
    </tbody>
</table>


<br />
<br />
<br />
<p>Feel free to contribute to this project, thanks</p>
