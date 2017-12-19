var enzyme = require('enzyme');
var Adapter = require('enzyme-adapter-react-15');

module.exports = () => enzyme.configure({ adapter: new Adapter() });