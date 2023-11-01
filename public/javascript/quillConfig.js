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

// Extend quill formats here to integrate with tailwind
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

Quill.register(CustomCodeBlock, true);

// Initializes quill
var quill = new Quill('#articleBody', {
  theme: 'snow',
  modules: {
    toolbar: toolbarOptions
  }
});

// adds quill-based content to actual form, since it exists in a div 
function updateBody(ev) {    
  document.getElementById("body").value = quill.root.innerHTML;
}

const form = document.getElementById("edit-form");
form.addEventListener("submit", updateBody);