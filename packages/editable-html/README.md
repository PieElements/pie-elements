# corespring-editable-html

`corespring-editable-html` is an inline HTML editor, based on [`draft-js`](https://github.com/facebook/draft-js), for use within PIE configuration panels. It is very much a work in progress.

## Usage

Install:

    npm install --save corespring-editable-html


Import:

    import EditableHTML from 'corespring-editable-html';


Declare:

    <EditableHTML 
      placeholder="Placeholder..."
      onChange={this.htmlChanged.bind(this)} 
      model={this.state.html} />