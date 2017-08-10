# editable-html

`editable-html` is an inline HTML editor, based on [`draft-js`](https://github.com/facebook/draft-js), for use within PIE configuration panels. It is very much a work in progress.


## Demo 

```bash
npm install 
cd demo
../node_modules/.bin/webpack-dev-server --hot --inline
# go to http://localhost:8080
```

## Usage

Install:

    npm install --save @pie-libs/editable-html


Import:

    import EditableHTML from '@pie-libs/editable-html';


Declare:

    <EditableHTML 
      placeholder="Placeholder..."
      onChange={this.htmlChanged.bind(this)} 
      model={this.state.html} />