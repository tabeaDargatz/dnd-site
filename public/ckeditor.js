/**
 * This configuration was generated using the CKEditor 5 Builder. You can modify it anytime using this link:
 * https://ckeditor.com/ckeditor-5/builder/?redirect=portal#installation/NoNgNARATAdArDADBSIAccDMGDsVEhQ5qZxxQCciciiAjACwiJQgUUNocPKQCmAOxSIwwOmBEjxUgLqQAJpkQU4aKBBlA===
 */

export let editors = new Map();

const {
  ClassicEditor,
  Autoformat,
  Autosave,
  Bold,
  Essentials,
  Heading,
  Italic,
  Link,
  List,
  Paragraph,
  Strikethrough,
  TextTransformation,
  Underline,
} = window.CKEDITOR;

const LICENSE_KEY =
  "eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3Nzc4NTI3OTksImp0aSI6ImE0NWY3Y2M5LTE2YTktNGFlYS1hYmQ5LTFlM2VlMmY2YTFlZiIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiXSwiZmVhdHVyZXMiOlsiRFJVUCJdLCJ2YyI6Ijg1ODE2MjJmIn0.z6aJoCZ1UUUsMmY5FGNd6tDr8hycz-w3ZtG4SRMvFOfWOabJTwiDXP-8YejCFGDj3q4vSKEPees7aVTECDlweQ";

const editorConfig = {
  toolbar: {
    items: [
      "heading",
      "|",
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "|",
      "link",
      "|",
      "bulletedList",
      "numberedList",
    ],
    shouldNotGroupWhenFull: false,
  },
  plugins: [
    Autoformat,
    Autosave,
    Bold,
    Essentials,
    Heading,
    Italic,
    Link,
    List,
    Paragraph,
    Strikethrough,
    TextTransformation,
    Underline,
  ],
  heading: {
    options: [
      {
        model: "paragraph",
        title: "Paragraph",
        class: "ck-heading_paragraph",
      },
      {
        model: "heading1",
        view: "h1",
        title: "Heading 1",
        class: "ck-heading_heading1",
      },
      {
        model: "heading2",
        view: "h2",
        title: "Heading 2",
        class: "ck-heading_heading2",
      },
      {
        model: "heading3",
        view: "h3",
        title: "Heading 3",
        class: "ck-heading_heading3",
      },
      {
        model: "heading4",
        view: "h4",
        title: "Heading 4",
        class: "ck-heading_heading4",
      },
      {
        model: "heading5",
        view: "h5",
        title: "Heading 5",
        class: "ck-heading_heading5",
      },
      {
        model: "heading6",
        view: "h6",
        title: "Heading 6",
        class: "ck-heading_heading6",
      },
    ],
  },
  initialData: "",
  licenseKey: LICENSE_KEY,
  link: {
    addTargetToExternalLinks: true,
    defaultProtocol: "https://",
    decorators: {
      toggleDownloadable: {
        mode: "manual",
        label: "Downloadable",
        attributes: {
          download: "file",
        },
      },
    },
  },
  placeholder: "Type or paste your content here!",
};

document.querySelectorAll(".contentArea").forEach((contentArea) => {
  ClassicEditor.create(contentArea, editorConfig).then((newEditor) => {
    editors.set(contentArea.id, newEditor);
  });
});
