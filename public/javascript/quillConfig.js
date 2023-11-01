/*
* This configures Quill with all desired toolbar options
* We extend some Quill blocks so we can utilize Tailwind and consistently format rendered pages without any CSS bloat or inline styles
*/
var toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  [ 'link', 'image', 'video', 'formula' ],          // add's image support
  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean']                                         // remove formatting button
];

// Extend quill formats to inject custom classes and styling via TailWind; Tailwind will detect classes added here
var Block = Quill.import('blots/block');
class CustomBlock extends Block {
  static create() {
    const node = super.create();
    node.classList.add('mb-2');
    node.classList.add('text-gray-900');
    return node;
  }
}

var CodeBlock = Quill.import('formats/code-block'); 
class CustomCodeBlock extends CodeBlock {
  static create() {
    const node = super.create();
    node.classList.add('bg-black');
    node.classList.add('shadow-sm');
    node.classList.add('rounded-xl');
    node.classList.add('p-3');
    node.classList.add('my-1');
    node.classList.add('text-white');
    node.classList.add('overflow-auto');
    return node;
  }
}

var Header = Quill.import('formats/header'); 
class CustomHeader extends Header {
  static create(headingLevel) {
    const node = super.create(headingLevel);    
    const headingClasses = {
      1: 'text-2xl',
      2: 'text-xl',
      3: 'text-lg',
      4: 'text-lg',
      5: 'text-base',
      6: 'text-base'
    };

    node.classList.add(headingClasses[headingLevel]);
    node.classList.add('text-cyan-600');

    return node;
  }
}

// Register our custom blocks
Quill.register(CustomBlock, true);
Quill.register(CustomCodeBlock, true);
Quill.register(CustomHeader, true);

// Initialize actual widget
var quill = new Quill('#articleBody', {
  theme: 'snow',
  modules: {
    toolbar: toolbarOptions
  }
});

// adds HTML to the form, since it exists only in a div
function updateBody(ev) {
  document.getElementById("body").value = quill.root.innerHTML;
}

const form = document.getElementById("edit-form");
form.addEventListener("submit", updateBody);